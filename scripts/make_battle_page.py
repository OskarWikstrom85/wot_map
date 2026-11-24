"""Bygger en slagsanimation för ett nytt slag från Two Rivers-sidan som mall.
Motorn, gränssnittet och effekterna återanvänds; kartor, styrkor och manus byts ut."""
import pathlib, re, sys, json
root = pathlib.Path(__file__).resolve().parents[1]
cfg = json.loads((root / 'src/slag' / sys.argv[1] / 'config.json').read_text())
d = root / 'src/slag' / sys.argv[1]
s = (root / 'src/slag/two-rivers.html').read_text()
def cut(s, start, end, new):
    i = s.index(start); j = s.index(end, i)
    return s[:i] + new + '\n' + s[j:]
s = cut(s, '// ---------- Kampanjkartan: Two Rivers ----------', '// ================= SVG-lager =================', (d / 'paint.js').read_text())
s = cut(s, 'function buildCampaignSVG() {', '// ================= Enheter och kort =================', '')
s = cut(s, 'const GROUPS = {', 'let fx = null;', (d / 'svg.js').read_text())
s = cut(s, 'const toBow = ', '// ================= Uppspelning =================', (d / 'scenes.js').read_text())
s = re.sub(r"const CHAR_NAMES = \{.*?\};\nconst WIKI = \{.*?\};", "const CHAR_NAMES = " + json.dumps(cfg['charNames'], ensure_ascii=False) + ";\nconst WIKI = " + json.dumps(cfg['wiki'], ensure_ascii=False) + ";", s, flags=re.S)
# blixtar i motorn
s = s.replace("    if (a.boom && dur > 0) boom(a.boom);", "    if (a.boom && dur > 0) boom(a.boom);\n    if (a.bolt && dur > 0 && typeof bolt === 'function') bolt(a.bolt);")
for a, b in cfg['replace']:
    assert a in s, a
    s = s.replace(a, b)
out = root / 'src/slag' / (sys.argv[1] + '.html')
out.write_text(s); print('skrev', out, len(s) // 1024, 'KB')
