# PRESS round 4 — gate report

## Mechanical gate

`bin/press_gate.py` over the **rendered** `dist/` HTML, 18 articles, `--max-words 1060`
(the rendered region carries the key takeaway, which the draft counter does not).

| Run | Result |
|---|---|
| Control — `olive-oil-shelf-life`, live since round 3 | 30/32, 0 failures. Its two warnings (`hreflang-languages` on a single-language cluster, `image-dimensions` on the inline) are the site's baseline, not this round's |
| Round 4, first run | **18 false failures** — my file list was written with CRLF and every path carried a trailing `\r`. The auditor was the thing that was wrong, again |
| Round 4, second run | 2 real failures: `answer-first` on two Malay conclusion headings whose closing paragraph was 23 and 20 words against a 25-word floor. Both rewritten |
| Round 4, final | **ALL GATES PASSED — 0 failures**, 18/18 |

Repo gates: `tsc -b` 0 · `check:llms` 0 · `check:ai` 0 · sitemap 87 → **105 URLs** · payload **4.2 MB**
against the 6 MB ceiling of D12.

## Adversarial review — three reviewers, one per language

This is where the round earned its keep, exactly as round 3 predicted. Each reviewer was given the
six drafts **plus the live corpus and the language's `llms*.txt`**, because a reviewer without the
published copy cannot find the only defect class that matters.

**Twelve blockers and a long tail of serious items.** Almost none were bad writing.

### Fixed before shipping

| # | Lang | Defect | Fix |
|---|---|---|---|
| B | en | The coconut FAQ **inverted its own physics** — "24 °C, below air-conditioned room temperature, so it turns firm". If 24 °C is below room temperature the oil is liquid. It contradicted the article's own body and key takeaway, in the block most likely to be lifted as a snippet | Rewritten |
| B | en | The same error had already reached `llms.txt` as the round's own index line ("in a kitchen that runs at 30 °C one of them is liquid and the other is not") | Excerpt rewritten, brief regenerated |
| B | en | "A tumis runs 140–180 °C and **neither fat objects**" — the site's own published table puts virgin coconut oil at 175–200 °C, i.e. at its smoke point at the top of that range | Caveat added |
| B | en | Four statements built a cost argument on "frying oil is not reused", while the live health article describes reused frying oil in Malaysian households as a fact | Re-argued on volume: a fryer takes a litre or two |
| B | en | `olive-oil-bottle-size` arithmetic: 250 ml at 225 ml a week is 7.8 days, printed as "about 10 days", and the FAQ used 200 ml against the table's 225 | Both corrected |
| B | en/ms/ar | **`llms*.txt` claimed "Last updated: 2026-08-14"** while indexing articles dated 2026-08-25. The date was a **hardcoded literal in all three templates** that the generator never touched | `{{LAST_UPDATED}}` token added, derived from the newest article in the manifest — content-derived, so `--check` stays deterministic. `press-import.py` now carries `dateModified` into the manifest |
| B | ms | **A nutrient-content claim inside the artwork.** The reused `malaysian-woman-bottle-kampung` frame shows the product label legibly: "ORGANIC" and a "Rich in Antioxidants" bullet. Fourth instance of this rejection on this repo | The frame was **removed from the round entirely** — one inline and two OG cards re-derived from other photos |
| B | ms | "Only **three** grades reach retail" against the live grades article's "**four** common grades… and pomace" | Corrected to four |
| B | ms | The heat ranking was **reversed**: the draft handed rempah-tumising to coconut oil for "taking high heat", while the site publishes virgin coconut oil at 175–190 °C against extra virgin at 190–210 °C | Rewritten; coconut now correctly smokes earlier |
| B | ms | The round contradicted itself on bitter oil in sweet cakes — one article forbade it, the next made it the point | Scoped to soft coconut-milk kuih and puddings |
| B | ar | "The official grades are **three**" against a published ladder of six | Corrected |
| B | ar | `zayt-alzaytun-almukarrar` said Light describes colour "and nothing else", then its own table and FAQ gave it a lower virgin ratio | Made consistent with the published position |
| B | ar | The pomace pointer linked to an article that never mentions pomace | Re-pointed |
| B | ar | A flat "not the fridge" instruction citing, in the same section, the live article that says "not necessary, and harmless if you do" | Softened to match |
| B | ar | Two drafts gave "about two months" opened where the live storage article refuses a single number | Bridged: "a few months, about two in Malaysia's heat" |
| S | ar | The H1 shipped the **unhamzated** keyword — `ام` / `ايطالي` — while the metaTitle had it right | H1, seoTitle and focus keyword corrected; the raw variant kept as a related keyword |
| S | ar | `afdal` deferred the origin question and then dead-ended with no link, while `balad-almansha` routed "the full checklist" past this round's checklist to an older article | Both re-linked |
| S | ar | `afdal` told readers to decant into a small dark bottle; `zujajat` forbade refilling bottles | Distinguished: a washed, dried decanter is not a topped-up oily empty |
| S | en | The garlic article never said **what botulism does**, and "a few days" was never a number | "A medical emergency" added; three or four days, plus freezing for longer |
| S | en | The garlic article told readers to refrigerate while the site says never refrigerate olive oil, without reconciling | Named as the one exception |
| S | en | `olive-oil-bitter-taste`'s hero was **byte-identical** to the live Arabic taste article's hero — my crop box duplicated round 3's exactly | Re-cropped; also fixed the songkok being cut out of frame |
| S | en | The substitute hero's alt claimed "different shades of gold"; the four bottles are the same yellow | Alt corrected to the real frame |
| S | en/ms | A section headed "Cost by the litre" with no cost in it, while `storeFacts.json` publishes both per-litre figures | Figures added |
| S | ms | A heading naming 28–32 °C sat directly above a paragraph about 24 °C, manufacturing a false snippet from correct copy | Heading rewritten |
| S | ms | "Olive oil does not harden when the cake is chilled" — unscoped, against the site's own note that cold cloudiness is normal | Scoped to room temperature |
| S | ms | The buying guide omitted the brand's most load-bearing commercial fact — that there is no other legitimate seller in Malaysia | Added |
| S | ms | `sejuk-tekan`, a word-order calque, used across the round while the site's own brief uses `perahan sejuk` throughout | Replaced everywhere in the round |

