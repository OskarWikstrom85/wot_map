const TK_IN = [['t1', [500, 900], [820, 620]], ['t2', [1000, 1150], [1000, 1110]], ['t3', [1600, 900], [1320, 660]], ['t4', [1300, 200], [1060, 420]]];
const TK_AT = [['t1', [820, 620]], ['t2', [1000, 1110]], ['t3', [1320, 660]], ['t4', [1060, 420]]];
const SCENES = [
  {k: 'Scen 1 · Kampanjkartan', t: 'Inflygningen', d: 'Våren 1000 NE · The Gathering Storm',
   init: [{map: 'campaign', cam: [1000, 625, 2000], clock: 'Våren 1000 NE'}],
   beats: [
    {say: 'Tar Valon är belägrat av rebellernas här under Gareth Bryne. Inne i Vita tornet hålls Egwene, rebellernas Amyrlin, som fånge. Hon har degraderats till novis men vägrar böja sig, och allt fler systrar lyssnar på henne.', dur: 2600, acts: [{cam: [1550, 320, 900], show: ['cEg', 'cReb']}]},
    {say: 'Egwene har drömt att Seanchan ska anfalla tornet. Elaida avfärdar varningen.', dur: 2400, acts: [{show: ['dream', 'dreamLbl']}]},
    {say: 'Seanchan tror att Aes Sedai har ett fruktansvärt vapen. När samtalen med Rand har misslyckats godkänner Tuon anfallet. To\'raken flyger i etapper från Ebou Dar och vilar på avlägsna slätter för att inte upptäckas.', dur: 4800, acts: [{hide: ['dream', 'dreamLbl'], cam: [1000, 640, 2000], show: ['cFly', 'aFly', 'stops', 'stopLbl'], move: [['cFly', [520, 900], [800, 760], [1080, 560], [1350, 400], [1500, 350]]]}]},
    {say: 'Natten efter att Verin har avslöjat sig för Egwene och dött vaknar Egwene av anfallet.', dur: 2400, acts: [{hide: ['aFly', 'stopLbl'], clock: 'Natten', cam: [1550, 300, 800]}]}
   ]},
  {k: 'Scen 2 · Vita tornet', t: 'Anfall från tre håll', d: 'Natten · The Gathering Storm',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Natten', show: ['a1', 'a2', 'a3', 'nov']}],
   beats: [
    {say: 'Vita tornet ovanifrån: själva tornet med sina flyglar, trädgårdarna och torget framför huvudingången.', acts: [{cam: [1000, 625, 2000]}]},
    {say: 'To\'raken flyger in från flera håll. Damane på to\'rakens rygg spränger hål i tornets väggar högt upp, och soldater och damane tar sig in genom dem.', dur: 4400, acts: [{show: ['t1', 't2', 't3', 't4', 'aIn1', 'aIn2', 'aIn3'], move: TK_IN}, {t: .7, show: ['holes', 'breachLbl'], boom: [[1210, 470], [800, 400], [1120, 700], [900, 330]]}]},
    {say: 'To\'raken landar på taket och på torget framför huvudingången.', dur: 2600, acts: [{hide: ['aIn1', 'aIn2', 'aIn3'], show: ['g1', 'g2', 'g3']}]},
    {say: 'Falska rykten om trollocs och Myrddraal sprider panik. Ajaherna slåss först var för sig, tills Saerin Asnobar tar befälet.', dur: 2800, acts: [{show: ['panic', 'panicLbl']}, {t: .6, hide: ['panic', 'panicLbl'], move: [['a3', [1000, 900]]]}]}
   ]},
  {k: 'Scen 3 · Novisernas kvarter', t: 'Egwene slår tillbaka', d: 'Natten · The Gathering Storm',
   init: [{map: 'battle', cam: [800, 560, 1200], clock: 'Natten', show: ['a1', 'a2', 'a3', 'nov', 't1', 't2', 't3', 't4', 'g1', 'g2', 'g3', 'holes', 'breachLbl'], move: [...TK_AT, ['a3', [1000, 900]]]}],
   beats: [
    {say: 'Egwene är drogad med forkroot och kan bara kanalisera en strimma. Men hon samlar noviserna och lär dem länka sig i cirklar. En cirkel kan Seanchan inte skärma av.', dur: 2800, acts: [{show: ['circles']}]},
    {say: 'Hon lär dem hur man öppnar en port och tar sig, tillsammans med Adelorna från Gröna ajah, ner till förråden. Där hämtar de sa\'angreal. Egwene tar Voras sa\'angreal, en av de mäktigaste som Aes Sedai äger.', dur: 3600, acts: [{show: ['aStore'], move: [['nov', [720, 640], [790, 700]]]}]},
    {say: 'Hon frigör damane som tagit sig in i tornet. Sedan ställer hon sig i ett av hålen högt upp i väggen och skjuter ner to\'raken efter to\'raken.', dur: 4600, acts: [{hide: ['aStore'], show: ['aBreach'], cam: [1000, 560, 1500], move: [['nov', [1000, 600], [1190, 480]]]}, {t: .4, hide: ['circles'], show: ['vora', 'voraLbl'], bolt: [[820, 620], [1320, 660], [1060, 420], [1000, 1110]]}, {t: .65, hide: ['t1', 't3']}, {t: .85, hide: ['t4', 'g3']}]}
   ]},
  {k: 'Scen 4 · Utifrån', t: 'Bryne, Siuan och Gawyn', d: 'Natten · The Gathering Storm',
   init: [{map: 'battle', cam: [1250, 800, 1100], clock: 'Natten', show: ['a1', 'a2', 'a3', 'nov', 't2', 'g1', 'g2', 'holes', 'vora'], move: [['t2', [1000, 1110]], ['a3', [1000, 900]], ['nov', [1190, 480]]]}],
   beats: [
    {say: 'Gareth Bryne, Siuan och Gawyn har kommit från rebellernas läger för att hämta Egwene. De tar sig in på tornets område och skingrar Seanchanstyrkor.', dur: 3600, acts: [{show: ['gate', 'reb', 'aIn'], move: [['reb', [1400, 850], [1300, 800]]]}]},
    {say: 'En Bloodknife, en av Seanchans lönnmördare, ska just döda Siuan. Bryne dödar honom.', dur: 2600, acts: [{hide: ['aIn', 'gate'], show: ['bloodknife', 'bkLbl']}]}
   ]},
  {k: 'Scen 5 · Tornet', t: 'Reträtten', d: 'Gryningen · The Gathering Storm',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Mot gryningen', show: ['a1', 'a2', 'a3', 'nov', 't2', 'g1', 'g2', 'holes', 'vora', 'reb'], move: [['t2', [1000, 1110]], ['a3', [1000, 900]], ['nov', [1190, 480]], ['reb', [1300, 800]]]}],
   beats: [
    {say: 'När omkring en tredjedel av anfallsstyrkan har förintats drar sig Seanchan tillbaka. Fångar vinschas upp från taket till väntande to\'raken. Från sitt rum förs Elaida bort.', dur: 4200, acts: [{show: ['captives', 'aOut', 't4'], move: [['t4', [1000, 420]]]}, {t: .4, hide: ['g1', 'g2'], move: [['t4', [1300, 250], [1700, 60], [2000, -40]], ['t2', [1300, 600], [2000, -40]]]}, {t: .9, hide: ['t2', 't4']}]},
    {say: 'Egwene har tömt sina krafter. I förvirringen bärs hon, mot sin vilja, ut ur tornet av Siuans grupp.', dur: 3600, acts: [{hide: ['vora', 'aOut'], show: ['aEgOut'], move: [['nov', [1300, 820]], ['reb', [1450, 880], [1500, 900]]]}, {t: .5, move: [['nov', [1450, 880], [1500, 900]]]}]},
    {say: 'Över 30 to\'raken har förstörts och 10 damane frigjorts. Tornet har förlorat 20 systrar och 3 noviser, och nästan 40 kvinnor har förts bort, bland dem Elaida.', dur: 2800, acts: [{hide: ['aEgOut'], cam: [1000, 625, 2000]}]},
    {say: 'Tornets Hall erkänner Egwene som Amyrlin, och Aes Sedai enas igen. Med Verins böcker kan hon avslöja och avrätta större delen av Black Ajah.', dur: 2600, acts: [{clock: 'Efteråt', cam: [1000, 560, 1000]}]}
   ]}
];
