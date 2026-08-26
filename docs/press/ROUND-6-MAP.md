# PRESS round 6 — keyword map

Pulled **2026-08-26** from Google Keyword Planner (`KeywordPlanIdeaService`) through the Google Ads
MCP, account `9254118864`, geo **2458 (Malaysia)**, languages 1000 (English), 1102 (Malay),
1019 (Arabic). Search Console still not connected (D14) — volumes only.

**Size: 6 per language, 18 in all** — the same user override as D15, D22, D29, D39.

Cannibalisation checked against all **87** live article instances (29 en / 32 ms / 26 ar).

---

## Standing ruling this round works under

**Images: website photography only, nothing generated** (D-2026-08-26, see
`docs/press/IMAGE-POLICY.md` and [[feedback_website_photos_only_never_generate]]). Stage 4 for this
round is not a per-round crop plan — it is a re-run of `scripts/recut-article-images.py` and
`scripts/sync-article-alt.py` over the **whole site**, after Stage 5 lands, so the round's eighteen
articles are folded into the same site-wide uniqueness guarantee as the other 87.

---

## What the market looks like on the sixth pass

**English seeding moved off "dishes" (round 5's find) onto "pairings" — specific things put
directly with the oil.** `olive oil for roasting vegetables` (70/mo, cluster ≈110 with the pepper
and balsamic variants), `olive oil vs butter` (20/mo, cluster ≈100 — mostly a spread/cooking-fat
question, not a baking one, and the substitute article already owns baking conversion),
`olive oil for steak` (20/mo, cluster ≈80), `olive oil fried egg` (30/mo, cluster ≈50, a genuinely
odd but real cluster — huevos/olive-oil-fried-egg is a known dish family), `olive oil focaccia`
(20/mo, cluster ≈60) and `olive oil popcorn` (10/mo, cluster ≈50, Trader Joe's brand noise
stripped out).

**A large adjacent cluster was found and excluded on sight: skin, soap and hair.** `olive skin`
1,300/mo, `olive oil and skin` 260/mo, `astringents` 880/mo, plus a long tail of face oil, body
lotion, soap-making and hair-mask queries in all three languages. This is a **different product
category** — cosmetic, not food — outside what this brand sells and outside Reg. 18(6)'s comfort
zone even before the category question. Recorded so a future round does not think it was missed.

**Malay is at the floor for a third consecutive round.** Every seed this round returned **0/mo**
except `minyak zaitun untuk steak` (10) and `minyak zaitun murah` (10, HIGH competition — a
value/pricing angle, not a health or quality claim). D40 from round 5 stands: these six are
published for topic coverage, not demand.

**Arabic is at the floor for a third round too**, with one exception: `بيض وزيت زيتون` (olive oil
with egg) returned real signal — 10/mo on the head term with a ~30/mo cluster across "بيض بزيت
الزيتون", "بيض مسلوق مع زيت زيتون". A second real cluster surfaced and was **excluded**: "صنع/عصر
زيت الزيتون في المنزل" (making/pressing olive oil at home), ~20–30/mo across variants — a DIY
audience this seller does not serve and a subject (unlicensed home pressing) with food-safety
territory this round is not the place to open.

---

## Deliberately not taken

| Term | Vol | Why not |
|---|---|---|
| `olive skin`, `olive oil and skin`, `astringents`, and the whole skin/soap/hair-mask family | 90–1,300 each | A different product category (cosmetic, not food), off both the brand's catalogue and this content flow's scope |
| `highest polyphenol olive oil` | 50, HIGH | A nutrient-content ranking claim — Reg. 18(6) and the site's own no-compositional-analysis position |
| `pure natural olive oil` | 90, HIGH | Generic marketing phrase, not a distinct search intent from the live authenticity articles |
| `olive oil vs peanut butter`, `olive oil vs vaseline` | 10 each | Peanut butter is not a comparable cooking fat in this market; vaseline is cosmetic |
| صنع/عصر زيت الزيتون في المنزل family | ~20–30 combined | A DIY home-pressing audience, and food-safety territory outside this round |
| زيت الزيتون للرجيم / الزيتون للدايت (diet) family | 0 each, large family | Weight/diet framing. D11 and Reg. 18(6) |
| بيض وزيت زيتون **للشعر** (hair-mask) variants of the egg cluster | 0 each | The hair-mask sense of the same words, not the food sense |
| `minyak zaitun tempatan`, `minyak zaitun untuk kudapan` | 0 each | No measurable demand and no distinct angle from live articles |

---

## The 18

Focus keywords are unique across the round and against all 87 existing article instances.

### English — 6

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `olive-oil-roasted-vegetables` | olive oil for roasting vegetables | 70 (cluster ≈110) | LOW | `olive-oil-for-roasting-vegetables` | how-to |
| `olive-oil-vs-butter` | olive oil vs butter | 20 (cluster ≈100) | LOW | `olive-oil-vs-butter` | comparison |
| `olive-oil-for-steak` | olive oil for steak | 20 (cluster ≈80) | LOW | `olive-oil-for-steak` | how-to |
| `olive-oil-fried-egg` | olive oil fried egg | 30 (cluster ≈50) | LOW | `olive-oil-fried-egg` | recipe |
| `olive-oil-focaccia` | olive oil focaccia | 20 (cluster ≈60) | LOW | `olive-oil-focaccia-recipe` | recipe |
| `olive-oil-popcorn` | olive oil popcorn | 10 (cluster ≈50) | UNKNOWN | `olive-oil-popcorn` | recipe |

### Malay — 6

Every figure is the planner's, pulled the same day. Four of the six return 0/mo.

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `minyak-zaitun-untuk-sayur-panggang` | minyak zaitun untuk sayur panggang | 0 | — | `minyak-zaitun-untuk-sayur-panggang` | how-to |
| `minyak-zaitun-vs-mentega` | minyak zaitun vs mentega | 0 | — | `minyak-zaitun-vs-mentega` | comparison |
| `minyak-zaitun-untuk-steak` | minyak zaitun untuk steak | 10 | — | `minyak-zaitun-untuk-steak` | how-to |
| `minyak-zaitun-untuk-telur` | minyak zaitun untuk telur | 0 | — | `minyak-zaitun-untuk-telur-goreng` | recipe |
| `minyak-zaitun-murah` | minyak zaitun murah | 10 | HIGH | `kenapa-minyak-zaitun-tak-pernah-murah` | value/pricing |
| `minyak-zaitun-popcorn` | minyak zaitun popcorn | 0 | — | `minyak-zaitun-untuk-popcorn` | recipe |

### Arabic — 6

Slugs are ASCII transliteration under D9.

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `zayt-alzaytun-lilkhudar-almashwi` | زيت الزيتون للخضار المشوي | 0 | — | `zayt-alzaytun-lilkhudar-almashwi` | how-to |
| `zayt-alzaytun-walzubda` | زيت الزيتون والزبدة | 0 | — | `zayt-alzaytun-walzubda` | comparison |
| `zayt-alzaytun-lilsteak` | زيت الزيتون للستيك | 0 | — | `zayt-alzaytun-lilsteak` | how-to |
| `zayt-alzaytun-lilbayd` | بيض بزيت الزيتون | 10 (cluster ≈30) | — | `zayt-alzaytun-lilbayd` | recipe |
| `zayt-alzaytun-al-rakhis` | زيت الزيتون الرخيص | 0 | — | `hal-yumkin-an-yakun-zayt-alzaytun-rakhisan` | value/pricing |
| `zayt-alzaytun-lilfawshar` | زيت الزيتون للفوشار | 0 | — | `zayt-alzaytun-lilfawshar` | recipe |

**Cross-language topical mirrors**, allowed under D13/D35: roasted vegetables, vs-butter, steak,
egg/fried-egg, and a value/pricing angle (English has no direct mirror — `pure natural olive oil`
was excluded as too generic — so English's sixth slot went to focaccia and popcorn instead, both
backed by real EN-only demand). Each language's article is written from its own demand pull and its
own angle; none is a translation of another.
