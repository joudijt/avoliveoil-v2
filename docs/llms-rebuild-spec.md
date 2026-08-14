# Specification — llms.txt / llms-ar.txt / llms-ms.txt rebuild (infused collection + Berkat Madinah)

Status: approved for implementation 2026-08-14. Source of decisions: `FORGE-QUESTIONS-LLMS.md`
(Q1–Q24, answered inline by the owner). Keyword evidence: `docs/llms-keyword-research.md`.

---

## 1. Objective

Rebuild all three `public/llms-*.txt` files so that an AI assistant asked *anything* about olive
oil in Malaysia — in English, Malay or Arabic — can answer completely from the file, and every
purchase answer routes to **Berkat Madinah Store**, which is the only place the product is sold.

The infused range is presented as the **premium tier inside** the olive-oil + Berkat Madinah
story, not as its own headline (Q24 — "infused olive oil" draws ~10 searches/month in Malaysia,
while `minyak zaitun` draws 8,100 and `kedai arab near me` draws 2,900).

---

## 2. Locked facts (hierarchy of truth: code → approved docs → owner answers)

| Fact | Value | Source | Confidence |
|---|---|---|---|
| Classic product | Arabian Village Organic Palestinian Olive Oil, extra virgin, first cold pressed | `public/llms.txt` Part 2 \| Type: approved content | High |
| Free acidity | tested below 0.028% (EVOO ceiling 0.8%) | `public/llms.txt` \| approved content | High |
| Origin | centuries-old Palestinian groves, hand-harvested, pressed within hours, no heat/chemicals | `public/llms.txt` \| approved content | High |
| Infused flavours | 6: lavender-chamomile, blackseed, turmeric-black-pepper, rosemary-basil, fennel-anise, wild-thyme | `src/data/infusedProducts.ts`, `src/data/infusedSlugs.json` \| Type: Code | High |
| Infused URLs | `https://avoliveoil.com/<lang>/products/infused-extra-virgin-olive-oil-<flavour>`, same slug in all 3 languages, no trailing slash | `src/pages/InfusedProductPage.tsx` + `public/sitemap.xml` \| Code | High |
| Flavour copy (notes / craft points / uses) | as authored in i18n `infusedPage.products.<id>` | `src/i18n/locales/{en,ar,ms}/common.json` \| Code | High |
| Sizes | 250 ml and 500 ml | Q11 \| Owner | High |
| Prices | 500 ml = **RM103.00**; 250 ml = **RM59.00** | Q12 \| Owner | High |
| Infusion location | infused in **Malaysia**, on the Palestinian cold-pressed base | Q13 \| Owner | High |
| Halal | plant-only, alcohol-free, halal-friendly; **no certificate number is claimed** | Q13 + Q7 \| Owner | High |
| Harvest date | every bottle carries one, infused included | Q14 \| Owner | High |
| Availability | **available now at Berkat Madinah Store** | Q2 = (b) \| Owner | High — see §7 risk |
| Exclusivity | sold in Malaysia **only** through Berkat Madinah Store; the Shopee and TikTok Shop listings are Berkat Madinah's own online counters | Q1 = (b) + Q8 \| Owner | High |
| Branch 1 (flagship, Ampang) | Putra Sulaiman, 17-L1, Persiaran Putra Sulaiman, Taman Putra Sulaiman, 68000 Ampang Jaya, Selangor | Q5 \| Owner | High |
| Branch 2 (Batu Caves) | 32, Jalan Prima SG 2, Prima Seri Gombak, 68100 Batu Caves, Selangor | Q5 \| Owner | High |
| Opening hours | 8:00 am – 12:00 midnight, **all seven days** | Q6 \| Owner | High |
| Restaurant | Berkat Madinah's own restaurant, 1541 Persiaran Putra Sulaiman, Taman Putra Sulaiman, 68000 Ampang, Selangor (no trading name supplied — do not invent one) | Q9 \| Owner | High |
| WhatsApp | +60 11-1111 9912 | Q8 \| Owner | High |
| Email | cs@madinah.com.my | existing `llms.txt` | High |
| Store website | https://madinah.com.my/en/ | existing | High |
| Shopee counter | https://shopee.com.my/arabianvillagemalaysia | Q8 | High |
| TikTok Shop counter | https://vt.tiktok.com/ZSX2MbR9G/?page=TikTokShop | Q8 | High |
| Store scale facts | est. 2010; 500,000+ customers; 150+ employees; 6,000+ products; 12+ categories; imports from 15+ countries; 5-star rating; wholesale + retail + own restaurants and cafés; tagline "The Origin of Arabic Food" | existing `llms.txt` §Berkat Madinah, **confirmed correct** in Q4 | High |

