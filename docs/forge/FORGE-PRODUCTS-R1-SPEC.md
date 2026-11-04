# FORGE PRODUCTS-R1 — real bottles, real prices, five branches, readable type

Branch `forge-products-r1` (off `cms-landing` 3815f23, which is what is live).
Owner brief 2026-11-04 (5 points + 8 photos). Answers: `1a` (5 branches, text below),
`2a`, `3a`, `4a`, `5a`, `6a`, `7b` → picked **Fraunces + Manrope**, `8a` (deploy live).
Font demo: https://claude.ai/artifact/8jinyhWJA7VaR5kVJaziPM (option B is the target look).

Hierarchy of truth: code > this spec > chat. Grounding: 3 Explore agents 2026-11-04.

## 0. Facts (owner-given, the ONLY source for these values)

### Products (4 lines on sale)
| id (code) | Display name EN | MS | Sizes | Price | Photo |
|---|---|---|---|---|---|
| `extra-virgin` | Extra Virgin Palestinian Olive Oil | Minyak Zaitun Extra Virgin Palestin | 250 ml, 500 ml | 250 = RM59, 500 = RM109 | white bottle 500 ML |
| `organic` | Organic Extra Virgin Palestinian Olive Oil | Minyak Zaitun Extra Virgin Organik Palestin | 250 ml, 500 ml | 250 = RM69, 500 = RM129 | black bottle 250 ML |
| 6 × infused (existing ids) | "<Flavour> Infused Extra Virgin Olive Oil" (existing i18n) | existing | **250 ml only** | **none yet** (owner sets later) | own label photo each |

Owner wrote "Extra virgin RM 59 / 500 ml" twice; Q2a confirmed the second is **250 ml**.
Prices display as `RM59`, `RM109`, `RM69`, `RM129` (no `.00`, matches owner text) — amounts in schema `"59.00"` etc.

### Branches (Berkat Madinah Store) — owner text, Q1
| # | id | label EN/MS | address lines | Maps |
|---|---|---|---|---|
| 1 | `ampang` | Ampang | Berkat Madinah Sdn. Bhd., 17-L1, Jalan Ampang Putra 6, Taman Putra Sulaiman, 68000 Ampang, Selangor | https://maps.app.goo.gl/hBfeLGKFc3ff64KU8 |
| 2 | `kajang` | Kajang | Ground Floor, Unit No. PA-S-17, Pearl Avenue Shop, Jalan Pasir Emas, 43000 Kajang, Selangor | https://maps.app.goo.gl/8a3UmG5mvJfZPQETA |
| 3 | `shah-alam` | Shah Alam | No. 46, Jalan Pegaga C U12/C, Desa Alam, Seksyen U12, 40170 Shah Alam, Selangor | https://maps.app.goo.gl/hEH4rHeX2VKCupfo6 |
| 4 | `cash-and-carry` | Cash & Carry (Ampang) | 14-L1, Ampang Putra Residency, Jalan Ampang Putra, 68000 Ampang, Selangor | https://maps.app.goo.gl/G7b9FoJrVpNmf7pm8 |
| 5 | `sri-gombak` | Sri Gombak | 32, Jalan Prima SG 2, Prima Seri Gombak, 68100 Batu Caves, Selangor | https://maps.app.goo.gl/Gyix1QN7D4pqfd7r9 |

