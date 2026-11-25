"""Granskningen nov 2026, del 2: karaktärer (godkända av Oskar).
- titel, ingress och om visar bara det man vet när karaktären dyker upp; senare titlar ligger i titel_senare
  och senare fakta flyttas till händelserna, som redan döljs efter vald bok.
- relationstexter beskriver alltid den andra personen ("Namn – text"), och varje relation får 'bok'
  (då texten stämmer) och ev. 'fore' (texter som visas innan dess)."""
import json, pathlib
root = pathlib.Path(__file__).resolve().parents[2]
p = root / 'data/characters.json'; C = json.load(open(p)); K = {c['id']: c for c in C}

def ev(cid, i, **kw):
    h = K[cid]['handelser'][i]
    for k, v in kw.items():
        if v is None: h.pop(k, None)
        else: h[k] = v
def add(cid, bok, text, plats=None, slag=None):
    h = {'bok': bok, 'text': text}
    if plats: h['plats'] = plats
    if slag: h['slag'] = slag
    K[cid]['handelser'].append(h)
def swap(cid, i, j):
    H = K[cid]['handelser']; H[i], H[j] = H[j], H[i]
def bas(cid, titel=None, ingress=None, om=None, senare=None, forsta=None):
    c = K[cid]
    if titel: c['titel'] = titel
    if ingress: c['ingress'] = ingress
    if om: c['om'] = om
    if senare: c['titel_senare'] = [{'bok': b, 'text': t} for b, t in senare]
    if forsta is not None: c['forsta_bok'] = forsta

