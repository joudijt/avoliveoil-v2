# PRESS round 5 — shared writer brief

You are writing **one** article. Read this file, then your row at the bottom, then write
`docs/press/round-5/drafts/<id>.json` and nothing else. Do not touch another writer's file.

## The contract is machine-checked

`scripts/press-import.py` validates every draft and refuses to write the round if any fails.

| Rule | Value |
|---|---|
| Word count (intro + section headings + blocks + conclusion + FAQs) | **800–980** |
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

**Aim for 900–960, not 1000.** The validator's ceiling is 1000, but the live gate measures the
*rendered* region, which also carries the key takeaway, and round 4 spent four rebuild cycles
trimming one article that passed the draft check and failed the page. Leave yourself room.

Copy the shape from `docs/press/round-4/drafts/olive-oil-bottle-size.json`. Same top-level keys in
the same order. `datePublished` and `dateModified` are both `2026-08-26`.

Validate before you finish:

```
python scripts/press-import.py --round 5 --check
```

Read the lines for **your** id only. Do NOT run the importer without `--check`.

## Facts

**`src/data/storeFacts.json` is the single source of truth.** Read it. Do not retype a value into
prose where it can drift — prefer linking to the money page.

- The brand is **Arabian Village**, Palestinian cold-pressed extra virgin olive oil sold in Malaysia.
- The Malaysia distributor is **Berkat Madinah Store**, two branches in Selangor, plus a Shopee and
  a TikTok Shop counter which are that same seller's own counters. **There is no other legitimate
  seller in Malaysia** — say so where a buying question comes up.
- The site sells **six infused extra virgin olive oils**: wild thyme, blackseed, turmeric & black
  pepper, rosemary & basil, fennel & anise, lavender & chamomile. **No garlic, truffle or lemon
  infusion exists** — do not imply one does.
- Sizes are 250 ml and 500 ml only. There is no tin and no three-litre format.

**Everything else that is checkable and not in that file does not exist.** No award, rating,
customer count, tonnage, lab result, certification or testimonial.

## The ceiling — Malaysia, Food Regulations 1985 Reg. 18(6)

Food may not be represented as preventing, alleviating, treating or curing any disease, and this
site carries no compositional analysis, so **nutrient-content claims are out too** — "rich in
antioxidants", "high in omega-3", "good fats", "healthy fats", "healthier than". No cholesterol,
heart, skin, hair, weight or immunity framing anywhere, **including table cells and FAQ answers**.

This bites hardest on `olive-oil-vs-avocado-oil` and `minyak-zaitun-vs-minyak-sawit`. Almost
everything written about both comparisons is a health argument. Yours is not: compare them as
**cooking fats** — flavour, heat behaviour, texture, price per litre, which dish wants which. If the
reader's real question is health, say plainly that it is one for a dietitian and not for a seller,
then move on.

## Do not contradict the live site — these have all bitten before

Check `public/llms.txt`, `llms-ms.txt` or `llms-ar.txt` before writing any figure.

- **Shelf life: up to about 18 months unopened, about two months once opened.**
- **Do not put the bottle in the fridge**, but say it correctly: the site's position is that it is
  **not necessary**, and that cloudiness or partial setting in the cold is **normal and harmless**
  and reverses at room temperature. It is not a prohibition on safety grounds.
- **Frying oil is not reused** as this site's advice — but do not write that Malaysians never reuse
  it, because the live health article says they do.
- **Smoke points, as this site publishes them:** extra virgin olive oil 190–210 °C, virgin coconut
  oil 175–190 °C, palm cooking oil around 230 °C, refined sunflower around 225 °C. **Avocado oil is
  higher than olive oil** — that is the honest answer and you must not fudge it.
- **Do not quote an acidity figure for this product.** The published "below 0.028%" is under review.
  The 0.8% extra-virgin grade limit is fine; it is a legal definition the site already publishes.
- **Cold pressed is an extraction method, not a grade**, and "first press" alone guarantees nothing.

## Voice

- Write **in** the language, not into it. Not a translation of anybody's article. Different
  examples, different FAQs, different order.
