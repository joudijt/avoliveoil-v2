<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/** Thrown anywhere in an API handler; the router turns it into {error:{code,message,fields?}}. */
final class AvoHttpError extends RuntimeException
{
    public function __construct(
        public readonly int $status,
        public readonly string $errorCode,
        string $message,
        public readonly ?array $fields = null,
        public readonly array $headers = [],
    ) {
        parent::__construct($message);
    }
}

function avo_fail(int $status, string $code, string $message, ?array $fields = null, array $headers = []): never
{
    throw new AvoHttpError($status, $code, $message, $fields, $headers);
}

/** Effective method: writes travel as POST + X-HTTP-Method-Override (WAF-proof, spec §13.3). */
function avo_method(): string
{
    $m = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    if ($m === 'POST') {
        $o = strtoupper(trim((string) ($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] ?? '')));
        if (in_array($o, ['PUT', 'PATCH', 'DELETE'], true)) return $o;
    }
    return $m === 'HEAD' ? 'GET' : $m;
}

function avo_request_path(): string
{
    $uri = (string) ($_SERVER['REQUEST_URI'] ?? '/');
    $path = (string) parse_url($uri, PHP_URL_PATH);
    return $path === '' ? '/' : $path;
}

function avo_is_https(): bool
{
    $https = strtolower((string) ($_SERVER['HTTPS'] ?? ''));
    return ($https !== '' && $https !== 'off')
        || strtolower((string) ($_SERVER['REQUEST_SCHEME'] ?? '')) === 'https'
        || (string) ($_SERVER['SERVER_PORT'] ?? '') === '443'
        || strtolower((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https';
}

/** REMOTE_ADDR only — never X-Forwarded-For (spec §13.4). */
function avo_ip(): string
{
    return (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

function avo_ua(): string
{
    return mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300);
}

function avo_body_raw(int $max = 2_000_000): string
{
    static $raw = null;
    if ($raw !== null) return $raw;
    $len = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($len > $max) avo_fail(413, 'too_large', 'This request is too large.');
    $raw = (string) file_get_contents('php://input', false, null, 0, $max + 1);
    if (strlen($raw) > $max) avo_fail(413, 'too_large', 'This request is too large.');
    return $raw;
}

/** JSON body as an array; anything else is a 400 the owner can act on. */
function avo_json_body(): array
{
    $raw = avo_body_raw();
    if (trim($raw) === '') return [];
    $data = json_decode($raw, true);
    if (!is_array($data)) avo_fail(400, 'bad_json', 'The request could not be read. Reload the page and try again.');
    return $data;
}

function avo_send_json(mixed $data, int $status = 200, array $headers = []): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex, nofollow');
    header('X-Content-Type-Options: nosniff');
    foreach ($headers as $k => $v) header($k . ': ' . $v);
    $json = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') echo $json === false ? 'null' : $json;
}

function avo_send_error(AvoHttpError $e): void
{
    $err = ['code' => $e->errorCode, 'message' => $e->getMessage()];
    if ($e->fields) $err['fields'] = $e->fields;
    avo_send_json(['error' => $err], $e->status, $e->headers);
}

/**
 * Writes must come from our own pages: Origin host (or Sec-Fetch-Site) same-origin.
 * Only the host:port is compared — the scheme behind the host's TLS terminator is not
 * reliable, and HTTPS is forced by .htaccess anyway. Non-browser clients send neither
 * header; the CSRF token still protects every authenticated write.
 */
function avo_check_same_origin(): void
{
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
    if ($origin !== null && $origin !== '') {
        $p = parse_url((string) $origin);
        $oh = strtolower(($p['host'] ?? '') . (isset($p['port']) ? ':' . $p['port'] : ''));
        if ($oh === '' || $oh !== $host) {
            avo_fail(403, 'cross_origin', 'This request came from another website and was blocked.');
        }
        return;
    }
    $site = strtolower((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
    if ($site !== '' && $site !== 'same-origin' && $site !== 'none') {
        avo_fail(403, 'cross_origin', 'This request came from another website and was blocked.');
    }
}

function avo_check_csrf(array $session): void
{
    $sent = (string) ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
    if ($sent === '' || !hash_equals((string) $session['csrf'], $sent)) {
        avo_fail(403, 'csrf', 'Your session check failed. Reload the page and try again.');
    }
}

/** An admin tab built from an older deploy must reload before it writes (spec §13.3). */
function avo_check_build(?string $sent = null): void
{
    $server = avo_build_id();
    $sent ??= isset($_SERVER['HTTP_X_CMS_BUILD']) ? (string) $_SERVER['HTTP_X_CMS_BUILD'] : null;
    if ($server === '' || $sent === null || $sent === '') return;
    if (!hash_equals($server, $sent)) {
        avo_fail(409, 'stale_panel', 'The website was updated since you opened the control panel. Reload the page to continue.');
    }
}

function avo_int(mixed $v, int $min, int $max, string $field, string $message): int
{
    if (is_int($v) || (is_string($v) && preg_match('/^-?\d+$/', $v))) {
        $i = (int) $v;
        if ($i >= $min && $i <= $max) return $i;
    } elseif (is_float($v) && floor($v) === $v && $v >= $min && $v <= $max) {
        return (int) $v;
    }
    avo_fail(400, 'invalid', $message, [$field => $message]);
}

function avo_str(array $body, string $key, int $max, bool $required = true, string $label = 'This field'): string
{
    $v = $body[$key] ?? '';
    if (!is_string($v)) avo_fail(400, 'invalid', $label . ' must be text.', [$key => $label . ' must be text.']);
    $v = trim(avo_clean_text($v));
    if ($required && $v === '') avo_fail(400, 'invalid', $label . ' is required.', [$key => $label . ' is required.']);
    if (mb_strlen($v) > $max) avo_fail(400, 'invalid', $label . " is too long (max $max characters).", [$key => "Max $max characters."]);
    return $v;
}

function avo_valid_email(string $email): bool
{
    return strlen($email) <= 254
        && !preg_match('/[\r\n\0]/', $email)
        && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