# ---------- händelser: faktafel ----------
ev('rand', 1, text="Trollocs anfaller Emond's Field på Winternight och han flyr med Moiraine. Vid Eye of the World dödar han den förlorade Aginor med den Enda kraften och besegrar Ba'alzamon.")
ev('egwene', 3, plats='chaendaer', text="Studerar drömvandring hos Aiels visa kvinnor i Aiels ödemark.")
ev('mat', 5, text="Spränger ett hål i Stenen i Tears mur med Aludras fyrverkerier och befriar Egwene, Nynaeve och Elayne.")
ev('mat', 11, bok=12)
ev('perrin', 2, text="I Remen befriar han Aielkrigaren Gaul ur en bur och möter Faile, på väg till Tear med Moiraine, Lan och Loial.")
ev('perrin', 4, text="Återvänder till Two Rivers, försvarar bygden mot trollocs, hyllas som Goldeneyes och gifter sig med Faile Bashere.")
ev('moiraine', 1, text="Möter Lan på vägen norr om Canluum. Han blir senare hennes väktare.")
ev('moiraine', 7, text="Helar de sårade efter slaget om Cairhien tills hon knappt har kraft kvar åt Rand.")
swap('moiraine', 6, 7)
ev('moiraine', 9, text="Kommer till Merrilor, ställer sig bakom Rand och får Egwene att godta att sigillen bryts.")
ev('lan', 1, text="Möter Moiraine på vägen norr om Canluum och blir senare hennes väktare.")
ev('lan', 5, text="Imponeras av Mats stridsplan inför slaget om Cairhien och pressar Rand att erkänna att han tänker döda Couladin.")
swap('lan', 4, 5)
ev('min', 3, text="Erkänns av Fortuona som Doomseer och blir hennes Truthspeaker sedan hon räddat henne från en lönnmördare i Seanchans läger.")
ev('aviendha', 0, text="Möter Egwene, Elayne och Nynaeve i Tear och leder Aiel som räddar dem. Hon är i Stenen när den har fallit.")
ev('aviendha', 2, text="Kastar blixtar mot Shaido från tornet i slaget om Cairhien. När tornet rasar griper Rand tag i henne och Egwene.")
ev('aviendha', 3, text="Följer med Elayne och Nynaeve till Ebou Dar på jakt efter Bowl of the Winds.")
ev('faile', 2, bok=8)
ev('faile', 4, text="Smugglar Horn of Valere i en försörjningskonvoj som hamnar i Blighten. Med hjälp av Vanin och Harnan avslöjar hon förrädaren Aravine och skickar hornet vidare med Olver.")
ev('gawyn', 3, text="Följer med Bryne och Siuan in i Vita tornet under Seanchans anfall och räddar Bryne från en störtande to'raken.")
ev('loial', 4, bok=11, text="Gifter sig med Erith på Algarin Pendaloans gods i Tear.", plats=None)
add('loial', 13, "Talar inför Great Stump i Stedding Shangtai för att Ogier ska strida i Tarmon Gai'don.", 'stedding-shangtai')
ev('loial', 5, text="Strider med Ogier i Elaynes här mot trollocs.", plats=None)
ev('loial', 6, text="Strider vid Merrilor.")
ev('verin', 0, text="Följer jakten på Horn of Valere till Toman Head.")
ev('tuon', 3, text="Skriver under Dragon's Peace och gör Min till sin Truthspeaker.")
ev('fain', 0, text="Kommer som gårdfarihandlare till Emond's Field strax före trollocanfallet, som han brukar göra varje vår.")
ev('ituralde', 0, text="Leder djärva räder mot Seanchan i Tarabon och lockar dem norrut mot en fälla.", plats=None)
add('ituralde', 10, "Får i hemlighet order av kung Alsalam att anfalla Seanchan.")
add('ituralde', 12, "Krossar Seanchans här vid Darluna och svär sig sedan till Rand.", 'darluna')
ev('rhuarc', 1, text="Följer Rand genom portalstenen från Tear till Chaendaer och tar honom sedan till Cold Rocks Hold.", plats='chaendaer')
ev('morgase', 1, text="Står under Compulsion från Rahvin, som uppträder som Lord Gaebril.")
ev('berelain', 3, text="Hon och Galad förälskar sig i varandra.")
# ---------- händelser: spoilers i händelsetexter ----------
ev('bryne', 2, text="Blir general för rebellernas här i Salidar.")
ev('graendal', 1, text="Rand förstör hennes palats Natrin's Barrow med balefire.")
ev('ishamael', 3, text="En okänd man, Moridin, dyker upp bland Skuggans tjänare. I Shadar Logoth korsas hans och Rands balefire.")
ev('logain', 2, text="Försvinner från Svarta tornet och sägs vara ute på uppdrag.")
ev('taim', 2, text="Stärker sitt grepp om Svarta tornet medan Logain är försvunnen.")
# ---------- händelser: det som flyttas ut ur om/ingress ----------
add('rand', 6, "Grundar Svarta tornet och låter Mazrim Taim samla män som kan kanalisera, Asha'man.", 'black-tower')
add('elayne', 7, "Upphöjs till Aes Sedai av Egwene och väljer Gröna ajah.")
add('elayne', 8, "Lär sig tillverka ter'angreal, något ingen har klarat på årtusenden.")
add('min', 6, "Blir en av Rands närmaste rådgivare och börjar läsa Herid Fels böcker.")
ev('thom', 3, text="Följer med Elayne och Nynaeve till Tanchico och blir Elaynes lärare. Hans förflutna som drottning Morgases älskare kommer i dagen.")
add('aviendha', 4, "De visa kvinnorna sätter henne att vaka över Rand.", 'chaendaer')
add('aviendha', 9, "Blir Elaynes förstasyster.", 'caemlyn')
add('faile', 6, "Hennes far Davram Bashere dyker upp: hon heter egentligen Zarine och är kusin till drottning Tenobia. Hon samlar ett eget nätverk av unga adelsmän, Cha Faile.")
ev('siuan', 3, text="Helas av Nynaeve i Salidar, hjälper till att upphöja Egwene till Amyrlin och styr rebellerna bakom kulisserna.")
add('birgitte', 11, "Blir befälhavare för drottninggardet i Caemlyn.")
add('graendal', 14, "Har straffats för sitt misslyckande mot Perrin och fått en vanställd kropp och namnet Hessalam.")
add('taim', 14, "Avslöjas: han har tvingat Asha'man över till Skuggan och hållit Logain fången i Svarta tornet.", 'black-tower')
add('bryne', 5, "Morgase kör iväg honom. Han följer Siuan, som brutit en ed till honom, och hamnar hos rebellerna.")
add('bryne', 8, "Leder rebellernas här till Tar Valon och inleder belägringen.", 'tar-valon')
add('logain', 4, "Min ser en ära omkring honom när han, stillad, går som fånge i Vita tornet. Han flyr med Siuan och Leane.", 'tar-valon')
add('morgase', 7, "Avsäger sig tronen till förmån för Elayne när Seanchan tar Amador.", 'amador')
add('morgase', 8, "Tjänar Faile under namnet Maighdin.")
add('cadsuane', 0, "Hjälper Moiraine i Chachin under sökandet efter barnet som föddes på Dragonmount.", 'chachin')
add('berelain', 8, "Följer med Perrin och uppvaktar honom, till Failes raseri.")
add('talmanes', 14, "Får namnet Dreadbane sedan han räddat Aludras drakar ur Caemlyn.")  # ersätts nedan
K['talmanes']['handelser'].pop()   # finns redan som händelse i bok 14

# ---------- titel, ingress, om ----------
bas('rand', om="Rand föds på Dragonmounts sluttningar under Aielkriget och växer upp hos Tam al'Thor i Emond's Field. Han är ta'veren och kan kanalisera saidin, som är besudlad av den Mörke och driver män till vansinne. Han är envis och pliktmedveten och kämpar för att inte förlora sig själv.")
bas('egwene', titel="Värdshusvärdens dotter från Emond's Field", senare=[(3, 'Accepted i Vita tornet'), (6, 'Amyrlin Seat')],
    ingress="Värdshusvärdens dotter från Emond's Field som kan kanalisera och lämnar byn med Moiraine.",
    om="Egwene är dotter till Bran al'Vere och växer upp i Emond's Field. Hon ska utbildas till Aes Sedai och har en ovanlig talang för drömmar. Hon är envis, snabblärd och van att ta ansvar.")
