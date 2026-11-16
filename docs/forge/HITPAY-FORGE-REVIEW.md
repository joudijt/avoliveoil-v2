# HITPAY FORGE spec: hostile pre-code review (2026-11-16)

Reviewed: `docs/HITPAY-FORGE-SPEC.md` against the real code on the `forge-hitpay` branches:
NT `E:\sihatree-platform` (4e1df27), SIH `E:\sihatree-store` (e1942fb), AV `E:\avoliveoil-v2` (a4f87fa), NF `E:\noorfes-lp` (8fc6e2a).
No HitPay API call was made. No secret was read.

Severity: **BLOCKER** = money lost or go-live impossible as written. **MAJOR** = wrong behaviour or a false claim about the code that will cost a rework. **MINOR** = gap, hardening, or wording.

Summary: 3 BLOCKER, 15 MAJOR, 22 MINOR.

---

## BLOCKERS

### 1. BLOCKER: reuse/DELETE overwrites the stored request id, so a customer who pays the OLD request is charged and the order never becomes paid (NT + SIH)
Evidence:
- `app/Services/Payments/PaymentManager.php:166-197` (NT; SIH is the same). `createIntent()` reuses the ONE pending payment row for (order, gateway) and overwrites `intent_id` with whatever the gateway returns. Spec §4.1 "DELETE the old request then create a new one" therefore replaces the old request id on the same row.
- Spec §2 says paid needs "the request id == the one stored on our payment row". The old request id is no longer stored anywhere.
- NT `locatePayment()` `PaymentManager.php:833-866`: the intent-id lookup misses. The order-number fallback finds the row, and then the §2 id check refuses it.
- SIH `PaymentManager.php:~899-918` (ST1 O-7 "stricter fallback") returns NO row when the row already has an intent id. The webhook answers "no matching payment" with 200, and the event is burnt.
- The race is real. A customer at the FPX bank page, or in a second tab, completes the old request while a reload or retry DELETEs it. A DELETE does not cancel a payment that is already in flight at the bank.

Fix:
- Create one `payments` row per HitPay request, and never overwrite `intent_id`. Store `request_created_at` in `raw`/meta. The §4.1 "< 50 min" reuse rule needs it: `updated_at` moves on every save.
- Before replacing a request, call DELETE. Then always GET the old request. If it is `completed`, settle that row and do not create a new request.
- Webhook, return page and reconcile resolve the payment row by `payment_request_id`. The §2 check becomes "the request id is one we issued for THIS order", not "the latest one".
- Add a test: pay the old request after the new one was created. The order must end up paid exactly once.

### 2. BLOCKER: the return URL in §4.1 does not exist, is not signed, and the query HitPay appends would break the signature
Evidence:
- There is no `checkout.return` route that takes a `gw` parameter. The real return routes are one per gateway: `routes/areas/shop.php:53-54` (`checkout.return.stripe`, `checkout.return.paypal`, `{order:number}` binding, inside the locale groups `routes/web.php:90`).
- Return URLs are minted SIGNED and localised by `ReturnUrls` (`app/Services/Payments/ReturnUrls.php:33-87`). The reason: in-app browsers (Instagram/TikTok) come back WITHOUT the session.
- Without a signature, `OrderAccess::authorize` answers 404 (`app/Http/Controllers/Storefront/Support/OrderAccess.php:51-63`).
- HitPay appends `reference` and `status` to the redirect URL. `OrderAccess` checks `hasValidSignatureWhileIgnoring(ReturnUrls::gatewayQueryKeys())`, and that list (`ReturnUrls.php:61-64`) does not hold `reference` or `status`. So even a signed URL fails after HitPay appends its query.

Fix:
- Add the route `checkout/return/hitpay/{order:number}` named `checkout.return.hitpay` in `shop.php`.
- Add `ReturnUrls::hitpay($order)` (signed, order locale, 48 h).
- Add `reference` and `status` to `gatewayQueryKeys()`.
- `returnHitpay()` calls `OrderAccess::authorize(..., acceptSignature: true)` and ignores `reference`/`status` (untrusted).
- Test: a signed return with no session and with `?reference=x&status=completed` appended returns 302 to the thank-you page.
- Port all of this to SIH (en/ms only).

