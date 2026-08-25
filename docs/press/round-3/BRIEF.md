# PRESS round 3 — shared writer brief

You are writing **one** article. Read this file, then your row in the table at the bottom, then
write `docs/press/round-3/drafts/<id>.json` and nothing else. Do not touch another writer's file.

## The contract is machine-checked

`scripts/press-import.py` validates every draft and refuses to write the round if any fails. Read
it before you start — it is the spec, not a suggestion. The parts that fail people:

| Rule | Value |
|---|---|
| Word count (intro + section headings + blocks + conclusion + FAQs) | **800–1,000** |
| Sections | 5–7, each with `heading`, `id` (kebab, unique in the file), `blocks` |
| First block of every section | `type: "p"`, **40–70 words**, a standalone answer |
| FAQs | 6–10, each 40–70 words in the answer |
| `relatedKeywords` | 8–12 |
| `keyTakeaway` | 40–60 words |
| `metaTitle` / `seoTitle` | ≤60 chars |
| `metaDescription` | ≤155 chars |
| `h1` | must contain **every token** of the focus keyword |
| `slug` | `[a-z0-9-]+` only — the `.htaccess` rule matches nothing else, Arabic included |
| At least one `table` or `ul`/`ol` block | answer engines lift structured blocks |
| Inline markup | **only** `**bold**` and `[label](href)`. No headings, no HTML, no images in text |

Copy the shape from `docs/press/round-2/drafts/olive-oil-smoke-point.json`. Same top-level keys, in
the same order. `datePublished` and `dateModified` are both `2026-08-25`.

Validate your own file before you finish:

```
python scripts/press-import.py --round 3 --check
```

It reports every draft in the folder — read the lines for **your** id and fix until yours is clean.
Other writers' files may be missing or failing while you work; that is not your problem.

## Facts

**`src/data/storeFacts.json` is the single source of truth.** Prices, branches, hours, the seller
name, the WhatsApp number, the online counters. Read it. Do **not** retype a value into prose where
it can drift — where a fact belongs in the body, state it exactly as that file has it, and prefer
linking to the money page over quoting a number at all.

What is true and may be used:

- The brand is **Arabian Village**, Palestinian cold-pressed extra virgin olive oil sold in Malaysia.
- The Malaysia distributor is **Berkat Madinah Store**, two branches in Selangor, plus a Shopee and
  a TikTok Shop counter which are that same seller's own counters, not third parties.
- Prices are in `storeFacts.json`. The infused range is on sale now at those prices.

**Everything else that is checkable and not in that file does not exist.** No award, no customer
count, no harvest tonnage, no laboratory result, no rating, no testimonial, no founding date you
did not read. If you want a number and cannot source it, write the sentence without it.

## The ceiling — Malaysia, Food Regulations 1985 Reg. 18(6)