bas('mat', titel='Skojare från Emond\'s Field', senare=[(5, 'Befälhavare för Band of the Red Hand'), (11, 'Prins av Korparna')],
    ingress="Skojaren från Emond's Field, spelglad och rastlös, som dras med ut i världen.",
    om="Mat är en spelglad och rastlös ung man som helst slipper ansvar men ändå hamnar mitt i allt. Han har en omåttlig tur och svårt att låta bli ett vad.")
bas('perrin', titel="Smedlärling från Emond's Field", senare=[(4, 'Lord of the Two Rivers')],
    ingress="Smedlärling från Emond's Field som kan tala med vargar.",
    om="Perrin är eftertänksam, stark och rädd för sin egen kraft. Han är vargbroder och får gula ögon och skarpa sinnen. Han är ta'veren liksom Rand och Mat, och han dras till yxan men längtar efter hammaren.")
bas('nynaeve', om="Nynaeve är Visdom i Emond's Field och följer efter Moiraine för att skydda ungdomarna från byn. Hon kanaliserar instinktivt men har länge ett block som bara släpper när hon är arg. Hon är stridslysten, omtänksam och ofta otålig, och hon har en ovanlig begåvning för att hela.")
bas('lan', om="Lan räddades som spädbarn när Malkier föll och växte upp i Shienar med en ed att föra krig mot Skuggan. Han är en av världens främsta svärdsmän, sparsam med ord och fullständigt pålitlig. Han lär Rand att slåss.")
bas('elayne', titel='Andors tronarvinge', senare=[(11, 'Drottning av Andor')],
    ingress='Andors tronarvinge, dotter till drottning Morgase och en blivande kanaliserare.',
    om='Elayne är dotter till drottning Morgase och växer upp i palatset i Caemlyn. Hon ska utbildas i Vita tornet. Hon är modig, ofta dristig, och van vid att andra lyder.')
bas('min', om="Min arbetar på ett värdshus i Baerlon när hon träffar sällskapet från Two Rivers. Hennes syner visar vad som väntar människor, men inte när. Hon är skarpsynt och rakt på sak.")
bas('thom', om="Thom kommer till Emond's Field som underhållare på Winternight och följer med de unga när de flyr. Bakom berättarrösten döljer sig ett förflutet vid hovet i Caemlyn. Han är cynisk men lojal.")
bas('aviendha', titel='Jungfru av spjutet', senare=[(4, 'Visa kvinnornas lärling')],
    ingress='Taardad-Aiel ur Nine Valleys-septen, en Jungfru av spjutet med svårt för våtlandsbornas seder.',
    om='Aviendha är stolt och stridbar och har aldrig velat något annat än spjutet. Hon ser ner på våtlänningarnas seder och säger rakt ut vad hon tycker.')
bas('faile', titel='Hunter for the Horn', senare=[(4, 'Saldaeisk lady, Perrins hustru')],
    ingress='Ung kvinna från Saldaea som rest ut som Hunter for the Horn och i stället hittar Perrin.',
    om='Faile är snabbtänkt, svartsjuk och skicklig på politik och spioneri.')
bas('siuan', titel='Amyrlin Seat', senare=[(4, 'Avsatt Amyrlin'), (6, 'Avsatt Amyrlin, rebellernas rådgivare')], forsta=2,
    ingress='Fiskardottern från Tear som blir Amyrlin Seat och bär en hemlighet om Draken.',
    om='Siuan tillhör Blue Ajah och har ett sjömansspråk som skrämmer de flesta. Tillsammans med Moiraine har hon i tjugo år burit hemligheten om Draken.')
bas('gawyn', titel='Prins av Andor', senare=[(13, 'Prins av Andor, Egwenes väktare')],
    ingress='Elaynes bror och en lysande svärdsman, trogen sin mor och sin syster.',
    om='Gawyn är Morgases son. Han har tränats av Gareth Bryne och i Vita tornet och har lovat att skydda sin syster med sitt liv.')
bas('galad', titel='Elaynes och Gawyns halvbror', senare=[(5, 'Child of the Light'), (11, 'Lord Captain Commander för Children of the Light')],
    om='Galad är son till Taringail Damodred, Morgases förste make. Hans stränga rättskänsla gör honom obeveklig.')
bas('tam', ingress="Rands fosterfar, en lugn fåraherde med ett heronmärkt svärd och ett förflutet i krig.",
    om="Tam lämnade Two Rivers som ung och kom tillbaka efter Aielkriget med ett heronmärkt svärd, en hustru från utlandet och en nyfödd son. Han lär Rand tomrummet.")
bas('loial', om='Loial är lång, vänlig och ständigt orolig för att vara förhastad, men orädd när det gäller. Han kan hitta i Ways och följer Rand och Perrin genom de flesta av deras faror.')
bas('verin', ingress='Den till synes tankspridda bruna systern som vet mer än någon anar.',
    om='Verin verkar förstrött och ofarlig, men hon iakttar allt och antecknar ännu mer. Hon dyker upp när de unga från Two Rivers behöver det som mest.')
bas('birgitte', titel='Hjälte från hornet', senare=[(5, 'Hjälte från hornet, Elaynes väktare')],
    ingress='En av legendens hjältar, bunden till hjulet och kallad av Horn of Valere.',
    om='Birgitte är en mästerlig bågskytt som har levt otaliga liv, alltid tillsammans med Gaidal Cain. Mellan liven väntar hjältarna i Tel\'aran\'rhiod.')
