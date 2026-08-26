# PRESS round 6 — gate report

## Mechanical gate

`bin/press_gate.py` over the rendered `dist/` HTML, 18 articles, `--max-words 1060`.

**ALL GATES PASSED, 0 failures.** Sitemap 123 → **141**. Payload for the whole image library
16.1 MB (192 heroes+inlines + 96 OG cards, site-wide — the round did not carry its own).

Repo gates: `tsc -b` 0 · `check:llms` 0 · `check:ai` 0.

Cannibalisation: 18 focus keywords, all unique inside the round and against the **87** live
article instances at Stage 1, re-checked after import against the full corpus; no slug or id
collisions.

## Adversarial review — three reviewers, one per language

**Eleven blockers, five serious.** Consistent with rounds 3–5, the blockers were contradictions
against the site's own published copy, recipe arithmetic that didn't check out, and one broken
link — not weak writing.

### Fixed before shipping

| # | Lang | Defect | Fix |
|---|---|---|---|
| B | en | `olive-oil-roasted-vegetables`' temperature table ran vegetables at 200–230 °C, **above the site's own published 180–200 °C oven-roasting ceiling** for extra virgin oil (`olive-oil-smoke-point-what-heat-it-can-take`, `olive-oil-substitute-what-to-use-instead`), and an FAQ asserted "without difficulty" at those temperatures | Table and FAQ rewritten to 180–200 °C |
| B | ms | `minyak-zaitun-untuk-sayur-panggang` ran the same vegetables at up to 220 °C against the same published ceiling, and its own FAQ claimed it was safely inside the site's smoke-point range when it wasn't | Table and FAQ corrected to 180–200 °C |
| B | ms | `minyak-zaitun-untuk-telur`'s method told readers to heat the oil **until it smokes** as the readiness cue — the live `minyak-zaitun-untuk-goreng` states plainly that a smoking pan is too hot for *any* oil | Cue changed to "fine bubbles round the spatula tip", with the smoke warning stated explicitly |
| B | ms | `minyak-zaitun-vs-mentega` linked the baking-ratio deferral to `olive-oil-substitute-what-to-use-instead` — an **English-only slug with no Malay translation**, a guaranteed 404 on the Malay site | Re-pointed to the live Malay `minyak-zaitun-untuk-kek-dan-bakeri`, which owns the ratio |
| B | ar | `zayt-alzaytun-lilbayd` told readers to strain and reuse frying oil once or twice — the live `zayt-alzaytun-lilqaly` states flatly, twice, **"not even once"** | Rewritten to match; this also surfaced that the reuse rule genuinely differs by language in the live corpus (EN: not reused · MS: 2–3 uses with filtering · AR: never) — a pre-existing split, not something this round should paper over |
| B | ar | The same article's own numbers didn't support its own claim: 3–4 tbsp cannot fill a 0.5 cm depth in a 20 cm pan (needs ~157 ml; 3–4 tbsp is 45–60 ml) | Corrected to 8–10 tbsp for that pan size |
| B | ar | `zayt-alzaytun-lilfawshar` had two in-body links with no leading slash, which the renderer treats as external rather than an internal route — both silently broken | Slashes restored |
| S | ar | `zayt-alzaytun-al-rakhis`'s opening line echoed the live pricing article's hook near-verbatim | Rewritten |
| S | ms | `minyak-zaitun-untuk-steak` used the bare English loanword "sear" roughly 30 times, where the corpus's own term is "goreng kilas" — zero occurrences of "sear" anywhere in the live Malay corpus | Swept to the native term throughout; one typo ("disenal" → "disental") fixed in the same pass |

### Verified clean — do not "fix" these later

- **Reg. 18(6): clean in all eighteen**, prose, table cells and FAQ answers. Every health-adjacent
  question in `olive-oil-vs-butter`, `minyak-zaitun-vs-mentega` and `zayt-alzaytun-walzubda` is
  explicitly deflected to a doctor or dietitian, matching the pattern the live
  `olive-oil-vs-coconut-oil-in-a-malaysian-kitchen` established.
- **No article restated the baking conversion ratio** the live substitute/kek-dan-bakeri/lilmuajanat
  articles own — all three "vs butter" articles defer correctly (after the one broken link above
  was fixed).
- **No acidity figure** attached to this product anywhere. No invented award, rating, count,
  certification, or brand accusation.
- `zayt-alzaytun-lilbayd` carries **zero** hair-care content, despite the keyword pull returning a
  large hair-mask cluster on the same Arabic words.
- `olive-oil-for-steak`, `minyak-zaitun-untuk-steak` and `zayt-alzaytun-lilsteak` all stay
  stovetop and correctly defer smoke-point figures and grilling content to their live siblings.
- All h1s orthographically sound; no stripped hamzas.
- Every internal link resolves (after the two fixes above), in all three languages.

## Stage 4 — the site-wide image system, exercised for the first time under real growth

This is the first round to run entirely on the reuse-only recut/sync scripts from the previous
session. Two real bugs in that machinery surfaced under the load of a sixth round (105 articles,
up from 87) and are now fixed in the scripts themselves, not worked around:

1. **A false "pool exhausted" failure.** `taken_boxes` was scoped only by language, so a hero crop
   and an inline crop of the *same* source photo were competing for one shared budget of boxes —
   even though they resize to different output dimensions and can never collide on disk. Rescoped
   to `(language, slot)`; the real allocation succeeded immediately once fixed.
2. **A silent no-op patch.** An earlier `str.replace()` call reported success but matched nothing,
   leaving the buggy code in place while the terminal said otherwise. Caught only by re-reading the
   file. Worth remembering: `.replace()` on a miss is silent, not an error.

Post-fix: **192 heroes+inlines, 0 duplicates within any language**; 96 OG cards, 61 sharing a frame
with another article (expected — 16 real photos cannot give 105 articles unique cards; recorded in
`docs/press/IMAGE-POLICY.md`, unchanged this round). All 96 built pages verified serving their own
byte-unique file.

## Left open — recorded as D44–D45

1. **The frying-oil reuse rule is genuinely different by language on the live site itself** — not
   introduced by this round, surfaced by it. EN says "not reused", MS says "two or three times with
   filtering", AR says "not even once". Worth a single owner decision on which is correct, rather
   than three quietly different answers depending on which language a reader lands on.
2. **My own brief repeated the MS/EN figure as a blanket "this site's advice" line** without
   checking it against the Arabic corpus specifically — the third round running a brief fact went
   unchecked against the corpus. The AR writer's draft inherited it and a reviewer caught it.
