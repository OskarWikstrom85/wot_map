Object.assign(EMB, {
  dragon: '<path d="M3 13c2-6 7-9 12-8-3 1-4 3-3 5 3-1 5 1 5 3-2-1-4-1-6 1-2 2-5 3-8 2 2-1 3-2 3-3-1 1-2 1-3 0z" fill="currentColor"/>',
  spear: '<path d="M10 1l2 5h-1.2v12H9.2V6H8z" fill="currentColor"/>',
  sword: '<path d="M10 1l1.6 3v9h-3.2V4z" fill="currentColor"/><path d="M6 13h8v1.6H6zM9.2 14.6h1.6V19H9.2z" fill="currentColor"/>',
  hawk: '<path d="M10 4l2 2 6-1-4 4 2 2-6-1-2 6-1-6-5 1 3-3-4-3 6 1z" fill="currentColor"/>',
  paw: '<circle cx="10" cy="12" r="4" fill="currentColor"/><circle cx="5" cy="7" r="2" fill="currentColor"/><circle cx="9" cy="4.5" r="2" fill="currentColor"/><circle cx="13.5" cy="5" r="2" fill="currentColor"/><circle cx="16" cy="9" r="2" fill="currentColor"/>',
  chest: '<path d="M3 7h14v10H3z" fill="currentColor"/><path d="M3 7c0-3 14-3 14 0" fill="currentColor"/><rect x="9" y="9" width="2" height="3" fill="#000"/>'
});
Object.assign(SIDE, {
  tower: {name: 'Tornets Aes Sedai', flag: '#f2efe6', fg: '#8a1e1a', troop: '#e8e2d2', card: 'linear-gradient(#b8aa90,#3a3020)'},
  young: {name: 'Younglings', flag: '#2a4a7a', fg: '#e8e0c8', troop: '#3a5070', card: 'linear-gradient(#3a5a8a,#121c2c)'},
  shaido: {name: 'Shaido', flag: '#2a1a14', fg: '#d0603a', troop: '#6e5638', card: 'linear-gradient(#4a2a1c,#140c09)'},
  tr: {name: 'Two Rivers', flag: '#f3ead2', fg: '#a8221c', troop: '#6e3a24', card: 'linear-gradient(#9b1d17,#3a0d0a)'},
  cair: {name: 'Cairhien', flag: '#1f4e9c', fg: '#f2c230', troop: '#33507e', card: 'linear-gradient(#2a5fae,#0f2142)'},
  may: {name: 'Mayene', flag: '#2b4c8a', fg: '#e2b23a', troop: '#7a2a24', card: 'linear-gradient(#2b4c8a,#10203a)'},
  aiel: {name: 'Rands Aiel', flag: '#b5562a', fg: '#f6e7c4', troop: '#a2845a', card: 'linear-gradient(#a24e26,#3d1c0c)'},
  wise: {name: 'Visa kvinnor och Salidar-systrar', flag: '#e9e3d2', fg: '#2f5f8e', troop: '#e2dccb', card: 'linear-gradient(#8fa5bd,#2a3c52)'},
  wolves: {name: 'Vargarna', flag: '#5a5a58', fg: '#e8e4da', troop: '#7a7670', card: 'linear-gradient(#7a7670,#2a2826)'},
  asha: {name: "Asha'man", flag: '#141414', fg: '#d8d8d8', troop: '#1c1c1e', card: 'linear-gradient(#3a3a40,#0a0a0c)'},
  rand: {name: 'Draken', flag: '#f3efe2', fg: '#a8221c', troop: '#c0a070', card: 'linear-gradient(#e9e2cf,#6a5c40)'}
});
function buildCampaignSVG() {
  const m = 'campaign';
  label(m, null, C.cairhien[0], C.cairhien[1] + 84, 'CAIRHIEN');
  label(m, null, C.wells[0] + 20, C.wells[1] + 60, "DUMAI'S WELLS", 'lbl s');
  label(m, null, 1720, 260, "KINSLAYER'S DAGGER", 'lbl region', {style: 'font-size:24px', transform: 'rotate(-20 1720 260)'});
  label(m, null, 640, 40, '↑ mot Tar Valon', 'lbl xs');
  label(m, null, 60, 640, '← Svarta tornet', 'lbl xs', {'text-anchor': 'start'});
  label(m, null, 300, 760, 'Alguenya', 'lbl s', {style: 'letter-spacing:.2em;fill:#cfe0e0', transform: 'rotate(-84 300 760)'});
  arrow(m, 'aWagons', [[460, 940], [620, 800], [810, 610], [940, 450]], 'r', 9);
  arrow(m, 'aShaido', [[1700, 600], [1400, 520], [1100, 460]], 'r', 12);
  arrow(m, 'aRescue', [[480, 980], [700, 860], [900, 720], [1040, 560]], 'g', 12);
  arrow(m, 'aGate', [[40, 600], [400, 540], [800, 470], [940, 430]], 'w', 7);
  const sw = group(m, 'swordFound');
  el('circle', {cx: C.cairhien[0], cy: C.cairhien[1], r: 70, fill: 'none', stroke: '#e0c27a', 'stroke-width': 3, 'stroke-dasharray': '8 6'}, sw);
}
function buildBattleSVG() {
  const m = 'battle', [wx, wy] = B.wells;
  label(m, null, wx, wy + B.ring + 70, "DUMAI'S WELLS", 'lbl region', {style: 'font-size:26px'});
  label(m, null, 1300, 1060, 'Åsen', 'lbl s');
  label(m, null, 1960, 120, "mot Kinslayer's Dagger ↗", 'lbl xs', {'text-anchor': 'end'});
  // vagnsringen
  const ring = group(m, 'wagons', 'fade');
  for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2, x = wx + Math.cos(a) * B.ring, y = wy + Math.sin(a) * B.ring * .8;
    const w = el('g', {transform: `translate(${x},${y}) rotate(${a * 180 / Math.PI + 90})`}, ring);
    el('rect', {x: -16, y: -9, width: 32, height: 18, rx: 3, fill: '#7a5a33', stroke: '#2a1a0c', 'stroke-width': 1.6}, w);
    el('path', {d: 'M-14 -9c0-6 28-6 28 0', fill: '#d8cdb0', stroke: '#2a1a0c', 'stroke-width': 1}, w); }
  // kistan med Rand
  const ch = group(m, 'chest', 'fade');
  el('rect', {x: wx - 24, y: wy - 70, width: 48, height: 28, rx: 3, fill: '#4a3018', stroke: '#e0c27a', 'stroke-width': 2}, ch);
  label(m, 'chestLbl', wx, wy - 82, 'Kistan', 'lbl xs');
  const sh = group(m, 'shield');
  el('circle', {cx: wx, cy: wy - 56, r: 40, fill: 'rgba(230,240,255,.12)', stroke: 'rgba(230,240,255,.85)', 'stroke-width': 2.5, 'stroke-dasharray': '6 5'}, sh);
  const bk = group(m, 'chestBroken');
  for (let i = 0; i < 8; i++) el('rect', {x: wx - 40 + (i * 23) % 80, y: wy - 80 + (i * 17) % 40, width: 16, height: 5, fill: '#4a3018', transform: `rotate(${(i * 47) % 90 - 45} ${wx} ${wy - 56})`}, bk);
  // portaler, kupol
  const gates = group(m, 'gates');
  for (const [x, y] of [[760, 420], [1240, 420], [720, 780], [1280, 790], [1000, 330], [1000, 880]]) {
    el('rect', {x: x - 4, y: y - 34, width: 8, height: 68, fill: 'rgba(255,250,220,.9)', class: 'glow'}, gates);
    el('rect', {x: x - 14, y: y - 38, width: 28, height: 76, fill: 'none', stroke: 'rgba(255,240,200,.6)', 'stroke-width': 2}, gates);
  }
  const dome = group(m, 'dome');
  el('ellipse', {cx: wx, cy: wy, rx: B.ring + 60, ry: (B.ring + 60) * .8, fill: 'rgba(200,225,255,.12)', stroke: 'rgba(220,235,255,.85)', 'stroke-width': 3}, dome);
  label(m, 'domeLbl', wx, wy - B.ring - 64, 'Kupol av Luft', 'lbl xs');
  const kneel = group(m, 'kneel');
  el('circle', {cx: 1120, cy: 600, r: 40, fill: 'none', stroke: '#e0c27a', 'stroke-width': 3, 'stroke-dasharray': '8 6'}, kneel);
  label(m, 'kneelLbl', 1120, 670, 'Salidar-systrarna knäböjer', 'lbl xs');
  // pilar
  arrow(m, 'aWolves', [[1100, 1040], [1150, 900], [1180, 790]], 'g', 9);
  arrow(m, 'aCharge1', [[880, 1060], [880, 900], [900, 790]], 'g', 13);
  arrow(m, 'aCharge2', [[1260, 1040], [1260, 900], [1180, 800]], 'g', 13);
  arrow(m, 'aCharge3', [[1500, 1060], [1420, 900], [1250, 760]], 'g', 13);
  arrow(m, 'aSisters', [[1050, 1060], [1040, 900], [1030, 800]], 'w', 8);
  arrow(m, 'aFlee1', [[1200, 420], [1500, 250], [1800, 120], [1990, 40]], 'r', 12);
  arrow(m, 'aFlee2', [[1300, 640], [1600, 450], [1990, 250]], 'r', 12);
  arrow(m, 'aGawyn', [[800, 600], [550, 520], [250, 420], [20, 360]], 'w', 9);
}

