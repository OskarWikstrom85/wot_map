"""Originalkartan med Aielöknen: källkartan + en platt ritad öken i källkartans stil.
Färgerna är källkartans egna (berg, Blight, hav); öknen får en ljus sandton.
Namn, Silk Path och ramen kommer från detaljlagret. Skriver out/original_med_oknen.png."""
import numpy as np, cv2
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
ROOT = '/home/claude/wot-map/'
src = np.asarray(Image.open('/mnt/user-data/uploads/5705809a-image.jpg').convert('RGB'))
cls = np.load(ROOT + 'out/masks/cls.npy'); lake = np.load(ROOT + 'out/masks/lake.npy')
H, W = cls.shape; FR = 7986
PAL = np.array([(204, 228, 180), (60, 132, 20), (204, 168, 140), (182, 134, 94), (165, 194, 221), (220, 196, 132),
                (234, 212, 160), (242, 226, 186), (96, 64, 44)], np.float32)
X0 = 7400                                             # rita från här (öknen öster om Spine i källkartan)
sub = cls[:, X0:]
# mjuka kanter: färga varje klass, oskärpa per klassmask, normalisera
acc = np.zeros(sub.shape + (3,), np.float32); wsum = np.zeros(sub.shape, np.float32)
for k in range(9):
    m = (sub == k).astype(np.float32)
    if not m.any(): continue
    m = cv2.GaussianBlur(m, (0, 0), 1.2)
    acc += m[..., None] * PAL[k]; wsum += m
flat = acc / np.maximum(wsum, 1e-3)[..., None]
out = src.astype(np.float32).copy()
out = np.concatenate([out, np.zeros((H, W - out.shape[1], 3), np.float32)], 1)
# i källkartans del: ersätt bara där öknen nu ligger (den gröna remsan öster om Spine), och ramen
desert = np.isin(sub, (6, 7, 8))
use = np.zeros(sub.shape, bool); use[:, FR - X0:] = True
use[:, :FR - X0] |= desert[:, :FR - X0]
soft = cv2.GaussianBlur(use.astype(np.float32), (0, 0), 1.5)[..., None]
out[:, X0:] = out[:, X0:] * (1 - soft) + flat * soft
# detaljer: källkartans egna i den ersatta öknen + nya namn och ram
det = np.asarray(Image.open(ROOT + 'out/details.png').convert('RGBA')).astype(np.float32)
a = det[..., 3:] / 255
mask = np.zeros((H, W, 1), np.float32); mask[:, X0:, 0] = soft[..., 0]
a = a * mask
out = out * (1 - a) + det[..., :3] * a
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(ROOT + 'out/original_med_oknen.png')
print('klar', out.shape)
