# Round 2 — writer brief

One agent, one article, one JSON file at `docs/press/round-2/drafts/<id>.json`. You are writing a
single-language article, not a translation of anyone else's. Nobody else is editing your file.

## The JSON contract — `scripts/press-import.py` rejects the whole round if one draft fails

```jsonc
{
  "id": "...",              // must equal the filename stem
  "lang": "en|ms|ar",
  "slug": "...",            // [a-z0-9-]+ only, ASCII even in Arabic (the .htaccess route rule)
  "seoTitle": "",           // <= 60 chars
  "metaTitle": "",          // <= 60 chars
  "metaDescription": "",    // <= 155 chars
  "focusKeyword": "",       // exactly the one assigned to you
  "relatedKeywords": [],    // 8-14
  "category": "", "tags": [],
  "h1": "",                 // MUST contain every word of the focus keyword
  "excerpt": "",            // one sentence, used on the blog index and as the schema description
  "keyTakeaway": "",        // 40-60 words, a standalone quotable answer — this is the AEO extract
  "datePublished": "2026-08-25", "dateModified": "2026-08-25",
  "readingTime": 4,
  "heroAlt": "", "inlineAlt": "",   // see your image row below — describe the REAL photo
  "intro": ["", ""],        // 2-3 paragraphs
  "sections": [             // 5-7 of them
    { "heading": "", "id": "kebab-anchor",
      "blocks": [ {"type":"p","text":"..."} ] }
  ],
  "conclusion": { "heading": "", "blocks": [] },
  "faqs": [ {"q":"","a":""} ],      // 6-10
  "related": [ {"label":"","path":"products","description":""} ]   // 3-5
}
```

Hard bands the importer enforces — check them before you finish:

- **total 800–1,000 words** across intro + section headings + all blocks + conclusion + FAQs.
  Aim for **900**. Below 800 or above 1,000 fails the round.
- **5–7 sections.** The **first block of every section must be `type: "p"` and 40–70 words** — a
  standalone answer to the heading, readable on its own. This is what answer engines lift.
- **at least one `table`, `ul` or `ol` somewhere.**
- 6–10 FAQs, 8–14 relatedKeywords, 3–5 related links, keyTakeaway 40–60 words.

Block types: `p`, `h3`, `h4`, `ul` (`items`), `ol` (`items`), `note` (`title` + `text`),
`table` (`head` + `rows`). Do **not** emit an `image` block — the importer inserts your inline
image itself.

Inline markup is **only** `**bold**` and `[label](/path)`. No markdown headings, no HTML, no
backticks, no image syntax — the renderer prints anything else literally on the page.

Internal link paths for `related` and for `[label](/path)` links, all relative to `/:lang`:
`products` · `products/infused-extra-virgin-olive-oil-blackseed` (and `-lavender-chamomile`,
`-turmeric-black-pepper`, `-rosemary-basil`, `-fennel-anise`, `-wild-thyme`) · `shop` · `why-us` ·
`contact` · `blog` · `blog/<slug of an existing article in YOUR language>`.

Existing slugs you may link to:
- **en**: `why-olive-oil-is-becoming-popular-in-malaysia` ·
  `extra-virgin-olive-oil-health-benefits-for-malaysian-families` ·
  `how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia` ·
  `what-cold-pressed-olive-oil-really-means` · `how-to-compare-olive-oil-brands-in-malaysia` ·
  `is-olive-oil-halal-what-to-check-in-malaysia` ·
  `olive-oil-price-in-malaysia-what-you-are-paying-for` ·
  `palestinian-olive-oil-what-makes-it-different`
- **ms**: `mengapa-minyak-zaitun-semakin-popular-di-malaysia` ·
  `manfaat-kesihatan-minyak-zaitun-dara-untuk-keluarga-malaysia` ·
  `cara-memilih-minyak-zaitun-dara-asli-di-malaysia` ·
  `di-mana-beli-minyak-zaitun-di-kuala-lumpur` · `harga-minyak-zaitun-di-malaysia` ·
  `cara-menilai-jenama-minyak-zaitun` · `apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain` ·
  `status-halal-minyak-zaitun` · `minyak-zaitun-organik-apa-maksudnya` ·
  `minyak-zaitun-palestin-dari-ladang-ke-botol` · `minyak-zaitun-untuk-masak-panduan-dapur`
- **ar**: `why-olive-oil-is-becoming-popular-in-malaysia` ·
  `extra-virgin-olive-oil-health-benefits-for-malaysian-families` ·
  `how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia` ·
  `zayt-zaytun-falastini-ma-yumayyizuh` · `zayt-alzaytun-lil-tabkh`

## The facts you may state — and nothing else checkable

