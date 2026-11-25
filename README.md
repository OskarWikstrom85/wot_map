# Westlands-kartan

En personlig, interaktiv karta över Wheel of Time-böckerna: zoombar karta i två lager (original och målad), klickbara nationer, ett karaktärsbibliotek, ett slagbibliotek och animerade slag i Rome: Total War-stil.

Publicerad som Claude-artefakt (privat): https://claude.ai/artifact/UGm89igRE3woNnDP7DEdSi

Delade slagsidor:
- Slaget om Two Rivers: https://claude.ai/artifact/4dw4Ny1XEZcmQWZMNWGeTw
- Andra slaget om Cairhien: https://claude.ai/artifact/NAz9wAZ2eFrfKTN2gf3UTF

## Mappar

| Mapp | Innehåll |
|---|---|
| `site/` | Den färdiga sidan: `index.html`, kartplattor (`tiles/`, `tiles-malad/`, `tiles-detaljer/`) och slagsanimationerna i `slag/` (HTML + video). Det är den här mappen som publiceras. |
| `src/` | Källkod: sidmallen `index.template.html` och slagsanimationerna i `src/slag/`. Two Rivers är mallen; nya slag ligger i egna mappar (`src/slag/cairhien/`) med `paint.js`, `svg.js`, `scenes.js` och `config.json`. |
| `data/` | Platser (`locations.csv`), nationsgränser (`nations.json`), karaktärer (`characters.json`) och slag (`battles.json`). |
| `scripts/` | Byggskript, se nedan. |

## Bygga

Kräver Python 3 med Pillow, numpy, scipy, opencv och scikit-image, samt Playwright med Chrome för export och video.

```bash
# Sidan (läser data/ och src/index.template.html, kontrollerar alla länkar mellan karaktärer, slag och platser)
python3 scripts/build_page.py

# Ett nytt slag från Two Rivers-mallen
python3 scripts/make_battle_page.py cairhien

# Slagsida med bildberättelse (kräver att src/slag serveras på localhost:8765)
python3 scripts/build_export.py two-rivers
python3 scripts/build_export.py cairhien
```

Kartlagren (görs sällan, tar lång tid):

```bash
python3 scripts/make_tiles.py            # originalkartan -> site/tiles
python3 scripts/prepare_masks.py          # analys av originalkartan -> out/masks
python3 scripts/render_chunks.py 2 0 56   # det målade lagret i bitar -> out/chunks
python3 scripts/make_tiles_from_chunks.py # -> site/tiles-malad
python3 scripts/details_overlay.py && python3 scripts/make_overlay_tiles.py  # namn och detaljer -> site/tiles-detaljer
python3 scripts/nations.py                # nationsgränser -> data/nations.json
```

### Aielöknen

Källkartan slutar vid Spine of the World. Öknen öster om den (3 200 källpixlar, x > 1 i
`locations.csv`) är egenritad efter böckernas och wikins beskrivningar och därför ungefärlig:

```bash
python3 scripts/extend_waste.py            # utökar maskerna i out/masks/ (läser källkartans i out/masks_west/)
python3 scripts/render_chunks.py 2 0 84    # målar nya bitar (öken, dyner, Great Rift)
python3 scripts/make_tiles_from_chunks.py site/tiles-malad
python3 scripts/extend_details.py          # namn, Silk Path och ram i detaljlagret
python3 scripts/make_overlay_tiles.py out/details.png site/tiles-detaljer
python3 scripts/original_east.py           # originalkartan + platt öken i samma stil
python3 scripts/make_tiles.py out/original_med_oknen.png site/tiles 4
```

`out/` (mellanresultat, ca 500 MB) och `package/` (Leaflet) ingår inte i repot och återskapas av skripten.

## Källor

Originalkartan är Westlands-kartan av Adam Whitehead. Texterna om karaktärer och slag är egna sammanfattningar baserade på böckerna, Wheel of Time-wikin, Dragonmount och Reactor/Tor.com. Projektet är för privat bruk.

## Publicering

Mappen `site/` publiceras automatiskt till GitHub Pages
(https://oskarwikstrom85.github.io/wot_map/) vid varje push till `main`
som ändrar `site/`. Flödet finns i `.github/workflows/pages.yml` och kan
också startas manuellt under fliken Actions.