### 3. BLOCKER: AV/NF secrets file cannot be uploaded the way §3 says
Evidence:
- The only deploy channel is FTPS as `claudeoliveoil@avoliveoil.com` (`scripts/ftp-deploy.py:48-49`, `scripts/upload-one.py:22-24`), and that account's `/` is the docroot.
- `avo_data_dir()` is `dirname(DOCROOT)/avoliveoil-cms` (`server/_lib/bootstrap.php:30-49`), which is ABOVE the docroot. A "deploy subcommand" over this FTP account cannot write there, and FTP cannot chmod 600 there either.

Fix: pick one of these and write it into the spec.
- (a) Reuse the existing one-shot `_setup` token pattern (`copy-server.mjs:56-60`, "deleted by the server on use"). Upload `api/_setup/hitpay.secret` (single file, `upload-one.py`), which `.htaccess` already 404s. On the next API hit, PHP moves it into `avo_data_dir()/hitpay.php`, chmods it 600 and deletes the upload. The deploy then verifies that the upload is gone. It must never be in `dist/`, so it needs a separate local path.
- (b) A signed-in admin settings field, stored encrypted with `secret.key`.

---

## MAJOR

### 4. MAJOR: keys in `config/services.php` are never "ready"
`PaymentManager::isReady()` reads `config("commerce.{$key}.{$field}")` (`PaymentManager.php:115-131`), and `GatewayKeys::current()` reads `commerce.<g>.*`. A `services.hitpay` block (§4.2) leaves HitPay permanently NOT READY, and the panel overlay (`PanelPaymentSettings::apply`) writes `commerce.<g>.*` as well.

Fix: put the keys in `config/commerce.php`, block `'hitpay' => ['api_key'=>env('HITPAY_API_KEY'),'salt'=>env('HITPAY_SALT'),'base_url'=>env('HITPAY_BASE_URL','https://api.hit-pay.com/v1')]`. `requires => ['api_key','salt']`.

### 5. MAJOR: `needs_review` does not exist anywhere
- `payments.status` enum (`database/migrations/2026_09_22_000600_create_commerce_tables.php:179-182`) and `orders.payment_status` (`:100-102`) have no such value.
- `settle()` maps any unknown result to `pending` (`PaymentManager.php:249-254`). An amount mismatch would therefore spin the thank-you page, and reconcile would re-fetch every 5 min for 48 h, emailing the owner each time.
- `markPaid()` accepts OVER-payment (`reported >= expected`, `:311-317`), while the spec says exact.

Fix:
- Either add `needs_review` to both enums in the §4.3 migration, or keep the enum and record the state as `failure_reason='needs_review: …'` plus a flag in `raw`.
- Reconcile skips flagged rows. The owner email is sent once (dedupe on a flag).
- The exact-amount check lives in `HitpayGateway::capture()`, before `markPaid` is reached.

### 6. MAJOR: the webhook handler contract is not specified, and the existing path would mark paid from the payload
- The Stripe/PayPal pattern is `normaliseEvent()` then `PaymentManager::handle()` (`StripeWebhookController.php`, `PaymentManager.php:264-283`), and `'paid'` calls `markPaid($payment, $event)` with the WEBHOOK data. That violates §2 if it is copied.
- `settle()` picks the latest payment row for the gateway (`:221-225`), not the request named in the webhook. See finding 1.

Fix: the `process` closure for HitPay calls a new `settleRequest(string $requestId)`: locate the row by request id, run `capture()` (fetch), then `markPaid`/`markCancelled`. `normaliseEvent()` must never return `action=paid`. A unit test asserts that a hand-crafted valid-hmac webhook with `status=completed` does NOT mark paid when the fetch says pending.

### 7. MAJOR: the webhook dedupe burns the event when the fetch lags
`WebhookIngest::run` inserts the event row before processing (`WebhookIngest.php:36-53`) and keeps it on success. If HitPay sends `status=completed` and our GET still answers `pending` (eventual consistency), the result "pending" is stored and any HitPay retry is ignored as a duplicate. The order then waits up to 5 min for reconcile.

Fix: when the webhook says `completed` and the fetch disagrees, throw. The row is deleted and the answer is 500, so HitPay retries. Do the same in AV (§5.3 already says 500 on our failure).

