Object.assign(EMB, {
  dragon: '<path d="M3 13c2-6 7-9 12-8-3 1-4 3-3 5 3-1 5 1 5 3-2-1-4-1-6 1-2 2-5 3-8 2 2-1 3-2 3-3-1 1-2 1-3 0z" fill="currentColor"/>',
  spear: '<path d="M10 1l2 5h-1.2v12H9.2V6H8z" fill="currentColor"/>',
  crescent: '<path d="M6 4a5 5 0 1 0 0 6 4 4 0 1 1 0-6zM12 9a5 5 0 1 0 0 6 4 4 0 1 1 0-6zM16 3a4 4 0 1 0 0 5 3.2 3.2 0 1 1 0-5z" fill="currentColor"/>',
  hand: '<path d="M6 18v-7L4 7c-.6-1 1-1.8 1.6-.8L7 9V3c0-1.2 1.8-1.2 1.8 0v5h.4V2c0-1.2 1.8-1.2 1.8 0v6h.4V3c0-1.2 1.8-1.2 1.8 0v6h.4V5c0-1.2 1.8-1.2 1.8 0v8c0 3-2 5-5 5z" fill="currentColor"/>',
  pike: '<path d="M4 18L15 3M8 18L17 6M12 18l7-9" stroke="currentColor" stroke-width="1.8"/><path d="M15 3l1-2 1 2zM17 6l1-2 1 2z" fill="currentColor"/>',
  bolt: '<path d="M11 1L4 11h5l-2 8 9-11h-5l2-7z" fill="currentColor"/>'
});
Object.assign(SIDE, {
  aiel: {name: "Rands Aiel", flag: '#b5562a', fg: '#f6e7c4', troop: '#a2845a', card: 'linear-gradient(#a24e26,#3d1c0c)'},
  shaido: {name: 'Shaido', flag: '#2a1a14', fg: '#d0603a', troop: '#6e5638', card: 'linear-gradient(#4a2a1c,#140c09)'},
  tear: {name: 'Tear', flag: '#8e1b17', fg: '#f3efe2', troop: '#7a2c22', card: 'linear-gradient(#8e1b17,#2e0907)'},
  cair: {name: 'Cairhien', flag: '#1f4e9c', fg: '#f2c230', troop: '#33507e', card: 'linear-gradient(#2a5fae,#0f2142)'},
  wise: {name: 'Visa kvinnor och Aes Sedai', flag: '#e9e3d2', fg: '#2f5f8e', troop: '#e2dccb', card: 'linear-gradient(#8fa5bd,#2a3c52)'},
  rand: {name: 'Draken', flag: '#f3efe2', fg: '#a8221c', troop: '#c0a070', card: 'linear-gradient(#e9e2cf,#6a5c40)'},
  band: {name: 'Band of the Red Hand', flag: '#f3efe2', fg: '#b0201a', troop: '#6a2a20', card: 'linear-gradient(#e7e0cc,#5a1a12)'}
});

