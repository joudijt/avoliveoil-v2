<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/*
 * Online payment through HitPay (FORGE HITPAY, docs/forge/HITPAY-FORGE-SPEC.md §5 + RULINGS).
 * Serves avoliveoil.com (site "av") and the Noor Fès page under /noor-fes (site "nf").
 *
 * Core rule (§2): nothing marks an order paid except a server-side GET of the payment request
 * that returns completed + MYR + the exact amount in sen + our reference + our request id + a
 * succeeded payment covering the total. The webhook and the return page only TRIGGER that fetch.
 *
 * One pay_requests row per HitPay request (R1): never overwritten, never DELETEd. Any verified
 * completed request pays its order; a second one on an already paid order is flagged for refund.
 * Secrets (R3) are encrypted in the settings table with a key derived from secret.key.
 * HitPay is never called inside db_tx (BEGIN IMMEDIATE would block CMS writes meanwhile).
 */

const AVO_HITPAY_BASE_DEFAULT = 'https://api.hit-pay.com/v1';
const AVO_PAY_SITES = ['av', 'nf'];
const AVO_PAY_PREFIX = ['av' => 'AV', 'nf' => 'NF'];
const AVO_PAY_MAX_QTY = 24;
const AVO_PAY_MAX_LINES = 1; // BUY-NOW: one product per order
/** NEW orders per IP (/64) per site per 10 min (BUY-NOW rulings); idem reuse does not count. */
const AVO_PAY_CREATE_LIMIT = 20;
/** NEW orders per IP (/64) across both sites per 10 min (BUY-NOW review 2). */
const AVO_PAY_CREATE_LIMIT_ALL = 30;
/** Old Noor Fès SKUs and the old address shape are accepted until this moment (BUY-NOW B4, 30 days). */
const AVO_PAY_LEGACY_UNTIL = '2026-12-17 00:00 Asia/Kuala_Lumpur';
/** An older pending order of the same buyer (site + phone) younger than this is superseded by a new one. */
const AVO_PAY_SUPERSEDE_SECONDS = 60 * 60;
const AVO_PAY_MIN_SEN = 30;
const AVO_PAY_REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
/** A pending request younger than this with the same amount is handed out again (R17). */
const AVO_PAY_REUSE_SECONDS = 20 * 60;
const AVO_PAY_EXPIRES_AFTER = '60 mins';
/** The status poll asks HitPay at most this often per order (§5.3). */
const AVO_PAY_FETCH_EVERY = 10;
const AVO_PAY_CHECKOUT_HOST = 'checkout.hit-pay.com';
/** Paid-order email retries at most this often per order, up to AVO_PAY_NOTIFY_MAX tries (review 3). */
const AVO_PAY_NOTIFY_EVERY = 60;
const AVO_PAY_NOTIFY_MAX = 200;
/** A click that claimed an order may hold the claim this long while it talks to HitPay (review 4). */
const AVO_PAY_CLAIM_SECONDS = 30;
/** Status polls: a valid ref+token gets the high limit; anything else the low one (review 6). */
const AVO_PAY_STATUS_LIMIT_OK = 240;
const AVO_PAY_STATUS_LIMIT_BAD = 60;

/* ---------------------------------------------------------------- settings + secrets */

/** Base URL of the HitPay API. AVO_HITPAY_BASE (tests: a local stub) wins over the live default. */
function avo_hitpay_base(): string
{
    $env = getenv('AVO_HITPAY_BASE');
    if (is_string($env) && $env !== '') {
        $u = rtrim($env, '/');
        $p = parse_url($u);
        $host = strtolower((string) ($p['host'] ?? ''));
        // Only https, or plain http to this machine (the test stub). Anything else is ignored.
        if (($p['scheme'] ?? '') === 'https' || (($p['scheme'] ?? '') === 'http' && in_array($host, ['127.0.0.1', 'localhost'], true))) {
            return $u;
        }
    }
    return AVO_HITPAY_BASE_DEFAULT;
}

function avo_pay_cipher_key(): string
{
    return hash_hmac('sha256', 'avo-hitpay-settings-v1', avo_secret(), true);
}

function avo_pay_encrypt(string $plain): string
{
    $key = avo_pay_cipher_key();
    if (function_exists('sodium_crypto_secretbox')) {
        $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
        return 's1:' . base64_encode($nonce . sodium_crypto_secretbox($plain, $nonce, $key));
    }
    $iv = random_bytes(12);
    $tag = '';
    $ct = openssl_encrypt($plain, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);
    if ($ct === false) throw new RuntimeException('encryption failed');
    return 'o1:' . base64_encode($iv . $tag . $ct);
}

function avo_pay_decrypt(?string $stored): ?string
{
    if ($stored === null || $stored === '') return null;
    $key = avo_pay_cipher_key();
    $raw = base64_decode(substr($stored, 3), true);
    if ($raw === false) return null;
    if (str_starts_with($stored, 's1:') && function_exists('sodium_crypto_secretbox_open')) {
        $n = SODIUM_CRYPTO_SECRETBOX_NONCEBYTES;
        if (strlen($raw) <= $n) return null;
        $out = sodium_crypto_secretbox_open(substr($raw, $n), substr($raw, 0, $n), $key);
        return $out === false ? null : $out;
    }
    if (str_starts_with($stored, 'o1:') && strlen($raw) > 28) {
        $out = openssl_decrypt(substr($raw, 28), 'aes-256-gcm', $key, OPENSSL_RAW_DATA, substr($raw, 0, 12), substr($raw, 12, 16));
        return $out === false ? null : $out;
    }
    return null;
}

/** @return array{api_key:?string, salt:?string} */
function avo_hitpay_keys(): array
{
    return [
        'api_key' => avo_pay_decrypt(avo_setting('hitpay.api_key')),
        'salt' => avo_pay_decrypt(avo_setting('hitpay.salt')),
    ];
}

/** Delivery fee of a site in sen; null = not set = online payment closed for that site (§5.1, R3). */
function avo_pay_delivery_sen(string $site): ?int
{
    $v = avo_setting('hitpay.delivery_sen.' . $site);
    return ($v === null || !preg_match('/^\d{1,7}$/', $v)) ? null : (int) $v;
}

/** Server price table written at build by scripts/build-prices.mjs. */
function avo_pay_prices(): array
{
    static $p = null;
    if ($p !== null) return $p;
    $p = avo_read_json(AVO_BUILD_DATA . '/prices.json') ?? [];
    return $p;
}

/** Sen of a SKU on a site (aliases resolved), or null when the SKU is not sold there. */
function avo_pay_price(string $site, string $sku): ?array
{
    $p = avo_pay_prices();
    if (avo_pay_legacy_open()) $sku = (string) ($p['aliases'][$site][$sku] ?? $sku);
    $sen = $p[$site][$sku] ?? null;
    return is_int($sen) && $sen > 0 ? ['sku' => $sku, 'sen' => $sen] : null;
}

/**
 * True while the 30-day legacy window is open (old NF SKUs, old address shape). The setting
 * `hitpay.legacy_until` (unix seconds) overrides the date: the integrator can end it early, tests use it.
 */
function avo_pay_legacy_open(): bool
{
    $set = avo_setting('hitpay.legacy_until');
    $until = ($set !== null && preg_match('/^\d{1,12}$/', $set)) ? (int) $set : (int) strtotime(AVO_PAY_LEGACY_UNTIL);
    return avo_now() < $until;
}

function avo_pay_ready(string $site): bool
{
    if (!in_array($site, AVO_PAY_SITES, true)) return false;
    $k = avo_hitpay_keys();
    return $k['api_key'] !== null && $k['salt'] !== null && avo_pay_delivery_sen($site) !== null && !empty(avo_pay_prices()[$site]);
}

/**
 * Who gets the "paid order" email (R15). Setting first; else the first recipient of the
 * oldest live form (the contact form on this site); else the System email; else the first user.
 */
function avo_pay_notify_default(): string
{
    $row = db_one('SELECT recipients_json FROM forms WHERE deleted_at IS NULL ORDER BY id LIMIT 1');
    $list = $row ? (json_decode((string) $row['recipients_json'], true) ?: []) : [];
    if (isset($list[0]) && is_string($list[0]) && avo_valid_email($list[0])) return $list[0];
    return (string) (avo_settings_get()['systemEmail'] ?? '');
}

