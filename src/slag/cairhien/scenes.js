// Gemensamma lägen som scenerna börjar från
const SH_ALL = ['sH1', 'sH2', 'sH3', 'sH4', 'sH5', 'sGate'];
const CL_ENGAGED = [['cl1', [1430, 390]], ['cl2', [1300, 620]], ['cl3', [1430, 860]]];
const BASE = ['tower', 'towerLbl', 'cmdTent', 'ctLbl'];
const SCENES = [
  {k: 'Scen 1 · Kampanjkartan', t: 'Shaido vid Cairhien', d: 'Choren 999 NE · The Fires of Heaven, kapitel 30–42',
   init: [{map: 'campaign', cam: [1100, 640, 2000], clock: 'Choren 999 NE'}],
   beats: [
    {say: "Cairhien ligger på Alguenyas östra strand, strax söder om där floden Gaelin rinner ut. Vägen österut leder längs Gaelin mot Eianrod och bergspasset Jangai. Couladin, som utger sig för att vara Car'a'carn, har fört Shaido över Dragonwall.", acts: [{cam: [1150, 600, 1900]}]},
    {say: 'Shaido omringar staden och bränner förstaden Foregate. Men staden faller inte: tairener som Rand skickat dit håller portarna stängda.', dur: 2600, acts: [{cam: [900, 640, 1100], show: ['shN', 'shE', 'shS', 'foregateFire', 'fgLbl', 'cityT']}]},
    {say: 'Choren 1: en grupp tairener under Estean bryter sig ut ur staden och rider österut för att be Rand om hjälp. De cairhieniska lorderna i följet svär honom trohet.', dur: 3400, acts: [{clock: 'Choren 1', cam: [1300, 600, 1600], show: ['estean', 'aEstean'], move: [['estean', [1100, 610], [1450, 565], [1780, 520]]]}]},
    {say: 'Rand marscherar västerut längs vägen med de klaner som följer honom. I närheten väntar klaner som ännu inte bestämt sig för vem de ska följa.', dur: 3800, acts: [{cam: [1300, 640, 1900], hide: ['estean', 'aEstean'], show: ['randA', 'clanA', 'clanB', 'aRand', 'und1', 'und2'], move: [['randA', [1700, 540], [1150, 610]], ['clanA', [1700, 505], [1180, 575]], ['clanB', [1700, 575], [1180, 650]]]}]},
    {say: 'Choren 9: Rands Aiel slår läger bland kullarna öster om staden. I morgon ska belägringen brytas.', dur: 2600, acts: [{clock: 'Choren 9', cam: [1000, 640, 460], hide: ['aRand']}]}
   ]},
  {k: 'Scen 2 · Slagfältet', t: 'Planen', d: 'Choren 9 · The Fires of Heaven, kapitel 41–42',
   init: [{map: 'battle', cam: [1000, 640, 650], clock: 'Choren 9', show: [...BASE, ...SH_ALL, 'cl1', 'cl2', 'cl3']}],
   beats: [
    {say: 'Kullarna öster om Cairhien. I väster staden med sina murar och Topless Towers, omgiven av den nedbrända förstaden. Shaido har gömt sig bland kullarna och dungarna runt staden.', acts: [{cam: [1000, 640, 2000]}]},
    {say: 'Rand har låtit bygga ett utsiktstorn av timmer på en kulle. Därifrån följer han Shaido genom en kikare, och Egwene ska strida från samma torn, där hon ser tillräckligt för att väva blixtar.', dur: 2200, acts: [{cam: [960, 480, 1100], show: ['randT']}]},
    {say: 'Mat har tänkt ge sig av före slaget. I stället hamnar han i stabstältet med kartorna framför sig. När Lan frågar vad han tror, löser han problemet nästan utan att tänka – med minnena från andra mäns liv. Rand önskar honom lycka till på resan och skäms över att ha utnyttjat honom.', dur: 3000, acts: [{cam: [1250, 720, 1500], show: ['matU', 'mapPlan'], move: [['matU', [1740, 615]]]}]}
   ]},
  {k: 'Scen 3 · Slaget börjar', t: 'Åskan', d: 'Choren 10 · The Fires of Heaven, kapitel 43',
   init: [{map: 'battle', cam: [1100, 620, 2000], clock: 'Choren 10', show: [...BASE, ...SH_ALL, 'cl1', 'cl2', 'cl3', 'randT'], move: [['randT', [B.tower[0] + 46, B.tower[1] + 6]]]}],
   beats: [
    {say: 'I gryningen går klanerna till anfall mot Shaido bland kullarna.', dur: 3800, acts: [{show: ['aClan1', 'aClan2', 'aClan3'], move: CL_ENGAGED}]},
    {say: 'Rand vill ner i striden, men Jungfrurna omringar honom och tvingar honom upp i tornet hos Egwene. Aviendha följer med. Lan anklagar honom för att ha tänkt slåss mot Couladin själv.', dur: 2000, acts: [{hide: ['aClan1', 'aClan2', 'aClan3'], cam: [960, 470, 1000], show: ['maid']}]},
    {say: 'Egwene och Aviendha kanaliserar. Åskmoln tornar upp sig över Cairhien ur en klar himmel, och blixtar slår ner gång på gång där Shaido gömmer sig.', dur: 3800, acts: [{cam: [1050, 600, 1900], show: ['clouds'], bolt: [[700, 380], [1120, 540], [900, 760], [1350, 330], [1330, 850], [760, 420], [1150, 600], [940, 720], [1300, 300], [1360, 880]]}]},
    {say: 'Rand griper saidin, sätter eld på en kulle och smälter den till glas. Lews Therins närvaro väller upp, och han håller nästan på att tappa kontrollen.', dur: 2400, acts: [{cam: [1080, 620, 1200], bolt: [[1180, 700], [1170, 690], [1190, 710]]}, {t: .3, show: ['glass', 'glassLbl']}]}
   ]},
  {k: 'Scen 4 · Söder om slaget', t: 'Mats ritt', d: 'Choren 10 · The Fires of Heaven, kapitel 43',
   init: [{map: 'battle', cam: [950, 820, 1500], clock: 'Choren 10', show: [...BASE, ...SH_ALL, 'cl1', 'cl2', 'cl3', 'randT', 'maid', 'clouds', 'glass', 'glassLbl', 'matU'], move: [...CL_ENGAGED, ['matU', [1180, 640]]]}],
   beats: [
    {say: 'Mat rider söderut för att komma bort från slaget och tar skydd i en dunge. Då närmar sig tusen Aiel söderifrån.', dur: 3200, acts: [{show: ['aMatS', 's1000', 'a1000'], move: [['matU', [1220, 760], [1160, 960]], ['s1000', [1210, 1040]]]}]},
    {say: 'Mat tvingas västerut. Från en hög kulle ser han ett bakhåll från Shaido i nästa dal – riktat mot en kolonn tairener och cairhieniner, som Aiel inte kunde ha sett.', dur: 3000, acts: [{hide: ['aMatS', 'a1000'], show: ['aMatW', 'pike', 'tH', 'cH', 'sAmb1', 'sAmb2', 'ambushMark', 'ambLbl'], move: [['matU', [980, 930], [810, 890]]]}]},
    {say: 'Han rider ner och varnar dem. Tairenernas rytteri leds av Melanril och de cairhieniska pikenerarna av Daerid. Talmanes leder det cairhieniska rytteriet.', dur: 2400, acts: [{hide: ['aMatW'], show: ['aMatDown'], cam: [640, 960, 1000], move: [['matU', [700, 960], [640, 985]]]}]},
    {say: 'Mat ställer pikenerarna i en ihålig fyrkant – en "igelkott" – med tairenerna inuti. Han och Talmanes leder var sin halva av rytteriet över krönet från norr och söder, och Shaido hamnar mellan dem. Melanril stupar.', dur: 4000, acts: [{hide: ['aMatDown', 'ambushMark', 'ambLbl'], show: ['aCavN', 'aCavS'], move: [['cH', [500, 870], [470, 900]], ['matU', [730, 1090], [740, 1070]]]}, {t: .55, hide: ['sAmb1', 'sAmb2']}, {t: .7, hide: ['aCavN', 'aCavS']}]}
   ]},
  {k: 'Scen 5 · Vid tornet', t: 'Tornet faller', d: 'Choren 10 · The Fires of Heaven, kapitel 44',
   init: [{map: 'battle', cam: [820, 500, 1500], clock: 'Choren 10', show: [...BASE, ...SH_ALL, 'cl1', 'cl2', 'cl3', 'randT', 'maid', 'clouds', 'glass', 'glassLbl'], move: CL_ENGAGED}],
   beats: [
    {say: 'Shaido försöker forcera stadsportarna. Rand slår till med en blixt som träffar både Shaido och försvararna.', dur: 3000, acts: [{show: ['aGate', 'gateFight'], move: [['sGate', [520, 595]]]}, {t: .6, bolt: [[500, 600], [520, 580]]}]},
    {say: 'Plötsligt slår blixtar ner bland Jungfrurna vid tornets fot. Rand känner att de är vävda med saidin. Först tror han att det är Asmodean, men han följer vävningen västerut och förstår: det är Sammael.', dur: 2800, acts: [{hide: ['aGate'], cam: [700, 420, 1500], bolt: [[B.tower[0] - 20, B.tower[1] + 50], [B.tower[0] + 20, B.tower[1] + 56]]}, {t: .4, show: ['sammael']}]},
    {say: 'Tornet rasar. Rand skyddar Egwene och Aviendha, förlorar medvetandet och vaknar sårad. Döda och sårade Jungfrur ligger överallt, bland dem Jolien.', dur: 2400, acts: [{cam: [920, 450, 900], bolt: [[B.tower[0], B.tower[1]]]}, {t: .25, hide: ['tower', 'towerLbl', 'maid'], show: ['towerRuin']}]},
    {say: 'Klanhövdingen Han rapporterar att de klaner som inte valt sida rör sig tillsammans, och att han gått med Dhearic och Erim för att stoppa dem. Ingen kommer att hindra Shaido från att dra sig tillbaka norrut. Rand rider med Egwene och Aviendha till en plats där han kan se staden.', dur: 3200, acts: [{hide: ['sammael'], cam: [900, 520, 1600], move: [['randT', [900, 520], [820, 560]]]}]}
   ]},
  {k: 'Scen 6 · Mats kulle', t: 'Fällan för Couladin', d: 'Choren 10 · The Fires of Heaven, kapitel 44–45',
   init: [{map: 'battle', cam: [900, 780, 1300], clock: 'Choren 10', show: ['towerRuin', 'cmdTent', 'ctLbl', 'sH1', 'sH2', 'sH4', 'cl1', 'cl2', 'cl3', 'clouds', 'glass', 'glassLbl', 'pike', 'matU', 'nal', 'tal'],
     move: [...CL_ENGAGED, ['pike', B.matHill], ['matU', [1000, 750]]]}],
   beats: [
    {say: 'Mat står på en kulle i regnet med omkring 3 000 man som fortfarande följer honom. Nalesean rapporterar att närmare 5 000 Aiel närmar sig, troligen utan att veta att de står där. Daerid ser att Couladin själv leder dem. Talmanes uppskattar tiden till en halvtimme.', dur: 3200, acts: [{show: ['coul', 'aCoul'], move: [['coul', [560, 740], [700, 760]]]}]},
    {say: 'Mat skickar Naleseans tairener runt norrut för att anfalla bakifrån, och Talmanes cairhieniner runt söderut. Själv stannar han med fotfolket.', dur: 3600, acts: [{hide: ['aCoul'], show: ['aNal', 'aTal'], move: [['nal', [820, 620], [640, 660], [600, 700]], ['tal', [820, 940], [640, 850], [610, 790]]]}]},
    {say: 'Fotfolket låtsas retirera in i luckan mellan två kullar. Aiel följer efter – rakt in i fällan. Mat håller sina män bakom pikarna.', dur: 3600, acts: [{hide: ['aNal', 'aTal'], show: ['aFeint', 'gapMark', 'gapLbl'], move: [['pike', [1100, 810], [1190, 820]], ['matU', [1180, 800]], ['coul', [900, 790], [1080, 810]]]}]},
    {say: 'Tairenerna och cairhieninerna sluter tången bakifrån. Mat tar sig genom pikenerarna fram till Couladin och dödar honom i envig.', dur: 3400, acts: [{hide: ['aFeint', 'gapLbl'], move: [['nal', [800, 730], [980, 770]], ['tal', [800, 850], [990, 850]]]}, {t: .5, show: ['duel']}, {t: .8, hide: ['coul']}]}
   ]},
  {k: 'Scen 7 · Efter stormen', t: 'Shaido flyr', d: 'Choren 10–11 · The Fires of Heaven, kapitel 44–45',
   init: [{map: 'battle', cam: [1000, 620, 2000], clock: 'Choren 10', show: ['towerRuin', 'cmdTent', 'ctLbl', 'sH1', 'sH2', 'sH3', 'sH4', 'sH5', 'sGate', 'cl1', 'cl2', 'cl3', 'glass', 'glassLbl', 'pike', 'matU', 'nal', 'tal', 'randT', 'healCamp', 'healLbl', 'heal'],
     move: [...CL_ENGAGED, ['pike', [1190, 820]], ['matU', [1180, 800]], ['nal', [980, 770]], ['tal', [990, 850]], ['randT', [820, 560]], ['sGate', [520, 595]]]}],
   beats: [
    {say: 'Shaido flyr norrut i tiotusental. De tar cairhieniska fångar med sig och bränner broarna över Gaelin bakom sig.', dur: 4400, acts: [{show: ['aFlee1', 'aFlee2', 'aFlee3'], move: [['sH1', [500, 260], [290, 180], [270, 30]], ['sH2', [950, 350], [830, 180], [840, 30]], ['sGate', [520, 700], [560, 420], [300, 190], [270, 30]]]}, {t: .6, show: ['bridgesBurn']}, {t: .9, hide: ['sH1', 'sH2', 'sGate', 'aFlee1', 'aFlee2', 'aFlee3']}]},
    {say: 'Rand stannar på ett krön, tömd och med värk i hela kroppen. Han minns knappt sitt eget namn. Jungfrurna leder hans häst till läkarlägret, där Moiraine helar de sårade. Lan säger att slaget är vunnet och att klanerna kommer till honom. Rand faller ur sadeln.', dur: 3400, acts: [{cam: [1300, 560, 1300], move: [['randT', [1100, 560], [B.heal[0] - 60, B.heal[1]]]]}]},
    {say: 'Choren 11. Shaido som inte hann fly har tagits till fånga. Talmanes och Nalesean svär Mat trohet som sin anförare och bestämmer att han behöver en fana. Snart kallar de sig Band of the Red Hand, efter Manetherens sista försvarare.', dur: 3200, acts: [{clock: 'Choren 11', cam: [1200, 780, 1400], hide: ['pike', 'nal', 'tal', 'matU', 'sH3', 'sH4', 'sH5'], show: ['band', 'pris'], move: [['band', [1060, 800]]]}]},
    {say: 'Rand vaknar i sitt tält, helad av Moiraine. Aviendha skäller på honom för att han nästan dött. Han får veta att Shaido kommit undan i tiotusental.', dur: 2000, acts: [{cam: [1450, 600, 1000]}]}
   ]},
  {k: 'Scen 8 · Staden', t: 'Draken i Cairhien', d: 'Choren 11 · The Fires of Heaven, kapitel 46',
   init: [{map: 'battle', cam: [1200, 700, 1800], clock: 'Choren 11', show: ['towerRuin', 'cmdTent', 'ctLbl', 'cl1', 'cl2', 'cl3', 'glass', 'glassLbl', 'band', 'pris', 'healCamp', 'healLbl', 'heal', 'bridgesBurn'], move: [...CL_ENGAGED, ['band', [1060, 800]]]}],
   beats: [
    {say: 'Tjugotusen Shaido har tagits till fånga. Bland Rands Aiel har några börjat bära röda pannband med en svartvit skiva, det gamla Aes Sedai-tecknet från Rands fana.', dur: 2200, acts: [{cam: [1550, 900, 1200]}]},
    {say: 'Trots Aviendhas protester rider Rand in i staden.', dur: 5200, acts: [{cam: [900, 600, 2000], show: ['proc', 'aRandIn'], move: [['proc', [1300, 610], [900, 595], [490, 600], [330, 590]]]}]},
    {say: 'Vid palatsportarna använder han Moiraines lektioner i Daes Dae\'mar för att få de tairenska lorderna ur balans. Han avböjer Cairhiens tron, ställer upp de cairhieniska och tairenska adelsmännen efter rang – och låter dem svära honom trohet.', dur: 2600, acts: [{hide: ['aRandIn'], cam: [300, 600, 800]}]}
   ]}
];