From `src/data/storeFacts.json`, the project's single source of truth. Copy these values exactly or
leave the fact out:

- Product: single-origin Palestinian cold-pressed extra virgin olive oil, brand **Arabian Village**.
- Prices: **RM59.00** for 250 ml, **RM103.00** for 500 ml — the same by size for the classic oil and
  for every flavour of the Infused Collection. Per litre that is **RM236** and **RM206**.
- Infused Collection, six botanicals: lavender-chamomile, blackseed (habbatus sauda), turmeric-black
  pepper, rosemary-basil, fennel-anise, wild thyme. On sale now, culinary infusions.
- Malaysia distributor: **Berkat Madinah Store** (madinah.com.my), the official and only one.
  Two branches, both stocking the brand: **Ampang Jaya** (Putra Sulaiman, 17-L1, Persiaran Putra
  Sulaiman, Taman Putra Sulaiman, 68000 Ampang Jaya, Selangor) and the larger **Batu Caves / Prima
  Seri Gombak** (32, Jalan Prima SG 2, Prima Seri Gombak, 68100 Batu Caves, Selangor).
- Hours: 8:00 am – 12:00 midnight, Monday to Sunday. Festive days such as Hari Raya can differ —
  confirm on WhatsApp **+60 11-1111 9912**.
- Online counters, both run by Berkat Madinah itself, not separate sellers: Shopee and TikTok Shop.

**Invent nothing else that can be checked.** No founding years, no customer counts, no ratings, no
review counts, no testimonials, no award names, no "studies show", no percentages you cannot source,
no harvest dates, no acidity numbers for this specific oil. A fabricated number outlives the
article — an AI engine will quote it back as fact. If a number would help and you do not have it,
write the sentence without it.

Generic food-science facts that are true of olive oil as a category (what cold pressing is, what a
smoke point is, why light and heat degrade oil) are fine and need no source line. Anything specific
to **this** product is not.

## The legal ceiling — Malaysia, Food Regulations 1985, Reg. 18(6)

Food may not be labelled or advertised as preventing, alleviating, treating or curing any disease.
This is absolute and it is what your article is judged on first.

- Never write that this oil is good for the heart, cholesterol, digestion, weight, skin, hair,
  immunity, diabetes, blood pressure or any condition.
- Never write `khasiat`, `kebaikan`, `manfaat kesihatan`, `فوائد صحية`, "health benefits" as a claim
  about this product.
- Do not carry a claim indirectly either — no "traditionally used to…", no "many people take it for…",
  no quoting a customer saying it helped them.
- Culinary, sensory, cultural, origin, price, storage, label and shopping facts are all fine. Write
  the article the reader actually needs, and let the claim go.

## Voice

Write like someone who knows the product and respects the reader's time. Short sentences. Concrete
detail over adjectives. No "in today's fast-paced world", no "unlock", no "elevate your cooking",
no "when it comes to". Never call it the best, the #1, or the finest — no superlative you cannot
prove. Native idiom in your language: a Malay article is written in Malay for Malaysians, an Arabic
article in Arabic for Arabic speakers in Malaysia. Do not translate an English structure.

Mention the focus keyword naturally where it belongs — the H1, the key takeaway, one or two
headings, a few times in the body. Do not stuff it.

---

# The nine articles

Each row gives you: the focus keyword you own (nobody else may use it), what the article must and
must not cover, and **a factual description of the photo already assigned to you** — write
`heroAlt` and `inlineAlt` in your language from that description. The photos exist; you are
describing a real frame, not inventing one.

## en-1 · `olive-oil-for-cooking`

- **focus keyword**: `olive oil for cooking` · slug `how-to-cook-with-olive-oil-in-a-malaysian-kitchen`
- **cover**: what changes when you cook with extra virgin instead of a neutral oil; where it works
  in a Malaysian kitchen (sautéing, roasting, finishing, marinades, rice, salads); how much to use;
  what it costs per dish at RM236/litre; when to reach for the classic oil and when for an infusion;
  buying and keeping a bottle you cook from every day.
- **must NOT cover**: smoke points and heat limits beyond one sentence that links to
  `blog/olive-oil-smoke-point-what-heat-it-can-take`. That article owns the topic.
- **hero photo**: a bottle of the brand's olive oil standing upright on a weathered wooden table,
  green and dark olives and olive leaves scattered around its base, an out-of-focus olive grove
  behind, warm late light.
- **inline photo**: a pair of weathered hands pouring olive oil from a dark bottle into a small
  speckled ceramic dipping bowl on a rough wooden table, a linen cloth and bread to the right.

## en-2 · `olive-oil-vs-pomace-oil`