bas('tuon', titel='Daughter of the Nine Moons', senare=[(12, 'Kejsarinnan Fortuona')],
    ingress='Arvtagaren till Seanchans kristalltron som Mat rövar bort från Ebou Dar.')
bas('ishamael', titel="Förrådaren av hoppet, Ba'alzamon", senare=[(10, "Förrådaren av hoppet, sedan Moridin och Nae'blis")],
    ingress="Den främste av de Förlorade. Han hemsöker Rands drömmar som Ba'alzamon och påstår sig vara Den Mörke.",
    om="Ishamael var en gång en lysande filosof som kom fram till att Den Mörke inte går att besegra och att allt bara upprepas i Hjulets cirkel. Han var aldrig helt fängslad och har i tusentals år styrt Skuggans planer.")
bas('lanfear', titel='Selene', senare=[(4, 'Lanfear, Nattens dotter'), (9, 'Lanfear, sedan Cyndane')],
    om='Lanfear var en av sin tids mäktigaste kanaliserare och den som borrade hålet till Den Mörkes fängelse. Hon är besatt av Rand som Lews Therin återfödd och pendlar mellan att locka honom och att vilja förgöra dem han älskar. Hon behärskar Tel\'aran\'rhiod bättre än någon annan.')
bas('demandred', titel='Förlorad', senare=[(14, 'Förlorad, Bao the Wyld')],
    ingress='Den Förlorade som hatar Lews Therin mest av alla. Ingen vet var han håller hus eller vad han planerar.',
    om='Demandred var en briljant general som alltid kom tvåa efter Lews Therin och till slut gick över till Skuggan av avund. Under större delen av serien syns han inte till.')
bas('rahvin', om='Rahvin är en kall maktpolitiker och mästare på Compulsion. Han gör Morgase till en viljelös docka och fyller hennes hov med sina egna män. Han är farlig just för att han aldrig tar onödiga risker.')
bas('sammael', om='Sammael var en gång en idrottsstjärna och general som ständigt jämförde sig med Lews Therin. Han tar över Illian och sitter i Council of Nine som Lord Brend, och han försöker locka Rand in i ett krig han tror att han kan vinna.')
bas('graendal', titel='Förlorad', senare=[(14, 'Förlorad, sedan Hessalam')],
    ingress='Förlorad som är mästare på Compulsion och omger sig med viljelösa slavar.',
    om='Graendal omger sig med vackra människor som hon gjort till slavar med Compulsion. Hon är försiktig och intrigant, och hon ser till att andra tar riskerna.')
bas('fain', ingress="Gårdfarihandlaren som brukar besöka Emond's Field, och som blir något värre än Skuggan själv sedan han smälter samman med Mordeth i Shadar Logoth.")
bas('taim', ingress='Den falske draken som Rand sätter att leda Svarta tornet. Rand litar på honom, men aldrig fullt ut.',
    om='Taim är en stolt och mäktig kanaliserare som en gång utropade sig själv till Draken. Rand ger honom amnesti och gör honom till M\'Hael, ledare för Asha\'man. Han är effektiv men svår att genomskåda.')
bas('bryne', titel='Andors generalkapten', senare=[(6, 'Rebellernas general'), (12, 'Rebellernas general och Siuans väktare')],
    ingress='En av sin tids stora generaler, generalkapten för drottning Morgases garde i Andor.',
    om='Bryne är ärlig, envis och lugn under press, och han har tjänat Andor i hela sitt liv.')
bas('bashere', om='Bashere är snabbtänkt, frispråkig och van vid krig mot Blighten. Han kommer till Andor för att jaga den falske draken Taim men blir istället Rands general. Som Failes far blir han Perrins svärfar.')
bas('ituralde', forsta=10, ingress='Domanisk general som anses vara en av de bästa i världen. Han leder en djärv kampanj mot Seanchan.',
    om='Ituralde är liten till växten men har ett enormt rykte. Han leder en djärv kampanj mot Seanchan i Tarabon och Arad Doman.')
bas('agelmar', ingress='Shienarisk lord och general som tar emot sällskapet i Fal Dara.',
    om='Agelmar är den gamla shienariska krigarkulturen personifierad: hövlig, stark och alltid beredd att dö vid Blightens gräns. Han är vän till Lan och har stridit tillsammans med honom sedan Aielkriget.')
bas('niall', om='Niall är en skarp och erfaren strateg som tror att Draken bara är en marionett åt Aes Sedai. Från Amador skickar han sina legioner och sina rykten ut över världen.')
bas('talmanes', om='Talmanes ler sällan och säger lite, men han är en av seriens mest pålitliga befälhavare. Han följer Mat från första stund utanför Cairhien och leder Bandet när Mat är borta.')
bas('logain', titel='Falsk drake', senare=[(9, 'Falsk drake, sedan Asha\'man')],
    ingress='Den falske draken som fångats och förs i bur genom Caemlyn mot Tar Valon.',
    om='Logain var en äkta kanaliserare som utropade sig till Draken och fångades av Aes Sedai för att stillas.')
