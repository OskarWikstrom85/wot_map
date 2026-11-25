"""Lägger till 20 platser (omgång 2) och kopplar karaktärernas händelser till dem.
Koordinater mätta på originalkartan (8000 x 6177 px). Platser märkta ~ saknas på
originalkartan och är placerade efter böckernas beskrivning."""
import csv, json, pathlib
root = pathlib.Path(__file__).resolve().parents[2]
W, H = 8000, 6177
P = [
 ('eye-of-the-world', 'Eye of the World', 'landmärke', 'Blighten', 7050, 600, "~ Källan av ren saidin djupt inne i Blighten, vaktad av den gröne mannen. Här slutar den första boken."),
 ('tarwins-gap', "Tarwin's Gap", 'landmärke', 'Shienar', 7540, 890, "Passet genom Mountains of Dhoom mellan Blighten och Shienar. Här rider Lan med Malkieri i Sista striden."),
 ('malkier', 'Malkier (Seven Towers)', 'ruin', 'Malkier', 7150, 1018, "Lans förlorade kungarike, uppslukat av Blighten när han var spädbarn. Seven Towers var dess huvudstad."),
 ('canluum', 'Canluum', 'stad', 'Kandor', 5619, 1350, "Kandorisk stad där Moiraine och Lan möts för första gången i New Spring."),
 ('watch-hill', 'Watch Hill', 'by', 'Andor (Two Rivers)', 3215, 3331, "By i Two Rivers norr om Emond's Field. Därifrån kommer hjälpen i slutstriden om Two Rivers."),
 ('taren-ferry', 'Taren Ferry', 'by', 'Andor (Two Rivers)', 3236, 3282, "Färjeläget vid Taren där sällskapet lämnar Two Rivers i den första boken."),
 ('black-tower', 'Svarta tornet', 'landmärke', 'Andor', 5530, 3590, "~ Asha'mans högkvarter på en gård utanför Caemlyn, grundat av Rand och lett av Mazrim Taim."),
 ('aringill', 'Aringill', 'stad', 'Andor', 5984, 3689, "Andorisk flodstad vid Erinin, mitt emot Maerone."),
 ('braem-wood', 'Braem Wood', 'landmärke', 'Andor', 5690, 3360, "Stor skog nordost om Caemlyn. I början av Sista striden strider Elaynes här, Perrin och Ogier här."),
 ('maerone', 'Maerone', 'stad', 'Cairhien', 6003, 3687, "Cairhienisk stad vid Erinin där Band of the Red Hand slår läger."),
 ('stedding-tsofu', 'Stedding Tsofu', 'landmärke', 'Cairhien', 6453, 2969, "Ogier-stedding söder om staden Cairhien."),
 ('haddon-mirk', 'Haddon Mirk', 'landmärke', 'Tear', 6620, 4320, "Stor, tät skog i Tear där upproriska High Lords och Dragonsworn håller till."),
 ('salidar', 'Salidar', 'by', 'Altara', 3685, 4771, "Övergiven by vid Eldar där de upproriska Aes Sedai samlas. Här blir Egwene Amyrlin."),
 ('abila', 'Abila', 'stad', 'Amadicia', 3320, 4381, "Stad i Amadicia där profeten Masema har sitt fäste."),
 ('remen', 'Remen', 'stad', 'Altara', 4397, 4329, "Flodstad vid Manetherendrelle som Perrin, Faile och Loial passerar."),
 ('hinderstap', 'Hinderstap', 'by', 'Murandy', 4693, 3927, "By där invånarna förvandlas till mördare varje natt och allt återställs i gryningen."),
 ('darluna', 'Darluna', 'stad', 'Tarabon', 2143, 2671, "Tarabonsk stad där Rodel Ituralde lurar Seanchan i en fälla."),
 ('natrins-barrow', "Natrin's Barrow", 'landmärke', 'Arad Doman', 2420, 2150, "~ Graendals palats i Arad Doman, som Rand förstör med balefire."),
 ('stedding-shangtai', 'Stedding Shangtai', 'landmärke', 'Spine of the World', 7607, 4712, "Loials hemstedding i Spine of the World."),
 ('tremalking', 'Tremalking', 'landmärke', 'Sea Folk', 800, 5530, "Sea Folks ö där den jättelika stenhanden håller ett klot – en av Choedan Kal."),
]
rows = list(csv.DictReader(open(root / 'data/locations.csv', encoding='utf-8')))
have = {r['id'] for r in rows}
fields = list(rows[0].keys())
for id, namn, typ, land, x, y, besk in P:
    assert id not in have, id
    rows.append(dict(id=id, namn=namn, typ=typ, land=land, x=f'{x / W:.5f}', y=f'{y / H:.5f}',
                     beskrivning=besk.lstrip('~ ')))
