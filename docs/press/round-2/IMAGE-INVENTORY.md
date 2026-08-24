# Round 2 — image inventory and assignment

**No image in this round was generated.** The owner's instruction on 2026-08-25 was to use pictures
already on the site. Every hero, inline and OG file below is a crop of an existing repo photo,
re-encoded locally with PIL. Script: `docs/press/round-2/derive-images.py`.

## What the repo already had

Read, not guessed — every file below was opened and looked at before it was assigned. Filenames on
this repo are only roughly descriptive (`journey-06-testing.webp` is a man nosing oil from a blue
tasting glass; `journey-06-press.webp` is a different, much smaller file).

| Source file | Real pixels | What is actually in the frame | Usable |
|---|---|---|---|
| `HeroAVOliveOilBottleInTheField.png` | 2752×1536 | Brand bottle held on a stone ledge in a sunlit grove, hand at the right edge | ✅ largest source in the repo |
| `OliveGroveSunsetHero.png` | 1672×941 | Old olive tree framing a hillside village and the sea at sunset, olives on stone | ✅ |
| `malaysian-woman-bottle-kampung.webp` | 1536×1024 | Malaysian woman in a hijab holding the bottle, kampung house and olive branch behind | ✅ the only Malaysia-set photo |
| `journey-04-extraction.png` | 1536×1024 | Malaxed olive paste extruding from a mill, green oil pouring into a vat | ✅ |
| `journey-07-bottling.png` | 1376×768 | Bottling line, oil filling a row of dark bottles | ✅ |
| `journey-05-filtering.png` | 1376×768 | Oil pouring from a stainless pipe into an open vat | ✅ |
| `journey-08-final.png` | 1376×768 | Bottle upright on a wooden table, olives and leaves scattered around it | ✅ |
| `journey-06-testing.webp` | 1280×960 | Malaysian man in a songkok nosing oil from a blue tasting glass, flask, sample tubes, microscope | ✅ |
| `FarmerPickingOliveOfTheTreeInTheField.png` | 928×750 | Older farmer in a keffiyeh picking olives by hand beside a wooden crate | ✅ inline only |
| `FarmerPouringOliveOilInTheField.png` | 750×409 | Weathered hands pouring oil from a bottle into a small dipping bowl on a wooden table | ✅ inline only |
| `AVOliveOilInTheField.png` | 750×947 | Bottle on a tree stump, portrait | ❌ a 16:9 crop decapitates the bottle |
| `woman-holding-bottle-nobg.webp` | 895×1277 | Cutout with a transparent background, portrait | ❌ no background to crop |
| `bottle-cutout.png`, `bottle-source-raw.png`, `polaroid-frame.png` | portrait / UI | Cutouts and a frame asset | ❌ |
| `journey-01..06` webp set | 600×450 | Grove, sunset, picking, crates, carrying, press | ❌ too small for a content-width image |
| `src/assets/images/press/*` (30 files) | 1024×576 | Round-1 article imagery | ❌ **spoken for** — each belongs to a round-1 article |

## Assignment — by subject, never by index

Heroes are emitted at exactly **1280×720** because `src/pages/ArticlePage.tsx` L91–92 declares
`width={1280} height={720}`. Round 1 shipped 1024×576 files behind that declaration; this round's
files make the declaration true. Nothing is upscaled — every hero crop is ≥1280 px wide at source.

