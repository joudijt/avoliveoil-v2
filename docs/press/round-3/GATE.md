# PRESS round 3 — gate report

18 articles, 6 per language. Baseline `91682c7`, branch `press-round-3`.

## Control run first

Before believing any finding, two articles that have been live and verified since round 2 were
gated with the identical command:

```
python bin/press_gate.py dist/en/blog/olive-oil-smoke-point-what-heat-it-can-take/index.html \
                         dist/ar/blog/hifz-zayt-alzaytun/index.html \
                         --langs en,ms,ar --max-words 1060
```

Both returned **30/32 passed** with the same two warnings every round-3 page produces:

- `hreflang-languages` — a single-language article does not declare the site's other two. That is
  PRESS non-negotiable 4 working as designed, not a defect.
- `image-dimensions` — the inline `<img>` and the header logo carry no width/height. That is the
  renderer (`ArticleBody.tsx` L98-104 and the logo component), identical on every article the site
  has ever published. Pre-existing, not introduced by this round.

So 30/32 is this gate's ceiling on this codebase. Anything at 30/32 is clean.

## Mechanical — `bin/press_gate.py` over the rendered HTML

| Articles | Result |
|---|---|
| 6 English | 30/32 each, **0 failures** |
| 6 Malay | 30/32 each, **0 failures** |
| 6 Arabic | 30/32 each, **0 failures** |

Word counts were gated at `--max-words 1060`, which is the draft band of 800–1,000 plus the key
takeaway and H1 that the rendered region also carries.

## Draft contract — `scripts/press-import.py --round 3 --check`

**18/18 drafts valid.** The importer enforces word band, section count, answer-paragraph length,
FAQ count, meta lengths, focus-keyword tokens in the H1, slug charset, structured-block presence,
markup the renderer cannot handle, and focus-keyword uniqueness across the round.

## The project's own gates — all green, all were green before

| Script | Result |
|---|---|
| `npm run check:llms` | exit 0 — all three briefs regenerate byte-identical |
| `npm run check:ai` | exit 0 — `AI-FACTS.yml` still in sync with `storeFacts.json` |
| `npm run ai:coverage` | exit 0 |
| `npx tsc -b` | exit **0**, read from the real exit code and not through a pipe |
| `npm run build:prerender` | exit 0, 51 blog routes prerendered |

## Wiring checks done by hand

| Check | Result |
|---|---|
| Sitemap | 69 → **87 URLs**; the new slugs are present in `public/sitemap.xml` and in `dist/` |
| `npm run sitemap` run explicitly | Yes — it is **not** part of `build:prerender` on this repo |
| llms surfaces | each new article appears in its own language brief and in `llms-full.txt` |
| Inbound links | the blog index of each language lists its new articles; every article names two siblings |
| OG image on disk | `og:image` URL resolved to a real file for the pages spot-checked |
| Canonical / robots / twitter | present and self-referencing on the pages spot-checked |
| JSON-LD | `BlogPosting` + `FAQPage` + `BreadcrumbList` + the site's Organization/GroceryStore graph |
| Owner-facing leaks | `dist` grepped for TODO/FIXME/brief fragments/`{{TOKEN}}` — none |
| Hero dimensions | all 18 heroes are exactly 1280×720, which is what `ArticlePage.tsx` declares |
| Round payload | 54 files, **3.66 MB** against the 6 MB ceiling (D12) |
| Rollback recorded | `ROLLBACK.md`, written before Stage 5 edited anything |

## Adversarial review

Three reviewers, one per language, each with the language, the ceiling and the live site in front
of them. Findings and what was done about them are recorded below.

### English — 4 blockers, 14 should-fix, all fixed

