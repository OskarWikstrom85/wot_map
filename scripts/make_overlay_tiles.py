"""Kartrutor (1024 px, RGBA WebP) för detaljlagret. Zoomnivåer som källkartans (z4 = 8000 px)."""
import os, sys, math
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
src, out = sys.argv[1], sys.argv[2]
TS = 1024
img = Image.open(src).convert('RGBA')
W, H = img.size
maxz = math.ceil(math.log2(max(W, H) / 512))
lvl, count = img, 0
for z in range(maxz, -1, -1):
    if z < maxz:
        lvl = lvl.resize((max(1, lvl.width // 2), max(1, lvl.height // 2)), Image.LANCZOS)
    w, h = lvl.size
    for x in range(math.ceil(w / TS)):
        for y in range(math.ceil(h / TS)):
            t = Image.new('RGBA', (TS, TS), (0, 0, 0, 0))
            t.paste(lvl.crop((x * TS, y * TS, min(w, (x + 1) * TS), min(h, (y + 1) * TS))), (0, 0))
            if t.getextrema()[3][1] == 0:
                continue                      # helt genomskinlig ruta behövs inte
            d = os.path.join(out, str(z), str(x)); os.makedirs(d, exist_ok=True)
            t.save(os.path.join(d, f'{y}.webp'), 'WEBP', quality=88, method=4)
            count += 1
print(count, 'rutor')