function avo_pay_notify_email(): string
{
    $v = (string) avo_setting('hitpay.notify_email', '');
    return $v !== '' ? $v : avo_pay_notify_default();
}

/**
 * Extra order-email inboxes per site, on top of the notify address (owner 2026-11-17: one for Noor Fès).
 * Kept OUT of git (the repo is public): `pay-local.php` next to this file returns e.g. ['nf' => ['x@y.com']].
 * It is uploaded by hand and protected from `ftp-deploy.py --clean`. AVO_PAY_NOTIFY_EXTRA_FILE (tests) wins.
 * Missing or broken file = no extra inboxes.
 */
function avo_pay_site_notify_extra(): array
{
    static $map = null;
    if ($map !== null) return $map;
    $env = getenv('AVO_PAY_NOTIFY_EXTRA_FILE');
    $file = is_string($env) && $env !== '' ? $env : __DIR__ . '/pay-local.php';
    $v = is_file($file) ? (static fn () => include $file)() : null;
    return $map = is_array($v) ? $v : [];
}

/** Every valid recipient of the order emails of one site: the notify address + that site's extra inboxes. */
function avo_pay_notify_list(string $site): array
{
    $list = array_merge([avo_pay_notify_email()], (array) (avo_pay_site_notify_extra()[$site] ?? []));
    $list = array_map(fn ($e) => strtolower(trim((string) $e)), $list);
    return array_values(array_unique(array_filter($list, 'avo_valid_email')));
}

/* ---------------------------------------------------------------- money + text helpers */

function avo_sen_str(int $sen): string
{
    return intdiv($sen, 100) . '.' . str_pad((string) ($sen % 100), 2, '0', STR_PAD_LEFT);
}

/** '149.00' / '149' / 149 -> 14900 without float maths; null for anything else. */
function avo_amount_to_sen(mixed $v): ?int
{
    if (is_int($v)) return $v >= 0 ? $v * 100 : null;
    if (is_float($v)) $v = number_format($v, 2, '.', '');
    if (!is_string($v) || !preg_match('/^(\d{1,7})(?:\.(\d{1,2}))?$/', trim($v), $m)) return null;
    return (int) $m[1] * 100 + (int) str_pad($m[2] ?? '', 2, '0');
}

/**
 * The client as the limiter sees it: an IPv4 address, or the /64 prefix of an IPv6 address
 * (one customer line gets a whole /64; keying on the full address lets one client rotate freely).
 */
function avo_pay_ip_key(string $ip): string
{
    if (str_contains($ip, ':')) {
        $bin = @inet_pton($ip);
        if ($bin !== false && strlen($bin) === 16) return 'v6:' . bin2hex(substr($bin, 0, 8));
    }
    return $ip;
}

function avo_pay_ip_hash(): string
{
    return hash_hmac('sha256', avo_pay_ip_key(avo_ip()), avo_secret());
}

/** SQLite limiter (R16): $limit hits per $window seconds per IP (/64) and bucket; 429 when over. Count + insert in one transaction. */
function avo_rate_hit(string $bucket, int $limit, int $window): void
{
    $ip = avo_pay_ip_hash();
    $now = avo_now();
    $over = db_tx(function () use ($bucket, $ip, $now, $limit, $window) {
        $n = (int) db_val('SELECT COUNT(*) FROM rate_hits WHERE bucket = ? AND ip_hash = ? AND ts > ?', [$bucket, $ip, $now - $window]);
        if ($n >= $limit) return true;
        db_exec('INSERT INTO rate_hits(bucket, ip_hash, ts) VALUES(?, ?, ?)', [$bucket, $ip, $now]);
        db_exec('DELETE FROM rate_hits WHERE ts < ?', [$now - 86400]);
        return false;
    });
    if ($over) {
        avo_fail(429, 'rate_limited', 'Too many tries from your connection. Please wait a few minutes and try again.', null, ['Retry-After' => (string) $window]);
    }
}

/** Mirror of core.ts cleanText for one line: controls + bidi out, white space collapsed, trimmed. */
function avo_pay_clean(mixed $v, bool $multiline = false): string
{
    if (is_int($v) || is_float($v)) $v = (string) $v;
    if (!is_string($v)) return '';
    $v = mb_scrub($v, 'UTF-8');
    $v = (string) preg_replace('/[\x{202a}-\x{202e}\x{2066}-\x{2069}]/u', '', $v);
    if ($multiline) {
        $v = str_replace(["\r\n", "\r"], "\n", $v);
        $lines = array_filter(array_map(fn ($l) => trim((string) preg_replace('/[\p{Cc}\s]+/u', ' ', $l)), explode("\n", $v)), fn ($l) => $l !== '');
        return implode("\n", $lines);
    }
    return trim((string) preg_replace('/[\p{Cc}\s]+/u', ' ', $v));
}

function avo_pay_blank(string $v): bool
{
    return trim((string) preg_replace('/\p{Cf}/u', '', $v)) === '';
}

/** Arabic-Indic, Extended Arabic-Indic and full-width digits -> ASCII (core.ts asciiDigits). */
function avo_pay_ascii_digits(string $s): string
{
    return (string) preg_replace_callback('/[\x{0660}-\x{0669}\x{06f0}-\x{06f9}\x{ff10}-\x{ff19}]/u', function ($m) {
        $c = mb_ord($m[0]);
        return (string) ($c >= 0xff10 ? $c - 0xff10 : ($c >= 0x06f0 ? $c - 0x06f0 : $c - 0x0660));
    }, $s);
}

/** Malaysian mobile -> '60…' digits or null (core.ts normalisePhone). */
function avo_pay_phone(string $raw): ?string
{
    $s = (string) preg_replace('/[\s().\-\x{00ad}\x{2010}-\x{2015}\x{200b}-\x{200f}\x{202a}-\x{202e}\x{2060}\x{2066}-\x{2069}]/u', '', avo_pay_ascii_digits($raw));
    return preg_match('/^(?:\+?600?|0)?(1(?:[02-46-9]\d{7}|[15]\d{8}))$/', $s, $m) ? '60' . $m[1] : null;
}

/**
 * Same rules as core.ts validateDetails (name 60, address 10..300 in ONE field, note 200, MY mobile,
 * 5-digit postcode, one of the 16 states). Address and note may hold line breaks.
 * @return array{0: array, 1: array<string,string>} [details, errors]
 */
function avo_pay_validate_details(mixed $raw): array
{
    $raw = is_array($raw) ? $raw : [];
    $states = avo_pay_prices()['states'] ?? [];
    $e = [];
    $text = function (string $f, int $max, bool $req, bool $multi = false) use ($raw, &$e): string {
        $v = avo_pay_clean($raw[$f] ?? '', $multi);
        if (avo_pay_blank($v)) {
            if ($req) $e[$f] = 'required';
            return '';
        }
        if (mb_strlen($v) > $max) $e[$f] = 'tooLong';
        return $v;
    };
    $name = $text('name', 60, true);
    $phoneTyped = avo_pay_clean($raw['phone'] ?? '');
    $phone = avo_pay_phone(is_string($raw['phone'] ?? null) ? $raw['phone'] : $phoneTyped);
    if (avo_pay_blank($phoneTyped)) $e['phone'] = 'required';
    elseif ($phone === null) $e['phone'] = 'phone';
    // BUY-NOW B4: the address is ONE field (10..300). For 30 days (until 2026-12-16) a stale client
    // may still send the old shape (address lines + city): its lines and city are joined into the
    // address before the length check, so nothing is silently dropped.
    $rawAddress = avo_pay_clean($raw['address'] ?? '', true);
    $oldCity = avo_pay_clean($raw['city'] ?? '');
    if (!avo_pay_blank($oldCity) && !avo_pay_legacy_open()) {
        $e['city'] = 'stale'; // the window is over: an old page must be reloaded, never a silent drop
    } elseif (!avo_pay_blank($oldCity)) {
        $parts = array_values(array_filter(array_map('trim', preg_split('/\n+/', $rawAddress) ?: []), fn ($x) => $x !== ''));
        $parts[] = $oldCity;
        $rawAddress = implode(', ', $parts);
    }
    $address = '';
    if (avo_pay_blank($rawAddress)) $e['address'] = 'required';
    else {
        $address = $rawAddress;
        $n = mb_strlen($address);
        if ($n > 300) $e['address'] = 'tooLong';
        elseif ($n < 10) $e['address'] = 'tooShort';
    }
    $postcode = avo_pay_ascii_digits(avo_pay_clean($raw['postcode'] ?? ''));
    if (avo_pay_blank($postcode)) $e['postcode'] = 'required';
    elseif (!preg_match('/^\d{5}$/', $postcode)) $e['postcode'] = 'postcode';
    $state = avo_pay_clean($raw['state'] ?? '');
    if (avo_pay_blank($state)) $e['state'] = 'required';
    elseif (!in_array($state, $states, true)) $e['state'] = 'state';
    $note = $text('note', 200, false, true);
    $email = strtolower(avo_pay_clean($raw['email'] ?? ''));
    if ($email !== '' && !avo_valid_email($email)) $e['email'] = 'email';
    return [compact('name', 'phone', 'address', 'postcode', 'state', 'note', 'email'), $e];
}

