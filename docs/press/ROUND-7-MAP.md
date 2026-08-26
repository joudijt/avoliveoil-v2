# PRESS round 7 — keyword map

Pulled **2026-08-26** from Google Keyword Planner (`KeywordPlanIdeaService`) through the Google Ads
MCP, account `9254118864`, geo **2458 (Malaysia)**, languages 1000 (English), 1102 (Malay),
1019 (Arabic).

**Size: 6 per language, 18 in all** — same as rounds 3–6.

Cannibalisation checked against all **99** live article ids at Stage 1.

---

## What the market looks like on the seventh pass

**English kept moving further from the product and into fat-comparison and quirky-dish territory.**
Two new seed-oil comparisons the site had never targeted — `olive oil vs sunflower oil` (40/mo,
cluster ≈110, LOW) and `olive oil vs sesame oil` (30/mo, cluster ≈90, LOW) — plus three trend/dish
seeds: `olive oil coffee` (40/mo, cluster ≈100 — the "oleato" trend), `olive oil ice cream` (40/mo,
cluster ≈110), `olive oil orange cake` (20/mo, cluster ≈40) and `olive oil mashed potatoes`
(10/mo, cluster ≈70, "instead of butter" framing).

**A large cluster was found and excluded on sight: hair.** `olive oil to hair` alone is **720/mo,
HIGH**, with `extra virgin olive oil for hair` (140), `olive oil benefits for hair` (90) and a
`hair growth` sub-family (50 each) on top — an order of magnitude above anything else this round
found. Same reasoning as round 6's skin/soap exclusion: cosmetic use, a different product category
from a food brand's catalogue, outside this flow's scope regardless of volume.

**A second cluster was found and excluded for a different reason: infant feeding.** Arabic
`زيت الزيتون للرضع` ("olive oil for infants") returned real signal — 10/mo on the head term, plus
`أضرار شرب زيت الزيتون للرضع` ("harms of infants drinking olive oil") and a "which month" variant,
each 10/mo. This is not a scope call like hair — it is a **paediatric safety question** (aspiration
risk, what and when to introduce to an infant) that belongs to a doctor, not a retailer's content
round, and answering it with any specificity is a real-world risk regardless of legal ceiling.
Excluded outright.

**A third candidate was checked and rejected as cannibalisation, not excluded on scope.**
`olive oil dipping sauce for bread` (40/mo, MEDIUM, cluster ≈120 with the balsamic variants) reads
like a natural fit but the live `olive-oil-for-bread` already owns the dipping-saucer intent and
`olive-oil-and-balsamic` already owns the balsamic ratio — a new article would compete with both
for the same term.

**A fourth candidate — `olive oil gift set` and its ten-variant cluster (~150/mo combined, mostly
HIGH)** — was checked and rejected: retail/gift-shopping intent for a seller who does not sell gift
sets or bundles, and no informational angle distinct from the existing product pages.

**Malay is at the floor for a fourth consecutive round.** Every seed returned 0/mo except
`kopi minyak zaitun` (10) and `minyak zaitun untuk pizza` (10). D40/D-ruling stands: published for
topic coverage, not demand.

**Arabic is at the floor for a fourth round too**, once the one real cluster it returned (infant
feeding, above) was excluded. Every other seed queried returned 0/mo.

---

## Deliberately not taken

| Term | Vol | Why not |
|---|---|---|
| `olive oil to hair`, `extra virgin olive oil for hair`, `olive oil benefits for hair`, `hair growth` family | 50–720 each | Cosmetic/hair-care category, off a food brand's catalogue and this flow's scope — same reasoning as round 6's skin/soap exclusion |
| `زيت الزيتون للرضع` and its "harms of drinking" / "which month" variants | 10 each | Infant-feeding safety question — a doctor's answer, not a retailer's content round; real-world risk in getting it wrong |
| `olive oil dipping sauce for bread` family | 40, cluster ≈120 | Cannibalises live `olive-oil-for-bread` (saucer) and `olive-oil-and-balsamic` (ratio) |
| `olive oil gift set` family | 10 each, cluster ≈150 | Retail/gift intent; brand sells bottles, not gift sets — no distinct angle from the product pages |
| `olive oil bruschetta`, `olive oil pizza dough`, `olive oil roast chicken`, `olive oil scrambled eggs`, `olive oil caprese salad`, `olive oil soup` | 0–10 each | Below the six slots taken; recorded so a future round does not re-query them expecting more |

