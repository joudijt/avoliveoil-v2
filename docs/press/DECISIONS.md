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

## Round 4 decisions — 2026-08-25

| # | Decision | Source |
|---|---|---|
| D29 | **6 articles per language, 18 in all** — a user ruling this round, the same override D15 and D22 made | User, 2026-08-25: "press 6 articles each lang" |
| D30 **assumed** | Malay is taken as **exhausted for a third consecutive round**. The six Malay terms this round run at **0–10/mo** and that is recorded as the truth rather than dressed up. Everything above 100/mo is still a competitor brand (D21) or inside the health cluster (D11) | Keyword Planner, geo 2458, pulled 2026-08-25 |
| D31 **assumed** | Two large Arabic clusters are **discarded, not targeted**: the `زيت الزيتون والليمون على الريق` family (every query wants a health claim — D11) and the `معصرة زيتون` family (buyers of milling machinery, not of oil — unaddressable volume, Stage 1 rule 3) | The pull returned both as the largest Arabic families available |
| D32 **assumed** | **The free generator cannot stage a kitchen still life.** Four of the first five came back wrong — a fried egg for the coconut comparison, a teacup for the cake article, three dishes for "four ramekins". Every generated prompt was rewritten to be **bottle-led, grove-led or equipment-led**, and **all eighteen inlines are repo photographs**, not generated | Pass 1 of `round-4/gen`, recorded in `round-4/IMAGE-INVENTORY.md`. Round 3 saw the same failure at a lower rate |
| D33 **assumed** | `zayt-alzaytun-almukarrar` takes a **repo frame** after two generation attempts. The provider will not render a pale oil beside a green one, which is the article's entire distinction, and shipping two identical green tumblers would have contradicted the text | Two rejected generations, both looked at |
| D34 | **The brief itself carried a false checkable fact and the writers caught it.** `BRIEF.md` told two writers that coconut oil "sets solid" at 28–32 °C. It melts at about 24 °C, so at a Malaysian counter temperature it is liquid or a soft paste and only sets in an air-conditioned room. Both the Malay and the English writer refused the brief's wording independently and wrote it correctly | Writer report, 2026-08-25, verified against both drafts. Recorded because the round's own instructions were the source of the error |
| D35 **assumed** | **Cross-language topical twins are allowed** where each came out of its own language's demand pull — coconut comparison, bitter taste and the bottle each appear in two languages. They are separated by angle and examples, never translated. Anything closer would breach PRESS non-negotiable 4 | D13, plus the live precedent of the round-3 salad pair |

## Round 4 escalations — raised to the owner, not decided by the round

| # | Item | Why it is not a content decision |
|---|---|---|
| D36 **open** | **The product page fails two tests this round publishes.** `zayt-zaytun-baladi` and `zayt-alzaytun-hasab-balad-almansha` tell the reader that a seller who cannot name the mill, the region or the cultivar has told them nothing. `llms-ar.txt` and the product copy publish none of the three. The consumer advice is correct and stays; the gap is on the product side | Adding a mill or region to the product page is a factual claim about the supply chain that only the owner can make |
| D37 **open** | **The organic claim has no certifier.** `llms-ar.txt` calls the product عضوي four times (lines 64, 268, 453, 521) and `llms.txt` carries the same in English, with no certifying body and no certificate number anywhere. This round's `zayt-zaytun-baladi` publishes the standard — a named body and a number on the label — which the site's own claim does not meet. Same shape as **D27** and escalated the same way: reported, not deleted | Removing or substantiating a published product claim is an owner decision |
| D38 **open** | **English cannibalisation between `olive-oil-substitute` and `olive-oil-for-baking`.** Both carry the butter-to-oil conversion, both target the conversion query, and their FAQs are near duplicates. Shipped as written | Collapsing them is a rewrite of two published articles, not an edit; the owner may prefer two pages |

Also carried forward from round 3 and still open: **D27**, the published "tested below 0.028%"
acidity claim, hardcoded in `scripts/ai/facts-sync.mjs` and appearing 46 times across ten surfaces.
No round-4 article repeats it.

Two pre-existing corpus disagreements this round makes conspicuous, both cheap to fix and both
left alone because they are edits to live articles rather than to the round: the live cooking
article's "two or three months" opened against the eight-week rule everywhere else, and the live
smoke-point article's "120 to 160 °C" tumis range against the 140–180 °C `llms.txt` publishes.

## Round 5 decisions — 2026-08-26