### 8. MAJOR: the stock hold (30 min) is shorter than the request life (60 min). The "SIH 24 h hold" claim is false
- NT `config/commerce.php` `stock.reservation_minutes = 30`. SIH is also 30 (`sihatree-store/config/commerce.php:103`). SIH's 24 h is `processing_hold_hours`, which only applies to Stripe's `processing` state (`sihatree-store/app/Services/Payments/PaymentManager.php:250-301`).
- A payment at minute 31-60 has no hold, so stock can oversell. `markPaid` only logs the shortfall (`PaymentManager.php:350-359`).
- The 50-min reuse window hands out URLs whose hold has already expired.

Fix: make `expires_after` ≤ hold − 5 min (25 mins), or reserve with a HitPay TTL of 65 min. The reuse window must be shorter than the remaining hold. Test: pay at minute 45 and the stock is still held.

### 9. MAJOR: the thank-you "processing" state never re-fetches HitPay, and a failed order has no retry
`thanks()` re-settles only `stripe` (`CheckoutController.php:687-697` NT; SIH `:778`), and `retryUrl` is Stripe-only (`:728` NT; SIH `:821`). §4.4's meta-refresh would reload 12 times without asking HitPay.

Fix: add `hitpay` to the settle branch (a read-only GET, so it is safe) and point the retry link at `checkout` for hitpay.

### 10. MAJOR: the HitPay checkout host is assumed, and the CSP list is the wrong one
- §4.4/§4.5 hard-code `checkout.hit-pay.com`, but no probe output in the repo shows the real `url` host. HitPay payment-request URLs are commonly `securecheckout.hit-pay.com/payment-request/@<handle>/…`. If that is right, every redirect fails the host guard, and Chrome blocks the redirect under `form-action`.
- Adding the host to `security.csp.payment_hosts` also adds it to `script-src`, `connect-src` and `frame-src` on the strict checkout profile (`app/Http/Middleware/SecurityHeaders.php:236-257`).

Fix: take the host from the §7 live probe response first. Add a separate `payment_redirect_hosts` list used ONLY in `form-action`, and guard on that exact host. `redirect()->away()` is 302, not 303; either works, but write down which one.

### 11. MAJOR: hmac must be computed over the raw body
Laravel's global `TrimStrings` and `ConvertEmptyStringsToNull` rewrite `$request->all()` and `$request->post()`. Also, the §1 pseudo-code `implode('', ksort(...))` is not PHP (`ksort` returns bool).

Fix: `parse_str($request->getContent(), $f)`. Then: drop `hmac`, `ksort`, concatenate `key.value` for every field received (SDK `generateSignatureArray`), `hash_hmac('sha256', …, $salt)`, `hash_equals`. Use a known vector built from that exact procedure, including one field with an empty value.

### 12. MAJOR: dashboard refunds never reach our books, and the returns flow would throw
- HitPay sends no refund webhook here.
- `RefundService` and `RefundAction` always call the gateway (`app/Services/Orders/RefundService.php:41-172`, `app/Filament/Actions/RefundAction.php`).
- `RefundAction` is also on the return page (`ViewReturnRequest.php:80`), not only on the Payments page that §4.1 mentions.
- An order refunded in HitPay stays `paid`, and a return cannot close.

Fix: hide `RefundAction` for hitpay payments on order AND return pages. Add a "Record refund made in HitPay" action that books a `done` Refund row with no gateway call (reuse `book()`).

### 13. MAJOR: AV bundle gate has about 0.4 KB headroom, not 15 KB
`node scripts/check-bundles.mjs` today: "all JS before first render: 212.2 KB gzip (baseline 197.7 KB, **+14.6 KB**, budget +15.0 KB)". One static import added to `App.tsx` for the paid page breaks the gate.

Fix: the paid page is `React.lazy`, and its strings and poll code stay in that chunk. Nothing new goes into `bridge.ts`/`cartLite.ts`/`AddToCart.tsx`. Re-measure after the change.

### 14. MAJOR: `/en/order/paid` is not routable in AV today
- `App.tsx:29-42`: `/:lang/:slug` takes ONE segment. `/en/order/paid` falls to `*`, which does `Navigate to="/en"`.
- The page is also missing from the prerender `ROUTES` (`scripts/prerender.mjs:36-53`). `.htaccess` rule 11 serves `/_r/<path>/index.html`, else `serve.php`.

