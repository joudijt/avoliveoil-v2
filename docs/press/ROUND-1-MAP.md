# PRESS Round 1 — keyword map

Planned 2026-08-20. 15 articles. Volumes from Google Ads Keyword Planner, **geo 2458 Malaysia**,
pulled 2026-08-14 and 2026-08-20. Search Console is not connected for this property, so there is no
live ranking data in this round — volumes only. That is a gap, not a silence.

## Language split — decided from demand, not from the language list

| Lang | Articles | Why |
|---|---|---|
| **ms** | **8** | Malay is the market. `minyak zaitun` 8,100/mo dwarfs everything else |
| **en** | **5** | Small but transactional. `olive oil malaysia` 880/mo, buyers search product+country |
| **ar** | **2** | Malaysia Arabic demand ceiling is 90/mo; every other Arabic phrase returned 0. Gulf has 60,500/mo and is **unaddressable** — Berkat Madinah's distribution is Malaysia only |

Three articles moved from Arabic to Malay on that evidence (user ruling 5B).

## Cannibalisation baseline — what existing pages already own

Checked against `src/content/articles/{en,ms,ar}.ts`. **These terms are off-limits this round:**

| Lang | Owned by an existing article |
|---|---|
| en | `olive oil Malaysia` · `extra virgin olive oil health benefits` · `authentic extra virgin olive oil Malaysia` |
| ms | `minyak zaitun Malaysia` · `manfaat minyak zaitun dara` · `minyak zaitun dara asli` |
| ar | `زيت الزيتون في ماليزيا` · `فوائد زيت الزيتون البكر الممتاز` · `زيت زيتون بكر ممتاز أصلي` |

Four keywords from the pre-round shortlist were dropped for collision: EN `olive oil malaysia`,
EN `extra virgin olive oil malaysia`, MS `minyak zaitun original` (`original` ≈ the owned `asli`),
AR `زيت الزيتون`. Replacements below carry their own distinct intent.

Focus keywords are also unique **within** this round — five parallel writers can otherwise converge
on one term without noticing.

## English — 5

| id | focus keyword | vol | intent | slug |
|---|---|---|---|---|
| `cold-pressed-olive-oil-explained` | cold pressed olive oil | 480 | definitional | `what-cold-pressed-olive-oil-really-means` |
| `compare-olive-oil-brands-malaysia` | best olive oil in malaysia | 170 | comparison | `how-to-compare-olive-oil-brands-in-malaysia` |
| `palestinian-olive-oil-origin` | palestinian olive oil | 140 | origin / brand | `palestinian-olive-oil-what-makes-it-different` |
| `olive-oil-price-malaysia` | olive oil malaysia price | 140 | transactional | `olive-oil-price-in-malaysia-what-you-are-paying-for` |
| `halal-olive-oil-malaysia` | halal olive oil | 30 | trust | `is-olive-oil-halal-what-to-check-in-malaysia` |

## Bahasa Melayu — 8

| id | focus keyword | vol | intent | slug |
|---|---|---|---|---|
| `minyak-zaitun-untuk-masak` | minyak zaitun untuk masak | 1,000 | culinary use | `minyak-zaitun-untuk-masak-panduan-dapur` |
| `minyak-zaitun-extra-virgin-gred` | minyak zaitun extra virgin | 590 | grades | `apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain` |
| `harga-minyak-zaitun-malaysia` | harga minyak zaitun | 140 | transactional | `harga-minyak-zaitun-di-malaysia` |
| `beli-minyak-zaitun-kl` | kedai arab kl | 140 | where to buy | `di-mana-beli-minyak-zaitun-di-kuala-lumpur` |
| `jenama-minyak-zaitun-terbaik` | jenama minyak zaitun terbaik | 110 | comparison | `cara-menilai-jenama-minyak-zaitun` |
| `minyak-zaitun-organik` | minyak zaitun organik | 70 | farming / label | `minyak-zaitun-organik-apa-maksudnya` |
| `minyak-zaitun-palestin` | minyak zaitun palestin | 50 | origin | `minyak-zaitun-palestin-dari-ladang-ke-botol` |
| `minyak-zaitun-halal` | minyak zaitun halal | 10 | trust | `status-halal-minyak-zaitun` |

**Deliberately not targeted:** the `khasiat` / `kebaikkan` / `untuk minum` cluster, ≈6,000/mo
combined and the largest demand in this market. Every one of those queries wants a health claim,
which Reg. 18(6) prohibits. Recorded so nobody mistakes the omission for an oversight.

## Arabic — 2

| id | focus keyword | MY vol | intent | slug (ASCII, see D3) |
|---|---|---|---|---|
| `zayt-zaytun-falastini` | زيت زيتون فلسطيني | <10 | origin / brand | `zayt-zaytun-falastini-ma-yumayyizuh` |
| `zayt-zaytun-lil-tabkh` | زيت الزيتون للطبخ | <10 | culinary use | `zayt-alzaytun-lil-tabkh` |

Both are AI-assistant and entity plays, not search-volume plays. Labelled as such so no one reports
Arabic traffic forecasts that the data does not support.

## Per-article requirements

Every article: 800–1,000 words · one table or comparison list · 6–10 FAQs · 3–5 internal links out ·
≥1 inbound link from an existing page · hero + 2 inline + OG image · full meta and JSON-LD set.

Facts come from `src/data/storeFacts.json` by reference. Prices are RM59.00 (250 ml) and RM103.00
(500 ml), same by size for classic and infused. Nothing checkable gets typed by a writer.

## Round payload ceiling

**6 MB.** 15 articles × 4 images at ≤180 KB is ~10.8 MB worst case; the ceiling forces WebP quality
stepping and reuse of existing photography where an article does not need a new scene. The site
already ships 26 MB and its ranking depends on getting lighter, not heavier. Measured and reported
in `round-1/GATE.md`.
