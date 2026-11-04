# FORGE PRODUCTS-R1 — OVERRIDES (these WIN over FORGE-PRODUCTS-R1-SPEC.md)

From two hostile reviews (A: §1-3,7 · B: §0,4-6,8), 2026-11-04. Every builder reads the spec, then this file; where they differ, THIS file is right.
Owner-pending items are marked ⏳ with the default in force until he answers.

## Data contracts (written by the integrator BEFORE builders start — do not change shapes, report if wrong)
- **O-1** `src/data/catalogue.json` = the ONE product list (plain JSON so `.mjs` scripts can read it). Fields: `id`, `cmsId`, `kind` (`classic`|`infused`), `image` (square stem), `sizes` (`["250","500"]` or `["250"]`), `priceKey` (`extra-virgin`|`organic`|`infused`), `slug` (infused only), `i18n` (key prefix for name/tagline). Extra Virgin has `cmsId: "classic"` (live landing references `classic`); Organic `cmsId: "organic"`; infused `cmsId` = flavour id. `src/data/products.ts` re-exports it typed; `infusedProducts.ts` stays (slug drift check) but adds `image`.
- **O-2** `storeFacts.json.prices` shape as spec §5, display WITHOUT `.00` on pages (`RM59`). Articles keep their existing house style `RM59.00` (O-31). `perLitre`/`perMl` live in `scripts/lib/price-math.mjs` (imported by TS via `src/lib/priceMath.ts` re-export and by build-llms + facts-sync) — never two copies.
- **O-3** `storeFacts.json.branches[]`: `id, labelEn, labelMs, street, postalCode, locality, region, country, mapsUrl, hours` where `hours` = `{opens, closes, days, displayEn, displayMs}` or `null`. Global `hours` block REMOVED; `isLarger` REMOVED. Company name ("Berkat Madinah Sdn. Bhd.") is NOT in `street`. ⏳ Q2 default: hours only on `ampang` + `sri-gombak`.
- **O-4** Ampang street ⏳ Q3 default = owner's new text `17-L1, Jalan Ampang Putra 6, Taman Putra Sulaiman`. Every "same road as the Ampang branch" line about the restaurant (llms en.txt:48, :693 + ms twins) is DELETED (no longer verified).
- **O-5** ⏳ Q4 default: all 5 stock the brand but copy says "Stock can vary by branch — WhatsApp first" (never "all branches carry all eight").
- **O-6** i18n key contract (B2 writes, B1 reads — names frozen):
  - `productsPage.products.extra-virgin.{name,tagline,description,imageAlt,highlights[]}` (new copy, NO organic claim, NO acidity value — EV acidity was never given; chips: Press, Harvest, Origin, Type, Sizes)
  - `productsPage.products.organic.{name,tagline,description,imageAlt,highlights[]}` (current `productsPage.product.*` text moves here; name becomes "Organic Extra Virgin Palestinian Olive Oil")
  - `productsPage.price.{label,size250,size500,inStore}` ("Price", "250 ml", "500 ml", "Price in store — ask us on WhatsApp")
  - `productsPage.storeNote` ("Sold at {{store}} — {{count}} branches in Selangor.")
  - `productsPage.whereToBuy.{noHours,mapsCta,stockNote}`
  - `infusedPage.inStoreNote` ("In store now" / "Ada di kedai") ; `infusedPage.size250` ("250 ml")
  - `productShowcase.products` DELETED; showcase names come from catalogue `i18n` prefix. `productsPage.product.*` DELETED.
  - Every new key added to the page groups in `scripts/cms-build-data.mjs` (`under(...)` lists ~:150, :158, :174) or the ungrouped-key check fails.
  - `alt.productsHero` rewritten to the EV square.
- **O-7** Old CMS keys that disappear (`productsPage.product.*`, `productShowcase.products.*`, spot ids `home.showcase.{reserve,classic,family,gold}`) → orphan list in the final report.

