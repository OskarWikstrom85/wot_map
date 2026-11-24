"""Skapar en tile-pyramid (1024 px WebP-rutor, zoomnivåer räknade som för 512 px) för Leaflet CRS.Simple.
Användning: python make_tiles.py <kartbild> <utmapp>"""
import sys, os, math
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
src, out = sys.argv[1], sys.argv[2]
TS = 1024
im = Image.open(src).convert("RGBA")
W, H = im.size
maxz = math.ceil(math.log2(max(W, H) / 512))
count = 0
for z in range(maxz, -1, -1):
    s = 2 ** (z - maxz)
    w, h = max(1, round(W * s)), max(1, round(H * s))
    lvl = im if s == 1 else im.resize((w, h), Image.LANCZOS)
    for x in range(math.ceil(w / TS)):
        for y in range(math.ceil(h / TS)):
            tile = Image.new("RGBA", (TS, TS), (0, 0, 0, 0))
            tile.paste(lvl.crop((x*TS, y*TS, min(w, (x+1)*TS), min(h, (y+1)*TS))), (0, 0))
            d = os.path.join(out, str(z), str(x)); os.makedirs(d, exist_ok=True)
            tile.save(os.path.join(d, f"{y}.webp"), "WEBP", quality=82, method=5)
            count += 1
print(f"bild {W}x{H}, maxzoom {maxz}, {count} rutor")
