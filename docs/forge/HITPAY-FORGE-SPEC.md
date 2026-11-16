# FORGE HITPAY: spec (2026-11-16)

One spec for 4 trees. Copies live in each repo; this copy (sihatree-platform) is the master.

| Code | Site | Tree | Branch |
|---|---|---|---|
| NT | nutratechacacia.com | `E:\sihatree-platform` | `forge-hitpay` off `r3-ecommerce-home` 4e1df27 |
| SIH | sihatree.com | `E:\sihatree-store` | `forge-hitpay` off `sihatree-oxyz` e1942fb |
| AV | avoliveoil.com | `E:\avoliveoil-v2` | `forge-hitpay` off `forge-order-r1` a4f87fa |
| NF | avoliveoil.com/noor-fes/ | `E:\noorfes-lp` | `forge-hitpay` off `master` 8fc6e2a |

## 0. Owner answers (2026-11-16, `1a 2a 3a 4a 5a 6b 7b`)
1a HitPay page shows the account name "Berkat Madinah": OK.
2a NT/SIH: HitPay offers all its methods incl. card; Stripe stays as a second card option.
3a Olive oil: flat delivery fee in the HitPay total. **Amount NOT given yet** → config value, `null` blocks go-live (see §5.6).
4a AV/NF after payment: thank-you page + email to owner + optional "send order details on WhatsApp" button.
5a Noor Fès gets HitPay too.
6b AV (and NF) checkout = online payment ONLY. The "order on WhatsApp without paying" path is removed.
7b No real-money test. Proof = live payment request created through the real flow (HitPay page opens with the right amount + methods), then the request is DELETED via API; paid path proven with recorded/simulated payloads locally.

Owner earlier (2026-11-16): "for the first 2 keep strip is ok, but i want the other things like tng, grap...etc all these options that active in hitapy account to be added in these 3 sites".

Assumed (my calls, stated to owner, not objected): HitPay only for MYR checkouts (NT USD buyers keep Stripe); no HitPay dashboard setup required; keys in env (git-ignored), panel can override on NT/SIH; notify email = the address AV contact forms already mail to.

## 1. HitPay facts (verified 2026-11-16)
- Base `https://api.hit-pay.com/v1`, header `X-BUSINESS-API-KEY`, `X-Requested-With: XMLHttpRequest`, form-urlencoded body. Key is LIVE (sandbox rejects it). Account handle `@berkat-madinah`.
- Enabled methods (API probe): `card, fpx, grabpay, grabpay_direct, grabpay_paylater, shopee_pay, touch_n_go, duitnow, wechat_pay`. We send NO `payment_methods[]` → HitPay shows every enabled method (future toggles in the dashboard apply without a deploy).
- `POST /payment-requests`: `amount` (2dp string, min 0.30), `currency=MYR`, `reference_number` (≤255), `purpose` (≤255), `name`, `email`, `phone` (E.164), `redirect_url`, `webhook`, `send_email=false`, `send_sms=false`, `allow_repeated_payments=false`, `expires_after="60 mins"`. Response: `id`, `url`, `status`.
- `GET /payment-requests/{id}`: `status` ∈ pending|completed|failed|expired|canceled|inactive, `amount`, `currency`, `reference_number`, `payments[]` (`id`, `status` succeeded…, `amount`, `currency`, `payment_type`).
- `DELETE /payment-requests/{id}` → 200 (used to cancel a superseded request and to clean up live probes).
- Webhook (legacy per-request `webhook` URL): form POST with `payment_id, payment_request_id, phone, amount, currency, status, reference_number, hmac`. hmac = `hash_hmac('sha256', implode('', ksort(map k => k.v for all fields except hmac)), SALT)` (HitPay PHP SDK `generateSignatureArray`). Docs call the param deprecated but it works and needs no dashboard step.
- Redirect: HitPay appends `reference` (request id) and `status`; **untrusted**.
- API integration: no extra fee (0.2 % applies to plugins only).

