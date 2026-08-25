# Round 3 — image inventory and assignment

**The repo's photography ran out this round.** Round 1 generated its imagery, round 2 was told to
reuse the site's own photos and did so for all nine articles. Round 3 needed eighteen heroes at
1280×720 and the repo holds **nine frames wide enough to make one** — two of which have so little
crop freedom (1376 px wide against a 1280 px hero) that a "different crop" moves the frame by 7%
and changes nothing a reader would notice.

So this round is a mix, and the mix is recorded honestly: **14 heroes are crops of repo photos,
4 are generated**, every inline is generated, and every OG card is a repo crop.

## Sources — sizes are the real pixels, descriptions are what is actually in the frame

Descriptions carried forward from round 2, where each file was opened and looked at.

| Source | Real pixels | What is in the frame | Distinct 1280×720 crops it can give |
|---|---|---|---|
| `HeroAVOliveOilBottleInTheField.png` | 2752×1536 | Brand bottle held on a stone ledge in a sunlit grove, hand at the right edge | 2 usable (see rejects) |
| `OliveGroveSunsetHero.png` | 1672×941 | Old olive tree framing a hillside village and the sea at sunset, olives on stone | 2 (left canopy / right village) |
| `OliveGroveSunsetHero-ar.png` | 1672×941 | The same scene as above, Arabic-variant asset | 1 |
| `malaysian-woman-bottle-kampung.webp` | 1536×1024 | Malaysian woman in a hijab holding the bottle, kampung house and olive branch behind | 1 free this round |
| `journey-04-extraction.png` | 1536×1024 | Olive paste extruding from a mill, green oil pouring into a vat | 2 (chute / vat) |
| `journey-06-testing.webp` | 1280×960 | Malaysian man in a songkok nosing oil from a blue tasting glass, flask, sample tubes, microscope | 2 (upper / lower band) |
| `journey-05-filtering.png` | 1376×768 | Oil pouring from a stainless pipe into an open vat | **1** — 96 px of crop freedom |
| `journey-07-bottling.png` | 1376×768 | Bottling line, oil filling a row of dark bottles | **1** |
| `journey-08-final.png` | 1376×768 | Bottle upright on a wooden table, olives and leaves scattered around it | **1** |
| everything else in `src/assets/images` | ≤928 px wide, or a portrait cutout | — | ❌ would upscale |
| `src/assets/images/press/*` (66 files) | 1024×576 / 1280×720 | Round 1 and round 2 article imagery | ❌ spoken for |

## Assignment

Heroes are exactly **1280×720**, which is what `src/pages/ArticlePage.tsx` L91–92 declares.
No crop is upscaled: every box below is ≥1280 px wide at source. Generated heroes come back
1024×576 from the free provider whatever size is requested, and `imgen.py` does **not** resample to the
size you ask it for. The four generated heroes were therefore resampled to 1280×720 locally
before shipping, so the template's declaration is true for all eighteen. Round 1's fifteen
generated heroes are still 1024×576 behind that same declaration — a standing open issue on this
repo, untouched by this round.

