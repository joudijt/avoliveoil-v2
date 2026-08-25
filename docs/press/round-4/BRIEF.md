# PRESS round 4 — shared writer brief

You are writing **one** article. Read this file, then your row in the table at the bottom, then
write `docs/press/round-4/drafts/<id>.json` and nothing else. Do not touch another writer's file.

## The contract is machine-checked

`scripts/press-import.py` validates every draft and refuses to write the round if any fails. Read
it before you start — it is the spec, not a suggestion.

| Rule | Value |
|---|---|
| Word count (intro + section headings + blocks + conclusion + FAQs) | **800–1,000** |
| Sections | 5–7, each with `heading`, `id` (kebab, unique in the file), `blocks` |
| First block of every section | `type: "p"`, **40–70 words**, a standalone answer |
| FAQs | 6–8, each answer **30–45 words** |
| `relatedKeywords` | 8–12 |
| `keyTakeaway` | 40–60 words |
| `metaTitle` / `seoTitle` | ≤60 chars |
| `metaDescription` | ≤155 chars |
| `h1` | must contain **every token** of the focus keyword |
| `slug` | `[a-z0-9-]+` only — the `.htaccess` rule matches nothing else, Arabic included |
| At least one `table` or `ul`/`ol` block | answer engines lift structured blocks |
| Inline markup | **only** `**bold**` and `[label](href)`. No headings, no HTML, no images in text |

**The FAQ answer length is 30–45 words, not 40–70.** Six sections plus six FAQ answers at 40–70
does not fit under a 1,000-word ceiling — every writer in round 3 discovered that separately and
trimmed. The band is written correctly here so you do not have to.

Copy the shape from `docs/press/round-3/drafts/olive-oil-shelf-life.json`. Same top-level keys, in
the same order. `datePublished` and `dateModified` are both `2026-08-25`.

Validate your own file before you finish:

```
python scripts/press-import.py --round 4 --check
```

Read the lines for **your** id and fix until yours is clean. Other writers' files may be missing or
failing while you work; that is not your problem.

## Facts

**`src/data/storeFacts.json` is the single source of truth.** Prices, branches, hours, the seller
name, the WhatsApp number, the online counters. Read it. Do **not** retype a value into prose where
it can drift — prefer linking to the money page over quoting a number at all.

What is true and may be used:

- The brand is **Arabian Village**, Palestinian cold-pressed extra virgin olive oil sold in Malaysia.
- The Malaysia distributor is **Berkat Madinah Store**, two branches in Selangor, plus a Shopee and
  a TikTok Shop counter which are that same seller's own counters, not third parties.
- The site sells **six infused extra virgin olive oils**: wild thyme, blackseed, turmeric & black
  pepper, rosemary & basil, fennel & anise, lavender & chamomile. **There is no garlic infusion and
  no truffle or lemon infusion** — do not imply one exists.
- Prices are in `storeFacts.json`.

**Everything else that is checkable and not in that file does not exist.** No award, no customer
count, no harvest tonnage, no laboratory result, no rating, no testimonial, no founding date you
did not read. If you want a number and cannot source it, write the sentence without it.

## The ceiling — Malaysia, Food Regulations 1985 Reg. 18(6)

