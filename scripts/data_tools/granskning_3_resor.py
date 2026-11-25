"""Granskningen nov 2026, del 3: resor och datum (godkända av Oskar)."""
import json, pathlib
root = pathlib.Path(__file__).resolve().parents[2]
p = root / 'data/resor.json'; R = json.load(open(p))

def st(cid): return R[cid]['stopp']
def find(cid, plats, bok=None):
    hits = [i for i, s in enumerate(st(cid)) if s['plats'] == plats and (bok is None or s['bok'] == bok)]
    assert len(hits) == 1, (cid, plats, bok, hits); return hits[0]
def ed(cid, plats, b=None, /, **kw):
    s = st(cid)[find(cid, plats, b)]
    for k, v in kw.items():
        if v is None: s.pop(k, None)
        else: s[k] = v
def ins(cid, before, after_plats=None, **stop):
    """Lägg in ett stopp före stoppet `before` = (plats, bok) eller sist om before är None."""
    s = {k: v for k, v in stop.items() if v is not None}
    if before is None: st(cid).append(s)
    else: st(cid).insert(find(cid, *before), s)
def rm(cid, plats, b, /):
    del st(cid)[find(cid, plats, b)]
O = True

# --- återkomsten till Fal Dara: behåll bok 2 men använd datumet då Amyrlin kommer
for c in ('mat', 'rand', 'perrin', 'lan', 'loial'): ed(c, 'fal-dara', 2, datum='998-06-09')
ed('moiraine', 'fal-dara', 2, datum='998-06-08')
# --- portalstenen till Toman Head
ed('mat', 'falme', 2, text="Rand för dem med en portalsten till Toman Head. Mat blåser i Valeres horn i slaget vid Falme.")
ed('perrin', 'falme', 2, text="Rands portalsten tar dem till Toman Head. Strider vid Falme.")
ed('rand', 'falme', 2, text="Han använder en portalsten för att ta dem till Toman Head. Han strider mot Ba'alzamon i himlen över Falme.")
ed('loial', 'falme', 2, text="Rands portalsten tar dem till Toman Head.")
ed('verin', 'falme', 2, text="Följer med när Rand tar sällskapet med en portalsten till Toman Head.")
# --- Ankomsten till Ebou Dar är i bok 6 och sker genom en portal
for c in ('mat', 'nynaeve', 'elayne', 'thom', 'aviendha', 'birgitte'):
    ed(c, 'ebou-dar', 7, bok=6, satt='portal')