bas('rhuarc', om='Rhuarc leder Aiel som stormar Stenen i Tear och blir sedan Rands mest pålitliga Aielhövding. Han är gift med visa kvinnan Amys och ser både de gamla sederna och behovet av förändring.')
bas('morgase', ingress='Andors drottning, mor till Elayne och Gawyn.',
    om='Morgase är en stolt och kunnig drottning som styr Andor med fast hand.')
bas('elaida', titel='Morgases rådgivare, Röda ajah', senare=[(4, 'Amyrlin, Röda ajah')],
    ingress='Röd Aes Sedai och rådgivare åt drottning Morgase, med Förutsägelsens gåva.',
    om='Elaida har Förutsägelsens gåva och ser tidigt att Rand kommer att bringa smärta. Hon är säker på att hon ensam vet vad som måste göras.')
bas('cadsuane', forsta=0, om='Cadsuane har levt längre än nästan alla andra Aes Sedai och bryr sig inte om regler eller rang. Hon är hård mot Rand men ser tidigare än andra att han håller på att stelna i sin egen kyla.')
bas('berelain', ingress='Mayenes unga härskare, känd för sin skönhet och sitt politiska sinne.',
    om='Berelain styr en liten stadsstat mellan mäktiga grannar och har lärt sig använda allt hon har. I Stenen i Tear försöker hon vinna Rand.')
for c in C:   # rättstavning
    for h in c['handelser']: h['text'] = h['text'].replace('Aieliska ödemarken', 'Aiels ödemark').replace('Sharansk', 'sharansk')

# ---------- relationer ----------
R = {}
def rel(cid, oid, bok, text, *fore):
    R[(cid, oid)] = {'id': oid, 'text': text, 'bok': bok, **({'fore': [{'bok': b, 'text': t} for b, t in fore]} if fore else {})}
