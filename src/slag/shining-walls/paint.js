// ---------- Gemensamma hjälpare ----------
function hills(g, list, seed, light = 'rgba(236,224,160,.42)') {
  const r = rng(seed);
  for (const [x, y, rx, ry] of list) {
    const pts = blob(x, y, rx, ry, (r() * 1e6) | 0, .18), p = polyPath2D(pts);
    const gr = g.createRadialGradient(x - rx * .35, y - ry * .45, rx * .1, x, y, Math.max(rx, ry) * 1.1);
    gr.addColorStop(0, light); gr.addColorStop(.55, 'rgba(150,150,120,.12)'); gr.addColorStop(1, 'rgba(40,40,30,.32)');
    g.fillStyle = gr; g.fill(p);
    g.save(); g.strokeStyle = 'rgba(60,56,40,.25)'; g.lineWidth = 1.2;
    for (const k of [.7, .42]) g.stroke(polyPath2D(pts.map(([px, py]) => [x + (px - x) * k - rx * .06 * (1 - k), y + (py - y) * k - ry * .08 * (1 - k)])));
    g.restore();
  }
}
function riverBand(g, pts, w) {
  const p = new Path2D(smoothPath(pts));
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = 'rgba(58,52,30,.5)'; g.lineWidth = w + 12; g.stroke(p);
  g.strokeStyle = '#4a6c78'; g.lineWidth = w; g.stroke(p);
  g.strokeStyle = 'rgba(190,220,225,.3)'; g.lineWidth = Math.max(2, w * .08); g.setLineDash([w * .6, w * .5]); g.stroke(p);
  g.restore();
}
function snow(g, seed, amount) {
  // snötäcke: ljus slöja och fläckar av snö
  g.save(); g.fillStyle = `rgba(240,244,248,${amount})`; g.fillRect(0, 0, W, H);
  const r = rng(seed);
  for (let i = 0; i < 2600; i++) { const x = r() * W, y = r() * H, rr = 1.5 + r() * 5; g.fillStyle = `rgba(250,252,255,${.12 + r() * .25})`; g.beginPath(); g.ellipse(x, y, rr, rr * .6, r() * 3, 0, 7); g.fill(); }
  g.restore();
}
// ---------- Kampanjkartan: Aielkriget 976–978 NE ----------
const C = {
  tarValon: [880, 190], dragonmount: [640, 250], cairhien: [1330, 820], caemlyn: [260, 720], pass: [1830, 800],
  erinin: [[820, -30], [880, 120], [900, 260], [930, 420], [960, 600], [1000, 800], [1030, 1000], [1060, 1280]],
  alguenya: [[1500, -30], [1460, 300], [1400, 560], [1350, 800], [1300, 1000], [1240, 1280]],
  spine: [[1720, -30], [2030, -30], [2030, 1280], [1760, 1280], [1700, 1000], [1740, 860], [1760, 740], [1700, 500], [1740, 200]]
};
function paintCampaign() {
  const g = setupCanvas('cv-campaign');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#8a8c56'); bg.addColorStop(1, '#7a8250');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 140, .5, 'soft-light', 1301);
  hills(g, [[500, 400, 200, 100], [1100, 400, 180, 90], [700, 1000, 220, 100], [1500, 600, 160, 80]], 1302);
  // Ryggraden med Jangai-passet
  mountains(g, C.spine.filter(([x, y]) => !(y > 760 && y < 840)).length ? C.spine : C.spine, 1303, 46, 40, 110);
  g.save(); g.fillStyle = 'rgba(140,120,80,.85)'; g.beginPath(); g.ellipse(C.pass[0], C.pass[1], 120, 26, 0, 0, 7); g.fill(); g.restore();
  // Dragonmount: en ensam, väldig topp
  const dm = blob(C.dragonmount[0], C.dragonmount[1], 120, 110, 1304, .2, 22);
  const dg = g.createRadialGradient(C.dragonmount[0] - 30, C.dragonmount[1] - 40, 10, C.dragonmount[0], C.dragonmount[1], 130);
  dg.addColorStop(0, '#f2efe6'); dg.addColorStop(.35, '#a59a86'); dg.addColorStop(1, '#4e463a');
  g.fillStyle = dg; g.fill(polyPath2D(dm)); g.strokeStyle = '#2e2a22'; g.lineWidth = 2; g.stroke(polyPath2D(dm));
  g.fillStyle = '#2a1a12'; g.beginPath(); g.arc(C.dragonmount[0], C.dragonmount[1], 14, 0, 7); g.fill();
  forest(g, blob(640, 760, 160, 110, 81, .3), 1305, 13, 8);
  riverBand(g, C.erinin, 18); riverBand(g, C.alguenya, 12);
  // Tar Valon, Cairhien, Caemlyn
  g.fillStyle = '#e8e4da'; g.beginPath(); g.ellipse(C.tarValon[0] + 18, C.tarValon[1] + 60, 22, 60, -.1, 0, 7); g.fill(); g.strokeStyle = '#2e2a22'; g.lineWidth = 2; g.stroke();
  for (const [x, y, s] of [[C.cairhien[0], C.cairhien[1], 40], [C.caemlyn[0], C.caemlyn[1], 38]]) { g.fillStyle = '#a89470'; g.fillRect(x - s, y - s, s * 2, s * 2); g.strokeStyle = '#cfc4a8'; g.lineWidth = 4; g.strokeRect(x - s, y - s, s * 2, s * 2); }
  road(g, [[C.caemlyn[0], C.caemlyn[1]], [600, 600], [880, 520], [1100, 700], [C.cairhien[0], C.cairhien[1]]], 4);
  road(g, [[C.caemlyn[0], C.caemlyn[1]], [500, 450], [750, 300], [C.tarValon[0], C.tarValon[1] + 80]], 4);
  snow(g, 1306, .05);
  grain(g, 1307);
}

