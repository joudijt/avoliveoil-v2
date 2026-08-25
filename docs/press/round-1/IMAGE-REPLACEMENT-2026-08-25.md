# Round 1 English — generated imagery replaced with the repo's own photography

**2026-08-25.** Five round-1 English articles still carried the generated stock renders round 1
shipped: a jug of oil, three anonymous bottles, a bowl of oil, a green blob, a basket of olives.
None of them showed the real product, the real grove or the real people, and every one was
1024×576 behind `ArticlePage.tsx`'s `width={1280} height={720}` declaration.

All fifteen files below — five heroes, five inlines, five OG cards — are now crops of photos
already in this repo. **Zero images were generated.** Nothing is upscaled: every hero box is at
least 1280 px wide at source and every card box at least 1200 px. Reproduce with
`python docs/press/round-1/derive-images-replacement.py`.

## Assignment — by subject

| Article | Slot | Source | Crop taken | Output |
|---|---|---|---|---|
| `what-cold-pressed-olive-oil-really-means` | hero | `journey-05-filtering.png` | full frame, oil running from the pipe into the vat | 1280×720 · 66 KB |
| | inline | `journey-04-extraction.png` | on the mill mouth, paste and the oil stream | 1024×576 · 47 KB |
| | og | `journey-05-filtering.png` | same frame, card aspect | 1200×630 · 117 KB |
| `how-to-compare-olive-oil-brands-in-malaysia` | hero | `journey-06-testing.webp` | mid band, raised for headroom over the songkok | 1280×720 · 68 KB |
| | inline | `journey-04-crates.webp` | full frame, crates of freshly picked olives | 600×450 · 114 KB |
| | og | `journey-06-testing.webp` | same frame, card aspect | 1200×630 · 110 KB |
| `is-olive-oil-halal-what-to-check-in-malaysia` | hero | `malaysian-woman-bottle-kampung.webp` | full width, lowered band | 1280×720 · 131 KB |
| | inline | `journey-06-press.webp` | full frame, olives on the chute into the press | 600×450 · 20 KB |
| | og | `malaysian-woman-bottle-kampung.webp` | same frame, card aspect | 1200×630 · 148 KB |
| `olive-oil-price-in-malaysia-what-you-are-paying-for` | hero | `journey-07-bottling.png` | full frame, the filling line | 1280×720 · 82 KB |
| | inline | `FarmerPouringOliveOilInTheField.png` | full frame, oil poured into a stoneware bowl | 750×409 · 44 KB |
| | og | `journey-07-bottling.png` | same frame, card aspect | 1200×630 · 137 KB |
| `palestinian-olive-oil-what-makes-it-different` | hero | `OliveGroveSunsetHero.png` | centre box — the tree, the village, the sea, olives on the ledge | 1280×720 · 177 KB |
| | inline | `FarmerPickingOliveOfTheTreeInTheField.png` | full width, raised to the face and the branch | 928×522 · 80 KB |
| | og | `OliveGroveSunsetHero.png` | same frame, card aspect | 1200×630 · 149 KB |

All thirty-five `alt` strings (one hero + six repeats of each inline) were rewritten to describe
what is actually in the new frame. The old alt text described the generated scenes.

## Three assignments were rejected after looking at them

1. **`halal` hero, first attempt** — a 1280-wide crop of `malaysian-woman-bottle-kampung.webp`,
   taken pixel-for-pixel with no downscale. It enlarged the product label until **ORGANIC** and the
   bullet fine print under it were legible: an unverified organic claim plus the nutrient-content
   line the round-2 and round-3 heroes were rejected for. Replaced with a full-width box that
   downscales 1536→1280, so the label is *smaller* than in the source photo the site already
   publishes and the fine print is illegible.
2. **`compare-brands` inline, first attempt** — a crop of `AVOliveOilInTheField.png` on the bottle.
   The whole label came out readable, including "Natural Organic", "Rich in antioxidants" and
   "No additives". Same rejection, worse. Dropped the frame entirely and moved to the crates.
3. **`compare-brands` hero, first attempt** — band at y=120 on `journey-06-testing.webp` cut the
   top off the songkok. Raised to y=40.

## Frame reuse, recorded rather than hidden

The pool is still the nine frames [round 3's inventory](../round-3/IMAGE-INVENTORY.md) enumerates. These five
articles deliberately took the frames English had used least: `malaysian-woman-bottle-kampung` and
`OliveGroveSunsetHero` had **no** English hero before this, and `journey-05`/`journey-06`/
`journey-07` had one each. Where a frame was already an English hero, this round takes the full
frame downscaled to 1280×720 rather than a 1280-wide crop, which is a visibly wider field of view,
not a 96-px shift.

Round 4 still needs a real photo shoot — nothing here changes that.
