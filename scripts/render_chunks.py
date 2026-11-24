"""Steg 2 för det målade lagret: rendera hela kartan i bitar (sömlöst).

Allt brus och alla slumpval (toppar, trädkronor) hämtas från en hash av den globala
pixel-/rutnätspositionen, så en bit ser likadan ut oavsett vilka grannar den har.
Varje bit renderas med marginal och bara kärnan sparas.

Användning: python render_chunks.py S index_start index_end   (bitarna numreras radvis)
"""
import os, sys, time
import numpy as np
import cv2
from scipy import ndimage as ndi

ROOT = '/home/claude/wot-map/out/'
S = int(sys.argv[1])
CS, P = 1000, 110                      # kärnstorlek och marginal i källpixlar
LAND, FOREST, MTN_OUT, MTN_IN, WATER, BLIGHT = range(6)

cls_all = np.load(ROOT + 'masks/cls.npy', mmap_mode='r')
river_all = np.load(ROOT + 'masks/river.npy', mmap_mode='r')
base_all = np.load(ROOT + 'masks/base.npy', mmap_mode='r')
seadist_all = np.load(ROOT + 'masks/sea_dist.npy', mmap_mode='r')
lake_all = np.load(ROOT + 'masks/lake.npy', mmap_mode='r')
anchors_all = np.load(ROOT + 'masks/anchors.npy')
MH, MW = cls_all.shape
water_all = np.asarray(cls_all == WATER)

# Vattnets stil. OLD_STYLE är den ursprungliga gråolivtonen.
OLD_STYLE = dict(lake=(180, 186, 160), sea_near=(152, 156, 120), sea_far=(66, 68, 44), glow=(222, 224, 204),
                 river=(192, 196, 168), river_alpha=.6, river_edge=.3, river_grow=0)
# Blå stil (nov 2026): dämpat stålblått hav och sjöar, bredare blå floder.
STYLE = dict(lake=(132, 158, 164), sea_near=(110, 140, 148), sea_far=(42, 64, 78), glow=(198, 214, 212),
             river=(84, 124, 144), river_alpha=.88, river_edge=.35, river_grow=1.6)

def C(*rgb): return np.array(rgb, np.float32) / 255

def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)

def blur(a, s):
    return cv2.GaussianBlur(a, (0, 0), s)

def h32(x, y, seed):
    """Deterministisk hash av heltalskoordinater -> uint32."""
    x = (np.asarray(x, np.int64) & 0xffffffff).astype(np.uint32)
    y = (np.asarray(y, np.int64) & 0xffffffff).astype(np.uint32)
    h = x * np.uint32(0x8da6b343) ^ y * np.uint32(0xd8163841) ^ np.uint32((seed * 0x9E3779B1) & 0xffffffff)
    h ^= h >> np.uint32(13); h *= np.uint32(0x5bd1e995); h ^= h >> np.uint32(15)
    h *= np.uint32(0x27d4eb2d); h ^= h >> np.uint32(16)
    return h

def u01(x, y, seed):
    return h32(x, y, seed).astype(np.float64) / 4294967296.0

def hillshade(hm, az=315, alt=35):
    dy, dx = np.gradient(hm)
    a, e = np.radians(az), np.radians(alt)
    lx, ly, lz = np.cos(e) * np.sin(a), -np.cos(e) * np.cos(a), np.sin(e)
    return np.clip((-dx * lx - dy * ly + lz) / np.sqrt(dx ** 2 + dy ** 2 + 1), 0, 1)


