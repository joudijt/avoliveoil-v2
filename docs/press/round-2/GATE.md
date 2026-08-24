# Round 2 — gate report

Run 2026-08-25 against **rendered HTML in `dist/`**, not source templates. What ships is what
gets crawled.

## Result

| Gate | Result |
|---|---|
| `press-import.py --round 2 --check` | **9/9 drafts valid** — word band, section shape, answer paragraphs, meta lengths, focus-keyword uniqueness, renderer-safe markup |
| Adversarial draft pass (compliance, invented facts, cannibalisation, links) | **0 real findings**, 2 auditor bugs (below) |
| `press_gate.py`, 9 rendered pages | **9/9 pass, 30/32 checks each**, 0 failures |
| `tsc -b` | exit 0 |
| `npm run check:llms` · `check:ai` · `ai:coverage` | exit 0 |
| Sitemap | 60 → **69 URLs**, 0 `undefined`, all 9 new URLs present |
| Prerender | 9/9 article directories written, 52–63 KB each |
| OG cards | 9/9 present in `dist/og/`, hero `<img>` and `og:image` both resolve to real files on all 9 |
| Round payload | 2.6 MB against a 6 MB ceiling |

## Word counts (draft body, as the importer counts it)

| Article | Lang | Words | Sections | FAQs |
|---|---|---|---|---|
| `olive-oil-for-cooking` | en | 982 | 6 | 6 |
| `olive-oil-vs-pomace-oil` | en | 962 | 6 | 6 |
| `olive-oil-smoke-point` | en | 988 | 6 | 6 |
| `minyak-zaitun-habbatus-sauda` | ms | 990 | 6 | 8 |
| `minyak-zaitun-untuk-salad` | ms | 980 | 7 | 7 |
| `zaitun-dalam-al-quran` | ms | 981 | 6 | 7 |
| `zayt-alzaytun-kuala-lumpur` | ar | 897 | 6 | 8 |
| `sier-zayt-alzaytun-malaysia` | ar | 913 | 6 | 8 |
| `hifz-zayt-alzaytun` | ar | 975 | 6 | 8 |

## Five findings were the auditor's own bug, not the round's

Every one of these was verified before being acted on, and the gate was corrected rather than the
page. **The control that settled three of them:** running the same gate against round-1 articles
that have been live and verified since 2026-08-20 produced the identical failures. Whatever both
rounds fail, the gate is wrong about.

1. **`CLAIM?` × 3 on the salad article.** The Malay health-claim pattern contained a bare `imun`,
   which fired on **timun** — cucumber — three times. Fixed with an explicit letter boundary.
   `\b` is not usable here; it is dead on Arabic anyway.
2. **`LINK` × 1**, en-1's link to en-3 reported as an unknown path. The checker collected known
   slugs incrementally in filename order, so a link to an article later in the alphabet looked
   broken. Fixed by collecting the round's slugs up front.
3. **`word-count` 1100 vs a draft body of 982.** The gate folded the related-posts rail and the
   call-to-action into the total. The region is now cut at the first boilerplate heading, in all
   three languages. The FAQ block is still counted — round 1 established that it is article content.
4. **A residual ~55-word gap after that fix, explained not fudged.** The rendered page carries the
   **key takeaway**, which the draft word count deliberately excludes. 948-word body + 53-word
   takeaway = the 1020 the gate reports on a round-1 article. The two counters measure different
   things; the gate is now documented as needing `--max-words 1060` against an 800–1,000 draft band.
5. **`answer-first` failing the FAQ heading — on Malay and Arabic only.** Not a language bug: a
   threshold accident. The FAQ heading is followed by the first FAQ *answer*, and the floor is 25
   words. English's first answer ran **26** words and passed; Malay's ran **24** and Arabic's **21**,
   and both failed. Arabic states the same content in fewer words as a matter of language, so this
   check would have failed Arabic nearly every round. The FAQ heading is now exempt from
   answer-first — it is structural, not a content section — while staying inside the word count.

Same family as round 1's English-only boilerplate list, which passed every English page and failed
the same call-to-action block on every Malay and Arabic one. **A monolingual threshold is a
monolingual gate.**

## Two warnings, both understood, neither fixed

- **`hreflang-languages`, all 9 pages.** Each article declares only the language it was written in.
  That is PRESS non-negotiable 4 — never translate an article between languages — and round 1
  shipped 15 single-language articles the same way. The gate now reports this instead of failing it.
- **`image-dimensions`, all 9 pages.** `src/components/blog/ArticleBody.tsx` renders inline `<img>`
  with no `width`/`height`, so every article on the site carries a CLS risk on its inline image.
  **Pre-existing** — round-1 pages produce the identical warning. Not introduced here and not fixed
  here; it needs a real fix in the component, since inline crops are not all one size.

The related hero bug **is** fixed for this round: `ArticlePage.tsx` declares `width={1280}
height={720}`, and round 2's heroes are exactly 1280×720. Round 1's are 1024×576 behind the same
declaration and remain so.

## Two repo bugs this round exposed, both fixed

Round 1 found five. Round 2 found two, and both are the same shape: **a script that only worked
once.**

1. **`press-import.py` hardcoded the string `PRESS round 1`** in its skip guard and its block
   banner. Round 2 would have silently skipped every content module and written nothing.
2. **`press-import.py` anchored its `ImageKey` union and image-map edits on `'kampungBottle'`** —
   whichever member happened to be last *before round 1*. After round 1 appended its own members
   those anchors stopped matching, so round 2 added 18 imports and **zero** union members and
   **zero** map entries, and `tsc` failed on every new key. Both edits now anchor on the union's
   terminating `;` and the map's closing `};`, and the import line is guarded separately from the
   map entry so a re-run cannot duplicate an import.

Both were caught by running `tsc -b` and reading its output rather than trusting an exit code —
and note that `npx tsc -b | tail -5` reports **tail's** exit status, not the compiler's.

## Compliance

Zero health claims across all nine articles, verified by pattern scan in three languages and by
reading. The `khasiat` / `kebaikan` cluster remains deliberately untargeted (D11).

`minyak-zaitun-habbatus-sauda` is the round's sharpest edge — its keyword demand is almost entirely
health-shaped. It answers the product question instead and says so once, in one sentence, without
citing the regulation.

`zaitun-dalam-al-quran` cites five Quranic references and no hadith: At-Tin 95:1, An-Nur 24:35,
Al-An'am 6:99 and 6:141, An-Nahl 16:11. Each was checked to genuinely name the olive. Quotations
are labelled *terjemahan makna*. No tafsir, no efficacy claim, no politics.

## Open for the owner — not changed by this round

1. **The product label in the photography reads "Rich in Antioxidants" and "100% Natural".** Both
   images are already live on the homepage, so this round adds no new exposure — one candidate crop
   that enlarged the line was rejected and re-cut. But a nutrient-content claim is governed by the
   Malaysian nutrient-claim rules, not only Reg. 18(6), and nobody has confirmed the oil meets the
   compositional criteria.
2. **The live Malay copy on the blackseed infused product page carries "cara tradisional… dengan
   madu" and "biji yang berkat".** Both read as indirect health/barakah framing. The round-2 article
   deliberately reuses neither, which means the article and the product page it links to now differ
   in tone. Needs an owner decision, not a content decision.
3. **The invented testimonials are still live** — `Layla H.`, `Omar K.`, `Sara M.` and a `500000`
   statistic in `src/i18n/locales/en/common.json`. Open since 2026-08-18 and unrelated to this round,
   but it is the same class of defect the round is written to avoid.
