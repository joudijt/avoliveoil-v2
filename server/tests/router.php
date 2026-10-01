<?php
declare(strict_types=1);

/*
 * php -S router that emulates the parts of public/.htaccess the tests exercise, in the
 * same order (spec §13.1). The real .htaccess is tested against Apache by the
 * integrator's harness (server-harness/); this keeps the PHP suite self-contained.
 *
 *   php -S 127.0.0.1:8091 -t <docroot> server/tests/router.php
 */

$root = rtrim(str_replace('\\', '/', (string) $_SERVER['DOCUMENT_ROOT']), '/');
$uri = (string) ($_SERVER['REQUEST_URI'] ?? '/');
$path = (string) parse_url($uri, PHP_URL_PATH);
$query = (string) (parse_url($uri, PHP_URL_QUERY) ?? '');
$rel = ltrim($path, '/');

$run = function (string $script) use ($root): bool {
    $_SERVER['SCRIPT_NAME'] = '/api/' . $script;
    $_SERVER['SCRIPT_FILENAME'] = $root . '/api/' . $script;
    chdir($root . '/api');
    require $root . '/api/' . $script;
    return true;
};
$notFound = function () use ($root): bool {
    http_response_code(404);
    header('Content-Type: text/html; charset=UTF-8');
    readfile($root . '/index.html');
    return true;
};
$redirect = function (string $to): bool {
    http_response_code(301);
    header('Location: ' . $to);
    return true;
};

// 3. Arabic removal (approximation of the generated [NC] block's catch-all)
if (preg_match('~^ar(/.*)?$~i', $rel)) return $redirect('/en');
if (preg_match('~^llms-ar\.txt$~i', $rel)) return $redirect('/llms.txt');

// 4. internal stores
if (preg_match('~^/+(_r|api/_lib|api/_data|api/_setup|api/tests)(/|$)~i', $path)) return $notFound();

// 5. API
if (preg_match('~^api(/.*)?$~', $rel)) {
    if (preg_match('~^api/(index|serve|sitemap)\.php$~', $rel, $m)) return $run($m[1] . '.php');
    return $run('index.php');
}
// 6. sitemap
if ($rel === 'sitemap.xml') return $run('sitemap.php');
// 7. admin (not under test)
if (preg_match('~^admin(/.*)?$~', $rel)) return $notFound();
// 8. template (any name, also .../index.html) / snapshot file names
if (preg_match('~(^|/)_*cms-template[a-z0-9-]*(/|$)~i', $rel)) return $notFound();
if (preg_match('~^((?:en|ms)(?:/.*?)?)/index\.html$~i', $rel, $m)) return $redirect('/' . $m[1]);
// 9. uppercase
if (preg_match('~[A-Z]~', $path) && preg_match('~^(en|ms)(/.*)?$~i', $rel)) return $run('serve.php');
// 10. trailing slash
if (preg_match('~^((?:en|ms)(?:/[a-z0-9-]+)*)/$~', $rel, $m)) return $redirect('/' . $m[1] . ($query !== '' ? '?' . $query : ''));
// 11. pages: /_r store, else serve.php
if ($rel === '' || preg_match('~^(?:en|ms)(?:/[a-z0-9-]+)*$~', $rel)) {
    $r = $root . '/_r/' . ($rel === '' ? 'en' : $rel) . '/index.html';
    if (!preg_match('~(^|&)(cms-|selftest)~i', $query) && is_file($r)) {
        header('Content-Type: text/html; charset=UTF-8');
        header('X-Served-From: _r');
        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') readfile($r);
        return true;
    }
    return $run('serve.php');
}
// 13. real files
if ($rel !== '' && is_file($root . '/' . $rel)) return false;
// 14. extension 404
if (preg_match('~\.[A-Za-z0-9]{2,12}$~', $rel)) return $notFound();
// 15. SPA shell
header('Content-Type: text/html; charset=UTF-8');
readfile($root . '/index.html');
return true;
