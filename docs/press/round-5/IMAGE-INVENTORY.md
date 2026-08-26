# Round 5 — image inventory and assignment

Round 4 concluded that object-led prompts fixed the free generator: every one of its ten retries
came back usable once the prompt named a bottle, a grove or a bench instead of a scene.

**That did not reproduce.** Round 5 ran twelve heroes on prompts written to exactly that rule and
**four came back unusable**:

| Article | Asked for | Came back |
|---|---|---|
| `aglio-e-olio` | a bottle beside dried spaghetti and garlic bulbs | a green jar and a bundle of spring onions |
| `olive-oil-vs-avocado-oil` | a bottle beside a whole avocado | a jug and two cucumbers |
| `olive-oil-for-grilling` | a bottle and a basting brush by a grill pan | a grill pan holding a dish of chopped greens, no oil |
| `zayt-alzaytun-lilmuajanat` | a bottle, a ball of dough, a floured table | a wooden bowl holding one lime |

The finding for the flow: **the free provider's quality is not stable across days.** A prompt shape
that scored 10/10 in one session scored 8/12 in the next, on the same machine and the same provider.
Round 4's rule is still worth following — it is better than the alternative — but it is not a
guarantee, and a round must budget for looking at every frame and having a repo fallback ready.
The four rejects took repo frames instead, which cost nothing.

## The label rule, now enforced in code

This round hit the product-label rejection for the **fifth** time, and on four heroes at once:
`journey-08-final.png` and `HeroAVOliveOilBottleInTheField.png` both put the bottle large enough in
frame that "ORGANIC" and the bullet line under it read clearly at 1280 px. One inline crop showed
the whole label including "Rich in antioxidants".

Remembering this has failed four rounds running, so it is now an assertion:

```python
NO_HERO = {"journey-08-final.png", "HeroAVOliveOilBottleInTheField.png"}
...
assert s not in NO_HERO, f"{s} cannot be a hero — the product label reads at 1280px"
```

plus the existing `BANNED` set for the three frames that cannot be used at any size. **A frame that
contains the product bottle is judged at the width the template renders it, not at the crop's own
pixel size.** A downscale is not automatically safe.

⚠️ Note for the owner: `journey-08-final` **is already live as a hero** on three articles from
rounds 2–4 (`olive-oil-for-cooking`, `extra-virgin-olive-oil-salad-dressing`, `zujajat-zayt-alzaytun`).
Those were not re-cut in this round. If the label line matters, they need re-cropping.

## The hash check paid for itself immediately

Round 4 recommended it; round 5 implemented it, and it failed on the **first run** with two
collisions against **live** files:

- `minyak-zaitun-vs-minyak-sawit-hero` was byte-identical to the live `minyak-zaitun-untuk-goreng-hero`
  — round 3 had used the same box on the same source.
- `olive-oil-for-hummus-inline` was byte-identical to the live `zayt-zaytun-baladi-inline` — round 4
  had used that frame at full size.

A third collision appeared after the first fix, between two OG cards. All three are resolved and the
script now asserts across all 237 image files in the repo, not just the round's own.

## Assignment

Heroes are exactly 1280×720. Nothing is upscaled. Eight heroes are generated, ten are repo crops,
and **every inline and every OG card is a repo photo**.

| Article | Lang | Hero | Inline | OG card |
|---|---|---|---|---|
| `aglio-e-olio` | en | `journey-04-extraction` (generation rejected) | `journey-04-extraction` upper | same frame |
| `olive-oil-vs-avocado-oil` | en | `OliveGroveSunsetHero-ar` (generation rejected) | `FarmerPickingOliveOfTheTreeInTheField` | `HeroAVOliveOilBottleInTheField` |
| `olive-oil-and-balsamic` | en | **generated** — two bottles, one pale one dark | `journey-08-final` | `journey-08-final` |
| `olive-oil-for-hummus` | en | **generated** — a bowl of hummus | `FarmerPouringOliveOilInTheField` | `OliveGroveSunsetHero-ar` |
| `olive-oil-for-grilling` | en | `OliveGroveSunsetHero-ar` (generation rejected) | `journey-07-bottling` | same frame |
| `cloudy-olive-oil` | en | `journey-07-bottling` | `journey-05-filtering` | same frame |
| `minyak-zaitun-vs-minyak-sawit` | ms | `journey-06-testing` | `journey-06-press` | same frame |
| `minyak-zaitun-untuk-pasta` | ms | **generated** — dried pasta, a bottle and chillies | `journey-01-grove` | `journey-04-extraction` |
| `minyak-zaitun-keruh` | ms | `journey-04-extraction` | `journey-05-filtering` | same frame |
| `minyak-zaitun-untuk-ikan-bakar` | ms | **generated** — a bottle on a banana leaf | `journey-05-carrying` | `journey-07-bottling` |
| `minyak-zaitun-untuk-air-fryer` | ms | **generated** — bottles on a kitchen counter | `journey-04-crates` | `journey-05-filtering` |
| `minyak-zaitun-untuk-roti` | ms | `OliveGroveSunsetHero` | `HeroAVOliveOilBottleInTheField` (bottle out of frame) | same frame |
| `anwae-alzaytun` | ar | **generated** — olives spread on a wooden table | `journey-03-picking` | `OliveGroveSunsetHero` |
| `zayt-alzaytun-walzaatar` | ar | **generated** — a bowl of dried green herb | `OliveGroveSunsetHero-ar` | same frame |
| `zayt-alzaytun-lilmuajanat` | ar | `journey-05-filtering` (generation rejected) | `journey-02-sunset` | `journey-04-extraction` |
| `zayt-alzaytun-lilshawi` | ar | `journey-07-bottling` | `journey-07-bottling` lower | same frame |
| `tajmid-zayt-alzaytun` | ar | `journey-06-testing` | `journey-08-final` | same frame |
| `zayt-alzaytun-fi-ramadan` | ar | **generated** — a table with a bottle and small dishes | `OliveGroveSunsetHero` | same frame |

**Round payload: 54 files, 4.4 MB** against the 6 MB ceiling of D12.

Eleven alt texts were rewritten to the frame that actually shipped, per D26.

## The pool, five rounds in

`journey-06-testing` now carries seven crops across four rounds; `journey-07-bottling` six;
`journey-05-filtering` seven, and that frame has 96 px of crop freedom, so its boxes are now
within a few percent of each other. **The next round cannot be cut from this pool.** A photo
shoot is the only thing that changes it — a paid generator would help with kitchen subjects but
not with the product itself, which is what the site actually needs to show.
