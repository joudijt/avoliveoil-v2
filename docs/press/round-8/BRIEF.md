# PRESS round 8 — shared writer brief

You are writing **one** article. Read this file, then your row at the bottom, then write
`docs/press/round-8/drafts/<id>.json` and nothing else. Do not touch another writer's file.

## Images — handled centrally, do not choose one

Images are assigned **after** all fifteen drafts are imported, by `scripts/recut-article-images.py`,
which crops from the project's own photo library. You do not choose a photo, crop anything, or
generate anything. Write `heroAlt` and `inlineAlt` as a **plain factual placeholder** describing your
article's general subject — `sync-article-alt.py` overwrites both with the real photo's description
once assigned. Do not describe a specific frame; there isn't one yet.

## The contract is machine-checked

`scripts/press-import.py` validates every draft and refuses to write the round if any fails.

| Rule | Value |
|---|---|
| Word count (intro + section headings + blocks + conclusion + FAQs) | **800–980, aim 900–960** |
| Sections | 5–7, each with `heading`, `id` (kebab, unique in the file), `blocks` |
| First block of every section | `type: "p"`, **40–70 words**, a standalone answer |
| FAQs | 6–8, each answer **30–42 words** |
| `relatedKeywords` | 8–12 |
| `keyTakeaway` | 40–55 words |
| `metaTitle` / `seoTitle` | ≤60 chars |
| `metaDescription` | ≤155 chars |
| `h1` | must contain **every token** of the focus keyword |
| `slug` | `[a-z0-9-]+` only |
| At least one `table` or `ul`/`ol` block | answer engines lift structured blocks |
| Inline markup | **only** `**bold**` and `[label](href)` |

Copy the shape from `docs/press/round-7/drafts/olive-oil-coffee.json` — same top-level keys in the
same order. `datePublished` and `dateModified` are both **`2026-09-10`**.

Validate before you finish:

```
python scripts/press-import.py --round 8 --check
```

Read the lines for **your** id only. Do NOT run the importer without `--check`.

---

## Facts — `src/data/storeFacts.json` is the single source of truth

- The brand is **Arabian Village**, Palestinian first cold pressed extra virgin olive oil sold in
  Malaysia.
- The Malaysian distributor is **Berkat Madinah Store** — branches **Ampang Jaya** and **Batu
  Caves** (Batu Caves is the larger of the two), open **8:00 am – 12:00 midnight, Monday–Sunday**
  (festive days can differ), WhatsApp **+60 11-1111 9912**, plus that same seller's own **Shopee**
  and **TikTok Shop** counters. **There is no other legitimate seller in Malaysia.** This is not a
  webshop — the site has no cart.
- The catalogue is **one classic organic extra virgin olive oil** plus **six infused flavours**:
  wild thyme, blackseed, turmeric & black pepper, rosemary & basil, fennel & anise, lavender &
  chamomile. **No garlic, truffle, orange, lemon or chilli infusion exists.**
- Sizes **250 ml and 500 ml only**. No litre bottle, no tin, no gift set, no bundle.
- **Locked price strings — use these characters exactly or not at all:** RM59.00 (250 ml),
  RM103.00 (500 ml), RM236.00 per litre, RM206.00 per litre, an RM30.00 difference for the same
  volume. Prefer linking `products` to retyping them.

### ⛔ Five product names that do not exist

