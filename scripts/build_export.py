"""Bygger slagsanimationen med en bildberättelse för visare utan JavaScript
(t.ex. iPhones förhandsvisning) och skriver den till kartan och exportsidan.
Kräver att src-filen serveras på http://localhost:8765/slag/two-rivers.html"""
import asyncio, base64, html, io, json, pathlib, sys
from PIL import Image
from playwright.async_api import async_playwright
root = pathlib.Path(__file__).resolve().parents[1]
BID = sys.argv[1] if len(sys.argv) > 1 else 'two-rivers'
SRC = root / 'src/slag' / (BID + '.html')
SB = json.loads((root / 'src/slag' / BID / 'config.json').read_text())['storyboard']
# vilket steg i varje scen som bild (index), och hur länge animationen får gå innan bilden tas
PICK = [tuple(x) for x in SB['pick']]
async def shots():
    out = []
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg = await b.new_page(viewport={'width': 1280, 'height': 720})
        await pg.goto(f'http://localhost:8765/slag/{BID}.html'); await pg.wait_for_timeout(2000)
        meta = await pg.evaluate("SCENES.map(s => ({k: s.k, t: s.t, d: s.d, say: s.beats.map(b => b.say), dur: s.beats.map(b => b.dur || 1600)}))")
        await pg.evaluate("document.body.classList.add('video')")
        for i, (bi, frac) in enumerate(PICK):
            await pg.evaluate(f"goTo({i},{bi})")
            await pg.wait_for_timeout(int(meta[i]['dur'][bi] * frac) + 400)
            png = await pg.screenshot()
            im = Image.open(io.BytesIO(png)).convert('RGB').resize((1024, 576), Image.LANCZOS)
            buf = io.BytesIO(); im.save(buf, 'JPEG', quality=72, optimize=True, progressive=True)
            out.append(base64.b64encode(buf.getvalue()).decode())
        await b.close()
    return meta, out
meta, imgs = asyncio.run(shots())
e = html.escape
parts = [f'<div class="sb"><h1>{e(SB["title"])}</h1><p class="lead">{e(SB["lead"])}</p>',
         '<p class="tip">Det här är bildberättelsen, som visas när filen öppnas i en förhandsvisning. Öppna filen i en webbläsare (Safari, Chrome) på en dator för att se den interaktiva animationen. På iPhone fungerar det bäst att öppna länken till slaget i stället för filen.</p>']
for m, img in zip(meta, imgs):
    parts.append(f'<section><div class="k">{e(m["k"])}</div><h2>{e(m["t"])}</h2><p class="d">{e(m["d"])}</p>'
                 f'<img alt="{e(m["t"])}" src="data:image/jpeg;base64,{img}"><ol>' + ''.join(f'<li>{e(t)}</li>' for t in m['say']) + '</ol></section>')
parts.append(f'<p class="lead">{e(SB["note"])}</p></div>')
page = SRC.read_text().replace('<!--STORYBOARD-->', ''.join(parts), 1)
(root / 'export' / BID).mkdir(parents=True, exist_ok=True)
for dst in [root / 'site/slag' / (BID + '.html'), root / 'export' / BID / 'index.html']:
    dst.write_text(page)
print('klart', round(len(page) / 1024), 'KB')
