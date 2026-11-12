# FORGE ORDER-R1: OVERRIDES (these WIN over the spec)

Source: hostile spec review 2026-11-12 (NOT APPROVED: 3 blockers, 11 majors). Every item below
replaces what the spec says. Builders: if an override is wrong or contradicts another, say so in
your report and pin the current behaviour; do not code around it silently.

## Bundle and strings
- **O-1** First-render JS has only ~4.3 KB gzip of headroom (cap 217,774; today 213,479). Budget for
  everything this round adds to the entry: **3 KB gzip**. Entry may hold only: `cartLite.ts`,
  `catalog.ts`, `store.ts`, `config.ts`, `AddToCart.tsx`, `CartButton.tsx`, `OrderRoot.tsx` (shell).
  Drawer, checkout, `core.ts`, all long strings = ONE lazy chunk loaded by `OrderRoot`.
- **O-2** `common.json` gets ONLY the 8 keys already added by the integrator under `order.*`
  (registered in the "Header" page group). Every other string lives in lazy TS files and is NOT
  owner-editable: `src/order/uiStrings.ts` (drawer/checkout labels, errors) and
  `src/order/messageStrings.ts` (message labels, short product names, states).
- **O-3** `core.ts` imports NOTHING (no config, no JSON, no React). All config arrives as arguments
  (`CoreConfig`). `node --test scripts/order.test.mjs` imports `../src/order/core.ts`,
  `../src/order/cartLite.ts` and `../src/order/messageStrings.ts` directly (Node 24 strips types;
  use only erasable syntax; `messageStrings.ts` may import types from `./core.ts` WITH the `.ts`
  extension and `import type`).

## Message and URL
- **O-4** No 8-line cap. All 10 SKUs may be in one cart. Message lines use a SHORT fixed name per
  product from `ORDER_NAMES[lang][productId]` (for example "Extra Virgin", "Organic Extra Virgin",
  "Infused: Blackseed"; Malay equivalents), followed by the size label. Never the owner-editable
  i18n product name.
- **O-5** `fitOrderMessage` may shorten ONLY the note. It never cuts name, address or city. If the
  URL is still over 1800 characters it returns `fits: false`; the UI then shows "Copy order
  message" as the main action plus "Open WhatsApp" (plain chat link, no text) and a one-line
  explanation. Tests must include a Chinese and a Tamil address at max length with 10 lines.
- **O-6** The message, step 2 and step 3 are rendered from `snapshot.lang` and the snapshot's own
  names and prices only. Switching site language mid-checkout does not change an existing order.

## Flow
- **O-7** Never auto-open a dialog on page load. A live snapshot shows as: header badge dot + a
  banner row at the top of the cart drawer ("Order AV-…: continue" for step 2 in transfer mode,
  "Order AV-… sent: open WhatsApp again / new order" for step 3). In chat mode (pay values
  missing) pressing "Send order on WhatsApp" goes straight to step 3.
- **O-8** Details storage `avo.details.v1` = `{savedAt, values}`; ignored and deleted when older than
  30 days. The details form shows one line: "Your details stay on this device to save you typing
  next time." with a "Forget my details" button that clears the key and the form.
- **O-9** A cart line whose SKU is unknown or has no price is dropped on parse; when that happens
  the drawer shows once: "1 item is no longer available and was removed." Step 2 shows the line
  "We confirm the final total with you on WhatsApp."
- **O-10** Phone rule accepts Malaysian mobile numbers only. This is intended (delivery is in
  Malaysia). The error text says so.
- **O-11** Store listens to `storage` and `pageshow` (back/forward cache). Steps 2 and 3 read only the
  snapshot.

## Rendering safety
- **O-12** Every `useSyncExternalStore` call has a `getServerSnapshot` and a cached, referentially
  stable `getSnapshot`. Server/first-render snapshot = empty cart, closed dialogs.
- **O-13** `orderEnabled()` is false when `isPrerender()`, on `/cms-canvas`, in CMS edit mode
  (`isCmsStatic()`), and under `renderToStaticMarkup` (no `window`). When false: `AddToCart`
  renders its button markup but clicks do nothing; `CartButton` renders with no badge; `OrderRoot`
  renders null. `ProductsBlock` in `env.mode === 'canvas'` renders the button inert.
- **O-14** The count badge renders NOTHING at count 0 and nothing until after mount, so prerendered
  and `/_r/` HTML is identical for every visitor and hydration matches.
- **O-15** `AddToCart` and any button are SIBLINGS of the card link, never inside an `<a>`
  (`ProductShowcase.tsx:83`, `InfusedCard.tsx:27`, `ProductsBlock.tsx:39` wrap the whole card in an
  anchor today: restructure so the link covers image + text and the button sits after it).
- **O-16** New classes used inside CMS blocks go in `src/cms/blocks/classes.ts` (`PRODUCTS` list);
  `npm run check:cms` must stay green.

