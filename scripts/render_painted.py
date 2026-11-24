"""Renderar kartlagret "Målat" (inspirerat av den målade fankartan) för ett utsnitt av källkartan.

Källkartan (Whitehead) används bara som *mask*: färgerna tolkas som land, skog,
berg (yttre/inre), vatten och floder. Text, vägar, flaggor och symboler fylls med
närmaste terrängtyp. Sedan målas allt om proceduriellt:
  - berg: höjdkarta av hundratals små toppar längs en ryggrad + skuggning från nordväst
  - skog: enskilda trädkronor som skuggas
  - land: penseldrag och mjuka färgskiftningar i ockra/oliv
  - vatten: blek grågrön yta med mörk strandlinje

Användning: python render_painted.py x0 y0 x1 y1 skala utfil.png
"""
import sys
import numpy as np
import cv2
from scipy import ndimage as ndi
from skimage.morphology import skeletonize
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
SRC = '/mnt/user-data/uploads/5705809a-image.jpg'
x0, y0, x1, y1, S = [int(v) for v in sys.argv[1:6]]
OUT = sys.argv[6]
PAD = 60

# ---------- 1. Tolka källkartan ----------
src = np.asarray(Image.open(SRC).convert('RGB').crop((x0 - PAD, y0 - PAD, x1 + PAD, y1 + PAD))).astype(np.float32)
LAND, FOREST, MTN_OUT, MTN_IN, WATER = range(5)
palette = {
    LAND:    [(204, 228, 180), (196, 228, 180), (204, 236, 180)],
    FOREST:  [(60, 132, 20), (60, 132, 28), (60, 132, 12)],
    MTN_OUT: [(204, 172, 140), (204, 164, 140), (204, 164, 132), (196, 172, 140)],
    MTN_IN:  [(180, 132, 92), (188, 132, 92), (188, 140, 100), (180, 140, 100)],
    WATER:   [(164, 196, 220), (167, 192, 220)],
}
h0, w0 = src.shape[:2]
best = np.full((h0, w0), 1e9, np.float32)
cls = np.full((h0, w0), -1, np.int8)
for k, cols in palette.items():
    for c in cols:
        d = np.sqrt(((src - np.array(c, np.float32)) ** 2).sum(-1))
        bt = d < best
        best[bt] = d[bt]; cls[bt] = k
known = best < 28
# små fläckar (flaggor, symboler) räknas inte som terräng
for k, minsize in [(MTN_OUT, 900), (MTN_IN, 300), (WATER, 400), (FOREST, 150)]:
    lab, n = ndi.label(known & (cls == k))
    if n:
        sizes = ndi.sum(np.ones_like(lab), lab, np.arange(1, n + 1))
        known &= ~np.isin(lab, np.nonzero(sizes < minsize)[0] + 1)
# fyll okända pixlar: helst med närmaste icke-land (så text/vägar inte klyver berg och skogar)
_, (iy, ix) = ndi.distance_transform_edt(~known, return_indices=True)
nonland = known & (cls != LAND)
dnl, (jy, jx) = ndi.distance_transform_edt(~nonland, return_indices=True)
fill = np.where(dnl <= 7, cls[jy, jx], cls[iy, ix])
cls = np.where(known, cls, fill)
# stäng smala glipor (vägar, etiketter) som klyver berg och skogar
disk = lambda r_: (np.hypot(*np.mgrid[-r_:r_ + 1, -r_:r_ + 1]) <= r_)
for k in (MTN_OUT, FOREST):
    m = (cls == k) | ((cls == MTN_IN) if k == MTN_OUT else False)
    closed = ndi.binary_closing(np.pad(m, 12, mode='edge'), structure=disk(11))[12:-12, 12:-12]
    cls[closed & (cls == LAND)] = k

r, g, b = src[..., 0], src[..., 1], src[..., 2]
river = (b > g + 5) & (b > r + 25) & ~ndi.binary_dilation(cls == WATER, iterations=6)
river = ndi.binary_closing(ndi.binary_dilation(river), structure=np.ones((5, 5)))
lab, n = ndi.label(river)
if n:
    sizes = ndi.sum(np.ones_like(lab), lab, np.arange(1, n + 1))
    river &= np.isin(lab, np.nonzero(sizes >= 60)[0] + 1)

# ---------- 2. Brus och hjälpfunktioner ----------
H, W = h0 * S, w0 * S

