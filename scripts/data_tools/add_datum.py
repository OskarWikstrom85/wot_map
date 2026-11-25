"""Tidslinjen: datum för varje resestopp, slagens datum och nyckelögonblick.

Datum skrivs som ÅÅÅÅ-MM-DD i en gregoriansk motsvarighet där året är NE-året
(som wikins kronologi: Winternight = 998-03-23, Aine 8). Taisham 1 (nyår) = 22 dec.
Källa: wikins årssidor 998 NE och 999 NE samt 1000 NE fram till Knife of Dreams.
Bok 12–14 saknar kronologi; de datumen är uppskattade och märks "osaker".
Stopp i bok 0 (New Spring) ingår inte i tidslinjen och får inget datum.
"""
import json, pathlib
root = pathlib.Path(__file__).resolve().parents[2]
R = json.load(open(root / 'data/resor.json'))

def stop(cid, plats, bok):
    for s in R[cid]['stopp']:
        if s['plats'] == plats and s['bok'] == bok: return s
    raise KeyError((cid, plats, bok))

# ---- rättelser som kronologin visade ----
# Rand: Fain sårar honom i Cairhien (9 jan 1000) före Illian och Shadar Logoth (11 jan)
st = R['rand']['stopp']
c7 = stop('rand', 'cairhien', 7); st.remove(c7); st.insert(st.index(stop('rand', 'illian', 7)), c7)
# Mat och Thom möts i Tar Valon, inte i Caemlyn
stop('mat', 'aringill', 3)['text'] = "Lämnar tornet med Thom på båt nedför Erinin, med Elaynes brev till drottning Morgase."
stop('mat', 'caemlyn', 3)['text'] = "Lämnar brevet till Morgase och avslöjar en komplott mot Elayne."
th = R['thom']['stopp']
if not any(x['plats'] == 'tar-valon' and x['bok'] == 3 for x in th):
  i = th.index(stop('thom', 'caemlyn', 3))
  th[i:i + 1] = [
 {'plats': 'tar-valon', 'bok': 3, 'satt': 'land', 'text': "Möter Mat i Tar Valon och följer med honom."},
 {'plats': 'caemlyn', 'bok': 3, 'satt': 'flod', 'via': ['aringill'], 'text': "Nedför Erinin till Aringill och vidare till Caemlyn med Mat."},
]
# Tam kommer till Malden med Grady från Two Rivers, inte med Perrin till Ghealdan
R['tam']['stopp'] = [s for s in R['tam']['stopp'] if s['plats'] != 'abila']
m = stop('tam', 'malden', 11); m['satt'] = 'portal'  # (idempotent); m['text'] = "Kommer med Grady och förstärkningar från Two Rivers och leder bågskyttarna vid Malden."
# Caemlyn faller i bok 14
for t in R['talmanes']['stopp']:
    if t['plats'] == 'caemlyn' and t['bok'] == 13: t['bok'] = 14

