"""Bestämmer nationernas områden utifrån gränslinjerna i källkartan.

Gränserna är mörkröda streck-prick-linjer. De blir "åsar" i en höjdkarta, och en
watershed-fyllning från en startpunkt per nation (och per obebott område) delar upp
landet längs dem. Där linjen saknas (t.ex. i berg) möts områdena på mitten.
Utdata: out/masks/nations.npy (index per pixel i halv upplösning) + data/nations.json
"""
import json
import numpy as np
import cv2
from scipy import ndimage as ndi
from skimage.segmentation import watershed
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = '/home/claude/wot-map/'
D = 2                                       # arbetsupplösning: 1/2
NATIONS = [  # id, namn, startpunkt (källpixlar), huvudstad
    ('saldaea', 'Saldaea', (3700, 1500), 'Maradon'),
    ('kandor', 'Kandor', (5100, 1420), 'Chachin'),
    ('arafel', 'Arafel', (6150, 1380), 'Shol Arbela'),
    ('shienar', 'Shienar', (6800, 1600), 'Fal Moran'),
    ('malkier', 'Malkier', (7300, 900), 'förlorad, uppslukad av Blighten'),
    ('arad-doman', 'Arad Doman', (2700, 2700), 'Bandar Eban'),
    ('andor', 'Andor', (4200, 3680), 'Caemlyn'),
    ('cairhien', 'Cairhien', (6900, 2800), 'Cairhien'),
    ('ghealdan', 'Ghealdan', (3350, 3900), 'Jehannah'),
    ('tarabon', 'Tarabon', (2200, 4100), 'Tanchico'),
    ('amadicia', 'Amadicia', (3300, 4700), 'Amador'),
    ('altara', 'Altara', (3700, 5300), 'Ebou Dar'),
    ('murandy', 'Murandy', (4800, 4200), 'Lugard'),
    ('illian', 'Illian', (5000, 5350), 'Illian'),
    ('tear', 'Tear', (6400, 5150), 'Tear'),
]
UNCLAIMED = [(5000, 2300), (7000, 2100), (7700, 3500), (7950, 2500), (6500, 4300), (5900, 4700),
             (5300, 4750), (2300, 3300), (1700, 3300), (5000, 500),
             (3400, 2600), (2600, 5000)]   # Mountains of Mist mellan Arad Doman och Andor; Shadow Coast

src = np.asarray(Image.open('/mnt/user-data/uploads/5705809a-image.jpg').convert('RGB')).astype(np.int16)
r, g, b = src[..., 0], src[..., 1], src[..., 2]
red = ((r > g + 30) & (r > b + 45) & (r < 170) & (g < 110)).astype(np.float32)
del src, r, g, b
cls = np.load(ROOT + 'out/masks/cls.npy')
land = cls != 4
H, W = cls.shape
h2, w2 = H // D, W // D
# gränsåsar: täta streck ger högre ås än glesa vägprickar
elev = cv2.GaussianBlur(red, (0, 0), 3)
elev = cv2.resize(elev, (w2, h2), interpolation=cv2.INTER_AREA)
land2 = cv2.resize(land.astype(np.uint8), (w2, h2), interpolation=cv2.INTER_NEAREST).astype(bool)
markers = np.zeros((h2, w2), np.int32)
for i, (_, _, (x, y), _) in enumerate(NATIONS):
    cv2.circle(markers, (x // D, y // D), 6, i + 1, -1)
for (x, y) in UNCLAIMED:
    cv2.circle(markers, (x // D, y // D), 6, 99, -1)
markers[~land2] = 0
lab = watershed(elev, markers, mask=land2)
lab[lab == 99] = 0
np.save(ROOT + 'out/masks/nations.npy', lab.astype(np.uint8))

# förhandsvisning
pal = np.array([[60, 60, 60]] + [[int(c) for c in np.random.default_rng(i).integers(60, 255, 3)] for i in range(1, 100)], np.uint8)
pv = pal[lab]
pv[~land2] = (30, 40, 70)
pv[cv2.resize(red, (w2, h2)) > .3] = (255, 255, 255)
Image.fromarray(pv).resize((w2 // 2, h2 // 2), Image.NEAREST).save(ROOT + 'out/nations_preview.png')

# konturer per nation (källpixlar), förenklade, för klick och markering
out = []
for i, (nid, name, seed, cap) in enumerate(NATIONS):
    m = (lab == i + 1).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    polys = []
    for c in cs:
        if cv2.contourArea(c) < 200:
            continue
        c = cv2.approxPolyDP(c, 1.5, True)[:, 0, :] * D
        polys.append([[round(float(x) / W, 5), round(float(y) / H, 5)] for x, y in c])
    out.append({'id': nid, 'namn': name, 'huvudstad': cap, 'polygoner': polys})
json.dump(out, open(ROOT + 'data/nations.json', 'w'), ensure_ascii=False)
print('klart', [(o['id'], len(o['polygoner']), sum(len(p) for p in o['polygoner'])) for o in out])