Food may not be represented as preventing, alleviating, treating or curing any disease. This site
also carries no compositional analysis, so **nutrient-content claims are out too** ("rich in
antioxidants", "high in omega-3", "good fats"). No cholesterol, heart, skin, hair, weight, immunity
or "healthier than" framing, in any language, including inside an FAQ answer or a table cell.

Cooking, taste, storage, grades, price, origin, halal status and provenance are all fine. Write
about the oil as **food**, not as a remedy.

## Voice

- Write **in** the language, not into it. Your article is not a translation of anybody's and must
  not mirror another article's structure. Different examples, different FAQs, different order.
- Concrete beats abstract. A temperature, a shelf, a bottle size, a step. Adjectives get discarded
  by both readers and answer engines.
- Every answer paragraph must survive being quoted **alone**. No "as mentioned above", no "this is
  why", no pronoun pointing at the previous sentence.
- No superlatives you cannot prove. Not "the best", not "the finest", not "#1".
- Malay: normal Malaysian Malay as a Malaysian food writer would write it, not translated English
  syntax. Arabic: Modern Standard Arabic, natural for a Gulf-or-Levant reader living in Malaysia.

## Links

`related` is an array of 3–5 objects: `{label, path, description}`. `path` has **no** language
prefix and no leading slash — the renderer adds `/:lang`. Use:

- a money page: `products`, `shop`, `why-us`, or `contact` (there is no `story` route on this site)
- **two sibling articles**, `blog/<slug>` — take slugs from `src/content/articles/slugs.json`, and
  pick siblings **in your own language**. Your row names the ones you must include.
- optionally one more of either

You may also link inside the body with `[label](/products)` style hrefs where it reads naturally.
Never write "click here" or a bare URL as anchor text.

## Images

Your row gives you the exact frame that will sit at the top of your article and the inline frame.
Write `heroAlt` and `inlineAlt` as a factual description of **that** frame for someone who cannot
see it. Put your focus keyword in one of the two only where it fits honestly. Do not invent what is
in the picture, and do not describe a label's text — the product label in the site's photography is
not readable at these crops and one line on it is a claim this round does not repeat.

Do not add an `image` block to `sections`; the importer places the inline image itself.

---

## Rows

Every article: `datePublished` `2026-08-25`, `readingTime` computed from your own word count at
roughly 200 words a minute (4 or 5).

### English

**`evoo-salad-dressing`** · slug `extra-virgin-olive-oil-salad-dressing` · focus **extra virgin olive oil salad dressing** (390/mo, MEDIUM)
Intent: someone wants to make a dressing tonight. Give ratios, an emulsion method, what goes wrong,
what to keep it in, how long it keeps. Include a table of dressing ratios or a numbered method.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/what-cold-pressed-olive-oil-really-means`.
Hero frame: a bottle of the brand's olive oil standing upright on a wooden table with whole olives
and olive leaves scattered around it, daylight from the side.
Inline frame: a white ceramic bowl of mixed green salad leaves beside a small glass jug of olive
oil and half a lemon on a wooden table, seen from above.

**`evoo-vs-pure-olive-oil`** · slug `extra-virgin-olive-oil-vs-pure-olive-oil` · focus **extra virgin olive oil vs pure olive oil** (260/mo, HIGH)
Intent: the shelf has three labels and the shopper wants to know what changes. Cover extra virgin,
virgin, "pure"/"classic", "light"/"extra light" — all of which are refined oil blended with a
little virgin — what refining removes, what each is for, what each costs roughly relative to the
others. **Do not cover pomace in depth**; link to the pomace article for that. Include a comparison table.
Siblings: `blog/olive-oil-vs-pomace-oil-what-the-grades-mean`, `blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia`.
Hero frame: olive paste extruding from a stainless mill with green oil running down into a vat below.
Inline frame: two clear glass tumblers side by side on a marble surface, one holding deep green oil
and one holding pale yellow oil, plain background.

**`olive-oil-air-fryer`** · slug `can-you-use-olive-oil-in-an-air-fryer` · focus **olive oil in air fryer** (cluster ≈110/mo, LOW)
Intent: a very common Malaysian kitchen appliance and nobody is sure which oil to use in it. Cover
how much (a brush or a teaspoon, not a pour), why aerosol sprays clog and damage the basket
coating, what temperature ranges an air fryer actually runs at against olive oil's range, and which
foods it suits. Link to the smoke-point article rather than restating its figures.
Siblings: `blog/olive-oil-smoke-point-what-heat-it-can-take`, `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`.
Hero frame: an open air fryer basket on a kitchen counter holding raw potato wedges coated in olive
oil, with a small glass bowl of green olive oil and a silicone brush beside it.
Inline frame: potato wedges being brushed with olive oil on a metal air fryer tray, close view.

**`olive-oil-marinade`** · slug `olive-oil-marinade-what-it-does` · focus **olive oil marinade** (cluster ≈80/mo, LOW)
Intent: what the oil is actually doing in a marinade. Cover that oil carries fat-soluble aromatics
and holds them against the surface, that it does not tenderise, ratios against acid, timings for
chicken, fish, beef and vegetables, and why a whole marinade is not the place for your most
expensive oil. Include a timing table.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/olive-oil-price-in-malaysia-what-you-are-paying-for`.
Hero frame: a bottle of olive oil held in a hand at the edge of a sunlit olive grove, a stone ledge
and an olive branch in the frame, path receding behind.
Inline frame: a shallow glass dish of raw chicken pieces coated in olive oil with garlic cloves,
lemon slices and rosemary sprigs on a wooden table.

**`olive-oil-for-bread`** · slug `olive-oil-for-bread-and-dipping` · focus **olive oil for bread** (70/mo, MEDIUM)
Intent: dipping, and what to put with it. Cover why an unheated use shows the oil's actual
character, za'atar and dukkah and balsamic as three different directions, why the bread matters,
serving temperature, and how much to pour at a time. Include a list of pairings.
Siblings: `blog/what-cold-pressed-olive-oil-really-means`, `blog/palestinian-olive-oil-what-makes-it-different`.
Hero frame: olive oil pouring in a steady stream from a stainless pipe into an open vat.
Inline frame: a small white saucer of green olive oil beside torn flatbread and a spoon of dried
thyme on a wooden board.

**`olive-oil-shelf-life`** · slug `olive-oil-shelf-life-how-long-a-bottle-lasts` · focus **olive oil shelf life** (10/mo, LOW)
Intent: how long a bottle lasts, unopened and opened, and what actually ends it. Cover harvest date
versus best-before date, oxygen, light and heat as the three that matter, why a Malaysian kitchen
is a harder environment than a Mediterranean one, how to tell an oil has gone, and bottle size as a
shelf-life decision. Include a table of storage conditions.
Siblings: `blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia`, `blog/olive-oil-price-in-malaysia-what-you-are-paying-for`.
Hero frame: a bottling line, olive oil filling a row of dark glass bottles.
Inline frame: a dark green glass olive oil bottle with its cap on, standing inside a wooden kitchen
cupboard beside storage jars, dim indoor light.

### Malay

**`minyak-zaitun-untuk-goreng`** · slug `minyak-zaitun-untuk-goreng` · focus **minyak zaitun untuk goreng** (30/mo + 40/mo on `olive oil untuk goreng`, HIGH)
Niat: bolehkah goreng dengan minyak zaitun. Bezakan **goreng cetek, tumis, goreng banyak minyak
dan wok api besar** — bukan panduan dapur am, sebab `blog/minyak-zaitun-untuk-masak-panduan-dapur`
sudah ada. Sentuh kos seliter untuk deep fry, bau bila minyak terlebih panas, dan minyak mana untuk
kerja wok. Sertakan jadual kaedah lawan suhu.
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain`.
Bingkai hero: kuali keluli tahan karat di atas dapur dengan lapisan nipis minyak zaitun hijau
berkilat, hirisan bawang di tepi kuali.
Bingkai inline: kuali wok di atas api gas dengan minyak zaitun dan bawang putih cincang, dilihat
dari atas.

**`minyak-zaitun-pomace`** · slug `apa-itu-minyak-zaitun-pomace` · focus **minyak zaitun pomace** (10/mo, HIGH)
Niat: apa itu pomace dan kenapa harganya jauh lebih murah. Terangkan hampas selepas perahan, cara
pengekstrakan dengan pelarut dan penapisan, kenapa ia sah dijual sebagai minyak zaitun tetapi bukan
gred yang sama, dan cara mengenalinya pada label. Sertakan jadual gred.
Sibling: `blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain`, `blog/harga-minyak-zaitun-di-malaysia`.
Bingkai hero: minyak zaitun hijau mengalir keluar dari kilang perahan ke dalam tangki di bawah.
Bingkai inline: timbunan hampas zaitun coklat gelap di atas lantai konkrit di sebelah penyodok besi.

**`cara-simpan-minyak-zaitun`** · slug `cara-simpan-minyak-zaitun` · focus **cara simpan minyak zaitun** (<10/mo)
Niat: simpan di rumah Malaysia — panas, lembap, dapur terbuka. Cahaya, udara, haba; kenapa botol
kaca gelap; kenapa bukan di sebelah dapur; peti sejuk dan minyak yang membeku separa; berapa lama
selepas dibuka. Sertakan senarai atau jadual tempat simpan.
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia`.
Bingkai hero: botol minyak zaitun berdiri di atas batu di kawasan teduh kebun zaitun, cahaya petang.
Bingkai inline: botol kaca gelap bertutup di atas rak dapur berjubin yang sejuk, jauh dari tingkap.

**`botol-minyak-zaitun`** · slug `botol-minyak-zaitun-kaca-gelap-dan-saiz` · focus **botol minyak zaitun** (10/mo, HIGH)
Niat: kenapa botol itu penting. Kaca gelap lawan plastik lawan tin, saiz mana untuk isi rumah mana
(kadar guna lawan tempoh selepas buka), tutup dan penuang, dan botol yang sudah kosong. Sertakan
jadual saiz lawan kadar penggunaan.
Sibling: `blog/harga-minyak-zaitun-di-malaysia`, `blog/cara-menilai-jenama-minyak-zaitun`.
Bingkai hero: tiga botol kaca hijau gelap bersaiz berbeza berdiri sebaris di atas rak kayu.
Bingkai inline: tangan memegang botol kaca hijau gelap ke arah tingkap sehingga cahaya menembusi
leher botol.

**`resepi-minyak-zaitun`** · slug `resepi-mudah-dengan-minyak-zaitun` · focus **resepi minyak zaitun** (10/mo, LOW)
Niat: apa yang boleh dimasak malam ini. Tiga hingga empat resepi ringkas dengan sukatan — sos salad
mudah, cicahan roti, perap ayam, sayur panggang — dalam blok `ol`. Bukan artikel salad
(`blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk` sudah ada): rujuk ia dan pergi ke arah lain.
Sibling: `blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.
Bingkai hero: seorang wanita Malaysia bertudung memegang botol minyak zaitun, rumah kampung dan
dahan zaitun di belakangnya.
Bingkai inline: meja kayu dengan mangkuk salad timun dan tomato, jag kecil minyak zaitun, sebiji
lemon dan pengisar lada.

**`minyak-zaitun-vs-minyak-masak`** · slug `minyak-zaitun-vs-minyak-masak-lain` · focus **minyak zaitun vs minyak masak** (<10/mo)
Niat: bandingkan dengan minyak yang memang ada di dapur Malaysia — minyak sawit, minyak kelapa
dara, minyak bijan, minyak kacang tanah. Rasa, suhu, harga seliter, kegunaan. **Tiada perbandingan
kesihatan** — tulis tentang memasak dan kos sahaja. Sertakan jadual perbandingan.
Sibling: `blog/harga-minyak-zaitun-di-malaysia`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.
Bingkai hero: empat botol kaca minyak masak berlainan berdiri sebaris di atas kaunter dapur,
warnanya dari hijau pekat ke kuning cair.
Bingkai inline: dua kuali bersebelahan, satu dengan minyak zaitun hijau dan satu dengan minyak
masak kuning cair, dilihat dari atas.

### Arabic

Slugs are ASCII transliteration by platform constraint (D9). Body, headings, meta and FAQs are all Arabic.

**`alfarq-bayn-albikr-walmumtaz`** · slug `alfarq-bayn-zayt-alzaytun-albikr-walmumtaz` · focus **الفرق بين زيت الزيتون البكر والبكر الممتاز** (10/mo)
النية: ما الذي يفصل البكر عن البكر الممتاز فعلياً. الحموضة كحد فاصل، عيوب التذوق، ما الذي يحدث في
المعصرة، وماذا يعني ذلك على الرف في ماليزيا. أدرج جدول مقارنة.
مقالتان شقيقتان: `blog/zayt-zaytun-falastini-ma-yumayyizuh`، `blog/zayt-alzaytun-lil-tabkh`.
إطار الهيرو: شجرة زيتون معمّرة تؤطر منحدراً، وحبات زيتون على حافة حجرية، ضوء الغروب.
الإطار الداخلي: كأسا تذوق زجاجيتان صغيرتان متجاورتان على سطح حجري، إحداهما أكثر خضرة من الأخرى،
وأوراق زيتون بجانبهما.

**`taem-zayt-alzaytun`** · slug `taem-zayt-alzaytun-albikr-almumtaz` · focus **طعم زيت الزيتون البكر الممتاز** (10/mo, HIGH)
النية: لماذا يلسع الزيت الجيد الحلق ولماذا تكون المرارة علامة وليست عيباً. كيف يُتذوَّق الزيت
خطوة بخطوة، ما الذي يدل عليه كل طعم، وما العيوب التي تدل على زيت قديم أو مخزَّن بشكل سيئ.
**لا تربط أي طعم بفائدة صحية.** أدرج قائمة مرقّمة لخطوات التذوق.
مقالتان شقيقتان: `blog/zayt-zaytun-falastini-ma-yumayyizuh`، `blog/hifz-zayt-alzaytun`.
إطار الهيرو: منضدة تذوق خشبية عليها دورق زجاجي من الزيت وصفّ أنابيب عيّنات ومجهر.
الإطار الداخلي: كأس تذوق زرقاء داكنة نصف ممتلئة بالزيت، ممسوكة بكلتا اليدين فوق منضدة خشبية.

**`humudat-zayt-alzaytun`** · slug `darajat-humudat-zayt-alzaytun` · focus **درجة حموضة زيت الزيتون** (<10/mo)
النية: ما هو الرقم الذي يراه القارئ على العبوة. الحموضة الحرة كنسبة من حمض الأوليك، الحد النظامي
للبكر الممتاز، لماذا لا تُتذاق الحموضة، وما الذي يرفعها — زيتون متأخر أو مصاب أو عصر متأخر أو تخزين
سيئ. أدرج جدولاً للحدود بحسب الدرجة.
مقالتان شقيقتان: `blog/zayt-alzaytun-lil-tabkh`، `blog/hifz-zayt-alzaytun`.
إطار الهيرو: منضدة مختبر بيضاء نظيفة عليها كأس زجاجي من الزيت وماصّة زجاجية وطبق خزفي أبيض.
الإطار الداخلي: دورق زجاجي من الزيت على منضدة مختبر بجانب حامل أنابيب عيّنات فارغة.

**`zayt-alzaytun-aludwi`** · slug `zayt-alzaytun-aludwi` · focus **زيت الزيتون العضوي** (10/mo, MEDIUM)
النية: ماذا تعني كلمة "عضوي" على الملصق ومن يقرّرها. الشهادة كإجراء زراعي لا كوعد بالجودة، الفرق
بينها وبين البكر الممتاز، ولماذا قد يكون بستان صغير غير معتمد وممارساته تقليدية. **لا تدّعِ أن
العضوي أفضل صحياً.** أدرج جدولاً يفصل ما تغطيه الشهادة عمّا لا تغطيه.
مقالتان شقيقتان: `blog/zayt-zaytun-falastini-ma-yumayyizuh`، `blog/sier-zayt-alzaytun-fi-malizya`.
إطار الهيرو: منظر من كرم زيتون على منحدر عند الغروب، قرية والبحر في العمق.
الإطار الداخلي: غصن زيتون محمّل بثمار خضراء في بستان تربته عارية غير معالجة، ضوء الصباح.

**`zayt-alzaytun-lilsalata`** · slug `zayt-alzaytun-lilsalata` · focus **زيت الزيتون للسلطة** (<10/mo)
النية: الزيت على مائدة عربية في ماليزيا. الفتوش والتبولة والسلطة العربية، نسبة الزيت إلى الحامض،
متى يُضاف، ولماذا يُستعمل الزيت غير المسخَّن هنا. أدرج جدول نسب أو قائمة مرقّمة.
مقالتان شقيقتان: `blog/zayt-alzaytun-lil-tabkh`، `blog/zayt-alzaytun-fi-kuala-lumpur`.
إطار الهيرو: مائدة مصوَّرة من أعلى فيها صحن سلطة بندورة وبقدونس مفروم، وصحن صغير من الزيت، وخبز
وطبق زيتون.
الإطار الداخلي: يد تسكب الزيت من إبريق صغير فوق صحن سلطة مفرومة، لقطة قريبة.

**`zayt-alzaytun-lilqaly`** · slug `zayt-alzaytun-lilqaly` · focus **زيت الزيتون للقلي** (<10/mo)
النية: القلي تحديداً، لا الطبخ عموماً — `blog/zayt-alzaytun-lil-tabkh` موجود ويجب أن تُحيل إليه.
القلي السطحي مقابل القلي الغزير، حدود الحرارة، كم مرة يمكن إعادة استعمال الزيت، وكلفة ملء قدر
بزيت بهذا السعر. أدرج جدول طرائق مقابل حرارة.
مقالتان شقيقتان: `blog/zayt-alzaytun-lil-tabkh`، `blog/sier-zayt-alzaytun-fi-malizya`.
إطار الهيرو: زجاجة زيت زيتون ممسوكة عند حافة كرم مشمس، حافة حجرية وغصن زيتون في الإطار.
الإطار الداخلي: قدر عميق من زيت الزيتون يسخن على الموقد وقد أُضيفت إليه شريحة باذنجان واحدة.
