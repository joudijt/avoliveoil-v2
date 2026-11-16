# FORGE HITPAY: lane AV handoff (2026-11-16)

Branch `forge-hitpay` (E:\avoliveoil-v2). Scope: SPEC §5.1–5.6 + §5.8 (AV parts), RULINGS R1, R3, R5, R11, R13–R18 + minors.
No real HitPay call was made. No secret was read. Nothing was deployed.

## CONTRACT CHANGES (vs SPEC §5.3 + R17) — NF lane read this first

1. **SKU for Noor Fès = `noor-fes:500`.** Aliases accepted and stored as `noor-fes:500`: `NOORFES-500` (= `SITE.sku` in noorfes-lp `site.ts`) and `noor-fes:NOORFES-500`.
2. **Errors are 422, not 400,** for every validation problem (`invalid`, `unknown_sku`). Shape: `{"error":{"code","message","fields"?}}`.
3. **Delivery fee is NOT in `prices.json`** (R3): it is a panel setting per site. The NF page reads it from `GET /api/pay/config?site=nf` (`delivery_sen`). `null`/`ready:false` = online payment closed for that site.
4. **Honeypot field name = `hp`** (absent or `""`; anything else → 422).
5. **Idempotency (R17):** an order is found by `(site, idem, content)` where content = the priced lines + cleaned details + fee. Same idem + same content = same order. Same idem + changed content = a NEW order (no 409). Clients should still make a new idem when the cart changes.
6. `create` may answer `status:"paid", url:null` (the same order was already paid): go to the paid page, do not redirect.

## Endpoint contract

All JSON answers carry `Cache-Control: no-store`. Errors: `{"error":{"code":"…","message":"…","fields":{…}?}}`.

### `GET /api/pay/config?site=av|nf` (public)
200 `{"site":"nf","ready":true,"delivery_sen":0,"currency":"MYR"}` · closed: `{"ready":false,"delivery_sen":null,…}` · 400 unknown site.
`ready` = API key + salt + that site's delivery fee set, and the price table has the site.

### `POST /api/pay/create` (public, JSON, same-origin check, 10 / 10 min / IP)
Request:
```json
{"site":"nf","lang":"en","idem":"<8-64 of [A-Za-z0-9-]>",
 "lines":[{"sku":"noor-fes:500","qty":2}],
 "details":{"name":"…","phone":"018-205 9925","address":"line1\nline2","postcode":"43000","city":"…","state":"Selangor","note":"","email":"optional"},
 "hp":""}
```
- Prices: from `dist/api/_data/prices.json` only; any price/total the client sends is ignored.
- `qty` must be a JSON integer 1..24 (merged duplicates too); 1..16 lines; total ≥ 30 sen.
- details mirror `core.ts validateDetails`: name ≤60, MY mobile (`+60/60/0` + 1x…, normalised to `60…`), address ≤160 (line breaks allowed), postcode 5 digits (Arabic/full-width digits ok), city ≤40, state = one of the 16 in `STATES_MY`, note ≤200 optional, email optional (sent to HitPay only when given and valid).
- `fields` codes: `required | tooLong | phone | postcode | state | email`, plus `lines: qty|invalid|unknown_sku`, `site|lang|idem: invalid`.

Responses:
| HTTP | body |
|---|---|
| 200 | `{"ref":"NF-261116-7KQ4","token":"<32 hex>","url":"https://checkout.hit-pay.com/payment-request/@berkat-madinah/<id>/checkout","status":"pending","total_sen":29800}` |
| 200 | `{"ref":…,"token":…,"url":null,"status":"paid","total_sen":…}` (same order already paid) |
| 403 | `cross_origin` |
| 409 | `order_review` (this order has a completed-but-mismatched payment under review) |
| 422 | `invalid` / `unknown_sku` |
| 429 | `rate_limited` (`Retry-After: 600`) |
| 502 | `pay_unavailable` (HitPay error or an unexpected answer; order marked failed, retry allowed) |
| 503 | `pay_not_ready` |

