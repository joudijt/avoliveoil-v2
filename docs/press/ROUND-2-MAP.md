# PRESS Round 2 — keyword map

Planned 2026-08-25. **9 articles, 3 per language**, on the owner's instruction ("3 articles for
each lang") — this round's split is a user ruling, not a demand reading. Volumes from Google Ads
Keyword Planner, **geo 2458 Malaysia**, pulled 2026-08-25, languages 1000 / 1102 / 1019. Search
Console is still not connected for this property, so there is no live ranking data in this round
either — volumes only. That is a gap, not a silence.

## What round 1 left on the table

Round 1 shipped 15 articles (5 en / 8 ms / 2 ar) and took the obvious demand with it. Re-running
the planner against the same market shows what is left:

| Language | State of the remaining demand |
|---|---|
| **en** | Healthiest of the three. `olive oil for cooking` at **1,000/mo** was never targeted in English — round 1 gave cooking to Malay only. A second cluster around pomace and refined grades (720/mo) is untouched |
| **ms** | Largely exhausted or blocked. The big remaining head terms are competitor brand names (`minyak zaitun olive house` 590, `al ard` 90, `minsyam` 50) or the health cluster ruled out in D11. What is left is small and specific |
| **ar** | Unchanged: Arabic-in-Malaysia peaks at **90/mo** on `زيت زيتون` itself, and every other Arabic phrase in the pull returned 10. These three are entity and assistant plays, not volume plays. Reported as such |

## Cannibalisation baseline — 24 focus keywords are already owned

Checked against all 18 article ids live in `src/content/articles/`. **Off-limits this round:**

| Lang | Already owned |
|---|---|
| en | olive oil Malaysia · extra virgin olive oil health benefits · authentic extra virgin olive oil Malaysia · cold pressed olive oil · best olive oil in malaysia · halal olive oil · olive oil malaysia price · palestinian olive oil |
| ms | minyak zaitun Malaysia · manfaat minyak zaitun dara · minyak zaitun dara asli · kedai arab kl · harga minyak zaitun · jenama minyak zaitun terbaik · minyak zaitun extra virgin · minyak zaitun halal · minyak zaitun organik · minyak zaitun palestin · minyak zaitun untuk masak |
| ar | زيت الزيتون في ماليزيا · فوائد زيت الزيتون البكر الممتاز · زيت زيتون بكر ممتاز أصلي · زيت زيتون فلسطيني · زيت الزيتون للطبخ |

**Dropped from the shortlist for collision, with the evidence:**

- MS `olive oil untuk goreng` (40/mo) and `olive oil untuk menumis` (30/mo) — the round-1 article
  `minyak-zaitun-untuk-masak` already carries the H2s *"Apa itu takat asap dan kenapa ia penting di
  dapur?"* and *"Bagaimana ia berbanding minyak masak yang kita sudah guna?"*. Frying is inside it.
- MS `minyak zaitun tulen` / `minyak zaitun original` (10–170/mo) — the base article
  `minyak-zaitun-dara-asli` owns authenticity in Malay.
- MS `jenis2 minyak zaitun`, `minyak zaitun pomace` (10/mo each) — `minyak-zaitun-extra-virgin-gred`
  owns grades in Malay. The pomace angle is taken in **English** instead, where nothing owns it.
- MS `minyak zaitun olive house` (590), `minyak zaitun al ard` (90), `minyak zaitun minsyam` (50),
  `minyak zaitun basso` (30) — competitor brand names. The brand-neutral rule stands: this site
  does not write about other people's brands to catch their traffic.

## English — 3

| id | focus keyword | vol | competition | intent | slug |
|---|---|---|---|---|---|
| `olive-oil-for-cooking` | olive oil for cooking | **1,000** | HIGH | usage | `how-to-cook-with-olive-oil-in-a-malaysian-kitchen` |
| `olive-oil-vs-pomace-oil` | olive oil vs pomace oil | 70 (cluster 720) | MEDIUM | grades / label | `olive-oil-vs-pomace-oil-what-the-grades-mean` |
| `olive-oil-smoke-point` | olive oil smoke point | 90 | **LOW** | technical | `olive-oil-smoke-point-what-heat-it-can-take` |