## 2. Core rule: verify by fetch (all trees)
Nothing marks an order paid except a server-side `GET /payment-requests/{id}` that returns:
`status == completed` AND `currency == MYR` AND `amount == order total (exact, sen)` AND `reference_number == our order ref` AND the request id == the one stored on our payment row AND at least one `payments[].status == succeeded`.
- The webhook and the return page are only **triggers** for that fetch. Webhook hmac is checked (`hash_equals`); a bad hmac is logged and answered 401 without fetching (stops anyone making us hammer HitPay); a good one triggers the fetch.
- The return page triggers the fetch too (customer often lands before the webhook).
- Reconcile: NT/SIH scheduled command every 5 min for hitpay payments `pending` 5 min–48 h old (cron already runs `schedule:run`). AV/NF have no cron: the status endpoint fetch + owner panel "re-check" button + a lazy sweep of ≤5 stale pending orders on each create call.
- Idempotent: marking paid twice is a no-op (NT/SIH `WebhookIngest` dedupe + `markPaid` lock; AV `UPDATE ... WHERE status='pending'` row-count check, email only when 1 row changed).
- `failed|expired|canceled` from the fetch → order failed/cancelled + stock released (NT/SIH) / AV order `failed`.
- Amount mismatch on a completed request → do NOT mark paid; mark `needs_review`, log + email owner. Never auto-refund.

## 3. Secrets
- Real values only in `C:\Users\tarek\.secrets\hitpay.env` (`HITPAY_API_KEY`, `HITPAY_SALT`) and on the servers. Never in git, tests, logs, fixtures, screenshots, docs. Tests use fake keys.
- NT: `deploy/.env.nutratech` (git-ignored) `HITPAY_API_KEY`, `HITPAY_SALT`, `HITPAY_ENABLED=true`; panel secret rows override (encrypted, existing `SecretSettings`).
- SIH: `deploy/.env.production` same three; `deploy.py env` rebuilds caches.
- AV/NF: server file `/home/madinahcom/avoliveoil-cms/hitpay.php` (outside docroot, beside `cms.sqlite`, chmod 600) returning `['api_key'=>…, 'salt'=>…]`, uploaded once by a deploy subcommand reading the local secrets file; never in `dist/`.
- Logs: never print the key/salt; request/response logs strip headers.

## 4. NT + SIH (Laravel) design
Same design both trees; new files copy, edits hand-ported (trees are NOT byte-identical; SIH has FPX processing state, 24 h hold, stricter order fallback, en/ms only).

4.1 `App\Services\Payments\HitpayGateway implements PaymentGateway` + `App\Services\Payments\HitpayClient` (Http facade, timeout 20 s, 1 retry on connect error only, base URL from config).
- `createIntent(order, payment)`: POST as §1; `reference_number = order number`; `purpose = "<Store> order <number>"`; `redirect_url = route('checkout.return', ['gw'=>'hitpay','order'=>number])` (absolute, locale-safe); `webhook = route('webhooks.hitpay')`; name/email/phone from the order (phone only if valid E.164 MY). Store request id in `payments.intent_id`, `gateway_ref` = url. Reuse: if a pending hitpay payment for the order has a request created < 50 min ago, reuse its url; else DELETE the old request (ignore 404) then create a new one.
- `capture()` = the fetch-verify of §2 (used by return page + reconcile).
- `verifyWebhook(request)`: hmac §1 over the raw form fields.
- `normaliseEvent()`: returns event id `hitpay:<payment_id or payment_request_id>:<status>` and the request id; handler always calls fetch-verify before any state change.
- `refund()`: not exposed (out of scope; owner refunds in HitPay dashboard). Throw a clear "refund in HitPay dashboard" exception; panel hides refund button for hitpay payments.

4.2 Config/registry: `config/commerce.php gateways.hitpay` = driver hitpay, `enabled` env `HITPAY_ENABLED` (default false), `requires` api_key + salt, `currencies => ['MYR']` static. `config/services.php hitpay` block (key, salt, base_url).

4.3 Migration (one, reversible, MariaDB): ALTER `payments.gateway` enum add `hitpay`; ALTER `webhook_events.gateway` enum add `hitpay`. Down: only if no hitpay rows. Check all other enum/check constraints on gateway columns (orders.payment_method? grep) and include them.

4.4 Checkout: `CheckoutController::paymentMethods` adds hitpay when ready AND currency MYR, listed FIRST and pre-selected for MYR. `startPayment()` gets a hitpay branch: redirect (303) to the HitPay url after asserting host == `checkout.hit-pay.com` (like `isPaypalUrl`). Return route `checkout/return/hitpay/{order}`: run capture → paid → thank-you; pending → thank-you in "payment processing" state that auto-refreshes (meta refresh 5 s, max 12, no inline JS — CSP); failed/expired → back to checkout with message, cart intact.
- Label (EN): "FPX, e-wallets & cards" + small text line "Touch 'n Go · GrabPay · ShopeePay · DuitNow · WeChat Pay · FPX · Visa/Mastercard — secure page by HitPay". MS: "FPX, e-dompet & kad" + same names "… — halaman selamat HitPay". NT AR: "FPX والمحافظ الإلكترونية والبطاقات" + names. No drawn third-party logos (trademark); text names + existing card/FPX marks only.
- Stripe option keeps its label; becomes second.

