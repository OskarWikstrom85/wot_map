"""Steg 1 för det målade lagret: tolka hela källkartan (1x) och spara masker.

Utdata i out/masks/: cls.npy (terrängklass), river.npy (flodlinjer, 1 px), base.npy
(bergshöjd 0..1), sea_dist.npy (avstånd från kust ut i havet, px), lake.npy.
"""
import time
import numpy as np
import cv2
from scipy import ndimage as ndi
from skimage.morphology import skeletonize
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
SRC = '/mnt/user-data/uploads/5705809a-image.jpg'
OUT = '/home/claude/wot-map/out/masks/'
import os; os.makedirs(OUT, exist_ok=True)
t0 = time.time()
log = lambda m: print(f'{time.time() - t0:6.1f}s  {m}', flush=True)

src = np.asarray(Image.open(SRC).convert('RGB'))
H, W = src.shape[:2]
LAND, FOREST, MTN_OUT, MTN_IN, WATER, BLIGHT = range(6)
palette = {
    LAND:    [(204, 228, 180), (196, 228, 180), (204, 236, 180), (212, 228, 180), (204, 228, 172), (196, 236, 180)],
    FOREST:  [(60, 132, 20), (60, 132, 28), (60, 132, 12)],
    MTN_OUT: [(204, 172, 140), (204, 164, 140), (204, 164, 132), (196, 172, 140), (196, 156, 124)],
    MTN_IN:  [(180, 132, 92), (188, 132, 92), (188, 140, 100), (180, 140, 100), (180, 132, 100)],
    WATER:   [(164, 196, 220), (167, 192, 220), (164, 188, 220), (164, 188, 228), (164, 196, 228)],
    BLIGHT:  [(220, 196, 132)],
}
best = np.full((H, W), 1e9, np.float32)
cls = np.full((H, W), -1, np.int8)
srcf = src.astype(np.float32)
for k, cols in palette.items():
    for c in cols:
        d = np.sqrt(((srcf - np.array(c, np.float32)) ** 2).sum(-1))
        bt = d < best
        best[bt] = d[bt]; cls[bt] = k
del srcf
known = best < 28
del best
log('klassat')

for k, minsize in [(MTN_OUT, 900), (MTN_IN, 300), (WATER, 400), (FOREST, 150), (BLIGHT, 400)]:
    lab, n = ndi.label(known & (cls == k))
    if n:
        sizes = ndi.sum(np.ones_like(lab, dtype=np.uint8), lab, np.arange(1, n + 1))
        known &= ~np.isin(lab, np.nonzero(sizes < minsize)[0] + 1)
    del lab
log('små fläckar borttagna')

_, (iy, ix) = ndi.distance_transform_edt(~known, return_indices=True)
fill = cls[iy, ix]; del iy, ix
nonland = known & (cls != LAND)
dnl, (jy, jx) = ndi.distance_transform_edt(~nonland, return_indices=True)
fill = np.where(dnl <= 7, cls[jy, jx], fill); del dnl, jy, jx
cls = np.where(known, cls, fill); del fill
log('okänt fyllt')

ell = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (23, 23))
for k in (MTN_OUT, FOREST, BLIGHT):
    m = ((cls == k) | (cls == MTN_IN)) if k == MTN_OUT else (cls == k)
    closed = cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_CLOSE, ell, borderType=cv2.BORDER_REPLICATE) > 0
    cls[closed & (cls == LAND)] = k
log('glipor stängda')

# hav = vatten som når kartans kant, resten är sjöar
water = cls == WATER
lab, n = ndi.label(water)
edge_labels = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
sea = np.isin(lab, edge_labels[edge_labels > 0]); del lab
lake = water & ~sea
sea_dist = np.clip(ndi.distance_transform_edt(sea), 0, 255).astype(np.uint8)
log('hav/sjöar')

r, g, b = [src[..., i].astype(np.int16) for i in range(3)]
river = (b > g + 5) & (b > r + 25) & ~cv2.dilate(water.astype(np.uint8), np.ones((13, 13), np.uint8)).astype(bool)
river = cv2.dilate(river.astype(np.uint8), np.ones((3, 3), np.uint8))
river = cv2.morphologyEx(river, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8)) > 0
lab, n = ndi.label(river)
sizes = ndi.sum(np.ones_like(lab, dtype=np.uint8), lab, np.arange(1, n + 1))
river &= np.isin(lab, np.nonzero(sizes >= 60)[0] + 1); del lab
river = skeletonize(river)
log('floder')

mtn = (cls == MTN_OUT) | (cls == MTN_IN)
inner = cls == MTN_IN
d_ridge = ndi.distance_transform_edt(~inner).astype(np.float32)
ridge = np.where(mtn, np.exp(-d_ridge / 9.0), 0).astype(np.float32); del d_ridge
dist = ndi.distance_transform_edt(mtn).astype(np.float32)
local_max = cv2.dilate(dist, np.ones((61, 61), np.uint8))
spine = np.where(mtn, dist / (local_max + 1e-3), 0)
base = (np.maximum(ridge, .5 * spine) * np.clip(dist / 6, 0, 1) ** .5).astype(np.float16)
log('bergshöjd')
# varje bergsområde får minst en topp: ankare vid områdets högsta punkt
lab, n = ndi.label(mtn)
anchors = np.array(ndi.maximum_position(base.astype(np.float32), lab, np.arange(1, n + 1)), np.int32).reshape(-1, 2)
np.save(OUT + 'anchors.npy', anchors)
log(f'{n} bergsområden')

np.save(OUT + 'cls.npy', cls)
np.save(OUT + 'river.npy', river)
np.save(OUT + 'base.npy', base)
np.save(OUT + 'sea_dist.npy', sea_dist)
np.save(OUT + 'lake.npy', lake)
pal = np.array([[200, 220, 170], [40, 110, 30], [220, 170, 130], [150, 90, 50], [120, 170, 230], [230, 200, 120]], np.uint8)
Image.fromarray(pal[cls]).resize((W // 8, H // 8), Image.NEAREST).save(OUT + 'preview.png')
log('sparat')
