Object.assign(EMB, {
  spear: '<path d="M10 1l2 5h-1.2v12H9.2V6H8z" fill="currentColor"/>',
  hawk: '<path d="M10 4l2 2 6-1-4 4 2 2-6-1-2 6-1-6-5 1 3-3-4-3 6 1z" fill="currentColor"/>',
  leash: '<circle cx="6" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 9c2 2 3 3 4 5s2 3 4 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2 1.4"/>',
  drop: '<path d="M10 2c3 5 6 8 6 11a6 6 0 0 1-12 0c0-3 3-6 6-11z" fill="currentColor"/>',
  bow: '<path d="M5 2c8 4 8 12 0 16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 2v16M3 10h14" stroke="currentColor" stroke-width="1.4"/>'
});
Object.assign(SIDE, {
  perrin: {name: 'Perrins här', flag: '#f3ead2', fg: '#a8221c', troop: '#6e3a24', card: 'linear-gradient(#9b1d17,#3a0d0a)'},
  shaido: {name: 'Shaido', flag: '#2a1a14', fg: '#d0603a', troop: '#6e5638', card: 'linear-gradient(#4a2a1c,#140c09)'},
  sean: {name: 'Seanchan', flag: '#1f3a6e', fg: '#e2b23a', troop: '#4a4462', card: 'linear-gradient(#2b4c8a,#0f1a33)'},
  faile: {name: 'Faile och hennes följe', flag: '#e9e3d2', fg: '#6a3a6a', troop: '#d8cdb0', card: 'linear-gradient(#8a6a8a,#2a1a2a)'},
  chan: {name: 'Perrins kanaliserare', flag: '#e9e3d2', fg: '#2f5f8e', troop: '#e2dccb', card: 'linear-gradient(#8fa5bd,#2a3c52)'}
});
function buildCampaignSVG() {
  const m = 'campaign';
  label(m, null, C.malden[0], C.malden[1] + 90, 'MALDEN');
  label(m, null, 640, 120, 'Akvedukten', 'lbl xs');
  label(m, null, C.soHabor[0], C.soHabor[1] + 46, 'So Habor', 'lbl xs');
  label(m, null, 1000, 60, 'ALTARA', 'lbl region');
  label(m, null, 420, 1240, '↓ mot Ebou Dar', 'lbl xs');
  arrow(m, 'aPerrin', [[1700, -20], [1500, 100], [1300, 250]], 'g', 10);
  arrow(m, 'aSean', [[400, 1280], [480, 1150], [540, 1060]], 'g', 10);
  arrow(m, 'aFork', [[C.soHabor[0], C.soHabor[1]], [1450, 380], [1330, 290]], 'w', 7);
  arrow(m, 'aKidnap', [[1900, 900], [1500, 760], [1100, 680]], 'r', 8);
}
function buildBattleSVG() {
  const m = 'battle';
  label(m, null, B.town[0], B.town[1] + 170, 'MALDEN', 'lbl region', {style: 'font-size:24px'});
  label(m, null, 1000, 200, 'Åsen', 'lbl s');
  label(m, null, 560, 120, 'Akvedukten', 'lbl xs');
  label(m, null, B.campW[0], B.campW[1] + 200, 'Shaidos läger', 'lbl xs');
  label(m, null, B.campE[0], B.campE[1] + 220, 'Shaidos läger', 'lbl xs');
  const fork = group(m, 'fork');
  for (const [x, y] of [[620, 180], [760, 360], [900, 520]]) el('circle', {cx: x, cy: y, r: 14, fill: 'rgba(120,200,120,.6)', class: 'glow'}, fork);
  label(m, 'forkLbl', 520, 300, 'Forkroot i vattnet', 'lbl xs', {'text-anchor': 'end'});
  const fog = group(m, 'fog');
  for (const [x, y, rx, ry] of [[500, 290, 360, 120], [1000, 250, 420, 120], [1500, 290, 380, 120]]) el('ellipse', {cx: x, cy: y, rx, ry, fill: 'rgba(230,235,238,.6)'}, fog);
  label(m, 'fogLbl', 1000, 120, 'Dimväggen', 'lbl s');
  const cel = group(m, 'cellar');
  el('rect', {x: B.cellar[0] - 26, y: B.cellar[1] - 18, width: 52, height: 36, fill: 'rgba(20,14,8,.7)', stroke: '#e0c27a', 'stroke-width': 2.5}, cel);
  label(m, 'cellarLbl', B.cellar[0], B.cellar[1] + 40, 'Källaren', 'lbl xs');
  const free = group(m, 'freed');
  el('circle', {cx: B.cellar[0], cy: B.cellar[1], r: 40, fill: 'none', stroke: '#e0c27a', 'stroke-width': 3, 'stroke-dasharray': '8 6'}, free);
  const clash = group(m, 'clash');
  for (const [x, y] of [[700, 420], [1000, 400], [1300, 420], [1650, 560]]) el('circle', {cx: x, cy: y, r: 24, fill: 'rgba(140,20,10,.45)', stroke: '#ffcf6a', 'stroke-width': 2}, clash);
  arrow(m, 'aInfil', [[560, 60], [700, 300], [880, 520], [980, 700]], 'w', 6);
  arrow(m, 'aOut1', [[650, 700], [700, 500], [720, 400]], 'r', 12);
  arrow(m, 'aOut2', [[1350, 680], [1250, 500], [1200, 410]], 'r', 12);
  arrow(m, 'aFlank', [[1600, 700], [1750, 550], [1700, 400]], 'r', 10);
  arrow(m, 'aSean', [[2020, 260], [1880, 420], [1760, 520]], 'g', 12);
  arrow(m, 'aSean2', [[2020, 800], [1900, 650], [1780, 580]], 'g', 12);
  arrow(m, 'aSortie', [[1050, 300], [1030, 500], [1030, 700]], 'g', 9);
  arrow(m, 'aTherava', [[1200, 900], [1600, 1100], [2020, 1200]], 'r', 7);
}
const GROUPS = {
  shaido: {name: 'Shaido', side: 'shaido', emb: 'spear', lead: 'Sevanna och visa kvinnan Therava', size: 'Omkring 25 000–30 000 Aiel väster om staden och 40 000 öster om den, med omkring 400 visa kvinnor', text: 'Efter Dumai\'s Wells spreds Shaido över landet genom portar som Sammael gav dem. Sevannas del av klanen tog Malden och övervintrade där.'},
  perrin: {name: 'Perrins här', side: 'perrin', emb: 'wolf', lead: 'Perrin Aybara', size: 'Two Rivers-män, Mayener, Ghealdanin och Aiel', text: 'Perrin har följt Shaido i månader för att befria Faile.', chars: ['perrin', 'tam']},
  chan: {name: 'Perrins kanaliserare', side: 'chan', emb: 'flame', lead: 'Edarra; Asha\'man Grady och Neald', size: 'Sex visa kvinnor, tre Aes Sedai och två Asha\'man', text: 'De slår mot Shaido medan Shaidos egna visa kvinnor är förgiftade av forkroot.'},
  sean: {name: 'Seanchan', side: 'sean', emb: 'hawk', lead: 'Banner-General Tylee Khirgan', size: 'Omkring 15 000 soldater och 12 damane', text: 'Seanchan i Ebou Dar ville också få bort Shaido. Förbundet: Seanchan får Shaidos visa kvinnor som damane, gai\'shain släpps fria, och Seanchan lovar att inte koppla Perrins kanaliserare.'},
  faile: {name: 'Faile och hennes följe', side: 'faile', emb: 'flame', lead: 'Faile Bashere', size: 'Faile, Alliandre, Maighdin och andra gai\'shain', text: 'Faile, Maighdin och flera andra rövades bort under förhandlingarna med profeten Masema. I Malden planerar de att fly.', chars: ['faile', 'morgase']},
  infil: {name: 'Styrkan i akvedukten', side: 'perrin', emb: 'drop', lead: '–', size: 'En liten grupp, bland dem Aes Sedai Seonid', text: 'En liten styrka tar sig in i Malden genom akvedukten för att hjälpa Faile och de andra fångarna.'}
};
function buildUnits() {
  makeUnit('campaign', {id: 'cShaido', group: 'shaido', side: 'shaido', kind: 'token', emb: 'spear', at: [C.malden[0] + 80, C.malden[1] - 40], name: 'Shaido', label: 'Shaido'});
  makeUnit('campaign', {id: 'cFaile', group: 'faile', side: 'faile', kind: 'token', emb: 'flame', at: [1900, 900], name: 'Faile', label: 'Faile'});
  makeUnit('campaign', {id: 'cPerrin', group: 'perrin', side: 'perrin', kind: 'token', emb: 'wolf', at: [1700, -40], name: 'Perrin', label: 'Perrin'});
  makeUnit('campaign', {id: 'cSean', group: 'sean', side: 'sean', kind: 'token', emb: 'hawk', at: [400, 1300], name: 'Seanchan', label: 'Tylee'});
  const sh = {side: 'shaido', group: 'shaido', sp: 9, big: true, loose: true, emb: 'spear', hats: '#3a2a1a', cols: 16, rows: 4};
  makeUnit('battle', {...sh, id: 'sW', at: [620, 780]}); makeUnit('battle', {...sh, id: 'sE', at: [1420, 760], cols: 18, rows: 5});
  makeUnit('battle', {...sh, id: 'sF', at: [1560, 900], cols: 12, rows: 3});
  makeUnit('battle', {id: 'pTR', group: 'perrin', side: 'perrin', cols: 14, rows: 2, sp: 8, at: [1000, 250], emb: 'bow', name: 'Two Rivers', label: 'Perrin'});
  makeUnit('battle', {id: 'pL', group: 'perrin', side: 'perrin', cols: 12, rows: 3, sp: 8, at: [600, 300], emb: 'wolf', name: 'Perrins här'});
  makeUnit('battle', {id: 'pR', group: 'perrin', side: 'perrin', cols: 12, rows: 3, sp: 8, at: [1400, 300], emb: 'wolf', name: 'Perrins här'});
  makeUnit('battle', {id: 'chan', group: 'chan', side: 'chan', cols: 6, rows: 2, sp: 9, at: [1000, 180], emb: 'flame', name: 'Kanaliserare', label: 'Edarra'});
  const se = {side: 'sean', group: 'sean', sp: 9, emb: 'hawk', hats: '#c9a032', cols: 12, rows: 4};
  makeUnit('battle', {...se, id: 'sean1', at: [2080, 240], rot: 90, label: 'Tylee'}); makeUnit('battle', {...se, id: 'sean2', at: [2080, 820], rot: 90});
  makeUnit('battle', {id: 'infil', group: 'infil', side: 'perrin', cols: 4, rows: 1, sp: 10, at: [560, 40], emb: 'drop', name: 'Akveduktstyrkan'});
  makeUnit('battle', {id: 'faile', group: 'faile', side: 'faile', cols: 4, rows: 1, sp: 10, at: [B.cellar[0], B.cellar[1] - 30], emb: 'flame', name: 'Faile och hennes följe', label: 'Faile'});
}
