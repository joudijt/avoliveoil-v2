<?php
declare(strict_types=1);

/*
 * FORGE HITPAY (AV + NF) cases. HitPay is the local stub (server/tests/hitpay_stub.php);
 * the real API is never called. Keys below are fake.
 */

const PAY_KEY = 'test-key-not-real';
const PAY_SALT = 'test-salt-not-real-0123456789';

function stub(): array
{
    return json_decode((string) file_get_contents(C('stubState')), true) ?: [];
}

function stub_put(array $s): void
{
    file_put_contents(C('stubState'), json_encode($s, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

/** Changes one request in the stub (status, amount, payments...). */
function stub_req(string $id, array $patch): void
{
    $s = stub();
    ok(isset($s['requests'][$id]), "stub knows request $id");
    $s['requests'][$id] = array_replace($s['requests'][$id], $patch);
    stub_put($s);
}

function stub_fetches(string $id): int
{
    return count(array_filter(stub()['calls'] ?? [], fn ($c) => $c['method'] === 'GET' && $c['path'] === '/v1/payment-requests/' . $id));
}

/** Completed + one succeeded payment of the full amount. */
function stub_pay(string $id, ?string $amount = null, string $type = 'touch_n_go'): void
{
    $r = stub()['requests'][$id];
    $amount ??= (string) $r['amount'];
    stub_req($id, ['status' => 'completed', 'payments' => [['id' => 'pay-' . substr($id, 0, 8), 'status' => 'succeeded', 'amount' => $amount, 'currency' => 'MYR', 'payment_type' => $type]]]);
}

function reset_rates(): void
{
    tdb()->exec('DELETE FROM rate_hits');
}

function pay_details(array $over = []): array
{
    return $over + ['name' => 'Aisyah Rahman', 'phone' => '012-345 6789', 'address' => '12 Jalan Mawar, Kajang', 'postcode' => '43000', 'state' => 'Selangor'];
}

function pay_body(array $over = []): array
{
    return $over + [
        'site' => 'av', 'lang' => 'en', 'idem' => 'idem-' . bin2hex(random_bytes(8)),
        'lines' => [['sku' => 'extra-virgin:500', 'qty' => 2]],
        'details' => pay_details(),
    ];
}

/** Signed webhook body exactly as HitPay sends it (form-encoded). */
function webhook_body(array $f, string $salt = PAY_SALT): string
{
    $sig = $f;
    ksort($sig);
    $s = '';
    foreach ($sig as $k => $v) $s .= $k . $v;
    $f['hmac'] = hash_hmac('sha256', $s, $salt);
    return http_build_query($f);
}

$payAdmin = new Client();
$payAnon = new Client();

test('pay: config closed + create 503 before keys and fee are set; admin endpoints need a session', function () use ($payAnon) {
    reset_rates();
    eq($payAnon->get('/api/pay/config?site=av')->json(), ['site' => 'av', 'ready' => false, 'delivery_sen' => null, 'currency' => 'MYR'], 'closed');
    status($payAnon->get('/api/pay/config?site=xx'), 400, 'unknown site');
    $r = $payAnon->post('/api/pay/create', pay_body());
    status($r, 503, 'not ready');
    eq($r->json()['error']['code'], 'pay_not_ready', 'code');
    status($payAnon->get('/api/admin/orders'), 401, 'orders need sign-in');
    status($payAnon->get('/api/admin/payments'), 401, 'payments need sign-in');
    status($payAnon->post('/api/admin/payments', ['apiKey' => PAY_KEY]), 401, 'save needs sign-in');
});

test('pay: admin Payments section stores key + salt encrypted, never returns them, fee per site', function () use ($payAdmin) {
    $r = $payAdmin->post('/api/auth/login', ['email' => 'admin@avoliveoil.com', 'password' => 'correct horse 1']);
    status($r, 200, 'admin login');
    $g = $payAdmin->get('/api/admin/payments')->json();
    eq([$g['apiKeySet'], $g['saltSet'], $g['ready']], [false, false, ['av' => false, 'nf' => false]], 'nothing set');
    eq($g['webhookUrl'], 'https://avoliveoil.com/api/pay/webhook', 'webhook url');
    eq($g['liveApi'], false, 'tests talk to the stub');
    ok($g['notifyEmailDefault'] !== '', 'a default notify address exists: ' . $g['notifyEmailDefault']);
    status($payAdmin->post('/api/admin/payments', ['deliveryRM' => ['av' => 'abc']]), 400, 'bad fee');
    status($payAdmin->post('/api/admin/payments', ['notifyEmail' => 'nope']), 400, 'bad email');
    status($payAdmin->post('/api/admin/payments', ['apiKey' => 'x y']), 400, 'bad key');
    $t = $payAdmin->post('/api/admin/payments/test')->json();
    eq($t['ok'], false, 'test without a key fails');
    $r = $payAdmin->post('/api/admin/payments', ['apiKey' => PAY_KEY, 'salt' => PAY_SALT, 'notifyEmail' => 'orders@avoliveoil.com', 'deliveryRM' => ['av' => '8.00', 'nf' => '0']]);
    status($r, 200, 'save');
    $g = $r->json();
    eq([$g['apiKeySet'], $g['saltSet'], $g['deliveryRM'], $g['ready']], [true, true, ['av' => '8.00', 'nf' => '0.00'], ['av' => true, 'nf' => true]], 'stored');
    ok(!array_key_exists('apiKeyEnd', $g), 'no part of the key is ever returned (review 7)');
    lacks($r->body, PAY_KEY, 'key never in the answer');
    lacks($r->body, PAY_SALT, 'salt never in the answer');
    $rows = tdb()->query("SELECT key, value FROM settings WHERE key LIKE 'hitpay.%'")->fetchAll(PDO::FETCH_KEY_PAIR);
    ok(str_starts_with($rows['hitpay.api_key'], 's1:') || str_starts_with($rows['hitpay.api_key'], 'o1:'), 'key encrypted');
    lacks(implode('|', $rows), PAY_KEY, 'no plain key in the database');
    lacks(implode('|', $rows), PAY_SALT, 'no plain salt in the database');
    $audit = (string) tdb()->query("SELECT detail FROM audit WHERE action = 'payments.save' ORDER BY id DESC LIMIT 1")->fetchColumn();
    lacks($audit, PAY_KEY, 'audit holds field names only');
    // empty apiKey keeps the stored one
    $g = $payAdmin->post('/api/admin/payments', ['apiKey' => '', 'salt' => ''])->json();
    eq([$g['apiKeySet'], $g['saltSet']], [true, true], 'empty = keep');
    $t = $payAdmin->post('/api/admin/payments/test')->json();
    eq($t, ['ok' => true, 'message' => 'Connected to HitPay.'], 'test connection hits GET /payment-requests?per_page=1');
    $last = array_values(array_filter(stub()['calls'], fn ($c) => $c['path'] === '/v1/payment-requests' && $c['method'] === 'GET'));
    eq($last[0]['query'] ?? '', 'per_page=1', 'probe query');
});

test('pay: config open with the panel fee', function () use ($payAnon) {
    eq($payAnon->get('/api/pay/config?site=av')->json(), ['site' => 'av', 'ready' => true, 'delivery_sen' => 800, 'currency' => 'MYR'], 'av open');
    eq($payAnon->get('/api/pay/config?site=nf')->json()['delivery_sen'], 0, 'nf free delivery');
});

test('pay: create validates like core.ts (phone, postcode, state, lengths, qty, unknown sku, honeypot, cross-origin)', function () use ($payAnon) {
    reset_rates();
    $bad = function (array $body, string $code, ?array $fields, string $msg) use ($payAnon) {
        $r = $payAnon->post('/api/pay/create', $body);
        status($r, 422, $msg);
        eq($r->json()['error']['code'], $code, "$msg: code");
        if ($fields !== null) eq($r->json()['error']['fields'], $fields, "$msg: fields");
    };
    $bad(pay_body(['details' => pay_details(['phone' => '03-1234 5678', 'postcode' => '4300', 'state' => 'Bali', 'name' => str_repeat('a', 61), 'address' => 'short'])]),
        'invalid', ['name' => 'tooLong', 'phone' => 'phone', 'address' => 'tooShort', 'postcode' => 'postcode', 'state' => 'state'], 'details');
    $bad(pay_body(['lines' => [['sku' => 'gold:500', 'qty' => 1]]]), 'unknown_sku', null, 'unknown sku');
    $bad(pay_body(['lines' => [['sku' => 'noor-fes:500', 'qty' => 1]]]), 'unknown_sku', null, 'NF sku on the AV site');
    $bad(pay_body(['lines' => [['sku' => 'extra-virgin:500', 'qty' => 25]]]), 'invalid', ['lines' => 'qty'], 'qty 25');
    $bad(pay_body(['lines' => [['sku' => 'extra-virgin:500', 'qty' => '2']]]), 'invalid', ['lines' => 'qty'], 'qty as text');
    $bad(pay_body(['lines' => [['sku' => 'extra-virgin:500', 'qty' => 1], ['sku' => 'organic:250', 'qty' => 1]]]), 'invalid', ['lines' => 'invalid'], 'two lines (one product per order)');
    $bad(pay_body(['lines' => []]), 'invalid', ['lines' => 'invalid'], 'empty cart');
    $bad(pay_body(['site' => 'zz']), 'invalid', ['site' => 'invalid'], 'site');
    $bad(pay_body(['idem' => 'x']), 'invalid', ['idem' => 'invalid'], 'idem');
    $bad(pay_body(['hp' => 'http://spam']), 'invalid', null, 'honeypot');
    status($payAnon->post('/api/pay/create', pay_body(), ['headers' => ['Origin' => 'https://evil.example']]), 403, 'cross-origin');
    eq((int) tdb()->query('SELECT COUNT(*) FROM orders')->fetchColumn(), 0, 'no order stored by a refused create');
});

test('pay: create prices from the server table (client prices ignored), stores pending, sends the right HitPay request', function () use ($payAnon) {
    reset_rates();
    $body = pay_body(['lines' => [['sku' => 'extra-virgin:500', 'qty' => 2, 'unitSen' => 1, 'price' => '0.01', 'unit_sen' => 1]], 'total_sen' => 100]);
    $r = $payAnon->post('/api/pay/create', $body);
    status($r, 200, 'created');
    $j = $r->json();
    ok(preg_match('/^AV-\d{6}-[A-Z2-9]{4}$/', $j['ref']) === 1, 'server ref ' . $j['ref']);
    $myt = (new DateTimeImmutable('now', new DateTimeZone('Asia/Kuala_Lumpur')))->format('ymd');
    eq(substr($j['ref'], 3, 6), $myt, 'ref date is the day in Malaysia');
    ok(preg_match('/^[0-9a-f]{32}$/', $j['token']) === 1, 'status token');
    eq($j['status'], 'pending', 'pending');
    eq($j['total_sen'], 2 * 10900 + 800, 'total = server prices + panel fee');
    ok(str_starts_with($j['url'], 'https://checkout.hit-pay.com/payment-request/@berkat-madinah/'), 'HitPay url');
    $o = tdb()->query("SELECT * FROM orders WHERE ref = '{$j['ref']}'")->fetch();
    eq([$o['status'], (int) $o['subtotal_sen'], (int) $o['delivery_sen'], (int) $o['total_sen'], $o['phone'], $o['site']], ['pending', 21800, 800, 22600, '60123456789', 'av'], 'stored order');
    $pr = tdb()->query("SELECT * FROM pay_requests WHERE order_ref = '{$j['ref']}'")->fetchAll();
    eq(count($pr), 1, 'one request row');
    $f = stub()['requests'][$pr[0]['request_id']]['_form'];
    eq([$f['amount'], $f['currency'], $f['reference_number'], $f['phone'], $f['send_email'], $f['send_sms'], $f['allow_repeated_payments'], $f['expires_after']],
        ['226.00', 'MYR', $j['ref'], '+60123456789', 'false', 'false', 'false', '60 mins'], 'HitPay form');
    eq($f['redirect_url'], 'https://avoliveoil.com/en/order/paid?ref=' . $j['ref'] . '&t=' . $j['token'], 'redirect url');
    eq($f['webhook'], 'https://avoliveoil.com/api/pay/webhook', 'webhook url');
    ok(!isset($f['email']) && !isset($f['payment_methods']), 'no email (AV has no field), no method list (all enabled methods show)');
    $GLOBALS['S']['pay1'] = $j + ['request' => $pr[0]['request_id'], 'body' => $body];
});

test('pay: same idem + same cart reuses the open request (R17); changed cart = new order', function () use ($payAnon) {
    reset_rates();
    $p = $GLOBALS['S']['pay1'];
    $r = $payAnon->post('/api/pay/create', $p['body']);
    status($r, 200, 'again');
    eq([$r->json()['ref'], $r->json()['url'], $r->json()['token']], [$p['ref'], $p['url'], $p['token']], 'same order, same url');
    eq((int) tdb()->query("SELECT COUNT(*) FROM pay_requests WHERE order_ref = '{$p['ref']}'")->fetchColumn(), 1, 'no second request');
    // older than 20 min -> a NEW request row; the old one is kept (R1: never overwritten, never deleted)
    tdb()->exec("UPDATE pay_requests SET created_at = created_at - 1300 WHERE order_ref = '{$p['ref']}'");
    $r = $payAnon->post('/api/pay/create', $p['body']);
    eq($r->json()['ref'], $p['ref'], 'same order');
    ok($r->json()['url'] !== $p['url'], 'new url');
    eq((int) tdb()->query("SELECT COUNT(*) FROM pay_requests WHERE order_ref = '{$p['ref']}'")->fetchColumn(), 2, 'two request rows');
    ok(!in_array('DELETE', array_column(stub()['calls'], 'method'), true), 'nothing DELETEd at HitPay');
    $GLOBALS['S']['pay1']['request2'] = (string) tdb()->query("SELECT request_id FROM pay_requests WHERE order_ref = '{$p['ref']}' ORDER BY id DESC LIMIT 1")->fetchColumn();
    $changed = $p['body'];
    $changed['lines'][0]['qty'] = 3;
    $r = $payAnon->post('/api/pay/create', $changed);
    ok($r->json()['ref'] !== $p['ref'], 'changed cart with the same idem = another order');
});

test('pay: status needs the token (403), and asks HitPay at most every 10 s', function () use ($payAnon) {
    reset_rates();
    $p = $GLOBALS['S']['pay1'];
    status($payAnon->get('/api/pay/status?ref=' . $p['ref'] . '&t=' . str_repeat('0', 32)), 403, 'wrong token');
    status($payAnon->get('/api/pay/status?ref=' . $p['ref']), 403, 'no token');
    status($payAnon->get('/api/pay/status?ref=AV-000000-AAAA&t=' . $p['token']), 403, 'unknown ref');
    tdb()->exec("UPDATE orders SET last_fetch_at = NULL WHERE ref = '{$p['ref']}'");
    $before = stub_fetches($p['request2']);
    $r = $payAnon->get('/api/pay/status?ref=' . $p['ref'] . '&t=' . $p['token'] . '?reference=x&status=completed');
    status($r, 200, 'status with a "?" HitPay may append to t');
    $j = $r->json();
    eq([$j['status'], $j['total_sen'], $j['delivery_sen'], count($j['lines'])], ['pending', 22600, 800, 1], 'pending');
    ok(!isset($j['name']) && !isset($j['phone']), 'no personal data');
    eq(stub_fetches($p['request2']), $before + 1, 'fetched once');
    $payAnon->get('/api/pay/status?ref=' . $p['ref'] . '&t=' . $p['token']);
    eq(stub_fetches($p['request2']), $before + 1, 'not again within 10 s');
});

test('pay: webhook hmac: known vector, bad hmac 401 without fetching, unknown request 200 ignored', function () use ($payAnon) {
    // Self-generated vector (R11 procedure: ksort, key.value joined, empty value included).
    $fields = ['payment_id' => 'p1', 'payment_request_id' => 'r1', 'phone' => '', 'amount' => '301.00', 'currency' => 'MYR', 'status' => 'completed', 'reference_number' => 'AV-261116-ABCD'];
    // Fixed vector, self-generated with the R11 procedure (documented in the handoff), pinned here.
    eq(hash_hmac('sha256', 'amount301.00currencyMYRpayment_idp1payment_request_idr1phonereference_numberAV-261116-ABCDstatuscompleted', 'salt'),
        '6ad229d041a7c7403abf58f5a97593a2b83fa17c9f5ba476004ec29b1d04b584', 'pinned vector');
    parse_str(webhook_body($fields, 'salt'), $parsed);
    $sig = $parsed['hmac'];
    unset($parsed['hmac']);
    ksort($parsed);
    $s = '';
    foreach ($parsed as $k => $v) $s .= $k . $v;
    eq($s, 'amount301.00currencyMYRpayment_idp1payment_request_idr1phonereference_numberAV-261116-ABCDstatuscompleted', 'signed string');
    eq($sig, hash_hmac('sha256', $s, 'salt'), 'hmac');

    $p = $GLOBALS['S']['pay1'];
    $before = stub_fetches($p['request2']);
    $raw = webhook_body(['payment_id' => 'x', 'payment_request_id' => $p['request2'], 'amount' => '226.00', 'currency' => 'MYR', 'status' => 'completed', 'reference_number' => $p['ref']], 'wrong salt');
    status($payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => $raw]), 401, 'bad hmac');
    status($payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => 'status=completed']), 401, 'no hmac');
    eq(stub_fetches($p['request2']), $before, 'no fetch on a bad hmac');
    $raw = webhook_body(['payment_id' => 'x', 'payment_request_id' => 'not-ours-123456', 'amount' => '1.00', 'currency' => 'MYR', 'status' => 'completed', 'reference_number' => 'NT-1']);
    $r = $payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => $raw]);
    status($r, 200, 'foreign request');
    eq($r->json()['ignored'] ?? null, true, 'ignored');
    $ev = tdb()->query('SELECT * FROM pay_events ORDER BY id DESC LIMIT 1')->fetch();
    ok(!array_key_exists('phone', $ev), 'stored webhook rows hold ids/status/amount only');
});

