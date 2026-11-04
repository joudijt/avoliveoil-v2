# B2 — orphaned CMS keys and photo spots (FORGE PRODUCTS-R1, O-7)

Keys/spots that no longer exist after this round. Any live text or photo override stored
on the server under these ids is now dead data (the panel will not list it, no page renders it).
Integrator (O-40): list live overrides for these ids before deploy and reset/delete them.

## Text keys removed (en + ms)

| Key | Why |
|---|---|
| `productShowcase.products.{reserve,organic,classic,family,gold}.{name,description}` (10 keys) | Fake showcase products. Showcase names now come from each catalogue product's `i18n` prefix. |
| `productsPage.product.{name,tagline,description}` | Moved to `productsPage.products.organic.*` (text kept, renamed "Organic Extra Virgin Palestinian Olive Oil"). |
| `productsPage.product.highlights.{0..5}.{label,value}` | Moved to `productsPage.products.organic.highlights.*` (Type = "Organic Extra Virgin", Sizes = "250 ml & 500 ml"). |
| `productsPage.product.priceLabel` | Replaced by `productsPage.price.label`. |
| `productsPage.product.priceNote` | Replaced by `productsPage.storeNote` (`{{store}}`, `{{count}}`). |
| `productsPage.whereToBuy.hours` | Unscoped "8 am – midnight" claim. Per-branch hours come from `storeFacts.branches[].hours.displayEn/displayMs`; no-hours branches use `productsPage.whereToBuy.noHours`. |
| `contactPage.info.address.value` | Address literal ("…Ampang Jaya"). Contact page renders `CONTACT_ADDRESS` (storeFacts Ampang) now (O-37). `contactPage.info.address.label` stays. |

A live override on `productsPage.product.*` holds the OLD organic text — the new
`productsPage.products.organic.*` keys start from the built-in defaults, so nothing carries over.

## Photo spots removed

| Spot | Note |
|---|---|
| `home.showcase.reserve` | fake product |
| `home.showcase.family` | fake product |
| `home.showcase.gold` | fake product |

## Photo spots KEPT with a new meaning (check their live overrides too)

O-7 lists `home.showcase.classic` as disappearing, but O-12 keeps `home.showcase.<cmsId>` and
Extra Virgin's cmsId is `classic`, so the id survives. Same for `home.showcase.organic`.

| Spot | Was | Now |
|---|---|---|
| `home.showcase.classic` | fake "Arabian Village Classic", old tall bottle | Extra Virgin card, `product-extra-virgin` square |
| `home.showcase.organic` | fake "Organic Grove", old tall bottle | Organic Extra Virgin card, `product-organic` square |
| `home.hero.bottle`, `products.hero`, `infused.<id>.hero` ×6 | `bottle-cutout`, needsAlpha true | product squares, needsAlpha false |
| `home.bottle.pour` | `bottle-cutout` 343×1683 | `product-extra-virgin-cutout` 533×1429, needsAlpha true |

Any stored override photo on these spots replaces the new square: an old cut-out uploaded
there will now sit in a white square tile. Reset them unless the owner chose them on purpose.

## New photo spots

`home.showcase.{lavender-chamomile,blackseed,turmeric-black-pepper,rosemary-basil,fennel-anise,wild-thyme}`,
`products.classic.photo`, `products.organic.photo`.

## Kept on purpose

`bottle-cutout` stays built (`dist/cms-assets/bottle-cutout-343.webp`, asserted by
`scripts/cms-build-data.mjs`) and stays in `CMS_ASSET_NAMES`: stored landing HTML points at it
until each page is re-rendered (O-11).