F = [
 ('rand','egwene',4,'barndomsvän och tidigare trolovad',(1,'barndomsvän, som väntas gifta sig med honom')),
 ('rand','elayne',4,'Andors tronarvinge, som han älskar',(1,'Andors tronarvinge')),
 ('rand','min',5,'ser syner kring honom och älskar honom',(1,'ser syner kring honom')),
 ('rand','moiraine',1,'Aes Sedai, hans första vägledare'),
 ('rand','lan',1,'lär honom svärdskonst'),
 ('rand','aviendha',9,'Aiel som han älskar och som binder honom som väktare',(4,'Jungfru som vakar över honom')),
 ('rand','gawyn',4,'Elaynes bror, misstror honom',(1,'Elaynes bror')),
 ('rand','galad',4,'hans halvbror, vilket Galad inte vet',(1,'Elaynes halvbror')),
 ('rand','tam',1,'fosterfar'),('rand','loial',1,'Ogier och vän'),
 ('rand','tuon',12,'Seanchans kejsarinna, som han förhandlar med'),
 ('rand','mat',1,'barndomsvän'),('rand','perrin',1,'barndomsvän'),
 ('rand','ishamael',1,"ärkefiende, Ba'alzamon i hans drömmar"),
 ('rand','lanfear',4,'Förlorad som är besatt av honom',(2,'Selene, en gåtfull kvinna som följer honom')),
 ('rand','demandred',6,'Förlorad som hatar honom'),
 ('rand','rahvin',5,'Förlorad som han dödade med balefire',(4,'Förlorad som styr Andor som Lord Gaebril')),
 ('rand','sammael',7,'Förlorad som dog i Shadar Logoth',(4,'Förlorad som styr Illian och utmanar honom')),
 ('rand','fain',7,'sårade honom med dolken från Shadar Logoth',(1,'gårdfarihandlare som jagar honom')),
 ('rand','taim',13,"hans M'Hael, som förrådde honom",(6,"hans M'Hael, ledare för Asha'man")),
 ('rand','bashere',6,'trogen general'),
 ('rand','ituralde',12,'general som svor sig till honom'),
 ('rand','rhuarc',4,'klanhövding som följer honom'),
 ('rand','elaida',6,'lät röva bort honom',(1,'Morgases rådgivare, varnar för honom')),
 ('rand','cadsuane',8,'hans hårda rådgivare',(7,'legendarisk Aes Sedai som tar sig an honom')),
 ('rand','berelain',6,'hans förvaltare i Cairhien',(4,'First of Mayene, uppvaktar honom')),
 ('egwene','rand',1,'barndomsvän'),
 ('egwene','nynaeve',1,'Visdomen från hennes by'),
 ('egwene','elayne',1,'nära vän'),
 ('egwene','aviendha',4,'vän och lärlingssyster',(3,'vän')),
 ('egwene','siuan',6,'f.d. Amyrlin, hennes rådgivare',(2,'Amyrlin Seat')),
 ('egwene','gawyn',14,'väktare och make',(1,'Elaynes bror'),(13,'hennes väktare')),
 ('egwene','verin',12,'gav henne förteckningen över Black Ajah',(2,'brun Aes Sedai')),
 ('egwene','perrin',1,'barndomsvän'),
 ('egwene','taim',14,"M'Hael som hon dödade i Sista striden"),
 ('egwene','bryne',6,'general för hennes här',(1,'Andors generalkapten')),
 ('egwene','elaida',6,'Amyrlin som hon sätter sig emot',(1,'Morgases rådgivare')),
 ('egwene','cadsuane',14,'efterträder henne som Amyrlin',(7,'legendarisk Aes Sedai')),
 ('mat','rand',1,'barndomsvän'),('mat','perrin',1,'barndomsvän'),('mat','thom',1,'vän och reskamrat'),
 ('mat','moiraine',13,'Aes Sedai som han räddar ur Tower of Ghenjei',(1,'Aes Sedai som för honom ut i världen')),
 ('mat','birgitte',7,'dryckesbroder'),
 ('mat','tuon',11,'hustru',(9,'Seanchans tronarvinge, som han rövar bort')),
 ('mat','fain',14,'fiende som han till sist dödar med dolken från Shadar Logoth',(1,'gårdfarihandlare som jagar dem')),
 ('mat','talmanes',5,'närmaste man i Bandet'),
 ('perrin','rand',1,'barndomsvän'),('perrin','mat',1,'barndomsvän'),('perrin','egwene',1,'från samma by'),
 ('perrin','faile',4,'hustru',(3,'Hunter for the Horn som följer honom')),
 ('perrin','galad',13,'motståndare i rättegången',(1,'Elaynes halvbror')),
 ('perrin','tam',4,'Rands far och hans rådgivare'),
 ('perrin','loial',1,'vän och reskamrat'),
 ('perrin','verin',4,'hjälpte honom i Two Rivers',(2,'brun Aes Sedai')),
 ('perrin','lanfear',14,'Förlorad som försökte tvinga honom och som han dödade',(4,'Förlorad som söker upp honom i vargdrömmen')),
 ('perrin','graendal',13,'skickade Slayer mot honom'),
 ('perrin','fain',4,'Ordeith, fiende i Two Rivers',(1,'gårdfarihandlare som jagar dem')),
 ('perrin','bashere',6,'svärfar'),
 ('perrin','berelain',6,'First of Mayene, uppvaktar honom'),
 ('nynaeve','lan',7,'hennes make',(1,'väktaren hon förälskar sig i')),
 ('nynaeve','egwene',1,'flicka från hennes by som hon vakar över'),
 ('nynaeve','elayne',2,'reskamrat'),
 ('nynaeve','siuan',6,'f.d. Amyrlin som hon helade',(2,'Amyrlin Seat')),
 ('nynaeve','birgitte',4,'vän'),
 ('nynaeve','talmanes',14,'Bandets löjtnant, som hon helade'),
 ('nynaeve','logain',6,'falsk drake som hon helade från stillningen',(1,'fångad falsk drake')),
 ('moiraine','lan',1,'hennes väktare'),('moiraine','rand',1,'den hon sökt'),
 ('moiraine','thom',6,'gycklare som hon fått ett nära band till',(1,'gycklare')),
 ('moiraine','siuan',2,'bästa vän sedan novistiden'),
 ('moiraine','mat',13,'räddade henne ur Tower of Ghenjei',(1,'en av de unga från Emond\'s Field')),
 ('moiraine','lanfear',5,'Förlorad som hon drog med sig genom dörrkarmen',(4,'Förlorad')),
 ('lan','moiraine',1,'hans Aes Sedai'),
 ('lan','nynaeve',7,'hans hustru',(1,'Visdomen han förälskar sig i')),
 ('lan','rand',1,'hans elev'),
 ('lan','demandred',14,'Förlorad som han dödade i en duell'),
 ('lan','agelmar',1,'vän och vapenbroder'),
 ('elayne','rand',4,'Draken, som hon älskar',(1,'fåraherde från Two Rivers')),
 ('elayne','nynaeve',2,'reskamrat'),
 ('elayne','thom',4,'lärare och vän',(1,'gycklare')),
 ('elayne','egwene',1,'nära vän'),
 ('elayne','aviendha',9,'förstasyster',(3,'Aiel och vän')),
 ('elayne','gawyn',1,'bror'),('elayne','galad',1,'halvbror'),
 ('elayne','birgitte',5,'hennes väktare',(2,'hjälte från hornet')),
 ('elayne','min',9,'vän som delar Rand med henne',(2,'vän')),
 ('elayne','morgase',1,'mor'),
 ('min','rand',2,'Draken, som hon älskar',(1,'ung man kring vilken hon ser syner')),
 ('min','elayne',2,'vän'),
 ('min','aviendha',9,'Aiel som delar Rand med henne'),
 ('min','siuan',4,'Amyrlin som hon hjälpte att fly',(2,'Amyrlin Seat')),
 ('min','logain',4,'falsk drake kring vilken hon ser en ära',(1,'fångad falsk drake')),
 ('thom','elayne',4,'elev',(1,'Andors tronarvinge')),
 ('thom','mat',1,'vän och reskamrat'),
 ('thom','moiraine',6,'Aes Sedai som han fått ett nära band till',(1,'Aes Sedai')),
 ('aviendha','rand',9,'Draken, som hon älskar och har bundit som väktare',(4,"Car'a'carn, som hon vakar över")),
 ('aviendha','elayne',9,'förstasyster',(3,'våtlandskvinna och vän')),
 ('aviendha','egwene',3,'vän'),
 ('aviendha','min',9,'kvinna som delar Rand med henne'),
 ('aviendha','graendal',14,'Förlorad som försökte tvinga henne men själv blev hennes slav'),
 ('aviendha','rhuarc',14,'hennes klanhövding, som hon tvingas döda',(3,'hennes klanhövding')),
 ('faile','perrin',4,'make',(3,'smed med gula ögon, som hon följer')),
 ('faile','bashere',6,'far'),
 ('faile','morgase',13,'f.d. drottning som tjänade henne som Maighdin',(8,'tjänstekvinnan Maighdin')),
 ('faile','berelain',6,'rival'),
 ('siuan','moiraine',2,'bästa vän sedan novistiden'),
 ('siuan','egwene',6,'Amyrlin som hon tjänar',(2,'flicka från Two Rivers')),
 ('siuan','min',4,'hjälpte henne att fly ur tornet'),
 ('siuan','nynaeve',6,'helade henne',(2,'Visdom från Two Rivers')),
 ('siuan','bryne',12,'hennes väktare och kärlek',(5,'general som hon har en skuld till')),
 ('siuan','elaida',4,'avsatte henne',(2,'Röd syster')),
 ('gawyn','elayne',1,'syster'),
 ('gawyn','egwene',14,'hustru och Amyrlin',(1,'flicka från Two Rivers'),(13,'Amyrlin som han är väktare åt')),
 ('gawyn','galad',1,'halvbror'),
 ('gawyn','rand',4,'Draken, som han misstror',(1,'fåraherde som faller ner i palatsträdgården')),
 ('gawyn','demandred',14,'Förlorad som sårade honom dödligt'),
 ('gawyn','bryne',1,'hans lärare i svärd och krig'),
 ('gawyn','morgase',1,'mor'),
 ('galad','gawyn',1,'halvbror'),('galad','elayne',1,'halvsyster'),
 ('galad','rand',14,'halvbror, vilket Galad får veta först i Sista striden',(1,'fåraherde från Two Rivers')),
 ('galad','perrin',13,'motståndare i rättegången'),
 ('galad','demandred',14,'Förlorad som högg av hans arm i en duell'),
 ('galad','niall',5,'hans Lord Captain Commander'),
 ('galad','morgase',1,'styvmor'),
 ('galad','berelain',13,'kvinnan han förälskar sig i'),
 ('tam','rand',1,'fosterson'),
 ('tam','perrin',4,'ung ledare som han följer och ger råd'),
 ('loial','rand',1,'vän'),('loial','perrin',1,'vän och reskamrat'),
 ('verin','egwene',12,'Amyrlin som hon gav förteckningen över Black Ajah',(2,'flicka från Two Rivers')),
 ('verin','perrin',4,'vargbroder som hon hjälpte i Two Rivers',(2,'pojke från Two Rivers')),
 ('birgitte','elayne',5,'band henne som väktare'),
 ('birgitte','nynaeve',4,'vän'),
 ('birgitte','mat',7,'dryckesbroder'),
 ('tuon','mat',11,'make',(9,'skojaren som rövar bort henne')),
 ('tuon','rand',12,'Draken, som hon möter i Falme'),
 ('ishamael','rand',1,'ärkefiende'),
 ('ishamael','lanfear',9,'Cyndane, bunden till honom med en sinnesfälla',(2,'Förlorad')),
 ('lanfear','ishamael',9,'Moridin, som håller henne i en sinnesfälla',(2,'Förlorad')),
 ('lanfear','rand',2,'den hon vill äga'),
 ('lanfear','moiraine',5,'drog henne genom dörrkarmen',(2,'Aes Sedai')),
 ('lanfear','perrin',14,'dödade henne',(4,'vargbroder som hon söker upp i drömmen')),
 ('demandred','lan',14,'dödade honom i en duell'),
 ('demandred','galad',14,'ung svärdsman vars arm han högg av i en duell'),
 ('demandred','gawyn',14,'prins som han sårade dödligt'),
 ('demandred','rand',6,'hatad rival'),
 ('demandred','taim',14,'underlydande vid Merrilor'),
 ('rahvin','morgase',4,'drottningen han förtrollade med Compulsion'),
 ('rahvin','rand',5,'utplånade honom med balefire',(4,'Draken som hotar hans makt')),
 ('sammael','rand',4,'fiende som jagar honom'),
 ('graendal','aviendha',14,'Aiel som hon försökte tvinga men blev slav åt'),
 ('graendal','rhuarc',14,'klanhövding som hon tvingade med Compulsion'),
 ('graendal','bashere',14,'general vars omdöme hon förvrängde'),
 ('graendal','bryne',14,'general vars omdöme hon förvrängde'),
 ('graendal','ituralde',14,'general vars omdöme hon förvrängde'),
 ('graendal','agelmar',14,'general vars omdöme hon förvrängde'),
 ('graendal','perrin',13,'vargbroder som hon försökte döda med Slayer'),
 ('fain','mat',14,'dödade honom i Thakan\'dar',(1,'pojke från Emond\'s Field')),
 ('fain','rand',1,'pojken han hatar och jagar'),
 ('fain','perrin',4,'vargbroder och fiende i Two Rivers',(1,'pojke från Emond\'s Field')),
 ('taim','demandred',14,'hans befälhavare vid Merrilor'),
 ('taim','rand',14,'Draken, som han förrådde',(6,'Draken, som gav honom amnesti')),
 ('taim','logain',14,"Asha'man som han höll fången",(6,"Asha'man")),
 ('taim','egwene',14,'dödade honom'),
 ('taim','bashere',6,'jagade honom'),
 ('bryne','graendal',14,'förvrängde hans omdöme'),
 ('bryne','siuan',12,'hans Aes Sedai och kärlek',(5,'avsatt Amyrlin som brutit en ed till honom')),
 ('bryne','morgase',1,'drottningen han tjänade'),
 ('bryne','egwene',6,'Amyrlin som han tjänar'),
 ('bryne','gawyn',1,'hans elev'),
 ('bashere','graendal',14,'förvrängde hans omdöme'),
 ('bashere','taim',6,'den falske draken han jagade'),
 ('bashere','faile',6,'hans dotter'),
 ('bashere','perrin',6,'svärson'),
 ('bashere','rand',6,'Draken, som han tjänar'),
 ('ituralde','graendal',14,'förvrängde hans omdöme'),
 ('ituralde','rand',12,'Draken, som han svor sig till'),
 ('agelmar','graendal',14,'förvrängde hans omdöme'),
 ('agelmar','lan',1,'vän och vapenbroder'),
 ('niall','morgase',6,'hans gäst och gisslan',(2,'Andors drottning')),
 ('niall','galad',5,'ung Child of the Light'),
 ('talmanes','mat',5,'hans befälhavare'),
 ('talmanes','nynaeve',14,'helade honom'),
 ('logain','taim',14,'höll honom fången',(6,"M'Hael i Svarta tornet")),
 ('logain','nynaeve',6,'helade honom'),
 ('logain','min',4,'såg en ära kring honom'),
 ('rhuarc','graendal',14,'tvingade honom med Compulsion'),
 ('rhuarc','rand',4,"Car'a'carn, som han följer",(3,'våtlänning som han hjälper i Tear')),
 ('rhuarc','aviendha',3,'kvinna från hans klan'),
 ('morgase','rahvin',4,'Lord Gaebril, som förtrollade henne'),
 ('morgase','bryne',1,'hennes generalkapten'),
 ('morgase','niall',6,'höll henne som gäst och gisslan',(2,'Lord Captain Commander för Children of the Light')),
 ('morgase','elayne',1,'dotter'),('morgase','gawyn',1,'son'),('morgase','galad',1,'styvson'),
 ('morgase','faile',8,'lady som hon tjänar som Maighdin'),
 ('morgase','elaida',1,'hennes rådgivare'),
 ('elaida','morgase',1,'drottningen hon gav råd'),
 ('elaida','siuan',4,'Amyrlin som hon avsatte',(2,'Amyrlin Seat')),
 ('elaida','egwene',12,'hennes fånge, och Amyrlin efter henne',(1,'flicka från Two Rivers'),(10,'rebellernas Amyrlin, hennes fånge')),
 ('elaida','rand',6,'pojken hon lät röva bort',(1,'pojke som hon varnar för')),
 ('cadsuane','rand',7,'den hon försöker forma'),
 ('cadsuane','egwene',14,'Amyrlin som hon efterträder',(7,'rebellernas Amyrlin')),
 ('berelain','perrin',6,'Lord of the Two Rivers, som hon uppvaktar'),
 ('berelain','faile',6,'rival'),
 ('berelain','galad',13,'mannen hon förälskar sig i'),
 ('berelain','rand',6,'Draken, som gjorde henne till förvaltare',(4,'Draken, som hon uppvaktar i Tear')),
]
for row in F: rel(*row)
for c in C:
    new = []
    for r in c['relationer']:
        k = (c['id'], r['id']); assert k in R, k
        new.append(R.pop(k))
    c['relationer'] = new
assert not R, R
fb = {c['id']: c['forsta_bok'] for c in C}
for c in C:   # en relation (eller dess första fore) visas aldrig innan båda karaktärerna har dykt upp
    for r in c['relationer']:
        lo = max(fb[c['id']], fb[r['id']], 1)
        if r['bok'] < lo: r['bok'] = lo
        if 'fore' in r:
            r['fore'] = [f for f in r['fore'] if f['bok'] < r['bok']]
            for f in r['fore']: f['bok'] = max(f['bok'], lo)
            if not r['fore']: del r['fore']
    c['handelser'].sort(key=lambda h: h['bok'])
json.dump(C, open(p, 'w'), ensure_ascii=False, indent=1)
print('klart')
