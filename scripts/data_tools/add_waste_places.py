"""Platser i Aielöknen (den ritade remsan öster om källkartan) och kopplingar till händelser.
Lägena är rekonstruerade efter böckerna: Rhuidean ca 13–14 dagars snabbmarsch från Jangai Pass,
Taardads land nordost om Rhuidean, Alcair Dal några dagar norr om Cold Rocks Hold."""
import csv, json, pathlib
root = pathlib.Path(__file__).resolve().parents[2]
W, H = 8000, 6177
P = [
 ('taien', 'Taien', 'by', 'Aielöknen', 7851, 2444, "Jindo Taardads fäste där Jangai Pass möter öknen. Shaido bränner det på väg mot Cairhien."),
 ('chaendaer', 'Chaendaer', 'landmärke', 'Aielöknen', 8545, 3255, "Berget ovanför Rhuidean-dalen, där män och kvinnor väntar på att få gå ned till staden."),
 ('rhuidean', 'Rhuidean', 'stad', 'Aielöknen', 8610, 3385, "Öknens enda stad, byggd av Jenn Aiel. Här går blivande hövdingar och visa kvinnor genom glaskolonnerna och ser sitt folks historia. Efter Rand fylls dalen av en sjö."),
 ('cold-rocks-hold', 'Cold Rocks Hold', 'by', 'Aielöknen', 8980, 3050, "Rhuarcs fäste för Nine Valleys sept av Taardad Aiel."),
 ('alcair-dal', 'Alcair Dal', 'landmärke', 'Aielöknen', 9050, 2620, "Skålformad kanjon där klanhövdingarna möts. Här avslöjar Rand Aiels sanna historia och Couladin bryter med honom."),
 ('termool', 'Termool', 'landmärke', 'Aielöknen', 9450, 4870, "De vattenlösa sanddynerna söder om öknen, där ingenting lever."),
 ('great-rift', 'Great Rift', 'landmärke', 'Aielöknen', 10677, 3000, "Den väldiga sprickan och Cliffs of Dawn som skiljer öknen från Shara."),
]
rows = list(csv.DictReader(open(root / 'data/locations.csv', encoding='utf-8')))
fields = list(rows[0].keys()); have = {r['id'] for r in rows}
for id, namn, typ, land, x, y, b in P:
    if id in have: continue
    rows.append(dict(id=id, namn=namn, typ=typ, land=land, x=f'{x / W:.5f}', y=f'{y / H:.5f}', beskrivning=b))
with open(root / 'data/locations.csv', 'w', encoding='utf-8', newline='') as f:
    w = csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(rows)

cp = root / 'data/characters.json'
chars = json.load(open(cp)); by = {c['id']: c for c in chars}
def setp(cid, needle, plats):
    hs = [h for h in by[cid]['handelser'] if needle in h['text']]
    assert len(hs) == 1, (cid, needle, len(hs)); hs[0]['plats'] = plats
def add(cid, bok, text, plats, after=None):
    hl = by[cid]['handelser']
    if any(h.get('plats') == plats and h['bok'] == bok for h in hl): return
    i = max([k for k, h in enumerate(hl) if h['bok'] <= bok], default=-1) + 1
    hl.insert(i, dict(bok=bok, text=text, plats=plats))
setp('rand', 'Går in i Rhuidean', 'rhuidean')
setp('mat', 'dörrkarmen i Rhuidean', 'rhuidean')
setp('moiraine', 'ter\'angreal i Rhuidean', 'rhuidean')
setp('aviendha', 'Kallas till Rhuidean', 'rhuidean')
setp('aviendha', 'glaskolonnerna i Rhuidean igen', 'rhuidean')
setp('egwene', 'Aieliska ödemarken', 'cold-rocks-hold')
add('rand', 4, "Samlar klanhövdingarna i Alcair Dal och avslöjar Aiels sanna historia. Couladin och Shaido bryter med honom.", 'alcair-dal')
add('rand', 5, "Leder Aiel ut ur öknen genom Jangai Pass och hittar Taien bränt av Shaido.", 'taien')
add('rhuarc', 4, "Tar emot Rand vid Chaendaer och för honom till Rhuidean och Cold Rocks Hold.", 'cold-rocks-hold')
json.dump(chars, open(cp, 'w'), ensure_ascii=False, indent=1)
print(len(rows), 'platser')
