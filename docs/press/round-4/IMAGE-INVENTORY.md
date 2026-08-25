# Round 4 — image inventory and assignment

**The pool ran out two rounds ago and the free generator cannot fill the gap.** That is the
finding of this round, and it is worth more than the images themselves.

Round 1 generated its imagery. Round 2 was reuse-only. Round 3 needed eighteen heroes from nine
usable frames and generated four. Round 4 needed eighteen heroes and eighteen inlines from the
same nine frames, so generation was planned for eleven heroes and eleven inlines.

## What the generator actually did

The first pass ran five kitchen still lifes. **Four came back unusable:**

| Asked for | Came back |
|---|---|
| four ramekins of different cooking fats | three white dishes of yellow paste, like devilled eggs |
| a round olive oil cake, a jug of oil and two lemons | a white teacup of cream on a saucer, no cake |
| a spoon of solid coconut oil beside a pool of olive oil | a fried egg on a wooden plate |
| a jar of oil with garlic bulbs and loose cloves | a jar of pale lumps that do not read as garlic |
| two glass bowls, one green oil one white coconut oil | correct, and shipped |

This is the same failure round 3 recorded ("a bowl of lemons for a bowl of oil with a whisk,
twice; a pan of green liquid with pink onion rings"), at a worse rate. **The provider cannot
stage a kitchen scene**, and no amount of prompt wording fixed it.

## The change that worked

Round 3's note said groves, bottles and lab benches worked first time. Pass 2 rewrote every
prompt to be **bottle-led, grove-led or equipment-led** — the same articles, a different subject.
Every retry came back usable:

| Article | Pass 1 prompt | Pass 2 prompt | Result |
|---|---|---|---|
| `olive-oil-substitute` | four ramekins of fats | a row of oil bottles on a kitchen shelf | usable |
| `garlic-infused-olive-oil` | a jar of oil with cloves | a glass bottle of oil with whole garlic bulbs beside it | usable |
| `olive-oil-for-baking` | a cake, a jug and lemons | a bottle of oil beside a bowl of flour and two lemons | usable |
| `minyak-zaitun-vs-minyak-kelapa` | a spoon of coconut oil | a bottle of oil beside a halved coconut | usable |

**The rule that comes out of it: name an object, not a scene.** A bottle on a surface is a
still life the model can build. A cook's worktop mid-task is a situation, and it returns
whatever object it has most often seen near those words.

## Inlines are no longer generated at all

Pass 1's failure rate made eleven generated inlines a bad bet, so **every inline in this round is
a repo photo**, including for articles whose subject the repo cannot show. Where a frame is not
literally the article's subject it is the most generic on-brand photo available — which Stage 4
explicitly allows — and **the alt text describes what is actually in the frame**, never what the
brief asked for. That is D26 applied to reuse rather than to generation.

Inlines carry no declared width or height in `ArticleBody.tsx`, so a 600×450 source is honest
here where it could not be a hero. That unlocked six frames the round would otherwise have had no
use for: `journey-01-grove`, `journey-02-sunset`, `journey-03-picking`, `journey-04-crates`,
`journey-05-carrying` and `journey-06-press`.

## Assignment

Heroes are exactly **1280×720**, which is what `ArticlePage.tsx` L91–92 declares. No crop is
upscaled: every hero box is at least 1280 px wide at source, every card box at least 1200 px.
Generated heroes come back 1024×576 from the provider whatever size is requested, so they are
resampled to 1280×720 locally before shipping.

| Article | Lang | Hero | Inline | OG card |
|---|---|---|---|---|
| `olive-oil-vs-coconut-oil` | en | **generated** — two glass bowls, green oil and white coconut oil | `journey-08-final` | `journey-08-final` |
| `garlic-infused-olive-oil` | en | **generated** — a bottle of oil with garlic bulbs | `HeroAVOliveOilBottleInTheField` right | `HeroAVOliveOilBottleInTheField` |
| `olive-oil-substitute` | en | **generated** — a row of oil bottles on a shelf | `journey-04-extraction` | `journey-04-extraction` |
| `olive-oil-for-baking` | en | **generated** — a bottle, a bowl of flour, two lemons | `OliveGroveSunsetHero` | `journey-08-final` |
| `olive-oil-bottle-size` | en | `journey-07-bottling`, right box | `journey-07-bottling` upper left | same frame |
| `olive-oil-bitter-taste` | en | `journey-06-testing`, lower band | `journey-06-testing`, on the blue glass | same frame |
| `minyak-zaitun-vs-minyak-kelapa` | ms | **generated** — a bottle beside a halved coconut | `journey-05-filtering` | `journey-05-filtering` |
| `minyak-zaitun-palsu` | ms | `journey-06-testing`, upper-mid band | `journey-06-testing`, on the sample tubes | same frame |
| `rasa-minyak-zaitun` | ms | **generated** — a glass bowl of green oil on wood | `journey-06-press` | `journey-06-testing` |
| `beli-minyak-zaitun-online` | ms | **generated** — a bottle on kraft paper beside a box | `journey-05-carrying` | `journey-07-bottling` |
| `minyak-zaitun-tulen` | ms | `journey-04-extraction`, middle band | `journey-05-filtering` | same frame |
| `minyak-zaitun-untuk-kek` | ms | **generated** — a bottle of oil on a kitchen table | `journey-01-grove` | `OliveGroveSunsetHero-ar` |
| `mawsim-qitaf-alzaytun` | ar | **generated** — harvest nets under an olive tree | `FarmerPickingOliveOfTheTreeInTheField` | `OliveGroveSunsetHero` |
| `zayt-alzaytun-almukarrar` | ar | `journey-05-filtering` — generated twice and rejected twice | `journey-02-sunset` | `journey-04-extraction` |
| `zayt-zaytun-baladi` | ar | `OliveGroveSunsetHero-ar`, left box | `FarmerPouringOliveOilInTheField` | same frame |
| `afdal-zayt-zaytun` | ar | **generated** — a laboratory bench with sample flasks | `journey-04-crates` | `journey-06-testing` |
| `zayt-alzaytun-balad-almansha` | ar | `OliveGroveSunsetHero`, full frame downscaled | `journey-03-picking` | same frame |
| `zujajat-zayt-alzaytun` | ar | `journey-08-final`, left box | `journey-07-bottling` lower right | same frame |

## Frame reuse, recorded rather than hidden

`journey-06-testing` carries three heroes and two inlines across this round and the last, at five
different crop boxes. `journey-07-bottling` carries two heroes and two inlines. That is what an
exhausted pool looks like on a fourth round, and shifting a box by 96 px does not make it
something else.

**Round 5 cannot be run on this pool.** The honest options are a photo shoot or a paid generator
that can stage a kitchen. This is an owner decision, not something a content round can absorb.

## Two frames the review removed after the assignment was made

1. **`malaysian-woman-bottle-kampung.webp` left the round entirely.** The Malay reviewer opened the
   derived inline and read the product label off it: "ORGANIC", and the bullet line under it. At the
   768 px the article column actually gives the image, the brand and "ORGANIC" are legible. This is
   the **fourth** time this repo has rejected a crop for making that label readable, and the first
   time it was caught by a reviewer rather than by the person cropping. One inline and two OG cards
   were re-derived from other photos.

   The rule that follows: **a frame containing the product bottle needs the label checked at the
   rendered width, not at the crop's own pixel size.** A downscale is not automatically safe.

2. **`olive-oil-bitter-taste`'s hero was byte-identical to a live article's hero.** The crop box in
   this file matched round 3's `taem-zayt-alzaytun` box exactly — same source, same numbers — so the
   two files hashed the same. Nothing in the pipeline compares output hashes; the reviewer found it.
   Re-cropped, and the new box also keeps the songkok in frame, which the old one had cut off.

   **Add a hash check to Stage 4.** Two identical files on two live pages is invisible to every
   other gate in this repo.

