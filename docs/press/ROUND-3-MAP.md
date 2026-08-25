# PRESS round 3 — keyword map

Pulled **2026-08-25** from Google Keyword Planner (`KeywordPlanIdeaService`) through the Google Ads
MCP, account `9254118864`, geo **2458 (Malaysia)**, languages 1000 (English), 1102 (Malay),
1019 (Arabic). Search Console is still not connected for this property, so there is **no live
ranking data in this round** — volumes only. Same limitation as rounds 1 and 2 (D14).

**Size: 6 articles per language, 18 in all** — a user ruling on 2026-08-25 ("6 for each lang"),
which overrides the demand-led split of D6 exactly as D15 did in round 2.

---

## What the market looks like on the third pass

**English is where the remaining volume is.** The comparison and usage families are still open:
`extra virgin olive oil salad dressing` at 390/mo, the `extra virgin vs pure` cluster at 260/mo,
and a genuine long tail around bread dipping, marinades and air fryers.

**Malay is exhausted at the head, confirmed a second time.** Every Malay term above 100/mo is
either a competitor brand name (excluded by the site's brand-neutral rule, D21) or sits inside the
health cluster that Reg. 18(6) blocks (D11): `khasiat minyak zaitun extra virgin` 260/mo,
`kebaikan minum minyak zaitun` 90/mo, `kebaikan minyak zaitun untuk kesihatan` 40/mo. What is left
and usable is a 10–50/mo long tail. This round takes six of those terms and says so plainly rather
than inflating them.

**Arabic inside Malaysia is unchanged at a 10–90/mo ceiling.** Every Arabic idea returned for geo
2458 sits at 0–10/mo. The Arabic articles are written for the Arabic-speaking residents and
visitors this seller actually serves in Klang Valley, not for Gulf volume the business cannot ship
to — unaddressable volume is discarded per Stage 1 rule 3.

---

## The 18

Focus keywords are unique across the round and against all 33 existing article instances
(11 en / 14 ms / 8 ar before this round).

### English — 6

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `evoo-salad-dressing` | extra virgin olive oil salad dressing | 390 | MEDIUM | `extra-virgin-olive-oil-salad-dressing` | how-to |
| `evoo-vs-pure-olive-oil` | extra virgin olive oil vs pure olive oil | 260 | HIGH | `extra-virgin-olive-oil-vs-pure-olive-oil` | comparison |
| `olive-oil-air-fryer` | olive oil in air fryer | 10 (cluster ≈110) | LOW | `can-you-use-olive-oil-in-an-air-fryer` | usage |
| `olive-oil-marinade` | olive oil marinade | 10 (cluster ≈80) | LOW | `olive-oil-marinade-what-it-does` | usage |
| `olive-oil-for-bread` | olive oil for bread | 70 | MEDIUM | `olive-oil-for-bread-and-dipping` | usage |
| `olive-oil-shelf-life` | olive oil shelf life | 10 | LOW | `olive-oil-shelf-life-how-long-a-bottle-lasts` | storage |

Cluster figures are the sum of the near-identical variants the planner returned
(`olive oil in air fryer`, `evoo air fryer`, `best olive oil for air fryer`, `olive oil spray for
air fryer` … each 10/mo; the marinade family the same way). They are recorded as clusters, not as
one term's volume.

### Malay — 6

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `minyak-zaitun-untuk-goreng` | minyak zaitun untuk goreng | 30 (+40 `olive oil untuk goreng`) | HIGH | `minyak-zaitun-untuk-goreng` | usage / heat |
| `minyak-zaitun-pomace` | minyak zaitun pomace | 10 | HIGH | `apa-itu-minyak-zaitun-pomace` | grades |
| `cara-simpan-minyak-zaitun` | cara simpan minyak zaitun | <10 | — | `cara-simpan-minyak-zaitun` | storage |
| `botol-minyak-zaitun` | botol minyak zaitun | 10 | HIGH | `botol-minyak-zaitun-kaca-gelap-dan-saiz` | packaging |
| `resepi-minyak-zaitun` | resepi minyak zaitun | 10 | LOW | `resepi-mudah-dengan-minyak-zaitun` | recipes |
| `minyak-zaitun-vs-minyak-masak` | minyak zaitun vs minyak masak | <10 | — | `minyak-zaitun-vs-minyak-masak-lain` | comparison |

### Arabic — 6

Slugs are ASCII transliteration under D9 — `public/.htaccess` routes articles with
`([a-z0-9-]+)` and Arabic script never matches it.

| id | Focus keyword | Vol/mo | Comp | Slug | Intent |
|---|---|---|---|---|---|
| `alfarq-bayn-albikr-walmumtaz` | الفرق بين زيت الزيتون البكر والبكر الممتاز | 10 | — | `alfarq-bayn-zayt-alzaytun-albikr-walmumtaz` | comparison |
| `taem-zayt-alzaytun` | طعم زيت الزيتون البكر الممتاز | 10 | HIGH | `taem-zayt-alzaytun-albikr-almumtaz` | quality |
| `humudat-zayt-alzaytun` | درجة حموضة زيت الزيتون | <10 | — | `darajat-humudat-zayt-alzaytun` | technical |
| `zayt-alzaytun-aludwi` | زيت الزيتون العضوي | 10 | MEDIUM | `zayt-alzaytun-aludwi` | labelling |
| `zayt-alzaytun-lilsalata` | زيت الزيتون للسلطة | <10 | — | `zayt-alzaytun-lilsalata` | usage |
| `zayt-alzaytun-lilqaly` | زيت الزيتون للقلي | <10 | — | `zayt-alzaytun-lilqaly` | usage / heat |

---

## Cannibalisation — checked both ways

**Against the round itself:** all 18 focus keywords are distinct strings.
`scripts/press-import.py` re-asserts this at import time and refuses to write on a collision.

**Against the 33 existing article instances**, four pairs sit close enough to need a ruling. Each
new article is scoped narrowly and must link to the existing one rather than restate it:

| New | Existing it brushes | Ruling |
|---|---|---|
| `evoo-vs-pure-olive-oil` (en) | `olive-oil-vs-pomace-oil` (en) | Different comparison pair. Pomace is the solvent-extracted grade; "pure" is a refined-plus-virgin blend. The new article covers **pure / light** labelling and links out to the pomace article for pomace |
| `minyak-zaitun-untuk-goreng` (ms) | `minyak-zaitun-untuk-masak` (ms) | The existing article is a general kitchen guide. This one is only about **heat and frying** — Malay has no smoke-point article, the English one is `olive-oil-smoke-point` |
| `zayt-alzaytun-lilqaly` (ar) | `zayt-zaytun-lil-tabkh` (ar) | Same split as the Malay pair: general cooking already exists, frying heat does not |
| `cara-simpan-minyak-zaitun` (ms) | `hifz-zayt-alzaytun` (ar) | Different languages. PRESS non-negotiable 4 still applies: the Malay article is researched and written on its own, not translated from the Arabic one |

**Dropped for cannibalisation:** `extra virgin olive oil cold pressed` (260/mo) — `cold-pressed-olive-oil-explained`
already owns it. `jenis minyak zaitun` (50/mo) — `minyak-zaitun-extra-virgin-gred` already covers
Malay grades. `افضل ماركات زيت الزيتون` and `minyak zaitun tulen` — the authenticity articles own that intent.

**Dropped for the legal ceiling (D11, Reg. 18(6)):** `khasiat minyak zaitun extra virgin` (260),
`kebaikan minum minyak zaitun` (90), `kebaikan minyak zaitun untuk kesihatan` (40),
`minyak zaitun kolesterol`, `omega 3 in olive oil` (70). The last one is a **nutrient-content**
claim rather than a disease claim, which is a different Malaysian rule again, and the site has no
compositional analysis on file to support one.

**Dropped as off-product:** the skin, hair and face families in all three languages
(`kebaikan minyak zaitun safi untuk muka`, `أفضل زيت زيتون للشعر`). This is a food product; a
cosmetic claim would be both off-brand and separately regulated.

**Dropped as brand terms (D21):** `minyak zaitun olive house` (590), `bertolli extra virgin olive oil`
(480), `زيت زيتون نادك`, and the rest of the competitor-name tail.

---

## Internal linking plan

Every article carries 3–5 outbound internal links (money pages + siblings) and receives at least
one inbound link — the blog index lists it automatically, and each article names two siblings in
`related`, which is what makes the graph two-way rather than a fan-out from the index.

Money pages available: `products`, `shop`, `story`, `contact`, plus the six infused product pages.

## Round ceilings

| Ceiling | Value | Basis |
|---|---|---|
| Payload for the whole round | **6 MB** | D12, unchanged. 54 image files at ≈100 KB average |
| Hero dimensions | **exactly 1280×720** | D18 — `ArticlePage.tsx` L91–92 declares that size |
| Word band | 800–1,000 (draft counter) | D2 |