`olive oil pomace oil` is the 720/mo phrasing and reads badly in a headline; the article targets the
natural `olive oil vs pomace oil` (70/mo, MEDIUM) and carries the 720 phrasing in
`relatedKeywords`. Cluster around it: `olive oil vs olive pomace oil` 70 · `pomace oil for cooking`
40 · `refined olive oil for cooking` 50 · `extra light olive oil vs extra virgin olive oil` 70.

**Separation of the two cooking articles is enforced, not hoped for:** `olive-oil-for-cooking` may
not carry a smoke-point section, and `olive-oil-smoke-point` may not carry a general
how-to-cook-with-it section. Each links to the other once.

## Bahasa Melayu — 3

| id | focus keyword | vol | competition | intent | slug |
|---|---|---|---|---|---|
| `minyak-zaitun-habbatus-sauda` | minyak zaitun habbatus sauda | 30 | HIGH | product | `minyak-zaitun-habbatus-sauda-apa-yang-perlu-tahu` |
| `minyak-zaitun-untuk-salad` | minyak zaitun untuk salad | 20 | HIGH | culinary, cold | `minyak-zaitun-untuk-salad-dan-hidangan-sejuk` |
| `zaitun-dalam-al-quran` | zaitun dalam al quran | 10 | LOW | cultural | `pokok-zaitun-dalam-al-quran-dan-warisan-palestin` |

The habbatus-sauda cluster is the largest unclaimed Malay demand left (~30/mo on the head term,
plus `habbatus sauda dan minyak zaitun` 20, `minyak zaitun dan habbatussauda` 20). **Almost every
query in it wants a health claim** — `kebaikan`, `khasiat`, `cara makan`. Under D11 and Reg. 18(6)
this article answers the *product* question (what a blackseed infusion is, how it is made, how it
is used in a kitchen, what it costs) and never the claim. Recorded so the intent mismatch is a
decision, not an accident.

`zaitun dalam al quran` is a cultural article: Quranic references to the olive and the fig are
quoted as text, with no health, spiritual or efficacy claim attached to this product. **No hadith
is cited** — that needed an owner ruling on a sibling site and has not been given here.

## Arabic — 3

| id | focus keyword | MY vol | intent | slug (ASCII, see D9) |
|---|---|---|---|---|
| `zayt-alzaytun-kuala-lumpur` | زيت الزيتون في كوالالمبور | <10 | where to buy | `zayt-alzaytun-fi-kuala-lumpur` |
| `sier-zayt-alzaytun-malaysia` | سعر زيت الزيتون | 10 | transactional | `sier-zayt-alzaytun-fi-malizya` |
| `hifz-zayt-alzaytun` | حفظ زيت الزيتون | 10 | practical | `hifz-zayt-alzaytun` |

Arabic here serves residents and visitors who are already in Malaysia — the two Berkat Madinah
branches, the price in ringgit, and how a bottle survives a tropical kitchen. Gulf demand
(`زيت الزيتون` 60,500/mo) remains **unaddressable**: distribution is Malaysia only.

## Per-article requirements

Every article: 800–1,000 words · 5–7 sections, each opening with a 40–70 word answer paragraph ·
one table or list · 6–10 FAQs · 3–5 internal links out · hero + 1 inline + OG image · full meta
and JSON-LD set, all emitted by the existing pipeline.

Facts come from `src/data/storeFacts.json`. Prices are RM59.00 (250 ml) and RM103.00 (500 ml),
same by size for the classic oil and every infusion; per-litre RM236 and RM206. Nothing else
checkable gets typed by a writer.

## Images — reused, not generated

**Owner instruction: "user picture from the current website, do not generate new one."** Every
image in this round is cropped from the site's own photography. Zero generation, zero cost, zero
new files invented. Provenance table: `docs/press/round-2/IMAGE-INVENTORY.md`.

## Round payload ceiling

6 MB, same as round 1 (D12). **Actual: 2.6 MB** — 18 WebP variants and 9 OG cards.
