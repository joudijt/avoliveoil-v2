# PRESS round 7 — gate report

## Mechanical gate

`bin/press_gate.py` over the rendered `dist/` HTML, 18 articles, `--max-words 1060`.

**ALL GATES PASSED, 0 failures.** Sitemap 141 → **159**. `tsc -b` 0 after every stage, both before
and after the review fixes. Site-wide image recut: 0 errors, 228 heroes/inlines re-cut across all
123 articles, 0 duplicates within any language.

Cannibalisation: 18 focus keywords, all unique inside the round and against the **99** live article
ids at Stage 1, re-checked after import against the full corpus; no slug or id collisions.

## Adversarial review — three per-language reviewers plus a cross-language reviewer

Four defects found and fixed, from three of the four reviewers. Consistent with every round since
3, the defects were contradictions against the site's own published copy or misattributed links —
not weak writing.

| # | Lang | Reviewer | Defect | Fix |
|---|---|---|---|---|
| 1 | ms | Cross-language | `kopi-minyak-zaitun` invented a nonexistent infused flavour, **"halia hitam" (black ginger)** — not one of the site's real six (wild thyme, blackseed, turmeric & black pepper, rosemary & basil, fennel & anise, lavender & chamomile) | Draft and the already-imported `ms.ts` both corrected to real flavours (rosemary & basil / turmeric & black pepper) |
| 2 | ar | Cross-language | `kaykat-alburtuqal-bizayt-alzaytun`'s pan size (22 cm) and oven temperature (175 °C) disagreed with the independently-written EN and MS versions of the same recipe, which agree with each other (20 cm, 170 °C) — the odd one out was treated as the error | Draft and `ar.ts` both corrected to 20 cm / 170 °C |
| 3 | ar | AR reviewer | `zayt-alzaytun-lilbatatis-almahrusa` linked the general oil-vs-butter comparison to `zayt-alzaytun-lil-tabkh` (a general cooking/frying guide that never discusses butter) instead of `zayt-alzaytun-walzubda` (the article that actually owns that comparison) | Draft and `ar.ts` both corrected to link `zayt-alzaytun-walzubda` |
| 4 | ar | Cross-language (flagged) | `ays-krim-bizayt-alzaytun` stated "3–4 tbsp per 500 ml cream and milk" while its own ingredients table listed 2 cups cream + 1 cup milk (≈710 ml) — an internal mismatch, not a cross-language one | "نصف لتر" (half a litre) corrected to "ثلاثة أكواب" (three cups) in all 3 occurrences, to match the table exactly, in both the draft and the already-imported `ar.ts` |
| — | en | EN reviewer | **No defects found.** All 6 clean on first read: correct smoke-point handling, correct Reg. 18(6) deflection, no fabricated infusions, no broken links. |

**Note on sync:** because `press-import.py`'s skip guard fires once a round's marker exists in a
content module, a fix landing on a draft *after* the real import has already run does not
propagate automatically. Two of the three fixes above (#2, #3) required a second, direct patch to
`ar.ts` alongside the draft — done and verified in the rendered HTML before the gate re-run.

### Verified clean — do not "fix" these later

- **Reg. 18(6): clean in all eighteen**, including the three articles the brief flagged as highest
  risk (coffee, ice cream, mashed potatoes) — all three explicitly defer the health question to a
  doctor or dietitian rather than answering it.
- **No invented smoke-point figure** for sunflower or sesame oil in any language. Refined
  sunflower's already-published ~225 °C is cited correctly where used; sesame is explicitly left
  unnumbered in all three languages, matching the brief.
- **No article restated the baking-substitution ratio** the live `olive-oil-for-cakes-and-baking` /
  `minyak-zaitun-untuk-kek-dan-bakeri` / `zayt-alzaytun-lilmuajanat` own — all three orange-cake
  articles defer correctly.
- **No garlic, orange or lemon infused-oil product suggested** anywhere — orange and lemon appear
  only as literal recipe ingredients (zest, juice), never as a flavour that does not exist.
- **Cross-language numeric consistency** on the five genuine topical mirrors (sunflower, sesame,
  coffee, ice cream, orange cake) checked pairwise across all three languages — clean after the two
  fixes above.
- Every internal link resolves (after the fixes above), in all three languages.

## Left open — recorded as D46

1. **Two different published orange-cake recipes now coexist on the Malay site**, surfaced by the
   MS reviewer. `minyak-zaitun-untuk-kek-dan-bakeri` (live since an earlier round) already carries
   its own worked orange-cake example inside its general baking guide: 130 ml oil, a 22 cm loaf
   pan, 160 g sugar, 150 g yogurt, 170 °C, 45–50 minutes. The new dedicated
   `minyak-zaitun-kek-oren` (this round) independently arrived at 180 ml oil, a 20 cm round tin,
   200 g sugar, no yogurt, same 170 °C. Neither is wrong on its own terms — one is a general
   article's illustrative example, the other a dedicated recipe — but a reader who found both would
   see two different recipes for what both call "kek oren minyak zaitun". Not fixed: editing the
   live round-4-era article is outside this round's scope. Worth a single owner decision on whether
   the general article's example should be trimmed or cross-referenced instead of left as a second,
   silently different recipe. Also unflagged-but-noted: sugar quantities across the three
   independently-written orange-cake versions vary (EN 220 g, MS 200 g, AR ≈300 g) — ordinary
   recipe-to-recipe variance, left alone.