/** 'AV-261116-7KQ4' — the day in Malaysia (minor 27), crypto-random tail. */
function avo_pay_make_ref(string $site): string
{
    $day = (new DateTimeImmutable('now', new DateTimeZone('Asia/Kuala_Lumpur')))->format('ymd');
    $tail = '';
    foreach (str_split(random_bytes(4)) as $b) $tail .= AVO_PAY_REF_ALPHABET[ord($b) & 31];
    return AVO_PAY_PREFIX[$site] . '-' . $day . '-' . $tail;
}

function avo_pay_redirect_url(string $site, string $lang, string $ref, string $token): string
{
    $q = '?ref=' . rawurlencode($ref) . '&t=' . $token;
    if ($site === 'nf') return AVO_SITE_URL . '/noor-fes/' . ($lang === 'ms' ? 'ms/' : '') . 'paid/' . $q;
    return AVO_SITE_URL . '/' . $lang . '/order/paid' . $q;
}

/* ---------------------------------------------------------------- HitPay HTTP */

/** getCode() = the HTTP status HitPay answered (0 = not reached). */
final class AvoPayError extends RuntimeException
{
}

/**
 * One call to the HitPay API. Headers (the key) are never logged. Throws AvoPayError on a
 * network failure, a non-JSON answer or a status outside 2xx.
 */
function avo_hitpay_call(string $method, string $path, array $form = [], int $timeout = 20, ?string $apiKey = null): array
{
    $apiKey ??= avo_hitpay_keys()['api_key'];
    if ($apiKey === null) throw new AvoPayError('HitPay key not set');
    $url = avo_hitpay_base() . $path;
    $headers = ['X-BUSINESS-API-KEY: ' . $apiKey, 'X-Requested-With: XMLHttpRequest', 'Accept: application/json'];
    $body = $method === 'POST' ? http_build_query($form, '', '&', PHP_QUERY_RFC3986) : null;
    if ($body !== null) $headers[] = 'Content-Type: application/x-www-form-urlencoded';
    $status = 0;
    $text = '';
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => $timeout,
            CURLOPT_CONNECTTIMEOUT => min(10, $timeout),
            CURLOPT_FOLLOWLOCATION => false,
        ]);
        if ($body !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        $res = curl_exec($ch);
        if ($res === false) {
            $err = curl_error($ch);
            throw new AvoPayError('HitPay unreachable: ' . mb_substr($err, 0, 160));
        }
        $text = (string) $res;
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    } else {
        $ctx = stream_context_create(['http' => [
            'method' => $method, 'header' => implode("\r\n", $headers), 'content' => $body ?? '',
            'timeout' => $timeout, 'ignore_errors' => true, 'follow_location' => 0,
        ]]);
        $res = @file_get_contents($url, false, $ctx);
        if ($res === false) throw new AvoPayError('HitPay unreachable');
        $text = $res;
        foreach ($http_response_header ?? [] as $h) {
            if (preg_match('~^HTTP/\S+\s+(\d{3})~', $h, $m)) $status = (int) $m[1];
        }
    }
    $data = json_decode($text, true);
    if ($status < 200 || $status >= 300 || !is_array($data)) {
        avo_log('error', 'hitpay ' . $method . ' ' . preg_replace('~/[0-9a-f-]{20,}~i', '/{id}', $path) . ' -> ' . $status, ['body' => mb_substr($text, 0, 300)]);
        throw new AvoPayError('HitPay answered ' . $status, $status);
    }
    return $data;
}

/**
 * R11: hmac over the RAW form body. Every field except hmac, sorted by key, "key.value" joined,
 * hash_hmac sha256 with the salt (HitPay PHP SDK generateSignatureArray).
 */
function avo_hitpay_signature(array $fields, string $salt): string
{
    unset($fields['hmac']);
    ksort($fields);
    $s = '';
    foreach ($fields as $k => $v) $s .= $k . (is_array($v) ? '' : (string) $v);
    return hash_hmac('sha256', $s, $salt);
}

/* ---------------------------------------------------------------- verify by fetch (§2) */

/**
 * Asks HitPay about one request we issued and applies the answer. Returns the request status
 * we hold afterwards: pending | completed | needs_review | double_paid | expired | canceled | unknown.
 * Throws AvoPayError when HitPay cannot be asked.
 */
function avo_pay_settle(string $requestId, int $timeout = 20): string
{
    $pr = db_one('SELECT * FROM pay_requests WHERE request_id = ?', [$requestId]);
    if (!$pr) return 'unknown';
    if ($pr['status'] !== 'pending') return (string) $pr['status'];
    $order = db_one('SELECT * FROM orders WHERE ref = ?', [$pr['order_ref']]);
    if (!$order) return 'unknown';
    $now = avo_now();
    db_exec('UPDATE orders SET last_fetch_at = ? WHERE ref = ?', [$now, $order['ref']]);
    try {
        $data = avo_hitpay_call('GET', '/payment-requests/' . rawurlencode($requestId), [], $timeout);
    } catch (AvoPayError $e) {
        if ($e->getCode() !== 404) throw $e;
        // HitPay no longer knows this request (deleted): nothing can ever be paid on it.
        $data = ['status' => 'canceled'];
        db_exec('UPDATE pay_requests SET note = COALESCE(note, ?) WHERE id = ?', ['gone at HitPay (404)', $pr['id']]);
    }
    db_exec('UPDATE pay_requests SET checked_at = ? WHERE id = ?', [$now, $pr['id']]);
    $st = strtolower((string) ($data['status'] ?? ''));

    if ($st === 'completed') {
        $problem = avo_pay_verify($data, $pr, $order);
        if ($problem !== null) {
            db_exec("UPDATE pay_requests SET status = 'needs_review', note = ? WHERE id = ? AND status = 'pending'", [$problem, $pr['id']]);
            db_exec('UPDATE orders SET review_at = COALESCE(review_at, ?) WHERE ref = ?', [$now, $order['ref']]);
            avo_log('warn', 'hitpay completed request needs review', ['ref' => $order['ref'], 'why' => $problem]);
            avo_pay_alert($order['ref'], $requestId, 'needs_review', $problem);
            return 'needs_review';
        }
        $type = mb_substr(avo_pay_clean(avo_pay_succeeded($data)['type'] ?? ''), 0, 40) ?: null;
        $paidNow = db_tx(function () use ($pr, $order, $type, $now, $requestId) {
            db_exec("UPDATE pay_requests SET status = 'completed', payment_type = ? WHERE id = ? AND status = 'pending'", [$type, $pr['id']]);
            return db_exec("UPDATE orders SET status = 'paid', paid_at = ?, paid_request_id = ?, payment_type = ? WHERE ref = ? AND status IN ('pending','failed')",
                [$now, $requestId, $type, $order['ref']]) === 1;
        });
        if ($paidNow) {
            avo_log('info', 'order paid', ['ref' => $order['ref'], 'type' => $type]);
            avo_pay_notify_paid(3);
            return 'completed';
        }
        $fresh = db_one('SELECT status, paid_request_id FROM orders WHERE ref = ?', [$order['ref']]);
        if ($fresh && $fresh['status'] === 'paid' && $fresh['paid_request_id'] !== $requestId) {
            // R1: a second request of the same order was paid as well. Never auto-refund.
            db_exec("UPDATE pay_requests SET status = 'double_paid' WHERE id = ?", [$pr['id']]);
            avo_pay_alert($order['ref'], $requestId, 'double_paid', 'This order was already paid by another payment. Refund this one in the HitPay dashboard.');
            return 'double_paid';
        }
        return 'completed';
    }
    if (in_array($st, ['expired', 'canceled', 'cancelled', 'inactive'], true)) {
        $final = $st === 'expired' ? 'expired' : 'canceled';
        db_exec("UPDATE pay_requests SET status = ? WHERE id = ? AND status = 'pending'", [$final, $pr['id']]);
        $open = (int) db_val("SELECT COUNT(*) FROM pay_requests WHERE order_ref = ? AND status = 'pending'", [$order['ref']]);
        if ($open === 0) db_exec("UPDATE orders SET status = 'failed' WHERE ref = ? AND status = 'pending'", [$order['ref']]);
        return $final;
    }
    // pending, or request-level "failed" (the buyer can retry on the same HitPay page: minor 26)
    return 'pending';
}