Fix:
- Add `<Route path="order/paid" element={lazy}>`.
- Add `/en/order/paid` and `/ms/order/paid` to `ROUTES`.
- Add `order` to `RESERVED_SLUGS` (`src/cms/contracts.ts:484`) and `AVO_RESERVED_SLUGS` (the test at `server/tests/cases.php:1239` enforces equality).
- Exclude the page from the sitemap, llms and heads gates, and add noindex.
- Make sure `serve.php` can serve the snapshot for that path.

### 15. MAJOR: AV paid-order email can be silently dropped by the mail cap
`avo_mail_send` returns `held` over the hourly cap (`server/_lib/mailer.php:42-46`), there is no cron, and the cap is shared with contact forms.

Fix: set `notified_at` only on `sent`. Retry un-notified paid orders from webhook, status, create-sweep and the admin list. Show a panel badge for "paid, not emailed". Either exempt purpose `order` from the cap or give it its own cap.

### 16. MAJOR: the AV rate limit described does not exist, and the schema cannot support it
- The only limiters are `submissions` row counts (`server/_lib/submissions.php:60-67`) and `login_attempts` (`auth.php:117`).
- §5.2 `orders` has no `ip_hash`.
- The GET status endpoint writes nothing, so there is nothing to count.

Fix: add `ip_hash` (HMAC with `avo_secret()`, as submissions do) to `orders`, plus a small `rate_hits(bucket, ip_hash, at)` table for status polls. Also add the `last_fetch_at` column, which §5.3's "> 10 s" rule needs.

### 17. MAJOR: AV/NF double orders and double payment
Every "Pay" click creates a new order and a new HitPay request (§5.3). Nothing deletes older open requests, which live 60 min. Back button, double tap or two tabs give two payable requests, so a customer can pay twice.

Fix: the client keeps `{ref, token, linesHash}`. Create with the same token and the same lines while the order is < 25 min old and pending: return the same url. Different lines: DELETE the old request, then GET it (finding 1 logic), then make a new order.

### 18. MAJOR: query-string appending on redirect_url is unverified
§5.3 puts `?ref=&t=` in `redirect_url`, and HitPay then appends `reference`/`status`. If HitPay appends with a second `?`, the value of `t` breaks.

Fix: check this in the live probe. Make the parser tolerant: take the first 32 hex characters after `t=`. Alternatively put ref and token in one parameter (`?o=<ref>.<token>`). The same applies to NF.

---

## MINOR

19. **MINOR: panel plumbing is mode-based (test/live).**
    - `GatewayKeys::FIELDS` needs `hitpay => ['api_key','salt']`.
    - `SeoSettings::SECRET_KEYS['payments']` needs 4 names: `hitpay_{test,live}_{api_key,salt}`.
    - `inferLive()` returns null for hitpay, so readiness defaults to "test" mode.
    - `Payments.php:286-288` probe is `stripe ? … : paypal`, so a hitpay probe would call PayPal.
    - `webhookCandidates()` hard-codes the field name.

    Fix: HitPay is fixed to live mode (sandbox rejects the key) and gets its own probe branch.
