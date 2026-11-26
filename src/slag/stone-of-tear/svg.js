Object.assign(EMB, {
  dragon: '<path d="M3 13c2-6 7-9 12-8-3 1-4 3-3 5 3-1 5 1 5 3-2-1-4-1-6 1-2 2-5 3-8 2 2-1 3-2 3-3-1 1-2 1-3 0z" fill="currentColor"/>',
  spear: '<path d="M10 1l2 5h-1.2v12H9.2V6H8z" fill="currentColor"/>',
  crescent: '<path d="M6 4a5 5 0 1 0 0 6 4 4 0 1 1 0-6zM12 9a5 5 0 1 0 0 6 4 4 0 1 1 0-6zM16 3a4 4 0 1 0 0 5 3.2 3.2 0 1 1 0-5z" fill="currentColor"/>',
  sword: '<path d="M10 1l1.6 3v9h-3.2V4z" fill="currentColor"/><path d="M6 13h8v1.6H6zM9.2 14.6h1.6V19H9.2z" fill="currentColor"/>',
  rocket: '<path d="M10 2l3 5v7H7V7z" fill="currentColor"/><path d="M7 14l-2 4M13 14l2 4M10 14v5" stroke="currentColor" stroke-width="1.4"/>',
  eye: '<path d="M2 10c3-5 13-5 16 0-3 5-13 5-16 0z" fill="currentColor"/><circle cx="10" cy="10" r="2.4" fill="#000"/>'
});
Object.assign(SIDE, {
  aiel: {name: 'Aiel', flag: '#b5562a', fg: '#f6e7c4', troop: '#a2845a', card: 'linear-gradient(#a24e26,#3d1c0c)'},
  def: {name: 'Stenens försvarare', flag: '#8e1b17', fg: '#f3efe2', troop: '#7a2c22', card: 'linear-gradient(#8e1b17,#2e0907)'},
  rand: {name: 'Draken', flag: '#f3efe2', fg: '#a8221c', troop: '#c0a070', card: 'linear-gradient(#e9e2cf,#6a5c40)'},
  mat: {name: 'Mat och Juilin', flag: '#a8221c', fg: '#f3e2b8', troop: '#7a5a3a', card: 'linear-gradient(#7a1f19,#3a0d0a)'},
  aes: {name: 'Moiraine och Lan', flag: '#f2efe6', fg: '#2f5f8e', troop: '#e8e2d2', card: 'linear-gradient(#5b7da3,#20354d)'},
  women: {name: 'Egwene, Nynaeve och Elayne', flag: '#e9e3d2', fg: '#2f5f8e', troop: '#d8cdb0', card: 'linear-gradient(#8fa5bd,#2a3c52)'},
  black: {name: 'Black Ajah', flag: '#141010', fg: '#c03a2a', troop: '#2a2020', card: 'linear-gradient(#3a2222,#0a0606)'},
  sh: {name: 'Skuggan', flag: '#1a1412', fg: '#c0502e', troop: '#3a2a22', card: 'linear-gradient(#4a2a20,#140c09)'},
  wolf: {name: 'Perrin och Faile', flag: '#6e5a3a', fg: '#f3e2b8', troop: '#8a7048', card: 'linear-gradient(#6e5a3a,#241a0e)'}
});
function buildCampaignSVG() {
  const m = 'campaign';
  label(m, null, 1420, 640, 'TEAR', 'lbl region', {style: 'font-size:40px'});
  label(m, null, C.stone[0], C.stone[1] + 200, 'STENEN I TEAR');
  label(m, null, 470, 700, 'Erinin', 'lbl s', {style: 'letter-spacing:.2em;fill:#cfe0e0', transform: 'rotate(-84 470 700)'});
  label(m, null, 760, 1180, 'Maule', 'lbl xs');
  label(m, 'innLbl', C.inn[0], C.inn[1] + 34, 'Värdshuset', 'lbl xs');
  label(m, null, 1230, 30, '↑ norrut', 'lbl xs');
  label(m, null, 300, 1180, "Fingers of the Dragon", 'lbl xs', {style: 'font-style:italic'});
  // Drakens fana över Stenen dagen efter
  const fl = group(m, 'dragonFlag');
  el('line', {x1: C.stone[0], y1: C.stone[1] - 10, x2: C.stone[0], y2: C.stone[1] - 120, stroke: '#2a1a0c', 'stroke-width': 4}, fl);
  el('path', {d: `M${C.stone[0]} ${C.stone[1] - 120}h70l-10 18 10 18h-70z`, fill: '#f3efe2', stroke: '#1a120b', 'stroke-width': 2}, fl);
  const fe = el('g', {transform: `translate(${C.stone[0] + 8},${C.stone[1] - 118}) scale(1.5)`, style: 'color:#a8221c'}, fl); fe.innerHTML = EMB.dragon;
  const crowd = group(m, 'crowd');
  const rr = rng(4242);
  for (let i = 0; i < 220; i++) { const a = rr() * 6.3, d = 40 + rr() * 200; el('circle', {cx: C.stone[0] + 330 + Math.cos(a) * d, cy: C.stone[1] + 40 + Math.sin(a) * d * .8, r: 5.5, fill: '#e0c890', stroke: '#2a1a0c', 'stroke-width': .8}, crowd); }
  label(m, 'crowdLbl', C.stone[0] + 330, C.stone[1] + 250, 'Folket ropar på Draken', 'lbl s');
  arrow(m, 'aRand', [[1210, -10], [1250, 140], [1150, 320], [900, 440]], 'w', 9);
  arrow(m, 'aMat', [[580, 0], [620, 300], [650, 700], [680, 880]], 'w', 9);
  arrow(m, 'aTrap', [[1100, 600], [960, 560], [820, 520]], 'r', 8);
}
function buildBattleSVG() {
  const m = 'battle', [hx, hy] = B.heart;
  label(m, null, hx, hy - 170, 'HJÄRTAT AV STENEN', 'lbl s');
  label(m, null, 385, 905, 'Cellerna', 'lbl xs');
  label(m, null, 1940, 610, 'Stadsmuren', 'lbl xs', {'text-anchor': 'end'});
  label(m, null, 120, 300, 'Erinin', 'lbl s', {style: 'letter-spacing:.2em;fill:#cfe0e0', transform: 'rotate(-88 120 300)'});
  label(m, null, 230, 1110, 'Porten vid floden', 'lbl xs');
  // Callandor i mitten av Hjärtat
  const cal = group(m, 'callandor', 'fade');
  el('circle', {cx: hx, cy: hy, r: 36, fill: 'rgba(230,245,255,.25)', class: 'glow'}, cal);
  el('path', {d: `M${hx} ${hy - 34}l7 12v40h-14v-40z`, fill: 'rgba(230,245,255,.85)', stroke: '#9ab8c8', 'stroke-width': 1.5}, cal);
  el('path', {d: `M${hx - 14} ${hy + 18}h28v5h-28z`, fill: 'rgba(230,245,255,.85)'}, cal);
  label(m, 'calLbl', hx, hy + 62, 'Callandor', 'lbl xs');
  const calG = group(m, 'calGlow');
  el('circle', {cx: hx, cy: hy, r: 90, fill: 'rgba(240,250,255,.35)', class: 'glow'}, calG);
  // Mats sprängning
  const br = group(m, 'breach');
  el('circle', {cx: B.breach[0], cy: B.breach[1], r: 26, fill: '#1a140e', stroke: '#e2b23a', 'stroke-width': 2.5}, br);
  label(m, 'breachLbl', B.breach[0] - 10, B.breach[1] - 40, 'Hålet i muren', 'lbl xs', {'text-anchor': 'end'});
  // Klättrande Aiel längs murarna
  const cl = group(m, 'climb');
  for (const [x, y] of [[700, 70], [1300, 80], [1760, 170], [180, 300]]) { el('path', {d: `M${x - 6} ${y - 40}v80M${x + 6} ${y - 40}v80`, stroke: 'rgba(240,220,170,.8)', 'stroke-width': 2, 'stroke-dasharray': '4 4'}, cl); }
  // Vargdrömmen
  const dr = group(m, 'dream');
  el('rect', {x: 0, y: 0, width: 2000, height: 1250, fill: 'rgba(60,40,110,.32)'}, dr);
  label(m, 'dreamLbl', 1000, 1230, "TEL'ARAN'RHIOD", 'lbl region', {style: 'fill:#d9c8ff'});
  const wolf = group(m, 'wolfMark');
  el('circle', {cx: 1420, cy: 380, r: 30, fill: 'rgba(120,100,60,.75)', stroke: '#f3e2b8', 'stroke-width': 2}, wolf);
  const we = el('g', {transform: 'translate(1406,366) scale(1.4)', style: 'color:#f3e2b8'}, wolf); we.innerHTML = EMB.wolf;
  label(m, 'wolfLbl', 1420, 430, 'Perrin som varg', 'lbl xs');
  // Eld-svärd, balefire, svart blixt och portalen
  const duel = group(m, 'duel');
  el('circle', {cx: hx - 40, cy: hy + 30, r: 26, fill: 'rgba(140,20,10,.5)', stroke: '#ffcf6a', 'stroke-width': 2.5}, duel);
  el('path', {d: `M${hx - 54} ${hy + 16}l28 28M${hx - 26} ${hy + 16}l-28 28`, stroke: '#ffb060', 'stroke-width': 4, 'stroke-linecap': 'round'}, duel);
  const bf = group(m, 'balefire');
  el('path', {d: `M${hx - 140} ${hy - 90}L${hx + 60} ${hy + 20}`, stroke: '#ffffff', 'stroke-width': 9, 'stroke-linecap': 'round'}, bf);
  el('path', {d: `M${hx - 140} ${hy - 90}L${hx + 60} ${hy + 20}`, stroke: 'rgba(255,255,255,.4)', 'stroke-width': 24, 'stroke-linecap': 'round'}, bf);
  const bl = group(m, 'blackBolt');
  el('polyline', {points: `${hx + 150},${hy - 150} ${hx + 60},${hy - 120} ${hx - 20},${hy - 140} ${hx - 120},${hy - 95}`, fill: 'none', stroke: '#140a10', 'stroke-width': 7}, bl);
  el('polyline', {points: `${hx + 150},${hy - 150} ${hx + 60},${hy - 120} ${hx - 20},${hy - 140} ${hx - 120},${hy - 95}`, fill: 'none', stroke: 'rgba(170,60,200,.6)', 'stroke-width': 2}, bl);
  const door = group(m, 'rift');
  el('ellipse', {cx: hx + 140, cy: hy - 40, rx: 22, ry: 50, fill: '#0c0608', stroke: '#c03a2a', 'stroke-width': 3}, door);
  label(m, 'riftLbl', hx + 140, hy + 30, 'Ba\'alzamon flyr', 'lbl xs');
  const kneel = group(m, 'kneel');
  el('circle', {cx: hx, cy: hy, r: 150, fill: 'none', stroke: '#e0c27a', 'stroke-width': 3, 'stroke-dasharray': '10 8'}, kneel);
  // Celldörren
  const cellOpen = group(m, 'cellOpen');
  el('rect', {x: 270, y: 930, width: 230, height: 120, fill: 'rgba(255,220,140,.25)', stroke: '#e0c27a', 'stroke-width': 3}, cellOpen);
  // Pilar
  arrow(m, 'aWall', [[2000, 630], [1940, 640], [1860, 642]], 'w', 7);
  arrow(m, 'aAiel1', [[700, 60], [760, 260], [880, 460]], 'g', 12);
  arrow(m, 'aAiel2', [[1830, 640], [1550, 625], [1200, 610]], 'g', 12);
  arrow(m, 'aAiel3', [[180, 300], [400, 450], [700, 560]], 'g', 12);
  arrow(m, 'aMatCells', [[1780, 660], [1500, 780], [1000, 880], [600, 960], [510, 990]], 'w', 7);
  arrow(m, 'aRand', [[1000, 1200], [1000, 900], [1000, 760]], 'w', 9);
  arrow(m, 'aMoi', [[200, 500], [600, 560], [860, 590]], 'w', 7);
  arrow(m, 'aOut', [[440, 990], [520, 900], [720, 780]], 'w', 7);
}

