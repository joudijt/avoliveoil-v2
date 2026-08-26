import type { Article } from './types';

const PUBLISHED = '2026-08-01';
const MODIFIED = '2026-08-01';

/**
 * English article bodies. Ids must match `ar.ts` and `ms.ts` — the registry
 * pairs them for hreflang. Slugs are per-language on purpose so each locale's
 * URL carries its own search terms.
 */
export const EN_ARTICLES: Article[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'olive-oil-popularity-malaysia',
    slug: 'why-olive-oil-is-becoming-popular-in-malaysia',

    seoTitle: 'Why Olive Oil Is Becoming More Popular in Malaysia (2026 Guide)',
    metaTitle: 'Why Olive Oil Is Becoming More Popular in Malaysia',
    metaDescription:
      'Olive oil has moved from a specialty import to an everyday staple in Malaysian kitchens. Here is what is driving the shift — health, halal confidence, Arab and Mediterranean cooking, and easier access online.',
    focusKeyword: 'olive oil Malaysia',
    relatedKeywords: [
      'olive oil in Malaysia',
      'why olive oil is popular in Malaysia',
      'extra virgin olive oil Malaysia',
      'halal olive oil Malaysia',
      'olive oil for cooking Malaysia',
      'olive oil price Malaysia',
      'best olive oil brand in Malaysia',
      'buy olive oil online Malaysia',
      'minyak zaitun Malaysia',
      'olive oil vs palm oil Malaysia',
      'Palestinian olive oil Malaysia',
      'olive oil trend Malaysia 2026',
    ],

    category: 'Olive Oil Guide',
    tags: ['Olive Oil Malaysia', 'Food Trends', 'Halal Food', 'Healthy Cooking', 'Extra Virgin Olive Oil'],

    h1: 'Why Olive Oil Is Becoming More Popular in Malaysia',
    excerpt:
      'Olive oil used to sit on one shelf in the imported-goods aisle. Today it turns up in Malaysian home kitchens, cafés and sunnah-food conversations. Here is what changed, and what it means when you pick a bottle.',
    keyTakeaway:
      'Olive oil is growing in Malaysia because four things arrived at once: rising awareness of diet-related health risks, strong halal confidence in a plant-based oil, the spread of Arab and Mediterranean food culture, and e-commerce that put imported extra virgin olive oil within reach of an ordinary grocery budget.',

    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    readingTime: 11,

    hero: {
      src: 'bottleField',
      alt: 'Pes zaitun keluar dari kilang perahan keluli dengan minyak hijau mengalir ke dalam tangki',
    },
    ogImage: '/og/blog-olive-oil-popularity-malaysia.jpg',

    intro: [
      'Ten years ago, olive oil in Malaysia was a gift item. It came in a fancy box, it was bought for someone else, and it usually sat unopened next to the kurma until someone finally used it on a salad nobody asked for.',
      'That is no longer the picture. Walk through a hypermarket in Klang Valley today and olive oil has its own run of shelf space, in several grades, at several price points. Scroll Shopee or TikTok Shop during a Ramadan campaign and it is being sold the way rice and dates are sold — by the case, to people who already know what they want.',
      'This guide explains what actually drove that shift, how Malaysians are using olive oil in real kitchens (not Mediterranean cookbook kitchens), and what the trend should change about how you choose a bottle.',
    ],

    sections: [
      {
        id: 'quiet-arrival',
        heading: "Olive oil's quiet arrival in the Malaysian kitchen",
        blocks: [
          {
            type: 'p',
            text: 'Malaysia grows no olives. Every drop of olive oil sold here is imported, mostly from the Mediterranean basin — Spain, Italy, Greece, Türkiye, Tunisia, Palestine and Syria among them. That single fact shaped the category for decades: imported meant expensive, expensive meant occasional, and occasional meant most households never learned what good olive oil tastes like.',
          },
          {
            type: 'p',
            text: 'Three things eroded that. Halal-certified Arab grocers grew from single shops into national chains. Online marketplaces removed the need for a specialty importer to convince a hypermarket buyer. And a generation of Malaysians who travelled, studied or performed umrah came home with a taste for food they could not previously buy locally.',
          },
          {
            type: 'p',
            text: 'The result is a category that behaves less like a luxury import and more like a pantry decision — closer to how Malaysians already think about ghee, sesame oil or coconut oil: a specific fat for a specific job.',
          },
          {
            type: 'image',
            src: 'kampungBottle',
            alt: 'A Malaysian woman in a hijab holding a bottle of Arabian Village Palestinian olive oil outside a traditional kampung house',
            caption:
              'A Palestinian bottle outside a kampung house — the distance olive oil has travelled in a decade, from rare import to kitchen ingredient.',
          },
        ],
      },
      {
        id: 'five-reasons',
        heading: 'Five reasons Malaysians are switching to olive oil',
        blocks: [
          {
            type: 'h3',
            text: '1. Diet-related health risks became a national conversation',
          },
          {
            type: 'p',
            text: 'Malaysia has spent the last decade talking openly about obesity, diabetes and heart disease. The Ministry of Health\'s public education work through [MyHEALTH](https://www.myhealth.gov.my/) and the National Health and Morbidity Survey pushed diet composition — not just portion size — into everyday conversation. Cooking fat is the easiest lever a household can pull without changing what it eats, and olive oil is the fat most strongly associated with the Mediterranean pattern of eating that [the World Health Organization](https://www.who.int/) and national guidelines repeatedly point to.',
          },
          {
            type: 'p',
            text: 'Worth being precise here: swapping oil is not a cure for anything. What it is, is a low-effort change that fits an existing habit — and low-effort changes are the ones people actually keep.',
          },
          {
            type: 'h3',
            text: '2. Halal confidence is effortless',
          },
          {
            type: 'p',
            text: 'Pure olive oil is pressed fruit juice. No animal derivatives, no alcohol, no emulsifiers. For a Muslim-majority market where every new food category has to clear a halal question first, that is a very short conversation — which is why olive oil spread faster than, say, imported dairy or confectionery. Buyers who want documentation still look for [JAKIM](https://www.halal.gov.my/) recognition on the importer or the retailer rather than on the oil itself.',
          },
          {
            type: 'h3',
            text: '3. Arab and Mediterranean food went mainstream',
          },
          {
            type: 'p',
            text: 'Shawarma, mandi rice, hummus, mutabbal, falafel, Turkish breakfast spreads — a decade ago these were niche in KL. Today they are food-court normal, and every one of them uses olive oil as a finishing ingredient rather than a hidden one. Once a household eats an oil it can taste, it starts caring which oil it buys.',
          },
          {
            type: 'h3',
            text: '4. There is a faith and heritage dimension',
          },
          {
            type: 'p',
            text: 'Olive oil carries meaning in Islam that no other cooking fat carries — the olive is named in the Qur\'an, and using olive oil is widely treated as a sunnah practice. For many Malaysian families the daily spoonful of olive oil is not a wellness trend imported from Europe; it is a religious and cultural habit that happens to also be a good fat. That is a durable reason to buy, not a seasonal one.',
          },
          {
            type: 'h3',
            text: '5. E-commerce fixed the access problem',
          },
          {
            type: 'p',
            text: 'The old bottleneck was distribution: an imported oil needed shelf space it could not earn until it already sold. Shopee, Lazada, TikTok Shop and halal grocery chains removed that step. A brand can now sell a 500 ml bottle nationwide from day one, with reviews doing the persuading. It also means price transparency — Malaysians compare olive oil per litre the way they compare phones.',
          },
          {
            type: 'note',
            title: 'The short version',
            text: 'Health awareness created the reason, halal status removed the friction, Arab and Mediterranean cuisine created the appetite, faith made it a habit, and e-commerce made it available. No single one of those would have been enough.',
          },
        ],
      },
      {
        id: 'how-malaysians-use-it',
        heading: 'How Malaysians actually use olive oil',
        blocks: [
          {
            type: 'p',
            text: 'This is where imported advice usually fails. Malaysian cooking is high-heat, wok-driven and aromatic. Advice written for an Italian kitchen does not survive contact with a tumis.',
          },
          { type: 'h3', text: 'Finishing and drizzling — where extra virgin earns its price' },
          {
            type: 'p',
            text: 'Over hummus, on grilled fish, into a bowl of soup at the end, across sliced tomatoes with salt. No heat at all, so nothing is lost. If you only ever use extra virgin olive oil this way, you will still get the full benefit of what you paid for.',
          },
          { type: 'h3', text: 'Tumis and everyday stir-frying — yes, with limits' },
          {
            type: 'p',
            text: 'Extra virgin olive oil handles normal domestic sautéing perfectly well. A home tumis usually runs between 140°C and 180°C; a good extra virgin oil smokes somewhere above 190°C. The practical rule is simple: if the pan is smoking before the food goes in, the pan is too hot for any oil, not just this one.',
          },
          { type: 'h4', text: 'What about deep-frying keropok or ayam goreng?' },
          {
            type: 'p',
            text: 'Technically possible, economically silly. Deep-frying needs volume, and using a premium first cold pressed oil for a litre of frying medium wastes both the flavour and the polyphenols that made it worth buying. Keep a cheaper neutral oil for the deep fryer and reserve the extra virgin for everything else.',
          },
          { type: 'h3', text: 'Baking, kuih and dressings' },
          {
            type: 'p',
            text: 'Olive oil substitutes for butter or margarine in many bakes at roughly three-quarters the volume, and it gives a softer crumb the next day. In dressings it does the whole job on its own — olive oil, lime or vinegar, salt, and whatever herb is in the fridge.',
          },
          { type: 'h3', text: 'The daily spoon, skin and hair' },
          {
            type: 'p',
            text: 'A tablespoon in the morning, oil massaged into the scalp, a few drops on dry skin — these uses are common in Malaysian households and long predate the current trend. They are also the uses where the quality of the oil is most obvious, because there is nothing to hide behind.',
          },
        ],
      },
      {
        id: 'grades',
        heading: 'What "extra virgin" actually means — and why it matters more now',
        blocks: [
          {
            type: 'p',
            text: 'As the category grows, so does the range of things sold as "olive oil". The grades are defined internationally, not by marketing: the [International Olive Council](https://www.internationaloliveoil.org/) trade standard and the [Codex Alimentarius](https://www.fao.org/fao-who-codexalimentarius/en/) standard for olive oils set the chemistry and the sensory requirements.',
          },
          {
            type: 'table',
            head: ['Grade on the label', 'How it is made', 'What it means for you'],
            rows: [
              [
                'Extra virgin olive oil (EVOO)',
                'Mechanically pressed only, no heat above set limits, no solvents. Must be free of sensory defects and meet a low free-acidity limit.',
                'Full flavour, full aroma, highest natural antioxidant content. The grade worth paying for.',
              ],
              [
                'Virgin olive oil',
                'Same mechanical process, but wider acidity tolerance and minor sensory defects permitted.',
                'Fine for cooking, noticeably flatter when tasted on its own.',
              ],
              [
                '"Pure", "Light" or plain "Olive oil"',
                'A blend of refined olive oil with a small share of virgin oil. Refining uses heat and industrial processing.',
                '"Light" refers to flavour and colour, not calories. Nearly all the aroma and polyphenols are gone.',
              ],
              [
                'Olive pomace oil',
                'Extracted from the leftover pulp and skins using solvents, then refined.',
                'The cheapest tier. Legitimate as a frying oil, but not what most people picture when they buy "olive oil".',
              ],
            ],
          },
          { type: 'h4', text: 'Free acidity, in one paragraph' },
          {
            type: 'p',
            text: 'Free acidity measures how much the oil\'s fat molecules have broken down — from bruised fruit, slow pressing, or bad storage. It is expressed as a percentage of oleic acid. The extra virgin ceiling is 0.8%. Good producers land far below it; Arabian Village tests below 0.028%. A low number does not guarantee a delicious oil, but a high number guarantees a tired one.',
          },
        ],
      },
      {
        id: 'price-and-access',
        heading: 'Price, sizes and where Malaysians buy it',
        blocks: [
          {
            type: 'p',
            text: 'Compare olive oil per litre, not per bottle — that is the only way the shelf makes sense. A 500 ml bottle of genuine extra virgin oil sits in a different world from a 2-litre jug of refined blend, and the gap is not markup, it is what is in the bottle.',
          },
          {
            type: 'ul',
            items: [
              '**Halal grocery chains** — the route most Malaysian families take, because the staff can answer questions and the stock turns over quickly. Arabian Village is carried by [Berkat Madinah Store](https://madinah.com.my/en/), our official distributor in Malaysia.',
              '**Marketplaces** — Shopee and TikTok Shop, where reviews and live selling do the explaining. Check that the seller is the brand or its appointed distributor, not a third-party reseller of unknown stock age.',
              '**Direct from the brand** — fewer hands between the press and your kitchen, and usually the clearest information about harvest date and origin. See [where to buy Arabian Village](/shop).',
            ],
          },
          {
            type: 'note',
            title: 'A 500 ml bottle is not a small bottle',
            text: 'It is the right size for most households. Olive oil degrades once opened — light, heat and air are all working against it — so a bottle you finish in two months is better value than a jug you finish in a year, whatever the per-litre maths says.',
          },
        ],
      },
      {
        id: 'what-the-trend-means',
        heading: 'What a growing market means for how you choose',
        blocks: [
          {
            type: 'p',
            text: 'Growth attracts everybody, including sellers who rely on the word "olive" doing all the work. As the category expands in Malaysia, the burden shifts to the buyer to read past the front label.',
          },
          {
            type: 'ol',
            items: [
              'Read the grade wording exactly — "extra virgin" is a legal grade; "premium", "pure" and "light" are not.',
              'Look for a harvest date, not only a best-before date. Olive oil is a fresh product; its age matters more than its expiry.',
              'Check origin. A single named country or region beats "packed in" or "product of the EU", which can mean a blend from several harvests and several countries.',
              'Prefer dark glass or tin. Clear bottles under supermarket lighting age fastest.',
              'Taste it. Fresh extra virgin oil is fruity, slightly bitter, and peppery at the back of the throat. Flat, waxy or crayon-like means old.',
            ],
          },
          {
            type: 'p',
            text: 'We wrote a full walkthrough of that process — including the home tasting test — in [How to Choose Authentic Extra Virgin Olive Oil in Malaysia](/blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia).',
          },
        ],
      },
    ],

    conclusion: {
      heading: 'The bottom line',
      blocks: [
        {
          type: 'p',
          text: 'Olive oil is growing in Malaysia because it answers several questions at once: it fits a health conversation the country is already having, it clears the halal question instantly, it belongs to cuisines Malaysians have grown to love, and it now costs what a normal household can plan for.',
        },
        {
          type: 'p',
          text: 'The category maturing is good news, with one condition attached — a bigger shelf means more choices that are not what they claim to be. Learn the grade wording, look for a harvest date, and buy from someone who can tell you where the olives grew.',
        },
        {
          type: 'p',
          text: 'Arabian Village is first cold pressed extra virgin olive oil from centuries-old Palestinian groves, hand-harvested and pressed within hours of picking. You can read the full quality specification on our [products page](/products), see [why families trust us](/why-us), or [talk to us directly](/contact) about retail and wholesale.',
        },
      ],
    },

    faqs: [
      {
        q: 'Why is olive oil becoming so popular in Malaysia?',
        a: 'Four forces arrived together: growing public awareness of diet-related disease, the fact that pure olive oil is halal by nature and needs no explanation, the mainstreaming of Arab and Mediterranean food in Malaysian cities, and e-commerce making imported extra virgin olive oil available nationwide at transparent prices.',
      },
      {
        q: 'Is olive oil halal in Malaysia?',
        a: 'Pure olive oil is halal by nature. It is pressed fruit juice with no animal-derived ingredients, no alcohol and no additives. Buyers who want formal documentation normally look for JAKIM recognition on the importer or retailer rather than on the oil itself, since a single-ingredient plant oil raises no halal issue.',
      },
      {
        q: 'Can I use extra virgin olive oil for Malaysian cooking like tumis?',
        a: 'Yes. Home sautéing usually runs between 140°C and 180°C, comfortably below the smoke point of a good extra virgin olive oil. It is not the economical choice for deep-frying, where a large volume of cheaper neutral oil makes more sense and the premium oil\'s flavour would be wasted.',
      },
      {
        q: 'Is olive oil better than palm oil or coconut oil?',
        a: 'They are different fats with different jobs. Extra virgin olive oil is high in monounsaturated fat and carries natural polyphenols and vitamin E that survive because it is never refined. Palm and coconut oils are higher in saturated fat and handle very high heat better. Most Malaysian kitchens end up keeping more than one oil rather than replacing everything.',
      },
      {
        q: 'How much does olive oil cost in Malaysia?',
        a: 'Prices vary widely by grade, origin and bottle size, and change with import costs, so compare per litre rather than per bottle. Genuine extra virgin olive oil sits well above refined blends and pomace oil, because the price reflects hand harvesting, fast pressing and lower yield. Current Arabian Village pricing is shown on each official platform, including Berkat Madinah Store, Shopee and TikTok Shop.',
      },
      {
        q: 'Where can I buy authentic extra virgin olive oil in Malaysia?',
        a: 'Buy from the brand or its appointed distributor rather than an unknown reseller, so you know the harvest date and storage history. Arabian Village olive oil is distributed in Malaysia by Berkat Madinah Store, and is also available through the brand\'s official Shopee and TikTok Shop listings.',
      },
    ],

    related: [
      {
        label: 'Health Benefits of Extra Virgin Olive Oil for Malaysian Families',
        path: 'blog/extra-virgin-olive-oil-health-benefits-for-malaysian-families',
        description: 'What is actually in the bottle, what the evidence supports, and how to fit it into daily meals.',
      },
      {
        label: 'How to Choose Authentic Extra Virgin Olive Oil in Malaysia',
        path: 'blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia',
        description: 'Label wording, harvest dates, the home taste test, and the traps to avoid.',
      },
      {
        label: 'Arabian Village Olive Oil',
        path: 'products',
        description: 'First cold pressed extra virgin olive oil from centuries-old Palestinian groves.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'evoo-health-benefits-families',
    slug: 'extra-virgin-olive-oil-health-benefits-for-malaysian-families',

    seoTitle: 'Health Benefits of Extra Virgin Olive Oil for Malaysian Families',
    metaTitle: 'Extra Virgin Olive Oil: Health Benefits for Malaysian Families',
    metaDescription:
      'What extra virgin olive oil actually contains, what the evidence does and does not support, and practical ways Malaysian families use it — from sahur to school lunchboxes.',
    focusKeyword: 'extra virgin olive oil health benefits',
    relatedKeywords: [
      'olive oil benefits Malaysia',
      'manfaat minyak zaitun',
      'extra virgin olive oil benefits for heart',
      'olive oil for family health',
      'olive oil polyphenols',
      'is olive oil good for cholesterol',
      'olive oil daily tablespoon',
      'olive oil for children Malaysia',
      'healthy cooking oil Malaysia',
      'olive oil for skin and hair',
      'olive oil during Ramadan',
      'best olive oil for health Malaysia',
    ],

    category: 'Wellness & Health',
    tags: ['Health', 'Extra Virgin Olive Oil', 'Family Nutrition', 'Malaysian Kitchen', 'Ramadan'],

    h1: 'Health Benefits of Extra Virgin Olive Oil for Malaysian Families',
    excerpt:
      'A grounded look at what extra virgin olive oil contains, what health authorities are willing to say about it, and how Malaysian families realistically work it into daily meals.',
    keyTakeaway:
      'Extra virgin olive oil is roughly 70–80% monounsaturated fat and, because it is never refined, keeps natural polyphenols and vitamin E that refined oils lose. Health authorities including EFSA and the US FDA have accepted carefully worded claims about olive oil and heart health when it replaces saturated fat in the diet — replacement is the key word, not addition.',

    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    readingTime: 12,

    hero: {
      src: 'pouringField',
      alt: 'Pes zaitun keluar dari kilang perahan keluli dengan minyak hijau mengalir ke dalam tangki',
    },
    ogImage: '/og/blog-evoo-health-benefits-families.jpg',

    intro: [
      'Every few months a new oil is declared the healthiest thing in the kitchen. Olive oil is unusual in that it has survived forty years of that cycle, and it survived because the research kept pointing the same way rather than because the marketing was better.',
      'This article does two things. First, it explains what is physically in a bottle of extra virgin olive oil and why refining destroys most of it. Second, it stays honest about the limits — what regulators have actually approved as a health claim, and where the evidence stops.',
      'It is written for Malaysian households: our meals are rice-based, our cooking is hot and fast, we fast for a month a year, and our biggest diet-related health problems are well documented. Generic Mediterranean advice does not automatically transfer, so we have tried to make it transfer.',
    ],

    sections: [
      {
        id: 'whats-inside',
        heading: "What's actually inside extra virgin olive oil",
        blocks: [
          {
            type: 'p',
            text: 'Extra virgin olive oil is the juice of the olive fruit, separated mechanically and nothing more. No solvent, no bleaching, no deodorising. That matters because the compounds people care about are fragile, and industrial refining is precisely the process that removes them.',
          },
          { type: 'h3', text: 'Monounsaturated fat — the bulk of the bottle' },
          {
            type: 'p',
            text: 'Roughly 70 to 80% of extra virgin olive oil is oleic acid, a monounsaturated fatty acid. This is the part that survives refining, so even cheap olive oil has it. It is also the part that most dietary guidelines refer to when they recommend replacing saturated fats with unsaturated ones.',
          },
          { type: 'h3', text: 'Polyphenols — the part refining destroys' },
          {
            type: 'p',
            text: 'Fresh, well-made extra virgin olive oil carries phenolic compounds — hydroxytyrosol, tyrosol, oleocanthal, oleuropein derivatives. These are the source of the bitterness and the peppery catch at the back of the throat. They are antioxidants, they protect the oil itself from going rancid, and they are almost entirely absent from refined, "pure" or "light" olive oil.',
          },
          {
            type: 'note',
            title: 'The peppery cough is a feature',
            text: 'If a spoonful of olive oil makes you cough slightly, that is oleocanthal irritating the throat. Tasters call it "pungency" and count it as a positive attribute. A completely smooth, buttery oil with no bite is usually either very old or not extra virgin.',
          },
          { type: 'h3', text: 'Vitamin E and other minor compounds' },
          {
            type: 'p',
            text: 'Olive oil is a meaningful dietary source of vitamin E (alpha-tocopherol), plus squalene and plant sterols. Again, quantity depends on freshness and on the oil never having been heat-refined.',
          },
          { type: 'h3', text: 'What is not in it' },
          {
            type: 'p',
            text: 'No cholesterol — no plant oil contains cholesterol. No protein or carbohydrate worth counting. And in a genuine single-origin extra virgin oil, no other oils: adulteration with cheap seed oil is the classic olive oil fraud, which is why traceability is part of the health question, not separate from it.',
          },
        ],
      },
      {
        id: 'evidence',
        heading: 'What the evidence supports — and what it does not',
        blocks: [
          {
            type: 'p',
            text: 'This is where most olive oil articles overreach. Here is the careful version.',
          },
          { type: 'h3', text: 'Approved claims, stated accurately' },
          {
            type: 'ul',
            items: [
              '**Replacing saturated fat.** Dietary guidance internationally, including from [the World Health Organization](https://www.who.int/), supports replacing saturated fats with unsaturated fats to help maintain normal blood cholesterol levels. Olive oil is a straightforward way for a household to do that.',
              '**Olive oil polyphenols.** [The European Food Safety Authority](https://www.efsa.europa.eu/) has accepted a claim that olive oil polyphenols contribute to the protection of blood lipids from oxidative stress, at a defined daily intake of hydroxytyrosol and its derivatives — a level only genuine, polyphenol-rich extra virgin oil reaches.',
              '**Oleic acid and heart disease.** [The US Food and Drug Administration](https://www.fda.gov/) has permitted a *qualified* health claim about oleic acid in edible oils and the risk of coronary heart disease. "Qualified" means the FDA judged the evidence limited and required the claim to say so.',
            ],
          },
          { type: 'h3', text: 'Where the claims stop' },
          {
            type: 'p',
            text: 'Olive oil does not treat, cure or prevent any disease. It does not dissolve fat, reverse diabetes, or replace medication. Anyone selling it that way is telling you something about themselves, not about the oil. If you have a diagnosed condition, or you are managing cholesterol, blood pressure or blood sugar, the person to ask is your doctor or a registered dietitian — not a label.',
          },
          {
            type: 'p',
            text: 'It is also worth remembering that most of the well-known research studied a whole Mediterranean *dietary pattern* — vegetables, legumes, fish, whole grains, and olive oil as the main fat — not olive oil taken on its own alongside an otherwise unchanged diet.',
          },
          {
            type: 'note',
            title: 'Replacement, not addition',
            text: 'Olive oil is about 120 kcal per tablespoon, the same as any other oil. Adding it on top of what you already cook with adds calories. The benefit in every major guideline comes from using it *instead of* butter, margarine, ghee or a heavily saturated cooking fat.',
          },
        ],
      },
      {
        id: 'malaysian-context',
        heading: 'Why this matters for Malaysian families specifically',
        blocks: [
          {
            type: 'p',
            text: 'Malaysia has one of the higher rates of obesity and type 2 diabetes in the region, documented repeatedly in the National Health and Morbidity Survey and discussed openly in Ministry of Health campaigns on [MyHEALTH](https://www.myhealth.gov.my/). Non-communicable disease, not infection, is the dominant health burden.',
          },
          {
            type: 'p',
            text: 'Our food culture is also fat-heavy in ways that are easy to miss: santan in curries, deep-fried breakfast items, roti with margarine, and reused frying oil in the household wok. None of those need to disappear. But the fat used for everyday sautéing, dressing and finishing is a genuinely easy substitution — nobody has to give up a dish to make it.',
          },
          {
            type: 'p',
            text: 'That is the practical case for olive oil in a Malaysian kitchen. Not a diet overhaul. One ingredient swap that survives contact with real family cooking.',
          },
          {
            type: 'image',
            src: 'tasting',
            alt: 'A Malaysian man wearing a songkok evaluating the aroma of extra virgin olive oil from a blue tasting glass',
            caption:
              'Quality assessment starts with the nose. Fresh oil smells of grass, green fruit and sometimes tomato leaf.',
          },
        ],
      },
      {
        id: 'everyday-meals',
        heading: 'Fitting olive oil into everyday Malaysian meals',
        blocks: [
          { type: 'h3', text: 'Breakfast' },
          {
            type: 'ul',
            items: [
              'Olive oil instead of margarine on toast, with a pinch of salt or za\'atar.',
              'Scrambled or half-boiled eggs finished with a drizzle rather than fried in butter.',
              'Over oats or into a smoothie bowl — unexpected, but it works with dates and banana.',
            ],
          },
          { type: 'h3', text: 'Lunch and dinner' },
          {
            type: 'ul',
            items: [
              'Tumis your bawang, garlic and cili in olive oil at medium heat.',
              'Finish sup ayam, sup tulang or any broth with a spoonful off the heat — it carries aroma the way ghee does.',
              'Steamed or grilled fish with olive oil, lime and coriander instead of a heavy sauce.',
              'Toss ulam, salads and cucumber with olive oil, calamansi and salt.',
            ],
          },
          { type: 'h3', text: 'Children' },
          {
            type: 'p',
            text: 'Olive oil is fine for children as an ordinary cooking fat. Younger palates often find a strongly peppery oil too sharp on its own, so use it inside cooked food and dressings rather than as a spoonful. Infant feeding is a question for your paediatrician or klinik kesihatan, not for a food article.',
          },
          { type: 'h3', text: 'Older family members' },
          {
            type: 'p',
            text: 'For elderly relatives managing cholesterol or blood pressure under medical supervision, an oil swap is one of the least disruptive changes available — the food stays the same. Keep the doctor informed of dietary changes rather than substituting them for treatment.',
          },
          { type: 'h4', text: 'Ramadan, sahur and iftar' },
          {
            type: 'p',
            text: 'During fasting months many families deliberately keep sahur light and slow-digesting. Olive oil fits that: a spoonful with dates and yoghurt, or drizzled over sahur eggs, is a long-standing practice in Arab households and has become common in Malaysian ones. At iftar it is a way to make a spread feel rich without another round of deep-frying.',
          },
        ],
      },
      {
        id: 'heat-and-storage',
        heading: 'Heat, smoke point and storage — protecting what you paid for',
        blocks: [
          { type: 'h3', text: 'How much heat is too much' },
          {
            type: 'p',
            text: 'Good extra virgin olive oil has a smoke point above roughly 190°C, and its high antioxidant content makes it more stable under heat than its reputation suggests. Ordinary Malaysian sautéing sits below that. Sustained deep-frying at 200°C does not, and it also destroys the polyphenols you are paying for. Use a cheaper oil for the fryer.',
          },
          { type: 'h3', text: 'Storage is where most households lose quality' },
          {
            type: 'ol',
            items: [
              'Keep the bottle in a cupboard, not on the windowsill and not beside the stove. Light and heat are the two fastest killers.',
              'Close it properly. Oxygen does the slow damage.',
              'Do not refrigerate it — olive oil clouds and solidifies in the cold, which does no harm but makes it inconvenient.',
              'Finish an opened bottle within a couple of months. This is why a 500 ml bottle is often the smarter buy in a humid climate.',
            ],
          },
          {
            type: 'p',
            text: 'Malaysian kitchens are warm and humid year-round, so storage discipline matters more here than in a Mediterranean pantry. An excellent oil stored badly for six months is no longer an excellent oil.',
          },
        ],
      },
      {
        id: 'caution',
        heading: 'Who should be careful',
        blocks: [
          {
            type: 'ul',
            items: [
              'Anyone with a diagnosed condition or on medication for cholesterol, blood pressure or diabetes — discuss dietary changes with your doctor rather than self-managing.',
              'People managing weight: olive oil is energy-dense. Swap it in, do not stack it on.',
              'Anyone with a known allergy to olives or olive pollen, which is uncommon but real.',
              'People with gallbladder problems, who may be advised to moderate all fats.',
            ],
          },
          {
            type: 'p',
            text: 'Nothing on this page is medical advice. It is food information, written to be accurate about what is known and honest about what is not.',
          },
        ],
      },
    ],

    conclusion: {
      heading: 'The bottom line',
      blocks: [
        {
          type: 'p',
          text: 'Extra virgin olive oil is a well-studied, minimally processed fat that keeps compounds refining removes. Regulators have approved narrow, carefully worded claims about it and heart health, and those claims all rest on the same condition: use it in place of saturated fat, not in addition to it.',
        },
        {
          type: 'p',
          text: 'For a Malaysian family, the realistic version is one bottle by the stove, used for tumis, dressings and finishing, replacing margarine and part of the everyday cooking fat. That is a change a household can hold for years.',
        },
        {
          type: 'p',
          text: 'Quality decides how much of the good part is actually in your bottle — which is the subject of our guide to [choosing authentic extra virgin olive oil in Malaysia](/blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia). You can also read the full specification of [Arabian Village olive oil](/products) or see [where to buy it](/shop).',
        },
      ],
    },

    faqs: [
      {
        q: 'What are the main health benefits of extra virgin olive oil?',
        a: 'It is high in monounsaturated fat (mainly oleic acid) and, because it is never refined, retains polyphenols and vitamin E. EFSA has accepted that olive oil polyphenols help protect blood lipids from oxidative stress at a defined daily intake, and replacing saturated fat with unsaturated fat is supported by mainstream dietary guidance for maintaining normal blood cholesterol. It is a food, not a treatment for any condition.',
      },
      {
        q: 'How much olive oil should I use per day?',
        a: 'There is no single official figure. Many households use one to two tablespoons a day across cooking and dressing. Because olive oil carries about 120 kcal per tablespoon, the benefit comes from using it instead of butter, margarine or another cooking fat rather than adding it on top. Anyone managing weight or a medical condition should check with their doctor or dietitian.',
      },
      {
        q: 'Is extra virgin olive oil better than refined or "light" olive oil?',
        a: 'For nutrition, yes. Refined, "pure" and "light" olive oils are processed with heat and industrial refining, which removes nearly all the polyphenols and much of the aroma. The monounsaturated fat remains, but the antioxidant content that distinguishes olive oil largely does not. "Light" refers to flavour and colour, never to calories.',
      },
      {
        q: 'Can children in Malaysia have olive oil?',
        a: 'Yes, as an ordinary cooking fat in family meals. Strongly peppery oils can taste sharp to young children on their own, so it works better cooked into food or in dressings. Anything related to infant feeding should be discussed with a paediatrician or your klinik kesihatan.',
      },
      {
        q: 'Does cooking destroy the benefits of olive oil?',
        a: 'Normal home sautéing at 140–180°C keeps most of the value; a good extra virgin oil smokes above roughly 190°C and its own antioxidants make it more heat-stable than commonly assumed. Prolonged deep-frying does degrade the polyphenols, so use a cheaper neutral oil for the fryer and keep extra virgin for cooking, dressing and finishing.',
      },
      {
        q: 'Is olive oil good for skin and hair?',
        a: 'It is widely used in Malaysian and Arab households as a scalp and skin oil, and it is a traditional practice rather than a clinical treatment. If you use it on skin, apply a small amount first — some people find any oil occlusive or irritating, and anyone with a skin condition should ask a doctor before adding oils to a routine.',
      },
    ],

    related: [
      {
        label: 'How to Choose Authentic Extra Virgin Olive Oil in Malaysia',
        path: 'blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia',
        description: 'How to tell a real extra virgin oil from a refined blend before you pay for it.',
      },
      {
        label: 'Why Olive Oil Is Becoming More Popular in Malaysia',
        path: 'blog/why-olive-oil-is-becoming-popular-in-malaysia',
        description: 'The health, halal, cultural and commercial forces behind the shift.',
      },
      {
        label: 'Why Arabian Village',
        path: 'why-us',
        description: 'Traceable Palestinian origin, hand harvest, and a press within hours of picking.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'choose-authentic-evoo-malaysia',
    slug: 'how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia',

    seoTitle: 'How to Choose Authentic Extra Virgin Olive Oil in Malaysia',
    metaTitle: 'How to Choose Authentic Extra Virgin Olive Oil in Malaysia',
    metaDescription:
      'A practical Malaysian buyer\'s guide to real extra virgin olive oil: label wording, harvest dates, acidity, bottle type, the home taste test, honest pricing, and where to buy safely.',
    focusKeyword: 'authentic extra virgin olive oil Malaysia',
    relatedKeywords: [
      'how to choose olive oil',
      'real vs fake olive oil',
      'best extra virgin olive oil Malaysia',
      'olive oil label meaning',
      'olive oil acidity level',
      'first cold pressed olive oil',
      'olive oil harvest date',
      'pure vs extra virgin olive oil',
      'olive pomace oil',
      'buy olive oil Malaysia online',
      'minyak zaitun asli',
      'olive oil taste test',
    ],

    category: 'Buying Guide',
    tags: ['Buying Guide', 'Extra Virgin Olive Oil', 'Authenticity', 'Olive Oil Malaysia', 'Labels'],

    h1: 'How to Choose Authentic Extra Virgin Olive Oil in Malaysia',
    excerpt:
      'Everything on the front of the bottle is marketing. This is how to read the back, run a two-minute taste test, and buy an olive oil that is what it says it is.',
    keyTakeaway:
      'To buy authentic extra virgin olive oil in Malaysia: check that the label says exactly "extra virgin olive oil", look for a harvest date and a single named country of origin, prefer dark glass or tin, be suspicious of a price far below the category, and taste it — real extra virgin oil is fruity, bitter and peppery, never flat or waxy.',

    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    readingTime: 13,

    hero: {
      src: 'bottling',
      alt: 'Pokok zaitun di lereng bukit ketika senja, ladang menuruni bukit ke arah laut',
    },
    ogImage: '/og/blog-choose-authentic-evoo-malaysia.jpg',

    intro: [
      'Olive oil is one of the most adulterated foods in global trade. Not usually in a dramatic, dangerous way — more often it is a refined oil sold at extra virgin prices, an old oil sold as a new harvest, or a blend from four countries sold under an Italian-sounding name.',
      'Malaysia imports all of its olive oil, which means the buyer here has less context than a shopper in Andalusia and more distance between the press and the shelf. The good news is that you do not need a laboratory. You need to know which four things on the label are meaningful, and you need two minutes and a spoon.',
      'This is the checklist we use ourselves.',
    ],

    sections: [
      {
        id: 'why-authenticity',
        heading: 'Why authenticity is a real problem, not a scare story',
        blocks: [
          {
            type: 'p',
            text: 'Extra virgin olive oil is expensive to produce: hand or careful mechanical harvest, pressing within hours, low yield, and no way to rescue a bad batch through refining. Refined oil is cheap to produce and nearly flavourless, which makes it easy to pass off once it is in a green bottle with a rustic label.',
          },
          {
            type: 'p',
            text: 'The categories are defined internationally — by the [International Olive Council](https://www.internationaloliveoil.org/) trade standard and the [Codex Alimentarius](https://www.fao.org/fao-who-codexalimentarius/en/) standard for olive oils — but enforcement happens at the point of production and import, not in your kitchen. Which is why the label wording matters so much.',
          },
        ],
      },
      {
        id: 'read-the-label',
        heading: 'Step 1: Read the label properly',
        blocks: [
          { type: 'h3', text: 'The grade wording is the only part that is regulated' },
          {
            type: 'p',
            text: 'Look for the exact phrase **"extra virgin olive oil"**. Anything else is a different product, no matter how premium it sounds.',
          },
          {
            type: 'table',
            head: ['What the label says', 'What it actually is'],
            rows: [
              ['Extra virgin olive oil', 'Top grade. Mechanical extraction only, no defects, free acidity at or below 0.8%.'],
              ['Virgin olive oil', 'Same extraction method, looser acidity limit and minor sensory defects allowed.'],
              ['Olive oil / "Pure" olive oil', 'A blend of refined olive oil with a little virgin oil. Refined means heat and industrial processing.'],
              ['Light / Extra light olive oil', 'Refined blend. "Light" describes colour and flavour. Identical calories to any other oil.'],
              ['Olive pomace oil', 'Solvent-extracted from spent pulp and skins, then refined. The cheapest tier.'],
              ['"Premium", "Gold", "Classic", "Imported"', 'Marketing. No legal meaning whatsoever.'],
            ],
          },
          {
            type: 'note',
            title: 'The single most common trap',
            text: 'A bottle labelled just "Olive Oil" in large type with "extra virgin" nowhere on it is a refined blend. It is not fake and not unsafe — it is simply a lower grade being sold beside a higher one, and shoppers in a hurry read the word "olive" and stop there.',
          },
          { type: 'h3', text: 'Harvest date beats expiry date' },
          {
            type: 'p',
            text: 'Olive oil is a fresh juice, not a preserved product. A best-before date tells you when the packer decided to stop guaranteeing it — usually 18 to 24 months after bottling, which may be a year after the olives were picked. A **harvest date** or crop year tells you the truth. Prefer the most recent harvest available; northern-hemisphere olives are typically picked between October and January.',
          },
          { type: 'h3', text: 'Origin should be one place, named' },
          {
            type: 'p',
            text: 'A single country or region — Palestine, Jaén, Kalamata, Sfax — means someone is accountable for that oil. Phrasing like "packed in Italy", "bottled in the EU" or "blend of EU and non-EU olive oils" is legal and common, but it tells you the oil may come from several countries and several harvests, mixed for price stability rather than for taste.',
          },
          { type: 'h3', text: 'Acidity and "first cold pressed", if stated' },
          {
            type: 'p',
            text: 'Free acidity is a lab measure of fat breakdown, written as a percentage. The extra virgin ceiling is 0.8%. Serious producers publish a much lower figure — Arabian Village tests below 0.028%. "First cold pressed" means the oil came from a single mechanical extraction without added heat; it is a real distinction from refined oil, though on its own it does not guarantee flavour.',
          },
          { type: 'h4', text: 'What about certifications?' },
          {
            type: 'p',
            text: 'Organic marks, PDO/PGI region marks and halal recognition each tell you something narrow and specific. None of them is a substitute for grade, harvest date and origin. Be equally wary of the opposite error — assuming an oil is inferior because a small producer has not paid for a certification scheme.',
          },
        ],
      },
      {
        id: 'the-bottle',
        heading: 'Step 2: Judge the packaging',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Dark glass or tin.** Light drives oxidation. A clear bottle sitting under retail lighting for months is an oil that has already aged.',
              '**Sensible size.** 250–500 ml for a household that finishes a bottle in weeks; larger tins only if you genuinely cook with volume. A part-used 3-litre jug is a slow disappointment.',
              '**A proper seal.** Tamper-evident closure, clean fill line, no residue or leakage around the neck.',
              '**Real information on the back.** Producer name and address, country of origin, grade, lot number. A back label with nothing but an importer sticker is a back label hiding something.',
            ],
          },
          {
            type: 'image',
            src: 'filtering',
            alt: 'Golden green olive oil being filtered and settled after the first cold press',
            caption: 'Between press and bottle, every extra step and extra week costs the oil something.',
          },
        ],
      },
      {
        id: 'taste-test',
        heading: 'Step 3: Taste it — the two-minute home test',
        blocks: [
          {
            type: 'p',
            text: 'Professional tasters use a blue glass so colour cannot bias them. You can do a rough version at home, and it is by far the most revealing thing on this list.',
          },
          {
            type: 'ol',
            items: [
              'Pour about a tablespoon into a small glass and cup your hand over the top.',
              'Warm it against your palm for twenty or thirty seconds, then swirl.',
              'Uncover and smell. You are looking for green grass, fresh-cut leaf, green tomato, artichoke, sometimes green almond or apple.',
              'Sip a small amount, draw air in over it, and let it coat your mouth.',
              'Swallow and pay attention to the finish at the back of the throat.',
            ],
          },
          { type: 'h3', text: 'The three positive attributes' },
          {
            type: 'ul',
            items: [
              '**Fruity** — the smell and taste of fresh olives. Anything from green and grassy to ripe and sweet.',
              '**Bitter** — a clean bitterness across the tongue, from the phenolic compounds.',
              '**Pungent** — the peppery catch that can make you cough. This is oleocanthal. It is a good sign, not a fault.',
            ],
          },
          { type: 'h3', text: 'The defects that should send it back' },
          {
            type: 'ul',
            items: [
              '**Rancid** — old crayons, stale nuts, putty. The most common defect by far, and the sign of an oil that is simply too old.',
              '**Fusty** — a heavy, sweaty, fermented smell, from olives left in heaps too long before pressing.',
              '**Musty or mouldy** — damp cardboard, wet cupboard.',
              '**Winey or vinegary** — sharp, fermented, sour.',
              '**Flat and greasy** with no aroma at all — usually a refined oil, whatever the front label claims.',
            ],
          },
          {
            type: 'note',
            title: 'Ignore colour completely',
            text: 'Green does not mean fresh and gold does not mean old. Colour comes from olive variety and ripeness at harvest, which is exactly why professional tasting glasses are tinted blue.',
          },
        ],
      },
      {
        id: 'price',
        heading: 'Step 4: Sanity-check the price',
        blocks: [
          {
            type: 'p',
            text: 'Real extra virgin olive oil has a cost floor. Olives must be harvested at the right moment, transported quickly, pressed within hours, and stored carefully — and roughly five to ten kilograms of olives produce a single litre of oil. When a bottle is priced far below every comparable extra virgin oil on the shelf, something in that chain was skipped.',
          },
          {
            type: 'p',
            text: 'Convert everything to price per litre before comparing, and compare like with like: extra virgin against extra virgin, not against a refined blend in a bigger bottle. Then weigh in origin, harvest year and packaging. The cheapest genuine extra virgin oil in a category is usually a reasonable buy; the one that is half the price of everything else is usually not in the same category at all.',
          },
        ],
      },
      {
        id: 'where-to-buy',
        heading: 'Step 5: Buy from somewhere accountable',
        blocks: [
          {
            type: 'p',
            text: 'Where you buy affects what you get, because storage and stock rotation happen before you ever see the bottle.',
          },
          {
            type: 'ul',
            items: [
              '**The brand or its appointed distributor.** Fewest hands, clearest provenance, and someone who can answer a question about harvest date. Arabian Village is distributed in Malaysia by [Berkat Madinah Store](https://madinah.com.my/en/), a halal Arab food company established in 2010.',
              '**Official marketplace stores.** Shopee and TikTok Shop listings run by the brand or distributor, not by an unrelated reseller. Check the store name, not just the product photo.',
              '**Halal grocers with fast turnover.** A busy shelf is a fresh shelf. A dusty bottle in a quiet aisle has been ageing under the lights.',
            ],
          },
          {
            type: 'p',
            text: 'All the official Arabian Village channels are listed on our [shop page](/shop), and you can [contact us directly](/contact) for retail or wholesale enquiries.',
          },
        ],
      },
      {
        id: 'storage',
        heading: 'Step 6: Do not undo it at home',
        blocks: [
          {
            type: 'ol',
            items: [
              'Store in a dark cupboard, away from the stove. Heat and light are the enemies.',
              'Keep the cap on tight — oxygen degrades oil slowly but permanently.',
              'Do not decant into a clear jar on the counter, however good it looks.',
              'No refrigeration needed. Cloudiness in cold air is normal and harmless.',
              'Finish an opened bottle within about two months in Malaysia\'s warm, humid climate.',
            ],
          },
        ],
      },
      {
        id: 'checklist',
        heading: 'The 10-point checklist',
        blocks: [
          {
            type: 'ol',
            items: [
              'The label says exactly "extra virgin olive oil".',
              'There is a harvest date or crop year, and it is recent.',
              'Origin is a single named country or region.',
              'Free acidity is stated, and it is well under 0.8%.',
              'The bottle is dark glass or tin.',
              'The size matches how fast your household actually cooks.',
              'The back label names a real producer, not only an importer.',
              'The price is in the same range as other genuine extra virgin oils.',
              'It smells of fresh green fruit — and tastes fruity, bitter and peppery.',
              'You bought it from the brand, its distributor, or an official store.',
            ],
          },
        ],
      },
    ],

    conclusion: {
      heading: 'The bottom line',
      blocks: [
        {
          type: 'p',
          text: 'Choosing authentic extra virgin olive oil in Malaysia comes down to four label facts — grade, harvest date, origin, acidity — one packaging check, and one taste test. Nothing on the front of the bottle is evidence of anything.',
        },
        {
          type: 'p',
          text: 'Do it once carefully and you will recognise a good oil by smell alone from then on. The peppery bite you learn to expect is the same compound the research keeps returning to, which is a neat coincidence: the oil that tastes most alive is generally the one worth buying.',
        },
        {
          type: 'p',
          text: 'Arabian Village is first cold pressed extra virgin olive oil from centuries-old Palestinian groves, hand-harvested and pressed within hours, with acidity tested below 0.028%. See the [full product details](/products), read [why families trust us](/why-us), or find [where to buy](/shop).',
        },
      ],
    },

    faqs: [
      {
        q: 'How can I tell if olive oil is real extra virgin?',
        a: 'Check that the label says exactly "extra virgin olive oil", that it carries a recent harvest date and a single named country of origin, and that free acidity is stated well below the 0.8% limit. Then taste it: genuine extra virgin oil smells of fresh green fruit and tastes fruity, bitter and peppery. Flat, waxy or crayon-like flavour means it is old or refined.',
      },
      {
        q: 'What is the difference between extra virgin, pure and light olive oil?',
        a: 'Extra virgin is extracted mechanically with no heat or solvents and must be free of sensory defects. "Pure" olive oil and "light" olive oil are blends of refined oil with a small amount of virgin oil; refining uses heat and industrial processing, removing most of the aroma and polyphenols. "Light" refers to flavour and colour, not to calories — all olive oils have roughly the same energy content.',
      },
      {
        q: 'Does the colour of olive oil show its quality?',
        a: 'No. Colour depends on olive variety and how ripe the fruit was at harvest, not on quality or freshness. Professional tasters use blue glasses precisely so colour cannot influence their judgement. Rely on aroma and taste instead.',
      },
      {
        q: 'Is cheap olive oil in Malaysia fake?',
        a: 'Not necessarily fake, but a very low price usually means a different grade — refined blends or pomace oil sold alongside extra virgin. Genuine extra virgin oil has a cost floor because roughly five to ten kilograms of olives yield one litre, and the fruit must be pressed within hours. Compare price per litre and only against other extra virgin oils.',
      },
      {
        q: 'What does "first cold pressed" mean?',
        a: 'It means the oil was extracted mechanically in a single pressing without added heat, so nothing was cooked out of it. It is a genuine distinction from refined oil. On its own it does not prove quality — pair it with a recent harvest date, a named origin and a low acidity figure.',
      },
      {
        q: 'Where can I buy authentic extra virgin olive oil in Malaysia?',
        a: 'Buy from the brand or its appointed distributor rather than an unknown reseller, so provenance and stock age are traceable. Arabian Village olive oil is distributed in Malaysia by Berkat Madinah Store (madinah.com.my), and is also sold through the brand\'s official Shopee and TikTok Shop listings.',
      },
    ],

    related: [
      {
        label: 'Health Benefits of Extra Virgin Olive Oil for Malaysian Families',
        path: 'blog/extra-virgin-olive-oil-health-benefits-for-malaysian-families',
        description: 'What is inside the bottle, and what health authorities actually say about it.',
      },
      {
        label: 'Why Olive Oil Is Becoming More Popular in Malaysia',
        path: 'blog/why-olive-oil-is-becoming-popular-in-malaysia',
        description: 'The forces that turned a specialty import into a pantry staple.',
      },
      {
        label: 'Where to Buy',
        path: 'shop',
        description: 'Berkat Madinah Store, Shopee and TikTok Shop — every official channel.',
      },
      {
        "label": "Olive oil shelf life: how long a bottle lasts",
        "path": "blog/olive-oil-shelf-life-how-long-a-bottle-lasts",
        "description": "Harvest date against best-before, and what a Malaysian kitchen does to both."
      },
      {
        "label": "Why does olive oil taste bitter",
        "path": "blog/why-does-olive-oil-taste-bitter",
        "description": "Bitterness and the peppery catch as signs of a young oil, not a spoiled one."
      }
    ],
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "cold-pressed-olive-oil-explained",
    "slug": "what-cold-pressed-olive-oil-really-means",
    "seoTitle": "Cold Pressed Olive Oil: What It Really Means",
    "metaTitle": "Cold Pressed Olive Oil: What It Really Means",
    "metaDescription": "Cold pressed olive oil describes a temperature limit and no solvents — not a grade. What it guarantees, what it doesn't, and how to read a Malaysian label.",
    "focusKeyword": "cold pressed olive oil",
    "relatedKeywords": [
      "what is cold pressed olive oil",
      "cold pressed extra virgin olive oil",
      "first cold pressed olive oil",
      "cold extracted olive oil",
      "cold pressed vs refined olive oil",
      "cold pressed olive oil Malaysia",
      "olive oil extraction temperature",
      "how to read an olive oil label",
      "olive oil grades explained",
      "buy cold pressed olive oil Malaysia"
    ],
    "category": "Olive oil basics",
    "tags": [
      "cold pressed",
      "extra virgin",
      "olive oil labels",
      "buying guide",
      "Malaysia"
    ],
    "h1": "What cold pressed olive oil really means",
    "excerpt": "Cold pressed describes how the oil left the olive — mechanically, under a temperature ceiling, with no solvents — and this guide shows what that does and does not tell you about the bottle in your hand.",
    "keyTakeaway": "Cold pressed olive oil is oil separated from the fruit by mechanical means alone, with the olive paste kept below a set temperature and no chemical solvent used at any point. It describes the extraction method only. It is not a quality grade, and it says nothing about how fresh the oil is.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 4,
    "hero": {
      "src": "pressColdPressedOliveOilExplainedHero",
      "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
    },
    "ogImage": "/og/blog-cold-pressed-olive-oil-explained.jpg",
    "intro": [
      "Cold pressed is printed on almost every good olive oil bottle in Malaysia, and most shoppers read it as praise. It is a description: of what machinery touched the fruit, and how warm it was allowed to get.",
      "Here is what the term covers, what it does not, and how to check a bottle before paying."
    ],
    "sections": [
      {
        "heading": "What does cold pressed olive oil actually mean?",
        "id": "what-cold-pressed-means",
        "blocks": [
          {
            "type": "p",
            "text": "Cold pressed means the oil was separated from the olives by mechanical force alone — crushing, churning and spinning — with the paste held below a fixed temperature ceiling, set at 27°C in European labelling rules. No heat is used to lift the yield, because heat takes the volatile aromas with it, and no solvent touches the fruit."
          },
          {
            "type": "image",
            "src": "pressColdPressedOliveOilExplainedInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "Is cold pressed the same as extra virgin?",
        "id": "cold-pressed-vs-extra-virgin",
        "blocks": [
          {
            "type": "p",
            "text": "No. Cold pressed describes the extraction. Extra virgin is a grade the finished oil earns after laboratory and taste-panel checks, including a limit on free acidity and zero sensory defects. An oil can be genuinely cold pressed and still miss extra virgin if the fruit arrived bruised."
          },
          {
            "type": "p",
            "text": "The fullest label phrase is therefore cold pressed extra virgin olive oil — method and result in one line. Arabian Village is a single-origin Palestinian [cold-pressed extra virgin olive oil](/products)."
          },
          {
            "type": "image",
            "src": "pressColdPressedOliveOilExplainedInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "What does cold pressed not guarantee?",
        "id": "what-it-does-not-guarantee",
        "blocks": [
          {
            "type": "p",
            "text": "It does not guarantee freshness, grade, or where the olives grew. Extraction takes hours; the oil then spends months or years in tanks, bottles, containers and on shop shelves. Everything after the mill is invisible to the words cold pressed, and that is where most oil goes wrong."
          },
          {
            "type": "ul",
            "items": [
              "**Harvest date** — three-season-old oil is still cold pressed.",
              "**Grade** — no acidity limit, no taste panel.",
              "**Origin** — the bottler's country, not the olives'.",
              "**Storage** — clear glass under shop lights undoes the milling."
            ]
          },
          {
            "type": "image",
            "src": "pressColdPressedOliveOilExplainedInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "How is cold pressed different from refined olive oil?",
        "id": "cold-pressed-vs-refined",
        "blocks": [
          {
            "type": "p",
            "text": "Refined olive oil starts as oil that failed the virgin grades. It is corrected with heat — and for pomace oil with chemical solvent — until the defects are stripped out. What returns is close to neutral: pale, mild, almost odourless. Cold pressed oil is never corrected."
          },
          {
            "type": "table",
            "head": [
              "Compare",
              "Cold pressed",
              "Refined"
            ],
            "rows": [
              [
                "Extraction",
                "Mechanical only",
                "Chemically corrected"
              ],
              [
                "Heat",
                "Under 27°C",
                "High heat in refining"
              ],
              [
                "Solvents",
                "None",
                "Used for pomace oil"
              ],
              [
                "Flavour",
                "Grassy, peppery, varies",
                "Neutral, consistent"
              ],
              [
                "Label words",
                "Cold pressed, extra virgin",
                "Pure, light, pomace"
              ],
              [
                "Kitchen use",
                "Dressing and finishing",
                "Deep frying"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressColdPressedOliveOilExplainedInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "What about first cold pressed and cold extracted?",
        "id": "first-cold-pressed-and-cold-extracted",
        "blocks": [
          {
            "type": "p",
            "text": "First cold pressed survives from the era of stone mills and press mats, when a second, hotter pressing squeezed the leftovers. Modern mills run one continuous centrifuge, so there is no second pressing to be first of. Cold extracted is the honest modern wording for that method."
          },
          {
            "type": "image",
            "src": "pressColdPressedOliveOilExplainedInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "How do I check a bottle in a Malaysian shop?",
        "id": "checking-a-bottle-in-malaysia",
        "blocks": [
          {
            "type": "p",
            "text": "Read the label in a fixed order: grade, origin, date, packaging, price per litre. Cold pressed on its own is the weakest of those signals, because it is the one claim nobody can verify at the counter. The other four take seconds."
          },
          {
            "type": "ul",
            "items": [
              "**Grade** — extra virgin, not just olive oil.",
              "**Origin** — a named country or region.",
              "**Date** — a harvest date, not a best-before.",
              "**Packaging** — dark glass or tin, never plastic.",
              "**Price per litre** — convert sizes before comparing."
            ]
          },
          {
            "type": "image",
            "src": "pressColdPressedOliveOilExplainedInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          },
          {
            "type": "p",
            "text": "On our own bottles, RM59.00 for 250 ml is RM236 a litre; RM103.00 for 500 ml is RM206. The [full range](/shop) prices the same by size across the classic oil and every Infused Collection flavour, and our [sourcing story](/why-us) covers origin."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "So does cold pressed matter?",
      "blocks": [
        {
          "type": "p",
          "text": "Cold pressed is one line in the paragraph, not the whole paragraph. It tells you the oil was never heated or chemically corrected; it says nothing about freshness, grade or storage. Keep reading the label — our guide to [choosing authentic extra virgin olive oil in Malaysia](/blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia) covers the rest."
        }
      ]
    },
    "faqs": [
      {
        "q": "What is cold pressed olive oil in simple terms?",
        "a": "It is olive oil crushed and spun out of the fruit by machines alone, with the paste kept below a set temperature and no chemicals involved. The phrase describes how the oil was made — not how fresh it is, nor how good it turned out."
      },
      {
        "q": "Is cold pressed olive oil better than extra virgin?",
        "a": "They are not competing. Cold pressed describes the extraction method; extra virgin is a grade the oil earns through acidity testing and a sensory panel. The strongest label carries both, as cold pressed extra virgin olive oil. Seeing one means the other is unstated."
      },
      {
        "q": "Can I fry with cold pressed olive oil?",
        "a": "Yes for pan frying, sautéing and roasting at ordinary kitchen temperatures. It is a poor choice for deep frying: sustained high heat drives off the aromas you paid for and eventually pushes the oil past its smoke point. Refined oils sit higher and cost less."
      },
      {
        "q": "Why does cold pressed olive oil cost more?",
        "a": "Working cold gives a lower yield, so the same tonnage of olives produces less oil. Good fruit also has to reach the mill quickly after picking, which limits how far it travels. Add single-origin sourcing and shipping to Malaysia, and the price per litre climbs."
      },
      {
        "q": "Why did my olive oil turn cloudy in the fridge?",
        "a": "Olive oil is a mixture of fats that solidify at different temperatures, so chilling produces a cloud or soft crystals. The change is physical and reverses at room temperature. Refrigeration is unnecessary in Malaysia anyway; a cool, dark cupboard away from the stove suits it better."
      },
      {
        "q": "Where can I buy cold pressed olive oil in Malaysia?",
        "a": "Arabian Village is distributed by Berkat Madinah Store, trading since 2010. Both branches, Ampang Jaya and the larger Batu Caves store, open 8:00 am to 12:00 midnight daily, though festive days such as Hari Raya can differ. [Message the store](/contact) on WhatsApp at +60 11-1111 9912."
      }
    ],
    "related": [
      {
        "label": "Arabian Village olive oil range",
        "path": "products",
        "description": "Single-origin Palestinian cold-pressed extra virgin olive oil, in 250 ml and 500 ml."
      },
      {
        "label": "How to choose authentic extra virgin olive oil in Malaysia",
        "path": "blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "description": "The label checks that matter once you know what cold pressed does and does not cover."
      },
      {
        "label": "Where to buy and current prices",
        "path": "shop",
        "description": "Branch counters, opening hours, and the price of every size and flavour."
      },
      {
        "label": "Olive oil vs pomace oil",
        "path": "blog/olive-oil-vs-pomace-oil-what-the-grades-mean",
        "description": "What pomace, refined and \"extra light\" mean on a label, and how the grades differ."
      },
      {
        "label": "Olive oil for cakes and baking",
        "path": "blog/olive-oil-for-cakes-and-baking",
        "description": "The butter-to-oil conversion, and which bakes suit a fruity oil."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "compare-olive-oil-brands-malaysia",
    "slug": "how-to-compare-olive-oil-brands-in-malaysia",
    "seoTitle": "Best Olive Oil in Malaysia: How to Compare Bottles",
    "metaTitle": "Best Olive Oil in Malaysia: How to Compare Bottles",
    "metaDescription": "Hunting the best olive oil in Malaysia? Six checks for any bottle in ninety seconds: grade, harvest date, glass, origin, price per litre, importer.",
    "focusKeyword": "best olive oil in malaysia",
    "relatedKeywords": [
      "best extra virgin olive oil in malaysia",
      "best olive oil brand in malaysia",
      "olive oil brand in malaysia",
      "how to choose olive oil",
      "olive oil grades",
      "olive oil label Malaysia",
      "extra virgin vs pure olive oil",
      "olive oil harvest date",
      "olive oil price per litre Malaysia",
      "dark glass olive oil bottle"
    ],
    "category": "Buying guides",
    "tags": [
      "olive oil",
      "buying guide",
      "labels",
      "Malaysia"
    ],
    "h1": "How to Find the Best Olive Oil in Malaysia Without Trusting a Ranking",
    "excerpt": "A six-point shelf checklist covering grade, harvest date, packaging, origin, price per litre and importer, ready to use on any bottle of olive oil sold in Malaysia.",
    "keyTakeaway": "There is no single best olive oil in Malaysia. There is the bottle that answers six questions honestly: does it say extra virgin, does it carry a harvest date, is the glass dark, does it name one origin, what is the price per litre, and who imports it.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 4,
    "hero": {
      "src": "pressCompareOliveOilBrandsMalaysiaHero",
      "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
    },
    "ogImage": "/og/blog-compare-olive-oil-brands-malaysia.jpg",
    "intro": [
      "Search for the best olive oil in Malaysia and you get lists. Stand at the shelf and you get bottles, RM20 to RM200, all printing the same reassuring words.",
      "This article ranks nobody. It gives you six checks to run yourself on any bottle, in any shop, in ninety seconds."
    ],
    "sections": [
      {
        "heading": "Which grade should be printed on the label?",
        "id": "grades",
        "blocks": [
          {
            "type": "p",
            "text": "Look for the words **extra virgin** and nothing softer. Extra virgin oil is pressed from olives without heat or chemical treatment, and it is the top culinary grade. Virgin, pure, light and pomace sit below it. A bottle saying only *olive oil* is not extra virgin."
          },
          {
            "type": "ul",
            "items": [
              "**Extra virgin**: pressed, unrefined, top culinary grade.",
              "**Virgin**: unrefined, looser standard.",
              "**Pure** or plain **olive oil**: refined, with some virgin oil blended back.",
              "**Pomace**: drawn from what is left after pressing.",
              "**Light**: colour and taste, never a grade."
            ]
          },
          {
            "type": "image",
            "src": "pressCompareOliveOilBrandsMalaysiaInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "What date should you be looking for?",
        "id": "dates",
        "blocks": [
          {
            "type": "p",
            "text": "Two dates exist and they are not interchangeable. The **harvest date** says when the olives were picked. The **best-before date** says when the bottler expects the oil to fade. Olive oil does not improve with age, so a recent harvest tells you more than a distant expiry."
          },
          {
            "type": "p",
            "text": "A label carrying neither date is asking you to trust it blind."
          },
          {
            "type": "image",
            "src": "pressCompareOliveOilBrandsMalaysiaInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "Does dark glass matter, or is it just packaging?",
        "id": "packaging",
        "blocks": [
          {
            "type": "p",
            "text": "It matters. Light and heat turn olive oil stale, and clear glass or plastic gives both a free pass under bright shop lighting. Dark glass, tins and boxed bottles slow that down. A bottle beside a window has had a different life from one in a cool aisle, so reach behind the front row."
          },
          {
            "type": "image",
            "src": "pressCompareOliveOilBrandsMalaysiaInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "How do you compare prices across different bottle sizes?",
        "id": "price-per-litre",
        "blocks": [
          {
            "type": "p",
            "text": "Convert every bottle to a price per litre before comparing anything. Small bottles almost always cost more per litre than large ones, so the cheapest shelf price can be the most expensive oil. Divide price by volume in litres, and a confusing shelf sorts itself into order."
          },
          {
            "type": "table",
            "head": [
              "Bottle size",
              "Price",
              "Works out to"
            ],
            "rows": [
              [
                "250 ml",
                "RM59.00",
                "RM236 per litre"
              ],
              [
                "500 ml",
                "RM103.00",
                "RM206 per litre"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressCompareOliveOilBrandsMalaysiaInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          },
          {
            "type": "p",
            "text": "Those [Arabian Village prices](/shop) hold by size for the classic oil and every [infused flavour](/products/infused-extra-virgin-olive-oil-wild-thyme). Run the same arithmetic on anything else."
          }
        ]
      },
      {
        "heading": "What does the label really say about origin?",
        "id": "origin",
        "blocks": [
          {
            "type": "p",
            "text": "Read for two separate facts: where the olives grew, and where the oil was bottled. A label can name a European bottling address while the olives arrived from three countries. Single-origin oil names one place. *Packed in* is not the same as *grown in*."
          },
          {
            "type": "p",
            "text": "**Product of** points at origin; **bottled in** points at logistics. Arabian Village is single-origin Palestinian, cold pressed, and you can read [how it is pressed](/why-us) rather than guess."
          },
          {
            "type": "image",
            "src": "pressCompareOliveOilBrandsMalaysiaInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "What is the ninety-second checklist for any bottle?",
        "id": "checklist",
        "blocks": [
          {
            "type": "p",
            "text": "Turn the bottle around and answer six questions. Does it say extra virgin? Is there a harvest date? Is the glass dark? Does it name one origin? What is the price per litre? Who imports it? A bottle answering all six is being straight with you."
          },
          {
            "type": "ol",
            "items": [
              "Grade: extra virgin, unqualified.",
              "Date: harvest first, best-before second.",
              "Bottle: dark glass or tin.",
              "Origin: one named country.",
              "Price per litre: worked out, not eyeballed.",
              "Importer: a distributor you can contact."
            ]
          },
          {
            "type": "image",
            "src": "pressCompareOliveOilBrandsMalaysiaInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          },
          {
            "type": "note",
            "title": "Two different questions",
            "text": "This checklist assumes the bottle is genuine. That is a separate test, covered in [spotting authentic extra virgin olive oil](/blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Read the shelf, not the ranking",
      "blocks": [
        {
          "type": "p",
          "text": "The best olive oil in Malaysia is not a title one bottle holds. It is whichever bottle answers the six questions honestly at a price per litre you are happy to pay. Learn the checklist once and you never need anyone else's list."
        },
        {
          "type": "p",
          "text": "Questions about an Arabian Village bottle? The distributor answers on WhatsApp at +60 11-1111 9912, or [visit a branch](/contact) in Ampang Jaya or Batu Caves."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is the most expensive olive oil always the better one?",
        "a": "Not automatically. Price reflects bottle size, grade, origin and import cost at once, and a small bottle inflates the per-litre figure. Work out price per litre first, then check grade, date and origin. A cheap bottle that answers all three still wins."
      },
      {
        "q": "What is the difference between extra virgin and pure olive oil?",
        "a": "Extra virgin is pressed from olives without heat or chemical treatment and is the top culinary grade. Oil labelled pure, or simply olive oil, has been refined and blended with a little virgin oil. They taste different and the price gap is real."
      },
      {
        "q": "Should I buy the 250 ml or the 500 ml bottle?",
        "a": "Arabian Village sells 250 ml at RM59.00 and 500 ml at RM103.00, which works out to RM236 and RM206 per litre. The larger bottle costs less per litre. The smaller one makes sense when you are trying a flavour for the first time."
      },
      {
        "q": "Does olive oil in plastic go stale faster than in glass?",
        "a": "Clear plastic and clear glass both let light straight through, and light is one of the two things that stale olive oil. Heat is the other. Dark glass and tins shield it better. Keep any bottle capped and away from the stove."
      },
      {
        "q": "What if the bottle has no harvest date at all?",
        "a": "Many bottles print only a best-before date, which is common and perfectly legal. Where that is all you have, take the furthest best-before as the freshest stock on that shelf. A label offering neither date is still the one to put back."
      },
      {
        "q": "Does the country on the label mean the olives grew there?",
        "a": "Not always. Some labels name the country where the oil was bottled rather than where the olives grew, and blended oils draw on several countries. Look for wording such as product of one named country, and a producer willing to name the region."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Cold-pressed, single-origin Palestinian oil in 250 ml and 500 ml bottles."
      },
      {
        "label": "How to choose authentic extra virgin olive oil in Malaysia",
        "path": "blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "description": "The separate test for whether a bottle is genuine in the first place."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah branches, Shopee storefront and TikTok Shop."
      },
      {
        "label": "Olive oil smoke point",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "How much heat olive oil takes, compared with the oils a Malaysian kitchen already uses."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "halal-olive-oil-malaysia",
    "slug": "is-olive-oil-halal-what-to-check-in-malaysia",
    "seoTitle": "Halal Olive Oil: What to Check Before Buying in Malaysia",
    "metaTitle": "Halal Olive Oil: What to Check Before Buying in Malaysia",
    "metaDescription": "Is olive oil halal? Pure olive oil is one plant ingredient. Here is what a careful shopper checks on a halal olive oil label in Malaysia before buying.",
    "focusKeyword": "halal olive oil",
    "relatedKeywords": [
      "is olive oil halal",
      "halal olive oil Malaysia",
      "halal certification olive oil",
      "JAKIM halal",
      "olive oil ingredients",
      "infused olive oil halal",
      "extra virgin olive oil halal",
      "halal logo imported food",
      "olive oil label Malaysia",
      "cold pressed olive oil"
    ],
    "category": "Buying guide",
    "tags": [
      "halal",
      "labels",
      "infused olive oil",
      "Malaysia"
    ],
    "h1": "Halal olive oil in Malaysia: what to actually check on the bottle",
    "excerpt": "Pure olive oil is a single plant ingredient, so the honest answer is simple — but blends, flavourings and imported halal logos are worth reading properly.",
    "keyTakeaway": "Pure olive oil is pressed olives and nothing else, so a single-ingredient bottle raises no issue. What a careful shopper checks is the ingredient list on blends and flavoured oils, what an infusion is actually made from, and which body issued any halal mark on an imported bottle.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 4,
    "hero": {
      "src": "pressHalalOliveOilMalaysiaHero",
      "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
    },
    "ogImage": "/og/blog-halal-olive-oil-malaysia.jpg",
    "intro": [
      "Pure olive oil is pressed fruit. One ingredient, from a tree, nothing animal and nothing alcoholic. So the short answer is that plain olive oil raises no issue.",
      "It keeps coming up because not every bottle on a Malaysian shelf is plain. Blends, flavoured oils and sprays carry other things.",
      "Here is what a careful shopper checks anyway: the label, the infusion, the logo, the importer."
    ],
    "sections": [
      {
        "heading": "Is olive oil halal?",
        "id": "is-olive-oil-halal",
        "blocks": [
          {
            "type": "p",
            "text": "Yes. Olive oil is pressed from olives and nothing else, so a pure extra virgin olive oil contains no animal derivative, no alcohol and nothing doubtful. Plant oils are permissible by default. The question only becomes interesting when a bottle holds something besides olives."
          },
          {
            "type": "p",
            "text": "So **halal olive oil** names a check, not a category. The back label settles it, not the front."
          },
          {
            "type": "image",
            "src": "pressHalalOliveOilMalaysiaInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "What does the ingredient list tell you?",
        "id": "ingredient-list",
        "blocks": [
          {
            "type": "p",
            "text": "The ingredient list is the first and best check. A bottle of extra virgin olive oil should list one thing: olive oil. If you see a second oil, a flavouring, an emulsifier, a preservative or the word blend, you are no longer holding a single-ingredient product."
          },
          {
            "type": "ul",
            "items": [
              "**Blends** — olive oil cut with cheaper seed oil: two supply chains.",
              "**Flavourings** — a manufactured essence, not a herb; essences arrive in a carrier.",
              "**Sprays** — the propellant is an ingredient too, rarely shown up front.",
              "**Refined grades** — light or pure means processed, not pressed."
            ]
          },
          {
            "type": "image",
            "src": "pressHalalOliveOilMalaysiaInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "Are infused and flavoured olive oils halal?",
        "id": "infused-olive-oil",
        "blocks": [
          {
            "type": "p",
            "text": "It depends entirely on what was added and how. Real herbs, spices or dried flowers steeped in oil keep it plants in oil. A manufactured flavour essence may arrive in a carrier solvent, and ethanol is common in food flavourings, so a flavoured bottle earns a label read."
          },
          {
            "type": "p",
            "text": "The [Infused Collection here](/products) is culinary botanical infusion only: lavender-chamomile, blackseed, turmeric-black-pepper, rosemary-basil, fennel-anise, [wild-thyme](/products/infused-extra-virgin-olive-oil-wild-thyme)."
          },
          {
            "type": "image",
            "src": "pressHalalOliveOilMalaysiaInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "What does a halal logo on an imported bottle tell you?",
        "id": "halal-logo-imported",
        "blocks": [
          {
            "type": "p",
            "text": "A halal mark tells you a certifying body reviewed that product at some point. It does not tell you whether JAKIM recognises that body, whether the certificate is still current, or whether it covers the exact size and flavour in your hand. JAKIM publishes the list of certifiers it recognises."
          },
          {
            "type": "p",
            "text": "Read the certifier's name on the mark, not the logo's shape, and ask whether the document names the product or the factory."
          },
          {
            "type": "image",
            "src": "pressHalalOliveOilMalaysiaInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "Can processing or cross-contamination be an issue?",
        "id": "processing-contamination",
        "blocks": [
          {
            "type": "p",
            "text": "With cold-pressed oil, very little happens between the olive and the bottle: the fruit is crushed and the oil separated mechanically, with no solvent and no additive. The realistic question is shared equipment — a line that also runs something non-halal — and that goes to the importer."
          },
          {
            "type": "p",
            "text": "Oil pressed and bottled at one origin passes through fewer hands than a blend from several countries. [How this oil is sourced](/why-us) is a fair question."
          },
          {
            "type": "image",
            "src": "pressHalalOliveOilMalaysiaInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "How do you check a specific bottle in Malaysia?",
        "id": "check-a-bottle",
        "blocks": [
          {
            "type": "p",
            "text": "Ask whoever imports it. In Malaysia this oil is brought in by Berkat Madinah Store, founded in 2010, and questions about ingredients, processing and documentation go to them on WhatsApp at +60 11-1111 9912. You can also read the back label yourself at either branch."
          },
          {
            "type": "table",
            "head": [
              "What to check",
              "Where you find it"
            ],
            "rows": [
              [
                "Ingredient list",
                "Back label — a plain oil reads olive oil only"
              ],
              [
                "Infusion contents",
                "A named botanical, not the word flavouring"
              ],
              [
                "Who certified it",
                "The mark, then JAKIM's recognised-body list"
              ],
              [
                "Price by size",
                "RM59.00 for 250 ml, RM103.00 for 500 ml"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressHalalOliveOilMalaysiaInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          },
          {
            "type": "note",
            "title": "See it in person",
            "text": "Two branches: Ampang Jaya and Batu Caves, the larger. Both open 8:00 am to 12:00 midnight daily, though festive days differ. [Store details](/shop)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short answer, and the habit worth keeping",
      "blocks": [
        {
          "type": "p",
          "text": "Plain olive oil is one plant ingredient and needs no argument. The care belongs on bottles that are not plain — blends, essences, sprays, marks whose issuer nobody reads. Turn the bottle around, read the list, and [ask the importer](/contact) what the label leaves out."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is extra virgin olive oil halal?",
        "a": "Extra virgin olive oil is olives pressed mechanically, with no additive and no solvent, so a single-ingredient bottle holds nothing doubtful. The one check worth running is that the ingredient list really says olive oil alone, since some bottles fronted as olive oil are blends."
      },
      {
        "q": "Does olive oil need a halal logo in Malaysia?",
        "a": "Many single-ingredient plant foods are sold without a mark. A logo is reassurance rather than proof, since its value depends on which body issued it and whether JAKIM recognises that body. For a plain oil, the ingredient list tells you more than the logo does."
      },
      {
        "q": "Is infused olive oil halal?",
        "a": "It depends what the infusion is made from. Real herbs, spices or flowers steeped in oil keep it plant-only. A manufactured essence can arrive in a carrier solvent, so check the label names a botanical. The infused range on this site is culinary botanical infusion only."
      },
      {
        "q": "Which ingredients would make an olive oil doubtful?",
        "a": "Anything animal-derived, any alcohol used as a solvent or carrier, and undeclared flavourings whose base you cannot identify. Blended vegetable oils are not doubtful in themselves, but they add another supply chain. If an ingredient appears under a category name rather than a specific one, ask."
      },
      {
        "q": "How do I know a foreign halal certificate counts in Malaysia?",
        "a": "JAKIM maintains and publishes a list of foreign halal certification bodies it recognises. Read the certifier name printed on the mark and check it against that list, rather than trusting a logo shape. Then check whether the certificate names the product or only the facility."
      },
      {
        "q": "Is Palestinian olive oil halal?",
        "a": "Origin does not change the answer for a single-ingredient oil. Olives pressed in Palestine, in Spain or anywhere else are still olives. What origin changes is how short the chain is, which makes it easier to ask the importer specific questions about pressing and bottling."
      }
    ],
    "related": [
      {
        "label": "The full olive oil range",
        "path": "products",
        "description": "The classic cold-pressed extra virgin oil and all six botanical infusions, with the ingredient list on every one."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Both Berkat Madinah branches, opening hours and the online counters run by the distributor itself."
      },
      {
        "label": "How this oil is sourced",
        "path": "why-us",
        "description": "Single origin, cold pressed, and who brings it into Malaysia — the chain behind the bottle."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "olive-oil-price-malaysia",
    "slug": "olive-oil-price-in-malaysia-what-you-are-paying-for",
    "seoTitle": "Olive Oil Malaysia Price: What You Are Paying For",
    "metaTitle": "Olive Oil Malaysia Price: What You Are Paying For",
    "metaDescription": "Olive oil Malaysia price, explained: RM59.00 for 250 ml, RM103.00 for 500 ml, and how to work out price per litre before you buy any bottle.",
    "focusKeyword": "olive oil malaysia price",
    "relatedKeywords": [
      "olive oil price in malaysia",
      "extra virgin olive oil price in malaysia",
      "how much does olive oil cost malaysia",
      "olive oil 500ml price",
      "olive oil 250ml price malaysia",
      "olive oil price per litre",
      "cheap vs expensive olive oil",
      "why is olive oil expensive in malaysia",
      "where to buy olive oil in malaysia",
      "olive oil price shopee malaysia"
    ],
    "category": "Buying guide",
    "tags": [
      "price",
      "extra virgin olive oil",
      "malaysia",
      "buying guide"
    ],
    "h1": "Olive Oil Malaysia Price: What You Are Actually Paying For",
    "excerpt": "A plain breakdown of what moves the olive oil price in Malaysia, with the per-litre sum that makes any two bottles comparable.",
    "keyTakeaway": "Olive oil in Malaysia is entirely imported, so freight, duty, grade and harvest year all sit inside the shelf price. Arabian Village is RM59.00 for 250 ml and RM103.00 for 500 ml, which works out at RM236.00 and RM206.00 per litre, so the larger bottle is the better value.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 4,
    "hero": {
      "src": "pressOliveOilPriceMalaysiaHero",
      "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
    },
    "ogImage": "/og/blog-olive-oil-price-malaysia.jpg",
    "intro": [
      "Two bottles of olive oil on the same shelf in Kuala Lumpur can be threefold apart in price. The olive oil Malaysia price is not arbitrary. It is a stack of costs you can take apart.",
      "Every drop of it arrived by ship. Malaysia has no olive groves, so a farm price set far away picks up freight, duty and distribution before it reaches your trolley."
    ],
    "sections": [
      {
        "heading": "How much does olive oil cost in Malaysia?",
        "id": "how-much",
        "blocks": [
          {
            "type": "p",
            "text": "Prices are quoted by bottle, not by litre, which is what makes a shelf hard to read. Arabian Village Palestinian cold-pressed extra virgin olive oil is **RM59.00 for 250 ml** and **RM103.00 for 500 ml**. The same price holds for the classic oil and for every [infused flavour](/products/infused-extra-virgin-olive-oil-wild-thyme)."
          },
          {
            "type": "table",
            "head": [
              "Bottle size",
              "Shelf price",
              "Works out at"
            ],
            "rows": [
              [
                "250 ml",
                "RM59.00",
                "RM236.00 per litre"
              ],
              [
                "500 ml",
                "RM103.00",
                "RM206.00 per litre"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilPriceMalaysiaInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "Why is olive oil expensive in Malaysia?",
        "id": "why-expensive",
        "blocks": [
          {
            "type": "p",
            "text": "Because it is entirely imported. Malaysia grows no olives, so every bottle carries the fruit, the pressing, the glass, sea freight, port handling, import duty and distribution before a retailer adds anything. Harvest size shifts it too: olive trees swing between heavy and light years, and a thin year lifts wholesale prices everywhere."
          },
          {
            "type": "image",
            "src": "pressOliveOilPriceMalaysiaInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "How do I work out olive oil price per litre?",
        "id": "price-per-litre",
        "blocks": [
          {
            "type": "p",
            "text": "Divide the price by the volume in millilitres, then multiply by 1,000. A 500 ml bottle at RM103.00 is RM206.00 per litre. A 250 ml bottle at RM59.00 is RM236.00 per litre. Faster still: multiply a 250 ml price by four, a 500 ml price by two, a 750 ml price by 1.333."
          },
          {
            "type": "note",
            "title": "The honest answer on our two sizes",
            "text": "The 500 ml wins: RM206.00 a litre against RM236.00, a gap of RM30.00. Two 250 ml bottles cost RM118.00; one 500 ml holds the same oil for RM103.00. Buy small to try a flavour, larger for daily cooking."
          },
          {
            "type": "image",
            "src": "pressOliveOilPriceMalaysiaInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "What makes one olive oil cost more than another?",
        "id": "what-moves-price",
        "blocks": [
          {
            "type": "p",
            "text": "Roughly five things: the grade printed on the label, whether the oil was cold pressed, how recent the harvest is, the size of the bottle, and how specific the origin is. A single-origin oil from one named press has a shorter and costlier supply chain than a multi-country blend."
          },
          {
            "type": "ul",
            "items": [
              "**Grade and pressing** — extra virgin pressed without heat yields less oil per olive; refined grades cost less to make.",
              "**Harvest year** — a recent pressing commands more than warehouse stock.",
              "**Bottle size** — glass, cap and carton are charged per unit, so small bottles cost more per litre."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilPriceMalaysiaInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "Is cheap olive oil a bad buy?",
        "id": "cheap-vs-expensive",
        "blocks": [
          {
            "type": "p",
            "text": "Not automatically. A low price usually means something specific: a refined or blended oil rather than extra virgin, an older harvest, or a large format whose per-litre arithmetic genuinely favours you. The one thing worth distrusting is a label claiming extra virgin at a price that grade cannot support."
          },
          {
            "type": "p",
            "text": "Read the label, not the price tag: grade, country of origin, pressing date, dark glass. [Choosing authentic extra virgin olive oil](/blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia) takes each check in turn."
          },
          {
            "type": "image",
            "src": "pressOliveOilPriceMalaysiaInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "Where can I check the price in person?",
        "id": "where-to-check",
        "blocks": [
          {
            "type": "p",
            "text": "Arabian Village is distributed in Malaysia by Berkat Madinah Store, founded in 2010. It sells the oil at two branches, Ampang Jaya and Batu Caves, the larger of the pair, and through its own Shopee storefront and TikTok Shop. Both branches open 8:00 am to 12:00 midnight, Monday through Sunday."
          },
          {
            "type": "p",
            "text": "Hari Raya and other festive days can run different hours, so message +60 11-1111 9912 on WhatsApp first. Sizes sit on the [products page](/products); anything else goes through [contact](/contact)."
          },
          {
            "type": "image",
            "src": "pressOliveOilPriceMalaysiaInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "So what should you actually pay?",
      "blocks": [
        {
          "type": "p",
          "text": "Compare price per litre, never bottle price. Here that is RM236.00 a litre for the 250 ml and RM206.00 for the 500 ml, so the bigger bottle wins by RM30.00. Run the same sum on any shelf in Malaysia and you will know at once whether a price is fair."
        }
      ]
    },
    "faqs": [
      {
        "q": "How much does a bottle of olive oil cost in Malaysia?",
        "a": "Every bottle in the country is imported, so grade and size set the price. Arabian Village cold-pressed extra virgin olive oil is RM59.00 for 250 ml and RM103.00 for 500 ml, and that price holds for the classic oil and for each infused flavour."
      },
      {
        "q": "What is the price of a 500 ml bottle of olive oil?",
        "a": "A 500 ml bottle of Arabian Village Palestinian extra virgin olive oil is RM103.00. In a comparable unit that is RM206.00 per litre, and per litre is the figure to carry with you when weighing it against a bottle of another size."
      },
      {
        "q": "Is the 250 ml or the 500 ml better value?",
        "a": "The 500 ml, clearly. It works out at RM206.00 per litre against RM236.00 for the 250 ml, a difference of RM30.00 a litre. Two 250 ml bottles cost RM118.00 for the same volume one 500 ml bottle delivers at RM103.00."
      },
      {
        "q": "How do I calculate olive oil price per litre?",
        "a": "Divide the shelf price by the millilitres in the bottle, then multiply by 1,000. Shortcuts: multiply a 250 ml price by four, a 500 ml price by two, a 750 ml price by 1.333. It is the only fair way to compare different sizes."
      },
      {
        "q": "Do infused olive oils cost more than the plain one?",
        "a": "No. Price follows bottle size only, so a 250 ml bottle of blackseed, turmeric-black-pepper, rosemary-basil, lavender-chamomile, fennel-anise or wild-thyme infused oil is RM59.00, exactly like the classic. The 500 ml is RM103.00 across the whole range. Choose by what you cook."
      },
      {
        "q": "Is cheap olive oil worth buying?",
        "a": "It can be, if the low price comes from a larger bottle or from a lower grade you actually wanted. Treat it carefully when a label claims extra virgin at a price that grade cannot support. Check grade, origin and harvest date, then compare per litre."
      }
    ],
    "related": [
      {
        "label": "The full Arabian Village range",
        "path": "products",
        "description": "Every size and infused flavour, with current prices."
      },
      {
        "label": "How to choose authentic extra virgin olive oil in Malaysia",
        "path": "blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "description": "The label checks that tell a real extra virgin from a bargain-priced blend."
      },
      {
        "label": "Where to buy",
        "path": "shop",
        "description": "Berkat Madinah branches and online counters across Malaysia."
      },
      {
        "label": "Cooking with olive oil",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Where extra virgin belongs in a Malaysian kitchen, and what a pour actually costs."
      },
      {
        "label": "Olive oil marinade: what the oil is actually doing",
        "path": "blog/olive-oil-marinade-what-it-does",
        "description": "Why oil carries aroma rather than tenderises, and how long to leave each ingredient."
      }
    ]
  },
  /* ---------------- PRESS round 1 ---------------- */
  {
    "id": "palestinian-olive-oil-origin",
    "slug": "palestinian-olive-oil-what-makes-it-different",
    "seoTitle": "Palestinian Olive Oil: What Makes It Different",
    "metaTitle": "Palestinian Olive Oil: What Makes It Different",
    "metaDescription": "Palestinian olive oil explained: the Nabali olive, the autumn harvest, and what single origin lets you check that a blend cannot. Malaysia prices inside.",
    "focusKeyword": "palestinian olive oil",
    "relatedKeywords": [
      "palestinian olive oil Malaysia",
      "olive oil from Palestine",
      "buy Palestinian olive oil Malaysia",
      "single origin olive oil",
      "Nabali olive",
      "Nabali Baladi olive oil",
      "Palestinian olive harvest",
      "olive harvest season",
      "cold pressed extra virgin olive oil",
      "olive oil origin label"
    ],
    "category": "Origin & provenance",
    "tags": [
      "Palestinian olive oil",
      "single origin",
      "Nabali",
      "harvest",
      "provenance"
    ],
    "h1": "Palestinian olive oil: what makes it different",
    "excerpt": "The groves, the Nabali olive and the autumn harvest behind Palestinian olive oil — and what single origin lets you verify that a multi-country blend does not.",
    "keyTakeaway": "Palestinian olive oil comes from rain-fed groves on terraced hill country, planted mostly with the Nabali olive and picked by hand in autumn. Its real advantage over a multi-country blend is not a decree of quality but verifiability: one region, one harvest window, one importer you can question.",
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "readingTime": 4,
    "hero": {
      "src": "pressPalestinianOliveOilOriginHero",
      "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
    },
    "ogImage": "/og/blog-palestinian-olive-oil-origin.jpg",
    "intro": [
      "Search for palestinian olive oil from Malaysia and two very different bottles come back: one names a place on the front, the other admits in small print that it blends oils from more than one country. That gap is the subject here.",
      "Arabian Village is Palestinian cold-pressed extra virgin olive oil, distributed in Malaysia by Berkat Madinah Store. Single origin is not decoration on that label — it is a claim narrow enough to be checked."
    ],
    "sections": [
      {
        "heading": "What makes Palestinian olive oil different?",
        "id": "what-makes-it-different",
        "blocks": [
          {
            "type": "p",
            "text": "Palestinian olive oil comes from a narrow band of hill country with hot dry summers, wet winters, thin limestone soil and groves set along stone terraces. Most groves are rain-fed rather than irrigated, the fruit is hand-picked in autumn, and the olives are pressed close to where they grew."
          },
          {
            "type": "p",
            "text": "No single element there is unique. The combination is, and so is a harvest that has stayed a village event rather than an industrial one."
          },
          {
            "type": "image",
            "src": "pressPalestinianOliveOilOriginInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "Which olive varieties grow in Palestinian groves?",
        "id": "nabali-and-other-varieties",
        "blocks": [
          {
            "type": "p",
            "text": "The dominant variety is the Nabali olive, often called Baladi, meaning local. Nabali Muhassan and Souri grow alongside it, and older Rumi trees appear in places. Nabali fruit gives an oil that reads green rather than sweet: grassy, faintly bitter, peppery in the throat."
          },
          {
            "type": "ul",
            "items": [
              "Aroma — cut grass and green leaf, sometimes tomato leaf",
              "Palate — green and lightly bitter, not buttery or nutty",
              "Finish — peppery in the throat, strongest in a recent harvest",
              "Colour — green-gold, deeper when the fruit was picked earlier"
            ]
          },
          {
            "type": "image",
            "src": "pressPalestinianOliveOilOriginInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "When is the Palestinian olive harvest?",
        "id": "harvest-season",
        "blocks": [
          {
            "type": "p",
            "text": "The Palestinian olive harvest falls in autumn, broadly October into November, shifting with altitude and with how the rains came that year. It is short and it is social: families and neighbours working the same terraces. Fruit picked early gives greener, more bitter oil; fruit left longer, milder."
          },
          {
            "type": "p",
            "text": "A harvest date therefore says more than a best-before date, which the bottler sets. It records when the fruit left the tree."
          },
          {
            "type": "image",
            "src": "pressPalestinianOliveOilOriginInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "Why does single origin matter more than a blend?",
        "id": "single-origin-vs-blend",
        "blocks": [
          {
            "type": "p",
            "text": "Single origin means every olive in the bottle came from one defined place. A blend combines oil from several countries — legal, ordinary, and why the back label often reads as a list. The difference is not quality by decree; it is how much you can check."
          },
          {
            "type": "table",
            "head": [
              "What you can ask",
              "Single origin",
              "Multi-country blend"
            ],
            "rows": [
              [
                "Where the fruit grew",
                "One named region",
                "Several countries, unranked"
              ],
              [
                "Which season it came from",
                "One harvest window",
                "Seasons may be mixed"
              ],
              [
                "Which varieties are inside",
                "Traceable to that region",
                "Rarely stated"
              ],
              [
                "Who can answer questions",
                "One importer, one line",
                "Depends on the bottler"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressPalestinianOliveOilOriginInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "What does the land itself do to the oil?",
        "id": "terraces-and-rainfall",
        "blocks": [
          {
            "type": "p",
            "text": "Rain-fed groves on terraced slopes carry less fruit per tree than irrigated orchards on flat ground, and the olives run smaller. The terraces exist because the hillsides are steep and the soil shallow; their walls hold what winter rain arrives. The trees then pass a dry summer unwatered."
          },
          {
            "type": "p",
            "text": "Small plots and hand picking mean modest volumes and a short pressing window, so the oil is made in batches. Our [single-origin sourcing](/why-us) page covers the supply side."
          },
          {
            "type": "image",
            "src": "pressPalestinianOliveOilOriginInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "How do you buy Palestinian olive oil in Malaysia?",
        "id": "buy-in-malaysia",
        "blocks": [
          {
            "type": "p",
            "text": "In Malaysia, Arabian Village is distributed by Berkat Madinah Store, which opened in 2010. The oil is sold at its two branches, Ampang Jaya and Batu Caves, the larger, and through Berkat Madinah's own Shopee storefront and TikTok Shop — the same seller, not resellers."
          },
          {
            "type": "p",
            "text": "Prices are RM59.00 for 250 ml and RM103.00 for 500 ml, and a size costs the same whether you take the classic oil or a flavour from the [infused collection](/products) such as [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme)."
          },
          {
            "type": "image",
            "src": "pressPalestinianOliveOilOriginInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          },
          {
            "type": "note",
            "title": "Before you travel",
            "text": "Branches open 8:00 am to 12:00 midnight, Monday through Sunday. Festive days such as Hari Raya can differ — [confirm on WhatsApp](/contact) at +60 11-1111 9912."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Origin is a claim you can test",
      "blocks": [
        {
          "type": "p",
          "text": "Single origin earns attention for a plain reason: it can be falsified. One region, one harvest window, one importer to question. Ask where the fruit grew, when it was picked and who imported it — then [compare the bottles and sizes](/shop)."
        }
      ]
    },
    "faqs": [
      {
        "q": "What is Palestinian olive oil?",
        "a": "Olive oil pressed from olives grown in Palestinian groves — largely rain-fed plantings on terraced hill country, picked in autumn and pressed nearby. Extra virgin means the oil was produced by mechanical means alone, without heat or solvents, and met the limits set for that grade."
      },
      {
        "q": "What does Nabali olive oil taste like?",
        "a": "Green rather than sweet. Expect cut grass and green leaf on the nose, a light bitterness across the palate, and a peppery catch at the back of the throat. The pepper is sharpest in oil from a recent harvest and softens as a bottle ages."
      },
      {
        "q": "When is the olive harvest in Palestine?",
        "a": "Autumn — broadly October into November, moving with altitude and with the year's rainfall. The window is short. Picking early yields greener, more bitter, more peppery oil; leaving the fruit on the tree longer yields a milder, rounder oil from the same trees."
      },
      {
        "q": "Is single origin olive oil better than a blend?",
        "a": "Not automatically. Single origin describes where the olives came from, not how carefully the oil was made. What it gives you is something to check: one region, one harvest season, one importer to ask. A blend of several countries offers fewer facts to hold anyone to."
      },
      {
        "q": "Where can I buy Palestinian olive oil in Malaysia?",
        "a": "Arabian Village is distributed by Berkat Madinah Store, in business since 2010. Buy it at the Ampang Jaya and Batu Caves branches, Batu Caves being the larger, or online through Berkat Madinah's own Shopee storefront and TikTok Shop. Those channels are the same shop."
      },
      {
        "q": "How much does Palestinian olive oil cost in Malaysia?",
        "a": "RM59.00 for the 250 ml bottle and RM103.00 for the 500 ml. Price follows the size and not the flavour, so a bottle from the infused range costs the same as the classic oil at the same volume. Sizes are listed on the [shop page](/shop)."
      }
    ],
    "related": [
      {
        "label": "Arabian Village olive oil",
        "path": "products",
        "description": "The classic cold-pressed extra virgin oil and the six culinary infusions, all Palestinian origin."
      },
      {
        "label": "Why we sell a single origin",
        "path": "why-us",
        "description": "How one region, one harvest window and one importer make the label checkable."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Branch counters in Ampang Jaya and Batu Caves, plus Berkat Madinah's own Shopee and TikTok Shop."
      },
      {
        "label": "Olive oil for bread and dipping",
        "path": "blog/olive-oil-for-bread-and-dipping",
        "description": "The unheated use that shows an oil’s character, and what to serve with it."
      }
    ]
  },
  /* ---------------- PRESS round 2 ---------------- */
  {
    "id": "olive-oil-for-cooking",
    "slug": "how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
    "seoTitle": "Olive Oil for Cooking: A Malaysian Kitchen Guide",
    "metaTitle": "Olive Oil for Cooking: A Malaysian Kitchen Guide",
    "metaDescription": "Olive oil for cooking in a Malaysian kitchen: where it works, how much to pour, what a tablespoon costs at RM236 a litre, and classic versus infused.",
    "focusKeyword": "olive oil for cooking",
    "relatedKeywords": [
      "cooking with extra virgin olive oil",
      "can you cook with extra virgin olive oil",
      "olive oil for tumis",
      "olive oil for cooking malaysia",
      "extra virgin olive oil malaysia",
      "how much olive oil to use",
      "olive oil for roasting vegetables",
      "olive oil for marinade",
      "infused olive oil cooking",
      "olive oil for salad dressing",
      "olive oil price per litre malaysia",
      "how to store olive oil"
    ],
    "category": "Cooking & recipes",
    "tags": [
      "cooking",
      "extra virgin olive oil",
      "malaysia",
      "kitchen guide"
    ],
    "h1": "Olive Oil for Cooking: How to Use It in a Malaysian Kitchen",
    "excerpt": "A practical guide to olive oil for cooking in a Malaysian kitchen, from tumis and roasting to what a tablespoon actually costs.",
    "keyTakeaway": "Olive oil for cooking suits most of a Malaysian kitchen: tumis, roasting, marinades, rice and anything served cold. Use about half what you would pour of a neutral oil. At RM236 a litre a tablespoon costs roughly RM3.54, so the price lands per dish, not per bottle.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 4,
    "hero": {
      "src": "pressOliveOilForCookingHero",
      "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
    },
    "ogImage": "/og/blog-olive-oil-for-cooking.jpg",
    "intro": [
      "Extra virgin olive oil is not a quiet swap for palm or corn oil. It has a taste, and that taste ends up in the food.",
      "This is a kitchen guide. Where it works in Malaysian cooking, how much to pour, what a pour costs at RM236 a litre, and when to reach for an infused bottle instead."
    ],
    "sections": [
      {
        "heading": "Is olive oil for cooking worth it in a Malaysian kitchen?",
        "id": "is-it-worth-it",
        "blocks": [
          {
            "type": "p",
            "text": "Yes, for most of what a Malaysian kitchen does daily. Tumis, roasting, marinades, rice and anything finished cold sit comfortably inside its range. Olive oil for cooking behaves differently from a neutral oil: it carries flavour instead of hiding, so use it where that flavour is wanted, and use less than you expect."
          },
          {
            "type": "p",
            "text": "Where it fits less well is a wok on a hard flame. Heat limits are their own subject, and [what heat olive oil can take](/blog/olive-oil-smoke-point-what-heat-it-can-take) covers the numbers."
          },
          {
            "type": "image",
            "src": "pressOliveOilForCookingInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "What changes when you cook with extra virgin",
        "id": "what-changes",
        "blocks": [
          {
            "type": "p",
            "text": "Three things change. The dish picks up a peppery, grassy note that a neutral oil never adds. Onions and garlic brown a little more slowly and more evenly. And quantity starts to matter, because a heavy hand tastes heavy: one tablespoon of a good oil reads as seasoning, three reads as a mistake."
          },
          {
            "type": "ul",
            "items": [
              "**Flavour** — green, faintly bitter, with a peppery catch at the back of the throat.",
              "**Colour** — vegetables roast to a deeper gold.",
              "**Texture** — dressings cling instead of sliding off.",
              "**Quantity** — start with half a neutral oil's measure."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForCookingInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Where olive oil for cooking works in Malaysian dishes",
        "id": "where-it-works",
        "blocks": [
          {
            "type": "p",
            "text": "Everywhere the heat is moderate and the oil is meant to be tasted. Tumis for a sambal base or a plate of stir-fried sayur. Roasting ayam, potatoes, terung or pumpkin. Marinades for grilled fish. A spoon forked through rice once it has steamed. Salads, kerabu and ulam, where nothing is heated at all."
          },
          {
            "type": "table",
            "head": [
              "Use",
              "How",
              "How much"
            ],
            "rows": [
              [
                "Tumis",
                "Medium flame, warm pan",
                "1 tbsp for two"
              ],
              [
                "Roasting vegetables",
                "Tossed on the tray",
                "2 tbsp per tray"
              ],
              [
                "Marinade, fish or chicken",
                "With salt and lime",
                "2 tbsp per kilo"
              ],
              [
                "Rice after steaming",
                "Forked through, off heat",
                "1 tsp per cup"
              ],
              [
                "Dressing, kerabu, ulam",
                "Three parts oil, one acid",
                "3 tbsp per bowl"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForCookingInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "What does olive oil for cooking cost per dish?",
        "id": "cost-per-dish",
        "blocks": [
          {
            "type": "p",
            "text": "Less than the shelf price suggests, because you pour teaspoons and tablespoons rather than cups. Arabian Village is **RM59.00 for 250 ml** and **RM103.00 for 500 ml**, which is RM236 and RM206 a litre. Divide by a thousand and a millilitre costs about 24 sen from the small bottle, 21 sen from the large."
          },
          {
            "type": "table",
            "head": [
              "What you pour",
              "Volume",
              "From 250 ml",
              "From 500 ml"
            ],
            "rows": [
              [
                "A teaspoon, finishing a plate",
                "5 ml",
                "RM1.18",
                "RM1.03"
              ],
              [
                "A tablespoon, tumis for two",
                "15 ml",
                "RM3.54",
                "RM3.09"
              ],
              [
                "Two tablespoons, a roasting tray",
                "30 ml",
                "RM7.08",
                "RM6.18"
              ],
              [
                "A quarter cup, marinade or dressing",
                "60 ml",
                "RM14.16",
                "RM12.36"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForCookingInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Classic oil or an infusion?",
        "id": "classic-or-infusion",
        "blocks": [
          {
            "type": "p",
            "text": "Reach for the classic when the oil should not decide the dish: roasting, tumis, rice, a dressing you are seasoning yourself. Reach for an infusion when you want one clear flavour to arrive without chopping anything. The [Infused Collection](/products) is six botanicals in the same cold-pressed base, priced the same by size."
          },
          {
            "type": "ul",
            "items": [
              "**Wild thyme** — roast potatoes, flatbread, a dipping bowl.",
              "**Rosemary-basil** — grilled chicken, tomato salads, pasta.",
              "**Turmeric-black pepper** — rice, roasted cauliflower, lentils.",
              "**[Blackseed](/products/infused-extra-virgin-olive-oil-blackseed)** — dips, labneh, warm bread.",
              "**Fennel-anise** — fish, slaws, carrot dishes.",
              "**Lavender-chamomile** — fruit, yoghurt, light bakes."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForCookingInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Buying and keeping a bottle you cook from every day",
        "id": "buying-and-keeping",
        "blocks": [
          {
            "type": "p",
            "text": "Buy the size you will finish in two or three months, then keep it away from the two things that age it fastest, heat and light. A dark bottle in a closed cupboard holds up far better than a clear one standing beside the hob in a kitchen that never really cools down."
          },
          {
            "type": "ul",
            "items": [
              "Store it in a cupboard, not above the stove.",
              "Close the cap after every pour. Air dulls it.",
              "250 ml for a few times a week, 500 ml for daily cooking.",
              "Fresh oil smells green and grassy; tired oil smells flat or waxy."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForCookingInline",
            "alt": "Pickers working through the branches during the olive harvest"
          },
          {
            "type": "p",
            "text": "In Malaysia the brand is carried by **Berkat Madinah Store**, its official distributor, at Ampang Jaya and the larger Batu Caves branch in Prima Seri Gombak. Both open 8:00 am to midnight daily. [Where to buy](/shop) has the addresses."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Cook with it, do not save it",
      "blocks": [
        {
          "type": "p",
          "text": "A bottle kept for special occasions goes stale before anyone gets to it. Olive oil for cooking earns its price on weeknights: the roasting tray, the tumis, the spoon forked through rice. Open the next bottle before the last runs dry."
        }
      ]
    },
    "faqs": [
      {
        "q": "Can I use extra virgin olive oil for everyday cooking?",
        "a": "Yes. Tumis, roasting, shallow pan work, marinades and cold dishes are all ordinary uses for it. The one place to think twice is sustained high-heat frying."
      },
      {
        "q": "How much olive oil should I use per dish?",
        "a": "Roughly half what you would pour of a neutral oil. A tablespoon is enough to tumis for two, two tablespoons dress a roasting tray, a teaspoon finishes a plate."
      },
      {
        "q": "Is cooking with olive oil expensive in Malaysia?",
        "a": "Per bottle it looks dear, per dish it is not. At RM236 a litre a tablespoon is about RM3.54, and about RM3.09 from the 500 ml bottle."
      },
      {
        "q": "Can I use olive oil for tumis?",
        "a": "Yes, on a medium flame. Warm the pan, add the oil, then the onion and garlic. They colour more evenly than in a neutral oil, so allow an extra minute."
      },
      {
        "q": "Should the infused oils be cooked with or only drizzled?",
        "a": "Both. They are culinary infusions in a cold-pressed base, so they roast and marinate like the classic oil. Their flavour reads clearest when the oil goes in late."
      },
      {
        "q": "Where can I buy it in Malaysia?",
        "a": "From Berkat Madinah Store, the official distributor: its Ampang Jaya branch or the larger Batu Caves outlet in Prima Seri Gombak, plus its own Shopee and TikTok Shop counters."
      }
    ],
    "related": [
      {
        "label": "The Arabian Village range",
        "path": "products",
        "description": "The classic oil and all six infused flavours, with current prices."
      },
      {
        "label": "What cold-pressed olive oil really means",
        "path": "blog/what-cold-pressed-olive-oil-really-means",
        "description": "How the oil in your pan was extracted, and why it matters to the taste."
      },
      {
        "label": "How to choose authentic extra virgin olive oil in Malaysia",
        "path": "blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "description": "The label checks worth making before you cook from a new bottle."
      },
      {
        "label": "Where to buy",
        "path": "shop",
        "description": "Berkat Madinah branches, opening hours and online counters."
      },
      {
        "label": "Extra virgin olive oil salad dressing",
        "path": "blog/extra-virgin-olive-oil-salad-dressing",
        "description": "Ratios, the emulsion method, and how long a dressing keeps."
      },
      {
        "label": "Aglio e olio with extra virgin olive oil",
        "path": "blog/aglio-e-olio-recipe-with-extra-virgin-olive-oil",
        "description": "The four-ingredient pasta where the oil is the sauce, and the emulsion step people miss."
      },
      {
        "label": "Olive oil fried egg",
        "path": "blog/olive-oil-fried-egg",
        "description": "The Spanish method: a shallow pool of oil, hot oil spooned over the yolk."
      },
      {
        "label": "Olive oil vs sesame oil",
        "path": "blog/olive-oil-vs-sesame-oil",
        "description": "Two strong, distinct flavours side by side, and where each earns its place."
      },
      {
        "label": "Olive oil coffee",
        "path": "blog/olive-oil-coffee",
        "description": "The oil-in-coffee trend: quantity, why it needs blending, and what it tastes like."
      }
    ]
  },
  /* ---------------- PRESS round 2 ---------------- */
  {
    "id": "olive-oil-smoke-point",
    "slug": "olive-oil-smoke-point-what-heat-it-can-take",
    "seoTitle": "Olive Oil Smoke Point: What Heat It Can Take",
    "metaTitle": "Olive Oil Smoke Point: What Heat It Can Take",
    "metaDescription": "Olive oil smoke point, explained: approximate ranges by grade, why freshness moves the number, and which Malaysian cooking methods stay under it.",
    "focusKeyword": "olive oil smoke point",
    "relatedKeywords": [
      "extra virgin olive oil smoke point",
      "smoke point of olive oil in celsius",
      "can you fry with olive oil",
      "olive oil cooking temperature",
      "refined olive oil smoke point",
      "pomace oil smoke point",
      "olive oil for tumis",
      "does olive oil burn easily",
      "free fatty acid olive oil",
      "olive oil deep frying",
      "cooking oil smoke point comparison",
      "high heat cooking oil malaysia"
    ],
    "category": "Olive oil basics",
    "tags": [
      "smoke point",
      "cooking with olive oil",
      "extra virgin",
      "kitchen guide"
    ],
    "h1": "Olive Oil Smoke Point: What Heat It Can Actually Take",
    "excerpt": "The olive oil smoke point is a range rather than a fixed number, and freshness moves it more than the grade on the label does.",
    "keyTakeaway": "The olive oil smoke point is a range, not a number: roughly 190 to 210°C for extra virgin, higher for refined grades. Freshness and free fatty acid content move it more than the label does. Tumis, roasting and shallow-frying stay under it; a long deep-fry and a hard wok flame do not.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 4,
    "hero": {
      "src": "pressOliveOilSmokePointHero",
      "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
    },
    "ogImage": "/og/blog-olive-oil-smoke-point.jpg",
    "intro": [
      "Smoke point is the temperature at which an oil stops sitting quietly in the pan and starts giving off a steady haze. For extra virgin olive oil the figure gets repeated with a confidence nobody should have, because it is not one number. It is a range, and the range moves.",
      "Here are the approximate figures for the olive oil grades and for the oils a Malaysian kitchen already keeps, what moves the number, and which everyday methods stay under it."
    ],
    "sections": [
      {
        "heading": "What a smoke point actually is",
        "id": "what-a-smoke-point-is",
        "blocks": [
          {
            "type": "p",
            "text": "A smoke point is the temperature at which an oil begins to give off a continuous visible haze instead of a clean shimmer. What you are watching is the smallest, most volatile parts of the oil breaking away first. It is not a cliff edge: the aroma flattens well before anything smokes, which is why it matters more for extra virgin."
          },
          {
            "type": "image",
            "src": "pressOliveOilSmokePointInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          }
        ]
      },
      {
        "heading": "Olive oil smoke point figures, and how they compare",
        "id": "smoke-point-figures-compared",
        "blocks": [
          {
            "type": "p",
            "text": "Published figures put extra virgin olive oil at roughly 190 to 210°C, with refined grades higher, because refining strips out the compounds that break down first. Read every figure below as an approximate range for the category, not a reading taken from your own bottle."
          },
          {
            "type": "table",
            "head": [
              "Oil",
              "Approximate range",
              "What it tastes of"
            ],
            "rows": [
              [
                "Extra virgin olive oil",
                "190-210°C",
                "Fruity, peppery"
              ],
              [
                "Refined olive oil (pure or light)",
                "220-240°C",
                "Almost nothing"
              ],
              [
                "Olive pomace oil",
                "around 240°C",
                "Neutral"
              ],
              [
                "Palm cooking oil",
                "around 230°C",
                "Neutral"
              ],
              [
                "Virgin coconut oil",
                "175-200°C",
                "Coconut"
              ],
              [
                "Refined sunflower oil",
                "around 225°C",
                "Neutral"
              ],
              [
                "Canola oil",
                "200-230°C",
                "Neutral"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilSmokePointInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          }
        ]
      },
      {
        "heading": "Freshness moves the number more than the grade does",
        "id": "freshness-moves-the-number",
        "blocks": [
          {
            "type": "p",
            "text": "Free fatty acids break down first, and an oil gathers them as it ages and as air, light and warmth work on it. A fresh, low-acidity extra virgin oil takes more heat than a tired one that has stood open beside the stove since March. The grade on the label describes a starting condition."
          },
          {
            "type": "ul",
            "items": [
              "**Time.** Every month an opened bottle spends in a warm kitchen moves it the same way.",
              "**Light.** Clear glass on a bright shelf ages an oil faster than dark glass in a cupboard.",
              "**Air.** A half-empty bottle is half full of air, and the oil reacts with it.",
              "**Reuse.** Oil already fried in starts lower."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilSmokePointInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          }
        ]
      },
      {
        "heading": "Which Malaysian cooking methods stay under it",
        "id": "malaysian-cooking-methods",
        "blocks": [
          {
            "type": "p",
            "text": "Most of what happens in a Malaysian kitchen sits comfortably inside the range. Tumis over a moderate flame runs near 120 to 160°C once the pan is loaded, and oven roasting at 180 to 200°C is fine. What goes past it is a long deep-fry and wok work on a hard flame."
          },
          {
            "type": "ul",
            "items": [
              "Tumis for a rempah, onions or garlic: inside the range, and the oil carries the aromatics.",
              "Roasting vegetables or chicken at 180 to 200°C: inside the range.",
              "Shallow-frying fish or telur mata: inside it, unless the pan is left dry and smoking between batches.",
              "A long deep-fry of pisang goreng or keropok: past it, and costly by the litre.",
              "Wok on a full flame: past it, well past it."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilSmokePointInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          },
          {
            "type": "p",
            "text": "Olive oil is a pan oil with a ceiling, and most home cooking sits below it. For where it fits across a week of meals, read [how to cook with olive oil in a Malaysian kitchen](/blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen)."
          }
        ]
      },
      {
        "heading": "How to tell when the oil has gone past it",
        "id": "how-to-tell",
        "blocks": [
          {
            "type": "p",
            "text": "You do not need a thermometer, because the pan tells you. A thin continuous haze lifting off the surface, a sharp smell where a fruity one was, and oil that has gone thin and runs too freely are the three signals. A shimmer is normal. Steady smoke means you are late."
          },
          {
            "type": "ol",
            "items": [
              "Take the pan off the heat and give it thirty seconds before adding anything.",
              "If it smoked hard, tip that oil out rather than cook in it.",
              "Add the ingredients sooner: cold food drops the temperature at once.",
              "Never leave a pan of oil heating while you chop."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilSmokePointInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          }
        ]
      },
      {
        "heading": "Is reheating the oil worth it?",
        "id": "reheating-olive-oil",
        "blocks": [
          {
            "type": "p",
            "text": "At **RM236 a litre** for the 250 ml bottle, filling a pot with extra virgin oil and straining it to use again is a poor trade. Each round leaves the oil darker, thicker and quieter in the nose, and lower than it was. Keep a cheap oil for volume frying and the extra virgin for the pan."
          },
          {
            "type": "p",
            "text": "A better habit: cook with a modest amount, then finish the plate with a drizzle off the heat. The heated oil cooks, the raw oil carries the flavour."
          },
          {
            "type": "image",
            "src": "pressOliveOilSmokePointInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Extra virgin sits around 190 to 210°C, refined grades higher, and a fresh bottle takes more heat than an old one. Tumis, roast and shallow-fry in it. Leave the long deep-fry and the roaring wok to something cheaper."
        }
      ]
    },
    "faqs": [
      {
        "q": "What is the smoke point of extra virgin olive oil?",
        "a": "Published ranges put it around 190 to 210°C. The figure depends on how fresh the oil is and how low its free fatty acid content is."
      },
      {
        "q": "Can I fry with extra virgin olive oil?",
        "a": "Shallow-frying and pan-frying sit inside the range. A long deep-fry on a hard flame does not, and at RM236 a litre it is an expensive way to fill a pot."
      },
      {
        "q": "Does refined olive oil have a higher smoke point?",
        "a": "Yes. Refining removes the free fatty acids and aromatic compounds that break down first, which lifts the figure and takes the flavour with it."
      },
      {
        "q": "What happens to the flavour when olive oil smokes?",
        "a": "It flattens. The fruit and pepper go first and the food picks that up. If a pan has smoked hard, tip the oil out."
      },
      {
        "q": "Why does olive oil smoke in my wok?",
        "a": "A wok on a full flame clears 250°C before anything is added, above the range for any olive oil. Use a lower flame, or another oil for wok work."
      },
      {
        "q": "Does storing the bottle well change the smoke point?",
        "a": "Indirectly. Warmth, light and air raise free fatty acid content over time, so a bottle kept dark, capped and away from the stove holds its tolerance longer."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Single-origin Palestinian cold-pressed oil, RM59.00 for 250 ml and RM103.00 for 500 ml."
      },
      {
        "label": "What cold-pressed olive oil really means",
        "path": "blog/what-cold-pressed-olive-oil-really-means",
        "description": "How the oil is extracted, and why that is the reason it behaves the way it does in a pan."
      },
      {
        "label": "How to choose authentic extra virgin olive oil in Malaysia",
        "path": "blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "description": "What to read on the label and the bottle before you pay for it."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the two online counters."
      },
      {
        "label": "Can you use olive oil in an air fryer?",
        "path": "blog/can-you-use-olive-oil-in-an-air-fryer",
        "description": "How much to use, why sprays damage the basket, and which dial settings suit it."
      },
      {
        "label": "Olive oil vs coconut oil in a Malaysian kitchen",
        "path": "blog/olive-oil-vs-coconut-oil-in-a-malaysian-kitchen",
        "description": "Which of the two fats a dish wants, on flavour, texture and cost."
      },
      {
        "label": "Olive oil vs avocado oil",
        "path": "blog/olive-oil-vs-avocado-oil",
        "description": "Two oils compared on flavour, heat and price per litre, without the health argument."
      },
      {
        "label": "Olive oil for roasting vegetables",
        "path": "blog/olive-oil-for-roasting-vegetables",
        "description": "How much oil per tray, and why a crowded tray steams instead of crisping."
      },
      {
        "label": "Olive oil popcorn",
        "path": "blog/olive-oil-popcorn",
        "description": "Popping corn in olive oil on the stovetop, and what extra virgin adds."
      },
      {
        "label": "Olive oil vs sunflower oil",
        "path": "blog/olive-oil-vs-sunflower-oil",
        "description": "Flavour, smoke behaviour and price per use, olive oil against a refined seed oil."
      }
    ]
  },
  /* ---------------- PRESS round 2 ---------------- */
  {
    "id": "olive-oil-vs-pomace-oil",
    "slug": "olive-oil-vs-pomace-oil-what-the-grades-mean",
    "seoTitle": "Olive Oil vs Pomace Oil: What the Grades Mean",
    "metaTitle": "Olive Oil vs Pomace Oil: What the Grades Mean",
    "metaDescription": "Pomace oil is pulled with solvent from the paste left after pressing. How it differs from extra virgin, and what pure and light really mean on a label.",
    "focusKeyword": "olive oil vs pomace oil",
    "relatedKeywords": [
      "olive oil pomace oil",
      "olive oil vs olive pomace oil",
      "what is pomace oil",
      "pomace oil for cooking",
      "refined olive oil for cooking",
      "extra light olive oil vs extra virgin olive oil",
      "pure olive oil meaning",
      "olive oil grades explained",
      "light olive oil vs extra virgin",
      "is pomace oil real olive oil",
      "olive oil labels Malaysia",
      "extra virgin olive oil Malaysia"
    ],
    "category": "Olive oil basics",
    "tags": [
      "olive oil grades",
      "pomace oil",
      "extra virgin",
      "olive oil labels",
      "buying guide"
    ],
    "h1": "Olive oil vs pomace oil: what the grades on the label mean",
    "excerpt": "Pomace oil, refined olive oil and extra virgin all start as the same fruit but leave the mill by very different routes, and this guide shows what changes at each step and how to read it off a Malaysian label.",
    "keyTakeaway": "Pomace oil is not a lower grade of olive oil. It is pulled with solvent from the paste left over after pressing, then refined until it is neutral. Extra virgin comes from the fruit itself, mechanically, and keeps its taste. Pure, light and extra light are refined oils with a little virgin oil blended back.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 4,
    "hero": {
      "src": "pressOliveOilVsPomaceOilHero",
      "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
    },
    "ogImage": "/og/blog-olive-oil-vs-pomace-oil.jpg",
    "intro": [
      "Two bottles sit side by side on a Malaysian shelf. Both say olive oil. One costs several times the other, and the cheaper one carries a second word: pure, light, or pomace.",
      "Those words are not decoration. Each names a different route out of the fruit, and the price follows the route."
    ],
    "sections": [
      {
        "heading": "What is pomace oil, and how is it different from olive oil?",
        "id": "what-is-pomace-oil",
        "blocks": [
          {
            "type": "p",
            "text": "Pomace oil is made from what is left once the olives have already given up their oil. That cake of skins, pulp and crushed stones still holds a little oil, too little to press out. Pomace oil is what a second, chemical extraction recovers from it."
          },
          {
            "type": "p",
            "text": "So the gap is not one of degree. It is a different raw material, which is why pomace oil is named separately on a label."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsPomaceOilInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          }
        ]
      },
      {
        "heading": "How pomace oil is extracted and refined",
        "id": "how-pomace-is-made",
        "blocks": [
          {
            "type": "p",
            "text": "The wet pomace is dried, then washed with a food-grade solvent, usually hexane, which dissolves the last of the oil out of the solids. The solvent is evaporated off. What is recovered is crude and not edible, so it is refined with heat, alkali and filtering until it is pale and neutral."
          },
          {
            "type": "p",
            "text": "Refining is the same rescue used on virgin oil that failed its grade. It strips the free fatty acids, and with them the aroma compounds behind the green smell and the peppery catch. Extraction itself is covered in [what cold pressed olive oil really means](/blog/what-cold-pressed-olive-oil-really-means)."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsPomaceOilInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          }
        ]
      },
      {
        "heading": "What pure, light and extra light actually mean",
        "id": "pure-light-extra-light",
        "blocks": [
          {
            "type": "p",
            "text": "None of the three is a step above virgin. Pure olive oil, often sold as plain olive oil, is refined oil with a little virgin oil blended back for taste and colour. Light and extra light describe how pale and mild the result is, not calories."
          },
          {
            "type": "ul",
            "items": [
              "**Extra virgin** — a grade earned on lab and taste checks.",
              "**Virgin** — same route, one step down, minor defects allowed.",
              "**Pure or classic** — refined oil with virgin blended back.",
              "**Light and extra light** — that blend, paler and milder.",
              "**Pomace** — a different raw material, solvent-extracted."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsPomaceOilInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          }
        ]
      },
      {
        "heading": "Olive oil vs pomace oil: the grades side by side",
        "id": "grades-compared",
        "blocks": [
          {
            "type": "p",
            "text": "Read the table across, not down. The first column is what the oil is made from and how, the second is what that leaves in the bottle, and the third is where the price sits against the rest. None of it is about brand."
          },
          {
            "type": "table",
            "head": [
              "Grade",
              "How it is made",
              "Taste",
              "Price"
            ],
            "rows": [
              [
                "Extra virgin",
                "Fresh fruit, mechanical only",
                "Fruity, bitter, peppery",
                "Highest"
              ],
              [
                "Virgin",
                "Same route, fruit less perfect",
                "Milder, less clean",
                "High"
              ],
              [
                "Refined",
                "Faulty virgin oil, neutralised by heat",
                "Almost none",
                "Middle"
              ],
              [
                "Pure, light, extra light",
                "Refined oil, some virgin blended back",
                "Faint at most",
                "Middle"
              ],
              [
                "Pomace",
                "Leftover paste, solvent, then refining",
                "Neutral",
                "Lowest"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsPomaceOilInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          }
        ]
      },
      {
        "heading": "Where each grade belongs in a kitchen",
        "id": "kitchen-use",
        "blocks": [
          {
            "type": "p",
            "text": "Refined and pomace oils are bought for volume and neutrality: deep-frying, greasing trays, cooking where no oil flavour is wanted. Extra virgin is bought for the opposite reason. Its value is the taste, so it belongs where you can still taste it — finishing, dressing, dipping and gentle heat."
          },
          {
            "type": "p",
            "text": "That is how to read the price. Arabian Village extra virgin is RM59.00 for 250 ml and RM103.00 for 500 ml, or RM236 and RM206 a litre. Pomace costs a fraction of that, because it does a fraction of the job. More in [olive oil price in Malaysia](/blog/olive-oil-price-in-malaysia-what-you-are-paying-for)."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsPomaceOilInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          }
        ]
      },
      {
        "heading": "How to tell which one is in the bottle in front of you",
        "id": "reading-the-label",
        "blocks": [
          {
            "type": "p",
            "text": "The grade has to be printed somewhere, so start with the words, not the glass. Colour tells you almost nothing: it follows the olive variety, the ripeness at harvest and the filtering. A deep green oil is not automatically extra virgin, and a pale one is not automatically refined."
          },
          {
            "type": "ul",
            "items": [
              "Find the grade in full, not just the words olive oil.",
              "Read pure, light and pomace as refined unless told otherwise.",
              "Prefer one named country of origin over a blend.",
              "Look for a harvest or best-before date, and dark glass.",
              "Compare price per litre, not per bottle."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsPomaceOilInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          },
          {
            "type": "p",
            "text": "More checks before you pay are in [how to choose authentic extra virgin olive oil](/blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Olive oil vs pomace oil is not a good bottle against a bad one. They are two products with two jobs. Pomace is cheap, neutral fat from a by-product. Extra virgin is fruit juice, and you pay extra for flavour."
        },
        {
          "type": "p",
          "text": "Read the grade before the price. Arabian Village is a single-origin Palestinian cold-pressed [extra virgin olive oil](/products)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is pomace oil real olive oil?",
        "a": "It comes from olives, but not from the fruit as pressed. It is recovered with solvent from the residue, then refined. Labelling rules require it to be sold under its own name."
      },
      {
        "q": "Can you cook with pomace oil?",
        "a": "You can. It is refined, neutral and stable, which is why kitchens that fry in volume use it. It brings no flavour of its own, so the case for extra virgin does not apply."
      },
      {
        "q": "Is extra light olive oil lower in calories?",
        "a": "No. Light and extra light describe colour and taste after refining. Every culinary oil carries the same energy per gram. A lighter olive oil is lighter only in flavour."
      },
      {
        "q": "Why is pomace oil so much cheaper?",
        "a": "It is made from a by-product that would otherwise be fuel or compost, recovered in bulk and refined continuously. The fruit was already paid for by the first extraction."
      },
      {
        "q": "Does pure olive oil mean nothing was added?",
        "a": "Not as most shoppers read it. Pure olive oil is refined oil with a small share of virgin oil blended back for taste. The word marks the absence of other seed oils."
      },
      {
        "q": "What grade is Arabian Village olive oil?",
        "a": "A single-origin Palestinian cold-pressed extra virgin olive oil, sold at RM59.00 for 250 ml and RM103.00 for 500 ml through Berkat Madinah Store, its only distributor in Malaysia."
      }
    ],
    "related": [
      {
        "label": "What cold pressed olive oil really means",
        "path": "blog/what-cold-pressed-olive-oil-really-means",
        "description": "The extraction method behind the extra virgin grade, and what the phrase does not promise."
      },
      {
        "label": "How to choose authentic extra virgin olive oil in Malaysia",
        "path": "blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "description": "What to check on the bottle before you pay for it."
      },
      {
        "label": "Olive oil price in Malaysia",
        "path": "blog/olive-oil-price-in-malaysia-what-you-are-paying-for",
        "description": "Why a per-litre comparison is the only honest way to compare two bottles."
      },
      {
        "label": "The Arabian Village range",
        "path": "products",
        "description": "Single-origin Palestinian extra virgin olive oil and the six-botanical Infused Collection."
      },
      {
        "label": "Extra virgin vs pure olive oil",
        "path": "blog/extra-virgin-olive-oil-vs-pure-olive-oil",
        "description": "What \"pure\", \"classic\" and \"light\" mean on a Malaysian shelf."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "evoo-salad-dressing",
    "slug": "extra-virgin-olive-oil-salad-dressing",
    "seoTitle": "Extra Virgin Olive Oil Salad Dressing: Ratios",
    "metaTitle": "Extra Virgin Olive Oil Salad Dressing: Ratios",
    "metaDescription": "The 3:1 ratio, an emulsion method that holds, the faults that split a dressing, four builds for tonight, and how long a jar keeps in the fridge.",
    "focusKeyword": "extra virgin olive oil salad dressing",
    "relatedKeywords": [
      "olive oil salad dressing recipe",
      "olive oil and vinegar dressing ratio",
      "how to make vinaigrette",
      "lemon olive oil dressing",
      "olive oil salad dressing malaysia",
      "balsamic vinaigrette recipe",
      "why does my dressing separate",
      "emulsify salad dressing",
      "homemade salad dressing shelf life",
      "olive oil for cold dishes",
      "best olive oil for salad",
      "mustard vinaigrette"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "salad dressing",
      "vinaigrette",
      "cooking with olive oil",
      "extra virgin"
    ],
    "h1": "Extra Virgin Olive Oil Salad Dressing: Ratios and Method",
    "excerpt": "An extra virgin olive oil salad dressing is three parts oil to one part acid, an emulsifier, and a slow pour. Everything else is a variation on that.",
    "keyTakeaway": "An extra virgin olive oil salad dressing is three parts oil to one part acid by volume, held together by mustard, honey or crushed garlic and a slow whisked pour. Dissolve the salt in the acid first. Keep the rest in a capped glass jar in the fridge and shake it back together.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressEvooSaladDressingHero",
      "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
    },
    "ogImage": "/og/blog-evoo-salad-dressing.jpg",
    "intro": [
      "A salad dressing is the shortest recipe in the kitchen and one of the easiest to get wrong, usually because the oil hit the bowl before the salt had dissolved. Three ingredients, one order of operations, ninety seconds.",
      "Below: the ratios, a whisking method that holds, the faults that split a dressing, four builds, and how long a jar keeps."
    ],
    "sections": [
      {
        "heading": "The ratio to start from",
        "id": "the-ratio",
        "blocks": [
          {
            "type": "p",
            "text": "A vinaigrette starts at three parts oil to one part acid, measured by volume. Three tablespoons of extra virgin olive oil to one tablespoon of lemon juice dresses a bowl of leaves for four. Shift to 2:1 on sturdy leaves, and to 4:1 when the vinegar is strong."
          },
          {
            "type": "table",
            "head": [
              "Oil to acid",
              "What it suits",
              "Leaves"
            ],
            "rows": [
              [
                "2:1",
                "Sharp, cuts richness",
                "Kale, cabbage, raw carrot"
              ],
              [
                "3:1",
                "The default vinaigrette",
                "Romaine, butterhead, mixed leaves"
              ],
              [
                "4:1",
                "Softens a strong vinegar",
                "Rocket, spinach"
              ],
              [
                "5:1",
                "Oil forward, barely dressed",
                "Ripe tomato, avocado"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressEvooSaladDressingInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      },
      {
        "heading": "How to make the emulsion hold",
        "id": "emulsion-method",
        "blocks": [
          {
            "type": "p",
            "text": "Oil and acid do not dissolve in one another, so something has to hold them suspended. A teaspoon of Dijon mustard, half a teaspoon of honey, or a garlic clove crushed to a paste with salt will each do it. Order matters more than the whisk."
          },
          {
            "type": "ol",
            "items": [
              "Stir the acid, salt and pepper together until the salt dissolves. Salt will not dissolve in oil.",
              "Whisk in the mustard, honey or garlic paste.",
              "Pour the oil in a thin stream, whisking without stopping, until it thickens and turns opaque.",
              "Taste it on a leaf, not off the spoon: more oil if it bites, more acid if it sits flat."
            ]
          },
          {
            "type": "image",
            "src": "pressEvooSaladDressingInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      },
      {
        "heading": "What goes wrong, and the fix",
        "id": "what-goes-wrong",
        "blocks": [
          {
            "type": "p",
            "text": "Almost every failed dressing is one of four things: the oil went in too fast, the salt never dissolved, there was no emulsifier, or the leaves were wet from the tap. A split dressing still rebuilds — whisk fresh mustard in a clean bowl and pour the split mixture in slowly."
          },
          {
            "type": "ul",
            "items": [
              "**Split at once.** No emulsifier. Rebuild it onto mustard or garlic paste.",
              "**Harsh.** Too much acid, or salt added last. Add oil a teaspoon at a time.",
              "**Flat.** Wet leaves dilute whatever lands on them. Spin or pat them dry.",
              "**Solid in the fridge.** Normal. Twenty minutes on the counter reverses it."
            ]
          },
          {
            "type": "image",
            "src": "pressEvooSaladDressingInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      },
      {
        "heading": "Which oil, and when to pour it",
        "id": "which-oil-and-when",
        "blocks": [
          {
            "type": "p",
            "text": "A dressing is an unheated use, so the oil's own character lands on the plate rather than being cooked off. Extra virgin is the grade that has one: green, fruity, peppery at the back of the throat. Refined pure and light grades are processed to taste of almost nothing. For where that character comes from, read [what cold-pressed olive oil really means](/blog/what-cold-pressed-olive-oil-really-means)."
          },
          {
            "type": "p",
            "text": "Dress at the table. Salt and acid draw water from a leaf within minutes."
          },
          {
            "type": "image",
            "src": "pressEvooSaladDressingInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      },
      {
        "heading": "Four dressings on the same base",
        "id": "four-dressings",
        "blocks": [
          {
            "type": "p",
            "text": "Four dressings run off one base: three parts extra virgin olive oil to one part acid, the salt dissolved in the acid first, the oil whisked in last. Lemon and garlic, mustard vinaigrette, balsamic, and calamansi with soy each change a single ingredient. The quantities dress a bowl for four."
          },
          {
            "type": "ol",
            "items": [
              "**Lemon and garlic.** 3 tbsp oil, 1 tbsp lemon juice, one clove crushed with salt, black pepper. For cucumber and tomato.",
              "**Mustard vinaigrette.** 3 tbsp oil, 1 tbsp red wine vinegar, 1 tsp Dijon, a little honey. For romaine and boiled egg.",
              "**Balsamic.** 4 tbsp oil, 1 tbsp balsamic vinegar, salt. For tomato, rocket and anything with cheese.",
              "**Calamansi and soy.** 3 tbsp oil, 1 tbsp calamansi juice, 1 tsp light soy sauce. For shredded cabbage and mango."
            ]
          },
          {
            "type": "image",
            "src": "pressEvooSaladDressingInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      },
      {
        "heading": "What to keep it in and how long it keeps",
        "id": "storage-and-keeping",
        "blocks": [
          {
            "type": "p",
            "text": "A screw-top glass jar is the whole storage answer: mix in it, pour from it, cap the rest and shake it back together. Plain oil, vinegar and mustard keeps about two weeks in the refrigerator, and anything fresh stirred in cuts that to a few days."
          },
          {
            "type": "table",
            "head": [
              "Dressing",
              "Where",
              "How long"
            ],
            "rows": [
              [
                "Oil, vinegar, mustard, salt",
                "Fridge, capped",
                "About 2 weeks"
              ],
              [
                "With raw garlic or shallot",
                "Fridge, capped",
                "3 to 4 days"
              ],
              [
                "With soft fresh herbs",
                "Fridge, capped",
                "2 to 3 days"
              ],
              [
                "With yogurt or tahini",
                "Fridge, capped",
                "2 days"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressEvooSaladDressingInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Three parts oil, one part acid, the salt dissolved in the acid first, mustard or garlic to hold it, the oil poured last in a thin stream. Keep the rest capped in the fridge."
        }
      ]
    },
    "faqs": [
      {
        "q": "What is the ratio of olive oil to vinegar in a salad dressing?",
        "a": "Three parts oil to one part vinegar by volume: three tablespoons of extra virgin olive oil to one tablespoon of vinegar. Use 2:1 for a sharper dressing on sturdy leaves, and 4:1 when the vinegar is strong."
      },
      {
        "q": "Can I use extra virgin olive oil for salad dressing?",
        "a": "Yes, and a dressing is the use that shows it best. Nothing is heated, so the fruit, bitterness and peppery finish reach the plate intact. Refined pure and light grades are processed to taste of very little."
      },
      {
        "q": "Why does my olive oil dressing separate?",
        "a": "Oil and acid do not dissolve in one another, so a dressing with no emulsifier separates within a minute. A teaspoon of mustard, a little honey, or garlic crushed to a paste with salt holds them together."
      },
      {
        "q": "How do I fix a dressing that has split?",
        "a": "Whisk a fresh teaspoon of Dijon mustard in a clean bowl, then pour the split dressing into it in a thin stream, whisking throughout. It comes back together. Pouring the oil too fast is the usual cause."
      },
      {
        "q": "How long does homemade salad dressing keep?",
        "a": "Oil, vinegar, mustard and salt keeps about two weeks in a capped jar in the fridge. Raw garlic or shallot brings that to three or four days, soft herbs to two or three, yogurt or tahini to two."
      },
      {
        "q": "Why does my dressing go solid in the fridge?",
        "a": "Olive oil clouds and turns semi-solid at fridge temperature, which is normal rather than a fault. Take the jar out about twenty minutes before the meal and shake it back together before pouring."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml bottles, with the current price for each size."
      },
      {
        "label": "What cold-pressed olive oil really means",
        "path": "blog/what-cold-pressed-olive-oil-really-means",
        "description": "How the oil is extracted, and why that decides the taste a raw dressing puts on the plate."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Where the same bottle fits across a week of cooking once the pan is involved."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's Shopee and TikTok Shop counters."
      },
      {
        "label": "Olive oil substitute: what to use instead",
        "path": "blog/olive-oil-substitute-what-to-use-instead",
        "description": "What to reach for when the bottle is empty, split by the job in hand."
      },
      {
        "label": "Olive oil and balsamic vinegar",
        "path": "blog/olive-oil-and-balsamic-vinegar",
        "description": "Why the pairing needs a ratio, and where a cheap balsamic changes it."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "evoo-vs-pure-olive-oil",
    "slug": "extra-virgin-olive-oil-vs-pure-olive-oil",
    "seoTitle": "Extra Virgin Olive Oil vs Pure Olive Oil",
    "metaTitle": "Extra Virgin Olive Oil vs Pure Olive Oil",
    "metaDescription": "Extra virgin olive oil vs pure olive oil: what pure, classic, light and extra light mean on a label, how refined oil is made, and which one to buy.",
    "focusKeyword": "extra virgin olive oil vs pure olive oil",
    "relatedKeywords": [
      "pure olive oil vs extra virgin",
      "what is pure olive oil",
      "what does pure olive oil mean",
      "refined olive oil meaning",
      "is pure olive oil refined",
      "classic olive oil meaning",
      "extra light olive oil",
      "what does light olive oil mean",
      "which olive oil to buy in malaysia",
      "olive oil label words"
    ],
    "category": "Olive oil basics",
    "tags": [
      "olive oil grades",
      "extra virgin",
      "refined olive oil",
      "buying guide"
    ],
    "h1": "Extra Virgin Olive Oil vs Pure Olive Oil: What Changes",
    "excerpt": "Extra virgin olive oil vs pure olive oil comes down to refining, and pure, classic, light and extra light all sit on the refined side of that line.",
    "keyTakeaway": "Extra virgin olive oil vs pure olive oil is a question of refining. Pure, classic, light and extra light are four shelf names for the same thing: refined olive oil with a little virgin blended back in. Extra virgin is pressed and bottled untreated, and it is the only one of them that still tastes of the fruit.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressEvooVsPureOliveOilHero",
      "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
    },
    "ogImage": "/og/blog-evoo-vs-pure-olive-oil.jpg",
    "intro": [
      "Three bottles on the same shelf, three different words, and no explanation of any of them: extra virgin, then pure or classic, then light or extra light.",
      "One thing separates them: how much of the bottle came straight off the press, and how much was refined in a plant first."
    ],
    "sections": [
      {
        "heading": "What pure, classic, light and extra light mean",
        "id": "what-the-labels-mean",
        "blocks": [
          {
            "type": "p",
            "text": "Pure, classic, light and extra light are four shelf names for one construction: refined olive oil with a small share of virgin oil blended back in for colour and taste. The trade standard calls that blend simply olive oil, and the words on the front are the bottler's."
          },
          {
            "type": "ul",
            "items": [
              "**Pure.** Refined oil with a little virgin blended back into it.",
              "**Classic.** The same blend under a softer name, common on imported bottles.",
              "**Light.** The same blend filtered paler. Light describes colour and taste.",
              "**Extra light.** The palest of the four, and the furthest from tasting of olives."
            ]
          },
          {
            "type": "image",
            "src": "pressEvooVsPureOliveOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          },
          {
            "type": "p",
            "text": "For the full ladder, from extra virgin down to the oil drawn out of the solids left after pressing, read [olive oil vs pomace oil](/blog/olive-oil-vs-pomace-oil-what-the-grades-mean)."
          }
        ]
      },
      {
        "heading": "How the refined grades are made",
        "id": "how-they-are-made",
        "blocks": [
          {
            "type": "p",
            "text": "Refining starts with oil that failed the virgin grades on acidity or on taste. Heat, filtration and neutralisation strip out the compounds that carried its colour, its smell and its flavour, leaving a pale fat that hazes at a higher pan temperature. A little virgin oil goes back in at the end."
          },
          {
            "type": "ul",
            "items": [
              "**Colour.** Deep green or gold becomes pale yellow.",
              "**Aroma.** Cut grass, tomato leaf and green almond disappear.",
              "**Taste.** The bitterness and the peppery catch at the back of the throat go.",
              "**Origin.** A refined blend can draw on oil from several countries."
            ]
          },
          {
            "type": "image",
            "src": "pressEvooVsPureOliveOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          },
          {
            "type": "p",
            "text": "How much virgin oil goes back is the bottler's decision rather than a fixed figure, so two bottles marked pure need not taste alike."
          }
        ]
      },
      {
        "heading": "Extra virgin as the reference point",
        "id": "extra-virgin-reference-point",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin is the point all four of those words are measured against. It is pressed from olives by mechanical means alone, with no chemical treatment, capped at 0.8% free acidity and allowed no tasting defect at all. Nothing is blended back in, because nothing was taken out."
          },
          {
            "type": "p",
            "text": "Its range in the kitchen is also wider than the shelf words suggest: dressings and a saucer of dipping oil, and equally tumis, roasting and shallow frying. What it will not do is fill a deep pot cheaply. [Olive oil smoke point](/blog/olive-oil-smoke-point-what-heat-it-can-take) sets out the heat it takes."
          },
          {
            "type": "image",
            "src": "pressEvooVsPureOliveOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          }
        ]
      },
      {
        "heading": "Extra virgin olive oil vs pure olive oil, side by side",
        "id": "extra-virgin-vs-pure-side-by-side",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin olive oil is unrefined juice of the olive, and it tastes different by grove and harvest. Pure olive oil is mostly refined oil with a little virgin stirred in, sold cheaper per litre for a flatter flavour. Only one of the two still tastes of olives."
          },
          {
            "type": "table",
            "head": [
              "Label",
              "How it is made",
              "Taste",
              "Best for"
            ],
            "rows": [
              [
                "Extra virgin",
                "Pressed, unrefined, under 0.8% acidity",
                "Fruity, bitter, peppery",
                "Raw, tumis, roasting, shallow frying"
              ],
              [
                "Pure or classic",
                "Refined oil plus a little virgin",
                "Almost neutral",
                "A full pot for deep frying"
              ],
              [
                "Light or extra light",
                "Refined further, less virgin in it",
                "Neutral, pale",
                "Cakes and mayonnaise"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressEvooVsPureOliveOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          }
        ]
      },
      {
        "heading": "Which one to buy, and what it costs",
        "id": "which-one-to-buy",
        "blocks": [
          {
            "type": "p",
            "text": "Buy extra virgin for anything the oil will be tasted in, which covers most of what a bottle does at home. Buy a refined grade when a pot must be filled for deep frying, or when a cake wants no flavour from its fat. Refined grades cost less per litre."
          },
          {
            "type": "ol",
            "items": [
              "Dressings, dips and a drizzle over a finished plate: extra virgin.",
              "Tumis, roasting and shallow frying: extra virgin, and the taste carries into the food.",
              "Deep frying a full pot: a refined grade, and keep the extra virgin for the plate.",
              "Baking where the oil should not be tasted: light or extra light."
            ]
          },
          {
            "type": "image",
            "src": "pressEvooVsPureOliveOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          },
          {
            "type": "p",
            "text": "Arabian Village bottles extra virgin only, in two sizes. Current prices are on the [product page](/products)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Extra virgin is pressed and bottled. Pure, classic, light and extra light are refined oil with a little virgin stirred back in. The first tastes of the fruit; the second of very little. Choose by what the oil must do on the plate."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is pure olive oil the same as extra virgin olive oil?",
        "a": "No. Pure olive oil is refined olive oil with a small amount of virgin oil blended in for colour and taste. Extra virgin is pressed and bottled with no refining. Both are legally olive oil, but only one still carries the flavour of the fruit."
      },
      {
        "q": "What does refined mean on an olive oil label?",
        "a": "Refined means the oil was treated with heat and filtration until the compounds that give olive oil its colour, smell and taste were stripped out. It rescues oil that failed the virgin grades and turns it into a neutral cooking fat that takes a higher pan temperature."
      },
      {
        "q": "Is light olive oil a higher grade than pure olive oil?",
        "a": "No. Light and extra light are shelf words for colour and taste, not grades in any trade standard. The oil is the same refined blend sold as pure olive oil, filtered further so it pours pale and adds almost nothing to the flavour of a dish."
      },
      {
        "q": "Can I fry with pure olive oil?",
        "a": "Yes. A refined grade hazes at a higher temperature and costs less per litre, which makes it sensible when a whole pot has to be filled. Little is lost in taste, since there was little to begin with."
      },
      {
        "q": "Why does extra virgin olive oil cost more?",
        "a": "Extra virgin has to pass on the first attempt. The olives must reach the mill quickly and be pressed without heat, and a batch that fails on acidity or taste cannot be sold as extra virgin at any price. Refining starts from that failed stock."
      },
      {
        "q": "Which grade do I use for a salad dressing?",
        "a": "Extra virgin, because a dressing is unheated and the oil is tasted directly. The ratios and the method are in [extra virgin olive oil salad dressing](/blog/extra-virgin-olive-oil-salad-dressing)."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Single-origin Palestinian cold-pressed extra virgin oil, in 250 ml and 500 ml bottles."
      },
      {
        "label": "Olive oil vs pomace oil: what the grades mean",
        "path": "blog/olive-oil-vs-pomace-oil-what-the-grades-mean",
        "description": "Where pomace oil comes from, and why it sits outside the pressed and refined grades above."
      },
      {
        "label": "How to choose authentic extra virgin olive oil in Malaysia",
        "path": "blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "description": "What to read on the label and the bottle before you pay for it."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the two online counters."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "olive-oil-air-fryer",
    "slug": "can-you-use-olive-oil-in-an-air-fryer",
    "seoTitle": "Olive Oil in an Air Fryer: How Much, How Hot",
    "metaTitle": "Olive Oil in an Air Fryer: How Much, How Hot",
    "metaDescription": "Using olive oil in air fryer baskets: brush a teaspoon instead of pouring, skip aerosol sprays, and match the dial to what the oil can take.",
    "focusKeyword": "olive oil in air fryer",
    "relatedKeywords": [
      "can you use olive oil in an air fryer",
      "best oil for air fryer",
      "air fryer olive oil spray",
      "how much oil in air fryer",
      "extra virgin olive oil air fryer",
      "air fryer temperature celsius",
      "air fryer basket coating damage",
      "air fryer potato wedges olive oil",
      "olive oil brush air fryer",
      "air fryer oil malaysia"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "air fryer",
      "cooking with olive oil",
      "kitchen guide",
      "extra virgin"
    ],
    "h1": "Can You Use Olive Oil in an Air Fryer?",
    "excerpt": "An air fryer needs a teaspoon of oil on the food, not a pour in the basket, and how you put it on matters more than which grade you reach for.",
    "keyTakeaway": "Olive oil belongs in an air fryer on the food, never in the basket. Brush or toss roughly a teaspoon over a full basket, keep aerosol cans away from the coating, and set the dial at 180 to 200°C for most things. Coat anything dry and starchy; leave wet batter to a pan.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilAirFryerHero",
      "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
    },
    "ogImage": "/og/blog-olive-oil-air-fryer.jpg",
    "intro": [
      "The air fryer has become a fixture on Malaysian kitchen counters, and nobody was given instructions for it. It is a small fan oven, not a fryer, and its oil does a different job from the oil in a wok.",
      "Yes, olive oil works in one. What changes is the quantity and how it goes on."
    ],
    "sections": [
      {
        "heading": "How much olive oil an air fryer basket takes",
        "id": "how-much-oil",
        "blocks": [
          {
            "type": "p",
            "text": "A full air fryer basket needs roughly one teaspoon of olive oil, tossed through the food before it goes in. The machine moves hot air rather than submerging anything, so oil not clinging to a surface drains to the drawer and burns there. Toss until each piece is glossy."
          },
          {
            "type": "ul",
            "items": [
              "**One teaspoon** for a basket of chips, wedges or florets.",
              "**Half a teaspoon** for chicken, which releases its own fat.",
              "**A brushed film** for bread, halloumi or anything already coated.",
              "**None** for reheating something fried once already."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilAirFryerInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "Why aerosol sprays wreck an air fryer basket",
        "id": "aerosol-sprays",
        "blocks": [
          {
            "type": "p",
            "text": "Commercial cooking sprays carry more than oil. Propellants and additives such as lecithin land as a fine mist on the basket coating, bake on and build a sticky brown film that washing will not shift. Manufacturer manuals commonly warn against them. Use a pump mister or a silicone brush."
          },
          {
            "type": "table",
            "head": [
              "Method",
              "Coverage",
              "Effect on the basket"
            ],
            "rows": [
              [
                "Aerosol can",
                "Wide, uncontrolled",
                "Baked-on film"
              ],
              [
                "Pump mister",
                "Even, adjustable",
                "Clean"
              ],
              [
                "Silicone brush",
                "Food only",
                "None"
              ],
              [
                "Tossed in a bowl",
                "Every surface",
                "None"
              ],
              [
                "Poured in",
                "Pools and drains",
                "Smoke, oil in the drawer"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilAirFryerInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "What an air fryer runs at, against what the oil takes",
        "id": "temperature-range",
        "blocks": [
          {
            "type": "p",
            "text": "An air fryer dial climbs higher than an olive oil coating ever needs. Set 180 to 200°C for chips, wedges, root vegetables and chicken, and 160 to 170°C for fish, bread and anything that browns quickly. Leave the top of the dial for cooking with nothing brushed on."
          },
          {
            "type": "p",
            "text": "While the food is still giving off steam, the oiled surface stays below the air temperature. The bare patches of a half-loaded basket scorch first. For figures by grade, read [olive oil smoke point](/blog/olive-oil-smoke-point-what-heat-it-can-take)."
          },
          {
            "type": "image",
            "src": "pressOliveOilAirFryerInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "Which foods take olive oil well in an air fryer",
        "id": "which-foods",
        "blocks": [
          {
            "type": "p",
            "text": "Dry, starchy and firm foods take olive oil best, because there is a surface for it to hold and something for the heat to crisp. Potatoes, root vegetables, cauliflower, chickpeas, chicken thighs, prawns and thick bread all work. Wet batter does not, and loose flour blows onto the element."
          },
          {
            "type": "ol",
            "items": [
              "Cut and dry the food, since a damp surface steams before it browns.",
              "Toss it with the oil and salt in a bowl, off the machine.",
              "Load one layer only, with gaps for the air to move.",
              "Shake the basket once halfway, then drizzle raw oil over it afterwards."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilAirFryerInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "Which grade goes in the basket",
        "id": "which-grade",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin is the grade to reach for, because the quantity is so small. A teaspoon over a full basket is not where a bottle disappears, and the coating is doing a mechanical job: drying the surface, helping it brown, keeping it off the metal."
          },
          {
            "type": "p",
            "text": "What the fan does take is the aroma, which fades at 200°C whichever grade goes in. So hold a spoonful back and drizzle it over the food once the basket is out. Sizes and prices are on the [Arabian Village product page](/products)."
          },
          {
            "type": "image",
            "src": "pressOliveOilAirFryerInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "Keeping the drawer clean when you cook with oil",
        "id": "cleaning",
        "blocks": [
          {
            "type": "p",
            "text": "Oil that misses the food collects in the drawer under the basket, and left there it bakes into a varnish that smokes on the next run. Wash the basket and drawer after any oiled cook, while both are still warm. Soapy water and a soft brush is the job."
          },
          {
            "type": "ul",
            "items": [
              "Wipe the drawer out first, so grease does not go down the sink.",
              "Never use steel wool or a scouring pad on the coating.",
              "Dry both parts before they go back in a humid kitchen."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilAirFryerInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "A teaspoon on the food, never a pour in the basket. A brush or a bowl, not an aerosol can. Extra virgin for that teaspoon, a spoonful more once it is out, and a wash while it is warm. See also [cooking with olive oil in a Malaysian kitchen](/blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Can you put olive oil in an air fryer?",
        "a": "Yes, on the food rather than in the basket. Toss or brush about a teaspoon over a full basket before cooking. Oil poured straight into the basket drains into the drawer below and burns there instead of crisping anything at all."
      },
      {
        "q": "Can I use extra virgin olive oil in an air fryer?",
        "a": "Yes, and it is the grade to use. A teaspoon over a full basket is a small amount, and at the usual 180 to 200°C it copes with the heat. The aroma fades under the fan, so keep a spoonful back for afterwards."
      },
      {
        "q": "Why should I not use olive oil spray in an air fryer?",
        "a": "Aerosol cans carry propellants and additives alongside the oil. Those settle on the basket coating, bake on and build a sticky film that will not wash off, so the surface stops releasing food properly. A refillable pump mister avoids it."
      },
      {
        "q": "How much oil does an air fryer basket need?",
        "a": "About one teaspoon for a full basket of chips or vegetables, and roughly half that for chicken, which releases its own fat as it cooks. If oil is still pooling in the mixing bowl after tossing, the amount was too high."
      },
      {
        "q": "What temperature should I set for olive oil in an air fryer?",
        "a": "Use 180 to 200°C for potatoes, chicken and root vegetables, and 160 to 170°C for delicate items such as fish or bread. Leave the very top of the dial for cooking with nothing brushed on, where there is no oil on the surface to scorch."
      },
      {
        "q": "Should I preheat the air fryer before adding oiled food?",
        "a": "A three-minute preheat helps things crisp rather than dry out, and costs very little. Oil the food while the machine warms, then load it in one layer. Never leave an oiled basket heating on its own with nothing in it."
      }
    ],
    "related": [
      {
        "label": "Olive oil smoke point: what heat it can take",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "The approximate ranges by grade, and why a fresh bottle takes more heat than an old one."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Where the oil fits across tumis, roasting and the rest of a week of meals."
      },
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml bottles, with the current price for each size."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "olive-oil-for-bread",
    "slug": "olive-oil-for-bread-and-dipping",
    "seoTitle": "Olive Oil for Bread: How to Serve a Dipping Saucer",
    "metaTitle": "Olive Oil for Bread: How to Serve a Dipping Saucer",
    "metaDescription": "Olive oil for bread, done properly: which bread holds oil, za'atar and dukkah and balsamic, serving temperature, and how much to pour at a time.",
    "focusKeyword": "olive oil for bread",
    "relatedKeywords": [
      "olive oil dipping sauce",
      "bread dipping oil",
      "za'atar and olive oil",
      "dukkah olive oil dip",
      "olive oil and balsamic for bread",
      "how to serve olive oil with bread",
      "best bread for olive oil",
      "extra virgin olive oil for dipping",
      "olive oil dip recipe",
      "olive oil serving temperature"
    ],
    "category": "Serving and pairing",
    "tags": [
      "dipping",
      "za'atar",
      "bread",
      "serving"
    ],
    "h1": "Olive Oil for Bread: Dipping, Za'atar and How Much to Pour",
    "excerpt": "A saucer of unheated oil and a torn piece of bread is the plainest test an olive oil ever gets, and the easiest one to set badly.",
    "keyTakeaway": "Olive oil for bread is the use where least hides the oil: no heat, no acid, no garlic. Serve it at room temperature in a shallow saucer, pour a tablespoon at a time and refill, tear an open-crumbed bread rather than cutting it, and keep za'atar and dukkah in separate bowls.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilForBreadHero",
      "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
    },
    "ogImage": "/og/blog-olive-oil-for-bread.jpg",
    "intro": [
      "Bread and a saucer of olive oil is one of the oldest ways to serve it and the hardest to hide behind. Nothing is heated, nothing is cut with vinegar, nothing is buried under garlic.",
      "Which bread holds oil, what za'atar, dukkah and balsamic each do to a saucer, what temperature to serve at, and how much to pour."
    ],
    "sections": [
      {
        "heading": "Why an unheated saucer shows the oil's character",
        "id": "unheated-oil-shows-character",
        "blocks": [
          {
            "type": "p",
            "text": "Dipping is the use where least happens to the oil. Heat drives off the volatile compounds carrying the grassy and peppery notes, and a dressing cuts them with acid and salt. On bread the oil arrives whole: fruit first, then bitterness, then pepper at the back of the throat."
          },
          {
            "type": "p",
            "text": "A saucer is unforgiving of a tired bottle: oil that stood open beside the stove since March reads flat here."
          },
          {
            "type": "image",
            "src": "pressOliveOilForBreadInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      },
      {
        "heading": "The bread matters as much as the oil",
        "id": "which-bread-to-use",
        "blocks": [
          {
            "type": "p",
            "text": "Bread decides how much oil reaches you and in what state. An open, chewy crumb takes a measured amount and holds its shape to your mouth. A soft sandwich loaf wets straight through and turns greasy; a dry cracker snaps and leaves the oil behind."
          },
          {
            "type": "ul",
            "items": [
              "**Arabic flatbread, pita or saj.** Tear it; a torn edge holds more oil.",
              "**Sourdough or a country loaf.** Open crumb takes oil, crust gives you a grip.",
              "**Warm roti canai or naan.** Fine, but they carry their own fat, so pour less.",
              "**Soft sandwich bread.** Skip it: soaks through and tears."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForBreadInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      },
      {
        "heading": "Za'atar, dukkah and balsamic pull three ways",
        "id": "three-directions",
        "blocks": [
          {
            "type": "p",
            "text": "Three additions take a saucer three different places. Za'atar turns it herbal and sour, with thyme, sumac and sesame. Dukkah turns it nutty and crunchy, a dry mix of toasted nuts and seeds. Balsamic turns it sharp and never mixes: the vinegar sits under the oil in beads."
          },
          {
            "type": "ul",
            "items": [
              "**Za'atar.** A teaspoon per tablespoon of oil, left five minutes.",
              "**Dukkah.** Keep it dry in its own bowl; press oiled bread into it.",
              "**Balsamic.** Oil first, vinegar dropped in the centre, no stirring.",
              "**Flaky salt and cracked pepper.** Changes the oil least.",
              "**Chilli flakes with lemon zest.** Bright and hot, good with a green oil."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForBreadInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          },
          {
            "type": "p",
            "text": "The same pairing is sold ready made as [wild thyme infused olive oil](/products/infused-extra-virgin-olive-oil-wild-thyme), the leaf steeped into the oil rather than spooned on top."
          }
        ]
      },
      {
        "heading": "Serving temperature and how much to pour",
        "id": "temperature-and-quantity",
        "blocks": [
          {
            "type": "p",
            "text": "Serve olive oil for bread at room temperature, which a Malaysian kitchen manages without help. A bottle straight from the refrigerator is the problem: cold oil goes cloudy, thickens and gives up almost no aroma. Take it out an hour ahead and pour a shallow layer."
          },
          {
            "type": "table",
            "head": [
              "Serving",
              "Oil per saucer",
              "Refill"
            ],
            "rows": [
              [
                "One person",
                "1 tablespoon",
                "From the bottle"
              ],
              [
                "Two to four",
                "2 to 3 tablespoons",
                "Every fifteen minutes"
              ],
              [
                "Six or more",
                "A saucer per two",
                "Each saucer"
              ],
              [
                "Mezze, long meal",
                "A small jug",
                "Pour to order"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForBreadInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      },
      {
        "heading": "Setting a dipping course for guests",
        "id": "serving-for-guests",
        "blocks": [
          {
            "type": "p",
            "text": "A dipping course takes two minutes and one decision: the oil goes out plain first and everything else follows. Guests who have tasted the oil alone know what they are dipping into, and the za'atar bowl stops being the only thing they remember."
          },
          {
            "type": "ol",
            "items": [
              "Warm the bread two minutes in a dry pan, then wrap it.",
              "Pour a shallow layer into a white saucer so the colour shows.",
              "Set za'atar, dukkah and salt in separate bowls, not in the oil.",
              "Tear the bread at the table; cut bread dries waiting.",
              "Refill from the bottle; never leave a deep saucer standing."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForBreadInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      },
      {
        "heading": "What usually goes wrong",
        "id": "what-goes-wrong",
        "blocks": [
          {
            "type": "p",
            "text": "Most dipping saucers fail for reasons unrelated to the recipe. A saucer poured an hour before anyone sits down has been meeting air the whole time. A bottle kept above the stove was finished before it reached the table. Bread from a plastic bag pulls apart."
          },
          {
            "type": "p",
            "text": "The oil you would taste plain is the one worth a saucer. See [what cold-pressed olive oil really means](/blog/what-cold-pressed-olive-oil-really-means) and the [bottles and sizes](/products)."
          },
          {
            "type": "image",
            "src": "pressOliveOilForBreadInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "Putting it on the table",
      "blocks": [
        {
          "type": "p",
          "text": "Room temperature, a shallow white saucer, a tablespoon at a time, bread torn rather than sliced. Taste the oil plain first, keep za'atar and dukkah in their own bowls, and refill."
        }
      ]
    },
    "faqs": [
      {
        "q": "What olive oil is best for dipping bread?",
        "a": "Extra virgin, because dipping leaves the oil less masked than any other use. Refined and pure grades have had the aromatic compounds stripped out and give a saucer little to taste. Freshness counts as much as grade: a recently opened bottle reads brighter than an old one."
      },
      {
        "q": "How much olive oil goes in a dipping saucer?",
        "a": "About a tablespoon per person, as a shallow layer rather than a deep pool. A thin layer in a wide saucer meets a lot of air, so pour small amounts and refill from the bottle instead of filling the saucer once at the start."
      },
      {
        "q": "Should olive oil for bread be warmed?",
        "a": "No. Room temperature is where the aroma is fullest, and heating a saucer drives off the volatile compounds you are serving it for. If the bottle has been in a refrigerator, leave it on the counter an hour rather than putting it near a flame."
      },
      {
        "q": "How do you make a za'atar and olive oil dip?",
        "a": "Pour a shallow layer of oil into a saucer, add roughly a teaspoon of za'atar per tablespoon of oil, stir once and leave five minutes so the sumac and thyme loosen. Serve with torn flatbread, pressed into the saucer rather than dragged through it."
      },
      {
        "q": "Why does balsamic vinegar sit under the olive oil?",
        "a": "Vinegar is water-based and denser than oil, so it sinks and stays as separate dark beads unless something is whisked in to hold the two together. On a dipping saucer that separation is the point: each piece of bread takes a different ratio."
      },
      {
        "q": "Which bread is best with olive oil?",
        "a": "An open, chewy crumb with a real crust: Arabic flatbread, sourdough, a country loaf, or a baguette cut on the diagonal. Soft sandwich bread wets through and falls apart in the saucer, and dry crackers snap before taking up much oil at all."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml bottles, with the current price for each size."
      },
      {
        "label": "What cold-pressed olive oil really means",
        "path": "blog/what-cold-pressed-olive-oil-really-means",
        "description": "How the oil is extracted, and why that decides what a plain saucer tastes of."
      },
      {
        "label": "Palestinian olive oil: what makes it different",
        "path": "blog/palestinian-olive-oil-what-makes-it-different",
        "description": "The groves, the varieties and the harvest behind the oil in the saucer."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's two online counters."
      },
      {
        "label": "Garlic infused olive oil, and how to do it safely",
        "path": "blog/garlic-infused-olive-oil-and-how-to-do-it-safely",
        "description": "Cold and warm infusion, and the refrigeration rule that makes it safe."
      },
      {
        "label": "Olive oil for hummus",
        "path": "blog/olive-oil-for-hummus",
        "description": "Hummus takes oil twice, and the two jobs want different things."
      },
      {
        "label": "Olive oil focaccia recipe",
        "path": "blog/olive-oil-focaccia-recipe",
        "description": "Baking the dough itself, dimples and all, not dipping bread that already exists."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "olive-oil-marinade",
    "slug": "olive-oil-marinade-what-it-does",
    "seoTitle": "Olive Oil Marinade: What the Oil Actually Does",
    "metaTitle": "Olive Oil Marinade: What the Oil Actually Does",
    "metaDescription": "An olive oil marinade carries the aromatics and holds them on the surface. It does not tenderise. Ratios against acid, timings for chicken and fish.",
    "focusKeyword": "olive oil marinade",
    "relatedKeywords": [
      "olive oil and lemon marinade",
      "how to marinate chicken with olive oil",
      "marinade ratio oil to acid",
      "does olive oil tenderise meat",
      "how long to marinate chicken",
      "olive oil marinade for fish",
      "garlic and rosemary marinade",
      "marinating beef in olive oil",
      "roast vegetable marinade",
      "extra virgin olive oil marinade"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "marinade",
      "cooking with olive oil",
      "chicken",
      "kitchen guide"
    ],
    "h1": "Olive Oil Marinade: What the Oil Is Actually Doing",
    "excerpt": "In a marinade the oil is a carrier, not a tenderiser. Here is the ratio against acid, the time each ingredient wants, and which bottle to use.",
    "keyTakeaway": "In an olive oil marinade the oil dissolves the fat-soluble aromatics and holds them against the surface of the food. It does not tenderise: salt, the cut and the cooking do that. Three parts oil to one part acid suits meat, more oil for fish, and the clock matters more than the recipe.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilMarinadeHero",
      "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
    },
    "ogImage": "/og/blog-olive-oil-marinade.jpg",
    "intro": [
      "Every marinade recipe opens with olive oil and none says why. The oil does one job, and not the one most people credit it with.",
      "What follows is the mechanism, the ratio against acid, and a timing table by ingredient."
    ],
    "sections": [
      {
        "heading": "What the oil is doing in there",
        "id": "what-the-oil-does",
        "blocks": [
          {
            "type": "p",
            "text": "An olive oil marinade works as a carrier. Most of the flavour in garlic, rosemary, oregano and chilli is fat-soluble, so it dissolves into oil rather than into lemon juice. The oil coats the food and holds that flavour there, through the fridge and onto the heat."
          },
          {
            "type": "ul",
            "items": [
              "**It dissolves the aromatics.** Crushed garlic and bruised rosemary give up more to oil than to juice.",
              "**It stays put.** A thin film holds the seasoning on the meat instead of pooling in the dish.",
              "**It arrives in the pan.** The film clinging to the food browns first."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilMarinadeInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "It does not tenderise anything",
        "id": "no-tenderising",
        "blocks": [
          {
            "type": "p",
            "text": "Olive oil does not tenderise meat. It sits on the outside and travels perhaps a millimetre in, so a marinated steak is seasoned at the surface and unchanged in the middle. Tenderness is settled by five other things, and the oil is none of them."
          },
          {
            "type": "ul",
            "items": [
              "**The cut.** Shin will not become sirloin in a bowl.",
              "**Slicing across the grain.** Shorter fibres, before any cooking.",
              "**Salt.** Reorganises the surface protein and holds water in it.",
              "**Papain.** The enzyme in raw papaya, which overshoots fast.",
              "**Slow cooking.** Low heat breaks down the connective tissue."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilMarinadeInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "Oil against acid: the ratio",
        "id": "oil-to-acid-ratio",
        "blocks": [
          {
            "type": "p",
            "text": "A workable olive oil marinade runs about three parts oil to one part acid, with salt and aromatics on top. More acid than that firms and whitens the surface of fish and chicken before any heat reaches it. Less acid and the mixture reads as oily."
          },
          {
            "type": "ul",
            "items": [
              "**3:1 oil to acid** for chicken, lamb and beef.",
              "**4:1 or 5:1** for fish and prawns, which acid reaches within minutes.",
              "**2:1** for firm vegetables and halloumi, with no protein to seize.",
              "**About 2 tbsp of oil per kilo** of food, which puts the acid at roughly 2 tsp."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilMarinadeInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "How long to marinate, by ingredient",
        "id": "marinating-times",
        "blocks": [
          {
            "type": "p",
            "text": "Marinating time depends on how far the acid can reach, not on how much flavour is wanted. Fish takes fifteen to thirty minutes. Chicken pieces take two to six hours. A whole beef steak can sit overnight because its surface is dense."
          },
          {
            "type": "table",
            "head": [
              "Ingredient",
              "Time in the marinade",
              "Too long shows as"
            ],
            "rows": [
              [
                "Fish fillets, prawns",
                "15-30 minutes",
                "Opaque, firm edges"
              ],
              [
                "Chicken, bone in",
                "2-6 hours",
                "Chalky, dry after roasting"
              ],
              [
                "Chicken breast, cubed",
                "30 minutes to 2 hours",
                "Pale, stringy outer layer"
              ],
              [
                "Lamb chops, kebab cubes",
                "2-8 hours",
                "Soft grey instead of pink"
              ],
              [
                "Beef steak, whole cut",
                "4 hours to overnight",
                "Little changes at all"
              ],
              [
                "Vegetables, halloumi",
                "15-45 minutes",
                "Absorption simply stops"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilMarinadeInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "Which bottle goes in the marinade",
        "id": "which-bottle",
        "blocks": [
          {
            "type": "p",
            "text": "A whole marinade is not the place for the most expensive bottle in the kitchen. Most of that oil ends up in the dish, on the tray or burning off over the grill, and heat flattens what it carried."
          },
          {
            "type": "p",
            "text": "The arithmetic is quick. Two tablespoons per kilo is around 30 ml, and most of it goes with the drips and the smoke rather than onto the plate, so at **RM236** a litre it buys nothing you taste. For the figures, read [olive oil price in Malaysia](/blog/olive-oil-price-in-malaysia-what-you-are-paying-for)."
          },
          {
            "type": "image",
            "src": "pressOliveOilMarinadeInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "Mix it in the right order",
        "id": "mixing-order",
        "blocks": [
          {
            "type": "p",
            "text": "Build the marinade in the dish the food will sit in, and add the olive oil last. Salt dissolves in lemon juice or vinegar and stops dissolving once oil has coated the crystals: acid first, aromatics next, oil whisked in at the end."
          },
          {
            "type": "ol",
            "items": [
              "Stir the salt into the lemon juice or vinegar until it disappears.",
              "Crush the garlic, bruise the herbs, stir them through the acid.",
              "Pour the olive oil in slowly, whisking, until the mixture thickens.",
              "Turn the food through it, cover, and refrigerate for the time it needs."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilMarinadeInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "What to remember",
      "blocks": [
        {
          "type": "p",
          "text": "Olive oil in a marinade dissolves the aromatics and holds them on the surface. Three parts oil to one part acid for meat, more oil still for fish, and the clock matters more than the recipe. See [cooking with olive oil in a Malaysian kitchen](/blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen)."
        }
      ]
    },
    "faqs": [
      {
        "q": "Does olive oil tenderise meat?",
        "a": "No. Olive oil coats the surface and travels barely a millimetre in. Tenderness comes from the cut, the direction of the slice, salt, an enzyme such as the one in raw papaya, or slow cooking. A marinade seasons the outer surface only."
      },
      {
        "q": "How much olive oil against lemon juice in a marinade?",
        "a": "About three parts olive oil to one part lemon juice for chicken, lamb and beef. Move to four or five parts oil for fish and prawns, which acid reaches within minutes. Two tablespoons of oil per kilo of food is enough to coat it."
      },
      {
        "q": "How long can chicken sit in an olive oil marinade?",
        "a": "Two to six hours for bone-in pieces, thirty minutes to two hours for cubed breast. Beyond that the acid works too far into the surface and the outer layer turns chalky once roasted. Keep the dish covered in the refrigerator, never on the counter."
      },
      {
        "q": "Can a used marinade be reused?",
        "a": "Not as a sauce and not for a second batch, because raw juices have gone into it. Set part of the mixture aside before the food goes in if a sauce is wanted, or boil the used marinade hard for several minutes first."
      },
      {
        "q": "Should the good bottle go in the marinade or on the plate?",
        "a": "On the plate. A plain extra virgin oil carries garlic and herbs through the marinade and burns off over the grill, where its aroma is spent. A drizzle after cooking is where the character of a better oil survives, because nothing has heated it."
      },
      {
        "q": "Do vegetables need marinating before roasting?",
        "a": "Fifteen to forty-five minutes is enough. Vegetables hold no protein for acid to act on, so extra time adds little once the oil has coated every cut face. Toss aubergine, courgette, capsicum and onion with oil, salt and dried oregano before roasting."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml bottles, with the current price for each size."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Where the oil fits across tumis, roasting and the rest of a week of meals."
      },
      {
        "label": "Olive oil price in Malaysia: what you are paying for",
        "path": "blog/olive-oil-price-in-malaysia-what-you-are-paying-for",
        "description": "Why a litre costs what it costs, and which size works out cheaper."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's two online counters."
      },
      {
        "label": "Olive oil for grilling and barbecue",
        "path": "blog/olive-oil-for-grilling-and-barbecue",
        "description": "Oil the food, not the grate, and save the good oil for after it comes off."
      },
      {
        "label": "Olive oil for steak",
        "path": "blog/olive-oil-for-steak",
        "description": "The two-oil trick for a stovetop sear, and where the good oil goes after."
      }
    ]
  },
  /* ---------------- PRESS round 3 ---------------- */
  {
    "id": "olive-oil-shelf-life",
    "slug": "olive-oil-shelf-life-how-long-a-bottle-lasts",
    "seoTitle": "Olive Oil Shelf Life: How Long a Bottle Lasts",
    "metaTitle": "Olive Oil Shelf Life: How Long a Bottle Lasts",
    "metaDescription": "Olive oil shelf life, unopened and opened: what a harvest date tells you, how air, light and heat end a bottle, and how to store one in Malaysia.",
    "focusKeyword": "olive oil shelf life",
    "relatedKeywords": [
      "how long does olive oil last",
      "does olive oil expire",
      "olive oil expiry date",
      "olive oil harvest date",
      "how to store olive oil",
      "olive oil after opening",
      "rancid olive oil signs",
      "olive oil storage temperature",
      "unopened olive oil shelf life",
      "best before date olive oil"
    ],
    "category": "Olive oil basics",
    "tags": [
      "shelf life",
      "storage",
      "extra virgin",
      "buying guide"
    ],
    "h1": "Olive Oil Shelf Life: How Long a Bottle Really Lasts",
    "excerpt": "Olive oil shelf life is decided by air, light and heat rather than by the date printed on the bottle, and a Malaysian kitchen runs harder on a bottle than a Mediterranean pantry does.",
    "keyTakeaway": "Olive oil shelf life runs up to about eighteen months from harvest while the bottle is sealed, and about two months of real character once the cap comes off. Air, light and heat set that pace, not the printed date. Read the harvest date, store the bottle dark and away from the stove, and buy the size your kitchen finishes.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilShelfLifeHero",
      "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
    },
    "ogImage": "/og/blog-olive-oil-shelf-life.jpg",
    "intro": [
      "Olive oil does not spoil the way milk spoils. It fades. The fruit goes first, then the pepper at the back of the throat, and one afternoon the bottle tastes of nothing much.",
      "Here is what a bottle has in it, unopened and opened, what ends it, and why a Selangor kitchen is harder on oil than a Mediterranean pantry."
    ],
    "sections": [
      {
        "heading": "How long a bottle lasts, unopened and opened",
        "id": "how-long-a-bottle-lasts",
        "blocks": [
          {
            "type": "p",
            "text": "An unopened bottle of extra virgin olive oil typically holds its character for up to about eighteen months from the harvest that produced it, kept cool and dark. Once opened, count in weeks rather than seasons: about two months of real character is a fair expectation, because air is now inside for good."
          },
          {
            "type": "image",
            "src": "pressOliveOilShelfLifeInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      },
      {
        "heading": "Harvest date beats best-before date",
        "id": "harvest-date-vs-best-before",
        "blocks": [
          {
            "type": "p",
            "text": "A harvest date tells you when the olives were milled. A best-before date tells you when the bottler stopped guaranteeing the oil, counted from the bottling run, which can happen months after the fruit was pressed. Where both appear, read the harvest date first and treat the other as an outer limit."
          },
          {
            "type": "ul",
            "items": [
              "**Harvest or crush date.** The real age of the oil in the bottle.",
              "**Best before.** Counted from bottling, not from the mill.",
              "**Lot code.** Useful to a recall, not to you.",
              "**No date at all.** Common on blends, and a reason to ask."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilShelfLifeInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          },
          {
            "type": "p",
            "text": "For the rest of what belongs on a label you are about to pay for, read [how to choose authentic extra virgin olive oil in Malaysia](/blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia)."
          }
        ]
      },
      {
        "heading": "Air, light and heat are what end a bottle",
        "id": "air-light-and-heat",
        "blocks": [
          {
            "type": "p",
            "text": "Three things end a bottle. Air enters every time the cap comes off and stays in the space above the oil. Light drives the same reaction faster, which is the reason dark glass exists. Heat multiplies both. Sealed, cold and dark, an oil barely moves at all."
          },
          {
            "type": "table",
            "head": [
              "Where it sits",
              "Condition",
              "Effect"
            ],
            "rows": [
              [
                "Closed cupboard, away from the stove",
                "24-28°C, dark",
                "Best ordinary option at home"
              ],
              [
                "Counter beside the hob",
                "30-40°C when cooking",
                "Heat and light, fades fastest"
              ],
              [
                "Open shelf or windowsill",
                "Daylight, room temperature",
                "Light alone works on it"
              ],
              [
                "Refrigerator",
                "4-8°C",
                "Clouds and thickens, then clears"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilShelfLifeInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      },
      {
        "heading": "Why a Malaysian kitchen is the harder environment",
        "id": "malaysian-kitchen",
        "blocks": [
          {
            "type": "p",
            "text": "A Malaysian kitchen runs warm and humid every month of the year, with no cold season to give a bottle a rest. Indoor temperatures sit near 28°C before anyone lights the hob, and an open layout puts the oil in daylight for hours. A Mediterranean pantry spends part of the year cold."
          },
          {
            "type": "p",
            "text": "Two habits cover most of the risk. Keep the bottle in a closed cupboard on the far side of the kitchen from the hob, never on the shelf above it, and screw the cap back down the moment the pouring is done."
          },
          {
            "type": "image",
            "src": "pressOliveOilShelfLifeInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      },
      {
        "heading": "How to tell an oil has gone",
        "id": "how-to-tell-it-has-gone",
        "blocks": [
          {
            "type": "p",
            "text": "Pour a little into a spoon and smell it before you taste it. A finished oil smells of wax crayon, putty, stale nuts or damp cardboard, and tastes greasy and flat with no peppery catch at the back of the throat. Cloudiness alone is not a fault; a cold bottle clouds and clears again."
          },
          {
            "type": "ul",
            "items": [
              "**Smell.** Crayon or putty where fruit used to be.",
              "**Taste.** Flat and greasy, the peppery finish gone.",
              "**Colour.** Duller and browner than the day it was opened.",
              "**Sediment.** Normal in unfiltered oil; a musty smell with it is not."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilShelfLifeInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      },
      {
        "heading": "Bottle size is a shelf-life decision",
        "id": "bottle-size",
        "blocks": [
          {
            "type": "p",
            "text": "Buy the size your kitchen will finish, not the size with the better price per litre. A household that reaches for olive oil twice a week takes months over 500 ml, and the last third tastes nothing like the first pour. The same oil in 250 ml is used while it still has everything."
          },
          {
            "type": "p",
            "text": "Both sizes sit on the [products page](/products), and what separates them by the litre is set out in [olive oil price in Malaysia](/blog/olive-oil-price-in-malaysia-what-you-are-paying-for)."
          },
          {
            "type": "image",
            "src": "pressOliveOilShelfLifeInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Sealed and cool, up to about eighteen months from harvest. Opened, about two months of real character. Air, light and heat decide which end you get. Read the harvest date and buy the size you will finish."
        }
      ]
    },
    "faqs": [
      {
        "q": "How long does olive oil last unopened?",
        "a": "Kept cool and dark, an unopened bottle typically holds its character for up to about eighteen months from the harvest that produced it. The seal keeps air out, so a sealed bottle ages far more slowly than an opened one standing on a counter."
      },
      {
        "q": "How long does olive oil last after opening?",
        "a": "About two months is a fair figure for a bottle in regular use in Malaysia. Air enters the space above the oil every time the cap comes off, so a half-empty bottle left for weeks ages faster than one poured from daily."
      },
      {
        "q": "Does olive oil go bad, or just go stale?",
        "a": "It goes stale rather than spoiling. Oxidation flattens the fruit and the pepper and leaves a waxy, cardboard smell. The oil is still oil, but the character you paid for has gone. That is why a harvest date beats an expiry date."
      },
      {
        "q": "Should olive oil be kept in the fridge?",
        "a": "It is not necessary, and cold oil is awkward to pour. It clouds and thickens, then clears again at room temperature with nothing lost. A closed cupboard away from the stove does the same job for a bottle finished within a few months."
      },
      {
        "q": "Can I use olive oil after the best-before date?",
        "a": "A best-before date is a limit set by the bottler, not a hard stop. Smell and taste the oil first. If it is flat or smells of crayon, cook with it in a spiced dish and open a fresh bottle for salads."
      },
      {
        "q": "Which bottle size keeps better once opened?",
        "a": "Neither keeps better; the smaller one gets finished sooner, which comes to the same thing. A 250 ml bottle suits a kitchen that pours olive oil now and then, and a 500 ml bottle suits one that cooks with it most days."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml bottles, with the current price for each size."
      },
      {
        "label": "How to choose authentic extra virgin olive oil in Malaysia",
        "path": "blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "description": "What to read on the label and the bottle, harvest date included, before you pay."
      },
      {
        "label": "Olive oil price in Malaysia: what you are paying for",
        "path": "blog/olive-oil-price-in-malaysia-what-you-are-paying-for",
        "description": "Why the per-litre figure moves with bottle size, and what sits behind the price."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      },
      {
        "label": "What size extra virgin olive oil bottle to buy",
        "path": "blog/what-size-olive-oil-bottle-to-buy",
        "description": "How fast a household gets through oil, against how long an opened bottle lasts."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "garlic-infused-olive-oil",
    "slug": "garlic-infused-olive-oil-and-how-to-do-it-safely",
    "seoTitle": "Garlic Infused Olive Oil: How to Make It Safely",
    "metaTitle": "Garlic Infused Olive Oil: Make It Safely",
    "metaDescription": "Garlic infused olive oil at home: the botulism rule that comes first, cold against warm infusion, a numbered method, straining, and the fridge window.",
    "focusKeyword": "garlic infused olive oil",
    "relatedKeywords": [
      "how to make garlic olive oil",
      "garlic olive oil recipe",
      "garlic in oil botulism",
      "is garlic in olive oil safe",
      "homemade infused olive oil",
      "how long does garlic oil last",
      "cold infused olive oil",
      "warm infused olive oil",
      "straining infused oil",
      "garlic oil for bread"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "infused oil",
      "food safety",
      "home cooking",
      "storage"
    ],
    "h1": "Garlic Infused Olive Oil, and How to Make It Safely",
    "excerpt": "Garlic infused olive oil is easy to make and easy to make badly, because garlic sealed under oil at room temperature is a recognised botulism risk. Here is the safe way, the fridge window, and what to do with the jar.",
    "keyTakeaway": "Garlic infused olive oil must be refrigerated the moment it is made, strained clear of every clove, and used within three or four days. Fresh garlic is a low-acid vegetable, and sealed under oil at room temperature it grows the toxin behind botulism. Never leave the jar on the counter.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressGarlicInfusedOliveOilHero",
      "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
    },
    "ogImage": "/og/blog-garlic-infused-olive-oil.jpg",
    "intro": [
      "Before the recipe, the rule that decides whether the recipe is worth making: garlic sitting in oil at room temperature is a botulism risk, and no amount of good olive oil changes that.",
      "Fresh garlic is a low-acid vegetable. Sealed under oil it loses its air, and low-acid plus airless is what Clostridium botulinum needs. Make it, chill it, strain it, finish it within days."
    ],
    "sections": [
      {
        "heading": "The safety rule comes before the flavour",
        "id": "the-safety-rule",
        "blocks": [
          {
            "type": "p",
            "text": "Fresh garlic is a low-acid vegetable, and sealed under olive oil at room temperature it creates the oxygen-free, low-acid conditions Clostridium botulinum needs to produce its toxin, and botulism is a medical emergency when it happens. Nothing in the taste or smell would warn a cook. Home-made garlic oil belongs in the refrigerator, the one exception to the never-refrigerate rule for plain oil, never the counter."
          },
          {
            "type": "ul",
            "items": [
              "**Never store it at room temperature.** Not overnight, not an afternoon beside the hob.",
              "**Never leave the garlic in the jar.** Strain out every clove and every fragment.",
              "**Never stretch the window.** Date the jar and throw out what is older.",
              "**Never give a jar away** — a gift travels warm."
            ]
          },
          {
            "type": "image",
            "src": "pressGarlicInfusedOliveOilInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      },
      {
        "heading": "Why a shop bottle is not the same thing",
        "id": "why-a-shop-bottle-differs",
        "blocks": [
          {
            "type": "p",
            "text": "Commercial garlic oils are acidified to a controlled pH, or built from distilled garlic flavour rather than raw cloves, under a validated process. A home kitchen cannot hold that acidity in a jam jar, so a shelf-stable bottle in a shop argues nothing for yours."
          },
          {
            "type": "image",
            "src": "pressGarlicInfusedOliveOilInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      },
      {
        "heading": "Cold infusion against gentle warm infusion",
        "id": "cold-and-warm-infusion",
        "blocks": [
          {
            "type": "p",
            "text": "Cold infusion means peeled cloves steeping in oil in the fridge, giving a clean, raw, slightly sharp garlic note after about a day. Warm infusion means cloves held in oil over low heat for twenty minutes, giving a rounder, sweeter flavour the same evening. Both need refrigerating."
          },
          {
            "type": "table",
            "head": [
              "Method",
              "What you do",
              "Flavour",
              "Ready in"
            ],
            "rows": [
              [
                "Cold",
                "Steep peeled cloves in the fridge",
                "Raw, sharp, green",
                "About a day"
              ],
              [
                "Gentle warm",
                "Hold at a bare shimmer, no frying",
                "Round, sweet, roasted",
                "The same evening"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressGarlicInfusedOliveOilInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      },
      {
        "heading": "A step by step method for a small jar",
        "id": "step-by-step-method",
        "blocks": [
          {
            "type": "p",
            "text": "One small jar at a time is the right scale, because the window is short and a big batch only guarantees waste. Six to eight peeled cloves to 250 ml of extra virgin olive oil is a workable ratio. Have the strainer ready before the pan goes on."
          },
          {
            "type": "ol",
            "items": [
              "Wash and dry a small glass jar and its lid.",
              "Peel six to eight cloves and leave them whole; chopped garlic sheds fragments a strainer misses.",
              "Warm 250 ml of olive oil with the cloves on the lowest heat for twenty minutes, or steep cold in the fridge overnight.",
              "Keep it at a bare shimmer. Bubbling means frying, and fried garlic turns the oil bitter.",
              "Strain through a fine sieve, then through muslin, until no solids remain.",
              "Cool, cap, label with the date and refrigerate straight away."
            ]
          },
          {
            "type": "image",
            "src": "pressGarlicInfusedOliveOilInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      },
      {
        "heading": "Straining, chilling, and knowing when to throw it out",
        "id": "straining-and-storage",
        "blocks": [
          {
            "type": "p",
            "text": "The garlic must come out because the solid clove is the part that holds a low-acid, airless pocket under the oil, and it is also what turns the flavour sharp and muddy by the second day. Strain twice, chill immediately, and treat a few days as the whole life of the jar."
          },
          {
            "type": "p",
            "text": "Chilled olive oil clouds and thickens, and that alone is normal. Bubbles rising in a still jar, a hissing or bulging lid, a sour smell, or unstrained cloves gone soft and grey are not. Throw that jar away."
          },
          {
            "type": "image",
            "src": "pressGarlicInfusedOliveOilInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      },
      {
        "heading": "What to pour it on, and the infusions this shop does sell",
        "id": "using-it-and-what-we-sell",
        "blocks": [
          {
            "type": "p",
            "text": "Garlic oil is a finishing oil. Pour it over pasta the moment it leaves the pan, over roast potatoes, grilled vegetables or a bowl of soup, and onto warm bread. Add it off the heat so the aroma survives, then return the jar to the fridge."
          },
          {
            "type": "p",
            "text": "This shop does not sell a garlic infusion. The Arabian Village Infused Collection is six flavours — **wild thyme**, **blackseed**, **turmeric and black pepper**, **rosemary and basil**, **fennel and anise**, and **lavender and chamomile** — each made with dried botanicals, steeped and strained out. All six sit on the [products page](/products)."
          },
          {
            "type": "image",
            "src": "pressGarlicInfusedOliveOilInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          },
          {
            "type": "p",
            "text": "For which oil goes where, read [cooking with olive oil in a Malaysian kitchen](/blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen) and [olive oil for bread and dipping](/blog/olive-oil-for-bread-and-dipping)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Make a small jar, cold or gently warmed, strain every scrap of garlic out, refrigerate it once cool and finish it within days. Garlic left under oil on a counter is the version to refuse."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is it safe to make garlic infused olive oil at home?",
        "a": "Yes, if you refrigerate it at once, strain the garlic out and use it within three or four days. Garlic under oil at room temperature is a botulism risk; the counter is never an option."
      },
      {
        "q": "How long does home-made garlic olive oil keep?",
        "a": "Three or four days in the refrigerator, and that is the whole window. Freeze it in an ice tray for longer. Write the date on the jar, and discard any jar that spent an hour warm."
      },
      {
        "q": "Does heating the garlic make the oil safe to store?",
        "a": "No. Gentle warming draws out flavour but it does not acidify the garlic or sterilise the jar, so a warm infusion needs the same refrigeration and the same few-day window as a cold one."
      },
      {
        "q": "Why must the garlic be strained out?",
        "a": "Solid garlic under oil is what creates the low-acid, airless pocket, and it is also what turns the flavour sharp and muddy. Straining twice removes it and keeps the finished oil clear."
      },
      {
        "q": "How do I tell garlic oil has turned?",
        "a": "Look for bubbles in a still jar, a lid that hisses or bulges, a sour or yeasty smell, or unstrained cloves gone soft and grey. Throw the jar out rather than tasting it."
      },
      {
        "q": "Does Arabian Village sell a garlic infused olive oil?",
        "a": "No. The Infused Collection runs to six flavours: wild thyme, blackseed, turmeric and black pepper, rosemary and basil, fennel and anise, and lavender and chamomile. Garlic is not one of them."
      }
    ],
    "related": [
      {
        "label": "The Arabian Village Infused Collection",
        "path": "products",
        "description": "The six infused extra virgin olive oils this shop sells, made with dried botanicals and strained."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Which jobs olive oil takes on a Malaysian hob, and where a finishing oil belongs instead."
      },
      {
        "label": "Olive oil for bread and dipping",
        "path": "blog/olive-oil-for-bread-and-dipping",
        "description": "How to serve oil at the table, what to add to the dish, and which bread suits it."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "olive-oil-bitter-taste",
    "slug": "why-does-olive-oil-taste-bitter",
    "seoTitle": "Why Does Olive Oil Taste Bitter and Peppery?",
    "metaTitle": "Why Does Olive Oil Taste Bitter? A Flavour Guide",
    "metaDescription": "Bitterness and the peppery catch at the throat are the taste of a young olive oil, not a fault. How to taste a bottle, and what spoiled oil tastes like.",
    "focusKeyword": "why does olive oil taste bitter",
    "relatedKeywords": [
      "olive oil bitter taste",
      "why is olive oil peppery",
      "olive oil burns my throat",
      "olive oil tasting notes",
      "how to taste olive oil",
      "bitter vs rancid olive oil",
      "what does rancid olive oil taste like",
      "olive oil pungency",
      "mild olive oil taste",
      "olive oil flavour profile",
      "extra virgin olive oil taste test"
    ],
    "category": "Olive oil basics",
    "tags": [
      "taste",
      "tasting",
      "freshness",
      "extra virgin"
    ],
    "h1": "Why Does Olive Oil Taste Bitter and Catch the Throat?",
    "excerpt": "A young extra virgin olive oil bites the tongue and catches the back of the throat, and a first spoonful can make you cough. That is the oil behaving normally, not a bottle that has turned.",
    "keyTakeaway": "Bitterness on the tongue and the peppery catch at the back of the throat are flavour attributes of a young extra virgin olive oil, not signs of spoilage. Both fade as a bottle ages, so an oil that tastes of almost nothing is often an old one. Spoiled oil tastes entirely different: crayons, stale nuts or damp cardboard.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilBitterTasteHero",
      "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
    },
    "ogImage": "/og/blog-olive-oil-bitter-taste.jpg",
    "intro": [
      "A first spoonful of a young extra virgin oil can sting. The throat tightens, a cough sometimes follows, and the obvious conclusion is that the bottle has gone off.",
      "It has not. Here is what the bite really is, and what a spoiled oil does instead."
    ],
    "sections": [
      {
        "heading": "No, a bitter olive oil is not off",
        "id": "bitter-is-not-off",
        "blocks": [
          {
            "type": "p",
            "text": "Bitterness across the tongue and a peppery catch at the back of the throat are two of the three attributes trained tasters record as positive in extra virgin olive oil. A spoonful that makes you cough is doing what a young oil does."
          },
          {
            "type": "image",
            "src": "pressOliveOilBitterTasteInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "What the bitterness and the pepper are",
        "id": "what-bitterness-and-pepper-are",
        "blocks": [
          {
            "type": "p",
            "text": "Olives carry compounds called polyphenols, and two of them do most of the talking. Oleuropein and its relatives give the clean bitterness felt across the tongue. Oleocanthal gives the pungency, felt later and lower down, as a catch at the back of the throat."
          },
          {
            "type": "ul",
            "items": [
              "**Bitter** is a taste, on the tongue, immediate.",
              "**Pungent** is a catch in the throat, a beat behind.",
              "**Green olives** picked early carry more of both than ripe black fruit."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilBitterTasteInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "A bland oil is usually an old oil",
        "id": "bland-oil-is-old-oil",
        "blocks": [
          {
            "type": "p",
            "text": "Both attributes fade with time. The pepper goes first, then the bitterness, and last the fruit, until a bottle pours smooth and tastes of very little. Smoothness is not a sign of quality. An oil with no bite left is usually one that has been open a long while."
          },
          {
            "type": "p",
            "text": "Air, light and heat set the pace of that fade. What the pressing itself contributes is set out in [what cold-pressed olive oil really means](/blog/what-cold-pressed-olive-oil-really-means)."
          },
          {
            "type": "image",
            "src": "pressOliveOilBitterTasteInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "How a tasting panel describes an oil",
        "id": "how-a-panel-describes-it",
        "blocks": [
          {
            "type": "p",
            "text": "A sensory panel scores an oil on three positive attributes and checks it for defects. The tasters work from blue glasses so that colour cannot influence the score, warm the sample in the hand, and describe what they find in a fixed vocabulary."
          },
          {
            "type": "table",
            "head": [
              "Term",
              "Describes",
              "Where you notice it"
            ],
            "rows": [
              [
                "Fruity",
                "Fresh olives, cut grass, green tomato",
                "Nose, then the first sip"
              ],
              [
                "Bitter",
                "A clean bitterness, not harsh",
                "Across the tongue"
              ],
              [
                "Pungent",
                "Peppery catch, sometimes a cough",
                "Back of the throat, later"
              ],
              [
                "Rancid",
                "Crayons, putty, stale nuts",
                "Nose, before you sip"
              ],
              [
                "Musty",
                "Damp cardboard",
                "Nose, then flat on the palate"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilBitterTasteInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "How to taste olive oil at home",
        "id": "how-to-taste-at-home",
        "blocks": [
          {
            "type": "p",
            "text": "Tasting from a small glass rather than a teaspoon takes a minute and settles the question. Warmth releases the aroma, covering the glass holds it in, and drawing air across the oil spreads it over the palate so the throat gets its turn."
          },
          {
            "type": "ol",
            "items": [
              "**Pour** a tablespoon into a small glass.",
              "**Warm** it, one palm under, one over the top.",
              "**Swirl**, uncover, and smell it twice.",
              "**Sip** a little and hold it on the tongue.",
              "**Draw air** in through your teeth.",
              "**Swallow** and wait. The pepper arrives last."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilBitterTasteInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "Which dishes suit a bitter oil",
        "id": "dishes-for-a-bitter-oil",
        "blocks": [
          {
            "type": "p",
            "text": "A strongly bitter, peppery oil is a seasoning, and it wants food with enough weight to meet it. On a delicate or sweet dish the same oil takes over and the cook loses what is being cooked. Warmth softens the bite, so a gentle pan mellows it."
          },
          {
            "type": "ul",
            "items": [
              "**Suits it:** bean and lentil soups, grilled lamb, roasted vegetables, tomatoes on bread, labneh and hummus.",
              "**Fights it:** mayonnaise, delicate steamed fish, milk desserts, plain sponge cakes.",
              "**Softens it:** roasting, gentle frying, or stirring the oil into a warm dish."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilBitterTasteInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "What a spoiled oil tastes like instead",
        "id": "what-spoiled-oil-tastes-like",
        "blocks": [
          {
            "type": "p",
            "text": "A spoiled oil announces itself in the nose, before any of it reaches the tongue. Bitterness has no smell; rancidity does. Where a young oil smells green and tastes sharp, a finished one smells waxy and tastes greasy and flat, with no catch at the throat."
          },
          {
            "type": "ul",
            "items": [
              "**Crayons or putty.** The commonest fault, and the easiest to name.",
              "**Stale nuts.** Old walnuts, or the bottom of a peanut jar.",
              "**Wine gone to vinegar.** Sharp and sour, from fermented fruit.",
              "**Damp cardboard.** A cellar smell, flat behind it."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilBitterTasteInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          },
          {
            "type": "p",
            "text": "Before paying, read [how to choose authentic extra virgin olive oil in Malaysia](/blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Bitter and peppery is the taste of a young oil. Both fade, so a bland bottle is usually an old one. Taste from a warmed glass, smell before you sip, and judge a fault by crayons, not by bite."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is bitter olive oil bad?",
        "a": "No. Bitterness across the tongue is one of the attributes tasting panels record as positive in extra virgin olive oil. It usually points to a young oil pressed from olives picked green."
      },
      {
        "q": "Why does olive oil catch the back of my throat?",
        "a": "The catch comes from oleocanthal, a compound the fruit carries into the oil. It is felt in the throat rather than tasted on the tongue, and a slight cough on a first sip is normal."
      },
      {
        "q": "Does olive oil get less bitter as it ages?",
        "a": "Yes. Pepper fades first and bitterness follows, which is why an oil tasting of almost nothing is often simply old. Air, light and heat speed the fade, so a badly stored bottle flattens sooner."
      },
      {
        "q": "Can I cook with a bitter olive oil?",
        "a": "Yes, and heat takes the edge off. Gentle frying and roasting soften the bite, so an oil that seems fierce on bread sits comfortably inside a soup, a tray of vegetables or a braise."
      },
      {
        "q": "How do I tell bitter apart from rancid?",
        "a": "Smell the oil before tasting it. Bitterness has no smell, so a green, fresh aroma with a sharp finish is fine. Crayon, putty or damp cardboard in the nose means the oil is finished."
      },
      {
        "q": "Is a mild olive oil a lower grade?",
        "a": "Not on its own. Olive variety and ripeness at harvest both produce genuinely gentle extra virgin oils. Mildness only signals a problem when it comes with a waxy smell or a flat, greasy feel."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, with the current price for each size."
      },
      {
        "label": "What cold-pressed olive oil really means",
        "path": "blog/what-cold-pressed-olive-oil-really-means",
        "description": "How the pressing itself shapes the aroma and the bite you taste in the glass."
      },
      {
        "label": "How to choose authentic extra virgin olive oil in Malaysia",
        "path": "blog/how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "description": "What to read on the label, and the two-minute taste check to run afterwards."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      },
      {
        "label": "Why is my olive oil cloudy",
        "path": "blog/why-is-my-olive-oil-cloudy",
        "description": "Cold haze, unfiltered sediment and actual spoilage are three different things."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "olive-oil-bottle-size",
    "slug": "what-size-olive-oil-bottle-to-buy",
    "seoTitle": "What Size Extra Virgin Olive Oil Bottle to Buy",
    "metaTitle": "What Size Extra Virgin Olive Oil Bottle to Buy",
    "metaDescription": "250 ml, 500 ml or a tin: work out how fast your kitchen empties a bottle, why a big tin is only cheaper if you finish it, and how to decant safely.",
    "focusKeyword": "extra virgin olive oil bottle",
    "relatedKeywords": [
      "olive oil bottle size",
      "250ml vs 500ml olive oil",
      "how much olive oil does a family use",
      "olive oil tin",
      "dark glass olive oil bottle",
      "decanting olive oil",
      "best olive oil bottle size",
      "olive oil per litre price",
      "how long does an opened bottle last",
      "what to check on an olive oil label"
    ],
    "category": "Buying guide",
    "tags": [
      "bottle size",
      "buying guide",
      "storage",
      "extra virgin"
    ],
    "h1": "What Size Extra Virgin Olive Oil Bottle Should You Buy?",
    "excerpt": "Choosing between 250 ml, 500 ml and a tin is arithmetic, not taste: how fast your kitchen empties a bottle, held against the roughly two months an opened bottle stays at its best.",
    "keyTakeaway": "Buy the size your kitchen finishes inside roughly two months of opening, because that is how long an opened bottle holds its character. Count the pours in a normal week, multiply by fifteen millilitres, and let the answer pick the bottle. A large tin is only cheaper per litre if the last pour is still good.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilBottleSizeHero",
      "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
    },
    "ogImage": "/og/blog-olive-oil-bottle-size.jpg",
    "intro": [
      "A shelf holding a 250 ml bottle, a 500 ml bottle and a three-litre tin is a maths problem dressed up as a taste test. The lowest price per litre is worth nothing if the last third goes flat before anyone pours it.",
      "Measure how fast your kitchen empties a bottle against the roughly two months an opened one stays at its best, and the size chooses itself."
    ],
    "sections": [
      {
        "heading": "Start by counting the pours in a normal week",
        "id": "count-the-pours",
        "blocks": [
          {
            "type": "p",
            "text": "A tablespoon is about 15 ml, which turns a vague habit into a number. A kitchen that only dresses salads pours roughly 30 ml a week and takes eight weeks to empty 250 ml. A kitchen that fries, roasts and dresses with olive oil clears 500 ml inside a month."
          },
          {
            "type": "ul",
            "items": [
              "**One tablespoon** is about 15 ml, so three a week is 45 ml.",
              "**Salads and finishing only:** roughly 30 ml a week.",
              "**Cooking with it most days:** 100 ml a week and up."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilBottleSizeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "Household size against bottle size",
        "id": "household-size-against-bottle-size",
        "blocks": [
          {
            "type": "p",
            "text": "Match the bottle to a household's weekly pour and to the eight-week window, not to the shelf price. Any row where the bottle outlasts eight weeks is a row where the smaller size is the better buy, whatever the label says per litre."
          },
          {
            "type": "table",
            "head": [
              "Household and habit",
              "Weekly pour",
              "250 ml lasts",
              "500 ml lasts"
            ],
            "rows": [
              [
                "One person, an occasional drizzle",
                "about 15 ml",
                "about 16 weeks",
                "far too long"
              ],
              [
                "Two people, salads and finishing",
                "about 30 ml",
                "about 8 weeks",
                "about 16 weeks"
              ],
              [
                "Two people, cooking most days",
                "about 100 ml",
                "under 3 weeks",
                "about 5 weeks"
              ],
              [
                "Family of four, the house oil",
                "about 225 ml",
                "about 8 days",
                "just over 2 weeks"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilBottleSizeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          },
          {
            "type": "p",
            "text": "Both sizes sit on the [products page](/products), and the per-litre gap between them is set out in [olive oil price in Malaysia](/blog/olive-oil-price-in-malaysia-what-you-are-paying-for)."
          }
        ]
      },
      {
        "heading": "Why the big tin is only cheaper if you finish it",
        "id": "the-big-tin",
        "blocks": [
          {
            "type": "p",
            "text": "A three-litre tin advertises a price per litre that assumes every millilitre is used while it is still good. Open it in a kitchen that pours 100 ml a week and the tin has thirty weeks to give against a bottle that keeps its character for eight."
          },
          {
            "type": "p",
            "text": "A tin also breathes. Every pour draws air into the space above the oil, and a tin two-thirds empty is mostly air. Tins suit a restaurant that empties one in a fortnight."
          },
          {
            "type": "image",
            "src": "pressOliveOilBottleSizeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "Decanting a tin into a smaller dark bottle",
        "id": "decanting",
        "blocks": [
          {
            "type": "p",
            "text": "Decanting is what makes a tin work at home: the bulk stays sealed and dark while a small bottle does the daily pouring. It costs nothing but a clean bottle and five minutes, and it is the only reason a large format belongs in a two-person kitchen."
          },
          {
            "type": "ol",
            "items": [
              "Wash a small dark glass bottle and dry it completely before it sees oil.",
              "Fill it to the shoulder, not halfway, so little air sits above the oil.",
              "Reseal the tin at once and keep it in a cupboard away from the stove.",
              "Empty and dry the small bottle before refilling. Never top fresh oil onto old."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilBottleSizeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "What to check on the bottle itself",
        "id": "what-to-check-on-the-bottle",
        "blocks": [
          {
            "type": "p",
            "text": "The container is part of what you are buying. Dark glass and tin both keep light off the oil; a clear bottle under retail lighting ages fastest. Read the harvest date before the best-before date, and check the grade is printed in words, not implied by a picture."
          },
          {
            "type": "ul",
            "items": [
              "**Dark glass or tin.** Clear bottles sit under shop lights for months.",
              "**A harvest date.** The age of the oil, not of the packing run.",
              "**The grade written out.** Extra virgin, in words, on the front.",
              "**A cap that reseals cleanly.** A pourer that will not close leaks air."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilBottleSizeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "When the larger bottle is the right call",
        "id": "when-larger-is-right",
        "blocks": [
          {
            "type": "p",
            "text": "Buy the larger bottle when the kitchen genuinely empties it inside two months, which happens more often than people assume once olive oil replaces the everyday cooking oil rather than sitting beside it. Roasting vegetables twice a week accounts for much of 500 ml."
          },
          {
            "type": "p",
            "text": "Buying two small bottles and opening the second only when the first is done also works. Sealed stock ages slowly, as [olive oil shelf life](/blog/olive-oil-shelf-life-how-long-a-bottle-lasts) sets out."
          },
          {
            "type": "image",
            "src": "pressOliveOilBottleSizeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Count the pours, multiply by 15 ml, and pick the bottle your kitchen empties within about two months of opening. Buy a tin only if you decant into a small dark bottle."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is a 250 ml or a 500 ml olive oil bottle better?",
        "a": "Whichever one your kitchen finishes within about two months. A household that only dresses salads takes eight weeks over 250 ml. One cooking with olive oil most days empties 500 ml in about five weeks."
      },
      {
        "q": "How much olive oil does a family of four use in a month?",
        "a": "A family using olive oil as the main cooking oil pours somewhere near 225 ml a week, so close to a litre a month. A family reserving it for salads and finishing may take two months over 250 ml."
      },
      {
        "q": "Is buying a large tin of olive oil cheaper?",
        "a": "Per litre, yes. In practice it is only cheaper if the last pour is still good. A tin that takes a household six months to empty has spent four of those months past its best."
      },
      {
        "q": "Can I decant olive oil into a smaller bottle?",
        "a": "Yes, and it is the sensible way to use a tin at home. Use a clean, completely dry dark glass bottle, fill it near the shoulder to limit air, and reseal the tin straight after pouring."
      },
      {
        "q": "Why is olive oil sold in dark glass bottles?",
        "a": "Light drives the reaction that flattens an oil's fruit and pepper, so dark glass and tin both slow it. A clear bottle standing under shop lighting for months ages faster than the same oil in green glass."
      },
      {
        "q": "What size bottle suits one person living alone?",
        "a": "The smallest one sold. A single household drizzling olive oil now and then pours perhaps a tablespoon a week, and even 250 ml at that rate outlasts the window where the oil is at its best."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, with the current price for each size."
      },
      {
        "label": "Olive oil shelf life: how long a bottle lasts",
        "path": "blog/olive-oil-shelf-life-how-long-a-bottle-lasts",
        "description": "What a sealed bottle has in it, what an opened one has, and what air, light and heat do."
      },
      {
        "label": "Olive oil price in Malaysia: what you are paying for",
        "path": "blog/olive-oil-price-in-malaysia-what-you-are-paying-for",
        "description": "Why the per-litre figure moves with bottle size, and what sits behind the price."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "olive-oil-for-baking",
    "slug": "olive-oil-for-cakes-and-baking",
    "seoTitle": "Olive Oil for Cake: How to Bake With It",
    "metaTitle": "Olive Oil for Cake: How to Bake With It",
    "metaDescription": "How to bake with olive oil: the butter-to-oil conversion, why oil cakes stay moist longer, which bakes suit a fruity oil, and a worked citrus ratio.",
    "focusKeyword": "olive oil for cake",
    "relatedKeywords": [
      "olive oil cake",
      "baking with olive oil",
      "olive oil instead of butter",
      "butter to olive oil conversion",
      "can you bake with olive oil",
      "extra virgin olive oil cake",
      "olive oil cake ratio",
      "lemon olive oil cake",
      "olive oil in brownies",
      "substitute olive oil for butter in baking"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "baking",
      "cooking",
      "extra virgin",
      "recipes"
    ],
    "h1": "Olive Oil for Cake: Baking With Extra Virgin",
    "excerpt": "Olive oil bakes a different cake from butter rather than a worse one, and the conversion between them is a ratio a home baker can carry in their head.",
    "keyTakeaway": "Olive oil replaces butter in a cake at roughly three-quarters the volume, so 100 g of butter becomes about 75 ml of oil. The crumb comes out looser and stays soft for longer. A fruity extra virgin belongs with citrus, chocolate and spice; delicate sponges want a gentler oil.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilForBakingHero",
      "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
    },
    "ogImage": "/og/blog-olive-oil-for-baking.jpg",
    "intro": [
      "A cake made with olive oil is not what you settle for when the butter runs out. It is a different cake: looser crumb, a softer slice on day two, a low fruitiness under the sugar.",
      "Here is the conversion that works, which bakes want a strong oil, and why the oven dial worries bakers more than it should."
    ],
    "sections": [
      {
        "heading": "The butter-to-oil conversion",
        "id": "butter-to-oil-conversion",
        "blocks": [
          {
            "type": "p",
            "text": "Swap butter for olive oil at roughly **three-quarters the volume**: 100 g of butter becomes about 75 ml of oil. Butter is part water and part milk solids, so pouring the full volume of pure fat into the bowl gives a greasy crumb. Recipes that melt their butter convert most cleanly of all."
          },
          {
            "type": "table",
            "head": [
              "Butter in the recipe",
              "Olive oil to use",
              "Where this comes up"
            ],
            "rows": [
              [
                "50 g",
                "38 ml",
                "Muffins, a tray of brownies"
              ],
              [
                "100 g",
                "75 ml",
                "A single 20 cm layer"
              ],
              [
                "125 g",
                "95 ml",
                "A loaf cake"
              ],
              [
                "200 g",
                "150 ml",
                "Two layers, or a bundt"
              ],
              [
                "1 cup",
                "3/4 cup",
                "American recipes"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForBakingInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          },
          {
            "type": "p",
            "text": "Whisk by hand rather than reaching for the mixer: there is no butter to cream, and beating only toughens the crumb. If the batter looks stiffer than the recipe describes, loosen it with a tablespoon of milk."
          }
        ]
      },
      {
        "heading": "Which bakes convert and which refuse",
        "id": "what-converts",
        "blocks": [
          {
            "type": "p",
            "text": "Anything that starts with melted butter converts: brownies, banana bread, carrot cake, muffins, most chocolate cakes. Anything built on creamed butter and sugar does not, because the air whipped into solid butter is the lift. Shortbread, laminated pastry and buttercream need the butter to stay butter."
          },
          {
            "type": "ul",
            "items": [
              "**Converts well.** Brownies, banana and date loaves, carrot cake, chocolate cake, muffins.",
              "**Converts with care.** Sponges and chiffons, where a milder oil keeps the flavour clean.",
              "**Do not convert.** Shortbread, flaky pastry, buttercream, anything creamed."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForBakingInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "Why an oil cake stays moist longer",
        "id": "why-oil-cakes-stay-moist",
        "blocks": [
          {
            "type": "p",
            "text": "Butter is solid at room temperature and olive oil is liquid, and a cake behaves the same way. Butter in a cooled crumb sets firm, which is why a butter cake tightens overnight and tastes best warm. Olive oil stays liquid at Malaysian room temperature, so the third-day slice is still soft."
          },
          {
            "type": "image",
            "src": "pressOliveOilForBakingInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "The batter is what the oil sees, not a hot pan",
        "id": "batter-not-the-pan",
        "blocks": [
          {
            "type": "p",
            "text": "Bakers hesitate over extra virgin in a 180 °C oven because they are picturing a frying pan. A batter is mostly water, sugar and flour, and while it bakes the crumb sits near boiling point, not at the oven's air temperature. The oil is suspended in that, never against hot metal."
          },
          {
            "type": "p",
            "text": "A cake's exposed edge and a focaccia crust do get hotter, and both sit well inside what this oil takes. The figures are in [what heat olive oil can take](/blog/olive-oil-smoke-point-what-heat-it-can-take)."
          },
          {
            "type": "image",
            "src": "pressOliveOilForBakingInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "Fruity oil or mild oil for the bake",
        "id": "fruity-or-mild",
        "blocks": [
          {
            "type": "p",
            "text": "Match the oil to how much else is happening in the bake. A green, peppery extra virgin has flavour to spare and needs a partner loud enough to meet it: dark chocolate, citrus zest, cinnamon and clove, wholemeal flour. A pale vanilla sponge has nothing to hide behind and wants a gentler, riper oil."
          },
          {
            "type": "p",
            "text": "The peppery catch you taste from a spoon does not survive the oven intact. What reaches the plate is fruit and a faint savoury note, which is why a batter that tasted alarming raw comes out balanced."
          },
          {
            "type": "image",
            "src": "pressOliveOilForBakingInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "Citrus and olive oil, and one worked ratio",
        "id": "citrus-and-a-worked-ratio",
        "blocks": [
          {
            "type": "p",
            "text": "Citrus and olive oil work together because both carry their aroma in fat. Rub the zest into the sugar with your fingers before anything else goes in the bowl, and the oil in the peel spreads through the sugar, then through the batter. Juice alone gives you sourness, not the smell of a lemon."
          },
          {
            "type": "ol",
            "items": [
              "Rub the zest of two lemons into 180 g caster sugar until damp and fragrant.",
              "Whisk in three eggs, then 150 ml olive oil in a thin stream, then 120 g yoghurt.",
              "Fold in 200 g flour, two teaspoons baking powder, a pinch of salt.",
              "Bake in a lined 20 cm tin at 175 °C for 40 to 45 minutes.",
              "Cool in the tin, and slice it the next day."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForBakingInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Three-quarters the volume of butter, whisked not creamed, in anything that would have used melted butter anyway. Strong oil for chocolate, citrus and spice, a gentler one for a plain sponge."
        }
      ]
    },
    "faqs": [
      {
        "q": "Can you use olive oil instead of butter in a cake?",
        "a": "Yes, in any recipe that melts its butter rather than creaming it. Use roughly three-quarters the volume, whisk by hand, and expect a looser crumb that keeps its softness for longer."
      },
      {
        "q": "How much olive oil replaces 100 g of butter?",
        "a": "About 75 ml of olive oil. The quarter you leave out is the water and milk solids the butter brought with it, and a tablespoon of milk covers the difference in a stiff batter."
      },
      {
        "q": "Will the cake taste of olive oil?",
        "a": "It tastes of fruit rather than of salad dressing. Baking softens the peppery edge, and sugar, zest or chocolate carry the rest. A green oil is loud in a plain sponge, welcome in a chocolate one."
      },
      {
        "q": "Is extra virgin olive oil safe to bake at 180 °C?",
        "a": "Yes, comfortably. The oil in a cake sits inside a wet batter, and the crumb stays near boiling point throughout, well under the oven's air temperature. The figures are in [the smoke point article](/blog/olive-oil-smoke-point-what-heat-it-can-take)."
      },
      {
        "q": "Which cakes suit olive oil best?",
        "a": "Citrus cakes, chocolate cake, carrot and banana loaves, spiced cakes and anything wholemeal. All of them have a flavour loud enough to stand beside the oil instead of being flattened by it."
      },
      {
        "q": "Why did my olive oil cake turn out greasy?",
        "a": "Almost always a straight one-for-one swap. Pouring 100 ml of oil where the recipe wanted 100 g of butter adds fat the crumb cannot hold. Drop to three-quarters and the problem disappears."
      },
      {
        "q": "Can I bake with an infused olive oil?",
        "a": "The sweeter infusions suit cakes and flatbreads, where the aroma is protected inside the crumb. Lavender and chamomile, or fennel and anise, are the two to reach for on the [products page](/products)."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in two bottle sizes, plus the six infused oils, with current prices."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Where olive oil fits across tumis, roasting and dressings in a kitchen that runs warm."
      },
      {
        "label": "What cold-pressed olive oil really means",
        "path": "blog/what-cold-pressed-olive-oil-really-means",
        "description": "How the oil is extracted, and what that has to do with the flavour it brings to a bake."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      },
      {
        "label": "Olive oil ice cream",
        "path": "blog/olive-oil-ice-cream",
        "description": "A churned Mediterranean dessert, extra virgin's fruit and pepper against the sweetness."
      },
      {
        "label": "Olive oil orange cake",
        "path": "blog/olive-oil-orange-cake",
        "description": "One specific recipe: zest, juice, and why oil keeps the crumb moist for days."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "olive-oil-substitute",
    "slug": "olive-oil-substitute-what-to-use-instead",
    "seoTitle": "Olive Oil Substitute: What to Use Instead",
    "metaTitle": "Olive Oil Substitute: What to Use Instead",
    "metaDescription": "The right olive oil substitute changes with the job: butter, ghee, coconut, sunflower, canola and rice bran against dressing, frying, roasting and baking.",
    "focusKeyword": "olive oil substitute",
    "relatedKeywords": [
      "what to use instead of olive oil",
      "olive oil replacement",
      "substitute for olive oil in baking",
      "butter instead of olive oil",
      "olive oil substitute for frying",
      "can I use coconut oil instead of olive oil",
      "olive oil to butter conversion",
      "vegetable oil instead of olive oil",
      "no olive oil what can I use",
      "neutral oil substitute"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "cooking",
      "substitutes",
      "baking",
      "kitchen basics"
    ],
    "h1": "Olive Oil Substitute: What to Use Instead, Job by Job",
    "excerpt": "The right olive oil substitute depends on what the oil was doing in the dish, so a dressing, a hot pan, a roasting tray and a cake batter each call for a different fat and sometimes a different quantity.",
    "keyTakeaway": "There is no single olive oil substitute, because a dressing, a pan, a roasting tray and a cake batter ask the oil for different things. Rice bran and canola cover the hot jobs one for one. Melted butter covers a cake at about a third more volume. A dressing is the one swap that always tastes different.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilSubstituteHero",
      "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
    },
    "ogImage": "/og/blog-olive-oil-substitute.jpg",
    "intro": [
      "The pan is hot, the recipe still says olive oil, and the bottle gives up half a teaspoon. What goes in instead depends on what the oil was there to do.",
      "Dressing, frying, roasting and baking are four jobs. Here is the stand-in for each, the ratio wherever it is not one for one, and the flavour you lose."
    ],
    "sections": [
      {
        "heading": "Match the olive oil substitute to the job",
        "id": "match-the-substitute-to-the-job",
        "blocks": [
          {
            "type": "p",
            "text": "An olive oil substitute is chosen by job, not by bottle. In a dressing the oil is most of the flavour, so any swap changes how the dish tastes. In a hot pan it is mainly a cooking medium and almost any kitchen oil does the work."
          },
          {
            "type": "table",
            "head": [
              "The job",
              "Reach for",
              "Ratio",
              "What you give up"
            ],
            "rows": [
              [
                "Dressing and finishing",
                "Sunflower or grapeseed, more lemon",
                "1:1",
                "The grassy, peppery note"
              ],
              [
                "Gentle frying, tumis",
                "Rice bran, canola or ghee",
                "1:1",
                "Little, in a spiced dish"
              ],
              [
                "Roasting at 180-200°C",
                "Rice bran, canola, melted ghee",
                "1:1",
                "A fruity edge on browned skin"
              ],
              [
                "Cakes and muffins",
                "Melted butter",
                "About a third more volume",
                "A crumb still soft next day"
              ],
              [
                "Curry, rendang, coconut bakes",
                "Coconut oil, measured melted",
                "1:1",
                "Nothing; you gain sweetness"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilSubstituteInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "Dressings and finishing: the hardest swap",
        "id": "dressings-and-finishing",
        "blocks": [
          {
            "type": "p",
            "text": "A dressing is oil, acid and salt, so the oil carries most of what the tongue meets. Nothing replaces extra virgin olive oil here without changing the dish. Sunflower and grapeseed come closest in texture, go in one for one, and want extra lemon to stop the result tasting flat."
          },
          {
            "type": "ul",
            "items": [
              "**Sunflower or grapeseed.** Neutral and light, one for one, then sharpen with acid.",
              "**Melted butter.** Fine warm over fish, sets hard as the plate cools.",
              "**Coconut oil.** Only where sweetness belongs; it firms up in a chilled dressing.",
              "**Ghee.** Good through hot rice or dhal, wrong on a cold salad."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilSubstituteInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          },
          {
            "type": "p",
            "text": "Ratios for the real thing are in [extra virgin olive oil salad dressing](/blog/extra-virgin-olive-oil-salad-dressing)."
          }
        ]
      },
      {
        "heading": "Gentle frying and tumis",
        "id": "gentle-frying-and-tumis",
        "blocks": [
          {
            "type": "p",
            "text": "Home tumis runs roughly 140-180°C and most kitchen oils handle it without complaint. Rice bran and canola swap in one for one and add nothing to the flavour, which in a heavily spiced dish is the point. Ghee goes in one for one and brings a nutty dairy note."
          },
          {
            "type": "p",
            "text": "Butter alone scorches at tumis heat because of the milk solids in it. Use it half and half with a neutral oil, or use ghee instead."
          },
          {
            "type": "image",
            "src": "pressOliveOilSubstituteInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "Roasting trays and the oven",
        "id": "roasting",
        "blocks": [
          {
            "type": "p",
            "text": "Roasting asks a fat to coat, brown and stay put for half an hour at 180-200°C. Rice bran, canola and melted ghee all do that one for one. Coconut oil roasts cleanly too, though it leaves a sweetness better suited to pumpkin than to rosemary potatoes."
          },
          {
            "type": "ul",
            "items": [
              "**Rice bran or canola.** One for one, neutral, cheapest by the litre.",
              "**Melted ghee.** One for one, deeper browning, a dairy smell in the oven.",
              "**Coconut oil.** One for one, measured melted, sweet on root vegetables.",
              "**Butter.** Toss it through at the end of the roast, not the start."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilSubstituteInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "Baking, and the one ratio worth remembering",
        "id": "baking",
        "blocks": [
          {
            "type": "p",
            "text": "A cake built on olive oil wants a liquid fat, and melted butter is the usual stand-in. Butter carries water as well as fat, so use about a third more by weight: 100 ml of olive oil becomes roughly 135 g of melted butter, cooled first."
          },
          {
            "type": "p",
            "text": "Coconut oil bakes well in anything already sweet, one for one and measured melted. Ghee suits a dense bake and reads as dairy."
          },
          {
            "type": "image",
            "src": "pressOliveOilSubstituteInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "When olive oil is the substitute",
        "id": "when-olive-oil-is-the-substitute",
        "blocks": [
          {
            "type": "p",
            "text": "Olive oil stands in for other fats as often as the reverse. It replaces butter or margarine in many bakes at roughly three-quarters the volume, and it replaces a neutral oil one for one in dressings, marinades and gentle pan work. The dish gains a peppery edge."
          },
          {
            "type": "ul",
            "items": [
              "**For butter in a cake.** Three-quarters the volume, and a mild oil rather than a bitter one.",
              "**For a neutral oil in the pan.** One for one, under the [olive oil smoke point](/blog/olive-oil-smoke-point-what-heat-it-can-take).",
              "**For a neutral oil in a marinade.** One for one, then taste before adding acid.",
              "**Not for the deep fryer.** Frying oil is not reused, and a full pot is expensive."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilSubstituteInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          },
          {
            "type": "p",
            "text": "The classic oil and the six infused ones sit on the [products page](/products)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Ask what the oil was doing. In a dressing nothing swaps cleanly, so add acid and accept a different salad. In a pan, rice bran or canola. In a cake, melted butter."
        }
      ]
    },
    "faqs": [
      {
        "q": "What can I use instead of olive oil?",
        "a": "Rice bran, canola or sunflower oil cover frying and roasting one for one. Melted butter or ghee cover baking and finishing. A dressing has no clean swap, so use a neutral oil and more acid."
      },
      {
        "q": "What is the best olive oil substitute for baking?",
        "a": "Melted butter, at about a third more volume than the oil, because butter carries water as well as fat. A neutral oil such as canola goes in one for one and tastes plainer."
      },
      {
        "q": "Can I use butter instead of olive oil for frying?",
        "a": "Not on its own at tumis heat, because the milk solids in butter scorch before the food is done. Use half butter and half neutral oil, or use ghee, which has those solids removed."
      },
      {
        "q": "Is coconut oil a good substitute for olive oil?",
        "a": "In curries, rendang and sweet bakes, yes, one for one and measured melted. In a salad dressing it brings a sweet coconut note that most of those dishes were not built around."
      },
      {
        "q": "How much olive oil replaces butter in a recipe?",
        "a": "Roughly three-quarters the volume of butter called for, since olive oil is fat all the way through. A hundred grams of butter becomes about 75 ml of oil in most cake batters."
      },
      {
        "q": "What can I use instead of olive oil in a salad dressing?",
        "a": "Sunflower or grapeseed oil one for one, with a little more lemon juice or vinegar to keep the dressing from tasting flat. Melted butter works warm over vegetables but sets firm."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "The classic Palestinian cold-pressed oil and the six infused oils, in 250 ml and 500 ml bottles."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Which dishes suit it, what heat it takes and where a neutral oil is the better tool."
      },
      {
        "label": "Extra virgin olive oil salad dressing",
        "path": "blog/extra-virgin-olive-oil-salad-dressing",
        "description": "The oil-to-acid ratio, what to add and how to keep a dressing from separating."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      },
      {
        "label": "Olive oil vs butter",
        "path": "blog/olive-oil-vs-butter",
        "description": "As a spread and a cooking fat, not a baking swap, on flavour and browning."
      }
    ]
  },
  /* ---------------- PRESS round 4 ---------------- */
  {
    "id": "olive-oil-vs-coconut-oil",
    "slug": "olive-oil-vs-coconut-oil-in-a-malaysian-kitchen",
    "seoTitle": "Olive Oil vs Coconut Oil in a Malaysian Kitchen",
    "metaTitle": "Olive Oil vs Coconut Oil in a Malaysian Kitchen",
    "metaDescription": "Olive oil vs coconut oil as cooking fats: flavour, what each does at 30°C, behaviour in a hot pan, cost by the litre, and which dish wants which.",
    "focusKeyword": "olive oil vs coconut oil",
    "relatedKeywords": [
      "coconut oil vs olive oil for cooking",
      "olive oil or coconut oil which to use",
      "cooking with coconut oil malaysia",
      "olive oil for rendang",
      "coconut oil melting point",
      "olive oil substitute coconut oil",
      "virgin coconut oil vs extra virgin olive oil",
      "which oil for salad dressing",
      "olive oil price per litre malaysia",
      "baking with olive oil or coconut oil"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "cooking",
      "comparison",
      "extra virgin",
      "malaysian kitchen"
    ],
    "h1": "Olive Oil vs Coconut Oil in a Malaysian Kitchen",
    "excerpt": "Olive oil and coconut oil are two different cooking fats with two different jobs, and in a kitchen that runs at 30°C one stays liquid while the other firms up the moment the air-conditioning does.",
    "keyTakeaway": "Coconut oil belongs where a coconut note belongs, which in Malaysia is a great many dishes. Olive oil belongs where nothing should taste of coconut, and above all where the oil is served unheated. Coconut oil sets solid in an air-conditioned room; olive oil stays liquid. Cost by the litre decides the rest.",
    "datePublished": "2026-08-25",
    "dateModified": "2026-08-25",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilVsCoconutOilHero",
      "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
    },
    "ogImage": "/og/blog-olive-oil-vs-coconut-oil.jpg",
    "intro": [
      "Most Malaysian kitchens own both. Coconut oil for rendang and kuih, a bottle of olive oil for salad and roast vegetables.",
      "What follows compares them as cooking fats: flavour, what each does at 30°C, how each behaves in a hot pan, cost by the litre, and which dish wants which."
    ],
    "sections": [
      {
        "heading": "Olive oil or coconut oil: which one to reach for",
        "id": "which-one-to-reach-for",
        "blocks": [
          {
            "type": "p",
            "text": "Reach for coconut oil when the dish is already coconut: rendang, gulai, kuih, anything built on santan. Reach for olive oil when nothing on the plate should taste of coconut, and above all when the oil is served unheated. Both are ordinary cooking fats. The dish decides."
          },
          {
            "type": "note",
            "title": "On the health question",
            "text": "Which fat suits a particular person is a question for a doctor or a registered dietitian, not for anyone selling oil. This article stays with flavour, texture, heat and cost."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsCoconutOilInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "What each one tastes like on the plate",
        "id": "flavour",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin olive oil tastes green: cut grass, a little bitterness, a peppery catch at the back of the throat. Virgin coconut oil is sweet and rounded, with a coconut aroma that survives cooking. Refined coconut oil is close to neutral and mostly contributes texture."
          },
          {
            "type": "ul",
            "items": [
              "**Rendang.** Coconut oil disappears into it; olive oil argues with the rempah.",
              "**A plain cake.** Coconut oil gives a faintly tropical crumb, olive oil a fruity one.",
              "**A salad.** Olive oil is the dressing; coconut oil sets into flecks on cold leaves."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsCoconutOilInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "Solid or liquid at 28 to 32°C",
        "id": "at-malaysian-room-temperature",
        "blocks": [
          {
            "type": "p",
            "text": "Coconut oil melts at roughly 24°C. On a Malaysian counter at 28 to 32°C it is liquid or a soft paste, and in an air-conditioned room it sets white and hard again. Olive oil stays liquid all year in this climate. That difference decides where each one fails."
          },
          {
            "type": "p",
            "text": "Weigh coconut oil rather than spooning it, because a spoonful solid is not a spoonful melted. It also sets on anything cold, which is why a coconut oil dressing turns grainy on chilled leaves."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsCoconutOilInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "How each behaves in a hot pan",
        "id": "in-a-hot-pan",
        "blocks": [
          {
            "type": "p",
            "text": "Ordinary home cooking sits within reach of both. A tumis or a sauté runs around 140 to 180°C, comfortable for olive oil throughout, and for coconut oil until the top of that range, where it reaches its own smoke point. What differs is what survives: the coconut aroma and the peppery top notes both thin out as the pan gets hotter."
          },
          {
            "type": "p",
            "text": "Temperatures for olive oil, and where a deep fryer stops making sense for it, are in [olive oil smoke point: what heat it can take](/blog/olive-oil-smoke-point-what-heat-it-can-take). Pan technique is in [how to cook with olive oil in a Malaysian kitchen](/blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen)."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsCoconutOilInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "Cost by the litre",
        "id": "cost-by-the-litre",
        "blocks": [
          {
            "type": "p",
            "text": "Coconut oil is pressed here and olive oil is shipped in, so the two sit far apart on a Malaysian shelf: this oil works out at RM236 a litre in the 250 ml bottle and RM206 in the 500 ml, a multiple of local virgin coconut oil. Spend olive oil where it is tasted, and something cheaper where it is only a medium."
          },
          {
            "type": "p",
            "text": "Bottle sizes and current prices are on the [products page](/products), and the branches and online counters carrying the brand are on the [where to buy page](/shop). A fryer takes a litre or two at a time, which is the wrong format for either of these oils."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsCoconutOilInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "Which oil a given dish wants",
        "id": "use-this-for-that",
        "blocks": [
          {
            "type": "p",
            "text": "One question sorts almost every dish: would a coconut note help this plate or fight it? Rendang wants coconut. A tomato and basil salad wants olive oil. A banana cake takes either, and the one you pick is the one you taste in the crumb."
          },
          {
            "type": "table",
            "head": [
              "Dish",
              "Reach for",
              "Why"
            ],
            "rows": [
              [
                "Rendang, gulai, curries",
                "Coconut oil",
                "Coconut is already the dish"
              ],
              [
                "Kuih and Malay sweets",
                "Coconut oil",
                "Sets firm on cooling"
              ],
              [
                "Tumis and nasi goreng",
                "Either",
                "Depends on the rempah"
              ],
              [
                "Salad dressing, cold dishes",
                "Olive oil",
                "Coconut oil sets solid"
              ],
              [
                "Bread and dipping",
                "Olive oil",
                "Served unheated"
              ],
              [
                "Roast vegetables, grilled fish",
                "Olive oil",
                "Grassy, savoury"
              ],
              [
                "Deep frying",
                "Neither",
                "A litre or two per pot, so use cheap oil"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsCoconutOilInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Coconut oil where a coconut note belongs, olive oil where it does not, and olive oil first for anything served unheated. Coconut oil sets solid in cool air. Price settles the rest."
        }
      ]
    },
    "faqs": [
      {
        "q": "Which is better, olive oil or coconut oil?",
        "a": "Neither, as cooking fats. They taste different, set differently at room temperature and cost differently, so the dish decides. If the real question is health, ask a doctor or a dietitian, not a seller."
      },
      {
        "q": "Can I use olive oil instead of coconut oil?",
        "a": "For sautéing and roasting, yes, one for one, and the dish loses its coconut note. For kuih and anything that must set firm on cooling, no: olive oil stays liquid at room temperature."
      },
      {
        "q": "Why does my coconut oil go solid and my olive oil never does?",
        "a": "Coconut oil melts at around 24°C. A counter at 28 to 32°C keeps it liquid or soft, and an air-conditioned room set below that turns it white and firm. Olive oil melts far lower and stays liquid throughout."
      },
      {
        "q": "Can I cook rendang with olive oil?",
        "a": "You can, and it will taste like something else. The pepper and grassiness of an extra virgin sit awkwardly against a rempah built for coconut. Keep the olive oil for the salad."
      },
      {
        "q": "Which one is cheaper in Malaysia?",
        "a": "Coconut oil, usually by a wide margin, because it is produced locally while olive oil is imported and extra virgin costs more again. Current bottle prices are listed on the products page."
      },
      {
        "q": "Can I deep fry with either of them?",
        "a": "Both work and both are a poor use of money at fryer volume, because a pot takes a litre or two at a time. A cheap neutral oil does that job better than either of these."
      },
      {
        "q": "Which should I use in a cake?",
        "a": "Either, and it is a flavour choice. Coconut oil gives a faintly tropical crumb. A fruity extra virgin suits lemon, orange and dark chocolate. Both keep a cake moist longer than butter does."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in two bottle sizes, with the current price for each."
      },
      {
        "label": "Olive oil smoke point: what heat it can take",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "What temperature olive oil actually reaches in a home pan, and where frying stops making sense."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Tumis, roasting, dressings and finishing, with the quantities a Malaysian recipe expects."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "aglio-e-olio",
    "slug": "aglio-e-olio-recipe-with-extra-virgin-olive-oil",
    "seoTitle": "Aglio e Olio Recipe: The Four-Ingredient Version",
    "metaTitle": "Aglio e Olio Recipe with Extra Virgin Olive Oil",
    "metaDescription": "Spaghetti, garlic, chilli and olive oil, by weight for two and four: the emulsion step people skip, blond garlic, and why the oil goes in twice.",
    "focusKeyword": "aglio olio recipe",
    "relatedKeywords": [
      "aglio e olio",
      "spaghetti aglio olio",
      "garlic and olive oil pasta",
      "pasta water emulsion",
      "how much olive oil for pasta",
      "aglio olio ingredients",
      "olive oil pasta recipe",
      "aglio olio for two people",
      "chilli garlic spaghetti",
      "best olive oil for pasta"
    ],
    "category": "Recipes",
    "tags": [
      "recipe",
      "pasta",
      "garlic",
      "extra virgin"
    ],
    "h1": "Aglio e Olio Recipe: Spaghetti with Garlic, Chilli and Olive Oil",
    "excerpt": "The four-ingredient version by weight and volume, for two and for four, with the pasta-water step that turns oil into sauce and the point past which garlic ruins the plate.",
    "keyTakeaway": "Aglio e olio is spaghetti, garlic, chilli and extra virgin olive oil bound with starchy pasta water. Weigh the pasta, take the garlic only as far as blond, keep a mugful of the cooking water back, and stir the last third of the oil in raw off the heat.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressAglioEOlioHero",
      "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
    },
    "ogImage": "/og/blog-aglio-e-olio.jpg",
    "intro": [
      "Aglio e olio exposes a kitchen: four ingredients, twelve minutes, nothing on the plate to hide behind.",
      "Two things separate a good bowl from an oily one: the pasta water, and how far the garlic went."
    ],
    "sections": [
      {
        "heading": "The four ingredients, by weight and volume",
        "id": "the-four-ingredients",
        "blocks": [
          {
            "type": "p",
            "text": "Spaghetti, garlic, chilli and extra virgin olive oil, finished with parsley and a ladle of the water the pasta cooked in. With so few components, quantities matter more here than in a dish of fifteen. Weigh the pasta and measure the oil."
          },
          {
            "type": "table",
            "head": [
              "Ingredient",
              "For two",
              "For four"
            ],
            "rows": [
              [
                "Spaghetti",
                "200 g",
                "400 g"
              ],
              [
                "Extra virgin olive oil",
                "60 ml (4 tbsp)",
                "120 ml (8 tbsp)"
              ],
              [
                "Garlic, sliced thin",
                "4 cloves (20 g)",
                "8 cloves (40 g)"
              ],
              [
                "Dried red chilli",
                "1 whole",
                "2 whole"
              ],
              [
                "Parsley, chopped",
                "3 tbsp",
                "6 tbsp"
              ],
              [
                "Water and salt",
                "2 litres, 20 g",
                "4 litres, 40 g"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressAglioEOlioInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "How to make aglio olio, step by step",
        "id": "method",
        "blocks": [
          {
            "type": "p",
            "text": "Everything happens in the time the spaghetti takes, so slice the garlic and chop the parsley before the water boils. The method below runs pan and pot in parallel and brings them together while both are hot, the only moment a sauce will form."
          },
          {
            "type": "ol",
            "items": [
              "Boil 2 litres of water, salted with 20 g — double every quantity in this method for four. It should taste clearly salty.",
              "Slice the garlic thin by hand; chopped garlic burns, slices cook evenly.",
              "Drop the spaghetti, timer set one minute short of the packet time.",
              "With about five minutes left on the pasta, put 40 ml of oil and the garlic in a **cold** wide pan over low heat.",
              "When the edges turn pale gold, about four minutes, add the chilli and pull the pan off.",
              "Keep a mugful of cooking water back, drain, and lift the spaghetti across; add a ladle, 120 ml, of that water.",
              "Back on medium heat, toss hard for 60 to 90 seconds until the liquid clings.",
              "Off the heat, stir in parsley and the last 20 ml of oil raw. Serve immediately."
            ]
          },
          {
            "type": "image",
            "src": "pressAglioEOlioInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "The pasta water step people get wrong",
        "id": "pasta-water-emulsion",
        "blocks": [
          {
            "type": "p",
            "text": "The sauce is an emulsion. Starch dissolved in the cooking water holds oil and water together so the mixture coats every strand instead of pooling under it. Two habits break it: draining into a colander and losing that water, and finishing the toss off the heat."
          },
          {
            "type": "ul",
            "items": [
              "**Keep a mugful back** before draining. It is the only thickener here.",
              "**Undercook by two minutes.** The rest happens in the pan.",
              "**Toss, do not stir.** Agitation forces oil and water to combine.",
              "**Judge by the pan,** not the clock: ready when it turns glossy."
            ]
          },
          {
            "type": "image",
            "src": "pressAglioEOlioInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "Garlic: blond, never brown",
        "id": "garlic-blond-never-brown",
        "blocks": [
          {
            "type": "p",
            "text": "Garlic in warm oil travels from raw to sweet to bitter fast, and brown garlic ruins the plate because the oil carries that bitterness into every strand. Blond is the target: pale gold at the edges, still soft in the middle, smelling sweet. A cold start buys time."
          },
          {
            "type": "ul",
            "items": [
              "**A few dark edges?** Off the heat at once, lift those slices out.",
              "**Brown and smelling acrid?** Start over. Four minutes against a bitter dinner.",
              "**Burning every time?** Use a wider pan: one layer cooks evenly."
            ]
          },
          {
            "type": "image",
            "src": "pressAglioEOlioInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "Chilli, parsley and the second pour",
        "id": "chilli-parsley-and-raw-oil",
        "blocks": [
          {
            "type": "p",
            "text": "The chilli is warmth, not fire: one dried chilli crumbled, or half a teaspoon of flakes, for two. Parsley goes in off the heat so it stays green. The oil arrives twice, warm at the start to carry the garlic, cold at the end for the aroma heat drives off."
          },
          {
            "type": "p",
            "text": "Two-thirds of the oil cooks, one-third goes in raw. That last 20 ml is most of what you smell."
          },
          {
            "type": "image",
            "src": "pressAglioEOlioInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "Mostly oil, so the oil is the flavour",
        "id": "the-oil-is-the-flavour",
        "blocks": [
          {
            "type": "p",
            "text": "Strip the recipe back and it is pasta, garlic and about 30 ml of oil a head. Nothing else carries the plate. A flat refined oil makes a flat bowl: texture and salt, no fruit. This is the dish where an extra virgin's pepper and grassiness has somewhere to go."
          },
          {
            "type": "p",
            "text": "A young, green, peppery oil suits it: bitterness that is aggressive off a spoon becomes backbone against starch. Heat is not the constraint here — [what heat olive oil takes](/blog/olive-oil-smoke-point-what-heat-it-can-take) covers that. [Arabian Village](/products) sells it in 250 ml and 500 ml."
          },
          {
            "type": "image",
            "src": "pressAglioEOlioInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Salt the water, keep a mugful back, start the garlic in cold oil and stop at blond, toss until glossy, then stir a third of the oil in raw."
        }
      ]
    },
    "faqs": [
      {
        "q": "How much olive oil goes into aglio olio?",
        "a": "About 30 ml of extra virgin olive oil per 100 g of dried spaghetti, so 60 ml for two. Use two-thirds warm with the garlic and stir the last third in raw."
      },
      {
        "q": "Why is my aglio olio oily instead of glossy?",
        "a": "The oil and the pasta water never emulsified. Add a ladle of starchy cooking water, put the pan back over medium heat, and toss hard for a minute until the liquid clings."
      },
      {
        "q": "Can I use ordinary olive oil instead of extra virgin?",
        "a": "You can, and the bowl will be duller. Nearly all the flavour here comes from the oil and the garlic, so a refined oil leaves texture and salt without fruit or pepper."
      },
      {
        "q": "What do I do if the garlic turns brown?",
        "a": "If only a few edges caught, lift the pan off the heat and remove the darkest slices. If it smells acrid, start the garlic again in fresh oil: brown garlic turns everything bitter."
      },
      {
        "q": "Should aglio e olio have cheese in it?",
        "a": "The classic version has none and the sauce holds without it. Grated hard cheese at the table is common outside Italy; add it off the heat, or it clumps instead of melting."
      },
      {
        "q": "How long does aglio olio take to make?",
        "a": "Roughly the time the spaghetti boils, about twelve minutes, plus five to slice garlic and chop parsley. Prepare everything before the pasta goes in, because the finish itself takes only ninety seconds."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, the classic bottle plus six infused flavours."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Where olive oil fits alongside the oils already on the shelf, from tumis to roasting."
      },
      {
        "label": "Olive oil for bread and dipping",
        "path": "blog/olive-oil-for-bread-and-dipping",
        "description": "Tasting an oil unheated: za'atar, dukkah and balsamic as three different directions."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus its Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "cloudy-olive-oil",
    "slug": "why-is-my-olive-oil-cloudy",
    "seoTitle": "Cloudy Olive Oil With Sediment: Is It Off?",
    "metaTitle": "Cloudy Olive Oil With Sediment: Is It Off?",
    "metaDescription": "Cold haze, unfiltered sediment or a bottle that is genuinely finished: how to tell which one you have, and why the smell is the only test that decides.",
    "focusKeyword": "cloudy olive oil with sediment",
    "relatedKeywords": [
      "why is my olive oil cloudy",
      "sediment in olive oil",
      "unfiltered olive oil",
      "filtered vs unfiltered olive oil",
      "olive oil solidified in fridge",
      "olive oil fridge test",
      "is cloudy olive oil safe",
      "how to tell if olive oil is rancid",
      "olive oil storage Malaysia",
      "olive oil went hazy"
    ],
    "category": "Storage and quality",
    "tags": [
      "cloudy",
      "sediment",
      "unfiltered",
      "storage"
    ],
    "h1": "Why Is My Olive Oil Cloudy, With Sediment at the Bottom?",
    "excerpt": "A haze in the bottle and a layer at the bottom are three different things wearing one face: cold, olive solids, or an oil that is genuinely finished. Only one of them means throw it out.",
    "keyTakeaway": "Cloudiness is almost never a verdict. Cold haze reverses in about an hour on the counter, and sediment in an unfiltered oil is fine olive solids rather than damage, though they shorten the bottle's life. Only the smell decides whether an oil is finished, and a rancid oil can be perfectly clear.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressCloudyOliveOilHero",
      "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
    },
    "ogImage": "/og/blog-cloudy-olive-oil.jpg",
    "intro": [
      "A haze in the bottle and a fine layer at the bottom is the most searched olive oil worry there is, and the answer is almost always that nothing is wrong.",
      "Three separate things get called cloudy, and only one means the oil is finished."
    ],
    "sections": [
      {
        "heading": "The three things people call cloudy",
        "id": "three-things-people-call-cloudy",
        "blocks": [
          {
            "type": "p",
            "text": "Cold haze, unfiltered sediment and genuine spoilage look nothing alike once you know what separates them. Haze is temperature, and it undoes itself. Sediment is olive solids that settled out. Spoilage is a change in smell, and a rancid oil can be perfectly clear while a cloudy one is perfectly good."
          },
          {
            "type": "table",
            "head": [
              "What you see",
              "What it is",
              "What to do"
            ],
            "rows": [
              [
                "Milky haze after a cold night",
                "Cold haze, fats setting",
                "Counter, about an hour"
              ],
              [
                "Soft layer at the bottom",
                "Unfiltered olive solids",
                "Normal, but finish the bottle"
              ],
              [
                "Firm white deposit, chilled bottle",
                "The same setting, further on",
                "Room temperature, no fridge needed"
              ],
              [
                "Clear oil, smells of crayon",
                "Rancid, and the haze was never it",
                "Stop pouring it on food"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressCloudyOliveOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Cold haze reverses at room temperature",
        "id": "cold-haze",
        "blocks": [
          {
            "type": "p",
            "text": "Olive oil is a blend of fats that set at different temperatures, so a bottle below roughly ten degrees clouds, and one at fridge temperature stiffens into soft white lumps. The change is physical, not chemical. About an hour on a Malaysian counter and the bottle pours clear again."
          },
          {
            "type": "p",
            "text": "This is also why the fridge test proves nothing. How much an oil hazes in the cold follows the olive variety and the temperature it reached, not whether it is genuine. A bottle that sets is no more real than one that stays clear."
          },
          {
            "type": "image",
            "src": "pressCloudyOliveOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Sediment in an unfiltered bottle",
        "id": "unfiltered-sediment",
        "blocks": [
          {
            "type": "p",
            "text": "A soft layer at the bottom of a young oil is fine olive solids and a trace of fruit water that were never filtered out. It is normal, not a fault. It does shorten the bottle's life, because those solids carry moisture and slowly ferment, so an unfiltered bottle wants finishing."
          },
          {
            "type": "ul",
            "items": [
              "**Do not shake it back in.** Pour off the clear oil and leave the last centimetre.",
              "**Keep it closed and dark.** Light and air do far more damage than the solids do.",
              "**Finish it sooner.** Roughly two months from opening, as [olive oil shelf life](/blog/olive-oil-shelf-life-how-long-a-bottle-lasts) sets out."
            ]
          },
          {
            "type": "image",
            "src": "pressCloudyOliveOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Filtered against unfiltered is a choice, not a fault",
        "id": "filtered-or-unfiltered",
        "blocks": [
          {
            "type": "p",
            "text": "Filtering passes the fresh oil through cloth or a fine filter to take the solids out. An unfiltered oil skips that and goes into the bottle hazy and a little fuller in the mouth. Neither is a grade and neither is a defect, and which one a bottle is belongs on its label."
          },
          {
            "type": "p",
            "text": "The trade-off is time. Filtered oil stays bright and keeps better; unfiltered shows more of the fresh fruit early and fades sooner. Both meet the same extra virgin standard, set by chemistry and tasting, never by clarity. The range sits on the [products page](/products)."
          },
          {
            "type": "image",
            "src": "pressCloudyOliveOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "The smell test is the only one that settles it",
        "id": "the-smell-test",
        "blocks": [
          {
            "type": "p",
            "text": "Pour a spoonful, cup it in your palm for a moment, and smell it. Sound oil smells green — cut grass, fresh olive, a little almond — and catches at the back of the throat. A finished oil smells of wax crayon, putty or stale nuts, or of nothing."
          },
          {
            "type": "p",
            "text": "Bitterness and pepper get mistaken for faults constantly, which [why olive oil tastes bitter](/blog/why-does-olive-oil-taste-bitter) goes through properly. Damp cardboard, sour or fermented notes are a different matter."
          },
          {
            "type": "image",
            "src": "pressCloudyOliveOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "What a Malaysian kitchen does to the bottle",
        "id": "malaysian-kitchen",
        "blocks": [
          {
            "type": "p",
            "text": "An air-conditioned kitchen at twenty-four degrees is nowhere near cold enough to haze a bottle, so a cloudy oil here has usually been in the fridge or has solids in it. The fridge is not necessary, and heat is the real enemy: the cupboard beside the hob."
          },
          {
            "type": "p",
            "text": "One local wrinkle: a bottle out of the fridge sweats, and those drops run into the neck as you pour. Let it come back to room temperature and dry the outside first."
          },
          {
            "type": "image",
            "src": "pressCloudyOliveOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Cloudy is not a verdict. A cold bottle needs an hour on the counter. A hazy one at room temperature with a layer underneath is unfiltered, and wants finishing. Only the smell tells you an oil is done."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is cloudy olive oil safe to use?",
        "a": "Almost always, yes. Cold haze reverses on the counter, and unfiltered sediment is normal in a young oil. Cloudiness on its own says nothing about whether an oil is sound; the smell does."
      },
      {
        "q": "Why is there sediment at the bottom of my olive oil?",
        "a": "Because the oil was bottled without filtering, or with only light filtering, so fine olive solids and a little fruit water settled out over the following weeks. It is normal, and it is not damage."
      },
      {
        "q": "How long does cloudy olive oil take to clear?",
        "a": "About an hour at room temperature for a haze, and longer for a bottle that has set firm in a fridge. Nothing needs doing beyond leaving it on the counter; never warm it on the hob."
      },
      {
        "q": "Does olive oil clouding in the fridge prove it is real?",
        "a": "No, and staying clear proves nothing either. How much an oil hazes in the cold follows the olive variety and the temperature it reached, not whether it was blended with something cheaper."
      },
      {
        "q": "Is unfiltered olive oil better than filtered?",
        "a": "Neither is better. Unfiltered shows more of the fresh fruit early and keeps less well; filtered stays bright and stable for longer. Both can be extra virgin, since the grade is set by chemistry and tasting."
      },
      {
        "q": "How do I know my olive oil has actually gone off?",
        "a": "Smell it. A finished oil smells of wax crayon, putty or stale nuts, or has lost its aroma entirely, and tastes flat and greasy with no peppery catch at the back of the throat."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, classic and the six infused flavours."
      },
      {
        "label": "Olive oil shelf life: how long a bottle lasts",
        "path": "blog/olive-oil-shelf-life-how-long-a-bottle-lasts",
        "description": "What a sealed bottle has in it, what an opened one has, and what air, light and heat do."
      },
      {
        "label": "Why does olive oil taste bitter?",
        "path": "blog/why-does-olive-oil-taste-bitter",
        "description": "Why bitterness and a peppery catch are normal in a fresh oil, and which tastes are real faults."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus their Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "olive-oil-and-balsamic",
    "slug": "olive-oil-and-balsamic-vinegar",
    "seoTitle": "Balsamic Vinegar and Olive Oil Dressing Ratio",
    "metaTitle": "Balsamic Vinegar and Olive Oil Dressing Ratio",
    "metaDescription": "Where to start the ratio, how a cheap balsamic of Modena and an aged one change it, dipping against dressing, and what not to pair balsamic with.",
    "focusKeyword": "balsamic vinegar and olive oil dressing",
    "relatedKeywords": [
      "olive oil and balsamic vinegar ratio",
      "balsamic vinaigrette ratio",
      "balsamic vinegar of modena",
      "aged balsamic vinegar",
      "balsamic glaze vs vinegar",
      "olive oil and balsamic for bread",
      "how to make balsamic dressing",
      "balsamic dressing shelf life",
      "what to serve with balsamic and olive oil",
      "finishing drizzle olive oil"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "balsamic",
      "dressing",
      "pairing",
      "extra virgin"
    ],
    "h1": "Balsamic Vinegar and Olive Oil Dressing: Getting the Ratio Right",
    "excerpt": "Balsamic and olive oil are poured together by eye in most kitchens. They are a fat and a sweet acid, and the amount of each decides whether the plate tastes of one, the other, or neither.",
    "keyTakeaway": "Start at four parts extra virgin olive oil to one part balsamic by volume, which is what this blog already publishes for a balsamic dressing, then move it: more oil when the vinegar is thin and sharp, far less when it is aged and syrupy. Whisk it for a salad, pour it unmixed for bread, and keep the rest capped and cold.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilAndBalsamicHero",
      "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
    },
    "ogImage": "/og/blog-olive-oil-and-balsamic.jpg",
    "intro": [
      "Balsamic and olive oil go into the same bowl in more kitchens than any other pairing, usually by eye. One is a fat and the other a sweet acid, and the amount of each decides whether the plate tastes of oil, of vinegar, or of nothing much.",
      "The measure is a ratio, and where it starts depends on which balsamic you bought."
    ],
    "sections": [
      {
        "heading": "Why fat and acid need a ratio, not a splash",
        "id": "why-a-ratio",
        "blocks": [
          {
            "type": "p",
            "text": "Oil coats and carries flavour; acid cuts through it. Pour either by eye and one of them wins. Balsamic makes it harder because it brings sugar as well as acid, so a heavy hand reads sweet before it reads sharp and the pepper in a good oil vanishes underneath."
          },
          {
            "type": "p",
            "text": "It is a ratio by volume, and it counts only the oil and the vinegar."
          },
          {
            "type": "image",
            "src": "pressOliveOilAndBalsamicInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          }
        ]
      },
      {
        "heading": "Start at 3:1, then move it",
        "id": "start-at-three-to-one",
        "blocks": [
          {
            "type": "p",
            "text": "Three tablespoons of extra virgin olive oil to one of balsamic is the place to begin: enough vinegar to taste, not enough to take the plate over. Move up as the balsamic gets sweeter and thicker, and down to 2:1 on leaves sturdy enough to fight back."
          },
          {
            "type": "table",
            "head": [
              "Oil to balsamic",
              "The bottle",
              "What it suits"
            ],
            "rows": [
              [
                "3:1",
                "Aged and syrupy, used in drops",
                "Ripe tomato, roast vegetables"
              ],
              [
                "4:1",
                "Everyday vinegar of Modena",
                "Mixed leaves, rocket, cheese"
              ],
              [
                "5:1",
                "Thin and very sharp",
                "Cabbage, kale, raw fennel"
              ],
              [
                "Poured, not mixed",
                "Any of them",
                "A dipping saucer"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilAndBalsamicInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          },
          {
            "type": "p",
            "text": "The same arithmetic with lemon and other acids: [extra virgin olive oil salad dressing](/blog/extra-virgin-olive-oil-salad-dressing)."
          }
        ]
      },
      {
        "heading": "A cheap balsamic and an aged one are not the same ingredient",
        "id": "cheap-against-aged",
        "blocks": [
          {
            "type": "p",
            "text": "Most supermarket bottles are balsamic vinegar of Modena: wine vinegar with concentrated grape must added, thin, dark and sharp. An aged bottle is grape must cooked down and held in casks for years, so it pours slowly, tastes of dried fruit rather than vinegar, and costs many times more."
          },
          {
            "type": "ul",
            "items": [
              "**Everyday vinegar of Modena.** Thin and sour, and the cheapest bottles are sharpest. Whisk it.",
              "**Condimento or glaze.** Thickened and sweetened, sometimes with sugar. Read the ingredients first.",
              "**Aged and cask-matured.** Syrupy, with little bite. Use drops, not spoons."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilAndBalsamicInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          },
          {
            "type": "p",
            "text": "Sharper bottle, more oil. Sweeter and thicker, much less of it."
          }
        ]
      },
      {
        "heading": "Dipping, dressing and a finishing drizzle",
        "id": "three-different-jobs",
        "blocks": [
          {
            "type": "p",
            "text": "The same two bottles do three jobs and only one involves whisking. On a dipping saucer the two never combine, and [the bread article](/blog/olive-oil-for-bread-and-dipping) covers that saucer in full. A dressing is held together so every leaf gets both. A drizzle is neither, and goes on last."
          },
          {
            "type": "ul",
            "items": [
              "**Dipping.** Pour the oil, drop the balsamic in, leave it alone — the saucer itself is [olive oil for bread and dipping](/blog/olive-oil-for-bread-and-dipping).",
              "**Dressing.** Shake with a little mustard so it holds, and dress at the table.",
              "**Finishing.** A spoon of oil and a few drops over plated food: tomatoes, grilled vegetables, strawberries."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilAndBalsamicInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          }
        ]
      },
      {
        "heading": "What not to pair it with",
        "id": "what-not-to-pair",
        "blocks": [
          {
            "type": "p",
            "text": "Balsamic is dark, sweet and loud. It flattens anything delicate and doubles up on anything already sour, which is why it lands badly on half the plates it reaches. Steamed white fish and a salad already dressed with calamansi both lose from it; lemon and olive oil belong there."
          },
          {
            "type": "ul",
            "items": [
              "**Delicate fish and seafood.** Colour and sweetness both take over.",
              "**Anything already sour.** Lime, tamarind, yogurt: one acid is enough.",
              "**The strongly infused oils.** Balsamic argues with wild thyme or fennel and anise; keep it for the classic oil on the [products page](/products).",
              "**A long marinade.** The sugar darkens and catches before the meat is done."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilAndBalsamicInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          }
        ]
      },
      {
        "heading": "Storing a dressing you have already mixed",
        "id": "storing-a-mixed-dressing",
        "blocks": [
          {
            "type": "p",
            "text": "Mix it in the jar you intend to keep it in. Oil, balsamic, salt and mustard hold about two weeks capped in the refrigerator, and a crushed garlic clove or chopped herbs cut that to a few days. Shake it back together before it meets a leaf."
          },
          {
            "type": "p",
            "text": "The dressing thickens and clouds in the cold. That is normal and twenty minutes on the counter reverses it. The oil bottle itself needs no refrigerator."
          },
          {
            "type": "image",
            "src": "pressOliveOilAndBalsamicInline",
            "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Four parts extra virgin olive oil to one part balsamic, more oil if the bottle is sharp and less if it is syrupy. Whisk for salad, pour unmixed for bread."
        }
      ]
    },
    "faqs": [
      {
        "q": "What is the correct ratio of balsamic vinegar to olive oil?",
        "a": "Four parts olive oil to one part balsamic by volume: four tablespoons of oil to one of vinegar. Go to 3:1 with an aged, syrupy bottle, and further still with a syrupy one."
      },
      {
        "q": "Do you mix olive oil and balsamic vinegar or keep them separate?",
        "a": "Both, depending on the job. For bread, pour the oil and drop the balsamic in so each piece takes a different amount. For a salad, whisk them so the dressing coats every leaf."
      },
      {
        "q": "Can I use aged balsamic in a salad dressing?",
        "a": "You can, with much less of it. An aged, cask-matured bottle is sweet and syrupy, so a 3:1 dressing built on it tastes like a dessert sauce. Start nearer five parts oil."
      },
      {
        "q": "What is the difference between balsamic vinegar of Modena and a glaze?",
        "a": "Vinegar of Modena is thin, sharp wine vinegar with concentrated grape must added. A glaze or condimento is thickened and sweetened, sometimes with sugar, so it needs far less oil to balance."
      },
      {
        "q": "How long does a balsamic and olive oil dressing keep?",
        "a": "About two weeks in a capped glass jar in the refrigerator when it is only oil, balsamic, salt and mustard. Raw garlic brings that down to three or four days, and soft fresh herbs to two or three."
      },
      {
        "q": "Which olive oil goes best with balsamic vinegar?",
        "a": "An extra virgin, since nothing is heated and the oil's own fruit and pepper have to stand up to the vinegar. The classic oil suits it better than the strongly infused flavours."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours and the price for each size."
      },
      {
        "label": "Extra virgin olive oil salad dressing: ratios and method",
        "path": "blog/extra-virgin-olive-oil-salad-dressing",
        "description": "The wider dressing guide: emulsion method, four builds, and what splits a vinaigrette."
      },
      {
        "label": "Olive oil for bread and dipping",
        "path": "blog/olive-oil-for-bread-and-dipping",
        "description": "The saucer itself, with za'atar, dukkah and balsamic as three separate directions."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "olive-oil-for-grilling",
    "slug": "olive-oil-for-grilling-and-barbecue",
    "seoTitle": "Olive Oil for Grilling: Where the Oil Goes",
    "metaTitle": "Olive Oil for Grilling: Where the Oil Goes",
    "metaDescription": "Oil the food, not the grate. Why a marinade's oil drips and burns, what really causes flare-ups, and the finishing pour after the food comes off.",
    "focusKeyword": "olive oil for grilling",
    "relatedKeywords": [
      "olive oil for barbecue",
      "oil the grill grate or the food",
      "olive oil flare ups barbecue",
      "grilling marinade oil",
      "direct and indirect heat grilling",
      "finishing oil for grilled food",
      "olive oil for satay",
      "olive oil for ikan bakar",
      "brushing oil on grilled fish",
      "extra virgin olive oil drizzle"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "grilling",
      "barbecue",
      "cooking with olive oil",
      "kitchen guide"
    ],
    "h1": "Olive Oil for Grilling: Where the Oil Actually Goes",
    "excerpt": "Grilling is the one method where most of the oil never reaches the plate. Oil the food rather than the bars, drain before the fire, and keep the good bottle for after.",
    "keyTakeaway": "Brush the oil onto the food, never onto the grate, and drain the marinade before anything meets the fire, because the oil that drips is the oil that burns. Use a plain oil in the bowl and save the extra virgin for the pour that lands after the food comes off.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilForGrillingHero",
      "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
    },
    "ogImage": "/og/blog-olive-oil-for-grilling.jpg",
    "intro": [
      "Grilling is the one method where most of the oil never arrives on the plate. It runs off the food, drips between the bars and burns on the coals below.",
      "Which bottle you reach for matters less than the moment you reach for it: two pours, two oils, and only one of them tasted."
    ],
    "sections": [
      {
        "heading": "Oil the food, not the grate",
        "id": "oil-the-food-not-the-grate",
        "blocks": [
          {
            "type": "p",
            "text": "Brush the oil onto the food, not onto the bars. Oil on a hot grate burns off within seconds and leaves a sticky residue that grips rather than releases. A thin film on the food is what stops sticking and browns first, and it takes far less oil."
          },
          {
            "type": "ul",
            "items": [
              "**Pat the food dry first.** Oil slides off a wet surface, and water steams rather than browns.",
              "**Brush, do not pour.** A teaspoon covers a chicken thigh.",
              "**Clean and hot beats oiled.** Scrape the bars and heat them through."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForGrillingInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          }
        ]
      },
      {
        "heading": "Why a marinade's oil mostly drips and burns",
        "id": "why-marinade-oil-burns",
        "blocks": [
          {
            "type": "p",
            "text": "Most of the oil in a marinade never reaches anybody. It runs off on the way to the grill, drips between the bars and burns on the fire below, and the little that clings sits in the hottest place in the kitchen."
          },
          {
            "type": "p",
            "text": "That is not a case against marinating. The oil still carries garlic, chilli and herbs onto the surface, as [olive oil marinade](/blog/olive-oil-marinade-what-it-does) sets out. The question is which bottle."
          },
          {
            "type": "image",
            "src": "pressOliveOilForGrillingInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          }
        ]
      },
      {
        "heading": "Flare-ups, and what actually causes them",
        "id": "flare-ups",
        "blocks": [
          {
            "type": "p",
            "text": "A flare-up is dripping fat catching fire, not an oil failing. Melting fat and loose marinade fall onto the coals, meet the flame and ignite, and the column of fire coats whatever sits above it in soot. More oil means more fuel arriving at once."
          },
          {
            "type": "ul",
            "items": [
              "**Drain before it goes on.** Let each piece stop dripping first.",
              "**Keep a cool zone.** Move food sideways off the flame, not upward.",
              "**Trim the loose fat** on chicken skin and lamb, which is the fuel."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForGrillingInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          }
        ]
      },
      {
        "heading": "Direct heat against indirect heat",
        "id": "direct-against-indirect",
        "blocks": [
          {
            "type": "p",
            "text": "Direct heat means the food sits over the fire; indirect means beside it, lid down. Direct browns a thin cut in minutes. Indirect cooks a thick one through without burning the outside. Almost every grilling problem is a thick cut left over a direct fire."
          },
          {
            "type": "table",
            "head": [
              "Food",
              "Direct or indirect",
              "Oil goes on"
            ],
            "rows": [
              [
                "Satay, thin skewers",
                "Direct, fast",
                "Basted during, drizzled after"
              ],
              [
                "Chicken thighs, bone in",
                "Sear direct, finish indirect",
                "Film before, pour after"
              ],
              [
                "Whole fish",
                "Direct, moderate fire",
                "On the fish, not the bars"
              ],
              [
                "Lamb shoulder, thick cuts",
                "Indirect, lid down",
                "After resting"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForGrillingInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          },
          {
            "type": "p",
            "text": "Live charcoal runs hotter than any oil is at its best, so the pour that counts comes later. See [olive oil smoke point](/blog/olive-oil-smoke-point-what-heat-it-can-take)."
          }
        ]
      },
      {
        "heading": "The finishing pour, after the food comes off",
        "id": "the-finishing-pour",
        "blocks": [
          {
            "type": "p",
            "text": "The pour you actually taste happens once the food is off the fire. Oil meeting hot food away from the flame warms just enough to lift its aroma, and none of it burns off. This is where an extra virgin does what a refined oil cannot."
          },
          {
            "type": "ul",
            "items": [
              "**Fish:** a spoonful over the flesh with lemon, straight off the grate.",
              "**Lamb and beef:** after ten minutes of resting, not before.",
              "**Vegetables:** while still hot, because that is when they drink it."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForGrillingInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          },
          {
            "type": "p",
            "text": "One tablespoon is the whole argument for keeping [Arabian Village extra virgin](/products) beside the serving dish, not in the bowl."
          }
        ]
      },
      {
        "heading": "Satay and ikan bakar, the local cases",
        "id": "satay-and-ikan-bakar",
        "blocks": [
          {
            "type": "p",
            "text": "Satay and ikan bakar are where the rule shows itself. Satay is basted throughout, classically with a bruised lemongrass stalk dipped in oil, and that basting oil does mechanical work: keeping a thin surface from drying over a fast fire."
          },
          {
            "type": "p",
            "text": "Ikan bakar is gentler. The fish is coated in sambal, often wrapped in banana leaf, and cooked at a distance rather than seared. Oil the fish, not the wire basket, and drizzle once it is opened."
          },
          {
            "type": "image",
            "src": "pressOliveOilForGrillingInline",
            "alt": "A sunlit path running between old olive trees in the grove"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Brush the food, never the grate. Drain before the fire, because the oil that drips is the oil that flares. Marinate with something plain and let the extra virgin land afterwards."
        }
      ]
    },
    "faqs": [
      {
        "q": "Can you use olive oil for grilling?",
        "a": "Yes, in two places: a thin film brushed onto the food before it goes on, and a drizzle after it comes off. Use a plain oil for the first and an extra virgin for the second."
      },
      {
        "q": "Should I oil the grill grate or the food?",
        "a": "The food. Oil on hot bars burns off almost at once and leaves a residue that makes sticking worse. A clean, properly heated grate plus a light film on the food releases cleanly."
      },
      {
        "q": "Why does my barbecue flare up when I put food on?",
        "a": "Fat and marinade dripping onto the fire are igniting. Drain each piece before it goes on, trim loose fat, and keep an unlit area to slide food across to when flames come up."
      },
      {
        "q": "Does olive oil burn on the barbecue?",
        "a": "Oil sitting directly over live coals will darken and smoke, as any oil does at grill temperatures. That is why the marinade takes a cheap oil and the good oil goes on afterwards."
      },
      {
        "q": "How much oil should I brush on before grilling?",
        "a": "Roughly a teaspoon per portion, enough to leave a sheen with nothing pooling. If oil runs off as you carry the food to the grill, there is too much on it."
      },
      {
        "q": "Can I use extra virgin olive oil for satay?",
        "a": "Use a plain oil on the basting brush, since most of it drips into the fire. A spoonful of extra virgin over the skewers on the plate is where the difference is actually tasted."
      },
      {
        "q": "Do I oil fish before grilling it?",
        "a": "Yes, and only the fish. Pat it dry, brush a thin film over the skin, then grill over a moderate rather than a fierce fire. Oiling the basket or the bars does nothing useful."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused oils, with prices."
      },
      {
        "label": "Olive oil smoke point: what heat it can actually take",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "The ranges by grade, why freshness moves the number, and which methods stay under it."
      },
      {
        "label": "Olive oil marinade: what the oil is actually doing",
        "path": "blog/olive-oil-marinade-what-it-does",
        "description": "Why the oil carries aroma rather than tenderises, with ratios against acid and timings."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "olive-oil-for-hummus",
    "slug": "olive-oil-for-hummus",
    "seoTitle": "Olive Oil for Hummus: In the Blend and On Top",
    "metaTitle": "Olive Oil for Hummus: In the Blend and On Top",
    "metaDescription": "Hummus takes oil twice, in the blend and poured on top. Which oil does which job, quantities for a standard batch, and how to serve it so the oil pools.",
    "focusKeyword": "olive oil for hummus",
    "relatedKeywords": [
      "how much olive oil in hummus",
      "best olive oil for hummus",
      "olive oil on top of hummus",
      "hummus recipe with olive oil",
      "extra virgin olive oil hummus",
      "tahini and lemon balance",
      "hummus serving temperature",
      "how to serve hummus",
      "olive oil drizzle",
      "hummus quantities for a batch"
    ],
    "category": "Cooking",
    "tags": [
      "hummus",
      "cooking",
      "finishing oil",
      "extra virgin"
    ],
    "h1": "Olive Oil for Hummus: In the Blend and On Top",
    "excerpt": "A bowl of hummus takes oil twice, and the two pours do different work. Which oil belongs in the blend, which belongs on the surface, how much of each, and how to serve it so the oil sits in a pool instead of vanishing.",
    "keyTakeaway": "Hummus takes oil twice. About thirty millilitres goes into the blend, where tahini and lemon mask most of its character, so the everyday bottle is enough there. The pour on top is tasted almost neat, a tablespoon a portion, and that is where the better extra virgin belongs.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilForHummusHero",
      "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
    },
    "ogImage": "/og/blog-olive-oil-for-hummus.jpg",
    "intro": [
      "Most recipes mention olive oil once. A bowl of hummus takes it twice, and the two pours do different work: one disappears into the paste, the other is eaten almost neat.",
      "Hummus is a Levantine dish and this oil is pressed in Palestine, which is the whole of that context. The rest is method."
    ],
    "sections": [
      {
        "heading": "Hummus takes oil twice",
        "id": "oil-twice",
        "blocks": [
          {
            "type": "p",
            "text": "Oil goes into the blend, and oil goes onto the finished bowl. Inside, it is a texture ingredient that works into the tahini and chickpea paste and disappears. On top it is a condiment, tasted almost neat, one mouthful at a time."
          },
          {
            "type": "p",
            "text": "That decides where the money goes. Oil blended into tahini, lemon and garlic loses to three louder flavours. The pour sits on the surface with nothing in front of it."
          },
          {
            "type": "image",
            "src": "pressOliveOilForHummusInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      },
      {
        "heading": "Which oil goes where",
        "id": "which-oil-where",
        "blocks": [
          {
            "type": "p",
            "text": "Use the plainer oil where it will be masked and the one you would happily taste on bread where it will be tasted. A mild everyday oil does honest work in the blend. The extra virgin goes on last, off the blade."
          },
          {
            "type": "table",
            "head": [
              "Where",
              "Doing what",
              "Which bottle",
              "How much"
            ],
            "rows": [
              [
                "In the blend",
                "Softening the paste",
                "A mild everyday oil",
                "30 ml"
              ],
              [
                "Poured on the bowl",
                "The flavour you taste",
                "The best bottle you have",
                "15 ml a portion"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForHummusInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          },
          {
            "type": "p",
            "text": "A long, fast blend can sharpen an extra virgin's bitterness, another reason the good oil goes on by hand. Both sizes are on the [products page](/products)."
          }
        ]
      },
      {
        "heading": "Quantities for a standard batch",
        "id": "quantities",
        "blocks": [
          {
            "type": "p",
            "text": "A household batch starts from 250 g of dried chickpeas soaked overnight, which cook down to roughly 600 g; two and a half drained 400 g tins land in the same place. Everything below scales off that weight and makes six generous portions."
          },
          {
            "type": "table",
            "head": [
              "Ingredient",
              "One batch",
              "Note"
            ],
            "rows": [
              [
                "Dried chickpeas",
                "250 g, soaked overnight",
                "Or two tins"
              ],
              [
                "Tahini",
                "150 g",
                "Well stirred"
              ],
              [
                "Lemon juice",
                "60 ml",
                "Two lemons"
              ],
              [
                "Garlic",
                "One clove",
                "Sharpens overnight"
              ],
              [
                "Salt",
                "1 tsp, then to taste",
                "Before lemon"
              ],
              [
                "Iced water",
                "60 to 100 ml",
                "Added slowly"
              ],
              [
                "Olive oil, in the blend",
                "30 ml",
                "Everyday bottle"
              ],
              [
                "Olive oil, on the bowl",
                "15 ml a portion",
                "Extra virgin"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForHummusInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      },
      {
        "heading": "Tahini and lemon set the balance",
        "id": "tahini-and-lemon",
        "blocks": [
          {
            "type": "p",
            "text": "Oil cannot rescue a badly balanced bowl. Tahini brings weight and a faint bitterness, lemon cuts it, salt makes both legible. Get those three right while the machine is running, because once the dip is smooth the only things left are temperature and the pour."
          },
          {
            "type": "ul",
            "items": [
              "**Thick and bitter:** more lemon, 15 ml at a time.",
              "**Sharp and thin:** more tahini, then a pinch of salt.",
              "**Flat:** salt first, not lemon. Under-salted hummus reads sour.",
              "**Stiff:** iced water by the spoon. Oil loosens it heavily."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForHummusInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      },
      {
        "heading": "Why fridge-cold hummus tastes of nothing",
        "id": "temperature",
        "blocks": [
          {
            "type": "p",
            "text": "Straight from the fridge, hummus is stiff and mute, and cold oil poured onto a cold surface sits in a sluggish film instead of spreading. Take the bowl out twenty to thirty minutes before anyone eats; in an air-conditioned kitchen, give it thirty."
          },
          {
            "type": "p",
            "text": "Never warm the oil to speed that up; heat strips an extra virgin of the aroma you paid for, as [olive oil for bread and dipping](/blog/olive-oil-for-bread-and-dipping) sets out."
          },
          {
            "type": "image",
            "src": "pressOliveOilForHummusInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          }
        ]
      },
      {
        "heading": "Serving it so the oil pools rather than soaks",
        "id": "serving",
        "blocks": [
          {
            "type": "p",
            "text": "A pool of green oil in the middle of a smooth surface is not decoration. It is how the oil reaches the mouth in a quantity you can taste. Spread the dip flat in a deep bowl and the pour vanishes within a minute."
          },
          {
            "type": "ol",
            "items": [
              "Use a wide, shallow dish; depth swallows the pour.",
              "Smooth the top with the back of a spoon. Peaks drink oil.",
              "Turn a slow spiral from the centre outward, leaving a channel.",
              "Pour into the channel, a tablespoon a portion, and stop.",
              "Do not stir it in. Scatter chickpeas or za'atar around the pool.",
              "Leave the bottle out for the second pour."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForHummusInline",
            "alt": "Rows of olive trees in the last light of the afternoon"
          },
          {
            "type": "p",
            "text": "An infused oil works here too, one flavour at a time: wild thyme or blackseed, poured at the table. More in [Palestinian olive oil](/blog/palestinian-olive-oil-what-makes-it-different)."
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Thirty millilitres of the everyday oil in the blend, a tablespoon of the good one on top, and the bowl out of the fridge half an hour early."
        }
      ]
    },
    "faqs": [
      {
        "q": "Should olive oil go inside hummus or only on top?",
        "a": "Both, in different amounts. About 30 ml goes into the blend for texture, where tahini and lemon mask it. The pour on top is what anyone actually tastes, so use the better bottle there."
      },
      {
        "q": "How much olive oil goes into a batch of hummus?",
        "a": "For a batch built on 250 g of dried chickpeas, about 30 ml inside the blend and roughly 15 ml poured over each portion at the table. Across a platter the pour is the larger share."
      },
      {
        "q": "Which olive oil is best for hummus?",
        "a": "An extra virgin with a green, peppery character for the pour, because it is tasted almost neat. A milder everyday oil is enough for the blend, where tahini and lemon cover it."
      },
      {
        "q": "Why does the olive oil sink into my hummus?",
        "a": "Either the surface is rough or the dish is too deep. Smooth the top with the back of a spoon, turn a shallow spiral into it, and pour into that channel."
      },
      {
        "q": "Should hummus be served cold or at room temperature?",
        "a": "At room temperature. Straight from the fridge it is stiff and its flavour is muted, and cold oil spreads badly on a cold surface. Twenty to thirty minutes out is usually enough."
      },
      {
        "q": "Can I use an infused olive oil on hummus?",
        "a": "Yes, and it is one of the easiest places to use one. Wild thyme or blackseed sit naturally on hummus. Use a single flavour, poured at the table rather than blended in."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused oils."
      },
      {
        "label": "Olive oil for bread and dipping",
        "path": "blog/olive-oil-for-bread-and-dipping",
        "description": "Why an oil served without heat shows its real character, and what to pair with it."
      },
      {
        "label": "Palestinian olive oil: what makes it different",
        "path": "blog/palestinian-olive-oil-what-makes-it-different",
        "description": "The groves, the harvest and the press behind the bottle you pour on the bowl."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 5 ---------------- */
  {
    "id": "olive-oil-vs-avocado-oil",
    "slug": "olive-oil-vs-avocado-oil",
    "seoTitle": "Olive Oil vs Avocado Oil: Which to Cook With",
    "metaTitle": "Olive Oil vs Avocado Oil: Which to Cook With",
    "metaDescription": "Olive oil vs avocado oil compared as cooking fats: flavour, heat, price per litre in Malaysia, and a use-this-for-that table for everyday dishes.",
    "focusKeyword": "olive oil vs avocado oil",
    "relatedKeywords": [
      "avocado oil vs olive oil",
      "avocado oil smoke point",
      "olive oil or avocado oil for frying",
      "best oil for high heat cooking",
      "neutral cooking oil Malaysia",
      "avocado oil Malaysia",
      "extra virgin olive oil flavour",
      "which oil for salad dressing",
      "cooking oil comparison",
      "olive oil price per litre Malaysia"
    ],
    "category": "Buying guide",
    "tags": [
      "comparison",
      "buying guide",
      "cooking",
      "extra virgin"
    ],
    "h1": "Olive Oil vs Avocado Oil: Which One Does Your Kitchen Need?",
    "excerpt": "Two premium bottles, two different jobs. A cook's comparison of olive oil and avocado oil on flavour, heat, texture and cost per litre in Malaysia.",
    "keyTakeaway": "Compare these two as cooking fats, not as health products. Refined avocado oil is near-neutral and its smoke point is the higher of the two, above the 190 to 210 °C published for extra virgin olive oil. Buy avocado where the oil should vanish, olive where the oil is the flavour.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilVsAvocadoOilHero",
      "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
    },
    "ogImage": "/og/blog-olive-oil-vs-avocado-oil.jpg",
    "intro": [
      "Avocado oil reached Malaysian shelves with a high-heat reputation and a price to match, and shoppers now stand between two expensive bottles trying to work out which one is doing the work.",
      "Held against each other as cooking fats — flavour, heat, texture, cost per litre — they are less rivals than two different tools. One is bought to be tasted. The other is bought to disappear."
    ],
    "sections": [
      {
        "heading": "What actually separates the two oils",
        "id": "what-separates-them",
        "blocks": [
          {
            "type": "p",
            "text": "Both are pressed from fruit rather than seed, and both stay liquid at Malaysian room temperature. What matters is what each is for. Extra virgin olive oil carries a flavour you are meant to notice; most avocado oil sold here is refined and near-neutral, chosen because it adds nothing."
          },
          {
            "type": "ul",
            "items": [
              "**Olive oil:** pressed from whole olives, sold here as extra virgin, tasted in the dish.",
              "**Avocado oil:** pressed from avocado flesh, usually refined, close to flavourless.",
              "**Both:** pourable all year here, unlike coconut oil in a cool kitchen."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsAvocadoOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          }
        ]
      },
      {
        "heading": "Flavour: peppery and grassy against buttery and neutral",
        "id": "flavour",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin olive oil tastes of something specific: cut grass, green tomato leaf, bitterness at the back of the tongue and a peppery catch in the throat. Refined avocado oil tastes of very little, a faint buttery weight at most. Neither is a fault; each is the point of that oil."
          },
          {
            "type": "p",
            "text": "So the test is short. If the finished plate should taste of the oil, olive earns its price. If the oil should vanish, neutral wins."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsAvocadoOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          }
        ]
      },
      {
        "heading": "Heat, honestly: avocado oil's smoke point is the higher one",
        "id": "heat",
        "blocks": [
          {
            "type": "p",
            "text": "Refined avocado oil smokes at a higher temperature than extra virgin olive oil, and no seller should pretend otherwise. Published figures put extra virgin olive oil at 190 to 210 °C, and refined avocado oil sits above that band. For a pan taken to a hard sear, the gap is real."
          },
          {
            "type": "p",
            "text": "It matters less than the numbers suggest, because most cooking never nears either ceiling. Tumis and shallow frying run below both. What moves the figure is set out in [olive oil smoke point](/blog/olive-oil-smoke-point-what-heat-it-can-take)."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsAvocadoOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          }
        ]
      },
      {
        "heading": "Use this for that",
        "id": "use-this-for-that",
        "blocks": [
          {
            "type": "p",
            "text": "Stop asking which oil is better and ask what the dish needs. Where the oil is tasted, olive answers. Where it has to be invisible, or held very hot, avocado answers. Most kitchens keep both and use each on a different night."
          },
          {
            "type": "table",
            "head": [
              "The dish",
              "Reach for",
              "Why"
            ],
            "rows": [
              [
                "Salad dressing, finishing drizzle",
                "Extra virgin olive oil",
                "The oil is the flavour"
              ],
              [
                "Bread dipping, hummus",
                "Extra virgin olive oil",
                "Nothing cooked, character shows"
              ],
              [
                "Tumis, sautéing, gentle roasting",
                "Either; olive if you want taste",
                "Both sit above these temperatures"
              ],
              [
                "A hard sear in cast iron",
                "Avocado oil",
                "Higher smoke point counts here"
              ],
              [
                "Mayonnaise and other raw emulsions",
                "Avocado oil",
                "Flavour would be in the way"
              ],
              [
                "Pasta finished with oil",
                "Extra virgin olive oil",
                "A flat oil, a flat plate"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsAvocadoOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          }
        ]
      },
      {
        "heading": "Price per litre, and what is on the shelf in Malaysia",
        "id": "price-and-availability",
        "blocks": [
          {
            "type": "p",
            "text": "Both cost several times what palm cooking oil does, and the ranking between them moves with brand, grade and bottle size. Compare per litre rather than per bottle, since the bottles rarely match. Avocado oil is a narrow import here; olive oil is stocked far more widely."
          },
          {
            "type": "p",
            "text": "Arabian Village comes in 250 ml and 500 ml, with the current price for each on the [products page](/products) and the larger bottle cheaper per litre. In Malaysia it is sold only through Berkat Madinah Store and that seller's own Shopee and TikTok Shop counters — see [where to buy](/shop)."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsAvocadoOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          }
        ]
      },
      {
        "heading": "Two bottles, one kitchen",
        "id": "two-bottles-one-kitchen",
        "blocks": [
          {
            "type": "p",
            "text": "Keeping both is a sensible outcome rather than a failure to decide. A small bottle of extra virgin olive oil for everything served cold or finished with the oil showing, plus a neutral oil for the pan that runs hardest, covers almost every dish."
          },
          {
            "type": "p",
            "text": "If your real question is which is better for you, that is one for a doctor or a registered dietitian, not for anyone selling oil. This page compares behaviour in a pan and nothing more."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsAvocadoOilInline",
            "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Reach for avocado oil when the oil should be invisible or the pan is at its hottest. Reach for extra virgin olive oil when the oil is part of the flavour. Its smoke point is the lower of the two, and most home cooking reaches neither."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is avocado oil or olive oil better for high heat?",
        "a": "Avocado oil, on smoke point alone. Refined avocado oil holds a higher temperature than extra virgin olive oil, which published figures put at 190 to 210 °C. Most home cooking stays well below both."
      },
      {
        "q": "Can I use olive oil instead of avocado oil?",
        "a": "In anything cooked short of a hard sear, yes. Expect the dish to taste of olive oil, which is the whole point in a dressing or a pasta and a distraction in mayonnaise."
      },
      {
        "q": "Does avocado oil taste like avocado?",
        "a": "Refined avocado oil barely tastes of anything, a faint buttery weight at most. Unrefined versions keep more of the fruit, but the bottles sold widely in Malaysia are the refined, near-neutral kind."
      },
      {
        "q": "Which one is more expensive in Malaysia?",
        "a": "It depends on brand, grade and size, so compare per litre rather than per bottle. Avocado oil is the narrower import and turns up in fewer shops; olive oil is stocked far more widely."
      },
      {
        "q": "Is avocado oil healthier than olive oil?",
        "a": "That is a question for a doctor or a registered dietitian, not for a seller. This page compares the two as cooking fats only: flavour, heat behaviour, texture and cost per litre."
      },
      {
        "q": "Which oil should I use for salad dressing?",
        "a": "Extra virgin olive oil, unless you want the dressing to taste only of the vinegar and the mustard. Avocado oil is the choice when the other ingredients are meant to carry it alone."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, with the current price for each size."
      },
      {
        "label": "Olive oil smoke point: what heat it can take",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "The published range for extra virgin olive oil, and what moves it more than the grade does."
      },
      {
        "label": "Olive oil vs coconut oil in a Malaysian kitchen",
        "path": "blog/olive-oil-vs-coconut-oil-in-a-malaysian-kitchen",
        "description": "The other comparison Malaysian cooks ask about, taken the same way: flavour, heat and use."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "olive-oil-focaccia",
    "slug": "olive-oil-focaccia-recipe",
    "seoTitle": "Olive Oil Focaccia: Dough, Dimples and the Oven",
    "metaTitle": "Olive Oil Focaccia: Dough, Dimples and the Oven",
    "metaDescription": "How the oil goes into the dough, why dimpling holds a pool of it, toppings, oven temperature, and the finishing pour straight from the oven.",
    "focusKeyword": "olive oil focaccia",
    "relatedKeywords": [
      "olive oil focaccia recipe",
      "focaccia dimples",
      "focaccia dough ratio",
      "olive oil bread recipe",
      "rosemary focaccia",
      "focaccia oven temperature",
      "how to make focaccia",
      "focaccia topping ideas",
      "wet dough bread",
      "extra virgin olive oil for baking"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "focaccia",
      "baking",
      "bread",
      "extra virgin"
    ],
    "h1": "Olive Oil Focaccia: Folding the Dough, Dimpling the Top, Pouring at the End",
    "excerpt": "Focaccia is not bread you dip afterwards. The oil is folded into the dough itself, pooled again by dimpling, and poured a third time the moment it leaves the oven.",
    "keyTakeaway": "Fold oil into a wet dough, let it rise, then press deep dimples across the surface once it is in the tray. Top with rosemary, flaky salt and olives pressed into those dimples, bake hot at 220-230°C, and finish with a last pour straight from the oven.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilFocacciaHero",
      "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
    },
    "ogImage": "/og/blog-olive-oil-focaccia.jpg",
    "intro": [
      "Focaccia is a wet, olive-oil-heavy dough, not bread you slice and dip afterwards. The oil folds into the dough before the first rise, pools again once the dough is dimpled, and goes on once more straight from the oven — three separate pours, not one saucer beside it.",
      "Get the dough wet enough and the dimples deep enough, and the rest follows."
    ],
    "sections": [
      {
        "heading": "Why the oil goes into the dough, not onto it",
        "id": "oil-in-the-dough",
        "blocks": [
          {
            "type": "p",
            "text": "Focaccia dough is far wetter than a sandwich loaf, closer to a thick batter than a ball you can knead by hand. Olive oil goes in with the water, not brushed on after, because a dough this loose needs the fat working through the gluten from the start to keep the crumb open rather than dense."
          },
          {
            "type": "p",
            "text": "Two to three tablespoons folded in is normal; more goes on top later. The same oil coats the bowl for the first rise, so the dough pulls away clean rather than tearing when it goes into the tray."
          },
          {
            "type": "image",
            "src": "pressOliveOilFocacciaInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "Ingredients for one tray",
        "id": "ingredients-for-one-tray",
        "blocks": [
          {
            "type": "p",
            "text": "A standard tray needs flour, water, yeast, salt and olive oil in roughly this ratio, with the water kept slack enough to pour rather than knead. Extra virgin olive oil appears three times in the method — folded into the dough, then poured on twice more."
          },
          {
            "type": "table",
            "head": [
              "Ingredient",
              "Amount",
              "Note"
            ],
            "rows": [
              [
                "Bread flour",
                "500 g",
                "Holds a wet dough together"
              ],
              [
                "Water",
                "375-400 ml",
                "About 75-80% of flour weight"
              ],
              [
                "Instant yeast",
                "7 g",
                "One sachet"
              ],
              [
                "Salt",
                "10 g",
                "Added after the first minute"
              ],
              [
                "Extra virgin olive oil, folded in",
                "3 tbsp",
                "Part of the dough itself"
              ],
              [
                "Extra virgin olive oil, tray and pour",
                "4-5 tbsp",
                "Split: tray, pre-bake, after baking"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilFocacciaInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "The dimpling step, and the pool it holds",
        "id": "the-dimpling-step",
        "blocks": [
          {
            "type": "p",
            "text": "Dimpling means pressing all ten fingertips into the risen dough until they nearly reach the tray, spaced a few centimetres apart across the whole surface. It is not decoration: each dent breaks the surface tension so the dough bakes flat instead of ballooning into one blister, and it opens a well that holds the oil poured over it."
          },
          {
            "type": "p",
            "text": "Oiled fingers press hard enough to feel the tray underneath, and the dimples go in right before baking. Oil poured afterward collects in those wells and fries the crust there, while the ridges brown dry — the whole point of dimpling."
          },
          {
            "type": "image",
            "src": "pressOliveOilFocacciaInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "Toppings that sit in the dimples",
        "id": "toppings",
        "blocks": [
          {
            "type": "p",
            "text": "Rosemary, flaky salt and whole or halved olives are the classic toppings, added right after the pre-bake oil pour so they settle into the wells rather than balancing on top, where they would scorch before the crust colours. Rosemary goes on as whole sprigs; salt stays light since the oil already carries flavour."
          },
          {
            "type": "ul",
            "items": [
              "**Rosemary.** Whole sprigs pressed down so the leaves touch the dough.",
              "**Flaky salt.** A light, even scatter after the oil, not folded in.",
              "**Olives.** Whole or halved, pressed into the dimples so they don't roll off."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilFocacciaInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "Oven temperature and the bake",
        "id": "oven-temperature-and-bake",
        "blocks": [
          {
            "type": "p",
            "text": "Focaccia wants a hot oven, around 220-230°C, hot enough that the crust sets and colours before the wet crumb inside dries out. A standard tray takes roughly 20-25 minutes, and it is ready when the top is deep gold and the sides pull slightly from the tray."
          },
          {
            "type": "ol",
            "items": [
              "Mix flour, yeast, water and the folded-in oil to a wet dough; add salt after the first minute.",
              "Cover and rise until doubled, about 1-1.5 hours.",
              "Pour oil into the tray, turn the dough onto it, and stretch gently to the edges.",
              "Rest 20-30 minutes, then dimple firmly with oiled fingers.",
              "Top with rosemary, salt and olives, pressed into the dimples.",
              "Bake at 220-230°C for 20-25 minutes, until deep gold."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilFocacciaInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      },
      {
        "heading": "The finishing pour, straight from the oven",
        "id": "the-finishing-pour",
        "blocks": [
          {
            "type": "p",
            "text": "A last spoon or two of oil goes over the focaccia the moment it leaves the oven, while the crust is still hot enough to drink it in rather than let it sit on top. This pour is separate from the one before baking, and it is what leaves the crust glistening and the crumb underneath soft."
          },
          {
            "type": "p",
            "text": "Cut it warm rather than fully cooled. Oil left pooled in the tray is worth mopping up the way you would treat [a saucer of oil beside any other bread](/blog/olive-oil-for-bread-and-dipping) — a dip for the crust, not a dressing."
          },
          {
            "type": "image",
            "src": "pressOliveOilFocacciaInline",
            "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Oil goes into the dough, into the tray, and over the top: folded in before the rise, poured before dimpling, poured again straight from the oven. The dimples exist to hold that second pour exactly where it lands."
        }
      ]
    },
    "faqs": [
      {
        "q": "How much olive oil goes into focaccia dough?",
        "a": "About two to three tablespoons folded into the dough for one tray, plus four to five tablespoons split between the tray, the pre-bake pour and the finishing pour after baking."
      },
      {
        "q": "Why do you dimple focaccia dough?",
        "a": "Dimpling breaks the surface tension so the dough bakes flat instead of ballooning, and it opens wells that hold the topping oil in place rather than letting it run off the tray."
      },
      {
        "q": "What temperature do you bake focaccia at?",
        "a": "Around 220-230°C, hot enough to set and colour the crust before the wet crumb inside dries out. A standard tray takes roughly 20-25 minutes, ready once the top turns deep gold."
      },
      {
        "q": "Can I use infused olive oil on focaccia?",
        "a": "Yes, folded in or poured on top after baking. Rosemary and basil, or wild thyme, both suit a rosemary-and-salt focaccia, while the classic oil suits a plainer, olive-only version best."
      },
      {
        "q": "What toppings work best on focaccia?",
        "a": "Rosemary sprigs, flaky salt and whole or halved olives, pressed into the dimples right after the pre-bake oil pour so they sit partly submerged rather than scorching on the crust."
      },
      {
        "q": "Why pour oil on focaccia straight from the oven?",
        "a": "The hot crust absorbs it instead of letting it sit on the surface, which leaves the top glistening and keeps the crumb underneath soft. It is a separate pour from the one before baking."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours and the price for each size."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Where extra virgin fits alongside a wok and a deep fryer, and when to reach for it instead."
      },
      {
        "label": "Olive oil for bread and dipping",
        "path": "blog/olive-oil-for-bread-and-dipping",
        "description": "The saucer itself: bread that already exists, with za'atar, dukkah and balsamic as three directions."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "olive-oil-for-steak",
    "slug": "olive-oil-for-steak",
    "seoTitle": "Olive Oil for Steak: The Two-Oil Pan-Sear Method",
    "metaTitle": "Olive Oil for Steak: The Two-Oil Pan-Sear Method",
    "metaDescription": "Why extra virgin can't take a hard sear, the two-oil trick that fixes it, resting the meat, and a simple pepper-and-oil finish for a stovetop steak.",
    "focusKeyword": "olive oil for steak",
    "relatedKeywords": [
      "olive oil for searing steak",
      "two-oil steak method",
      "what oil to sear steak in",
      "extra virgin olive oil steak finish",
      "pan-seared steak oil",
      "olive oil smoke point steak",
      "resting a steak before cutting",
      "neutral oil for searing",
      "basting steak with olive oil",
      "pepper and olive oil steak finish"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "steak",
      "searing",
      "smoke point",
      "extra virgin"
    ],
    "h1": "Olive Oil for Steak: A Stovetop, Two-Oil Method",
    "excerpt": "A hard sear wants more heat than extra virgin comfortably gives. The fix is two oils doing two jobs: a neutral one for the pan, extra virgin saved for after.",
    "keyTakeaway": "Sear in a neutral oil with a high smoke point, not extra virgin, then bring the extra virgin back once the pan is off direct heat — basted on at the end or poured over the rested steak. Rest the meat five to ten minutes, then finish with cracked pepper in warm fat.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilForSteakHero",
      "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
    },
    "ogImage": "/og/blog-olive-oil-for-steak.jpg",
    "intro": [
      "A steak wants a screaming-hot pan for the first minute, and that is a temperature range extra virgin olive oil was never built for. Reach for a neutral oil to do the actual searing, and save the extra virgin for the part where flavour matters more than heat.",
      "Two oils, used for two different jobs, get the crust and the flavour both."
    ],
    "sections": [
      {
        "heading": "Why a hard sear asks more than extra virgin gives",
        "id": "why-extra-virgin-cant-carry-a-hard-sear",
        "blocks": [
          {
            "type": "p",
            "text": "A good crust wants a pan hot enough to sear the meat in under a minute a side, and extra virgin olive oil starts to smoke well before that heat. [Its smoke point](/blog/olive-oil-smoke-point-what-heat-it-can-take) sits lower than a hard sear needs, so the pan turns acrid before the meat browns properly."
          },
          {
            "type": "image",
            "src": "pressOliveOilForSteakInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      },
      {
        "heading": "The two-oil trick: a neutral sear, an extra virgin finish",
        "id": "the-two-oil-trick",
        "blocks": [
          {
            "type": "p",
            "text": "The trick is two bottles, not one. A neutral oil with a high smoke point carries the actual heat of the pan, and the extra virgin goes on afterward, poured over the resting steak or brushed on in the last seconds, where its flavour survives instead of burning off."
          },
          {
            "type": "table",
            "head": [
              "Oil",
              "Job",
              "When it goes in"
            ],
            "rows": [
              [
                "Neutral (canola, grapeseed, refined avocado)",
                "Carries the heat, builds the crust",
                "In the pan before the steak"
              ],
              [
                "Extra virgin olive oil",
                "Flavour and a soft finish",
                "Basted in the last minute, or poured after resting"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForSteakInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      },
      {
        "heading": "How to pan-sear a steak",
        "id": "how-to-pan-sear-a-steak",
        "blocks": [
          {
            "type": "p",
            "text": "Pat the steak dry, salt it well, and let it sit at room temperature for twenty to thirty minutes before it meets the pan. A dry, room-temperature surface is what actually browns a steak; a cold, wet one steams instead of searing and never gets a real crust."
          },
          {
            "type": "ol",
            "items": [
              "Pat the steak fully dry and season generously with salt fifteen minutes before it goes into the pan.",
              "Heat a heavy pan with the neutral oil until it just starts to shimmer, close to smoking.",
              "Lay the steak away from you and leave it alone for two to three minutes a side, turning once.",
              "In the last minute, add butter and a spoon of extra virgin, tilt the pan, and baste.",
              "Pull the steak a few degrees before the target and rest it, loosely tented, off the heat.",
              "Finish with the pepper-and-oil mixture just before the first cut."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForSteakInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      },
      {
        "heading": "Resting the meat before the knife",
        "id": "resting-the-meat",
        "blocks": [
          {
            "type": "p",
            "text": "A steak pulled straight off the pan loses most of its juice to the cutting board. Resting five to ten minutes, loosely covered, lets the meat relax and pull that liquid back through the fibres, so a rested steak carries the juice instead of the plate."
          },
          {
            "type": "image",
            "src": "pressOliveOilForSteakInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      },
      {
        "heading": "A simple pepper-and-oil finish",
        "id": "a-pepper-and-oil-finish",
        "blocks": [
          {
            "type": "p",
            "text": "Crack black pepper coarsely, warm it briefly in a spoon of the resting steak's own juices or a little extra virgin, and spoon it back over the meat. It is not a sauce, just cracked pepper carried by warm fat so it clings to the crust instead of falling off."
          },
          {
            "type": "ul",
            "items": [
              "**Coarse, not ground.** Cracked pepper sits on the crust; fine pepper dissolves and burns.",
              "**Flaky salt at the table.** The pan salt already did its job; this one is for crunch.",
              "**A drop more extra virgin.** Poured, not whisked in, this is a finish, not a dressing."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilForSteakInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      },
      {
        "heading": "This is the pan, not the grill",
        "id": "the-pan-not-the-grill",
        "blocks": [
          {
            "type": "p",
            "text": "Everything here is stovetop: a pan, two oils, and a kitchen hob. Charcoal and open flame change the heat, the smoke and the timing enough to be their own subject, covered in [olive oil for grilling and barbecue](/blog/olive-oil-for-grilling-and-barbecue) rather than repeated here."
          },
          {
            "type": "image",
            "src": "pressOliveOilForSteakInline",
            "alt": "An olive grove seen from above, rows of trees running to the horizon"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Sear in a neutral oil hot enough to brown fast, finish with extra virgin once the pan comes off the heat, rest the steak before it's cut, and carry cracked pepper over the top in a spoon of warm fat."
        }
      ]
    },
    "faqs": [
      {
        "q": "Why isn't extra virgin olive oil good for searing a steak?",
        "a": "Extra virgin has a comfortable smoke point that a hard sear pushes past within seconds, so the pan turns bitter and smoky before the crust forms. A neutral oil holds that heat cleanly; save the extra virgin for after the sear."
      },
      {
        "q": "What oil should I use to sear a steak?",
        "a": "A neutral oil with a high smoke point, canola, grapeseed or a refined avocado oil, does the actual searing. It carries the pan's heat without smoking or turning bitter, which is what a hard, fast crust needs."
      },
      {
        "q": "When do I add the extra virgin olive oil to a steak?",
        "a": "After the sear, not during it. Baste with a spoon of extra virgin in the last minute of cooking, or pour it over the steak once it comes off the pan and starts to rest."
      },
      {
        "q": "How long should a steak rest before cutting?",
        "a": "Five to ten minutes, loosely tented with foil, off the heat. A thicker cut wants the longer end of that range. Cutting straight off the pan lets most of the juice run onto the board instead of staying in the meat."
      },
      {
        "q": "Can I use olive oil for the whole steak, sear and all?",
        "a": "You can, but a hard sear will push it past a comfortable heat and the pan will smoke early. It works better split: a neutral oil for the sear, extra virgin added once the pan has cooled a little."
      },
      {
        "q": "What is the two-oil trick for steak?",
        "a": "Sear in a neutral oil that can take the heat, then finish with extra virgin once the meat is off the direct flame, basted on at the end or poured over the rested steak, where its flavour actually survives."
      },
      {
        "q": "Does this method work for the grill as well as a pan?",
        "a": "Not directly. Charcoal and open flame bring their own heat and smoke behaviour, covered separately in [olive oil for grilling and barbecue](/blog/olive-oil-for-grilling-and-barbecue). This article is stovetop only, a heavy pan on a kitchen hob."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, the fat to keep on hand for the finish and the baste."
      },
      {
        "label": "Olive oil smoke point: what heat it can take",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "The full smoke-point range for extra virgin and how it compares with other cooking oils."
      },
      {
        "label": "What an olive oil marinade actually does",
        "path": "blog/olive-oil-marinade-what-it-does",
        "description": "How the oil carries flavour into meat before it ever reaches the pan."
      },
      {
        "label": "Olive oil for grilling and barbecue",
        "path": "blog/olive-oil-for-grilling-and-barbecue",
        "description": "Charcoal and open flame, the sibling method for outside the kitchen."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "olive-oil-fried-egg",
    "slug": "olive-oil-fried-egg",
    "seoTitle": "Olive Oil Fried Egg: The Spanish Method",
    "metaTitle": "Olive Oil Fried Egg: The Spanish Method",
    "metaDescription": "How much olive oil a fried egg actually needs, pan heat, spooning it over the yolk, salt timing, and what changes between extra virgin and a milder oil.",
    "focusKeyword": "olive oil fried egg",
    "relatedKeywords": [
      "olive oil fried egg recipe",
      "spanish fried egg olive oil",
      "huevos fritos olive oil",
      "fried egg in olive oil vs butter",
      "how much olive oil to fry an egg",
      "crispy edge fried egg",
      "extra virgin olive oil for frying eggs",
      "spooning oil over egg yolk",
      "olive oil for eggs",
      "shallow fry egg in olive oil"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "eggs",
      "frying",
      "breakfast",
      "extra virgin"
    ],
    "h1": "Olive Oil Fried Egg: The Spanish Method for Crisp Edges and a Soft Yolk",
    "excerpt": "A Spanish-style fried egg wants a pool of hot olive oil, not a film, and a spoon working the yolk while the white blisters at the edge. The method is short, but the oil quantity is where most home cooks fall short.",
    "keyTakeaway": "Use two to three tablespoons of oil for one egg, hot enough to bubble the instant the egg lands, and spoon it over the yolk instead of flipping. Salt the white once it firms, not the yolk. Extra virgin adds its own pepper and grass; a milder oil stays out of the way.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilFriedEggHero",
      "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
    },
    "ogImage": "/og/blog-olive-oil-fried-egg.jpg",
    "intro": [
      "A fried egg made in olive oil is not the same food as one made in butter or a splash of neutral oil. The white blisters and crisps at the edge, the yolk stays loose under a set surface, and the pan smells of the oil itself.",
      "Most of that comes down to one thing people underdo at home: the amount of oil in the pan."
    ],
    "sections": [
      {
        "heading": "Why olive oil changes a fried egg",
        "id": "why-olive-oil-changes-it",
        "blocks": [
          {
            "type": "p",
            "text": "Butter shallow-fries an egg gently and browns as it goes; a neutral oil stays silent and does very little. Olive oil sits between the two — hot enough to blister the white properly, with a flavour of its own that a neutral oil never brings to the plate."
          },
          {
            "type": "p",
            "text": "It is a shallow-fry, and the oil is doing real work, not just keeping the egg from sticking."
          },
          {
            "type": "image",
            "src": "pressOliveOilFriedEggInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "How much oil: a shallow pool, not a film",
        "id": "how-much-oil",
        "blocks": [
          {
            "type": "p",
            "text": "One egg wants two to three tablespoons of oil — enough that it pools around the white and rises partway up its edge, not a thin coating wiped across the pan. That is more than most home cooks pour, and it is the single biggest reason a homemade version falls flat."
          },
          {
            "type": "p",
            "text": "A wider pan needs more oil to keep the same depth — judge by the pool, not the tablespoon."
          },
          {
            "type": "image",
            "src": "pressOliveOilFriedEggInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "Pan heat, then spooning oil over the yolk",
        "id": "heat-and-basting",
        "blocks": [
          {
            "type": "p",
            "text": "The oil should shimmer and move like water before the egg goes in, and the white should bubble hard the moment it lands. A quiet pan gives a pale, rubbery edge instead of a crisp, lacy one — the step that separates a fried egg from a poached one."
          },
          {
            "type": "p",
            "text": "Once the white is bubbling, tilt the pan and spoon the pooled oil over the yolk five or six times. This sets a thin skin on the yolk without cooking it through, so the egg never has to be flipped."
          },
          {
            "type": "image",
            "src": "pressOliveOilFriedEggInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "Salt timing",
        "id": "salt-timing",
        "blocks": [
          {
            "type": "p",
            "text": "Salt the white once it has firmed at the edges, while it is still in the pan and can take the seasoning evenly. Leave the yolk unsalted until the egg is plated — salt sitting on a still-liquid yolk can toughen its surface before it ever reaches the table."
          },
          {
            "type": "image",
            "src": "pressOliveOilFriedEggInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "Extra virgin against a milder oil",
        "id": "extra-virgin-vs-milder",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin carries its own pepper and grass into the egg, noticeable in the last of the pooled oil mopped up with bread. A milder, lighter oil fries cleaner, letting the egg taste mostly of itself and the salt."
          },
          {
            "type": "ul",
            "items": [
              "**Extra virgin.** A visible flavour on the plate — good with plain bread or vegetables that can carry it.",
              "**A milder oil.** Quiet and neutral, useful when the egg sits beside something already strongly flavoured.",
              "**Either way**, keep the [six infused flavours](/products) for other dishes; their own character would compete with the yolk rather than sit under it."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilFriedEggInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      },
      {
        "heading": "The method, step by step",
        "id": "the-method",
        "blocks": [
          {
            "type": "p",
            "text": "Once the pan holds enough oil and it is hot enough, the frying itself takes under two minutes from the moment the egg goes in. This order keeps the white crisp at the edge and the yolk loose in the middle, without a flip."
          },
          {
            "type": "ol",
            "items": [
              "Warm two to three tablespoons of oil over medium-high heat until it shimmers and moves freely.",
              "Crack the egg into a cup first, then slide it into the oil close to the surface.",
              "Let the white hit the oil hard — it should bubble and blister at the edges within seconds.",
              "Salt the white once its edges have firmed.",
              "Tilt the pan and spoon the pooled oil over the yolk five or six times.",
              "Lift the egg out with a slotted spoon the moment the edges turn deep gold and lacy.",
              "Drain briefly on the pan's edge and plate at once, while the yolk is still loose."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilFriedEggInline",
            "alt": "Green and purple olives moving down a stainless chute towards the press"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "More oil than you think, hot enough to bubble on contact, spooned over the yolk instead of flipped, and salted on the white only. Extra virgin brings its own flavour; a milder oil stays quiet."
        }
      ]
    },
    "faqs": [
      {
        "q": "How much olive oil do I need to fry one egg?",
        "a": "More than a normal fried egg gets: two to three tablespoons, enough that the oil pools around the white and rises up its edge instead of lying flat as a thin film underneath it."
      },
      {
        "q": "What pan temperature is right for an olive oil fried egg?",
        "a": "Medium-high, with the oil shimmering before the egg goes in. It should bubble hard around the white the instant it lands — a quiet pan gives a pale edge rather than a crisp one."
      },
      {
        "q": "Why do you spoon oil over the yolk instead of flipping the egg?",
        "a": "Spooning hot oil over the top sets the yolk's surface gently while the underside keeps frying, so the centre stays loose. Flipping cooks the yolk through to its middle instead."
      },
      {
        "q": "When should I salt an olive oil fried egg?",
        "a": "Salt the white once it has firmed at the edges, still in the pan. Leave the yolk unsalted until the egg is plated, since salt on a still-liquid yolk can toughen its surface."
      },
      {
        "q": "Does extra virgin olive oil taste different from a milder oil when frying an egg?",
        "a": "Yes. Extra virgin carries its own pepper and grass into the dish, which some cooks want and others find too assertive for breakfast. A milder oil fries cleaner and lets the egg taste of itself."
      },
      {
        "q": "Can I reuse the oil after frying an egg in it?",
        "a": "Strain it to remove any white or shell first. As general guidance, a shallow-fry oil like this is good for two or three uses with filtering, then it should be retired."
      },
      {
        "q": "Is an olive oil fried egg the same as a Spanish-style fried egg?",
        "a": "Very close. Spain's huevos fritos use the same deep pool and basting, though some cooks push the edges further, to a deeper brown and proper crackle than most home versions reach."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours and the price for each size."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "The wider cooking guide: tumis, roasting, dressing and where olive oil fits against the oils already in a Malaysian pantry."
      },
      {
        "label": "Olive oil for bread and dipping",
        "path": "blog/olive-oil-for-bread-and-dipping",
        "description": "The saucer version of the same oil, with za'atar, dukkah and balsamic as three separate directions."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "olive-oil-popcorn",
    "slug": "olive-oil-popcorn",
    "seoTitle": "Olive Oil Popcorn: Stovetop Method",
    "metaTitle": "Olive Oil Popcorn: Stovetop Method",
    "metaDescription": "How much oil per batch, why the lid and the shake matter, the right heat, when to salt, and what extra virgin actually adds over a neutral oil.",
    "focusKeyword": "olive oil popcorn",
    "relatedKeywords": [
      "olive oil popcorn recipe",
      "stovetop popcorn oil",
      "popcorn without a microwave bag",
      "extra virgin olive oil popcorn",
      "best oil for popcorn",
      "how to pop corn on the stove",
      "salt popcorn timing",
      "olive oil vs neutral oil popcorn",
      "homemade stovetop popcorn method",
      "popcorn kernels and oil ratio"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "popcorn",
      "stovetop",
      "extra virgin",
      "snacks"
    ],
    "h1": "Olive Oil Popcorn: How to Pop Corn in Olive Oil on the Stovetop",
    "excerpt": "A microwave bag steams half its kernels and scorches the rest. A pot, a lid and a few tablespoons of olive oil pop it more evenly and taste of something before the salt goes anywhere near it.",
    "keyTakeaway": "Three tablespoons of oil for half a cup of kernels in a wide, lidded pot on medium heat, shaken every ten to fifteen seconds, off the heat and salted the moment popping slows. Extra virgin over a neutral oil is a flavour choice, not a health one, and holds up through the heat popcorn needs.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilPopcornHero",
      "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
    },
    "ogImage": "/og/blog-olive-oil-popcorn.jpg",
    "intro": [
      "A microwave bag steams as much popcorn as it pops, and the kernels nearest the edge of the bag scorch before the ones in the middle finish. A wide pot on the stovetop heats far more evenly, and swapping in olive oil for a flavourless one means the popcorn tastes of something before salt or butter arrive.",
      "The method is short — oil, a lid and a shake — and most of what goes wrong traces back to one of those three."
    ],
    "sections": [
      {
        "heading": "Why the stovetop beats a bag or a neutral oil",
        "id": "why-stovetop",
        "blocks": [
          {
            "type": "p",
            "text": "A microwave bag pops unevenly, scorching kernels near the edge while the ones in the middle barely finish, because steam does the heating instead of a hot surface. A pot on the stovetop heats far more evenly, and swapping in olive oil for a neutral one means the popcorn already tastes of something before salt or butter arrive."
          },
          {
            "type": "p",
            "text": "A neutral oil does the same job with no flavour of its own. Olive oil is the same fat, just one that tastes like something, so less salt and butter is needed after."
          },
          {
            "type": "image",
            "src": "pressOliveOilPopcornInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      },
      {
        "heading": "How much oil, and how many kernels",
        "id": "oil-quantity",
        "blocks": [
          {
            "type": "p",
            "text": "About three tablespoons of oil for half a cup of kernels is the working ratio, enough to coat the base of the pot and coat every kernel before the first one pops, not a shallow film. Scale the oil and the kernels together, never the kernels alone, or the driest ones near the top will burn."
          },
          {
            "type": "table",
            "head": [
              "Kernels",
              "Oil",
              "Pot"
            ],
            "rows": [
              [
                "1/4 cup",
                "1.5–2 Tbsp",
                "2-litre, lidded"
              ],
              [
                "1/2 cup",
                "3 Tbsp",
                "4–5 litre, lidded"
              ],
              [
                "3/4 cup",
                "4–4.5 Tbsp",
                "6-litre, lidded"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilPopcornInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      },
      {
        "heading": "Heat, the lid, and the shake",
        "id": "heat-lid-shake",
        "blocks": [
          {
            "type": "p",
            "text": "Medium heat, held steady, is right: brisk enough to pop a full batch in a few minutes, well short of where the oil itself would start to smoke. See [olive oil smoke point](/blog/olive-oil-smoke-point-what-heat-it-can-take) for the range this oil comfortably handles before that happens."
          },
          {
            "type": "p",
            "text": "The lid holds the heat in so kernels at the rim pop instead of just warming, and stops oil and popped corn flying off the stove as popping speeds up. Sliding the pot every ten to fifteen seconds keeps kernels moving off the hottest patch of metal so none of them scorch."
          },
          {
            "type": "image",
            "src": "pressOliveOilPopcornInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      },
      {
        "heading": "The stovetop method",
        "id": "method",
        "blocks": [
          {
            "type": "p",
            "text": "Popping corn in olive oil on the stovetop is warming oil with a few test kernels until they pop, adding the rest off the heat, then covering and shaking over medium heat until the popping slows to a gap of a few seconds between pops, at which point it comes off the stove."
          },
          {
            "type": "ol",
            "items": [
              "Warm the oil over medium heat with three or four test kernels in, lid on.",
              "When the test kernels pop, add the rest off the heat, then swirl to coat them.",
              "Cover, return to medium, and slide the pot every ten to fifteen seconds.",
              "Once popping turns frequent, crack the lid slightly to vent steam.",
              "Pull the pot off the heat once pops space out to a few seconds apart.",
              "Tip into a wide bowl at once and salt while it is still hot."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilPopcornInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      },
      {
        "heading": "Salting timing — off the heat, not on it",
        "id": "salting-timing",
        "blocks": [
          {
            "type": "p",
            "text": "Salt goes on off the heat, the moment the popcorn lands in the bowl, while the oil on each piece is still warm enough to hold it. Salted into the hot pot it can scorch before the popcorn finishes; salted once everything has cooled, it slides straight off instead of sticking."
          },
          {
            "type": "image",
            "src": "pressOliveOilPopcornInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      },
      {
        "heading": "What extra virgin actually adds here",
        "id": "what-extra-virgin-adds",
        "blocks": [
          {
            "type": "p",
            "text": "The case for extra virgin here is what it tastes like, not what it is made of. A neutral oil is a blank carrier; extra virgin brings a fruity, sometimes peppery edge that comes through in every piece once it has carried the heat that popped the corn."
          },
          {
            "type": "p",
            "text": "A milder olive oil pops the same way with a quieter flavour, which is a preference rather than a rule. Either way this is a question about taste, not a health claim this site makes."
          },
          {
            "type": "image",
            "src": "pressOliveOilPopcornInline",
            "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Three tablespoons of oil to half a cup of kernels, lid on, shaken every ten to fifteen seconds over medium heat, off the heat and salted the moment the popping slows. Extra virgin earns its place here on flavour, in a pot most kitchens already own."
        }
      ]
    },
    "faqs": [
      {
        "q": "How much olive oil do I need for a batch of popcorn?",
        "a": "About three tablespoons of oil for half a cup of kernels — enough to coat the pot's base and every kernel before popping starts. Scale both together, never the kernels alone."
      },
      {
        "q": "Why do you need a lid when popping corn in oil?",
        "a": "A lid holds the heat in so kernels near the rim pop rather than just warm through, and stops hot oil and popped corn flying off the stovetop as popping speeds up."
      },
      {
        "q": "Should popcorn oil be extra virgin or a milder olive oil?",
        "a": "Either pops the same way. Extra virgin adds a fruity, sometimes peppery edge a neutral oil cannot; a milder olive oil gives a quieter flavour. It is a taste preference, not a rule."
      },
      {
        "q": "When should I salt stovetop popcorn?",
        "a": "Off the heat, right after tipping it into a bowl, while the oil on each piece is still warm enough to hold the salt. Salted into the hot pot it can scorch first."
      },
      {
        "q": "Why does shaking the pot matter so much?",
        "a": "It moves kernels off the hottest patch of metal so none of them scorch while others are still unpopped, keeping a single moving layer of kernels in contact with the heat."
      },
      {
        "q": "Is olive oil popcorn healthier than microwave popcorn?",
        "a": "That question belongs with a dietitian, not a cooking article, and this site makes no health claim for its oil. What stovetop popping genuinely offers is more flavour and salt control."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours and the price for each size."
      },
      {
        "label": "Olive oil smoke point: what heat it can take",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "The full smoke point range for extra virgin, and how freshness and grade move it."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Frying, tumis, dressing and baking with olive oil, in one guide."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "olive-oil-roasted-vegetables",
    "slug": "olive-oil-for-roasting-vegetables",
    "seoTitle": "Olive Oil for Roasting Vegetables: Getting Them to Crisp",
    "metaTitle": "Olive Oil for Roasting Vegetables: Getting Them to Crisp",
    "metaDescription": "How much oil per tray, why a crowded tray steams instead of crisps, oven temperature by vegetable, and when to salt. A temperature and time table included.",
    "focusKeyword": "olive oil for roasting vegetables",
    "relatedKeywords": [
      "roasting vegetables with olive oil",
      "olive oil roasted vegetables temperature",
      "how much olive oil for roasted vegetables",
      "crispy roasted vegetables oven",
      "roasting tray too crowded",
      "when to salt roasted vegetables",
      "oven temperature for roasting vegetables",
      "olive oil drizzle after roasting",
      "roast vegetables extra virgin olive oil",
      "coating vegetables in olive oil"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "roasting",
      "vegetables",
      "oven",
      "extra virgin"
    ],
    "h1": "Olive Oil for Roasting Vegetables: How to Get Them to Actually Crisp",
    "excerpt": "Most roasted vegetables come out of the oven soft and grey instead of browned at the edges. The fix is rarely the oven. It is how much oil goes on, how the tray is loaded, and when the salt lands.",
    "keyTakeaway": "Coat vegetables in a thin film of oil, about a tablespoon per tray, not a pool. Spread them in one uncrowded layer so steam escapes, roast hot for watery vegetables and lower for dense ones, salt dense vegetables before and watery ones after, then finish with a raw drizzle once out.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilRoastedVegetablesHero",
      "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
    },
    "ogImage": "/og/blog-olive-oil-roasted-vegetables.jpg",
    "intro": [
      "A tray of roasted vegetables that comes out pale and soft instead of browned at the edges has usually not failed because of the oven. It has failed because of the oil and the tray: too little coating, too much crowding, or salt added at the wrong moment.",
      "None of that needs more heat. It needs less vegetable per tray and a clearer idea of what each one wants."
    ],
    "sections": [
      {
        "heading": "How much oil actually belongs on the tray",
        "id": "how-much-oil",
        "blocks": [
          {
            "type": "p",
            "text": "A tray of cut vegetables needs a thin, even coating of olive oil, not a puddle at the bottom. For a full baking sheet, start with about a tablespoon and toss until every piece looks glossy rather than wet, adding more only if dry patches remain."
          },
          {
            "type": "p",
            "text": "Too little oil and the cut surfaces dry out and char before they soften. Too much and the vegetables sit in a shallow fry instead of a roast. See the [smoke point guide](/blog/olive-oil-smoke-point-what-heat-it-can-take) for how far extra virgin can be pushed."
          },
          {
            "type": "image",
            "src": "pressOliveOilRoastedVegetablesInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      },
      {
        "heading": "Why a crowded tray is the real enemy of crisping",
        "id": "crowded-tray",
        "blocks": [
          {
            "type": "p",
            "text": "Vegetables piled two and three deep release water as they heat, and that water has nowhere to go in a crowded pan — it collects, and they steam in it instead of browning. One layer with visible gaps between pieces lets the moisture escape upward instead of pooling."
          },
          {
            "type": "p",
            "text": "If the tray is covered edge to edge with no gaps, split the batch across two trays. A half-empty tray is usually the one that browns properly."
          },
          {
            "type": "image",
            "src": "pressOliveOilRoastedVegetablesInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      },
      {
        "heading": "Oven temperature and roughly how long, by vegetable",
        "id": "temperature-and-time",
        "blocks": [
          {
            "type": "p",
            "text": "Dense root vegetables want a lower oven and more time so the inside cooks through before the outside burns. Watery, quick-cooking vegetables want it hot and fast, so they brown before turning to mush. The table below is a starting point, not a fixed rule."
          },
          {
            "type": "table",
            "head": [
              "Vegetable",
              "Oven temperature",
              "Roughly how long"
            ],
            "rows": [
              [
                "Potatoes, carrots, beetroot",
                "190-200°C",
                "40-50 minutes"
              ],
              [
                "Pumpkin, sweet potato",
                "190-200°C",
                "35-45 minutes"
              ],
              [
                "Cauliflower, broccoli",
                "190-200°C",
                "25-30 minutes"
              ],
              [
                "Bell peppers, onions",
                "190-200°C",
                "20-25 minutes"
              ],
              [
                "Zucchini, eggplant",
                "180-200°C",
                "18-22 minutes"
              ],
              [
                "Cherry tomatoes, asparagus",
                "180-200°C",
                "12-18 minutes"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilRoastedVegetablesInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          },
          {
            "type": "p",
            "text": "Cut pieces roughly the same size on one tray so they finish together, flipping halfway if one side browns faster."
          }
        ]
      },
      {
        "heading": "When to salt: before the oven or after",
        "id": "when-to-salt",
        "blocks": [
          {
            "type": "p",
            "text": "Dense vegetables such as potatoes, carrots and pumpkin can take salt before they go in, since it has time to season through as they cook. Watery vegetables such as zucchini, eggplant and tomatoes are better salted after, since salt draws water out and an early hand slows the browning."
          },
          {
            "type": "ul",
            "items": [
              "**Salt before.** Dense roots, cauliflower, broccoli, onions.",
              "**Salt after.** Zucchini, eggplant, cherry tomatoes, mushrooms.",
              "**Either works.** Bell peppers and asparagus, since they hold little water."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilRoastedVegetablesInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      },
      {
        "heading": "Which vegetables want hot and fast versus low and slow",
        "id": "hot-versus-low",
        "blocks": [
          {
            "type": "p",
            "text": "The split is about water content and density, not the vegetable's family. Thin, watery pieces want a hot oven and a short time so they brown before they collapse; thick, dense pieces want a gentler oven so the centre catches up before the outside burns."
          },
          {
            "type": "ul",
            "items": [
              "**Hot and fast.** Asparagus, cherry tomatoes, zucchini, thin green beans — in and out in under twenty minutes.",
              "**Low and longer.** Whole beetroot, large potato wedges, pumpkin chunks, whole garlic bulbs — closer to forty-five to fifty minutes."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilRoastedVegetablesInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      },
      {
        "heading": "The raw drizzle after the tray comes out",
        "id": "raw-finishing-drizzle",
        "blocks": [
          {
            "type": "p",
            "text": "A second, raw pour of extra virgin olive oil after roasting is a different job from the oil the vegetables cooked in. The heated oil is a cooking medium; the finishing oil is tasted straight, so its own flavour — grassy, peppery, herbal — is what the diner notices first."
          },
          {
            "type": "p",
            "text": "A teaspoon or two over the tray, added while the vegetables are still hot enough to carry the aroma, does more for the finished dish than any amount added before roasting. An infused oil such as [rosemary and basil](/products) suits this step well, since none of its aroma is lost to the oven."
          },
          {
            "type": "image",
            "src": "pressOliveOilRoastedVegetablesInline",
            "alt": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "A thin coating, not a pool. One uncrowded layer. Hot and fast for watery vegetables, lower and longer for dense ones. Salt dense vegetables before, watery ones after, and finish with a raw drizzle once the tray is out."
        }
      ]
    },
    "faqs": [
      {
        "q": "How much olive oil should I use for roasted vegetables?",
        "a": "About a tablespoon per full baking tray, tossed until every piece looks glossy rather than wet. Add a little more only if dry patches remain — a pool at the bottom is too much oil."
      },
      {
        "q": "Why do my roasted vegetables come out soggy instead of crispy?",
        "a": "The tray is usually too crowded. Piled vegetables release water with nowhere to go, so they steam instead of browning. Spread them in one layer with visible gaps, splitting into two trays if needed."
      },
      {
        "q": "What oven temperature is best for roasting vegetables?",
        "a": "It depends on the vegetable. Dense roots like potatoes and beetroot suit 200-220°C for 35-45 minutes; watery, quick-cooking vegetables like asparagus and cherry tomatoes want a hotter 220-230°C for closer to 10-20 minutes."
      },
      {
        "q": "Should I salt vegetables before or after roasting?",
        "a": "Dense vegetables such as potatoes can be salted before, since it seasons through as they cook. Watery vegetables such as zucchini and tomatoes are better salted after, since early salt slows browning."
      },
      {
        "q": "Should I use extra virgin olive oil for roasting?",
        "a": "Yes, extra virgin comfortably handles oven roasting inside the published 180-200°C range. See the [smoke point guide](/blog/olive-oil-smoke-point-what-heat-it-can-take) for the full range it can take before it starts to smoke."
      },
      {
        "q": "Why add more olive oil after the vegetables are roasted?",
        "a": "A raw drizzle is tasted straight rather than cooked away, so its own flavour comes through. A teaspoon or two while the tray is still hot carries more aroma than oil added before cooking starts."
      },
      {
        "q": "Can I roast all vegetables together on one tray?",
        "a": "Only if they cook at similar speeds. Mixing quick asparagus with whole beetroot means one burns before the other softens through — group vegetables by roughly how long each one needs instead."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours for a finishing drizzle."
      },
      {
        "label": "Olive oil smoke point: what heat it can actually take",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "The smoke point range for extra virgin and how freshness moves it more than the grade on the label."
      },
      {
        "label": "Olive oil marinade: what it does",
        "path": "blog/olive-oil-marinade-what-it-does",
        "description": "How oil in a marinade carries flavour into vegetables and meat before they ever reach the pan or oven."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 6 ---------------- */
  {
    "id": "olive-oil-vs-butter",
    "slug": "olive-oil-vs-butter",
    "seoTitle": "Olive Oil vs Butter: Which One to Reach For",
    "metaTitle": "Olive Oil vs Butter: Which One to Reach For",
    "metaDescription": "Flavour, hot toast vs room-temperature bread, browning in a pan, one dish each way, price per use — olive oil vs butter as cooking fats, not baking.",
    "focusKeyword": "olive oil vs butter",
    "relatedKeywords": [
      "olive oil or butter for cooking",
      "olive oil vs butter for toast",
      "does olive oil brown like butter",
      "butter vs olive oil in a pan",
      "olive oil instead of butter",
      "olive oil vs butter flavour",
      "spreading olive oil on bread",
      "olive oil vs butter price",
      "cooking with olive oil vs butter",
      "browned butter vs olive oil"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "butter",
      "pan cooking",
      "spreading",
      "extra virgin"
    ],
    "h1": "Olive Oil vs Butter: Which One to Reach For",
    "excerpt": "Olive oil and butter are both reached for on instinct, and the right one depends on the job: a slice of toast, a hot pan, a finished plate. This is about spreading and cooking, not baking.",
    "keyTakeaway": "Neither fat replaces the other across the board. Butter suits hot toast, a browned crust and a pan sauce finished glossy; olive oil suits room-temperature bread, a raw drizzle and a pan that should not brown. For the baking conversion ratio, see the substitute guide rather than guessing it here.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilVsButterHero",
      "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
    },
    "ogImage": "/og/blog-olive-oil-vs-butter.jpg",
    "intro": [
      "Butter and olive oil sit in the same kitchen doing different jobs, and most people pick on instinct rather than asking what the dish needs.",
      "This is a comparison for the stovetop and the bread board, not the oven: flavour, toast versus room-temperature bread, what a hot pan does to each, one dish that wants butter and one that wants oil, and price per use."
    ],
    "sections": [
      {
        "heading": "Flavour is the real difference",
        "id": "flavour-first",
        "blocks": [
          {
            "type": "p",
            "text": "Butter tastes of milk and cream: rich, faintly sweet, the same note under almost anything. Extra virgin olive oil tastes of the fruit it was pressed from — grassy, peppery or mild depending on the harvest — and changes what it touches instead of just coating it."
          },
          {
            "type": "p",
            "text": "Butter is a background note that lets other flavours lead. Olive oil is a flavour of its own, so a peppery finish can carry a plain dish and overwhelm a delicate one."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsButterInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "Hot toast against bread left at room temperature",
        "id": "hot-toast-vs-room-temperature-bread",
        "blocks": [
          {
            "type": "p",
            "text": "On toast straight from the toaster, cold butter melts into every hole within seconds and turns the surface glossy and soft. Olive oil poured onto hot bread pools instead of melting in, and sits more on top than it is absorbed."
          },
          {
            "type": "p",
            "text": "On bread left at room temperature, the difference flips. Cold butter tears the crust as it drags and needs minutes softening. Olive oil spreads instantly at any bread temperature — see [olive oil for bread and dipping](/blog/olive-oil-for-bread-and-dipping) for the saucer version."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsButterInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "What each one does in a hot pan",
        "id": "what-happens-in-a-hot-pan",
        "blocks": [
          {
            "type": "p",
            "text": "Butter carries water and milk solids, and those solids brown as the water cooks off — the nutty, toasted colour behind a proper pan sauce. Left too long, the same solids scorch and turn bitter, which is why butter needs watching."
          },
          {
            "type": "ul",
            "items": [
              "**Butter** browns in minutes and can burn soon after — good for a deliberate browned-butter finish, risky if the pan is left unattended.",
              "**Olive oil** has no milk solids to brown, so it shimmers and thins as it heats instead of building that toasted colour.",
              "See [olive oil smoke point](/blog/olive-oil-smoke-point-what-heat-it-can-take) for how much heat the oil itself takes."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsButterInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "One dish that wants butter, one that wants oil",
        "id": "one-dish-each-way",
        "blocks": [
          {
            "type": "p",
            "text": "A pan sauce finished with cold butter, swirled in off the heat, turns glossy and thick in a way oil cannot copy — the fat emulsifies into the liquid rather than floating on it. Mashed potato leans the same way."
          },
          {
            "type": "ul",
            "items": [
              "**Wants butter:** a pan sauce mounted at the end, or mash finished rich and smooth.",
              "**Wants oil:** a tomato sauce or sautéed greens finished with a raw drizzle once the heat is off."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsButterInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "Use this for that: a quick reference",
        "id": "use-this-for-that",
        "blocks": [
          {
            "type": "p",
            "text": "Most kitchens keep both, and the choice comes down to whether the fat needs to brown, sit in a pan unattended for a while, or carry its own flavour onto the plate raw at the end of cooking, rather than during it."
          },
          {
            "type": "table",
            "head": [
              "Job",
              "Reach for",
              "Why"
            ],
            "rows": [
              [
                "Toast, still hot",
                "Butter",
                "Melts in within seconds"
              ],
              [
                "Bread at room temperature",
                "Olive oil",
                "Spreads without softening or tearing the crust"
              ],
              [
                "A browned, nutty finish",
                "Butter",
                "Only the milk solids brown this way"
              ],
              [
                "Sautéing without watching the pan closely",
                "Olive oil",
                "No milk solids to scorch"
              ],
              [
                "A glossy pan sauce or mash",
                "Butter",
                "Emulsifies into the liquid, not just coats it"
              ],
              [
                "A raw drizzle over a finished dish",
                "Olive oil",
                "Carries its own fruit and pepper on top"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsButterInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      },
      {
        "heading": "What each one costs to use, and where baking fits",
        "id": "price-per-use",
        "blocks": [
          {
            "type": "p",
            "text": "Butter goes on in small pats, so one block covers many rounds of toast. Olive oil is poured by the tablespoon, and a raw drizzle uses less than a shallow-fry — see [the products page](/products) for sizes and pricing rather than a figure here."
          },
          {
            "type": "p",
            "text": "Baking is a different question, with its own conversion between the two fats, already covered at [olive oil substitute: what to use instead](/blog/olive-oil-substitute-what-to-use-instead) — this article stays with the stovetop and the bread board."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsButterInline",
            "alt": "Workers carrying the day's harvest along a track between the olive trees"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Reach for butter when a dish wants a browned note or a glossy finish, and for olive oil when the fat should carry its own flavour raw, or sit in a pan without browning. Keep both, and pick by the job."
        }
      ]
    },
    "faqs": [
      {
        "q": "Can I substitute olive oil for butter when baking?",
        "a": "That is a different question from spreading and cooking, which is what this article covers. The conversion ratio between the two fats already lives at [olive oil substitute: what to use instead](/blog/olive-oil-substitute-what-to-use-instead), not repeated here."
      },
      {
        "q": "Which is healthier, olive oil or butter?",
        "a": "That is a question for a dietitian, not a cooking guide. This article compares the two only as fats for spreading and cooking: flavour, browning behaviour, and cost per use."
      },
      {
        "q": "Can I spread olive oil on bread instead of butter?",
        "a": "Yes, and at room temperature it spreads more easily than cold butter, which needs minutes softening. On hot toast the two flip: butter melts in within seconds, while olive oil pools on top instead."
      },
      {
        "q": "Does olive oil brown the way butter does in a pan?",
        "a": "No. Butter browns because of its milk solids, which caramelise and can then burn. Olive oil has no milk solids, so it heats and thins without building that toasted colour."
      },
      {
        "q": "Is olive oil or butter cheaper to cook with?",
        "a": "It depends how each is used: butter goes on in small pats, olive oil by the tablespoon. Check current sizes and pricing on the [products page](/products) rather than a fixed figure."
      },
      {
        "q": "Can butter and olive oil be used together in the same pan?",
        "a": "Yes — a splash of olive oil alongside butter lets the butter sit at heat a little longer before its milk solids start to scorch, without losing the browned flavour it gives a dish."
      },
      {
        "q": "What can olive oil do on a finished dish that butter cannot?",
        "a": "Carry its own fruity or peppery flavour raw, poured on once the heat is off. Butter melts into a dish and mostly disappears; a good extra virgin oil stays a flavour on top."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours and the price for each size."
      },
      {
        "label": "Olive oil substitute: what to use instead",
        "path": "blog/olive-oil-substitute-what-to-use-instead",
        "description": "The baking conversion between olive oil and butter, plus substitutes for other pantry fats."
      },
      {
        "label": "Olive oil for bread and dipping",
        "path": "blog/olive-oil-for-bread-and-dipping",
        "description": "The saucer version of room-temperature bread and oil, with za'atar, dukkah and balsamic."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      },
      {
        "label": "Olive oil mashed potatoes",
        "path": "blog/olive-oil-mashed-potatoes",
        "description": "A dairy-free mash, warm oil folded in, and how the texture differs from butter."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "olive-oil-coffee",
    "slug": "olive-oil-coffee",
    "seoTitle": "Olive Oil Coffee: What the Trend Tastes Like",
    "metaTitle": "Olive Oil Coffee: What the Trend Tastes Like",
    "metaDescription": "The oil-in-coffee trend explained as texture and flavour: how much oil, how to mix it in, which grade suits coffee, and iced versus hot.",
    "focusKeyword": "olive oil coffee",
    "relatedKeywords": [
      "olive oil in coffee",
      "oil coffee trend",
      "olive oil coffee taste",
      "how much olive oil in coffee",
      "olive oil latte",
      "iced olive oil coffee",
      "olive oil coffee recipe",
      "extra virgin olive oil coffee",
      "oil in coffee texture",
      "coffee with olive oil"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "coffee",
      "trend",
      "texture",
      "extra virgin"
    ],
    "h1": "Olive Oil Coffee: What the Trend Actually Tastes Like",
    "excerpt": "A spoon of olive oil in a cup of coffee is a texture and flavour trend, not a health drink. Here is how much to use, how to mix it in so it doesn't separate, and what it actually tastes like.",
    "keyTakeaway": "Olive oil coffee is a mouthfeel trend: about half a teaspoon of a mild extra virgin oil, blended or stirred hard into hot or iced coffee, gives a fuller texture and a faint note that softens bitterness. It has nothing to do with metabolism or energy claims — those belong to a dietitian, not this article.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilCoffeeHero",
      "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
    },
    "ogImage": "/og/blog-olive-oil-coffee.jpg",
    "intro": [
      "Olive oil in coffee has been showing up online as a trend, usually with a spoon stirred into the cup and a claim attached about energy or metabolism.",
      "This article skips the claims: how much oil to use, why it needs blending or vigorous stirring rather than a plain pour, what it tastes like, which grade suits it, and hot versus iced."
    ],
    "sections": [
      {
        "heading": "A texture trend, not a health trend",
        "id": "trend-not-a-health-claim",
        "blocks": [
          {
            "type": "p",
            "text": "Most of what circulates about olive oil coffee online is framed as a metabolism boost or a healthier latte. This article does not make that case: it treats the drink as what it is on the palate, a fuller mouthfeel and a flavour note, nothing about disease or energy."
          },
          {
            "type": "p",
            "text": "If the real question is whether it is good for you, that is one for a doctor or dietitian, not a recipe article. What follows is only how it's made and what it tastes like."
          },
          {
            "type": "image",
            "src": "pressOliveOilCoffeeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "How much oil, and how to mix it in",
        "id": "quantity-and-method",
        "blocks": [
          {
            "type": "p",
            "text": "Start with roughly half a teaspoon of extra virgin olive oil per cup — a small amount, since the point is a texture change, not an oily drink. Oil and coffee do not mix on their own, so a plain pour just sits as a slick on top."
          },
          {
            "type": "ol",
            "items": [
              "Brew the coffee as usual, hot or over ice.",
              "Measure roughly half a teaspoon of a mild extra virgin olive oil.",
              "Add the oil to the cup, then stir hard and continuously for ten to fifteen seconds, or blend for a few seconds in a small frother or blender.",
              "Taste, and add a few more drops only if the mouthfeel still feels thin.",
              "Drink promptly — left standing, the oil separates back out and beads on the surface."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilCoffeeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "What it actually tastes like",
        "id": "what-it-tastes-like",
        "blocks": [
          {
            "type": "p",
            "text": "Done right, the coffee feels fuller and slightly heavier on the tongue, closer to a drink with a little cream stirred through than a black coffee. It is not sweet, and it does not taste of olives in any strong way if the oil is mild."
          },
          {
            "type": "p",
            "text": "The main effect is on bitterness: a faint, grassy note sits underneath the coffee and takes the edge off a sharp cup rather than masking the coffee flavour. Too much oil tips it the other way and the drink turns greasy."
          },
          {
            "type": "image",
            "src": "pressOliveOilCoffeeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "Which oil suits coffee, and which doesn't",
        "id": "which-oil-to-use",
        "blocks": [
          {
            "type": "p",
            "text": "A mild extra virgin olive oil works better here than a peppery, high-intensity one, which fights the coffee instead of rounding it out. Arabian Village's plain extra virgin, poured in small quantity, keeps the coffee flavour in front rather than competing with it."
          },
          {
            "type": "p",
            "text": "None of the six infused oils belong in a cup of coffee — they're built for savoury dishes, not a drink. See [the products page](/products) for the plain oil and its two sizes."
          },
          {
            "type": "image",
            "src": "pressOliveOilCoffeeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "Iced versus hot",
        "id": "iced-vs-hot",
        "blocks": [
          {
            "type": "p",
            "text": "Hot coffee mixes the oil in faster because heat thins it, so a firm stir for ten seconds is usually enough. Cold or iced coffee needs more work — the oil stays thicker and separates back out sooner, so a blender or milk frother does a more even job than a spoon."
          },
          {
            "type": "table",
            "head": [
              "Coffee",
              "Best mixing method",
              "How it separates"
            ],
            "rows": [
              [
                "Hot coffee",
                "Vigorous stir, 10–15 seconds",
                "Slowly, over several minutes"
              ],
              [
                "Iced coffee",
                "Small blender or frother",
                "Faster — oil beads on the surface within a minute or two if not emulsified"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilCoffeeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      },
      {
        "heading": "Where this fits next to your other coffee habits",
        "id": "where-it-fits",
        "blocks": [
          {
            "type": "p",
            "text": "This is a one-cup experiment, not a routine to build a diet around, and it sits alongside milk, sugar or a plain black coffee rather than replacing any of them. If it isn't for you, nothing is lost by leaving the oil out."
          },
          {
            "type": "p",
            "text": "For the same oil in savoury cooking rather than a cup, [how to cook with olive oil in a Malaysian kitchen](/blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen) covers pan heat, seasoning and everyday dishes."
          },
          {
            "type": "image",
            "src": "pressOliveOilCoffeeInline",
            "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Olive oil coffee is a texture experiment: about half a teaspoon of a mild extra virgin oil, mixed in hard rather than poured, gives a fuller mouthfeel and softens bitterness. It is worth trying once out of curiosity, not as a health routine — leave the disease and energy claims to a dietitian."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is olive oil coffee good for you?",
        "a": "That is a question for a doctor or dietitian, not a recipe article. This piece only covers what the drink tastes like and how to make it — a fuller mouthfeel and a softened bitterness, nothing more."
      },
      {
        "q": "How much olive oil should I put in coffee?",
        "a": "Start with about half a teaspoon per cup. It is a small amount because the goal is a texture change, not an oily drink — add a few more drops only if it still tastes thin."
      },
      {
        "q": "Why does the oil float on top of my coffee?",
        "a": "Oil and coffee don't mix on their own, so a plain pour sits as a slick. Stir hard for ten to fifteen seconds, or blend briefly, so the oil breaks up through the drink instead of pooling."
      },
      {
        "q": "Which olive oil is best for coffee?",
        "a": "A mild extra virgin oil works better than a peppery, high-intensity one, which fights the coffee's own flavour. None of the infused flavours suit a cup — they're built for savoury cooking, not a drink."
      },
      {
        "q": "Can I add olive oil to iced coffee?",
        "a": "Yes, though it takes more work than hot coffee — cold oil separates back out faster. A small blender or milk frother mixes it more evenly than stirring with a spoon."
      },
      {
        "q": "What does olive oil coffee actually taste like?",
        "a": "Fuller and slightly heavier on the tongue, closer to coffee with a little cream than black coffee. It isn't sweet, and with a mild oil it doesn't taste strongly of olives."
      },
      {
        "q": "Does olive oil coffee replace milk or sugar?",
        "a": "No — it sits alongside them, not as a replacement. Some people add oil to plain black coffee, others still add milk or sugar as usual; there's no fixed rule."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, the size to reach for a small measure at a time."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Pan heat, seasoning and everyday dishes for the same oil used in savoury cooking."
      },
      {
        "label": "Olive oil smoke point: what heat it can take",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "How much heat this oil takes before it smokes, for anyone warming rather than stirring it in cold."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "olive-oil-ice-cream",
    "slug": "olive-oil-ice-cream",
    "seoTitle": "Olive Oil Ice Cream: A Mediterranean Dessert",
    "metaTitle": "Olive Oil Ice Cream: A Mediterranean Dessert",
    "metaDescription": "How olive oil ice cream is churned, why extra virgin's fruit and pepper come through, a salt-and-zest finish, and a no-churn shortcut with no machine.",
    "focusKeyword": "olive oil ice cream",
    "relatedKeywords": [
      "olive oil ice cream recipe",
      "extra virgin olive oil ice cream",
      "no churn olive oil ice cream",
      "olive oil gelato",
      "olive oil dessert",
      "olive oil in ice cream base",
      "salted olive oil ice cream",
      "olive oil and citrus ice cream",
      "churned olive oil dessert",
      "Mediterranean olive oil dessert"
    ],
    "category": "Recipes",
    "tags": [
      "dessert",
      "ice cream",
      "extra virgin",
      "recipe"
    ],
    "h1": "Olive Oil Ice Cream: A Mediterranean Dessert Technique",
    "excerpt": "Extra virgin olive oil churned into an ice cream base gives a silkier texture and a fruity, faintly peppery counter-note to the sweetness. This is a technique borrowed from Mediterranean kitchens, not a diet swap.",
    "keyTakeaway": "Olive oil ice cream is a churning technique, not a lighter dessert: extra virgin oil joins or replaces the cream, emulsifies in as the base churns, and its fruit and pepper cut through the sweetness. Finish with flaky salt or citrus zest, or skip the machine with a folded no-churn version.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilIceCreamHero",
      "alt": "Green olive oil pouring from a stainless pipe into an open vat at the mill"
    },
    "ogImage": "/og/blog-olive-oil-ice-cream.jpg",
    "intro": [
      "Olive oil ice cream is not a health food. It is a Mediterranean dessert technique, where extra virgin olive oil is churned into the base for a silkier texture and a fruity, peppery note plain cream cannot give.",
      "This covers how the oil goes in, why a good extra virgin's character comes through more than in a neutral-oil dessert, a simple finish, and a no-churn version for a reader without a machine."
    ],
    "sections": [
      {
        "heading": "A churned dessert, not a health swap",
        "id": "not-a-health-swap",
        "blocks": [
          {
            "type": "p",
            "text": "Olive oil ice cream sits in the same family as gelato made with milk instead of heavy cream: a technique aimed at texture and flavour, not a lighter or better-for-you version of the classic. Whether it suits any particular diet is a question for a doctor or dietitian, not this article."
          },
          {
            "type": "p",
            "text": "The oil changes mouthfeel and taste. Fat coats the tongue and slows how fast ice crystals melt, and extra virgin olive oil brings its own fruitiness along, in a way a neutral oil never would."
          },
          {
            "type": "image",
            "src": "pressOliveOilIceCreamInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "How the oil goes into the base",
        "id": "how-the-technique-works",
        "blocks": [
          {
            "type": "p",
            "text": "The oil joins the cream in a custard base or replaces part of it, then gets emulsified in while the machine churns, rather than poured in at the end. A slow, steady stream into the still-cold, moving base is what keeps it from separating."
          },
          {
            "type": "table",
            "head": [
              "Component",
              "Amount",
              "Note"
            ],
            "rows": [
              [
                "Whole milk",
                "500 ml",
                "Warmed, not boiled"
              ],
              [
                "Heavy cream",
                "250 ml",
                "Can drop to 125 ml"
              ],
              [
                "Sugar",
                "150 g",
                "Whisked with the yolks"
              ],
              [
                "Egg yolks",
                "4",
                "Omit for a simpler base"
              ],
              [
                "Extra virgin olive oil",
                "80–100 ml",
                "Streamed in while churning"
              ],
              [
                "Salt",
                "A pinch",
                "In the base"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilIceCreamInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "Why extra virgin's fruit and pepper come through",
        "id": "flavour-comes-through",
        "blocks": [
          {
            "type": "p",
            "text": "A neutral oil disappears into a dessert and leaves only richness behind. Extra virgin olive oil keeps its own identity: a grassy or fruity front note and a peppery catch at the back of the throat, both of which survive churning and cold far better than they survive baking heat."
          },
          {
            "type": "p",
            "text": "That peppery edge cuts the sweetness, the way a squeeze of lemon might on a savoury dish. A milder extra virgin sits politely alongside vanilla or citrus; a sharper one suits a plainer base that lets it lead."
          },
          {
            "type": "image",
            "src": "pressOliveOilIceCreamInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "A simple finishing touch",
        "id": "finishing-touch",
        "blocks": [
          {
            "type": "p",
            "text": "The base rarely needs more than one finishing touch once scooped: flaky salt for a savoury-sweet contrast, or fresh orange or lemon zest for a brighter top note that echoes the oil's own fruitiness. A last thread of oil drizzled over the scoop repeats the flavour rather than introducing a new one."
          },
          {
            "type": "ul",
            "items": [
              "**Flaky salt** — a small pinch scattered just before serving.",
              "**Citrus zest** — orange or lemon, grated over the scoop for a fruitier oil.",
              "**A final thread of oil** — a few drops on top, for a stronger finish."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilIceCreamInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "No machine? A no-churn shortcut",
        "id": "no-churn-shortcut",
        "blocks": [
          {
            "type": "p",
            "text": "Whipped cream folded with sweetened condensed milk and olive oil sets in the freezer without any churning at all, and skips the custard step entirely. The texture is a touch denser than a churned base, but the same oil, salt and zest choices still apply."
          },
          {
            "type": "ol",
            "items": [
              "Whip 400 ml chilled heavy cream to soft peaks.",
              "Whisk 200 ml condensed milk with 80 ml olive oil and a pinch of salt.",
              "Fold the condensed-milk mixture into the cream, in three additions.",
              "Pour into a lidded container and smooth the top.",
              "Freeze at least six hours before scooping."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilIceCreamInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      },
      {
        "heading": "Which oil to reach for",
        "id": "which-oil-to-reach-for",
        "blocks": [
          {
            "type": "p",
            "text": "A milder extra virgin suits a vanilla or citrus base, and a sharper, peppery one suits a plainer base built to let the oil lead. Either way, use the plain extra virgin — see [the products page](products) — not one of the infused flavours."
          },
          {
            "type": "p",
            "text": "For how the same oil behaves in an oven rather than a freezer, see [olive oil for cakes and baking](blog/olive-oil-for-cakes-and-baking)."
          },
          {
            "type": "image",
            "src": "pressOliveOilIceCreamInline",
            "alt": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Olive oil ice cream is a Mediterranean churning technique: oil joins or replaces the cream, emulsifies in as the base churns, and brings its own fruit and pepper along. Finish with salt or zest, or skip the machine with the folded version above."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is olive oil ice cream healthier than regular ice cream?",
        "a": "That is a question for a doctor or dietitian, not a recipe guide. This article covers the technique only: how the oil goes into the base, and what it does to texture."
      },
      {
        "q": "Does olive oil ice cream taste like olive oil?",
        "a": "It tastes faintly of the fruit the oil was pressed from — grassy or peppery depending on the oil — as a counter-note to the sweetness, not as the dominant flavour once the base is churned and frozen."
      },
      {
        "q": "Can I make olive oil ice cream without a machine?",
        "a": "Yes. Whip cream to soft peaks, fold in sweetened condensed milk mixed with olive oil and a pinch of salt, then freeze in a lidded container for at least six hours before scooping."
      },
      {
        "q": "How much olive oil goes into an ice cream base?",
        "a": "Roughly 80 to 100 ml of extra virgin olive oil against 750 ml of combined milk and cream is a workable starting ratio, streamed in slowly while the base is churning rather than stirred in cold."
      },
      {
        "q": "Which olive oil suits ice cream best?",
        "a": "A milder, fruitier extra virgin suits a vanilla or citrus base; a sharper, peppery one suits a plainer base built to let the oil lead. Either way, use the plain extra virgin, not an infused flavour."
      },
      {
        "q": "Why does the oil need to be added while churning?",
        "a": "A slow stream into a cold, moving base is what keeps the oil emulsified rather than floating free. Poured in cold at the end, it tends to separate instead of blending into the texture."
      },
      {
        "q": "What can I add on top of olive oil ice cream?",
        "a": "Flaky salt or fresh orange or lemon zest, scattered on just before serving, both echo the oil's own fruitiness. A final thread of the same oil over the scoop repeats the flavour rather than adding a new one."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, the plain extra virgin used in this recipe."
      },
      {
        "label": "Olive oil for cakes and baking",
        "path": "blog/olive-oil-for-cakes-and-baking",
        "description": "How the same extra virgin oil behaves in an oven, with the general baking conversion ratio."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "olive-oil-mashed-potatoes",
    "slug": "olive-oil-mashed-potatoes",
    "seoTitle": "Olive Oil Mashed Potatoes: A Dairy-Free Side",
    "metaTitle": "Olive Oil Mashed Potatoes: A Dairy-Free Side",
    "metaDescription": "How much olive oil per kilo of potato, why the oil goes in warm not cold, how the texture differs from a butter mash, and a fresh-garlic variation.",
    "focusKeyword": "olive oil mashed potatoes",
    "relatedKeywords": [
      "dairy-free mashed potatoes",
      "olive oil mash recipe",
      "mashed potatoes without butter",
      "olive oil instead of butter mash",
      "how much olive oil for mashed potato",
      "garlic olive oil mashed potatoes",
      "vegan mashed potatoes olive oil",
      "extra virgin olive oil mash",
      "creamy olive oil mashed potatoes",
      "olive oil potato side dish"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "mashed potatoes",
      "dairy-free",
      "side dish",
      "extra virgin"
    ],
    "h1": "Olive Oil Mashed Potatoes: A Dairy-Free, Stovetop Side",
    "excerpt": "A mash made with extra virgin olive oil instead of butter and cream is looser, glossier and carries its own flavour rather than fading into the background. This is a technique for the stovetop, not a health claim.",
    "keyTakeaway": "Olive oil mash is dairy-free by ingredient, not by promised benefit: warm oil folded into just-mashed potato, roughly 60–80 ml per kilo, gives a looser, creamier result than butter and cream. A fresh-garlic variation needs plain oil, not the infused range.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilMashedPotatoesHero",
      "alt": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks"
    },
    "ogImage": "/og/blog-olive-oil-mashed-potatoes.jpg",
    "intro": [
      "Mashed potato usually means butter and cream, but a version finished with extra virgin olive oil instead is a genuine stovetop technique, not a compromise.",
      "This covers how much oil to use per kilo of potato, why it goes in warm rather than cold or boiling-hot, how the finished texture differs from a classic mash, and a fresh-garlic variation using plain oil rather than the infused range."
    ],
    "sections": [
      {
        "heading": "A dairy-free mash, by ingredient not by claim",
        "id": "dairy-free-by-ingredient",
        "blocks": [
          {
            "type": "p",
            "text": "Swapping butter and cream for olive oil is dairy-free because of what is left out, not because of any promised benefit. It suits anyone avoiding dairy, cooking for a mixed table, or wanting the fruity, peppery note extra virgin oil brings that butter cannot."
          },
          {
            "type": "p",
            "text": "It is not a lighter or healthier version of the classic mash — that question belongs with a doctor or dietitian, not a recipe. What follows covers only how the oil behaves and how the result tastes."
          },
          {
            "type": "image",
            "src": "pressOliveOilMashedPotatoesInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "How much oil per kilo of potato",
        "id": "oil-quantity-per-kilo",
        "blocks": [
          {
            "type": "p",
            "text": "A working range is roughly 60 to 80 ml of extra virgin olive oil per kilo of raw potato, added gradually. Start at the lower end and add more a tablespoon at a time until the mash pulls together."
          },
          {
            "type": "ul",
            "items": [
              "**1 kg potato:** 60–80 ml olive oil, added in two or three additions.",
              "**Salt:** to taste, added with the first addition of oil so it dissolves into the hot potato.",
              "**Liquid, if needed:** a splash of the reserved potato-cooking water loosens the mash further without changing the flavour."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilMashedPotatoesInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "Warm oil, not cold and not scalding",
        "id": "warm-oil-not-cold",
        "blocks": [
          {
            "type": "p",
            "text": "The oil should be warm when it goes in, not straight from a cold bottle and not while the potato is still at a rolling boil. Warm oil folds through evenly; cold oil seizes into streaks, and boiling-hot potato can turn the mash gluey."
          },
          {
            "type": "ol",
            "items": [
              "Drain and steam-dry the potato in the pot for a minute off the heat.",
              "Mash while hot, but just off a rolling boil.",
              "Warm the oil briefly — a few seconds is enough, not hot to the touch.",
              "Fold it in with a spoon, not a whisk, in two or three additions."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilMashedPotatoesInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "How the texture differs from a butter-and-cream mash",
        "id": "texture-vs-butter-mash",
        "blocks": [
          {
            "type": "p",
            "text": "An olive oil mash is looser and glossier than a butter-and-cream mash, which sets up thicker and richer as the butter's milk solids firm on cooling. Olive oil stays fluid at room temperature, so the mash pours more than it mounds and stays spoonable even once it has cooled a little."
          },
          {
            "type": "p",
            "text": "The flavour sits differently too: butter mostly disappears into the potato, while olive oil keeps its own grassy or peppery note running through the dish — closer to a Mediterranean puree than a steakhouse mash."
          },
          {
            "type": "image",
            "src": "pressOliveOilMashedPotatoesInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "A garlic and herb variation, with plain oil",
        "id": "garlic-and-herb-variation",
        "blocks": [
          {
            "type": "p",
            "text": "For a garlic mash, use **plain** extra virgin olive oil and fresh garlic, not an infused oil — the infused range on this site covers wild thyme, blackseed, turmeric and black pepper, rosemary and basil, fennel and anise, and lavender and chamomile, and does not include garlic."
          },
          {
            "type": "ul",
            "items": [
              "Warm one or two chopped garlic cloves gently in a spoonful of the measured oil for under a minute, then fold both into the mash.",
              "For an herb version, stir in chopped parsley, chives or rosemary at the very end, off the heat.",
              "Keep the garlic barely warmed rather than browned, so it seasons rather than turns bitter."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilMashedPotatoesInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      },
      {
        "heading": "The method in short",
        "id": "the-method-in-short",
        "blocks": [
          {
            "type": "p",
            "text": "Put together, the method is short enough to hold in your head: boil, drain, mash while hot, then fold in warm oil gradually until the texture is right, seasoning and finishing to taste."
          },
          {
            "type": "table",
            "head": [
              "Step",
              "What to do"
            ],
            "rows": [
              [
                "Boil",
                "Even chunks in salted water until fork-tender."
              ],
              [
                "Drain",
                "Steam-dry off the heat for a minute."
              ],
              [
                "Mash",
                "While hot, just off the boil."
              ],
              [
                "Fold in oil",
                "60–80 ml warm oil per kilo, in stages."
              ],
              [
                "Finish",
                "Salt, and garlic or herbs if using."
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilMashedPotatoesInline",
            "alt": "Stacked crates filled with freshly picked green and purple olives"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Fold warm extra virgin olive oil into just-mashed potato, roughly 60 to 80 ml per kilo, and expect a looser, glossier mash with its own fruity or peppery note rather than butter's rich, neutral background. For a garlic version, use plain oil and fresh garlic, not an infused flavour."
        }
      ]
    },
    "faqs": [
      {
        "q": "Is olive oil mashed potato healthier than a butter mash?",
        "a": "That question is for a doctor or dietitian, not a cooking guide. This article covers only how the oil behaves, how much to use, and how the finished texture and flavour compare with a butter-and-cream mash."
      },
      {
        "q": "How much olive oil replaces butter and cream in mashed potato?",
        "a": "A working range is roughly 60 to 80 ml of extra virgin olive oil per kilo of potato, added in two or three additions rather than all at once, adjusting until the texture pulls together."
      },
      {
        "q": "Why does the olive oil need to be warm, not cold?",
        "a": "Cold oil straight from the bottle seizes into streaks instead of folding through evenly. Warm oil blends in smoothly, giving a consistent texture rather than an uneven, oily-looking mash."
      },
      {
        "q": "Can I use an infused olive oil for a garlic mash?",
        "a": "No — this site's infused range covers wild thyme, blackseed, turmeric and black pepper, rosemary and basil, fennel and anise, and lavender and chamomile, and none of them is garlic. Use plain oil with fresh garlic instead."
      },
      {
        "q": "Does olive oil mashed potato taste like a classic butter mash?",
        "a": "No, and it is not meant to. Butter and cream mostly fade into the potato, while extra virgin olive oil keeps its own grassy or peppery note running through the dish, closer to a Mediterranean puree."
      },
      {
        "q": "Is olive oil mashed potato dairy-free?",
        "a": "Yes, as a fact about ingredients — potato, oil and salt, with no butter or cream. That is a statement about what is in the dish, not a claim about any health benefit."
      }
    ],
    "related": [
      {
        "label": "Olive oil vs butter",
        "path": "blog/olive-oil-vs-butter",
        "description": "Flavour, browning and price compared between the two fats for cooking and spreading, not baking."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "A practical guide to using extra virgin olive oil across everyday cooking, from sautéing to finishing."
      },
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours and the price for each size."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "olive-oil-orange-cake",
    "slug": "olive-oil-orange-cake",
    "seoTitle": "Olive Oil Orange Cake: A Moist Crumb Recipe",
    "metaTitle": "Olive Oil Orange Cake: A Moist Crumb Recipe",
    "metaDescription": "Oil quantity, orange zest and juice, a crumb that stays moist for days at room temperature, and a simple glaze — one specific olive oil orange cake recipe.",
    "focusKeyword": "olive oil orange cake",
    "relatedKeywords": [
      "olive oil orange cake recipe",
      "moist olive oil cake",
      "orange cake with olive oil",
      "dairy-free orange cake",
      "olive oil cake glaze",
      "extra virgin olive oil cake",
      "orange zest cake recipe",
      "olive oil cake without butter",
      "olive oil cake that keeps well",
      "easy orange olive oil cake"
    ],
    "category": "Baking with olive oil",
    "tags": [
      "orange cake",
      "baking",
      "dessert",
      "extra virgin"
    ],
    "h1": "Olive Oil Orange Cake: A Recipe for a Moist Crumb",
    "excerpt": "One specific cake, not the general butter-to-oil conversion: how much extra virgin olive oil goes into the batter, how the zest and juice carry the orange flavour, and why the crumb stays moist for days without the fridge.",
    "keyTakeaway": "This is one cake, not the general baking substitution: 180 ml extra virgin olive oil, orange zest rubbed into the sugar, juice in the batter, baked plain and finished with a citrus glaze or a dusting of icing sugar. The oil is what keeps the crumb moist at room temperature for days.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilOrangeCakeHero",
      "alt": "Dark glass bottles moving along a filling line under stainless steel filling heads"
    },
    "ogImage": "/og/blog-olive-oil-orange-cake.jpg",
    "intro": [
      "This cake is built around one fat from the start rather than a butter recipe adjusted afterward, and it holds together differently because of it: a close, moist crumb under an orange glaze, no dairy in the batter, and no fridge needed once it cools.",
      "This is one specific recipe, not the general olive-oil-for-butter ratio — for that conversion see [olive oil for cakes and baking](/blog/olive-oil-for-cakes-and-baking). Here: how much oil, how the zest and juice go in, the method, and how to finish it."
    ],
    "sections": [
      {
        "heading": "Why Oil, Not Butter, for This Cake",
        "id": "why-oil-not-butter",
        "blocks": [
          {
            "type": "p",
            "text": "Butter is roughly a fifth water, which bakes off in the oven and leaves the crumb to dry out over a day or two. Extra virgin olive oil is entirely fat, so it keeps coating the crumb after baking instead of evaporating out of it."
          },
          {
            "type": "p",
            "text": "That is a fact about this particular batter, not a general rule for swapping the two fats in any cake — the conversion ratio between butter and oil for baking more broadly is covered at [olive oil for cakes and baking](/blog/olive-oil-for-cakes-and-baking), not repeated here."
          },
          {
            "type": "image",
            "src": "pressOliveOilOrangeCakeInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "How Much Oil Goes Into the Batter",
        "id": "oil-quantity-in-the-batter",
        "blocks": [
          {
            "type": "p",
            "text": "For one 20 cm round cake: 180 ml extra virgin olive oil, 3 eggs, 220 g caster sugar, 240 g plain flour, 2 teaspoons baking powder, a pinch of salt, the zest of two oranges and 120 ml fresh orange juice."
          },
          {
            "type": "p",
            "text": "A mild extra virgin oil suits this cake better than a peppery one — the sharper the pepper note, the more it fights the orange rather than sitting underneath it. Any of this site's plain 250 ml or 500 ml bottles works; see [the products page](/products) for sizes."
          },
          {
            "type": "image",
            "src": "pressOliveOilOrangeCakeInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "Building the Orange Flavour: Zest and Juice",
        "id": "orange-zest-and-juice",
        "blocks": [
          {
            "type": "p",
            "text": "Rub the orange zest into the caster sugar with your fingertips before anything else goes in the bowl — the sugar's abrasion pulls the citrus oils out of the zest, and the mixture turns damp and fragrant within a minute."
          },
          {
            "type": "p",
            "text": "The juice replaces part of the batter's liquid rather than sitting on top as a flavouring, so it needs to go in with the eggs and oil, not stirred in at the end. Squeeze it fresh; bottled juice tastes flatter and thinner in the finished crumb."
          },
          {
            "type": "image",
            "src": "pressOliveOilOrangeCakeInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "Method: Mixing and Baking the Cake",
        "id": "method-mixing-and-baking",
        "blocks": [
          {
            "type": "p",
            "text": "This batter comes together in one bowl with a whisk, no electric mixer needed, and bakes at 170°C for about 45 minutes. Test it the ordinary way: a skewer through the centre should come out clean, not wet."
          },
          {
            "type": "ol",
            "items": [
              "Rub the orange zest into the sugar until damp and fragrant.",
              "Whisk in the eggs, oil and orange juice until smooth.",
              "Fold in the flour, baking powder and salt just until no dry streaks remain.",
              "Pour into a greased, lined 20 cm round tin.",
              "Bake at 170°C for 40–45 minutes until a skewer comes out clean.",
              "Cool in the tin for 10 minutes, then turn out onto a rack."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilOrangeCakeInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "A Simple Glaze or Icing Sugar Dusting to Finish",
        "id": "glaze-or-dusting-to-finish",
        "blocks": [
          {
            "type": "p",
            "text": "A thin glaze of icing sugar loosened with fresh orange juice, spooned over the cake once it has fully cooled, sinks slightly into the top and sets into a matte, faintly sticky finish rather than a hard shell."
          },
          {
            "type": "p",
            "text": "For a plainer finish, skip the glaze and sift icing sugar over the top just before serving — it suits a cake meant to be cut again the next day, since a glaze left on for two days turns tacky while a dusting can simply be reapplied."
          },
          {
            "type": "image",
            "src": "pressOliveOilOrangeCakeInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      },
      {
        "heading": "Why It Stays Moist for Days Without the Fridge",
        "id": "staying-moist-without-the-fridge",
        "blocks": [
          {
            "type": "p",
            "text": "Kept under a cake dome or wrapped at room temperature, this cake is still moist on day three or four, because the oil that coats the crumb does not evaporate the way butter's water content does, and does not stiffen the way chilled butter does in the fridge."
          },
          {
            "type": "p",
            "text": "Refrigerating it is unnecessary and works against the texture: a cold, oil-based crumb turns denser and loses the softness it has at room temperature, so it is worth cutting only what will be eaten within a few days rather than storing the rest cold."
          },
          {
            "type": "image",
            "src": "pressOliveOilOrangeCakeInline",
            "alt": "Olive paste coming out of a stainless mill with green oil running into the vat below"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The Short Version",
      "blocks": [
        {
          "type": "p",
          "text": "180 ml extra virgin olive oil, zest rubbed into the sugar, fresh juice in the batter, baked plain at 170°C, then finished with a citrus glaze or a dusting of icing sugar. Kept at room temperature, it stays moist for days — no fridge, no butter."
        }
      ]
    },
    "faqs": [
      {
        "q": "Can I use the general butter-to-oil baking ratio for this cake?",
        "a": "This recipe already gives you the oil quantity directly, so there is nothing to convert. For the general ratio to adapt other recipes, see [olive oil for cakes and baking](/blog/olive-oil-for-cakes-and-baking)."
      },
      {
        "q": "Can I use an infused olive oil instead of plain?",
        "a": "Plain extra virgin olive oil is the better choice here; a mild one lets the orange lead. This site's infused range (thyme, blackseed, turmeric and others) is built for savoury cooking, not this cake."
      },
      {
        "q": "How long does this cake keep?",
        "a": "Well wrapped at room temperature, it stays moist for three to four days. Cut only what will be eaten soon, since the cut face dries faster than the rest of the loaf or round."
      },
      {
        "q": "Do I need to refrigerate this cake?",
        "a": "No. The fridge is not necessary and works against the texture — a chilled, oil-based crumb turns denser than one left at room temperature under a cover or cake dome."
      },
      {
        "q": "Do I need an electric mixer for this recipe?",
        "a": "No. The batter comes together with a whisk and a bowl — rub the zest into the sugar by hand, then whisk in the wet ingredients and fold through the dry ones."
      },
      {
        "q": "Can I substitute another citrus for the orange?",
        "a": "Lemon or a mix of orange and lemon works in the same quantities; lemon alone gives a sharper, less sweet cake, so taste the batter before assuming the sugar needs no adjustment."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, the size this recipe's 180 ml comes from."
      },
      {
        "label": "Olive oil for cakes and baking",
        "path": "blog/olive-oil-for-cakes-and-baking",
        "description": "The general butter-to-oil conversion ratio for baking, for adapting other recipes."
      },
      {
        "label": "Olive oil substitute: what to use instead",
        "path": "blog/olive-oil-substitute-what-to-use-instead",
        "description": "What to reach for if a recipe calls for olive oil and the kitchen has none."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "olive-oil-vs-sesame-oil",
    "slug": "olive-oil-vs-sesame-oil",
    "seoTitle": "Olive Oil vs Sesame Oil: Two Strong Flavours, One Job Each",
    "metaTitle": "Olive Oil vs Sesame Oil: Two Strong Flavours, One Job Each",
    "metaDescription": "Flavour, toasted vs light sesame oil, raw finish vs cooking, and where olive oil fits a kitchen that already uses sesame oil — not a swap.",
    "focusKeyword": "olive oil vs sesame oil",
    "relatedKeywords": [
      "olive oil vs sesame oil",
      "sesame oil vs olive oil for stir-fry",
      "toasted sesame oil vs light sesame oil",
      "olive oil or sesame oil for cooking",
      "sesame oil smoke point",
      "can you substitute olive oil for sesame oil",
      "olive oil and sesame oil together",
      "best oil for stir-fry",
      "sesame oil finishing oil",
      "olive oil raw drizzle"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "sesame oil",
      "stir-fry",
      "raw drizzle",
      "extra virgin"
    ],
    "h1": "Olive Oil vs Sesame Oil: Two Strong Flavours, One Job Each",
    "excerpt": "Olive oil and sesame oil are both strong-flavoured, both used raw and both used to cook, and a lot of Malaysian kitchens already keep both. This is where each one wins, not which one replaces the other.",
    "keyTakeaway": "Olive oil and sesame oil are both strong, distinct-flavoured oils used raw and in cooking, but they rarely do the same job. Toasted sesame oil finishes a stir-fry or noodle dish off the heat; olive oil suits a raw drizzle or a moderate sauté. Most kitchens keep both rather than choosing one.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilVsSesameOilHero",
      "alt": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset"
    },
    "ogImage": "/og/blog-olive-oil-vs-sesame-oil.jpg",
    "intro": [
      "Two oils with strong, distinct flavours turn up in a lot of Malaysian kitchens at once, and neither erases the need for the other.",
      "This is where each one earns its place: flavour, toasted sesame oil against the light version, raw finish against cooking, and how olive oil fits a kitchen that already keeps sesame oil."
    ],
    "sections": [
      {
        "heading": "Two flavours that do not compete",
        "id": "flavour-first",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin olive oil tastes of the fruit it was pressed from — grassy, peppery or mild depending on the harvest. Sesame oil tastes of the seed: a deep, toasted, nutty note when the seeds were roasted first, or a lighter one from raw seeds."
          },
          {
            "type": "p",
            "text": "That is the reason to keep both. A dish built around sesame oil's toasted aroma falls flat with olive oil in its place, and hummus wants olive oil's fruit and pepper, not a nutty note."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSesameOilInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "Toasted and light sesame oil are two different products",
        "id": "toasted-vs-light-sesame-oil",
        "blocks": [
          {
            "type": "p",
            "text": "Toasted sesame oil is pressed from roasted seeds and comes out dark amber with a strong, unmistakable aroma — a finishing oil, not a cooking one. Light or raw sesame oil is pressed from unroasted seeds, pale and mild, and holds up better to heat."
          },
          {
            "type": "ul",
            "items": [
              "**Toasted sesame oil** — dark, strongly aromatic, added at the end of cooking or as a raw finish.",
              "**Light (raw) sesame oil** — pale, mild, closer to a neutral oil in a pan.",
              "Buying 'sesame oil' without checking the label leads to a burnt dish or a bland one."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSesameOilInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "Poured on at the end, not cooked from cold",
        "id": "poured-on-not-cooked-from-cold",
        "blocks": [
          {
            "type": "p",
            "text": "Toasted sesame oil is almost always finished rather than started: a few drops stirred through a stir-fry once the wok is off the heat, or drizzled over noodles just before serving. Cooked from cold, it turns bitter before the dish is done."
          },
          {
            "type": "p",
            "text": "Olive oil works both ways: a raw drizzle carries its fruit and pepper, but it also takes a moderate sauté from the start — see [olive oil smoke point](/blog/olive-oil-smoke-point-what-heat-it-can-take) for how much heat it takes."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSesameOilInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "Where olive oil fits a kitchen that already has sesame oil",
        "id": "not-a-replacement-a-different-tool",
        "blocks": [
          {
            "type": "p",
            "text": "Olive oil does not replace sesame oil in a kitchen that already keeps one — it does a different job. Sesame oil finishes a stir-fry with its own toasted note; olive oil finishes a salad or roasted vegetables with a grassy, peppery one."
          },
          {
            "type": "p",
            "text": "Both earn a place on the same shelf. For which oil suits which dish more broadly, see [how to cook with olive oil in a Malaysian kitchen](/blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen)."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSesameOilInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "Use this for that: a quick reference",
        "id": "use-this-for-that",
        "blocks": [
          {
            "type": "p",
            "text": "Most of the choice comes down to timing: whether the oil needs to survive real heat in the pan, or whether its job is to sit raw on top of a finished dish."
          },
          {
            "type": "table",
            "head": [
              "Job",
              "Reach for",
              "Why"
            ],
            "rows": [
              [
                "Finishing a stir-fry off the heat",
                "Toasted sesame oil",
                "Aroma survives only a brief brush with heat"
              ],
              [
                "Cooking in a hot wok from cold",
                "Light sesame oil or olive oil",
                "Toasted sesame oil turns bitter cooked from cold"
              ],
              [
                "A raw drizzle over hummus or roasted vegetables",
                "Olive oil",
                "Carries its own fruit and pepper on top"
              ],
              [
                "A raw finish over noodles or a stir-fry",
                "Toasted sesame oil",
                "Its nutty aroma is the point"
              ],
              [
                "A sauté that should not overpower other flavours",
                "Light sesame oil or a mild olive oil",
                "Neither one's strongest note gets in the way"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSesameOilInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      },
      {
        "heading": "How much of each you actually use",
        "id": "price-per-use-and-where-to-buy",
        "blocks": [
          {
            "type": "p",
            "text": "Toasted sesame oil is used a few drops at a time, so a small bottle lasts months. Olive oil is poured more freely and goes through faster once it earns a regular place in the same kitchen."
          },
          {
            "type": "p",
            "text": "Arabian Village extra virgin olive oil comes in 250 ml and 500 ml, sold in Malaysia only through [Berkat Madinah Store](/shop) — two branches in Selangor, plus the seller's own Shopee and TikTok Shop counters. See [the products page](/products) for sizes and pricing."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSesameOilInline",
            "alt": "Whole olives and olive leaves scattered across a wooden table"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Keep both bottles for what each does best: sesame oil, toasted especially, for a raw or barely-heated finish; olive oil for everything from a raw drizzle to a moderate sauté. Neither replaces the other — they are different tools for the same kitchen."
        }
      ]
    },
    "faqs": [
      {
        "q": "Can I use olive oil instead of sesame oil in a stir-fry?",
        "a": "Not for the finishing splash — sesame oil's toasted aroma is the point of adding it there. Olive oil can do the earlier cooking, but swap it in at the end and the dish loses the flavour it was built around."
      },
      {
        "q": "What is the difference between toasted and light sesame oil?",
        "a": "Toasted sesame oil is pressed from roasted seeds — dark, strongly aromatic, meant for finishing off the heat. Light or raw sesame oil is pressed from unroasted seeds, paler and milder, and holds up to more heat in a pan."
      },
      {
        "q": "Does sesame oil have a lower smoke point than olive oil?",
        "a": "This site has not published a smoke-point figure for sesame oil, so no number is claimed here. In practice, toasted sesame oil is treated as a low-heat finishing oil, not one poured into an empty hot pan."
      },
      {
        "q": "Which oil is better for a stir-fry, olive oil or sesame oil?",
        "a": "Neither replaces the other in the same stir-fry. Sesame oil, usually toasted, is stirred through at the very end for its aroma; olive oil suits the earlier cooking or a raw finish on a different dish."
      },
      {
        "q": "Can I mix olive oil and sesame oil in one dish?",
        "a": "Yes — a light sesame oil can carry the heat while a few drops of toasted sesame oil go in at the end for aroma, with olive oil kept for dishes built around its own fruity flavour instead."
      },
      {
        "q": "Where can I buy Arabian Village olive oil in Malaysia?",
        "a": "Through Berkat Madinah Store's two branches in Selangor, or the same seller's own Shopee and TikTok Shop counters — see the shop page for details. There is no other legitimate seller of this brand."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours and the price for each size."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Where olive oil fits alongside the oils a Malaysian kitchen already keeps, dish by dish."
      },
      {
        "label": "Olive oil and balsamic vinegar",
        "path": "blog/olive-oil-and-balsamic-vinegar",
        "description": "Another raw pairing for olive oil, for dipping and for dressing a plate."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store in Ampang Jaya and Batu Caves, plus the seller's own Shopee and TikTok Shop counters."
      }
    ]
  },
  /* ---------------- PRESS round 7 ---------------- */
  {
    "id": "olive-oil-vs-sunflower-oil",
    "slug": "olive-oil-vs-sunflower-oil",
    "seoTitle": "Olive Oil vs Sunflower Oil: Which One to Reach For",
    "metaTitle": "Olive Oil vs Sunflower Oil: Which One to Reach For",
    "metaDescription": "Flavour, smoke behaviour, what each oil suits and price per use — a plain comparison of olive oil and sunflower oil for a Malaysian kitchen.",
    "focusKeyword": "olive oil vs sunflower oil",
    "relatedKeywords": [
      "olive oil or sunflower oil for cooking",
      "olive oil vs sunflower oil price",
      "sunflower oil vs olive oil smoke point",
      "which oil is better for frying",
      "neutral oil vs olive oil",
      "olive oil for tumis",
      "sunflower oil for deep frying",
      "extra virgin olive oil vs refined oil",
      "cooking oil comparison malaysia",
      "olive oil vs sunflower oil flavour"
    ],
    "category": "Cooking with olive oil",
    "tags": [
      "sunflower oil",
      "smoke point",
      "cooking oil",
      "extra virgin"
    ],
    "h1": "Olive Oil vs Sunflower Oil: Which One to Reach For",
    "excerpt": "Sunflower oil and olive oil sit at opposite ends of the same shelf: one is bred to disappear into a dish, the other is pressed to be tasted. This is a plain comparison for the pan, not a verdict on which is better.",
    "keyTakeaway": "Sunflower oil is neutral and takes more heat before it smokes, which suits a hard fry. Extra virgin olive oil carries its own fruity or peppery flavour and suits a raw drizzle or a moderate sauté rather than a long deep-fry. The price gap tracks how each is made, not a quality claim either way.",
    "datePublished": "2026-08-26",
    "dateModified": "2026-08-26",
    "readingTime": 5,
    "hero": {
      "src": "pressOliveOilVsSunflowerOilHero",
      "alt": "Olive trees on a hillside at sunset, the grove running down towards the sea"
    },
    "ogImage": "/og/blog-olive-oil-vs-sunflower-oil.jpg",
    "intro": [
      "Sunflower oil and olive oil turn up in the same Malaysian kitchen for different reasons, and the price tag on each is the first clue: one bottle costs a few ringgit, the other several times more for the same size.",
      "This is a comparison for deciding which to reach for: flavour, how each behaves in a hot pan, what each suits, and price per use."
    ],
    "sections": [
      {
        "heading": "Flavour: neutral against fruity",
        "id": "flavour-neutral-vs-fruity",
        "blocks": [
          {
            "type": "p",
            "text": "Refined sunflower oil is bred for a mild, almost nonexistent flavour, and that neutrality is the whole point: it lets a curry paste or a fried egg taste of itself and nothing else. Extra virgin olive oil is pressed straight from the fruit, so it carries its own grassy, peppery or fruity character into whatever it touches."
          },
          {
            "type": "p",
            "text": "That is why sunflower oil disappears into a dish rather than shaping it. A peppery extra virgin can carry a plain dish on its own, but can just as easily overwhelm something already crowded with flavour."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSunflowerOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Smoke behaviour: two different ceilings",
        "id": "smoke-behaviour-and-heat",
        "blocks": [
          {
            "type": "p",
            "text": "Refined sunflower oil takes more heat before it starts to smoke than extra virgin olive oil does. Its figure sits at roughly 225°C against extra virgin's 190 to 210°C, both set out in full on [the olive oil smoke point guide](blog/olive-oil-smoke-point-what-heat-it-can-take) rather than repeated here."
          },
          {
            "type": "p",
            "text": "That gap has nothing to do with which oil is better. Sunflower oil is processed to strip out the compounds that break down first, raising the ceiling and flattening the flavour in the same step."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSunflowerOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "What each oil suits in the kitchen",
        "id": "what-each-oil-suits",
        "blocks": [
          {
            "type": "p",
            "text": "Sunflower oil's higher ceiling and quiet flavour suit sustained high heat: a proper deep-fry, a hard wok flame, or anything cooked past the point where extra virgin olive oil starts to smoke. Extra virgin suits a raw finish, a dressing, or a moderate sauté where its own flavour is meant to show."
          },
          {
            "type": "ul",
            "items": [
              "**Sunflower oil** for deep-frying, a hard wok flame, or any dish that should taste only of itself.",
              "**Extra virgin olive oil** for a raw drizzle, a dressing, or tumis at a moderate flame — see [how to cook with olive oil in a Malaysian kitchen](blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen).",
              "Neither is a one-for-one swap for the other; each does a different job in the same kitchen."
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSunflowerOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Use this for that: a quick reference",
        "id": "use-this-for-that",
        "blocks": [
          {
            "type": "p",
            "text": "Most kitchens keep both, and the choice on any given day comes down to whether the fat needs to survive a hard flame or carry its own flavour raw onto the plate once cooking is done."
          },
          {
            "type": "table",
            "head": [
              "Job",
              "Reach for",
              "Why"
            ],
            "rows": [
              [
                "Deep-frying",
                "Sunflower oil",
                "Higher smoke point, holds up under sustained heat"
              ],
              [
                "A hard wok flame",
                "Sunflower oil",
                "Neutral flavour and a wider heat margin"
              ],
              [
                "Tumis at a moderate flame",
                "Olive oil",
                "Stays under its range and carries the aromatics"
              ],
              [
                "A raw drizzle over a finished dish",
                "Olive oil",
                "Its own fruit and pepper come through"
              ],
              [
                "A salad dressing",
                "Olive oil",
                "Flavour is the point, not neutrality"
              ],
              [
                "A cake or bake wanting an invisible fat",
                "Sunflower oil",
                "Mild flavour stays out of the way"
              ]
            ]
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSunflowerOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Why the price gap exists",
        "id": "why-the-price-gap-exists",
        "blocks": [
          {
            "type": "p",
            "text": "Sunflower oil is a commodity crop oil, extracted from seed at scale and refined for a long shelf life — a process built for volume. Extra virgin olive oil is cold-pressed from fruit, with a lower yield and no refining step, which is the real source of the gap on the shelf."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSunflowerOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      },
      {
        "heading": "Price per use",
        "id": "price-per-use",
        "blocks": [
          {
            "type": "p",
            "text": "Extra virgin olive oil is normally poured in small amounts — a drizzle, a tablespoon for tumis — so a bottle stretches further than its sticker price suggests. Sizes and pricing for Arabian Village's cold-pressed extra virgin sit on [the products page](products) rather than a fixed figure here."
          },
          {
            "type": "p",
            "text": "Sunflower oil is usually cheaper and used more freely for deep-frying, so the two rarely compete for the same job. In Malaysia, Arabian Village's extra virgin comes only from [Berkat Madinah Store's two branches, its Shopee counter and its TikTok Shop](shop)."
          },
          {
            "type": "image",
            "src": "pressOliveOilVsSunflowerOilInline",
            "alt": "Pickers working through the branches during the olive harvest"
          }
        ]
      }
    ],
    "conclusion": {
      "heading": "The short version",
      "blocks": [
        {
          "type": "p",
          "text": "Reach for sunflower oil when the dish needs sustained high heat and no flavour of its own, and for extra virgin olive oil when the fat should carry its own fruit and pepper into a moderate sauté, a dressing or a finished plate. Most kitchens are better off keeping both."
        }
      ]
    },
    "faqs": [
      {
        "q": "Can I use olive oil instead of sunflower oil for deep-frying?",
        "a": "Extra virgin olive oil can be shallow-fried, but its 190–210°C range sits below refined sunflower oil's roughly 225°C, so a long deep-fry suits sunflower oil better, keeping olive oil for lower-heat cooking."
      },
      {
        "q": "Which oil has a stronger flavour, olive oil or sunflower oil?",
        "a": "Extra virgin olive oil, by a wide margin. It is pressed from fruit and carries a grassy or peppery character, while refined sunflower oil is processed specifically to taste of almost nothing."
      },
      {
        "q": "Why is olive oil so much more expensive than sunflower oil?",
        "a": "Different crop and different process: sunflower oil is extracted from seed at scale, while good extra virgin olive oil is cold-pressed from fruit with a lower yield. Neither price reflects which oil suits a given dish better."
      },
      {
        "q": "Is sunflower oil healthier than olive oil?",
        "a": "That question belongs to a doctor or dietitian, not a kitchen comparison. This article covers flavour, smoke behaviour, what each suits and price per use."
      },
      {
        "q": "What is sunflower oil's smoke point compared to olive oil's?",
        "a": "Refined sunflower oil sits at roughly 225°C. Extra virgin olive oil sits at roughly 190 to 210°C, set out in full on the site's smoke point guide rather than repeated here."
      },
      {
        "q": "Does sunflower oil work for a salad dressing the way olive oil does?",
        "a": "It works, but it will not do the same job. A dressing built on extra virgin olive oil borrows its fruit and pepper as part of the flavour; sunflower oil leaves a dressing tasting mostly of the acid and salt."
      }
    ],
    "related": [
      {
        "label": "Arabian Village extra virgin olive oil",
        "path": "products",
        "description": "Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours and the price for each size."
      },
      {
        "label": "Olive oil smoke point: what heat it can take",
        "path": "blog/olive-oil-smoke-point-what-heat-it-can-take",
        "description": "The full smoke point range for extra virgin olive oil and how it compares to refined sunflower, coconut and palm oil."
      },
      {
        "label": "How to cook with olive oil in a Malaysian kitchen",
        "path": "blog/how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "description": "Tumis, roasting and shallow-frying with extra virgin olive oil, method by method."
      },
      {
        "label": "Where to buy in Malaysia",
        "path": "shop",
        "description": "Berkat Madinah Store's two branches in Selangor, plus its own Shopee and TikTok Shop counters."
      }
    ]
  },
];