test('pay: a hand-made webhook saying completed does NOT pay while HitPay says pending (500 = retry, R7)', function () use ($payAnon) {
    $p = $GLOBALS['S']['pay1'];
    $raw = webhook_body(['payment_id' => 'x', 'payment_request_id' => $p['request2'], 'amount' => '226.00', 'currency' => 'MYR', 'status' => 'completed', 'reference_number' => $p['ref']]);
    status($payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => $raw]), 500, 'not yet completed at HitPay');
    eq((string) tdb()->query("SELECT status FROM orders WHERE ref = '{$p['ref']}'")->fetchColumn(), 'pending', 'still pending');
});

test('pay: good webhook -> fetch -> paid once, one owner email; replay is a no-op', function () use ($payAnon) {
    $p = $GLOBALS['S']['pay1'];
    $mailsBefore = count(mails());
    stub_pay($p['request2']);
    $raw = webhook_body(['payment_id' => 'x', 'payment_request_id' => $p['request2'], 'amount' => '226.00', 'currency' => 'MYR', 'status' => 'completed', 'reference_number' => $p['ref']]);
    $r = $payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => $raw]);
    status($r, 200, 'webhook');
    eq($r->json()['status'], 'completed', 'settled');
    $o = tdb()->query("SELECT * FROM orders WHERE ref = '{$p['ref']}'")->fetch();
    eq([$o['status'], $o['paid_request_id'], $o['payment_type']], ['paid', $p['request2'], 'touch_n_go'], 'paid by that request');
    ok($o['notified_at'] !== null, 'notified');
    $new = array_slice(mails(), $mailsBefore);
    eq(count($new), 1, 'one email');
    $m = parse_eml($new[0]);
    eq($m['headers']['to'][0], 'orders@avoliveoil.com', 'to the notify address');
    contains(mb_decode_mimeheader($m['headers']['subject'][0]), 'Paid order ' . $p['ref'] . ' RM 226.00 (Arabian Village)', 'subject');
    foreach (['1. Extra Virgin 500 ml x 2 = RM 218.00', 'Delivery: RM 8.00', 'Total: RM 226.00', 'touch_n_go', 'Phone: +60123456789', 'Address: 12 Jalan Mawar, Kajang, 43000, Selangor'] as $line) {
        contains($m['text'], $line, 'email body');
    }
    status($payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => $raw]), 200, 'replay');
    eq(count(mails()), $mailsBefore + 1, 'no second email');
    $j = $payAnon->get('/api/pay/status?ref=' . $p['ref'] . '&t=' . $p['token'])->json();
    eq([$j['status'], $j['payment_type']], ['paid', 'touch_n_go'], 'status paid');
    // the same cart again = the paid order, no new request
    reset_rates();
    $r = $payAnon->post('/api/pay/create', $p['body']);
    eq([$r->json()['status'], $r->json()['url']], ['paid', null], 'create on a paid order says paid');
});

