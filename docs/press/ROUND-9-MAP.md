# PRESS round 9 — keyword map

Run 2026-09-15, on branch `press-round-gsc` (base `bc7a28a`, itself round 8 plus the
www→apex duplicate-homepage fix). Rollback point: `bc7a28a0e381ce25ef3214590d1a76e89ac1b1b0`.

## The brief

"5 articles based on GSC." Read literally against real data, this round could not be
delivered as briefed — see below — so it was delivered as GSC-seeded-then-Keyword-Planner-
verified instead, per Stage 1 step 2/3 of the PRESS spec.

## Step 1 — what Search Console actually returned

Cogny's own Search Console connector was at 0/15 free calls (resets 2026-10-01), so this
round read GSC directly with `E:\TechVisionEra\gsc-tools\gsc_probe.py` against the OAuth
token at `E:\TechVisionEra\gsc-token.pickle` — same data, no quota, confirmed working
against `sc-domain:avoliveoil.com` (siteOwner).

90-day and 16-month windows returned **identical data**: 12 queries, 25 impressions, 2
clicks total. This property has very little indexed search history yet.

| Query | Impressions | Position | Verdict |
|---|---|---|---|
| arabian village olive oil | 7 | 4 | Branded, already ranking — not a target |
| avolive | 5 | 19.6 | Branded typo — not a target |
| **olive oil smoke point** | 3 | 42.7 | **Live article, exact match — see below** |
| arab olive oil | 2 | 53.5 | Branded-adjacent — not a target |
| **cloudy olive oil** | 1 | 62 | **Live article `cloudy olive oil with sediment` — exact match** |
| habitat olive oil | 1 | 51 | Likely noise/typo |
| holive oil | 1 | 47 | Typo |
| **hummus with olive oil** | 1 | 41 | **Live article `olive oil for hummus` — exact match** |
| **infusing garlic in olive oil** | 1 | 90 | **Live article `garlic infused olive oil` — exact match** |
| **oil sediment** | 1 | 60 | **Live article `cloudy olive oil with sediment` — exact match** |
| **olive oil for grill** | 1 | 40 | **Live article `olive oil for grilling` — exact match** |
| olive oil untuk steak | 1 | 6 | MS, already ranking well — not a target |

## Step 2 — the finding that changed the brief

Every non-branded query with real search intent in this GSC pull is **already an exact-match
focus keyword on a live article** (confirmed by grepping `focusKeyword` in `en.ts`, not by
slug guessing). These are cheap-win *improvement* candidates for existing pages ranking at
position 40–90, not five new-article opportunities. PRESS non-negotiable 6 and gate 32 both
forbid a new article competing with a page that already owns the term — "if the existing page
is weak, the right move is to improve it, not to publish a competitor to it" (stages.md,
Stage 1.5).

**D65 — GSC seeded zero new topics this round; treated as a page-quality signal instead.**
Escalated as an open item below rather than silently substituted.

## Step 3 — where the 5 topics actually came from

Per Stage 1.1, live demand was pulled from Keyword Planner (Google Ads MCP, geo 2458 =
Malaysia, English) across families adjacent to the GSC seeds and to gaps in the existing
129-article registry (grades, comparisons, nutrition, packaging). ~1,131 ideas returned;
filtered to non-zero volume, then checked one-by-one against every live `focusKeyword` in
`en.ts`, `ms.ts` and `ar.ts` (all 129, not a sample).

| Focus keyword | Volume/mo | Competition | Collision check |
|---|---|---|---|
| olive oil calories | 140 | LOW | Clear |
| olive oil color | 90 | MEDIUM | Clear |
| extra light olive oil vs extra virgin olive oil | 70 | MEDIUM | Clear |
| olive oil vs canola oil | 20 (cluster of ~60 long-tail variants at 10 each) | HIGH | Clear |
| rosemary infused olive oil | 10 | LOW | Clear |