for c in ('nynaeve', 'elayne', 'aviendha'): ed(c, 'ebou-dar', 6, text='Kommer till Ebou Dar för att söka Skålen av vindarna.')
ed('mat', 'ebou-dar', 6, text='Når Ebou Dar med Elayne och Nynaeve för att söka Skålen av vindarna.')
ed('thom', 'ebou-dar', 6, text='Följer Elayne och Nynaeve till Ebou Dar.')
ed('mat', 'salidar', 6, satt='portal')
# --- Caemlyn i bok 8
for c in ('elayne', 'aviendha', 'birgitte'): ed(c, 'caemlyn', 9, bok=8)
ed('aviendha', 'caemlyn', 8, text='Kommer till Caemlyn med Elayne.')
ed('birgitte', 'caemlyn', 8, text='Kommer till Caemlyn med Elayne och blir hennes generalkapten.')
# --- Mat
ed('mat', 'caemlyn', 3, text="Lämnar brevet till Morgase efter att ha hört Gaebril och Comar planera att döda flickorna i Tear.")
ed('mat', 'tear', 3, text="Med Thom nedför Erinin till Tear. Spränger med flit ett hål i Stenen med fyrverkerier och tar sig in.")
ed('mat', 'hinderstap', 13, bok=12, datum='1000-05-15', osaker=O)
ed('mat', 'cairhien', 5, datum='999-09-09')
# --- Rand
ed('rand', 'rhuidean', 4, text="Genom en portalsten till Chaendaer. Går genom glaskolonnerna i Rhuidean och får drakmärkena på armarna.")
ed('rand', 'cold-rocks-hold', 4, text="Gäst hos Rhuarc. Trollocs och draghkar anfaller samma natt, och Rand ger sig genast av mot Alcair Dal.")
ins('rand', ('taien', 5), plats='rhuidean', bok=5, datum='999-07-20', osaker=O, satt='land', text='Samlar klanerna kring Rhuidean innan de går mot Jangai Pass.')
for c in ('rand', 'moiraine', 'lan', 'aviendha', 'rhuarc'): ed(c, 'cairhien', 5, datum='999-09-09')
ed('rand', 'cairhien', 7, datum='1000-01-02')
ed('rand', 'illian', 7, text='Invaderar Illian med Asha\'man och Basheres här och jagar Sammael.')
ed('rand', 'shadar-logoth', 7, datum='1000-01-11')
ins('rand', ('far-madding', 9), plats='illian', bok=7, datum='1000-01-12', satt='portal', text='Återvänder till Illian och kröns med Lagerkronan.')
ins('rand', ('far-madding', 9), plats='ebou-dar', bok=8, datum='1000-02-05', osaker=O, satt='portal', text='Leder ett fälttåg mot Seanchan i Altara, som slutar i kaos.')
ins('rand', ('far-madding', 9), plats='caemlyn', bok=9, datum='1000-02-17', satt='portal', text='Elayne, Aviendha och Min binder honom som väktare.')
ins('rand', ('dragonmount', 12), plats='falme', bok=12, datum='1000-05-28', osaker=O, satt='portal', text='Möter Tuon för att förhandla om fred, men de kommer inte överens.')
ed('rand', 'tar-valon', 13, datum='1000-06-03')
ed('rand', 'maradon', 13, datum='1000-06-25')
i, j = find('rand', 'maradon', 13), find('rand', 'tar-valon', 13); S = st('rand'); S[i], S[j] = S[j], S[i]
# --- Far Madding ca 19 februari, med stopp i Caemlyn innan
for c in ('rand', 'nynaeve', 'lan', 'min'): ed(c, 'far-madding', 9, datum='1000-02-19', osaker=O)
ed('cadsuane', 'far-madding', 9, datum='1000-02-20', osaker=O)
ins('nynaeve', ('far-madding', 9), plats='caemlyn', bok=8, datum='1000-02-08', satt='portal', text='Återvänder med Elayne till Caemlyn.')
ins('lan', ('far-madding', 9), plats='caemlyn', bok=8, datum='1000-02-08', satt='portal', text='Följer Nynaeve till Caemlyn.')
# --- Moiraine och Lan
ed('moiraine', 'emonds-field', 1, datum='998-03-22'); ed('lan', 'emonds-field', 1, datum='998-03-22')
ed('moiraine', 'illian', 3, text='Upptäcker att lord Brend, Illians styresman, är Sammael.')
ed('lan', 'canluum', 0, text='Träffar Moiraine i Kandor. Hon binder honom senare som väktare på en kulle utanför Chachin.')
ed('lan', 'maradon', 11, datum='1000-04-06', text="Nynaeve tar honom till World's End i Saldaea. Han rider österut ensam mot Malkier.")
ins('lan', ('ebou-dar', 7), plats='lugard', bok=7, datum='1000-01-04', osaker=O, satt='land', text='Hos Myrelle i rebellernas läger, där Egwene hittar honom.')
ed('lan', 'ebou-dar', 7, satt='portal', datum='1000-01-08', osaker=O)
# --- Nynaeve
ed('nynaeve', 'tar-valon', 3, text='Får i uppdrag av Amyrlin att jaga Black Ajah tillsammans med Egwene och Elayne.')
ed('nynaeve', 'salidar', 5, satt='flod', text='Reser med Valan Lucas cirkus genom Amadicia och Ghealdan och sedan med båt nedför Eldar till rebellerna i Salidar.')
ins('nynaeve', ('tar-valon', 13), plats='maradon', bok=11, datum='1000-04-06', satt='portal', text="Tar Lan genom en portal till World's End i Saldaea.")
# --- Egwene
ed('egwene', 'tar-valon', 2, satt='flod')
ed('egwene', 'salidar', 6, satt='portal')
ed('egwene', 'tar-valon', 10, bok=8, datum='1000-02-24', osaker=None)
# --- Elayne
ed('elayne', 'falme', 2, text='Följer med Liandrin till Falme. När Egwene blir damane stannar hon med Nynaeve och Min för att befria henne.')
ed('elayne', 'salidar', 5, satt='flod', text='Reser med Valan Lucas cirkus och binder Birgitte som väktare, och tar sedan båt nedför Eldar till Salidar.')
ed('elayne', 'braem-wood', 14, datum='1000-07-11')
ed('elayne', 'field-of-merrilor', 14, datum='1000-07-17')
ins('elayne', ('braem-wood', 14), plats='field-of-merrilor', bok=14, datum='1000-07-10', osaker=O, satt='portal', text='Kommer till mötet vid Merrilor och blir överbefälhavare för Ljusets härar.')
# --- Perrin och Faile
ed('perrin', 'illian', 3, text='I Illian anfaller grå män dem på värdshuset, och Moiraine upptäcker att lord Brend är Sammael.')
for c in ('perrin', 'faile'):
    ins(c, ('cairhien', 6), plats='caemlyn', bok=6, datum='999-11-30', satt='land', text='Rider med Two Rivers-männen till Caemlyn och träffar Failes föräldrar.')
    ed(c, 'cairhien', 6, satt='portal')