# ---------- toppmallar (samma i alla bitar) ----------
def make_peak(seed, W0=170, H0=120):
    gen = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:H0, 0:W0].astype(np.float32)
    t = (yy - .04 * H0) / (.96 * H0)
    ax = W0 * (.5 + gen.uniform(-.1, .1))
    p_l, p_r = gen.uniform(.5, .7), gen.uniform(.5, .7)
    jit = lambda sd: cv2.resize(np.random.default_rng(sd).normal(0, 1, (12, 1)).astype(np.float32), (1, H0), interpolation=cv2.INTER_CUBIC)[:, 0]
    jl, jr = jit(seed * 7 + 1)[:, None] * .035 * W0, jit(seed * 7 + 2)[:, None] * .035 * W0
    mg = .1 * W0
    te = np.clip(t, 0, 1)
    rnd = gen.uniform(.4, .65)
    dome = np.sqrt(np.clip(1 - (1 - np.minimum(te, 1)) ** 2, 0, 1))
    wl = .78 * ((1 - rnd) * te ** p_l + rnd * dome) + .22 * smoothstep(.5, 1.0, t)
    wr = .78 * ((1 - rnd) * te ** p_r + rnd * dome) + .22 * smoothstep(.5, 1.0, t)
    xl = np.maximum(ax - wl * (ax - mg) + jl * t, 1)
    xr = np.minimum(ax + wr * (W0 - mg - ax) + jr * t, W0 - 2)
    xc = ax + t * W0 * gen.uniform(-.14, .04)
    xc = xc + np.sin(t * np.pi * gen.uniform(.6, 1.4)) * W0 * gen.uniform(-.04, .04)
    inside = (xx >= xl) & (xx <= xr) & (t >= 0)
    lit = xx < xc
    u = np.clip((xx - xl) / np.maximum(xc - xl, 1), 0, 1)
    v = np.clip((xx - xc) / np.maximum(xr - xc, 1), 0, 1)
    n = np.random.default_rng(seed * 7 + 3).random((H0, W0)).astype(np.float32)
    n = cv2.GaussianBlur(n, (0, 0), sigmaX=.9, sigmaY=7)
    n = (n - n.mean()) / (n.std() + 1e-6)
    lit_b = np.clip(.35 + .55 * u ** .7 + .35 * (1 - t) - .25 * t, 0, 1.2)
    lit_col = C(118, 100, 58) * (1 - lit_b[..., None]) + C(206, 190, 140) * lit_b[..., None]
    dark_b = np.clip(.12 + .35 * v + .2 * t, 0, 1)
    dark_col = C(38, 31, 19) * (1 - dark_b[..., None]) + C(98, 84, 50) * dark_b[..., None]
    litw = smoothstep(xc + 2.5, xc - 2.5, xx)
    col = lit_col * litw[..., None] + dark_col * (1 - litw[..., None])
    for _ in range(gen.integers(2, 5)):
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
    fade = smoothstep(.95, .55, t + .06 * n2) * smoothstep(1.0, .9, t)
    alpha = cv2.GaussianBlur((inside * fade).astype(np.float32), (0, 0), 1.2)
    return col.astype(np.float32), alpha

TEMPLATES = [make_peak(s_) for s_ in range(40)]


