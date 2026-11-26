const SH_ALL = ['s1', 's2', 's3', 's4', 's5', 's6'];
const SH_CLOSE = [['s1', [1000, 380]], ['s2', [1250, 480]], ['s3', [1300, 720]], ['s4', [1000, 830]], ['s5', [720, 720]], ['s6', [740, 470]]];
const RESC = ['trU', 'cairU', 'mayU', 'aielU', 'wiseU'];
const RESC_IN = [['trU', [900, 790]], ['cairU', [1180, 800]], ['mayU', [1250, 760]], ['aielU', [1400, 880]]];
const BASE = ['wagons', 'tower', 'young', 'chest', 'chestLbl', 'shield'];
const SCENES = [
  {k: 'Scen 1 · Kampanjkartan', t: 'Kidnappningen', d: 'Taisham 1000 NE · Lord of Chaos',
   init: [{map: 'campaign', cam: [1000, 625, 2000], clock: 'Taisham 1000 NE'}],
   beats: [
    {say: 'Elaida har skickat en ambassad från Vita tornet till Cairhien. Från staden leder vägen norrut mot Tar Valon, förbi Dumai\'s Wells. I nordost reser sig Kinslayer\'s Dagger.', acts: [{cam: [1000, 600, 1900]}]},
    {say: 'När Rand vägrar följa med till tornet tar systrarna honom till fånga. En sköld av saidar skär av honom från Källan, och han förs norrut inlåst i en kista. Under färden slås han och straffas.', dur: 3800, acts: [{cam: [700, 700, 1300], show: ['cWag', 'aWagons'], move: [['cWag', [620, 800], [810, 610], [940, 450]]]}]},
    {say: 'Ambassaden har avtalat med Shaido om eskort. Men Sevanna tänker ta Rand för egen räkning, och Shaido drar fram mot vagnarna.', dur: 3400, acts: [{hide: ['aWagons'], cam: [1300, 520, 1400], show: ['cSh', 'aShaido'], move: [['cSh', [1400, 520], [1120, 460]]]}]},
    {say: 'I Cairhien hittar Berelain Rands svärd och bälte och förstår vad som hänt. Perrin, Rhuarc, Sorilea och Dobraine samlar i hemlighet en räddningsstyrka. Vargar visar vägen, och nio systrar från Salidar ansluter motvilligt.', dur: 2600, acts: [{hide: ['aShaido'], cam: [520, 900, 900], show: ['swordFound', 'cRes']}]},
    {say: 'I tio dagar följer de vagnarna norrut. Den tionde dagen säger vargarna att de har hittat en stor samling människor.', dur: 4000, acts: [{hide: ['swordFound'], cam: [800, 700, 1500], show: ['aRescue'], move: [['cRes', [700, 860], [900, 720], [1030, 570]]]}]}
   ]},
  {k: 'Scen 2 · Dumai\'s Wells', t: 'Vid brunnarna', d: 'Taisham 11 · Lord of Chaos',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Taisham 11', show: [...BASE, ...SH_ALL]}],
   beats: [
    {say: 'Dumai\'s Wells: tre stenbrunnar i en svag sänka på den öppna slätten, och en liten dunge. Tornets vagnar står i en ring kring brunnarna, med kistan i mitten. Gawyns Younglings har placerats längst bak.', acts: [{cam: [1000, 600, 1500]}]},
    {say: 'Shaido omringar vagnarna och anfaller, både med spjut och med den Enda kraften. Deras visa kvinnor kanaliserar.', dur: 4000, acts: [{cam: [1000, 600, 1900], move: SH_CLOSE}, {t: .5, boom: [[860, 470], [1160, 470], [1160, 740], [860, 740], [1000, 430], [1000, 780]]}]}
   ]},
  {k: 'Scen 3 · Åsen', t: 'Perrins anfall', d: 'Taisham 11 · Lord of Chaos',
   init: [{map: 'battle', cam: [1150, 850, 1700], clock: 'Taisham 11', show: [...BASE, ...SH_ALL], move: SH_CLOSE}],
   beats: [
    {say: 'På åsen i söder ställer räddarna upp. De visa kvinnorna och Salidar-systrarna ska stanna här uppe.', dur: 2600, acts: [{show: RESC}]},
    {say: 'Först anfaller vargarna, omkring tusen.', dur: 3000, acts: [{show: ['wolves', 'aWolves'], move: [['wolves', [1150, 900], [1170, 830]]]}]},
    {say: 'Sedan rider Perrin ner i dalen, in i Shaidos rygg, med männen från Two Rivers, Dobraines cairhieniner, Rhuarcs Aiel och Winged Guards från Mayene.', dur: 4200, acts: [{hide: ['aWolves'], show: ['aCharge1', 'aCharge2', 'aCharge3'], move: RESC_IN}, {t: .7, boom: [[920, 820], [1180, 830], [1260, 790], [1380, 860]]}]},
    {say: 'Salidar-systrarna skulle hålla åsen, men de rusar i stället in i striden. Shaido är många, och räddarna håller på att bli överrända.', dur: 3400, acts: [{hide: ['aCharge1', 'aCharge2', 'aCharge3'], show: ['aSisters'], move: [['wiseU', [1040, 900], [1030, 840]], ['s4', [1000, 860]], ['s3', [1300, 780]], ['s5', [800, 780]]]}, {t: .5, bolt: [[920, 820], [1200, 820], [1050, 850]]}]}
   ]},
  {k: 'Scen 4 · Kistan', t: 'Rand bryter sig fri', d: 'Taisham 11 · Lord of Chaos',
   init: [{map: 'battle', cam: [1000, 560, 700], clock: 'Taisham 11', show: [...BASE, ...SH_ALL, ...RESC, 'wolves'], move: [...SH_CLOSE, ...RESC_IN, ['wolves', [1170, 830]], ['wiseU', [1030, 840]], ['s4', [1000, 860]], ['s3', [1300, 780]], ['s5', [800, 780]]]}],
   beats: [
    {say: 'I kistan känner Rand att fyra av systrarna som håller skölden knyter fast sina vävar för att försvara lägret. Lews Therins röst säger hur han ska göra.', dur: 2600, acts: [{show: ['randU']}]},
    {say: 'Rand löser upp skölden och spränger kistan med Luft. Tre av systrarna som höll skölden blir medvetslösa, döda eller stillade. Under resterna av kistan hittar han Min, oskadd.', dur: 2800, acts: [{boom: [[1000, 545], [990, 560], [1012, 550]]}, {t: .2, hide: ['chest', 'shield', 'chestLbl'], show: ['chestBroken']}]},
    {say: 'Sedan skärmar han av tornets systrar, en efter en, och slår dem medvetslösa. Eftersom han använder saidin kan de inte känna vad han gör.', dur: 2600, acts: [{cam: [1000, 600, 1000]}, {t: .5, hide: ['tower']}]}
   ]},
  {k: 'Scen 5 · Portarna', t: "Asha'man", d: 'Taisham 11 · Lord of Chaos',
   init: [{map: 'battle', cam: [1000, 600, 1900], clock: 'Taisham 11', show: ['wagons', 'young', 'chestBroken', 'randU', ...SH_ALL, ...RESC, 'wolves'], move: [...SH_CLOSE, ...RESC_IN, ['wolves', [1170, 830]], ['wiseU', [1030, 840]], ['s4', [1000, 860]], ['s3', [1300, 780]], ['s5', [800, 780]]]}],
   beats: [
    {say: 'Mitt i striden öppnas portar runt vagnarna. Omkring 200 Asha\'man kliver ut under Mazrim Taim. "Asha\'man, döda!"', dur: 3000, acts: [{show: ['gates']}, {t: .4, show: ['as1', 'as2', 'as3', 'as4']}]},
    {say: 'De bygger en kupol av Luft kring vagnarna och dödar sedan Shaido i tusental.', dur: 3600, acts: [{show: ['dome', 'domeLbl'], hide: ['gates']}, {t: .3, boom: [[1000, 380], [1250, 480], [1300, 720], [740, 470], [720, 720], [1000, 860], [1120, 420], [880, 800]]}, {t: .55, bolt: [[1000, 380], [1250, 480], [740, 470], [1300, 720]]}]},
    {say: 'Shaido bryts och flyr norrut, in i Kinslayer\'s Dagger.', dur: 4200, acts: [{show: ['aFlee1', 'aFlee2'], move: [['s1', [1500, 250], [1990, 40]], ['s2', [1600, 400], [1990, 200]], ['s3', [1600, 500], [1990, 280]], ['s6', [1000, 300], [1700, 100], [1990, 30]]]}, {t: .4, hide: ['s4', 's5']}, {t: .9, hide: ['s1', 's2', 's3', 's6', 'aFlee1', 'aFlee2']}]},
    {say: 'Gawyn erbjuder Min att följa med honom ut ur striden, men hon vägrar. Han samlar sina Younglings och hugger sig ut med några av systrarna. Galina förs bort av Shaido.', dur: 3800, acts: [{show: ['aGawyn'], move: [['young', [550, 520], [250, 420], [20, 360]]]}, {t: .9, hide: ['young', 'aGawyn']}]}
   ]},
  {k: 'Scen 6 · Efter slaget', t: 'Knäböj', d: 'Taisham 11 · Lord of Chaos',
   init: [{map: 'battle', cam: [1000, 650, 1300], clock: 'Taisham 11', show: ['wagons', 'chestBroken', 'randU', 'dome', ...RESC, 'wolves', 'as1', 'as2', 'as3', 'as4'], move: [...RESC_IN, ['wolves', [1170, 830]], ['wiseU', [1120, 640]]]}],
   beats: [
    {say: '"Knäböj och svär trohet till Lord Dragon, annars kommer ni att tvingas ner på knä", säger Taim. Salidar-systrarna knäböjer och svär Rand trohet.', dur: 2600, acts: [{hide: ['dome'], show: ['kneel', 'kneelLbl']}]},
    {say: 'Av tornets systrar tas 19 till fånga. Tre stillas och lämnas till de visa kvinnorna, tre har dödats och tolv har flytt. 151 Jungfrur har stupat, och Rand lär sig namnen på var och en av dem.', dur: 3000, acts: [{cam: [1000, 625, 2000]}]}
   ]}
];