| # | Finding | Resolution |
|---|---|---|
| 1 | `olive-oil-shelf-life` said an unopened bottle keeps "eighteen months to two years". `llms.txt` L262 says "up to about 18 months". The article's floor was the site's ceiling | Changed to "up to about eighteen months from harvest" in all four places |
| 2 | Same article said an opened bottle gives "two to three months". `llms.txt` L263 **and** the live authenticity article both say about two months — and this article is the one arguing Malaysia is the harder climate | Changed to "about two months" |
| 3 | `olive-oil-marinade` specified 60 ml per 500 g. The live cooking guide's table says 2 tbsp per kilo — 3–4× less — and the article's cost argument was built on the inflated number | Reconciled to the live figure; the cost sentence rebuilt around it |
| 4 | `evoo-vs-pure-olive-oil` cannibalised three live English pages: its focus keyword is already a targeted related keyword on the brand-comparison article, the pomace article has a whole section on pure/light plus a near-identical grades table, and the authenticity article carries the same FAQ | Narrowed to refined-grade labelling only; two duplicated keywords swapped out, the grades table cut to three rows, the duplicate FAQ reduced to one sentence and a link, and three single-paragraph sections merged into bodies with real content |
| 5–8 | `olive-oil-air-fryer`: "the busiest appliance on a Malaysian kitchen counter"; "Most manufacturers warn against them"; an invented 80–200/230°C appliance spec; and three different grade recommendations inside one article | Superlative and unsourced count softened, the invented band dropped in favour of the actionable instruction, and the article now recommends extra virgin in the section, the FAQ and the conclusion alike |
| 11–18 | Two answer paragraphs that pointed at "the table below", two unprovable superlatives, a same-round contradiction between the bread and dressing articles about unheated uses, a 44-word section with no body, and prices retyped into four `related` descriptions | All rewritten; RM236 kept only in the marinade article, where the cost argument needs it |
| 20 | The za'atar section linked only to generic `/products` while the site sells a wild thyme infusion described for exactly that use | Now links the infused product page |

### Malay — 6 blockers, 10 should-fix, all fixed

| # | Finding | Resolution |
|---|---|---|
| 1 | `cara-simpan` said an opened bottle lasts three months; `llms-ms.txt` (twice) and the live price article say two | Changed to two months in all three places |
| 2 | `cara-simpan` allowed the fridge for unopened stock. `llms-ms.txt` says **"Jangan simpan dalam peti sejuk"** flatly, twice — and the round's own generated index line was advertising "bila peti sejuk masuk akal" 700 lines below it in the same file | Carve-out removed; excerpt and meta rewritten so the generated index line no longer advertises it |
| 3 | `cara-simpan` FAQ 2 was a near-verbatim copy of a live FAQ on the salad article — same question string, same three clauses, same order | Replaced with a question built from this article's own placement table |
| 4 | `minyak-zaitun-untuk-goreng`'s key takeaway said the oil smokes before the pan is hot, contradicting its own table (deep-frying at 175–190°C, "Boleh") and the site's published ~190°C figure | Smoking restricted to wok work; deep-frying is a cost problem, not a heat one |
| 5–6 | Virgin coconut oil given as 175–200°C against the live table's 175–190°C, in an article that links to that very table; and three different sauté ranges now on the site (140–180 live, 140–170 and 120–160 in the two new drafts) | Both aligned to the published figures |
| 9–22 | Four derived ringgit figures in a recipe cost table that would drift silently; genuine overlap between `cara-simpan` and `botol-minyak-zaitun` including a near-verbatim line; a third page answering the fried-fish question; a promise of a four-way price comparison the article deliberately does not make; and **nine sentences that read as English in Malay words** — `menutup` for "covers", `minyak mentah` (which means crude petroleum) for unheated oil, `berlegar`, "minyak senyap", `kejut dulang`, `adalah` + adjective | Cost column replaced with millilitres, the container argument ceded to the bottle article, the duplicate FAQ dropped, the promise reworded, and every one of the nine rewritten in natural Malay |

### Arabic — 2 blockers, 12 should-fix; one blocker escalated to the owner

