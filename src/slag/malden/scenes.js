const PERR = ['pTR', 'pL', 'pR', 'chan'];
const SCENES = [
  {k: 'Scen 1 · Kampanjkartan', t: 'Shaido i Malden', d: 'Vintern och våren 1000 NE · Knife of Dreams',
   init: [{map: 'campaign', cam: [1000, 625, 2000], clock: 'Våren 1000 NE'}],
   beats: [
    {say: 'Efter Dumai\'s Wells spreds Shaido över landet genom portar som Sammael gav dem. Sevannas del av klanen tog den altaranska staden Malden. Till våren hade över 100 000 människor samlats där.', dur: 2600, acts: [{cam: [900, 640, 1100], show: ['cShaido']}]},
    {say: 'Under förhandlingarna med profeten Masema hade Shaido rövat bort Faile, Maighdin och flera andra. Nu är de gai\'shain i Malden.', dur: 3600, acts: [{show: ['cFaile', 'aKidnap'], move: [['cFaile', [1500, 760], [1000, 660]]]}]},
    {say: 'Perrin har följt efter dem i månader. Seanchan i Ebou Dar vill också få bort Shaido och skickar Banner-General Tylee Khirgan. Perrin och Tylee sluter förbund.', dur: 4200, acts: [{hide: ['aKidnap'], cam: [1000, 640, 2000], show: ['cPerrin', 'cSean', 'aPerrin', 'aSean'], move: [['cPerrin', [1500, 100], [1300, 260]], ['cSean', [480, 1150], [540, 1060]]]}]},
    {say: 'Villkoren: Seanchan får ta Shaidos visa kvinnor som damane, gai\'shain släpps fria, och Seanchan lovar att inte koppla Perrins egna kanaliserare.', dur: 2400, acts: [{hide: ['aPerrin', 'aSean']}]},
    {say: 'Med hjälp av ett brev från Suroth får de ut all forkroot från en manufaktur. Drogen ska hällas i Maldens akvedukt, så att Shaidos visa kvinnor inte kan kanalisera.', dur: 3000, acts: [{cam: [1400, 400, 1100], show: ['aFork']}]}
   ]},
  {k: 'Scen 2 · Malden', t: 'Akvedukten', d: 'Natten före slaget · Knife of Dreams',
   init: [{map: 'battle', cam: [1000, 625, 2000], clock: 'Natten', show: ['sW', 'sE', 'sF', 'faile']}],
   beats: [
    {say: 'Malden är en stad med murar, som får sitt vatten genom en akvedukt från bergen. Shaidos läger ligger på båda sidor om staden. I norr reser sig en ås.', acts: [{cam: [1000, 625, 2000]}]},
    {say: 'Forkroot hälls i akvedukten. En liten styrka tar sig in i Malden genom akvedukten för att hjälpa fångarna.', dur: 4000, acts: [{cam: [800, 400, 1300], show: ['fork', 'forkLbl', 'infil', 'aInfil'], move: [['infil', [700, 300], [880, 520], [980, 700]]]}]},
    {say: 'Inne i staden planerar Faile och hennes följe att fly med hjälp av Galina, en svart syster som är Theravas slav. Men Galina tar Oath Rod och sviker dem, och de blir instängda i en källare.', dur: 2800, acts: [{hide: ['aInfil'], cam: [1040, 790, 700], show: ['cellar', 'cellarLbl'], move: [['faile', [B.cellar[0], B.cellar[1]]]]}]}
   ]},
  {k: 'Scen 3 · Åsen', t: 'Ur dimman', d: 'Slagets dag · Knife of Dreams',
   init: [{map: 'battle', cam: [1000, 500, 2000], clock: 'Morgonen', show: ['sW', 'sE', 'sF', 'faile', 'cellar', 'fork', 'infil'], move: [['infil', [980, 700]], ['faile', [B.cellar[0], B.cellar[1]]]]}],
   beats: [
    {say: 'Tam al\'Thor kommer genom en port med Two Rivers bågskyttar. En vägg av dimma täcker Perrins här på åsen.', dur: 2600, acts: [{show: ['fog', 'fogLbl', ...PERR]}]},
    {say: 'Perrins här kommer fram ur dimman och lockar ut Shaidos krigare ur lägren, uppför sluttningen.', dur: 4200, acts: [{hide: ['fogLbl'], show: ['aOut1', 'aOut2'], move: [['sW', [700, 500], [720, 430]], ['sE', [1250, 500], [1200, 440]]]}, {t: .6, hide: ['fog']}]},
    {say: 'Bågskyttarna skjuter salva efter salva, och Perrins kanaliserare slår ner Shaido. Forkroot har gjort att de flesta av Shaidos visa kvinnor inte kan kanalisera.', dur: 3600, acts: [{hide: ['aOut1', 'aOut2'], show: ['clash'], boom: [[700, 430], [740, 470], [1200, 440], [1250, 470], [1000, 420]]}, {t: .45, boom: [[690, 450], [1180, 460], [760, 500], [1230, 500]]}]},
    {say: 'Shaido skickar en styrka för att gå runt Perrins flank. Då anfaller Seanchan den bakifrån och från sidan. En del förintas, resten ger upp.', dur: 4400, acts: [{cam: [1600, 500, 1300], show: ['aFlank', 'sean1', 'sean2', 'aSean', 'aSean2'], move: [['sF', [1750, 550], [1720, 450]], ['sean1', [1880, 420], [1780, 440]], ['sean2', [1900, 650], [1800, 560]]]}, {t: .6, boom: [[1720, 450], [1760, 500]]}, {t: .85, hide: ['sF', 'aFlank', 'aSean', 'aSean2']}]}
   ]},
  {k: 'Scen 4 · Staden', t: 'Faile befrias', d: 'Slagets dag · Knife of Dreams',
   init: [{map: 'battle', cam: [1000, 600, 1600], clock: 'Eftermiddagen', show: ['sW', 'sE', 'faile', 'cellar', 'cellarLbl', 'infil', ...PERR, 'sean1', 'sean2', 'clash'], move: [['infil', [980, 700]], ['faile', [B.cellar[0], B.cellar[1]]], ['sW', [720, 430]], ['sE', [1200, 440]], ['sean1', [1780, 440]], ['sean2', [1800, 560]]]}],
   beats: [
    {say: 'Perrin rider ner i staden för att hämta Faile. Aram, som Masema har vänt mot honom, försöker döda honom – men träffas själv av en pil från Shaido.', dur: 4000, acts: [{show: ['aSortie'], move: [['pTR', [1030, 500], [1030, 690]]]}]},
    {say: 'Rolan och hans vänner, Shaido som har skyddat Faile, har hjälpt henne och de andra ut ur källaren. Perrin vet inte vem Rolan är och dödar honom. Faile och hennes följe är fria.', dur: 3000, acts: [{hide: ['aSortie', 'cellar', 'cellarLbl'], cam: [1040, 760, 700], show: ['freed']}]},
    {say: 'Tylee meddelar att Shaido ger upp. Seanchan tar de visa kvinnorna som damane. Bara några hundra Shaido flyr med Therava tillbaka mot ödemarken, och de har Galina med sig som slav.', dur: 3600, acts: [{hide: ['freed', 'clash'], cam: [1300, 800, 1700], show: ['aTherava']}, {t: .2, hide: ['sW', 'sE']}]},
    {say: 'Shaido är inte längre ett hot i Westlands, och profetens Dragonsworn har förlorat nästan hela sin styrka. Perrin och Faile är återförenade, och Perrin står nu i spetsen för en stor här.', dur: 3000, acts: [{hide: ['aTherava'], cam: [1000, 625, 2000]}]}
   ]}
];
