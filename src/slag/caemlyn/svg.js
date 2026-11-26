Object.assign(EMB, {
  lion: '<path d="M5 16c0-5 2-9 6-10 3-1 5 1 5 3l-2 1 1 3-3-1-1 4z" fill="currentColor"/>',
  gull: '<path d="M2 9c3-3 6-3 8 0 2-3 5-3 8 0-3-1-6 0-8 3-2-3-5-4-8-3z" fill="currentColor"/>',
  eye: '<path d="M2 10c3-5 13-5 16 0-3 5-13 5-16 0z" fill="currentColor"/><circle cx="10" cy="10" r="2.4" fill="#000"/>',
  bow: '<path d="M5 2c8 4 8 12 0 16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 2v16M3 10h14" stroke="currentColor" stroke-width="1.4"/>'
});
Object.assign(SIDE, {
  elayne: {name: 'Elaynes styrkor', flag: '#a8221c', fg: '#f6f2e6', troop: '#a8221c', card: 'linear-gradient(#a8221c,#3a0d0a)'},
  ary: {name: 'Arymillas allians', flag: '#e8e0c8', fg: '#5a3a6a', troop: '#6a5a70', card: 'linear-gradient(#6a5a70,#1e1624)'},
  merc: {name: 'Legosoldater', flag: '#6a5a40', fg: '#e8e0c8', troop: '#6a5a40', card: 'linear-gradient(#6a5a40,#221a10)'},
  sea: {name: 'Sea Folk', flag: '#1e3a5a', fg: '#e8e0c8', troop: '#2a4a6a', card: 'linear-gradient(#2a5a8a,#0a1a2a)'},
  kin: {name: 'Kinswomen', flag: '#e9e3d2', fg: '#2f5f8e', troop: '#d8cdb0', card: 'linear-gradient(#8fa5bd,#2a3c52)'},
  black: {name: 'Black Ajah', flag: '#141010', fg: '#c03a2a', troop: '#2a2020', card: 'linear-gradient(#3a2222,#0a0606)'},
  border: {name: 'Borderlanders', flag: '#d9d2bf', fg: '#1a1a1a', troop: '#5a5048', card: 'linear-gradient(#8a8270,#2a2620)'},
  houses: {name: 'Andoranska hus', flag: '#e8e0c8', fg: '#2a5a2a', troop: '#4a6040', card: 'linear-gradient(#5a7a50,#1a2616)'}
});
function buildCampaignSVG() {
  const m = 'campaign';
  label(m, null, C.city[0], C.city[1] - 112, 'CAEMLYN');
  label(m, null, 1000, 60, 'ANDOR', 'lbl region');
  label(m, null, 1960, 300, 'Borderlanders →', 'lbl xs', {'text-anchor': 'end'});
  arrow(m, 'aBorder', [[2020, 260], [1700, 300], [1350, 400]], 'w', 12);
  arrow(m, 'aHouses', [[-20, 1000], [300, 900], [600, 800]], 'w', 10);
  arrow(m, 'aGuybon', [[300, 300], [600, 460], [830, 580]], 'g', 9);
}
function buildBattleSVG() {
  const m = 'battle', [cx, cy] = B.c;
  label(m, null, cx, cy + 75, 'Palatset', 'lbl xs');
  label(m, null, cx, cy - B.inner - 18, 'Inner City', 'lbl xs');
  label(m, null, cx + 330, cy + 300, 'New City', 'lbl s');
  label(m, null, B.fmGate[0] + 40, B.fmGate[1] + 10, 'Far Madding Gate', 'lbl xs', {'text-anchor': 'start'});
  label(m, null, B.full[0], B.full[1] - 26, 'Full Moon Street', 'lbl xs');
  label(m, null, 1000, 1240, 'Arymillas läger', 'lbl xs');
  const gates = group(m, 'gates');
  for (const [x, y] of [[700, 300], [1300, 330], [640, 860], [1340, 840]]) { el('rect', {x: x - 4, y: y - 30, width: 8, height: 60, fill: 'rgba(255,250,220,.9)', class: 'glow'}, gates); el('rect', {x: x - 12, y: y - 34, width: 24, height: 68, fill: 'none', stroke: 'rgba(255,240,200,.6)', 'stroke-width': 2}, gates); }
  const house = group(m, 'fullMoon');
  el('rect', {x: B.full[0] - 22, y: B.full[1] - 16, width: 44, height: 32, fill: 'rgba(20,14,8,.7)', stroke: '#e0c27a', 'stroke-width': 2.5}, house);
  const blood = group(m, 'blood');
  el('circle', {cx: B.full[0], cy: B.full[1], r: 34, fill: 'rgba(140,20,10,.5)', stroke: '#ffcf6a', 'stroke-width': 2}, blood);
  const wagon = group(m, 'wagon');
  el('rect', {x: B.rescue[0] - 20, y: B.rescue[1] - 12, width: 40, height: 24, rx: 3, fill: '#4a3018', stroke: '#e0c27a', 'stroke-width': 2}, wagon);
  label(m, 'wagonLbl', B.rescue[0], B.rescue[1] + 36, 'Elayne i en vagn', 'lbl xs');
  const wgate = group(m, 'windGate');
  el('rect', {x: 1180, y: 1100, width: 10, height: 80, fill: 'rgba(255,250,220,.9)', class: 'glow'}, wgate);
  el('rect', {x: 1170, y: 1095, width: 30, height: 90, fill: 'none', stroke: 'rgba(255,240,200,.7)', 'stroke-width': 2.5}, wgate);
  const clashN = group(m, 'clashN');
  for (const [x, y] of [[860, 150], [1000, 130], [1140, 150]]) el('circle', {cx: x, cy: y, r: 24, fill: 'rgba(140,20,10,.45)', stroke: '#ffcf6a', 'stroke-width': 2}, clashN);
  const clashS = group(m, 'clashS');
  for (const [x, y] of [[960, 1050], [1040, 1060], [1000, 1020]]) el('circle', {cx: x, cy: y, r: 22, fill: 'rgba(140,20,10,.45)', stroke: '#ffcf6a', 'stroke-width': 2}, clashS);
  const crown = group(m, 'crown');
  el('circle', {cx, cy, r: 70, fill: 'rgba(255,230,150,.25)', class: 'glow'}, crown);
  el('path', {d: `M${cx - 30} ${cy + 10}l8-26 12 16 10-22 10 22 12-16 8 26z`, fill: '#e8c870', stroke: '#6a4a10', 'stroke-width': 2}, crown);
  arrow(m, 'aToFull', [[1000, 600], [1150, 520], [1240, 480]], 'w', 7);
  arrow(m, 'aAway', [[1270, 490], [1320, 800], [1300, 1150]], 'r', 7);
  arrow(m, 'aNorth', [[1000, -20], [1000, 90]], 'r', 12);
  arrow(m, 'aSouth', [[1000, 1240], [1000, 1110]], 'r', 14);
  arrow(m, 'aRear', [[1200, 1140], [1120, 1140], [1040, 1110]], 'g', 13);
  arrow(m, 'aSally', [[1000, 980], [1000, 1080]], 'g', 11);
}
const GROUPS = {
  elayne: {name: 'Elaynes styrkor', side: 'elayne', emb: 'lion', lead: 'Elayne Trakand; Birgitte som generalkapten', size: 'Gardet, Guybons 10 000 man och legosoldater', text: 'Elayne har färre soldater, men Kinswomen kan öppna portar så att försvararna möter anfall var de än kommer.', chars: ['elayne', 'birgitte']},
  ary: {name: 'Arymillas allians', side: 'ary', emb: 'eye', lead: 'Arymilla Marne, med Naean och Elenia', size: 'Flera hus', text: 'Arymilla gör anspråk på Lejontronen och belägrar Caemlyn.'},
  merc: {name: 'Förrädiska legosoldater', side: 'merc', emb: 'bow', lead: '–', size: '–', text: 'Legosoldater som byter sida försöker öppna Far Madding Gate inifrån.'},
  kin: {name: 'Kinswomen', side: 'kin', emb: 'flame', lead: '–', size: '–', text: 'Kvinnor som kan kanalisera utan att vara Aes Sedai. De hittade Charlz Guybon och hans 10 000 man och förde in dem i staden.'},
  sea: {name: 'Windfinders', side: 'sea', emb: 'gull', lead: 'Chanelle din Seran White Shark', size: '–', text: 'Sea Folks Windfinders har ett avtal med Elayne. De kan öppna portar och slåss med den Enda kraften.'},
  black: {name: 'Black Ajah', side: 'black', emb: 'eye', lead: '–', size: '–', text: 'Svarta systrar som tar Elayne till fånga på Full Moon Street.'},
  border: {name: 'Borderlanders', side: 'border', emb: 'eagle', lead: 'Härskarna i Gränslanden', size: 'Omkring 200 000 man', text: 'En väldig här från Gränslanden närmar sig. Elayne använder den senare som påtryckning.'},
  houses: {name: 'Andoranska hus', side: 'houses', emb: 'lion', lead: 'Bland andra Luan', size: 'Omkring 60 000 man', text: 'Oberoende andoranska hus som ännu inte valt sida.'}
};
function buildUnits() {
  makeUnit('campaign', {id: 'cEl', group: 'elayne', side: 'elayne', kind: 'token', emb: 'lion', at: [C.city[0] + 30, C.city[1] - 30], name: 'Elayne', label: 'Elayne'});
  makeUnit('campaign', {id: 'cAry', group: 'ary', side: 'ary', kind: 'token', emb: 'eye', at: [900, 830], name: 'Arymilla', label: 'Arymilla'});
  makeUnit('campaign', {id: 'cGuy', group: 'kin', side: 'elayne', kind: 'token', emb: 'lion', at: [300, 300], name: 'Guybon', label: 'Guybon'});
  makeUnit('campaign', {id: 'cBorder', group: 'border', side: 'border', kind: 'token', emb: 'eagle', at: [2040, 260], name: 'Borderlanders'});
  makeUnit('campaign', {id: 'cHouses', group: 'houses', side: 'houses', kind: 'token', emb: 'lion', at: [-40, 1000], name: 'Andoranska hus'});
  const ar = {side: 'ary', group: 'ary', sp: 9, emb: 'eye', hats: '#c9a032', cols: 12, rows: 4};
  makeUnit('battle', {...ar, id: 'arS', at: [1000, 1190], label: 'Arymilla'}); makeUnit('battle', {...ar, id: 'arN', at: [1000, 40]});
  makeUnit('battle', {...ar, id: 'arW', at: [300, 600], rot: 90, cols: 10}); makeUnit('battle', {...ar, id: 'arE', at: [1700, 600], rot: 90, cols: 10});
  const el_ = {side: 'elayne', group: 'elayne', sp: 9, emb: 'lion', hats: '#e8e0c8', cols: 10, rows: 3};
  makeUnit('battle', {...el_, id: 'gN', at: [1000, 220], label: 'Gardet'}); makeUnit('battle', {...el_, id: 'gS', at: [1000, 960], label: 'Dyelin'});
  makeUnit('battle', {...el_, id: 'gW', at: [620, 600], rot: 90, cols: 8}); makeUnit('battle', {...el_, id: 'gE', at: [1380, 600], rot: 90, cols: 8});
  makeUnit('battle', {id: 'elayne', group: 'elayne', side: 'elayne', cols: 4, rows: 1, sp: 11, at: [1000, 560], emb: 'lion', name: 'Elayne och tre Aes Sedai', label: 'Elayne'});
  makeUnit('battle', {id: 'merc', group: 'merc', side: 'merc', cols: 8, rows: 2, sp: 8, at: [1060, 980], emb: 'bow', name: 'Legosoldater'});
  makeUnit('battle', {id: 'rescue', group: 'sea', side: 'sea', cols: 10, rows: 3, sp: 9, at: [1400, 1150], emb: 'gull', name: 'Räddningsstyrkan', label: 'Birgitte'});
}
