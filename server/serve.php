<?php
declare(strict_types=1);

/*
 * HTML front controller (spec §2, §13.1, §13.2, §15). Reached by .htaccess only when
 * /_r/<lang>/<path>/index.html does not exist yet:
 *   snapshot  DOCROOT/<lang>/<path>/index.html  + published overrides + CMS menu + boot
 *   CMS page  DOCROOT/<lang>/__cms-template/index.html (doc.layout 'landing':
 *             __cms-template-landing/index.html) + page HTML + ResolvedSeo head + boot
 * The finished HTML is stored in /_r so the next visitor never reaches PHP.
 *
 * Fail-safe: everything runs inside ob_start(); an exception or a fatal error discards
 * the buffer and streams the untouched snapshot (or the SPA shell with 503 for a CMS
 * address, 404 otherwise). The fallback code below uses nothing from _lib on purpose.
 */

define('AVO_CMS', true);
ini_set('display_errors', '0');
error_reporting(E_ALL);

$GLOBALS['avo_serve'] = ['done' => false, 'fallback' => null];

function avo_serve_security_headers(): void
{
    header("Content-Security-Policy: script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'");
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
}

/** What to send if anything below fails — decided from the filesystem alone. */
function avo_serve_fallback_for(string $path): array
{
    $docroot = dirname(__DIR__);
    $shell = $docroot . '/index.html';
    $p = strtolower(rtrim($path, '/'));
    if ($p === '') $p = '/en';
    if (preg_match('~^/(en|ms)((?:/[a-z0-9-]+)*)$~', $p, $m) && !str_contains($m[2], 'cms-template')) {
        $snap = $docroot . '/' . $m[1] . $m[2] . '/index.html';
        if (is_file($snap)) return ['file' => $snap, 'status' => 200];
        // a CMS page address: never answer 404 just because the CMS is down
        if (preg_match('~^/[a-z0-9-]+$~', $m[2])) return ['file' => $shell, 'status' => 503];
    }
    return ['file' => $shell, 'status' => 404];
}

function avo_serve_fallback(string $why): void
{
    while (ob_get_level() > 0) @ob_end_clean();
    $fb = $GLOBALS['avo_serve']['fallback'] ?? ['file' => dirname(__DIR__) . '/index.html', 'status' => 404];
    if (!headers_sent()) {
        header_remove();
        // A fatal error has already queued "500 Internal Server Error" as the status LINE;
        // only an explicit status line replaces it (http_response_code() alone does not).
        $reason = [200 => 'OK', 404 => 'Not Found', 503 => 'Service Unavailable'][$fb['status']] ?? 'OK';
        $proto = preg_match('~^HTTP/\d(\.\d)?$~', (string) ($_SERVER['SERVER_PROTOCOL'] ?? '')) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.1';
        header($proto . ' ' . $fb['status'] . ' ' . $reason, true, $fb['status']);
        http_response_code($fb['status']);
        header('Content-Type: text/html; charset=UTF-8');
        header('Cache-Control: no-cache, must-revalidate');
        if ($fb['status'] === 503) header('Retry-After: 120');
        avo_serve_security_headers();
    }
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD' && is_file($fb['file'])) readfile($fb['file']);
    $GLOBALS['avo_serve']['done'] = true;
    try {
        if (function_exists('avo_log')) {
            avo_log('error', 'serve fallback: ' . $why, ['uri' => $_SERVER['REQUEST_URI'] ?? '', 'status' => $fb['status']]);
        } else {
            error_log('avoliveoil serve fallback: ' . $why);
        }
    } catch (Throwable) {
    }
}

register_shutdown_function(function () {
    if ($GLOBALS['avo_serve']['done']) return;
    $e = error_get_last();
    $fatal = $e && in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR, E_RECOVERABLE_ERROR], true);
    avo_serve_fallback($fatal ? ($e['message'] . ' @ ' . $e['file'] . ':' . $e['line']) : 'script ended without a response');
});

