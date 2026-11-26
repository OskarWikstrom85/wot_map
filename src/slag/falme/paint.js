// ---------- Kampanjkartan: Toman Head ----------
// Gemensamma hjälpare för kust, kullar och stad
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
function seaAndLand(g, land, seed, colors) {
  // Hav med vågmönster, sedan land med sandstrand och mörk kantlinje
  const sg = g.createLinearGradient(0, 0, W * .4, H); sg.addColorStop(0, '#2f5866'); sg.addColorStop(1, '#264956');
  g.fillStyle = sg; g.fillRect(0, 0, W, H);
  noise(g, 70, .35, 'soft-light', seed);
  const r = rng(seed + 1); g.save(); g.strokeStyle = 'rgba(190,220,225,.22)'; g.lineWidth = 1.4;
  for (let i = 0; i < 260; i++) { const x = r() * W, y = r() * H, w = 10 + r() * 22; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + w / 2, y - 4, x + w, y); g.stroke(); }
  g.restore();
  const lp = polyPath2D(land);
  g.save(); g.strokeStyle = 'rgba(160,200,205,.35)'; g.lineWidth = 34; g.stroke(lp); g.strokeStyle = 'rgba(200,225,225,.35)'; g.lineWidth = 16; g.stroke(lp); g.restore();
  g.save(); g.strokeStyle = '#cdbb86'; g.lineWidth = 12; g.stroke(lp); g.restore();
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, colors[0]); bg.addColorStop(1, colors[1]);
  g.fillStyle = bg; g.fill(lp);
  g.save(); g.clip(lp); noise(g, 120, .5, 'soft-light', seed + 2); g.restore();
  g.save(); g.strokeStyle = 'rgba(40,30,16,.55)'; g.lineWidth = 2; g.stroke(lp); g.restore();
  return lp;
}
function town(g, cx, cy, rx, ry, n, s, seed, avoid) {
  const r = rng(seed), hs = [];
  for (let i = 0; i < n; i++) {
    const a = r() * 6.3, d = Math.sqrt(r()), x = cx + Math.cos(a) * rx * d, y = cy + Math.sin(a) * ry * d;
    if (avoid && avoid(x, y)) continue;
    hs.push([x, y, s * (.8 + r() * .6), s * (.6 + r() * .35), (r() - .5) * .5, r() < .08]);
  }
  hs.sort((a, b) => a[1] - b[1]); houses(g, hs);
}
const C = {
  land: [[2030, -30], [930, -30], [860, 160], [760, 330], [600, 470], [420, 540], [270, 575], [215, 630], [270, 690], [460, 730], [660, 800], [800, 930], [880, 1100], [920, 1280], [2030, 1280]],
  falme: [300, 630], camp: [1020, 470], wcCamp: [1620, 760],
  road: [[320, 630], [520, 640], [760, 620], [1000, 600], [1300, 650], [1600, 760], [2020, 820]]
};
function paintCampaign() {
  const g = setupCanvas('cv-campaign');
  const lp = seaAndLand(g, C.land, 701, ['#848a4c', '#77804a']);
  g.save(); g.clip(lp);
  hills(g, [[700, 560, 150, 70], [950, 420, 170, 90], [1100, 620, 160, 80], [880, 760, 150, 80], [1250, 380, 160, 80], [600, 680, 110, 50]], 702);
  mountains(g, [[1350, -30], [2030, -30], [2030, 240], [1820, 300], [1600, 260], [1420, 160]], 703, 46, 40, 100);
  forest(g, blob(1450, 560, 140, 70, 41, .3), 704, 13, 8);
  forest(g, blob(1750, 1050, 200, 110, 42, .3), 705, 14, 8.5);
  forest(g, blob(1150, 900, 120, 70, 43, .3), 706, 13, 8);
  farmland(g, 1650, 640, .1, 6, 4, 34, 24, 707, {skip: .3, bushes: 6});
  farmland(g, 1400, 820, -.1, 5, 4, 34, 24, 708, {skip: .3, bushes: 6});
  road(g, C.road, 4.5);
  town(g, ...C.falme, 46, 34, 60, 6, 709);
  town(g, 1300, 650, 26, 18, 14, 5, 710); town(g, 1700, 680, 24, 18, 12, 5, 711);
  g.restore();
  grain(g, 712);
}

