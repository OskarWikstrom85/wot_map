// ---------- Kampanjkartan: staden Tear ----------
function cityBlocks(g, x0, y0, x1, y1, b, seed, avoid) {
  // Täta kvarter med smala gator, oregelbundna tak
  const r = rng(seed);
  for (let x = x0; x < x1; x += b) for (let y = y0; y < y1; y += b) {
    const cx = x + b / 2, cy = y + b / 2; if (avoid && avoid(cx, cy)) continue;
    const st = b * .14, w = b - st, h = b - st;
    g.fillStyle = 'rgba(20,14,8,.35)'; g.fillRect(x + st / 2 + 2, y + st / 2 + 2, w, h);
    g.fillStyle = ['#a9946a', '#9c8862', '#b19c70', '#8f7e5c', '#a48a5e'][(r() * 5) | 0]; g.fillRect(x + st / 2, y + st / 2, w, h);
    g.strokeStyle = 'rgba(50,36,20,.5)'; g.lineWidth = 1; g.strokeRect(x + st / 2, y + st / 2, w, h);
    if (b > 26) { g.strokeStyle = 'rgba(60,44,24,.35)'; g.beginPath(); g.moveTo(x + b / 2, y + st); g.lineTo(x + b / 2, y + b - st); g.stroke(); }
  }
}
function stoneBlob(g, pts, seed, light) {
  // Stenens massiva murar: grå sten med blockmönster och skugga
  const p = polyPath2D(pts);
  g.save(); g.translate(14, 18); g.fillStyle = 'rgba(10,8,6,.5)'; g.fill(p); g.restore();
  g.fillStyle = light || '#8f8a7c'; g.fill(p);
  g.save(); g.clip(p); noise(g, 30, .35, 'soft-light', seed);
  const r = rng(seed); g.strokeStyle = 'rgba(40,36,30,.25)'; g.lineWidth = 1;
  for (let y = 0; y < H; y += 14) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); for (let x = (y / 14 % 2) * 14; x < W; x += 28) { g.beginPath(); g.moveTo(x + r() * 3, y); g.lineTo(x + r() * 3, y + 14); g.stroke(); } }
  g.restore();
  g.strokeStyle = '#2e2a22'; g.lineWidth = 4; g.stroke(p);
  return p;
}
function riverBand(g, pts, w) {
  const p = new Path2D(smoothPath(pts));
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = 'rgba(58,52,30,.55)'; g.lineWidth = w + 14; g.stroke(p);
  g.strokeStyle = '#3e6470'; g.lineWidth = w; g.stroke(p);
  g.strokeStyle = 'rgba(160,196,196,.3)'; g.lineWidth = w * .1; g.setLineDash([w * .6, w * .5]); g.stroke(p);
  g.restore();
}
const C = {
  river: [[560, -30], [600, 200], [640, 420], [660, 620], [640, 860], [600, 1050], [560, 1280]],
  stone: [700, 470], inn: [1280, 760], docks: [700, 900],
  wall: [[760, 260], [1100, 200], [1500, 220], [1800, 320], [1880, 620], [1800, 950], [1500, 1080], [1100, 1100], [760, 1020]],
  north: [[1200, -30], [1250, 120], [1270, 220]], east: [[1880, 620], [2030, 620]]
};
function paintCampaign() {
  const g = setupCanvas('cv-campaign');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#7f8a4a'); bg.addColorStop(1, '#6f7a44');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 140, .5, 'soft-light', 901);
  // våtmarker söderut och på andra stranden
  for (const [x, y, rx, ry, s] of [[300, 900, 240, 200, 1], [360, 300, 200, 160, 2], [1400, 1220, 400, 90, 3]]) { const p = polyPath2D(blob(x, y, rx, ry, 900 + s, .3)); g.fillStyle = 'rgba(70,96,70,.55)'; g.fill(p); g.save(); g.clip(p); noise(g, 18, .3, 'soft-light', 910 + s); g.restore(); }
  riverBand(g, C.river, 150);
  road(g, C.north, 10); road(g, C.east, 10);
  const wp = polyPath2D(C.wall);
  g.fillStyle = '#7a6c50'; g.fill(wp);
  g.save(); g.clip(wp);
  cityBlocks(g, 700, 180, 1900, 1120, 34, 902, (x, y) => Math.hypot(x - C.stone[0], y - C.stone[1]) < 230);
  g.restore();
  g.strokeStyle = '#3a3226'; g.lineWidth = 11; g.stroke(wp); g.strokeStyle = '#cfc4a8'; g.lineWidth = 7; g.stroke(wp);
  // Stenen: en väldig klippa av sten vid floden
  stoneBlob(g, blob(C.stone[0], C.stone[1], 180, 150, 77, .12, 18), 903);
  stoneBlob(g, blob(C.stone[0] + 10, C.stone[1] - 10, 90, 70, 78, .1, 14), 904, '#a39d8c');
  // kajer i Maule
  g.fillStyle = '#6a5a3c'; for (let i = 0; i < 6; i++) g.fillRect(650, 840 + i * 40, 70, 10);
  houses(g, [[C.inn[0], C.inn[1], 30, 22, 0, true]]);
  grain(g, 905);
}

