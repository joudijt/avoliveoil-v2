# FORGE BUY-NOW: spec (2026-11-16)

Builds ON TOP of FORGE HITPAY (AV `3ebafbe`, NF `28682a5`, both branch `forge-hitpay`, not yet deployed). HitPay rules (HITPAY-FORGE-SPEC/RULINGS) stay in force. Copy in `E:\noorfes-lp\docs\`.

## 0. Owner input (2026-11-16, verbatim)
- "for olive oil , and noor fes, the shipping is fixed price 10 myr for all malaysia ya. also i don't want add to cart and this things, i want to show check out directly for the products, minimise the steps of buying ya, as much as we can !. so forge it out !"
- Noor Fès packages: "RM 149 / الحبتين RM 249 / ٣ حبات RM 349" (1 bottle 149, 2 bottles 249, 3 bottles 349).
- Q7 answer: "only these packages ya" = 7a (only 1/2/3 bottle packages).
- Q1–6, Q8 not answered → my recommendations, **assumed**: 1a one product per order · 2a slide-up sheet on the same page · 3a short form · 4a Buy now opens checkout directly · 5a remove cart everywhere · 6a +RM 10 delivery on every package · 8a 3 package cards, 2 bottles pre-selected "Most popular", "Save RM 49" / "Save RM 98".
- Notify email: not given → default = AV contact-form recipient (assumed, as before).

## 1. Money
- Delivery: RM 10 (1000 sen) flat, Malaysia only, both sites. Set in the CMS panel Payments section (`delivery_sen` av=1000, nf=1000) at deploy; build must ALSO work when panel says null (pay closed state stays).
- AV prices unchanged (server table from storeFacts). Qty 1..24 of ONE product+size per order.
- NF: three server SKUs, qty always 1: `noor-fes:pack1` 14900 (1 bottle), `noor-fes:pack2` 24900 (2), `noor-fes:pack3` 34900 (3). Old `noor-fes:500` / `NOORFES-500` aliases → pack1 (kept for stale clients for 30 days; remove later). Server rejects qty ≠ 1 for packs and any other NF sku. Totals: 159 / 259 / 359 incl. delivery.
- Order message / email / admin list show the package name ("Noor Fès × 2 bottles") and bottle count.

## 2. Flow (both sites) — target 3 steps: Buy now → form → HitPay
- One component: **Buy-now sheet** (slide-up panel; full-height on phones, centred dialog ≥768 px). Focus trap, Esc/close, scroll lock (reuse `scrollLock.ts` / NF equivalent), back-button closes sheet (history state), no layout shift.
- Sheet content top→bottom: product photo + name; option picker (AV: size 250/500 ml chips + qty stepper 1..24; NF: 3 package cards); short form; price summary (items, Delivery RM 10.00, Total); **Pay RM {total} securely** button; methods line; small "Secure payment by HitPay" note.
- Short form (3a): Name, Mobile (MY), Address (one textarea, placeholder EN "House no., street, area, city" / MS "No. rumah, jalan, kawasan, bandar"), Postcode (5 digits), State (select). No email. Server + `core.ts validateDetails` + PHP mirror updated to this shape (address one field 10–300 chars; old multi-field shape no longer accepted by `create` except via the 30-day alias? NO: stale clients just get 422 → fine).
- Details remembered in local storage (`avo.details.v1`, 30 days) and prefilled next time → returning buyer = Buy now → Pay (2 taps).
- Pay button disabled until valid; inline errors on blur; the button shows a spinner while `create` runs; then redirect (host guard unchanged).
- Pay closed (panel fee null or keys missing): sheet shows the product + "Online payment opens soon — message us on WhatsApp" with a WhatsApp link that carries product + option (AV 601111119912, NF 60182059925). This is the ONLY WhatsApp ordering path left.
- Paid page unchanged (from HITPAY round) but no "clear cart"; it clears the buy-now draft instead.

## 3. AV specifics
- Remove: `AddToCart.tsx`, `CartButton.tsx`, `CartDrawer.tsx`, cart store/`cartLite.ts`, header cart icon (`Navbar.tsx`, `LandingChrome.tsx`), all "Add to cart" buttons, cart local-storage key `avo.cart.v1` (delete it on load once).
- Every place that had Add to cart gets **Buy now** (primary button): ProductsBlock (CMS), ProductShowcase, InfusedCard, ProductsPage, ShopPage, InfusedProductPage, product detail pages, landing page CMS id 2. Shop/home cards open the sheet with the default size preselected (4a).
- Madinah / Shopee / TikTok buttons unchanged.
- Bundle gate: removing the cart must make room; sheet code lazy-loaded on first Buy-now tap (tiny trigger in first render). Report bytes.
- Copy: EN "Buy now", MS "Beli sekarang". Existing FAQ / AI facts / how-to-order copy that says "add to cart" or "order on WhatsApp" → rewritten to the new flow (EN/MS), facts gate green.

## 4. NF specifics (`E:\noorfes-lp`, static Astro, external scripts only)
- Replace the cart overlay with the Buy-now sheet; every CTA (hero, BuyBox, Buy, StickyBar, FinalCta, Header) opens it.
- Package cards: "1 bottle RM 149", "2 bottles RM 249 · Save RM 49 · Most popular" (preselected), "3 bottles RM 349 · Save RM 98". MS: "1 botol", "2 botol … Jimat RM 49 · Paling popular", "3 botol … Jimat RM 98". No em dashes (NF copy rule).
- Page copy that shows a single price RM 149 → show "from RM 149" + the 3 packages where prices are listed (BuyBox, sticky bar, FAQ, meta description, JSON-LD Offer → AggregateOffer low 149 high 349 or 3 Offers).
- `site.ts`: `packages: [{id:'pack1',bottles:1,priceRM:149},{id:'pack2',bottles:2,priceRM:249},{id:'pack3',bottles:3,priceRM:349}]`, `deliveryRM: 10` (display fallback; server is truth). AV `server/_data/noorfes.json` becomes the same three packs; the cross-repo price check compares all three.

## 5. Tests / gates
- AV: `php server/tests/run.php` (packs, qty≠1 rejected, new address shape, alias→pack1, totals 159/259/359, AV qty bounds), `order.test.mjs`, build:prerender, check:cms (bundle), hydration, sitemap, facts/ai/llms, pay-harness walk updated to Buy-now flow (desktop + 390 + 360, EN/MS): measure taps from product to HitPay redirect = 2 taps + form fill.
- NF: unit, gate (CSP no-inline), walk with mocked /api (3 packages, totals, closed state, returning-buyer prefill).
- Integrator after deploy: live probe per site (create → HitPay page amount 159 for NF pack1? use NF pack2 = RM 259 and AV cheapest product + 10) → DELETE request → mark probe order failed via admin re-check.