## Dialogs
- **O-17** Dialogs use `<dialog>.showModal()`; fallback when unsupported = fixed overlay with z-index
  above the floating WhatsApp button (z-60) and the landing phone bar (z-55). `data-lenis-prevent`
  on both dialogs. One shared scroll lock helper in `src/order/scrollLock.ts` that counts lockers
  and locks via a class on `<html>` (the site's `Modal.tsx` and Navbar both write
  `body.style.overflow = ''`; do not fight them).
- **O-18** "Order here" inside the PurchasePath modal closes that modal first, then opens the cart
  (or navigates to `/{lang}/products` when the cart is empty).
- **O-19** Phone layout: inputs font-size at least 16 px, heights in `dvh`, walk also at 360x560.
  On cards, a product with two sizes does not show a select: tapping "Add to cart" reveals two
  stacked buttons "250 ml · RM59" and "500 ml · RM109" in place.
- **O-20** `CartButton` follows the navbar `darkControls` colour logic (`src/components/ui/Navbar.tsx`).

## Copy
- **O-21** Rewrite Shop FAQ answers at `common.json` ~432, 436, 440 in BOTH languages so nothing
  says rates are "shown at checkout" or implies worldwide shipping from this site's cart; state:
  order on this site (sent by WhatsApp, Malaysia delivery, fee and payment confirmed in chat) or on
  the platforms. Then regenerate: `npm run ai:facts`, `npm run build:llms`, and check
  `npm run check:ai`, `npm run check:llms`. Fix `scripts/ai/facts-sync.mjs:301` ("no cart").

## Gates (explicit; the build does NOT run all of them)
- **O-22** `npx tsc -b` · `npm run lint` · `node --test scripts/order.test.mjs` ·
  `npm run build:prerender` · `npm run check:cms` · `npm run check:hydration` · `npm run check:ai` ·
  `npm run check:llms` · `npm run sitemap:manifest` then rebuild then `npm run check:sitemap` ·
  `node scripts/dev/order-walk.mjs`.
- **O-23** Deploy: assert `/noor-fes` is in `PROTECTED` (committed in 174e518), `--dry-run` first,
  then `--skip-static --clean`.

## File ownership
| Builder | Owns (only these) |
|---|---|
| A core | `src/order/core.ts`, `src/order/messageStrings.ts`, `scripts/order.test.mjs` |
| B flow UI | `src/order/store.ts`, `src/order/OrderRoot.tsx`, `src/order/CartDrawer.tsx`, `src/order/Checkout.tsx`, `src/order/uiStrings.ts`, `src/order/scrollLock.ts`, `src/components/ui/WhatsAppButton.tsx`, `src/App.tsx` |
| C surfaces | `src/order/AddToCart.tsx`, `src/order/CartButton.tsx`, `src/components/ui/Navbar.tsx`, `src/components/sections/ProductShowcase.tsx`, `src/components/sections/InfusedCard.tsx`, `src/components/sections/PurchasePath.tsx`, `src/pages/ProductsPage.tsx`, `src/pages/InfusedProductPage.tsx`, `src/pages/ShopPage.tsx`, `src/cms/blocks/ProductsBlock.tsx`, `src/cms/blocks/classes.ts`, `src/cms/landing/LandingChrome.tsx` |
| D copy | FAQ answers in `src/i18n/locales/{en,ms}/common.json` (no key added or renamed), `scripts/ai/facts-sync.mjs`, generated AI/llms outputs |
| E walk | `scripts/dev/order-walk.mjs` |
| Integrator | `src/order/config.ts`, `src/order/cartLite.ts`, `src/order/catalog.ts`, the 8 `order.*` keys, `scripts/cms-build-data.mjs`, everything else |

## Test hooks (stable `data-testid`, on the live DOM)
`cart-button`, `cart-count`, `add-to-cart` (+ `data-sku` when one size, `data-product` always),
`add-size` (+ `data-sku`), `cart-drawer`, `cart-line` (+ `data-sku`), `line-minus`, `line-plus`,
`line-qty`, `line-remove`, `line-total`, `cart-subtotal`, `cart-total`, `cart-checkout`,
`cart-banner`, `checkout`, `field-name|phone|address|postcode|city|state|note`,
`error-<field>`, `details-next`, `forget-details`, `order-ref`, `order-total`, `send-whatsapp`
(a real `<a>`), `copy-message`, `open-whatsapp-again`, `new-order`, `message-preview`.

## Rules for all builders
Edit/Write only inside your files. Allowed commands: `npx tsc -b`, `npm run lint`,
`node --test scripts/order.test.mjs` (D may also run `npm run ai:facts`, `npm run build:llms`,
`npm run check:ai`, `npm run check:llms`). NO `npm run build`, NO dev server, NO deploy, NO git
commit, NO network calls to avoliveoil.com, never kill processes by image name. Run commands
hidden (no popup windows). Report: what you built, deviations with reasons, anything the
spec/overrides got wrong, and what the integrator must do.
