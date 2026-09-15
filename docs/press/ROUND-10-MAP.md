# PRESS round 10 — keyword map

Run 2026-09-15, on branch `press-round-10` (base `1a4d6d1` on `main` — rounds 1-9 merged and
pushed before this round started). Rollback point: `1a4d6d103818a936ff959dc1452d4a1ef08ef23c`.

## The brief

"5 articles" — no GSC constraint this round (round 9 already mined GSC; see D65-D71). Standard
demand-based keyword research, decide language mix from real demand per Stage 1.4.

## Step 1 — pulling live demand

Google Ads MCP (GadsPilot connector, `list_accounts` → used Aircon Hero Sdn Bhd's authorized
account as the query vehicle; Cogny's own Ads connector was still at 0/15 quota from round 9),
geo 2458 (Malaysia), language_id 1000 (English). Seeded broad ("olive oil skin", "olive oil
brands malaysia", "olive oil price per litre", etc.) then narrowed twice more (polyphenols/
vegetable-oil/grapeseed/frying-temperature family; then arbequina/koroneiki/harvest-season
family) as each pass surfaced either dead ends or a new thread worth checking.

~4,000 keyword ideas returned across three calls. Filtered to non-zero volume, `oil` in the text,
then checked **every** surviving candidate against the full 143 live focus keywords (en 55,
ms 50, ar 38) before it could become a topic — not just an exact-string match on `focusKeyword`,
but a read of the candidate's *neighbourhood* in the existing content, because two topics caught
late in this process passed the exact-match check and still collided:

- **`olive oil for pasta`** (70/mo cluster, LOW-MEDIUM) looked clean against `focusKeyword` —
  no live article owns that exact term. But the live `aglio-e-olio` article's own
  `relatedKeywords` already claims `"garlic and olive oil pasta"`, `"olive oil pasta recipe"`,
  `"best olive oil for pasta"` and `"how much olive oil for pasta"`. Publishing a second, separate
  "olive oil for pasta" article would have chased territory that page already occupies. Dropped.
- **`olive oil polyphenols`** (50+/mo real cluster) looked like a clean composition/quality topic
  distinct from `olive oil calories` (round 9) and `vitamins in extra virgin olive oil`. Reading
  the live vitamins article's own `relatedKeywords` showed `"polyphenols in olive oil"`,
  `"oleocanthal"` and `"hydroxytyrosol"` already claimed there, and its category is literally
  "Understanding olive oil" composition content. Dropped.
- **`olive oil packaging`** (10/mo) looked like a gap next to `olive oil shelf life` (time/
  storage) and `cloudy olive oil with sediment` (visual defect). A full-text grep found the live
  `extra-virgin-olive-oil-bottle` article already has a dedicated H2, **"Does dark glass matter,
  or is it just packaging?"**, and the exact phrase "dark glass or tin" repeated across at least
  eight other live articles. Dropped.

**D72 — the lesson from all three: `focusKeyword` uniqueness is necessary but not sufficient.**
A candidate has to be checked against what the *nearest* live article's `relatedKeywords`,
category and section headings already cover, not just its own exact keyword string, before it can
be trusted as a genuine gap. Recorded as process guidance for future rounds on this site, now that
it holds 148 articles and most obvious single terms are taken.

## Step 2 — where the 5 topics actually came from

| Focus keyword | Volume/mo (geo 2458, EN) | Competition | Why it survived the collision check |
|---|---|---|---|
| olive oil vs red palm oil | 50 (as "red palm oil vs olive oil") | HIGH | New comparison axis; no live article names red palm oil, palm oil cluster mentions it nowhere |
| olive oil vs grapeseed oil | 40 ("olive oil or grapeseed oil") | MEDIUM | New comparison axis; "grapeseed" appears only as a passing substitute-suggestion in 3 other articles, never as a dedicated comparison |
| is olive oil a vegetable oil | 20 | LOW | Classification question, genuinely distinct intent from the comparison articles; zero live coverage |
| olive oil varieties (Arbequina, Koroneiki, Picual, Hojiblanca) | ~20-40 across the cluster | HIGH (long-tail low) | Zero live mentions of Arbequina or Koroneiki anywhere on the site; the only cultivar content that exists is Nabali, inside the Palestinian-origin article, which this article defers to rather than duplicates |
| olive oil harvest season (early vs late) | 10-20 across the cluster | LOW | No dedicated live article on harvest timing as a quality factor; existing mentions are single-sentence asides inside colour/bitterness FAQs |

Discarded candidates beyond the three collision cases above:
- **The hair/skin/face/soap/scalp cosmetic-use cluster** — by far the largest volume found
  (720/mo for "olive oil hair oil" alone, thousands combined across variants). Discarded as
  unaddressable, not underused: this is a food-grade EVOO seller with no cosmetic product, and
  writing cosmetic-use content for a food brand is a product-category mismatch, not a genuine
  content gap, independent of the legal-ceiling question. Recorded explicitly rather than silently
  dropped, per Stage 1.3.
- **Nutrition-facts cluster** (`olive oil nutrition facts`, `1 tbsp olive oil nutrition facts`,
  etc., ~300+/mo combined) — discarded on the same logic as the polyphenols pick: it would
  substantially overlap both `olive oil calories` (round 9) and `vitamins in extra virgin olive
  oil`, which between them already cover the calorie, fat and micro-compound content of the oil.
- **Competitor and named-brand terms** (`colavita olive oil malaysia`, `de cecco olive oil`,
  `healthiest olive oil brand`) — not this site's brand to write about, and `healthiest olive oil
  brand` collides in substance with the live `best-extra-virgin-olive-oil-in-malaysia` and
  `which-olive-oil-to-buy` buying-guide articles.
- **`olive oil expiry date`** (10/mo) and **`olive oil price per litre`** (10/mo) — direct
  substance overlap with the live `olive-oil-shelf-life` and `olive-oil-price-malaysia` articles
  respectively.
- **`olive oil frying temperature`** (10/mo) — substance overlap with the live
  `olive-oil-smoke-point` article.

## Language decision

English only, five of five, for a stronger reason than round 9's absence-of-evidence call. Round
9 defaulted to EN because it found no MS/AR volume; this round **actually tested** the one real
Malay candidate that surfaced organically during research — `minyak zaitun vs minyak sawit` (olive
oil vs palm oil), the natural Malay phrasing that would pair with the EN red-palm-oil pick, 10/mo,
LOW competition. It turned out to already be a live MS article (`minyak-zaitun-vs-minyak-sawit`),
so it could not be used as a new topic. No other Malay or Arabic seed queried for this round
returned non-zero volume. Per Stage 1.4, the budget follows the data.

## The five articles

| id | slug | category | Inbound link added from |
|---|---|---|---|
| olive-oil-vs-red-palm-oil | olive-oil-vs-red-palm-oil | Cooking with olive oil | `olive-oil-vs-canola-oil` |
| olive-oil-vs-grapeseed-oil | olive-oil-vs-grapeseed-oil | Cooking with olive oil | `olive-oil-vs-canola-oil` |
| is-olive-oil-a-vegetable-oil | is-olive-oil-a-vegetable-oil | Olive oil basics | `olive-oil-vs-canola-oil` |
| olive-oil-varieties | olive-oil-varieties-arbequina-koroneiki-and-more | Origin & provenance | `palestinian-olive-oil-what-makes-it-different` |
| olive-oil-harvest-season | olive-oil-harvest-season-early-vs-late | Origin & provenance | `palestinian-olive-oil-what-makes-it-different` |

Each also cross-links to 2-3 of the other four and to existing articles where the topic genuinely
connects (varieties ↔ Palestinian origin, Nabali and bitterness; harvest season ↔ Palestinian
origin, shelf life and price; the two comparisons ↔ canola and smoke point).

**D73 — the varieties article deliberately does not re-explain Nabali.** The live
`palestinian-olive-oil-what-makes-it-different` article already has a dedicated section on Nabali,
Nabali Muhassan and Souri. The new article's Nabali row states only the flavour profile
(green, faintly bitter, peppery — matching the live article's own words) and links out for detail,
to avoid the two pages drifting into disagreement over the same fact, per Stage 5 rule 6.

**D74 — the harvest-season article's dates were checked against, not invented independently of,**
the live Palestinian-origin article ("broadly October into November") and the buying-guide article
("northern-hemisphere olives are typically picked between October and January"). Both match.

## Images — Stage 4

See `docs/press/round-10/GATE.md`. Reuse-only, whole-site re-cut, ≈1.57 MB round-10 payload,
comfortably inside the ~6 MB ceiling. One hero (harvest-season) landed on a bottling-line frame
rather than a grove/harvest frame — flagged, not hidden; the 16-photograph pool has no dedicated
harvest frame left to assign by subject.

## Build, gate, deploy

See `docs/press/round-10/GATE.md` for the full run. Summary: `npm run build:prerender` green
(exit 0, all 5 EN routes prerendered — a stray `node.exe` from an earlier session was holding port
4173 and had to be killed first). Mechanical gate: 30/31 per article after two word-count trims,
one pre-existing site-wide WARN matching the round-9 control. All six of the project's own
`check:*` scripts re-run green after the round. Deploy and live verification below.