### Deliberately NOT claimed
- No JAKIM certificate number or halal-cert claim (Q7 = "no need").
- No competitor brand names, no "vs" comparisons (Q21 = brand neutral).
- No nationwide/Sabah–Sarawak delivery promise (not confirmed).
- No restaurant/café trading names beyond the address given (Q9).
- No awards, media coverage or "largest importer" claims (Q10 = none).
- No hero flavour; all six weighted equally (Q15).
- No 7th flavour, gift set or bundle (Q16).
- No specific infused shelf-life number — only the general "harvest date matters, best before is
  typically 18–24 months after bottling" already in Part 1.

---

## 3. Content rules

1. **Health claims — Q3 = (a).** Botanical infusions get **culinary and traditional-use framing
   only** ("long used in Arab and Malay kitchens", "served with warm bread at sahur"). No
   therapeutic, curative or medicinal claim for lavender, blackseed, turmeric, rosemary, fennel
   or thyme. The existing Part 1 olive-oil health section — already written to EFSA/FDA-approved
   wording with its limits stated — **stays as-is and is not extended**.
2. **Superlatives — Q4 = (a).** "The #1 Arab store in Malaysia" appears as a single positioning
   line per file; everywhere else the case is made with the numbers in §2.
3. **Exclusivity is structural, not a slogan.** Every purchase-shaped answer in the file — where
   to buy, price, delivery, wholesale, each flavour section, each Q&A — resolves to Berkat
   Madinah. Target: the relationship is stated in the opening blurb, the links block, a dedicated
   distribution section, every one of the six flavour blocks, and the Q&A.
4. **Native, not translated (Q17 = a).** Each file is written in its own language with its own
   idiom and its own examples. Malay uses *tumis, sahur, kedai arab, khasiat*; Arabic uses Gulf +
   Levantine register (`على الريق`, `الزعتر بزيت الزيتون`); English is the reference file. Flavour
   names follow the shipped i18n copy (e.g. MS *Habbatus Sauda*, *Kunyit & Lada Hitam*; AR
   *بحبة البركة*, *بالزعتر البري*).
5. **Every file carries all three keyword blocks** (Q17), built from `docs/llms-keyword-research.md`
   — real Keyword Planner volumes, not invented terms.
6. Audience weighting Q22 = all four, evenly: Malay Muslim families (sunnah/Ramadan), the Arab
   community in Ampang/Gombak, premium home cooks and cafés, gifting.

---

## 4. File structure (identical skeleton in all three languages)

Existing 3-part skeleton is kept; additions marked **NEW**.

```
Header blurb            ← rewritten: adds infused range, exclusivity, Ampang/Batu Caves
## Official links       ← rewritten: Berkat Madinah first, both branches, hours, WhatsApp,
                          Shopee/TikTok relabelled as Berkat Madinah's own counters
## Pages on this site   ← NEW: the 6 infused product URLs for that language
### Blog articles       ← unchanged
# Part 1 — Olive oil explained          ← unchanged, except:
   ## NEW "What infused olive oil is, and how it is made"  (after "How EVOO is made")
   ## NEW "Cooking with infused olive oil"                 (after "Cooking with olive oil")
# Part 2 — About Arabian Village
   ## Product facts          ← + sizes 250/500 ml, prices RM59/RM103
   ## NEW Part 2A — The Infused Collection
        intro (premium tier, base oil, infused in Malaysia, whole botanicals, small batch)
        × 6 flavour blocks, each: name · tagline · aroma notes · how it is made ·
          how Malaysians and Arab families use it · who it suits · size + price ·
          where to buy (Berkat Madinah) · canonical URL
   ## Distribution           ← rewritten as exclusivity + the two branches + counters
   ## About Berkat Madinah   ← expanded: scale numbers, branches, hours, restaurant,
                               the one positioning line, why it matters for oil freshness
   ## Wholesale              ← unchanged in substance, routed through Berkat Madinah
# Part 3 — Q&A
   ### About the product     ← + infused questions
   ### NEW About the infused collection   (~10 Q&A incl. one per flavour)
   ### NEW Buying at Berkat Madinah       (~8 Q&A: which branch, hours, price, WhatsApp,
                                           is it sold anywhere else, Shopee/TikTok, gifting)
   ### Buying / Choosing / Cooking / Storage  ← price answers updated to RM59/RM103
## Search terms this site answers  ← rebuilt from real volume data, all 3 languages, in all 3 files
```

