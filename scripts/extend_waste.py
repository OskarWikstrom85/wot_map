"""Förlänger kartans masker österut med Aielöknen (den målade kartan).

Källkartan slutar vid Spine of the World. Öster om den ritar vi själva:
Mountains of Dhoom och Blighten i norr, öknen med Chaendaer och Rhuidean,
Termools sanddyner och Sea of Storms i söder, Great Rift och Cliffs of Dawn
i öster och en skymt av Shara längst ut. Geografin bygger på böckerna och
wikins rekonstruktioner; den är ungefärlig.

Läser out/masks_west/ (källkartans masker) och skriver out/masks/ i ny bredd.
"""
import numpy as np, cv2
from scipy import ndimage as ndi

ROOT = '/home/claude/wot-map/out/'
SRC, OUT = ROOT + 'masks_west/', ROOT + 'masks/'
LAND, FOREST, MTN_OUT, MTN_IN, WATER, BLIGHT, DESERT, DUNES, RIFT = range(9)
EXT = 3200                                   # ny remsa i källpixlar
cls0 = np.load(SRC + 'cls.npy'); H, W0 = cls0.shape; W = W0 + EXT
rng = np.random.default_rng(7)

def noise1(n, scale, seed):
    """Mjukt 1D-brus i [-1, 1] med ungefärlig våglängd 'scale'."""
    k = max(2, n // scale + 3)
    v = np.random.default_rng(seed).uniform(-1, 1, k).astype(np.float32)
    return cv2.resize(v[None, :], (n, 1), interpolation=cv2.INTER_CUBIC)[0]

def noise2(h, w, scale, seed):
    v = np.random.default_rng(seed).uniform(-1, 1, (h // scale + 3, w // scale + 3)).astype(np.float32)
    return cv2.resize(v, (w, h), interpolation=cv2.INTER_CUBIC)

cls = np.zeros((H, W), np.int8); cls[:, :W0] = cls0
X = np.arange(W0, W)                                  # remsans kolumner
xs = X - W0
strip = np.full((H, EXT), DESERT, np.int8)
yy = np.arange(H)[:, None]
n2 = noise2(H, EXT, 90, 11) * .6 + noise2(H, EXT, 30, 12) * .4

# --- norr: Mountains of Dhoom med Blighten bakom ---
yc = 770 - xs * .035 + noise1(EXT, 400, 1) * 60
hw = 120 + noise1(EXT, 300, 2) * 35
d = np.abs(yy - yc[None, :]) - hw[None, :] - n2 * 25
strip[yy < (yc - hw)[None, :] + n2 * 25] = BLIGHT
strip[d < 0] = MTN_OUT
strip[d < -45] = MTN_IN
# smal Blight-rand söder om bergen nära källkartan (som vid kanten), som tonar ut österut
fade = np.clip(1 - xs / 500, 0, 1)
south = (yy > (yc + hw)[None, :]) & (yy < (yc + hw + 150 * fade)[None, :] + n2 * 20) & (d >= 0)
strip[south] = BLIGHT

# --- söder: Termool och kusten ---
ty = 4520 + noise1(EXT, 500, 3) * 120 + xs * .02
coast = 5207 + np.minimum(xs, 900) * .12 + noise1(EXT, 260, 4) * 70 + noise1(EXT, 60, 5) * 18
n3 = noise2(H, EXT, 260, 13)
strip[(yy > ty[None, :] + n2 * 60 + n3 * 160) & (strip == DESERT)] = DUNES
strip[yy > coast[None, :] + n2 * 10] = WATER

# --- öster: Great Rift, Cliffs of Dawn och Shara ---
yr = np.arange(H)
xr = 2700 + noise1(H, 500, 6) * 70 + noise1(H, 120, 7) * 22            # sprickans x i remsan
rift_ok = (yr > 980) & (yr < 5050)
cliff_w = 230 + noise1(H, 400, 8) * 50
for y in np.nonzero(rift_ok)[0]:
    x0 = int(xr[y]); row = strip[y]
    tap = float(np.clip(min(y - 980, 5050 - y) / 350, 0, 1)) ** .7
    rw = max(2, int(8 * tap))
    row[max(0, x0 - rw):x0 + rw] = RIFT
    c0, c1 = x0 + 20, int(x0 + 20 + cliff_w[y] * tap)
    row[c0:min(EXT, c1)] = MTN_OUT
    row[c0 + 40:min(EXT, c1 - 40)] = MTN_IN
    if tap > .5:
        row[min(EXT, c1):] = np.where(row[min(EXT, c1):] == DESERT, LAND, row[min(EXT, c1):])   # Shara
    wk = int(60 * tap)
    row[x0 - rw - wk:x0 - rw] = np.where(row[x0 - rw - wk:x0 - rw] == DESERT, MTN_OUT, row[x0 - rw - wk:x0 - rw])  # brant västkant

# --- Spine of the World fortsätter in i remsan där bergen når kanten ---
edge = cls0[:, -1]
emtn = np.isin(edge, (MTN_OUT, MTN_IN)).astype(np.float32)
reach = cv2.GaussianBlur(emtn[:, None], (1, 0), sigmaX=1, sigmaY=12)[:, 0] * (110 + noise1(H, 150, 9) * 70 + noise1(H, 40, 10) * 25)
xx = np.arange(EXT)[None, :]
lim = reach[:, None] + n2 * 45
sp = (xx < lim) & (reach[:, None] > 8) & np.isin(strip, (DESERT, DUNES))
strip[sp] = MTN_OUT
strip[sp & (xx < lim - 55)] = MTN_IN

# --- bergskedjor och mesor i öknen ---
def ridge(a, b, w, seed):
    """Bergskedja längs en slingrande linje från a till b."""
    (x1, y1), (x2, y2) = a, b
    g = np.random.default_rng(seed)
    n = 9; t = np.linspace(0, 1, n)
    L = np.hypot(x2 - x1, y2 - y1); nx, ny = -(y2 - y1) / L, (x2 - x1) / L
    off = np.cumsum(g.normal(0, L * .05, n)); off -= np.linspace(off[0], off[-1], n)
    pts = np.stack([x1 + (x2 - x1) * t + nx * off - W0, y1 + (y2 - y1) * t + ny * off], 1).astype(np.int32)
    m = np.zeros((H, EXT), np.uint8)
    for i in range(n - 1):
        wi = int(w * (.55 + .45 * np.sin(np.pi * (i + .5) / (n - 1))) * (1 + g.uniform(-.2, .2)))
        cv2.line(m, tuple(pts[i]), tuple(pts[i + 1]), 1, max(8, int(wi * 1.8)))
    m = (cv2.GaussianBlur(m.astype(np.float32), (0, 0), w * .3) + n2 * .35) > .5
    strip[m & np.isin(strip, (DESERT, DUNES))] = MTN_OUT
    mi = cv2.erode(m.astype(np.uint8), np.ones((int(w * .5), int(w * .5)), np.uint8)) > 0
    strip[mi & (strip == MTN_OUT)] = MTN_IN
for i, (a, b, w) in enumerate([((8300, 1450), (8900, 1950), 110), ((9380, 1300), (10050, 1700), 120), ((9600, 3600), (10250, 3300), 110),
                ((8850, 4100), (9500, 4320), 90), ((10000, 2250), (10250, 2800), 90), ((9200, 2150), (9450, 2450), 70),
                ((8250, 3900), (8500, 4380), 80)]):
    ridge(a, b, w, 100 + i)
# Chaendaer: bergsring kring Rhuidean-dalen, med en öppning mot öster
cx, cy = 8640 - W0, 3380
Y, Xg = np.mgrid[0:H, 0:EXT]
ang = np.arctan2(Y - cy, Xg - cx)
rad = np.hypot(Xg - cx, Y - cy)
ring = (np.abs(rad - (150 + 18 * np.sin(3 * ang) + n2 * 20)) < 42) & ~((np.abs(ang - .15) < .38) & (rad > 100))
strip[ring & (strip != WATER)] = MTN_OUT
strip[(np.abs(rad - 150) < 16) & ring] = MTN_IN
# Chaendaer-toppen nordväst om dalen
strip[np.hypot(Xg - (8545 - W0), Y - 3255) < 55] = MTN_IN
# mesor
for i in range(26):
    px, py = rng.integers(150, 2500), rng.integers(1200, 4400)
    if strip[py, px] != DESERT or np.hypot(px - cx, py - cy) < 320: continue
    r = rng.integers(14, 30)
    blob = (np.hypot(Xg - px, Y - py) + n2 * 12) < r
    strip[blob & (strip == DESERT)] = MTN_OUT
del Y, Xg, ang, rad, ring
# sjön i Rhuidean-dalen (uppstod 999 NE)
lake_s = np.zeros((H, EXT), bool)
ly, lx = np.ogrid[0:H, 0:EXT]
lake_s |= ((lx - (cx + 35)) / 46.0) ** 2 + ((ly - (cy + 8)) / 30.0) ** 2 + 0 < 1
strip[lake_s] = WATER

cls[:, W0:] = strip
# --- remsan öster om Spine i källkartan blir också öken, så skarven inte syns ---
mtn0 = np.isin(cls0, (MTN_OUT, MTN_IN))
for y in range(H):
    seg = mtn0[y, 7300:]
    idx = np.nonzero(seg)[0]
    if not len(idx) or cls0[y, -1] == WATER: continue
    xm = 7300 + idx[-1]
    row = cls[y, xm + 1:W0]
    row[row == LAND] = DESERT
# Termool ända fram till Spine/kusten i sydost
low = (yy[:, 0] > 4400)
for y in np.nonzero(low)[0]:
    row = cls[y, 7600:W0]
    row[(row == DESERT)] = DUNES if y > ty[0] + n2[y, 0] * 60 + n3[y, 0] * 160 else DESERT

np.save(OUT + 'cls.npy', cls)
# --- övriga masker ---
river = np.zeros((H, W), bool); river[:, :W0] = np.load(SRC + 'river.npy'); np.save(OUT + 'river.npy', river)
water = cls == WATER
lake = np.zeros((H, W), bool); lake[:, :W0] = np.load(SRC + 'lake.npy'); lake[:, W0:] = lake_s
np.save(OUT + 'lake.npy', lake)
sea = water & ~lake
np.save(OUT + 'sea_dist.npy', np.clip(ndi.distance_transform_edt(sea), 0, 255).astype(np.uint8))
# bergshöjd: samma formel som prepare_masks, räknad på remsan + överlapp
x0 = W0 - 600
sub = cls[:, x0:]
mtn = (sub == MTN_OUT) | (sub == MTN_IN)
d_ridge = ndi.distance_transform_edt(sub != MTN_IN).astype(np.float32)
ridge_h = np.where(mtn, np.exp(-d_ridge / 9.0), 0).astype(np.float32)
dist = ndi.distance_transform_edt(mtn).astype(np.float32)
local_max = cv2.dilate(dist, np.ones((61, 61), np.uint8))
spine = np.where(mtn, dist / (local_max + 1e-3), 0)
bsub = (np.maximum(ridge_h, .5 * spine) * np.clip(dist / 6, 0, 1) ** .5).astype(np.float16)
base = np.zeros((H, W), np.float16); base[:, :W0] = np.load(SRC + 'base.npy'); base[:, W0:] = bsub[:, 600:]
np.save(OUT + 'base.npy', base)
lab, n = ndi.label(mtn[:, 600:])
anc = np.array(ndi.maximum_position(bsub[:, 600:].astype(np.float32), lab, np.arange(1, n + 1)), np.int32).reshape(-1, 2)
anc[:, 1] += W0
anchors = np.concatenate([np.load(SRC + 'anchors.npy'), anc])
np.save(OUT + 'anchors.npy', anchors)
nat = np.load(SRC + 'nations.npy'); nat2 = np.zeros((nat.shape[0], W // 2), nat.dtype); nat2[:, :nat.shape[1]] = nat
np.save(OUT + 'nations.npy', nat2)
pal = np.array([[200, 220, 170], [40, 110, 30], [220, 170, 130], [150, 90, 50], [120, 170, 230], [230, 200, 120], [226, 190, 120], [240, 214, 150], [40, 20, 10]], np.uint8)
from PIL import Image
Image.fromarray(pal[cls]).resize((W // 8, H // 8), Image.NEAREST).save(OUT + 'preview.png')
print('klar', cls.shape, len(anchors), 'ankare')