ed('perrin', 'cairhien', 6, text='Rand tar honom genom en portal till Cairhien.')
ed('faile', 'cairhien', 6, text='Följer Perrin genom Rands portal till Cairhien.')
ed('perrin', 'abila', 8, datum='1000-02-15', satt='land', text='Konfronterar profeten Masema i Abila. Strax efteråt rövas Faile bort av Shaido.')
ins('perrin', ('abila', 8), plats='jehannah', bok=7, datum='1000-01-06', satt='portal', text='Rand skickar honom genom en portal till Ghealdan för att föra profeten Masema till sig.')
ed('faile', 'abila', 8, plats='jehannah', bok=7, datum='1000-01-06', text='Följer Perrin genom en portal till Ghealdan.')
ins('faile', ('malden', 11), plats='abila', bok=8, datum='1000-02-16', satt='land', text='Rövas bort av Shaido nära Abila.')
ed('faile', 'malden', 11, bok=10, datum='1000-03-04', text="Gai'shain hos Shaido, som slår läger kring Malden, tills Perrin befriar henne.")
ed('faile', 'field-of-merrilor', 14, plats='shayol-ghul', datum='1000-07-17', text="Försöker föra Valeres horn till Mat, men hamnar i Blighten nära Thakan'dar och ger hornet till Olver.")
ins('faile', None, plats='field-of-merrilor', bok=14, datum='1000-07-20', osaker=O, satt='portal', text='Perrin hittar henne bland de sårade efter slaget.')
ed('perrin', 'braem-wood', 14, datum='1000-07-11')
ed('perrin', 'field-of-merrilor', 14, datum='1000-07-14')
ins('perrin', ('braem-wood', 14), plats='field-of-merrilor', bok=14, datum='1000-07-10', osaker=O, satt='portal', text='Är med vid mötet vid Merrilor.')
ed('berelain', 'cairhien', 6, bok=5, datum='999-09-25', osaker=O, satt='land')
ed('berelain', 'abila', 8, plats='jehannah', bok=7, datum='1000-01-06', text='Följer Perrin genom en portal till Ghealdan.')
ins('berelain', ('malden', 11), plats='abila', bok=8, datum='1000-02-15', satt='land', text='Med Perrin hos profeten i Abila.')
ed('berelain', 'jehannah', 13, text='Möter Galad och de dras till varandra.')
ed('morgase', 'malden', 11, bok=10, datum='1000-03-04', text='Tillfångatas av Shaido med Faile och hålls i lägret vid Malden tills Perrin befriar dem.')
# --- Min
ed('min', 'falme', 2, text='Följer med Liandrin till Falme, tas tillfånga av Seanchan men släpps och hjälper sedan Nynaeve och Elayne att befria Egwene.')
ins('min', ('dumais-wells', 6), plats='cairhien', bok=6, datum='999-12-05', satt='portal', text='Följer Rand till Cairhien, där de tas tillfånga av Elaidas sändebud.')
ins('min', ('far-madding', 9), plats='cairhien', bok=7, datum='1000-01-02', satt='portal', text='Tillbaka i Cairhien med Rand.')
ins('min', ('far-madding', 9), plats='caemlyn', bok=9, datum='1000-02-17', satt='portal', text='Binder Rand som väktare tillsammans med Elayne och Aviendha.')
ins('min', ('field-of-merrilor', 14), plats='tear', bok=13, datum='1000-06-10', osaker=O, satt='portal', text='Väntar på Rand i Tear och återförenas med honom.')
# --- Thom
ed('thom', 'salidar', 5, satt='flod')
# --- Övriga
ed('aviendha', 'cold-rocks-hold', 4, text='Lär Rand aielsedvänjor på vägen till Cold Rocks Hold.')
ed('bashere', 'caemlyn', 6, datum='999-10-01', osaker=O)
rm('bashere', 'dumais-wells', 6)
ed('bashere', 'maradon', 13, datum='1000-06-20')
ed('bashere', 'caemlyn', 14, datum='1000-07-09')
ed('bryne', 'tar-valon', 10, bok=8, datum='1000-02-24', osaker=None)
ed('bryne', 'field-of-merrilor', 14, borta='1000-07-18')
ed('siuan', 'tar-valon', 10, bok=8, datum='1000-02-24', osaker=None)
ed('siuan', 'tar-valon', 4, bok=2, text='Återvänder till Tar Valon.')
ins('siuan', ('lugard', 5), plats='tar-valon', bok=4, datum='999-06-24', satt='land', text='Avsätts och stillas av Elaida, men flyr ur tornet.')
for c in ('gawyn', 'galad'): ed(c, 'tar-valon', 4, bok=2)
ed('gawyn', 'tar-valon', 2, text='Följer med Elayne till Tar Valon och tränar hos väktarna.')
ed('galad', 'tar-valon', 2, text='Följer med Elayne till Tar Valon och tränar hos väktarna.')
ins('gawyn', ('dumais-wells', 6), plats='tar-valon', bok=4, datum='999-06-24', satt='land', text='Leder Younglings i tornet när Siuan avsätts.')
ins('galad', ('amador', 5), plats='tar-valon', bok=4, datum='999-06-24', satt='land', text='Lämnar tornet efter Siuans fall.')
ed('galad', 'amador', 5, datum='999-08-18', text='Har gått med i Children of the Light i Amadicia och möter Nynaeve och Elayne i Sienda.')
ed('galad', 'field-of-merrilor', 14, text='Duellerar mot Demandred och förlorar sin svärdsarm vid armbågen.')
ed('galad', 'caemlyn', 14, datum='1000-07-09')
ed('gawyn', 'tar-valon', 12, text='Lämnar Younglings i Dorlan, går till rebellernas läger och hjälper till att rädda Egwene ur tornet under Seanchans anfall.')
ed('elaida', 'tar-valon', 4, datum='999-06-24')
ed('logain', 'tar-valon', 1, bok=2)
ed('logain', 'salidar', 5, text='Kommer till Salidar med Siuan, Leane och Min.')
ed('loial', 'stedding-shangtai', 13, text='Talar inför den stora Stump och ber Ogier att strida i Sista striden.')
rm('loial', 'braem-wood', 14)
ed('cadsuane', 'bandar-eban', 12, text='Förvisas av Rand på lord Tellaens herrgård i Arad Doman.')
ed('fain', 'fal-dara', 1, satt='ways'); ed('fain', 'falme', 2, satt='ways')
ed('fain', 'emonds-field', 4, datum='999-06-12'); ed('verin', 'emonds-field', 4, datum='999-06-12')
ed('graendal', 'natrins-barrow', 12, text='Rand förstör hennes palats med balefire.')
ed('rahvin', 'caemlyn', 4, bok=3)
ed('taim', 'black-tower', 13, bok=7, text="Återvänder till Svarta tornet efter Dumai's Wells.")
ed('tuon', 'ebou-dar', 11, text='Återvänder till Ebou Dar med Karede.')
ed('tam', 'cairhien', 14, datum='1000-07-09')
json.dump(R, open(p, 'w'), ensure_ascii=False, indent=1)

# --- följdändringar i slag, tidslinje och karaktärer
B = json.load(open(root / 'data/battles.json')); S = {b['id']: b for b in B}
S['shayol-ghul']['dag'] = '1000-07-20'; S['maradon']['dag'] = '1000-06-25'
json.dump(B, open(root / 'data/battles.json', 'w'), ensure_ascii=False, indent=1)
T = json.load(open(root / 'data/tidslinje.json'))
for o in T['ogonblick']:
    if o['namn'] == 'Maradon': o['datum'] = '1000-06-25'
json.dump(T, open(root / 'data/tidslinje.json', 'w'), ensure_ascii=False, indent=1)
C = json.load(open(root / 'data/characters.json')); K = {c['id']: c for c in C}
K['bashere']['handelser'] = [h for h in K['bashere']['handelser'] if h.get('slag') != 'dumais-wells']
json.dump(C, open(root / 'data/characters.json', 'w'), ensure_ascii=False, indent=1)
print('klart')
