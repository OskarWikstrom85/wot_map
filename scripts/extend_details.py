"""Förlänger detaljlagret (namn, ramen) österut över Aielöknen.

Läser out/details_west.png (källkartans detaljer, 8000 px bred) och skriver
out/details.png i den nya bredden: ramen flyttas till den nya kanten och
öknens namn och Silk Path ritas in."""
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
Image.MAX_IMAGE_PIXELS = None
ROOT = '/home/claude/wot-map/'
src = np.asarray(Image.open(ROOT + 'out/details_west.png').convert('RGBA'))
H, W0 = src.shape[:2]
W = np.load(ROOT + 'out/masks/cls.npy', mmap_mode='r').shape[1]
FR = 7986                                              # källkartans högra ram börjar här
out = np.zeros((H, W, 4), np.uint8)
out[:, :FR] = src[:, :FR]
out[:, W - (W0 - FR):] = src[:, FR:]                   # högra ramen till nya kanten
# övre och nedre ramen fortsätter med samma streckmönster
a = src[5, 1000:7000, :3].mean(-1)
sig = (a - a.mean()); best = max(range(300, 420), key=lambda p: (sig[:-p] * sig[p:]).mean())
for x in range(FR, W - (W0 - FR)):
    sx = FR - best * 4 + ((x - FR) % best)
    out[:15, x] = src[:15, sx]; out[H - 15:, x] = src[H - 15:, sx]

img = Image.fromarray(out, 'RGBA')
lay = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
CIN = ROOT + 'scripts/fonts/Cinzel-Bold.ttf'
SER = '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'
SERI = '/usr/share/fonts/truetype/dejavu/DejaVuSerif-BoldItalic.ttf'
RED, INK, BROWN, HALO = (128, 22, 18, 255), (30, 24, 16, 255), (112, 70, 30, 255), (244, 234, 206, 215)

# Silk Path: prickad väg från Taien österut mot Shara
pts = [(7990, 2441), (8100, 2420), (8500, 2470), (8900, 2390), (9300, 2330), (9800, 2360), (10300, 2300), (10690, 2290), (11000, 2250), (W, 2230)]
import math
for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
    L = math.hypot(x2 - x1, y2 - y1)
    for i in range(int(L // 10)):
        t = i * 10 / L; x, y = x1 + (x2 - x1) * t, y1 + (y2 - y1) * t
        d.ellipse((x - 1.9, y - 1.9, x + 1.9, y + 1.9), fill=BROWN)

def text(xy, s, font, size, fill, angle=0, spacing=0, halo=7):
    f = ImageFont.truetype(font, size)
    if spacing:
        s = (' ' * spacing).join(s)
    bb = d.textbbox((0, 0), s, font=f, stroke_width=halo)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    t = Image.new('RGBA', (tw + 20, th + 20), (0, 0, 0, 0)); td = ImageDraw.Draw(t)
    td.text((10 - bb[0], 10 - bb[1]), s, font=f, fill=HALO, stroke_width=halo, stroke_fill=HALO)
    t = t.filter(ImageFilter.GaussianBlur(2))
    td = ImageDraw.Draw(t); td.text((10 - bb[0], 10 - bb[1]), s, font=f, fill=fill)
    if angle: t = t.rotate(angle, expand=True, resample=Image.BICUBIC)
    lay.alpha_composite(t, (int(xy[0] - t.width / 2), int(xy[1] - t.height / 2)))

text((9330, 1930), 'THE AIEL WASTE', CIN, 96, RED, spacing=0)
text((9330, 2035), '(The Three-fold Land)', SERI, 38, INK, halo=5)
text((9450, 4930), 'TERMOOL', CIN, 64, INK)
text((9450, 5000), '(The Waterless Sands)', SERI, 30, INK, halo=5)
text((10590, 2750), 'THE GREAT RIFT', CIN, 46, INK, angle=90)
text((10930, 3650), 'CLIFFS OF DAWN', CIN, 40, INK, angle=90)
text((11080, 1900), 'SHARA', CIN, 70, RED, angle=90)
text((9500, 330), 'THE GREAT BLIGHT', CIN, 56, INK)
text((8640, 2365), 'Silk Path', SERI, 30, BROWN, halo=5)
for (x, y), s in [((8610, 3420), 'Rhuidean'), ((8545, 3190), 'Chaendaer'), ((8980, 3088), 'Cold Rocks Hold'), ((9050, 2658), 'Alcair Dal')]:
    text((x, y), s, SER, 28, INK, halo=5)
img.alpha_composite(lay)
img.save(ROOT + 'out/details.png')
print('klar', img.size, 'ramperiod', best)
