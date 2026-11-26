Object.assign(EMB, {
  spear: '<path d="M10 1l2 5h-1.2v12H9.2V6H8z" fill="currentColor"/>',
  lion: '<path d="M5 16c0-5 2-9 6-10 3-1 5 1 5 3l-2 1 1 3-3-1-1 4z" fill="currentColor"/>',
  tree: '<path d="M10 2c4 0 7 3 7 6s-3 5-7 5-7-2-7-5 3-6 7-6z" fill="currentColor"/><path d="M9 12h2v7H9z" fill="currentColor"/>',
  crescent: '<path d="M6 4a5 5 0 1 0 0 6 4 4 0 1 1 0-6zM12 9a5 5 0 1 0 0 6 4 4 0 1 1 0-6z" fill="currentColor"/>',
  stars: '<path d="M5 4l1 2 2 .3-1.5 1.4.4 2.1L5 8.8 3.1 9.8l.4-2.1L2 6.3 4 6zM15 4l1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L12 6.3l2-.3zM10 11l1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L7 13.3l2-.3z" fill="currentColor"/>',
  baby: '<circle cx="10" cy="7" r="3.4" fill="currentColor"/><path d="M4 18c0-5 3-7 6-7s6 2 6 7z" fill="currentColor"/>'
});
Object.assign(SIDE, {
  aiel: {name: 'Aiel', flag: '#b5562a', fg: '#f6e7c4', troop: '#a2845a', card: 'linear-gradient(#a24e26,#3d1c0c)'},
  and: {name: 'Andor', flag: '#a8221c', fg: '#f6f2e6', troop: '#a8221c', card: 'linear-gradient(#a8221c,#3a0d0a)'},
  cair: {name: 'Cairhien', flag: '#1f4e9c', fg: '#f2c230', troop: '#33507e', card: 'linear-gradient(#2a5fae,#0f2142)'},
  shien: {name: 'Shienar', flag: '#d9d2bf', fg: '#1a1a1a', troop: '#5a5048', card: 'linear-gradient(#8a8270,#2a2620)'},
  ill: {name: 'Illian', flag: '#2a6a3a', fg: '#e8d48a', troop: '#2f5a38', card: 'linear-gradient(#2a6a3a,#0e2414)'},
  tear: {name: 'Tear', flag: '#8e1b17', fg: '#f3efe2', troop: '#7a2c22', card: 'linear-gradient(#8e1b17,#2e0907)'},
  wc: {name: 'Children of the Light', flag: '#f3efe2', fg: '#c79a2a', troop: '#ece7da', card: 'linear-gradient(#cbbf9c,#5d5641)'},
  allied: {name: 'Alliansen', flag: '#f2efe6', fg: '#2f5f8e', troop: '#6a6a70', card: 'linear-gradient(#5b7da3,#20354d)'},
  tam: {name: "Tam al'Thor", flag: '#2a6a3a', fg: '#e8d48a', troop: '#2f5a38', card: 'linear-gradient(#2a6a3a,#0e2414)'}
});
function buildCampaignSVG() {
  const m = 'campaign';
  label(m, null, C.tarValon[0] + 70, C.tarValon[1] + 40, 'TAR VALON', 'lbl', {'text-anchor': 'start'});
  label(m, null, C.dragonmount[0], C.dragonmount[1] + 150, 'Dragonmount', 'lbl s');
  label(m, null, C.cairhien[0], C.cairhien[1] + 76, 'CAIRHIEN');
  label(m, null, C.caemlyn[0], C.caemlyn[1] + 74, 'CAEMLYN');
  label(m, null, 1880, 560, 'SPINE OF THE WORLD', 'lbl region', {style: 'font-size:22px', transform: 'rotate(-80 1880 560)'});
  label(m, null, C.pass[0] - 20, C.pass[1] + 56, 'Jangai Pass', 'lbl xs');
  label(m, null, 640, 900, 'Braem Wood', 'lbl xs');
  label(m, null, 420, 300, 'Caralain Grass', 'lbl xs');
  label(m, null, 600, 1180, 'Plains of Maredo ↓', 'lbl xs');
  label(m, null, 1000, 1000, 'Erinin', 'lbl s', {style: 'letter-spacing:.2em;fill:#cfe0e0', transform: 'rotate(-76 1000 1000)'});
  const tree = group(m, 'tree');
  el('circle', {cx: C.cairhien[0], cy: C.cairhien[1] - 70, r: 26, fill: 'rgba(40,90,40,.75)', stroke: '#f2e6c4', 'stroke-width': 2}, tree);
  const te = el('g', {transform: `translate(${C.cairhien[0] - 13},${C.cairhien[1] - 83}) scale(1.3)`, style: 'color:#f2e6c4'}, tree); te.innerHTML = EMB.tree;
  label(m, 'treeLbl', C.cairhien[0], C.cairhien[1] - 110, 'Avendoraldera huggs ner', 'lbl xs');
  const fire = group(m, 'fireCair');
  for (const [dx, dy] of [[-20, -10], [15, 5], [0, 25]]) el('circle', {cx: C.cairhien[0] + dx, cy: C.cairhien[1] + dy, r: 18, fill: 'rgba(230,110,30,.55)', class: 'glow'}, fire);
  arrow(m, 'aInvade', [[2000, 820], [1830, 800], [1600, 810], [1400, 820]], 'r', 14);
  arrow(m, 'aWar', [[1300, 880], [1100, 1050], [800, 1100], [600, 900], [520, 600], [600, 380], [800, 250]], 'r', 12);
  arrow(m, 'aLaman', [[1280, 760], [1100, 560], [950, 330]], 'w', 7);
  arrow(m, 'aAllyW', [[60, 700], [300, 500], [600, 320], [800, 230]], 'g', 10);
  arrow(m, 'aAllyN', [[880, -20], [880, 100]], 'g', 10);
  arrow(m, 'aAllyS', [[1050, 1270], [1000, 900], [940, 500], [910, 300]], 'g', 10);
}
function buildBattleSVG() {
  const m = 'battle';
  label(m, null, 1000, 680, 'TAR VALON', 'lbl region', {style: 'font-size:24px'});
  label(m, null, 1000, 540, 'Vita tornet', 'lbl xs');
  label(m, null, B.jualdhe[0], B.jualdhe[1] + 70, 'Jualdhe', 'lbl xs');
  label(m, null, B.alindaer[0], B.alindaer[1] + 70, 'Alindaer', 'lbl xs');
  label(m, null, B.darein[0] + 110, B.darein[1] + 10, 'Darein', 'lbl xs', {'text-anchor': 'start'});
  label(m, null, 170, 120, 'DRAGONMOUNT', 'lbl region', {style: 'font-size:22px'});
  label(m, null, 1250, 200, 'Erinin', 'lbl s', {style: 'letter-spacing:.2em;fill:#cfe0e0', transform: 'rotate(-86 1250 200)'});
  const camp = group(m, 'cairCamp', 'fade');
  for (let i = 0; i < 14; i++) { const x = 1620 + (i % 5) * 46, y = 190 + Math.floor(i / 5) * 40; el('path', {d: `M${x - 14} ${y + 10}L${x} ${y - 12}L${x + 14} ${y + 10}z`, fill: '#2a5fae', stroke: '#0f2142', 'stroke-width': 1.5}, camp); }
  label(m, 'campLbl', 1720, 330, 'Lamans läger', 'lbl xs');
  const burn = group(m, 'campBurn');
  for (const [x, y] of [[1650, 200], [1720, 230], [1780, 190], [1700, 270]]) el('circle', {cx: x, cy: y, r: 30, fill: 'rgba(230,110,30,.5)', class: 'glow'}, burn);
  const fore = group(m, 'foretell');
  el('circle', {cx: 1000, cy: 600, r: 80, fill: 'rgba(255,245,210,.3)', class: 'glow'}, fore);
  label(m, 'foreLbl', 1000, 470, 'Gitara Morosos förutsägelse', 'lbl s');
  const baby = group(m, 'baby');
  el('circle', {cx: 250, cy: 430, r: 30, fill: 'rgba(255,245,210,.35)', class: 'glow'}, baby);
  const be = el('g', {transform: 'translate(237,417) scale(1.3)', style: 'color:#fff8e6'}, baby); be.innerHTML = EMB.baby;
  label(m, 'babyLbl', 250, 490, 'Ett nyfött barn i snön', 'lbl xs');
  const clash = group(m, 'clash');
  for (const [x, y] of [[700, 380], [760, 760], [1300, 300], [1320, 640], [980, 1200]]) el('circle', {cx: x, cy: y, r: 24, fill: 'rgba(140,20,10,.45)', stroke: '#ffcf6a', 'stroke-width': 2}, clash);
  const snowfall = group(m, 'snowfall');
  const r = rng(77);
  for (let i = 0; i < 360; i++) el('circle', {cx: r() * 2000, cy: r() * 1250, r: 1.5 + r() * 2.5, fill: 'rgba(255,255,255,.85)'}, snowfall);
  el('rect', {x: 0, y: 0, width: 2000, height: 1250, fill: 'rgba(240,244,248,.22)'}, snowfall);
  arrow(m, 'aS', [[980, 1290], [980, 1240]], 'r', 12);
  arrow(m, 'aW', [[300, 1280], [500, 1000], [620, 760], [680, 420]], 'r', 12);
  arrow(m, 'aE', [[1700, 1280], [1500, 1000], [1380, 700], [1320, 360]], 'r', 12);
  arrow(m, 'aJanduin', [[1500, 700], [1580, 450], [1680, 260]], 'r', 10);
  arrow(m, 'aMaidens', [[500, 900], [400, 650], [320, 480]], 'r', 9);
  arrow(m, 'aPush1', [[700, 600], [500, 900], [300, 1240]], 'g', 12);
  arrow(m, 'aPush2', [[1350, 640], [1550, 900], [1750, 1240]], 'g', 12);
  arrow(m, 'aPursuit', [[1500, 1000], [1800, 1100], [2000, 1180]], 'g', 10);
}

