"""Resor för resten av karaktärerna (omgång 3)."""
import json, pathlib
root = pathlib.Path(__file__).resolve().parents[2]
p = root / 'data/resor.json'
R = json.load(open(p))
def S(plats, bok, satt, text, via=None):
    d = {'plats': plats, 'bok': bok}
    if satt: d['satt'] = satt
    if via: d['via'] = via
    d['text'] = text
    return d
B1 = lambda: [
 S('baerlon', 1, 'land', "Sällskapet söker skydd i Baerlon."),
 S('shadar-logoth', 1, 'land', "Den döda staden, där Mashadar splittrar sällskapet."),
 S('whitebridge', 1, 'land', "Spårar de försvunna längs floden."),
 S('caemlyn', 1, 'land', "Återförenas med de andra i Caemlyn."),
 S('fal-dara', 1, 'ways', "Genom Ways till Shienar."),
 S('eye-of-the-world', 1, 'land', "Genom Blighten till Eye of the World."),
]
N = {}
N['moiraine'] = [
 S('tar-valon', 0, None, "Accepted i Vita tornet när hon och Siuan hör Gitaras förutsägelse om Drakens återfödelse."),
 S('canluum', 0, 'land', "Börjar söka efter barnet och möter Lan i Canluum."),
 S('emonds-field', 1, 'land', "Hittar Rand, Mat och Perrin i Two Rivers och för dem därifrån på Winternight."),
 *B1(),
 S('fal-dara', 2, 'land', "Amyrlin kommer, och Moiraine avslöjar för Rand att han är Draken."),
 S('falme', 2, 'land', "Kommer till Toman Head efter slaget och tar hand om Rand."),
 S('remen', 3, 'land', "Följer Rands spår söderut med Perrin, Lan och Loial."),
 S('illian', 3, 'land', "Kartlägger Be'lals planer i Illian."),
 S('tear', 3, 'land', "Dödar Be'lal med balefire i Stenen i Tear."),
 S('rhuidean', 4, 'portalsten', "Går genom ter'angreal i Rhuidean och ser sitt eget öde."),
 S('cairhien', 5, 'land', "Kastar sig över Lanfear vid hamnen i Cairhien och försvinner genom den röda dörrkarmen.", ['taien', 'jangai-pass']),
 S('tower-of-ghenjei', 13, 'portal', "Räddas ur Eelfinns värld av Mat, Thom och Noal genom Tower of Ghenjei."),
 S('field-of-merrilor', 14, 'portal', "Dyker upp vid Merrilor och får ledarna att stå bakom Rand."),
 S('shayol-ghul', 14, 'portal', "Följer Rand in i Shayol Ghul med Nynaeve."),
]
N['lan'] = [
 S('tar-valon', 0, None, "Strider vid De skinande murarna under Aielkriget."),
 S('canluum', 0, 'land', "Möter Moiraine i Canluum och blir hennes väktare."),
 S('emonds-field', 1, 'land', "Följer Moiraine till Two Rivers."),
 *B1(),
 S('fal-dara', 2, 'land', "Tränar Rand i svärd i Fal Dara."),
 S('falme', 2, 'land', "Följer Moiraine till Toman Head efter slaget."),
 S('remen', 3, 'land', "Följer Rands spår söderut med Moiraine och Perrin."),
 S('illian', 3, 'land', "Genom Illian på väg mot Tear."),
 S('tear', 3, 'land', "Strider när Stenen i Tear faller."),
 S('rhuidean', 4, 'portalsten', "Väntar vid Chaendaer när Moiraine och Rand går ned till Rhuidean."),
 S('cairhien', 5, 'land', "Förlorar Moiraine vid hamnen i Cairhien. Hon för över hans band till Myrelle.", ['taien', 'jangai-pass']),
 S('ebou-dar', 7, 'land', "Hittar Nynaeve i Ebou Dar och gifter sig med henne."),
 S('far-madding', 9, 'portal', "Följer Rand till Far Madding."),
 S('shadar-logoth', 9, 'portal', "Försvarar Rand och Nynaeve under reningen av saidin."),
 S('maradon', 11, 'portal', "Nynaeve sätter av honom i Saldaea. Han rider österut ensam mot Malkier."),
 S('tarwins-gap', 13, 'land', "Malkieri och gränslandets folk samlas under hans banér. Han rider in i Tarwin's Gap.", ['chachin', 'fal-moran']),
 S('field-of-merrilor', 14, 'portal', "Dödar Demandred i en duell vid Merrilor."),
]
N['min'] = [
 S('baerlon', 1, None, "Ser syner kring Rand och de andra på värdshuset i Baerlon."),
 S('tar-valon', 2, 'land', "Kommer till Tar Valon och blir vän med Egwene, Nynaeve och Elayne."),
 S('falme', 2, 'ways', "Följer med till Falme och hålls fången av Seanchan."),
 S('tar-valon', 4, 'land', "Flyr med Siuan och Leane när Siuan avsätts."),
 S('salidar', 5, 'land', "Tar sig med Siuan, Leane och Logain till rebellerna i Salidar.", ['lugard']),
 S('caemlyn', 6, 'land', "Följer med rebellernas sändebud till Caemlyn och blir Rands älskade."),
 S('dumais-wells', 6, 'land', "Tas tillfånga med Rand och räddas vid Dumai's Wells."),
 S('far-madding', 9, 'portal', "Följer Rand till Far Madding."),
 S('shadar-logoth', 9, 'portal', "Vakar över Rand när saidin renas."),
 S('bandar-eban', 12, 'portal', "Hos Rand i Arad Doman. Studerar Herid Fels böcker."),
 S('field-of-merrilor', 14, 'portal', "Seanchans Doomseer vid Merrilor. Avslöjar förrädaren bland generalerna."),
]
N['thom'] = [
 S('emonds-field', 1, None, "Gleeman på Winternight i Emond's Field."),
 S('taren-ferry', 1, 'land', "Följer med de unga ut ur Two Rivers."),
 S('baerlon', 1, 'land', "Sällskapet söker skydd i Baerlon."),
 S('shadar-logoth', 1, 'land', "Den döda staden, där Mashadar splittrar sällskapet."),
 S('whitebridge', 1, 'flod', "Nedför Arinelle på Spray. Offrar sig mot en Fade i Whitebridge."),
 S('cairhien', 2, 'land', "Lever som gleeman i Cairhien och möter Rand igen."),
 S('caemlyn', 3, 'land', "Slår följe med Mat i Caemlyn."),
 S('tear', 3, 'flod', "Med Mat nedför Erinin till Tear.", ['aringill']),
 S('tanchico', 4, 'hav', "Följer Nynaeve och Elayne till Tanchico."),
 S('salidar', 5, 'land', "Reser med Valan Lucas cirkus till rebellerna i Salidar.", ['jehannah']),
 S('ebou-dar', 7, 'land', "Följer Elayne och Nynaeve till Ebou Dar."),
 S('lugard', 11, 'land', "Flyr med Mat och cirkusen norrut."),
 S('caemlyn', 13, 'land', "Kommer till Caemlyn med Mat."),
 S('tower-of-ghenjei', 13, 'land', "Går in i tornet med Mat och Noal och räddar Moiraine."),
 S('shayol-ghul', 14, 'portal', "Vaktar ingången till Shayol Ghul när Rand går in."),
]
N['aviendha'] = [
 S('tear', 3, None, "En av Far Dareis Mai som stormar Stenen i Tear."),
 S('rhuidean', 4, 'portalsten', "Kallas till Rhuidean för att bli visa kvinna."),
 S('cold-rocks-hold', 4, 'land', "Sätts att vakta Rand i Cold Rocks Hold."),
 S('alcair-dal', 4, 'land', "Med Rand när klanhövdingarna möts i Alcair Dal."),
 S('cairhien', 5, 'land', "Följer klanerna ut ur öknen till Cairhien.", ['taien', 'jangai-pass']),
 S('caemlyn', 5, 'portal', "Följer Rand genom portalen mot Rahvin."),
 S('ebou-dar', 7, 'portal', "Följer Elayne till Ebou Dar och söker Skålen av vindarna."),
 S('caemlyn', 9, 'portal', "Blir Elaynes förstasyster i Caemlyn."),
 S('rhuidean', 13, 'portal', "Går genom glaskolonnerna igen och ser Aiels undergång."),
 S('shayol-ghul', 14, 'portal', "Strider mot Graendal i Thakan'dar."),
]
N['faile'] = [
 S('remen', 3, None, "Hornjägaren Zarine slår följe med Perrin i Remen."),
 S('illian', 3, 'land', "Följer med genom Illian."),
 S('tear', 3, 'land', "Kommer till Tear när Stenen faller."),
 S('emonds-field', 4, 'ways', "Genom Ways till Two Rivers, där hon och Perrin gifter sig."),
 S('cairhien', 6, 'land', "Följer Perrin till Cairhien."),
 S('abila', 8, 'portal', "Följer Perrin till Ghealdan och rövas bort av Shaido."),
 S('malden', 11, 'land', "Gai'shain i Malden tills Perrin befriar henne."),
 S('jehannah', 13, 'land', "I Perrins läger vid Jehannah Road."),
 S('field-of-merrilor', 14, 'portal', "Bär Valeres horn genom Sista striden."),
]
N['siuan'] = [
 S('tar-valon', 0, None, "Accepted när hon och Moiraine hör Gitaras förutsägelse."),
 S('fal-dara', 2, 'land', "Som Amyrlin besöker hon Fal Dara och träffar Rand."),
 S('tar-valon', 4, 'land', "Avsätts och stillas av Elaida, men flyr ur tornet."),
 S('lugard', 5, 'land', "Flyr med Leane, Min och Logain. Gareth Bryne hinner ifatt dem."),
 S('salidar', 5, 'land', "Samlar de upproriska Aes Sedai i Salidar."),
 S('tar-valon', 10, 'portal', "Följer Egwenes här till belägringen av Tar Valon."),
 S('field-of-merrilor', 14, 'portal', "Dör i Sista striden."),
]
N['gawyn'] = [
 S('caemlyn', 1, None, "Möter Rand i palatsträdgården."),
 S('tar-valon', 4, 'land', "Leder Younglings i tornet när Siuan avsätts."),
 S('dumais-wells', 6, 'land', "Leder Younglings vid Dumai's Wells."),
 S('tar-valon', 12, 'land', "Lämnar Elaida, går till Egwene och räddar henne från mördare."),
 S('field-of-merrilor', 14, 'portal', "Möter Demandred med Bloodknife-ringarna och såras dödligt."),
]
N['galad'] = [
 S('caemlyn', 1, None, "Möter Rand i palatsträdgården."),
 S('tar-valon', 4, 'land', "Lämnar tornet efter Siuans fall."),
 S('amador', 5, 'land', "Blir Child of the Light i Amador."),
 S('jehannah', 13, 'land', "Leder Children of the Light och dömer Perrin på Jehannah Road."),
 S('caemlyn', 14, 'portal', "Strider när Caemlyn faller."),
 S('field-of-merrilor', 14, 'portal', "Duellerar mot Demandred och förlorar en hand."),
]
N['tam'] = [
 S('dragonmount', 0, None, "Hittar ett nyfött barn på Dragonmounts sluttning under Aielkriget."),
 S('emonds-field', 1, 'land', "Såras av trollocs på Winternight."),
 S('abila', 8, 'portal', "Följer Perrin till Ghealdan med männen från Two Rivers."),
 S('malden', 11, 'land', "Leder bågskyttarna i slaget vid Malden."),
 S('bandar-eban', 12, 'portal', "Möter Rand, som nästan dödar honom."),
 S('cairhien', 14, 'portal', "Leder trupper i Sista striden."),
 S('field-of-merrilor', 14, 'portal', "Strider vid Merrilor."),
]
N['loial'] = [
 S('stedding-shangtai', 1, None, "Har rymt från Stedding Shangtai för att se världen."),
 S('caemlyn', 1, 'land', "Möter Rand i Caemlyn."),
 S('fal-dara', 1, 'ways', "Leder sällskapet genom Ways till Shienar."),
 S('eye-of-the-world', 1, 'land', "Genom Blighten till Eye of the World."),
 S('fal-dara', 2, 'land', "Trollocs anfaller Fal Dara."),
 S('cairhien', 2, 'portalsten', "Kastas med Rand och Hurin genom en portalsten."),
 S('falme', 2, 'portalsten', "Verins portalsten tar dem till Toman Head."),
 S('remen', 3, 'land', "Följer Rands spår med Perrin, Moiraine och Lan."),
 S('illian', 3, 'land', "Genom Illian."),
 S('tear', 3, 'land', "Kommer till Tear när Stenen faller."),
 S('emonds-field', 4, 'ways', "Leder Perrin genom Ways till Two Rivers och låser Waygate."),
 S('dumais-wells', 6, 'land', "Strider vid Dumai's Wells."),
 S('stedding-shangtai', 13, 'ways', "Talar inför Ogiers stora möte och gifter sig med Erith."),
 S('braem-wood', 14, 'portal', "Leder Ogier mot trollocs i Braem Wood."),
 S('field-of-merrilor', 14, 'portal', "Strider vid Merrilor."),
]
N['verin'] = [
 S('fal-dara', 2, None, "Kommer med Amyrlin till Fal Dara."),
 S('cairhien', 2, 'land', "Följer jakten på hornet söderut."),
 S('falme', 2, 'portalsten', "För sällskapet med en portalsten till Toman Head."),
 S('tar-valon', 3, 'land', "Hjälper Egwene, Nynaeve och Elayne att jaga Black Ajah."),
 S('emonds-field', 4, 'land', "Kommer till Two Rivers och hjälper Perrin i hemlighet."),
 S('dumais-wells', 6, 'land', "Vid Dumai's Wells, där hon svär sig till Rand."),
 S('tar-valon', 12, 'land', "Avslöjar hela Black Ajah för Egwene och dör."),
]
N['birgitte'] = [
 S('falme', 2, None, "Kallas tillbaka av Valeres horn och strider vid Falme."),
 S('salidar', 5, 'portal', "Slits ut ur Tel'aran'rhiod av Moghedien och binds som Elaynes väktare."),
 S('ebou-dar', 7, 'land', "Följer Elayne till Ebou Dar."),
 S('caemlyn', 9, 'portal', "Elaynes generalkapten i Caemlyn."),
 S('field-of-merrilor', 14, 'portal', "Strider i Sista striden."),
]
N['tuon'] = [
 S('ebou-dar', 9, None, "Dotter av de nio månarna i Ebou Dar. Mat rövar bort henne."),
 S('lugard', 11, 'land', "Reser med Mat och cirkusen och gifter sig med honom."),
 S('ebou-dar', 11, 'land', "Återvänder till Ebou Dar och blir kejsarinna."),
 S('falme', 12, 'portal', "Möter Rand men vägrar sluta fred."),
 S('ebou-dar', 14, 'portal', "Mat räddar henne från mördare."),
 S('field-of-merrilor', 14, 'portal', "Seanchan går med i Sista striden."),
]
N['ishamael'] = [
 S('falme', 2, None, "Strider mot Rand i himlen över Falme."),
 S('tear', 3, 'portal', "Rand dödar honom med Callandor i Stenens hjärta."),
 S('shadar-logoth', 7, 'portal', "Återkommen som Moridin. Hans och Rands balefire korsas."),
 S('shayol-ghul', 14, 'portal', "Strider mot Rand i Shayol Ghul och dör i Rands gamla kropp."),
]
N['lanfear'] = [
 S('tear', 4, None, "Avslöjar sig för Rand i Stenen i Tear."),
 S('cairhien', 5, 'portal', "Anfaller Rand vid hamnen i Cairhien och försvinner med Moiraine."),
 S('shadar-logoth', 9, 'portal', "Som Cyndane under reningen av saidin."),
 S('shayol-ghul', 14, 'portal', "Perrin dödar henne i Thakan'dar."),
]
N['demandred'] = [
 S('shayol-ghul', 6, None, "Tar emot Den Mörkes order i Shayol Ghul."),
 S('field-of-merrilor', 14, 'portal', "Leder Sharas arméer vid Merrilor och dödas av Lan."),
]
N['rahvin'] = [
 S('caemlyn', 4, None, "Styr Andor som Lord Gaebril genom drottning Morgase."),
]
N['sammael'] = [
 S('illian', 4, None, "Styr Illian som Lord Brend."),
 S('shadar-logoth', 7, 'portal', "Lockar Rand in i Shadar Logoth och slukas av Mashadar."),
]
N['graendal'] = [
 S('natrins-barrow', 12, None, "Rand förstör hennes palats med balefire, men hon har redan flytt."),
 S('field-of-merrilor', 14, 'portal', "Förvränger generalernas omdöme vid Merrilor."),
 S('shayol-ghul', 14, 'portal', "Blir Aviendhas slav i Thakan'dar."),
]
N['fain'] = [
 S('emonds-field', 1, None, "Kommer som gårdfarihandlare strax före trollocanfallet."),
 S('shadar-logoth', 1, 'land', "Förföljer sällskapet in i Shadar Logoth och smälter samman med Mordeth."),
 S('fal-dara', 1, 'land', "Fångas och sätts i Fal Daras fängelsehålor."),
 S('falme', 2, 'land', "Flyr med hornet och dolken och lockar Rand till Falme."),
 S('emonds-field', 4, 'land', "Återvänder som Ordeith med Children of the Light."),
 S('cairhien', 7, 'land', "Sticker Rand med en dolk från Shadar Logoth."),
 S('shayol-ghul', 14, 'land', "Möter Mat i Thakan'dar och dör."),
]
N['taim'] = [
 S('caemlyn', 6, None, "Får amnesti i Caemlyn och blir M'Hael."),
 S('dumais-wells', 6, 'portal', "Leder Asha'man vid Dumai's Wells."),
 S('black-tower', 13, 'portal', "Tar makten i Svarta tornet."),
 S('field-of-merrilor', 14, 'portal', "Dödas av Egwene vid Merrilor."),
]
N['bryne'] = [
 S('tar-valon', 0, None, "Leder Andors styrkor vid De skinande murarna."),
 S('caemlyn', 1, 'land', "Generalkapten i Caemlyn."),
 S('lugard', 5, 'land', "Kastas ut av Morgase och jagar Siuan och Leane, som han hinner ifatt."),
 S('salidar', 5, 'land', "Blir general för rebellernas här i Salidar."),
 S('tar-valon', 10, 'portal', "Belägrar Tar Valon med rebellernas här."),
 S('field-of-merrilor', 14, 'portal', "Hans planer förvrängs av Graendal."),
]
N['bashere'] = [
 S('caemlyn', 6, None, "Kommer till Caemlyn och blir Rands general."),
 S('dumais-wells', 6, 'land', "Leder saldaeiskt rytteri vid Dumai's Wells."),
 S('maradon', 13, 'portal', "Strider vid Maradon."),
 S('caemlyn', 14, 'portal', "Leder trupper när Caemlyn ska återtas."),
 S('field-of-merrilor', 14, 'portal', "Stupar vid Merrilor."),
]
N['ituralde'] = [
 S('darluna', 11, None, "Lurar Seanchan i en fälla vid Darluna."),
 S('maradon', 13, 'portal', "Håller Maradon mot trollocshären."),
 S('shayol-ghul', 14, 'portal', "Försvarar passet in till Thakan'dar."),
]
N['agelmar'] = [
 S('tar-valon', 0, None, "Leder Shienars styrkor vid De skinande murarna."),
 S('fal-dara', 1, 'land', "Tar emot Moiraine och sällskapet i Fal Dara."),
 S('tarwins-gap', 14, 'land', "Leder gränslandets styrkor vid Tarwin's Gap."),
 S('field-of-merrilor', 14, 'portal', "Hans planer förvrängs av Graendal."),
]
N['niall'] = [
 S('tar-valon', 0, None, "Leder Children of the Light vid De skinande murarna."),
 S('amador', 2, 'land', "Styr Children of the Light från Amador."),
]
N['talmanes'] = [
 S('cairhien', 5, None, "Möter Mat utanför Cairhien."),
 S('maerone', 6, 'land', "Leder Bandet i lägret vid Maerone."),
 S('salidar', 6, 'land', "Följer Mat till Salidar."),
 S('hinderstap', 13, 'land', "Med Bandet vid Hinderstap."),
 S('caemlyn', 13, 'land', "Räddar drakarna när Caemlyn faller."),
 S('field-of-merrilor', 14, 'portal', "Leder Bandet vid Merrilor."),
]
N['logain'] = [
 S('caemlyn', 1, None, "Visas upp som fånge i Caemlyn."),
 S('tar-valon', 1, 'land', "Stillas i Tar Valon."),
 S('lugard', 5, 'land', "Flyr med Siuan, Leane och Min."),
 S('salidar', 5, 'land', "Nynaeve helar honom i Salidar."),
 S('black-tower', 8, 'land', "Går med i Svarta tornet."),
 S('field-of-merrilor', 14, 'portal', "Strider vid Merrilor och tar tillbaka sigillen."),
]
N['rhuarc'] = [
 S('tear', 3, None, "Leder Aiel som stormar Stenen i Tear."),
 S('rhuidean', 4, 'portalsten', "Följer Rand genom portalstenen tillbaka till öknen."),
 S('cold-rocks-hold', 4, 'land', "Tar emot Rand i sitt fäste."),
 S('alcair-dal', 4, 'land', "Klanhövdingarnas möte i Alcair Dal."),
 S('cairhien', 5, 'land', "Leder klanerna mot Shaido vid Cairhien.", ['taien', 'jangai-pass']),
 S('dumais-wells', 6, 'portal', "Leder Aiel vid Dumai's Wells."),
 S('shayol-ghul', 14, 'portal', "Tvingas av Graendal och dör i Thakan'dar."),
]
N['morgase'] = [
 S('caemlyn', 1, None, "Drottning i Caemlyn."),
 S('amador', 6, 'land', "Flyr ur Caemlyn och blir Pedron Nialls gäst i Amador."),
 S('abila', 8, 'land', "Tjänar Faile under namnet Maighdin."),
 S('malden', 11, 'land', "Tillfångatas av Shaido och befrias vid Malden."),
 S('jehannah', 13, 'land', "Avslöjar vem hon är och gifter sig med Tallanvor."),
]
N['elaida'] = [
 S('caemlyn', 1, None, "Morgases rådgivare i Caemlyn."),
 S('tar-valon', 4, 'land', "Avsätter Siuan och blir Amyrlin."),
]
N['cadsuane'] = [
 S('cairhien', 7, None, "Kommer till Cairhien och blir Rands rådgivare."),
 S('far-madding', 9, 'portal', "Följer Rand till sin hemstad Far Madding."),
 S('shadar-logoth', 9, 'portal', "Leder försvaret under reningen av saidin."),
 S('bandar-eban', 12, 'portal', "Förvisas av Rand i Arad Doman."),
 S('shayol-ghul', 14, 'portal', "Leder kanaliserare i Shayol Ghul och blir Amyrlin."),
]
N['berelain'] = [
 S('tear', 4, None, "Gäst i Stenen i Tear."),
 S('cairhien', 6, 'portal', "Rands förvaltare i Cairhien."),
 S('abila', 8, 'portal', "Följer Perrin till Ghealdan."),
 S('malden', 11, 'land', "Hennes Winged Guards strider vid Malden."),
 S('jehannah', 13, 'land', "Möter Galad och gifter sig med honom."),
]
for k, v in N.items():
    for a, b in zip(v, v[1:]):
        assert a['plats'] != b['plats'], (k, a['plats'])
    R[k] = {'stopp': v}
json.dump(R, open(p, 'w'), ensure_ascii=False, indent=1)
print(len([k for k in R if not k.startswith('_')]), 'resor')