function buildCampaignSVG() {
  const m = 'campaign';
  label(m, null, 850, 690, 'CAIRHIEN');
  label(m, null, 1700, 170, "KINSLAYER'S DAGGER", 'lbl region', {transform: 'rotate(-14 1700 170)', style: 'font-size:24px'});
  label(m, null, 600, 860, 'Alguenya', 'lbl s', {style: 'letter-spacing:.2em;fill:#cfe0e0', transform: 'rotate(-70 600 860)'});
  label(m, null, 1300, 470, 'Gaelin', 'lbl s', {style: 'letter-spacing:.2em;fill:#cfe0e0', transform: 'rotate(-10 1300 470)'});
  label(m, null, C.eianrod[0], C.eianrod[1] + 44, 'EIANROD', 'lbl s');
  label(m, null, C.tsofu[0] + 10, C.tsofu[1] + 40, 'Tsofu', 'lbl xs');
  label(m, null, C.sabinel[0], C.sabinel[1] + 40, 'Sabinel', 'lbl xs');
  label(m, null, 1960, 470, 'mot Jangai Pass →', 'lbl xs', {'text-anchor': 'end'});
  label(m, null, 560, 30, '↑ mot Tar Valon', 'lbl xs');
  // Foregate brinner
  const fg = group(m, 'foregateFire');
  for (const [x, y] of [[700, 600], [840, 600], [830, 700], [700, 705], [770, 585], [845, 650]]) campFire(fg, x, y, .7);
  label(m, 'fgLbl', 770, 560, 'Foregate brinner', 'lbl xs');
  arrow(m, 'aEstean', [[830, 640], [1100, 610], [1450, 565], [1780, 520]], 'g', 9);
  arrow(m, 'aRand', [[2000, 505], [1700, 540], [1400, 575], [1080, 615]], 'g', 14);
  arrow(m, 'aZoom', [[1050, 625], [950, 640]], 'w', 6);
}
// Eld med lågor och rök (samma som i Two Rivers)
function campFire(parent, x, y, k = 1) {
  const f = el('g', {transform: `translate(${x},${y}) scale(${k})`}, parent);
  el('ellipse', {cx: 0, cy: 3, rx: 20, ry: 9, fill: 'rgba(30,18,10,.6)'}, f);
  el('circle', {cx: 0, cy: -2, r: 22, fill: 'rgba(255,130,40,.35)', class: 'glow'}, f);
  const sm = el('g', {class: 'smoke'}, f);
  for (let i = 0; i < 5; i++) el('circle', {cx: (i % 2 ? 3 : -3), cy: -14, r: 6 + i, fill: 'rgba(70,62,56,.8)', style: `animation-delay:${-i * .72}s`}, sm);
  el('path', {d: 'M-9 2c-2-8 2-10 1-17 4 5 6 8 5 17z', fill: '#e0531e', class: 'flame b'}, f);
  el('path', {d: 'M-3 2c-3-10 3-14 2-24 6 7 9 13 6 24z', fill: '#f2862a', class: 'flame'}, f);
  el('path', {d: 'M3 2c-1-7 3-9 3-15 4 5 5 10 2 15z', fill: '#e0531e', class: 'flame c'}, f);
  el('path', {d: 'M-1 2c-1-6 2-8 2-12 3 4 3 8 1 12z', fill: '#ffd36b', class: 'flame c'}, f);
}

