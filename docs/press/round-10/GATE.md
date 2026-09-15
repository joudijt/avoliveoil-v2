# PRESS round 10 — gate report

Run 2026-09-15. Control run first, per gates.md: `bin/press_gate.py` against a known-good,
previously-live round-9 article (`olive-oil-vs-canola-oil`) to establish the gate's own baseline
before trusting any finding on round 10.

## Control run

```
dist/en/blog/olive-oil-vs-canola-oil/index.html  --max-words 1060 --focus "olive oil vs canola oil"
WARN  image-dimensions   missing width/height on the inline webp + the logo svg
31/32 passed — ALL GATES PASSED
```

Same WARN round 9 recorded against its own control. Not a round-10 defect.

## Mechanical — round 10, all 5 articles

`python bin/press_gate.py <5 files> --langs en --max-words 1060`

| Article | Result |
|---|---|
| olive-oil-vs-red-palm-oil | 30/31 — WARN image-dimensions (same as control). First pass FAILED word-count at 1065/1060 — trimmed two paragraphs directly in `en.ts` (and mirrored into the round-10 draft JSON for the record), re-built, re-gated: passed |
| olive-oil-vs-grapeseed-oil | 30/31 — same WARN only |
| is-olive-oil-a-vegetable-oil | 30/31 — same WARN only |
| olive-oil-varieties-arbequina-koroneiki-and-more | 30/31 — same WARN only. First pass FAILED word-count at 1066/1060 — trimmed, re-built, re-gated: passed |
| olive-oil-harvest-season-early-vs-late | 30/31 — same WARN only |

`--check-og-image` was not passed this run (pre-deploy, the absolute OG URL cannot resolve against
the live domain yet — same "unrun until deploy" situation round 9 recorded). OG file presence and
byte counts were confirmed on disk directly instead (below), and the live gate re-checks it post-
deploy.

Every other mechanical check (word count post-trim, H1 carrying every focus token, key takeaway,
answer-first, section count, structured block, FAQ count/parity, meta title/description length,
canonical, OG set, Twitter card, hreflang, JSON-LD, entity `@id`, internal links out, anchor text,
image format/alt, slug/registry agreement, sitemap presence) **passed on all 5 articles**.

Existing project gates re-run and confirmed still green after the round: `check:llms` (all three
language files up to date), `check:slugs` (en 60 / ar 38 / ms 50, registry agrees), `check:images`
(22 sources, all optimised variants present), `check:heads` (185 routes, 0 problems), `check:ai`
(AI-FACTS.yml in sync), `check:hydration` (15 sampled routes, no hydration errors, no broken images).

### 26a — Focus-keyword uniqueness within the round
Enforced by `scripts/press-import.py`'s own `seen_focus` check at import time — 5/5 drafts valid,
no collision. Also checked against all 143 pre-existing focus keywords (en 55, ms 50, ar 38) before
writing a single draft — see ROUND-10-MAP.md for the topics discarded specifically because they
collided, including two (`olive oil for pasta`, `olive oil polyphenols`) that looked clean against
`focusKeyword` alone but turned out to overlap an existing page's `relatedKeywords`/category on
closer reading, and one (`olive oil packaging`) that collided with a live article's own H2.

### 26b — Round payload ceiling
1,647,102 bytes (≈1.57 MB) across the 5 new hero/inline/OG files, plus small 400/600px responsive
card copies from `optimize-images.py`. Set before Stage 4 at "well under 6 MB" (D12/D54/round-9
precedent); measured after at ≈1.57 MB direct. Comfortably inside.

### 26c — Rollback recorded
`1a4d6d103818a936ff959dc1452d4a1ef08ef23c` on `main`, clean working tree, recorded before Stage 5
began (branch `press-round-10` created from this commit).

## Image reuse — Stage 4

Reuse-only, per the 2026-08-26 standing ruling. `scripts/recut-article-images.py` re-cut the
**whole site** (278 heroes/inlines this round, up from 268 in round 9 — the count is distinct
crops, not distinct source frames), which is additive by design. `check:slugs` confirms every
pre-round article kept a prerenderable page (en 60 / ar 38 / ms 50, unchanged pre-round-10 counts
plus the 5 new EN articles). No image was generated.