def vnoise(period, seed):
    gen = np.random.default_rng(seed)
    sh, sw = H // period + 4, W // period + 4
    small = gen.random((sh, sw)).astype(np.float32)
    big = cv2.resize(small, (sw * period, sh * period), interpolation=cv2.INTER_CUBIC)
    return np.clip(big[period:period + H, period:period + W], 0, 1)

def fbm(period, octaves, seed, gain=0.5):
    tot, amp, norm = 0, 1.0, 0
    for o in range(octaves):
        tot = tot + amp * vnoise(max(2, int(period / 2 ** o)), seed + o); norm += amp; amp *= gain
    return tot / norm

def blur(a, s):
    return cv2.GaussianBlur(a, (0, 0), s)

def streaks(angle_deg, length, seed):
    n = blur(np.random.default_rng(seed).random((H, W)).astype(np.float32), 1.0 * S)
    k = np.zeros((length, length), np.float32); k[length // 2, :] = 1
    M = cv2.getRotationMatrix2D((length / 2 - .5, length / 2 - .5), angle_deg, 1)
    k = cv2.warpAffine(k, M, (length, length)); k /= k.sum()
    s = cv2.filter2D(n, -1, k)
    return (s - s.mean()) / (s.std() + 1e-6)

def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)

def hillshade(hm, az=315, alt=35):
    dy, dx = np.gradient(hm)
    a, e = np.radians(az), np.radians(alt)
    lx, ly, lz = np.cos(e) * np.sin(a), -np.cos(e) * np.cos(a), np.sin(e)
    return np.clip((-dx * lx - dy * ly + lz) / np.sqrt(dx ** 2 + dy ** 2 + 1), 0, 1)

def stamp(field, pts_y, pts_x, radii, heights, profile):
    """Lägg ut små former (toppar, trädkronor) och behåll den högsta i varje pixel."""
    cache = {}
    for y, x, rad, hgt in zip(pts_y, pts_x, radii, heights):
        rad = int(rad)
        if rad not in cache:
            yy, xx = np.mgrid[-rad:rad + 1, -rad:rad + 1].astype(np.float32)
            cache[rad] = profile(np.sqrt(xx ** 2 + yy ** 2) / rad, xx / rad, yy / rad)
        k = cache[rad] * hgt
        ya, xa = y - rad, x - rad
        yb, xb = ya + k.shape[0], xa + k.shape[1]
        if ya < 0 or xa < 0 or yb > H or xb > W:
            continue
        np.maximum(field[ya:yb, xa:xb], k, out=field[ya:yb, xa:xb])

