"""Steg 3 för det målade lagret: sätt ihop bitarna och gör en tile-pyramid (1024 px WebP).

Den målade kartan är 2x källkartan, så dess högsta nivå (z5) motsvarar källkartans z4 x 2.
Användning: python make_tiles_from_chunks.py utmapp
"""
import os, sys, glob, math
import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = '/home/claude/wot-map/out/'
OUT = sys.argv[1]
S, MW, MH, TS = 2, 8000, 6177, 1024
W, H = MW * S, MH * S
canvas = np.zeros((H, W, 3), np.uint8)
for fn in glob.glob(ROOT + 'chunks/c_*.png'):
    cy, cx = [int(v) for v in os.path.basename(fn)[2:-4].split('_')]
    a = np.asarray(Image.open(fn))
    canvas[cy * S:cy * S + a.shape[0], cx * S:cx * S + a.shape[1]] = a
img = Image.fromarray(canvas); del canvas
img.resize((W // 8, H // 8), Image.LANCZOS).save(ROOT + 'malad_oversikt.jpg', quality=88)

maxz = math.ceil(math.log2(max(W, H) / 512))     # samma zoomnivåer som källkartans rutor
count = 0
lvl = img
for z in range(maxz, -1, -1):
    if z < maxz:
        lvl = lvl.resize((max(1, lvl.width // 2), max(1, lvl.height // 2)), Image.LANCZOS)
    w, h = lvl.size
    for x in range(math.ceil(w / TS)):
        for y in range(math.ceil(h / TS)):
            tile = Image.new('RGBA', (TS, TS), (0, 0, 0, 0))
            tile.paste(lvl.crop((x * TS, y * TS, min(w, (x + 1) * TS), min(h, (y + 1) * TS))), (0, 0))
            d = os.path.join(OUT, str(z), str(x)); os.makedirs(d, exist_ok=True)
            tile.save(os.path.join(d, f'{y}.webp'), 'WEBP', quality=80, method=4)
            count += 1
    print(f'z{z}: {w}x{h}', flush=True)
print(f'{count} rutor')
