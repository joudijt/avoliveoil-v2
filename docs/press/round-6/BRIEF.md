# PRESS round 6 — shared writer brief

You are writing **one** article. Read this file, then your row at the bottom, then write
`docs/press/round-6/drafts/<id>.json` and nothing else. Do not touch another writer's file.

## Images — different from every previous round, read this first

**Images are handled centrally after all eighteen drafts are imported.** You do not choose a
photo, crop anything, or generate anything. Write `heroAlt` and `inlineAlt` as a **plain factual
placeholder** describing your article's general subject (for example: "Green olive oil in a glass
bottle" or "Olive paste at the mill") — a site-wide script will overwrite both with the real photo's
description once your article is live. Do not describe a specific frame; there isn't one yet.

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

**Aim for 900–960, not 980.** The validator's ceiling is 1000; the rendered gate measures the
rendered region, which also carries the key takeaway. Leave yourself room.

Copy the shape from `docs/press/round-5/drafts/olive-oil-and-balsamic.json`. Same top-level keys in
the same order. `datePublished` and `dateModified` are both `2026-08-26`.

Validate before you finish:

```
python scripts/press-import.py --round 6 --check
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
  pepper, rosemary & basil, fennel & anise, lavender & chamomile. **No garlic, truffle or lemon
  infusion exists.**
- Sizes are 250 ml and 500 ml only. No tin, no gift set, no bundle.

**Everything else that is checkable and not in that file does not exist.** No award, rating,
customer count, tonnage, lab result, certification or testimonial.

## The ceiling — Malaysia, Food Regulations 1985 Reg. 18(6)

Food may not be represented as preventing, alleviating, treating or curing any disease, and this
site carries no compositional analysis, so **nutrient-content claims are out too** — "rich in
antioxidants", "high in omega-3", "good fats", "healthy fats", "healthier than". No cholesterol,
heart, skin, hair, weight or immunity framing anywhere, **including table cells and FAQ answers**.

This bites hardest on `olive-oil-vs-butter` and `minyak-zaitun-vs-mentega` and
`zayt-alzaytun-walzubda`. Almost everything written about "is X healthier than butter" is a health
argument. Yours is not: compare as **cooking and spreading fats** — flavour, smoke behaviour,
texture at room temperature, what each does to toast versus a pan versus a finished dish, price. If
the reader's real question is health, say plainly that it is one for a dietitian, then move on.

## Scope boundaries — read these before you start

- **`olive-oil-vs-butter` / `minyak-zaitun-vs-mentega` / `zayt-alzaytun-walzubda` are about
  spreading and cooking, not baking.** The live `olive-oil-substitute-what-to-use-instead` already
  owns the butter-to-oil baking conversion ratio. Link to it for baking; do not restate the ratio.
- **`olive-oil-for-steak` is stovetop and pan, not the grill.** The live
  `olive-oil-for-grilling-and-barbecue` owns charcoal and open flame. Link to it; do not repeat it.
- **`olive-oil-focaccia-recipe` is baking a yeasted dough, not dipping bread.** The live
  `olive-oil-for-bread-and-dipping` covers a saucer of oil beside bread that already exists. Yours
  is about the dough itself — the oil folded in, the dimpled top, the finishing pour before the
  oven. Different subject entirely; link, do not repeat.
- **`minyak-zaitun-murah` / `zayt-alzaytun-al-rakhis` are honest pricing articles, not sales
  copy.** The intent behind "murah"/"رخيص" (cheap) is "why does this cost what it does, and is a
  cheap bottle a bargain or a warning sign". Answer that directly — do not simply assert the
  product is worth its price. The live `olive-oil-price-in-malaysia-what-you-are-paying-for` /
  `harga-minyak-zaitun-di-malaysia` / `sier-zayt-alzaytun-fi-malizya` already covers the general
  price breakdown — link to it for the per-litre arithmetic; yours is specifically about what an
  unusually cheap bottle usually means.

## Do not contradict the live site — checked every round, still checked

Before you write a figure, check `public/llms.txt`, `llms-ms.txt` or `llms-ar.txt` for the same
subject.

- **Shelf life: up to about 18 months unopened, about two months once opened.**
- **The fridge is not necessary**, and cold cloudiness/partial setting is normal and reverses at
  room temperature — this is **not** a safety prohibition. (Corrected in the briefs on 2026-08-26;
  do not write "never refrigerate" as a rule.)
- **Frying oil, per this site's advice: two or three shallow-fry uses with filtering**, not zero,
  not unlimited.
- **Published smoke points**: extra virgin olive oil 190–210 °C, virgin coconut oil 175–190 °C,
  palm cooking oil ~230 °C, refined sunflower ~225 °C, avocado oil above olive oil's range.
- **Do not quote an acidity figure for this product.** The published "below 0.028%" is under
  review. The 0.8% extra-virgin grade limit is fine — it is a legal definition the site publishes.
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
sibling articles in your own language**. Your row names them. All slugs are in
`src/content/articles/slugs.json` — check yours exists before you write it.

---

## Rows

`datePublished` and `dateModified` are `2026-08-26`. `readingTime` from your own word count at
roughly 200 words a minute.

### English

**`olive-oil-roasted-vegetables`** · slug `olive-oil-for-roasting-vegetables` · focus **olive oil for roasting vegetables** (70/mo, LOW)
Intent: coating vegetables for the oven and getting them to actually crisp rather than steam. Cover
how much oil per tray (a coating, not a pool), why crowding the tray is the real enemy of crisping,
oven temperature range, salting before or after, which vegetables want a hotter oven and which want
lower and longer, and finishing with a raw drizzle after roasting. A table of vegetable → oven
temperature → roughly how long is required.
Siblings: `blog/olive-oil-smoke-point-what-heat-it-can-take`, `blog/olive-oil-marinade-what-it-does`.

**`olive-oil-vs-butter`** · slug `olive-oil-vs-butter` · focus **olive oil vs butter** (20/mo, LOW)
Intent: which to reach for, as a spread and a cooking fat — **not baking**. Cover flavour, what
each does on hot toast versus room-temperature bread, browning behaviour in a pan (butter browns
and can burn; oil does not brown the same way), a savoury dish where one clearly beats the other and
vice versa, and price per use. **No health comparison of any kind.** For the baking conversion
ratio, link to `olive-oil-substitute-what-to-use-instead` rather than restating it. A "use this for
that" table is required.
Siblings: `blog/olive-oil-substitute-what-to-use-instead`, `blog/olive-oil-for-bread-and-dipping`.

**`olive-oil-for-steak`** · slug `olive-oil-for-steak` · focus **olive oil for steak** (20/mo, LOW)
Intent: pan-searing a steak at home, stovetop, not the grill. Cover why a hard sear wants a higher
smoke point than extra virgin comfortably gives (link the smoke-point article, do not restate
figures), the two-oil trick (a neutral oil for the sear, extra virgin finished on top or basted at
the end), resting the meat, and a simple pepper-and-oil finish. A short numbered method is required.
Siblings: `blog/olive-oil-smoke-point-what-heat-it-can-take`, `blog/olive-oil-marinade-what-it-does`.

**`olive-oil-fried-egg`** · slug `olive-oil-fried-egg` · focus **olive oil fried egg** (30/mo, LOW)
Intent: frying an egg in olive oil instead of butter or a neutral oil — the Spanish style, crisp
edges and a soft yolk. Cover the quantity of oil (more than people expect — a shallow pool, not a
film), pan heat, spooning hot oil over the yolk, salt timing, and what changes if the oil is
extra virgin versus a milder one. A short numbered method is required.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/olive-oil-for-bread-and-dipping`.

