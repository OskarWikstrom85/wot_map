const ALLY = ['uAnd', 'uShien', 'uIll', 'uTear', 'uWC'];
const AIEL_AT = [['a1', [980, 1240]], ['a2', [560, 900]], ['a3', [1460, 900]]];
const SCENES = [
  {k: 'Scen 1 · Kampanjkartan', t: 'Aielkriget', d: '976–978 NE · New Spring',
   init: [{map: 'campaign', cam: [1000, 625, 2000], clock: '976 NE'}],
   beats: [
    {say: 'Aiel hade gett Cairhien en planta av livets träd. Kung Laman lät hugga ner trädet, Avendoraldera, för att göra en tron av det.', dur: 2400, acts: [{cam: [1330, 760, 900], show: ['tree', 'treeLbl', 'cLaman']}]},
    {say: 'Janduin, klanhövding för Taardad, krävde hämnd. Bara fyra av tolv klaner följde honom: Taardad, Reyn, Nakai och Shaarad. Våren 976 gick de över Dragonwall med över 90 000 krigare.', dur: 3600, acts: [{cam: [1550, 800, 1100], show: ['cAiel', 'aInvade'], move: [['cAiel', [1830, 800], [1600, 810], [1420, 820]]]}]},
    {say: 'Inom fyra månader var Cairhiens här slagen på flykten, och delar av staden brann, bland dem Topless Towers.', dur: 2600, acts: [{hide: ['aInvade'], show: ['fireCair']}]},
    {say: 'Kriget drog sedan vidare västerut, över Plains of Maredo och genom Braem Wood och Caralain Grass. Aiel förföljde Laman norrut, tills de stod vid Tar Valons murar. Det var 978.', dur: 4400, acts: [{clock: '978 NE', cam: [1000, 640, 2000], hide: ['fireCair', 'tree', 'treeLbl'], show: ['aWar', 'aLaman'], move: [['cLaman', [1100, 560], [950, 330]], ['cAiel', [1100, 1050], [800, 1100], [600, 900], [520, 600], [600, 380], [780, 260]]]}]},
    {say: 'Aes Sedai och Children of the Light samlade tio nationer till en gemensam här vid Tar Valon. Cairhien krävde att få föra befälet men nekades. I stället turades ledarna om, en dag i taget.', dur: 3200, acts: [{hide: ['aWar', 'aLaman'], cam: [850, 300, 1100], show: ['cAlly', 'aAllyW', 'aAllyN', 'aAllyS']}]}
   ]},
  {k: 'Scen 2 · Tar Valon', t: 'Striderna vid broarna', d: 'Sent år 978 NE, dag 1 · New Spring',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Dag 1', show: [...ALLY, 'cairCamp', 'campLbl', 'uCair']}],
   beats: [
    {say: 'Tar Valon ligger på en ö i floden Erinin, omgiven av vita murar. Broar leder över till byarna på stränderna. I väster reser sig Dragonmount. Alliansens arméer står vid broarna.', acts: [{cam: [1000, 625, 2000]}]},
    {say: 'Aiel anfaller från söder och längs båda sidor om floden. Striderna står kring broarna till ön.', dur: 4200, acts: [{show: ['a1', 'a2', 'a3', 'aS', 'aW', 'aE'], move: AIEL_AT}, {t: .7, show: ['clash']}]},
    {say: 'Men Aiel försöker aldrig ta själva staden. De vill inte skada Aes Sedai, och det är Laman de är ute efter.', dur: 2600, acts: [{hide: ['aS', 'aW', 'aE'], cam: [1000, 700, 1300]}]}
   ]},
  {k: 'Scen 3 · Snön', t: 'Laman faller', d: 'Dag 2–3 · New Spring',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Dag 2', show: [...ALLY, 'cairCamp', 'campLbl', 'uCair', 'a1', 'a2', 'a3', 'clash'], move: AIEL_AT}],
   beats: [
    {say: 'Andra dagen faller tung snö över slagfältet. Den hindrar knappt Aiel.', dur: 2400, acts: [{show: ['snowfall']}]},
    {say: 'Tredje dagen hittar Janduins styrka Cairhiens läger och förstör det. Laman och hans bröder dödas, och bara omkring 500 cairhieniner överlever. Lamans huvud och hans svärd, smitt med den Enda kraften, förs tillbaka till ödemarken.', dur: 4400, acts: [{clock: 'Dag 3', cam: [1600, 400, 1100], show: ['a4', 'aJanduin'], move: [['a4', [1580, 450], [1680, 280]]]}, {t: .55, show: ['campBurn']}, {t: .7, hide: ['uCair', 'cairCamp']}]},
    {say: 'Samma dag strider Jungfrur av spjutet mot andoraner nära Dragonmount.', dur: 3600, acts: [{hide: ['aJanduin'], cam: [500, 600, 1100], show: ['a5', 'aMaidens'], move: [['a5', [400, 650], [420, 520]]]}]}
   ]},
  {k: 'Scen 4 · Dragonmount', t: 'Draken föds på nytt', d: 'Dag 3 · New Spring',
   init: [{map: 'battle', cam: [1000, 600, 1200], clock: 'Dag 3', show: [...ALLY, 'a1', 'a2', 'a3', 'a5', 'snowfall', 'campBurn', 'a4'], move: [...AIEL_AT, ['a5', [420, 520]], ['a4', [1680, 280]]]}],
   beats: [
    {say: 'I Vita tornet serverar två Accepted, Moiraine och Siuan, te åt Amyrlin och hennes Keeper. Då får Keepern, Gitara Moroso, en förutsägelse: Draken har just dragit sitt första andetag på Dragonmount. Hon dör direkt efteråt.', dur: 3000, acts: [{show: ['foretell', 'foreLbl']}]},
    {say: 'Därmed börjar Aes Sedais sökande efter barnet.', dur: 2000, acts: [{hide: ['foretell', 'foreLbl'], cam: [500, 500, 1100]}]},
    {say: 'På Dragonmounts snöiga sluttning hittar en soldat i Illians tjänst, Tam al\'Thor, ett nyfött barn i en död kvinnas famn. Han tar med sig pojken hem till Two Rivers och ger honom namnet Rand.', dur: 3600, acts: [{cam: [300, 450, 700], show: ['tam'], move: [['tam', [290, 440]]]}, {t: .5, show: ['baby', 'babyLbl']}]}
   ]},
  {k: 'Scen 5 · Efter slaget', t: 'Förföljelsen', d: 'Dag 4 och framåt · New Spring',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Dag 4', show: [...ALLY, 'a1', 'a2', 'a3', 'a5', 'a4', 'snowfall'], move: [...AIEL_AT, ['a5', [420, 520]], ['a4', [1680, 280]]]}],
   beats: [
    {say: 'Den fjärde dagen driver alliansen bort Aiel från Tar Valon. Rytteriet förföljer dem i omkring tjugo dagar, tills de försvinner genom Kinslayer\'s Dagger.', dur: 4400, acts: [{show: ['aPush1', 'aPush2'], move: [['a2', [500, 900], [300, 1240]], ['a5', [500, 900], [320, 1240]], ['a1', [980, 1300]], ['a3', [1550, 900], [1750, 1240]], ['a4', [1700, 600], [1800, 1100]], ['uAnd', [600, 700]], ['uTear', [1450, 800]]]}, {t: .85, hide: ['a1', 'a2', 'a3', 'a4', 'a5']}]},
    {say: 'Alliansen förklarar sig segrare. Först senare inser befälhavarna att Aiel bara ville döda Laman – och det målet hade de nått. I Cairhien förlorar huset Damodred makten.', dur: 3000, acts: [{hide: ['aPush1', 'aPush2', 'snowfall'], cam: [1000, 625, 2000]}]}
   ]}
];