D = {  # datum per stopp i ordning; None = bok 0. "?" efter datum = uppskattat. "|borta:DATUM" = försvinner från kartan
 'mat': "998-03-23 998-03-24 998-03-30 998-04-03 998-04-16 998-04-27 998-05-02 998-05-07 998-05-09 998-05-11 998-07-01 998-11-21 999-04-08 999-04-27 999-05-03 999-05-14 999-06-08 999-08-27 999-09-10 999-09-21 999-10-15? 999-11-27 999-12-04 1000-04-08 1000-06-05? 1000-06-20? 1000-07-01? 1000-07-08? 1000-07-14? 1000-07-20?",
 'rand': "998-03-23 998-03-24 998-03-30 998-04-03 998-04-16 998-04-27 998-05-02 998-05-07 998-05-09 998-05-11 998-06-25 998-11-21 999-05-19 999-06-08 999-06-28 999-07-01 999-08-27 999-09-10 999-09-21 999-10-28 999-12-05 1000-01-01 1000-01-09 1000-01-11 1000-01-12 1000-02-22 1000-03-08 1000-05-10? 1000-05-25? 1000-06-01? 1000-06-05? 1000-06-25? 1000-07-10? 1000-07-13?",
 'perrin': "998-03-23 998-03-24 998-03-30 998-04-03 998-05-05 998-05-07 998-05-09 998-05-11 998-07-01 998-11-21 999-04-19 999-05-02 999-05-18 999-06-13 999-12-05 1000-01-01 1000-01-10 1000-04-10 1000-06-15? 1000-07-06? 1000-07-12? 1000-07-20?",
 'egwene': "998-03-23 998-03-24 998-03-30 998-04-03 998-05-05 998-05-07 998-05-09 998-06-20 998-09-24 999-04-08 999-05-14 999-06-08 999-06-28 999-09-09 999-11-23 1000-01-27 1000-02-15? 1000-07-10?|borta:1000-07-20",
 'nynaeve': "998-03-23 998-03-31 998-04-03 998-04-17 998-05-05 998-05-07 998-05-09 998-06-20 998-09-24 999-04-08 999-05-14 999-06-18 999-09-17 999-12-04 1000-02-22 1000-03-08 1000-06-20? 1000-07-13?",
 'elayne': "998-05-05 998-05-28 998-09-24 999-04-08 999-05-14 999-06-18 999-09-17 999-12-04 1000-02-08 1000-07-06? 1000-07-12?",
 'moiraine': "None None 998-03-20 998-03-30 998-04-03 998-04-17 998-05-05 998-05-07 998-05-09 998-05-11 998-11-26 999-04-19 999-05-02 999-05-18 999-06-08 999-09-10|borta:999-09-21 1000-07-01? 1000-07-10? 1000-07-13?",
 'lan': "None None 998-03-20 998-03-30 998-04-03 998-04-17 998-05-05 998-05-07 998-05-09 998-05-11 998-11-26 999-04-19 999-05-02 999-05-18 999-06-08 999-09-10 1000-01-05 1000-02-22 1000-03-08 1000-04-07 1000-07-03? 1000-07-15?",
 'min': "998-03-31 998-06-25 998-09-24 999-05-22 999-09-01 999-11-27 1000-01-01 1000-02-22 1000-03-08 1000-05-10? 1000-07-12?",
 'thom': "998-03-23 998-03-24 998-03-30 998-04-03 998-04-16 998-06-25 999-04-11 999-05-03 999-05-14 999-06-18 999-09-17 999-12-04 1000-04-08 1000-06-20? 1000-07-01? 1000-07-13?",
 'aviendha': "999-05-19 999-06-08 999-06-28 999-07-01 999-09-10 999-09-21 999-12-04 1000-02-08 1000-06-10? 1000-07-15?",
 'faile': "999-04-19 999-05-02 999-05-18 999-06-13 999-12-05 1000-01-10 1000-02-20 1000-06-15? 1000-07-12?",
 'siuan': "None 998-06-09 998-06-20 999-08-16 999-09-01 1000-02-15? 1000-07-12?|borta:1000-07-18",
 'gawyn': "998-05-05 998-05-28 1000-01-01 1000-05-15? 1000-07-12?|borta:1000-07-18",
 'galad': "998-05-05 998-05-28 999-07-15? 1000-06-15? 1000-07-05? 1000-07-12?",
 'tam': "None 998-03-23 1000-04-10 1000-05-27? 1000-07-08? 1000-07-12?",
 'loial': "998-03-01? 998-04-28 998-05-07 998-05-09 998-05-11 998-06-25 998-11-21 999-04-19 999-05-02 999-05-18 999-06-13 1000-01-01 1000-06-20? 1000-07-06? 1000-07-12?",
 'verin': "998-06-09 998-07-01 998-11-21 999-04-08 999-06-14? 1000-01-01 1000-05-20?|borta:1000-05-21",
 'birgitte': "998-11-21|borta:998-11-22 999-09-08 999-12-04 1000-02-08 1000-07-12?",
 'tuon': "1000-02-14 1000-04-08 1000-04-27 1000-05-28? 1000-07-08? 1000-07-14?",
 'ishamael': "998-11-21 999-05-19|borta:999-05-20 1000-01-11 1000-07-13?|borta:1000-07-22",
 'lanfear': "999-06-07 999-09-21|borta:999-09-22 1000-03-08 1000-07-15?|borta:1000-07-16",
 'demandred': "999-09-22 1000-07-12?|borta:1000-07-18",
 'rahvin': "999-03-10|borta:999-09-21",
 'sammael': "999-05-02 1000-01-11|borta:1000-01-12",
 'graendal': "1000-05-25? 1000-07-12? 1000-07-15?",
 'fain': "998-03-23 998-04-05 998-05-11 998-07-03 999-06-14? 1000-01-09 1000-07-15?|borta:1000-07-16",
 'taim': "999-10-28 1000-01-01 1000-01-02 1000-07-15?|borta:1000-07-16",
 'bryne': "None 998-05-05 999-08-17 999-09-01 1000-02-15? 1000-07-10?",
 'bashere': "999-09-21 1000-01-01 1000-06-05? 1000-07-06? 1000-07-12?|borta:1000-07-18",
 'ituralde': "1000-03-25? 1000-05-20? 1000-07-13?",
 'agelmar': "None 998-05-07 1000-07-05? 1000-07-12?",
 'niall': "None 998-06-01?|borta:1000-01-01",
 'talmanes': "999-09-10 999-10-15? 999-11-27 1000-06-05? 1000-07-05? 1000-07-12?",
 'logain': "998-05-05 998-05-28 999-08-16 999-09-01 1000-01-20? 1000-07-14?",
 'rhuarc': "999-05-19 999-06-08 999-06-28 999-07-01 999-09-10 1000-01-01 1000-07-15?|borta:1000-07-16",
 'morgase': "998-05-05 999-10-01? 1000-01-15 1000-02-20 1000-06-10?",
 'elaida': "998-05-05 998-05-28|borta:1000-05-21",
 'cadsuane': "1000-01-04 1000-02-23 1000-03-08 1000-05-15? 1000-07-13?",
 'berelain': "999-05-20 999-12-05 1000-01-10 1000-04-10 1000-06-15?",
}
for cid, spec in D.items():
    st = R[cid]['stopp']; toks = spec.split()
    assert len(toks) == len(st), (cid, len(toks), len(st))
    prev = (0, 0, 0)
    for s, tok in zip(st, toks):
        for k in ('datum', 'osaker', 'borta'): s.pop(k, None)
        if tok == 'None':
            assert s['bok'] == 0, (cid, s['plats']); continue
        tok, _, borta = tok.partition('|borta:')
        if tok.endswith('?'): s['osaker'] = True; tok = tok[:-1]
        key = tuple(map(int, tok.split('-')))
        assert key >= prev, (cid, s['plats'], tok, prev); prev = key
        s['datum'] = tok
        if borta: s['borta'] = borta
