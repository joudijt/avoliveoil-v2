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
];