- **focus keyword**: `olive oil vs pomace oil` · slug `olive-oil-vs-pomace-oil-what-the-grades-mean`
- **cover**: what is left after the first press and what pomace oil is made from; how it is
  extracted and refined; what "pure olive oil", "light" and "extra light" actually mean on a label
  (they describe refining and colour, not calories); a comparison table across extra virgin,
  virgin, refined/"pure", extra light and pomace — how each is made, how it tastes, what it costs;
  how to tell which one is in the bottle in front of you in a Malaysian supermarket.
- **must NOT cover**: what cold pressing means as a definition —
  `blog/what-cold-pressed-olive-oil-really-means` owns that. Link to it once.
- **hero photo**: inside a mill — olive paste extruding from the stainless mouth of a machine while
  a thick ribbon of bright green-gold oil pours down into an open steel vat, tanks behind.
- **inline photo**: oil pouring from a stainless steel pipe into an open vat in a processing room,
  a pressure gauge and steel tanks around it.

## en-3 · `olive-oil-smoke-point`

- **focus keyword**: `olive oil smoke point` · slug `olive-oil-smoke-point-what-heat-it-can-take`
- **cover**: what a smoke point is and what is actually happening at it; the numbers for extra
  virgin, refined olive oil, pomace and the oils a Malaysian kitchen already uses (palm, coconut,
  sunflower, canola) in a table; why free fatty acid content and freshness move the number more
  than the grade label does; which Malaysian cooking methods stay under it (tumis, roasting,
  shallow-frying) and which do not (deep-frying at length, wok cooking on a hard flame); how to
  tell when an oil has gone past it; whether reheating is worth it.
- **must NOT cover**: a general how-to-cook-with-olive-oil guide —
  `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen` owns that. Link to it once.
- **hero photo**: a Malaysian man in a black songkok, seated at a wooden bench, nosing olive oil
  from a cobalt-blue tasting glass; a glass flask of oil, a rack of sample tubes and a microscope
  on the bench, olive branches behind.
- **inline photo**: a close crop of the same bench — the hand and blue tasting glass at the top
  left, a glass flask of yellow-green oil and a row of empty sample tubes in front of a microscope.

## ms-1 · `minyak-zaitun-habbatus-sauda`

- **focus keyword**: `minyak zaitun habbatus sauda` ·
  slug `minyak-zaitun-habbatus-sauda-apa-yang-perlu-tahu`
- **cover**: what a blackseed infusion is and how it differs from mixing two oils yourself or from
  a blackseed oil capsule; how the Infused Collection blackseed oil is made (botanicals infused
  into cold-pressed extra virgin olive oil); what it tastes like and where it belongs in a Malaysian
  kitchen — drizzling, marinades, rice, roasted vegetables, dips; halal reading of the ingredient
  list; price (RM59 / RM103) and where to buy. Link to
  `products/infused-extra-virgin-olive-oil-blackseed`.
- **must NOT cover**: **any health claim at all.** This keyword's demand is health-shaped —
  `kebaikan`, `khasiat`, `cara makan untuk…`. You answer the product question instead and say
  plainly, once, that this article covers what the oil is and how it is used in cooking. Do not
  explain *why* you are avoiding claims at length, and do not cite the regulation in the body.
- **hero photo**: the brand's 500 ml bottle standing on a stone ledge in a sunlit olive grove, a
  hand resting beside it at the right, an olive branch in the left foreground, low golden light
  down an avenue of old trees.
- **inline photo**: a Malaysian man in a songkok holding a cobalt-blue tasting glass of oil to his
  nose, a glass flask of oil on the wooden bench in front of him.

## ms-2 · `minyak-zaitun-untuk-salad`

- **focus keyword**: `minyak zaitun untuk salad` ·
  slug `minyak-zaitun-untuk-salad-dan-hidangan-sejuk`
- **cover**: why an oil you do not heat is where extra virgin shows most; a simple ratio-based
  dressing (oil to acid) with two or three variations a Malaysian kitchen already has ingredients
  for — limau kasturi, cuka, madu, mustard, garam; kerabu, ulam and cold dishes; which infusion
  suits which salad; how much a dressing costs to make at RM236/litre; keeping an opened bottle
  usable in a hot kitchen.
- **must NOT cover**: cooking with heat — `blog/minyak-zaitun-untuk-masak-panduan-dapur` owns it.
  Link once.
- **hero photo**: a Malaysian woman in a soft green hijab and a floral baju, smiling, holding the
  brand's bottle in both hands; a traditional wooden kampung house and greenery behind her, a bowl
  of green and black olives and a rattan basket on the table in front.
