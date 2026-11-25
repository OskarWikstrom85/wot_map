"""Resor för Rand, Perrin, Egwene, Nynaeve och Elayne (samma format som Mats)."""
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
BOK1 = [
 S('taren-ferry', 1, 'land', "Korsar Taren och lämnar Two Rivers för första gången."),
 S('baerlon', 1, 'land', "Första staden. Sällskapet möter Min och hamnar i bråk med Children of the Light."),
 S('shadar-logoth', 1, 'land', "Söker skydd i den döda staden, där Mashadar splittrar sällskapet."),
]
R['rand'] = {'stopp': [
 S('emonds-field', 1, None, "Trollocs anfaller på Winternight och Tam såras. Rand lämnar hemmet med Moiraine och Lan."),
 *BOK1,
 S('whitebridge', 1, 'flod', "Nedför Arinelle på Spray med Mat och Thom. I Whitebridge offrar sig Thom mot en Fade."),
 S('four-kings', 1, 'land', "På flykt med Mat längs Caemlyn Road, jagad av Darkfriends."),
 S('caemlyn', 1, 'land', "Faller ned i palatsträdgården och möter Elayne, Gawyn, Galad och drottning Morgase."),
 S('fal-dara', 1, 'ways', "Genom Ways till Shienar, med Loial som vägvisare."),
 S('eye-of-the-world', 1, 'land', "Besegrar Aginor och Balthamel och möter Ba'alzamon."),
 S('fal-dara', 2, 'land', "Amyrlin kommer, och Moiraine berättar att han är den återfödde draken."),
 S('cairhien', 2, 'portalsten', "En portalsten kastar honom, Loial och Hurin genom en spegelvärld. Han hamnar mitt i Cairhiens maktspel."),
 S('falme', 2, 'portalsten', "Verins portalsten tar dem till Toman Head. Han strider mot Ba'alzamon i himlen över Falme."),
 S('tear', 3, 'land', "Tar sig ensam söderut till Tear, tar Callandor och dödar Ishamael i Stenens hjärta.", ['remen']),
 S('rhuidean', 4, 'portalsten', "Genom en portalsten till Chaendaer. Går genom glaskolonnerna i Rhuidean och blir Car'a'carn."),
 S('cold-rocks-hold', 4, 'land', "Gäst hos Rhuarc. De visa kvinnorna sätter Aviendha att vakta honom."),
 S('alcair-dal', 4, 'land', "Avslöjar Aiels sanna historia för klanhövdingarna. Couladin och Shaido bryter med honom."),
 S('taien', 5, 'land', "Leder klanerna ut ur öknen och hittar Taien bränt av Shaido."),
 S('cairhien', 5, 'land', "Krossar Shaido i det andra slaget om Cairhien.", ['jangai-pass']),
 S('caemlyn', 5, 'portal', "Jagar Rahvin genom Caemlyn och Tel'aran'rhiod och utplånar honom med balefire."),
 S('black-tower', 6, 'land', "Grundar Svarta tornet och sätter Mazrim Taim att leda Asha'man."),
 S('cairhien', 6, 'portal', "Elaidas sändebud tar honom tillfånga och stänger in honom i en kista."),
 S('dumais-wells', 6, 'land', "Räddas vid Dumai's Wells av Perrin, Aiel och Asha'man."),
 S('illian', 7, 'portal', "Erövrar Illian och kröns med Lagerkronan."),
 S('shadar-logoth', 7, 'portal', "Jagar Sammael in i Shadar Logoth, där Mashadar tar honom."),
 S('cairhien', 7, 'portal', "Padan Fain sticker honom med en dolk från Shadar Logoth."),
 S('far-madding', 9, 'portal', "Jagar de förrädiska Asha'man i Far Madding, där ingen kan kanalisera."),
 S('shadar-logoth', 9, 'portal', "Renar saidin med Nynaeve och Choedan Kal."),
 S('bandar-eban', 12, 'portal', "Försöker skapa ordning i Arad Doman och blir allt hårdare och kallare."),
 S('natrins-barrow', 12, 'portal', "Förstör Graendals palats med balefire."),
 S('dragonmount', 12, 'portal', "Står på Dragonmount och väljer att leva igen."),
 S('maradon', 13, 'portal', "Räddar Maradon från trollocshären."),
 S('tar-valon', 13, 'portal', "Besöker Egwene i Vita tornet och kallar till möte vid Merrilor."),
 S('field-of-merrilor', 14, 'portal', "Möter världens härskare och Egwene vid Merrilor och sluter Drakens fred."),
 S('shayol-ghul', 14, 'portal', "Går in i Shayol Ghul och förseglar Den Mörke."),
]}
R['perrin'] = {'stopp': [
 S('emonds-field', 1, None, "Flyr på Winternight med Rand, Mat, Egwene, Moiraine och Lan."),
 *BOK1,
 S('caemlyn', 1, 'land', "Vandrar med Egwene, Elyas och vargarna. Whitecloaks tar dem tillfånga innan Moiraine och Lan befriar dem."),
 S('fal-dara', 1, 'ways', "Genom Ways till Shienar, med Loial som vägvisare."),
 S('eye-of-the-world', 1, 'land', "Följer med genom Blighten till Eye of the World."),
 S('fal-dara', 2, 'land', "Trollocs anfaller Fal Dara. Perrin följer med Ingtar för att jaga hornet."),
 S('cairhien', 2, 'land', "Jagar Padan Fain söderut med Ingtar och Mat och sluter upp med Rand."),
 S('falme', 2, 'portalsten', "Verins portalsten tar dem till Toman Head. Strider vid Falme."),
 S('remen', 3, 'land', "Följer Rands spår med Moiraine, Lan och Loial. Möter Faile och befriar Gaul ur en bur i Remen."),
 S('illian', 3, 'land', "Gyllene ögon i Illian, där Moiraine kartlägger Be'lals planer."),
 S('tear', 3, 'land', "Kommer till Tear när Rand tar Stenen."),
 S('emonds-field', 4, 'ways', "Genom Ways hem till Two Rivers. Leder försvaret mot trollocs och Whitecloaks och blir Lord of Emond's Field."),
 S('cairhien', 6, 'land', "Rider österut till Rand i Cairhien."),
 S('dumais-wells', 6, 'land', "Leder räddningen av Rand vid Dumai's Wells."),
 S('abila', 8, 'portal', "Sänds till Ghealdan för att föra Masema till Rand. Faile rövas bort av Shaido."),
 S('malden', 11, 'land', "Befriar Faile när han krossar Shaido vid Malden."),
 S('jehannah', 13, 'land', "Ställs inför rätta av Whitecloaks på Jehannah Road och smider hammaren Mah'alleinir."),
 S('braem-wood', 14, 'portal', "Strider mot trollocs i Braem Wood i början av Sista striden."),
 S('field-of-merrilor', 14, 'portal', "Vakar över Rand i Tel'aran'rhiod och jagar Slayer."),
 S('shayol-ghul', 14, 'portal', "Dödar Lanfear i Thakan'dar."),
]}
R['egwene'] = {'stopp': [
 S('emonds-field', 1, None, "Följer med när Rand, Mat och Perrin flyr på Winternight."),
 *BOK1,
 S('caemlyn', 1, 'land', "Vandrar med Perrin, Elyas och Tuatha'an tills Moiraine och Lan befriar dem från Whitecloaks."),
 S('fal-dara', 1, 'ways', "Genom Ways till Shienar."),
 S('eye-of-the-world', 1, 'land', "Följer med genom Blighten till Eye of the World."),
 S('tar-valon', 2, 'land', "Börjar som novis i Vita tornet."),
 S('falme', 2, 'ways', "Lurad av Liandrin till Falme, där Seanchan gör henne till damane."),
 S('tar-valon', 3, 'land', "Upphöjs till Accepted och börjar jaga Black Ajah med Nynaeve och Elayne."),
 S('tear', 3, 'flod', "Nedför Erinin till Tear, där Black Ajah fångar dem i Stenen."),
 S('rhuidean', 4, 'portalsten', "Följer med Rand genom portalstenen till Aielöknen."),
 S('cold-rocks-hold', 4, 'land', "Lär sig vandra i drömmar hos de visa kvinnorna."),
 S('cairhien', 5, 'land', "Följer klanerna ut ur öknen till Cairhien.", ['taien', 'jangai-pass']),
 S('salidar', 6, 'land', "Kallas till Salidar och upphöjs till Amyrlin för de upproriska Aes Sedai."),
 S('lugard', 8, 'land', "Leder rebellernas här genom Murandy mot Tar Valon."),
 S('tar-valon', 10, 'portal', "Flyttar hela hären genom portaler och belägrar Tar Valon."),
 S('field-of-merrilor', 14, 'portal', "Leder Vita tornets här i Sista striden och dör när hon förintar Taim med Flame of Tar Valon."),
]}
R['nynaeve'] = {'stopp': [
 S('emonds-field', 1, None, "Följer efter de unga ur Emond's Field för att ta hem dem."),
 S('baerlon', 1, 'land', "Hinner ifatt sällskapet i Baerlon."),
 S('shadar-logoth', 1, 'land', "Följer med in i Shadar Logoth."),
 S('whitebridge', 1, 'land', "Spårar de försvunna med Moiraine och Lan."),
 S('caemlyn', 1, 'land', "Återförenas med de andra i Caemlyn."),
 S('fal-dara', 1, 'ways', "Genom Ways till Shienar."),
 S('eye-of-the-world', 1, 'land', "Följer med genom Blighten till Eye of the World."),
 S('tar-valon', 2, 'land', "Börjar sin utbildning i Vita tornet."),
 S('falme', 2, 'ways', "Lurad av Liandrin till Falme. Räddar Egwene ur Seanchans fångenskap."),
 S('tar-valon', 3, 'land', "Upphöjs till Accepted och jagar Black Ajah."),
 S('tear', 3, 'flod', "Nedför Erinin till Tear, där Black Ajah fångar dem i Stenen."),
 S('tanchico', 4, 'hav', "Med Sea Folk-skepp till Tanchico, där hon besegrar Moghedien."),
 S('salidar', 5, 'land', "Reser med Valan Lucas cirkus genom Amadicia och Ghealdan till rebellerna i Salidar.", ['jehannah']),
 S('ebou-dar', 7, 'land', "Söker Skålen av vindarna i Ebou Dar och gifter sig med Lan."),
 S('far-madding', 9, 'portal', "Följer Rand och Lan till Far Madding."),
 S('shadar-logoth', 9, 'portal', "Delar Choedan Kal med Rand när saidin renas."),
 S('tar-valon', 13, 'portal', "Klarar provet och blir Aes Sedai i Vita tornet."),
 S('shayol-ghul', 14, 'portal', "Följer Rand in i Shayol Ghul tillsammans med Moiraine."),
]}
R['elayne'] = {'stopp': [
 S('caemlyn', 1, None, "Möter Rand när han faller ned i palatsträdgården."),
 S('tar-valon', 2, 'land', "Novis i Vita tornet. Blir vän med Egwene och Nynaeve."),
 S('falme', 2, 'ways', "Följer med till Falme för att rädda Egwene."),
 S('tar-valon', 3, 'land', "Upphöjs till Accepted och jagar Black Ajah."),
 S('tear', 3, 'flod', "Nedför Erinin till Tear, där Black Ajah fångar dem i Stenen."),
 S('tanchico', 4, 'hav', "Med Sea Folk-skepp till Tanchico för att leta efter Black Ajah."),
 S('salidar', 5, 'land', "Reser med Valan Lucas cirkus till rebellerna i Salidar.", ['jehannah']),
 S('ebou-dar', 7, 'land', "Söker Skålen av vindarna i Ebou Dar och binder Birgitte som väktare."),
 S('caemlyn', 9, 'portal', "Återvänder till Caemlyn och gör anspråk på Lejontronen."),
 S('braem-wood', 14, 'portal', "Leder Andors här mot trollocs i Braem Wood."),
 S('field-of-merrilor', 14, 'portal', "Strider i Sista striden vid Merrilor."),
]}
json.dump(R, open(p, 'w'), ensure_ascii=False, indent=1)
print({k: len(v['stopp']) for k, v in R.items() if not k.startswith('_')})
