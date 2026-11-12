# FORGE ORDER-R1: on-site ordering for all products

Date: 2026-11-12. Branch: `forge-order-r1` (off `forge-products-r1`).
Reference implementation: `E:\noorfes-lp` (single product). This round ports its flow to the
React site for all 8 catalogue products.

## 0. Owner answers (2026-11-12, `1a 2a 3a 4a 5a 6a`)

| # | Decision | Status |
|---|---|---|
| 1 | Orders go to the site WhatsApp number `601111119912` (`src/utils/whatsapp.ts`) | approved |
| 2 | TnG QR / DuitNow not supplied yet: order goes to WhatsApp, payment is agreed in chat. The pay screen appears by itself once the three pay values are set | approved |
| 3 | Delivery fee is "confirmed on WhatsApp" and is not part of the total | approved |
| 4 | Orders are kept in WhatsApp only. No server storage, no PHP change, no schema change | approved |
| 5 | Madinah site / Shopee / TikTok buttons stay. "Order here" becomes the main button | approved |
| 6 | Add-to-cart on every product card and product page, cart icon in the header | approved |
| - | English + Malay, Malaysia addresses only, max 24 per line | assumed |
| - | Noor Fès stays its own page and is not in this cart | assumed |
| - | The CMS landing page (id 2) product cards also get the order button | assumed |

## 1. Current state (Source: code, confidence high)

- 8 products in `src/data/catalogue.json`; prices in `src/data/storeFacts.json` under
  `prices.products[priceKey].ml<size>` as `{amount:"59.00", display:"RM59"}`; lookup `priceOf()` in
  `src/data/products.ts`. Extra Virgin 250/500 = RM59/RM109, Organic 250/500 = RM69/RM129,
  six infused 250 = RM75.
- No cart, no localStorage use, no order storage. Buy buttons go to madinah.com.my, Shopee, TikTok
  or a bare `wa.me`.
- The app uses `createRoot` (not hydrate). Pages are prerendered by puppeteer
  (`scripts/prerender.mjs`) and served from `/_r/` on the host.
- Host CSP: `script-src 'self'`. No inline scripts, no third-party scripts.
- Bundle gate: entry, react-vendor and first-render static chunks may each grow at most 15 KB gzip.
- `check-facts --dist` requires exactly 2 Product JSON-LD nodes on the products page and 1 on each
  infused page. This round adds no JSON-LD.
- AI files say "this site has no cart" (`scripts/ai/facts-sync.mjs:301`, `public/AGENTS.md`,
  `AI-FACTS.yml`).

## 2. What the customer sees

1. Every product card and product page has **Add to cart**. Products with two sizes show a size
   choice (250 ml / 500 ml) with the price of each; one-size products add directly.
2. The header shows a cart icon with the item count. It opens the **cart drawer**: one line per
   product + size, with minus / quantity / plus, Remove, line total, subtotal, "Delivery: confirmed
   on WhatsApp", total, and **Checkout**.
3. **Checkout step 1, details**: name, phone, address, postcode, city, state, optional note.
   Same validation rules as Noor Fès (section 4).
4. **Step 2**:
   - Pay values missing (today): a **review** panel: order ref, lines, total, the line "We confirm
     delivery and payment with you on WhatsApp", and the button **Send order on WhatsApp**.
   - Pay values set (later): the Noor Fès pay panel (amount with Copy, ref with Copy, DuitNow block,
     TnG QR, "I have paid, send on WhatsApp").
5. **Step 3, sent**: ref, "Open WhatsApp again", "Copy order message", the message in a
   `<details>`, "Start a new order".
6. An unfinished order (step 2 or 3) reopens after a reload for 24 hours.

## 3. Architecture

All new code lives in `src/order/`. Nothing in `server/` changes.