### Verified clean, so nobody "fixes" them later

- **Reg. 18(6): zero violations in copy**, all three languages, table cells and FAQ answers included.
- **No acidity figure attached to this product** in any of the eighteen. The only acidity numbers are
  the 0.8 % extra-virgin grade limit, which the site already publishes.
- **No invented checkable facts** — no award, rating, count, tonnage, yield, lab result, export
  statistic or testimonial anywhere in the round.
- **Every internal link resolves.** All `related` paths and all in-body links checked against
  `slugs.json` and the router, in all three languages. No `story` route, no broken slug.
- `minyak-zaitun-palsu` calls the fridge test a myth, as briefed. `afdal-zayt-zaytun` never uses
  origin as a criterion and never writes "الأفضل" as a product claim. `zayt-alzaytun-balad-almansha`
  ranks no country. `zayt-zaytun-baladi` never calls this product "بلدي".
- The garlic safety rule is correct, early and in five places, and the article never teaches
  shelf-stable room-temperature garlic in oil.

### Raised, not fixed — these need the owner

Recorded as **D36–D38** in `docs/press/DECISIONS.md`.

1. **The site's own product page fails two tests this round publishes.** Two Arabic articles tell
   the reader that a seller who cannot name the mill or the region has told them nothing, and that
   an organic claim needs a named certifier and a certificate number. `llms-ar.txt` calls the
   product organic four times with no certifier anywhere, and publishes no mill, region or cultivar.
   The advice is correct; the product copy is what needs to change, and that is not a content
   decision.
2. **English cannibalisation between `olive-oil-substitute` and `olive-oil-for-baking`.** Both
   carry the butter-to-oil ratio, both target the conversion query, and their FAQs are near
   duplicates. Left as shipped because collapsing them is a rewrite, not an edit.
3. **Pre-existing corpus disagreements this round makes conspicuous** — the live cooking article's
   "two or three months" against the eight-week rule everywhere else, and the live smoke-point
   article's "120 to 160 °C" tumis range against the 140–180 °C the briefs and `llms.txt` use.
