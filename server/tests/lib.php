<?php
declare(strict_types=1);

/* Tiny test toolkit: an HTTP client with a cookie jar, assertions, a test registry. */

final class TestFailure extends RuntimeException
{
}

final class Res
{
    public function __construct(public int $status, public array $headers, public string $body, public float $time)
    {
    }

    public function header(string $name): ?string
    {
        return $this->headers[strtolower($name)][0] ?? null;
    }

    public function json(): mixed
    {
        return json_decode($this->body, true);
    }

    public function doc(): Dom\HTMLDocument
    {
        return Dom\HTMLDocument::createFromString($this->body, LIBXML_NOERROR, 'UTF-8');
    }

    /** The parsed #cms-boot payload (asserts it exists and is valid JSON). */
    public function boot(): array
    {
        $s = $this->doc()->querySelector('script#cms-boot');
        ok($s !== null, 'response has a #cms-boot script');
        $raw = $s->textContent;
        ok(!str_contains(strtolower($raw), '</script'), 'boot JSON contains no </script');
        $data = json_decode($raw, true);
        ok(is_array($data), 'boot JSON parses: ' . json_last_error_msg());
        return $data;
    }
}

final class Client
{
    public array $cookies = [];
    public string $csrf = '';
    public string $build = '';
    public static string $base = 'http://127.0.0.1:8091';

    public function req(string $method, string $path, array $o = []): Res
    {
        $ch = curl_init(self::$base . $path);
        $headers = [];
        foreach ($o['headers'] ?? [] as $k => $v) $headers[] = "$k: $v";
        $isWrite = !in_array($method, ['GET', 'HEAD'], true);
        $realMethod = $method;
        if ($isWrite && !($o['raw'] ?? false)) {
            if (!isset($o['headers']['Origin']) && !($o['noOrigin'] ?? false)) $headers[] = 'Origin: ' . self::$base;
            if ($this->csrf !== '' && !($o['noCsrf'] ?? false) && !isset($o['headers']['X-CSRF-Token'])) $headers[] = 'X-CSRF-Token: ' . $this->csrf;
            if ($this->build !== '' && !isset($o['headers']['X-CMS-Build'])) $headers[] = 'X-CMS-Build: ' . $this->build;
            if ($method !== 'POST') {
                $headers[] = 'X-HTTP-Method-Override: ' . $method;
                $realMethod = 'POST';
            }
        }
        if ($this->cookies) {
            $headers[] = 'Cookie: ' . implode('; ', array_map(fn ($k, $v) => "$k=$v", array_keys($this->cookies), $this->cookies));
        }
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $realMethod);
        if ($realMethod === 'HEAD') curl_setopt($ch, CURLOPT_NOBODY, true);
        if (array_key_exists('json', $o)) {
            $headers[] = 'Content-Type: application/json';
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($o['json'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        } elseif (array_key_exists('form', $o)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, is_array($o['form']) && ($o['multipart'] ?? false) ? $o['form'] : http_build_query($o['form']));
        } elseif (array_key_exists('body', $o)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $o['body']);
        } elseif ($isWrite) {
            $headers[] = 'Content-Type: application/json';
            curl_setopt($ch, CURLOPT_POSTFIELDS, '{}');
        }
        $resHeaders = [];
        curl_setopt_array($ch, [
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_HEADERFUNCTION => function ($ch, $line) use (&$resHeaders) {
                $len = strlen($line);
                $p = strpos($line, ':');
                if ($p !== false) $resHeaders[strtolower(trim(substr($line, 0, $p)))][] = trim(substr($line, $p + 1));
                return $len;
            },
        ]);
        $t = microtime(true);
        $body = curl_exec($ch);
        $time = microtime(true) - $t;
        if ($body === false) throw new TestFailure('curl: ' . curl_error($ch));
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        foreach ($resHeaders['set-cookie'] ?? [] as $c) {
            [$pair] = explode(';', $c, 2);
            [$k, $v] = array_pad(explode('=', $pair, 2), 2, '');
            if ($v === '' || str_contains(strtolower($c), 'expires=thu, 01-jan-1970') || preg_match('/max-age=0/i', $c)) {
                unset($this->cookies[trim($k)]);
            } else {
                $this->cookies[trim($k)] = $v;
            }
        }
        $res = new Res($status, $resHeaders, (string) $body, $time);
        $data = $res->json();
        if (is_array($data) && isset($data['csrf']) && is_string($data['csrf'])) $this->csrf = $data['csrf'];
        return $res;
    }

    public function get(string $p, array $o = []): Res
    {
        return $this->req('GET', $p, $o);
    }

    public function post(string $p, mixed $json = [], array $o = []): Res
    {
        return $this->req('POST', $p, $o + ['json' => $json]);
    }

    public function put(string $p, mixed $json = [], array $o = []): Res
    {
        return $this->req('PUT', $p, $o + ['json' => $json]);
    }

    public function patch(string $p, mixed $json = [], array $o = []): Res
    {
        return $this->req('PATCH', $p, $o + ['json' => $json]);
    }

    public function delete(string $p, array $o = []): Res
    {
        return $this->req('DELETE', $p, $o);
    }
}

function ok(mixed $cond, string $msg): void
{
    if (!$cond) throw new TestFailure($msg);
}

function eq(mixed $actual, mixed $expected, string $msg): void
{
    if ($actual !== $expected) {
        throw new TestFailure($msg . ' — expected ' . var_export($expected, true) . ', got ' . var_export($actual, true));
    }
}

function status(Res $r, int $expected, string $msg): void
{
    if ($r->status !== $expected) {
        throw new TestFailure("$msg — expected HTTP $expected, got {$r->status}: " . mb_substr($r->body, 0, 400));
    }
}

function contains(string $hay, string $needle, string $msg): void
{
    if (!str_contains($hay, $needle)) throw new TestFailure($msg . ' — missing ' . var_export(mb_substr($needle, 0, 200), true));
}

function lacks(string $hay, string $needle, string $msg): void
{
    if (str_contains($hay, $needle)) throw new TestFailure($msg . ' — unexpected ' . var_export(mb_substr($needle, 0, 200), true));
}

$GLOBALS['TESTS'] = [];
function test(string $name, callable $fn): void
{
    $GLOBALS['TESTS'][] = [$name, $fn];
}

function b64(string $s): string
{
    return base64_encode($s);
}