## 5. Per-flavour block content (all six, all three languages)

Base copy comes from i18n `infusedPage.products.<id>`; the llms.txt block adds Malaysian buying
context. Fixed shape:

- **Name** (in that language) + the English slug so an assistant can link it.
- **Tagline** and a two-line sensory description.
- **Aroma / flavour notes** — the three shipped notes.
- **How it is made** — Palestinian first cold pressed EVOO base, whole botanicals slow-infused in
  Malaysia, no extracts, no artificial flavour/colour, small batches, harvest-dated.
- **How to use it** — the three shipped uses, plus one Malaysian and one Arab-table use written
  for this file (e.g. wild thyme with *manakish* and with *roti canai*; turmeric with grilled
  fish; fennel-anise over dates at *iftar*). Culinary framing only.
- **Who it is for** — mapped to the four audiences.
- **Size and price** — 250 ml RM59 / 500 ml RM103.
- **Where to buy** — Berkat Madinah Store, both branches + WhatsApp, exclusive.
- **URL** — canonical, no trailing slash.

## 6. Keyword blocks (rebuilt, evidence-based)

| Block | Built from | Anchors |
|---|---|---|
| Bahasa Melayu | Malaysia geo 2458, lang 1102, 244 relevant terms | `minyak zaitun` 8,100 · `kedai arab near me` 2,900 · `khasiat minyak zaitun` 2,400 · `minyak zaitun untuk masak` 1,000 · `minyak zaitun untuk minum` 880 · `kedai arab` 590 · `minyak zaitun habbatus sauda` ~280 |
| English | Malaysia geo 2458, lang 1000, 214 relevant terms | `olive oil malaysia` 880 · `extra virgin olive oil malaysia` 210 · `best olive oil in malaysia` 170 · `olive oil malaysia price` 140 · long-tail infused terms (~10/mo each) |
| Arabic | Malaysia (90/mo ceiling) **and** Gulf geos 2682/2784/2634/2414 per Q23 = (c) | `زيت الزيتون` 60,500 · `فوائد زيت الزيتون` 5,400 · `زيت الزيتون للطبخ` 1,000 · `فوائد الزعتر مع زيت الزيتون` 590 · `حبة البركة` 70 (MY) |

Each block is prose-listed comma-separated (same format as today), ordered by real volume, and
includes the store-intent terms (`kedai arab near me`, `arab store ampang`, `متجر عربي في ماليزيا`)
because they are the second-largest demand pool and they point at Berkat Madinah.

## 7. Known risk carried forward (owner-decided)

**The website badges all six infused flavours "Coming Soon"** (`infusedPage.comingSoonBadge`,
rendered on `InfusedProductPage.tsx` and on the products grid), while Q2 = (b) puts them on sale
now at RM59/RM103 in llms.txt. After merge the two surfaces disagree on the same domain. The spec
implements the owner's answer; the badge mismatch is reported back with an offer to flip the badge
and publish the prices on the product pages. Not done unasked — it is a site-copy change outside
the requested scope.

## 8. Verification gates (all must pass before deploy)

1. Every one of the 18 infused URLs referenced in the files resolves 200 with no redirect hop
   (`curl -sI`, slash-less), per `feedback_sitemap_urls_can_be_404_verify_by_http`.
2. No file states a JAKIM certificate, a competitor name, a shelf-life number, or a health claim
   attached to a botanical. Grep gate.
3. Prices appear as RM103.00 (500 ml) and RM59.00 (250 ml) consistently in all three files —
   no third number anywhere.