## Images
- **O-10** Every product photo on the site is the WHITE SQUARE (owner's words), shown in a white rounded tile — including home hero and products hero. The ONLY exception: `BottleOpening` pour animation uses `product-extra-virgin-cutout` (533×1429, transparent; neck spans x 0.31–0.68, cap top y 0.005, shoulders from y≈0.30). Box sized by HEIGHT (`h-[56vh]` + manifest aspect), stream/drops/pool recomputed from those fractions; update the note at `cms-build-data.mjs:~391`.
- **O-11** `bottle-cutout` stays BUILT: `cms-build-data.mjs` calls `stableImage('bottle-cutout')` unconditionally + a build assert that `dist/cms-assets/bottle-cutout-343.webp` exists (stored landing HTML references it until re-render).
- **O-12** Square spots: `needsAlpha: false`. Pour spot keeps `needsAlpha: true`. Spot ids: `home.hero.bottle`, `home.bottle.pour`, `home.showcase.<cmsId>` ×8, `products.hero`, `products.<cmsId>.photo` ×2 (new), `infused.<id>.hero` ×6.
- **O-13** Showcase (8 cards): `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`, `aspect-square` white tile, NO bob/rotate/drop-shadow/centre-card; name `line-clamp-2` (infused cards show the flavour-only short name — add `shortName` to each `infusedPage.products.<id>` in en/ms), size line under it, link to `/products#<id>` (classic) or the infused page. `sizes="(min-width:1024px) 260px, 45vw"`.
- **O-14** CMS ProductsBlock (`src/cms/blocks/ProductsBlock.tsx`, `classes.ts:318-334`): new `aspect-square bg-white` tile + real `sizes`; old classes KEPT in the CSS list until all stored pages re-render.
- **O-15** Lifestyle photos showing the old bottle (ScrollStory woman, WhyUs field, article images) are NOT changed — listed to owner.

## Typography
- **O-20** Fonts: Fraunces (variable, opsz+wght 400-700, latin+latin-ext — files already in `public/fonts/fraunces-*.woff2`) + Manrope (400-700, `public/fonts/manrope-*.woff2`). No Fraunces italic shipped: CMS quote blocks render upright — accepted. **Inter + Playfair files stay** (admin.css uses them). Preload `fraunces-latin` + `manrope-latin`.
- **O-21** Colour tokens: `--color-gold-ink: #8a6516` (light bg/cream/white only), `--color-gold-ink-band: #7d5b13` (on `#E8E2D7`), dark sections use `#e3b856` (`--color-gold-light`). `--color-brown-ink: #4f3b26`. Never put gold-ink on olive-dark.
- **O-22** Move `h1–h4`, `p`, `button` base rules into `@layer base`. This activates ~83 dead margin utilities in 19 files: the typography builder walks EVERY public template (home, products, infused, shop, why-us, contact, blog list, article, landing) at 1440 + 390 before/after and removes margins that now double up. Headings with `font-medium` keep 500 visually.

## Prices & gates
- **O-30** Gate `scripts/check-facts.mjs` (text scan) runs in `build` AFTER `build:llms` + `surfaces.mjs`; scans `src/`, `public/*.txt|*.md`, `AI-FACTS.yml`, `scripts/dev`, `src/admin`, `scripts/ai` (excludes `docs/`, `node_modules`, `dist`, itself). Case-insensitive. Bans: `RM103`, `RM206`, `RM0.206`, `RM3.09`, `RM6.18`, `RM12.36`, `RM1.03`, `RM30.00` within 60 chars of `litre|liter`, `Ampang Jaya`, `isLarger`, `\b(two|both|2|dua|kedua-dua)\b[^.]{0,40}\b(branch(es)?|cawangan)`, `Kedua-duanya buka`, `larger (store|branch|outlet)`, `cawangan (yang )?lebih besar`, `Persiaran Putra Sulaiman, 17-L1`. Allows `68100 Batu Caves`. **RM236 is NOT banned** (EV 250 per litre is still 236). Second step `check:facts:dist` after prerender asserts positives (`RM109`, `RM129`, `RM69` on /en/products and /ms/products; 5 branch names on /en/products).
- **O-31** Articles: every money figure incl. sen/per-ml/spoon tables recomputed from `price-math.mjs`. Correct numbers: EV 250 RM59 → RM236/L, 24 sen/ml; EV 500 RM109 → RM218/L, 22 sen/ml (21.8); two 250 = RM118 vs RM109 → RM9 gap; per-litre gap 236−218 = **RM18**; spoon 500 col (15 ml tbsp etc.) = existing 250-col unchanged, 500-col 1.09/3.27/6.54/13.08. Organic: 250 RM69 → RM276/L; 500 RM129 → RM258/L. ⏳ Q1 default: unnamed "Arabian Village oil" = Extra Virgin.
- **O-32** Article mechanics (review B): inventory via `loadArticles` → reviewed map `docs/forge/r1-article-map.{en,ms}.json` (id, field path, old snippet, new snippet) → apply exact-snippet replacements with count assert → reload + deep-compare all unmapped paths; slug/id/focusKeyword/relatedKeywords/headings byte-identical. No global regex. "the larger bottle" (size) and headings untouched.
- **O-33** Hours sentences in articles/llms/i18n name ONLY branches that have hours (default Ampang + Sri Gombak) — never "all five open 8 am".
- **O-34** Each changed article gets its own `dateModified: '2026-11-04'` (not the shared const). Then `audit-article-dates`, sitemap manifest, second build (O-41).
- **O-35** JSON-LD: `GroceryStore.location[]` per branch with `hasMap: mapsUrl` and `openingHoursSpecification` only when `hours`; seller `priceRange` "RM59–RM129"; Product per classic product (`/products` page emits 2 Products with own image + AggregateOffer); home keeps one Product (EV) — builder decides cleanest, reports; infused pages: no Product JSON-LD while price null (Search Console would flag missing offers).
- **O-36** llms tokens: `EV250 EV500 OR250 OR500 EV250_PER_L EV500_PER_L OR250_PER_L OR500_PER_L BRANCH_COUNT BRANCH_LIST BRANCH_NAMES BRANCH_NAMES_MS BRANCH_HOURS_LINE`; old `P250 P500 P250_PER_L P500_PER_L BRANCH1 BRANCH2` removed; forbidden-literal check normalises whitespace and includes every branch street + every price display. facts-sync: no sort, `TODAY` = build date param, "both branches" lines gone.
- **O-37** Contact page: address = `CONTACT_ADDRESS` (Ampang from storeFacts) not the i18n literal; map link = `branches[0].mapsUrl`; 5-branch list under it.

## Live server (integrator only — builders have NO network)
- **O-40** Before deploy, read-only: list live published+draft text overrides and image overrides for the touched keys/spots; any containing old facts or old bottle → reset via panel (report list).
- **O-41** Order: build:prerender → sitemap:manifest → build:prerender → check:sitemap → check:facts:dist → ftp-deploy `--clean` → new `scripts/dev/update-landing-r1.mjs` (login, GET /api/build, GET page, ABORT if hasUnpublished, patch en+ms strings, add `organic` to products widget ids, PUT draft with baseVersion) → `publish-page-via-panel.mjs` → re-render every dirty page in the panel → outside curl → Playwright walk → IndexNow changed URLs.
- **O-42** Resolve the 5 goo.gl links once (curl -I) and confirm each pin town matches before shipping `mapsUrl`.