// ---------- Slagfältet: Falme och slätten öster om staden ----------
const B = {
  land: [[640, -30], [600, 140], [520, 300], [470, 430], [520, 540], [610, 585], [590, 650], [490, 720], [440, 840], [520, 960], [600, 1090], [640, 1280], [2030, 1280], [2030, -30]],
  town: [760, 610], turak: [840, 470], kennel: [700, 720], wharf: [600, 630],
  road: [[610, 630], [760, 640], [940, 620], [1150, 560], [1400, 520], [1700, 470], [2020, 440]],
  road2: [[760, 640], [880, 760], [1100, 860], [1400, 900], [1700, 940], [2020, 980]],
  hill: [1180, 360], plain: [1150, 830]
};
function paintBattle() {
  const g = setupCanvas('cv-battle');
  const lp = seaAndLand(g, B.land, 801, ['#7d8646', '#727c42']);
  g.save(); g.clip(lp);
  hills(g, [[1180, 360, 150, 90], [1500, 300, 180, 100], [880, 360, 130, 80], [1750, 640, 160, 90], [1450, 1080, 200, 100], [980, 1100, 160, 80], [1850, 200, 150, 90]], 802);
  const no = (x, y) => Math.hypot((x - B.town[0]) / 230, (y - B.town[1]) / 260) < 1 || Math.hypot(x - B.hill[0], y - B.hill[1]) < 150;
  farmland(g, 1450, 720, .08, 10, 6, 70, 52, 803, {avoid: no, skip: .4, bushes: 8});
  forest(g, blob(1700, 1120, 170, 90, 51, .35), 804, 26, 16);
  forest(g, blob(1900, 560, 110, 120, 52, .35), 805, 26, 16);
  forest(g, blob(1000, 200, 120, 60, 53, .35), 806, 26, 16);
  road(g, B.road, 13); road(g, B.road2, 11);
  // gator och hus i Falme, tätast nere vid hamnen
  g.save(); g.strokeStyle = '#a99064'; g.lineCap = 'round';
  for (const pts of [[[610, 630], [700, 560], [800, 500], [850, 460]], [[620, 560], [700, 620], [780, 700], [820, 800]], [[560, 760], [680, 700], [800, 680], [920, 660]], [[640, 470], [760, 520], [900, 560]]]) { g.lineWidth = 7; g.stroke(new Path2D(smoothPath(pts))); }
  g.restore();
  const avoidTurak = (x, y) => Math.hypot(x - B.turak[0], y - B.turak[1]) < 60;
  town(g, 730, 640, 180, 220, 300, 13, 807, (x, y) => avoidTurak(x, y) || !g.isPointInPath(lp, (x - 20) * RES, y * RES));
  // Turaks hus: stort hus med trädgård överst i staden
  g.save(); g.fillStyle = '#6f8a44'; g.fillRect(B.turak[0] - 52, B.turak[1] - 40, 104, 80); g.strokeStyle = '#3e4c22'; g.lineWidth = 3; g.strokeRect(B.turak[0] - 52, B.turak[1] - 40, 104, 80); g.restore();
  houses(g, [[B.turak[0], B.turak[1] - 6, 58, 38, 0, true]]);
  // kajer
  g.save(); g.fillStyle = '#7a6a4c'; g.strokeStyle = '#2e2416'; g.lineWidth = 2;
  for (const [x, y, w, h, a] of [[575, 620, 70, 12, -.3], [560, 665, 64, 12, .1], [520, 720, 60, 11, .5]]) { g.save(); g.translate(x, y); g.rotate(a); g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h); g.restore(); }
  g.restore();
  g.restore();
  grain(g, 808);
}
