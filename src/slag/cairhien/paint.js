// ---------- Kampanjkartan: Cairhien och floderna ----------
const C = {
  city: [770, 650],
  alg: [[640, -20], [672, 260], [700, 520], [712, 600], [702, 700], [660, 900], [610, 1100], [590, 1270]],
  gaelin: [[2020, 360], [1750, 420], [1450, 470], [1150, 520], [930, 560], [790, 585], [712, 600]],
  east: [[822, 645], [1000, 625], [1300, 585], [1600, 545], [1850, 515], [2020, 505]],
  north: [[770, 598], [760, 540], [700, 420], [630, 250], [580, -20]],
  south: [[770, 702], [790, 800], [770, 950], [740, 1270]],
  eianrod: [1850, 505], tsofu: [930, 800], sabinel: [800, 950], tremonsien: [1300, 300]
};
function hills(g, list, seed) {
  // Kullar: ljus sluttning mot nordväst, skugga mot sydost, svaga höjdkurvor
  const r = rng(seed);
  for (const [x, y, rx, ry] of list) {
    const pts = blob(x, y, rx, ry, (r() * 1e6) | 0, .18);
    const p = polyPath2D(pts);
    const gr = g.createRadialGradient(x - rx * .35, y - ry * .45, rx * .1, x, y, Math.max(rx, ry) * 1.1);
    gr.addColorStop(0, 'rgba(236,224,160,.42)'); gr.addColorStop(.55, 'rgba(150,150,80,.12)'); gr.addColorStop(1, 'rgba(40,40,12,.38)');
    g.fillStyle = gr; g.fill(p);
    g.save(); g.strokeStyle = 'rgba(60,56,24,.28)'; g.lineWidth = 1.2;
    for (const k of [.7, .42]) { g.stroke(polyPath2D(pts.map(([px, py]) => [x + (px - x) * k - rx * .06 * (1 - k), y + (py - y) * k - ry * .08 * (1 - k)]))); }
    g.restore();
  }
}
function cityPlan(g, x0, y0, s, opts = {}) {
  // Fyrkantig stad med rutnät av gator, Topless Towers och Solpalatset (tolkning)
  const r = rng(opts.seed || 5);
  g.fillStyle = '#8f8670'; g.fillRect(x0, y0, s, s);
  const n = opts.blocks || 8, b = s / n, st = Math.max(2, b * .16);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const bx = x0 + i * b + st / 2, by = y0 + j * b + st / 2, bw = b - st, bh = b - st;
    g.fillStyle = 'rgba(20,14,8,.35)'; g.fillRect(bx + 2, by + 2, bw, bh);
    g.fillStyle = ['#a9946a', '#9c8862', '#b19c70', '#8f7e5c'][(r() * 4) | 0]; g.fillRect(bx, by, bw, bh);
    g.strokeStyle = 'rgba(50,36,20,.55)'; g.lineWidth = 1; g.strokeRect(bx, by, bw, bh);
    if (b > 30) { g.strokeStyle = 'rgba(60,44,24,.4)'; g.beginPath(); g.moveTo(bx + bw / 2, by); g.lineTo(bx + bw / 2, by + bh); g.moveTo(bx, by + bh / 2); g.lineTo(bx + bw, by + bh / 2); g.stroke(); }
  }
  if (opts.palace) { const [px, py, pw] = opts.palace; g.fillStyle = 'rgba(20,14,8,.4)'; g.fillRect(px + 4, py + 4, pw, pw * .8); g.fillStyle = '#c9a54a'; g.fillRect(px, py, pw, pw * .8); g.strokeStyle = '#5a4214'; g.lineWidth = 2; g.strokeRect(px, py, pw, pw * .8); g.fillStyle = '#e8cf7a'; g.fillRect(px + pw * .3, py + pw * .2, pw * .4, pw * .4); }
  for (const [tx, ty, ts] of opts.towers || []) {
    // höga fyrkantiga torn med lång skugga åt sydost
    g.fillStyle = 'rgba(15,10,5,.45)'; g.beginPath(); g.moveTo(tx, ty); g.lineTo(tx + ts, ty); g.lineTo(tx + ts * 4, ty + ts * 3.2); g.lineTo(tx + ts * 3, ty + ts * 4.2); g.lineTo(tx, ty + ts); g.closePath(); g.fill();
    g.fillStyle = '#d8ccb0'; g.fillRect(tx, ty, ts, ts); g.fillStyle = '#a8987a'; g.fillRect(tx + ts * .5, ty, ts * .5, ts); g.strokeStyle = '#4a3c28'; g.lineWidth = 1.2; g.strokeRect(tx, ty, ts, ts);
  }
  // muren
  const w = opts.wall || 6;
  g.strokeStyle = '#3a3226'; g.lineWidth = w + 3; g.strokeRect(x0, y0, s, s);
  g.strokeStyle = '#cfc4a8'; g.lineWidth = w; g.strokeRect(x0, y0, s, s);
  g.fillStyle = '#e2d8bc';
  const tw = w * 2.2;
  for (let k = 0; k <= 6; k++) for (const [ax, ay] of [[x0 + s * k / 6, y0], [x0 + s * k / 6, y0 + s], [x0, y0 + s * k / 6], [x0 + s, y0 + s * k / 6]]) { g.fillRect(ax - tw / 2, ay - tw / 2, tw, tw); g.strokeStyle = '#3a3226'; g.lineWidth = 1.2; g.strokeRect(ax - tw / 2, ay - tw / 2, tw, tw); }
}
function foregate(g, x0, y0, s, depth, seed, burnt) {
  // Förstaden utanför murarna: en oregelbunden zon av kojor runt staden, eller brandrester
  const r = rng(seed), ph = [r() * 6.3, r() * 6.3, r() * 6.3], N = 120, pts = [];
  const cx = x0 + s / 2, cy = y0 + s / 2;
  for (let i = 0; i < N; i++) {
    const t = i / N * 4, side = Math.floor(t), u = t - side;
    const p = [[x0 + u * s, y0, 0, -1], [x0 + s, y0 + u * s, 1, 0], [x0 + s - u * s, y0 + s, 0, 1], [x0, y0 + s - u * s, -1, 0]][side];
    const a = i / N * Math.PI * 2, k = .5 + .5 * (.5 + .5 * Math.sin(a * 3 + ph[0])) * (.6 + .4 * Math.sin(a * 7 + ph[1])) + .15 * Math.sin(a * 13 + ph[2]);
    // hörnen rundas av genom att dra punkten lite mot mitten
    const corner = Math.min(u, 1 - u) < .12 ? .5 : 1;
    pts.push([p[0] + p[2] * depth * k * corner + (p[0] - cx) * .02, p[1] + p[3] * depth * k * corner + (p[1] - cy) * .02]);
  }
  const outer = polyPath2D(pts), zone = new Path2D(outer); zone.rect(x0 + s, y0, -s, s);
  g.save(); g.fillStyle = burnt ? 'rgba(42,34,26,.72)' : 'rgba(140,110,70,.5)'; g.fill(zone, 'evenodd'); g.restore();
  const bx = [x0 - depth * 1.6, x0 + s + depth * 1.6], by = [y0 - depth * 1.6, y0 + s + depth * 1.6];
  for (let i = 0; i < 900; i++) {
    const x = bx[0] + r() * (bx[1] - bx[0]), y = by[0] + r() * (by[1] - by[0]);
    if (x > x0 - 3 && x < x0 + s + 3 && y > y0 - 3 && y < y0 + s + 3) continue;
    if (!g.isPointInPath(outer, x * RES, y * RES)) continue;
    const sz = 3 + r() * 6;
    g.fillStyle = burnt ? (r() < .5 ? '#1c1511' : r() < .5 ? '#3a2c22' : '#55402e') : (r() < .5 ? '#9a7a4a' : '#7d6038');
    g.save(); g.translate(x, y); g.rotate(r() * 1.5); g.fillRect(-sz / 2, -sz * .35, sz, sz * .7); g.restore();
  }
}
function paintCampaign() {
  const g = setupCanvas('cv-campaign');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#7f8a4a'); bg.addColorStop(.5, '#8c8f50'); bg.addColorStop(1, '#78824a');
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  noise(g, 140, .5, 'soft-light', 511);
  hills(g, [[1050, 760, 120, 70], [1250, 880, 140, 80], [1500, 760, 130, 70], [1150, 420, 110, 60], [1400, 640, 120, 60], [980, 980, 120, 70], [1700, 880, 150, 80], [1600, 300, 120, 60]], 512);
  const taken = [], noC = (x, y) => Math.abs(x - C.city[0]) < 90 && Math.abs(y - C.city[1]) < 90;
  farmland(g, 900, 560, -.15, 5, 3, 30, 22, 513, {taken, avoid: noC, skip: .25, bushes: 5});
  farmland(g, 880, 760, .2, 5, 4, 30, 22, 514, {taken, avoid: noC, skip: .25, bushes: 5});
  farmland(g, 600, 700, .1, 3, 6, 30, 22, 515, {taken, avoid: (x, y) => noC(x, y) || x > 690, skip: .3, bushes: 5});
  farmland(g, ...C.eianrod, -.1, 4, 3, 28, 21, 516, {taken, skip: .25});
  farmland(g, ...C.tsofu, .3, 3, 3, 28, 21, 517, {taken, skip: .25});
  farmland(g, ...C.sabinel, .1, 3, 3, 28, 21, 518, {taken, skip: .25});
  river(g, C.alg, 18); river(g, C.gaelin, 14);
  mountains(g, [[1150, 0], [2020, 0], [2020, 160], [1800, 240], [1550, 330], [1350, 380], [1230, 360], [1300, 250], [1500, 170]], 519, 46, 40, 110);
  forest(g, blob(1050, 300, 120, 70, 21, .3), 520, 13, 8);
  forest(g, blob(1350, 1050, 170, 90, 22, .3), 521, 14, 8.5);
  forest(g, blob(480, 400, 130, 120, 23, .3), 522, 14, 8.5);
  forest(g, blob(1800, 1100, 160, 100, 24, .3), 523, 14, 8.5);
  forest(g, blob(380, 1000, 140, 110, 25, .3), 524, 14, 8.5);
  road(g, C.east, 4.5); road(g, C.north, 4); road(g, C.south, 4);
  foregate(g, 722, 602, 96, 22, 525, false);
  cityPlan(g, 722, 602, 96, {blocks: 6, wall: 3, seed: 526, towers: [[742, 618, 6], [790, 640, 6], [752, 680, 6]], palace: [770, 625, 18]});
  const hs = [], r = rng(527);
  const village = (x, y, n, s) => { for (let i = 0; i < n; i++) { const a = r() * 6.3, d = r() * s * 3; hs.push([x + Math.cos(a) * d, y + Math.sin(a) * d * .8, s * (.8 + r() * .5), s * (.6 + r() * .3), r() * .8 - .4, i === 0]); } };
  village(...C.eianrod, 12, 6); village(...C.tsofu, 8, 5); village(...C.sabinel, 8, 5); village(...C.tremonsien, 6, 5);
  houses(g, hs);
  grain(g, 530);
}