# nyckeln måste stå först i varje stopp för läsbarhet: plats, bok, datum, ...
for cid, r in R.items():
    if cid.startswith('_'): continue
    r['stopp'] = [{k: s[k] for k in ['plats', 'bok', 'datum', 'osaker', 'borta', 'satt', 'via', 'text'] if k in s} for s in r['stopp']]
R['_om'] = R['_om'].split(' Tidslinjen:')[0] + " Tidslinjen: datum (ÅÅÅÅ-MM-DD, NE-år; Winternight = 998-03-23) är när karaktären kommer dit, osaker = uppskattat datum, borta = datum då karaktären lämnar kartan (död eller försvunnen)."
json.dump(R, open(root / 'data/resor.json', 'w'), ensure_ascii=False, indent=1)

# ---- slagens datum ----
bp = root / 'data/battles.json'; B = json.load(open(bp))
BD = {'falme': '998-11-21', 'stone-of-tear': '999-05-19', 'two-rivers': '999-06-30', 'cairhien': '999-09-10',
      'dumais-wells': '1000-01-01', 'malden': '1000-04-10', 'caemlyn': '1000-04-20?', 'tar-valon': '1000-05-21?',
      'maradon': '1000-06-05?', 'caemlyn-fall': '1000-07-05?', 'merrilor': '1000-07-18?', 'shayol-ghul': '1000-07-15?'}
for b in B:
    if b['id'] in BD:
        d = BD[b['id']]; b['dag'] = d.rstrip('?')
        if d.endswith('?'): b['dag_osaker'] = True
json.dump(B, open(bp, 'w'), ensure_ascii=False, indent=1)