| File | Role |
|---|---|
| `src/order/config.ts` | `ORDER_CONFIG`: whatsapp number (re-export of `WHATSAPP_NUMBER`), `maxQty: 24`, `deliveryRM: null`, `pay: {tngQrImage: null, duitnowNumber: null, accountName: null}`, `refPrefix: 'AV'`, storage keys |
| `src/order/core.ts` | Pure logic, no DOM, no React, no JSON imports. Port of `noorfes-lp/src/scripts/cart-core.ts` made multi-line. Unit tested with `node --test` |
| `src/order/catalog.ts` | `orderItems()`: flattens `PRODUCTS` × sizes into `{sku, productId, size, priceSen}` using `priceOf`. A size with a null price is not orderable |
| `src/order/store.ts` | Cart store on `useSyncExternalStore`: localStorage with memory fallback, `storage` event sync, actions `add/setQty/remove/clear`, `openCart/closeCart/openCheckout` |
| `src/order/AddToCart.tsx` | The button (+ size choice). Small, in the main bundle |
| `src/order/CartButton.tsx` | Header icon + count badge. Small, in the main bundle |
| `src/order/OrderRoot.tsx` | Mounted once in `App.tsx`. Lazy-loads the drawer and checkout chunk the first time the cart opens or a saved order must be restored |
| `src/order/CartDrawer.tsx`, `src/order/Checkout.tsx` | The lazy chunk: `<dialog>` based drawer and the 3 steps |
| `scripts/order.test.mjs` | Unit tests for `core.ts` |
| `scripts/dev/order-walk.mjs` | Puppeteer walk of the whole flow, EN + MS, desktop + phone |

### 3.1 Data model

- SKU = `<productId>:<size>`, for example `extra-virgin:500`, `blackseed:250`.
- Cart, key `avo.cart.v1`: `{"lines":[{"sku":"extra-virgin:500","qty":2}]}`. Parsing drops unknown
  SKUs, non-integer or < 1 quantities, clamps to `maxQty`, merges duplicate SKUs, keeps catalogue
  order. Any other shape is an empty cart. No expiry.
- Details, key `avo.details.v1`: the raw form values.
- Order snapshot, key `avo.order.v1`:
  `{ref, lines:[{sku, name, sizeLabel, qty, unitSen}], deliverySen: number|null, details, step: 1|2|3, lang, createdAt}`.
  The snapshot stores its own names and prices so a price change after checkout does not change an
  order already shown to the customer. `parseOrder` rejects: older than 24 h, dated more than 5 min
  in the future, any field failing validation, empty lines, more than 16 lines, unknown keys dropped.
- Money is integer sen everywhere. `toSen(amount string)` parses `"59.00"` without float maths.

### 3.2 Totals

`lineTotal = unitSen * qty`; `subtotal = sum(lineTotal)`; `total = subtotal + (deliverySen ?? 0)`.
`deliverySen === null` prints "confirmed on WhatsApp" and is left out of the total. Display format
`RM 59.00` in the cart and message (cards keep the existing `RM59` display from storeFacts).

### 3.3 WhatsApp message (one fact per line)

```
New order AV-261112-7KQ4
1. Extra Virgin Olive Oil 500 ml x 2 = RM 218.00
2. Blackseed Infused Olive Oil 250 ml x 1 = RM 75.00
Subtotal: RM 293.00
Delivery: to be confirmed
Total: RM 293.00
Payment: to be arranged on WhatsApp        (pay values missing)
Payment: Touch 'n Go / DuitNow             (pay values set)
Name: ...
Phone: +60...
Address: <address>, <postcode> <city>, <state>
Note: ...                                   (omitted when empty)
I have paid, receipt follows.               (only when pay values set)
```

- Message language follows the page language (EN / MS strings).
- Product names in the message come from the i18n name of the product, sanitised.
- Ref: `AV-YYMMDD-XXXX`, crypto-random, alphabet without I, O, 0, 1.
- URL: `https://wa.me/601111119912?text=` on touch devices,
  `https://web.whatsapp.com/send?phone=601111119912&text=` on desktop
  (`(hover: hover) and (pointer: fine)`). `encodeURIComponent` plus `'` as `%27`.
- Length cap 1800 characters for the whole URL: shorten note, then address, city, name with `...`.
  With many lines the cap can still be exceeded, so the cart allows at most **8 lines**
  (there are 10 SKUs; the 9th add shows "Cart is full: send this order first").
- The send button is a real `<a target="_blank" rel="noopener">` with the href already built.
  The click handler only changes state (cart cleared, step 3, repeat taps ignored for 2 s).

### 3.4 Validation (same as Noor Fès)

name required max 60 · phone required, Malaysian mobile
`/^(?:\+?60|0)?(1(?:[02-46-9]\d{7}|[15]\d{8}))$/`, normalised to `60...` · address required max 160 ·
postcode `^\d{5}$` · city required max 40 · state one of the 16 Malaysian states/territories ·
note optional max 200. Text is cleaned first (control and bidi characters stripped). First invalid
field gets focus; each error is tied to its field with `aria-describedby`.