Ref = `AV-`/`NF-` + day in Malaysia (`ymd`) + 4 of `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`, server-made, retried on UNIQUE.
Client MUST redirect only when `url` is https on exactly `checkout.hit-pay.com` (R10).
HitPay request sent: amount `"298.00"`, MYR, `reference_number`=ref, `purpose` "Noor Fès order NF-…", name, phone `+60…`, `redirect_url`, `webhook=https://avoliveoil.com/api/pay/webhook`, `send_email/send_sms/allow_repeated_payments=false`, `expires_after="60 mins"`, no `payment_methods[]`.
`redirect_url`: AV `https://avoliveoil.com/<lang>/order/paid?ref=<ref>&t=<token>`; NF `https://avoliveoil.com/noor-fes/paid/?ref=…&t=…` (en) and `/noor-fes/ms/paid/?ref=…&t=…` (ms).
Reuse (R17/R1): same order with a pending request < 20 min old and the same amount → that url. Otherwise a NEW `pay_requests` row; old requests are never deleted or overwritten.

### `GET /api/pay/status?ref=&t=` (public, 60 / 10 min / IP)
`t` is read tolerantly: the first 32 hex characters (HitPay may append `?reference=…`).
- 403 `forbidden`: unknown ref, missing or wrong token.
- 200 `{"ref","site","lang","status":"pending|paid|failed|needs_review","subtotal_sen","delivery_sen","total_sen","lines":[{"sku","qty","unit_sen"}],"payment_type":"touch_n_go"|null,"paid_at":ISO|null}`. No name/phone/address.
- While not paid: asks HitPay at most every 10 s per order (newest 2 pending requests). Also retries unsent owner emails (max 3).
- `failed` = every request expired/canceled: the customer may pay again (create with the same idem → new request).

### `POST /api/pay/webhook` (HitPay, form-encoded, raw body)
hmac per R11 (raw body `parse_str`, drop `hmac`, `ksort`, `key.value` joined, sha256 with the salt, `hash_equals`).
401 bad/missing hmac (no fetch, logged). 200 `{"ok":true,"ignored":true}` for a request id we never issued (other shops on the same account). Good hmac → verify-by-fetch → 200 `{"ok":true,"status":…}`. 500 when HitPay can't be reached, or when the webhook says completed but the fetch still says pending (R7: HitPay retries).

### Admin (signed in + CSRF + build header, existing router)
- `GET /api/admin/orders?status=pending|paid|failed|needs_review` → `{orders:[…], unnotified, doublePaid}` (last 200; also retries unsent emails).
- `POST /api/admin/orders/{ref}/recheck` → the order (404 unknown, 502 HitPay down).
- `GET /api/admin/payments` → `{apiKeySet, apiKeyEnd, saltSet, notifyEmail, notifyEmailDefault, deliveryRM:{av,nf}, ready:{av,nf}, webhookUrl, liveApi}` (never the key or salt).
- `POST /api/admin/payments` `{apiKey?, salt?, clearKeys?, notifyEmail?, deliveryRM?:{av?: "8.00"|null, nf?: …}}` (empty key/salt = keep; null/"" fee = close the site).
- `POST /api/admin/payments/test` → `{ok, message}` = `GET /payment-requests?per_page=1` with the stored key.

## Verify by fetch (§2, R5, minors)
Paid only when `GET /payment-requests/{id}` says `completed` AND id = our row AND `MYR` AND amount (parsed to sen, no float) = row amount = order total AND `reference_number` = ref AND the `succeeded` MYR payments add up to the total AND no payment is refunded. Else the request becomes `needs_review`, the order stays `pending` with `review_at` set (customer sees `needs_review`), one owner alert email. A second paid request on a paid order → `double_paid` + "REFUND NEEDED" email; order unchanged (R1). Request-level `failed` = still pending (buyer can retry on the page); `expired|canceled|inactive` → request closed, order `failed` when no request is pending. Paid update = `UPDATE … WHERE status IN ('pending','failed')`, email only when 1 row changed. HitPay is never called inside `db_tx`.

## Settings keys (`settings` table)
`hitpay.api_key`, `hitpay.salt` (encrypted: libsodium secretbox `s1:`, else AES-256-GCM `o1:`, key = HMAC-SHA256("avo-hitpay-settings-v1", secret.key)), `hitpay.notify_email`, `hitpay.delivery_sen.av`, `hitpay.delivery_sen.nf` (integer sen; absent = closed).
Notify default (R15): first recipient of the oldest live CMS form (the contact form), else the System email. Live value not checked (no prod access): the integrator should read it in the panel (Payments shows the default) or set it explicitly.
HitPay base URL: const `https://api.hit-pay.com/v1`; env `AVO_HITPAY_BASE` overrides it (only https, or http to 127.0.0.1/localhost). Tests and the harness use it.

