Object.assign(EMB, {
  dragon: '<path d="M3 13c2-6 7-9 12-8-3 1-4 3-3 5 3-1 5 1 5 3-2-1-4-1-6 1-2 2-5 3-8 2 2-1 3-2 3-3-1 1-2 1-3 0z" fill="currentColor"/>',
  hawk: '<path d="M10 4l2 2 6-1-4 4 2 2-6-1-2 6-1-6-5 1 3-3-4-3 6 1z" fill="currentColor"/><path d="M4 17l3-3M16 17l-3-3" stroke="currentColor" stroke-width="1.4"/>',
  leash: '<circle cx="6" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 9c2 2 3 3 4 5s2 3 4 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2 1.4"/>',
  ship: '<path d="M3 13h14l-3 4H6z" fill="currentColor"/><path d="M10 2v10M10 3l6 8h-6zM10 5l-5 6h5z" fill="currentColor" opacity=".85"/>',
  tower: '<path d="M6 18V7l4-4 4 4v11z" fill="currentColor"/><path d="M8 18v-4h4v4" fill="#000" opacity=".4"/>'
});
Object.assign(SIDE, {
  sean: {name: 'Seanchan', flag: '#1f3a6e', fg: '#e2b23a', troop: '#4a4462', card: 'linear-gradient(#2b4c8a,#0f1a33)'},
  wc: {name: 'Children of the Light', flag: '#f3efe2', fg: '#c79a2a', troop: '#ece7da', card: 'linear-gradient(#cbbf9c,#5d5641)'},
  rand: {name: 'Rand och hans följeslagare', flag: '#f3efe2', fg: '#a8221c', troop: '#8a6a44', card: 'linear-gradient(#e9e2cf,#6a5c40)'},
  shien: {name: 'Shienar', flag: '#d9d2bf', fg: '#1a1a1a', troop: '#5a5048', card: 'linear-gradient(#8a8270,#2a2620)'},
  women: {name: 'Nynaeve, Elayne och Min', flag: '#e9e3d2', fg: '#2f5f8e', troop: '#d8cdb0', card: 'linear-gradient(#8fa5bd,#2a3c52)'},
  domon: {name: 'Bayle Domon', flag: '#6a4a2a', fg: '#f3e2b8', troop: '#7a5a33', card: 'linear-gradient(#7a5a33,#2a1a0c)'},
  heroes: {name: 'Hjältarna från hornet', flag: '#f3efe2', fg: '#a8221c', troop: '#d8e2e8', card: 'linear-gradient(#e6eef2,#5a6a78)'}
});
function ship(parent, x, y, k, rot = 0, sails = '#e4dcc4') {
  // Seglande skepp sett ovanifrån: spetsig för, akterkastell och tre master med rår och segel
  const s = el('g', {transform: `translate(${x},${y}) rotate(${rot}) scale(${k})`}, parent);
  el('path', {d: 'M-50 8C-30 -2 30 -6 64 4 30 14 -30 18 -50 8z', fill: 'rgba(0,0,0,.3)'}, s);
  el('path', {d: 'M-52 0C-48 -12 20 -15 60 0 20 15 -48 12 -52 0z', fill: '#5a3c22', stroke: '#1e140a', 'stroke-width': 2}, s);
  el('path', {d: 'M-44 0C-40 -8 16 -10 48 0 16 10 -40 8 -44 0z', fill: '#8a6a40'}, s);
  el('rect', {x: -52, y: -11, width: 16, height: 22, rx: 3, fill: '#6a4a2a', stroke: '#1e140a', 'stroke-width': 1.4}, s);
  for (const [mx, h] of [[-22, 30], [4, 36], [30, 28]]) {
    el('path', {d: `M${mx - 4} ${-h / 2}Q${mx + 5} 0 ${mx - 4} ${h / 2}L${mx - 1} ${h / 2}Q${mx + 8} 0 ${mx - 1} ${-h / 2}z`, fill: sails, stroke: '#4a3c28', 'stroke-width': 1.2}, s);
    el('circle', {cx: mx - 3, cy: 0, r: 2.2, fill: '#3a2a16'}, s);
  }
  return s;
}
function buildCampaignSVG() {
  const m = 'campaign';
  label(m, null, 380, 300, 'ARYTH OCEAN', 'lbl region', {style: 'font-size:26px;fill:#cfe0e0'});
  label(m, null, 1000, 300, 'TOMAN HEAD', 'lbl region');
  label(m, null, C.falme[0] + 10, C.falme[1] + 70, 'FALME');
  label(m, null, 1650, 560, 'ALMOTH PLAIN', 'lbl s');
  label(m, null, 1960, 120, 'mot Arad Doman →', 'lbl xs', {'text-anchor': 'end'});
  label(m, null, 1960, 1220, 'mot Tarabon →', 'lbl xs', {'text-anchor': 'end'});
  const sh = group(m, 'cShips');
  for (const [x, y, k, r] of [[120, 470, .7, -10], [150, 790, .7, 15], [70, 640, .6, 0], [430, 870, .6, 30]]) ship(sh, x, y, k, r);
  label(m, 'campLbl', C.camp[0], C.camp[1] - 46, 'Ingtars läger', 'lbl xs');
  arrow(m, 'aWC', [[2020, 830], [1850, 790], [1660, 760]], 'r', 10);
  arrow(m, 'aFive', [[1000, 490], [800, 560], [560, 620], [360, 630]], 'w', 8);
}