4.5 CSP: add `https://checkout.hit-pay.com` (and `https://*.hit-pay.com` only if the redirect chain needs it — verify with curl) to `security.php payment_hosts` (form-action).

4.6 Webhook route `POST /webhooks/hitpay` in `routes/areas/webhooks.php` (CSRF already exempt), controller `HitpayWebhookController` → verify → `WebhookIngest::run` → handler → fetch-verify. Foreign-store guard: reference_number must start with this store's order prefix else 200 + ignore (one HitPay account serves 3 sites).

4.7 Panel Payments page: HitPay tab (enabled toggle, api_key, salt as secret fields, readiness, "Test connection" = `GET /payment-requests?per_page=1` → OK/fail, never shows the key). Webhook URL shown read-only. `PanelPaymentSettings::GATEWAYS`, `GatewayKeys::FIELDS`, `SeoSettings::SECRET_KEYS['payments']` extended.

4.8 Reconcile command `payments:hitpay-reconcile` (scheduled every 5 min, `withoutOverlapping`), allow-listed in `deploy/bootstrap.php`. Also add `payments:hitpay-reconcile --dry` to allow-list.

4.9 Emails/listeners: unchanged (`OrderPaid` fires from `markPaid`). Admin order view shows gateway "HitPay" + `payment_type` (e.g. touch_n_go) stored in payment meta.

4.10 Tests (PHPUnit, Http::fake, fake keys): hmac known-vector; webhook bad hmac 401 no fetch; good hmac → fetch completed → paid once (replay no-op); amount mismatch → not paid + needs review; foreign prefix ignored; return pending/completed/failed; reconcile; USD checkout hides hitpay; MYR shows it first; startPayment redirect host guard; migration up/down. Existing payment suites stay green.

