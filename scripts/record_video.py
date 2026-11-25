"""Spelar in slagsanimationen som video (site/slag/<id>.mp4).
Kräver att src/ serveras på http://localhost:8765 (python3 -m http.server 8765 i src/) och ffmpeg."""
import asyncio, pathlib, subprocess, sys, tempfile
from playwright.async_api import async_playwright
root = pathlib.Path(__file__).resolve().parents[1]
BID = sys.argv[1] if len(sys.argv) > 1 else 'two-rivers'
async def rec(tmp):
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        ctx = await b.new_context(viewport={'width': 1280, 'height': 720}, record_video_dir=tmp, record_video_size={'width': 1280, 'height': 720})
        pg = await ctx.new_page()
        await pg.goto(f'http://localhost:8765/slag/{BID}.html#video')
        await pg.wait_for_function('window.__done === true', timeout=0, polling=1000)
        await pg.wait_for_timeout(1500)
        path = await pg.video.path(); await ctx.close(); await b.close()
        return path
with tempfile.TemporaryDirectory() as tmp:
    webm = asyncio.run(rec(tmp))
    out = root / 'site/slag' / f'{BID}.mp4'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', '1.5', '-i', webm, '-r', '25', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26',
                    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(out)], check=True)
    print('skrev', out, out.stat().st_size // 1024, 'KB')
