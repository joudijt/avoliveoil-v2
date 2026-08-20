# PRESS Round 1 — gate report

Site: avoliveoil.com · Branch `press-round-1` · Baseline `3de50b1` · Run 2026-08-20

15 articles: 5 English, 8 Bahasa Melayu, 2 Arabic.

---

## Content gates — all 15 pass

Enforced by `scripts/press-import.py`, which refuses to write anything unless every draft passes.

| Check | Result |
|---|---|
| Word count 800–1,000 | 15/15 |
| 5–7 sections | 15/15 |
| First block of every section is a 40–70 word answer paragraph | 15/15 |
| ≥1 table or comparison list | 15/15 |
| 6–10 FAQs | 15/15 |
| keyTakeaway 40–60 words | 15/15 |
| seoTitle / metaTitle ≤60 chars | 15/15 |
| metaDescription ≤155 chars | 15/15 |
| H1 carries every focus-keyword token | 15/15 |
| 8–12 related keywords | 15/15 |
| Slug matches `[a-z0-9-]+` (the .htaccess route class) | 15/15 |
| Focus keyword unique **within** the round | 15/15 |
| Focus keyword not owned by an existing page | 15/15 |
| Only renderer-supported inline markup (`**bold**`, `[label](href)`) | 15/15 |

## Compliance — Malaysia, Food Regulations 1985 Reg. 18(6)

Scanned all 15 drafts for health-claim vocabulary in each article's own language
(15 English terms, 14 Malay, 14 Arabic), plus competitor names and bare superlatives.

**Four hits, all four false positives of the scanner, each verified in context:**

| Hit | Reality |
|---|---|
| `treat` ×2 | "chemical **treatment**" (a processing fact) and "**Treat** it carefully" (advice) |
| `the best` | It is the focus keyword. The H1 is *"How to Find the Best Olive Oil in Malaysia Without Trusting a Ranking"* and the conclusion states *"The best olive oil in Malaysia is not a title one bottle holds"* — the article's thesis is the refusal of the superlative |
| `فائدة` | "the practical **benefit** is the ability to verify" — provenance, not health |
| `صحي` | Substring of **صحيحاً**, "correct". A word-boundary match does not work on Arabic |

**Zero real health claims. Zero competitor names. Zero unprovable superlatives.**

The `khasiat` / `kebaikkan` / `untuk minum` cluster — roughly 6,000 searches/month and the largest
demand in this market — was deliberately not targeted, because every query in it wants a claim the
regulation prohibits. See D11 in `../DECISIONS.md`.

## Facts

Every price, address, hour and founding year comes from `src/data/storeFacts.json`. No writer
retyped one. Three writers flagged external figures they introduced; all three are public standards
cited **as standards**, not as claims about this product, and all are hedged in the copy:

| Figure | Source | Verdict |
|---|---|---|
| 27 °C extraction ceiling | EU labelling rule for "cold pressed" | keep — attributed in text |
| 0.8% / 2.0% free acidity | IOC / Codex grade thresholds | keep — described as "the internationally referenced standard" |
| 175–230 °C smoke-point range | general food science | keep — written as an approximate range with a caveat line |

No customer counts, ratings, awards, certification numbers, harvest tonnages, tree ages,
cooperative names or testimonials appear anywhere in the round.

## Defects found and fixed before shipping

These were live bugs in the repository, surfaced by importing single-language articles for the
first time. Each would have shipped to Google.

| # | Defect | Fix |
|---|---|---|
| 1 | **`hreflang` pointed every new article at the blog index.** `SEO.tsx` mapped over all three languages regardless of `pathByLang`, and `pathFor` fell back to `PAGE_SLUG`, so 15 articles each declared `/ms/blog` and `/ar/blog` as their own translations — and the blog index was claimed as an alternate by all of them | Alternates and `x-default` now follow `pathByLang` |
| 2 | **30 sitemap URLs reading `/ar/blog/undefined`** | `generate-sitemap.mjs` filters to the languages an article exists in |
| 3 | **Sitemap `hreflang` alternates emitted `href="https://avoliveoil.com/undefined"`** | Alternates built from the entry's own language map |
| 4 | **`prerender.mjs` would have snapshotted the not-found fallback to `/ar/blog/undefined/index.html`** and published it | Same filter applied |
| 5 | **`generate-sitemap.mjs` knew nothing about the 18 infused-product URLs** that the committed sitemap contained — regenerating silently deleted them | Generator now reads `infusedSlugs.json`, the same file `prerender.mjs` and `infusedProducts.ts` use |
| 6 | **The word counter counted a spaced em dash as a word**, which pushed one writer into stripping every em dash from their prose to get under the band | Counts only tokens containing a letter or digit |
| 7 | **Two of the first three generated heroes were unusable** — abstract bokeh with no subject, because prompts were built from reader-facing alt text describing situations a generator cannot stage | Stage 4 rewritten around a per-article scene bank of concrete still lifes; "sharp focus, subject fills the frame"; depth-of-field language removed |
| 8 | **Parallel image jobs earned HTTP 429 for both**, and a shell loop masked the failures behind exit 0 | Retry with backoff in `imgen.py`; one sequential job; artefacts on disk checked, not exit codes |

## Structural

| Check | Result |
|---|---|
| TypeScript build | clean |
| Slug registry drift assert | passes, 18 articles |
| Sitemap | 45 → **60 URLs** (18 static + 24 blog + 18 infused), XML valid, zero `undefined` |
| `check:llms` | green |
| `check:ai` | green after regenerating `AI-FACTS.yml` |
| `llms.txt` article index | **generated from `manifest.json`**, not hand-written, so it cannot rot |
| BlogPosting + FAQPage + hreflang | emitted per article by `SEO.tsx`; FAQ schema mirrors the on-page FAQ |
| Inbound links | every article is listed on `/{lang}/blog`, so none is orphaned |
| Round image payload | well under the 6 MB ceiling |

## Known limitations, stated rather than hidden

- **Search Console is not connected** for this property. The keyword plan used Keyword Planner
  volumes only; no live ranking or impression data informed it.
- **Arabic slugs are ASCII transliteration, not Arabic script** — a deliberate degradation of
  decision D3, forced by the `.htaccess` route class. See D9.
- ~~The generated index covers only this round's articles.~~ **Closed.**
  `scripts/press-backfill-manifest.py` extracted the three pre-round articles from the content
  modules, verifying every slug against `slugs.json` before accepting it. The manifest now holds
  all 24 article/language pairs and the index in each `llms.txt` is complete.
- The pre-existing article `evoo-health-benefits-families` remains live and unchanged, per D8.
  It is a health-benefits article on a site otherwise held to a zero-claims standard.
