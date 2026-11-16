# FORGE BUY-NOW: rulings (2026-11-16). WIN over BUYNOW-FORGE-SPEC.md. Numbers = BUYNOW-FORGE-REVIEW.md.

- B1/B2 Every cart consumer listed in the review (AV: PurchasePath, WhatsAppButton, InfusedProductPage, PaidPage "Try again", OrderRoot/bridge/App.tsx, catalog.ts, classes.ts, order.* i18n keys; NF: DailyShot, Film, HowToOrder, header count, BuyBox) is migrated. Builders grep for every cart symbol before deleting; build + tsc + gates prove none left. NF BuyBox becomes the inline package picker + "Buy now" (opens the sheet with that package selected).
- B3 Pack lines carry `bottles`; paid page, WhatsApp text, owner email, admin list show "Noor Fès, 2 bottles (500 ml each)" not "x 1". Server status/lines response includes `label` + `bottles`.
- B4 Server `create` accepts the new shape `{name, phone, address (10–300), postcode, state}` AND, for 30 days, the old multi-field shape by joining its lines + city into `address` (no silent drop). All length caps 300.
- B5 New storage keys `avo.details.v2` / `avo.draft.v1` (AV) and NF equivalents `nf.details.v2`; on load delete `avo.cart.v1`, `avo.order.v1`, `avo.details.v1` and NF old cart/details keys. v1 details are NOT migrated (address shape differs).
- B6/B7 Update `build-prices.mjs` parsing to the new `packages` array (robust parse, all three compared, fail build on mismatch); NF `site.mjs`/`gate.mjs` updated for packages; JSON-LD = Product with 3 `Offer`s (price 149/249/349, MYR, `shippingDetails` RM 10 MY). No AggregateOffer.
- B8 Idempotency: `idem` = random UUID stored with the draft; the draft key = site+sku+qty+details hash. Same draft within 20 min → same idem (server reuses pending request). Any change → new idem. NF sameOrder includes the pack id.
- M "Most popular" dropped (unsupported claim). Cards: 1 bottle RM 149 · 2 bottles RM 249 "Save RM 49" (preselected) · 3 bottles RM 349 "Best value · Save RM 98". MS: "Jimat RM 49", "Nilai terbaik · Jimat RM 98". Button/sticky text "from RM 149" stays only where no package is selected.
- M Totals: sheet fetches `/api/pay/config` fresh each time it opens (no cache across opens); `create` response `total_sen` compared to the shown total; mismatch → show the new total + "Price updated, tap Pay again" and do NOT redirect. Fee null → closed state; fee 0 → "Free delivery".
- M Pay button never disabled: tap validates, focuses first error, error summary with aria-live.
- M Use native `<dialog>` (showModal) for the sheet; history: push one state on open, popstate closes; closing by button calls history.back() once. First-tap latency: preload the sheet chunk on pointerenter/touchstart/focus of any Buy-now button.
- M CMS pages stored in the DB with old Add-to-cart markup: integrator re-renders/publishes them at deploy (page 2 + any page with a ProductsBlock); builder lists which.
- M AV FAQ + AI facts rewritten through `scripts/ai/facts-sync.mjs` sources, not the generated file.
- M Rate limit buckets per site; create 20 / 10 min / IP(/64).
- M Server rejects: pack qty ≠ 1, more than one line, AV qty outside 1..24, NF non-pack sku (aliases → pack1 qty 1).
- Tests/walks rewritten to the Buy-now flow (NF walk first-screen rule: "Buy now" visible at 360x560 instead of Add to cart).
- Minors: as written in the review, builder's call; list the ones skipped.