// ================= Enheter och kort =================
const GROUPS = {
  tower: {name: 'Tornets Aes Sedai', side: 'tower', emb: 'flame', lead: 'Galina Casban', size: '39 Aes Sedai, varav sex Black Ajah, med väktare', text: 'Elaidas ambassad har tagit Rand till fånga i Cairhien. Sex systrar i taget håller en sköld av saidar kring honom, och han ligger inlåst i en kista.'},
  young: {name: 'Younglings', side: 'young', emb: 'sword', lead: 'Gawyn Trakand', size: '582', text: 'Unga män som tränats av tornets väktare. Gawyn leder dem. De har placerats längst bak.', chars: ['gawyn']},
  rand: {name: 'Rand i kistan', side: 'rand', emb: 'chest', lead: 'Rand al\'Thor', size: '–', text: 'Rand har slagits och straffats under färden. Han känner sex svaga punkter i skölden. Min hålls också fången.', chars: ['rand', 'min']},
  shaido: {name: 'Shaido', side: 'shaido', emb: 'spear', lead: 'Sevanna', size: 'Omkring 40 000 krigare och 300 visa kvinnor som kan kanalisera', text: 'Ambassaden har avtalat med Shaido om eskort, men Sevanna tänker ta Rand för egen räkning.'},
  wolves: {name: 'Vargarna', side: 'wolves', emb: 'paw', lead: 'Perrin', size: 'Omkring 1 000', text: 'Vargarna har lett Perrin efter vagnarna i tio dagar. Nu anfaller de först.', chars: ['perrin']},
  tr: {name: 'Two Rivers-männen', side: 'tr', emb: 'wolf', lead: 'Perrin Aybara, Dannil Lewin', size: 'Omkring 300 bågskyttar', text: 'Perrin leder anfallet ner i dalen.', chars: ['perrin']},
  cair: {name: 'Dobraines cairhieniner', side: 'cair', emb: 'sun', lead: 'Dobraine Taborwin', size: 'Omkring 500', text: 'Cairhieniskt rytteri som rider med Perrin.'},
  may: {name: 'Winged Guards', side: 'may', emb: 'hawk', lead: 'Nurelle', size: 'Omkring 200', text: 'Berelains garde från Mayene. Det var Berelain som hittade Rands svärd och bälte och förstod vad som hänt.'},
  aiel: {name: 'Rands Aiel', side: 'aiel', emb: 'spear', lead: 'Rhuarc', size: 'Tusentals', text: 'Rhuarc och Sorilea samlade räddningsstyrkan i hemlighet, av rädsla för att fler Aiel annars skulle ge upp.'},
  wise: {name: 'Visa kvinnor och Salidar-systrar', side: 'wise', emb: 'flame', lead: 'Sorilea; Kiruna bland systrarna', size: '94 visa kvinnor och 9 Aes Sedai', text: 'De skulle stanna på åsen. Salidar-systrarna, som anslutit motvilligt, rusar i stället in i striden.'},
  asha: {name: "Asha'man", side: 'asha', emb: 'sword', lead: 'Mazrim Taim', size: 'Omkring 200', text: 'Män som kan kanalisera, utbildade i Svarta tornet. De reser genom portar och visar för första gången vad de kan i strid.'}
};
function buildUnits() {
  // kampanjkartan
  makeUnit('campaign', {id: 'cWag', group: 'tower', side: 'tower', kind: 'token', emb: 'flame', at: [460, 940], name: 'Ambassaden', label: 'Ambassaden'});
  makeUnit('campaign', {id: 'cSh', group: 'shaido', side: 'shaido', kind: 'token', emb: 'spear', at: [1700, 600], name: 'Shaido', label: 'Shaido'});
  makeUnit('campaign', {id: 'cRes', group: 'tr', side: 'tr', kind: 'token', emb: 'wolf', at: [440, 1000], name: 'Räddningsstyrkan', label: 'Perrin'});
  makeUnit('campaign', {id: 'cAsha', group: 'asha', side: 'asha', kind: 'token', emb: 'sword', at: [40, 600], name: "Asha'man", label: 'Taim'});
  // slagfältet
  const [wx, wy] = B.wells;
  makeUnit('battle', {id: 'tower', group: 'tower', side: 'tower', cols: 8, rows: 2, sp: 10, at: [wx + 20, wy + 40], emb: 'flame', name: 'Tornets Aes Sedai', label: 'Galina'});
  makeUnit('battle', {id: 'young', group: 'young', side: 'young', cols: 10, rows: 3, sp: 8, at: [wx - 230, wy], rot: 90, emb: 'sword', name: 'Younglings', label: 'Gawyn'});
  makeUnit('battle', {id: 'randU', group: 'rand', side: 'rand', cols: 2, rows: 1, sp: 12, at: [wx, wy - 56], emb: 'dragon', name: 'Rand och Min', label: 'Rand', banner: false});
  const sh = {side: 'shaido', sp: 9, big: true, loose: true, emb: 'spear', group: 'shaido', name: 'Shaido', hats: '#3a2a1a'};
  const SH = [['s1', [1000, 250], 0], ['s2', [1420, 420], 60], ['s3', [1480, 760], 110], ['s4', [1000, 960], 0], ['s5', [560, 780], 70], ['s6', [560, 420], 120]];
  for (const [id, at, rot] of SH) makeUnit('battle', {...sh, id, at, rot, cols: 14, rows: 4});
  makeUnit('battle', {id: 'wolves', group: 'wolves', side: 'wolves', cols: 12, rows: 3, sp: 9, loose: true, at: [1100, 1060], emb: 'paw', name: 'Vargarna'});
  makeUnit('battle', {id: 'trU', group: 'tr', side: 'tr', cols: 10, rows: 2, sp: 8, at: [880, 1060], emb: 'wolf', name: 'Two Rivers', label: 'Perrin'});
  makeUnit('battle', {id: 'cairU', group: 'cair', side: 'cair', cols: 10, rows: 2, sp: 8, at: [1260, 1040], emb: 'sun', name: 'Dobraine', label: 'Dobraine'});
  makeUnit('battle', {id: 'mayU', group: 'may', side: 'may', cols: 8, rows: 2, sp: 8, at: [1500, 1060], emb: 'hawk', name: 'Winged Guards'});
  makeUnit('battle', {id: 'aielU', group: 'aiel', side: 'aiel', cols: 16, rows: 3, sp: 9, big: true, loose: true, at: [1700, 1150], emb: 'spear', name: 'Rands Aiel', label: 'Rhuarc'});
  makeUnit('battle', {id: 'wiseU', group: 'wise', side: 'wise', cols: 8, rows: 2, sp: 9, at: [1050, 1120], emb: 'flame', name: 'Visa kvinnor och Salidar-systrar', label: 'Sorilea'});
  const as = {side: 'asha', sp: 9, emb: 'sword', group: 'asha', name: "Asha'man", hats: '#c0c0c0'};
  makeUnit('battle', {...as, id: 'as1', at: [760, 420], cols: 6, rows: 3, label: 'Taim'});
  makeUnit('battle', {...as, id: 'as2', at: [1240, 420], cols: 6, rows: 3});
  makeUnit('battle', {...as, id: 'as3', at: [720, 780], cols: 6, rows: 3});
  makeUnit('battle', {...as, id: 'as4', at: [1280, 790], cols: 6, rows: 3});
}
function bolt(points) {
  if (!fx) fx = el('g', {}, SV.battle);
  points.forEach(([x, y], i) => pending.push(setTimeout(() => {
    const r = Math.random, pts = [[x + (r() - .5) * 60, y - 420]];
    for (let k = 1; k < 7; k++) pts.push([x + (r() - .5) * 40 * (1 - k / 7), y - 420 + k * 60]);
    pts.push([x, y]);
    const g2 = el('g', {}, fx);
    el('polyline', {points: pts.map(p => p.join(',')).join(' '), fill: 'none', stroke: 'rgba(200,220,255,.5)', 'stroke-width': 9, 'stroke-linejoin': 'round'}, g2);
    el('polyline', {points: pts.map(p => p.join(',')).join(' '), fill: 'none', stroke: '#ffffff', 'stroke-width': 3, 'stroke-linejoin': 'round'}, g2);
    el('circle', {cx: x, cy: y, r: 30, fill: 'rgba(220,235,255,.7)', class: 'boom'}, g2);
    setTimeout(() => g2.remove(), 450);
  }, i * 130)));
}