with open(root / 'data/locations.csv', 'w', encoding='utf-8', newline='') as f:
    w = csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(rows)

# ---- koppla karaktärernas händelser ----
cp = root / 'data/characters.json'
chars = json.load(open(cp)); by = {c['id']: c for c in chars}
def setp(cid, needle, plats):
    hs = [h for h in by[cid]['handelser'] if needle in h['text']]
    assert len(hs) == 1, (cid, needle, len(hs)); hs[0]['plats'] = plats
def add(cid, bok, text, plats, slag=None):
    h = dict(bok=bok, text=text, plats=plats)
    if slag: h['slag'] = slag
    hl = by[cid]['handelser']; hl.append(h); hl.sort(key=lambda e: e['bok'])
setp('egwene', 'Salidar', 'salidar'); setp('nynaeve', 'Salidar', 'salidar'); setp('siuan', 'Salidar', 'salidar')
setp('lan', 'Rider mot Tarwin', 'tarwins-gap'); setp('lan', 'Håller Tarwin', 'tarwins-gap')
setp('graendal', 'Natrin', 'natrins-barrow')
setp('taim', 'Tar makten över Svarta', 'black-tower'); setp('logain', 'Fängslas av Taim', 'black-tower')
setp('logain', 'Nynaeve helar honom', 'salidar')
setp('perrin', 'Braem Wood', 'braem-wood'); setp('loial', 'Braem Wood', 'braem-wood')
setp('bryne', 'rebellernas här', 'salidar')
ev = [h for h in by['ituralde']['handelser'] if h['bok'] == 11][0]
ev['text'] = "Leder en djärv motoffensiv mot Seanchan i Tarabon och Arad Doman och lurar dem i en fälla vid Darluna."
ev['plats'] = 'darluna'
add('moiraine', 0, "Möter Lan i Canluum. Han blir senare hennes väktare.", 'canluum')
add('lan', 0, "Möter Moiraine i Canluum och blir senare hennes väktare.", 'canluum')
add('moiraine', 1, "Leder sällskapet genom Blighten till Eye of the World.", 'eye-of-the-world')
add('loial', 1, "Följer med genom Blighten till Eye of the World.", 'eye-of-the-world')
add('mat', 1, "Lämnar Two Rivers med Rand och Perrin över floden vid Taren Ferry.", 'taren-ferry')
add('mat', 3, "Reser med Thom nedför Erinin till Aringill på väg till Caemlyn.", 'aringill')
add('mat', 6, "Band of the Red Hand slår läger vid Maerone.", 'maerone')
add('mat', 13, "Rider genom Hinderstap, där byborna blir mördare varje natt.", 'hinderstap')
add('perrin', 8, "Reser till Abila för att få profeten Masema att följa med till Rand.", 'abila')
add("perrin", 3, "I Remen befriar han Aielkrigaren Gaul ur en bur, på väg till Tear med Moiraine, Lan, Loial och Faile.", "remen")
by['lan']['ursprung'] = 'malkier'
by['loial']['ursprung'] = by['loial']['uppvuxen'] = 'stedding-shangtai'
json.dump(chars, open(cp, 'w'), ensure_ascii=False, indent=1)
print(len(rows), 'platser')
