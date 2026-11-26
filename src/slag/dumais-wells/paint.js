// ---------- Kampanjkartan: från Cairhien mot Dumai's Wells ----------
function hills(g, list, seed) {
  const r = rng(seed);
  for (const [x, y, rx, ry] of list) {
    const pts = blob(x, y, rx, ry, (r() * 1e6) | 0, .18), p = polyPath2D(pts);
    const gr = g.createRadialGradient(x - rx * .35, y - ry * .45, rx * .1, x, y, Math.max(rx, ry) * 1.1);
    gr.addColorStop(0, 'rgba(236,224,160,.42)'); gr.addColorStop(.55, 'rgba(150,150,80,.12)'); gr.addColorStop(1, 'rgba(40,40,12,.38)');
    g.fillStyle = gr; g.fill(p);
    g.save(); g.strokeStyle = 'rgba(60,56,24,.28)'; g.lineWidth = 1.2;
    for (const k of [.7, .42]) g.stroke(polyPath2D(pts.map(([px, py]) => [x + (px - x) * k - rx * .06 * (1 - k), y + (py - y) * k - ry * .08 * (1 - k)])));
    g.restore();
  }
}
function grass(g, seed, n, col) {
  // tuvor av vinterbrunt gräs över en öppen slätt
  const r = rng(seed); g.save(); g.strokeStyle = col; g.lineWidth = 1.1;
  for (let i = 0; i < n; i++) { const x = r() * W, y = r() * H; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 2, y - 6); g.moveTo(x, y); g.lineTo(x + 2, y - 7); g.moveTo(x, y); g.lineTo(x + 4, y - 4); g.stroke(); }
  g.restore();
}
const C = {
  cairhien: [420, 1000], wells: [980, 420],
  road: [[440, 960], [600, 820], [800, 620], [960, 440], [900, 260], [760, 100], [640, -30]],
  river: [[250, -30], [300, 300], [330, 600], [360, 900], [380, 1280]]
};
function paintCampaign() {
  const g = setupCanvas('cv-campaign');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#8a8a56'); bg.addColorStop(1, '#7c8150');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 140, .5, 'soft-light', 1101);
  hills(g, [[700, 500, 160, 80], [1100, 600, 180, 90], [900, 800, 170, 80], [1250, 900, 160, 80], [600, 300, 140, 70], [1300, 400, 150, 80]], 1102);
  mountains(g, [[1300, -30], [2030, -30], [2030, 700], [1850, 640], [1650, 500], [1500, 330], [1380, 180]], 1103, 46, 40, 110);
  forest(g, blob(560, 620, 120, 80, 61, .3), 1104, 13, 8);
  forest(g, blob(1200, 1100, 220, 100, 62, .3), 1105, 14, 8.5);
  river(g, C.river, 16);
  road(g, C.road, 5);
  // Cairhien
  g.fillStyle = 'rgba(20,14,8,.4)'; g.fillRect(C.cairhien[0] - 46, C.cairhien[1] - 40, 96, 96);
  g.fillStyle = '#9c8862'; g.fillRect(C.cairhien[0] - 50, C.cairhien[1] - 44, 92, 92);
  g.strokeStyle = '#cfc4a8'; g.lineWidth = 4; g.strokeRect(C.cairhien[0] - 50, C.cairhien[1] - 44, 92, 92);
  for (let i = 1; i < 4; i++) { g.strokeStyle = 'rgba(50,36,20,.5)'; g.lineWidth = 1; g.beginPath(); g.moveTo(C.cairhien[0] - 50 + i * 23, C.cairhien[1] - 44); g.lineTo(C.cairhien[0] - 50 + i * 23, C.cairhien[1] + 48); g.moveTo(C.cairhien[0] - 50, C.cairhien[1] - 44 + i * 23); g.lineTo(C.cairhien[0] + 42, C.cairhien[1] - 44 + i * 23); g.stroke(); }
  grass(g, 1106, 1400, 'rgba(70,64,30,.35)');
  grain(g, 1107);
}

// ---------- Slagfältet: sänkan vid brunnarna ----------
const B = {
  wells: [1000, 600], ring: 150,
  ridge: [[700, 1250], [800, 1080], [1000, 1010], [1250, 990], [1500, 1020], [1750, 1100], [1900, 1250]],
  copse: [1180, 520]
};
function paintBattle() {
  const g = setupCanvas('cv-battle');
  const bg = g.createRadialGradient(B.wells[0], B.wells[1], 80, B.wells[0], B.wells[1], 1300); bg.addColorStop(0, '#8b8650'); bg.addColorStop(1, '#6f7342');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 110, .5, 'soft-light', 1201);
  // åsen i söder där räddarna står
  const rp = new Path2D(smoothPath([...B.ridge, [1900, 1300], [700, 1300]], true));
  const rg = g.createLinearGradient(0, 980, 0, 1250); rg.addColorStop(0, 'rgba(236,224,160,.35)'); rg.addColorStop(1, 'rgba(60,56,24,.25)');
  g.fillStyle = rg; g.fill(rp);
  g.save(); g.strokeStyle = 'rgba(60,56,24,.4)'; g.lineWidth = 2; g.stroke(new Path2D(smoothPath(B.ridge))); g.restore();
  hills(g, [[300, 300, 260, 140], [1700, 300, 280, 150], [300, 900, 220, 120], [1750, 700, 200, 110], [1000, 150, 260, 90]], 1202);
  // sänkan kring brunnarna
  const hg = g.createRadialGradient(B.wells[0], B.wells[1], 20, B.wells[0], B.wells[1], 360); hg.addColorStop(0, 'rgba(40,40,12,.25)'); hg.addColorStop(1, 'rgba(40,40,12,0)');
  g.fillStyle = hg; g.beginPath(); g.arc(B.wells[0], B.wells[1], 360, 0, 7); g.fill();
  forest(g, blob(B.copse[0], B.copse[1], 60, 40, 71, .3), 1203, 22, 14);
  forest(g, blob(1600, 1150, 130, 70, 72, .3), 1204, 24, 15);
  forest(g, blob(380, 1100, 120, 70, 73, .3), 1205, 24, 15);
  grass(g, 1206, 2600, 'rgba(70,64,30,.35)');
  // tre stenbrunnar
  for (const [dx, dy] of [[-40, -10], [30, -30], [10, 40]]) { const x = B.wells[0] + dx, y = B.wells[1] + dy;
    g.fillStyle = 'rgba(20,14,8,.45)'; g.beginPath(); g.arc(x + 3, y + 4, 15, 0, 7); g.fill();
    g.fillStyle = '#a8a08a'; g.beginPath(); g.arc(x, y, 14, 0, 7); g.fill(); g.strokeStyle = '#3a3226'; g.lineWidth = 2; g.stroke();
    g.fillStyle = '#20303a'; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill(); }
  // vagnsspår från sydost
  road(g, [[2020, 900], [1700, 820], [1400, 720], [1150, 640]], 7);
  grain(g, 1207);
}
