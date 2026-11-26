function hills(g, list, seed) {
  const r = rng(seed);
  for (const [x, y, rx, ry] of list) {
    const pts = blob(x, y, rx, ry, (r() * 1e6) | 0, .18), p = polyPath2D(pts);
    const gr = g.createRadialGradient(x - rx * .35, y - ry * .45, rx * .1, x, y, Math.max(rx, ry) * 1.1);
    gr.addColorStop(0, 'rgba(236,224,160,.42)'); gr.addColorStop(.55, 'rgba(150,150,80,.12)'); gr.addColorStop(1, 'rgba(40,40,12,.38)');
    g.fillStyle = gr; g.fill(p);
  }
}
function tents(g, cx, cy, rx, ry, seed, n, col) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) { const a = r() * 6.3, d = Math.sqrt(r()), x = cx + Math.cos(a) * rx * d, y = cy + Math.sin(a) * ry * d, s = 6 + r() * 5;
    g.fillStyle = 'rgba(20,14,8,.35)'; g.beginPath(); g.moveTo(x - s + 2, y + s * .6 + 3); g.lineTo(x + 2, y - s * .7 + 3); g.lineTo(x + s + 2, y + s * .6 + 3); g.fill();
    g.fillStyle = col[(r() * col.length) | 0]; g.beginPath(); g.moveTo(x - s, y + s * .6); g.lineTo(x, y - s * .7); g.lineTo(x + s, y + s * .6); g.closePath(); g.fill(); g.strokeStyle = 'rgba(40,30,16,.6)'; g.lineWidth = .8; g.stroke(); }
}
function cityBlocks(g, clip, x0, y0, x1, y1, b, seed) {
  g.save(); g.clip(clip); const r = rng(seed);
  for (let x = x0; x < x1; x += b) for (let y = y0; y < y1; y += b) {
    const st = b * .16; g.fillStyle = 'rgba(20,14,8,.3)'; g.fillRect(x + st / 2 + 2, y + st / 2 + 2, b - st, b - st);
    g.fillStyle = ['#b06a4a', '#a46246', '#9a5a40', '#b8785a', '#a8705a'][(r() * 5) | 0]; g.fillRect(x + st / 2, y + st / 2, b - st, b - st);
    g.strokeStyle = 'rgba(50,30,20,.5)'; g.lineWidth = 1; g.strokeRect(x + st / 2, y + st / 2, b - st, b - st);
  }
  g.restore();
}
function circleWall(g, cx, cy, r, w, col) {
  g.strokeStyle = '#3a3226'; g.lineWidth = w + 5; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke();
  g.strokeStyle = col; g.lineWidth = w; g.stroke();
}
// ---------- Kampanjkartan: Andor kring Caemlyn ----------
const C = {city: [900, 620]};
function paintCampaign() {
  const g = setupCanvas('cv-campaign');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#87924e'); bg.addColorStop(1, '#79864a');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 140, .5, 'soft-light', 1701);
  hills(g, [[400, 300, 220, 100], [1500, 300, 240, 110], [400, 1000, 220, 100], [1450, 1000, 240, 110]], 1702);
  forest(g, blob(1750, 450, 200, 140, 101, .3), 1703, 13, 8); forest(g, blob(200, 700, 160, 120, 102, .3), 1704, 13, 8);
  farmland(g, 900, 950, .05, 10, 5, 40, 28, 1705, {skip: .4, bushes: 6});
  for (const pts of [[[900, 620], [900, 300], [950, -30]], [[900, 620], [1300, 500], [2030, 420]], [[900, 620], [880, 900], [820, 1280]], [[900, 620], [500, 640], [-30, 660]]]) road(g, pts, 5);
  const cp = new Path2D(); cp.arc(...C.city, 90, 0, 7);
  g.fillStyle = '#9a6a4c'; g.fill(cp); circleWall(g, ...C.city, 90, 5, '#e8e2d4'); circleWall(g, ...C.city, 34, 4, '#f6f2ea');
  tents(g, 900, 790, 130, 50, 1706, 160, ['#c8b48a', '#a8222a', '#d0c6a8']); tents(g, 700, 560, 60, 110, 1707, 110, ['#c8b48a', '#2a5a9a', '#d0c6a8']); tents(g, 1080, 480, 70, 60, 1708, 80, ['#c8b48a', '#6a2a6a']);
  grain(g, 1709);
}
// ---------- Slagfältet: Caemlyn ----------
const B = {c: [1000, 600], R: 470, inner: 150, fmGate: [1000, 1070], full: [1270, 470], north: [1000, 130], rescue: [1280, 1180]};
function paintBattle() {
  const g = setupCanvas('cv-battle');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#7e8a48'); bg.addColorStop(1, '#86904e');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 120, .5, 'soft-light', 1801);
  hills(g, [[200, 200, 200, 100], [1800, 200, 220, 110], [200, 1100, 200, 100], [1820, 1080, 220, 110]], 1802);
  for (const pts of [[[1000, 600], [1000, -30]], [[1000, 600], [1000, 1280]], [[1000, 600], [-30, 600]], [[1000, 600], [2030, 600]]]) road(g, pts, 14);
  const np = new Path2D(); np.arc(...B.c, B.R, 0, 7);
  g.fillStyle = '#8a6046'; g.fill(np);
  cityBlocks(g, np, 520, 120, 1480, 1080, 30, 1803);
  // gator genom New City
  g.save(); g.clip(np); g.strokeStyle = '#c8b48a'; g.lineCap = 'round';
  for (let a = 0; a < 8; a++) { const t = a / 8 * Math.PI * 2; g.lineWidth = a % 2 ? 9 : 14; g.beginPath(); g.moveTo(B.c[0] + Math.cos(t) * B.inner, B.c[1] + Math.sin(t) * B.inner); g.lineTo(B.c[0] + Math.cos(t) * B.R, B.c[1] + Math.sin(t) * B.R); g.stroke(); }
  g.lineWidth = 8; g.beginPath(); g.arc(...B.c, 310, 0, 7); g.stroke(); g.restore();
  circleWall(g, ...B.c, B.R, 14, '#e8e2d4');
  // Inner City, byggd av Ogier, med palatset på kullen
  const ip = new Path2D(); ip.arc(...B.c, B.inner, 0, 7); g.fillStyle = '#d6ccb4'; g.fill(ip);
  g.save(); g.clip(ip); const r = rng(1804);
  for (let i = 0; i < 70; i++) { const a = r() * 6.3, d = 40 + r() * 100, x = B.c[0] + Math.cos(a) * d, y = B.c[1] + Math.sin(a) * d; g.fillStyle = ['#f2eee4', '#e6dfcc', '#dcd2bc'][(r() * 3) | 0]; g.beginPath(); g.arc(x, y, 6 + r() * 6, 0, 7); g.fill(); g.strokeStyle = 'rgba(60,54,44,.4)'; g.lineWidth = .8; g.stroke(); }
  g.restore();
  circleWall(g, ...B.c, B.inner, 9, '#fbf8f2');
  g.fillStyle = 'rgba(20,14,8,.35)'; g.fillRect(B.c[0] - 44, B.c[1] - 36, 96, 80);
  g.fillStyle = '#f6f2ea'; g.fillRect(B.c[0] - 48, B.c[1] - 40, 96, 80); g.strokeStyle = '#3a342a'; g.lineWidth = 2.5; g.strokeRect(B.c[0] - 48, B.c[1] - 40, 96, 80);
  for (const [dx, dy] of [[-48, -40], [48, -40], [-48, 40], [48, 40]]) { g.fillStyle = '#e8c870'; g.beginPath(); g.arc(B.c[0] + dx, B.c[1] + dy, 8, 0, 7); g.fill(); g.stroke(); }
  // portarna
  for (const [x, y] of [B.fmGate, B.north, [B.c[0] - B.R, B.c[1]], [B.c[0] + B.R, B.c[1]]]) { g.fillStyle = '#4a3a26'; g.fillRect(x - 22, y - 22, 44, 44); g.strokeStyle = '#e8e2d4'; g.lineWidth = 3; g.strokeRect(x - 22, y - 22, 44, 44); }
  // Arymillas läger
  tents(g, 1000, 1200, 360, 50, 1805, 260, ['#c8b48a', '#a8222a', '#d0c6a8']);
  tents(g, 300, 600, 110, 300, 1806, 260, ['#c8b48a', '#2a5a9a', '#d0c6a8']);
  tents(g, 1700, 600, 110, 300, 1807, 220, ['#c8b48a', '#6a2a6a', '#d0c6a8']);
  tents(g, 1000, 40, 300, 40, 1808, 160, ['#c8b48a', '#a8222a']);
  grain(g, 1809);
}