Discarded candidates and why:
- **Gift-set / hamper cluster** (~10/mo each, mostly HIGH competition) — the returned ideas
  leaned US-gifting ("Christmas gift", a US boutique brand name), not a confirmed Malaysia
  buying pattern. No MYR-specific signal surfaced, so not used.
- **Olive oil vs vegetable oil** (~10–20/mo) — real but too close to the canola pick for one
  round; picked canola for the cleaner single term and left vegetable-oil for a future round.
- **Difference between pure and extra virgin** (40/mo), **olive oil vs olive pomace oil**
  (50/mo) — both already exact-match live articles, discarded on the same collision check.
- **Olive oil for weight loss / "how much per day"** — health-and-dosage-shaped, and D50
  already flags this cluster as one the site treats carefully; not opened further this round.

## Language decision

English only, five of five. Both signals point the same way: the GSC pull for this property
is almost entirely English-language query patterns (11 of 12 rows), and the Keyword Planner
demand found was pulled in English. No Malay or Arabic volume was independently verified this
round, so none was assumed — per Stage 1.4, the budget follows the data rather than the site's
three-language default.

## The five articles

| id | slug | category | Inbound link added from |
|---|---|---|---|
| olive-oil-calories | olive-oil-calories | Olive oil basics | `vitamins-in-extra-virgin-olive-oil` |
| olive-oil-color | olive-oil-color-what-it-means | Storage and quality | `cloudy-olive-oil` |
| extra-light-olive-oil-vs-extra-virgin-olive-oil | extra-light-olive-oil-vs-extra-virgin-olive-oil | Olive oil basics | `evoo-vs-pure-olive-oil` |
| olive-oil-vs-canola-oil | olive-oil-vs-canola-oil | Cooking with olive oil | `olive-oil-vs-coconut-oil` |
| rosemary-infused-olive-oil | rosemary-infused-olive-oil | Cooking with olive oil | `garlic-infused-olive-oil` |

Each also cross-links to 1–2 of the other four where the topic genuinely connects (calories
↔ extra-light; extra-light ↔ calories/pomace; canola ↔ coconut/extra-light).

**D66 — the rosemary article ties to a real product, not a generic DIY page.** The live
`garlic-infused-olive-oil` article already states the shop's six-flavour Infused Collection
includes "rosemary and basil," made with dried botanicals. `src/data/infusedSlugs.json`
confirms `infused-extra-virgin-olive-oil-rosemary-basil` is a real, routed product. The new
article's safety framing (dried = shelf-stable, fresh = refrigerate-and-use-within-a-week)
does not contradict that live claim — it explains why the shop's own version is dried — and a
sentence plus a `/products` link was added pointing to it.

## Images — Stage 4

Reuse-only, per the 2026-08-26 standing ruling. `scripts/recut-article-images.py` re-cut the
**whole site** (268 heroes/inlines, 137 OG cards, 22,599 KB total, same script round 8 used),
which is additive by design — verified afterward that every pre-round article kept a
prerenderable page (`check:slugs`: en 55 / ar 38 / ms 50 articles, all agree with the
registry). No image was generated. `scripts/sync-article-alt.py` then rewrote 80 alt strings
site-wide to match the frames actually assigned.

Round-9-specific payload: 5 heroes + 5 inlines + 5 OG cards, measured on disk —
1,624,397 bytes (≈1.55 MB) for the primary files, plus small 400/600px responsive card
copies from `optimize-images.py`. Well inside the ~6 MB per-round ceiling D12/D54 used.

## Build, gate, deploy

See `docs/press/round-9/GATE.md` for the full run. Summary: `npm run build:prerender` green
(exit 0, all 5 EN routes prerendered), sitemap regenerated to 179 URLs, `llms.txt` carries all
5 new URLs. Mechanical gate: 30–31/32 per article, one WARN pre-existing site-wide (missing
width/height on inline images + the logo SVG — not a round-9 regression, present on the round-8
control article too), one expected FAIL pre-deploy (`og-image-reachable` — the live domain
does not have the file yet; the local file was confirmed to exist before this run and the
check re-ran post-deploy).
