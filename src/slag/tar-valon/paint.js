function hills(g, list, seed) {
  const r = rng(seed);
  for (const [x, y, rx, ry] of list) {
    const pts = blob(x, y, rx, ry, (r() * 1e6) | 0, .18), p = polyPath2D(pts);
    const gr = g.createRadialGradient(x - rx * .35, y - ry * .45, rx * .1, x, y, Math.max(rx, ry) * 1.1);
    gr.addColorStop(0, 'rgba(236,224,160,.42)'); gr.addColorStop(.55, 'rgba(150,150,80,.12)'); gr.addColorStop(1, 'rgba(40,40,12,.38)');
    g.fillStyle = gr; g.fill(p);
  }
}
function riverBand(g, pts, w) {
  const p = new Path2D(smoothPath(pts));
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = 'rgba(58,52,30,.5)'; g.lineWidth = w + 12; g.stroke(p);
  g.strokeStyle = '#3e6470'; g.lineWidth = w; g.stroke(p);
  g.restore();
}
function night(g, a) { g.save(); g.fillStyle = `rgba(14,20,40,${a})`; g.fillRect(0, 0, W, H); g.restore(); }
// ---------- Kampanjkartan: från Ebou Dar till Tar Valon ----------
const C = {ebou: [240, 1100], tv: [1600, 260], dm: [1420, 330],
  erinin: [[1580, -30], [1620, 150], [1640, 400], [1600, 700], [1500, 1000], [1450, 1280]],
  path: [[260, 1080], [520, 900], [800, 760], [1080, 560], [1350, 400], [1580, 280]], stops: [[520, 900], [800, 760], [1080, 560], [1350, 400]]};
function paintCampaign() {
  const g = setupCanvas('cv-campaign');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#86904e'); bg.addColorStop(1, '#7a864a');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 140, .5, 'soft-light', 1901);
  // havet vid Ebou Dar
  g.fillStyle = '#2f5866'; g.beginPath(); g.moveTo(-30, 980); g.quadraticCurveTo(200, 1040, 300, 1280); g.lineTo(-30, 1280); g.fill();
  hills(g, [[600, 600, 240, 110], [1000, 900, 260, 120], [1300, 700, 220, 100], [700, 1150, 220, 90]], 1902);
  forest(g, blob(900, 400, 200, 120, 111, .3), 1903, 13, 8); forest(g, blob(1200, 1100, 220, 100, 112, .3), 1904, 13, 8);
  riverBand(g, C.erinin, 20);
  const dm = blob(C.dm[0], C.dm[1], 80, 70, 1905, .2, 20); const dg = g.createRadialGradient(C.dm[0] - 20, C.dm[1] - 30, 6, C.dm[0], C.dm[1], 90);
  dg.addColorStop(0, '#f2efe6'); dg.addColorStop(.4, '#a59a86'); dg.addColorStop(1, '#4e463a'); g.fillStyle = dg; g.fill(polyPath2D(dm));
  g.fillStyle = '#e8e4da'; g.beginPath(); g.ellipse(C.tv[0] + 20, C.tv[1], 18, 50, -.1, 0, 7); g.fill(); g.strokeStyle = '#2e2a22'; g.lineWidth = 2; g.stroke();
  g.fillStyle = '#a89470'; g.fillRect(C.ebou[0] - 30, C.ebou[1] - 26, 60, 52); g.strokeStyle = '#f2ead6'; g.lineWidth = 3; g.strokeRect(C.ebou[0] - 30, C.ebou[1] - 26, 60, 52);
  night(g, .25); grain(g, 1906);
}
// ---------- Slagfältet: Vita tornet ----------
const B = {t: [1000, 560], R: 230, square: [1000, 1000], breach: [1210, 470], store: [800, 720], novice: [600, 520], elaida: [1000, 420], gate: [1500, 900]};
function paintBattle() {
  const g = setupCanvas('cv-battle');
  g.fillStyle = '#8a8676'; g.fillRect(0, 0, W, H); noise(g, 120, .5, 'soft-light', 2001);
  // gator och hus i Tar Valon runt tornets område
  const r = rng(2002);
  for (let i = 0; i < 700; i++) { const x = r() * W, y = r() * H; if (Math.hypot(x - B.t[0], (y - B.t[1]) * .9) < 470 || (Math.abs(x - 1000) < 220 && y > 760)) continue; const s = 16 + r() * 22;
    g.fillStyle = 'rgba(20,16,12,.3)'; g.fillRect(x + 3, y + 3, s, s * .7); g.fillStyle = ['#e2ddd0', '#d6cfbe', '#cbc3b0', '#ece8de'][(r() * 4) | 0]; g.fillRect(x, y, s, s * .7); g.strokeStyle = 'rgba(60,54,44,.5)'; g.lineWidth = 1; g.strokeRect(x, y, s, s * .7); }
  // tornets område med trädgårdar
  const gp = new Path2D(); gp.ellipse(B.t[0], B.t[1] + 40, 450, 410, 0, 0, 7);
  g.fillStyle = '#6f7e48'; g.fill(gp); g.save(); g.clip(gp); noise(g, 30, .4, 'soft-light', 2003); g.restore();
  g.strokeStyle = '#f2efe6'; g.lineWidth = 10; g.stroke(gp); g.strokeStyle = '#3a342a'; g.lineWidth = 2; g.stroke(gp);
  forest(g, blob(700, 820, 90, 60, 121, .3), 2004, 20, 12); forest(g, blob(1320, 820, 90, 60, 122, .3), 2005, 20, 12); forest(g, blob(640, 300, 70, 60, 123, .3), 2006, 20, 12);
  // torget framför huvudingången
  g.fillStyle = '#d8d2c2'; g.fillRect(780, 880, 440, 300); g.strokeStyle = '#3a342a'; g.lineWidth = 2; g.strokeRect(780, 880, 440, 300);
  g.strokeStyle = 'rgba(60,54,44,.25)'; g.lineWidth = 1; for (let x = 780; x < 1220; x += 22) { g.beginPath(); g.moveTo(x, 880); g.lineTo(x, 1180); g.stroke(); }
  // flyglarna och tornet
  for (const [x, y, w, h] of [[560, 460, 260, 150], [1180, 460, 260, 150], [880, 760, 240, 140]]) { g.fillStyle = 'rgba(20,16,12,.4)'; g.fillRect(x + 8, y + 10, w, h); g.fillStyle = '#f4f1ea'; g.fillRect(x, y, w, h); g.strokeStyle = '#3a342a'; g.lineWidth = 2.5; g.strokeRect(x, y, w, h); }
  g.fillStyle = 'rgba(20,16,12,.45)'; g.beginPath(); g.arc(B.t[0] + 14, B.t[1] + 18, B.R, 0, 7); g.fill();
  const tg = g.createRadialGradient(B.t[0] - 60, B.t[1] - 70, 20, B.t[0], B.t[1], B.R); tg.addColorStop(0, '#ffffff'); tg.addColorStop(1, '#d8d3c6');
  g.fillStyle = tg; g.beginPath(); g.arc(...B.t, B.R, 0, 7); g.fill(); g.strokeStyle = '#3a342a'; g.lineWidth = 3; g.stroke();
  for (const k of [.72, .44]) { g.strokeStyle = 'rgba(60,54,44,.3)'; g.lineWidth = 1.5; g.beginPath(); g.arc(...B.t, B.R * k, 0, 7); g.stroke(); }
  night(g, .3); grain(g, 2007);
}