# ---- nyckelögonblick och böckernas slut ----
M = [
 ('998-03-23', 'Winternight', 1), ('998-04-03', 'Shadar Logoth', 1), ('998-04-16', 'Thom offrar sig i Whitebridge', 1),
 ('998-05-05', 'Rand möter Elayne och Morgase', 1), ('998-05-09', 'Eye of the World', 1),
 ('998-06-09', 'Fal Dara anfalls, hornet stjäls', 2), ('998-06-17', 'Rand genom portalstenen', 2), ('998-06-25', 'Rand i Cairhien', 2),
 ('998-09-24', 'Egwene blir damane i Falme', 2), ('998-11-21', 'Slaget vid Falme', 2),
 ('999-03-13', 'Rand ger sig av ensam', 3), ('999-04-08', 'Mat helas i Tar Valon', 3), ('999-04-19', 'Perrin befriar Gaul i Remen', 3),
 ('999-05-19', 'Stenen i Tear faller', 3), ('999-06-08', 'Rand går in i Rhuidean', 4), ('999-06-24', 'Siuan avsätts', 4),
 ('999-06-30', 'Two Rivers och Tanchico', 4), ('999-07-01', 'Klanhövdingarna i Alcair Dal', 4),
 ('999-08-13', 'Aiel lämnar Rhuidean', 5), ('999-09-01', 'Rebellerna samlas i Salidar', 5), ('999-09-10', 'Andra slaget om Cairhien', 5),
 ('999-09-21', 'Rahvin dör, Moiraine försvinner', 5), ('999-10-28', 'Svarta tornet grundas', 6), ('999-11-24', 'Egwene blir Amyrlin', 6),
 ('999-12-15', 'Rand tillfångatas', 6), ('1000-01-01', "Dumai's Wells", 6), ('1000-01-09', 'Seanchan tar Ebou Dar', 7),
 ('1000-01-11', 'Illian intas, Sammael dör', 7), ('1000-02-05', 'Rand mot Seanchan med Callandor', 8),
 ('1000-02-08', 'Elayne gör anspråk på tronen', 8), ('1000-02-15', 'Faile rövas bort', 8), ('1000-03-02', 'Mat rövar bort Tuon', 9),
 ('1000-03-08', 'Saidin renas', 9), ('1000-03-30', 'Egwene tillfångatas i Tar Valon', 10), ('1000-04-09', 'Rand förlorar handen', 11),
 ('1000-04-10', 'Slaget vid Malden', 11), ('1000-05-21', 'Seanchans räd mot Vita tornet', 12, True),
 ('1000-05-25', "Natrin's Barrow", 12, True), ('1000-06-01', 'Rand på Dragonmount', 12, True), ('1000-06-05', 'Maradon', 13, True),
 ('1000-07-01', 'Tower of Ghenjei', 13, True), ('1000-07-03', "Lan i Tarwin's Gap", 13, True), ('1000-07-05', 'Caemlyn faller', 14, True),
 ('1000-07-10', 'Mötet vid Merrilor', 14, True), ('1000-07-13', 'Rand går in i Shayol Ghul', 14, True),
 ('1000-07-18', 'Slaget vid Merrilor', 14, True),
]
T = {
 '_om': "Tidslinjens nyckelögonblick och när varje bok slutar (samma datumformat som resorna). osaker = uppskattat.",
 'start': '998-03-20', 'slut': '1000-07-24',
 'bocker': {'1': '998-05-18', '2': '998-11-26', '3': '999-05-20', '4': '999-07-01', '5': '999-09-21', '6': '1000-01-01',
            '7': '1000-01-11', '8': '1000-02-15', '9': '1000-03-08', '10': '1000-03-30', '11': '1000-04-27',
            '12': '1000-06-01', '13': '1000-07-04', '14': '1000-07-24'},
 'ogonblick': [dict(datum=m[0], namn=m[1], bok=m[2], **({'osaker': True} if len(m) > 3 else {})) for m in M],
}
json.dump(T, open(root / 'data/tidslinje.json', 'w'), ensure_ascii=False, indent=1)
print('ok', sum(1 for k, r in R.items() if not k.startswith('_') for s in r['stopp'] if 'datum' in s), 'daterade stopp')