**`olive-oil-focaccia`** · slug `olive-oil-focaccia-recipe` · focus **olive oil focaccia** (20/mo, LOW)
Intent: baking focaccia, not dipping bread that already exists. Cover the oil folded into a wet
dough, the dimpling step and why it exists, the pool of oil the dimples hold, toppings (rosemary,
flaky salt, olives), oven temperature, and the finishing pour straight from the oven. A numbered
method or an ingredient table is required.
Siblings: `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`, `blog/olive-oil-for-bread-and-dipping`.

**`olive-oil-popcorn`** · slug `olive-oil-popcorn` · focus **olive oil popcorn** (10/mo, LOW)
Intent: popping corn in olive oil on the stovetop rather than a microwave bag or a neutral oil.
Cover quantity of oil per batch, why a lid and a shake matter, heat level, salting timing (off the
heat, while the popcorn can still take it), and what extra virgin adds over a neutral oil here — a
genuine flavour case, not a health one. A short numbered method is required.
Siblings: `blog/olive-oil-smoke-point-what-heat-it-can-take`, `blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen`.

### Malay

**`minyak-zaitun-untuk-sayur-panggang`** · slug `minyak-zaitun-untuk-sayur-panggang` · focus **minyak zaitun untuk sayur panggang** (0/mo)
Niat: melapisi sayur untuk dipanggang dalam ketuhar supaya garing, bukan lembik. Liputi berapa
banyak minyak (lapisan nipis, bukan rendaman), kenapa dulang yang terlalu penuh menghalang
kegaringan, julat suhu ketuhar, masa garam ditabur, sayur mana perlu panas tinggi dan mana perlu
suhu rendah lebih lama, dan tuangan mentah selepas keluar dari ketuhar. Jadual sayur × suhu × masa
wajib.
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `blog/minyak-zaitun-untuk-ikan-bakar`.