function buildBattleSVG() {
  const m = 'battle', [cx0, cy0, cs] = B.city;
  label(m, null, cx0 + cs / 2, cy0 + cs / 2 - 70, 'CAIRHIEN', 'lbl region', {style: 'font-size:30px'});
  label(m, null, 280, 615, 'Solpalatset', 'lbl xs');
  label(m, null, 470, 640, 'Dragonwall-porten', 'lbl xs', {'text-anchor': 'start', x: 482});
  label(m, null, 270, 392, 'Jangai-porten', 'lbl xs');
  label(m, null, cx0 + cs / 2, cy0 + cs + 60, 'Foregate (nedbränd)', 'lbl xs', {style: 'font-style:italic'});
  label(m, null, 1450, 150, 'Gaelin', 'lbl s', {style: 'letter-spacing:.2em;fill:#cfe0e0'});
  label(m, null, 1990, 600, 'Rands läger →', 'lbl xs', {'text-anchor': 'end'});
  // Utsiktstornet av timmer
  const tw = group(m, 'tower', 'fade');
  const [tx, ty] = B.tower;
  el('rect', {x: tx - 16 + 8, y: ty - 16 + 10, width: 34, height: 34, fill: 'rgba(0,0,0,.4)'}, tw);
  el('rect', {x: tx - 16, y: ty - 16, width: 32, height: 32, fill: '#7a5a33', stroke: '#2a1a0c', 'stroke-width': 2}, tw);
  for (let i = -12; i <= 12; i += 6) el('line', {x1: tx - 16, y1: ty + i, x2: tx + 16, y2: ty + i, stroke: '#4a3418', 'stroke-width': 1.4}, tw);
  el('path', {d: `M${tx - 16} ${ty - 16}L${tx + 16} ${ty + 16}M${tx + 16} ${ty - 16}L${tx - 16} ${ty + 16}`, stroke: '#3a2614', 'stroke-width': 2}, tw);
  label(m, 'towerLbl', tx, ty - 30, 'Rands utsiktstorn', 'lbl xs');
  const ruin = group(m, 'towerRuin');
  for (let i = 0; i < 9; i++) el('rect', {x: tx - 30 + (i * 17) % 50, y: ty - 10 + (i * 11) % 30, width: 30, height: 5, fill: '#5a4026', stroke: '#2a1a0c', transform: `rotate(${(i * 37) % 80 - 40} ${tx} ${ty})`}, ruin);
  el('circle', {cx: tx, cy: ty, r: 40, fill: 'rgba(30,20,10,.35)'}, ruin);
  // Glaskullen
  const gl = group(m, 'glass');
  el('ellipse', {cx: B.glass[0], cy: B.glass[1] - 6, rx: 70, ry: 46, fill: 'rgba(170,220,230,.5)', stroke: 'rgba(230,250,255,.9)', 'stroke-width': 2}, gl);
  el('ellipse', {cx: B.glass[0] - 20, cy: B.glass[1] - 20, rx: 26, ry: 10, fill: 'rgba(255,255,255,.55)'}, gl);
  label(m, 'glassLbl', B.glass[0], B.glass[1] + 62, 'Kullen smält till glas', 'lbl xs');
  // Åskmoln
  const cl = group(m, 'clouds');
  for (const [x, y, r] of [[700, 80, 160], [1000, 60, 200], [1350, 90, 180], [500, 120, 150], [1650, 80, 160]]) el('ellipse', {cx: x, cy: y, rx: r, ry: r * .38, fill: 'rgba(40,44,52,.55)'}, cl);
  // Sammaels blixt västerifrån
  const sm = group(m, 'sammael');
  el('path', {d: `M-20 300L300 340L560 380L760 400L${tx - 10} ${ty - 8}`, fill: 'none', stroke: 'rgba(190,120,255,.85)', 'stroke-width': 4, 'stroke-dasharray': '14 10'}, sm);
  const st = el('text', {x: 80, y: 285, class: 'lbl s', style: 'fill:#e2c2ff'}, sm); st.textContent = 'Sammael, västerut';
  // Läkarlägret
  const hl = group(m, 'healCamp');
  el('circle', {cx: B.heal[0], cy: B.heal[1], r: 58, fill: 'rgba(150,200,255,.16)', stroke: 'rgba(200,230,255,.85)', 'stroke-width': 2, 'stroke-dasharray': '6 6'}, hl);
  for (const [dx, dy] of [[-22, -10], [14, -18], [20, 14], [-12, 18], [0, 0]]) el('path', {d: `M${B.heal[0] + dx - 8} ${B.heal[1] + dy + 6}l8-12 8 12z`, fill: '#e6dcc4', stroke: '#5a4a30'}, hl);
  label(m, 'healLbl', B.heal[0], B.heal[1] + 78, 'Läkarlägret', 'lbl xs');
  // Kommandotältet
  const ct = group(m, 'cmdTent');
  el('path', {d: `M${B.camp[0] - 34} ${B.camp[1] + 16}l34-38 34 38z`, fill: '#c8b48a', stroke: '#3a2a16', 'stroke-width': 2}, ct);
  label(m, null, B.camp[0], B.camp[1] + 40, 'Stabstältet', 'lbl xs').classList.add('hidden'); things.ctLbl = SV[m].lastChild;
  // Kartor på bordet (Mats planering)
  const mp = group(m, 'mapPlan');
  el('path', {d: 'M560 780C760 720 900 640 1000 600M560 780C700 880 900 880 1100 830', fill: 'none', stroke: 'rgba(246,231,184,.8)', 'stroke-width': 3, 'stroke-dasharray': '4 8'}, mp);
  // Bakhållet i dalen
  const amb = group(m, 'ambushMark');
  el('ellipse', {cx: B.colValley[0], cy: B.colValley[1], rx: 150, ry: 70, fill: 'rgba(160,30,20,.18)', stroke: 'rgba(224,80,50,.85)', 'stroke-width': 2.5, 'stroke-dasharray': '8 6'}, amb);
  label(m, 'ambLbl', B.colValley[0], B.colValley[1] - 82, 'Bakhåll i dalen', 'lbl xs');
  // Luckan mellan kullarna (fällan)
  const gap = group(m, 'gapMark');
  el('path', {d: `M${B.gapA[0] - 60} ${B.gapA[1] + 30}Q${B.gapA[0] + 20} ${B.gapA[1] + 90} ${B.gapB[0] - 60} ${B.gapB[1] - 30}`, fill: 'none', stroke: 'rgba(246,231,184,.85)', 'stroke-width': 3, 'stroke-dasharray': '10 8'}, gap);
  label(m, 'gapLbl', B.gapA[0] + 110, (B.gapA[1] + B.gapB[1]) / 2, 'Luckan mellan kullarna', 'lbl xs', {'text-anchor': 'start'});
  // Envig
  const duel = group(m, 'duel');
  el('circle', {cx: 1100, cy: 815, r: 26, fill: 'rgba(140,20,10,.6)', stroke: '#ffcf6a', 'stroke-width': 2.5}, duel);
  el('path', {d: 'M1088 803l24 24M1112 803l-24 24', stroke: '#ffe7b0', 'stroke-width': 4, 'stroke-linecap': 'round'}, duel);
  // Brinnande broar
  const bb = group(m, 'bridgesBurn');
  for (const [bx, by] of B.bridges) campFire(bb, bx, by, 1);
  // Portstrid
  const gateF = group(m, 'gateFight');
  el('circle', {cx: 480, cy: 600, r: 30, fill: 'rgba(140,20,10,.5)', stroke: '#ffcf6a', 'stroke-width': 2}, gateF);
  // Pilar
  arrow(m, 'aClan1', [[1760, 650], [1600, 470], [1420, 390]], 'g', 14);
  arrow(m, 'aClan2', [[1760, 650], [1550, 640], [1340, 650]], 'g', 14);
  arrow(m, 'aClan3', [[1760, 650], [1600, 820], [1420, 860]], 'g', 14);
  arrow(m, 'aMatS', [[1180, 640], [1220, 760], [1160, 960]], 'g', 7);
  arrow(m, 'a1000', [[1260, 1240], [1220, 1110], [1180, 1000]], 'r', 10);
  arrow(m, 'aMatW', [[1150, 960], [980, 930], [810, 890]], 'g', 7);
  arrow(m, 'aMatDown', [[800, 890], [700, 960], [640, 985]], 'g', 7);
  arrow(m, 'aCavN', [[610, 870], [500, 870], [470, 900]], 'g', 10);
  arrow(m, 'aCavS', [[620, 1110], [730, 1090], [740, 1070]], 'g', 10);
  arrow(m, 'aGate', [[620, 560], [520, 590], [490, 600]], 'r', 12);
  arrow(m, 'aCoul', [[560, 720], [760, 760], [930, 790]], 'r', 14);
  arrow(m, 'aNal', [[960, 720], [820, 620], [640, 660], [600, 720]], 'g', 10);
  arrow(m, 'aTal', [[980, 850], [820, 940], [640, 850], [610, 780]], 'g', 10);
  arrow(m, 'aFeint', [[1000, 780], [1100, 810], [1190, 820]], 'w', 9);
  arrow(m, 'aFlee1', [[700, 380], [500, 260], [290, 180], [270, 40]], 'r', 12);
  arrow(m, 'aFlee2', [[1100, 560], [950, 350], [830, 180], [840, 40]], 'r', 12);
  arrow(m, 'aFlee3', [[560, 900], [520, 700], [560, 420], [300, 190]], 'r', 10);
  arrow(m, 'aRandIn', [[1700, 640], [1300, 610], [900, 595], [490, 600], [330, 590]], 'w', 9);
}