function buildBattleSVG() {
  const m = 'battle';
  label(m, null, 300, 360, 'Hamnen', 'lbl s', {style: 'fill:#cfe0e0'});
  label(m, null, 760, 880, 'FALME', 'lbl region', {style: 'font-size:28px'});
  label(m, null, B.turak[0], B.turak[1] - 54, 'Turaks hus', 'lbl xs');
  label(m, 'kennelLbl', B.kennel[0] - 20, B.kennel[1] + 34, 'Damanes kenneln', 'lbl xs');
  label(m, null, 1990, 425, 'mot Almoth Plain →', 'lbl xs', {'text-anchor': 'end'});
  // Seanchans skepp i bukten
  const sh = group(m, 'ships', 'fade');
  for (const [x, y, k, r] of [[260, 300, 1.3, -20], [180, 560, 1.4, 5], [300, 980, 1.3, 25], [90, 820, 1.2, 10]]) ship(sh, x, y, k, r);
  // Turaks duell
  const duel = group(m, 'duel');
  el('circle', {cx: B.turak[0], cy: B.turak[1] + 4, r: 30, fill: 'rgba(140,20,10,.55)', stroke: '#ffcf6a', 'stroke-width': 2.5}, duel);
  el('path', {d: `M${B.turak[0] - 13} ${B.turak[1] - 9}l26 26M${B.turak[0] + 13} ${B.turak[1] - 9}l-26 26`, stroke: '#ffe7b0', 'stroke-width': 4, 'stroke-linecap': 'round'}, duel);
  // Ingtars sista strid i gränden
  const ing = group(m, 'ingtarStand');
  el('circle', {cx: 880, cy: 600, r: 26, fill: 'rgba(30,30,30,.5)', stroke: '#e8e0c8', 'stroke-width': 2, 'stroke-dasharray': '5 4'}, ing);
  label(m, 'ingLbl', 880, 640, 'Ingtar håller gränden', 'lbl xs');
  // Dimman från hornet
  const fog = group(m, 'fog');
  for (const [x, y, rx, ry] of [[1200, 500, 520, 260], [1000, 700, 600, 240], [1500, 650, 520, 280], [900, 450, 380, 200], [1300, 900, 560, 220]]) el('ellipse', {cx: x, cy: y, rx, ry, fill: 'rgba(230,235,238,.28)'}, fog);
  // Duellen i himlen: två gestalter i stormmolnen ovanför staden
  const sky = group(m, 'sky');
  for (const [x, y, rx] of [[1000, 170, 460], [680, 210, 300], [1330, 200, 330]]) el('ellipse', {cx: x, cy: y, rx, ry: rx * .3, fill: 'rgba(36,40,52,.6)'}, sky);
  el('circle', {cx: 925, cy: 170, r: 54, fill: 'rgba(255,240,200,.28)', class: 'glow'}, sky);
  el('circle', {cx: 1075, cy: 170, r: 54, fill: 'rgba(210,50,20,.32)', class: 'glow'}, sky);
  const fig = (x, col, edge) => { const f = el('g', {transform: `translate(${x},170)`}, sky);
    el('circle', {cx: 0, cy: -26, r: 9, fill: col, stroke: edge, 'stroke-width': 1.5}, f);
    el('path', {d: 'M-12 -14h24l-6 40h-12z', fill: col, stroke: edge, 'stroke-width': 1.5}, f); return f; };
  fig(925, '#efe4c4', '#5a4a30'); fig(1075, '#1a0e0a', '#c0502e');
  el('path', {d: 'M937 -4L1010 -40', transform: 'translate(0,170)', stroke: '#fff4d2', 'stroke-width': 4, 'stroke-linecap': 'round'}, sky);
  el('path', {d: 'M1063 -30L1000 20', transform: 'translate(0,170)', stroke: '#2a1208', 'stroke-width': 7, 'stroke-linecap': 'round'}, sky);
  el('path', {d: 'M1063 -30L1000 20', transform: 'translate(0,170)', stroke: 'rgba(255,90,40,.6)', 'stroke-width': 2, 'stroke-linecap': 'round'}, sky);
  label(m, 'skyLbl1', 925, 240, 'Rand', 'lbl xs'); label(m, 'skyLbl2', 1075, 240, "Ba'alzamon", 'lbl xs');
  const wound = group(m, 'wound');
  el('circle', {cx: 932, cy: 160, r: 16, fill: 'rgba(200,20,10,.75)', class: 'boom'}, wound);
  // Strid och pilar
  const clash = group(m, 'clash');
  for (const [x, y] of [[1240, 820], [1300, 760], [1200, 900]]) { el('circle', {cx: x, cy: y, r: 22, fill: 'rgba(140,20,10,.45)', stroke: '#ffcf6a', 'stroke-width': 2}, clash); }
  arrow(m, 'aIn', [[2000, 440], [1700, 470], [1400, 520], [1100, 570], [900, 520], [860, 480]], 'w', 8);
  arrow(m, 'aOut', [[860, 560], [960, 600], [1080, 520], [1170, 400]], 'w', 8);
  arrow(m, 'aSpray', [[580, 650], [420, 690], [260, 720], [60, 760]], 'w', 7);
  arrow(m, 'aByar', [[1500, 850], [1750, 930], [2000, 980]], 'w', 6);
  arrow(m, 'aWC', [[1900, 880], [1650, 860], [1380, 840]], 'r', 12);
  arrow(m, 'aWC2', [[1450, 830], [1300, 820], [1180, 820]], 'r', 12);
  arrow(m, 'aHeroes', [[1180, 420], [1080, 560], [960, 680], [820, 760]], 'g', 14);
  arrow(m, 'aSeaRet', [[1000, 800], [820, 820], [640, 820], [500, 820]], 'r', 10);
  arrow(m, 'aWCback', [[1300, 830], [1550, 900], [1800, 960]], 'r', 9);
}