| Article | Slot | Source | Crop taken | Output |
|---|---|---|---|---|
| `olive-oil-for-cooking` | hero | `journey-08-final.png` | full frame | 1280×720 · 87 KB |
| | inline | `FarmerPouringOliveOilInTheField.png` | full frame | 727×409 · 67 KB |
| `olive-oil-vs-pomace-oil` | hero | `journey-04-extraction.png` | full width, raised to keep the paste chute | 1280×720 · 96 KB |
| | inline | `journey-05-filtering.png` | 70 % width, on the pipe and the stream | 963×542 · 57 KB |
| `olive-oil-smoke-point` | hero | `journey-06-testing.webp` | full width, raised for the head | 1280×720 · 78 KB |
| | inline | `journey-06-testing.webp` | 55 % width, on the flask and sample tubes | 704×396 · 33 KB |
| `minyak-zaitun-habbatus-sauda` | hero | `HeroAVOliveOilBottleInTheField.png` | full frame | 1280×720 · 116 KB |
| | inline | `journey-06-testing.webp` | 70 % width, on the hands and the blue glass | 896×504 · 39 KB |
| `minyak-zaitun-untuk-salad` | hero | `malaysian-woman-bottle-kampung.webp` | full width, raised | 1280×720 · 130 KB |
| | inline | `journey-08-final.png` | 95 % width, shifted to the scattered olives | 1024×576 · 64 KB |
| `zaitun-dalam-al-quran` | hero | `OliveGroveSunsetHero.png` | full frame | 1280×720 · 164 KB |
| | inline | `FarmerPickingOliveOfTheTreeInTheField.png` | full width, raised to the face and the branch | 928×522 · 123 KB |
| `zayt-alzaytun-kuala-lumpur` | hero | `malaysian-woman-bottle-kampung.webp` | 85 % width, tighter on her and the bottle | 1280×720 · 122 KB |
| | inline | `HeroAVOliveOilBottleInTheField.png` | 80 % width, path and bottle | 1024×576 · 55 KB |
| `sier-zayt-alzaytun-malaysia` | hero | `journey-07-bottling.png` | full frame | 1280×720 · 100 KB |
| | inline | `journey-04-extraction.png` | 55 % width, on the oil stream | 844×475 · 38 KB |
| `hifz-zayt-alzaytun` | hero | `journey-05-filtering.png` | full frame | 1280×720 · 80 KB |
| | inline | `journey-08-final.png` | 55 % width, on the bottle | 756×425 · 28 KB |

Nine OG cards at 1200×630 JPEG, each centre-cropped from that article's own hero so the reader
sees the picture they clicked. 109–145 KB each.

**Reuse rules held:** no hero is repeated inside a language. Four sources carry more than one slot
(`journey-08-final` ×3, `journey-06-testing` ×3, `malaysian-woman-bottle-kampung` ×2,
`HeroAVOliveOilBottleInTheField` ×2, `journey-04-extraction` ×2, `journey-05-filtering` ×2) and
every repeat uses a **different crop box**, so no two articles open on the same frame.

## Three crops were rejected after looking at them

1. **`minyak-zaitun-habbatus-sauda` hero, first attempt** — a 47 %-width crop tight on the bottle.
   It enlarged the product label, and that label is AI-rendered: `Palestinan` is misspelled and
   three bullet lines are gibberish. Unreadable at homepage scale, plainly fake at hero scale.
   Replaced with the full frame, where the label is small.
2. **`minyak-zaitun-untuk-salad` inline, first attempt** — a 62 % crop that made the label line
   *"Rich in Antioxidants"* legible. That is a nutrient-content claim, and enlarging it on a
   Malaysian food page is a compliance risk the site does not currently carry. Widened to 95 %.
3. **`olive-oil-smoke-point` inline, first attempt** — a crop of the grove behind the hero bottle.
   It came out as pure background bokeh with no subject in it, which is the exact failure mode a
   generator produces. A photo can fail that way too if you crop away its subject. Replaced.

## Open flag for the owner

`malaysian-woman-bottle-kampung.webp` and `journey-08-final.png` both show a product label reading
**"Rich in Antioxidants"** and **"100% Natural"**. Both photos are already live on the homepage, so
this round adds no new exposure — but a nutrient-content claim on a label is governed by the
Malaysian nutrient-claim rules, not only by Reg. 18(6), and nobody has confirmed the oil meets the
compositional criteria. Raised here because a content round is where it surfaced. Not changed.