def sample_points(density, spacing, seed):
    """Ungefär jämnt utspridda punkter (jitter i rutnät), tätare där density är hög."""
    gen = np.random.default_rng(seed)
    gy_, gx_ = np.mgrid[spacing // 2:H:spacing, spacing // 2:W:spacing]
    gy_ = (gy_ + gen.uniform(-.5, .5, gy_.shape) * spacing).astype(int).clip(0, H - 1)
    gx_ = (gx_ + gen.uniform(-.5, .5, gx_.shape) * spacing).astype(int).clip(0, W - 1)
    keep = gen.random(gy_.shape) < density[gy_, gx_]
    return gy_[keep], gx_[keep]

# ---------- 3. Masker i full upplösning med organiska kanter ----------
warp_x = (fbm(36 * S, 3, 1) - .5) * 8 * S
warp_y = (fbm(36 * S, 3, 2) - .5) * 8 * S
gy, gx = np.mgrid[0:H, 0:W].astype(np.float32)

def up(a, sigma=1.4, warp=1.0):
    m = cv2.resize(a.astype(np.float32), (W, H), interpolation=cv2.INTER_CUBIC)
    m = blur(m, sigma * S)
    return cv2.remap(m, gx + warp_x * warp, gy + warp_y * warp, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

water = up(cls == WATER) > .5
forest = (up(cls == FOREST) > .5) & ~water
mtn_mask = (cls == MTN_OUT) | (cls == MTN_IN)

# bergens höjd: de mörka inre stråken i källkartan är bergskammarna
inner = cls == MTN_IN
d_ridge = ndi.distance_transform_edt(~inner)
ridge = np.where(mtn_mask, np.exp(-d_ridge / 9.0), 0)
dist = ndi.distance_transform_edt(mtn_mask)
spine = np.where(mtn_mask, dist / (ndi.grey_dilation(dist, size=(61, 61)) + 1e-3), 0)
base1 = np.maximum(ridge, .5 * spine) * np.clip(dist / 6, 0, 1) ** .5
base = np.clip(up(base1, 1.6, .8), 0, 1)
base *= .8 + .4 * fbm(80 * S, 2, 5)

# ---------- 4. Terrängrelief för landet ----------
land_relief = hillshade(blur(base, 8 * S) * 6 + fbm(70 * S, 3, 16) * 1.5)

# ---------- 5. Land ----------
def C(*rgb): return np.array(rgb, np.float32) / 255

lowf = fbm(180 * S, 3, 21)
midf = fbm(45 * S, 3, 22)
st = .75 * streaks(32, 21 * S, 23) + .25 * streaks(-55, 9 * S, 24)
ochre, olive, pale, umber = C(146, 126, 62), C(112, 106, 52), C(168, 158, 102), C(80, 70, 38)
t = smoothstep(.3, .7, lowf)[..., None]
img = ochre * (1 - t) + olive * t
img = img * (1 - .1 * smoothstep(.45, .8, midf)[..., None]) + pale * (.12 * smoothstep(.55, .2, midf)[..., None])
img *= (1 + .055 * st)[..., None]
img *= (.9 + .16 * land_relief)[..., None]

# mörk penseldragen skuggzon kring bergen, förskjuten åt sydost
mfield = np.clip(up(mtn_mask, 2.0, .8), 0, 1)
halo = blur(mfield, 16 * S)
halo_se = blur(np.roll(np.roll(mfield, 14 * S, 0), 10 * S, 1), 20 * S)
dark_amt = np.clip(.42 * halo + .3 * halo_se, 0, .6) * (1 + .25 * st)
img = img * (1 - dark_amt[..., None]) + umber * (.35 * dark_amt[..., None])

# ---------- 6. Bergsfoten: mörk, penseldragen grund under topparna ----------
M = smoothstep(.02, .25, base)[..., None]
foot = img * (.45 + .1 * st[..., None]) * (1 - .35 * base[..., None]) + C(60, 50, 30) * .2
img = img * (1 - M) + foot * M

# ---------- 7. Skog ----------
fsoft = blur(forest.astype(np.float32), 1.2 * S)
crowns = np.zeros((H, W), np.float32)
ty, tx = sample_points(np.clip(fsoft * 1.4, 0, 1), 5 * S, 31)
gen = np.random.default_rng(32)
trad = (3 * S + gen.integers(0, 2 * S + 1, len(ty))).astype(int)

def dome(r_, xx, yy):
    return np.sqrt(np.clip(1 - r_ ** 2, 0, 1))

stamp(crowns, ty, tx, trad, gen.uniform(.7, 1.0, len(ty)), dome)
fsh = hillshade(crowns * 4 * S)
fsh = np.where(crowns > 0, fsh, .15)
crown_col = (C(22, 28, 14) * (1 - fsh[..., None]) ** 1.3
             + C(92, 96, 46) * fsh[..., None] ** 1.6 + C(50, 56, 26) * .25)
clump = fbm(40 * S, 3, 33)
crown_col *= (.8 + .4 * clump[..., None])
crown_col *= (.88 + .24 * lowf[..., None]) * (1 + .04 * st[..., None])
edge = np.clip(1 - ndi.distance_transform_edt(forest) / (6 * S), 0, 1)[..., None]
crown_col *= 1 - .3 * edge
f_shadow = blur(np.roll(np.roll(fsoft, 5 * S, 0), 4 * S, 1), 4 * S)[..., None]
fm = smoothstep(.25, .75, fsoft)[..., None]
img *= 1 - .4 * f_shadow * (1 - fm)
img = img * (1 - fm) + crown_col * fm

# ---------- 8. Vatten ----------
wm = blur(water.astype(np.float32), .7 * S)[..., None]
dist_in = ndi.distance_transform_edt(water)
wcol = C(180, 186, 160) * (1 + .06 * (fbm(70 * S, 3, 41) - .5))[..., None]
wcol = wcol * (1 - .07 * smoothstep(0, 40 * S, dist_in))[..., None]
img = img * (1 - wm) + wcol * wm
shore = blur(((ndi.distance_transform_edt(~water) <= 1.0 * S) & ~water).astype(np.float32), .6 * S)[..., None]
img = img * (1 - .8 * shore) + C(46, 40, 26) * .8 * shore
glow = blur(((dist_in > 1.2 * S) & (dist_in < 3.2 * S)).astype(np.float32), .7 * S)[..., None]
img = img * (1 - .3 * glow) + C(222, 224, 204) * .3 * glow

# ---------- 9. Floder ----------
skel = skeletonize(river).astype(np.float32)
rv = cv2.resize(skel, (W, H), interpolation=cv2.INTER_LINEAR)
rv = cv2.remap(rv, gx + warp_x * .3, gy + warp_y * .3, cv2.INTER_LINEAR)
rv = np.clip(blur(rv, .8 * S) * 3.2, 0, 1)
rv_edge = np.clip(blur(rv, 1.6 * S) * 1.6 - rv, 0, 1)
rv = rv[..., None] * (1 - M * .8); rv_edge = rv_edge[..., None] * (1 - M * .8)
img *= 1 - .3 * rv_edge
img = img * (1 - .6 * rv) + C(192, 196, 168) * .6 * rv

# ---------- 9b. Bergstoppar: målade spetsiga toppar, ritade bakifrån och fram ----------
def make_peak(seed, W0=96, H0=170):
    """En målad topp: ljus vänstersida, mörk högersida, ränder nedför, mjuk fot."""
    gen = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:H0, 0:W0].astype(np.float32)
    t = (yy - .04 * H0) / (.96 * H0)
    ax = W0 * (.5 + gen.uniform(-.1, .1))
    p_l, p_r = gen.uniform(.5, .7), gen.uniform(.5, .7)                # <1 = rundade axlar
    jit = lambda sd: cv2.resize(np.random.default_rng(sd).normal(0, 1, (12, 1)).astype(np.float32), (1, H0), interpolation=cv2.INTER_CUBIC)[:, 0]
    jl, jr = jit(seed * 7 + 1)[:, None] * .035 * W0, jit(seed * 7 + 2)[:, None] * .035 * W0
    mg = .1 * W0                                                        # marginal mot mallens kant
    te = np.clip(t, 0, 1)                                               # dome-delen ger rund topp
    rnd = gen.uniform(.4, .65)                                          # hur rundad toppen är
    dome = np.sqrt(np.clip(1 - (1 - np.minimum(te, 1)) ** 2, 0, 1))
    wl = .78 * ((1 - rnd) * te ** p_l + rnd * dome) + .22 * smoothstep(.5, 1.0, t)   # utsvängd fot
    wr = .78 * ((1 - rnd) * te ** p_r + rnd * dome) + .22 * smoothstep(.5, 1.0, t)
    xl = np.maximum(ax - wl * (ax - mg) + jl * t, 1)
    xr = np.minimum(ax + wr * (W0 - mg - ax) + jr * t, W0 - 2)
    xc = ax + t * W0 * gen.uniform(-.14, .04)                          # kammen lutar lite åt vänster
    xc = xc + np.sin(t * np.pi * gen.uniform(.6, 1.4)) * W0 * gen.uniform(-.04, .04)
    inside = (xx >= xl) & (xx <= xr) & (t >= 0)
    lit = xx < xc
    u = np.clip((xx - xl) / np.maximum(xc - xl, 1), 0, 1)               # 0 ytterkant .. 1 kam
    v = np.clip((xx - xc) / np.maximum(xr - xc, 1), 0, 1)               # 0 kam .. 1 ytterkant
    n = np.random.default_rng(seed * 7 + 3).random((H0, W0)).astype(np.float32)
    n = cv2.GaussianBlur(n, (0, 0), sigmaX=.9, sigmaY=7)
    n = (n - n.mean()) / (n.std() + 1e-6)                               # ränder nedför sluttningen
    lit_b = np.clip(.35 + .55 * u ** .7 + .35 * (1 - t) - .25 * t, 0, 1.2)
    lit_col = C(118, 100, 58) * (1 - lit_b[..., None]) + C(206, 190, 140) * lit_b[..., None]
    dark_b = np.clip(.12 + .35 * v + .2 * t, 0, 1)
    dark_col = C(38, 31, 19) * (1 - dark_b[..., None]) + C(98, 84, 50) * dark_b[..., None]
    litw = smoothstep(xc + 2.5, xc - 2.5, xx)                           # mjuk övergång vid kammen
    col = lit_col * litw[..., None] + dark_col * (1 - litw[..., None])
    for _ in range(gen.integers(2, 5)):                                 # sekundära åsar
        uk = gen.uniform(.15, .85); w_ = gen.uniform(.03, .06)
        line = np.exp(-((u - uk) / w_) ** 2) * smoothstep(.1, .5, t) * lit
        col = col * (1 - .3 * line[..., None]) + C(70, 60, 38) * .3 * line[..., None]
        vk = gen.uniform(.2, .9)
        line2 = np.exp(-((v - vk) / w_) ** 2) * smoothstep(.1, .5, t) * ~lit
        col = col * (1 - .25 * line2[..., None]) + C(130, 116, 80) * .25 * line2[..., None]
    ridge = np.exp(-((xx - xc) / 1.2) ** 2) * (1 - t) ** 2
    col = col * (1 - .4 * ridge[..., None]) + C(222, 210, 170) * .4 * ridge[..., None]
    col *= (1 + .09 * n)[..., None]
    n2 = cv2.GaussianBlur(np.random.default_rng(seed * 7 + 4).random((H0, W0)).astype(np.float32), (0, 0), 4)
    n2 = (n2 - n2.mean()) / (n2.std() + 1e-6)
    fade = smoothstep(.95, .55, t + .06 * n2) * smoothstep(1.0, .9, t)  # foten tonar ut mjukt
    alpha = cv2.GaussianBlur((inside * fade).astype(np.float32), (0, 0), 1.2)
    return col.astype(np.float32), alpha

templates = [make_peak(s_, 170, 120) for s_ in range(40)]

# var topparna står: tätare och större nära kammen, glesare och mindre ut mot kanterna
gen = np.random.default_rng(51)
pts_y, pts_x = sample_points(smoothstep(.05, .35, base) * .85, 36 * S, 52)   # dubbelt avstånd = 1/4 så tätt
bh = base[pts_y, pts_x]
pw = (np.clip(14 + 52 * bh ** 1.2, 12, 70) * S / 2 * 2 * gen.lognormal(0, .28, len(pts_y))).clip(10 * S, 90 * S).astype(int)
pw = (pw * 1.4).astype(int)
ph = (pw * gen.uniform(.5, .72, len(pts_y))).astype(int)
order = np.argsort(pts_y + ph * .0)                                     # bakifrån och fram
ti = gen.integers(0, len(templates), len(pts_y))
tint = gen.uniform(.82, 1.05, len(pts_y))

# först skuggorna som topparna kastar åt sydost
cover = np.zeros((H, W), np.float32)
placed = []
for i in order:
    w_, h_ = pw[i], ph[i]
    yb, xm = pts_y[i] + int(h_ * .12), pts_x[i]
    ya, xa = yb - h_, xm - w_ // 2
    if ya < 0 or xa < 0 or yb > H or xa + w_ > W:
        continue
    a = cv2.resize(templates[ti[i]][1], (w_, h_), interpolation=cv2.INTER_AREA)
    if (a * water[ya:yb, xa:xa + w_]).sum() > .02 * a.sum():          # inga toppar ute i sjöar
        continue
    placed.append((i, ya, xa, w_, h_))
    np.maximum(cover[ya:yb, xa:xa + w_], a, out=cover[ya:yb, xa:xa + w_])
L = 31 * S
k = np.zeros((L, L), np.float32)
cv2.line(k, (L - 1, L - 1), (0, int(L * .45)), 1, 1)        # drar in täckning från nordväst
k /= k.sum()
shadow = blur(cv2.filter2D(cover, -1, k, anchor=(L - 1, L - 1)), 2 * S)
img *= 1 - (.55 * np.clip(shadow * 1.3, 0, 1))[..., None]

# sedan topparna, bakifrån och fram
for i, ya, xa, w_, h_ in placed:
    col, a = templates[ti[i]]
    col = cv2.resize(col, (w_, h_), interpolation=cv2.INTER_AREA) * tint[i]
    a = cv2.resize(a, (w_, h_), interpolation=cv2.INTER_AREA)[..., None]
    reg = img[ya:ya + h_, xa:xa + w_]
    reg[:] = reg * (1 - a) + col * a

# ---------- 10. Kornighet ----------
img *= (1 + .03 * (np.random.default_rng(5).random((H, W)) - .5))[..., None]

out = np.clip(img[PAD * S:H - PAD * S, PAD * S:W - PAD * S] * 255, 0, 255).astype(np.uint8)
Image.fromarray(out).save(OUT)
print('klar', out.shape, 'toppar:', len(placed))