## Migration (SQLite `db_migrations()` #3)
`orders` (ref UNIQUE, site, status pending|paid|failed, idem, content_hash, lines_json, subtotal/delivery/total sen, name, phone, email, address_json, lang, status_token, ip_hash, payment_type, paid_request_id, review_at, created_at, paid_at, notified_at, notify_attempts, last_fetch_at; UNIQUE(site, idem, content_hash), INDEX(status, created_at)); `pay_requests` (order_ref, request_id UNIQUE, url, amount_sen, status, payment_type, note, created_at, checked_at); `rate_hits(bucket, ip_hash, ts)` pruned > 1 day on every write; `pay_events` (webhook log: ids, status, amount, ok — no phone; pruned > 90 days).
Mail: purpose `order` has its own hourly cap (forms no longer starve paid-order emails and vice versa).

## Files
Server: `server/_lib/pay.php` (new), `server/_lib/db.php`, `bootstrap.php`, `mailer.php`, `pages.php` (reserved slug `order`), `server/index.php` (routes), `server/_data/noorfes.json` (new). Build: `scripts/build-prices.mjs` (new; also checks NF `site.ts` priceRM = 149 when ../noorfes-lp exists), `scripts/copy-server.mjs`, `scripts/prerender.mjs` (+ `/en|ms/order/paid`).
Front: `src/order/core.ts` (PayMode `chat|online`; transfer removed; idem/token in the snapshot; helpers), `messageStrings.ts`, `uiStrings.ts`, `config.ts` (TnG/DuitNow fields removed), `Checkout.tsx`, `CartDrawer.tsx`, `payApi.ts` (new), `PaidPage.tsx` + `paidStrings.ts` (new lazy chunk), `src/App.tsx` (lazy route), `src/components/SEO.tsx` (`noindex` prop), `src/cms/contracts.ts` (`order` reserved).
Admin: `src/admin/api.ts`, `App.tsx`, `layout/AppLayout.tsx` (nav Orders + Payments), `screens/orders/OrdersScreen.tsx`, `screens/payments/PaymentsScreen.tsx`.
Tests/dev: `server/tests/cases_pay.php`, `hitpay_stub.php`, `run.php`; `scripts/order.test.mjs`; `scripts/dev/order-walk.mjs` (new `hitpay` section, `--pay=mock|server`); `scripts/dev/pay-harness.mjs` (new).

## Tests + gates (run 2026-11-16)
- `php server/tests/run.php`: **78/78** (57 existing + 21 new pay cases incl. pinned hmac vector `6ad229d0…b584`, self-generated with the R11 procedure).
- `node --test scripts/order.test.mjs`: **74/74** (transfer tests converted to online; 8 new).
- `npm run build:prerender`: green (check-facts --dist ok; `/en/order/paid` + `/ms/order/paid` prerendered, noindex, no hreflang).
- `npm run check:cms`: **OK**. First-render JS **217,509 B gzip** vs cap 217,774 (baseline 202,414 + 15,360) → **265 B headroom** (was ~481 B before this lane; App.tsx lazy route + SEO prop = +216 B). Lazy: PaidPage 3,919 B, payApi (+shared core) 6,089 B, CartDrawer 10,190 B.
- `check:hydration` clean (10 routes) · `check:sitemap` all 6 gates · `check:heads` 141 routes 0 problems · `check:ai`, `check:llms` up to date · `tsc -b` clean · lint: no new warnings.
- Walk, mock pay server, static `vite preview`: `--only=hitpay` **216 pass / 0 fail** (en+ms × 1366/390/360). Full walk, all 13 sections: **1846 pass / 0 fail / 20 not measured** (same NM kinds as ORDER-R1: no CSP header on preview, desktop font rule, client-only cart button).
- Walk, REAL PHP server + local HitPay stub (`node scripts/dev/pay-harness.mjs --walk`): **180 pass / 0 fail**.