test('pay: the OLD request paid after a newer one is still recognised (R1); a second paid request = double_paid + refund email', function () use ($payAnon) {
    $p = $GLOBALS['S']['pay1'];
    $mailsBefore = count(mails());
    stub_pay($p['request']); // the first request (still open at HitPay) is paid too
    $raw = webhook_body(['payment_id' => 'y', 'payment_request_id' => $p['request'], 'amount' => '226.00', 'currency' => 'MYR', 'status' => 'completed', 'reference_number' => $p['ref']]);
    status($payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => $raw]), 200, 'webhook');
    eq((string) tdb()->query("SELECT status FROM pay_requests WHERE request_id = '{$p['request']}'")->fetchColumn(), 'double_paid', 'flagged');
    eq((string) tdb()->query("SELECT paid_request_id FROM orders WHERE ref = '{$p['ref']}'")->fetchColumn(), $p['request2'], 'order unchanged');
    $new = array_slice(mails(), $mailsBefore);
    eq(count($new), 1, 'one alert');
    contains(mb_decode_mimeheader(parse_eml($new[0])['headers']['subject'][0]), 'REFUND NEEDED', 'refund alert');
});

test('pay: amount mismatch on a completed request -> not paid, needs_review, owner alerted once', function () use ($payAnon) {
    reset_rates();
    $r = $payAnon->post('/api/pay/create', pay_body(['lines' => [['sku' => 'organic:250', 'qty' => 1]]]));
    status($r, 200, 'created');
    $j = $r->json();
    eq($j['total_sen'], 6900 + 800, 'total');
    $rid = (string) tdb()->query("SELECT request_id FROM pay_requests WHERE order_ref = '{$j['ref']}'")->fetchColumn();
    stub_pay($rid, '1.00');
    stub_req($rid, ['amount' => '1.00']);
    $mailsBefore = count(mails());
    $raw = webhook_body(['payment_id' => 'z', 'payment_request_id' => $rid, 'amount' => '1.00', 'currency' => 'MYR', 'status' => 'completed', 'reference_number' => $j['ref']]);
    status($payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => $raw]), 200, 'handled');
    $o = tdb()->query("SELECT * FROM orders WHERE ref = '{$j['ref']}'")->fetch();
    eq($o['status'], 'pending', 'order NOT paid (R5: stays pending)');
    ok($o['review_at'] !== null, 'review flag');
    eq((string) tdb()->query("SELECT status FROM pay_requests WHERE request_id = '$rid'")->fetchColumn(), 'needs_review', 'request flagged');
    eq($payAnon->get('/api/pay/status?ref=' . $j['ref'] . '&t=' . $j['token'])->json()['status'], 'needs_review', 'customer sees needs_review');
    status($payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => $raw]), 200, 'replay');
    eq(count(mails()), $mailsBefore + 1, 'one alert only');
    contains(mb_decode_mimeheader(parse_eml(mails()[count(mails()) - 1])['headers']['subject'][0]), 'CHECK payment of order ' . $j['ref'], 'alert subject');
});