- Owner typed "Taman Putra Suliman" — the existing verified spelling `Sulaiman` is kept (typo call, mine).
- Shah Alam line was typed as "Seksyen U12: No.46, Jln Pegaga C U12/C Desa Alam, Seksyen U40170" — normalised to the row above (postcode 40170). Mine; flag in report.
- **Hours**: the old "8 am – midnight daily" was given for the 2 old branches only. Keep it as `hours` on Ampang + Sri Gombak; the 3 new branches carry `hours: null` → UI shows "Call/WhatsApp for opening hours". Never claim hours for them.
- `isLarger` is **deleted** (with 5 branches "the larger" is no longer a fact anyone gave). Every "the larger" / "two branches" / "both branches" phrase goes.
- Locality wording: everywhere says **Ampang**, never "Ampang Jaya" (postcode line also "68000 Ampang", per owner's own address).

## 1. Images (point 1)

Source photos `C:\Users\tarek\Downloads\WhatsApp Image …` → processed by integrator (rembg isnet + hole fill + original RGB; organic hand remnant clipped).
New files in `src/assets/images/` (go through `npm run images`):
- `product-<id>.png` — 1200×1200 **white square**, bottle height 86 %, centred. ids: `extra-virgin`, `organic`, `infused-<flavour id>` ×6.
- `product-extra-virgin-cutout.png` — transparent cutout, for spots that sit on the cream page (home hero, pour animation, products hero).
- `bottle-cutout.png` is **kept on disk** (live CMS pages reference `/cms-assets/bottle-cutout-343.webp` until re-rendered) but no React component may reference it after this round.

Data: `Product` type gains `image` (square) — single catalogue module `src/data/products.ts` becomes the real catalogue:
```ts
export interface CatalogueProduct { id: 'extra-virgin'|'organic'|InfusedId; kind: 'classic'|'infused'; image: string; slug?: string; sizes: Size[] }
```
Prices are NOT in this file — they come from `storeFacts.json` (§5).

Where each image goes:
| Spot | Now | After |
|---|---|---|
| Home hero (`Hero.tsx`) | bottle-cutout | `product-extra-virgin-cutout` |
| Home pour (`BottleOpening.tsx`) | bottle-cutout, aspect 343/1683 hardcoded | `product-extra-virgin-cutout`; aspect from manifest; pour stream re-tuned to the new neck position (cutout: 385×1032 at 86 %, neck centre measured, not guessed) |
| Home showcase (`ProductShowcase.tsx`) | 5 fake products | **8 real products** (2 classic + 6 infused), white square image, real name, "250 ml · 500 ml" or "250 ml", link to product page/section |
| `/products` hero | bottle-cutout | `product-extra-virgin-cutout` |
| `/products` classic block | 1 product, no image | **2 blocks** (Extra Virgin, Organic), each: square image left, text right (§2) |
| `/products` infused grid + `/products/<slug>` "other flavours" | no image | square image on top (§3) |
| `/products/<slug>` hero | bottle-cutout | that flavour's square image (in a white rounded tile) |
| CMS catalogue (`src/cms/catalogue.ts`, `scripts/cms-build-data.mjs`) | 7 items all bottle-cutout | `classic` id KEPT (live landing references it) → shows Extra Virgin square; **add `organic`**; each infused own square; `CMS_ASSET_NAMES` lists all 8 + `bottle-cutout` (kept for already-rendered pages) |
| CMS image SPOTS defaults | bottle-cutout | per spot as above; `needsAlpha` false for square spots |
| JSON-LD `Product.image` | og grove card | the product's square (absolute URL of the 1200 webp → also emit a JPEG `public/products/<id>.jpg` 1200² for crawlers) |
| Admin mock (`src/admin/__dev__/mock-api.mjs`) | bottle-cutout | updated to match (dev only) |

## 2. Product block typography + price (point 2, answer 4a)

Per classic product block, order:
1. h2 product name (display font, 32/40px)
2. kicker (body font, 13px, 600, tracking 0.16em, uppercase, `text-gold-ink`)
3. description (body 17px, line-height 1.75, `text-brown-ink`, weight 400 — **no font-light anywhere on public pages for body text**)
4. **Price box**: white card, label "Price"/"Harga", one row per size: `250 ml … RM59`, `500 ml … RM109`. Never inline in the title area.
5. store note: "Sold at Berkat Madinah Store — 5 branches in Selangor." (count from data, not typed)
6. spec chips (label 11.5px uppercase gold-ink, value 16px 600). Chips are per product (organic gets "Organic" type).

## 3. Infused cards (point 3)

Card order: **image (white square) → name → tagline → footer row: `250 ml` (bold) + small "In store now" / "Ada di kedai" with a green dot**. The old top badge is removed from cards. Price slot: when `storeFacts` infused price is null, nothing about price on the card.
Infused detail page: price line becomes "250 ml — price in store" + WhatsApp link (5a); badge moved under the price line, styled as the small note.

## 4. Branches (point 4)

- `storeFacts.json.branches` = the 5 rows above, fields: `id, labelEn, labelMs, company? , street, postalCode, locality, region, country, mapsUrl, hours: {displayEn, displayMs} | null, stocksBrand: true`.
- Global `hours` block stays for schema of the 2 branches with hours; `GroceryStore.location` emits `openingHoursSpecification` only where `hours` not null; adds `hasMap: mapsUrl`.
- `/products` where-to-buy grid: 5 cards, `sm:grid-cols-2 lg:grid-cols-3`, label in page language (`labelMs` on /ms), address, hours or "WhatsApp us for opening hours", "Open in Google Maps" link.
- Contact page: address string from storeFacts (Ampang), not i18n literal; add the full 5-branch list under it.
- `CONTACT_ADDRESS` = branch[0] (Ampang) — unchanged mechanism.
- Generators: `build-llms.mjs` gets `{{BRANCH_COUNT}}`, `{{BRANCH_LIST}}` (multi-line, all branches), `{{BRANCH_NAMES}}` ("Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) and Sri Gombak"); `BRANCH1/BRANCH2` removed and added to the forbidden-literal list for every branch street. `facts-sync.mjs`: no sort by isLarger, "both branches" lines rewritten to count-based.
- i18n: every "Both branches / Kedua-dua cawangan / Ampang Jaya or Batu Caves" string rewritten count-neutral with `{{count}}`/`{{names}}` interpolation.
- CMS landing templates (`src/admin/content/templates.ts`) + `scripts/dev/create-landing-draft.mjs`: same rewrite. **Live landing page content (server DB)** fixed through the API (draft PUT) + `publish-page-via-panel.mjs`.
- Articles: see §6.

## 5. Prices (point 5)

`storeFacts.json.prices` becomes:
```json
"prices": {
  "currency": "MYR",
  "products": {
    "extra-virgin": { "ml250": {"amount":"59.00","display":"RM59"}, "ml500": {"amount":"109.00","display":"RM109"} },
    "organic":      { "ml250": {"amount":"69.00","display":"RM69"}, "ml500": {"amount":"129.00","display":"RM129"} },
    "infused":      { "ml250": null }
  },
  "note": "Owner prices 2026-11-04. Infused 250 ml only, price not set yet — show none, never guess."
}
```
Per-litre displays are computed by a helper (`perLitre(amount, ml)`), not stored.
Consumers: ProductsPage, InfusedProductPage, ProductShowcase, SEO.tsx (`priceRange` "RM59–RM129"; Product JSON-LD per classic product with `AggregateOffer` low/high + `offerCount 2`; **infused pages emit NO Product JSON-LD until a price exists** — a Product without offers is an invalid rich result), build-llms tokens (`EV250, EV500, OR250, OR500, INFUSED_PRICE_NOTE`), facts-sync (AI-FACTS.yml prose: price by product and size; infused "250 ml, price on request in store"), surfaces (`pricing.md`, `faq.md`, `about.md`).
i18n: `seo.products.description` loses its hardcoded prices; `common.json:369` "each in 250ml and 500ml" → classic in both sizes, infused 250 ml.
Gate: extend `build-llms.mjs` forbidden literals with every price display; add `scripts/check-prices.mjs` (in `build`) that fails if `RM103`, `RM206`, `RM236` (old), "Ampang Jaya", "two branches", "both branches", "dua cawangan", "kedua-dua cawangan", "isLarger" appear anywhere in `src/` or `public/*.txt|*.md` or `AI-FACTS.yml`, and asserts positives (new prices present on /products prerender).

## 6. Articles (answer 6a) — `src/content/articles/en.ts` (10 price articles, ~37 branch articles) and `ms.ts` (14 / ~40)

- Every RM figure → new figure for the product it describes. Default reading: an unqualified "Arabian Village oil" price = **Extra Virgin** (RM59 / RM109). Organic only where the text says organic.
- Per-litre maths recomputed: EV 250 = RM236/L, EV 500 = RM218/L; Organic 250 = RM276/L, 500 = RM258/L. Two 250 ml EV = RM118 vs one 500 = RM109 → gap RM9 (not RM15/RM30). Every derived number recomputed by script, never by hand (spoon tables too).
- Every "same price for infused / price follows size only / infused in 500 ml" sentence **removed or rewritten**: infused = 250 ml, price at the store.
- Branches: "Ampang Jaya and Batu Caves" → "five branches in Selangor (Ampang, Kajang, Shah Alam, Cash & Carry in Ampang and Sri Gombak)" on first mention per article, "any of the five branches" after; "the larger" phrases deleted; "Batu Caves" kept only as the Sri Gombak postal town.
- FAQ answers + `metaDescription` + `keyTakeaway` + card descriptions included (they render as JSON-LD).
- Builders must not change any slug, heading anchor, or focus keyword.

## 7. Typography (point 2 "fonts", answer 7b → B)

- `--font-display: 'Fraunces'`, `--font-body: 'Manrope'`, self-hosted variable woff2 (latin + latin-ext) in `public/fonts`, `@font-face` after `@import 'tailwindcss'`, 2 preloads in `index.html` replaced. Playfair/Inter files deleted only after grep shows no reference (admin panel may use them — check `admin.html`/admin CSS; admin keeps its own fonts if separate).
- New text tokens: `--color-gold-ink: #8a6516` (≥4.5:1 on bg/cream), `--color-brown-ink: #4f3b26`. Public pages: every gold *text* → `text-gold-ink`; `text-brown/60|70|75` body text → `text-brown-ink`; `font-light` removed from body copy. Decorative gold (borders, dots, buttons bg) unchanged.
- Fix the cascade bug: move the `h1–h4` / `p` / `button` base rules into `@layer base` so utilities (`mt-*`, `tracking-*`, `font-body`) win.
- Scope: Products page, infused pages, home showcase first (the screens the owner circled); the token swap is site-wide in public components (articles too) — admin panel untouched.

## 8. Deploy + verify (answer 8a)

`npm run build:prerender` (all gates) → `scripts/ftp-deploy.py --clean` → re-render live landing via panel script after draft text update → outside curl of /en/products, /ms/products, 6 infused, home, 2 price articles, llms.txt, pricing.md → Playwright walk desktop 1440 + phone 390 on: home (hero, pour, showcase), /products (both blocks, price boxes, infused grid with images, 5 branches + maps links), 1 infused page, contact, landing page — screenshots looked at by eye. IndexNow for changed URLs. Memory + docs updated.