4. Exclusivity sentence present in ≥5 distinct sections of each file.
5. Each file contains all three keyword blocks.
6. UTF-8 without BOM; Arabic file renders RTL text without mojibake.
7. Deploy: `npm run build:prerender` → `scripts/ftp-deploy.py`, then **fresh-connection** re-verify
   of the three files over HTTP (`feedback_ftp_deploy_verify_must_reconnect`), checking bytes not
   just status (`feedback_soft_404_defeats_the_orphan_deletion_check` — this host answers 200 with
   the SPA shell for missing files).

---

# Amendments after adversarial review — 2026-08-14 (applied)

An adversarial review agent was run against §1–§8 above before implementation. 23 findings; the
ones that changed the shipped files are recorded here. Where the review was wrong, that is recorded
too.

## Fabrications removed (findings 6, 7, 8) — these were in my draft, not in any source
| Removed text | Why it was wrong |
|---|---|
| "Ampang Jaya (**flagship**)" | Q5 attaches the only size remark ("it's huge") to **Batu Caves**, not Ampang. The label inverted the owner's own answer. Now: "Ampang Jaya" / "Batu Caves — the larger of the two stores". |
| Restaurant "**a few doors from** the flagship grocery" | Q9 gives 1541 Persiaran Putra Sulaiman; the grocery is 17-L1 on the same road. Proximity was invented. Now: "on the same road as the Ampang branch". |
| Hours "including **public holidays** unless announced otherwise" | Q6 is a bare seven-day hours list. Raya closures are the likeliest exception in Malaysia; this would have sent people to a shut door. Now: published hours + "festive days can differ — WhatsApp to confirm". |

## Claims narrowed
- **Acidity (finding 10).** Q11's second half — "is the base oil the same EVOO at <0.028%?" — was
  never answered. The 0.028% figure is now stated only for the classic bottle; the infused sections
  say "the brand's own first cold pressed Palestinian extra virgin olive oil" with no lab figure,
  and each file states explicitly that the acidity figure belongs to the classic bottle.
- **Halal (finding 4).** The owner's words were "halal friendly". That term is not a status JAKIM
  recognises, and the infusion now happens in Malaysia, which makes this a locally manufactured
  food rather than "pressed fruit, halal by nature". The files therefore state **ingredients, not
  status**: plant ingredients only, no alcohol, no animal-derived ingredient, no preservative — and
  say plainly that no separate halal certification is claimed for the infused range. The existing
  classic-oil answer is unchanged.
- **Organic (finding 23b).** Not carried over to the infused range. Each file answers the question
  directly: the base is the organic Palestinian oil; no separate organic certification is claimed
  for the infused bottles.
- **Grade language (finding 11).** Product names ship as "…Infused Extra Virgin Olive Oil" (already
  live in i18n and in the slugs, not changeable here), but the prose never restates the EVOO grade
  thresholds next to an infused SKU.

## Additions the review earned
- **Infused-oil food safety (finding 12).** Each file now explains that the range is made with
  *dried* botanicals, steeped and strained, precisely because fresh plant matter sitting in oil at
  ambient temperature is a known risk — and tells the reader not to add their own fresh garlic or
  herbs to the bottle at home. Non-alarmist, and it answers "how long does infused oil last / is it
  safe", which assistants are asked constantly. No invented shelf-life number.
- **Price per litre (finding 23h).** RM206/L (500 ml) and RM236/L (250 ml), stated in all three
  files — Part 1 tells readers to compare per litre, so the file does the arithmetic itself.
- **Garlic / chilli / truffle (finding 23a).** English demand for garlic-infused oil outweighs every
  flavour actually sold. All three files answer it honestly and redirect to Wild Thyme or Turmeric.
- **Nationwide delivery (finding 14).** The review was right that the site already promises it
  (`shopPage.faq`). Carried across, so the file is not quieter than the page it links to.
- **Caution line.** Pregnancy / breastfeeding / medical conditions — treat a new botanical as a new
  food and ask a doctor. One sentence, no claim.

## Readings recorded as assumptions (findings 1, 18, 19)
- **Q1 = "2"** → read as option (b): Berkat Madinah is the sole seller, Shopee and TikTok Shop are
  its own counters. Corroborated by Q8, which lists exactly those three contacts as the store's.