// ================= Enheter och kort =================
const GROUPS = {
  falme: {name: 'Seanchan i Falme', side: 'sean', emb: 'hawk', lead: 'High Lord Turak, High Lady Suroth', size: 'Förtruppen Hailene', text: 'Seanchan, ättlingar till Artur Hawkwings arméer, har gått i land på Toman Head och tagit Falme. Turak har Horn of Valere och dolken från Shadar Logoth.'},
  seanArmy: {name: 'Seanchans här', side: 'sean', emb: 'hawk', lead: 'Seanchanska officerare', size: 'Soldater och damane', text: 'Seanchans soldater strider tillsammans med damane, kvinnor som kan kanalisera och hålls kopplade med a\'dam av sina sul\'dam.'},
  damane: {name: 'Damane och sul\'dam', side: 'sean', emb: 'leash', lead: 'Sul\'dam', size: 'Ett fåtal par', text: 'Damane är kvinnor som kan kanalisera och hålls kopplade med en a\'dam. I strid är de förödande. Egwene hålls som damane i Falme.'},
  patrol: {name: 'Seanchanska patruller', side: 'sean', emb: 'hawk', lead: '–', size: 'Små grupper', text: 'Patruller håller gatorna i Falme under natten.'},
  wc: {name: 'Bornhalds legion', side: 'wc', emb: 'sun', lead: 'Lord Captain Geofram Bornhald', size: 'En ridande legion', text: 'Bornhald tror att Seanchans damane är Aes Sedai som bryter sina eder. Han räknar med att dö på Toman Head.'},
  byar: {name: 'Jaret Byar', side: 'wc', emb: 'sun', lead: 'Jaret Byar', size: 'En ryttare', text: 'Bornhald beordrar Byar att hålla sig utanför striden och berätta för hans son vad som hänt.'},
  camp: {name: 'Ingtars sällskap', side: 'shien', emb: 'eagle', lead: 'Ingtar Shinowa', size: 'Shienarer, Loial och Verin', text: 'Ingtars shienarer har jagat hornet ända till Toman Head. Verin ser till att exakt fem rider in i Falme.', chars: ['rand', 'mat', 'perrin', 'loial', 'verin']},
  five: {name: 'De fem', side: 'rand', emb: 'dragon', lead: 'Rand al\'Thor', size: 'Rand, Mat, Perrin, Ingtar och Hurin', text: '"Fem rider ut och fyra återvänder", säger profetian. De ska hämta hornet och dolken ur Turaks hus.', chars: ['rand', 'mat', 'perrin']},
  ingtar: {name: 'Ingtar', side: 'shien', emb: 'eagle', lead: 'Ingtar Shinowa', size: 'En man', text: 'Ingtar erkänner att han varit Darkfriend. Han stannar ensam i gränden för att ge de andra tid att fly.'},
  women: {name: 'Nynaeve, Elayne och Min', side: 'women', emb: 'flame', lead: 'Nynaeve al\'Meara', size: 'Tre kvinnor, sedan fyra', text: 'Förklädda till sul\'dam och tjänare tar de sig in till damane och befriar Egwene.', chars: ['nynaeve', 'elayne', 'min', 'egwene']},
  spray: {name: 'Spray', side: 'domon', emb: 'ship', lead: 'Bayle Domon', size: 'Ett handelsskepp', text: 'Domon har lovat Nynaeve att vänta vid kajen, och han håller sitt ord trots att besättningen vill kapa förtöjningen.'},
  banner: {name: 'Under Drakens fana', side: 'rand', emb: 'dragon', lead: 'Rand al\'Thor', size: 'Rand, Mat, Perrin och Hurin', text: 'Mat bär Horn of Valere fastbundet vid sadeln. Perrin bär Drakens fana.', chars: ['rand', 'mat', 'perrin']},
  heroes: {name: 'Hjältarna från hornet', side: 'heroes', emb: 'horn', lead: 'Artur Hawkwing', size: 'Omkring hundra', text: 'Hjältarna är bundna till Hjulet och föds på nytt genom tiderna. Bland dem rider Artur Hawkwing och Birgitte med sin silverbåge. De följer Drakens fana.', chars: ['birgitte']}
};
function buildUnits() {
  // kampanjkartan
  makeUnit('campaign', {id: 'cFalme', group: 'falme', side: 'sean', kind: 'token', emb: 'hawk', at: [330, 600], name: 'Seanchan', label: 'Seanchan'});
  makeUnit('campaign', {id: 'cPat1', group: 'falme', side: 'sean', kind: 'token', emb: 'hawk', at: [700, 600], name: 'Seanchan'});
  makeUnit('campaign', {id: 'cWomen', group: 'women', side: 'women', kind: 'token', emb: 'flame', at: [260, 660], name: 'Nynaeve, Elayne och Min'});
  makeUnit('campaign', {id: 'cWC', group: 'wc', side: 'wc', kind: 'token', emb: 'sun', at: [2040, 830], name: 'Whitecloaks', label: 'Bornhald'});
  makeUnit('campaign', {id: 'cCamp', group: 'camp', side: 'shien', kind: 'token', emb: 'eagle', at: C.camp, name: 'Ingtars sällskap', label: 'Ingtar'});
  makeUnit('campaign', {id: 'cFive', group: 'five', side: 'rand', kind: 'token', emb: 'dragon', at: C.camp, name: 'De fem', label: 'De fem'});
  // slagfältet
  const se = {side: 'sean', sp: 9, big: true, emb: 'hawk', group: 'seanArmy', name: 'Seanchan', hats: '#c9a032'};
  makeUnit('battle', {...se, id: 'sA', at: [1040, 780], rot: 90, cols: 12, rows: 4});
  makeUnit('battle', {...se, id: 'sB', at: [1080, 900], rot: 90, cols: 12, rows: 4});
  makeUnit('battle', {...se, id: 'sC', at: [1000, 660], rot: 90, cols: 10, rows: 4});
  makeUnit('battle', {id: 'dam', group: 'damane', side: 'sean', cols: 4, rows: 2, sp: 10, at: [960, 840], emb: 'leash', hats: '#e8e2d2', name: 'Damane'});
  makeUnit('battle', {id: 'pat1', group: 'patrol', side: 'sean', cols: 4, rows: 2, sp: 8, at: [900, 640], emb: 'hawk', name: 'Patrull', banner: false});
  makeUnit('battle', {id: 'pat2', group: 'patrol', side: 'sean', cols: 4, rows: 2, sp: 8, at: [720, 770], emb: 'hawk', name: 'Patrull', banner: false});
  makeUnit('battle', {id: 'five', group: 'five', side: 'rand', cols: 5, rows: 1, sp: 11, at: [2040, 440], emb: 'dragon', name: 'De fem', label: 'De fem'});
  makeUnit('battle', {id: 'four', group: 'banner', side: 'rand', cols: 4, rows: 1, sp: 11, at: [870, 560], emb: 'dragon', name: 'Rand, Mat, Perrin och Hurin', label: 'Rand'});
  makeUnit('battle', {id: 'ingtar', group: 'ingtar', side: 'shien', cols: 1, rows: 1, sp: 12, at: [905, 625], emb: 'eagle', name: 'Ingtar', label: 'Ingtar'});
  makeUnit('battle', {id: 'women', group: 'women', side: 'women', cols: 3, rows: 1, sp: 10, at: [650, 560], emb: 'flame', name: 'Nynaeve, Elayne och Min'});
  makeUnit('battle', {id: 'spray', group: 'spray', side: 'domon', kind: 'token', emb: 'ship', at: [575, 650], name: 'Spray', label: 'Spray'});
  const wc = {side: 'wc', sp: 9, emb: 'sun', group: 'wc', name: 'Whitecloaks', hats: '#c79a2a'};
  makeUnit('battle', {...wc, id: 'wc1', at: [2060, 860], rot: 90, cols: 12, rows: 4, label: 'Bornhald'});
  makeUnit('battle', {...wc, id: 'wc2', at: [2080, 960], rot: 90, cols: 10, rows: 3});
  makeUnit('battle', {id: 'byar', group: 'byar', side: 'wc', cols: 1, rows: 1, sp: 12, at: [1500, 850], emb: 'sun', name: 'Byar', label: 'Byar'});
  makeUnit('battle', {id: 'heroes', group: 'heroes', side: 'heroes', cols: 14, rows: 4, sp: 9, loose: true, big: true, at: [1260, 380], rot: 0, emb: 'dragon', name: 'Hjältarna', label: 'Hjältarna från hornet'});
}
// Blixtar och eldklot (Egwene, damane)
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