// ================= Enheter och kort =================
const GROUPS = {
  aiel: {name: 'Aiel', side: 'aiel', emb: 'spear', lead: 'Janduin, klanhövding för Taardad', size: 'Fyra klaner: Taardad, Reyn, Nakai och Shaarad', text: 'Aiel kom över Dragonwall för att straffa kung Laman, som högg ner trädet Avendoraldera för att göra en tron av det. Bara fyra av tolv klaner följde Janduin.'},
  janduin: {name: 'Janduins styrka', side: 'aiel', emb: 'spear', lead: 'Janduin', size: 'Taardad', text: 'Janduin söker Laman. Det är honom Aiel vill åt, inte Tar Valon.'},
  maidens: {name: 'Jungfrur av spjutet', side: 'aiel', emb: 'spear', lead: '–', size: '–', text: 'Samma dag som Laman faller strider Jungfrur mot andoraner nära Dragonmount.'},
  allied: {name: 'Alliansen', side: 'allied', emb: 'flame', lead: 'Ledarna turas om, en dag i taget', size: 'Tio nationer', text: 'Aes Sedai och Children of the Light samlade tio nationer. Störst var kontingenterna från Shienar, Andor, Illian, Tear och Arafel. Cairhien krävde att få föra befälet men nekades.'},
  and: {name: 'Andor', side: 'and', emb: 'lion', lead: 'Andors befälhavare', size: 'En av de största kontingenterna', text: 'Andoraner håller västra stranden, nära Dragonmount.'},
  shien: {name: 'Shienar', side: 'shien', emb: 'eagle', lead: 'Shienars befälhavare', size: 'En av de största kontingenterna', text: 'Gränslandets krigare, vana vid strid mot Blighten.'},
  ill: {name: 'Illian', side: 'ill', emb: 'stars', lead: '–', size: 'En av de största kontingenterna', text: 'Bland Illians soldater finns Tam al\'Thor, som senare återvänder hem till Two Rivers.'},
  tear: {name: 'Tear', side: 'tear', emb: 'crescent', lead: '–', size: 'En av de största kontingenterna', text: 'Tears trupper har stridit mot Aiel sedan kriget drog genom deras land.'},
  wc: {name: 'Children of the Light', side: 'wc', emb: 'sun', lead: '–', size: '–', text: 'Whitecloaks hjälpte Aes Sedai att samla alliansen, trots att de annars misstror dem.'},
  cair: {name: 'Cairhien', side: 'cair', emb: 'sun', lead: 'Kung Laman Damodred', size: 'Resterna av Cairhiens här', text: 'Laman flydde norrut och tog sin tillflykt bakom alliansen. Det är honom Aiel jagar.'},
  tam: {name: "Tam al'Thor", side: 'tam', emb: 'stars', lead: "Tam al'Thor", size: 'En soldat', text: 'Tam har lämnat Two Rivers som ung och strider i Illians tjänst.'}
};
function buildUnits() {
  makeUnit('campaign', {id: 'cAiel', group: 'aiel', side: 'aiel', kind: 'token', emb: 'spear', at: [2040, 820], name: 'Aiel', label: 'Janduin'});
  makeUnit('campaign', {id: 'cLaman', group: 'cair', side: 'cair', kind: 'token', emb: 'sun', at: C.cairhien, name: 'Laman', label: 'Laman'});
  makeUnit('campaign', {id: 'cAlly', group: 'allied', side: 'allied', kind: 'token', emb: 'flame', at: [C.tarValon[0] - 60, C.tarValon[1] + 120], name: 'Alliansen', label: 'Alliansen'});
  const al = (id, side, emb, at, rot, label) => makeUnit('battle', {id, group: side, side, sp: 9, cols: 9, rows: 3, emb, at, rot, name: SIDE[side].name, label: label || SIDE[side].name});
  al('uAnd', 'and', 'lion', [640, 380], 90); al('uShien', 'shien', 'eagle', [650, 760], 90); al('uIll', 'ill', 'stars', [1360, 300], 90);
  al('uTear', 'tear', 'crescent', [1380, 640], 90); al('uWC', 'wc', 'sun', [980, 1130], 0, 'Whitecloaks');
  makeUnit('battle', {id: 'uCair', group: 'cair', side: 'cair', sp: 9, cols: 6, rows: 2, emb: 'sun', at: [1720, 260], name: 'Cairhien', label: 'Laman'});
  const ai = {side: 'aiel', group: 'aiel', sp: 9, big: true, loose: true, emb: 'spear', hats: '#5a3a1a', cols: 12, rows: 4};
  makeUnit('battle', {...ai, id: 'a1', at: [980, 1300], rot: 0, label: 'Aiel'});
  makeUnit('battle', {...ai, id: 'a2', at: [300, 1300], rot: 0});
  makeUnit('battle', {...ai, id: 'a3', at: [1700, 1300], rot: 0});
  makeUnit('battle', {...ai, id: 'a4', at: [1500, 720], rot: 0, group: 'janduin', cols: 9, rows: 3, label: 'Janduin'});
  makeUnit('battle', {...ai, id: 'a5', at: [520, 920], rot: 0, group: 'maidens', cols: 8, rows: 3, label: 'Jungfrur'});
  makeUnit('battle', {id: 'tam', group: 'tam', side: 'tam', cols: 1, rows: 1, sp: 12, at: [380, 560], emb: 'stars', name: "Tam al'Thor", label: 'Tam'});
}