---

## The 18

### English — 6

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `olive-oil-vs-sunflower-oil` | olive oil vs sunflower oil | 40 (cluster ≈110) | LOW | `olive-oil-vs-sunflower-oil` | comparison |
| `olive-oil-vs-sesame-oil` | olive oil vs sesame oil | 30 (cluster ≈90) | LOW | `olive-oil-vs-sesame-oil` | comparison |
| `olive-oil-coffee` | olive oil coffee | 40 (cluster ≈100) | LOW | `olive-oil-coffee` | how-to/trend |
| `olive-oil-ice-cream` | olive oil ice cream | 40 (cluster ≈110) | LOW | `olive-oil-ice-cream` | recipe |
| `olive-oil-orange-cake` | olive oil orange cake | 20 (cluster ≈40) | LOW | `olive-oil-orange-cake` | recipe |
| `olive-oil-mashed-potatoes` | olive oil mashed potatoes | 10 (cluster ≈70) | LOW | `olive-oil-mashed-potatoes` | how-to |

### Malay — 6

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `minyak-zaitun-vs-minyak-bunga-matahari` | minyak zaitun vs minyak bunga matahari | 0 | — | `minyak-zaitun-vs-minyak-bunga-matahari` | comparison |
| `minyak-zaitun-vs-minyak-bijan` | minyak zaitun vs minyak bijan | 0 | — | `minyak-zaitun-vs-minyak-bijan` | comparison |
| `kopi-minyak-zaitun` | kopi minyak zaitun | 10 | MEDIUM | `kopi-minyak-zaitun` | how-to/trend |
| `minyak-zaitun-ais-krim` | ais krim minyak zaitun | 0 | — | `minyak-zaitun-ais-krim` | recipe |
| `minyak-zaitun-kek-oren` | kek oren minyak zaitun | 0 | — | `minyak-zaitun-kek-oren` | recipe |
| `minyak-zaitun-untuk-pizza` | minyak zaitun untuk pizza | 10 | — | `minyak-zaitun-untuk-pizza` | how-to |

### Arabic — 6

Slugs are ASCII transliteration under D9.

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `zayt-alzaytun-wazayt-abad-alshams` | زيت الزيتون وزيت عباد الشمس | 0 | — | `zayt-alzaytun-wazayt-abad-alshams` | comparison |
| `zayt-alzaytun-walsimsim` | زيت الزيتون والسمسم | 0 | — | `zayt-alzaytun-walsimsim` | comparison |
| `qahwat-bizayt-alzaytun` | قهوة بزيت الزيتون | 0 | — | `qahwat-bizayt-alzaytun` | how-to/trend |
| `ays-krim-bizayt-alzaytun` | آيس كريم بزيت الزيتون | 0 | — | `ays-krim-bizayt-alzaytun` | recipe |
| `kaykat-alburtuqal-bizayt-alzaytun` | كيكة البرتقال بزيت الزيتون | 0 | — | `kaykat-alburtuqal-bizayt-alzaytun` | recipe |
| `zayt-alzaytun-lilbatatis-almahrusa` | زيت الزيتون للبطاطس المهروسة | 0 | — | `zayt-alzaytun-lilbatatis-almahrusa` | how-to |

**Cross-language topical mirrors**, allowed under D13/D35: sunflower comparison, sesame comparison,
coffee, ice cream, orange cake, mashed/roast potato — same six subjects in all three languages this
round, each written from its own demand pull (real for EN and partly MS, topic-coverage only for
AR) and its own angle, none a translation of another.