// ================= Enheter och kort =================
const GROUPS = {
  city: {name: 'Tairenska försvarare i staden', side: 'tear', emb: 'crescent', lead: 'Tairenska lorder', size: 'Okänt', text: 'Tairener som Rand skickat för att dela ut hjälp håller staden. De har stängt portarna mot Shaido.'},
  shaido: {name: 'Shaido', side: 'shaido', emb: 'spear', lead: 'Couladin, Sevanna', size: 'Okänt, i tiotusental', text: 'Couladin utgav sig för att vara Car\'a\'carn och förde Shaido över Dragonwall. De belägrar Cairhien och har bränt Foregate, men har inte tagit staden.'},
  estean: {name: 'Estean och hans tairener', side: 'tear', emb: 'crescent', lead: 'Estean', size: 'En mindre ryttarstyrka', text: 'Bryter sig ut ur den belägrade staden för att be Rand om hjälp. De cairhieniska lorderna i följet svär honom trohet.'},
  rands: {name: 'Rands Aiel', side: 'aiel', emb: 'spear', lead: 'Rand al\'Thor och klanhövdingarna, bland dem Rhuarc och Han', size: 'Flera klaner', text: 'Klanerna som följer Rand som Car\'a\'carn marscherar mot Cairhien för att bryta belägringen.', chars: ['rand']},
  undecided: {name: 'Klaner som inte valt sida', side: 'aiel', emb: 'spear', lead: '–', size: 'Okänt', text: 'Några klaner har ännu inte bestämt om de följer Rand. Under slaget rör de sig tillsammans, och Han, Dhearic och Erim går för att stoppa dem.'},
  tower: {name: 'Rand, Egwene och Aviendha', side: 'rand', emb: 'dragon', lead: 'Rand al\'Thor', size: 'Tre kanaliserare', text: 'Från utsiktstornet ser Rand slagfältet i kikare. Egwene och Aviendha kanaliserar blixtar mot Shaido, och Rand smälter en kulle till glas.', chars: ['rand', 'egwene', 'aviendha']},
  maidens: {name: 'Jungfrur av spjutet', side: 'aiel', emb: 'spear', lead: 'Sulin', size: 'Rands livvakt', text: 'Jungfrurna hindrar Rand från att gå ner i striden och vaktar tornet. När blixtarna slår ner vid tornets fot dör flera av dem, bland dem Jolien.'},
  mat: {name: 'Mat Cauthon', side: 'band', emb: 'hand', lead: 'Mat Cauthon', size: 'En ryttare', text: 'Mat ville egentligen lämna Rand före slaget. Ändå hamnar han, med minnena från andra mäns liv, mitt i striden som fältherre.', chars: ['mat']},
  column: {name: 'Tairener och cairhieniner', side: 'cair', emb: 'pike', lead: 'Melanril (tairenskt rytteri), Daerid (cairhieniska pikenerare), Talmanes (cairhieniskt rytteri)', size: 'Omkring 3 000 efter bakhållet', text: 'En kolonn på väg in i ett bakhåll som Aiel inte kunnat se. Mat ställer pikenerarna i en ihålig fyrkant med tairenerna inuti.'},
  nalesean: {name: 'Naleseans tairener', side: 'tear', emb: 'crescent', lead: 'Nalesean', size: 'Tairenskt rytteri', text: 'Skickas runt norrut för att anfalla Couladins styrka bakifrån.'},
  talmanes: {name: 'Talmanes cairhieniner', side: 'cair', emb: 'sun', lead: 'Talmanes Delovinde', size: 'Cairhieniskt rytteri', text: 'Skickas runt söderut. Efter slaget utropar Talmanes och Nalesean Mat till sin general.'},
  couladin: {name: 'Couladins styrka', side: 'shaido', emb: 'spear', lead: 'Couladin', size: 'Närmare 5 000', text: 'Couladin leder själv omkring 5 000 Aiel mot Mats kulle, troligen utan att veta att Mats trupper står där.'},
  heal: {name: 'Läkarlägret', side: 'wise', emb: 'flame', lead: 'Moiraine, visa kvinnor', size: '–', text: 'Visa kvinnor och gai\'shain tar hand om de sårade. Moiraine helar, och efter slaget helar hon Rand.', chars: ['moiraine', 'lan']},
  band: {name: 'Band of the Red Hand', side: 'band', emb: 'hand', lead: 'Mat Cauthon', size: 'Tairenskt och cairhieniskt rytteri och fotfolk', text: 'Soldaterna Mat räddat utropar honom till general och tar namnet efter Manetherens sista försvarare.', chars: ['mat']},
  prisoners: {name: 'Tillfångatagna Shaido', side: 'shaido', emb: 'spear', lead: '–', size: 'Omkring 20 000', text: 'Tjugotusen Shaido tas till fånga. Resten flyr norrut med Sevanna och bränner broarna bakom sig.'},
  procession: {name: 'Rand rider in i Cairhien', side: 'rand', emb: 'dragon', lead: 'Rand al\'Thor', size: 'Rand med följe', text: 'Rand rider in i staden, avböjer tronen och får de cairhieniska och tairenska adelsmännen att svära honom trohet.', chars: ['rand']}
};
function buildUnits() {
  // kampanjkartan
  makeUnit('campaign', {id: 'cityT', group: 'city', side: 'tear', kind: 'token', emb: 'crescent', at: [770, 650], name: 'Tairener i staden', label: 'Tairener'});
  makeUnit('campaign', {id: 'shN', group: 'shaido', side: 'shaido', kind: 'token', emb: 'spear', at: [760, 470], name: 'Shaido', label: 'Shaido'});
  makeUnit('campaign', {id: 'shE', group: 'shaido', side: 'shaido', kind: 'token', emb: 'spear', at: [960, 660], name: 'Shaido'});
  makeUnit('campaign', {id: 'shS', group: 'shaido', side: 'shaido', kind: 'token', emb: 'spear', at: [790, 820], name: 'Shaido'});
  makeUnit('campaign', {id: 'estean', group: 'estean', side: 'tear', kind: 'token', emb: 'crescent', at: [830, 640], name: 'Estean', label: 'Estean'});
  makeUnit('campaign', {id: 'randA', group: 'rands', side: 'aiel', kind: 'token', emb: 'dragon', at: [2040, 505], name: 'Rand', label: 'Rand'});
  makeUnit('campaign', {id: 'clanA', group: 'rands', side: 'aiel', kind: 'token', emb: 'spear', at: [2060, 470], name: 'Klaner'});
  makeUnit('campaign', {id: 'clanB', group: 'rands', side: 'aiel', kind: 'token', emb: 'spear', at: [2060, 545], name: 'Klaner'});
  makeUnit('campaign', {id: 'und1', group: 'undecided', side: 'aiel', kind: 'token', emb: 'spear', at: [1550, 300], name: 'Oavgjorda klaner'});
  makeUnit('campaign', {id: 'und2', group: 'undecided', side: 'aiel', kind: 'token', emb: 'spear', at: [1550, 900], name: 'Oavgjorda klaner'});
  // slagfältet
  const sh = {side: 'shaido', cols: 13, rows: 4, sp: 9, big: true, loose: true, emb: 'spear', group: 'shaido', name: 'Shaido', hats: '#3a2a1a'};
  makeUnit('battle', {...sh, id: 'sH1', at: [700, 380], rot: 0});
  makeUnit('battle', {...sh, id: 'sH2', at: [1120, 540], rot: 90});
  makeUnit('battle', {...sh, id: 'sH3', at: [900, 760], rot: 20});
  makeUnit('battle', {...sh, id: 'sH4', at: [1350, 330], rot: 90, cols: 11});
  makeUnit('battle', {...sh, id: 'sH5', at: [1330, 850], rot: 90, cols: 11});
  makeUnit('battle', {...sh, id: 'sGate', at: [640, 560], rot: 90, cols: 11});
  makeUnit('battle', {...sh, id: 's1000', at: [1260, 1290], rot: 0, cols: 12, rows: 3});
  makeUnit('battle', {...sh, id: 'sAmb1', at: [470, 925], rot: 80, cols: 10, rows: 3});
  makeUnit('battle', {...sh, id: 'sAmb2', at: [740, 1060], rot: -10, cols: 10, rows: 3});
  makeUnit('battle', {...sh, id: 'coul', group: 'couladin', at: [470, 720], rot: 80, cols: 15, rows: 5, label: 'Couladin'});
  const cl = {side: 'aiel', cols: 14, rows: 4, sp: 9, big: true, loose: true, emb: 'spear', group: 'rands', name: 'Rands Aiel', hats: '#5a3a1a'};
  makeUnit('battle', {...cl, id: 'cl1', at: [1760, 600], rot: 90});
  makeUnit('battle', {...cl, id: 'cl2', at: [1780, 650], rot: 90});
  makeUnit('battle', {...cl, id: 'cl3', at: [1760, 700], rot: 90});
  makeUnit('battle', {id: 'randT', group: 'tower', side: 'rand', cols: 3, rows: 1, sp: 12, at: [B.tower[0] + 46, B.tower[1] + 6], emb: 'dragon', name: 'Rand, Egwene och Aviendha', label: 'Rand'});
  makeUnit('battle', {id: 'maid', group: 'maidens', side: 'aiel', cols: 10, rows: 2, sp: 8, at: [B.tower[0], B.tower[1] + 52], emb: 'spear', hats: '#b02a1a', name: 'Jungfrur'});
  makeUnit('battle', {id: 'matU', group: 'mat', side: 'band', cols: 1, rows: 1, sp: 14, at: [1180, 640], emb: 'hand', name: 'Mat', label: 'Mat'});
  makeUnit('battle', {id: 'pike', group: 'column', side: 'cair', cols: 7, rows: 7, sp: 8, at: [B.colValley[0] + 10, B.colValley[1]], emb: 'pike', hats: '#c9c2a8', name: 'Daerids pikenerare'});
  makeUnit('battle', {id: 'tH', group: 'column', side: 'tear', cols: 4, rows: 3, sp: 8, at: [B.colValley[0] + 10, B.colValley[1]], emb: 'crescent', name: 'Melanrils tairener', banner: false});
  makeUnit('battle', {id: 'cH', group: 'column', side: 'cair', cols: 9, rows: 2, sp: 8, at: [B.colValley[0] - 90, B.colValley[1] + 20], emb: 'sun', name: 'Talmanes ryttare'});
  makeUnit('battle', {id: 'nal', group: 'nalesean', side: 'tear', cols: 10, rows: 2, sp: 8, at: [950, 690], emb: 'crescent', name: 'Naleseans tairener', label: 'Nalesean'});
  makeUnit('battle', {id: 'tal', group: 'talmanes', side: 'cair', cols: 10, rows: 2, sp: 8, at: [950, 880], emb: 'sun', name: 'Talmanes cairhieniner', label: 'Talmanes'});
  makeUnit('battle', {id: 'heal', group: 'heal', side: 'wise', cols: 4, rows: 2, sp: 9, at: [B.heal[0], B.heal[1] - 4], emb: 'flame', name: 'Läkarlägret', banner: false});
  makeUnit('battle', {id: 'band', group: 'band', side: 'band', cols: 14, rows: 3, sp: 8, at: [1000, 780], emb: 'hand', name: 'Band of the Red Hand', label: 'Band of the Red Hand'});
  makeUnit('battle', {id: 'pris', group: 'prisoners', side: 'shaido', cols: 16, rows: 4, sp: 7, at: [1640, 1030], emb: 'spear', banner: false, name: 'Fångar'});
  makeUnit('battle', {id: 'proc', group: 'procession', side: 'rand', cols: 3, rows: 2, sp: 11, at: [1700, 640], emb: 'dragon', name: 'Rand', label: 'Rand'});
}
// Blixtar: korta, ljusa zickzack-streck från himlen
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