The library is the same 16-photograph pool documented in `IMAGE-POLICY.md`, now spread across 148
manifest entries. One hero (`olive-oil-harvest-season-early-vs-late`) landed on a bottling-line
frame rather than a grove/harvest-themed one — the script assigns by rotation within the remaining
crop-uniqueness constraint, not by manual subject curation, and the pool has no dedicated
harvest-season frame left unclaimed. Flagged here rather than silently accepted: the picture is
still genuinely on-brand olive-oil-production photography, not a mismatch of category, but a
future photo shoot (IMAGE-POLICY.md's own stated fix) would let harvest-themed articles get a
harvest-themed picture.

## Judgement — adversarial review

**Run in-session by the same process that wrote the drafts, not a separately spawned reviewer
agent** — this execution context (a fork instructed not to spawn subagents) could not run an
independent review. Recorded here as a limitation, not hidden as a pass, same disclosure round 9
made (its D70). The checklist (article-spec hunt list 27–36) was applied deliberately against all
5 drafts before and after import:

| # | Hunt for | Finding |
|---|---|---|
| 27 | Invented checkable facts | None found. Red palm oil and grapeseed oil smoke-point/flavour claims are stated as approximate ranges and qualitative comparisons, never precise unsourced numbers, because this site does not sell either product and has no bottle to cite. Arbequina/Koroneiki/Picual/Hojiblanca region-of-origin and flavour-profile claims are well-established general food knowledge, the same category of fact the site already publishes for canola/coconut/grapeseed processing. Harvest-season dates were checked against and matched the live `palestinian-olive-oil-what-makes-it-different` article's own figures (October–November) rather than invented independently |
| 28 | Unprovable superlatives | None used |
| 29 | Legal-ceiling violations | None — no disease prevention/treatment/cure claims. The two comparison articles (red palm oil, grapeseed oil) carry the same "this is a composition difference, not a treatment claim — ask a doctor" pattern round 9 and round 8 established for health-adjacent passages |
| 30 | Contradictions vs live site | None found. The harvest-season article's October–November Palestinian window and its early/bitter-vs-late/mild framing were checked against and **match** the live origin article and the live shelf-life article rather than conflicting. The varieties article explicitly defers to the live Palestinian-origin article for Nabali detail instead of re-deriving it, to avoid the exact kind of duplication that would read as a contradiction if the two ever drifted |
| 31 | Cross-language translation | N/A — round is English-only (see ROUND-10-MAP.md for why: the one real Malay candidate found in demand research, `minyak zaitun vs minyak sawit`, turned out to already be a live MS article) |
| 32 | Cannibalisation | Checked against all 143 live keywords plus round-internal uniqueness. Two initially-attractive topics were dropped specifically for this reason after a closer read of their target `focusKeyword`'s *related content*, not just its keyword string — see ROUND-10-MAP.md |
| 33 | Thin sections | None — every section carries an answer paragraph plus a second paragraph, list or table |
| 34 | Retyped facts | The one product fact used (Arabian Village / Berkat Madinah, 250 ml and 500 ml, Palestinian first cold pressed) reuses the exact phrasing already live in round-8/9 `related` blocks rather than retyping from `storeFacts.json` directly; no prices/addresses/hours retyped anywhere |
| 35 | Unquotable answers | Spot-checked; every answer paragraph reads standalone |
| 36 | Hallucinated repo context | None — every internal link target (`olive-oil-vs-canola-oil`, `olive-oil-smoke-point-what-heat-it-can-take`, `extra-light-olive-oil-vs-extra-virgin-olive-oil`, `palestinian-olive-oil-what-makes-it-different`, `why-does-olive-oil-taste-bitter`, `olive-oil-price-in-malaysia-what-you-are-paying-for`, `olive-oil-shelf-life-how-long-a-bottle-lasts`) was verified against `slugs.json` before use — two initial guesses (`/blog/olive-oil-smoke-point`, `/blog/why-is-olive-oil-so-expensive-in-malaysia`) were wrong and corrected after checking |

**This is a real limitation of the round, disclosed rather than smoothed over**: a genuinely
independent adversarial reader, with no stake in the drafts passing, would likely catch things
self-review misses. Flagged as an open item (see DECISIONS.md).

## Live — after deploy

Filled in after `scripts/ftp-deploy.py` runs. Checks: each URL serves the article (byte/body
compare, not status), no redirect hop, OG image serves as an image, rendered HTML carries the meta,
sitemap fetches and includes the 5 new URLs, IndexNow accepted, payload budget, no owner-facing
text leaked, mobile render at 375px.
