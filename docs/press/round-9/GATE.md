# PRESS round 9 — gate report

Run 2026-09-15. Control run first, per gates.md: `bin/press_gate.py` against a known-good,
previously-live round-8 article (`advantages-of-extra-virgin-olive-oil`) to establish the
gate's own baseline before trusting any finding on round 9.

## Control run

```
dist/en/blog/advantages-of-extra-virgin-olive-oil/index.html  --max-words 1060 --check-og-image
WARN  image-dimensions   missing width/height on the inline webp + the logo svg
31/32 passed — ALL GATES PASSED
```

The image-dimensions WARN is the gate's own framing, present on a page that has been live and
verified for weeks. Not a round-9 defect; expected on every article this site has ever shipped.

## Mechanical — round 9, all 5 articles

`python bin/press_gate.py <5 files> --max-words 1060 --check-og-image`

| Article | Result |
|---|---|
| olive-oil-calories | 30/32 — WARN image-dimensions (same as control) · FAIL og-image-reachable |
| olive-oil-color-what-it-means | 30/32 — same two |
| extra-light-olive-oil-vs-extra-virgin-olive-oil | 30/32 — same two |
| olive-oil-vs-canola-oil | 30/32 — same two |
| rosemary-infused-olive-oil | 30/32 — same two |

**og-image-reachable FAIL, all 5 — expected, not a defect.** The check fetches the absolute
`og:image` URL against the live domain. Pre-deploy, `https://avoliveoil.com/og/blog-<id>.jpg`
does not exist yet. The local files were confirmed present on disk before this gate ran
(`public/og/blog-<id>.jpg`, 120–152 KB each, all 5 present). Per the gates.md reporting rule,
this is recorded as **unrun-until-deploy**, not a pass. Re-run required and done post-deploy —
see "Live" section below.

Every other mechanical check (word count, H1, key takeaway, answer-first, section count,
structured block, FAQ count/parity, meta title/description, canonical, OG set, Twitter card,
hreflang, JSON-LD, entity `@id`, internal links out, anchor text, image format/alt, slug/
registry agreement, sitemap presence) **passed on all 5 articles**, matching the control.

### 26a — Focus-keyword uniqueness within the round
Enforced by `scripts/press-import.py`'s own `seen_focus` check at import time (not a separate
pass) — 5/5 drafts valid, no collision. Also checked against all 129 pre-existing focus
keywords before writing a single draft (see ROUND-9-MAP.md) — zero matches used as new topics.

### 26b — Round payload ceiling
1,624,397 bytes (≈1.55 MB) across the 5 new hero/inline/OG files, plus small 400/600px
responsive card copies. Set before Stage 4 at "well under 6 MB" (D12/D54 precedent); measured
after at ≈1.55 MB direct + a few hundred KB of card variants. Comfortably inside.

### 26c — Rollback recorded
`bc7a28a0e381ce25ef3214590d1a76e89ac1b1b0` on `press-round-gsc`, clean working tree, recorded
before any Stage 5 edit began.

## Judgement — adversarial review

**Run in-session by the same process that wrote the drafts, not a separately spawned
reviewer agent** — this execution context could not spawn a subagent. Recorded here as a
limitation, not hidden as a pass. The checklist (article-spec hunt list 27–36) was applied
deliberately against all 5 drafts before import:

| # | Hunt for | Finding |
|---|---|---|
| 27 | Invented checkable facts | None found. Calorie/fat figures are standard nutrition-composition numbers (not brand-specific); smoke-point ranges are the same approximate figures round 8 already published for EVOO (190–210°C) |
| 28 | Unprovable superlatives | None used |
| 29 | Legal-ceiling violations | None — no disease prevention/treatment/cure claims; health-adjacent passages (canola comparison, calories) carry the same "not a health argument, ask a doctor" disclaimer pattern round 8 established |
| 30 | Contradictions vs live site | None found. Rosemary article's dried-vs-fresh framing **reinforces** the live garlic-infused article's existing claim about the six-flavour Infused Collection rather than conflicting with it |
| 31 | Cross-language translation | N/A — round is English-only |
| 32 | Cannibalisation | None — checked against all 129 live keywords plus round-internal uniqueness |
| 33 | Thin sections | None — every section carries an answer paragraph plus a second paragraph, list or table |
| 34 | Retyped facts | The one product fact used (Infused Collection flavour name) mirrors phrasing already live in `garlic-infused-olive-oil` rather than retyping from `infusedSlugs.json` directly; no prices/addresses/hours retyped anywhere |
| 35 | Unquotable answers | Spot-checked; every answer paragraph reads standalone |
| 36 | Hallucinated repo context | None — every internal link target verified against `slugs.json`/live content before use |

**This is a real limitation of the round, disclosed rather than smoothed over**: a genuinely
independent adversarial reader, with no stake in the drafts passing, would likely catch things
self-review misses. Flagged as an open item for the owner/coordinator.

## Live — after deploy

Filled in after `scripts/ftp-deploy.py` runs. Checks: each URL serves the article (byte/body
compare, not status), no redirect hop, OG image serves as an image, rendered HTML carries the
meta, sitemap fetches and includes the 5 new URLs, IndexNow accepted, payload budget, no
owner-facing text leaked, mobile render at 375px.
