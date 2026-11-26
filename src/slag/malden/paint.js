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
function walledTown(g, cx, cy, rx, ry, seed, n, s) {
  const wall = blob(cx, cy, rx, ry, seed, .08, 16), wp = polyPath2D(wall);
  g.fillStyle = '#8a7a58'; g.fill(wp);
  g.save(); g.clip(wp); const r = rng(seed + 1), hs = [];
  for (let i = 0; i < n; i++) { const a = r() * 6.3, d = Math.sqrt(r()), x = cx + Math.cos(a) * rx * d, y = cy + Math.sin(a) * ry * d; hs.push([x, y, s * (.8 + r() * .5), s * (.6 + r() * .3), (r() - .5) * .4, r() < .06]); }
  hs.sort((a, b) => a[1] - b[1]); houses(g, hs); g.restore();
  g.strokeStyle = '#3a3226'; g.lineWidth = 12; g.stroke(wp); g.strokeStyle = '#cbbf9f'; g.lineWidth = 8; g.stroke(wp);
  return wp;
}
function aqueduct(g, pts) {
  const p = new Path2D(smoothPath(pts));
  g.save(); g.lineCap = 'butt';
  g.strokeStyle = 'rgba(20,14,8,.45)'; g.lineWidth = 18; g.translate(5, 7); g.stroke(p); g.translate(-5, -7);
  g.strokeStyle = '#a59c86'; g.lineWidth = 14; g.stroke(p);
  g.strokeStyle = '#4a6c78'; g.lineWidth = 4; g.stroke(p);
  g.strokeStyle = 'rgba(40,34,26,.6)'; g.lineWidth = 14; g.setLineDash([2, 22]); g.stroke(p);
  g.restore();
}
function camp(g, cx, cy, rx, ry, seed, n) {
  // Shaidos läger: oregelbundna, låga aieltält
  const r = rng(seed);
  for (let i = 0; i < n; i++) { const a = r() * 6.3, d = Math.sqrt(r()), x = cx + Math.cos(a) * rx * d, y = cy + Math.sin(a) * ry * d, s = 7 + r() * 6;
    g.fillStyle = 'rgba(20,14,8,.35)'; g.beginPath(); g.ellipse(x + 2, y + 3, s, s * .65, 0, 0, 7); g.fill();
    g.fillStyle = ['#8a7048', '#7a6040', '#9a8058'][(r() * 3) | 0]; g.beginPath(); g.ellipse(x, y, s, s * .65, 0, 0, 7); g.fill();
    g.strokeStyle = 'rgba(40,26,12,.6)'; g.lineWidth = .8; g.stroke(); }
}
// ---------- Kampanjkartan: Altara ----------
const C = {malden: [900, 640], perrin: [1300, 260], seanchan: [500, 1100], soHabor: [1650, 520]};
function paintCampaign() {
  const g = setupCanvas('cv-campaign');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#879250'); bg.addColorStop(1, '#7a864c');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 140, .5, 'soft-light', 1501);
  hills(g, [[1100, 380, 220, 100], [700, 380, 180, 90], [1400, 800, 200, 100], [500, 800, 200, 90], [1600, 250, 180, 80]], 1502);
  forest(g, blob(1300, 520, 200, 110, 91, .3), 1503, 13, 8); forest(g, blob(400, 500, 180, 120, 92, .3), 1504, 13, 8); forest(g, blob(1200, 1050, 260, 120, 93, .3), 1505, 13, 8);
  farmland(g, 900, 860, .05, 8, 5, 40, 28, 1506, {skip: .5, bushes: 6});
  road(g, [[C.malden[0], C.malden[1]], [1100, 500], [1300, 300], [1500, 100], [1700, -30]], 5);
  road(g, [[C.malden[0], C.malden[1]], [700, 850], [520, 1050], [400, 1280]], 5);
  road(g, [[C.malden[0], C.malden[1]], [1300, 600], [C.soHabor[0], C.soHabor[1]], [2030, 500]], 5);
  aqueduct(g, [[C.malden[0], C.malden[1]], [800, 450], [700, 300], [620, 150]]);
  walledTown(g, ...C.malden, 60, 46, 1507, 70, 7);
  camp(g, C.malden[0] - 140, C.malden[1] + 20, 90, 70, 1508, 140); camp(g, C.malden[0] + 160, C.malden[1] + 10, 110, 80, 1509, 180);
  g.fillStyle = '#9c8862'; g.fillRect(C.soHabor[0] - 26, C.soHabor[1] - 20, 52, 40); g.strokeStyle = '#cfc4a8'; g.lineWidth = 3; g.strokeRect(C.soHabor[0] - 26, C.soHabor[1] - 20, 52, 40);
  grain(g, 1510);
}
// ---------- Slagfältet: Malden ----------
const B = {town: [1000, 760], ridge: [[200, 330], [500, 260], [800, 220], [1100, 230], [1400, 250], [1700, 300], [1900, 360]],
  aq: [[980, 700], [900, 520], [760, 360], [620, 180], [500, -30]], campW: [600, 820], campE: [1460, 800], cellar: [1040, 790]};
function paintBattle() {
  const g = setupCanvas('cv-battle');
  const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#7e8a46'); bg.addColorStop(1, '#8a8e4e');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 120, .5, 'soft-light', 1601);
  // åsen i norr
  const rp = new Path2D(smoothPath([[-30, -30], [2030, -30], [2030, 380], ...B.ridge.slice().reverse(), [-30, 360]], true));
  const rg = g.createLinearGradient(0, 0, 0, 380); rg.addColorStop(0, 'rgba(60,56,24,.25)'); rg.addColorStop(1, 'rgba(236,224,160,.35)');
  g.fillStyle = rg; g.fill(rp);
  g.save(); g.strokeStyle = 'rgba(60,56,24,.45)'; g.lineWidth = 2.5; g.stroke(new Path2D(smoothPath(B.ridge))); g.restore();
  forest(g, blob(300, 120, 220, 90, 94, .35), 1602, 24, 15); forest(g, blob(1650, 120, 260, 100, 95, .35), 1603, 24, 15);
  hills(g, [[300, 1100, 240, 120], [1700, 1100, 260, 120]], 1604);
  farmland(g, 1000, 1080, .04, 12, 4, 70, 50, 1605, {skip: .45, bushes: 8});
  road(g, [[1000, 760], [1000, 500], [1050, 230], [1100, -30]], 12); road(g, [[1000, 760], [700, 1000], [400, 1280]], 12); road(g, [[1000, 760], [1400, 900], [2030, 1000]], 12);
  aqueduct(g, B.aq);
  camp(g, ...B.campW, 260, 180, 1606, 520); camp(g, ...B.campE, 300, 200, 1607, 700);
  walledTown(g, ...B.town, 170, 130, 1608, 260, 15);
  grain(g, 1609);
}