`src/i18n/locales/*/common.json` → `productShowcase.products` advertises **"Reserve Selection",
"Organic Grove", "Arabian Village Classic", "Family Estate", "Gold Harvest"** on the homepage.
These are template placeholder copy — none is a purchasable SKU, and one of them describes
"Mediterranean groves", not Palestinian ones. **No article may name any of the five.** (Escalated
to the owner as D54; not this round's to fix.)

### ⛔ Do not add social proof of any kind

No testimonial, customer name, quote, star rating, review count, award, tonnage, certification
number or lab result. The 123-article corpus is currently **clean** of all of these and must stay
clean. (Three fabricated testimonial personas and a "5★ / 500,000 customers with a 5-star
reputation" claim are live in the i18n locale files and on the homepage and Why-Us page — escalated
as D53. Do not propagate them into an article.)

### ⛔ Do not quote an acidity figure for this product

**"tests below 0.028%" has no source.** It is published 9 times across the article corpus and ~46
times site-wide, it is hardcoded in `scripts/ai/facts-sync.mjs`, and this round traced it to a
self-authored `llms.txt` rewrite. `storeFacts.json` does not carry it and no certificate exists
anywhere in the repo. **No round-8 article repeats it.** You may write about free acidity as a
**category standard** — the extra virgin ceiling is **0.8%**, virgin 2.0%, refined 0.3% — because
those are published trade limits, not a claim about this bottle.

---

## The ceiling — Malaysia, Food Regulations 1985 Reg. 18(6)

Food may not be represented as **preventing, alleviating, treating or curing any disease.**

**Five of this round's fifteen articles sit directly in the health cluster.** They are written
anyway, on the exact model the live `evoo-health-benefits-families` article already uses — which is
careful, sourced, and has been live for weeks. **Read that article before you write.** Its rules:

1. **Composition is a fact; benefit is a claim.** You may state what olive oil *is* at category
   level: roughly **70–80% monounsaturated fat (oleic acid)**; it keeps **polyphenols**
   (hydroxytyrosol, tyrosol, oleocanthal, oleuropein derivatives) and **vitamin E
   (alpha-tocopherol)** that refining removes; about **120 kcal per tablespoon**; no cholesterol,
   no protein or carbohydrate worth counting. **Name compounds, never quantities** — the site
   publishes no analysis of its own bottle and no mg/day figure. If you need a number that is not
   in this list, you do not have it.
2. **Only three health statements are permitted, and only with their hedges intact:**
   - Replacing saturated fat with unsaturated fat helps maintain normal blood cholesterol — cite
     the **WHO** (`https://www.who.int/`). *Replacement, not addition.*
   - **EFSA** (`https://www.efsa.europa.eu/`) accepted that olive oil polyphenols contribute to
     protecting blood lipids from oxidative stress, **at a defined daily intake** — say "a defined
     daily intake", never a number.
   - The **US FDA** (`https://www.fda.gov/`) permitted a **qualified** claim about oleic acid and
     coronary heart disease — and "qualified" means the FDA judged the evidence limited and
     required the claim to say so. **Always explain the word.**
3. **The research studied a whole dietary pattern**, not a spoonful added to an unchanged diet.
   Say so.
4. **Carry the refusal explicitly.** Some version of: *olive oil does not treat, cure or prevent
   any disease; it does not dissolve fat, reverse diabetes or replace medication; if you have a
   diagnosed condition the person to ask is your doctor or a registered dietitian, not a label.*
5. **Banned outright, in body text, tables and FAQ answers alike:** weight loss, slimming,
   metabolism, immunity, inflammation, detox, anti-ageing, blood pressure, blood sugar, diabetes,
   cancer, "boosts", "burns", "flushes", "heals", "superfood", "miracle". Also **no dosage
   instruction** — no "take X spoons a day". Quantities are allowed only as *cooking* quantities in
   a dish.
6. **Skin and hair:** if it comes up, say it is a traditional practice rather than a clinical
   treatment, and move on. This is a **food** product.
7. Every health-cluster article ends with the live article's line, in its own words: *nothing here
   is medical advice; it is food information, written to be accurate about what is known and honest
   about what is not.*

---

## Do not contradict the live site — checked this round, quote-by-quote

| Subject | The published position you must follow |
|---|---|
| **Free acidity ceiling** | extra virgin **0.8%**, virgin 2.0%, refined 0.3%. Never a figure for this bottle |
| **Shelf life** | up to about **18 months unopened**, about **two months once opened** |
| **Refrigeration** | ⚠ **"Unnecessary, not forbidden."** This is the canonical position, declared on the live Arabic `tajmid-zayt-alzaytun`. Cold haze is physical, reverses in about **an hour** at room temperature, and nothing is lost. **Do not write a flat prohibition.** (Two live pages still say a flat "do not" — a known crack, D50, not yours to fix) |
| **The fridge test for authenticity** | a **myth**. Real and fake oil both cloud |
| **Rancidity** | only **smell** decides it |
| **The real enemy** | heat — the cupboard beside the hob |
| **Smoke point** | extra virgin olive oil **190–210 °C**; virgin coconut 175–190 °C; palm cooking oil ~230 °C; refined sunflower ~225 °C; avocado above olive oil's range. Normal home sautéing **140–180 °C**. Deep-frying at 200 °C destroys polyphenols. ⚠ The live `olive-oil-smoke-point` article says 120–160 °C for a *tumis* — a known corpus disagreement; **use 140–180 °C**, which `llms.txt` and the health article both publish |
| **Frying-oil reuse** | ⚠ **Genuinely differs by language (D44, open).** EN treats reuse as permitted but a poor trade at RM236 a litre. MS allows **two or three shallow-fry uses with straining**. AR forbids it outright. **Follow your own language's published article. Do not average them, and do not introduce the subject unless your row asks for it** — prefer a link |
| **Orange cake** | ⚠ **Four different recipes are live** (D46 + this round's finding). **No round-8 article may give a cake recipe or restate a baking ratio.** Link, do not repeat |
| **Malay vocabulary** | `perahan sejuk`, never `sejuk-tekan` (a calque). **`ditapis` means the refined grade**, not "filtered" — do not use it loosely. `minyak zaitun dara` = extra virgin |

---

## Scope boundaries — the cannibalisation register

This round publishes into clusters the site already occupies. **Every row below is a live article
that owns a term near yours.** Link it; do not retell it.

| Already live and owns it | What you must NOT do |
|---|---|
| `extra-virgin-olive-oil-health-benefits-for-malaysian-families` — `extra virgin olive oil health benefits` | Do not re-run the WHO/EFSA/FDA survey as your article's spine. Cite at most the one claim your angle needs, then link |
| `why-olive-oil-is-becoming-popular-in-malaysia` — `olive oil Malaysia` | Do not write about the market trend or why Malaysians are switching |
| `how-to-compare-olive-oil-brands-in-malaysia` — `best olive oil in malaysia` | Do not restate its six-question comparison method or its ninety-second checklist |
| `how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia` — `authentic extra virgin olive oil Malaysia` | Do not restate the 10-point authenticity checklist or the home taste test |
| `olive-oil-price-in-malaysia-what-you-are-paying-for` / `harga-minyak-zaitun-di-malaysia` | Do not build a price-per-litre explainer. One sentence and a link |
| `olive-oil-smoke-point-what-heat-it-can-take` | **Invent no smoke-point number.** Use only the table above, and link |
| `how-to-cook-with-olive-oil-in-a-malaysian-kitchen` / `minyak-zaitun-untuk-masak-panduan-dapur` | Do not write a general cooking guide |
| `olive-oil-for-cakes-and-baking` / `minyak-zaitun-untuk-kek-dan-bakeri` | Do not restate the butter-to-oil conversion ratio |
| `extra-virgin-olive-oil-vs-pure-olive-oil`, `olive-oil-vs-pomace-oil-what-the-grades-mean`, `apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain` | Do not write a grades explainer as your spine — one line and a link |
| `what-size-olive-oil-bottle-to-buy` / `botol-minyak-zaitun-kaca-gelap-dan-saiz` | Do not build a 250-vs-500 comparison |
| `maksud-minyak-zaitun-tulen`, `cara-kenal-minyak-zaitun-palsu` | Do not write a counterfeit-detection guide |
| `olive-oil-shelf-life`, `cara-simpan-minyak-zaitun`, `why-is-my-olive-oil-cloudy`, `kenapa-minyak-zaitun-jadi-keruh` | Do not write a storage guide |
| `is-olive-oil-halal-what-to-check-in-malaysia` / `status-halal-minyak-zaitun` | Do not write a halal explainer |
| `palestinian-olive-oil-what-makes-it-different` / `minyak-zaitun-palestin-dari-ladang-ke-botol` | Do not tell the origin story at length. One paragraph maximum, where your row says it belongs |

## Where the Palestinian differentiator goes

Palestinian origin, first cold press, hand harvest, pressing within hours and the single-distributor
chain have **near-zero search demand in Malaysia** (`palestinian olive oil` ~0/mo). They are a
**differentiator inside** an article, never its subject. Use them **only** in
`minyak-zaitun-original-cara-pastikan`, `extra-virgin-olive-oil-in-malaysia` and
`best-extra-virgin-olive-oil-in-malaysia`, and even there as one worked example of a traceable
chain — not as a sales pitch.

## Voice

- Write **in** the language, not into it. **No article is a translation of another.** Two of this
  round's clusters run across both languages; if your FAQ block could be swapped with the other
  language's article, you have failed.
- Concrete beats abstract: a temperature, a ratio, a step, a grade, a price band.
- Every answer paragraph must survive being quoted **alone**, with no "as mentioned above".
- No superlative you cannot prove. "The best" is not a claim this site makes about itself.

## Links

`related` is 3–5 objects `{label, path, description}`. `path` carries **no language prefix and no
leading slash**. Money pages: `products`, `shop`, `why-us`, `contact` — **there is no `story`
route**. Use one money page plus **two sibling articles in your own language**, taken exactly from
your row — those slugs are already resolved from `slugs.json`, do not guess.

---

# Rows

`datePublished` and `dateModified` are `2026-09-10`. `readingTime` from your own word count at
roughly 200 words a minute.

## English

**`olive-oil-is-it-healthy`** · slug `olive-oil-is-it-healthy` · focus **olive oil is it healthy** (210/mo, LOW)
Intent: someone typing a blunt health question. Answer it with **label literacy**, not with a
benefit list. Cover: why a Malaysian seller legally cannot answer this the way the searcher expects
(Reg. 18(6), name it); what a label *can* honestly carry — grade, harvest date, single named
origin, the 0.8% category ceiling, dark glass; what a label cannot tell you; the three
carefully-worded international claims and their hedges (one paragraph, then link the live health
article); and the replacement-not-addition point. A table of "what the label tells you / what it
does not" is required. End with the medical-advice refusal.
Siblings: `blog/extra-virgin-olive-oil-health-benefits-for-malaysian-families`, `blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia`.

**`is-it-good-to-cook-with-extra-virgin-olive-oil`** · slug `is-it-good-to-cook-with-extra-virgin-olive-oil` · focus **is it good to cook with extra virgin olive oil** (50/mo, LOW)
Intent: "am I wasting the expensive bottle in a hot pan?" This is a **decision article**, not a
temperature article. Cover: what heat actually costs you (aroma and polyphenols go first, the fat
is largely unchanged); the three-band decision — raw/finishing, moderate sauté, high heat — and
which oil each deserves; why the 190–210 °C figure means most Malaysian home cooking is inside
range; when a cheaper oil is the right answer; and the cost-per-use arithmetic in words, not
ringgit. A three-band table is required. **Cite the smoke-point figures from the table above and
link that article — invent nothing.**
Siblings: `blog/olive-oil-smoke-point-what-heat-it-can-take`, `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`.

**`vitamins-in-extra-virgin-olive-oil`** · slug `vitamins-in-extra-virgin-olive-oil` · focus **vitamins in extra virgin olive oil** (10/mo, LOW)
Intent: what is actually in the bottle. Strictly **compositional, category-level, no quantities**.
Cover: the fat fraction (70–80% oleic acid) and what "monounsaturated" means physically; vitamin E
as alpha-tocopherol and why it is there — it protects the oil, not you; the polyphenols by name and
that they are what makes an oil taste bitter and peppery, so **taste is the only home test**; what
refining removes and why "light" oil is lighter in flavour, not in calories; and an explicit
paragraph stating that **this site publishes no laboratory analysis of its own bottle**, so any
number you read on a label needs a certificate behind it. A "compound / what it does in the oil"
table is required. **No mg, no %DV, no daily intake.**
Siblings: `blog/extra-virgin-olive-oil-vs-pure-olive-oil`, `blog/why-does-olive-oil-taste-bitter`.

**`advantages-of-extra-virgin-olive-oil`** · slug `advantages-of-extra-virgin-olive-oil` · focus **advantages of extra virgin olive oil** (590/mo, HIGH)
Intent: the largest term in this round. **Advantages as an ingredient and as a purchase — not as
health.** Cover: flavour you can actually taste against a neutral oil, and where that matters
(raw, finishing, dressing, bread) versus where it is wasted; the grade advantage — mechanically
extracted, no heat, no solvents, so nothing has been stripped and nothing added; that it is a
single-ingredient food; versatility across cold and moderate-heat cooking; and the honest
counter-column — it costs more, it has a shorter open life, and it is the wrong tool for a wok at
full heat. A two-column "advantage / limit" table is required, and the limits column must be real.
One sentence may point at the health question and link the live article; do not develop it.
Siblings: `blog/extra-virgin-olive-oil-vs-pure-olive-oil`, `blog/olive-oil-vs-butter`.

**`consuming-extra-virgin-olive-oil-day-to-day`** · slug `consuming-extra-virgin-olive-oil-day-to-day` · focus **consuming extra virgin olive oil** (140/mo, HIGH)
Intent: what eating it actually looks like across a week, in food terms. ⛔ **No dosage. No "spoons
per day". No health framing.** Cover: raw versus heated and what changes in the mouth, not in the
body; where a Malaysian household already has a natural slot (over rice, on roti, into a sambal
after the heat is off, over grilled fish, in a dressing); realistic quantities **per dish**, not
per person; why a 250 ml bottle used only raw lasts longer than people expect and how that sets the
size you buy; and the one habit that ruins it — the bottle left open beside the stove. A
"meal / how it goes in / how much" table is required.
Siblings: `blog/olive-oil-for-bread-and-dipping`, `blog/extra-virgin-olive-oil-salad-dressing`.

**`extra-virgin-olive-oil-uses`** · slug `extra-virgin-olive-oil-uses` · focus **extra virgin olive oil uses** (20/mo, LOW)
Intent: a **hub page**. Its value is the map and the links, not new instruction. Cover: the four
families of use — raw and finishing, dressings and emulsions, moderate-heat cooking, baking and
desserts — with two to four sentences each saying **which grade and which freshness that family
needs** and then linking the live article that owns it. Then a "use / what it needs / where to
read more" table. ⛔ **Do not explain how to do any of them.** You are the index; they are the
article. Link at least six live articles by their real slugs across your body and `related`
combined.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/olive-oil-for-roasting-vegetables`.

**`extra-virgin-olive-oil-in-malaysia`** · slug `extra-virgin-olive-oil-in-malaysia` · focus **extra virgin olive oil in malaysia** (210/mo, HIGH)
Intent: **a shelf survey.** What a buyer in Malaysia actually meets and how to read it. Cover: the
three places the grade turns up — supermarket shelf, Arab grocer, marketplace listing — and what
each does well and badly; the formats sold here (small dark glass through big clear PET) and what
format signals; why everything is imported and what that does to freshness and harvest dates; the
one paragraph on origin traceability where **Arabian Village is the worked example** — Palestinian
groves, hand harvest, pressed within hours, one named distributor with two physical branches;
and what to check before paying. A "where you're buying / what to check there" table is required.
⛔ Not a trend piece, not a price explainer, not the authenticity checklist — link all three.
Siblings: `blog/why-olive-oil-is-becoming-popular-in-malaysia`, `blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia`.

**`best-extra-virgin-olive-oil-in-malaysia`** · slug `best-extra-virgin-olive-oil-in-malaysia` · focus **best extra virgin olive oil in malaysia** (70/mo, HIGH)
⚠ **Highest cannibalisation risk in the round.** The live `how-to-compare-olive-oil-brands-in-malaysia`
owns the comparison *method*. **You must not restate it.** Your article answers a different
question: **what can the word "best" honestly mean here, and what can it never mean.**
Intent: a superlative query, answered by refusing the superlative. Cover: why no honest page can
rank the market — nobody has tested every bottle sold in Malaysia and anyone claiming to has not;
that "best" is only definable **against a use** (best for a dressing, best for a hot pan, best per
ringgit) and those are three different bottles; the four things that separate one extra virgin from
another — harvest year, origin traceability, how it has been stored between mill and shelf, and
taste; that **taste is the only test you can run**; and one paragraph on what accountability looks
like, using the single-distributor chain as the example. A "best for X / what that actually means"
table is required. ⛔ **No ranking, no rating, no "we are the best", no testimonial.**
Siblings: `blog/how-to-compare-olive-oil-brands-in-malaysia`, `blog/why-does-olive-oil-taste-bitter`.

**`which-olive-oil-to-buy`** · slug `which-olive-oil-to-buy` · focus **which olive oil to buy** (10/mo, LOW)
Intent: the decision itself, for someone standing in front of a shelf. Cover: a short question
ladder — what will you mostly do with it? how fast will you get through it? are you buying for
flavour or for volume? — each answer landing on a **grade and a size**; the case for owning two
oils rather than one compromise bottle; why the size question is really a freshness question once
opened; and a plain "if you only buy one bottle" recommendation. A decision table or numbered
ladder is required. ⛔ Not the 250-vs-500 comparison and not the grades explainer — link both.
Siblings: `blog/what-size-olive-oil-bottle-to-buy`, `blog/extra-virgin-olive-oil-vs-pure-olive-oil`.

## Malay

**`kelebihan-olive-oil-untuk-dapur-harian`** · slug `kelebihan-olive-oil-untuk-dapur-harian` · focus **kelebihan olive oil** (480/mo, MEDIUM)
Niat: pencarian terbesar dalam kelompok Melayu round ini. **Kelebihan di dapur dan pada bil belanja
— bukan kelebihan kesihatan.** Liputi: rasa yang benar-benar boleh dikesan berbanding minyak
neutral, dan di mana ia penting (mentah, siraman akhir, salad, roti) berbanding di mana ia
terbazir; kelebihan gred — diperah secara mekanikal tanpa haba dan tanpa pelarut; ia makanan satu
bahan; ia serba boleh untuk masakan sejuk dan panas sederhana; dan **lajur had yang jujur** — lebih
mahal, umur selepas dibuka lebih pendek, dan bukan alat untuk kuali di api penuh. Jadual
"kelebihan / had" wajib. Satu ayat sahaja boleh menunjuk ke soalan kesihatan dan memaut artikel
`manfaat-kesihatan…` yang sedia ada; jangan kembangkan.
Sibling: `blog/manfaat-kesihatan-minyak-zaitun-dara-untuk-keluarga-malaysia`, `blog/minyak-zaitun-vs-minyak-masak-lain`.

**`kelebihan-extra-virgin-olive-oil-berbanding-gred-lain`** · slug `kelebihan-extra-virgin-olive-oil-berbanding-gred-lain` · focus **kelebihan extra virgin olive oil** (90/mo, MEDIUM)
Niat: kelebihan itu **ialah gred itu sendiri**. Liputi: apa yang gred tertinggi simpan yang gred
lain sudah buang — aroma, rasa pahit dan pedas, sebatian polifenol (namakan, **tanpa angka**);
kenapa `ditapis` bermaksud gred tapisan dan bukan "ditapis halus"; had keasidan kategori (0.8%
extra virgin, 2.0% dara, 0.3% tapisan) sebagai piawai perdagangan — **jangan sebut sebarang angka
untuk botol ini**; dan bila kelebihan itu **musnah** — pada haba tinggi, cahaya, dan botol yang
dibiar terbuka. Jadual "gred / apa yang tinggal / guna untuk apa" wajib. ⛔ Bukan artikel penerangan
gred — pautkan `apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain`, jangan ulang.
Sibling: `blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain`, `blog/rasa-minyak-zaitun-pahit-dan-pedas`.

**`cara-makan-minyak-zaitun-setiap-hari`** · slug `cara-makan-minyak-zaitun-setiap-hari` · focus **cara makan minyak zaitun** (110/mo, MEDIUM)
Niat: cara ia benar-benar masuk ke dalam makanan harian orang Malaysia. ⛔ **Bukan "cara minum".
Tiada dos. Tiada sudu sehari. Tiada bingkai kesihatan.** Liputi: mentah berbanding dipanaskan dan
apa yang berubah pada rasa; slot semula jadi dalam menu Malaysia — atas nasi panas, pada roti
canai atau roti bakar, dititis ke dalam sambal **selepas api ditutup**, atas ikan bakar, dalam
salad; kuantiti realistik **setiap hidangan**, bukan setiap orang; dan satu tabiat yang merosakkan
minyak — botol dibiar terbuka di sebelah dapur. Jadual "hidangan / cara masuk / berapa banyak"
wajib. Jika pembaca sebenarnya bertanya soal kesihatan, katakan itu soalan untuk doktor atau
pakar diet, kemudian teruskan.
Sibling: `blog/minyak-zaitun-untuk-roti-dan-cicahan`, `blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk`.

**`minyak-zaitun-panduan-lengkap`** · slug `minyak-zaitun-panduan-lengkap` · focus **minyak zaitun** (8,100/mo, HIGH)
Niat: **halaman tunggak**. Istilah induk Melayu, dan tiada satu pun daripada 44 artikel Melayu yang
memilikinya. Nilainya ialah peta dan pautan, bukan arahan baharu. Liputi enam bahagian pendek —
apa itu minyak zaitun dan dari mana ia datang · gred · guna di dapur · simpan · beli di Malaysia ·
rasa — **setiap satu dua hingga empat ayat jawapan yang berdiri sendiri, kemudian pautan ke artikel
Melayu sedia ada yang memilikinya**. Kemudian jadual "soalan / jawapan ringkas / baca lanjut".
⛔ **Jangan terangkan cara buat apa-apa.** Anda indeks; mereka artikelnya. ⛔ Bukan artikel trend
pasaran — pautkan `mengapa-minyak-zaitun-semakin-popular-di-malaysia`, jangan ulang. Pautkan
sekurang-kurangnya enam artikel Melayu sedia ada dengan slug sebenar.
Sibling: `blog/mengapa-minyak-zaitun-semakin-popular-di-malaysia`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.

**`minyak-zaitun-original-cara-pastikan`** · slug `minyak-zaitun-original-cara-pastikan` · focus **minyak zaitun original** (170/mo, HIGH)
Niat: perkataan **"original"** sebagaimana penjual marketplace menggunakannya. ⛔ **Bukan panduan
kenal minyak palsu** (`cara-kenal-minyak-zaitun-palsu` sudah memilikinya) dan **bukan maksud
"tulen"** (`maksud-minyak-zaitun-tulen` sudah memilikinya) — pautkan kedua-duanya. Liputi: apa
sebenarnya "original" janjikan dalam penyenaraian Shopee atau TikTok — biasanya "bukan tiruan
penjual semula", bukan satu gred dan bukan satu piawai; apa yang **boleh** disahkan — siapa penjual
rasmi, adakah ada kedai fizikal yang boleh didatangi, adakah botol bermeterai, adakah ada tarikh
tuai dan negara asal yang dinamakan; apa yang **tidak boleh** disahkan dari sebuah gambar
penyenaraian; dan **satu perenggan** rantaian yang boleh dijejaki sebagai contoh — ladang Palestin,
tuai tangan, diperah dalam beberapa jam, satu pengedar rasmi di Malaysia dengan dua cawangan
fizikal dan nombor WhatsApp yang menjawab. Jadual "boleh disahkan / tidak boleh disahkan" wajib.
Sibling: `blog/cara-kenal-minyak-zaitun-palsu`, `blog/beli-minyak-zaitun-online-di-malaysia`.

**`maksud-olive-oil-dalam-bahasa-malaysia`** · slug `maksud-olive-oil-dalam-bahasa-malaysia` · focus **maksud olive oil dalam bahasa malaysia** (10/mo, LOW)
Niat: jambatan istilah, untuk pembaca yang berulang-alik antara label Inggeris dan perbualan
Melayu. Volum rendah dan itu direkodkan dengan jujur. Liputi: `olive oil` = **minyak zaitun**;
`zaitun` ialah buah, `minyak zaitun` ialah minyaknya; ejaan `zaiton` yang muncul dalam carian;
istilah gred dalam dua bahasa dalam satu jadual — extra virgin / **minyak zaitun dara**, virgin,
pure atau light / **ditapis**, pomace / **hampas**, refined / **tapisan**; `cold pressed` =
**perahan sejuk**, dan kenapa **`sejuk-tekan` salah**; `first cold press` = **perahan sejuk
pertama**; `harvest date` = **tarikh tuai**; `acidity` = **keasidan**. Jadual dwibahasa wajib.
Kemudian pautkan halaman tunggak sebagai langkah seterusnya.
Sibling: `blog/minyak-zaitun-panduan-lengkap`, `blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain`.