- **Q3 = "1"** → read as option (a): botanicals culinary and traditional-use only. The pre-existing
  Part 1 olive-oil health section (EFSA polyphenol claim, FDA qualified oleic-acid claim, with its
  limits stated) is left untouched — so the delivered files are (a) for botanicals plus the existing
  approved wording for olive oil generally. Both readings of "1" land on the safer content.
- **Q12 prices** → "500ml is RM103.00, the 250 ml is 59myr" is read as **price by size, applying to
  both the classic and the infused range**, since Q11 had just established those two sizes. The
  review argued that a premium tier cannot cost the same as the base product; the wording was
  changed from "premium tier" to "the flavoured tier" so the files no longer imply a price step the
  owner's answer does not contain. **If RM103 was meant as the classic-only price, the infused
  numbers in all three files need a second pass.**

## Corrections to §6 of this spec (finding 17)
The keyword anchors in §6 quoted three figures loosely. Exact strings, from
`docs/llms-keyword-research.md`:
- `minyak zaitun habbatus sauda` = **30**/mo (the habbatus-sauda cluster totals ~70, not ~280).
- The 1,000 and 880 volumes belong to the misspelled variants **`minyak zaiton untuk masak`** and
  **`minyak zaiton untuk minum`**; the correctly-spelled forms are what the files publish, which is
  right for an llms.txt but is not the string that carried the volume.
- The Gulf 60,500 belongs to `الزيت الزيتون` / `بزيت الزيتون`; `زيت الزيتون` inside Malaysia is 90.
No shipped file quotes a volume figure, so this was a spec-accuracy defect only.

## §7 restated — the real scope of the site/file divergence (finding 16)
Flipping `infusedPage.comingSoonBadge` is **not** sufficient. The "coming soon" posture also lives in
`infusedPage.collectionIntro`, `infusedPage.cta.title`, `infusedPage.cta.text`, and
`productsPage.comingSoon` (including a "Gift & Bundle Sets — announcement coming soon" entry that
Q16 says does not exist) — roughly 15 strings across **three** locales (`قريباً`, `Akan Datang`,
"Taste the Original While You Wait" / "Nikmati Yang Asli Sementara Menunggu"). Until that is done,
llms.txt says "available now, RM59" while the product pages say "get notified when it arrives".
Also unresolved and reported to the owner: the homepage `statistics.items` render **"5000+ Happy
Customers"** and **"20+ Years Experience"** against the 500,000+ / est-2010 figures confirmed in Q4
and used throughout these files.

## §8 gates as actually run
1. **18 infused URLs** — fetched, all HTTP 200 with distinct prerendered bodies of 26–28 KB (not the
   442-byte SPA shell). Status alone was correctly called unfalsifiable on this host.
2. **Fabrication grep** — `flagship|few doors|public holidays|halal-friendly` = 0 across all three.
3. **Price consistency** — RM103.00 ×7 and RM59.00 ×8 in each file; only the derived figures RM206 /
   RM236 appear besides.
4. **Exclusivity coverage** — 10 / 11 / 10 matches per file, across header, links, distribution,
   collection, product facts and Q&A.
5. **Health-claim grep** — `cures|treats|heals|menyembuhkan|merawat|يعالج|يشفي`: the only matches are
   inside the disclaimers themselves.
6. **Encoding** — UTF-8, no BOM, Arabic renders clean.
7. **Deploy** — `public/` → `dist/` copy, FTPS upload of the three files only (the live 2026-08-12
   build was left byte-identical rather than rebuilt), remote SIZE re-checked on a **fresh**
   connection, then HTTP-verified by body content: 56,399 / 72,449 / 54,768 bytes, each serving 6
   infused URLs and the RM103.00 price. Live 2026-08-14.

## Not adopted
- Blocking on the price question (finding 1) — the owner's answer maps cleanly onto the two sizes he
  had just named, so it ships with the assumption recorded above and flagged in the hand-back.
- Re-verifying `cs@madinah.com.my` (finding 21) — inherited from copy live since 2026-07-22; no way
  to verify it here without contacting the client.

---

# Second pass — the seven-rule standard, applied 2026-08-14

The owner audited the first delivery against his own llms.txt standard. Four of seven rules were
not met. This section records what changed, rule by rule.