test('pay: refunded payment inside a completed request = needs_review, not paid', function () use ($payAnon) {
    reset_rates();
    $j = $payAnon->post('/api/pay/create', pay_body(['lines' => [['sku' => 'organic:500', 'qty' => 1]]]))->json();
    $rid = (string) tdb()->query("SELECT request_id FROM pay_requests WHERE order_ref = '{$j['ref']}'")->fetchColumn();
    stub_req($rid, ['status' => 'completed', 'payments' => [['id' => 'q', 'status' => 'refunded', 'amount' => '137.00', 'currency' => 'MYR', 'payment_type' => 'card']]]);
    $j2 = $payAnon->get('/api/pay/status?ref=' . $j['ref'] . '&t=' . $j['token'])->json();
    eq($j2['status'], 'needs_review', 'refunded -> review (status poll triggers the fetch)');
});

test('pay: expired request -> order failed; paying again creates a new request and can still be paid', function () use ($payAnon) {
    reset_rates();
    $body = pay_body(['lines' => [['sku' => 'wild-thyme:250', 'qty' => 2]], 'lang' => 'ms']);
    $j = $payAnon->post('/api/pay/create', $body)->json();
    $rid = (string) tdb()->query("SELECT request_id FROM pay_requests WHERE order_ref = '{$j['ref']}'")->fetchColumn();
    eq(stub()['requests'][$rid]['_form']['redirect_url'], 'https://avoliveoil.com/ms/order/paid?ref=' . $j['ref'] . '&t=' . $j['token'], 'Malay return page');
    stub_req($rid, ['status' => 'failed']);
    tdb()->exec("UPDATE orders SET last_fetch_at = NULL WHERE ref = '{$j['ref']}'");
    eq($payAnon->get('/api/pay/status?ref=' . $j['ref'] . '&t=' . $j['token'])->json()['status'], 'pending', 'request-level failed stays pending (buyer can retry on the page)');
    stub_req($rid, ['status' => 'expired']);
    tdb()->exec("UPDATE orders SET last_fetch_at = NULL WHERE ref = '{$j['ref']}'");
    eq($payAnon->get('/api/pay/status?ref=' . $j['ref'] . '&t=' . $j['token'])->json()['status'], 'failed', 'expired -> failed');
    $again = $payAnon->post('/api/pay/create', $body)->json();
    eq([$again['ref'], $again['status']], [$j['ref'], 'pending'], 'same order, pending again');
    $rid2 = (string) tdb()->query("SELECT request_id FROM pay_requests WHERE order_ref = '{$j['ref']}' ORDER BY id DESC LIMIT 1")->fetchColumn();
    ok($rid2 !== $rid, 'new request');
    stub_pay($rid2, null, 'fpx');
    tdb()->exec("UPDATE orders SET last_fetch_at = NULL WHERE ref = '{$j['ref']}'");
    eq($payAnon->get('/api/pay/status?ref=' . $j['ref'] . '&t=' . $j['token'])->json()['status'], 'paid', 'paid via the status poll (return page path)');
});