/** The succeeded payments of a request: total sen + the first method name. */
function avo_pay_succeeded(array $data): array
{
    $sum = 0;
    $type = null;
    $refund = false;
    foreach (is_array($data['payments'] ?? null) ? $data['payments'] : [] as $p) {
        if (!is_array($p)) continue;
        $ps = strtolower((string) ($p['status'] ?? ''));
        if (str_contains($ps, 'refund')) $refund = true;
        if ($ps !== 'succeeded') continue;
        if (strtoupper((string) ($p['currency'] ?? 'MYR')) !== 'MYR') continue;
        $sum += avo_amount_to_sen($p['amount'] ?? null) ?? 0;
        $type ??= is_string($p['payment_type'] ?? null) ? $p['payment_type'] : null;
    }
    return ['sum' => $sum, 'type' => $type, 'refund' => $refund];
}

/** null when the completed request pays exactly this order, else the reason it does not. */
function avo_pay_verify(array $data, array $pr, array $order): ?string
{
    $total = (int) $order['total_sen'];
    if ((string) ($data['id'] ?? '') !== (string) $pr['request_id']) return 'request id differs';
    if (strtoupper((string) ($data['currency'] ?? '')) !== 'MYR') return 'currency is not MYR';
    $amount = avo_amount_to_sen($data['amount'] ?? null);
    if ($amount === null || $amount !== $total || (int) $pr['amount_sen'] !== $total) return 'amount ' . ($amount === null ? '?' : avo_sen_str($amount)) . ' is not ' . avo_sen_str($total);
    if ((string) ($data['reference_number'] ?? '') !== (string) $order['ref']) return 'reference differs';
    $s = avo_pay_succeeded($data);
    if ($s['refund']) return 'a payment of this request was refunded';
    if ($s['sum'] !== $total) return 'succeeded payments add up to ' . avo_sen_str($s['sum']) . ', not ' . avo_sen_str($total);
    return null;
}

/** Settles every pending request of an order (newest first, at most $max). Errors are swallowed. */
function avo_pay_refresh_order(string $ref, int $max = 2, int $timeout = 8): void
{
    $rows = db_all("SELECT request_id FROM pay_requests WHERE order_ref = ? AND status = 'pending' ORDER BY id DESC LIMIT " . (int) $max, [$ref]);
    foreach ($rows as $r) {
        try {
            avo_pay_settle((string) $r['request_id'], $timeout);
        } catch (AvoPayError $e) {
            avo_log('warn', 'hitpay fetch failed', ['ref' => $ref, 'error' => $e->getMessage()]);
            return;
        }
    }
}

