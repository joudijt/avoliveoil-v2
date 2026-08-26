# PRESS round 7 — shared writer brief

You are writing **one** article. Read this file, then your row at the bottom, then write
`docs/press/round-7/drafts/<id>.json` and nothing else. Do not touch another writer's file.

## Images — handled centrally, do not choose one

**Images are assigned after all eighteen drafts are imported**, by a site-wide script that crops
from the project's own photo library. You do not choose a photo, crop anything, or generate
anything. Write `heroAlt` and `inlineAlt` as a **plain factual placeholder** describing your
article's general subject (for example: "Green olive oil in a glass bottle" or "A wooden table set
for breakfast") — the script overwrites both with the real photo's description once assigned. Do
not describe a specific frame; there isn't one yet.

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

Copy the shape from `docs/press/round-6/drafts/olive-oil-vs-butter.json` — same top-level keys in
the same order. `datePublished` and `dateModified` are both `2026-08-26`.

Validate before you finish:

```
python scripts/press-import.py --round 7 --check
```

Read the lines for **your** id only. Do NOT run the importer without `--check`.

## Facts

**`src/data/storeFacts.json` is the single source of truth.** Read it. Do not retype a value into
prose where it can drift — prefer linking to the money page.

- The brand is **Arabian Village**, Palestinian cold-pressed extra virgin olive oil sold in Malaysia.
- The Malaysia distributor is **Berkat Madinah Store**, two branches in Selangor, plus a Shopee and
  a TikTok Shop counter which are that same seller's own counters. **There is no other legitimate
  seller in Malaysia.**
- The site sells **six infused extra virgin olive oils**: wild thyme, blackseed, turmeric & black
  pepper, rosemary & basil, fennel & anise, lavender & chamomile. **No garlic, truffle, orange or
  lemon infusion exists — do not suggest one, even for the orange cake or coffee articles.**
- Sizes are 250 ml and 500 ml only. No tin, no gift set, no bundle.

**Everything else that is checkable and not in that file does not exist.** No award, rating,
customer count, tonnage, lab result, certification or testimonial.

## The ceiling — Malaysia, Food Regulations 1985 Reg. 18(6)

Food may not be represented as preventing, alleviating, treating or curing any disease, and this
site carries no compositional analysis, so **nutrient-content claims are out too** — "rich in
antioxidants", "good fats", "healthier than", "supports metabolism", "boosts energy". No
cholesterol, heart, weight, digestion or immunity framing anywhere, **including table cells and
FAQ answers**.

**This bites hardest on three articles this round:**