20. **MINOR: currencies.** The config `currencies => ['MYR']` IS honoured through `PanelPaymentSettings::currencies()`, but a currency list stored in the panel overrides it and could include USD. Fix: `HitpayGateway::createIntent` hard-refuses anything that is not MYR, and the panel form does not offer USD.
21. **MINOR: "listed first and pre-selected".** The pre-selected method is `array_key_first($paymentMethods)` (`resources/views/checkout/show.blade.php:290`), and the order comes from `$labels` (`CheckoutController.php:1188-1191`). Put `hitpay` first in `$labels`.
22. **MINOR: migration.** `orders.payment_method` does not exist (verified), so only `payments.gateway` (`:176`) and `webhook_events.gateway` (`:219`) change. PHPUnit runs on MariaDB (`phpunit.xml:41`), but `.env.example` uses sqlite, where a raw `ALTER … MODIFY ENUM` fails. Guard by driver.
23. **MINOR: minimum amount.** No minimum-total check exists anywhere (Stripe's RM 2 minimum is not handled either). Hide HitPay when total < 30 sen (100 % coupons). AV/NF validate the same on the server.
24. **MINOR: amount formatting/parsing.** Send `intdiv(m,100).'.'.str_pad(m%100,2,'0',STR_PAD_LEFT)`. Parse HitPay's `"149.00"` with a regex, never a float (AV already has `amountToSen` in `src/order/catalog.ts:19-23`; mirror it in PHP). Sum the `succeeded` payments, not just "at least one".
25. **MINOR: completed-but-refunded.** A request that is `completed` with no `succeeded` payment (refunded in the dashboard) has no mapping in §2, so it stays pending forever. Map it to needs_review.
26. **MINOR: request-level `failed`.** Treat `failed` as pending until expiry. A buyer can retry on the same HitPay page, but `markFailed` releases stock (`PaymentManager.php:388-431`). AV's `UPDATE … WHERE status='pending'` would drop a later completed payment: use `IN ('pending','failed')`.
27. **MINOR: timezone.** AV PHP sets no timezone (no `date_default_timezone_set` in `server/_lib`). A server-generated `AV-YYMMDD` must use MYT explicitly, as `core.ts makeRef` does. NT `app.timezone = UTC`. The admin list shows MYT.
28. **MINOR: ref collisions.** 32^4 refs per day. Generate on the server only, retry on UNIQUE, and never accept a client ref.
29. **MINOR: phone format.** AV `normalisePhone` returns `60…` with no `+` (`src/order/core.ts:205-210`). HitPay wants E.164, so prefix `+`.
30. **MINOR: AV checkout has no email field** (`validateDetails`, `core.ts:215-255`). Leave `email` empty on the HitPay request rather than inventing one.
31. **MINOR: NF real paths** are `/noor-fes/paid/` and `/noor-fes/ms/paid/` (`astro.config.mjs` base `/noor-fes`, `trailingSlash: 'always'`, `src/data/site.ts:19`). Root `.htaccess` has `DirectorySlash Off`, so `redirect_url` must end with `/` before the query. NF → `/api` is same-origin, and `avo_check_same_origin` passes (`server/_lib/http.php:109-125`).
32. **MINOR: same-origin is not bot protection.** A HitPay webhook (no `Origin` header) passes `avo_check_same_origin`, which is correct for the webhook. But for the same reason curl passes it on `/api/pay/create`: only the rate limit and honeypot protect create.
33. **MINOR: NF deploy never deletes** (`scripts/deploy.py`). Old `pay/` QR assets stay live, so remove them by hand. The NF `check-dist` owner-value list (`scripts/lib/site.mjs`, `OWNER_OWED` = 7) must drop the `pay.*` entries.
34. **MINOR: cross-repo price check.** An AV build reading `E:\noorfes-lp` couples the two repos. Run the comparison in both gates, or make NF read AV's `noorfes.json`. NF `deliveryRM` is RM (a float) while the server uses sen, so convert with integer arithmetic.
35. **MINOR: the lazy sweep inside create** can add 5 × 20 s to a buyer's click. Cap it at 2 orders with a 5 s timeout. Never call HitPay inside `db_tx` (`BEGIN IMMEDIATE`, `server/_lib/db.php:182-197`; `busy_timeout` 5 s), because CMS writes would fail meanwhile.
36. **MINOR: cron.** The scheduler line is installed by `deploy.py cron` (`deploy/bootstrap.php:1282-1300`). Prove it with `crontab -l` on NT and SIH before relying on reconcile, and add that to §7.
37. **MINOR: PII.**
    - `webhook_events.payload` would store the customer phone: strip it.
    - The AV admin orders list exposes name, phone and address to every CMS user: restrict it to the admin role.
38. **MINOR: notify address.** AV has no single "forms notify address". Recipients are set per form (`server/_lib/forms.php:11`). Name the exact address in config.
39. **MINOR: unverified API details.** `GET /payment-requests?per_page=1` for Test connection, and HitPay's webhook retry policy, are not proven. Confirm them in the §7 probe, and do not rely on HitPay retries (reconcile/sweep cover it).
40. **MINOR: stale holds.** A buyer who uses Back from HitPay and resubmits creates a second NT/SIH order (new idempotency key). That holds stock twice for 30 min, and the first request stays open. Release the earlier pending order's hold when the same cart places again.