// ================= Enheter och kort =================
const GROUPS = {
  def: {name: 'Defenders of the Stone', side: 'def', emb: 'crescent', lead: 'Tears High Lords', size: 'Tusentals man', text: 'Tears elitstyrka. Stenen har belägrats och stormats över hundra gånger och aldrig fallit, och försvararna tror inte att den kan falla.'},
  aiel: {name: 'Rhuarcs Aiel', side: 'aiel', emb: 'spear', lead: 'Rhuarc', size: 'Några hundra', text: 'Aiel har smugit in i staden. De söker He Who Comes With The Dawn, eftersom Stenens fall ska tillkännage hans ankomst.'},
  rand: {name: 'Rand al\'Thor', side: 'rand', emb: 'dragon', lead: 'Rand al\'Thor', size: 'En man', text: 'Rand har dragits till Tear. Han bär fortfarande såret i sidan från Falme. Enligt profetian kan bara Draken röra Callandor.', chars: ['rand']},
  mat: {name: 'Mat och Juilin', side: 'mat', emb: 'rocket', lead: 'Mat Cauthon', size: 'Två män', text: 'Mat har Aludras fyrverkerier med sig. Tjuvfångaren Juilin Sandar, som under tvång lurade kvinnorna i fällan, vill nu hjälpa till att befria dem.', chars: ['mat']},
  moiraine: {name: 'Moiraine och Lan', side: 'aes', emb: 'flame', lead: 'Moiraine Damodred', size: 'Två', text: 'Moiraine och Lan har följt efter Rand till Tear.', chars: ['moiraine', 'lan']},
  women: {name: 'Egwene, Nynaeve och Elayne', side: 'women', emb: 'flame', lead: 'Nynaeve al\'Meara', size: 'Tre fångar', text: 'Black Ajah under Liandrin har lurat dem i en fälla och håller dem i Stenens celler, avskärmade från Källan.', chars: ['egwene', 'nynaeve', 'elayne']},
  black: {name: 'Black Ajah', side: 'black', emb: 'eye', lead: 'Liandrin; Amico vaktar cellen', size: 'Svarta systrar', text: 'De svarta systrarna håller kvinnorna fångna som lockbete. Amico vaktar cellen och håller skölden.'},
  belal: {name: 'Be\'lal', side: 'sh', emb: 'sword', lead: 'Be\'lal', size: 'En av de Förlorade', text: 'Be\'lal styr i hemlighet Tear, förklädd till High Lord. Han vill att Rand ska ta svärdet.'},
  balz: {name: 'Ba\'alzamon', side: 'sh', emb: 'eye', lead: 'Ba\'alzamon', size: '–', text: 'Ba\'alzamon har hemsökt Rands drömmar sedan Two Rivers.'},
  perrin: {name: 'Perrin och Faile', side: 'wolf', emb: 'wolf', lead: 'Perrin Aybara', size: 'Två', text: 'Faile har fångats i en drömfälla som var gillrad för Moiraine. Perrin följer efter henne in i vargdrömmen.', chars: ['perrin', 'faile']},
  arrivals: {name: 'De som dras till Tear', side: 'rand', emb: 'dragon', lead: '–', size: '–', text: 'Rand, Moiraine, Lan, Perrin, Faile, Mat och Thom har alla kommit till Tear, var och en på sin väg.'}
};
function buildUnits() {
  // kampanjkartan
  makeUnit('campaign', {id: 'cRand', group: 'rand', side: 'rand', kind: 'token', emb: 'dragon', at: [1210, -40], name: 'Rand', label: 'Rand'});
  makeUnit('campaign', {id: 'cMat', group: 'mat', side: 'mat', kind: 'token', emb: 'rocket', at: [580, -40], name: 'Mat och Thom', label: 'Mat och Thom'});
  makeUnit('campaign', {id: 'cWomen', group: 'women', side: 'women', kind: 'token', emb: 'flame', at: [1100, 600], name: 'Egwene, Nynaeve och Elayne', label: 'Kvinnorna'});
  makeUnit('campaign', {id: 'cBlack', group: 'black', side: 'black', kind: 'token', emb: 'eye', at: [780, 400], name: 'Black Ajah', label: 'Black Ajah'});
  makeUnit('campaign', {id: 'cPerrin', group: 'perrin', side: 'wolf', kind: 'token', emb: 'wolf', at: [C.inn[0] - 40, C.inn[1] - 10], name: 'Perrin och Faile'});
  makeUnit('campaign', {id: 'cMoi', group: 'moiraine', side: 'aes', kind: 'token', emb: 'flame', at: [C.inn[0] + 40, C.inn[1] - 10], name: 'Moiraine och Lan'});
  makeUnit('campaign', {id: 'cAiel', group: 'aiel', side: 'aiel', kind: 'token', emb: 'spear', at: [980, 330], name: 'Aiel', label: 'Aiel på taken'});
  // slagfältet
  const df = {side: 'def', sp: 9, emb: 'crescent', group: 'def', name: 'Defenders of the Stone', hats: '#d0c8b0'};
  makeUnit('battle', {...df, id: 'd1', at: [1500, 620], rot: 90, cols: 8, rows: 4});
  makeUnit('battle', {...df, id: 'd2', at: [1000, 300], rot: 0, cols: 10, rows: 3});
  makeUnit('battle', {...df, id: 'd3', at: [600, 560], rot: 90, cols: 8, rows: 3});
  makeUnit('battle', {...df, id: 'd4', at: [1000, 1000], rot: 0, cols: 10, rows: 3});
  const ai = {side: 'aiel', sp: 9, big: true, loose: true, emb: 'spear', group: 'aiel', name: 'Aiel', hats: '#5a3a1a'};
  makeUnit('battle', {...ai, id: 'a1', at: [700, 40], rot: 0, cols: 8, rows: 3, label: 'Rhuarc'});
  makeUnit('battle', {...ai, id: 'a2', at: [1960, 600], rot: 90, cols: 8, rows: 3});
  makeUnit('battle', {...ai, id: 'a3', at: [170, 280], rot: 90, cols: 7, rows: 3});
  makeUnit('battle', {id: 'mat', group: 'mat', side: 'mat', cols: 2, rows: 1, sp: 12, at: [1990, 650], emb: 'rocket', name: 'Mat och Juilin', label: 'Mat'});
  makeUnit('battle', {id: 'rand', group: 'rand', side: 'rand', cols: 1, rows: 1, sp: 14, at: [1000, 1220], emb: 'dragon', name: 'Rand', label: 'Rand'});
  makeUnit('battle', {id: 'moi', group: 'moiraine', side: 'aes', cols: 2, rows: 1, sp: 12, at: [200, 500], emb: 'flame', name: 'Moiraine och Lan', label: 'Moiraine'});
  makeUnit('battle', {id: 'belal', group: 'belal', side: 'sh', cols: 1, rows: 1, sp: 14, at: [1060, 560], emb: 'sword', name: 'Be\'lal', label: 'Be\'lal'});
  makeUnit('battle', {id: 'balz', group: 'balz', side: 'sh', cols: 1, rows: 1, sp: 14, at: [1120, 480], emb: 'eye', name: 'Ba\'alzamon', label: 'Ba\'alzamon'});
  makeUnit('battle', {id: 'women', group: 'women', side: 'women', cols: 3, rows: 1, sp: 11, at: [385, 990], emb: 'flame', name: 'Egwene, Nynaeve och Elayne', label: 'Fångarna'});
  makeUnit('battle', {id: 'amico', group: 'black', side: 'black', cols: 1, rows: 1, sp: 12, at: [460, 1010], emb: 'eye', name: 'Amico', label: 'Amico', banner: false});
}
