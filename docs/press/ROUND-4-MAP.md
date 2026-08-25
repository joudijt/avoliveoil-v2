# PRESS round 4 — keyword map

Pulled **2026-08-25** from Google Keyword Planner (`KeywordPlanIdeaService`) through the Google Ads
MCP, account `9254118864`, geo **2458 (Malaysia)**, languages 1000 (English), 1102 (Malay),
1019 (Arabic). Search Console is still not connected for this property, so there is **no live
ranking data in this round** — volumes only. Same limitation as rounds 1–3 (D14).

**Size: 6 articles per language, 18 in all** — a user ruling on 2026-08-25 ("press 6 articles each
lang"), the same override D15 and D22 made.

Cannibalisation was checked against **all 51 live article instances** (17 en / 20 ms / 14 ar) by
extracting every `focusKeyword` from the three content modules, not from memory.

---

## What the market looks like on the fourth pass

**English still has the only real volume, and it has moved sideways into adjacent categories.** The
head terms are gone — rounds 1–3 took them — but three genuine families were still unclaimed:
the **coconut-oil comparison** (90/mo on `olive oil vs coconut oil`, and a long tail of "which is
better" phrasings), the **infusion family** (`olive oil with garlic` 70, `garlic infused olive oil`
50, `garlic infused oil` 20 — a cluster near 140 on a category this seller actually stocks six
products in), and the **substitution family** (`olive oil substitute` / `replacement` /
`alternative for olive oil` / `sub for olive oil`, five near-identical phrasings at 50/mo each).

**Malay is exhausted at the head for the third consecutive round.** Everything above 100/mo is
still a competitor brand (D21) or inside the health cluster Reg. 18(6) blocks (D11). What the
planner returned this time tops out at **10/mo**, and several of the terms taken below return
**0/mo**. That is recorded as it is rather than dressed up: this Malay set is written for
completeness of the topic map and for AI-answer coverage, not for measurable search demand.

**Arabic inside Malaysia is unchanged at a 0–10/mo ceiling.** Two large Arabic clusters were
returned and **both were discarded**: the `زيت الزيتون والليمون على الريق` family (lemon and olive
oil on an empty stomach — every query in it wants a health claim, D11) and the `معصرة زيتون` family,
which is dominated by people shopping for **milling machinery**, not for oil. Unaddressable volume
is discarded per Stage 1 rule 3.

---

## Deliberately not taken

| Term | Vol | Why not |
|---|---|---|
| `extra virgin olive oil cold pressed` | 260 | Cannibalises the live `what-cold-pressed-olive-oil-really-means` |
| `first cold pressed olive oil` | 20 | Same page, same intent |
| `omega 3 in olive oil` / `olive oil omega` | 70 / 20 | Nutrient-content claim. D11 and the site carries no compositional analysis |
| `olive oil acidity` | 20 | The live `darajat-humudat-zayt-alzaytun` covers acidity, and the site's own published "below 0.028%" figure is still unresolved under **D27** — an English twin would multiply an unsupported claim |
| `زيت الزيتون والليمون على الريق` cluster | ~10 each, large family | Health/folk-remedy intent. D11 |
| `زيت الزيتون للرضع` cluster | 10 and below, large family | Infant feeding. Health advice, outside both the ceiling and the site's competence |
| `معصرة زيتون` cluster | 10 | Buyers of milling equipment, not of oil |
| `زيت زيتون المراعي`, `زيت زيتون نادك` | 10 | Competitor brands. D21 |
| `minyak zaitun vs minyak sawit` | 10 | Overlaps the live `minyak-zaitun-vs-minyak-masak-lain`, which already covers Malaysian cooking oils as a set |
| `gred minyak zaitun`, `saiz botol minyak zaitun` | 0 | Live `apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain` and `botol-minyak-zaitun-kaca-gelap-dan-saiz` |

---

## The 18

Focus keywords are unique across the round and against all 51 existing article instances.

### English — 6

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `olive-oil-vs-coconut-oil` | olive oil vs coconut oil | 90 (cluster ≈180) | MEDIUM | `olive-oil-vs-coconut-oil-in-a-malaysian-kitchen` | comparison |
| `garlic-infused-olive-oil` | garlic infused olive oil | 50 (cluster ≈140) | HIGH | `garlic-infused-olive-oil-and-how-to-do-it-safely` | how-to |
| `olive-oil-substitute` | olive oil substitute | 50 (cluster ≈150) | LOW | `olive-oil-substitute-what-to-use-instead` | substitution |
| `olive-oil-for-baking` | olive oil for cake | 70 (cluster ≈120) | LOW | `olive-oil-for-cakes-and-baking` | how-to |
| `olive-oil-bottle-size` | extra virgin olive oil bottle | 30 (+20 `olive oil small bottle`) | LOW | `what-size-olive-oil-bottle-to-buy` | buying |
| `olive-oil-bitter-taste` | why does olive oil taste bitter | 10 (cluster ≈50) | LOW | `why-does-olive-oil-taste-bitter` | taste |

Cluster figures are the sum of the near-identical phrasings the planner returned, recorded as
clusters and never as one term's volume.

### Malay — 6

Every figure below is the planner's, pulled the same day. The set tops out at 10/mo.

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `minyak-zaitun-vs-minyak-kelapa` | minyak zaitun vs minyak kelapa | 10 (+10 `minyak kelapa dara vs minyak zaitun`) | MEDIUM | `minyak-zaitun-vs-minyak-kelapa` | comparison |
| `minyak-zaitun-palsu` | minyak zaitun palsu | 10 | LOW | `cara-kenal-minyak-zaitun-palsu` | authenticity |
| `rasa-minyak-zaitun` | rasa minyak zaitun | 10 | LOW | `rasa-minyak-zaitun-pahit-dan-pedas` | taste |
| `beli-minyak-zaitun-online` | beli minyak zaitun online | 10 | — | `beli-minyak-zaitun-online-di-malaysia` | buying |
| `minyak-zaitun-tulen` | minyak zaitun tulen | 10 | HIGH | `maksud-minyak-zaitun-tulen` | labels |
| `minyak-zaitun-untuk-kek` | minyak zaitun untuk kek | 0 | — | `minyak-zaitun-untuk-kek-dan-bakeri` | how-to |

### Arabic — 6

Slugs are ASCII transliteration under D9 — `public/.htaccess` routes articles with `([a-z0-9-]+)`
and Arabic script never matches it.

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `mawsim-qitaf-alzaytun` | موسم قطاف الزيتون | 10 | — | `mawsim-qitaf-alzaytun` | provenance |
| `zayt-alzaytun-almukarrar` | زيت الزيتون المكرر | 10 | — | `zayt-alzaytun-almukarrar` | grades |
| `zayt-zaytun-baladi` | زيت زيتون بلدي | 10 | — | `zayt-zaytun-baladi` | labels |
| `afdal-zayt-zaytun` | أفضل زيت زيتون | 10 | — | `kayf-tukhtar-afdal-zayt-zaytun` | buying |
| `zayt-alzaytun-balad-almansha` | أفضل زيت زيتون سوري ام ايطالي | 10 | — | `zayt-alzaytun-hasab-balad-almansha` | origin |
| `zujajat-zayt-alzaytun` | زجاجة زيت الزيتون | 10 | — | `zujajat-zayt-alzaytun` | packaging |

**Adjacency inside the round, recorded not hidden.** `afdal-zayt-zaytun` and
`zayt-alzaytun-balad-almansha` both sit near "which one should I buy". They are separated by angle:
the first is a checklist you apply to a bottle in your hand with no reference to origin at all; the
second is strictly about what a country name on a label does and does not predict. Neither may use
the other's focus keyword in its H1.

**Cross-language topical twins.** `olive-oil-vs-coconut-oil` / `minyak-zaitun-vs-minyak-kelapa`,
`olive-oil-bitter-taste` / `rasa-minyak-zaitun`, and `olive-oil-bottle-size` / `zujajat-zayt-alzaytun`
cover related ground in different languages. That is allowed under D13 — each came out of its own
language's demand pull — but no article may be a translation of another, and their angles are
written apart in `round-4/BRIEF.md`.