test('pay: HitPay down -> 502 pay_unavailable, order failed', function () use ($payAnon) {
    reset_rates();
    $s = stub();
    $s['failNextCreate'] = true;
    stub_put($s);
    $r = $payAnon->post('/api/pay/create', pay_body(['lines' => [['sku' => 'rosemary-basil:250', 'qty' => 1]]]));
    status($r, 502, 'HitPay error');
    eq($r->json()['error']['code'], 'pay_unavailable', 'code');
    eq((string) tdb()->query("SELECT status FROM orders ORDER BY id DESC LIMIT 1")->fetchColumn(), 'failed', 'order failed');
});

test('pay: Noor Fès packs (site nf): RM 10 delivery totals 159/259/359, alias = pack1 qty 1, labels + bottles, NF return path', function () use ($payAdmin, $payAnon) {
    reset_rates();
    $payAdmin->post('/api/admin/payments', ['deliveryRM' => ['nf' => '10.00']]);
    eq($payAnon->get('/api/pay/config?site=nf')->json()['delivery_sen'], 1000, 'nf fee RM 10');
    $refs = [];
    foreach ([['noor-fes:pack1', 15900, 1], ['noor-fes:pack2', 25900, 2], ['noor-fes:pack3', 35900, 3]] as [$sku, $total, $bottles]) {
        $r = $payAnon->post('/api/pay/create', pay_body(['site' => 'nf', 'lang' => 'ms', 'lines' => [['sku' => $sku, 'qty' => 1]],
            'details' => pay_details(['address' => "No 3, Jalan Bunga\nTaman Melati, Kajang", 'email' => 'buyer@example.com'])]));
        status($r, 200, "$sku created");
        $j = $r->json();
        ok(str_starts_with($j['ref'], 'NF-'), 'NF ref');
        eq($j['total_sen'], $total, "$sku total incl. RM 10 delivery");
        $st = $payAnon->get('/api/pay/status?ref=' . $j['ref'] . '&t=' . $j['token'])->json();
        eq([$st['lines'][0]['qty'], $st['lines'][0]['bottles']], [1, $bottles], "$sku status: qty 1, $bottles bottles");
        contains($st['lines'][0]['label'], $bottles . ' botol', "$sku status label in Malay");
        $rid = (string) tdb()->query("SELECT request_id FROM pay_requests WHERE order_ref = '{$j['ref']}'")->fetchColumn();
        $f = stub()['requests'][$rid]['_form'];
        eq($f['purpose'], 'Noor Fès order ' . $j['ref'] . ' (' . $bottles . ' bottle' . ($bottles === 1 ? '' : 's') . ')', "$sku purpose names the package");
        $refs[$sku] = $j + ['request' => $rid, 'form' => $f];
    }
    $p2 = $refs['noor-fes:pack2'];
    eq($p2['form']['redirect_url'], 'https://avoliveoil.com/noor-fes/ms/paid/?ref=' . $p2['ref'] . '&t=' . $p2['token'], 'NF Malay paid page');
    eq($p2['form']['email'], 'buyer@example.com', 'email sent when given');
    // paid: the owner email names the package, no "x 1"
    $mailsBefore = count(mails());
    stub_pay($p2['request']);
    $raw = webhook_body(['payment_id' => 'n2', 'payment_request_id' => $p2['request'], 'amount' => '259.00', 'currency' => 'MYR', 'status' => 'completed', 'reference_number' => $p2['ref']]);
    status($payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => $raw]), 200, 'nf webhook');
    $new = array_slice(mails(), $mailsBefore);
    eq(count($new), 1, 'one NF email');
    $m = parse_eml($new[0]);
    foreach (['1. Noor Fès, 2 bottles (500 ml each) = RM 249.00', 'Delivery: RM 10.00', 'Total: RM 259.00', 'No 3, Jalan Bunga, Taman Melati, Kajang, 43000, Selangor'] as $line) {
        contains($m['text'], $line, 'NF email body');
    }
    lacks($m['text'], ' x 1', 'no "x 1" for a package');
    // aliases (stale tabs, 30 days): the old single-bottle sku = pack1, qty 1 only
    foreach (['NOORFES-500', 'noor-fes:500', 'noor-fes:NOORFES-500'] as $alias) {
        $j = $payAnon->post('/api/pay/create', pay_body(['site' => 'nf', 'lines' => [['sku' => $alias, 'qty' => 1]]]))->json();
        eq($j['total_sen'] ?? null, 15900, "$alias = pack1");
        $lines = json_decode((string) tdb()->query("SELECT lines_json FROM orders WHERE ref = '{$j['ref']}'")->fetchColumn(), true);
        eq([$lines[0]['sku'], $lines[0]['bottles']], ['noor-fes:pack1', 1], "$alias stored as noor-fes:pack1");
    }
    $bad = function (array $over, string $code, string $msg) use ($payAnon) {
        $r = $payAnon->post('/api/pay/create', pay_body(['site' => 'nf'] + $over));
        status($r, 422, $msg);
        eq($r->json()['error']['code'], $code, "$msg: code");
    };
    $bad(['lines' => [['sku' => 'NOORFES-500', 'qty' => 2]]], 'stale_client', 'old sku with qty 2 = stale client');
    $bad(['lines' => [['sku' => 'noor-fes:pack2', 'qty' => 2]]], 'invalid', 'pack qty 2');
    $bad(['lines' => [['sku' => 'noor-fes:pack1', 'qty' => 1], ['sku' => 'noor-fes:pack2', 'qty' => 1]]], 'invalid', 'two packs');
    $bad(['lines' => [['sku' => 'noor-fes:500', 'qty' => 1], ['sku' => 'noor-fes:pack1', 'qty' => 1]]], 'invalid', 'alias + pack (would merge to 2)');
    $bad(['lines' => [['sku' => 'noor-fes:pack4', 'qty' => 1]]], 'unknown_sku', 'no pack4');
    $bad(['lines' => [['sku' => 'extra-virgin:500', 'qty' => 1]]], 'unknown_sku', 'AV sku on the NF site');
    $payAdmin->post('/api/admin/payments', ['deliveryRM' => ['nf' => '0']]);
    reset_rates();
});

