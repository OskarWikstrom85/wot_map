const DEF = ['d1', 'd2', 'd3', 'd4'];
const AIEL_IN = [['a1', [880, 440]], ['a2', [1250, 610]], ['a3', [680, 560]]];
const SCENES = [
  {k: 'Scen 1 · Staden', t: 'Tear', d: 'Saven 999 NE · The Dragon Reborn',
   init: [{map: 'campaign', cam: [1000, 625, 2000], clock: 'Saven 999 NE'}],
   beats: [
    {say: 'Tear ligger vid floden Erinin, nära havet. Vid stranden reser sig Stenen i Tear, en fästning som har belägrats och stormats över hundra gånger utan att falla.', acts: [{cam: [1050, 620, 1900]}]},
    {say: 'Enligt profetian ska Stenen inte falla förrän Draken kommer och tar Callandor, kristallsvärdet i Stenens hjärta som bara Dragon Reborn kan röra.', dur: 2400, acts: [{cam: [740, 480, 900]}]},
    {say: 'Black Ajah har gillrat en fälla. Tjuvfångaren Juilin Sandar har under tvång lett Nynaeve rakt in i den, och Egwene, Nynaeve och Elayne hålls nu som lockbete i Stenens celler.', dur: 3200, acts: [{show: ['cWomen', 'cBlack', 'aTrap'], move: [['cWomen', [960, 560], [790, 500]]]}, {t: .85, hide: ['aTrap']}]},
    {say: 'Rand har dragits söderut till Tear. Han har fortfarande kvar såret i sidan från Falme.', dur: 3400, acts: [{cam: [1000, 400, 1600], show: ['cRand', 'aRand'], move: [['cRand', [1250, 140], [1150, 320], [930, 430]]]}]},
    {say: 'Moiraine, Lan, Perrin och Faile har följt efter honom och bor på ett värdshus i staden. Mat och Thom har kommit nedför Erinin, och Mat har Aludras fyrverkerier med sig.', dur: 3600, acts: [{hide: ['aRand'], cam: [1000, 700, 1800], show: ['cPerrin', 'cMoi', 'innLbl', 'cMat', 'aMat'], move: [['cMat', [620, 300], [650, 700], [680, 880]]]}]},
    {say: 'Aiel under Rhuarc har smugit in i staden och spanar på Stenen från taken. De söker He Who Comes With The Dawn, eftersom Stenens fall ska tillkännage hans ankomst.', dur: 2600, acts: [{hide: ['aMat'], cam: [900, 420, 1100], show: ['cAiel']}]}
   ]},
  {k: 'Scen 2 · Natten', t: 'Mats fyrverkerier', d: 'Saven 999 NE · The Dragon Reborn',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Natten', show: [...DEF, 'callandor', 'calLbl']}],
   beats: [
    {say: 'Stenen sedd ovanifrån: murar tjocka som berg, salar och korridorer, och i mitten Hjärtat av Stenen, där Callandor hänger. Nere vid floden ligger cellerna.', acts: [{cam: [1000, 625, 2000]}]},
    {say: 'På taken har Mat mött Rhuarcs Aiel och Juilin Sandar. Aiel är inte här för några fångar och ger sig av. Juilin vet om en liten port vid floden som leder till cellerna.', dur: 2400, acts: [{cam: [1700, 500, 1100], show: ['a1', 'a2', 'a3', 'mat']}]},
    {say: 'Men Mat springer längs stadsmuren fram till Stenen, kilar in sitt knippe fyrverkerier i en skottglugg och tänder stubinerna. Det ska bara bli en avledning.', dur: 3000, acts: [{cam: [1880, 640, 600], show: ['aWall'], move: [['mat', [1940, 640], [1870, 645]]]}]},
    {say: 'Smällen slungar honom framåt. Där skottgluggen var gapar ett hål, stort nog att klämma sig igenom. Mat kryper in, och när Defenders of the Stone anfaller honom är det Juilin som räddar honom.', dur: 2800, acts: [{hide: ['aWall'], boom: [[1840, 640], [1830, 650], [1850, 630]]}, {t: .3, show: ['breach', 'breachLbl'], move: [['mat', [1780, 660]]]}, {t: .6, cam: [1700, 640, 900], move: [['d1', [1700, 630]]]}]}
   ]},
  {k: 'Scen 3 · Stenen', t: 'Aiel stormar', d: 'Samma natt · The Dragon Reborn',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Natten', show: [...DEF, 'callandor', 'calLbl', 'breach', 'a1', 'a2', 'a3', 'mat'], move: [['mat', [1780, 660]], ['d1', [1700, 630]]]}],
   beats: [
    {say: 'Aiel klättrar uppför Stenens murar och tar sig in. Försvararna, vana vid att fästningen aldrig faller, drivs tillbaka korridor för korridor.', dur: 4200, acts: [{show: ['climb', 'aAiel1', 'aAiel2', 'aAiel3'], move: [...AIEL_IN, ['d1', [1350, 620]], ['d2', [1000, 380]], ['d3', [760, 580]]]}, {t: .85, hide: ['climb']}]},
    {say: 'Mat och Juilin smiter bort genom kaoset mot cellerna.', dur: 3600, acts: [{hide: ['aAiel1', 'aAiel2', 'aAiel3'], show: ['aMatCells'], move: [['mat', [1500, 780], [1000, 880], [700, 940]]]}]},
    {say: 'Moiraine och Lan tar sig också in i Stenen och söker sig mot Hjärtat.', dur: 3200, acts: [{hide: ['aMatCells'], show: ['moi', 'aMoi'], move: [['moi', [600, 560], [820, 590]]]}]}
   ]},
  {k: 'Scen 4 · Vargdrömmen', t: 'Kampen i drömmen', d: 'Samma natt · The Dragon Reborn',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Natten', show: [...DEF, 'callandor', 'calLbl', 'breach', 'a1', 'a2', 'a3', 'mat', 'moi'], move: [...AIEL_IN, ['d1', [1350, 620]], ['d2', [1000, 380]], ['d3', [760, 580]], ['mat', [700, 940]], ['moi', [820, 590]]]}],
   beats: [
    {say: 'På värdshuset har Faile somnat i en drömfälla som var gillrad för Moiraine. Perrin följer efter henne in i Tel\'aran\'rhiod, vargdrömmen.', dur: 2600, acts: [{show: ['dream', 'dreamLbl']}]},
    {say: 'Som varg slåss Perrin sig igenom Stenen i drömmen och befriar till slut Faile. Där får han också veta att Rand är inne i fästningen.', dur: 3000, acts: [{cam: [1300, 500, 1300], show: ['wolfMark', 'wolfLbl']}]},
    {say: 'Egwene går också i drömmen. Där skär hon av Amico, den svarta systern som vaktar cellen, från Källan.', dur: 2600, acts: [{cam: [420, 980, 800], show: ['women', 'amico']}]}
   ]},
  {k: 'Scen 5 · Hjärtat av Stenen', t: 'Callandor', d: 'Samma natt · The Dragon Reborn',
   init: [{map: 'battle', cam: [1000, 700, 1400], clock: 'Natten', show: [...DEF, 'callandor', 'calLbl', 'breach', 'a1', 'a2', 'a3', 'moi', 'women', 'amico'], move: [...AIEL_IN, ['d1', [1350, 620]], ['d2', [1000, 380]], ['d3', [760, 580]], ['moi', [820, 590]]]}],
   beats: [
    {say: 'Rand skyndar genom korridorerna mot Callandor, med det gamla såret värkande i sidan.', dur: 3600, acts: [{show: ['rand', 'aRand'], move: [['rand', [1000, 900], [970, 650]]]}]},
    {say: 'I Hjärtat av Stenen väntar en man som Rand känner igen från sina drömmar: Be\'lal, en av de Förlorade, förklädd till High Lord. De slåss med svärd av eld, och Be\'lal är den skickligare. Rand faller.', dur: 3000, acts: [{hide: ['aRand'], cam: [1000, 600, 700], show: ['belal', 'duel'], move: [['belal', [1000, 610]]]}]},
    {say: 'Då kommer Moiraine. Hon dödar Be\'lal med en stav av vit eld – balefire.', dur: 2600, acts: [{show: ['balefire'], move: [['moi', [880, 520]]]}, {t: .4, hide: ['belal', 'duel']}, {t: .9, hide: ['balefire']}]},
    {say: 'Ba\'alzamon dyker upp och slår ner Moiraine med svart blixt. Hon blir liggande medvetslös.', dur: 2400, acts: [{show: ['balz', 'blackBolt'], move: [['balz', [1110, 470]]]}, {t: .8, hide: ['blackBolt']}]},
    {say: 'Rand griper Callandor, och saidin strömmar genom honom. Ba\'alzamon river upp en dörr i verkligheten och flyr. Rand följer efter: "Nu är det jag som jagar."', dur: 3000, acts: [{show: ['calGlow'], hide: ['calLbl'], move: [['rand', [1000, 600]]]}, {t: .4, show: ['rift', 'riftLbl'], move: [['balz', [1140, 560]]]}, {t: .7, hide: ['balz'], move: [['rand', [1140, 560]]]}, {t: .95, hide: ['rand', 'rift', 'riftLbl']}]}
   ]},
  {k: 'Scen 6 · Cellerna', t: 'Fångarna befrias', d: 'Samma natt · The Dragon Reborn',
   init: [{map: 'battle', cam: [450, 960, 900], clock: 'Natten', show: ['women', 'amico', 'mat', 'd4'], move: [['mat', [700, 940]]]}],
   beats: [
    {say: 'Mat och Juilin når cellerna. Egwene har redan skurit av Amico från Källan i drömmen.', dur: 2600, acts: [{move: [['mat', [520, 990]]]}]},
    {say: 'Mat släpper ut Nynaeve, Elayne och Egwene. Nynaeve slår ner Amico, och skölden försvinner. I stället för att tacka skäller kvinnorna ut Mat för att han dröjt och för hans kommentarer.', dur: 3000, acts: [{show: ['cellOpen']}, {t: .4, hide: ['amico']}]},
    {say: 'De tar sig upp ur cellerna.', dur: 3000, acts: [{show: ['aOut'], move: [['women', [520, 900], [720, 780]], ['mat', [540, 910], [740, 800]]]}]}
   ]},
  {k: 'Scen 7 · Gryningen', t: 'Stenen har fallit', d: 'Saven 999 NE · The Dragon Reborn',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Natten', show: ['callandor', 'breach', 'a1', 'a2', 'a3', 'moi', 'd4', 'women', 'mat', 'calGlow'], move: [...AIEL_IN, ['moi', [880, 520]], ['women', [720, 780]], ['mat', [740, 800]]]}],
   beats: [
    {say: 'Rand jagar Ba\'alzamon genom en värld som förvrids omkring dem. Till slut stöter han Callandor genom hans bröst, och Ba\'alzamon faller.', dur: 2800, acts: [{cam: [1000, 600, 1100]}, {t: .4, boom: [[1000, 600], [1010, 590]]}]},
    {say: 'Rand tror att han har vunnit den Sista striden. Han kommer tillbaka till Hjärtat med Callandor i handen och förkunnar att han är Dragon Reborn. De som strider i Hjärtat faller på knä.', dur: 2800, acts: [{show: ['rand', 'kneel'], move: [['rand', [1000, 600]], ['a1', [930, 480]], ['a3', [850, 600]]]}]},
    {say: 'Stenen har fallit till Aiel och Draken. Be\'lal är död, och Ba\'alzamon, som visar sig ha varit Ishamael, likaså.', dur: 2600, acts: [{clock: 'Gryningen', cam: [1000, 625, 2000], hide: ['d4']}]},
    {say: 'Dagen efter ropar folkmassorna på Tears gator efter Draken, och Drakens fana vajar över Stenen. Rhuarc visar drakmärket på sin arm, som klanhövdingar får i Rhuidean: Aiel kallades en gång People of the Dragon.', dur: 3000, acts: [{map: 'campaign', clock: 'Dagen efter', cam: [960, 520, 1200], show: ['dragonFlag', 'crowd', 'crowdLbl', 'cAiel'], move: [['cAiel', [760, 300]]]}]}
   ]}
];
