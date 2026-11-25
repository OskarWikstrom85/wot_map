"""Bygger site/index.html: lägger in Leaflets CSS och platserna från data/locations.csv."""
import csv, json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
tpl = (root/'src/index.template.html').read_text()
css = (root/'package/dist/leaflet.css').read_text()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S); css = re.sub(r'\s+', ' ', css)
rows = list(csv.DictReader(open(root/'data/locations.csv', encoding='utf-8')))
ids = set()
for r in rows:
    assert r['id'] not in ids, f"dubblett-id {r['id']}"; ids.add(r['id'])
    r['x'], r['y'] = float(r['x']), float(r['y'])
    assert 0 <= r['x'] <= 1.4 and 0 <= r['y'] <= 1, f"koordinat utanför kartan: {r['id']}"   # x > 1: Aielöknen öster om källkartan
data = json.dumps(rows, ensure_ascii=False).replace('</', '<\\/')
nations = (root/'data/nations.json').read_text().replace('</', '<\\/')
import json as _j
_places = {r['id']: r for r in _j.loads(data)}
_bat = _j.load(open(root/'data/battles.json'))
for _b in _bat:
    assert _b['plats'] in _places, _b['plats']
    _b['xy'] = [_places[_b['plats']]['x'], _places[_b['plats']]['y']]
# ---- Korslänkning och kontroll ----
# Deltagare i ett slag härleds från karaktärernas händelser (fältet "slag"),
# så en ny karaktär som deltog dyker automatiskt upp under slaget.
_chars = _j.load(open(root/'data/characters.json'))
_cid = {c['id'] for c in _chars}
_bid = {b['id'] for b in _bat}
_errs = []
for _c in _chars:
    for _h in _c['handelser']:
        if _h.get('plats') and _h['plats'] not in _places: _errs.append(f"{_c['id']}: okänd plats {_h['plats']}")
        if _h.get('slag') and _h['slag'] not in _bid: _errs.append(f"{_c['id']}: okänt slag {_h['slag']}")
    for _k in ('ursprung', 'uppvuxen'):
        if _c.get(_k) and _c[_k] not in _places: _errs.append(f"{_c['id']}: okänd plats {_c[_k]}")
    for _r in _c['relationer']:
        if _r['id'] not in _cid: _errs.append(f"{_c['id']}: relation till okänd karaktär {_r['id']}")
        elif not any(_x['id'] == _c['id'] for _x in next(_y for _y in _chars if _y['id'] == _r['id'])['relationer']):
            _errs.append(f"enkelriktad relation: {_c['id']} -> {_r['id']} saknar motsvarighet")
for _b in _bat:
    _from_ev = [c['id'] for c in _chars if any(h.get('slag') == _b['id'] for h in c['handelser'])]
    for _x in _b.get('karaktarer', []):
        if _x not in _from_ev: _errs.append(f"slag {_b['id']}: {_x} listas men saknar händelse med slag={_b['id']}")
    _b['karaktarer'] = _from_ev
# ---- Resor: stopp måste finnas som platser, böckerna gå framåt och varje landsträcka ha en rutt ----
_resor = _j.load(open(root/'data/resor.json'))
_rutter = _j.load(open(root/'data/rutter.json')) if (root/'data/rutter.json').exists() else {}
_HOPP, _SATT = {'ways', 'portalsten', 'portal'}, {'land', 'flod', 'hav', 'ways', 'portalsten', 'portal'}
_used = {}
for _rid, _r in _resor.items():
    if _rid.startswith('_'): continue
    if _rid not in _cid: _errs.append(f"resa {_rid}: okänd karaktär")
    _st = _r['stopp']
    for _k, _s in enumerate(_st):
        if _s['plats'] not in _places: _errs.append(f"resa {_rid} stopp {_k + 1}: okänd plats {_s['plats']}")
        if _k and _s['bok'] < _st[_k - 1]['bok']: _errs.append(f"resa {_rid} stopp {_k + 1}: boken går bakåt")
        if _k and _s.get('satt') not in _SATT: _errs.append(f"resa {_rid} stopp {_k + 1}: okänt sätt {_s.get('satt')}")
        for _v in _s.get('via', []):
            if _v not in _places: _errs.append(f"resa {_rid} stopp {_k + 1}: okänd via-plats {_v}")
        if _s['bok'] >= 1 and 'datum' not in _s: _errs.append(f"resa {_rid} stopp {_k + 1}: datum saknas")
        if _k and _s.get('satt') not in _HOPP:
            _ch = [_st[_k - 1]['plats']] + _s.get('via', []) + [_s['plats']]
            for _a, _b in zip(_ch, _ch[1:]):
                _key = f"{_a}>{_b}>{_s['satt']}"
                if _key in _rutter: _used[_key] = _rutter[_key]
                else: _errs.append(f"resa {_rid}: rutt saknas för {_key} (kör scripts/route_via.py)")
if _errs:
    raise SystemExit('Länkfel:\n  ' + '\n  '.join(_errs))
battles = _j.dumps(_bat, ensure_ascii=False).replace('</', '<\\/')
out = tpl.replace('/*LEAFLET_CSS*/', css).replace('/*LOCATIONS*/', data).replace('/*NATIONS*/', nations).replace('/*CHARACTERS*/', (root/'data/characters.json').read_text().replace('</', '<\\/')).replace('/*BATTLES*/', battles).replace('/*RESOR*/', _j.dumps(_resor, ensure_ascii=False).replace('</', '<\\/')).replace('/*RUTTER*/', _j.dumps(_used, separators=(',', ':'))).replace('/*TIDSLINJE*/', (root/'data/tidslinje.json').read_text())
(root/'site/index.html').write_text(out)
print(f"{len(rows)} platser, {len(out)//1024} KB")