- **`olive-oil-coffee` / `kopi-minyak-zaitun` / `qahwat-bizayt-alzaytun`.** The "oil in coffee"
  trend is usually marketed with health and energy claims (metabolism, satiety, a "healthier
  latte"). None of that here — write it as a **texture and flavour** trend: a fuller mouthfeel, a
  faint peppery or grassy note against bitterness, why it needs blending or vigorous stirring
  rather than a plain pour (oil and coffee separate). If the reader's real question is "is this
  good for me", say plainly that it is one for a doctor or dietitian, then move on.
- **`olive-oil-ice-cream` / `minyak-zaitun-ais-krim` / `ays-krim-bizayt-alzaytun`.** Do not frame
  as "healthier ice cream" or a diet swap. It is a Mediterranean dessert technique: extra virgin
  olive oil churned in for a silkier texture and a fruity, slightly peppery counter-note to the
  sweetness, usually finished with flaky salt or citrus zest.
- **`olive-oil-mashed-potatoes`.** "Dairy-free" is a fact about ingredients, not a health claim —
  fine to state. "Healthier than butter" is not fine. Keep it to texture (creamier and looser vs.
  butter's richer, denser mash) and flavour.

## Scope boundaries — read these before you start

- **The three comparison articles (`olive-oil-vs-sunflower-oil` / `-vs-minyak-bunga-matahari` /
  `-wazayt-abad-alshams`, and `-vs-sesame-oil` / `-vs-minyak-bijan` / `-walsimsim`) link to the
  smoke-point article for exact temperatures — do not restate or invent smoke-point figures for
  sunflower or sesame oil.** Published smoke points on this site so far cover extra virgin olive
  oil (190–210 °C), virgin coconut oil (175–190 °C), palm cooking oil (~230 °C) and refined
  sunflower (~225 °C) — refined sunflower's figure you may cite since it is already published;
  sesame oil's smoke point is **not** published anywhere on this site, so either omit a number for
  it or describe it only in relative terms ("lower than a refined neutral oil" is not a number).
  Compare on flavour (neutral vs. fruity, or sesame's own strong nutty note), smell in a hot pan,
  and what each suits (a stir-fry finish for sesame, a raw drizzle or moderate sauté for olive oil).
- **`olive-oil-orange-cake` / `minyak-zaitun-kek-oren` / `kaykat-alburtuqal-bizayt-alzaytun` is a
  specific recipe, not the general baking-substitution ratio.** The live
  `olive-oil-for-cakes-and-baking` (EN) / `minyak-zaitun-untuk-kek-dan-bakeri` (MS) /
  `zayt-alzaytun-lilmuajanat` (AR) already own the butter-to-oil conversion ratio for baking in
  general. Link to it; do not restate the ratio. Yours covers this one cake specifically: oil
  quantity in the batter, orange zest and juice, why oil (not butter) keeps the crumb moist for
  days without refrigeration, and a simple glaze or dusting to finish.
- **`olive-oil-mashed-potatoes` / (AR sibling) `zayt-alzaytun-lilbatatis-almahrusa` is a stovetop
  side dish, not a health-swap article** — see the ceiling section above.
- **`minyak-zaitun-untuk-pizza` is about the dough and the crust — folding oil into the dough,
  brushing the crust before baking, a light finishing drizzle after — not a saucer of oil for
  dipping bread that already exists.** The live `minyak-zaitun-untuk-roti-dan-cicahan` owns the
  dipping-saucer subject; link it, do not repeat it.

## Do not contradict the live site — checked every round, still checked

Before you write a figure, check `public/llms.txt`, `llms-ms.txt` or `llms-ar.txt` for the same
subject.

- **Shelf life: up to about 18 months unopened, about two months once opened.**
- **The fridge is not necessary**, and cold cloudiness/partial setting is normal and reverses at
  room temperature — this is **not** a safety prohibition.
- **Frying oil, per this site's advice: two or three shallow-fry uses with filtering.** (Note: the
  live Arabic frying article states "not even once" — a known cross-language inconsistency, D44,
  still unresolved. If your article touches frying oil reuse, follow **your own language's**
  published article, do not average the two.)
- **Published smoke points**: extra virgin olive oil 190–210 °C, virgin coconut oil 175–190 °C,
  palm cooking oil ~230 °C, refined sunflower ~225 °C, avocado oil above olive oil's range.
- **Do not quote an acidity figure for this product.**
- **`ditapis` (Malay) means the refined grade**, not "filtered". Do not use it loosely.
- **Malay: use `perahan sejuk`, never `sejuk-tekan`** (a calque).

## Voice

- Write **in** the language, not into it. Not a translation of anybody's article.
- Concrete beats abstract: a temperature, a ratio, a step, a price range.
- Every answer paragraph must survive being quoted **alone**.
- No superlatives you cannot prove.

## Links

`related` is 3–5 objects `{label, path, description}`. `path` has no language prefix and no leading
slash. Use a money page (`products`, `shop`, `why-us`, `contact` — no `story` route) plus **two
sibling articles in your own language**. Your row names them by real slug — use them exactly,
these are already resolved from `slugs.json`, do not guess your own.

---

## Rows

`datePublished` and `dateModified` are `2026-08-26`. `readingTime` from your own word count at
roughly 200 words a minute.

### English

**`olive-oil-vs-sunflower-oil`** · slug `olive-oil-vs-sunflower-oil` · focus **olive oil vs sunflower oil** (40/mo, LOW)
Intent: which to reach for and why the price gap exists. Cover flavour (neutral vs. fruity), smoke
behaviour in general terms (link the smoke-point article for olive oil's figure; refined
sunflower's ~225 °C is already published elsewhere on this site and safe to cite), what each suits
(a high-heat fry vs. a raw drizzle or moderate sauté), and price per use. A "use this for that"
table is required.
Siblings: `blog/olive-oil-smoke-point-what-heat-it-can-take`, `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`.

**`olive-oil-vs-sesame-oil`** · slug `olive-oil-vs-sesame-oil` · focus **olive oil vs sesame oil** (30/mo, LOW)
Intent: two oils with strong, distinct flavours, both used raw and both used to cook — when each
wins. Cover flavour (grassy/peppery vs. nutty/toasted), toasted vs. light sesame oil as two
different products, why sesame is usually finished raw over a stir-fry rather than used to cook it
from cold, and where olive oil fits a Malaysian kitchen already using sesame oil (not a replacement,
a different tool). No invented sesame-oil smoke-point figure — this site has never published one.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/olive-oil-and-balsamic-vinegar`.

**`olive-oil-coffee`** · slug `olive-oil-coffee` · focus **olive oil coffee** (40/mo, LOW)
Intent: the "oil in coffee" trend — texture and flavour only, see the ceiling section above. Cover
quantity (roughly half a teaspoon to start), why it needs blending or vigorous stirring rather than
a plain pour, what it actually tastes like (fuller mouthfeel, a faint bitterness-cutting note, not
sweet), which roast and which grade of oil suits it (a mild extra virgin, not a peppery one that
fights the coffee), and iced vs. hot. A short numbered method is required.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `products`.

**`olive-oil-ice-cream`** · slug `olive-oil-ice-cream` · focus **olive oil ice cream** (40/mo, LOW)
Intent: a churned Mediterranean dessert, not a health swap — see the ceiling section above. Cover
the technique (oil replaces or joins the cream, emulsified in while churning), why extra virgin's
own fruit and pepper come through more than in a neutral-oil dessert, a simple finishing touch
(flaky salt, orange or lemon zest), and a no-churn shortcut if the reader has no machine. A
numbered method or ingredient table is required.
Siblings: `blog/olive-oil-for-cakes-and-baking`, `products`.

**`olive-oil-orange-cake`** · slug `olive-oil-orange-cake` · focus **olive oil orange cake** (20/mo, LOW)
Intent: one specific cake recipe — see the scope-boundary note above, do not restate the general
baking ratio. Cover oil quantity in the batter, orange zest and juice, why oil keeps the crumb moist
for days at room temperature without the fridge, and a simple glaze or icing-sugar dusting to
finish. A numbered method or ingredient table is required.
Siblings: `blog/olive-oil-for-cakes-and-baking`, `blog/olive-oil-substitute-what-to-use-instead`.

**`olive-oil-mashed-potatoes`** · slug `olive-oil-mashed-potatoes` · focus **olive oil mashed potatoes** (10/mo, LOW)
Intent: a dairy-free mash, texture and flavour only — see the ceiling section above. Cover oil
quantity per kilo of potato, warm oil folded in (not cold, and not while the potato is still
boiling-hot), how the texture differs from a butter-and-cream mash (looser, creamier, less rich),
and a garlic or herb variation using **plain** olive oil and fresh garlic — not the infused range,
which does not include garlic. A short method or table is required.
Siblings: `blog/olive-oil-vs-butter`, `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`.

### Malay

**`minyak-zaitun-vs-minyak-bunga-matahari`** · slug `minyak-zaitun-vs-minyak-bunga-matahari` · focus **minyak zaitun vs minyak bunga matahari** (0/mo)
Niat: yang mana nak guna dan kenapa jurang harga wujud. Liputi rasa (neutral lawan buah), sifat
takat berasap secara umum (pautkan artikel takat berasap untuk angka minyak zaitun; angka minyak
bunga matahari tapis ~225°C sudah diterbitkan di tempat lain di laman ini dan selamat disebut), apa
setiap satu sesuai untuk (goreng suhu tinggi lawan tuangan mentah atau tumis sederhana), dan kos
setiap kali guna. Jadual "guna yang mana untuk apa" wajib.
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `blog/minyak-zaitun-vs-minyak-sawit`.

**`minyak-zaitun-vs-minyak-bijan`** · slug `minyak-zaitun-vs-minyak-bijan` · focus **minyak zaitun vs minyak bijan** (0/mo)
Niat: dua minyak berperisa kuat dan berbeza, kedua-duanya digunakan mentah dan untuk memasak — bila
setiap satu menang. Liputi rasa (berumput/pedas lawan bijan panggang), minyak bijan panggang lawan
minyak bijan lembut sebagai dua produk berbeza, kenapa minyak bijan biasanya dituang mentah atas
tumisan bukan digunakan memasak dari sejuk, dan di mana minyak zaitun sesuai dalam dapur yang sudah
guna minyak bijan — bukan pengganti, alat berbeza. Jangan cipta angka takat berasap untuk minyak
bijan — laman ini tidak pernah menerbitkannya.
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `blog/minyak-zaitun-untuk-goreng`.

**`kopi-minyak-zaitun`** · slug `kopi-minyak-zaitun` · focus **kopi minyak zaitun** (10/mo, MEDIUM)
Niat: trend "minyak dalam kopi" — tekstur dan rasa sahaja, lihat bahagian siling di atas. Liputi
kuantiti (kira-kira separuh sudu teh untuk mula), kenapa ia perlu dikacau kuat atau diblend bukan
dituang terus (minyak dan kopi terpisah), rasa sebenar (mulut lebih penuh, nota mengurangkan
kepahitan, bukan manis), gred minyak yang sesuai (extra virgin lembut, bukan yang pedas), dan
sejuk lawan panas. Kaedah bernombor ringkas wajib.
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `products`.

**`minyak-zaitun-ais-krim`** · slug `minyak-zaitun-ais-krim` · focus **ais krim minyak zaitun** (0/mo)
Niat: pencuci mulut gaya Mediterranean, bukan pertukaran kesihatan — lihat bahagian siling di atas.
Liputi teknik (minyak menggantikan atau menyertai krim, diemulsikan semasa dikacau/churn), kenapa
rasa buah dan pedas extra virgin lebih menonjol berbanding pencuci mulut minyak neutral, sentuhan
akhir ringkas (garam flaky, kulit oren atau lemon), dan cara ringkas tanpa mesin ais krim. Kaedah
bernombor atau jadual ramuan wajib.
Sibling: `blog/minyak-zaitun-untuk-kek-dan-bakeri`, `products`.

**`minyak-zaitun-kek-oren`** · slug `minyak-zaitun-kek-oren` · focus **kek oren minyak zaitun** (0/mo)
Niat: satu resepi kek spesifik — lihat nota skop di atas, jangan ulang nisbah bakeri umum. Liputi
kuantiti minyak dalam adunan, kulit dan jus oren, kenapa minyak mengekalkan kek lembap selama
beberapa hari pada suhu bilik tanpa peti sejuk, dan glais atau taburan gula ais mudah untuk
melengkapkan. Kaedah bernombor atau jadual ramuan wajib.
Sibling: `blog/minyak-zaitun-untuk-kek-dan-bakeri`, `blog/olive-oil-substitute-what-to-use-instead`.

**`minyak-zaitun-untuk-pizza`** · slug `minyak-zaitun-untuk-pizza` · focus **minyak zaitun untuk pizza** (10/mo)
Niat: adunan dan kerak pizza — lihat nota skop di atas, bukan lopak minyak untuk mencelup roti yang
sudah wujud. Liputi minyak dilipat ke dalam adunan (kenapa dan berapa banyak), sapuan minyak pada
kerak sebelum bakar, tuangan akhir ringan selepas keluar dari ketuhar, dan perbezaan rasa berbanding
pizza tanpa minyak zaitun langsung.
Sibling: `blog/minyak-zaitun-untuk-roti-dan-cicahan`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.

### Arabic

Slugs are ASCII transliteration under D9. Everything else in Modern Standard Arabic.

**`zayt-alzaytun-wazayt-abad-alshams`** · slug `zayt-alzaytun-wazayt-abad-alshams` · focus **زيت الزيتون وزيت عباد الشمس** (0/mo)
النية: أيهما تستخدم ولماذا توجد فجوة سعرية. غطِّ الطعم (محايد مقابل فاكهي)، سلوك درجة التدخين
عموماً (اربط مقالة درجة التدخين لرقم زيت الزيتون؛ رقم زيت عباد الشمس المكرر ~225°م منشور في مكان
آخر على هذا الموقع وآمن ذكره)، ما يناسب كل واحد (قلي بحرارة عالية مقابل سكبة نيئة أو تحمير معتدل)،
وتكلفة كل استعمال. جدول "أيهما لأي استعمال" مطلوب.
الأشقاء: `blog/zayt-alzaytun-lil-tabkh`, `blog/zayt-alzaytun-lilqaly`.

**`zayt-alzaytun-walsimsim`** · slug `zayt-alzaytun-walsimsim` · focus **زيت الزيتون والسمسم** (0/mo)
النية: زيتان بطعم قوي ومختلف، يُستعملان نيئين ومطبوخين — متى يفوز كل واحد. غطِّ الطعم (عشبي/حرّيف
مقابل محمّص)، زيت السمسم المحمّص مقابل الفاتح كمنتجين مختلفين، لماذا يُسكب زيت السمسم نيئاً على
القلي غالباً بدل الطبخ به من البداية، وأين يناسب زيت الزيتون مطبخاً يستعمل زيت السمسم أصلاً — ليس
بديلاً، أداة مختلفة. لا تخترع رقم درجة تدخين لزيت السمسم — هذا الموقع لم ينشره قط.
الأشقاء: `blog/zayt-alzaytun-lil-tabkh`, `blog/zayt-alzaytun-lilqaly`.

**`qahwat-bizayt-alzaytun`** · slug `qahwat-bizayt-alzaytun` · focus **قهوة بزيت الزيتون** (0/mo)
النية: موضة "الزيت في القهوة" — الملمس والطعم فقط، انظر قسم السقف أعلاه. غطِّ الكمية (نصف ملعقة
صغيرة تقريباً للبداية)، لماذا تحتاج خلطاً قوياً أو مضرباً لا سكباً مباشراً (الزيت والقهوة ينفصلان)،
الطعم الفعلي (ملمس أكثر امتلاءً، نوتة تخفف المرارة، ليست حلوة)، درجة الزيت المناسبة (بكر ممتاز
لطيف لا حرّيف)، والقهوة الباردة مقابل الساخنة. خطوات مرقّمة قصيرة مطلوبة.
الأشقاء: `blog/zayt-alzaytun-lil-tabkh`, `products`.

**`ays-krim-bizayt-alzaytun`** · slug `ays-krim-bizayt-alzaytun` · focus **آيس كريم بزيت الزيتون** (0/mo)
النية: حلوى متوسطية مخفوقة، لا بديل صحي — انظر قسم السقف أعلاه. غطِّ التقنية (الزيت يستبدل أو
ينضمّ إلى القشدة، يُمزج مستحلَباً أثناء الخفق)، لماذا يظهر طعم البكر الممتاز الفاكهي والحرّيف أكثر
من حلوى بزيت محايد، لمسة أخيرة بسيطة (ملح رقائقي، قشر برتقال أو ليمون)، وطريقة مختصرة بلا آلة آيس
كريم. خطوات مرقّمة أو جدول مكونات مطلوب.
الأشقاء: `blog/zayt-alzaytun-lilmuajanat`, `products`.

**`kaykat-alburtuqal-bizayt-alzaytun`** · slug `kaykat-alburtuqal-bizayt-alzaytun` · focus **كيكة البرتقال بزيت الزيتون** (0/mo)
النية: وصفة كيكة واحدة محددة — انظر ملاحظة السقف أعلاه، لا تُعِد نسبة المعجنات العامة. غطِّ كمية
الزيت في الخليط، قشر وعصير البرتقال، لماذا يحافظ الزيت على قوام رطب لأيام في حرارة الغرفة بلا
ثلاجة، وتزيين بسيط (صقيع أو سكر بودرة) للإنهاء. خطوات مرقّمة أو جدول مكونات مطلوب.
الأشقاء: `blog/zayt-alzaytun-lilmuajanat`, `blog/olive-oil-substitute-what-to-use-instead`.

**`zayt-alzaytun-lilbatatis-almahrusa`** · slug `zayt-alzaytun-lilbatatis-almahrusa` · focus **زيت الزيتون للبطاطس المهروسة** (0/mo)
النية: بطاطس مهروسة بلا ألبان، الملمس والطعم فقط — انظر قسم السقف أعلاه. غطِّ كمية الزيت لكل كيلو
بطاطس، الزيت الدافئ يُطوى (لا بارداً، ولا والبطاطس لا تزال تغلي)، كيف يختلف الملمس عن هريس بالزبدة
والقشدة (أخف وأكثر نعومة، أقل دسامة)، وتنويعة بالثوم أو الأعشاب باستخدام زيت زيتون **عادي** وثوم
طازج — لا التشكيلة المنكّهة التي لا تشمل الثوم. خطوات أو جدول قصير مطلوب.
الأشقاء: `blog/zayt-alzaytun-walzubda`, `blog/zayt-alzaytun-lil-tabkh`.
