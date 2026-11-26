Object.assign(EMB, {
  hawk: '<path d="M10 4l2 2 6-1-4 4 2 2-6-1-2 6-1-6-5 1 3-3-4-3 6 1z" fill="currentColor"/>',
  wing: '<path d="M2 12c4-6 8-8 16-8-3 2-4 4-4 6 2 0 3 1 4 2-5 0-9 2-12 6 0-3-1-5-4-6z" fill="currentColor"/>',
  leash: '<circle cx="6" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 9c2 2 3 3 4 5s2 3 4 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2 1.4"/>',
  rod: '<path d="M9 2h2v16H9z" fill="currentColor"/><path d="M8 2h4v2H8zM8 16h4v2H8z" fill="currentColor"/>',
  knife: '<path d="M4 16L14 4l2 2L6 18z" fill="currentColor"/>'
});
Object.assign(SIDE, {
  sean: {name: 'Seanchan', flag: '#1f3a6e', fg: '#e2b23a', troop: '#4a4462', card: 'linear-gradient(#2b4c8a,#0f1a33)'},
  tower: {name: 'Vita tornet', flag: '#f2efe6', fg: '#2f5f8e', troop: '#e8e2d2', card: 'linear-gradient(#b8aa90,#3a3020)'},
  nov: {name: 'Egwene och noviserna', flag: '#ffffff', fg: '#a8221c', troop: '#f6f4ee', card: 'linear-gradient(#e9e2cf,#6a5c40)'},
  reb: {name: 'Bryne, Siuan och Gawyn', flag: '#2a4a7a', fg: '#e8e0c8', troop: '#3a5070', card: 'linear-gradient(#3a5a8a,#121c2c)'}
});
function buildCampaignSVG() {
  const m = 'campaign';
  label(m, null, C.ebou[0], C.ebou[1] + 56, 'EBOU DAR');
  label(m, null, C.tv[0] + 60, C.tv[1] + 10, 'TAR VALON', 'lbl', {'text-anchor': 'start'});
  label(m, null, C.dm[0] - 20, C.dm[1] + 100, 'Dragonmount', 'lbl xs');
  const st = group(m, 'stops');
  for (const [x, y] of C.stops) el('circle', {cx: x, cy: y, r: 10, fill: 'rgba(30,58,110,.75)', stroke: '#e2b23a', 'stroke-width': 2}, st);
  label(m, 'stopLbl', 800, 810, 'Viloplatser på avlägsna slätter', 'lbl xs');
  arrow(m, 'aFly', C.path, 'r', 10);
  const dream = group(m, 'dream');
  el('circle', {cx: C.tv[0] + 20, cy: C.tv[1], r: 70, fill: 'rgba(120,90,200,.25)', class: 'glow'}, dream);
  label(m, 'dreamLbl', C.tv[0] + 20, C.tv[1] - 90, 'Egwenes dröm', 'lbl xs');
}
function buildBattleSVG() {
  const m = 'battle', [tx, ty] = B.t;
  label(m, null, tx, ty + 10, 'VITA TORNET', 'lbl region', {style: 'font-size:24px'});
  label(m, null, B.square[0], B.square[1] + 160, 'Torget', 'lbl s');
  label(m, null, B.novice[0] + 90, B.novice[1] - 70, 'Novisernas kvarter', 'lbl xs');
  label(m, null, B.store[0], B.store[1] + 40, 'Förråden', 'lbl xs');
  label(m, null, B.elaida[0], B.elaida[1] - 30, 'Elaidas rum', 'lbl xs');
  const holes = group(m, 'holes');
  for (const [x, y] of [[B.breach[0], B.breach[1]], [800, 400], [1120, 700], [900, 330]]) { el('circle', {cx: x, cy: y, r: 20, fill: '#1a140e', stroke: '#ff9a40', 'stroke-width': 3}, holes); }
  label(m, 'breachLbl', B.breach[0] + 30, B.breach[1] - 24, 'Hål högt upp i väggen', 'lbl xs', {'text-anchor': 'start'});
  const panic = group(m, 'panic');
  label(m, 'panicLbl', tx, ty + 60, '"Trollocs! Myrddraal!"', 'lbl s', {style: 'fill:#ffb070'});
  const circles = group(m, 'circles');
  for (const [x, y] of [[600, 500], [650, 560], [560, 560]]) el('circle', {cx: x, cy: y, r: 26, fill: 'rgba(255,250,230,.25)', stroke: '#fff4d2', 'stroke-width': 2, class: 'glow'}, circles);
  const vora = group(m, 'vora');
  el('circle', {cx: B.breach[0], cy: B.breach[1], r: 60, fill: 'rgba(255,250,220,.3)', class: 'glow'}, vora);
  label(m, 'voraLbl', B.breach[0] + 30, B.breach[1] + 60, 'Voras sa\'angreal', 'lbl xs', {'text-anchor': 'start'});
  const gate = group(m, 'gate');
  el('rect', {x: B.gate[0] - 5, y: B.gate[1] - 36, width: 10, height: 72, fill: 'rgba(255,250,220,.9)', class: 'glow'}, gate);
  el('rect', {x: B.gate[0] - 14, y: B.gate[1] - 40, width: 28, height: 80, fill: 'none', stroke: 'rgba(255,240,200,.6)', 'stroke-width': 2}, gate);
  const bk = group(m, 'bloodknife');
  el('circle', {cx: 1340, cy: 830, r: 24, fill: 'rgba(140,20,10,.55)', stroke: '#ffcf6a', 'stroke-width': 2}, bk);
  label(m, 'bkLbl', 1340, 875, 'Bloodknife', 'lbl xs');
  const cap = group(m, 'captives');
  el('circle', {cx: B.elaida[0], cy: B.elaida[1], r: 34, fill: 'rgba(140,20,10,.45)', stroke: '#e0c27a', 'stroke-width': 2.5, 'stroke-dasharray': '6 5'}, cap);
  arrow(m, 'aIn1', [[200, 1280], [500, 900], [800, 600], [950, 520]], 'r', 10);
  arrow(m, 'aIn2', [[1000, 1290], [1000, 1150], [1000, 1050]], 'r', 10);
  arrow(m, 'aIn3', [[1900, 1280], [1600, 900], [1300, 640]], 'r', 10);
  arrow(m, 'aStore', [[620, 540], [720, 640], [790, 700]], 'w', 7);
  arrow(m, 'aBreach', [[800, 700], [1000, 600], [1190, 480]], 'w', 7);
  arrow(m, 'aIn', [[1500, 900], [1400, 850], [1300, 800]], 'g', 9);
  arrow(m, 'aOut', [[1000, 420], [1300, 250], [1700, 60], [2000, -20]], 'r', 10);
  arrow(m, 'aEgOut', [[1300, 820], [1450, 880], [1500, 900]], 'w', 7);
}
const GROUPS = {
  toraken: {name: 'To\'raken', side: 'sean', emb: 'wing', lead: 'Seanchans befälhavare', size: 'Omkring hundra to\'raken och raken som eskort', text: 'Seanchan tror att Aes Sedai har ett fruktansvärt vapen. Tuon godkänner anfallet efter att samtalen med Rand har misslyckats. Det är en räd för att fånga marath\'damane.'},
  seanGround: {name: 'Fists of Heaven och damane', side: 'sean', emb: 'leash', lead: '–', size: '–', text: 'Soldater och damane som landar på taket och torget eller tar sig in genom hålen i väggarna.'},
  ajah: {name: 'Tornets systrar', side: 'tower', emb: 'flame', lead: 'Saerin Asnobar tar befälet', size: 'Ajaherna', text: 'Först slåss ajaherna var för sig. Sedan tar Saerin befälet och samordnar försvaret.'},
  nov: {name: 'Egwene och noviserna', side: 'nov', emb: 'rod', lead: 'Egwene al\'Vere', size: 'Noviser i cirklar', text: 'Egwene är drogad med forkroot och kan bara kanalisera en strimma. Hon lär noviserna att länka sig i cirklar som Seanchan inte kan skärma av.', chars: ['egwene']},
  reb: {name: 'Bryne, Siuan och Gawyn', side: 'reb', emb: 'knife', lead: 'Gareth Bryne', size: 'En liten grupp', text: 'De har kommit för att hämta Egwene ur tornet.', chars: ['gawyn', 'siuan', 'bryne']},
  elaida: {name: 'Elaida', side: 'tower', emb: 'flame', lead: 'Elaida do Avriny a\'Roihan', size: '–', text: 'Elaida avfärdade Egwenes varning om anfallet.', chars: ['elaida']}
};
function buildUnits() {
  makeUnit('campaign', {id: 'cFly', group: 'toraken', side: 'sean', kind: 'token', emb: 'wing', at: C.ebou, name: 'To\'raken', label: 'To\'raken'});
  makeUnit('campaign', {id: 'cEg', group: 'nov', side: 'nov', kind: 'token', emb: 'rod', at: [C.tv[0] - 30, C.tv[1] + 30], name: 'Egwene', label: 'Egwene'});
  makeUnit('campaign', {id: 'cReb', group: 'reb', side: 'reb', kind: 'token', emb: 'knife', at: [C.tv[0] + 120, C.tv[1] + 160], name: 'Rebellernas här', label: 'Bryne'});
  const tk = {side: 'sean', group: 'toraken', sp: 14, loose: true, emb: 'wing', hats: '#c9a032', cols: 5, rows: 2};
  makeUnit('battle', {...tk, id: 't1', at: [200, 1300]}); makeUnit('battle', {...tk, id: 't2', at: [1000, 1300]});
  makeUnit('battle', {...tk, id: 't3', at: [1900, 1300]}); makeUnit('battle', {...tk, id: 't4', at: [1400, -40]});
  const sg = {side: 'sean', group: 'seanGround', sp: 9, emb: 'leash', hats: '#c9a032', cols: 6, rows: 2};
  makeUnit('battle', {...sg, id: 'g1', at: [1000, 680], label: 'Taket'}); makeUnit('battle', {...sg, id: 'g2', at: [1000, 1040], label: 'Torget'});
  makeUnit('battle', {...sg, id: 'g3', at: [1280, 650]});
  const aj = {side: 'tower', group: 'ajah', sp: 9, emb: 'flame', cols: 5, rows: 2};
  makeUnit('battle', {...aj, id: 'a1', at: [700, 380]}); makeUnit('battle', {...aj, id: 'a2', at: [1300, 400]}); makeUnit('battle', {...aj, id: 'a3', at: [1000, 830], label: 'Saerin'});
  makeUnit('battle', {id: 'nov', group: 'nov', side: 'nov', cols: 6, rows: 2, sp: 9, at: [600, 560], emb: 'rod', name: 'Egwene och noviserna', label: 'Egwene'});
  makeUnit('battle', {id: 'reb', group: 'reb', side: 'reb', cols: 3, rows: 1, sp: 11, at: [1500, 900], emb: 'knife', name: 'Bryne, Siuan och Gawyn', label: 'Bryne'});
}
function bolt(points) {
  if (!fx) fx = el('g', {}, SV.battle);
  points.forEach(([x, y], i) => pending.push(setTimeout(() => {
    const g2 = el('g', {}, fx), [sx, sy] = B.breach;
    el('line', {x1: sx, y1: sy, x2: x, y2: y, stroke: 'rgba(255,240,200,.55)', 'stroke-width': 10}, g2);
    el('line', {x1: sx, y1: sy, x2: x, y2: y, stroke: '#ffffff', 'stroke-width': 3}, g2);
    el('circle', {cx: x, cy: y, r: 30, fill: 'rgba(255,200,120,.7)', class: 'boom'}, g2);
    setTimeout(() => g2.remove(), 500);
  }, i * 260)));
}