## 5. AV + NF design (PHP 8.4 + SQLite under `/api`, no cron, CSP `script-src 'self'`)
5.1 Server price table: build step writes `dist/api/_data/prices.json` = `{ "av": { "<productId>:<size>": sen, ... }, "nf": { "noor-fes:<sku>": 14900 }, "delivery_sen": { "av": <int|null>, "nf": <int|null> } }` from `src/data/storeFacts.json` + `catalogue.json` (the same source `catalog.ts` uses) and NF price from a small `server/_data/noorfes.json` (kept in AV repo; NF repo's `site.ts` price must equal it — a check script compares both and fails the build on mismatch). `_data/*.json` already blocked from HTTP by `server/.htaccess`.
- Delivery fee: `src/order/config.ts deliverySen` (AV) and `src/data/site.ts deliveryRM` (NF) stay the client display source; server uses `prices.json delivery_sen`; both come from ONE value file `server/_data/delivery.json` (AV repo) mirrored into config at build. While null → pay button disabled with "Online payment opens soon — message us on WhatsApp" + WhatsApp link (only state where WhatsApp ordering shows) and `gate:live` / deploy refuse.

5.2 SQLite migration (`db_migrations()`): table `orders` (id, ref UNIQUE `AV-YYMMDD-XXXX`/`NF-YYMMDD-XXXX`, site av|nf, status pending|paid|failed|needs_review, lines_json, subtotal_sen, delivery_sen, total_sen, name, phone, email NULL, address_json, lang, hitpay_request_id, hitpay_url, payment_type NULL, status_token (random 32 hex, for the customer status poll), created_at, paid_at, notified_at). Index on status+created_at.

5.3 Public routes in `avo_routes()` (rule 5 already sends /api/* to index.php):
- `POST /api/pay/create` (same-origin check existing, JSON body, per-IP rate limit 10/10 min, honeypot): body `{site, lang, lines:[{sku,qty}], details:{name,phone,address...,email?}}`. Server: validate (reuse rules mirrored from `core.ts validateDetails` — MY mobile, 5-digit postcode, state list; qty 1..24; unknown sku → 422), price from `prices.json`, total = Σ + delivery, ref, insert pending, POST HitPay (redirect_url = `https://avoliveoil.com/<lang>/order/paid?ref=<ref>&t=<token>` for AV, `https://avoliveoil.com/noor-fes/<lang?>/paid/?ref=..&t=..` for NF — use NF's real route shape; webhook = `https://avoliveoil.com/api/pay/webhook`), store id+url, return `{url, ref, token}`. HitPay error → order failed, 502 `{error:"pay_unavailable"}`.
- `POST /api/pay/webhook`: form-encoded (do NOT use `avo_json_body`), hmac check, fetch-verify, idempotent paid update, email owner (once, `notified_at`). Always 200 on handled/ignored, 401 bad hmac, 500 on our failure (HitPay retries).
- `GET /api/pay/status?ref=&t=`: token must match (`hash_equals`); if pending and last fetch > 10 s ago → fetch-verify; returns `{status, total_sen, lines, ref}` (no personal data beyond what the customer typed). Rate limit.
- Admin (signed-in, existing auth + CSRF): `GET /api/admin/orders` list (last 200, filter status), `POST /api/admin/orders/{ref}/recheck`. Panel page "Orders" in `admin.html`/`src/admin` (read-only table: ref, site, date MYT, name, phone, total, status, method, items; re-check button).
5.4 Email to owner on paid: existing `mailer.php` (hourly cap 40), to the forms notify address; subject `Paid order <ref> RM <total> (<site>)`; body lines, delivery, customer name/phone/address, HitPay method. Plain text.
5.5 AV front (`src/order/`): step 2 "Send on WhatsApp" replaced by "Pay RM X.XX securely" button → POST create → `location.assign(url)` (assert url host `checkout.hit-pay.com`). Remove TnG/DuitNow transfer panel code paths (6b; keep config fields harmless or delete). New page route `/en/order/paid` + `/ms/order/paid` (prerendered shell, noindex) polls status every 3 s up to 2 min: paid → "Payment received" + order summary + "Send order details on WhatsApp" (prefilled message incl. ref + "PAID via HitPay") + clears cart; pending → spinner text; failed → "Payment not completed" + "Try again" back to cart (cart kept until paid). All new code in the lazy checkout chunk / the paid page chunk — bundle gate +15 KB must stay green. `core.ts` stays import-free; message tests updated. EN + MS strings.
5.6 Copy: button EN "Pay RM {total} securely", MS "Bayar RM {total} dengan selamat"; methods line EN "FPX · Touch 'n Go · GrabPay · ShopeePay · DuitNow · WeChat Pay · cards — via HitPay", MS same names + "— melalui HitPay". Thank-you EN "Payment received — thank you!", MS "Bayaran diterima — terima kasih!".
5.7 NF front (`E:\noorfes-lp`, static Astro, external scripts only): the pay panel (TnG QR / DuitNow / "I've paid" WhatsApp receipt) replaced by "Pay RM {total} securely" → POST `/api/pay/create` with `site:"nf"` (same origin avoliveoil.com) → redirect. New `/noor-fes/paid/` page (EN/MS per NF's lang setup) polling status, then WhatsApp button to NF's own number `60182059925`. Remove null pay-slot placeholders. `npm run gate` updated; the CSP gate (no inline scripts) stays.

5.8 Tests: PHP suite (`php server/tests/run.php`) — create validation, price from table (client-sent prices ignored), unknown sku, rate limit, hmac vector, webhook bad hmac 401, good → fetch (stub HitPay via an injectable base URL pointing at a local stub server in the test router) → paid once + one email, amount mismatch → needs_review, status token mismatch 403, admin auth on orders. Node: `order.test.mjs` updated; NF `cart.test.mjs`. Walks: AV order-walk + NF walk updated to stop at the HitPay redirect (intercept, assert url host + that our create returned 200) — no live HitPay in walks.

## 6. Out of scope
Refunds via API (owner uses HitPay dashboard), HitPay recurring, new dashboard webhook-events endpoint, changing Stripe, USD via HitPay, Shopee/TikTok/Madinah buttons (unchanged), customer accounts on AV.

## 7. Go-live (needs owner go per site; AV/NF also need the delivery fee)
NT: backup → env HITPAY_* → push → migrate → readiness READY → live probe: real checkout to the HitPay page (screenshot: amount + method list) → DELETE that request → cancel the test order. SIH same. AV: delivery fee set → upload secrets file → `--skip-static --clean` deploy (noor-fes protected) → publish CMS page 2 if needsRender → live probe create → DELETE request → mark probe order failed. NF: deploy → probe same. Walks desktop + phone EN/MS (+NT AR). Local cleanup after.