def render_chunk(cx0, cy0):
    x0, y0 = cx0 - P, cy0 - P
    x1, y1 = min(cx0 + CS, MW) + P, min(cy0 + CS, MH) + P
    h0, w0 = y1 - y0, x1 - x0
    H, W = h0 * S, w0 * S
    OX, OY = x0 * S, y0 * S                                    # global position i utdatapixlar

    def crop(a):
        ya, yb, xa, xb = max(y0, 0), min(y1, MH), max(x0, 0), min(x1, MW)
        c = np.asarray(a[ya:yb, xa:xb])
        return np.pad(c, ((ya - y0, y1 - yb), (xa - x0, x1 - xb)), mode='edge')

    cls = crop(cls_all); river = crop(river_all); base1 = crop(base_all).astype(np.float32)
    seadist = crop(seadist_all).astype(np.float32); lake = crop(lake_all)

    X = (OX + np.arange(W, dtype=np.float32))[None, :].repeat(H, 0)
    Y = (OY + np.arange(H, dtype=np.float32))[:, None].repeat(W, 1)

    def vnoise(period, seed):
        a = (h32(seed, 1, 99) / 4294967296.0) * np.pi
        ca, sa = np.cos(a), np.sin(a)
        xs = (X * ca - Y * sa) / period; ys = (X * sa + Y * ca) / period
        ix = np.floor(xs).astype(np.int64); iy = np.floor(ys).astype(np.int64)
        fx = (xs - ix).astype(np.float32); fy = (ys - iy).astype(np.float32)
        fx = fx * fx * fx * (fx * (fx * 6 - 15) + 10); fy = fy * fy * fy * (fy * (fy * 6 - 15) + 10)
        bx, by = ix.min(), iy.min()
        nx, ny = ix.max() - bx + 2, iy.max() - by + 2
        gxl, gyl = np.meshgrid(np.arange(nx) + bx, np.arange(ny) + by)
        L = (h32(gxl, gyl, seed).astype(np.float64) / 4294967296.0).astype(np.float32)
        jx, jy = ix - bx, iy - by
        v00 = L[jy, jx]; v10 = L[jy, jx + 1]; v01 = L[jy + 1, jx]; v11 = L[jy + 1, jx + 1]
        return (v00 * (1 - fx) + v10 * fx) * (1 - fy) + (v01 * (1 - fx) + v11 * fx) * fy

    def fbm(period, octaves, seed, gain=0.5):
        tot, amp, norm = 0, 1.0, 0
        for o in range(octaves):
            tot = tot + amp * vnoise(max(2, period / 2 ** o), seed + o * 1013); norm += amp; amp *= gain
        return tot / norm

    def white(seed):
        return (h32(X.astype(np.int64), Y.astype(np.int64), seed).astype(np.float64) / 4294967296.0).astype(np.float32)

    def streaks(angle_deg, length, seed):
        n = blur(white(seed), 1.0 * S)
        k = np.zeros((length, length), np.float32); k[length // 2, :] = 1
        M = cv2.getRotationMatrix2D((length / 2 - .5, length / 2 - .5), angle_deg, 1)
        k = cv2.warpAffine(k, M, (length, length)); k /= k.sum()
        s_ = cv2.filter2D(n, -1, k)
        return (s_ - .5) / STREAK_STD[(angle_deg, length)]

    def grid_points(spacing, density, seed):
        """Globalt rutnät med hash-jitter; behåll punkter med sannolikhet = density."""
        i0, i1 = int(np.floor(OX / spacing)) - 1, int(np.ceil((OX + W) / spacing)) + 1
        j0, j1 = int(np.floor(OY / spacing)) - 1, int(np.ceil((OY + H) / spacing)) + 1
        gi, gj = np.meshgrid(np.arange(i0, i1), np.arange(j0, j1))
        gi, gj = gi.ravel(), gj.ravel()
        px = ((gi + .5 + (u01(gi, gj, seed) - .5)) * spacing).astype(np.int64) - OX
        py = ((gj + .5 + (u01(gi, gj, seed + 1) - .5)) * spacing).astype(np.int64) - OY
        ok = (px >= 0) & (py >= 0) & (px < W) & (py < H)
        gi, gj, px, py = gi[ok], gj[ok], px[ok], py[ok]
        keep = u01(gi, gj, seed + 2) < density[py, px]
        return gi[keep], gj[keep], py[keep], px[keep]

    # ---------- masker i full upplösning ----------
    warp_x = (fbm(36 * S, 3, 1) - .5) * 8 * S
    warp_y = (fbm(36 * S, 3, 2) - .5) * 8 * S
    gy, gx = np.mgrid[0:H, 0:W].astype(np.float32)

    def up(a, sigma=1.4, warp=1.0, interp=cv2.INTER_CUBIC):
        m = cv2.resize(a.astype(np.float32), (W, H), interpolation=interp)
        if sigma: m = blur(m, sigma * S)
        return cv2.remap(m, gx + warp_x * warp, gy + warp_y * warp, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

    water = up(cls == WATER) > .5
    sea_up = up(~lake & (cls == WATER), 1.4) > .5
    forest = (up(cls == FOREST) > .5) & ~water
    blight = (up(cls == BLIGHT, 2.0) > .5) & ~water
    mtn_mask = (cls == MTN_OUT) | (cls == MTN_IN)
    base = np.clip(up(base1, 1.6, .8), 0, 1)
    base *= .8 + .4 * fbm(80 * S, 2, 5)
    sea_d = cv2.resize(seadist, (W, H), interpolation=cv2.INTER_LINEAR)   # i källpixlar

    def edt_in(mask):                      # avstånd inåt, med falsk kant så helt fyllda bitar blir rätt
        return ndi.distance_transform_edt(np.pad(mask, 1))[1:-1, 1:-1]

    land_relief = hillshade(blur(base, 8 * S) * 6 + fbm(70 * S, 3, 16) * 1.5)

    # ---------- land ----------
    lowf = fbm(180 * S, 3, 21)
    midf = fbm(45 * S, 3, 22)
    st = .75 * streaks(32, 21 * S, 23) + .25 * streaks(-55, 9 * S, 24)
    ochre, olive, pale, umber = C(146, 126, 62), C(112, 106, 52), C(168, 158, 102), C(80, 70, 38)
    t = smoothstep(.3, .7, lowf)[..., None]
    img = ochre * (1 - t) + olive * t
    img = img * (1 - .1 * smoothstep(.45, .8, midf)[..., None]) + pale * (.12 * smoothstep(.55, .2, midf)[..., None])
    img *= (1 + .055 * st)[..., None]
    img *= (.9 + .16 * land_relief)[..., None]

    mfield = np.clip(up(mtn_mask, 2.0, .8), 0, 1)
    halo = blur(mfield, 16 * S)
    halo_se = blur(np.roll(np.roll(mfield, 14 * S, 0), 10 * S, 1), 20 * S)
    dark_amt = np.clip(.42 * halo + .3 * halo_se, 0, .6) * (1 + .25 * st)
    img = img * (1 - dark_amt[..., None]) + umber * (.35 * dark_amt[..., None])

    M = smoothstep(.02, .25, base)[..., None]
    foot = img * (.45 + .1 * st[..., None]) * (1 - .35 * base[..., None]) + C(60, 50, 30) * .2
    img = img * (1 - M) + foot * M

    # ---------- skog och Blight (trädkronor) ----------
    def canopy(mask, spacing, rmin, rextra, seed, dark, light, mid, edge_dark):
        nonlocal img
        soft = blur(mask.astype(np.float32), 1.2 * S)
        crowns = np.zeros((H, W), np.float32)
        gi, gj, ty, tx = grid_points(spacing, np.clip(soft * 1.4, 0, 1), seed)
        rad = (rmin + (u01(gi, gj, seed + 3) * (rextra + 1)).astype(int)).astype(int)
        hgt = .7 + .3 * u01(gi, gj, seed + 4)
        cache = {}
        for y, x, rr, hh in zip(ty, tx, rad, hgt):
            if rr not in cache:
                yy, xx = np.mgrid[-rr:rr + 1, -rr:rr + 1].astype(np.float32)
                cache[rr] = np.sqrt(np.clip(1 - (xx ** 2 + yy ** 2) / rr ** 2, 0, 1))
            k = cache[rr] * hh
            ya, xa = y - rr, x - rr
            if ya < 0 or xa < 0 or ya + k.shape[0] > H or xa + k.shape[1] > W:
                continue
            np.maximum(crowns[ya:ya + k.shape[0], xa:xa + k.shape[1]], k, out=crowns[ya:ya + k.shape[0], xa:xa + k.shape[1]])
        fsh = hillshade(crowns * 4 * S)
        fsh = np.where(crowns > 0, fsh, .15)
        col = dark * (1 - fsh[..., None]) ** 1.3 + light * fsh[..., None] ** 1.6 + mid * .25
        col *= (.8 + .4 * fbm(40 * S, 3, seed + 5)[..., None])
        col *= (.88 + .24 * lowf[..., None]) * (1 + .04 * st[..., None])
        edge = np.clip(1 - edt_in(mask) / (6 * S), 0, 1)[..., None]
        col *= 1 - edge_dark * edge
        shadow = blur(np.roll(np.roll(soft, 5 * S, 0), 4 * S, 1), 4 * S)[..., None]
        fm = smoothstep(.25, .75, soft)[..., None]
        img *= 1 - .4 * shadow * (1 - fm)
        img = img * (1 - fm) + col * fm

    canopy(forest, 5 * S, 3 * S, 2 * S, 31, C(22, 28, 14), C(92, 96, 46), C(50, 56, 26), .3)
    canopy(blight, 6 * S, 2 * S, 3 * S, 61, C(40, 30, 18), C(150, 118, 64), C(84, 62, 34), .2)

    # ---------- vatten ----------
    W_ = STYLE
    wm = blur(water.astype(np.float32), .7 * S)[..., None]
    d_in = edt_in(water)
    lake_col = C(*W_['lake']) * (1 + .06 * (fbm(70 * S, 3, 41) - .5))[..., None]
    lake_col = lake_col * (1 - .07 * smoothstep(0, 40 * S, d_in))[..., None]
    far = smoothstep(0, 150, sea_d)[..., None]
    sea_col = C(*W_['sea_near']) * (1 - far) + C(*W_['sea_far']) * far
    sea_col = sea_col * (.88 + .24 * fbm(140 * S, 4, 42)[..., None]) * (1 + .03 * st[..., None])
    seaw = blur(sea_up.astype(np.float32), 2 * S)[..., None]
    wcol = sea_col * seaw + lake_col * (1 - seaw)
    img = img * (1 - wm) + wcol * wm
    shore = blur(((edt_in(~water) <= 1.0 * S) & ~water).astype(np.float32), .6 * S)[..., None]
    img = img * (1 - .8 * shore) + C(46, 40, 26) * .8 * shore
    glow = blur(((d_in > 1.2 * S) & (d_in < 3.2 * S)).astype(np.float32), .7 * S)[..., None]
    img = img * (1 - .3 * glow) + C(*W_['glow']) * .3 * glow

    # ---------- floder ----------
    rsrc = river.astype(np.float32)
    if W_['river_grow']:
        rsrc = np.maximum(rsrc, blur(rsrc, W_['river_grow']) * 2.2)
    rv = up(np.clip(rsrc, 0, 1), 0, .3, cv2.INTER_LINEAR)
    rv = np.clip(blur(rv, .8 * S) * 3.2, 0, 1)
    rv_edge = np.clip(blur(rv, 1.6 * S) * 1.6 - rv, 0, 1)
    rv = rv[..., None] * (1 - M * .8); rv_edge = rv_edge[..., None] * (1 - M * .8)
    img *= 1 - W_['river_edge'] * rv_edge
    a_ = W_['river_alpha']
    img = img * (1 - a_ * rv) + C(*W_['river']) * a_ * rv

    # ---------- bergstoppar ----------
    sp = 36 * S
    gi, gj, py, px = grid_points(sp, smoothstep(.05, .35, base) * .85, 52)
    # ankartoppar så att även små kullar får minst en topp
    ay = anchors_all[:, 0].astype(np.int64) * S + S // 2 - OY
    ax_ = anchors_all[:, 1].astype(np.int64) * S + S // 2 - OX
    k_ = np.nonzero((ay >= 0) & (ax_ >= 0) & (ay < H) & (ax_ < W))[0]
    gi = np.concatenate([gi, 1_000_000 + k_]); gj = np.concatenate([gj, 1_000_000 + k_])
    py = np.concatenate([py, ay[k_]]); px = np.concatenate([px, ax_[k_]])
    bh = base[py, px]
    z1, z2 = u01(gi, gj, 55), u01(gi, gj, 56)
    gauss = np.sqrt(-2 * np.log(np.maximum(z1, 1e-9))) * np.cos(2 * np.pi * z2)
    pw = (np.clip(14 + 52 * bh ** 1.2, 12, 70) * S * np.exp(.28 * gauss)).clip(10 * S, 90 * S)
    pw = (pw * 1.4).astype(int)
    ph = (pw * (.5 + .22 * u01(gi, gj, 57))).astype(int)
    ti = (u01(gi, gj, 58) * len(TEMPLATES)).astype(int)
    tint = .82 + .23 * u01(gi, gj, 59)
    gyy = py + OY
    order = np.lexsort((px + OX, gyy))
    placed = []
    cover = np.zeros((H, W), np.float32)
    for i in order:
        w_, h_ = pw[i], ph[i]
        yb, xm = py[i] + int(h_ * .12), px[i]
        ya, xa = yb - h_, xm - w_ // 2
        # sjötest mot den globala vattenmasken (samma svar i alla bitar)
        sx0, sx1 = (xa + OX) // S, (xa + w_ + OX) // S
        sy0, sy1 = (ya + int(h_ * .4) + OY) // S, (yb + OY) // S
        sub = water_all[max(sy0, 0):max(min(sy1, MH), 0), max(sx0, 0):max(min(sx1, MW), 0)]
        if sub.size and sub.mean() > .03:
            continue
        a = cv2.resize(TEMPLATES[ti[i]][1], (w_, h_), interpolation=cv2.INTER_AREA)
        # klipp mot bitens kanter
        cy_a, cy_b, cx_a, cx_b = max(ya, 0), min(yb, H), max(xa, 0), min(xa + w_, W)
        if cy_a >= cy_b or cx_a >= cx_b:
            continue
        a_c = a[cy_a - ya:cy_b - ya, cx_a - xa:cx_b - xa]
        placed.append((i, ya, xa, w_, h_, cy_a, cy_b, cx_a, cx_b))
        np.maximum(cover[cy_a:cy_b, cx_a:cx_b], a_c, out=cover[cy_a:cy_b, cx_a:cx_b])
    L = 31 * S
    k = np.zeros((L, L), np.float32)
    cv2.line(k, (L - 1, L - 1), (0, int(L * .45)), 1, 1)
    k /= k.sum()
    shadow = blur(cv2.filter2D(cover, -1, k, anchor=(L - 1, L - 1), borderType=cv2.BORDER_CONSTANT), 2 * S)
    img *= 1 - (.55 * np.clip(shadow * 1.3, 0, 1))[..., None]
    for i, ya, xa, w_, h_, cy_a, cy_b, cx_a, cx_b in placed:
        col, a = TEMPLATES[ti[i]]
        col = cv2.resize(col, (w_, h_), interpolation=cv2.INTER_AREA) * tint[i]
        a = cv2.resize(a, (w_, h_), interpolation=cv2.INTER_AREA)[..., None]
        col = col[cy_a - ya:cy_b - ya, cx_a - xa:cx_b - xa]; a = a[cy_a - ya:cy_b - ya, cx_a - xa:cx_b - xa]
        reg = img[cy_a:cy_b, cx_a:cx_b]
        reg[:] = reg * (1 - a) + col * a

    # ---------- kornighet ----------
    img *= (1 + .03 * (white(5) - .5))[..., None]

    core = img[P * S:H - P * S, P * S:W - P * S]
    return np.clip(core * 255, 0, 255).astype(np.uint8)


# normalisering av penseldragen: fasta konstanter från en testyta (samma i alla processer)
def _streak_std():
    out = {}
    rng = np.random.default_rng(0)
    n = blur(rng.random((1200, 1200)).astype(np.float32), 1.0 * S)
    for ang, ln in [(32, 21 * S), (-55, 9 * S)]:
        k = np.zeros((ln, ln), np.float32); k[ln // 2, :] = 1
        Mx = cv2.getRotationMatrix2D((ln / 2 - .5, ln / 2 - .5), ang, 1)
        k = cv2.warpAffine(k, Mx, (ln, ln)); k /= k.sum()
        out[(ang, ln)] = float(cv2.filter2D(n, -1, k)[100:-100, 100:-100].std())
    return out

STREAK_STD = _streak_std()

if __name__ == '__main__':
    from PIL import Image
    os.makedirs(ROOT + 'chunks', exist_ok=True)
    chunks = [(cy, cx) for cy in range(0, MH, CS) for cx in range(0, MW, CS)]
    a, b = int(sys.argv[2]), int(sys.argv[3])
    for idx in range(a, min(b, len(chunks))):
        cy, cx = chunks[idx]
        fn = ROOT + f'chunks/c_{cy:05d}_{cx:05d}.png'
        if os.path.exists(fn):
            continue
        t0 = time.time()
        Image.fromarray(render_chunk(cx, cy)).save(fn)
        print(f'bit {idx + 1}/{len(chunks)} ({cx},{cy}) {time.time() - t0:.0f}s', flush=True)