| # | Decision | Source |
|---|---|---|
| D39 | **6 articles per language, 18 in all** — the same user ruling as D15, D22 and D29 | User, 2026-08-26 |
| D40 **assumed** | **Malay demand has reached zero.** Round 3 called it exhausted at the head, round 4 found a 0–10/mo tail; this round every Malay seed returned **0/mo** and the only term with a number against it is `minyak zaitun vs minyak sawit` at 10. The six Malay articles are published for topic-map completeness and AI-answer coverage, not for measurable search demand, and that is recorded rather than dressed up | Keyword Planner, geo 2458, pulled 2026-08-26 |
| D41 **assumed** | **`minyak zaitun vs minyak sawit` is taken despite being skipped in round 4** for overlapping the live `minyak-zaitun-vs-minyak-masak-lain`. It is the only Malay term left with volume, and the two are separated by angle: the live page compares olive oil against Malaysian cooking oils as a set, this one is only about palm | D40 |
| D42 **assumed** | **The three machine briefs were corrected, not the articles.** All three `llms*.txt` templates flatly forbade refrigeration while every live storage article says it is unnecessary and that cold cloudiness is normal and reverses. Two rounds of drafts have been written against the softer, correct version, so the briefs were the outdated side. This is the first time a round has changed a published surface to resolve a contradiction rather than moving the new article (cf. D28) | The live articles and the briefs disagreed; the articles are right |
| D43 **assumed** | **Two frames are barred from heroes in code**, not by memory: `journey-08-final.png` and `HeroAVOliveOilBottleInTheField.png` put the product bottle large enough that the label reads at 1280 px. Fifth instance of that rejection. ⚠ Both are **already live as heroes** on three articles from rounds 2–4, which were not re-cut | `derive-images.py` now asserts it |

**A brief of mine carried a false fact for the second round running.** Round 4's said coconut oil
sets solid at 28–32 °C; round 5's said "frying oil is not reused" is this site's advice, when the
live `minyak-zaitun-untuk-goreng` allows two or three shallow-fry uses with filtering. In both
cases a writer or a reviewer caught it. **Brief facts need checking against the corpus the same way
draft facts do** — the brief is not evidence.

## Round 6 decisions — 2026-08-26

| # | Decision | Source |
|---|---|---|
| D-images | **Round 6 is the first fully reuse-only round.** No image was generated; every hero, inline and OG card across all 105 articles (87 live + this round's 18) was cut from the site's own photo library by `scripts/recut-article-images.py`, per the owner's ruling earlier the same day | User, 2026-08-26 |
| D44 **open** | **The frying-oil reuse rule genuinely differs by language on the live site**, not introduced by this round: EN "not reused", MS "two or three times with filtering", AR "not even once". Surfaced when an Arabic draft, following the round-6 brief's blanket line, was caught contradicting the live Arabic article by the adversarial reviewer. Needs one owner decision, not three quietly different answers | Adversarial review, round 6 |
| D45 **assumed** | Two real bugs in the site-wide image script were fixed in the tooling rather than worked around: `taken_boxes` was scoped only by language and so wrongly treated a hero crop and an inline crop of the same photo as competing for one budget, when they can never collide on disk (different output sizes); and an earlier patch via `str.replace()` silently no-opped, leaving the bug in place while reporting success. Both fixed by editing the file directly and re-verifying by re-reading it | Traced during Stage 4, round 6 |

**A brief fact went unchecked against the corpus for the third round running.** Round 4's brief
said coconut oil sets solid at 28–32 °C (wrong); round 5's said "frying oil is not reused" is this
site's advice (wrong for MS, and this round showed it's wrong for AR too); round 6 repeated the
same line without re-checking it against the Arabic corpus specifically. A writer's draft inherited
it and a reviewer caught it. **The brief needs the same fact-check a draft gets, every round, not
assumed correct because it worked in a previous round.**

## Round 7 decisions — 2026-08-26

| # | Decision | Source |
|---|---|---|
| D46 **open** | **Two different published orange-cake recipes now coexist on the Malay site.** The live `minyak-zaitun-untuk-kek-dan-bakeri` (an earlier round's general baking guide) carries its own worked orange-cake example — 130 ml oil, 22 cm loaf pan, 160 g sugar, 150 g yogurt, 170 °C. This round's dedicated `minyak-zaitun-kek-oren` independently arrived at 180 ml oil, 20 cm round tin, 200 g sugar, no yogurt, same 170 °C. Both are legitimate on their own terms — one is an illustrative example inside a general guide, the other a dedicated recipe — but a reader who found both would see two different recipes under the same name. Not fixed: editing the earlier-round article is outside this round's scope. Needs one owner decision on whether the general article's example should be trimmed or cross-referenced | Adversarial review, round 7 |

**First round with a dedicated cross-language consistency reviewer built into Stage 6 from the
start** (round 4's suburhoney lesson, applied here for the first time on avoliveoil, where this
round had five genuine topical mirrors across all three languages — sunflower comparison, sesame
comparison, coffee, ice cream, orange cake). It found what the three per-language reviewers could
not have: a fabricated infused-flavour name in Malay ("halia hitam" / black ginger — not one of the
real six) and a Malay/English-vs-Arabic disagreement on the same recipe's pan size and oven
temperature, treating the two independently-agreeing languages as the correct side. Both required a
second patch directly into the already-imported `.ts` file, not just the draft — `press-import.py`'s
skip guard means a fix landing on a draft after the real import has run does not propagate on its
own.

**English came back completely clean for the first time in seven rounds** — the EN reviewer found
zero defects across all 6 drafts. Worth noting as a data point, not a pattern yet: could mean the
brief and writers are converging, could mean this round's EN topics (comparisons, a trend, two
recipes) were simply lower-risk than earlier rounds' health-adjacent or figure-heavy ones.