**`minyak-zaitun-vs-mentega`** · slug `minyak-zaitun-vs-mentega` · focus **minyak zaitun vs mentega** (0/mo)
Niat: sapuan dan lemak masakan — **bukan bakeri**. Liputi rasa, apa yang berlaku pada roti panas
lawan roti suhu bilik, sifat perang mentega dalam kuali (mentega jadi perang dan boleh hangus,
minyak tidak berkelakuan sama), satu hidangan yang jelas lebih sesuai dengan mentega dan satu lagi
dengan minyak, dan kos setiap kali guna. **Tiada perbandingan kesihatan langsung.** Untuk nisbah
penukaran dalam bakeri, pautkan `olive-oil-substitute-what-to-use-instead` — jangan ulang nisbah
itu di sini. Jadual "guna yang mana untuk apa" wajib.
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `blog/minyak-zaitun-untuk-roti-dan-cicahan`.

**`minyak-zaitun-untuk-steak`** · slug `minyak-zaitun-untuk-steak` · focus **minyak zaitun untuk steak** (10/mo)
Niat: menggoreng steak di atas dapur, bukan panggang arang. Liputi kenapa searing keras memerlukan
takat berasap lebih tinggi daripada extra virgin (pautkan artikel takat berasap, jangan ulang
angka), teknik dua minyak (minyak neutral untuk sear, extra virgin dituang atau disental selepas),
rehat daging, dan tuangan akhir dengan lada. Kaedah bernombor ringkas wajib.
Sibling: `blog/minyak-zaitun-untuk-goreng`, `blog/minyak-zaitun-untuk-masak-panduan-dapur`.

**`minyak-zaitun-untuk-telur`** · slug `minyak-zaitun-untuk-telur-goreng` · focus **minyak zaitun untuk telur** (0/mo)
Niat: goreng telur dengan minyak zaitun, gaya Sepanyol — tepi garing, kuning lembut. Liputi kuantiti
minyak (lebih daripada sangkaan orang — lopak cetek, bukan lapisan), haba kuali, cara menyiram
minyak panas ke atas kuning, waktu garam, dan bagaimana minyak dara berbeza daripada minyak lembut.
Kaedah bernombor ringkas wajib.
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `blog/minyak-zaitun-untuk-roti-dan-cicahan`.

**`minyak-zaitun-murah`** · slug `kenapa-minyak-zaitun-tak-pernah-murah` · focus **minyak zaitun murah** (10/mo, HIGH)
Niat: "kenapa minyak zaitun tak pernah murah, dan botol murah tu selamat ke tidak". **Jangan
sekadar kata produk ini berbaloi** — jawab soalan sebenar. Liputi kos sebenar (pokok, penuaian
tangan, perahan segera, penghantaran), kenapa harga sangat rendah biasanya bermakna gred lebih
rendah atau campuran, cara membanding harga seliter yang adil, dan bila harga murah munasabah
(saiz besar, jualan) lawan bila ia tanda amaran. Jadual mungkin membantu. Untuk pecahan harga penuh,
pautkan `harga-minyak-zaitun-di-malaysia` — jangan ulang jadual harga di sana.
Sibling: `blog/harga-minyak-zaitun-di-malaysia`, `blog/cara-kenal-minyak-zaitun-palsu`.

**`minyak-zaitun-popcorn`** · slug `minyak-zaitun-untuk-popcorn` · focus **minyak zaitun popcorn** (0/mo)
Niat: popcorn atas dapur dengan minyak zaitun, bukan bag mikrogelombang atau minyak neutral.
Liputi kuantiti minyak setiap kali, kenapa penutup periuk dan goncangan penting, tahap haba, waktu
garam (selepas api dimatikan, semasa popcorn masih boleh menyerap), dan apa yang minyak dara
tambah di sini — hujah rasa, bukan kesihatan. Kaedah bernombor ringkas wajib.
Sibling: `blog/minyak-zaitun-untuk-masak-panduan-dapur`, `blog/minyak-zaitun-untuk-goreng`.

### Arabic

Slugs are ASCII transliteration under D9. Everything else in Modern Standard Arabic.

**`zayt-alzaytun-lilkhudar-almashwi`** · slug `zayt-alzaytun-lilkhudar-almashwi` · focus **زيت الزيتون للخضار المشوي** (0/mo)
النية: تغليف الخضار بالزيت قبل الشيّ في الفرن حتى تتحمّر لا أن تطهى على البخار. غطِّ كمية الزيت
(طبقة رقيقة لا غمر)، لماذا الصينية المزدحمة تمنع التحمّر، مدى حرارة الفرن، وقت رشّ الملح، أي خضار
يحتاج حرارة عالية وأيها يحتاج حرارة أقل ووقتاً أطول، والسكبة النيئة بعد الفرن. جدول خضار × حرارة ×
مدة مطلوب.
الأشقاء: `blog/zayt-alzaytun-lil-tabkh`, `blog/zayt-alzaytun-lilqaly`.

