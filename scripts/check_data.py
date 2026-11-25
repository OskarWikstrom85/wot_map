"""Steg 0 i granskningen: kontrollerar att datan stämmer med sig själv.
Skriver fynden till out/granskning/steg0.json i samma format som faktagranskarna."""
import csv, json, math, pathlib, datetime as dt
root = pathlib.Path(__file__).resolve().parent.parent
C = json.load(open(root / 'data/characters.json')); B = json.load(open(root / 'data/battles.json'))
R = json.load(open(root / 'data/resor.json')); T = json.load(open(root / 'data/tidslinje.json'))
P = {r['id']: r for r in csv.DictReader(open(root / 'data/locations.csv', encoding='utf-8'))}
byC = {c['id']: c for c in C}; byB = {b['id']: b for b in B}
F = []
def f(omr, obj, falt, nu, forslag, allvar, mot):
    F.append(dict(omrade=omr, objekt=obj, falt=falt, nu=nu, forslag=forslag, kalla='intern kontroll', allvar=allvar, motivering=mot))
def day(s):
    y, m, d = map(int, s.split('-')); return (dt.date(2000, m, d) - dt.date(2000, 1, 1)).days + (y - 998) * 365
END = {int(k): day(v) for k, v in T['bocker'].items()}
dist = lambda a, b: math.hypot((float(P[a]['x']) - float(P[b]['x'])) * 8000, (float(P[a]['y']) - float(P[b]['y'])) * 6177)

# 1. händelse med plats: karaktären ska enligt resan vara där under händelsens bok
#    (ett stopp på platsen i samma bok, eller ett tidigare stopp där karaktären blir kvar in i boken)
def present(st, plats, bok):
    for i, s in enumerate(st):
        if s['plats'] != plats and dist(s['plats'], plats) > 200: continue   # närliggande platser räknas
        nxt = st[i + 1]['bok'] if i + 1 < len(st) else 99
        if s['bok'] <= bok <= nxt: return True
    return False
for c in C:
    st = R.get(c['id'], {}).get('stopp', [])
    for k, h in enumerate(c['handelser']):
        if not h.get('plats') or h['bok'] == 0 or present(st, h['plats'], h['bok']): continue
        near = [s for s in st if abs(s['bok'] - h['bok']) <= 1]
        f('resor', f"{c['id']}", f"handelser[{k}]", f"bok {h['bok']}, {h['plats']}: {h['text'][:80]}",
          'lägg till stopp i resan eller rätta händelsens plats', 'tveksamt',
          f"Händelsen ligger i {P[h['plats']]['namn']} men enligt resan är {c['namn']} inte där under bok {h['bok']} (stopp runt den boken: {', '.join(sorted({s['plats'] for s in near})) or '–'}).")
# 2. händelse kopplad till slag: samma bok och plats som slaget
for c in C:
    for k, h in enumerate(c['handelser']):
        b = byB.get(h.get('slag'))
        if not b: continue
        if b['bok'] != h['bok']:
            f('karaktärer', c['id'], f"handelser[{k}].bok", str(h['bok']), str(b['bok']), 'fel', f"Händelsen hör till slaget {b['namn']}, som är i bok {b['bok']}.")
        if h.get('plats') and b.get('plats') and h['plats'] != b['plats'] and dist(h['plats'], b['plats']) > 400:
            f('karaktärer', c['id'], f"handelser[{k}].plats", h['plats'], b['plats'], 'tveksamt', f"Slaget {b['namn']} utkämpas vid {b['plats']}, händelsen pekar på {h['plats']}.")
# 3. slagens deltagare ska vara på plats (enligt resan) när slaget utkämpas
def where(cid, d):
    st = [s for s in R[cid]['stopp'] if 'datum' in s]
    cur = None
    for s in st:
        if day(s['datum']) <= d: cur = s
    return cur
