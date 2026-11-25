"""Granskningen nov 2026, del 1: platser, tidslinje, slag och animationer (godkända av Oskar)."""
import csv, json, pathlib, re
root = pathlib.Path(__file__).resolve().parents[2]

# --- platser
p = root / 'data/locations.csv'
rows = list(csv.DictReader(open(p, encoding='utf-8'))); fields = list(rows[0].keys())
L = {r['id']: r for r in rows}
L['darluna'].update(land='Arad Doman', beskrivning='Stad i södra Arad Doman där Rodel Ituralde lurar Seanchan i en fälla.')
L['malden'].update(typ='stad')
L['taien'].update(typ='stad', land='Cairhien', beskrivning='Liten cairhiensk stad med hög mur i östra änden av Jangai Pass. Shaido skövlar den på väg mot Cairhien.')
L['canluum'].update(beskrivning='Kandorisk stad nära Blighten. Strax utanför den, på vägen mot Chachin, möts Moiraine och Lan för första gången i New Spring.')
L['field-of-merrilor'].update(land='Shienar/Arafel')
L['jangai-pass'].update(beskrivning='Det största passet genom Spine of the World, mellan Cairhien och Aielöknen. Både Aielkriget och Shaidos tåg går här.')
L['remen'].update(typ='by', beskrivning='By i Altara vid Manetherendrelle, där Lugard Road korsar floden. Här ansluter Faile till Perrin, Moiraine, Lan och Loial.')
L['tarwins-gap'].update(land='Malkier', beskrivning="Passet där Mountains of Dhoom möter Spine of the World, en gång en del av Malkier. Här rider Lan med Malkieri i Sista striden.")
w = csv.DictWriter(open(p, 'w', encoding='utf-8', newline=''), fieldnames=fields, lineterminator='\n'); w.writeheader(); w.writerows(rows)

# --- tidslinje
p = root / 'data/tidslinje.json'; T = json.load(open(p))
T['bocker']['8'] = '1000-02-24'; T['bocker']['10'] = '1000-03-29'
for o in T['ogonblick']:
    if o['namn'].startswith('Egwene tillfångatas'): o['datum'] = '1000-03-29'
    if o['namn'] == 'Caemlyn faller': o['datum'] = '1000-07-09'
json.dump(T, open(p, 'w'), ensure_ascii=False, indent=1)

# --- slag
p = root / 'data/battles.json'; B = json.load(open(p)); S = {b['id']: b for b in B}
def rep(b, f, old, new):
    assert old in b[f], (b['id'], f, old); b[f] = b[f].replace(old, new)
S['caemlyn']['dag'] = '1000-04-17'; S['caemlyn'].pop('dag_osaker', None)
S['caemlyn-fall']['dag'] = '1000-07-09'
for k in ('caemlyn-fall', 'merrilor', 'shayol-ghul'): S[k]['datum'] = 'Sommaren 1000 NE'
tr = S['two-rivers']
rep(tr, 'betydelse', 'och Faile fick hans löfte om giftermål.', 'och han och Faile hade gift sig strax innan hon red iväg.')
rep(tr, 'betydelse', ' Senare kommer män från Two Rivers att följa honom i flera av seriens stora slag.', '')
f = tr['forlopp'][2]
f['text'] = "När Perrin kom tillbaka var Emond's Field befäst med en palissad av vässade pålar och katapulter, och på ängen vajade en vit fana med ett rött vargshuvud. Folket hyllade honom som Goldeneyes, till Perrins egen förtret."
rep(tr, 'bakgrund', 'tillsammans med Faile, Loial och Gaul', 'tillsammans med Faile, Loial, Gaul och Jungfrurna Bain och Chiad')
fa = S['falme']
rep(fa, 'betydelse', ' Dain Bornhald gav Perrin skulden för sin fars död.', '')
fa['forlopp'][0]['text'] = fa['forlopp'][0]['text'].replace('Verin skickade in Rand, Mat, Perrin, Ingtar och Hurin i Falme.', 'Rand, Mat, Perrin, Ingtar och Hurin tog sig in i Falme.')
fa['senare'].insert(0, {'bok': 3, 'text': 'Dain Bornhald ger Perrin skulden för sin fars död och svär att hämnas.'})
ma = S['malden']
rep(ma, 'betydelse', ' och Masema dödades kort därefter. Tylee befordrades och upphöjdes till Blodet.', '.')
ma['senare'].insert(0, {'bok': 12, 'text': 'Masema dödas kort efter slaget. Tylee befordras och upphöjs till Blodet.'})
sw = S['shining-walls']
sw['ingress'] = 'Aielkrigets avgörande slag, utkämpat i snön kring Tar Valon. Samma dagar föds Draken på nytt på Dragonmounts sluttning.'
rep(sw, 'bakgrund', 'Janduin, ledare för Taardad-klanens Iron Mountain-sept, krävde hämnd.', 'Janduin, klanhövding för Taardad och av Iron Mountain-septen, krävde hämnd.')
rep(sw, 'bakgrund', 'Kriget drog sedan vidare genom Tear och Andor.', 'Kriget drog sedan vidare västerut över Plains of Maredo och genom Braem Wood och Caralain Grass.')
rep(sw['forlopp'][3], 'text', " Där hittade Tam al'Thor, då soldat i Illians tjänst, ett nyfött barn i en död kvinnas famn.", '')
rep(sw, 'betydelse', ' Tam tog med sig pojken hem till Two Rivers och gav honom namnet Rand.', '')
sw['senare'].insert(0, {'bok': 1, 'text': "Nära Dragonmount hittade Tam al'Thor, då soldat i Illians tjänst, ett nyfött barn i en död kvinnas famn. Han tog med sig pojken hem till Two Rivers och gav honom namnet Rand."})
st = S['stone-of-tear']
rep(st, 'betydelse', 'Det öppnade vägen till Rhuidean och Aiel i nästa bok.', 'Rhuarc visade drakmärket på sin arm, som klanhövdingar får i Rhuidean.')
tv = S['tar-valon']
rep(tv, 'betydelse', ' Några Bloodknives stannade gömda i tornet och fortsatte mörda systrar.', '')
tv['senare'].insert(0, {'bok': 13, 'text': 'Några Bloodknives stannar gömda i tornet och fortsätter mörda systrar.'})
rep(S['merrilor'], 'betydelse', 'Min upphöjdes till Blodet sedan hon räddat Fortuona från en Sharansk kanaliserare.', 'Min räddade Fortuona från en lönnmördare och blev hennes Truthspeaker.')
json.dump(B, open(p, 'w'), ensure_ascii=False, indent=1)

# --- animationer
p = root / 'src/slag/two-rivers.html'; s = open(p).read()
for old, new in [
    ("size: 'Fyra: Perrin, Faile, Loial och Gaul'", "size: 'Sex: Perrin, Faile, Loial, Gaul, Bain och Chiad'"),
    ('befäst under en röd fana med vargshuvud', 'befäst under en vit fana med ett rött vargshuvud'),
    ('Hon går med på det bara om han lovar att gifta sig med henne.', 'Hon går med på det bara om de gifter sig först – och de vigs genast inför Kvinnokretsen.'),
]:
    n = s.count(old); assert n, old; s = s.replace(old, new)
open(p, 'w').write(s)
p = root / 'src/slag/cairhien/scenes.js'; s = open(p).read()
old = 'röda pannband med Drakens tecken'; assert old in s
open(p, 'w').write(s.replace(old, 'röda pannband med en svartvit skiva, det gamla Aes Sedai-tecknet från Rands fana'))
print('klart')