// ---------- Slagfältet: kullarna öster om Cairhien ----------
const B = {
  city: [70, 400, 400],               // x, y, sida (tolkning)
  gaelin: [[2020, 230], [1700, 180], [1300, 205], [900, 160], [560, 190], [300, 170], [-20, 140]],
  alg: [[30, -20], [36, 380], [24, 820], [40, 1270]],
  east: [[470, 600], [700, 610], [1000, 590], [1350, 610], [1700, 640], [2020, 620]],
  north: [[270, 400], [272, 300], [270, 172], [262, -20]],
  north2: [[700, 610], [760, 420], [820, 165], [850, -20]],
  south: [[270, 800], [280, 1000], [300, 1270]],
  bridges: [[270, 172], [820, 166]],
  tower: [920, 420], camp: [1760, 650], heal: [1470, 560], glass: [1180, 700],
  matHill: [1000, 780], gapA: [1190, 735], gapB: [1190, 905], colValley: [600, 990], highHill: [790, 880]
};
function paintBattle() {
  const g = setupCanvas('cv-battle');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#76803f'); bg.addColorStop(1, '#6f7a3c');
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  noise(g, 90, .55, 'soft-light', 601);
  const [cx0, cy0, cs] = B.city;
  hills(g, [[920, 440, 140, 95], [1180, 700, 120, 85], [1520, 380, 170, 105], [1650, 860, 180, 115], [1000, 780, 120, 80], [1190, 735, 100, 62], [1190, 905, 105, 66], [790, 880, 125, 85], [460, 940, 120, 80], [1380, 1100, 160, 90], [1250, 330, 120, 70], [1850, 400, 120, 90], [620, 300, 100, 70]], 602);
  const segDist = (x, y, pts) => { let d = 1e9; for (let k = 0; k < pts.length - 1; k++) { const [x1, y1] = pts[k], [x2, y2] = pts[k + 1], dx = x2 - x1, dy = y2 - y1, t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy))); d = Math.min(d, Math.hypot(x - x1 - t * dx, y - y1 - t * dy)); } return d; };
  const no = (x, y) => (x < cx0 + cs + 150 && y > cy0 - 150 && y < cy0 + cs + 150) || segDist(x, y, B.east) < 50 || segDist(x, y, B.gaelin) < 60 || segDist(x, y, B.north2) < 45 || segDist(x, y, B.south) < 45
    || [[920, 440, 150], [1180, 700, 120], [1000, 780, 120], [1190, 820, 150], [790, 880, 130]].some(([hx, hy, hr]) => Math.hypot(x - hx, y - hy) < hr);
  farmland(g, 1250, 640, -.06, 14, 13, 104, 78, 603, {taken: [], avoid: no, skip: .45, bushes: 9});
  river(g, B.gaelin, 24); river(g, B.alg, 30);
  forest(g, blob(650, 760, 90, 60, 31, .35), 604, 26, 16);
  forest(g, blob(1350, 470, 110, 70, 32, .35), 605, 26, 16);
  forest(g, blob(1430, 920, 120, 70, 33, .35), 606, 26, 16);
  forest(g, blob(1900, 1100, 160, 110, 34, .35), 607, 26, 17);
  forest(g, blob(1100, 330, 90, 55, 35, .35), 608, 26, 16);
  forest(g, blob(560, 1180, 120, 60, 36, .35), 609, 26, 16);
  forest(g, blob(1880, 260, 120, 90, 37, .35), 610, 26, 17);
  forest(g, blob(880, 1180, 110, 60, 38, .35), 611, 26, 16);
  road(g, B.east, 14); road(g, B.north, 14); road(g, B.north2, 11); road(g, B.south, 12);
  // broar över Gaelin
  for (const [bx, by] of B.bridges) { g.save(); g.translate(bx, by); g.fillStyle = 'rgba(0,0,0,.4)'; g.fillRect(-14, -26, 32, 56); g.fillStyle = '#8a7a5c'; g.fillRect(-16, -28, 32, 56); g.strokeStyle = '#3a2e1c'; g.lineWidth = 2; g.strokeRect(-16, -28, 32, 56); g.restore(); }
  foregate(g, cx0, cy0, cs, 80, 612, true);
  cityPlan(g, cx0, cy0, cs, {blocks: 9, wall: 9, seed: 613, palace: [230, 540, 90], towers: [[120, 450, 20], [360, 440, 18], [150, 680, 20], [380, 700, 18], [260, 470, 16], [420, 560, 18]]});
  // glaskullen ritas i SVG (syns först när den smälts)
  grain(g, 614);
}