/** No cron on this host (§2): each create call re-checks up to 2 stale pending orders, 5 s each (minor 35). */
function avo_pay_sweep(): void
{
    $now = avo_now();
    $rows = db_all("SELECT ref FROM orders WHERE status = 'pending' AND review_at IS NULL AND created_at BETWEEN ? AND ?
        AND (last_fetch_at IS NULL OR last_fetch_at < ?) ORDER BY created_at LIMIT 2", [$now - 48 * 3600, $now - 300, $now - 120]);
    foreach ($rows as $r) avo_pay_refresh_order((string) $r['ref'], 1, 5);
}

/* ---------------------------------------------------------------- owner email (§5.4, R15) */

function avo_pay_order_text(array $o): string
{
    $lines = json_decode((string) $o['lines_json'], true) ?: [];
    $addr = json_decode((string) $o['address_json'], true) ?: [];
    $out = [];
    foreach ($lines as $i => $l) {
        // BUY-NOW B3: a package line reads "Noor Fès, 2 bottles (500 ml each)", never "x 1"
        $what = !empty($l['pack']) ? ($l['name'] ?? $l['sku']) : ($l['name'] ?? $l['sku']) . ' x ' . $l['qty'];
        $out[] = ($i + 1) . '. ' . $what . ' = RM ' . avo_sen_str((int) $l['unit_sen'] * (int) $l['qty']);
    }
    $out[] = 'Subtotal: RM ' . avo_sen_str((int) $o['subtotal_sen']);
    $out[] = 'Delivery: ' . ((int) $o['delivery_sen'] === 0 ? 'Free' : 'RM ' . avo_sen_str((int) $o['delivery_sen']));
    $out[] = 'Total: RM ' . avo_sen_str((int) $o['total_sen']);
    $out[] = 'Paid with: ' . ($o['payment_type'] ? $o['payment_type'] . ' (HitPay)' : 'HitPay');
    $out[] = '';
    $out[] = 'Name: ' . $o['name'];
    $out[] = 'Phone: +' . $o['phone'];
    if (!empty($o['email'])) $out[] = 'Email: ' . $o['email'];
    // city only exists on orders placed before BUY-NOW (now part of the address)
    $out[] = 'Address: ' . str_replace("\n", ', ', (string) ($addr['address'] ?? '')) . ', ' . trim(($addr['postcode'] ?? '') . ' ' . ($addr['city'] ?? '')) . ', ' . ($addr['state'] ?? '');
    if (!empty($addr['note'])) $out[] = 'Note: ' . str_replace("\n", ' / ', (string) $addr['note']);
    $out[] = 'Language: ' . $o['lang'];
    $out[] = 'Order placed: ' . avo_pay_myt((int) $o['created_at']) . ' (Malaysia time)';
    return implode("\n", $out);
}

function avo_pay_myt(int $ts): string
{
    return (new DateTimeImmutable('@' . $ts))->setTimezone(new DateTimeZone('Asia/Kuala_Lumpur'))->format('Y-m-d H:i');
}

function avo_pay_site_name(string $site): string
{
    return $site === 'nf' ? 'Noor Fès' : 'Arabian Village';
}

/** What the buyer sees on the HitPay page (review m2): "Noor Fès order NF-… (2 bottles)". */
function avo_pay_purpose(string $site, string $ref, array $lines): string
{
    $l = $lines[0] ?? null;
    $what = '';
    if (is_array($l)) $what = $site === 'nf' ? ((int) ($l['bottles'] ?? 1)) . ' bottle' . (((int) ($l['bottles'] ?? 1)) === 1 ? '' : 's') : ((string) ($l['name'] ?? '')) . ' x ' . (int) $l['qty'];
    return avo_pay_site_name($site) . ' order ' . $ref . ($what !== '' ? ' (' . $what . ')' : '');
}

/**
 * Emails paid orders whose email has not gone out yet, oldest first, at most $max per call.
 * notified_at is set only when the mailer says "sent" (R15); held/failed are retried later.
 */
function avo_pay_notify_paid(int $max = 3): void
{
    $now = avo_now();
    $rows = db_all("SELECT * FROM orders WHERE status = 'paid' AND notified_at IS NULL AND notify_attempts < ? AND (last_notify_at IS NULL OR last_notify_at <= ?)
        ORDER BY paid_at LIMIT " . (int) $max, [AVO_PAY_NOTIFY_MAX, $now - AVO_PAY_NOTIFY_EVERY]);
    foreach ($rows as $o) {
        $to = avo_pay_notify_list((string) $o['site']);
        if (!$to) continue;
        // Claim the row (compare-and-set on notify_attempts): two parallel polls never both send.
        $claimed = db_exec('UPDATE orders SET notify_attempts = notify_attempts + 1, last_notify_at = ?
            WHERE ref = ? AND notified_at IS NULL AND notify_attempts = ? AND (last_notify_at IS NULL OR last_notify_at <= ?)',
            [$now, $o['ref'], (int) $o['notify_attempts'], $now - AVO_PAY_NOTIFY_EVERY]);
        if ($claimed !== 1) continue;
        $subject = 'Paid order ' . $o['ref'] . ' RM ' . avo_sen_str((int) $o['total_sen']) . ' (' . avo_pay_site_name((string) $o['site']) . ')';
        $text = 'A customer paid online for this order. Payment checked with HitPay.' . "\n\n" . avo_pay_order_text($o) . "\n";
        $html = '<pre style="font:14px/1.5 sans-serif;white-space:pre-wrap">' . htmlspecialchars($text, ENT_QUOTES, 'UTF-8') . '</pre>';
        $r = avo_mail_send($to, $subject, $text, $html, null, 'order');
        if ($r['status'] === 'sent') db_exec('UPDATE orders SET notified_at = ? WHERE ref = ?', [avo_now(), $o['ref']]);
    }
}

/** One-off owner alert for a request that needs a human (needs_review / double payment). */
function avo_pay_alert(string $ref, string $requestId, string $kind, string $why): void
{
    $o = db_one('SELECT * FROM orders WHERE ref = ?', [$ref]);
    if (!$o) return;
    $to = avo_pay_notify_list((string) $o['site']);
    if (!$to) return;
    $subject = ($kind === 'double_paid' ? 'REFUND NEEDED: order ' : 'CHECK payment of order ') . $ref . ' (' . avo_pay_site_name((string) $o['site']) . ')';
    $text = ($kind === 'double_paid'
        ? "This order was paid twice. Refund the second payment in the HitPay dashboard.\n"
        : "HitPay says this payment is completed, but it does not match the order, so the order was NOT marked paid. Check it in the HitPay dashboard.\n")
        . 'Reason: ' . $why . "\nHitPay payment request: " . $requestId . "\n\n" . avo_pay_order_text($o) . "\n";
    $html = '<pre style="font:14px/1.5 sans-serif;white-space:pre-wrap">' . htmlspecialchars($text, ENT_QUOTES, 'UTF-8') . '</pre>';
    avo_mail_send($to, $subject, $text, $html, null, 'order');
}

/* ---------------------------------------------------------------- public routes */

/** GET /api/pay/config?site=av|nf — is online payment open, and the delivery fee the server will charge. */
function avo_pay_config_route(): array
{
    $site = (string) ($_GET['site'] ?? '');
    if (!in_array($site, AVO_PAY_SITES, true)) avo_fail(400, 'invalid', 'Unknown site.');
    $ready = avo_pay_ready($site);
    return ['site' => $site, 'ready' => $ready, 'delivery_sen' => $ready ? avo_pay_delivery_sen($site) : null, 'currency' => 'MYR'];
}

/**
 * Review 3: the buyer changed the order (size, qty, details) after an earlier one was sent to HitPay.
 * Older PENDING orders of the same site + phone, younger than 60 min, are checked with HitPay first:
 * a completed one is settled as paid (and kept); otherwise each of its pending HitPay requests is
 * DELETEd (404 = already gone) and the order is marked failed, note "superseded by <ref>", so the old
 * payment page cannot be paid any more. HitPay is never called inside db_tx. Errors never block the
 * new order: a request HitPay could not delete stays pending (and is settled normally if paid).
 */
function avo_pay_supersede(array $new): void
{
    $old = db_all("SELECT ref FROM orders WHERE site = ? AND phone = ? AND status = 'pending' AND review_at IS NULL AND ref <> ? AND created_at > ?
        ORDER BY id LIMIT 5", [$new['site'], $new['phone'], $new['ref'], avo_now() - AVO_PAY_SUPERSEDE_SECONDS]);
    foreach ($old as $o) {
        $ref = (string) $o['ref'];
        $reqs = db_all("SELECT request_id FROM pay_requests WHERE order_ref = ? AND status = 'pending' ORDER BY id", [$ref]);
        $closedAll = true;
        foreach ($reqs as $r) {
            $rid = (string) $r['request_id'];
            try {
                $st = avo_pay_settle($rid, 8); // GET-verify first: a paid request is settled, never cancelled
            } catch (AvoPayError $e) {
                if ($e->getCode() !== 404) {
                    $closedAll = false;
                    continue;
                }
                $st = 'pending'; // HitPay no longer knows it: nothing can be paid there, close it below
            }
            if ($st !== 'pending') {
                if (in_array($st, ['completed', 'needs_review', 'double_paid'], true)) $closedAll = false;
                continue;
            }
            try {
                avo_hitpay_call('DELETE', '/payment-requests/' . rawurlencode($rid), [], 8);
            } catch (AvoPayError $e) {
                if ($e->getCode() !== 404) {
                    $closedAll = false;
                    avo_log('warn', 'hitpay delete failed', ['ref' => $ref, 'status' => $e->getCode()]);
                    continue;
                }
            }
            db_exec("UPDATE pay_requests SET status = 'canceled', note = ? WHERE request_id = ? AND status = 'pending'", ['superseded by ' . $new['ref'], $rid]);
        }
        $fresh = db_one('SELECT status, review_at FROM orders WHERE ref = ?', [$ref]);
        // 'failed' with no note = closed a moment ago by settle (request gone at HitPay): still record why.
        if ($closedAll && $fresh && ($fresh['status'] === 'pending' || ($fresh['status'] === 'failed' && db_val('SELECT note FROM orders WHERE ref = ?', [$ref]) === null))
            && $fresh['review_at'] === null
            && (int) db_val("SELECT COUNT(*) FROM pay_requests WHERE order_ref = ? AND status = 'pending'", [$ref]) === 0) {
            db_exec("UPDATE orders SET status = 'failed', note = ? WHERE ref = ? AND status IN ('pending','failed') AND note IS NULL", ['superseded by ' . $new['ref'], $ref]);
            avo_log('info', 'order superseded', ['ref' => $ref, 'by' => $new['ref']]);
        }
    }
}

/** POST /api/pay/create (JSON) — see docs/forge/HITPAY-AV-HANDOFF.md for the exact contract. */
function avo_pay_create_route(): array
{
    $body = avo_json_body();
    $site = (string) ($body['site'] ?? '');
    if (!in_array($site, AVO_PAY_SITES, true)) avo_fail(422, 'invalid', 'Unknown site.', ['site' => 'invalid']);
    $lang = (string) ($body['lang'] ?? '');
    if (!in_array($lang, AVO_LANGS, true)) avo_fail(422, 'invalid', 'Unknown language.', ['lang' => 'invalid']);
    if (isset($body['hp']) && $body['hp'] !== '') avo_fail(422, 'invalid', 'The order could not be sent.');
    $idem = (string) ($body['idem'] ?? '');
    if (!preg_match('/^[A-Za-z0-9-]{8,64}$/', $idem)) avo_fail(422, 'invalid', 'Reload the page and try again.', ['idem' => 'invalid']);

    // lines: prices come from the server table only; any price the client sends is ignored.
    // BUY-NOW: ONE product (AV: one product+size, qty 1..24; NF: one package, qty 1) per order.
    $rawLines = $body['lines'] ?? null;
    if (!is_array($rawLines) || !array_is_list($rawLines) || count($rawLines) !== 1) {
        avo_fail(422, 'invalid', 'Reload the page and try again.', ['lines' => 'invalid']);
    }
    $prices = avo_pay_prices();
    $names = $prices['names'] ?? [];
    $packs = $prices['packs'][$site] ?? [];
    $l = $rawLines[0];
    $sentSku = is_array($l) && is_string($l['sku'] ?? null) ? $l['sku'] : '';
    $qty = is_array($l) ? ($l['qty'] ?? null) : null;
    if (!is_int($qty) || $qty < 1 || $qty > AVO_PAY_MAX_QTY) avo_fail(422, 'invalid', 'A quantity is not valid.', ['lines' => 'qty']);
    $p = avo_pay_price($site, $sentSku);
    if ($p === null) avo_fail(422, 'unknown_sku', 'This product is no longer available. Reload the page and try again.', ['lines' => 'unknown_sku']);
    $sku = $p['sku'];
    $isPack = isset($packs[$sku]);
    if ($site === 'nf' && !$isPack) avo_fail(422, 'unknown_sku', 'This product is no longer available. Reload the page and try again.', ['lines' => 'unknown_sku']);
    if ($isPack && $qty !== 1) {
        // an old tab (single bottle sku with a quantity) gets a distinct code: the client says "reload"
        $stale = $sku !== $sentSku;
        avo_fail(422, $stale ? 'stale_client' : 'invalid', $stale ? 'This page is out of date. Reload the page and try again.' : 'A package is always quantity 1.', ['lines' => 'pack']);
    }
    $unit = (int) $p['sen'];
    $nameEn = (string) ($names[$sku]['en'] ?? $sku);
    $line = [
        'sku' => $sku, 'qty' => $qty, 'unit_sen' => $unit, 'name' => $nameEn,
        // BUY-NOW B3: the label in the order's language + the bottle count go to status / email / admin
        'label' => (string) ($names[$sku][$lang] ?? $nameEn),
        'bottles' => $isPack ? (int) $packs[$sku] : $qty,
    ];
    if ($isPack) $line['pack'] = true;
    $lines = [$line];
    $subtotal = $unit * $qty;
    [$d, $errors] = avo_pay_validate_details($body['details'] ?? null);
    if ($errors) avo_fail(422, 'invalid', 'Some details are missing or not valid.', $errors);

    if (!avo_pay_ready($site)) avo_fail(503, 'pay_not_ready', 'Online payment is not open yet. Please message us on WhatsApp.');
    $delivery = (int) avo_pay_delivery_sen($site);
    if (!empty($prices['nodelivery'][$site][$sku])) $delivery = 0; // the RM 1 TEST pack (owner 2026-11-17)
    $total = $subtotal + $delivery;
    if ($total < AVO_PAY_MIN_SEN) avo_fail(422, 'invalid', 'The total is too small to pay online.');

    try {
        avo_pay_sweep();
        avo_pay_notify_paid(3);
    } catch (Throwable $e) {
        avo_log('warn', 'pay sweep: ' . $e->getMessage());
    }

    $address = ['address' => $d['address'], 'postcode' => $d['postcode'], 'state' => $d['state'], 'note' => $d['note']];
    $contentHash = hash('sha256', json_encode([$site, $lines, $d, $delivery], JSON_UNESCAPED_UNICODE));
    $order = db_one('SELECT * FROM orders WHERE site = ? AND idem = ? AND content_hash = ?', [$site, $idem, $contentHash]);
    if ($order) {
        if ($order['status'] === 'paid') return ['ref' => $order['ref'], 'token' => $order['status_token'], 'url' => null, 'status' => 'paid', 'total_sen' => (int) $order['total_sen']];
        if ($order['review_at'] !== null) avo_fail(409, 'order_review', 'We are checking the payment of this order. Please message us on WhatsApp with your order reference ' . $order['ref'] . '.');
        $reuse = db_one("SELECT url FROM pay_requests WHERE order_ref = ? AND status = 'pending' AND amount_sen = ? AND created_at > ? ORDER BY id DESC LIMIT 1",
            [$order['ref'], (int) $order['total_sen'], avo_now() - AVO_PAY_REUSE_SECONDS]);
        if ($reuse) return ['ref' => $order['ref'], 'token' => $order['status_token'], 'url' => $reuse['url'], 'status' => 'pending', 'total_sen' => (int) $order['total_sen']];
    } else {
        // Review 2: only a NEW order counts against the limits (a double tap or a Back from HitPay
        // reuses its order above). Per site 20 / 10 min, both sites together 30 / 10 min, per IP (/64).
        avo_rate_hit('pay.create.' . $site, AVO_PAY_CREATE_LIMIT, 600);
        avo_rate_hit('pay.create', AVO_PAY_CREATE_LIMIT_ALL, 600);
        $token = avo_hex_token(16);
        $order = null;
        for ($try = 0; $try < 6 && !$order; $try++) {
            $ref = avo_pay_make_ref($site);
            try {
                db_exec('INSERT INTO orders(ref, site, status, idem, content_hash, lines_json, subtotal_sen, delivery_sen, total_sen, name, phone, email, address_json, lang, status_token, ip_hash, created_at)
                    VALUES(?, ?, \'pending\', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                    $ref, $site, $idem, $contentHash, json_encode($lines, JSON_UNESCAPED_UNICODE), $subtotal, $delivery, $total,
                    $d['name'], $d['phone'], $d['email'] !== '' ? $d['email'] : null, json_encode($address, JSON_UNESCAPED_UNICODE), $lang, $token,
                    avo_pay_ip_hash(), avo_now(),
                ]);
                $order = db_one('SELECT * FROM orders WHERE ref = ?', [$ref]);
            } catch (PDOException $e) {
                if (!str_contains($e->getMessage(), 'UNIQUE')) throw $e;
                // ref collision (retry) or the same idem+content inserted by a parallel click (use it)
                $order = db_one('SELECT * FROM orders WHERE site = ? AND idem = ? AND content_hash = ?', [$site, $idem, $contentHash]);
            }
        }
        if (!$order) avo_fail(500, 'server_error', 'The order could not be saved. Please try again.');
        avo_pay_supersede($order);
    }

    $ref = (string) $order['ref'];
    $token = (string) $order['status_token'];
    $reuseNow = function () use ($ref, $order): ?array {
        $r = db_one("SELECT url FROM pay_requests WHERE order_ref = ? AND status = 'pending' AND amount_sen = ? AND created_at > ? ORDER BY id DESC LIMIT 1",
            [$ref, (int) $order['total_sen'], avo_now() - AVO_PAY_REUSE_SECONDS]);
        return $r ? ['ref' => $ref, 'token' => (string) $order['status_token'], 'url' => $r['url'], 'status' => 'pending', 'total_sen' => (int) $order['total_sen']] : null;
    };
    // Review 4: only ONE click (or tab) creates the HitPay request of an order. The others wait for
    // it and hand out the same url; a stale claim (crashed request) expires after 30 s.
    $claim = function () use ($ref): bool {
        $now = avo_now();
        return db_exec('UPDATE orders SET creating_at = ? WHERE ref = ? AND (creating_at IS NULL OR creating_at < ?)', [$now, $ref, $now - AVO_PAY_CLAIM_SECONDS]) === 1;
    };
    if (!$claim()) {
        $until = microtime(true) + AVO_PAY_CLAIM_SECONDS + 2;
        $got = false;
        while (!$got && microtime(true) < $until) {
            if ($hit = $reuseNow()) return $hit;
            $got = $claim();
            if (!$got) usleep(300000);
        }
        if (!$got) avo_fail(409, 'busy', 'This order is already being sent to the payment page. Please wait a moment and try again.');
    }
    // Claimed. A parallel click may have finished just before: use its request.
    if ($hit = $reuseNow()) {
        db_exec('UPDATE orders SET creating_at = NULL WHERE ref = ?', [$ref]);
        return $hit;
    }
    $release = fn () => db_exec('UPDATE orders SET creating_at = NULL WHERE ref = ?', [$ref]);
    $phone = '+' . $order['phone'];
    $form = [
        'amount' => avo_sen_str((int) $order['total_sen']),
        'currency' => 'MYR',
        'reference_number' => $ref,
        'purpose' => avo_pay_purpose($site, $ref, json_decode((string) $order['lines_json'], true) ?: []),
        'name' => mb_substr((string) $order['name'], 0, 60),
        'phone' => $phone,
        'redirect_url' => avo_pay_redirect_url($site, (string) $order['lang'], $ref, $token),
        'webhook' => AVO_SITE_URL . '/api/pay/webhook',
        'send_email' => 'false',
        'send_sms' => 'false',
        'allow_repeated_payments' => 'false',
        'expires_after' => AVO_PAY_EXPIRES_AFTER,
    ];
    if (!empty($order['email'])) $form['email'] = (string) $order['email'];
    try {
        $res = avo_hitpay_call('POST', '/payment-requests', $form, 20);
    } catch (AvoPayError $e) {
        $release();
        db_exec("UPDATE orders SET status = 'failed' WHERE ref = ? AND status = 'pending' AND NOT EXISTS (SELECT 1 FROM pay_requests WHERE order_ref = ? AND status = 'pending')", [$ref, $ref]);
        avo_fail(502, 'pay_unavailable', 'Online payment is not available right now. Please try again in a minute, or message us on WhatsApp.');
    }
    $rid = is_string($res['id'] ?? null) ? $res['id'] : '';
    $url = is_string($res['url'] ?? null) ? $res['url'] : '';
    $u = parse_url($url);
    if ($rid === '' || !preg_match('/^[A-Za-z0-9-]{8,80}$/', $rid) || ($u['scheme'] ?? '') !== 'https' || strtolower((string) ($u['host'] ?? '')) !== AVO_PAY_CHECKOUT_HOST) {
        avo_log('error', 'hitpay create: unexpected answer', ['ref' => $ref, 'host' => $u['host'] ?? null]);
        $release();
        avo_fail(502, 'pay_unavailable', 'Online payment is not available right now. Please try again in a minute, or message us on WhatsApp.');
    }
    db_exec('INSERT INTO pay_requests(order_ref, request_id, url, amount_sen, status, created_at) VALUES(?, ?, ?, ?, \'pending\', ?)',
        [$ref, $rid, $url, (int) $order['total_sen'], avo_now()]);
    db_exec("UPDATE orders SET status = 'pending' WHERE ref = ? AND status = 'failed'", [$ref]);
    $release();
    return ['ref' => $ref, 'token' => $token, 'url' => $url, 'status' => 'pending', 'total_sen' => (int) $order['total_sen']];
}

/**
 * POST /api/pay/webhook (form-encoded, from HitPay). 401 bad hmac (no fetch), 200 handled or
 * ignored, 500 on our failure or when HitPay says completed but the fetch does not yet (R7).
 */
function avo_pay_webhook_route(): ?array
{
    $raw = avo_body_raw(20000);
    $fields = [];
    parse_str($raw, $fields);
    db_exec('DELETE FROM pay_events WHERE at < ?', [avo_now() - 90 * 86400]); // prune on every path
    $salt = avo_hitpay_keys()['salt'];
    $sent = is_string($fields['hmac'] ?? null) ? $fields['hmac'] : '';
    if ($salt === null || $sent === '' || !hash_equals(avo_hitpay_signature($fields, $salt), $sent)) {
        // Review 5: nothing stored for an unsigned call; at most one log line a minute. The '+' flag is a
        // diagnostic only (a raw '+' decodes to a space): the check itself is never relaxed.
        $stamp = avo_data_dir() . '/logs/.hitpay-bad-hmac';
        if (!is_file($stamp) || (int) @filemtime($stamp) < avo_now() - 60) {
            @touch($stamp);
            avo_log('warn', 'hitpay webhook: bad hmac', ['ip' => avo_ip(), 'rawPlus' => str_contains($raw, '+'), 'saltSet' => $salt !== null, 'hmacSent' => $sent !== '']);
        }
        avo_fail(401, 'bad_signature', 'Signature check failed.');
    }
    $rid = (string) ($fields['payment_request_id'] ?? '');
    $said = strtolower((string) ($fields['status'] ?? ''));
    // stored payload = ids/status/amount only (minor: no phone)
    db_exec('INSERT INTO pay_events(at, request_id, payment_id, status, amount, ok) VALUES(?, ?, ?, ?, ?, 1)', [
        avo_now(), mb_substr($rid, 0, 80), mb_substr((string) ($fields['payment_id'] ?? ''), 0, 80), mb_substr($said, 0, 20), mb_substr((string) ($fields['amount'] ?? ''), 0, 20),
    ]);
    // One HitPay account serves several shops: a request we never issued is not ours (200, ignored).
    if ($rid === '' || !db_one('SELECT 1 FROM pay_requests WHERE request_id = ?', [$rid])) return ['ok' => true, 'ignored' => true];
    try {
        $now = avo_pay_settle($rid);
    } catch (AvoPayError $e) {
        avo_fail(500, 'fetch_failed', 'Could not check the payment with HitPay.');
    }
    if (in_array($said, ['completed', 'succeeded'], true) && $now === 'pending') {
        avo_fail(500, 'not_yet', 'HitPay does not report this request completed yet.');
    }
    return ['ok' => true, 'status' => $now];
}

function avo_pay_public_status(array $o): string
{
    if ($o['status'] === 'paid') return 'paid';
    if ($o['review_at'] !== null) return 'needs_review';
    return (string) $o['status']; // pending | failed
}

/** GET /api/pay/status?ref=&t= — the customer's own order, by its secret token. */
function avo_pay_status_route(): array
{
    $ref = (string) ($_GET['ref'] ?? '');
    $t = (string) ($_GET['t'] ?? '');
    // tolerant of a "?" HitPay may append to our query (review 18): first 32 hex characters of t
    $t = preg_match('/^[0-9a-f]{32}/', $t, $m) ? $m[0] : '';
    $o = preg_match('/^(AV|NF)-\d{6}-[A-Z2-9]{4}$/', $ref) ? db_one('SELECT * FROM orders WHERE ref = ?', [$ref]) : null;
    if (!$o || $t === '' || !hash_equals((string) $o['status_token'], $t)) {
        avo_rate_hit('pay.status.bad', AVO_PAY_STATUS_LIMIT_BAD, 600); // guessing refs/tokens: low limit
        avo_fail(403, 'forbidden', 'This order link is not valid.');
    }
    avo_rate_hit('pay.status', AVO_PAY_STATUS_LIMIT_OK, 600); // a real customer polling every 3 s: high limit
    if ($o['status'] !== 'paid' && $o['review_at'] === null && ((int) ($o['last_fetch_at'] ?? 0)) < avo_now() - AVO_PAY_FETCH_EVERY) {
        avo_pay_refresh_order($ref, 2, 8);
        $o = db_one('SELECT * FROM orders WHERE ref = ?', [$ref]);
    }
    try {
        avo_pay_notify_paid(3);
    } catch (Throwable $e) {
        avo_log('warn', 'pay notify: ' . $e->getMessage());
    }
    $lines = array_map(fn ($l) => ['sku' => (string) $l['sku'], 'qty' => (int) $l['qty'], 'unit_sen' => (int) $l['unit_sen'],
        'label' => (string) ($l['label'] ?? $l['name'] ?? $l['sku']), 'bottles' => (int) ($l['bottles'] ?? $l['qty'])], json_decode((string) $o['lines_json'], true) ?: []);
    return [
        'ref' => $o['ref'], 'site' => $o['site'], 'lang' => $o['lang'], 'status' => avo_pay_public_status($o),
        'subtotal_sen' => (int) $o['subtotal_sen'], 'delivery_sen' => (int) $o['delivery_sen'], 'total_sen' => (int) $o['total_sen'],
        'lines' => $lines, 'payment_type' => $o['status'] === 'paid' ? $o['payment_type'] : null,
        'paid_at' => $o['paid_at'] !== null ? avo_iso((int) $o['paid_at']) : null,
    ];
}

/* ---------------------------------------------------------------- admin routes (signed in) */

/**
 * The CMS has no roles: every active user is an administrator (anyone signed in can add users).
 * The "admin role only" rulings (R3, minor 37) therefore mean "signed in", enforced by the router.
 */
function avo_admin_order_out(array $o): array
{
    $addr = json_decode((string) $o['address_json'], true) ?: [];
    $reqs = db_all('SELECT request_id, amount_sen, status, payment_type, created_at, checked_at, note FROM pay_requests WHERE order_ref = ? ORDER BY id', [$o['ref']]);
    return [
        'ref' => $o['ref'], 'site' => $o['site'], 'status' => avo_pay_public_status($o), 'createdAt' => avo_iso((int) $o['created_at']),
        'createdMyt' => avo_pay_myt((int) $o['created_at']), 'paidAt' => $o['paid_at'] !== null ? avo_iso((int) $o['paid_at']) : null,
        'name' => $o['name'], 'phone' => '+' . $o['phone'], 'email' => $o['email'], 'address' => $addr, 'lang' => $o['lang'],
        'lines' => json_decode((string) $o['lines_json'], true) ?: [], 'subtotalSen' => (int) $o['subtotal_sen'],
        'deliverySen' => (int) $o['delivery_sen'], 'totalSen' => (int) $o['total_sen'], 'paymentType' => $o['payment_type'],
        'notified' => $o['notified_at'] !== null, 'note' => $o['note'] ?? null,
        'requests' => array_map(fn ($r) => [
            'id' => $r['request_id'], 'amountSen' => (int) $r['amount_sen'], 'status' => $r['status'], 'paymentType' => $r['payment_type'],
            'createdAt' => avo_iso((int) $r['created_at']), 'checkedAt' => $r['checked_at'] !== null ? avo_iso((int) $r['checked_at']) : null, 'note' => $r['note'],
        ], $reqs),
    ];
}

/** GET /api/admin/orders?status= — last 200 orders, newest first. Also retries unsent order emails. */
function avo_admin_orders(): array
{
    try {
        avo_pay_notify_paid(3);
    } catch (Throwable $e) {
        avo_log('warn', 'pay notify: ' . $e->getMessage());
    }
    $status = (string) ($_GET['status'] ?? '');
    $where = '';
    $args = [];
    if ($status === 'needs_review') $where = 'WHERE review_at IS NOT NULL AND status <> \'paid\'';
    elseif (in_array($status, ['pending', 'paid', 'failed'], true)) {
        $where = 'WHERE status = ?' . ($status === 'pending' ? ' AND review_at IS NULL' : '');
        $args[] = $status;
    }
    $rows = db_all("SELECT * FROM orders $where ORDER BY id DESC LIMIT 200", $args);
    return [
        'orders' => array_map('avo_admin_order_out', $rows),
        'unnotified' => (int) db_val("SELECT COUNT(*) FROM orders WHERE status = 'paid' AND notified_at IS NULL"),
        'doublePaid' => (int) db_val("SELECT COUNT(*) FROM pay_requests WHERE status = 'double_paid'"),
    ];
}

/** POST /api/admin/orders/{ref}/recheck — ask HitPay again about every pending request of the order. */
function avo_admin_order_recheck(array $s, string $ref): array
{
    $o = db_one('SELECT * FROM orders WHERE ref = ?', [$ref]);
    if (!$o) avo_fail(404, 'not_found', 'This order does not exist.');
    $rows = db_all("SELECT request_id FROM pay_requests WHERE order_ref = ? AND status = 'pending' ORDER BY id DESC", [$ref]);
    foreach ($rows as $r) {
        try {
            avo_pay_settle((string) $r['request_id']);
        } catch (AvoPayError $e) {
            avo_fail(502, 'pay_unavailable', 'HitPay could not be reached. Try again in a minute.');
        }
    }
    avo_audit($s['user_id'], 'order.recheck', 'order:' . $ref);
    return avo_admin_order_out(db_one('SELECT * FROM orders WHERE ref = ?', [$ref]));
}

/** GET /api/admin/payments — the Payments (HitPay) section. Secrets are never sent back, only whether they are set. */
function avo_admin_payments_get(): array
{
    $k = avo_hitpay_keys();
    $fee = fn (string $site) => ($v = avo_pay_delivery_sen($site)) === null ? null : avo_sen_str($v);
    return [
        'apiKeySet' => $k['api_key'] !== null,
        'saltSet' => $k['salt'] !== null,
        'notifyEmail' => (string) avo_setting('hitpay.notify_email', ''),
        'notifyEmailDefault' => avo_pay_notify_default(),
        'deliveryRM' => ['av' => $fee('av'), 'nf' => $fee('nf')],
        'ready' => ['av' => avo_pay_ready('av'), 'nf' => avo_pay_ready('nf')],
        'webhookUrl' => AVO_SITE_URL . '/api/pay/webhook',
        'liveApi' => avo_hitpay_base() === AVO_HITPAY_BASE_DEFAULT,
    ];
}

/**
 * POST /api/admin/payments {apiKey?, salt?, clearKeys?, notifyEmail?, deliveryRM?: {av?, nf?}}.
 * Empty apiKey/salt = keep the stored one. deliveryRM "8.00" sets the fee, null or "" clears it
 * (online payment for that site closes).
 */
function avo_admin_payments_save(array $s, array $body): array
{
    $changed = [];
    if (!empty($body['clearKeys'])) {
        db_exec("DELETE FROM settings WHERE key IN ('hitpay.api_key', 'hitpay.salt')");
        $changed[] = 'clearKeys';
    }
    foreach (['apiKey' => 'hitpay.api_key', 'salt' => 'hitpay.salt'] as $f => $key) {
        if (!array_key_exists($f, $body) || $body[$f] === null || $body[$f] === '') continue;
        $v = is_string($body[$f]) ? trim($body[$f]) : '';
        if (!preg_match('/^[\x21-\x7e]{8,200}$/', $v)) avo_fail(400, 'invalid', 'This value does not look right. Copy it again from the HitPay dashboard.', [$f => 'Not valid.']);
        avo_setting_set($key, avo_pay_encrypt($v));
        $changed[] = $f;
    }
    if (array_key_exists('notifyEmail', $body)) {
        $e = is_string($body['notifyEmail']) ? strtolower(trim($body['notifyEmail'])) : '';
        if ($e !== '' && !avo_valid_email($e)) avo_fail(400, 'invalid', 'Enter a valid email address.', ['notifyEmail' => 'Enter a valid email address.']);
        avo_setting_set('hitpay.notify_email', $e);
        $changed[] = 'notifyEmail';
    }
    if (isset($body['deliveryRM']) && is_array($body['deliveryRM'])) {
        foreach (AVO_PAY_SITES as $site) {
            if (!array_key_exists($site, $body['deliveryRM'])) continue;
            $v = $body['deliveryRM'][$site];
            if ($v === null || $v === '') {
                db_exec('DELETE FROM settings WHERE key = ?', ['hitpay.delivery_sen.' . $site]);
            } else {
                $sen = avo_amount_to_sen(is_string($v) ? $v : (is_int($v) || is_float($v) ? (string) $v : ''));
                if ($sen === null || $sen > 50000) avo_fail(400, 'invalid', 'Enter the delivery fee in RM, for example 8.00 (0 = free delivery).', ['deliveryRM.' . $site => 'Not valid.']);
                avo_setting_set('hitpay.delivery_sen.' . $site, (string) $sen);
            }
            $changed[] = 'deliveryRM.' . $site;
        }
    }
    avo_audit($s['user_id'], 'payments.save', null, implode(',', $changed)); // never the values
    return avo_admin_payments_get();
}

/** POST /api/admin/payments/test — GET /payment-requests?per_page=1 with the stored key. */
function avo_admin_payments_test(array $s): array
{
    $k = avo_hitpay_keys()['api_key'];
    if ($k === null) return ['ok' => false, 'message' => 'Enter the HitPay API key first.'];
    try {
        avo_hitpay_call('GET', '/payment-requests?per_page=1', [], 15, $k);
    } catch (AvoPayError $e) {
        return ['ok' => false, 'message' => 'HitPay refused the key or could not be reached (' . $e->getMessage() . ').'];
    }
    avo_audit($s['user_id'], 'payments.test');
    return ['ok' => true, 'message' => 'Connected to HitPay.'];
}
