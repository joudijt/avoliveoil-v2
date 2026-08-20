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
      alt: 'A bottle of Arabian Village extra virgin olive oil standing in an olive grove at golden hour',
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
      alt: 'Fresh extra virgin olive oil being poured from a jug into a bowl beside an olive grove',
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
      alt: 'Freshly pressed extra virgin olive oil being bottled and sealed at the press',
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
      "alt": "A bottle of cold pressed olive oil beside freshly picked green olives on a stone ledge"
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
            "alt": "Olive paste being churned in a stainless steel mixer before mechanical separation at the mill"
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
            "alt": "Olive paste being churned in a stainless steel mixer before mechanical separation at the mill"
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
            "alt": "Olive paste being churned in a stainless steel mixer before mechanical separation at the mill"
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
            "alt": "Olive paste being churned in a stainless steel mixer before mechanical separation at the mill"
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
            "alt": "Olive paste being churned in a stainless steel mixer before mechanical separation at the mill"
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
            "alt": "Olive paste being churned in a stainless steel mixer before mechanical separation at the mill"
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
      "alt": "A shopper reading the back label of a dark glass bottle while comparing the best olive oil in Malaysia on a shop shelf"
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
            "alt": "Close-up of an olive oil back label showing grade, origin and date printed together"
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
            "alt": "Close-up of an olive oil back label showing grade, origin and date printed together"
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
            "alt": "Close-up of an olive oil back label showing grade, origin and date printed together"
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
            "alt": "Close-up of an olive oil back label showing grade, origin and date printed together"
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
            "alt": "Close-up of an olive oil back label showing grade, origin and date printed together"
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
            "alt": "Close-up of an olive oil back label showing grade, origin and date printed together"
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
      "alt": "A bottle of Palestinian cold-pressed extra virgin olive oil on a kitchen counter, back label facing the reader for a halal olive oil ingredient check"
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
            "alt": "Close-up of an olive oil back label showing a single-line ingredient list beside a halal mark"
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
            "alt": "Close-up of an olive oil back label showing a single-line ingredient list beside a halal mark"
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
            "alt": "Close-up of an olive oil back label showing a single-line ingredient list beside a halal mark"
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
            "alt": "Close-up of an olive oil back label showing a single-line ingredient list beside a halal mark"
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
            "alt": "Close-up of an olive oil back label showing a single-line ingredient list beside a halal mark"
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
            "alt": "Close-up of an olive oil back label showing a single-line ingredient list beside a halal mark"
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
      "alt": "Two bottles of Palestinian extra virgin olive oil beside a handwritten olive oil Malaysia price comparison on a kitchen counter"
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
            "alt": "Close-up of a 500 ml dark glass olive oil bottle with its price label and volume clearly visible"
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
            "alt": "Close-up of a 500 ml dark glass olive oil bottle with its price label and volume clearly visible"
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
            "alt": "Close-up of a 500 ml dark glass olive oil bottle with its price label and volume clearly visible"
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
            "alt": "Close-up of a 500 ml dark glass olive oil bottle with its price label and volume clearly visible"
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
            "alt": "Close-up of a 500 ml dark glass olive oil bottle with its price label and volume clearly visible"
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
            "alt": "Close-up of a 500 ml dark glass olive oil bottle with its price label and volume clearly visible"
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
      "alt": "Green-gold Palestinian olive oil poured from a bottle beside olive branches and fresh olives"
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
            "alt": "Terraced hillside olive grove with stone walls, olives being hand-picked into a cloth at harvest"
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
            "alt": "Terraced hillside olive grove with stone walls, olives being hand-picked into a cloth at harvest"
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
            "alt": "Terraced hillside olive grove with stone walls, olives being hand-picked into a cloth at harvest"
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
            "alt": "Terraced hillside olive grove with stone walls, olives being hand-picked into a cloth at harvest"
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
            "alt": "Terraced hillside olive grove with stone walls, olives being hand-picked into a cloth at harvest"
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
            "alt": "Terraced hillside olive grove with stone walls, olives being hand-picked into a cloth at harvest"
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
      }
    ]
  },
];