- Concrete beats abstract: a temperature, a ratio, a step, a bottle size.
- Every answer paragraph must survive being quoted **alone**.
- No superlatives you cannot prove.
- Malay: Malaysian Malay as a food writer would publish it. Use **`perahan sejuk`**, never
  `sejuk-tekan`, which is a calque. Arabic: natural Modern Standard Arabic.

## Links

`related` is 3–5 objects `{label, path, description}`. `path` has no language prefix and no leading
slash. Use a money page (`products`, `shop`, `why-us`, `contact` — there is no `story` route) plus
**two sibling articles in your own language**. Your row names them. All slugs are in
`src/content/articles/slugs.json` — check yours exists before you write it.

## Images

Your row gives the frame that will sit at the top and the inline frame. Write `heroAlt` and
`inlineAlt` as a factual description of **that** frame. **Never describe text on the product
label** — the label carries a line this round does not repeat, and a crop that makes it readable is
rejected on sight. Do not add an `image` block to `sections`; the importer places the inline itself.

---

## Rows

`datePublished` and `dateModified` are `2026-08-26`. `readingTime` from your own word count at
roughly 200 words a minute.

### English

**`aglio-e-olio`** · slug `aglio-e-olio-recipe-with-extra-virgin-olive-oil` · focus **aglio olio recipe** (6,600/mo, LOW)
This is the biggest term this site has ever targeted, so the article has to actually be a good
recipe, not a product page wearing a recipe's clothes. Give the classic four-ingredient version by
weight and volume for two and for four, the pasta-water emulsion step that people get wrong, how
far to take the garlic (blond, never brown) and what to do if it browns, chilli, parsley, and why
the oil goes in cold at the end as well as warm at the start. A numbered method is required.
Then, briefly, the part only an oil seller can add: **in a dish that is mostly oil, the oil is the
flavour** — a flat refined oil makes a flat plate. Do not restate smoke points; link.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/olive-oil-for-bread-and-dipping`.
Hero frame: a glass bottle of green olive oil on a wooden table beside a nest of dried spaghetti and whole garlic bulbs.
Inline frame: olive paste leaving a stainless mill with green oil running into the vat below.

**`olive-oil-vs-avocado-oil`** · slug `olive-oil-vs-avocado-oil` · focus **olive oil vs avocado oil** (110/mo, HIGH; cluster ≈330)
Intent: which to buy, and whether the more expensive one is doing anything. Cover flavour (peppery
and grassy against buttery and near-neutral), **heat honestly — avocado oil's smoke point is higher
than olive oil's, say so**, what each is for (avocado where you want no flavour and high heat,
olive where the oil is tasted), price per litre in Malaysia, and availability. A "use this for that"
table is required. **No health comparison of any kind.**
Siblings: `blog/olive-oil-smoke-point-what-heat-it-can-take`, `blog/olive-oil-vs-coconut-oil-in-a-malaysian-kitchen`.
Hero frame: a glass bottle of green olive oil standing beside a whole avocado on a pale kitchen counter.
Inline frame: a bottle of olive oil held at the edge of a sunlit olive grove, a stone ledge and an olive branch in frame.

**`olive-oil-and-balsamic`** · slug `olive-oil-and-balsamic-vinegar` · focus **balsamic vinegar and olive oil dressing** (30/mo, MEDIUM; cluster ≈200)
Intent: the pairing itself. Cover why fat and acid need a ratio rather than a splash, the 3:1 start
and when to move it, the difference between a cheap balsamic vinegar of Modena and an aged one and
what that does to the ratio, dipping versus dressing versus a finishing drizzle, what not to pair it
with, and how to store a made-up dressing. A ratio table is required. The live bread article covers
balsamic as one of three dipping directions — link to it, do not repeat it.
Siblings: `blog/extra-virgin-olive-oil-salad-dressing`, `blog/olive-oil-for-bread-and-dipping`.
Hero frame: a bottle of green olive oil and a small dark bottle of balsamic vinegar side by side on a wooden board.
Inline frame: a bottle of olive oil standing on a wooden table with whole olives and leaves scattered around it.

**`olive-oil-for-hummus`** · slug `olive-oil-for-hummus` · focus **olive oil for hummus** (10/mo, HIGH; cluster ≈60)
Intent: which oil, and how it is used — in the blend and on top. Cover that hummus takes oil twice,
why the pouring oil should be the better one, quantities for a standard batch, tahini and lemon
balance, temperature, and how to serve it so the oil pools rather than soaks. This is a Levantine
dish and this is Palestinian oil — one sentence of that context, not a paragraph. Include a method
or a quantity table.
Siblings: `blog/olive-oil-for-bread-and-dipping`, `blog/palestinian-olive-oil-what-makes-it-different`.
Hero frame: a ceramic bowl of hummus with a pool of green olive oil in the middle and whole chickpeas scattered beside it.
Inline frame: a farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table.

**`olive-oil-for-grilling`** · slug `olive-oil-for-grilling-and-barbecue` · focus **olive oil for grilling** (10/mo, HIGH; cluster ≈50)
Intent: can you grill with it, and where the oil actually goes. Cover oiling the **food, not the
grate**, why a marinade's oil mostly drips and burns, flare-ups and what causes them, direct against
indirect heat, the finishing pour after the food comes off — which is where an extra virgin earns
its price — and satay and ikan bakar as the local cases. Link the smoke-point article rather than
restating figures. Include a list or table.
Siblings: `blog/olive-oil-smoke-point-what-heat-it-can-take`, `blog/olive-oil-marinade-what-it-does`.
Hero frame: a bottle of green olive oil and a basting brush on a wooden board beside a cast-iron grill pan.
Inline frame: a row of dark glass bottles filling with olive oil under stainless filling heads.

**`cloudy-olive-oil`** · slug `why-is-my-olive-oil-cloudy` · focus **cloudy olive oil with sediment** (10/mo)
Intent: "there is stuff at the bottom and it has gone hazy — is it off?" Answer: almost always no.
Cover the three separate things people see — **cold haze** (reverses at room temperature),
**unfiltered sediment** (fine olive solids, normal in a young oil, but they shorten its life so
finish the bottle), and **actual spoilage** (the smell test, which is the only one that matters).
Explain filtered against unfiltered as a choice rather than a fault, and say what a Malaysian
air-conditioned kitchen does to a bottle. A "what you see / what it is / what to do" table is
required. **The site's position is that the fridge is not necessary, and that cold cloudiness is
normal and harmless — do not turn that into a safety warning.**
Siblings: `blog/olive-oil-shelf-life-how-long-a-bottle-lasts`, `blog/why-does-olive-oil-taste-bitter`.
Hero frame: a dark glass olive oil bottle standing on a wooden table with olives and leaves around it.
Inline frame: green olive oil pouring from a stainless pipe into an open vat at the mill.

### Malay

**`minyak-zaitun-vs-minyak-sawit`** · slug `minyak-zaitun-vs-minyak-sawit` · focus **minyak zaitun vs minyak sawit** (10/mo, LOW)
Niat: minyak yang negara ini keluarkan, lawan minyak yang diimport. **Banding sebagai lemak masakan
sahaja.** Liputi takat berasap (sawit lebih tinggi — katakan dengan jujur), rasa, kos seliter yang
memang jauh berbeza, kerja dapur mana untuk yang mana, dan kenapa kedua-duanya boleh duduk dalam
satu dapur. Jadual wajib. Live `blog/minyak-zaitun-vs-minyak-masak-lain` membanding minyak masak
sebagai satu set — pautkan, jangan ulang. **Tiada perbandingan kesihatan langsung.**
Sibling: `blog/minyak-zaitun-vs-minyak-masak-lain`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.
Bingkai hero: sebotol kaca minyak zaitun hijau di atas meja kayu dapur dengan cahaya dari tingkap.
Bingkai inline: buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan.

**`minyak-zaitun-untuk-pasta`** · slug `minyak-zaitun-untuk-pasta` · focus **minyak zaitun untuk pasta** (0/mo)
Niat: pasta minyak zaitun di dapur Malaysia. Liputi aglio olio versi rumah, air pasta sebagai
pengikat, bawang putih yang tidak boleh hangus, cili kering, dan versi tempatan — cili padi, ikan
bilis, atau daun kari. Kaedah bernombor wajib. Jangan salin artikel Inggeris dalam pusingan ini;
tulis untuk dapur Malaysia dengan bahan yang ada di pasar raya sini.
Sibling: `blog/resepi-mudah-dengan-minyak-zaitun`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.
Bingkai hero: sebotol minyak zaitun hijau di sebelah spageti kering dan bawang putih di atas meja kayu.
Bingkai inline: pandangan dari udara ke atas ladang zaitun dengan barisan pokok memanjang ke ufuk.

**`minyak-zaitun-keruh`** · slug `kenapa-minyak-zaitun-jadi-keruh` · focus **minyak zaitun keruh** (0/mo)
Niat: "ada mendapan di bawah botol dan minyak jadi keruh — rosakkah?" Jawapan: selalunya tidak.
Bezakan **keruh sejuk** (kembali jernih pada suhu bilik), **mendapan minyak tidak ditapis** (normal,
tetapi memendekkan hayat botol), dan **minyak yang betul-betul rosak** (ujian bau). Terangkan
ditapis lawan tidak ditapis sebagai pilihan, bukan kecacatan. Jadual "apa yang nampak / apa
sebenarnya / apa perlu buat" wajib. **Pendirian tapak: peti sejuk tidak perlu, dan keruh sejuk itu
normal — jangan jadikan ia amaran keselamatan.**
Sibling: `blog/cara-simpan-minyak-zaitun`, `blog/cara-kenal-minyak-zaitun-palsu`.
Bingkai hero: botol kaca gelap minyak zaitun di atas meja kayu dengan buah zaitun dan daun di sekelilingnya.
Bingkai inline: minyak zaitun hijau mengalir dari paip keluli ke dalam tangki terbuka.

**`minyak-zaitun-untuk-ikan-bakar`** · slug `minyak-zaitun-untuk-ikan-bakar` · focus **minyak zaitun untuk ikan bakar** (0/mo)
Niat: ikan bakar dengan minyak zaitun. Liputi sapu pada **ikan, bukan pada jaring**, kenapa minyak
dalam perapan banyak yang menitis dan terbakar, api terbuka lawan api sederhana, daun pisang, dan
tuangan akhir selepas ikan diangkat — di situ minyak dara berbaloi. Pautkan artikel takat berasap,
jangan ulang angkanya. Senarai atau jadual wajib.
Sibling: `blog/minyak-zaitun-untuk-goreng`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.
Bingkai hero: sebotol minyak zaitun hijau dan berus penyapu di atas papan kayu di sebelah kuali panggang besi.
Bingkai inline: pekerja ladang membawa hasil kutipan zaitun menyusuri laluan di celah pokok zaitun.

**`minyak-zaitun-untuk-air-fryer`** · slug `minyak-zaitun-untuk-air-fryer` · focus **minyak zaitun untuk air fryer** (0/mo)
Niat: air fryer ada di hampir setiap rumah di sini. Liputi berapa banyak (berus atau satu sudu
kecil, bukan tuang), kenapa sembur aerosol merosakkan salutan bakul, julat suhu air fryer lawan
minyak zaitun, makanan mana yang sesuai, dan cara membersih. Jangan salin artikel Inggeris
`can-you-use-olive-oil-in-an-air-fryer` — tulis untuk masakan Melayu: keledek, pisang, ayam
berempah, popia. Jadual wajib.
Sibling: `blog/minyak-zaitun-untuk-goreng`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.
Bingkai hero: sebotol minyak zaitun hijau di atas meja dapur bertepung dengan mangkuk seramik dan pemukul di sebelahnya.
Bingkai inline: buah zaitun dalam bekas bertindan selepas dituai.

**`minyak-zaitun-untuk-roti`** · slug `minyak-zaitun-untuk-roti-dan-cicahan` · focus **minyak zaitun untuk roti** (0/mo)
Niat: cicah roti dengan minyak zaitun. Liputi kenapa guna tanpa panas menunjukkan watak sebenar
minyak, za'atar dan dukkah dan balsamik sebagai tiga arah berbeza, roti mana yang sesuai (roti
canai, roti arab, sourdough), suhu hidangan, dan berapa banyak dituang satu masa. Senarai pasangan
wajib.
Sibling: `blog/minyak-zaitun-untuk-salad-dan-hidangan-sejuk`, `blog/minyak-zaitun-palestin-dari-ladang-ke-botol`.
Bingkai hero: mangkuk seramik berisi hummus dengan lopak minyak zaitun hijau di tengah dan kacang kuda di sebelahnya.
Bingkai inline: sebotol minyak zaitun dipegang di tepi ladang zaitun yang terkena cahaya matahari.

### Arabic

Slugs are ASCII transliteration under D9. Everything else in Modern Standard Arabic.

**`anwae-alzaytun`** · slug `anwae-alzaytun-lilzayt` · focus **أنواع الزيتون** (10/mo)
النية: أصناف الزيتون التي يُعصر منها الزيت، مكتوبة **للمشتري لا للمزارع**. غطِّ النبالي والصوري في
بلاد الشام، والبيكوال والأربيكينا، والفرانتويو والكوراتينا، والشملالي، وما يفعله كل صنف بالطعم
والمرارة واللذعة؛ ولماذا يكون الزيت أحادي الصنف مختلفاً عن الخلطة؛ وكيف يقرأ المشتري اسم الصنف
حين يُذكر، وماذا يعني ألّا يُذكر. جدول أصناف مقابل ملامح الطعم مطلوب. **لا تكتب عن الشتلات ولا
الزراعة ولا السماد** — تلك نية مختلفة تماماً.
الأشقاء: `blog/zayt-alzaytun-hasab-balad-almansha`, `blog/taem-zayt-alzaytun-albikr-almumtaz`.
الإطار الرئيسي: حبات زيتون خضراء وأرجوانية مفروشة على طاولة خشبية إلى جانب زجاجة زيت.
الإطار الداخلي: صناديق مرصوفة مملوءة بثمار الزيتون بعد القطاف.

**`zayt-alzaytun-walzaatar`** · slug `zayt-alzaytun-walzaatar` · focus **زيت الزيتون والزعتر** (10/mo)
النية: الزيت والزعتر كطبق، لا كوصفة صحية. غطِّ الخلطة نفسها ونسبها، الفرق بين زعتر مطحون وزعتر
بورقه، المناقيش وكيف تُدهن، طبق الفطور بالزيت والزعتر والخبز، ومدة حفظ الخلطة بعد مزجها. **لا تكتب
أي فائدة صحية إطلاقاً** — هذا هو الخط الذي يسقط عنده أغلب ما يُكتب عن هذا الموضوع. اذكر أن الموقع
يبيع زيتاً منكّهاً بالزعتر البري ضمن ستة أنواع، بجملة واحدة ورابط. جدول أو قائمة مطلوبة.
الأشقاء: `blog/zayt-alzaytun-lilsalata`, `blog/zayt-zaytun-falastini-ma-yumayyizuh`.
الإطار الرئيسي: زجاجة زيت زيتون وزعتر مجفف في وعاء خشبي على طاولة.
الإطار الداخلي: مزارع يصب زيت الزيتون من زجاجة داكنة في وعاء فخاري على طاولة خشبية.

**`zayt-alzaytun-lilmuajanat`** · slug `zayt-alzaytun-lilmuajanat` · focus **زيت الزيتون للمعجنات** (10/mo)
النية: العجين بزيت الزيتون. غطِّ ما يفعله الزيت في العجين مقابل الزبدة أو السمن، نسبة الزيت إلى
الطحين في عجينة المناقيش والفطائر، لماذا يبقى الخبز بالزيت طرياً أطول، درجة حرارة الفرن، ومتى
يُستعمل زيت قوي الطعم ومتى يُفضَّل زيت ألطف. جدول نسب مطلوب. الزيت داخل عجين رطب، فحرارة الفرن
ليست القيد الذي يظنه الناس — اربط مقالة الطبخ بدل إعادة الأرقام.
الأشقاء: `blog/zayt-alzaytun-lil-tabkh`, `blog/alfarq-bayn-zayt-alzaytun-albikr-walmumtaz`.
الإطار الرئيسي: زجاجة زيت زيتون على طاولة مطبخ مرشوشة بالطحين مع وعاء خزفي.
الإطار الداخلي: بستان زيتون عند الغروب، صفوف الأشجار ممتدة نحو الأفق.

**`zayt-alzaytun-lilshawi`** · slug `zayt-alzaytun-lilshawi` · focus **زيت الزيتون للشوي** (0/mo)
النية: الشواء بزيت الزيتون. غطِّ دهن **الطعام لا الشبك**، لماذا يتساقط زيت التتبيلة ويحترق، اللهب
المفاجئ وسببه، الحرارة المباشرة مقابل غير المباشرة، والسكبة الأخيرة بعد رفع الطعام — وهناك يستحق
الزيت البكر ثمنه. اربط مقالة القلي بدل إعادة أرقام درجة التدخين. قائمة أو جدول مطلوب.
الأشقاء: `blog/zayt-alzaytun-lilqaly`, `blog/zayt-alzaytun-lil-tabkh`.
الإطار الرئيسي: زجاجة زيت زيتون وفرشاة دهن على لوح خشبي إلى جانب مقلاة شوي حديدية.
الإطار الداخلي: صف من الزجاجات الداكنة يمتلئ بزيت الزيتون على خط التعبئة.

**`tajmid-zayt-alzaytun`** · slug `tajmid-zayt-alzaytun` · focus **تجميد زيت الزيتون** (0/mo)
النية: "الزيت تجمّد أو صار عكِراً في البرد — هل فسد؟" الجواب: لا. اشرح أن التصلّب في البرد ظاهرة
طبيعية تعود عن نفسها في ساعة على حرارة الغرفة، وأنها **ليست دليل جودة ولا دليل غش** — الزيت البكر
قد يتصلّب وقد لا يتصلّب حسب الصنف والحرارة، والزيت المغشوش كذلك. غطِّ الفرق بين التصلّب البارد
والراسب في الزيت غير المصفّى، وموقف الموقع: **الثلاجة غير ضرورية**، لا ممنوعة لأسباب سلامة. اربط
مقالة الحفظ. جدول مطلوب.
الأشقاء: `blog/hifz-zayt-alzaytun`, `blog/zujajat-zayt-alzaytun`.
الإطار الرئيسي: زجاجة زيت زيتون داكنة على طاولة خشبية وحولها حبات زيتون وأوراق.
الإطار الداخلي: زيت الزيتون يتدفق من أنبوب فولاذي إلى خزان مفتوح في المعصرة.

**`zayt-alzaytun-fi-ramadan`** · slug `zayt-alzaytun-fi-ramadan` · focus **زيت الزيتون في رمضان** (0/mo)
النية: المطبخ في رمضان، **طبخاً لا علاجاً**. غطِّ ما يُشترى قبل الشهر وبأي حجم يكفي بيتاً لثلاثين
يوماً، أطباق الإفطار التي يدخلها الزيت بلا طبخ طويل (الفتوش، الحمص، المتبل، السلطات، المناقيش)،
السحور والأطباق الباردة، وتنظيم الشراء حتى لا تُفتح زجاجتان معاً. **لا تكتب أي فائدة صحية، ولا عن
الصيام والجسم، ولا عن الدهن بالزيت** — هذه المقالة عن المطبخ فقط. جدول أو قائمة شراء مطلوبة.
الأشقاء: `blog/zayt-alzaytun-lilsalata`, `blog/sier-zayt-alzaytun-fi-malizya`.
الإطار الرئيسي: مائدة خشبية عليها زجاجة زيت زيتون وأطباق صغيرة وخبز.
الإطار الداخلي: بستان زيتون معمّر وقد فُرشت شباك القطاف تحت الأشجار.