Food may not be represented as preventing, alleviating, treating or curing any disease. This site
also carries no compositional analysis, so **nutrient-content claims are out too** ("rich in
antioxidants", "high in omega-3", "good fats", "healthy fats"). No cholesterol, heart, skin, hair,
weight or immunity framing, in any language, including inside an FAQ answer or a table cell.

This bites hardest on two of this round's articles:

- **`olive-oil-vs-coconut-oil` and `minyak-zaitun-vs-minyak-kelapa`.** Almost everything written
  online about this comparison is a health argument. Yours is not. Compare them as **cooking fats**:
  smoke behaviour, flavour, what each does to a dish, solid-versus-liquid at Malaysian room
  temperature, price per litre, and which one a given dish wants. **Never say either is healthier,
  better for you, or worse for you.** If a reader's real question is health, the honest line is that
  it is a question for a dietitian, not for a seller — say that and move on.
- **`olive-oil-bitter-taste` and `rasa-minyak-zaitun`.** Bitterness and the peppery catch at the
  back of the throat are **taste and freshness indicators**. Explain them as flavour and as signs
  of a young oil. Do **not** attach them to antioxidants, polyphenol health effects or any benefit.
  You may say the compounds responsible are what make the oil taste bitter and peppery; you may not
  say what they do in a body.

Cooking, taste, storage, grades, price, origin, halal status, packaging and provenance are all
fine. Write about the oil as **food**, not as a remedy.

## One safety fact you MUST get right

`garlic-infused-olive-oil` covers home infusion. **Garlic in oil at room temperature is a botulism
risk** — a real, well-established food-safety point, not a scare. Fresh garlic is a low-acid
vegetable; sealed under oil at room temperature it creates the oxygen-free conditions
*Clostridium botulinum* needs. The safe handling is: refrigerate home-made garlic oil, use it
within a few days, and never leave it on the counter. Commercially produced garlic oils are
acidified or otherwise controlled, which a home cook cannot replicate. **State this plainly and
early.** An article that teaches people to bottle garlic in oil without it is a dangerous article.

That article must also say that this seller does **not** sell a garlic infusion, and point at the
six infusions it does sell.

## Voice

- Write **in** the language, not into it. Your article is not a translation of anybody's and must
  not mirror another article's structure. Different examples, different FAQs, different order.
- Concrete beats abstract. A temperature, a shelf, a bottle size, a step.
- Every answer paragraph must survive being quoted **alone**. No "as mentioned above", no pronoun
  pointing at the previous sentence.
- No superlatives you cannot prove. Not "the best", not "the finest", not "#1".
- Malay: normal Malaysian Malay as a Malaysian food writer would write it, not translated English
  syntax. Arabic: Modern Standard Arabic, natural for a Gulf-or-Levant reader living in Malaysia.

## Do not contradict the live site

Three articles in round 3 had to be rewritten because they disagreed with copy this site already
publishes. Before you write a figure, check `public/llms.txt` (English), `public/llms-ms.txt` or
`public/llms-ar.txt` for the same subject. The ones that have bitten already:

- **Shelf life: up to about 18 months unopened, about two months once opened.** Not "two to three".
- **Never the fridge for unopened stock.** `llms-ms.txt` says `Jangan simpan dalam peti sejuk` flatly.
- **Frying oil is not reused.** The live cooking articles prohibit reuse outright.
- **Do not quote an acidity figure.** The site's published "below 0.028%" has no test date and no
  named lab behind it and is under review. Write about acidity as a concept if you must; attach no
  number to this product.

## Links

`related` is an array of 3–5 objects: `{label, path, description}`. `path` has **no** language
prefix and no leading slash. Use a money page (`products`, `shop`, `why-us`, `contact` — there is
no `story` route) plus **two sibling articles in your own language**, `blog/<slug>`. Your row names
the siblings you must include. Never write "click here" or a bare URL as anchor text.

## Images

Your row gives the frame that will sit at the top of your article and the inline frame. Write
`heroAlt` and `inlineAlt` as a factual description of **that** frame for someone who cannot see it.
Put your focus keyword in one of the two only where it fits honestly. Do not invent what is in the
picture, and **do not describe any text on the product label** — the label carries a line this
round does not repeat.

Do not add an `image` block to `sections`; the importer places the inline image itself.

---

## Rows

Every article: `datePublished` and `dateModified` `2026-08-25`, `readingTime` computed from your
own word count at roughly 200 words a minute (4 or 5).

### English

**`olive-oil-vs-coconut-oil`** · slug `olive-oil-vs-coconut-oil-in-a-malaysian-kitchen` · focus **olive oil vs coconut oil** (90/mo, MEDIUM)
Intent: two oils a Malaysian kitchen already has, and which to reach for. Cover flavour (grassy and
peppery against sweet and coconutty, and what each does to rendang, to a cake, to a salad), texture
at 28–32 °C room temperature (coconut oil sets solid, olive oil does not), heat behaviour in
general terms with a link to the smoke-point article rather than restated figures, cost per litre,
and a straight "use this for that" table. **No health comparison of any kind.**
Siblings: `blog/olive-oil-smoke-point-what-heat-it-can-take`, `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`.
Hero frame: two small clear glass bowls side by side on a pale marble counter, one holding green
olive oil and one holding solid white coconut oil, daylight from the left.
Inline frame: a wooden spoon lifting solid white coconut oil beside a poured pool of green olive
oil on a dark slate board, seen from above.

**`garlic-infused-olive-oil`** · slug `garlic-infused-olive-oil-and-how-to-do-it-safely` · focus **garlic infused olive oil** (50/mo, HIGH; cluster ≈140)
Intent: someone wants to make it tonight. **Lead with the safety rule** (see the section above),
then cover cold infusion versus gentle warm infusion, quantities, straining, why the garlic must
come out, refrigeration and the few-days window, how to tell it has turned, and what to use it on.
Say plainly that this seller sells six infusions and garlic is not one of them, and link to them.
Include a numbered method and a short "do not" list.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/olive-oil-for-bread-and-dipping`.
Hero frame: a small glass jar of golden olive oil on a wooden board with whole garlic bulbs and
loose cloves around it, warm side light.
Inline frame: peeled garlic cloves in a saucepan of olive oil over low heat on a stove, close view
from above.

**`olive-oil-substitute`** · slug `olive-oil-substitute-what-to-use-instead` · focus **olive oil substitute** (50/mo, LOW; cluster ≈150)
Intent: mid-recipe, the bottle is empty, what now. Split by job — dressing and finishing, gentle
frying, roasting, baking — because the answer differs. Cover butter, ghee, coconut oil, sunflower,
canola, rice bran and grapeseed against each job, ratios where they are not 1:1, and what you lose
in flavour. Also answer the reverse: when olive oil substitutes for something else. Include a
substitution table.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/extra-virgin-olive-oil-salad-dressing`.
Hero frame: four small white ramekins on a wooden table holding different cooking fats — green
olive oil, pale sunflower oil, soft butter and white ghee — plain background, daylight.
Inline frame: a measuring jug of olive oil beside an empty bottle and a block of butter on a
kitchen counter.

**`olive-oil-for-baking`** · slug `olive-oil-for-cakes-and-baking` · focus **olive oil for cake** (70/mo, LOW; cluster ≈120)
Intent: can you bake with it and how. Cover the butter-to-oil conversion, why oil cakes stay moist
longer, which bakes suit a fruity extra virgin and which want a milder oil, citrus and olive oil as
a pairing, oven temperature against olive oil in a batter (the batter, not the pan, is what the oil
sees), and one worked ratio. Include a conversion table.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/what-cold-pressed-olive-oil-really-means`.
Hero frame: a round olive oil cake dusted with sugar on a ceramic plate beside a small jug of green
olive oil and two lemons on a wooden table.
Inline frame: olive oil being poured from a jug into a glass mixing bowl of pale cake batter, close
view.

**`olive-oil-bottle-size`** · slug `what-size-olive-oil-bottle-to-buy` · focus **extra virgin olive oil bottle** (30/mo, LOW)
Intent: 250 ml, 500 ml or a tin, and which is not a saving. Cover the arithmetic — how fast a
household actually gets through oil against the roughly two months an opened bottle stays at its
best — why the big tin is only cheaper if you finish it, decanting into a smaller dark bottle, and
what to check on the bottle itself. **Do not quote the site's prices in prose**; link to the
products page. Include a table of household size against bottle size.
Siblings: `blog/olive-oil-shelf-life-how-long-a-bottle-lasts`, `blog/olive-oil-price-in-malaysia-what-you-are-paying-for`.
Hero frame: a bottling line, olive oil filling a row of dark glass bottles under stainless filling
heads.
Inline frame: three dark glass olive oil bottles of different sizes standing together on a wooden
kitchen shelf.

**`olive-oil-bitter-taste`** · slug `why-does-olive-oil-taste-bitter` · focus **why does olive oil taste bitter** (10/mo, LOW; cluster ≈50)
Intent: "I bought a good oil and it bites my throat — is it off?" Answer no, and explain what
bitterness and the peppery catch actually are, that they fade as an oil ages so a bland oil is
often an old one, how a tasting panel describes them, how to taste an oil properly at home, which
dishes suit a bitter oil and which do not, and what a genuinely spoiled oil tastes like instead
(crayons, old nuts, wine gone to vinegar). **Flavour and freshness only — no benefit claims.**
Siblings: `blog/what-cold-pressed-olive-oil-really-means`, `blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia`.
Hero frame: a man in a songkok nosing olive oil from a small blue tasting glass at a bench with
sample flasks and a microscope behind him.
Inline frame: a small blue tasting glass of green olive oil held in one hand over a pale bench,
close view.

### Malay

**`minyak-zaitun-vs-minyak-kelapa`** · slug `minyak-zaitun-vs-minyak-kelapa` · focus **minyak zaitun vs minyak kelapa** (10/mo, MEDIUM)
Niat: dua minyak yang memang ada dalam dapur Malaysia. Banding sebagai **lemak masakan** sahaja —
rasa, tekstur pada suhu bilik 28–32 °C (minyak kelapa membeku, minyak zaitun tidak), kesan pada
rendang, kek dan salad, kos seliter, dan jadual "guna yang mana untuk apa". **Jangan sekali-kali
bandingkan dari segi kesihatan.**
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `blog/minyak-zaitun-vs-minyak-masak-lain`.
Bingkai hero: dua mangkuk kaca kecil bersebelahan di atas meja marmar pucat, satu berisi minyak
zaitun hijau dan satu lagi minyak kelapa putih pejal.
Bingkai inline: sudu kayu mengangkat minyak kelapa putih pejal di sebelah lopak minyak zaitun hijau
di atas papan batu gelap.

**`minyak-zaitun-palsu`** · slug `cara-kenal-minyak-zaitun-palsu` · focus **minyak zaitun palsu** (10/mo, LOW)
Niat: bagaimana minyak zaitun dipalsukan dan apa yang boleh disemak. Terangkan campuran dengan
minyak murah, minyak ditapis dijual sebagai dara, label yang mengelirukan, dan ujian rumah yang
**tidak** berfungsi (ujian peti sejuk adalah mitos — minyak tulen pun boleh kekal cair atau
membeku separa bergantung pada varieti dan suhu). Apa yang berfungsi: tarikh tuai, negara asal yang
dinamakan, botol kaca gelap, harga yang munasabah, penjual yang boleh dihubungi. Sertakan jadual
"tanda lawan makna".
Sibling: `blog/cara-memilih-minyak-zaitun-dara-asli-di-malaysia`, `blog/cara-menilai-jenama-minyak-zaitun`.
Bingkai hero: seorang lelaki bersongkok menghidu minyak zaitun dari gelas rasa biru di meja makmal
dengan kelalang sampel dan mikroskop.
Bingkai inline: beberapa tabung sampel kaca berisi minyak berwarna berbeza di atas rak logam.

**`rasa-minyak-zaitun`** · slug `rasa-minyak-zaitun-pahit-dan-pedas` · focus **rasa minyak zaitun** (10/mo, LOW)
Niat: kenapa rasa pahit dan pedas di tekak, dan sama ada itu tanda rosak. Jawapannya tidak.
Terangkan pahit dan pedas sebagai **rasa dan tanda minyak muda**, cara merasa minyak di rumah,
hidangan yang sesuai dengan minyak pahit dan yang tidak, dan bagaimana rasa minyak yang benar-benar
rosak (berlilin, kacang lama, masam). **Rasa dan kesegaran sahaja — tiada apa-apa dakwaan faedah.**
Sibling: `blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain`, `blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk`.
Bingkai hero: gelas rasa biru kecil berisi minyak zaitun hijau dipegang di atas meja kayu, cahaya
siang dari tepi.
Bingkai inline: sedikit minyak zaitun hijau dituang ke dalam sudu putih di sebelah sekeping roti di
atas pinggan.

**`beli-minyak-zaitun-online`** · slug `beli-minyak-zaitun-online-di-malaysia` · focus **beli minyak zaitun online** (10/mo)
Niat: beli dalam talian tanpa tertipu. Liputi apa yang perlu ada pada penyenaraian (negara asal,
gred, saiz botol, tarikh tuai atau tarikh luput), risiko penghantaran dalam iklim panas, kotak dan
pembungkusan, penjual yang mempunyai kedai fizikal, dan bila lebih baik beli di kedai. Sebut kaunter
rasmi penjual ini tanpa menyalin harga ke dalam teks — pautkan halaman produk. Sertakan senarai
semak sebelum bayar.
Sibling: `blog/di-mana-beli-minyak-zaitun-di-kuala-lumpur`, `blog/harga-minyak-zaitun-di-malaysia`.
Bingkai hero: sebotol minyak zaitun kaca gelap dibalut kertas pembungkus di dalam kotak kadbod
kecil di atas meja kayu.
Bingkai inline: kotak penghantaran terbuka dengan botol minyak zaitun dan bahan pembungkus di
dalamnya, dilihat dari atas.

**`minyak-zaitun-tulen`** · slug `maksud-minyak-zaitun-tulen` · focus **minyak zaitun tulen** (10/mo, HIGH)
Niat: perkataan "tulen" pada botol sebenarnya bermaksud apa. Terangkan bahawa "tulen" bukan gred
rasmi; gred rasmi ialah extra virgin, virgin, dan minyak zaitun ditapis. "Pure olive oil" di pasaran
antarabangsa bermaksud campuran minyak ditapis dengan sedikit minyak dara — bukan lebih tulen.
Bandingkan istilah pemasaran dengan istilah gred, dan tunjukkan apa yang perlu dibaca pada label.
Sertakan jadual istilah lawan maksud.
Sibling: `blog/apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain`, `blog/minyak-zaitun-organik-apa-maksudnya`.
Bingkai hero: pes zaitun keluar dari kilang perahan keluli dengan minyak hijau mengalir ke dalam
tangki di bawah.
Bingkai inline: aliran minyak zaitun hijau jatuh dari paip keluli ke dalam tangki terbuka.

**`minyak-zaitun-untuk-kek`** · slug `minyak-zaitun-untuk-kek-dan-bakeri` · focus **minyak zaitun untuk kek** (0/mo)
Niat: guna minyak zaitun dalam kek dan bakeri. Liputi penukaran mentega kepada minyak, kenapa kek
minyak kekal lembap lebih lama, kek mana sesuai dengan minyak dara yang kuat rasanya dan mana yang
mahu minyak lembut, gabungan sitrus dan minyak zaitun, dan satu nisbah yang sudah dikira. Sertakan
jadual penukaran.
Sibling: `blog/resepi-mudah-dengan-minyak-zaitun`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.
Bingkai hero: sebiji kek minyak zaitun bulat bertabur gula di atas pinggan seramik dengan jag kecil
minyak zaitun hijau dan dua biji lemon.
Bingkai inline: minyak zaitun dituang dari jag ke dalam mangkuk kaca berisi adunan kek pucat.

### Arabic

Slugs are ASCII transliteration under D9. Write everything else in Modern Standard Arabic.

**`mawsim-qitaf-alzaytun`** · slug `mawsim-qitaf-alzaytun` · focus **موسم قطاف الزيتون** (10/mo)
النية: متى يُقطف الزيتون ولماذا يهم ذلك المشتري. غطِّ نافذة القطاف في الخريف، الفرق بين ثمرة خضراء
وثمرة سوداء وما يفعله ذلك بالطعم والمردود، لماذا تُعصر الثمار خلال ساعات، وكيف يقرأ المشتري تاريخ
القطاف على الزجاجة ولماذا هو أهم من تاريخ انتهاء الصلاحية. أدرج جدولاً للنضج مقابل الطعم والمردود.
الأشقاء: `blog/zayt-zaytun-falastini-ma-yumayyizuh`, `blog/hifz-zayt-alzaytun`.
الإطار الرئيسي: مزارع فلسطيني يرتدي الكوفية يفحص ثمار الزيتون على الغصن أثناء القطاف الخريفي.
الإطار الداخلي: صناديق بلاستيكية مرصوفة مملوءة بزيتون أخضر وأرجواني بعد القطاف.

**`zayt-alzaytun-almukarrar`** · slug `zayt-alzaytun-almukarrar` · focus **زيت الزيتون المكرر** (10/mo)
النية: ما هو الزيت المكرر ولماذا هو أرخص. غطِّ أن المكرر يبدأ زيتاً رسب في اختبارات البكر، وأن
التكرير يزيل العيب بالحرارة أو بوسائل كيميائية فيزيل معه اللون والرائحة والطعم، وأن ما يُباع باسم
"زيت زيتون" فقط هو غالباً خليط مكرر مع قليل من البكر، وأين يصلح استعماله. لا تُعِد شرح البوميس
بالتفصيل — اربط بمقالة الدرجات. أدرج جدول مقارنة.
الأشقاء: `blog/alfarq-bayn-zayt-alzaytun-albikr-walmumtaz`, `blog/sier-zayt-alzaytun-fi-malizya`.
الإطار الرئيسي: كوبان زجاجيان متجاوران على سطح رخامي، أحدهما بزيت أخضر داكن والآخر بزيت أصفر شاحب.
الإطار الداخلي: خزانات فولاذية كبيرة في مصنع لتكرير الزيوت مضاءة بضوء بارد.

**`zayt-zaytun-baladi`** · slug `zayt-zaytun-baladi` · focus **زيت زيتون بلدي** (10/mo)
النية: كلمة "بلدي" على الزجاجة تعني ماذا. اشرح أنها وصف عرفي لا درجة رسمية ولا شهادة، وأنها تعني
عادةً زيتاً من عصرة قرية أو معصرة صغيرة يعرفها البائع، وأن ما يثبتها هو المنشأ المسمى وتاريخ القطاف
واسم المعصرة — لا الكلمة نفسها. قارن "بلدي" بـ"عضوي" و"بكر ممتاز" كأنواع مختلفة من الادعاء.
الأشقاء: `blog/zayt-alzaytun-aludwi`, `blog/zayt-zaytun-falastini-ma-yumayyizuh`.
الإطار الرئيسي: شجرة زيتون معمّرة تؤطر قرية على سفح تل والبحر خلفها عند الغروب، وحبات زيتون على حافة حجرية.
الإطار الداخلي: مزارع يصب زيت الزيتون من زجاجة داكنة في وعاء فخاري على طاولة خشبية في الظل.

**`afdal-zayt-zaytun`** · slug `kayf-tukhtar-afdal-zayt-zaytun` · focus **أفضل زيت زيتون** (10/mo)
النية: قائمة فحص يطبّقها القارئ على أي زجاجة بيده. **لا تذكر بلد المنشأ كمعيار جودة إطلاقاً** — تلك
مقالة أخرى في هذه الجولة. غطِّ تاريخ القطاف، الدرجة المكتوبة، الزجاج الداكن، حجم الزجاجة مقابل سرعة
الاستهلاك، وجود مستورد أو بائع يمكن الوصول إليه، وتذوّق الزيت قبل الحكم. لا تكتب "الأفضل" كادعاء عن
أي منتج، بما في ذلك منتج هذا الموقع. أدرج قائمة فحص مرقّمة.
الأشقاء: `blog/alfarq-bayn-zayt-alzaytun-albikr-walmumtaz`, `blog/taem-zayt-alzaytun-albikr-almumtaz`.
الإطار الرئيسي: رجل يفحص زيت الزيتون في مختبر صغير مع قوارير عيّنات وأنابيب اختبار.
الإطار الداخلي: زجاجة زيت زيتون داكنة على طاولة خشبية وحولها حبات زيتون وأوراق.

**`zayt-alzaytun-balad-almansha`** · slug `zayt-alzaytun-hasab-balad-almansha` · focus **أفضل زيت زيتون سوري ام ايطالي** (10/mo)
النية: هل اسم البلد على الملصق يدل على الجودة. الجواب: يدل على أشياء ويصمت عن أشياء. غطِّ أن البلد
يرتبط بالأصناف والعادات (النبالي، القويش، البيكوال، الفرانتويو) وبموسم القطاف، وأنه **لا** يضمن
الدرجة ولا الطزاجة، وأن كثيراً من الزجاجات المكتوب عليها بلد واحد هي خلطات معبأة فيه. اشرح الفرق
بين "منتج في" و"معبأ في" و"أصل واحد". **قارن بإنصاف ولا تقل إن بلداً أفضل من بلد.** أدرج جدولاً.
الأشقاء: `blog/zayt-zaytun-falastini-ma-yumayyizuh`, `blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia`.
الإطار الرئيسي: بستان زيتون على تل عند الغروب، صفوف الأشجار ممتدة نحو الأفق.
الإطار الداخلي: خريطة لحوض البحر المتوسط مرسومة على ورق قديم وإلى جانبها غصن زيتون وحبات زيتون.

**`zujajat-zayt-alzaytun`** · slug `zujajat-zayt-alzaytun` · focus **زجاجة زيت الزيتون** (10/mo)
النية: الزجاجة نفسها. غطِّ الزجاج الداكن مقابل الشفاف مقابل الصفيح مقابل البلاستيك، لماذا يضر الضوء
الزيت، السدادة والمصبّ وتسرّب الهواء، ما الذي يجب أن يكون مطبوعاً على الزجاجة، وماذا تفعل بالزجاجة
بعد أن تفرغ. **زاوية هذه المقالة هي ما تخبرك به الزجاجة عن البائع**، لا مقاسات العبوة وحدها. أدرج
جدول مواد التعبئة.
الأشقاء: `blog/hifz-zayt-alzaytun`, `blog/zayt-alzaytun-fi-kuala-lumpur`.
الإطار الرئيسي: خط تعبئة يملأ صفاً من الزجاجات الداكنة بزيت الزيتون تحت رؤوس التعبئة الفولاذية.
الإطار الداخلي: ثلاث زجاجات زيت زيتون داكنة بأحجام مختلفة على رف مطبخ خشبي.