## 4. Surfaces that get the button

| Surface | File | Change |
|---|---|---|
| Header | navbar component | `CartButton` beside the language switch, desktop and phone |
| Home product cards | `src/components/sections/ProductShowcase.tsx` | `AddToCart` under each of the 8 cards |
| Products page, 2 classic boxes | `src/pages/ProductsPage.tsx` | `AddToCart` with size choice in each box |
| Products page, 6 infused cards | infused card component | `AddToCart` |
| 6 infused product pages × 2 languages | `src/pages/InfusedProductPage.tsx` | `AddToCart` beside the price line; CTA section gains "Order here" first |
| Shop page | `src/pages/ShopPage.tsx` | New first card "Order here on this site" that scrolls to an order list of all 8 products; the 3 store cards stay |
| Home "Continue as Individual" modal | `src/components/sections/PurchasePath.tsx` | First option "Order here" (opens cart if not empty, else goes to `/products`); 3 store links stay |
| Article "Where to buy" | `src/pages/ArticlePage.tsx` | Unchanged link to `/shop` (the shop page now leads with ordering) |
| CMS products block (landing page id 2) | `src/cms/blocks/ProductsBlock.tsx` | `AddToCart` on each card. Landing chrome gets `CartButton` |
| Floating WhatsApp button | `WhatsAppButton.tsx` | Unchanged, but hidden while a cart/checkout dialog is open |

`AddToCart` after adding: the button shows "Added ✓" for 1.5 s, the header badge updates, and the
cart drawer opens (first add of the session only; later adds just update the badge).

## 5. Strings

All strings under a new top-level `order` block in `src/i18n/locales/{en,ms}/common.json`
(keys identical in both; the existing shape test must pass). The `order` block is registered in
`scripts/cms-build-data.mjs` page groups so the build does not fail on an ungrouped key.
No em dashes, no health claims, no typed prices in strings.

Key names the surfaces use (fixed by this spec so builders can work in parallel):
`order.add`, `order.added`, `order.chooseSize`, `order.cartLabel`, `order.cartCount`,
`order.orderHere`, `order.orderHereSub`, `order.cartFull`.

## 6. Copy and facts that must change

- Shop FAQ (`common.json` ~427-440): add ordering on this site; keep the platforms.
- `scripts/ai/facts-sync.mjs` line ~301 and its generated outputs (`AI-FACTS.yml`,
  `public/AGENTS.md`, llms files): replace "this site has no cart" with: orders can be placed on
  this site, sent by WhatsApp, delivery and payment confirmed in chat; platforms still listed.
- No new claim about delivery fee, delivery time or payment method beyond the above.

## 7. Gates

- `node --test scripts/order.test.mjs` (new): phone forms, postcode, quantity clamp, corrupted
  storage, sen maths, validation, ref format, exact EN and MS message text for both pay modes,
  URL round trip with `& # ' emoji`, 1800 cap worst case with 8 lines and every field at max
  length, snapshot rules, 24 h TTL, tampered storage.
- `npm run build:prerender` green: check-facts, check-bundles (drawer + checkout must be a lazy
  chunk), check-hydration, CMS class list, string shape.
- `scripts/dev/order-walk.mjs` on the built site: EN + MS × desktop + 390 px phone:
  add from each surface, size choice, cart maths, form errors, step 2, reload restores the same
  ref, the send href equals the expected URL and decodes to the expected message line by line,
  step 3, new order, cart with localStorage blocked, 0 console errors, no CSP violation.
- After deploy: the same walk against `https://avoliveoil.com`, plus eyes on screenshots.

## 8. Out of scope

Server-side order storage, online payment gateway, stock, delivery fee rules, discount codes,
Noor Fès in the cart, analytics tags.

## 9. Deploy

`npm run build:prerender` → `python -u scripts/ftp-deploy.py --skip-static --clean`
(`/noor-fes` and `/uploads` are in `PROTECTED`; `--clean` is required so the `/_r/` page cache is
cleared, otherwise old HTML keeps being served) → republish CMS page 2 via
`scripts/dev/publish-page-via-panel.mjs` → live walk.