test('pay: address is one field 10..300; the old shape (lines + city) is joined, never dropped (B4)', function () use ($payAnon) {
    reset_rates();
    $one = fn (array $d) => $payAnon->post('/api/pay/create', pay_body(['lines' => [['sku' => 'organic:250', 'qty' => 1]], 'details' => $d]));
    $new = ['name' => 'Aisyah Rahman', 'phone' => '012-345 6789', 'address' => '12 Jalan Mawar, Taman Sri, Kajang', 'postcode' => '43000', 'state' => 'Selangor'];
    $r = $one($new);
    status($r, 200, 'new shape without city, note, email');
    $addr = json_decode((string) tdb()->query("SELECT address_json FROM orders WHERE ref = '{$r->json()['ref']}'")->fetchColumn(), true);
    eq($addr['address'], '12 Jalan Mawar, Taman Sri, Kajang', 'address kept');
    ok(!array_key_exists('city', $addr), 'no city key any more');
    $r = $one(['address' => "12 Jalan Mawar\nTaman Sri", 'city' => 'Kajang'] + $new);
    status($r, 200, 'old shape accepted');
    $addr = json_decode((string) tdb()->query("SELECT address_json FROM orders WHERE ref = '{$r->json()['ref']}'")->fetchColumn(), true);
    eq($addr['address'], '12 Jalan Mawar, Taman Sri, Kajang', 'old lines + city joined into the address');
    $err = fn ($r) => $r->json()['error']['fields']['address'] ?? null;
    eq($err($one(['address' => '123456789'] + $new)), 'tooShort', '9 characters rejected');
    eq($err($one(['address' => str_repeat('a', 300)] + $new)), null, '300 characters ok');
    eq($err($one(['address' => str_repeat('a', 301)] + $new)), 'tooLong', '301 rejected');
    eq($err($one(['address' => str_repeat('a', 295), 'city' => 'Kajang'] + $new)), 'tooLong', 'old shape: length checked after the join');
    eq($err($one(['address' => ''] + $new)), 'required', 'empty address');
    reset_rates();
});