// ---------- Slagfältet: snön kring Tar Valon ----------
const B = {
  island: [[960, 120], [1080, 200], [1130, 420], [1120, 700], [1070, 950], [980, 1080], [900, 960], [860, 700], [860, 420], [890, 220]],
  west: [[700, -30], [760, 200], [770, 500], [760, 800], [790, 1100], [840, 1280]],
  east: [[1260, -30], [1250, 250], [1300, 600], [1290, 900], [1220, 1120], [1160, 1280]],
  bridges: [[[860, 380], [740, 380]], [[860, 760], [760, 760]], [[1120, 300], [1270, 300]], [[1120, 640], [1290, 640]], [[980, 1080], [980, 1200]]],
  jualdhe: [560, 560], alindaer: [1500, 480], darein: [990, 1210], dm: [150, 330]
};
function paintBattle() {
  const g = setupCanvas('cv-battle');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#8e9070'); bg.addColorStop(1, '#7e8466');
  g.fillStyle = bg; g.fillRect(0, 0, W, H); noise(g, 120, .5, 'soft-light', 1401);
  // Dragonmounts nedre sluttningar i väster
  const dm = polyPath2D(blob(B.dm[0] - 60, B.dm[1], 300, 340, 1402, .2, 22));
  const dg = g.createRadialGradient(B.dm[0] - 120, B.dm[1] - 60, 20, B.dm[0], B.dm[1], 360);
  dg.addColorStop(0, '#d8d2c2'); dg.addColorStop(.5, '#8a8270'); dg.addColorStop(1, 'rgba(70,64,50,.2)'); g.fillStyle = dg; g.fill(dm);
  hills(g, [[400, 900, 200, 100], [1650, 900, 220, 110], [1700, 250, 220, 120], [350, 150, 160, 80]], 1403);
  forest(g, blob(1600, 1100, 200, 90, 82, .35), 1404, 26, 16);
  forest(g, blob(380, 700, 120, 160, 83, .35), 1405, 26, 16);
  forest(g, blob(1750, 600, 120, 140, 84, .35), 1406, 26, 16);
  // floden Erinin i två armar kring ön
  const wp = new Path2D(smoothPath(B.west)), ep = new Path2D(smoothPath(B.east));
  g.save(); g.lineCap = 'round';
  for (const [p, w] of [[wp, 170], [ep, 150]]) { g.strokeStyle = 'rgba(58,52,30,.5)'; g.lineWidth = w + 14; g.stroke(p); g.strokeStyle = '#4a6c78'; g.lineWidth = w; g.stroke(p); }
  g.restore();
  g.fillStyle = '#4a6c78'; g.fill(polyPath2D(blob(1000, 600, 300, 600, 1407, .05)));
  // ön med de vita murarna och tornen
  const ip = polyPath2D(B.island);
  g.fillStyle = '#b9b2a0'; g.fill(ip);
  g.save(); g.clip(ip);
  const r = rng(1408);
  for (let i = 0; i < 260; i++) { const x = 860 + r() * 280, y = 120 + r() * 960, s = 10 + r() * 16; g.fillStyle = ['#dcd6c8', '#cfc8b6', '#e6e1d4'][(r() * 3) | 0]; g.fillRect(x, y, s, s * .7); g.strokeStyle = 'rgba(60,54,44,.4)'; g.lineWidth = .8; g.strokeRect(x, y, s, s * .7); }
  g.restore();
  g.strokeStyle = '#2e2a22'; g.lineWidth = 9; g.stroke(ip); g.strokeStyle = '#f6f4ee'; g.lineWidth = 6; g.stroke(ip);
  // Vita tornet
  g.fillStyle = 'rgba(20,16,12,.4)'; g.beginPath(); g.arc(1006, 606, 46, 0, 7); g.fill();
  g.fillStyle = '#fbfaf6'; g.beginPath(); g.arc(1000, 600, 44, 0, 7); g.fill(); g.strokeStyle = '#3a342a'; g.lineWidth = 3; g.stroke();
  // broarna
  g.save(); g.lineCap = 'butt';
  for (const br of B.bridges) { g.strokeStyle = '#2e2a22'; g.lineWidth = 20; g.beginPath(); g.moveTo(...br[0]); g.lineTo(...br[1]); g.stroke(); g.strokeStyle = '#e0dacb'; g.lineWidth = 14; g.stroke(); }
  g.restore();
  // byarna på stränderna
  for (const [x, y] of [B.jualdhe, B.alindaer, B.darein]) { const rr = rng(x * 7 + y), hs = []; for (let i = 0; i < 40; i++) hs.push([x + (rr() - .5) * 160, y + (rr() - .5) * 90, 14, 10, (rr() - .5) * .4, rr() < .1]); hs.sort((a, b) => a[1] - b[1]); houses(g, hs); }
  road(g, [[740, 380], [600, 450], [B.jualdhe[0], B.jualdhe[1]], [300, 650], [-20, 760]], 10);
  road(g, [[1270, 300], [1400, 400], [B.alindaer[0], B.alindaer[1]], [1750, 420], [2020, 380]], 10);
  road(g, [[980, 1200], [960, 1280]], 10);
  snow(g, 1409, .14);
  grain(g, 1410);
}