// ---------- Slagfältet: inne i Stenen ----------
const B = {
  outer: [[170, 120], [700, 60], [1300, 70], [1760, 160], [1880, 520], [1840, 900], [1600, 1150], [1000, 1200], [420, 1150], [190, 900], [140, 500]],
  heart: [1000, 600], cells: [380, 980], gate: [230, 1040], breach: [1830, 640],
  cityWall: [[1830, 660], [1950, 640], [2040, 630]]
};
function paintBattle() {
  const g = setupCanvas('cv-battle');
  g.fillStyle = '#5f6a46'; g.fillRect(0, 0, W, H); noise(g, 90, .5, 'soft-light', 1001);
  riverBand(g, [[40, -30], [60, 400], [40, 800], [70, 1280]], 220);
  // staden utanför
  cityBlocks(g, 1860, 0, 2000, 1250, 40, 1002, (x, y) => Math.abs(y - 640) < 26);
  const op = stoneBlob(g, B.outer, 1003);
  // inre gårdar, salar och korridorer
  g.save(); g.clip(op);
  const r = rng(1004);
  for (const [x, y, w, h] of [[300, 220, 380, 220], [760, 180, 480, 180], [1320, 230, 380, 240], [260, 520, 300, 260], [1440, 560, 300, 260], [320, 820, 360, 200], [760, 900, 480, 180], [1300, 880, 380, 200]]) {
    g.fillStyle = 'rgba(40,36,30,.35)'; g.fillRect(x + 6, y + 6, w, h);
    g.fillStyle = r() < .5 ? '#7d7768' : '#857f70'; g.fillRect(x, y, w, h);
    g.strokeStyle = 'rgba(30,26,20,.6)'; g.lineWidth = 2; g.strokeRect(x, y, w, h);
    for (let k = 1; k < 4; k++) { g.strokeStyle = 'rgba(30,26,20,.25)'; g.beginPath(); g.moveTo(x + w * k / 4, y); g.lineTo(x + w * k / 4, y + h); g.stroke(); }
  }
  // korridorer: ljusare stråk som leder in mot Hjärtat
  g.strokeStyle = 'rgba(200,190,160,.35)'; g.lineCap = 'round';
  for (const pts of [[[1830, 640], [1500, 620], [1150, 610]], [[1000, 120], [1000, 470]], [[230, 1040], [400, 900], [700, 760], [880, 680]], [[1000, 730], [1000, 1150]], [[200, 500], [600, 560], [860, 600]]]) { g.lineWidth = 34; g.stroke(new Path2D(smoothPath(pts))); }
  // Hjärtat av Stenen: rund sal med pelare kring en tom mitt
  const [hx, hy] = B.heart;
  g.fillStyle = 'rgba(20,16,12,.45)'; g.beginPath(); g.arc(hx + 8, hy + 10, 150, 0, 7); g.fill();
  const hg = g.createRadialGradient(hx, hy, 10, hx, hy, 150); hg.addColorStop(0, '#c9c2ae'); hg.addColorStop(1, '#8d8676');
  g.fillStyle = hg; g.beginPath(); g.arc(hx, hy, 150, 0, 7); g.fill();
  g.strokeStyle = '#2e2a22'; g.lineWidth = 4; g.stroke();
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, px = hx + Math.cos(a) * 118, py = hy + Math.sin(a) * 118;
    g.fillStyle = 'rgba(20,16,12,.5)'; g.beginPath(); g.arc(px + 3, py + 4, 11, 0, 7); g.fill();
    g.fillStyle = '#d8d0b8'; g.beginPath(); g.arc(px, py, 10, 0, 7); g.fill(); g.strokeStyle = '#4a4436'; g.lineWidth = 1.5; g.stroke(); }
  // cellerna nere vid floden
  g.fillStyle = '#5f5a4e'; g.fillRect(270, 930, 230, 120); g.strokeStyle = '#2e2a22'; g.lineWidth = 3; g.strokeRect(270, 930, 230, 120);
  for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(270 + i * 46, 930); g.lineTo(270 + i * 46, 1050); g.stroke(); }
  g.restore();
  // stadsmuren som möter Stenen i öster
  g.save(); g.lineCap = 'butt'; g.strokeStyle = '#3a3226'; g.lineWidth = 26; g.stroke(new Path2D(smoothPath(B.cityWall))); g.strokeStyle = '#bdb39a'; g.lineWidth = 20; g.stroke(new Path2D(smoothPath(B.cityWall))); g.restore();
  grain(g, 1005);
}
