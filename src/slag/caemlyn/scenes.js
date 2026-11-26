const AR = ['arS', 'arN', 'arW', 'arE'], GU = ['gN', 'gS', 'gW', 'gE'];
const SCENES = [
  {k: 'Scen 1 · Kampanjkartan', t: 'Kampen om Lejontronen', d: 'Våren 1000 NE · Knife of Dreams',
   init: [{map: 'campaign', cam: [1000, 625, 2000], clock: 'Våren 1000 NE'}],
   beats: [
    {say: 'Efter Morgases försvinnande har Elayne gjort anspråk på Lejontronen. Arymilla Marne och hennes allierade, bland dem Naean och Elenia, belägrar Caemlyn.', dur: 2600, acts: [{cam: [900, 640, 1100], show: ['cEl', 'cAry']}]},
    {say: 'Elayne har färre soldater, men hon har Kinswomen som kan öppna portar, Sea Folks Windfinders och legosoldater. Kinswomen hittar Charlz Guybon och hans 10 000 man och för in dem i staden.', dur: 4000, acts: [{cam: [700, 500, 1300], show: ['cGuy', 'aGuybon'], move: [['cGuy', [600, 460], [830, 590]]]}]},
    {say: 'En här på 200 000 man från Gränslanden och en fristående andoransk styrka på 60 000 närmar sig. Arymilla bestämmer sig för att storma staden inom en vecka.', dur: 4400, acts: [{hide: ['aGuybon', 'cGuy'], cam: [1000, 625, 2000], show: ['cBorder', 'cHouses', 'aBorder', 'aHouses'], move: [['cBorder', [1700, 300], [1400, 390]], ['cHouses', [300, 900], [560, 810]]]}]}
   ]},
  {k: 'Scen 2 · Caemlyn', t: 'Belägringen', d: 'Våren 1000 NE · Knife of Dreams',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Belägringen', show: [...AR, ...GU]}],
   beats: [
    {say: 'Caemlyn: New City innanför den yttre muren, och i mitten Inner City, byggd av Ogier, med palatset. Arymillas läger omger staden.', acts: [{cam: [1000, 625, 2000]}]},
    {say: 'Med portar möter Elaynes trupper varje anfall där det kommer, trots att de är underlägsna.', dur: 3600, acts: [{show: ['gates']}, {t: .3, move: [['gW', [700, 330]], ['gE', [1300, 360]]]}, {t: .8, hide: ['gates'], move: [['gW', [620, 600]], ['gE', [1380, 600]]]}]},
    {say: 'Elayne misstänker att någon i hennes närhet är förrädare. Det är kapten Doilin Mellar, och nu har han spårats till ett hus på Full Moon Street.', dur: 2400, acts: [{cam: [1200, 520, 900], show: ['fullMoon']}]}
   ]},
  {k: 'Scen 3 · Full Moon Street', t: 'Fällan', d: 'Stormningens dag · Knife of Dreams',
   init: [{map: 'battle', cam: [1150, 600, 1100], clock: 'Morgonen', show: [...AR, ...GU, 'fullMoon']}],
   beats: [
    {say: 'Elayne går själv, med bara tre Aes Sedai, för att gripa Mellar.', dur: 3200, acts: [{show: ['elayne', 'aToFull'], move: [['elayne', [1150, 520], [1240, 480]]]}]},
    {say: 'Det är en fälla. Careane avslöjas som Black Ajah och dödas av Vandene, men de andra systrarna mördas. Elayne skärmas av, binds och förs bort i en vagn.', dur: 4200, acts: [{hide: ['aToFull'], show: ['blood']}, {t: .4, show: ['aAway', 'wagon', 'wagonLbl'], move: [['elayne', [1320, 800], [1290, 1150]]]}, {t: .9, hide: ['elayne']}]}
   ]},
  {k: 'Scen 4 · Murarna', t: 'Stormningen', d: 'Samma dag · Knife of Dreams',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Samma dag', show: [...AR, ...GU, 'wagon', 'wagonLbl', 'blood', 'fullMoon']}],
   beats: [
    {say: 'Arymilla tömmer sina läger för en stormning. Hon anfaller norra muren, och över 20 000 man samlas utanför Far Madding Gate.', dur: 4000, acts: [{show: ['aNorth', 'aSouth', 'clashN'], move: [['arN', [1000, 100]], ['arS', [1000, 1130]], ['arW', [520, 900], [800, 1150]], ['arE', [1480, 900], [1180, 1170]]]}]},
    {say: 'Inne i staden byter legosoldater sida och försöker öppna porten. Dyelin håller Far Madding Gate.', dur: 2800, acts: [{cam: [1000, 1000, 900], show: ['merc', 'clashS']}]},
    {say: 'Birgitte känner genom bandet vad som har hänt. Hon får Windfinders att hjälpa till. Genom en port tar de sig till vagnen, där Windfinders snabbt besegrar de svarta systrarna. Elayne är fri.', dur: 3600, acts: [{cam: [1300, 1100, 900], show: ['rescue'], move: [['rescue', [1300, 1160]]]}, {t: .5, hide: ['wagon', 'wagonLbl']}, {t: .6, show: ['elayne'], move: [['elayne', [1290, 1130]]]}]}
   ]},
  {k: 'Scen 5 · Far Madding Gate', t: 'Slaget i ryggen', d: 'Samma dag · Knife of Dreams',
   init: [{map: 'battle', cam: [1050, 1050, 1100], clock: 'Samma dag', show: [...AR, ...GU, 'merc', 'clashS', 'rescue', 'elayne'], move: [['arS', [1000, 1130]], ['arW', [800, 1150]], ['arE', [1180, 1170]], ['rescue', [1300, 1160]], ['elayne', [1290, 1130]]]}],
   beats: [
    {say: 'I stället för att gå tillbaka in i staden bestämmer Elayne sig för att anfalla. Windfinders öppnar en port nära Far Madding Gate, där Arymilla själv väntar på att rida in i Caemlyn.', dur: 2800, acts: [{show: ['windGate'], move: [['rescue', [1210, 1140]]]}]},
    {say: 'Rytteriet sätter in en chock mot hären vid porten, som står så tätt att den inte kan manövrera. Porten öppnas, och fler av Elaynes styrkor anfaller inifrån staden.', dur: 4200, acts: [{show: ['aRear', 'aSally'], move: [['rescue', [1120, 1140], [1060, 1120]], ['gS', [1000, 1060]]]}, {t: .4, boom: [[1040, 1120], [1000, 1130], [960, 1140]]}, {t: .7, hide: ['merc', 'arE']}]},
    {say: 'Arymilla och de flesta av hennes allierade tas till fånga.', dur: 2400, acts: [{hide: ['aRear', 'aSally', 'clashS', 'windGate'], cam: [1000, 900, 1400]}, {t: .4, hide: ['arS', 'arW']}]}
   ]},
  {k: 'Scen 6 · Palatset', t: 'Drottningen av Andor', d: 'Våren 1000 NE · Knife of Dreams',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Efteråt', show: [...GU, 'arN', 'clashN']}],
   beats: [
    {say: 'Norra muren hålls, och Arymillas här ger upp. Förlusterna har varit stora.', dur: 2600, acts: [{hide: ['clashN']}, {t: .4, hide: ['arN']}]},
    {say: 'Nio hus ställer sig bakom Elayne, och hon utropas till drottning av Andor. Med Gränslandets här som påtryckning ansluter sig sedan de flesta oberoende husen.', dur: 3000, acts: [{cam: [1000, 600, 900], show: ['crown']}]}
   ]}
];