## Unverified / for the integrator
- The live HitPay checkout host + query appending (R10/review 18): code guards exact `checkout.hit-pay.com` and tolerates a second `?`; confirm in the live probe.
- `GET /payment-requests?per_page=1` (Test connection) is stub-proven only.
- Host PHP: sodium or openssl must exist (one of them; both normally present). curl optional (falls back to streams).
- Shop FAQ / AI facts still say "order sent by WhatsApp, payment confirmed in chat" — true while online payment is closed; rewrite at go-live (not in this lane).
- The 5 public AI files (`AI-FACTS.yml`, `public/*.md`) get a date bump from every build; not committed here.
- Mobile Safari / real phones not walked (puppeteer only).

## Rulings not followed as written, and why
- **R3 / minor 37 "admin role only":** the CMS has no roles; every active user can add users, so a role check would protect nothing. All admin routes require a signed-in session (+CSRF). Adding roles is a separate change.
- **R5 (AV):** followed (order stays `pending`, flag `review_at`), but the customer status endpoint reports `needs_review` so the paid page can say "message us" instead of spinning.
- **R8 expiry 25 min:** NT/SIH stock-hold reason does not apply to AV/NF (no stock); kept SPEC `60 mins`, reuse window 20 min (R17).
- **§5.1 delivery.json:** superseded by R3 (panel setting); no `delivery.json`, `prices.json` has no `delivery_sen`.
- **SPEC 5.6 copy contains em dashes** ("… — via HitPay", "Online payment opens soon — message us on WhatsApp", "Payment received — thank you!"): kept verbatim although ORDER-R1 strings avoided dashes.
- WhatsApp "chat" ordering is kept ONLY while online payment is closed for the site (SPEC 5.1); the TnG/DuitNow transfer path is deleted.

## Review fixes (independent review of 5800d08) — supersedes the matching lines above

1. **Limiter** keys IPv6 clients on their /64 prefix (IPv4 as is); count + insert run in one `db_tx`. `orders.ip_hash` uses the same key.
2. **Owner email** is claimed per order with a compare-and-set `UPDATE … WHERE notified_at IS NULL AND notify_attempts = <read value> AND last_notify_at` window; mail is sent only when that claimed exactly 1 row (two parallel polls never both send).
3. **Retries** at most once per 60 s per order (`orders.last_notify_at`); hard cap raised from 30 to 200 tries.
4. **Parallel create** of the same order: a click must claim `orders.creating_at` (conditional UPDATE, stale after 30 s) before calling HitPay; a click that loses the claim waits and hands out the winner's pending url. Only one HitPay request is created. New answer: **409 `busy`** if the other click neither finished nor released within ~32 s.
5. **Bad-hmac webhook** stores nothing in `pay_events`; it logs at most one line a minute (stamp file `logs/.hitpay-bad-hmac`) with a diagnostic `rawPlus` (raw body had an unencoded `+`); the check is unchanged. `pay_events` is pruned on every webhook path.
6. **Status limits:** a valid ref+token = 240 / 10 min / IP (bucket `pay.status`); a wrong ref/token = 60 / 10 min (bucket `pay.status.bad`), so guessing cannot block a real customer. The AV paid page backs off 30 s on a 429 and still ends in the "not confirmed yet" view after 2 min (never an endless "checking").
7. **`apiKeyEnd` removed** from `GET /api/admin/payments`: only `apiKeySet` / `saltSet`.

Migration **#4**: `orders.last_notify_at`, `orders.creating_at`.
Contract for the NF lane: `create` may now answer **409 `busy`**; status polls get 240 / 10 min per IP; treat 429 on status as "poll slower".

Re-run after the fixes: `php server/tests/run.php` **83/83** (5 new review cases); `node --test scripts/order.test.mjs` **74/74**; `npm run build:prerender` green; `npm run check:cms` OK (first-render JS unchanged, 212.4 KB / +14.7 KB of +15.0 KB); `pay-harness --walk` (real PHP + stub) **180 pass / 0 fail**.
Not testable here: true concurrency (`php -S` on Windows serves one request at a time), so fix 4 is tested by planting the other click's claim + request; fix 1 IPv6 by a unit test of the key function.