ob_start();
$GLOBALS['avo_serve']['fallback'] = avo_serve_fallback_for((string) parse_url((string) ($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH));

try {
    require __DIR__ . '/_lib/bootstrap.php';
    if (getenv('AVO_CMS_TEST_HOOKS') === '1') {
        $hook = (string) ($_SERVER['HTTP_X_TEST_FATAL'] ?? '');
        if ($hook === 'fatal') {
            ini_set('memory_limit', '32M');
            $GLOBALS['avo_blow'] = str_repeat('x', 256 * 1024 * 1024); // uncatchable: memory exhausted
        } elseif ($hook === 'throw') {
            throw new RuntimeException('test hook: exception');
        }
    }
    avo_serve_main();
    $GLOBALS['avo_serve']['done'] = true;
    ob_end_flush();
} catch (Throwable $e) {
    avo_serve_fallback(get_class($e) . ': ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
}

// ---------------------------------------------------------------- main

function avo_query_is_tracking(string $q): bool
{
    if ($q === '') return true;
    foreach (explode('&', $q) as $pair) {
        $k = strtolower(urldecode(explode('=', $pair, 2)[0]));
        if ($k === '') continue;
        if (!preg_match('/^(utm_[a-z0-9_]+|gclid|fbclid|ttclid)$/', $k)) return false;
    }
    return true;
}

function avo_serve_redirect(int $status, string $location): void
{
    http_response_code($status);
    header('Location: ' . $location);
    header('Cache-Control: ' . ($status === 301 ? 'public, max-age=3600' : 'no-cache'));
    header('Content-Type: text/html; charset=UTF-8');
    avo_serve_security_headers();
}

/**
 * @param array{private?:bool, rFile?:?string, v0?:int} $opt
 */
function avo_serve_send(string $html, int $status, array $opt = []): void
{
    $private = $opt['private'] ?? false;
    http_response_code($status);
    header('Content-Type: text/html; charset=UTF-8');
    header('Cache-Control: ' . ($private ? 'private, no-store' : 'no-cache, must-revalidate'));
    if ($private) header('X-Robots-Tag: noindex, nofollow');
    if ($status === 410 || $status === 404) header('X-Robots-Tag: noindex');
    avo_serve_security_headers();
    if ($status === 200 && !$private) {
        $etag = '"' . substr(sha1($html), 0, 32) . '"';
        header('ETag: ' . $etag);
        $inm = (string) ($_SERVER['HTTP_IF_NONE_MATCH'] ?? '');
        if ($inm !== '' && in_array($etag, array_map('trim', explode(',', $inm)), true)) {
            http_response_code(304);
            header_remove('Content-Type');
            if (!empty($opt['rFile'])) avo_write_rendered($opt['rFile'], $html, (int) ($opt['v0'] ?? -1));
            return;
        }
    }
    if (!empty($opt['rFile'])) avo_write_rendered($opt['rFile'], $html, (int) ($opt['v0'] ?? -1));
    header('Content-Length: ' . strlen($html));
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') echo $html;
}

/** temp + rename into /_r, then drop it again if a publish happened meanwhile (spec §13.1). */
function avo_write_rendered(string $file, string $html, int $v0): void
{
    try {
        if ($v0 < 0 || avo_content_version() !== $v0) return;
        avo_write_atomic($file, $html);
        clearstatcache();
        if (avo_content_version() !== $v0) @unlink($file);
    } catch (Throwable $e) {
        avo_log('warn', 'could not write rendered page: ' . $e->getMessage());
    }
}

function avo_shell_page(string $lang, int $status, array $text, array $images, array $menu, int $v): void
{
    $doc = avo_parse_html((string) file_get_contents(AVO_DOCROOT . '/index.html'));
    avo_add_noindex($doc);
    avo_inject_boot($doc, avo_build_boot($lang, $text, $images, $menu, $v));
    avo_serve_send($doc->saveHtml(), $status);
}

function avo_selftest(): void
{
    $sent = (string) ($_SERVER['HTTP_X_SELFTEST'] ?? '');
    $expect = strtolower((string) avo_build_info()['selftestSha256']);
    if ($sent === '' || $expect === '' || !hash_equals($expect, hash('sha256', $sent))) {
        avo_shell_page('en', 404, [], [], [], 0);
        return;
    }
    $probe = avo_data_dir() . '/.selftest-' . bin2hex(random_bytes(3));
    $writable = @file_put_contents($probe, 'ok') === 2;
    @unlink($probe);
    http_response_code(200);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex');
    echo json_encode([
        'ok' => true,
        'php' => PHP_VERSION,
        'sqlite' => (string) db_val('SELECT sqlite_version()'),
        'dataWritable' => $writable,
        'build' => avo_build_id(),
    ], JSON_UNESCAPED_SLASHES);
}

function avo_serve_main(): void
{
    $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
    $uri = (string) ($_SERVER['REQUEST_URI'] ?? '/');
    $path = (string) parse_url($uri, PHP_URL_PATH);
    $query = (string) (parse_url($uri, PHP_URL_QUERY) ?? '');
    if ($path === '') $path = '/';

    if (isset($_GET['selftest'])) {
        avo_selftest();
        return;
    }
    if ($method !== 'GET' && $method !== 'HEAD') {
        http_response_code(405);
        header('Allow: GET, HEAD');
        return;
    }

    // One canonical form: lowercase, no trailing slash, no double slashes (spec §13.1 rules 9–10).
    $norm = strtolower((string) preg_replace('~/{2,}~', '/', $path));
    if ($norm !== '/') $norm = rtrim($norm, '/');
    if ($norm === '') $norm = '/';
    if ($norm !== $path && preg_match('~^/(en|ms|ar)(/|$)~', $norm)) {
        avo_serve_redirect(301, $norm . ($query !== '' ? '?' . $query : ''));
        return;
    }
    if (preg_match('~^/ar(/|$)~', $norm)) {
        avo_serve_redirect(301, '/en'); // the .htaccess table normally answers first
        return;
    }

    $v0 = avo_content_version();
    $site = avo_site_published();
    $siteFresh = (int) ($site['v'] ?? 0) === $v0;
    $text = $site['text'];
    $images = $site['images'];
    $menu = $site['menu'];

    if ($norm === '/') {
        $lang = 'en';
        $rest = '';
    } elseif (preg_match('~^/(en|ms)((?:/[a-z0-9-]+)*)$~', $norm, $m)) {
        $lang = $m[1];
        $rest = $m[2];
    } else {
        avo_shell_page('en', 404, $text, $images, $menu, $v0);
        return;
    }
    if (str_contains($rest, 'cms-template')) {
        avo_shell_page($lang, 404, $text, $images, $menu, $v0);
        return;
    }

    $edit = ($_GET['cms-edit'] ?? null) === '1';
    $preview = ($_GET['cms-preview'] ?? null) === '1';
    $session = ($edit || $preview) ? avo_session() : null;
    $edit = $edit && $session !== null;
    $preview = $preview && $session !== null;
    $cacheable = !$edit && !$preview && $siteFresh && avo_query_is_tracking($query);
    $rFile = $cacheable ? avo_rendered_dir() . '/' . $lang . $rest . '/index.html' : null;

    $snapshot = AVO_DOCROOT . '/' . $lang . $rest . '/index.html';
    if (is_file($snapshot)) {
        if ($edit) {
            $ov = avo_overrides_for_edit($session['user_id'], ['text' => $text, 'images' => $images]);
            $text = $ov['text'];
            $images = $ov['images'];
        }
        $doc = avo_parse_html((string) file_get_contents($snapshot));
        avo_apply_overrides($doc, $lang, $text, $images, $menu, true);
        avo_inject_boot($doc, avo_build_boot($lang, $text, $images, $menu, $v0, null, $edit));
        avo_serve_send($doc->saveHtml(), 200, ['private' => $edit, 'rFile' => $rFile, 'v0' => $v0]);
        return;
    }

    if (!preg_match('~^/([a-z0-9]+(?:-[a-z0-9]+)*)$~', $rest, $sm)) {
        avo_shell_page($lang, 404, $text, $images, $menu, $v0);
        return;
    }
    $slug = $sm[1];

    if ($preview) {
        $file = avo_preview_page_file($slug, $lang);
        if ($file) {
            avo_serve_send(avo_render_cms_page($file, $lang, '', $text, $images, $menu, $v0, true), 200, ['private' => true]);
            return;
        }
    }

    $file = avo_page_published($slug);
    if ($file && in_array($lang, $file['langs'] ?? [], true)) {
        $html = (string) ($file['html'][$lang] ?? '');
        avo_serve_send(avo_render_cms_page($file, $lang, $html, $text, $images, $menu, $v0, false), 200, ['rFile' => $rFile, 'v0' => $v0]);
        return;
    }
    $to = $site['redirects'][$slug] ?? null;
    if (is_string($to) && $to !== $slug && preg_match(AVO_SLUG_RE, $to)) {
        avo_serve_redirect(301, '/' . $lang . '/' . $to . ($query !== '' ? '?' . $query : ''));
        return;
    }
    if (in_array($slug, $site['gone'] ?? [], true)) {
        avo_shell_page($lang, 410, $text, $images, $menu, $v0);
        return;
    }
    avo_shell_page($lang, 404, $text, $images, $menu, $v0);
}

/**
 * The parsed CMS template for the doc being rendered (published or draft preview), with its
 * own name rewritten to the slug. 'landing' uses __cms-template-landing; when that file is
 * missing or has no page root it falls back to the site template (logged, never a 503 for
 * that reason). Only a broken SITE template throws (→ fail-safe 503).
 */
function avo_cms_template(string $lang, string $layout, string $slug): Dom\HTMLDocument
{
    $names = $layout === 'landing' ? ['__cms-template-landing', '__cms-template'] : ['__cms-template'];
    foreach ($names as $name) {
        $tplFile = AVO_DOCROOT . '/' . $lang . '/' . $name . '/index.html';
        $tpl = @file_get_contents($tplFile);
        $problem = 'is missing';
        if (is_string($tpl) && $tpl !== '') {
            // The exact segment name only: '__cms-template' must not eat the start of '__cms-template-landing'.
            $doc = avo_parse_html((string) preg_replace('~' . preg_quote($name, '~') . '(?![a-z0-9-])~', $slug, $tpl));
            if ($doc->querySelector('[data-cms-page-root]')) return $doc;
            $problem = 'has no [data-cms-page-root]';
        }
        if ($name === '__cms-template') throw new RuntimeException("CMS template $problem: $tplFile");
        avo_log('error', "landing template $problem, using the site template", ['file' => $tplFile, 'slug' => $slug]);
    }
    throw new LogicException('unreachable');
}

function avo_render_cms_page(array $file, string $lang, string $html, array $text, array $images, array $menu, int $v, bool $preview): string
{
    $slug = (string) $file['slug'];
    $layout = ($file['doc']['layout'] ?? 'site') === 'landing' ? 'landing' : 'site';
    $doc = avo_cms_template($lang, $layout, $slug);
    $root = $doc->querySelector('[data-cms-page-root]');
    $root->innerHTML = $html;
    avo_apply_overrides($doc, $lang, $text, $images, $menu, false);
    avo_apply_seo($doc, $file['seo'][$lang], $lang, $file['langs']);
    avo_apply_lang_links($doc, $slug, $file['langs']);
    if ($preview) avo_add_noindex($doc);
    avo_inject_boot($doc, avo_build_boot($lang, $text, $images, $menu, $v, avo_page_payload_public($file, $lang), false, $preview));
    return $doc->saveHtml();
}

/** Draft of any non-trashed page, shaped like a published page file (admin preview). */
function avo_preview_page_file(string $slug, string $lang): ?array
{
    $row = db_one('SELECT * FROM pages WHERE slug = ? AND deleted_at IS NULL', [$slug]);
    if (!$row) return null;
    $doc = json_decode((string) $row['draft_json'], true) ?: [];
    $langs = array_values(array_filter(AVO_LANGS, fn ($l) => $l === $lang || trim(avo_loc($doc['title'] ?? null, $l)) !== ''));
    $media = avo_media_refs(avo_doc_media_ids($doc));
    $homeLabels = avo_home_labels(avo_site_published()['text']);
    $seo = [];
    foreach ($langs as $l) $seo[$l] = avo_resolve_seo($slug, $doc, $l, $langs, true, $media, $homeLabels, null, null);
    return [
        'id' => (int) $row['id'], 'slug' => $slug, 'langs' => $langs, 'doc' => $doc,
        'media' => $media, 'forms' => avo_public_forms(avo_doc_form_ids($doc)), 'seo' => $seo,
    ];
}