**`zayt-alzaytun-walzubda`** · slug `zayt-alzaytun-walzubda` · focus **زيت الزيتون والزبدة** (0/mo)
النية: كدهن للطبخ والدهن على الخبز — **لا في المعجنات**. غطِّ الطعم، ما يحدث على خبز ساخن مقابل
خبز بحرارة الغرفة، اسمرار الزبدة في المقلاة (تسمرّ وقد تحترق، والزيت لا يتصرّف كذلك)، طبقاً واحداً
يناسبه الزبدة بوضوح وآخر يناسبه الزيت، وتكلفة كل استعمال. **لا مقارنة صحية إطلاقاً.** لنسبة
الاستبدال في المعجنات اربط `olive-oil-substitute-what-to-use-instead` — لا تُعِد النسبة هنا. جدول
"أيهما لأي استعمال" مطلوب.
الأشقاء: `blog/zayt-alzaytun-lil-tabkh`, `blog/zayt-alzaytun-lilmuajanat`.

**`zayt-alzaytun-lilsteak`** · slug `zayt-alzaytun-lilsteak` · focus **زيت الزيتون للستيك** (0/mo)
النية: قلي الستيك على الموقد، لا الشواء. غطِّ لماذا يحتاج السير القوي درجة تدخين أعلى من البكر
الممتاز (اربط مقالة درجة التدخين، لا تُعِد الأرقام)، حيلة الزيتين (زيت محايد للسير، بكر ممتاز
يُسكب أو يُدهن بعده)، راحة اللحم، والسكبة الأخيرة بالفلفل. خطوات مرقّمة قصيرة مطلوبة.
الأشقاء: `blog/zayt-alzaytun-lilqaly`, `blog/zayt-alzaytun-lil-tabkh`.

**`zayt-alzaytun-lilbayd`** · slug `zayt-alzaytun-lilbayd` · focus **بيض بزيت الزيتون** (10/mo)
النية: قلي البيض بزيت الزيتون على الطريقة الإسبانية — حواف مقرمشة وصفار طري. غطِّ كمية الزيت
(أكثر مما يتوقع الناس — غمر خفيف لا طبقة رقيقة)، حرارة المقلاة، طريقة سكب الزيت الساخن على الصفار،
وقت الملح، والفرق حين يكون الزيت بكراً ممتازاً بدل زيت ألطف. خطوات مرقّمة قصيرة مطلوبة.
الأشقاء: `blog/zayt-alzaytun-lil-tabkh`, `blog/zayt-alzaytun-lilmuajanat`.

**`zayt-alzaytun-al-rakhis`** · slug `hal-yumkin-an-yakun-zayt-alzaytun-rakhisan` · focus **زيت الزيتون الرخيص** (0/mo)
النية: "لماذا زيت الزيتون غالٍ دائماً، وهل الزجاجة الرخيصة صفقة أم علامة تحذير". **لا تكتفِ بالقول
إن هذا المنتج يستحق سعره** — أجب عن السؤال الحقيقي. غطِّ التكلفة الفعلية (الأشجار، القطاف اليدوي،
العصر السريع، الشحن)، لماذا السعر المنخفض جداً يعني عادة درجة أقل أو خلطاً، كيف تقارن السعر لكل
لتر بإنصاف، ومتى يكون السعر المنخفض منطقياً (عرض، حجم كبير) ومتى هو علامة تحذير. لتفصيل السعر
الكامل اربط `sier-zayt-alzaytun-fi-malizya` — لا تُعِد جدول الأسعار هناك.
الأشقاء: `blog/sier-zayt-alzaytun-fi-malizya`, `blog/mawsim-qitaf-alzaytun`.

**`zayt-alzaytun-lilfawshar`** · slug `zayt-alzaytun-lilfawshar` · focus **زيت الزيتون للفوشار** (0/mo)
النية: فوشار على الموقد بزيت الزيتون، لا كيس ميكروويف ولا زيت محايد. غطِّ كمية الزيت لكل دفعة،
لماذا الغطاء والهزّ مهمّان، مستوى الحرارة، وقت الملح (بعد رفع النار، حين يستطيع الفوشار امتصاصه
بعد)، وما يضيفه البكر الممتاز هنا — حجة طعم لا حجة صحية. خطوات مرقّمة قصيرة مطلوبة.
الأشقاء: `blog/zayt-alzaytun-lil-tabkh`, `blog/zayt-alzaytun-lilqaly`.
