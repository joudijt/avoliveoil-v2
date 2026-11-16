# FORGE BUY-NOW: lane AV handoff (2026-11-16)

Branch `forge-hitpay` (E:\avoliveoil-v2), on top of HITPAY `3ebafbe`. Scope: BUYNOW-FORGE-SPEC §1–3, §5 (AV) + RULINGS (rulings win), including the pay server for the Noor Fès packages.
No real HitPay call was made. No secret was read. Nothing was deployed or uploaded.

## CONTRACT CHANGES for the NF lane (read first)

1. **SKUs:** `noor-fes:pack1` (1 bottle, 14900), `noor-fes:pack2` (2, 24900), `noor-fes:pack3` (3, 34900). **qty must be 1.** Source: `server/_data/noorfes.json` (`packs[]` + `aliases`).
2. **Aliases (30 days, remove after 2026-12-16):** `noor-fes:500`, `NOORFES-500`, `noor-fes:NOORFES-500` → `noor-fes:pack1`, qty 1 only. An alias with qty ≠ 1 → **422 `stale_client`** (`fields.lines = "pack"`): show "This page is out of date. Please reload it and try again."
3. **One line per order:** `lines` must be an array of exactly 1 (`[{sku, qty}]`); 0 or ≥2 lines → 422 `invalid`, `fields.lines = "invalid"`. A pack with qty ≠ 1 → 422 `invalid`, `fields.lines = "pack"`. Any non-pack sku on site `nf` → 422 `unknown_sku`.
4. **Details shape:** `{name, phone, address, postcode, state}` (`address` ONE field, 10..300 characters after cleaning, line breaks allowed). No `city`, no `note`, no `email` needed (both `note` and `email` are still accepted and optional). New field code **`tooShort`** (address < 10). For 30 days the OLD shape is still accepted: when `city` is sent, the address lines and the city are joined with ", " into `address` BEFORE the 10..300 check (never silently dropped).
5. **Status lines** (`GET /api/pay/status`) now carry `label` (in the order's language, e.g. `"Noor Fès, 2 botol (500 ml setiap satu)"`) and `bottles` (pack: 1/2/3; AV: = qty): `lines: [{sku, qty, unit_sen, label, bottles}]`. Print a pack by its `label`, never "x 1".
6. **Rate limit:** create = **20 / 10 min / IP (/64) per site** (buckets `pay.create.av`, `pay.create.nf`; AV buyers no longer use up NF's allowance).
7. **HitPay `purpose`** now names the package: `Noor Fès order NF-261116-XXXX (2 bottles)`; AV: `Arabian Village order AV-… (Extra Virgin 500 ml x 2)`.
8. **Owner email / admin:** a pack line reads `1. Noor Fès, 2 bottles (500 ml each) = RM 249.00` (no "x 1"); delivery 0 prints `Free`.
9. Totals with the RM 10 panel fee: pack1/2/3 = **15900 / 25900 / 35900** sen (PHP-tested).
10. `build-prices.mjs` parses `packages` in `E:\noorfes-lp\src\data\site.ts` (tolerant of quotes, spacing, key order, trailing commas, `as const`, decimals) and fails the build when any pack's price or bottle count differs, when a pack is missing, or when site.ts lists a pack the server does not sell. NF repo absent → warning, check skipped. site.ts present but no `packages` → build fails (escape hatch `AVO_SKIP_NF_PRICE_CHECK=1`, for while the NF lane is unmerged). Current NF site.ts: `ok (site.ts packages pack1=149, pack2=249, pack3=349)`.

Unchanged: endpoints, 422/403/409/429/502/503 codes, `idem` rules (same idem + same content = same order; reuse of a pending request < 20 min), host guard `checkout.hit-pay.com`, paid return URLs.

## CMS pages to re-render at deploy (integrator)

Published page HTML is stored in the DB (`pages.published_html_json`). Products blocks there still hold the old `data-testid="add-to-cart"` / `data-cms="order.add"` markup until re-rendered. The new build id makes every published page `needsRender` in the panel, so:
- **Re-render ALL published pages** (panel: Pages → Re-render, or `POST /api/pages/{id}/html` per page). Must-haves: **landing page id 2** and **every published page with a Products block**. Landing header cart icon comes from the prerendered landing template (rebuilt at deploy), but re-rendering all is the safe step.
- Post-deploy probe: grep the served HTML of every published page for `add-to-cart`, `order.add`, `cart-button` → must be 0.
- `PRODUCTS.order.stack/note/status` and `LP_HEADER.cart` classes stay in `classes.ts` until that re-render is done; remove them next round.
- Panel → Payments: set **Delivery RM 10.00 for av AND nf** (`delivery_sen` 1000). Until then the sheet shows the closed state (WhatsApp link with product + size + qty).

## What changed (AV)

Server: `server/_lib/pay.php` (one line, packs, aliases, `stale_client`, address 10..300 + old-shape join, label/bottles, per-site limiter 20, purpose, email text), `server/_data/noorfes.json` (3 packs + alias map), `scripts/build-prices.mjs` (packs, `parseSitePackages`, `comparePackages`, `packs` map in prices.json), `scripts/copy-server.mjs` (log line).

Front (cart removed, every consumer from ruling B1):
- Deleted: `src/order/AddToCart.tsx`, `CartButton.tsx`, `CartDrawer.tsx`, `Checkout.tsx`, `OrderRoot.tsx`, `cartLite.ts`, `store.ts`; `scripts/dev/order-walk.mjs` (cart walk).
- New: `src/order/BuyNowButton.tsx` (entry; preloads the sheet chunk on pointerenter/touchstart/focus), `BuyNowRoot.tsx` (entry; mounts the lazy sheet, deletes old keys, clears a stale history flag), `BuyNowSheet.tsx` (lazy: native `<dialog>` showModal, history entry, size chips + qty stepper 1..24, short form, fresh `/api/pay/config` per open, closed state, "Free delivery" at fee 0, never-disabled Pay + aria-live error summary + focus first error, inline errors on blur, total check vs `create`), `drafts.ts` (details v2 + draft), `storage.ts` (`orderStorage` with the memory fallback, moved from store.ts).
- Rewritten: `bridge.ts` (open/close target, `loadSheet`, `preloadBuyNow`, `useBuyNowOpen`, `deleteOldOrderKeys`), `core.ts` (short form, `cleanAddress`, draft + `nextDraft`/`draftKey`/`parseDraft`, `buildEnquiryMessage`, `buildPaidMessage`; cart/order/fit code removed), `payApi.ts` (`fetchPayConfig` no cache, one-line `createPayment`, status label/bottles), `uiStrings.ts`, `messageStrings.ts`, `config.ts` (keys `avo.details.v2`, `avo.draft.v1`), `catalog.ts` (`defaultItem` = 500 ml where it exists), `PaidPage.tsx` (draft instead of the order snapshot; "Try again" reopens the sheet for the same product/size/qty; summary prints label), `paidStrings.ts`.
- Consumers: `App.tsx`, `Navbar.tsx` + `LandingChrome.tsx` (cart icon gone), `ProductsBlock.tsx`, `ProductShowcase.tsx`, `InfusedCard.tsx`, `ProductsPage.tsx`, `ShopPage.tsx`, `InfusedProductPage.tsx` (Buy now + "Order here" opens the sheet), `PurchasePath.tsx` ("Order here" → products page), `WhatsAppButton.tsx` (hidden while the sheet is open), `classes.ts` (comments), admin `api.ts` + `OrdersScreen.tsx` (pack label, "free").
- i18n `order.*`: now `buyNow` ("Buy now" / "Beli sekarang"), `orderHere`, `orderHereSub` (rewritten). `add/added/chooseSize/cartLabel/cartCount/cartFull` removed (CMS group "Order buttons" picks them up automatically).
- Copy (EN + MS): FAQ "deliver" / "payment methods" / "delivery time" (`common.json`), `src/content/llms/{en,ms}.txt` (2 places each), `scripts/ai/facts-sync.mjs` (FAQ + agent action) → regenerated `AI-FACTS.yml`, `public/*.md`, `public/llms*.txt`, `AGENTS.md`. Copy says "flat RM 10" (owner's fixed fee).
- `src/index.css`: sheet slide-up keyframes (opening only; off for prefers-reduced-motion).
- Storage (B5): on every load `avo.cart.v1`, `avo.order.v1`, `avo.details.v1` (localStorage) and `avo.cartOpened` (sessionStorage) are deleted; v1 details are NOT migrated. Draft key = FNV-1a of `[site, lang, sku, qty, details]`; same key within 20 min keeps idem/ref/token (B8). The draft holds no personal data.
- Sitemap: 18 product pages' `<main>` changed (Buy now text) → `npm run sitemap:manifest` bumped their lastmod to 2026-11-16 (`scripts/sitemap-manifest.json`, `public/sitemap.xml`).

## Tests + gates (2026-11-16)

- `php server/tests/run.php`: **85/85** (83 → 85: NF packs/aliases/totals/labels/email; address one-field + old-shape join; AV one line + qty bounds; existing cases moved to the one-line + short-form shape; rate case = 20 per site).
- `node --test scripts/order.test.mjs`: **35/35** (rewritten: short form, address 10..300, draft/idem B8, enquiry + paid messages, pack label B3, price table packs, site.ts parser incl. a 249→250 negative case, "no cart module left / entry never imports the sheet").
- `npm run build:prerender`: green (NF price check ok). `tsc -b`: clean (also inside the build).
- `npm run check:cms`: **OK**. First-render JS **216,631 B gzip** (was 217,509 B after HITPAY → **−878 B**); entry + react-vendor 116.8 KB. Lazy: BuyNowSheet 7,076 B, drafts(+core/strings shared) 5,739 B, PaidPage 3,911 B; entry-side BuyNowButton chunk 2,349 B. check-cms-classes 611/611.
- `check:hydration` clean (10 routes) · `check:sitemap` all gates (after the manifest update) · `check:ai`, `check:llms` up to date · `check:heads` 0 problems · `check:facts:dist` ok.
- Walk `scripts/dev/buynow-walk.mjs` (mock pay, `vite preview`), en+ms × 1366/390/360, 9 sections: **432 pass / 0 fail / 0 not measured**. Measured: first tap → sheet + config ≈ 150 ms; new buyer = Buy now + Pay (+ form); returning buyer = **2 taps** (Buy now → Pay → HitPay); same order again = same idem, changed qty = new idem; fees null/0/800/1000; mismatch → no redirect, new total, 2nd tap redirects; Back/X/Escape/reload history; paid page Try again → same product/size/qty; old keys deleted.
- `node scripts/dev/pay-harness.mjs --walk` (REAL PHP + local HitPay stub, RM 10 fee for av + nf): **354 pass / 0 fail** (177 per language).
- Screenshots looked at: sheet desktop (centred) + phone 390/360 (full height, Pay in view), form filled, closed state, total mismatch, paid page.

## Skipped minors / notes

- **M7 skeleton shell:** not built; chunk preload on pointerenter/touchstart/focus (ruling) + the existing "Loading…" pill. Measured ≈150 ms on local preview.
- **M6 reload on the flagged entry:** the flag is cleared and the sheet stays closed, but the pre-open entry (same URL) stays in history, so the first Back after such a reload stays on the page.
- **Escape / backdrop tap close the sheet** (spec "Esc/close"); nothing is lost (details saved on input).
- Default size = **500 ml** where a product has it (builder's call for "default size", 4a).
- M15 alias "map by qty" not done: ruling keeps aliases → pack1 qty 1; qty ≠ 1 returns `stale_client`.
- M13 "hit only after idem lookup" not done (ruling: 20 / 10 min per site); a Back-from-HitPay re-tap still counts.
- East Malaysia (Sabah, Sarawak, Labuan) pays the same RM 10 (owner: "all Malaysia"), no code change.
- `public/about.md`, `public/pricing.md` change only by the generator's date line.
- Mobile Safari / real phones not walked (puppeteer only). The live HitPay page itself is untested (stub only).

## Review fixes (review of 639a248) — supersedes the matching lines above

1. **30-day window enforced:** aliases (`noor-fes:500`, `NOORFES-500`, `noor-fes:NOORFES-500`) and the old address shape (lines + `city`) are honoured only while `now < 2026-12-17 00:00 Asia/Kuala_Lumpur` (`AVO_PAY_LEGACY_UNTIL`). After it: an alias = 422 `unknown_sku`; a body with `city` = 422 `invalid`, `fields.city = "stale"` (never silently dropped). Setting `hitpay.legacy_until` (unix seconds) overrides the date (end early / tests).
2. **Rate limit counts NEW orders only** (idem reuse and refused bodies are free): per IP (/64) 20 / 10 min per site (`pay.create.av|nf`) AND 30 / 10 min across both sites (`pay.create`). Checked right before the order INSERT.
3. **Supersede:** a NEW order looks for older `pending` orders (no review flag) of the same site + phone younger than 60 min. Each of their pending requests is GET-verified first (`avo_pay_settle`): completed = settled as paid and kept; still pending (or 404 at HitPay) = `DELETE /payment-requests/{id}` (404 ignored), request `canceled` note `superseded by <ref>`, order `failed` with `orders.note = "superseded by <ref>"` (migration **#5** `orders.note`, shown in the admin list). A DELETE HitPay refuses (5xx/network) leaves that order pending (settled normally later). HitPay is never called inside `db_tx`. Stub: `DELETE` route + `failNextDelete`.
4. Sheet pushes its history entry only for a sellable product; `BuyNowRoot` strips a `buyNow` flag on any popstate that lands on it without an open sheet (Forward).
5. Config fetch failure (network / non-200) is its own state (`data-state="error"`): "Can't load payment right now…" + **Try again** (refetch) + the WhatsApp link with product + size + qty. Only a server answer `ready:false` is "closed".
6. Sheet dismissed while `create` runs: the draft still gets ref/token, but no redirect and no state updates.
7. Total mismatch also refetches `/api/pay/config`; the server-total override is dropped once the fresh fee explains it.
8. Backdrop closes only when the press starts AND ends on the backdrop (no close on a text-selection drag out of a field).
9. Address lines join with ONE space (a line break = 1 character, as the textarea counts), so the 300 cap is the same in the field, `core.ts` and the server.

NF contract additions: `fields.city = "stale"` after 2026-12-17; aliases stop then; NEW-order limits 20/site + 30 total; an older pending NF order of the same phone (< 60 min) is cancelled at HitPay when the buyer submits a changed order.

Re-run: `php server/tests/run.php` **87/87** (+ window, supersede: verify-then-delete / paid kept / delete refused / 404 gone / other buyer untouched; rate test rewritten to NEW orders + global cap; default test phones unique per order). `node --test scripts/order.test.mjs` **35/35**. `npm run build:prerender` green, `tsc` clean, `check:cms` OK (first-render JS 211.6 KB, unchanged), `check:hydration` clean, `check:sitemap` green. `buynow-walk` (mock, en+ms × 3 viewports, new `review` section: config error + Retry, backdrop drag, Forward, close during create, mismatch refetch) **490 pass / 0 fail / 4 not measured** (backdrop drag has no backdrop on full-screen phones). `pay-harness --walk` (real PHP + stub) **354 pass / 0 fail**. Screenshot checked: config-error state (MS, 390).
