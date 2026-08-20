# PRESS Round 1 — shared writer brief

Every writer in this round reads this file. It carries the facts, the ceiling and the output
contract. **Nothing checkable may be invented.** If a number is not in this brief, it does not go in
the article.

---

## 1. Who this is for

**Arabian Village** — Palestinian cold-pressed extra virgin olive oil sold in Malaysia. The site is
`avoliveoil.com`. The official Malaysia distributor is **Berkat Madinah Store**, and the oil is sold
through Berkat Madinah's own counters — its two branches, its Shopee storefront and its TikTok Shop.
Shopee and TikTok are Berkat Madinah's own channels, **not separate sellers**.

## 2. Facts you may use — and the only ones

Sourced from `src/data/storeFacts.json`. Do not paraphrase a number into a different number.

| Fact | Value |
|---|---|
| Distributor | Berkat Madinah Store |
| Distributor founded | 2010 |
| Branches | **Ampang Jaya** and **Batu Caves** (Batu Caves is the larger) |
| Opening hours | 8:00 am – 12:00 midnight, Monday through Sunday |
| Hours caveat | Festive days such as Hari Raya can differ — confirm on WhatsApp |
| Price, 250 ml | **RM59.00** |
| Price, 500 ml | **RM103.00** |
| Price rule | Same price by size for the classic oil and for every flavour of the Infused Collection |
| Product | Cold-pressed extra virgin olive oil, Palestinian origin |
| Infused range | lavender-chamomile, blackseed, turmeric-black-pepper, rosemary-basil, fennel-anise, wild-thyme — **culinary infusions only** |
| WhatsApp | +60 11-1111 9912 |

**Banned outright:** customer counts, review counts, star ratings, awards, certification numbers,
harvest tonnages, "family recipe since ____", named testimonials, or any statistic not in the table
above. A fabricated number outlives the article and gets quoted back as fact by AI assistants.

**No superlatives as bare claims.** Not "the best olive oil in Malaysia". Write what is verifiable —
single origin, cold pressed, price per litre, who imports it, where you can taste it.

**Brand-neutral — no competitor names.** A standing owner decision on this project. A comparison
article compares *criteria* — grade, harvest date, packaging, origin transparency, price per litre —
and teaches the reader to apply them. It never names, ranks or rates another company's product, even
where the keyword data shows people search for those names.

## 3. The legal ceiling — Malaysia

**Food Regulations 1985, Regulation 18(6): food may not be labelled or advertised as preventing,
alleviating, treating or curing any disease.**

This is the hard limit on every article in this round.

- ✅ Allowed: culinary facts, taste, smoke point behaviour in cooking, how it is pressed, how to
  store it, how to tell fresh from stale, price, origin, how people cook with it.
- ✅ Allowed: describing what people *search for* — "many Malaysians look up *khasiat minyak
  zaitun*" — as a statement about search behaviour, never as a claim about the oil.
- ⛔ Forbidden: any statement that the oil prevents, relieves, treats or cures anything. No
  cholesterol, heart, diabetes, weight, skin, hair, fertility or immunity claims. No "good for you",
  "healthy fats that protect", "boosts", "detox". No implied medical benefit through a quote, a
  hadith, a proverb or a customer story either — the ceiling covers implication, not just wording.

If a section cannot be written without a health claim, **change the section**, do not soften the
claim.

## 4. Output contract

Write **one JSON file** to `docs/press/round-1/drafts/<id>.json`. It must parse. It must match this
shape exactly — the field names come from `src/content/articles/types.ts` and a mismatch fails the
TypeScript build.

```jsonc
{
  "id": "kebab-id-from-the-map",
  "lang": "en" | "ms" | "ar",
  "slug": "exact-slug-from-the-map",
  "seoTitle": "≤60 chars, focus keyword near the front",
  "metaTitle": "≤60 chars, may equal seoTitle",
  "metaDescription": "≤155 chars, contains the focus keyword, written to earn a click",
  "focusKeyword": "exact focus keyword from the map",
  "relatedKeywords": ["8–12 terms, grouped by intent in the order you list them"],
  "category": "short category label in the article's language",
  "tags": ["3–5 tags"],
  "h1": "contains the focus keyword, reads like a human wrote it",
  "excerpt": "one sentence, used on the blog index and as the schema description",
  "keyTakeaway": "40–60 words. The single most quotable answer in the article.",
  "datePublished": "2026-08-20",
  "dateModified": "2026-08-20",
  "readingTime": 4,
  "heroAlt": "describes the hero image; carries the focus keyword once if natural",
  "inlineAlt": "describes the one inline image",
  "intro": ["2–3 short paragraphs"],
  "sections": [
    {
      "heading": "an H2 phrased as the question a real person asks",
      "id": "stable-anchor-id",
      "blocks": [
        { "type": "p",  "text": "THE ANSWER PARAGRAPH — 40–70 words, first block, always." },
        { "type": "p",  "text": "supporting detail" },
        { "type": "ul", "items": ["…"] },
        { "type": "table", "head": ["…"], "rows": [["…"]] },
        { "type": "note", "title": "…", "text": "…" }
      ]
    }
  ],
  "conclusion": { "heading": "…", "blocks": [{ "type": "p", "text": "…" }] },
  "faqs": [{ "q": "…", "a": "40–70 words" }],
  "related": [{ "label": "…", "path": "products", "description": "…" }]
}
```

### Hard rules on the body

1. **800–1,000 words** across `intro` + `sections` + `conclusion` + `faqs`. Count them.
2. **5–7 sections.** The **first block of every section must be a `p`** of 40–70 words that answers
   the heading completely on its own. Read it back cold: if it needs the sentence before it, rewrite
   it. An answer engine will quote it exactly that way.
3. **At least one `table`** or a substantial `ul` comparison.
4. **6–10 FAQs**, each answered in 40–70 words. Base them on what people actually type, not on what
   is convenient to answer.
5. Inline markup inside any `text` is limited to `**bold**` and `[label](/path)`. Nothing else
   renders — no headings, no HTML, no markdown links with titles, no images inside text.
6. `[label](/products)` style links get the `/:lang` prefix automatically. Use bare paths.

### Internal links — `related` plus 3–5 in-body links

Valid paths: `products` · `shop` · `why-us` · `contact` · `blog` ·
`products/infused-extra-virgin-olive-oil-<flavour>` (flavours listed above) ·
`blog/<slug>` for any slug in this round or already live.

Use descriptive anchor text. Never "click here", "read more", or a bare URL.

### Language

Write **in** the language, not into it. This is not a translation of any other article in the round.
Malay articles use the words Malaysians type — `minyak zaitun`, `masak`, `harga`, `kedai` — not
translated English marketing. Arabic articles are written for Arabic speakers living in Malaysia,
not for a Gulf audience.

## 5. What you do not do

- Do not touch any file except your own `drafts/<id>.json`.
- Do not generate images. Stage 4 does that from your `heroAlt` and `inlineAlt`.
- Do not edit the TypeScript modules, `slugs.json`, the sitemap or `llms.txt`. Stage 5 wires it all.
- Do not invent a fact to fill a gap. Leave the gap and shorten the section.

Return one line: the article id, the word count, and anything you had to leave out.
