"""Lyfter ut alla detaljer ur källkartan (text, symboler, vägar, gränser, flaggor,
teckenförklaring) som ett genomskinligt lager som kan ligga ovanpå det målade lagret.

Terrängfärgerna och blandningar mellan dem blir genomskinliga. Detaljpixlar "avblandas"
från den lokala bakgrundsfärgen så att text får rena, mjuka kanter. Mörk text och
nationsnamn får en ljus gloria så de syns på den mörka målade bakgrunden.
Utdata: out/details.png (RGBA, 8000 x 6177)
"""
import numpy as np
import cv2
from scipy import ndimage as ndi
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = '/home/claude/wot-map/'
SRC = np.asarray(Image.open('/mnt/user-data/uploads/5705809a-image.jpg').convert('RGB'))
cls = np.load(ROOT + 'out/masks/cls.npy')
H, W = cls.shape
PAL = np.array([(204, 228, 180), (60, 132, 20), (204, 168, 140), (182, 134, 94), (165, 194, 221), (220, 196, 132)], np.float32)
water = cls == 4
coast_all = cv2.dilate((cv2.morphologyEx(water.astype(np.uint8), cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8)) > 0).astype(np.uint8), np.ones((3, 3), np.uint8)) > 0
BAND, OV = 800, 16                         # bearbeta i band för att spara minne

def dist_to_segment(p, a, b):
    ab = b - a
    t = np.clip(((p - a) * ab).sum(-1) / (ab * ab).sum(), 0, 1)[..., None]
    return np.sqrt(((p - (a + t * ab)) ** 2).sum(-1))

def band_basics(y0, y1):
    src = SRC[y0:y1].astype(np.float32)
    bg = PAL[cls[y0:y1]]
    mix = np.full(src.shape[:2], 1e9, np.float32)
    for i in range(len(PAL)):
        for j in range(i, len(PAL)):
            d = np.sqrt(((src - PAL[i]) ** 2).sum(-1)) if i == j else dist_to_segment(src, PAL[i], PAL[j])
            np.minimum(mix, d, out=mix)
    d_bg = np.sqrt(((src - bg) ** 2).sum(-1))
    r, g, b = src[..., 0], src[..., 1], src[..., 2]
    river = (b > g + 5) & (b > r + 25) & (r >= 45)        # mellanblå flodlinjer finns redan i målningen
    detail = (mix > 22) & (d_bg > 35) & ~river & ~coast_all[y0:y1]
    sat = (src.max(-1) - src.min(-1)) > 70
    return src, bg, d_bg, detail, sat

# pass 1: detaljmask och färgmättnad för hela kartan
detail = np.zeros((H, W), bool); sat = np.zeros((H, W), bool)
for y0 in range(0, H, BAND):
    _, _, _, d_, s_ = band_basics(y0, min(H, y0 + BAND))
    detail[y0:y0 + BAND] = d_; sat[y0:y0 + BAND] = s_

# flaggor: täta, färgrika klumpar -> ta med hela klumpen
lab, n = ndi.label(cv2.dilate(detail.astype(np.uint8), np.ones((5, 5), np.uint8)))
flagmask = np.zeros((H, W), bool)
for i, sl in enumerate(ndi.find_objects(lab)):
    h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
    if not (55 <= h <= 220 and 55 <= w <= 220):
        continue
    comp = lab[sl] == i + 1
    if detail[sl][comp].mean() * comp.mean() > .4 and sat[sl][comp].mean() > .35:
        flagmask[sl] |= ndi.binary_fill_holes(comp)
del lab, sat
print('flaggpixlar', flagmask.sum(), flush=True)

# pass 2: avblandning, gloria och utdata, band för band
out = np.zeros((H, W, 4), np.uint8)
halo_col = np.array([234, 224, 192], np.float32)
for y0 in range(0, H, BAND):
    ya, yb = max(0, y0 - OV), min(H, y0 + BAND + OV)
    src, bg, d_bg, _, _ = band_basics(ya, yb)
    det, flg = detail[ya:yb], flagmask[ya:yb]
    a = np.where(det, np.clip(d_bg / 140, 0, 1) ** .85, 0)        # pixel = (1-a)*bg + a*ink
    a = np.maximum(a, flg * 1.0)
    ink = np.where(a[..., None] > 0, bg + (src - bg) / np.maximum(a, 1e-3)[..., None], 0)
    ink = np.clip(np.where(flg[..., None], src, ink), 0, 255)
    lum = ink @ np.array([.299, .587, .114], np.float32)
    redname = (ink[..., 0] > ink[..., 1] + 60) & (ink[..., 0] > 100)
    textish = ((lum < 110) | redname) & (a > .3) & ~flg
    halo = cv2.dilate(textish.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))).astype(np.float32)
    halo = np.clip(cv2.GaussianBlur(halo, (0, 0), 1.6) * 1.4, 0, 1) * .62
    A = a + halo * (1 - a)
    RGB = (ink * a[..., None] + halo_col * (halo * (1 - a))[..., None]) / np.maximum(A, 1e-3)[..., None]
    o = np.dstack([np.clip(RGB, 0, 255), np.clip(A * 255, 0, 255)]).astype(np.uint8)
    out[y0:min(H, y0 + BAND)] = o[y0 - ya:y0 - ya + min(BAND, H - y0)]
Image.fromarray(out, 'RGBA').save(ROOT + 'out/details.png')
print('klart')