test('pay: AV is one product + size per order, qty 1..24', function () use ($payAnon) {
    reset_rates();
    $code = fn (array $lines) => $payAnon->post('/api/pay/create', pay_body(['lines' => $lines]));
    status($code([['sku' => 'organic:250', 'qty' => 24]]), 200, 'qty 24 ok');
    eq($code([['sku' => 'organic:250', 'qty' => 0]])->json()['error']['fields'], ['lines' => 'qty'], 'qty 0');
    eq($code([['sku' => 'organic:250', 'qty' => 25]])->json()['error']['fields'], ['lines' => 'qty'], 'qty 25');
    eq($code([['sku' => 'organic:250', 'qty' => 1], ['sku' => 'organic:500', 'qty' => 1]])->json()['error']['fields'], ['lines' => 'invalid'], 'two lines');
    eq($code([['sku' => 'noor-fes:pack1', 'qty' => 1]])->json()['error']['code'], 'unknown_sku', 'NF pack on the AV site');
    reset_rates();
});

test('pay: rate limits: create 20 / 10 min per site, status 60 / 10 min per IP', function () use ($payAnon) {
    reset_rates();
    for ($i = 0; $i < 20; $i++) $payAnon->post('/api/pay/create', pay_body(['lines' => []]));
    $r = $payAnon->post('/api/pay/create', pay_body());
    status($r, 429, '21st create');
    status($payAnon->post('/api/pay/create', pay_body(['site' => 'nf', 'lines' => []])), 422, 'the NF bucket is separate');
    eq($r->header('Retry-After'), '600', 'retry after');
    reset_rates();
    for ($i = 0; $i < 60; $i++) $payAnon->get('/api/pay/status?ref=AV-000000-AAAA&t=x');
    status($payAnon->get('/api/pay/status?ref=AV-000000-AAAA&t=x'), 429, '61st status');
    reset_rates();
});

test('pay: admin orders list + recheck; unsent order email retried from the list (R15)', function () use ($payAdmin, $payAnon) {
    $l = $payAdmin->get('/api/admin/orders');
    status($l, 200, 'list');
    $all = $l->json()['orders'];
    ok(count($all) >= 6, 'orders listed: ' . count($all));
    $paid = array_values(array_filter($all, fn ($o) => $o['status'] === 'paid'));
    ok(count($paid) >= 2, 'paid orders');
    eq($paid[0]['phone'][0], '+', 'phone shown with +');
    ok(isset($paid[0]['createdMyt']) && preg_match('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/', $paid[0]['createdMyt']), 'MYT date');
    eq(count($payAdmin->get('/api/admin/orders?status=needs_review')->json()['orders']), 2, 'two under review');
    eq($l->json()['doublePaid'], 1, 'double payment badge');
    // an unsent email (mail cap hit) is sent on the next list view
    $ref = $paid[0]['ref'];
    tdb()->exec("UPDATE orders SET notified_at = NULL, last_notify_at = NULL WHERE ref = '$ref'");
    $before = count(mails());
    eq($payAdmin->get('/api/admin/orders')->json()['unnotified'], 0, 'retried and sent');
    eq(count(mails()), $before + 1, 'email sent from the list view');
    // recheck
    reset_rates();
    $j = $payAnon->post('/api/pay/create', pay_body(['lines' => [['sku' => 'fennel-anise:250', 'qty' => 1]]]))->json();
    $rid = (string) tdb()->query("SELECT request_id FROM pay_requests WHERE order_ref = '{$j['ref']}'")->fetchColumn();
    stub_pay($rid, null, 'grabpay');
    $r = $payAdmin->post('/api/admin/orders/' . $j['ref'] . '/recheck');
    status($r, 200, 'recheck');
    eq([$r->json()['status'], $r->json()['paymentType']], ['paid', 'grabpay'], 'paid after recheck');
    status($payAdmin->post('/api/admin/orders/AV-000000-AAAA/recheck'), 404, 'unknown order');
    status($payAnon->post('/api/admin/orders/' . $j['ref'] . '/recheck'), 401, 'recheck needs sign-in');
});

test('pay: order emails have their own hourly cap (a flooded form never holds a paid order)', function () {
    $now = time();
    $st = tdb()->prepare('INSERT INTO mail_log(at, purpose, ok) VALUES(?, ?, 1)');
    for ($i = 0; $i < 45; $i++) $st->execute([$now, 'form']);
    // a paid order now still emails
    tdb()->exec("UPDATE orders SET notified_at = NULL, last_notify_at = NULL WHERE status = 'paid' AND ref = (SELECT ref FROM orders WHERE status = 'paid' ORDER BY id DESC LIMIT 1)");
    $before = count(mails());
    $p = $GLOBALS['S']['pay1'];
    status((new Client())->get('/api/pay/status?ref=' . $p['ref'] . '&t=' . $p['token']), 200, 'status poll'); // a status poll retries unsent order emails
    eq(count(mails()), $before + 1, 'order email sent despite the form cap');
    tdb()->exec("DELETE FROM mail_log WHERE purpose = 'form'");
    reset_rates();
});

test('pay: delivery fee cleared in the panel closes online payment again', function () use ($payAdmin, $payAnon) {
    $g = $payAdmin->post('/api/admin/payments', ['deliveryRM' => ['nf' => null]])->json();
    eq($g['ready'], ['av' => true, 'nf' => false], 'nf closed');
    eq($payAnon->get('/api/pay/config?site=nf')->json()['ready'], false, 'config says closed');
    status($payAnon->post('/api/pay/create', pay_body(['site' => 'nf', 'lines' => [['sku' => 'noor-fes:pack1', 'qty' => 1]]])), 503, 'create refused');
    $payAdmin->post('/api/admin/payments', ['deliveryRM' => ['nf' => '0']]);
    reset_rates();
});

test('pay: reserved slug "order" (paid page /<lang>/order/paid) cannot become a CMS page', function () use ($payAdmin) {
    status($payAdmin->post('/api/pages', ['slug' => 'order', 'title' => L('T')]), 400, 'reserved slug order');
});

/* ---------------------------------------------------------------- review fixes (5800d08 review) */