| # | Finding | Resolution |
|---|---|---|
| 1 | `zayt-alzaytun-lilqaly` allowed reusing frying oil once, while the live cooking article it cites three times as its authority prohibits reuse outright — and it borrowed that article's exact justification before inverting the conclusion | Resolved **in the new article**: the allowance is gone, the prohibition matches what the site already publishes, and the freed words went to how you know a batch is finished and how to dispose of used oil |
| 2 | The live site publishes **"Arabian Village tested below 0.028%"** as a laboratory result. `storeFacts.json` holds no acidity figure at all. The new acidity article tells readers that a number with no test date and no named lab is marketing copy — which indicts the site's own claim | **Escalated, not papered over.** See the owner section below. The new article's advice stands as written |
| 3–4 | Frying quantities disagreed four ways inside one article (two tablespoons / half a cup across the takeaway, prose, table and FAQ) and a "thirty times" multiplier that only held against the smallest of them | Settled on one quantity and one temperature range; the multiplier corrected to eight times |
| 6 | `humudat` and `alfarq` overlapped on keywords and both ran an acidity table — though a 5-gram control across all 14 Arabic articles put peak text overlap at 1.08%, so this was SERP overlap, not duplication | Two keywords dropped from `humudat`, and the two articles now cross-link |
| 7–8 | `alfarq` and `aludwi` had the thinnest FAQ answers in the round (28–31 and 27–35 words against 36–44 elsewhere in the same language — a within-language outlier, not a counting artefact) | Every answer now carries a concrete specific: a named defect, the certifier's registration number, the harvest-year line |
| 10–21 | «زيت السمك يبقى فيه السمك» reads as "cod-liver oil keeps the fish in it"; prices retyped into prose; an unsourced "most bottles"; a packer-date recommendation contradicting three other articles; a same-round contradiction about frying grades; and one transliteration outlier | All fixed; prices replaced with the products link |

### Re-gate after the fixes

All 18 articles rebuilt and re-gated: **30/32 each, 0 failures**, identical to the control. `tsc -b` exit 0, `check:llms` and `check:ai` exit 0, sitemap still 87 URLs, 51 blog routes prerendered.

### Inbound linking closed

The Arabic review found the round received **zero article-to-article inbound links** — the blog index listed the new pages, but no established article pointed at one. Six parent articles per language now carry a `related` entry to their round-3 child (18 in all), verified present in the rendered HTML.

### Findings deliberately **not** acted on — the owner's call, not this round's

1. **An unsourced laboratory result is published across the site.** "Free acidity tested below 0.028%" appears **46 times across 10 shipped surfaces** — `en.ts`, `ms.ts`, all four `llms` files, `about.md`, `faq.md`, `AI-FACTS.yml` and the `llms` source templates. `src/data/storeFacts.json`, the project's single source of truth and the file `AI-FACTS.yml` is generated from, contains **no acidity figure at all**; the number is hardcoded in `scripts/ai/facts-sync.mjs` at L117 and L231. It also sits an order of magnitude below the normal premium range, which is what makes it read as a mis-transcription of 0.28%. Deleting a published product claim is not a content round's decision — but it is the largest unsourced checkable fact on the site, and this round's Arabic acidity article now tells readers to distrust exactly that kind of number.
2. **Nutrient-content claims outside the article the owner already ruled on.** D8 settled the health-benefits article. Outside it, `olive-oil-popularity-malaysia` carries five such mentions (antioxidant, polyphenol ×3, vitamin), `choose-authentic-evoo-malaysia` one, and `llms.txt` L222 states "Its high antioxidant content also makes it more heat-stable than its reputation suggests" — the exact class of claim every new article in this round was forbidden to make.
3. **Two seller-name spellings in Arabic.** The live cooking article says «متجر بركة المدينة»; `storeFacts.json` says «متجر بركات المدينة». The new articles use the correct one.
4. **The invented testimonials** (`Layla H.`, `Omar K.`, `Sara M.`) and the `500000` statistic are still live in `src/i18n/locales/en/common.json`, unchanged since they were first raised on 2026-08-18.

## Checks that did not run

| # | Check | Why |
|---|---|---|
| 45 | Mobile render at 375 px | Not opened in a browser this round. The blog template is unchanged since round 2, which was checked, and no round-3 article introduces a new layout — but this is an assumption, not a verification |
| — | Search Console | The property is still not connected. No ranking data informed this round (D14) |
