# PRESS decisions — avoliveoil.com

Numbered, with who decided. A decision the user made carries their words. A decision PRESS made
under delegation is marked **assumed**, never *approved*.

| # | Decision | Source |
|---|---|---|
| D1 | Codeword for this flow is **PRESS** | User, 2026-08-20: "1a" |
| D2 | Articles are **800–1,000 words** | User: "2a" |
| D3 | Slugs use native script per language | User: "7a" |
| D4 | Images must be **free**, zero cost | User: "6a" |
| D5 | The legal-ceiling step is **generic per project**, not hardcoded to Malaysia | User: "not nessercy about health bcz i might choose another project… this flow must be general for any project" |
| D6 | Language mix comes from demand data, not the site's language list | User: "5b" — 2 Arabic, the other 3 moved to Malay |
| D7 | Batch size is decided per project at run time, not fixed in the flow | User: "8 as i said no need to specify this in the flow" |
| D8 | The live health-benefits article stays as it is | User: "4a" |

## Round 1 decisions taken by PRESS

| # | Decision | Basis |
|---|---|---|
| D9 **assumed** | **Arabic slugs are ASCII transliteration, not Arabic script** — a degradation of D3 | `public/.htaccess` L32–33 routes articles with `([a-z0-9-]+)`. Arabic characters never match, so the prerendered file is skipped and a crawler receives the SPA shell with no meta and no JSON-LD. Malay slugs are native Malay words and meet D3 in full. Reversible only via 301s, so it is recorded rather than left implicit |
| D10 **assumed** | Four shortlisted keywords dropped for cannibalisation and replaced | Existing articles already own `olive oil Malaysia`, `authentic extra virgin olive oil Malaysia`, `minyak zaitun dara asli`, `زيت الزيتون في ماليزيا`. Two pages chasing one term costs both |
| D11 **assumed** | The `khasiat` / `kebaikkan` / `untuk minum` cluster (≈6,000/mo, the largest in this market) is **not targeted** | Every query in it wants a health claim. Reg. 18(6), and `storeFacts.json` → `compliance` already states the ceiling in three languages. Reversing this needs a compliance opinion, not a content decision |
| D12 **assumed** | Round payload ceiling of **6 MB** | The build already ships 26 MB, almost all unoptimised PNG. An unbounded image round would make every article slower than the page it is trying to outrank |
| D13 **assumed** | Articles are **single-language, not translated sets** | PRESS non-negotiable 4 and the `llms.txt` seven-rule standard. Each `id` therefore appears in one language module and one `slugs.json` entry |
| D14 | Search Console data is **absent** from this round | The property is not connected. Volumes only. Recorded so the plan is not read as being informed by live ranking data |

## Round 2 decisions — 2026-08-25

| # | Decision | Source |
|---|---|---|
| D15 | **3 articles per language, 9 in all** — the split is a user ruling this round, overriding the demand-led split of D6 | User, 2026-08-25: "3 articles for each lang" |
| D16 | **No image is generated. Every image is cropped from the site's own photography** | User, 2026-08-25: "user picture from the current webiste do not generate new one" |
| D17 | The PRESS flow itself was changed to match: Stage 4 is now **reuse-first** — inventory the repo's photos, look at each one, assign by subject, crop locally, and generate only what nothing existing can fill | User, 2026-08-25: "maybe u change a bit in the flow of press regarding this generating the pic" |
| D18 **assumed** | Heroes ship at exactly **1280×720**, because `ArticlePage.tsx` declares that size. Round 1's 1024×576 files made that declaration false | The declaration is in the template; matching it is cheaper than changing it, and no round-1 file is touched |
| D19 **assumed** | `minyak-zaitun-habbatus-sauda` targets the **product** question, never the health question, although the demand behind that keyword is health-shaped | D11 and Reg. 18(6). The alternative was to leave the largest unclaimed Malay term unserved |
| D20 **assumed** | The Quran article quotes **Quranic verses only — no hadith**, and attaches no health, spiritual or efficacy claim to the product | A hadith citation needed an owner ruling on suburhoney and none has been given here |
| D21 **assumed** | Competitor brand terms are not targeted, though `minyak zaitun olive house` (590/mo) is the largest remaining Malay head term | The site's standing brand-neutral rule |

## Round 3 decisions — 2026-08-25

| # | Decision | Source |
|---|---|---|
| D22 | **6 articles per language, 18 in all** — a user ruling this round, overriding the demand-led split of D6 exactly as D15 did in round 2 | User, 2026-08-25: "6 for each lang" |
| D23 **assumed** | Malay is taken as **exhausted at the head**, confirmed a second time. The six Malay articles run on a 10–50/mo long tail, recorded as such rather than inflated. Everything above 100/mo is either a competitor brand (D21) or inside the health cluster (D11) | Keyword Planner, geo 2458, pulled 2026-08-25 |
| D24 **assumed** | The round is **reuse-first but not reuse-only**: 14 heroes are crops of repo photos, 4 are generated. The repo holds nine frames wide enough for a 1280×720 hero and this is the third round drawing on them | D17's flow, applied to a pool that has run out. Recorded in `round-3/IMAGE-INVENTORY.md` |
| D25 **assumed** | Generated heroes are **resampled to 1280×720 locally** before shipping, because the free provider returns 1024×576 whatever size is requested and `ArticlePage.tsx` declares 1280×720. Round 1's fifteen heroes are still 1024×576 behind that declaration — untouched, still open | Rather than repeat round 1's false declaration |
| D26 **assumed** | Where a generated image did not match what was asked for, **the alt text describes the real frame**, not the brief's intent. Four alt texts were rewritten this way | An alt text that describes an image the page is not showing is a worse defect than a weak lead image |
| D27 **assumed** | The published **"tested below 0.028%"** acidity claim is **escalated to the owner, not deleted**. It appears 46 times across 10 shipped surfaces, has no support in `storeFacts.json`, and is hardcoded in `scripts/ai/facts-sync.mjs`. Removing a published product claim is an owner decision | The new Arabic acidity article's advice — that a number with no test date and no named lab is marketing copy — stands as written, and the contradiction is reported rather than hidden |
| D28 **assumed** | Where a new article contradicted a live one, the **new article moved**, in every case: Arabic frying reuse, the Malay fridge rule, the English shelf-life figures, the marinade quantity. No published claim was rewritten to accommodate a draft | Round 3's job is to add pages, not to silently restate what the site already tells people |