test('pay review 1: limiter keys IPv6 on its /64; IPv4 as is', function () {
    if (!defined('AVO_CMS')) define('AVO_CMS', true);
    require_once dirname(__DIR__) . '/_lib/pay.php';
    eq(avo_pay_ip_key('2001:db8:aaaa:bbbb:1:2:3:4'), avo_pay_ip_key('2001:db8:aaaa:bbbb:ffff::9'), 'same /64 = same key');
    ok(avo_pay_ip_key('2001:db8:aaaa:bbbb::1') !== avo_pay_ip_key('2001:db8:aaaa:bbbc::1'), 'other /64 = other key');
    eq(avo_pay_ip_key('203.0.113.7'), '203.0.113.7', 'IPv4 unchanged');
});

test('pay review 2+3: owner email claimed once (no duplicate), retries throttled to >= 60 s, cap 200', function () use ($payAnon) {
    reset_rates();
    $p = $GLOBALS['S']['pay1'];
    tdb()->exec("UPDATE orders SET notified_at = NULL, last_notify_at = NULL, notify_attempts = 7 WHERE ref = '{$p['ref']}'");
    $before = count(mails());
    $q = '/api/pay/status?ref=' . $p['ref'] . '&t=' . $p['token'];
    $payAnon->get($q);
    $payAnon->get($q);
    eq(count(mails()), $before + 1, 'two polls, one email');
    eq((int) tdb()->query("SELECT notify_attempts FROM orders WHERE ref = '{$p['ref']}'")->fetchColumn(), 8, 'one claim');
    tdb()->exec("UPDATE orders SET notified_at = NULL, last_notify_at = " . time() . " WHERE ref = '{$p['ref']}'");
    $payAnon->get($q);
    eq(count(mails()), $before + 1, 'throttled: no retry within 60 s');
    tdb()->exec("UPDATE orders SET last_notify_at = " . (time() - 61) . " WHERE ref = '{$p['ref']}'");
    $payAnon->get($q);
    eq(count(mails()), $before + 2, 'retried after 60 s');
    tdb()->exec("UPDATE orders SET notified_at = NULL, last_notify_at = NULL, notify_attempts = 200 WHERE ref = '{$p['ref']}'");
    $payAnon->get($q);
    eq(count(mails()), $before + 2, 'cap 200 tries');
    tdb()->exec("UPDATE orders SET notified_at = " . time() . " WHERE ref = '{$p['ref']}'");
});

test('pay review 4: a click that finds another click creating the request hands out ITS url (one HitPay request)', function () use ($payAnon) {
    reset_rates();
    $body = pay_body(['lines' => [['sku' => 'organic:500', 'qty' => 2]]]);
    $j = $payAnon->post('/api/pay/create', $body)->json();
    $ref = $j['ref'];
    $creates = fn () => count(array_filter(stub()['calls'], fn ($c) => $c['method'] === 'POST'));
    tdb()->exec("UPDATE pay_requests SET created_at = created_at - 1300 WHERE order_ref = '$ref'");
    tdb()->exec("UPDATE orders SET creating_at = " . time() . " WHERE ref = '$ref'");
    $url = 'https://checkout.hit-pay.com/payment-request/@berkat-madinah/parallel-req-0001/checkout';
    tdb()->exec("INSERT INTO pay_requests(order_ref, request_id, url, amount_sen, status, created_at) VALUES('$ref', 'parallel-req-0001', '$url', " . (int) $j['total_sen'] . ", 'pending', " . time() . ")");
    $n = $creates();
    $r = $payAnon->post('/api/pay/create', $body);
    status($r, 200, 'second click');
    eq($r->json()['url'], $url, 'same url as the click that created it');
    eq($creates(), $n, 'no second HitPay request');
    tdb()->exec("UPDATE orders SET creating_at = NULL WHERE ref = '$ref'");
    tdb()->exec("UPDATE pay_requests SET created_at = created_at - 1300 WHERE order_ref = '$ref'");
    $payAnon->post('/api/pay/create', $body);
    eq($creates(), $n + 1, 'a new request when nothing is open');
    eq(tdb()->query("SELECT creating_at FROM orders WHERE ref = '$ref'")->fetchColumn(), null, 'claim released');
});

test('pay review 5: a bad-hmac webhook stores nothing, logs at most once a minute with the raw-+ diagnostic', function () use ($payAnon) {
    $n = (int) tdb()->query('SELECT COUNT(*) FROM pay_events')->fetchColumn();
    @unlink(C('data') . '/logs/.hitpay-bad-hmac');
    $logBefore = substr_count((string) @file_get_contents(C('data') . '/logs/cms.log'), 'hitpay webhook: bad hmac');
    for ($i = 0; $i < 3; $i++) {
        status($payAnon->req('POST', '/api/pay/webhook', ['raw' => true, 'body' => 'payment_request_id=x&amount=1+2&hmac=deadbeef']), 401, 'bad hmac');
    }
    eq((int) tdb()->query('SELECT COUNT(*) FROM pay_events')->fetchColumn(), $n, 'nothing stored');
    $log = (string) file_get_contents(C('data') . '/logs/cms.log');
    eq(substr_count($log, 'hitpay webhook: bad hmac') - $logBefore, 1, 'one log line for three calls');
    contains($log, '"rawPlus":true', 'diagnostic: raw body had an unencoded +');
});

test('pay review 6: a real customer may poll beyond the guessing limit; guesses still 429', function () use ($payAnon) {
    reset_rates();
    $p = $GLOBALS['S']['pay1'];
    for ($i = 0; $i < 70; $i++) $r = $payAnon->get('/api/pay/status?ref=' . $p['ref'] . '&t=' . $p['token']);
    status($r, 200, '70th valid poll');
    for ($i = 0; $i < 60; $i++) $payAnon->get('/api/pay/status?ref=AV-000000-AAAA&t=x');
    status($payAnon->get('/api/pay/status?ref=AV-000000-AAAA&t=x'), 429, '61st bad poll');
    status($payAnon->get('/api/pay/status?ref=' . $p['ref'] . '&t=' . $p['token']), 200, 'the real customer is not blocked by guesses');
    reset_rates();
});
