"""Rendera ett testområde av det målade lagret med gammal och ny vattenstil.
Användning: python water_test.py S x0 y0 storlek namn  (källpixlar)"""
import sys, time, importlib
sys.argv = [sys.argv[0], sys.argv[1]] + sys.argv[2:]
S = sys.argv[1]
x0, y0, size, name = int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
sys.argv = [sys.argv[0], S, '0', '0']
sys.path.insert(0, '/home/claude/wot-map/scripts')
import render_chunks as rc
from PIL import Image
import json
rc.CS = size
style = json.loads(open('/home/claude/wot-map/out/vattentest/style.json').read()) if name != 'old' else rc.OLD_STYLE
rc.STYLE.clear(); rc.STYLE.update(style)
t = time.time()
img = rc.render_chunk(x0, y0)
Image.fromarray(img).save(f'/home/claude/wot-map/out/vattentest/{name}.png')
print(name, img.shape, f'{time.time()-t:.0f}s')