| Article | Lang | Hero | Inline | OG card |
|---|---|---|---|---|
| `evoo-salad-dressing` | en | `journey-08-final` full frame | generated | `journey-08-final` |
| `evoo-vs-pure-olive-oil` | en | `journey-04-extraction` upper, on the mill chute | generated | same frame |
| `olive-oil-air-fryer` | en | **generated** | generated | `journey-05-filtering` |
| `olive-oil-marinade` | en | `HeroAVOliveOilBottleInTheField` right two-thirds | generated | same frame |
| `olive-oil-for-bread` | en | `journey-05-filtering` full frame | generated | same frame |
| `olive-oil-shelf-life` | en | `journey-07-bottling` full frame | generated | same frame |
| `minyak-zaitun-untuk-goreng` | ms | `journey-05-filtering`, shifted crop | generated | same frame |
| `minyak-zaitun-pomace` | ms | `journey-04-extraction` lower, on the vat | generated | same frame |
| `cara-simpan-minyak-zaitun` | ms | `OliveGroveSunsetHero` right, village and sea | generated | same frame |
| `botol-minyak-zaitun` | ms | **generated** — three dark green bottles on a shelf | generated | `journey-08-final` |
| `resepi-minyak-zaitun` | ms | `malaysian-woman-bottle-kampung` upper | generated | same frame |
| `minyak-zaitun-vs-minyak-masak` | ms | `journey-06-testing` upper band | generated | same frame |
| `alfarq-bayn-albikr-walmumtaz` | ar | `OliveGroveSunsetHero` left, tree canopy | generated | same frame |
| `taem-zayt-alzaytun` | ar | `journey-06-testing` lower band, flask and tubes | generated | same frame |
| `humudat-zayt-alzaytun` | ar | **generated** — beaker of oil on a lab bench | generated | `journey-06-testing` |
| `zayt-alzaytun-aludwi` | ar | `OliveGroveSunsetHero-ar` right | generated | same frame |
| `zayt-alzaytun-lilsalata` | ar | **generated** — salad bowl on a table, seen from above | generated | `OliveGroveSunsetHero` |
| `zayt-alzaytun-lilqaly` | ar | `HeroAVOliveOilBottleInTheField` full frame | generated | same frame |

**Round payload: 54 files, 3.66 MB** against the 6 MB ceiling of D12.

No hero repeats inside a language. Two frames appear twice across languages with only a small
shift between them — `journey-05-filtering` (en `olive-oil-for-bread`, ms `minyak-zaitun-untuk-goreng`)
— and that is the pool exhaustion showing, not a choice. It is the one place in this round where
two articles open on visibly the same picture.

## Seven crops and generations were rejected after looking at them

The generator produced a usable frame roughly one time in three for kitchen still lifes. Every
rejection below was caught by opening the file, never by a size check.

1. **`cara-simpan` hero, first attempt** — a tight right-hand crop of the field photo. It enlarged
   the product label until **"Natural Organic"** and the AI-rendered bullet lines under it were
   legible. Same rejection as round 2's habbatus hero: an unverified organic claim and visibly fake
   small print. Moved to a different source entirely.
2. **`olive-oil-marinade` hero, first attempt** — the left-hand crop of the same photo came out as
   pure background bokeh with no subject in it. A photo fails this way exactly as a generator does.
   Moved to the right of the frame, where the bottle and hand are.
3. **`olive-oil-air-fryer` hero, first attempt** — a bowl of whole yellow fruit. No air fryer.
4. **`evoo-salad-dressing` hero, two attempts** — asked for a bowl of oil with a whisk, got a glass
   bowl of whole lemons both times. Fell back to the repo's table shot, which is what the writer's
   alt text already described.
5. **`minyak-zaitun-untuk-goreng` hero, two attempts** — a pan of bright green liquid with pink
   onion rings in it. Unusable on a food page. Fell back to the filtering photo.
6. **`minyak-zaitun-vs-minyak-masak` hero, two attempts** — asked for four oils ranging green to
   pale, got three jars of identical yellow, and a composition near-identical to the `botol` hero
   in the same language. Fell back to the tasting-bench photo.

`olive-oil-air-fryer`'s second generation shipped — a green kitchen basket of potato wedges. It is
not literally an air fryer, so **the alt text says what is actually in the frame** rather than what
was asked for. Four alt texts were rewritten this way after their images changed:
`cara-simpan-minyak-zaitun`, `minyak-zaitun-untuk-goreng`, `minyak-zaitun-vs-minyak-masak` and
`olive-oil-air-fryer`.

## What round 4 has to decide

There is no fourth round of heroes in this repo. The nine usable frames are now carrying two or
three articles each, and the free generator is a one-in-three hit rate on anything resembling a
Malaysian kitchen. Round 4 needs either real photography — a short shoot of the bottle in a kitchen,
on a table, beside food — or a decision to pay for image generation. Recorded here so the choice is
made deliberately rather than discovered at Stage 4 again.

Scripts: `derive-images.py` (crops) and `gen-images.py` (generation, sequential, checks the file on
disk rather than the exit code).