- **inline photo**: the brand's bottle upright on a wooden table with green and black olives and
  olive leaves scattered around its base, an olive grove out of focus behind.

## ms-3 · `zaitun-dalam-al-quran`

- **focus keyword**: `zaitun dalam al quran` ·
  slug `pokok-zaitun-dalam-al-quran-dan-warisan-palestin`
- **cover**: where the olive and the olive tree are named in the Quran — Surah At-Tin (95:1, the
  fig and the olive), Surah An-Nur (24:35, the blessed olive tree of the lamp verse), Surah
  Al-An'am (6:99 and 6:141) and Surah An-Nahl (16:11) — quoted plainly as text with the surah and
  ayah given; what the olive has meant in Palestinian life for generations (family groves, the
  autumn harvest, trees older than the families who tend them, oil as the household staple it is);
  how that heritage reaches a Malaysian table through a single-origin bottle. Cultural and
  historical throughout.
- **must NOT cover**: **no hadith** — not one, not paraphrased. No health, spiritual, healing or
  barakah claim about this or any oil. No theological interpretation of a verse; quote it, give
  the reference, and move on. No political commentary. Origin as supply chain belongs to
  `blog/minyak-zaitun-palestin-dari-ladang-ke-botol` — link to it once rather than repeating it.
- **hero photo**: an ancient olive tree with a deeply gnarled trunk framing a hillside at sunset,
  a stone-built village with terracotta roofs below and the sea beyond, a few green olives resting
  on a flat stone in the foreground.
- **inline photo**: an older farmer in a chequered keffiyeh, crouched, picking olives by hand from
  a laden branch; a wooden crate of harvested olives beside him, a dry grove behind.

## ar-1 · `zayt-alzaytun-kuala-lumpur`

- **focus keyword**: `زيت الزيتون في كوالالمبور` · slug `zayt-alzaytun-fi-kuala-lumpur`
- **cover**: for Arabic speakers living in or visiting the Klang Valley — where the oil is actually
  sold, both Berkat Madinah branches with their full addresses and which one is larger, the opening
  hours, the WhatsApp number, the two online counters, what to expect to pay (RM59 / RM103), and
  what to check on the bottle before paying. Practical and local throughout.
- **must NOT cover**: general "why olive oil in Malaysia" material — the Arabic article
  `why-olive-oil-is-becoming-popular-in-malaysia` owns it.
- **hero photo**: a Malaysian woman in a green hijab holding the brand's bottle towards the camera,
  a wooden kampung house and olive branches behind her.
- **inline photo**: the brand's bottle on a stone ledge in a sunlit olive grove, a hand beside it,
  a dirt path running away between old olive trees.

## ar-2 · `sier-zayt-alzaytun-malaysia`

- **focus keyword**: `سعر زيت الزيتون` · slug `sier-zayt-alzaytun-fi-malizya`
- **cover**: what the price in Malaysia is and what sits behind it — RM59 for 250 ml and RM103 for
  500 ml, which is RM236 and RM206 per litre; why a per-litre comparison is the only honest way to
  compare bottles; what an imported single-origin cold-pressed oil carries that a supermarket blend
  does not (harvest, pressing, shipping, small volumes); a table comparing the two sizes on price,
  per litre and who each suits; how to judge whether a cheap bottle is cheap for a reason.
- **must NOT cover**: no invented competitor prices, no "market average" you cannot source. Compare
  the two real sizes and describe categories in general terms.
- **hero photo**: a bottling line — oil filling a moving row of dark glass bottles from stainless
  nozzles, a worker in a hairnet out of focus behind.
- **inline photo**: olive paste extruding from a stainless mill mouth while a ribbon of bright
  green-gold oil pours into a steel vat below.

## ar-3 · `hifz-zayt-alzaytun`

- **focus keyword**: `حفظ زيت الزيتون` · slug `hifz-zayt-alzaytun`
- **cover**: how to store olive oil in a tropical climate — heat, light, air and time are the four
  things that degrade it; why dark glass matters and why a bottle beside the stove is the worst
  place in the kitchen; whether to refrigerate (and what the cloudiness means when you do); how
  long an opened bottle stays good and how to tell when it has turned — smell, taste, a waxy or
  crayon note; the 250 ml versus 500 ml decision for a household that cooks with it occasionally;
  what a Malaysian kitchen's humidity does and does not change.
- **must NOT cover**: authenticity checks at the point of purchase —
  `blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia` (Arabic) owns that.
- **hero photo**: oil pouring from a stainless steel pipe into an open vat in a processing room,
  steel tanks and a pressure gauge around it.
- **inline photo**: a close view of the brand's dark glass bottle standing on a wooden table, olive
  leaves in the foreground, an olive grove blurred behind.