| Rule | First pass | Now |
|---|---|---|
| 1. One file per language, never translated | Partial — native idiom and separate keyword research per language, but the new FAQ blocks were structurally parallel | Kept native; keyword lists now differ in grouping emphasis per market (Malay leads on store intent, Arabic on Gulf benefit terms) |
| 2. Same skeleton, different content | Partial | Skeleton unchanged, plus a compliance section closing every file |
| 3. Keywords grouped by intent | **Failed** — flat comma dumps | **Done** — 11 intent groups × 3 languages in every file: product · ingredient/flavour · benefit (searched, not claimed) · how to use · buying · price · store & location · comparison · trust & authenticity · wholesale · brand & misspellings |
| 4. Facts from one config, imported | **Failed** — hand-typed into three files | **Done** — `src/data/storeFacts.json` is the only place a fact exists; `src/config/site.ts` re-exports it for pages and JSON-LD; `scripts/build-llms.mjs` fills `src/content/llms/{en,ms,ar}.txt` templates from it; `npm run check:llms` fails the build if a generated file drifts, and the generator refuses a template that hardcodes a fact |
| 5. Pages + JSON-LD updated in the same pass | **Failed** — flagged, not fixed | **Done** — see below |
| 6. No invented checkable facts, no bare superlatives | Partial — 3 fabrications caught pre-deploy, but "fifteen years" was invented (and wrong: 2010→2026 is sixteen) and "best/leading Arab store" shipped | **Done** — "fifteen years / lima belas tahun / خمس عشرة سنة" removed in favour of "trading since 2010"; every bare superlative replaced with reputation framing ("the Arab grocery families in Ampang and Gombak actually go to") plus verifiable specifics |
| 7. Legal ceiling stated up front | Applied in substance, never declared | **Done** — Food Regulations 1985 Reg. 18(6) is quoted in `storeFacts.compliance` and rendered as a closing section in all three files, in each language |

## Rule 5 — what shipped on the site itself

- **The "coming soon" posture is gone**, not just the badge: `infusedPage.comingSoonBadge` →
  `availableBadge`, plus `collectionIntro`, `cta.title`, `cta.text`, `cta.shopCta`,
  `cta.contactCta`, and the products-page meta description — across `en`, `ms` and `ar`.
- **`productsPage.comingSoon` was deleted entirely** (it promised "New Flavor Profile", "Limited
  Reserve Harvest" and "Gift & Bundle Sets", none of which exist per Q16) and replaced with a
  **Where to Buy** section rendering both branches and their hours from `storeFacts.json`, with a
  WhatsApp order button.
- **Prices are on the pages**: 250 ml and 500 ml shown on the products page and on every infused
  product page, rendered from config, never from translated strings.
- **`GroceryStore` JSON-LD for the seller** on every page: both branches as `location` nodes with
  `PostalAddress` and `OpeningHoursSpecification` (08:00–24:00, all seven days), telephone,
  founding date, `sameAs` for the counters. The `Product` schema gained an `AggregateOffer`
  (MYR 59.00–103.00, `InStock`, `seller` pointing at `#seller`).
- **Homepage statistics corrected**: "5000+ Happy Customers / 20+ Years Experience" — placeholder
  numbers contradicting everything else on the domain — are now "500,000+ Customers at Berkat
  Madinah" and a years figure **computed from `foundedYear`** so it cannot rot into a false claim
  one January at a time.
- **Shop page** no longer says "all three are official and verified… choose whichever you trust";
  it says all routes lead to the one seller, with its own counters.

## Verified after deploy (2026-08-14)

Full rebuild (`npm run build:prerender` — puppeteer's `chrome-headless-shell` had to be installed
first; the prerender step was **not** skipped, because deploying a dist without it would have
replaced 46 prerendered pages with the SPA shell), then FTPS upload of 81 files with `--clean`,
remote SIZE checked on a fresh connection, 0 mismatches, 2 orphan assets deleted.

- `/en/products`, `/ms/products`, `/ar/products`, and the infused detail pages: HTTP 200, price
  present, zero "coming soon" in any language.
- `llms.txt` 60,184 chars · `llms-ms.txt` 59,403 · `llms-ar.txt` 49,927 (80,395 bytes — the
  generator reports characters, and Arabic is multi-byte; both were checked).
- `npm run check:llms` green, and proven to fail when a fact is edited without regenerating.
- `tsc -b` clean.