for c in C:
    for h in c['handelser']:
        b = byB.get(h.get('slag'))
        if not b or not b.get('dag') or c['id'] not in R: continue
        if h.get('plats') != b.get('plats'): continue   # deltar från en annan plats (en annan front) eller saknar plats
        s = where(c['id'], day(b['dag']))
        if not s or (s['plats'] != b['plats'] and dist(s['plats'], b['plats']) > 300):
            f('resor', c['id'], 'datum', f"{s['plats'] if s else 'ingenstans'} den {b['dag']}", f"stopp vid {b['plats']} senast {b['dag']}", 'tveksamt',
              f"{c['namn']} deltar i {b['namn']} ({b['dag']}) men är enligt resan {('i ' + P[s['plats']]['namn']) if s else 'inte på kartan'} då.")
# 4. datum i förhållande till bokens tidsspann
for cid, r in R.items():
    if cid.startswith('_'): continue
    for k, s in enumerate(r['stopp']):
        if 'datum' not in s: continue
        d = day(s['datum'])
        if d > END[s['bok']] + 5:
            f('resor', f"{cid} stopp {k} ({s['plats']}, bok {s['bok']})", 'datum', s['datum'], f"senast {T['bocker'][str(s['bok'])]} eller annan bok", 'tveksamt',
              f"Datumet ligger efter att bok {s['bok']} slutar ({T['bocker'][str(s['bok'])]}).")
        if s.get('borta') and day(s['borta']) < d:
            f('resor', f"{cid} stopp {k}", 'borta', s['borta'], s['datum'], 'fel', 'borta-datum ligger före ankomsten.')
# 5. tidslinjens ögonblick och slagens dag inom bokens spann
for o in T['ogonblick']:
    if day(o['datum']) > END[o['bok']] + 2:
        f('tidslinje', o['namn'], 'datum', o['datum'], f"senast {T['bocker'][str(o['bok'])]}", 'tveksamt', f"Ligger efter att bok {o['bok']} slutar.")
for b in B:
    if b.get('dag') and day(b['dag']) > END[b['bok']] + 2:
        f('slag', b['id'], 'dag', b['dag'], f"senast {T['bocker'][str(b['bok'])]}", 'tveksamt', f"Slaget ligger efter att bok {b['bok']} slutar.")
# 6. första bok: händelser och resa ska inte börja före forsta_bok
for c in C:
    fb = c['forsta_bok']
    early = [h for h in c['handelser'] if 0 < h['bok'] < fb]
    if early: f('karaktärer', c['id'], 'forsta_bok', str(fb), str(min(h['bok'] for h in early)), 'tveksamt', 'Det finns händelser i en tidigare bok än forsta_bok.')
    st = R.get(c['id'], {}).get('stopp', [])
    if st and 0 < min(s['bok'] for s in st if s['bok'] > 0 or True) < fb:
        f('resor', c['id'], 'stopp[0].bok', str(min(s['bok'] for s in st)), str(fb), 'tveksamt', 'Resan börjar i en bok före karaktärens forsta_bok.')
# 7. platsernas lägen mot namnen på originalkartan (OCR)
ocr = pathlib.Path('/tmp/ocr_words.tsv')
if ocr.exists():
    words = [(w.lower(), float(x), float(y)) for w, x, y in (l.rstrip('\n').split('\t') for l in open(ocr))]
    for pid, p in P.items():
        x, y = float(p['x']) * 8000, float(p['y']) * 6177
        if x > 8000: continue
        tok = max(p['namn'].replace("'", ' ').split(), key=len).lower()
        if len(tok) < 5: continue
        hits = [(wx, wy) for w, wx, wy in words if tok in w]
        if hits and min(math.hypot(wx - x, wy - y) for wx, wy in hits) > 400:
            wx, wy = min(hits, key=lambda h: math.hypot(h[0] - x, h[1] - y))
            f('platser', pid, 'x,y', f"{x:.0f},{y:.0f}", f"nära namnet på kartan, ca {wx:.0f},{wy:.0f}", 'tveksamt',
              f"Namnet '{tok}' står på originalkartan {math.hypot(wx - x, wy - y):.0f} px från markeringen.")
out = root / 'out/granskning/steg0.json'
json.dump(F, open(out, 'w'), ensure_ascii=False, indent=1)
from collections import Counter
print(len(F), 'fynd', Counter(x['allvar'] for x in F), Counter(x['omrade'] for x in F))
