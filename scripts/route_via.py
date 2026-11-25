"""Räknar fram hur en resa går mellan två stopp: längs vägar, floder eller hav.

Läser data/resor.json och data/locations.csv och skriver data/rutter.json, där varje
sträcka ("från>till>sätt") får en lista med punkter (x, y som andel av källkartan,
precis som platserna). Hopp (ways, portalsten, portal) får ingen rutt – de ritas som bågar.

Användning:
  python3 scripts/route_via.py          # räkna bara sträckor som saknas
  python3 scripts/route_via.py --alla   # räkna om allt

Kostnadskartan bygger på maskerna (terräng), vägarna ur originalkartan (prickade linjer)
och floderna. Billigast är väg; berg och vatten är dyrt eller omöjligt beroende på sätt.
"""
import csv, json, sys, pathlib
import numpy as np, cv2
from skimage.graph import route_through_array

ROOT = pathlib.Path(__file__).resolve().parent.parent
W0, H0 = 8000, 6177                 # källkartans mått: platsernas x och y är andelar av dessa
F = 2                               # räkna på halv upplösning
LAND, FOREST, MTN_OUT, MTN_IN, WATER, BLIGHT, DESERT, DUNES, RIFT = range(9)
HOPP = {'ways', 'portalsten', 'portal'}
SATT = {'land', 'flod', 'hav'} | HOPP

def grids():
    cls = np.load(ROOT / 'out/masks/cls.npy')[::F, ::F]
    def pool(a):
        a = a.astype(np.uint8)
        h, w = (a.shape[0] // F) * F, (a.shape[1] // F) * F
        p = a[:h, :w].reshape(h // F, F, w // F, F).max((1, 3))
        out = np.zeros(cls.shape, np.uint8); out[:p.shape[0], :p.shape[1]] = p
        return out
    roads = np.zeros(np.load(ROOT / 'out/masks/cls.npy', mmap_mode='r').shape, bool)
    r0 = np.load(ROOT / 'out/masks_west/roads.npy'); roads[:, :r0.shape[1]] = r0
    roads = cv2.dilate(pool(roads), np.ones((3, 3), np.uint8)) > 0
    river = cv2.dilate(pool(np.load(ROOT / 'out/masks/river.npy')), np.ones((3, 3), np.uint8)) > 0
    lake = pool(np.load(ROOT / 'out/masks/lake.npy')) > 0
    return cls, roads, river, lake

def cost_for(satt, cls, roads, river, lake):
    land = np.array([1, 1.8, 4, 9, 400, 2.5, 1.2, 2.5, 1000], np.float32)[cls]
    if satt == 'land':
        c = land.copy(); c[roads & (cls != WATER)] = .25
    elif satt == 'flod':
        c = land * 6; c[cls == WATER] = 2; c[lake] = .3; c[river] = .08
    else:  # hav
        c = np.where(cls == WATER, .3, 60).astype(np.float32); c[river] = 1
    return c

def pull(sub, path):
    """Strängdragning: ersätt trappstegen i 8-grannsvägen med raka linjer där det inte blir dyrare."""
    P = np.array(path, np.float32)                                  # (y, x)
    seg = np.hypot(*np.diff(P, axis=0).T)
    c = sub[P[:, 0].astype(int), P[:, 1].astype(int)]
    cum = np.concatenate([[0], np.cumsum(seg * (c[:-1] + c[1:]) / 2)])
    def line_cost(i, j):
        n = int(max(abs(P[j] - P[i]))) + 1
        ys = np.linspace(P[i, 0], P[j, 0], n).round().astype(int); xs = np.linspace(P[i, 1], P[j, 1], n).round().astype(int)
        cc = sub[ys, xs]
        return np.hypot(*(P[j] - P[i])) * cc.mean(), cc.max()
    out, i, n = [0], 0, len(P)
    while i < n - 1:
        best = i + 1
        for j in range(min(n - 1, i + 600), i + 1, -3):
            lc, mx = line_cost(i, j)
            if mx < 50 and lc <= (cum[j] - cum[i]) * 1.04 + 1:
                best = j; break
        out.append(best); i = best
    return [tuple(P[k]) for k in out]

def route(cost, a, b):
    """a, b i halvupplösta px (x, y). Söker i en ruta runt sträckan för fart."""
    m = 500
    x0, x1 = max(0, min(a[0], b[0]) - m), min(cost.shape[1], max(a[0], b[0]) + m)
    y0, y1 = max(0, min(a[1], b[1]) - m), min(cost.shape[0], max(a[1], b[1]) + m)
    sub = cost[y0:y1, x0:x1]
    path, _ = route_through_array(sub, (a[1] - y0, a[0] - x0), (b[1] - y0, b[0] - x0), fully_connected=True, geometric=True)
    path = pull(sub, path)
    pts = np.array([(x + x0, y + y0) for y, x in path], np.float32).reshape(-1, 1, 2)
    pts = cv2.approxPolyDP(pts, 1.5, False).reshape(-1, 2)
    return [[round(float(x) * F / W0, 5), round(float(y) * F / H0, 5)] for x, y in pts]

def main():
    places = {r['id']: (float(r['x']), float(r['y'])) for r in csv.DictReader(open(ROOT / 'data/locations.csv', encoding='utf-8'))}
    resor = json.load(open(ROOT / 'data/resor.json'))
    fn = ROOT / 'data/rutter.json'
    rutter = {} if '--alla' in sys.argv or not fn.exists() else json.load(open(fn))
    need = []
    for cid, r in resor.items():
        if cid.startswith('_'): continue
        st = r['stopp']
        for prev, s in zip(st, st[1:]):
            if s['satt'] in HOPP: continue
            chain = [prev['plats']] + s.get('via', []) + [s['plats']]
            for a, b in zip(chain, chain[1:]):
                key = f"{a}>{b}>{s['satt']}"
                if key not in rutter and key not in [k for k, *_ in need]: need.append((key, a, b, s['satt']))
    if not need: print('alla sträckor finns redan'); return
    g = grids(); costs = {}
    px = lambda p: (int(places[p][0] * W0 / F), int(places[p][1] * H0 / F))
    for key, a, b, satt in need:
        if satt not in costs: costs[satt] = cost_for(satt, *g)
        rutter[key] = route(costs[satt], px(a), px(b))
        print(f'{key}: {len(rutter[key])} punkter', flush=True)
    json.dump(rutter, open(fn, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(len(rutter), 'sträckor i data/rutter.json')

if __name__ == '__main__':
    main()
