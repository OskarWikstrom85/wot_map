// Gemensamma lägen som scenerna börjar från
const SEAN = ['sA', 'sB', 'sC', 'dam'];
const SEAN_AT = [['sA', [1040, 780]], ['sB', [1080, 900]], ['sC', [1000, 660]], ['dam', [960, 840]]];
const SCENES = [
  {k: 'Scen 1 · Kampanjkartan', t: 'Toman Head', d: 'Nesan 998 NE · The Great Hunt',
   init: [{map: 'campaign', cam: [1000, 640, 2000], clock: 'Nesan 998 NE'}],
   beats: [
    {say: 'Toman Head skjuter ut i Aryth Ocean. Längst ut på udden ligger hamnstaden Falme.', acts: [{cam: [900, 620, 1900]}]},
    {say: 'Seanchan, ättlingar till Artur Hawkwings arméer, har gått i land och tagit Falme. Deras förtrupp, Hailene, leds av High Lord Turak. Hos honom finns nu Horn of Valere och Mats dolk från Shadar Logoth.', dur: 2600, acts: [{cam: [520, 620, 1200], show: ['cShips', 'cFalme', 'cPat1']}]},
    {say: 'I Falme hålls Egwene som damane, kopplad med en a\'dam. Nynaeve, Elayne och Min har tagit sig in i staden för att befria henne.', dur: 2200, acts: [{cam: [400, 640, 900], show: ['cWomen']}]},
    {say: 'Från öster rider Lord Captain Geofram Bornhald in på Toman Head med en legion Whitecloaks. Han tror att Seanchans damane är Aes Sedai som bryter sina eder, och han räknar med att dö här.', dur: 3400, acts: [{cam: [1500, 700, 1300], show: ['cWC', 'aWC'], move: [['cWC', [1850, 790], [1660, 760]]]}]},
    {say: 'I bergen väntar Ingtar med sina shienarer, Loial, Verin och de tre från Two Rivers. Verin ser till att exakt fem rider in i Falme: Rand, Mat, Perrin, Ingtar och spåraren Hurin. "Fem rider ut och fyra återvänder", säger profetian.', dur: 3800, acts: [{cam: [700, 560, 1500], hide: ['aWC'], show: ['cCamp', 'campLbl', 'cFive', 'aFive'], move: [['cFive', [800, 560], [560, 620], [380, 630]]]}]}
   ]},
  {k: 'Scen 2 · Falme', t: 'Fem rider in', d: 'Natten · The Great Hunt',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Natten', show: ['ships', ...SEAN, 'pat1', 'pat2']}],
   beats: [
    {say: 'Falme klättrar uppför sluttningarna ovanför hamnen. Seanchans stora skepp ligger i bukten, och utanför staden har deras här sitt läger.', acts: [{cam: [1000, 625, 2000]}]},
    {say: 'Vem som helst får rida in i Falme. Mitt i natten tar sig de fem in i Turaks hus högst upp i staden och hämtar hornet och dolken.', dur: 4200, acts: [{cam: [1200, 520, 1600], show: ['five', 'aIn'], move: [['five', [1700, 470], [1400, 520], [1100, 570], [900, 520], [860, 480]]]}]},
    {say: 'Turak kommer tillbaka och utmanar Rand. Blademästaren är skickligare, men Rand finner tomrummet och dödar honom.', dur: 2400, acts: [{hide: ['aIn'], cam: [840, 500, 700], show: ['duel']}]},
    {say: 'De försöker ta sig ut ur staden, men patruller stänger gränderna. Ingtar erkänner att han varit Darkfriend – det var han som släppte in mannen som sköt pilen i Fal Dara. Han vill göra bot och stannar ensam för att ge dem tid. Rand läser de shienariska dödsorden över honom.', dur: 3200, acts: [{hide: ['duel', 'five'], show: ['four', 'ingtar', 'ingtarStand', 'ingLbl'], cam: [880, 600, 800], move: [['pat1', [920, 620]]]}]},
    {say: 'Fyra rider ut ur Falme, upp på en kulle ovanför staden.', dur: 3000, acts: [{show: ['aOut'], move: [['four', [960, 600], [1080, 520], [1170, 400]]], cam: [1000, 500, 1300]}]}
   ]},
  {k: 'Scen 3 · Kenneln och kajen', t: 'Egwene befrias', d: 'Samma natt · The Great Hunt',
   init: [{map: 'battle', cam: [700, 680, 900], clock: 'Samma natt', show: ['ships', ...SEAN, 'pat2', 'kennelLbl']}],
   beats: [
    {say: 'Förklädda till sul\'dam och tjänare tar sig Nynaeve, Elayne och Min in där damane hålls. Min visar vägen till Egwene.', dur: 3000, acts: [{show: ['women'], move: [['women', [690, 640], [700, 700]]]}]},
    {say: 'De tar av Egwene hennes a\'dam. När sul\'dam Renna kommer in slår Egwene ner henne och sätter sitt gamla halsband på henne. Renna och Seta blir lämnade inlåsta, själva kopplade.', dur: 2400, acts: [{cam: [700, 720, 600]}]},
    {say: 'På gatan möter de en patrull. Egwene kallar ner blixtar – hon tänker aldrig mer bli kopplad. Eldklot från damane regnar ner, och Nynaeve slår tillbaka med egna blixtar.', dur: 3400, acts: [{cam: [680, 720, 900], bolt: [[720, 770], [740, 760], [700, 790]]}, {t: .4, boom: [[650, 700], [690, 740], [620, 690]]}, {t: .6, bolt: [[960, 840], [940, 820]]}, {t: .8, hide: ['pat2']}]},
    {say: 'Vid kajen väntar Bayle Domon med sitt skepp Spray. Besättningen vill kapa förtöjningen, men Domon har gett Nynaeve sitt ord. Kvinnorna kommer ombord, och Spray glider ut ur hamnen.', dur: 4400, acts: [{cam: [450, 680, 1100], show: ['spray'], move: [['women', [620, 640]]]}, {t: .35, hide: ['women'], show: ['aSpray'], move: [['spray', [420, 690], [260, 720], [60, 760]]]}]}
   ]},
  {k: 'Scen 4 · Slätten', t: 'Mellan två härar', d: 'Morgonen · The Great Hunt',
   init: [{map: 'battle', cam: [1300, 700, 1700], clock: 'Morgonen', show: ['ships', ...SEAN, 'four'], move: [['four', [1170, 400]]]}],
   beats: [
    {say: 'Bornhald skickar iväg Jaret Byar. Han ska hålla sig utanför striden och berätta för Bornhalds son vad som har hänt. Sedan rider legionen mot Seanchan.', dur: 3400, acts: [{show: ['wc1', 'wc2', 'aWC', 'byar', 'aByar'], move: [['wc1', [1700, 860], [1500, 850]], ['wc2', [1750, 960], [1560, 940]], ['byar', [1750, 930], [2000, 980]]]}, {t: .8, hide: ['byar']}]},
    {say: 'Från kullen ser de fyra att de är instängda. Seanchans här ställer upp utanför Falme, och Whitecloaks dör under deras svärd och damanes eld. Ingen av dem kan ta sig tillbaka in i staden.', dur: 3800, acts: [{hide: ['aWC', 'aByar'], cam: [1200, 640, 1500], show: ['clash'], move: [['sA', [1180, 800]], ['sB', [1220, 900]], ['wc1', [1320, 830]], ['wc2', [1360, 930]]]}, {t: .3, bolt: [[1330, 830], [1360, 920], [1300, 860]]}, {t: .55, boom: [[1340, 860], [1380, 940]]}]}
   ]},
  {k: 'Scen 5 · Kullen', t: 'Hornet ljuder', d: 'Morgonen · The Great Hunt',
   init: [{map: 'battle', cam: [1200, 600, 1500], clock: 'Morgonen', show: ['ships', ...SEAN, 'four', 'wc1', 'wc2', 'clash'], move: [['four', [1170, 400]], ['sA', [1180, 800]], ['sB', [1220, 900]], ['wc1', [1320, 830]], ['wc2', [1360, 930]]]}],
   beats: [
    {say: 'Mat har hornet fastbundet vid sadeln. Han skulle ha lämnat det till Verin, men nu blåser han i det. En dimma väller in över landet.', dur: 3000, acts: [{cam: [1180, 450, 900]}, {t: .3, show: ['fog']}]},
    {say: 'Ur dimman rider Hjältarna från hornet – bara omkring hundra, men legendernas främsta krigare. Främst rider Artur Hawkwing, och bredvid honom Birgitte med sin silverbåge. Hawkwing kallar Rand för Lews Therin.', dur: 3000, acts: [{show: ['heroes'], move: [['heroes', [1200, 420]]]}]},
    {say: 'Hawkwing känner att något saknas. Rand tar fram Drakens fana, Perrin gör en stång och bär den. Hjältarna lovar att följa fanan och Draken. Hurin vägrar stanna kvar, och Hawkwing antyder att han kan bli en ny hjälte.', dur: 2400, acts: [{cam: [1190, 420, 700]}]},
    {say: 'Bornhald hör hornets ton och tror att dimman är Seanchans verk. Damane slår ner hans män. Han leder en sista anfallsritt i väntan på döden, och han stupar.', dur: 3600, acts: [{cam: [1300, 820, 1100], show: ['aWC2'], move: [['wc1', [1230, 820]]]}, {t: .3, bolt: [[1260, 830], [1290, 810], [1230, 850], [1350, 930]]}, {t: .5, boom: [[1250, 820], [1300, 850]]}, {t: .85, hide: ['wc1', 'aWC2']}]},
    {say: 'Hjältarna och de fyra under Drakens fana rider mot Falme. Seanchan drivs tillbaka mot staden och havet, och Whitecloaks som är kvar trängs undan.', dur: 4400, acts: [{cam: [1100, 700, 1800], hide: ['clash'], show: ['aHeroes', 'aSeaRet', 'aWCback'], move: [['heroes', [1080, 560], [960, 680], [900, 760]], ['four', [1100, 520], [1000, 640]], ['sA', [820, 820], [600, 820]], ['sB', [900, 880], [640, 880]], ['sC', [800, 700], [620, 700]], ['dam', [700, 840], [560, 820]], ['wc2', [1550, 900], [1800, 960]]]}, {t: .85, hide: ['sA', 'sB', 'sC', 'dam', 'wc2', 'aSeaRet', 'aWCback']}]}
   ]},
  {k: 'Scen 6 · Över staden', t: 'Duellen i himlen', d: 'Samma morgon · The Great Hunt',
   init: [{map: 'battle', cam: [1000, 500, 1900], clock: 'Morgonen', show: ['ships', 'fog', 'heroes', 'four'], move: [['heroes', [900, 760]], ['four', [1000, 640]]]}],
   beats: [
    {say: 'I dimman kommer Rand bort från de andra. Ba\'alzamon dyker upp, och Rands häst kastar av honom – men han faller inte. Han svävar högt ovanför slaget, och där möts de. Ba\'alzamon slåss med en svartbränd stav.', dur: 3000, acts: [{cam: [1000, 300, 1300], show: ['sky', 'skyLbl1', 'skyLbl2']}]},
    {say: 'Kampen i himlen hänger ihop med slaget på marken. Varje gång Rand viker, rycker Seanchan fram. Alla i Falme kan se striden i skyn.', dur: 2800, acts: [{cam: [1000, 420, 1700]}]},
    {say: 'Rand använder formen Heron Wading in the Rushes, som lämnar honom öppen. Ba\'alzamon sårar honom i sidan – ett sår som aldrig läker helt. Men Rand stöter sitt svärd i honom och vinner.', dur: 2600, acts: [{cam: [1000, 200, 900]}, {t: .45, show: ['wound']}]},
    {say: 'Seanchans förtrupp är krossad och utdriven ur Falme, och Bornhald har stupat. Hornet, dolken och Egwene är räddade. Alla har sett duellen i himlen, och shienarerna erkänner Rand som Dragon Reborn.', dur: 3000, acts: [{hide: ['fog', 'sky', 'skyLbl1', 'skyLbl2', 'wound'], cam: [1000, 625, 2000]}]}
   ]}
];
