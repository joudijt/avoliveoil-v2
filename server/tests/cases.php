<?php
declare(strict_types=1);

/* Test cases, run in order (later cases build on earlier state). */

function C(string $k): string
{
    return $GLOBALS['CTX'][$k];
}

/** Direct access to the test database (aging rows, planting an orphan). run.php closes it before cleanup. */
function tdb(): PDO
{
    if (!isset($GLOBALS['TDB'])) {
        $GLOBALS['TDB'] = new PDO('sqlite:' . C('data') . '/cms.sqlite', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
        $GLOBALS['TDB']->exec('PRAGMA busy_timeout = 5000');
    }
    return $GLOBALS['TDB'];
}

/** @return list<string> eml file paths, oldest first */
function mails(): array
{
    $all = glob(C('data') . '/mail-outbox/*.eml') ?: [];
    sort($all);
    return $all;
}

/** Parse an .eml: [headers (name => list), text, html] */
function parse_eml(string $file): array
{
    $raw = (string) file_get_contents($file);
    [$head, $body] = explode("\r\n\r\n", $raw, 2);
    $head = (string) preg_replace('/\r\n[ \t]+/', ' ', $head);
    $headers = [];
    foreach (explode("\r\n", $head) as $line) {
        if (preg_match('/^([A-Za-z-]+):\s*(.*)$/', $line, $m)) $headers[strtolower($m[1])][] = $m[2];
    }
    $parts = [];
    if (preg_match('/boundary="([^"]+)"/', $head, $bm)) {
        foreach (explode('--' . $bm[1], $body) as $part) {
            if (preg_match('~Content-Type: (text/(plain|html)).*?\r\n\r\n(.*)$~s', $part, $pm)) {
                $parts[$pm[2]] = base64_decode(preg_replace('/\s+/', '', $pm[3]));
            }
        }
    }
    return ['headers' => $headers, 'text' => $parts['plain'] ?? '', 'html' => $parts['html'] ?? '', 'head' => $head];
}

function doc_with(array $sections, array $title = ['en' => 'Summer offer', 'ms' => 'Tawaran musim panas'], array $meta = ['en' => 'Summer offer | Arabian Village', 'ms' => '']): array
{
    return [
        'schema' => 1,
        'title' => $title,
        'seo' => ['metaTitle' => $meta, 'metaDescription' => ['en' => 'Our summer olive oil offer.', 'ms' => '']],
        'sections' => $sections,
    ];
}

function section(array $widgets): array
{
    return ['id' => 's' . bin2hex(random_bytes(3)), 'kind' => 'section',
        'settings' => ['layout' => 'boxed', 'bg' => 'bg', 'padY' => 'l', 'align' => 'start'],
        'columns' => [['id' => 'c' . bin2hex(random_bytes(3)), 'span' => 12, 'widgets' => $widgets]]];
}

function w(string $type, array $settings): array
{
    return ['id' => 'w' . bin2hex(random_bytes(3)), 'type' => $type, 'settings' => $settings];
}

function L(string $en, string $ms = ''): array
{
    return ['en' => $en, 'ms' => $ms];
}

function rpath(string $rel): string
{
    return C('docroot') . '/' . ltrim($rel, '/');
}

function age_submissions(): void
{
    tdb()->exec('UPDATE submissions SET created_at = created_at - 90000');
}

$GLOBALS['S'] = [];
$S = &$GLOBALS['S'];
$anon = new Client();
$admin = new Client();

// ---------------------------------------------------------------- sanitiser (in-process unit tests)

test('sanitiser strips XSS payloads (script, onerror, javascript:, //evil, iframe, form action, style expression)', function () {
    if (!defined('AVO_CMS')) define('AVO_CMS', true);
    require_once dirname(__DIR__) . '/_lib/util.php';
    require_once dirname(__DIR__) . '/_lib/sanitize.php';
    $cases = [
        ['<p>hi</p><script>alert(1)</script>', '<p>hi</p>'],
        ['<img src="/a.webp" onerror="alert(1)" alt="x">', '<img src="/a.webp" alt="x">'],
        ['<a href="javascript:alert(1)">a</a>', '<a>a</a>'],
        ['<a href=" jav&#x09;ascript:alert(1)">a</a>', '<a>a</a>'],
        ['<a href="JaVaScRiPt:alert(1)">a</a>', '<a>a</a>'],
        ['<a href="//evil.com/x">a</a>', '<a>a</a>'],
        ['<a href="/\evil.com">a</a>', '<a>a</a>'],
        ['<a href="data:text/html,<script>alert(1)</script>">a</a>', '<a>a</a>'],
        ['<a href="https://ok.example/x" target="_blank">a</a>', '<a href="https://ok.example/x" target="_blank" rel="noopener noreferrer">a</a>'],
        ['<a href="/en/contact">c</a><a href="mailto:a@b.co">m</a><a href="tel:+601">t</a><a href="#top">h</a>',
            '<a href="/en/contact">c</a><a href="mailto:a@b.co">m</a><a href="tel:+601">t</a><a href="#top">h</a>'],
        ['<iframe src="https://evil.com/embed/abc"></iframe>', ''],
        ['<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>', ''],
        ['<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" onload="x()"></iframe>', '<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"></iframe>'],
        ['<iframe src="https://player.vimeo.com/video/123456"></iframe>', '<iframe src="https://player.vimeo.com/video/123456"></iframe>'],
        ['<form action="https://evil.com/steal"><input name="pw"></form>', ''],
        ['<form action="/api/forms/7/submit" method="post"><input type="hidden" name="_page" value="3"><button type="submit" formaction="https://evil">Go</button></form>',
            '<form action="/api/forms/7/submit" method="post"><input type="hidden" name="_page" value="3"><button type="submit">Go</button></form>'],
        ['<div style="width:expression(alert(1));max-width:600px">x</div>', '<div style="max-width:600px">x</div>'],
        ['<div style="background-image:url(https://evil.com/x.png)">x</div>', '<div>x</div>'],
        ['<div style="background-image:url(/uploads/cms/2026/10/ab12-960.webp);aspect-ratio:16/9">x</div>', '<div style="background-image:url(/uploads/cms/2026/10/ab12-960.webp);aspect-ratio:16/9">x</div>'],
        ['<svg viewBox="0 0 24 24"><path d="M1 1"/><script>alert(1)</script><foreignObject><img src=x onerror=alert(1)></foreignObject><a href="javascript:x"><path d="M2 2"/></a></svg>',
            '<svg viewBox="0 0 24 24"><path d="M1 1"></path></svg>'],
        ['<div id="cms-boot">x</div><div id="ok-id">y</div>', '<div>x</div><div id="ok-id">y</div>'],
        ['<object data="x.swf"></object><embed src="x"><base href="//evil"><meta http-equiv="refresh" content="0;url=//evil"><style>*{}</style>', ''],
        ['<p onclick="x()" class="a" data-x="1" data-cms-key="k" aria-label="l">t</p>', '<p class="a" data-cms-key="k" aria-label="l">t</p>'],
        ['<!-- hidden --><b>b</b><math><mi>x</mi></math><font color="red">f</font>', '<b>b</b>f'],
        ['<img src="x" srcset="/a.webp 480w, javascript:alert(1) 960w">', '<img src="x">'],
        ['<input type="image" src="x"><input type="email" name="email" required>', '<input><input type="email" name="email" required="">'],
        ['<div aria-hidden="true"><input type="text" name="company_website" tabindex="-1" autocomplete="off"></div><a tabindex="5">x</a>',
            '<div aria-hidden="true"><input type="text" name="company_website" tabindex="-1" autocomplete="off"></div><a>x</a>'],
        ['<details open=""><summary>Q</summary><div role="separator"></div><hr><nav><figure style="max-width:480px"><video src="/uploads/cms/a.mp4" controls="" playsinline="" preload="metadata"></video></figure></nav></details>',
            '<details open=""><summary>Q</summary><div role="separator"></div><hr><nav><figure style="max-width:480px"><video src="/uploads/cms/a.mp4" controls="" playsinline="" preload="metadata"></video></figure></nav></details>'],
        ['<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" title="Video" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen="" referrerpolicy="strict-origin-when-cross-origin" loading="lazy"></iframe>',
            '<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" title="Video" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen="" referrerpolicy="strict-origin-when-cross-origin" loading="lazy"></iframe>'],
        ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="i" width="1em" height="1em"><polyline points="20 6 9 17 4 12"></polyline><line x1="1" y1="2" x2="3" y2="4"></line><circle cx="1" cy="1" r="1"></circle><rect x="1" y="1" width="2" height="2"></rect><g><polygon points="1 1 2 2"></polygon></g></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="i" width="1em" height="1em"><polyline points="20 6 9 17 4 12"></polyline><line x1="1" y1="2" x2="3" y2="4"></line><circle cx="1" cy="1" r="1"></circle><rect x="1" y="1" width="2" height="2"></rect><g><polygon points="1 1 2 2"></polygon></g></svg>'],
        ['<form action="/api/forms/3/submit" method="post"><fieldset><legend>L</legend><label for="f-a">A</label><select name="size" required=""><option value="o1" selected="">1</option></select><textarea name="msg" rows="4" placeholder="p" required="" maxlength="5000"></textarea><input type="number" name="n" min="0" max="9" inputmode="numeric" checked=""></fieldset></form>',
            '<form action="/api/forms/3/submit" method="post"><fieldset><legend>L</legend><label for="f-a">A</label><select name="size" required=""><option value="o1" selected="">1</option></select><textarea name="msg" rows="4" placeholder="p" required="" maxlength="5000"></textarea><input type="number" name="n" min="0" max="9" inputmode="numeric" checked=""></fieldset></form>'],
    ];
    foreach ($cases as [$in, $want]) {
        eq(avo_sanitize_html($in, 'page'), $want, 'sanitise ' . $in);
    }
    eq(avo_sanitize_rich('<p class="c">x <a href="https://a.b" onclick="y">l</a><img src=x onerror=1><iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"></iframe><h2>h</h2></p>'),
        '<p>x <a href="https://a.b">l</a></p><h2>h</h2><p></p>', 'rich text keeps only the rich-text allow-list (HTML5 parser closes the p before h2)');
});

// ---------------------------------------------------------------- serving before any CMS data

test('selftest: right header → ok JSON, wrong/missing header → 404', function () use ($anon) {
    $r = $anon->get('/api/serve.php?selftest=1', ['headers' => ['X-Selftest' => C('selftest')]]);
    status($r, 200, 'selftest ok');
    $j = $r->json();
    eq($j['ok'] ?? null, true, 'ok flag');
    eq($j['build'] ?? null, C('build'), 'build id');
    eq($j['dataWritable'] ?? null, true, 'data writable');
    ok(preg_match('/^\d+\.\d+/', (string) ($j['sqlite'] ?? '')), 'sqlite version');
    ok(str_starts_with((string) $j['php'], '8.'), 'php version');
    status($anon->get('/api/serve.php?selftest=1', ['headers' => ['X-Selftest' => 'nope']]), 404, 'wrong selftest token');
    status($anon->get('/api/serve.php?selftest=1'), 404, 'missing selftest token');
});

test('snapshot served through serve.php: doctype, module script, JSON-LD, SVG intact; boot appended; /_r written', function () use ($anon) {
    @unlink(rpath('_r/en/index.html'));
    $r = $anon->get('/en');
    status($r, 200, '/en');
    ok(str_starts_with($r->body, '<!DOCTYPE html>'), 'doctype kept');
    contains($r->body, '<script type="module" crossorigin="" src="/assets/index-TEST.js"></script>', 'module script kept');
    contains($r->body, '<svg viewBox="0 0 24 24" aria-hidden="true" class="icon"><path d="M12 2L2 22h20z"></path></svg>', 'inline svg kept');
    contains($r->body, '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage"', 'JSON-LD kept');
    contains((string) $r->header('content-security-policy'), "script-src 'self'", 'CSP header');
    $boot = $r->boot();
    eq($boot['lang'], 'en', 'boot lang');
    eq($boot['build'], C('build'), 'boot build');
    ok(isset($boot['text']['en'], $boot['text']['ms'], $boot['images']['en'], $boot['menu']['ms']['header']), 'boot carries both languages');
    $doc = $r->doc();
    eq($doc->body->lastElementChild->getAttribute('id'), 'cms-boot', 'boot is the last child of body');
    ok(is_file(rpath('_r/en/index.html')), '/_r/en/index.html written');
    $r2 = $anon->get('/en');
    eq($r2->header('x-served-from'), '_r', 'second hit served from /_r');
    eq($r2->body, $r->body, '/_r file equals the PHP response');
    $root = $anon->get('/');
    status($root, 200, 'bare /');
    contains($root->body, 'cms-boot', 'bare / serves the English page');
});

test('HEAD, ETag and 304', function () use ($anon) {
    @unlink(rpath('_r/en/why-us/index.html'));
    $h = $anon->req('HEAD', '/en/why-us?cms-x=1');
    status($h, 200, 'HEAD');
    eq($h->body, '', 'HEAD has no body');
    $g = $anon->get('/en/why-us?cms-x=1');
    $etag = $g->header('etag');
    ok($etag !== null && $etag !== '', 'ETag present');
    status($anon->get('/en/why-us?cms-x=1', ['headers' => ['If-None-Match' => $etag]]), 304, 'If-None-Match → 304');
    ok(!is_file(rpath('_r/en/why-us/index.html')), 'a non-tracking query string is never written to /_r');
    $anon->get('/en/why-us?utm_source=news&gclid=1');
    ok(is_file(rpath('_r/en/why-us/index.html')), 'tracking parameters are ignored for /_r');
});

test('URL normalisation: trailing slash, uppercase, index.html, template, unknown, /ar', function () use ($anon) {
    $r = $anon->get('/en/');
    status($r, 301, '/en/');
    eq($r->header('location'), '/en', '/en/ → /en');
    $r = $anon->get('/EN/Why-Us');
    status($r, 301, 'uppercase');
    eq($r->header('location'), '/en/why-us', 'uppercase → lowercase');
    $r = $anon->get('/en/why-us/index.html');
    status($r, 301, 'index.html');
    eq($r->header('location'), '/en/why-us', 'index.html → clean path');
    status($anon->get('/en/__cms-template'), 404, '__cms-template is never public');
    status($anon->get('/api/serve.php?x=1', []), 404, 'serve.php direct without selftest → 404');
    $r = $anon->get('/en/no-such-page');
    status($r, 404, 'unknown page');
    $robots = $r->doc()->querySelector('meta[name="robots"]');
    eq($robots?->getAttribute('content'), 'noindex', '404 shell is noindex');
    $r->boot();
    $r = $anon->get('/AR/blog/x');
    status($r, 301, '/AR');
    eq($r->header('location'), '/en', '/AR/... → one 301 hop ([NC] block)');
    status($anon->get('/en/a/b/c'), 404, 'deep unknown path');
});

test('internal stores are not reachable from outside', function () use ($anon) {
    status($anon->get('/api/_lib/db.php'), 404, '_lib');
    status($anon->get('/api/_data/defaults-en.json'), 404, '_data');
    status($anon->get('/api/_setup/' . C('setupToken') . '.token'), 404, '_setup');
    status($anon->get('/_r/en/index.html'), 404, '/_r');
    status($anon->get('/api/tests/run.php'), 404, 'tests');
    $r = $anon->get('/api/nope');
    status($r, 404, 'unknown api route');
    eq($r->json()['error']['code'] ?? null, 'not_found', 'API error shape');
});

// ---------------------------------------------------------------- setup + auth

test('setup: empty → create first admin, token file deleted, second time refused', function () use ($anon, $admin) {
    $r = $anon->get('/api/setup/status');
    eq($r->json(), ['needsSetup' => true], 'needs setup');
    status($anon->post('/api/setup', ['token' => str_repeat('a', 64), 'email' => 'admin@avoliveoil.com', 'name' => 'Admin', 'password' => 'correct horse 1']), 403, 'unknown token');
    status($anon->post('/api/setup', ['token' => C('setupToken'), 'email' => 'admin@avoliveoil.com', 'name' => 'Admin', 'password' => 'short']), 400, 'short password');
    $r = $admin->post('/api/setup', ['token' => C('setupToken'), 'email' => 'admin@avoliveoil.com', 'name' => 'Admin', 'password' => 'correct horse 1']);
    status($r, 200, 'setup');
    eq($r->json()['user']['email'], 'admin@avoliveoil.com', 'user returned');
    ok(isset($admin->cookies['avo_cms']), 'signed in after setup');
    ok(!is_file(C('docroot') . '/api/_setup/' . C('setupToken') . '.token'), 'token file deleted');
    $tok2 = bin2hex(random_bytes(32));
    file_put_contents(C('docroot') . "/api/_setup/$tok2.token", '');
    $r = $anon->post('/api/setup', ['token' => $tok2, 'email' => 'x@avoliveoil.com', 'name' => 'X', 'password' => 'correct horse 2']);
    status($r, 409, 'second setup refused');
    eq($anon->get('/api/setup/status')->json(), ['needsSetup' => false], 'no longer needs setup');
    $admin->build = C('build');
});

test('login / me / logout', function () use ($admin) {
    status($admin->get('/api/auth/me'), 200, 'me after setup');
    status($admin->post('/api/auth/logout'), 200, 'logout');
    status($admin->get('/api/auth/me'), 401, 'me after logout');
    $r = $admin->post('/api/auth/login', ['email' => 'Admin@AvoliveOil.com', 'password' => 'correct horse 1']);
    status($r, 200, 'login (email case-insensitive)');
    ok($admin->csrf !== '', 'csrf returned');
    status($admin->get('/api/auth/me'), 200, 'me after login');
});

test('wrong password: same message as unknown email, progressive delay', function () {
    $c = new Client();
    $r1 = $c->post('/api/auth/login', ['email' => 'admin@avoliveoil.com', 'password' => 'wrong password!']);
    status($r1, 401, 'wrong password');
    $r2 = $c->post('/api/auth/login', ['email' => 'nobody@example.com', 'password' => 'wrong password!']);
    status($r2, 401, 'unknown email');
    eq($r1->json()['error']['message'], $r2->json()['error']['message'], 'identical error text');
    ok($r2->time >= 0.9, sprintf('second failure is delayed (took %.2f s)', $r2->time));
    tdb()->exec('DELETE FROM login_attempts');
});

test('CSRF missing → 403, cross-origin → 403, stale panel build → 409', function () use ($admin) {
    $r = $admin->post('/api/pages', ['slug' => 'csrf-test', 'title' => L('x')], ['noCsrf' => true]);
    status($r, 403, 'missing CSRF');
    eq($r->json()['error']['code'], 'csrf', 'csrf code');
    $r = $admin->post('/api/pages', ['slug' => 'csrf-test', 'title' => L('x')], ['headers' => ['Origin' => 'https://evil.example']]);
    status($r, 403, 'cross-origin');
    eq($r->json()['error']['code'], 'cross_origin', 'cross-origin code');
    $r = $admin->post('/api/pages', ['slug' => 'csrf-test', 'title' => L('x')], ['noOrigin' => true, 'headers' => ['Sec-Fetch-Site' => 'cross-site']]);
    status($r, 403, 'Sec-Fetch-Site cross-site');
    $r = $admin->post('/api/pages', ['slug' => 'csrf-test', 'title' => L('x')], ['headers' => ['X-CMS-Build' => 'old-build']]);
    status($r, 409, 'stale build');
    eq($r->json()['error']['code'], 'stale_panel', 'stale_panel code');
    status((new Client())->post('/api/pages', ['slug' => 'x1', 'title' => L('x')]), 401, 'no session');
});

test('users: create, list, cannot deactivate the last active user, deactivation kills sessions', function () use ($admin) {
    $r = $admin->post('/api/users', ['email' => 'editor@example.com', 'name' => 'Editor', 'password' => 'editor password 1']);
    status($r, 200, 'create user');
    $editorId = $r->json()['id'];
    status($admin->post('/api/users', ['email' => 'editor@example.com', 'name' => 'Dup', 'password' => 'editor password 1']), 409, 'duplicate email');
    status($admin->post('/api/users', ['email' => 'bad', 'name' => 'Bad', 'password' => 'editor password 1']), 400, 'invalid email');
    eq(count($admin->get('/api/users')->json()), 2, 'two users');
    $ed = new Client();
    status($ed->post('/api/auth/login', ['email' => 'editor@example.com', 'password' => 'editor password 1']), 200, 'editor login');
    status($admin->patch("/api/users/$editorId", ['isActive' => false]), 200, 'deactivate editor');
    status($ed->get('/api/auth/me'), 401, 'deactivated user signed out');
    $me = $admin->get('/api/auth/me')->json()['user']['id'];
    $r = $admin->patch("/api/users/$me", ['isActive' => false]);
    status($r, 409, 'cannot deactivate the last active user');
    eq($r->json()['error']['code'], 'last_user', 'last_user code');
    status($admin->patch("/api/users/$editorId", ['isActive' => true]), 200, 'reactivate editor');
    $GLOBALS['S']['editorId'] = $editorId;
});

test('forgot / reset password: mail captured, token single use, sessions killed', function () use ($admin) {
    $before = count(mails());
    $r = (new Client())->post('/api/auth/forgot', ['email' => 'nobody@example.com']);
    status($r, 200, 'forgot unknown');
    eq(count(mails()), $before, 'no mail for an unknown address');
    $r2 = (new Client())->post('/api/auth/forgot', ['email' => 'editor@example.com']);
    status($r2, 200, 'forgot known');
    eq($r->json(), $r2->json(), 'same answer for known and unknown');
    $all = mails();
    eq(count($all), $before + 1, 'one mail written');
    $m = parse_eml(end($all));
    contains($m['headers']['to'][0], 'editor@example.com', 'sent to the user');
    ok(preg_match('~/admin/reset\?token=([0-9a-f]{64})~', $m['text'], $tm), 'reset link in the mail');
    $ed = new Client();
    status($ed->post('/api/auth/login', ['email' => 'editor@example.com', 'password' => 'editor password 1']), 200, 'editor signed in before reset');
    status((new Client())->post('/api/auth/reset', ['token' => $tm[1], 'password' => 'brand new pass 9']), 200, 'reset');
    status($ed->get('/api/auth/me'), 401, 'old sessions killed by the reset');
    status((new Client())->post('/api/auth/reset', ['token' => $tm[1], 'password' => 'another pass 99']), 400, 'token is single use');
    status($ed->post('/api/auth/login', ['email' => 'editor@example.com', 'password' => 'brand new pass 9']), 200, 'login with the new password');
    // password change kills the user's OTHER sessions only
    $ed2 = new Client();
    status($ed2->post('/api/auth/login', ['email' => 'editor@example.com', 'password' => 'brand new pass 9']), 200, 'second session');
    $ed->build = C('build');
    status($ed->post('/api/auth/password', ['current' => 'brand new pass 9', 'next' => 'changed pass 77']), 200, 'change password');
    status($ed->get('/api/auth/me'), 200, 'current session survives');
    status($ed2->get('/api/auth/me'), 401, 'other session killed');
    tdb()->exec('DELETE FROM login_attempts');
});

test('emergency .reset file resets a password and is deleted', function () {
    $tok = bin2hex(random_bytes(32));
    $f = C('docroot') . "/api/_setup/$tok.reset";
    file_put_contents($f, '');
    $c = new Client();
    status($c->post('/api/setup', ['token' => $tok, 'email' => 'editor@example.com', 'password' => 'emergency pass 1']), 200, 'reset via file');
    ok(!is_file($f), 'reset file deleted');
    status((new Client())->post('/api/auth/login', ['email' => 'editor@example.com', 'password' => 'emergency pass 1']), 200, 'new password works');
});

// ---------------------------------------------------------------- pages

test('pages: slug rules, reserved slugs, duplicate slug', function () use ($admin) {
    foreach (['A b', 'a', '-x', 'x--y', 'x_y', str_repeat('a', 81)] as $bad) {
        status($admin->post('/api/pages', ['slug' => $bad, 'title' => L('T')]), 400, "invalid slug '$bad'");
    }
    foreach (['contact', 'admin', 'ar', '__cms-template', 'cms-template', 'index', 'sitemap'] as $res) {
        $r = $admin->post('/api/pages', ['slug' => $res, 'title' => L('T')]);
        status($r, 400, "reserved slug '$res'");
    }
    $r = $admin->post('/api/pages', ['slug' => 'summer-offer', 'title' => L('Summer offer', 'Tawaran musim panas')]);
    status($r, 200, 'create page');
    $p = $r->json();
    eq($p['page']['slug'], 'summer-offer', 'slug');
    eq($p['page']['status'], 'draft', 'draft');
    eq($p['page']['version'], 1, 'version 1');
    $GLOBALS['S']['pageId'] = $p['page']['id'];
    status($admin->post('/api/pages', ['slug' => 'summer-offer', 'title' => L('Again')]), 409, 'duplicate slug');
    status($admin->post('/api/pages', ['slug' => 'no-title', 'title' => L('')]), 400, 'empty title');
});

test('draft save with baseVersion, stale tab → 409, unsafe links refused, rich text sanitised', function () use ($admin) {
    $id = $GLOBALS['S']['pageId'];
    $doc = doc_with([section([w('heading', ['text' => L('Hello', 'Halo'), 'level' => 'h1', 'size' => 'xl', 'align' => 'start', 'color' => 'default']),
        w('text', ['html' => L('<p>Body <script>alert(1)</script><b>bold</b></p>', '<p>Isi</p>'), 'align' => 'start', 'color' => 'default', 'size' => 'm'])])]);
    $r = $admin->put("/api/pages/$id/draft", ['doc' => $doc, 'baseVersion' => 1]);
    status($r, 200, 'save draft');
    eq($r->json()['version'], 2, 'version bumped');
    $r = $admin->put("/api/pages/$id/draft", ['doc' => $doc, 'baseVersion' => 1]);
    status($r, 409, 'stale baseVersion');
    eq($r->json()['error']['code'], 'stale_draft', 'stale_draft code');
    $saved = $admin->get("/api/pages/$id")->json()['draft'];
    eq($saved['sections'][0]['columns'][0]['widgets'][1]['settings']['html']['en'], '<p>Body <b>bold</b></p>', 'rich text sanitised at save');
    $bad = doc_with([section([w('button', ['label' => L('Go'), 'href' => 'javascript:alert(1)', 'style' => 'primary', 'newTab' => false, 'align' => 'start', 'size' => 'm'])])]);
    $r = $admin->put("/api/pages/$id/draft", ['doc' => $bad, 'baseVersion' => 2]);
    status($r, 400, 'javascript: href refused');
    ok(isset($r->json()['error']['fields']['sections.0.columns.0.widgets.0.settings.href']), 'error points at the widget');
    $bad2 = doc_with([section([w('video', ['url' => 'https://evil.example/x.html', 'ratio' => '16/9', 'title' => L('v')])])]);
    status($admin->put("/api/pages/$id/draft", ['doc' => $bad2, 'baseVersion' => 2]), 400, 'non-video URL refused');
    status($admin->put("/api/pages/$id/draft", ['doc' => ['schema' => 2], 'baseVersion' => 2]), 400, 'unknown schema refused');
});

test('publish: EN only when MS is incomplete; published files, version bump, /_r wiped', function () use ($admin, $anon) {
    $id = $GLOBALS['S']['pageId'];
    $anon->get('/en');
    ok(is_file(rpath('_r/en/index.html')), '/_r populated before publish');
    $v0 = (int) @file_get_contents(C('data') . '/version.txt');
    $doc = doc_with([section([
        w('heading', ['text' => L('Summer offer', 'Tawaran'), 'level' => 'h1', 'size' => 'xl', 'align' => 'start', 'color' => 'default']),
        w('faq', ['items' => [['id' => 'q1', 'q' => L('Is it fresh?', 'Segar?'), 'a' => L('<p>Yes, this <b>season</b>.</p>', 'Ya.')]]]),
        w('text', ['html' => L('<p>Only in English</p>', ''), 'align' => 'start', 'color' => 'default', 'size' => 'm']),
    ])]);
    $html = '<section class="cms-s"><h1>Summer offer</h1><p>Buy now</p><script>alert("x")</script><img src="/x.webp" onerror="alert(1)"></section>';
    $r = $admin->post("/api/pages/$id/publish", ['doc' => $doc, 'htmlB64' => ['en' => b64($html), 'ms' => b64('<p>MS</p>')], 'langs' => ['en', 'ms'], 'build' => C('build')]);
    status($r, 200, 'publish');
    $j = $r->json();
    eq($j['langs'], ['en'], 'only English published');
    ok(isset($j['skipped']['ms']), 'Malay skipped with a reason: ' . json_encode($j['skipped']));
    $v1 = (int) file_get_contents(C('data') . '/version.txt');
    eq($v1, $v0 + 1, 'version.txt bumped');
    $site = json_decode((string) file_get_contents(C('data') . '/published/site.json'), true);
    eq($site['v'], $v1, 'site.json version');
    eq($site['pages']['summer-offer']['langs'], ['en'], 'site.json page index');
    $file = json_decode((string) file_get_contents(C('data') . '/published/pages/summer-offer.json'), true);
    lacks($file['html']['en'], '<script', 'published HTML sanitised (script)');
    lacks($file['html']['en'], 'onerror', 'published HTML sanitised (onerror)');
    ok(!isset($file['html']['ms']), 'no Malay HTML stored for an unpublished language');
    ok(!is_dir(rpath('_r')) || !is_file(rpath('_r/en/index.html')), '/_r wiped on publish');
    ok(count(glob(C('data') . '/backups/cms-*.sqlite') ?: []) >= 1, 'backup written');
    // a doc where neither language is complete is refused
    $none = doc_with([section([])], L('', 'x'), L('', ''));
    status($admin->post("/api/pages/$id/publish", ['doc' => $none, 'htmlB64' => ['en' => b64('<p>x</p>')], 'langs' => ['en'], 'build' => C('build')]), 400, 'nothing publishable');
});

test('serve CMS page: title, canonical, hreflang, root HTML, boot, JSON-LD; other language 404', function () use ($anon) {
    $r = $anon->get('/en/summer-offer');
    status($r, 200, 'CMS page');
    $d = $r->doc();
    eq($d->querySelector('title')->textContent, 'Summer offer | Arabian Village', 'title from metaTitle');
    eq($d->querySelector('link[rel="canonical"]')->getAttribute('href'), 'https://avoliveoil.com/en/summer-offer', 'canonical');
    $alts = [];
    foreach ($d->querySelectorAll('link[rel="alternate"][hreflang]') as $l) $alts[$l->getAttribute('hreflang')] = $l->getAttribute('href');
    eq($alts, ['en' => 'https://avoliveoil.com/en/summer-offer', 'x-default' => 'https://avoliveoil.com/en/summer-offer'], 'hreflang only for published languages');
    eq($d->querySelector('meta[name="robots"]')->getAttribute('content'), 'index, follow', 'robots');
    eq($d->querySelector('meta[name="description"]')->getAttribute('content'), 'Our summer olive oil offer.', 'description');
    eq($d->querySelector('meta[property="og:url"]')->getAttribute('content'), 'https://avoliveoil.com/en/summer-offer', 'og:url');
    eq($d->querySelector('meta[property="og:image"]')->getAttribute('content'), 'https://avoliveoil.com/og-card-2026-09.jpg', 'default og image');
    eq($d->querySelector('meta[property="og:image:type"]')?->getAttribute('content'), 'image/jpeg', 'og:image:type from the extension (as SEO.tsx)');
    eq($d->querySelector('meta[property="og:image:alt"]')->getAttribute('content'), 'Summer offer | Arabian Village', 'og:image:alt = title');
    eq($d->querySelector('meta[name="twitter:image:alt"]')->getAttribute('content'), 'Summer offer | Arabian Village', 'twitter:image:alt = title');
    eq($d->querySelectorAll('meta[property="og:locale:alternate"]')->length, 0, 'no og:locale:alternate for a missing language');
    lacks($r->body, '__cms-template', 'template placeholders rewritten');
    contains($d->querySelector('[data-cms-page-root]')->innerHTML, '<h1>Summer offer</h1><p>Buy now</p>', 'page root filled');
    $types = [];
    foreach ($d->querySelectorAll('script[type="application/ld+json"]') as $s) $types[] = json_decode($s->textContent, true)['@type'] ?? null;
    ok(in_array('WebPage', $types, true) && in_array('BreadcrumbList', $types, true) && in_array('FAQPage', $types, true), 'JSON-LD WebPage + BreadcrumbList + FAQPage: ' . json_encode($types));
    eq(count(array_keys($types, 'BreadcrumbList', true)), 1, 'template breadcrumb replaced, not duplicated');
    ok(in_array('Organization', $types, true), 'site-wide JSON-LD kept');
    eq($d->querySelector('a[data-cms-lang-link="ms"]')->getAttribute('href'), '/ms', 'switcher: page has no Malay → /ms');
    eq($d->querySelector('a[data-cms-lang-link="en"]')->getAttribute('href'), '/en/summer-offer', 'switcher: English → this page');
    $boot = $r->boot();
    eq($boot['page']['slug'], 'summer-offer', 'boot.page');
    eq($boot['page']['langs'], ['en'], 'boot.page.langs');
    eq($boot['page']['seo']['canonical'], 'https://avoliveoil.com/en/summer-offer', 'boot ResolvedSeo');
    eq($boot['page']['doc']['title']['en'], 'Summer offer', 'boot doc');
    ok(is_file(rpath('_r/en/summer-offer/index.html')), 'CMS page cached in /_r');
    status($anon->get('/ms/summer-offer'), 404, 'unpublished language → 404');
    $p = $anon->get('/api/public/page?slug=summer-offer&lang=en');
    status($p, 200, 'public page API');
    eq($p->json()['seo']['title'], 'Summer offer | Arabian Village', 'public API payload');
    status($anon->get('/api/public/page?slug=summer-offer&lang=ms'), 404, 'public API, missing language');
    status($anon->get('/api/public/page?slug=../etc&lang=en'), 404, 'public API, bad slug');
});

test('sitemap includes the published page (lastmod, alternates); static entries kept', function () use ($anon) {
    $r = $anon->get('/sitemap.xml');
    status($r, 200, 'sitemap');
    contains((string) $r->header('content-type'), 'application/xml', 'xml type');
    contains($r->body, '<loc>https://avoliveoil.com/en</loc>', 'static entry kept');
    contains($r->body, '<loc>https://avoliveoil.com/en/summer-offer</loc>', 'CMS page listed');
    lacks($r->body, '<loc>https://avoliveoil.com/ms/summer-offer</loc>', 'unpublished language not listed');
    contains($r->body, '<lastmod>' . gmdate('Y-m-d') . '</lastmod>', 'lastmod = publish date');
    contains($r->body, 'hreflang="x-default" href="https://avoliveoil.com/en/summer-offer"', 'x-default alternate');
    ok(simplexml_load_string($r->body) !== false, 'sitemap is well-formed XML');
});

test('menu: page in header/footer is injected into snapshots and the boot', function () use ($admin, $anon) {
    $id = $GLOBALS['S']['pageId'];
    $r = $admin->patch("/api/pages/$id", ['inHeader' => true, 'inFooter' => true, 'menuOrder' => 2]);
    status($r, 200, 'patch menu');
    eq($r->json()['inHeader'], true, 'inHeader');
    $r = $anon->get('/en/why-us');
    $d = $r->doc();
    $item = $d->querySelector('nav[data-cms-menu="header"]')->lastElementChild;
    eq($item?->getAttribute('href'), '/en/summer-offer', 'header item href');
    eq($item?->textContent, 'Summer offer', 'header item label');
    eq($item->getAttribute('class'), 'rounded-full px-4 py-1.5 text-sm font-medium tracking-wide text-white', 'header clone keeps the link classes');
    ok($item->hasAttribute('data-cms-menu-item'), 'clone marked');
    foreach (['data-cms', 'data-discover', 'aria-current'] as $a) ok(!$item->hasAttribute($a), "header clone has no $a");
    $mob = $d->querySelector('nav[data-cms-menu="header-mobile"]')->lastElementChild;
    eq([$mob->getAttribute('href'), $mob->textContent, $mob->hasAttribute('data-cms')], ['/en/summer-offer', 'Summer offer', false], 'mobile item');
    $li = $d->querySelector('ul[data-cms-menu="footer"]')->lastElementChild;
    eq($li->localName, 'li', 'footer clone is the <li>');
    $fa = $li->querySelector('a');
    eq([$fa->getAttribute('href'), $fa->textContent, $fa->hasAttribute('data-cms'), $fa->hasAttribute('data-cms-menu-item')], ['/en/summer-offer', 'Summer offer', false, true], 'footer item');
    eq($d->querySelectorAll('[data-cms-menu-item]')->length, 3, 'one item per menu container');
    $boot = $r->boot();
    eq($boot['menu']['en']['header'][0]['slug'] ?? null, 'summer-offer', 'boot.menu.en.header');
    eq($boot['menu']['ms']['header'], [], 'no Malay menu item (page not published in Malay)');
    $ms = $anon->get('/ms/why-us')->doc();
    eq($ms->querySelectorAll('[data-cms-menu-item]')->length, 0, 'no item on Malay pages');
});

test('menu label: ≤ 20 chars, title too long for a menu needs one; menus use label || title', function () use ($admin, $anon) {
    $id = $GLOBALS['S']['pageId'];
    $draft = function () use ($admin, $id) { return $admin->get("/api/pages/$id")->json(); };
    $save = function (array $doc) use ($admin, $id, $draft) { return $admin->put("/api/pages/$id/draft", ['doc' => $doc, 'baseVersion' => $draft()['page']['version']]); };
    $publish = fn (array $doc) => $admin->post("/api/pages/$id/publish", ['doc' => $doc, 'htmlB64' => ['en' => b64('<p>Offer</p>')], 'langs' => ['en', 'ms'], 'build' => C('build')]);
    $orig = $draft()['draft'];
    $long = $orig;
    $long['title']['en'] = 'Our big summer olive oil offer';
    status($save($long), 200, 'a long title is fine in a draft');
    $r = $publish($long);
    status($r, 400, 'publish refused while in a menu with a too-long title and no label');
    eq($r->json()['error']['code'] ?? null, 'menu_label', 'menu_label code');
    status($admin->patch("/api/pages/$id", ['inHeader' => false, 'inFooter' => false]), 200, 'out of the menus');
    status($publish($long), 200, 'not in a menu: a long title publishes');
    $r = $admin->patch("/api/pages/$id", ['inHeader' => true]);
    status($r, 400, 'cannot put a long-titled page in the menu');
    contains($r->json()['error']['message'] ?? '', 'menu label', 'message asks for a menu label');
    $bad = $long;
    $bad['menuLabel'] = L('Twenty-one characters', '');
    status($save($bad), 400, 'menu label over 20 characters refused');
    $ok = $long;
    $ok['menuLabel'] = L('Summer deal', '');
    status($save($ok), 200, 'short menu label saved');
    status($admin->patch("/api/pages/$id", ['inHeader' => true, 'inFooter' => true]), 200, 'now it may join the menus');
    status($publish($ok), 200, 'publish with the label');
    $d = $anon->get('/en/why-us')->doc();
    eq($d->querySelector('nav[data-cms-menu="header"]')->lastElementChild?->textContent, 'Summer deal', 'header uses the menu label');
    eq($anon->get('/en/why-us')->boot()['menu']['en']['footer'][0]['label'] ?? null, 'Summer deal', 'boot menu uses the menu label');
    status($save($orig), 200, 'back to the original doc');
    status($publish($orig), 200, 'republish original');
    eq($anon->get('/en/why-us')->doc()->querySelector('nav[data-cms-menu="header"]')->lastElementChild?->textContent, 'Summer offer', 'no label → the title');
});

test('unpublish → 404; republish; slug change → 301; trash → 410; restore', function () use ($admin, $anon) {
    $id = $GLOBALS['S']['pageId'];
    status($admin->post("/api/pages/$id/unpublish"), 200, 'unpublish');
    status($anon->get('/en/summer-offer'), 404, 'unpublished → 404');
    $payload = $admin->get("/api/pages/$id")->json();
    $doc = $payload['draft'];
    status($admin->post("/api/pages/$id/publish", ['doc' => $doc, 'htmlB64' => ['en' => b64('<p>Back</p>')], 'langs' => ['en', 'ms'], 'build' => C('build')]), 200, 'republish');
    status($anon->get('/en/summer-offer'), 200, 'live again');
    $r = $admin->patch("/api/pages/$id", ['slug' => 'summer-deal']);
    status($r, 200, 'slug change');
    $r = $anon->get('/en/summer-offer?utm_source=x');
    status($r, 301, 'old slug redirects');
    eq($r->header('location'), '/en/summer-deal?utm_source=x', 'redirect target keeps the query');
    status($anon->get('/en/summer-deal'), 200, 'new slug live');
    status($admin->patch("/api/pages/$id", ['slug' => 'why-us']), 400, 'reserved slug on rename');
    status($admin->delete("/api/pages/$id"), 200, 'trash');
    $r = $anon->get('/en/summer-deal');
    status($r, 410, 'trashed → 410');
    eq($r->doc()->querySelector('meta[name="robots"]')?->getAttribute('content'), 'noindex', '410 is noindex');
    status($admin->post('/api/pages', ['slug' => 'summer-deal', 'title' => L('Clash')]), 409, 'trashed slug stays reserved');
    eq(count($admin->get('/api/pages?trash=1')->json()), 1, 'trash list');
    status($admin->post("/api/pages/$id/restore"), 200, 'restore');
    status($anon->get('/en/summer-deal'), 200, 'restored page live');
});

test('duplicate, revisions, restore revision → draft', function () use ($admin) {
    $id = $GLOBALS['S']['pageId'];
    $r = $admin->post("/api/pages/$id/duplicate");
    status($r, 200, 'duplicate');
    eq($r->json()['slug'], 'summer-deal-copy', 'copy slug');
    eq($r->json()['status'], 'draft', 'copy is a draft');
    $GLOBALS['S']['copyId'] = $r->json()['id'];
    $revs = $admin->get("/api/pages/$id/revisions")->json();
    ok(count($revs) >= 2, 'publish revisions listed');
    $r = $admin->post("/api/pages/$id/revisions/{$revs[count($revs) - 1]['id']}/restore");
    status($r, 200, 'restore revision');
    ok(is_int($r->json()['version']), 'new draft version');
    eq($r->json()['doc']['schema'], 1, 'restored doc returned');
});

test('preview of a draft page needs a session', function () use ($admin, $anon) {
    $r = $admin->get('/en/summer-deal-copy?cms-preview=1');
    status($r, 200, 'preview with session');
    $boot = $r->boot();
    eq($boot['preview'] ?? null, true, 'boot.preview');
    eq($boot['page']['slug'], 'summer-deal-copy', 'preview page');
    eq($r->doc()->querySelector('[data-cms-page-root]')->innerHTML, '', 'preview root is empty (React renders the doc)');
    contains((string) $r->header('cache-control'), 'no-store', 'preview not cached');
    status($anon->get('/en/summer-deal-copy?cms-preview=1'), 404, 'preview without session');
    ok(!is_file(rpath('_r/en/summer-deal-copy/index.html')), 'preview never written to /_r');
});

// ---------------------------------------------------------------- media

test('media: jpeg + transparent png → webp variants, alpha kept; non-image refused; uploads/.htaccess', function () use ($admin) {
    $tmp = C('data') . '/upload-src';
    @mkdir($tmp);
    $jpg = imagecreatetruecolor(1200, 800);
    imagefill($jpg, 0, 0, imagecolorallocate($jpg, 120, 140, 60));
    imagejpeg($jpg, "$tmp/photo.jpg", 85);
    $png = imagecreatetruecolor(600, 400);
    imagealphablending($png, false);
    imagesavealpha($png, true);
    imagefill($png, 0, 0, imagecolorallocatealpha($png, 0, 0, 0, 127));
    imagefilledrectangle($png, 200, 100, 400, 300, imagecolorallocatealpha($png, 200, 160, 40, 0));
    imagepng($png, "$tmp/cutout.png");
    file_put_contents("$tmp/evil.png", "<?php echo 'pwned'; ?>");

    $up = fn (string $f, string $type) => $admin->req('POST', '/api/media', ['form' => ['file' => new CURLFile($f, $type, basename($f)), 'altEn' => 'A photo', 'altMs' => 'Gambar'], 'multipart' => true]);
    $r = $up("$tmp/photo.jpg", 'image/jpeg');
    status($r, 200, 'upload jpeg');
    $m = $r->json();
    eq(array_column($m['variants'], 'w'), [480, 960, 1200], 'variants ≤ original width, plus the original');
    eq($m['hasAlpha'], false, 'jpeg has no alpha');
    foreach ($m['variants'] as $v) {
        ok(preg_match('~^/uploads/cms/\d{4}/\d{2}/[0-9a-f]{20}-\d+\.webp$~', $v['url']), 'random webp name ' . $v['url']);
        ok(is_file(rpath($v['url'])), 'variant on disk ' . $v['url']);
        eq(getimagesize(rpath($v['url']))[2], IMAGETYPE_WEBP, 'variant is webp');
    }
    eq($m['alt'], ['en' => 'A photo', 'ms' => 'Gambar'], 'alt stored');
    $GLOBALS['S']['mediaJpg'] = $m['id'];

    $r = $up("$tmp/cutout.png", 'image/png');
    status($r, 200, 'upload png');
    $p = $r->json();
    eq($p['hasAlpha'], true, 'png alpha detected');
    eq(array_column($p['variants'], 'w'), [480, 600], 'step + original');
    $im = imagecreatefromwebp(rpath($p['variants'][0]['url']));
    $corner = (imagecolorat($im, 2, 2) >> 24) & 0x7F;
    $centre = (imagecolorat($im, 240, 160) >> 24) & 0x7F;
    ok($corner > 100, "transparent corner stays transparent (alpha $corner)");
    ok($centre < 20, "opaque centre stays opaque (alpha $centre)");
    $GLOBALS['S']['mediaPng'] = $p['id'];

    $r = $up("$tmp/evil.png", 'image/png');
    status($r, 415, 'non-image refused');
    ok(is_file(rpath('uploads/.htaccess')), 'uploads/.htaccess written');
    contains((string) file_get_contents(rpath('uploads/.htaccess')), 'Require all denied', 'script execution disabled');
    status($admin->patch("/api/media/{$p['id']}", ['altEn' => 'Bottle', 'altMs' => 'Botol']), 200, 'alt edit');
    eq(count($admin->get('/api/media')->json()), 2, 'media list');

    // Share-image copies: JPEG, at most 1200 px wide, transparency flattened onto white.
    eq([$m['og']['width'] ?? null, $m['og']['height'] ?? null], [1200, 800], 'jpeg og copy of the 1200 px photo');
    ok(preg_match('~^/uploads/cms/\d{4}/\d{2}/[0-9a-f]{20}-og\.jpg$~', $m['og']['url'] ?? ''), 'og url');
    eq(getimagesize(rpath($m['og']['url']))[2], IMAGETYPE_JPEG, 'og copy is a JPEG');
    eq([$p['og']['width'] ?? null, $p['og']['height'] ?? null], [600, 400], 'og copy never wider than the original');
    $og = imagecreatefromjpeg(rpath($p['og']['url']));
    $c = imagecolorsforindex($og, imagecolorat($og, 2, 2));
    ok($c['red'] > 245 && $c['green'] > 245 && $c['blue'] > 245, 'transparent corner flattened onto white');
});

test('ids are never reused after a delete (old versions must not point at a new photo)', function () use ($admin) {
    $f = C('data') . '/upload-src/photo.jpg';
    $up = fn () => $admin->req('POST', '/api/media', ['form' => ['file' => new CURLFile($f, 'image/jpeg', 'photo.jpg')], 'multipart' => true])->json();
    $a = $up();
    status($admin->delete("/api/media/{$a['id']}"), 200, 'delete the newest photo');
    $b = $up();
    ok($b['id'] > $a['id'], "next upload gets a fresh id ({$a['id']} → {$b['id']})");
    status($admin->delete("/api/media/{$b['id']}"), 200, 'clean up');
});

test('share image: a page share image is served as the JPEG copy (og:image, twitter:image, type, size)', function () use ($admin, $anon) {
    $id = $GLOBALS['S']['pageId'];
    $payload = $admin->get("/api/pages/$id")->json();
    $orig = $payload['draft'];
    $doc = $orig;
    $doc['seo']['ogImage'] = $GLOBALS['S']['mediaJpg'];
    status($admin->put("/api/pages/$id/draft", ['doc' => $doc, 'baseVersion' => $payload['page']['version']]), 200, 'save share image');
    status($admin->post("/api/pages/$id/publish", ['doc' => $doc, 'htmlB64' => ['en' => b64('<p>Offer</p>')], 'langs' => ['en', 'ms'], 'build' => C('build')]), 200, 'publish');
    $slug = $admin->get("/api/pages/$id")->json()['page']['slug'];
    $r = $anon->get("/en/$slug");
    $d = $r->doc();
    $og = (string) $d->querySelector('meta[property="og:image"]')?->getAttribute('content');
    ok(str_starts_with($og, 'https://avoliveoil.com/uploads/cms/') && str_ends_with($og, '-og.jpg'), "og:image is the JPEG copy ($og)");
    eq($d->querySelector('meta[name="twitter:image"]')?->getAttribute('content'), $og, 'twitter:image too');
    eq($d->querySelector('meta[property="og:image:type"]')?->getAttribute('content'), 'image/jpeg', 'og:image:type');
    eq([$d->querySelector('meta[property="og:image:width"]')?->getAttribute('content'), $d->querySelector('meta[property="og:image:height"]')?->getAttribute('content')], ['1200', '800'], 'og size');
    eq($r->boot()['page']['seo']['ogImage']['url'] ?? null, $og, 'React gets the same ResolvedSeo');
    $p2 = $admin->get("/api/pages/$id")->json();
    status($admin->put("/api/pages/$id/draft", ['doc' => $orig, 'baseVersion' => $p2['page']['version']]), 200, 'restore doc');
    status($admin->post("/api/pages/$id/publish", ['doc' => $orig, 'htmlB64' => ['en' => b64('<p>Offer</p>')], 'langs' => ['en', 'ms'], 'build' => C('build')]), 200, 'republish');
});

// ---------------------------------------------------------------- site text overrides

test('overrides: refuse unknown / non-editable / {{ }}; tokens rule; number + words accepted', function () use ($admin) {
    $put = fn (string $lang, array $items) => $admin->put('/api/site/overrides', ['lang' => $lang, 'items' => $items]);
    $r = $put('en', [['key' => 'no.such.key', 'kind' => 'text', 'value' => 'x']]);
    status($r, 400, 'unknown key');
    eq($r->json()['error']['code'], 'unknown_key', 'unknown_key code');
    $r = $put('en', [['key' => 'hero.icon', 'kind' => 'text', 'value' => 'star']]);
    status($r, 400, 'non-editable');
    eq($r->json()['error']['code'], 'not_editable', 'not_editable code');
    status($put('en', [['key' => 'hero.sub', 'kind' => 'text', 'value' => 'Hi {{name}}']]), 400, '{{ in a plain key');
    status($put('en', [['key' => 'hero.sub', 'kind' => 'text', 'value' => 'Hi }} there']]), 400, '}} in a plain key');
    status($put('en', [['key' => 'hero.sub', 'kind' => 'text', 'value' => '$t(nav.home)']]), 400, '$t( refused');
    status($put('en', [['key' => 'about.seller', 'kind' => 'text', 'value' => 'Sold by us']]), 400, 'template token removed');
    status($put('en', [['key' => 'about.seller', 'kind' => 'text', 'value' => 'Sold by {{store}} and {{other}}']]), 400, 'token added');
    status($put('en', [['key' => 'stats.customers.value', 'kind' => 'text', 'value' => 'lots']]), 400, 'number key needs a number');
    status($put('en', [['key' => 'hero.headlineWords', 'kind' => 'text', 'value' => array_fill(0, 9, ['text' => 'w', 'gold' => false])]]), 400, '9 words refused');
    status($put('en', [['key' => 'hero.headlineWords', 'kind' => 'text', 'value' => [['text' => str_repeat('x', 31), 'gold' => false]]]]), 400, 'word > 30 chars refused');
    status($put('en', [['key' => 'home.hero.bg', 'kind' => 'image', 'value' => ['media' => 99999, 'alt' => 'x']]]), 400, 'image with unknown media');
    $r = $put('en', [
        ['key' => 'hero.sub', 'kind' => 'text', 'value' => 'Fresh </script><script>alert(1)</script> & "quoted"'],
        ['key' => 'about.seller', 'kind' => 'text', 'value' => 'Proudly sold by {{store}}'],
        ['key' => 'stats.customers.value', 'kind' => 'text', 'value' => '1,234,567'],
        ['key' => 'hero.headlineWords', 'kind' => 'text', 'value' => [['text' => 'Liquid', 'gold' => true], ['text' => 'Olive', 'gold' => false], ['text' => 'Gold', 'gold' => true], ['text' => 'Today', 'gold' => false]]],
        ['key' => 'home.mixed', 'kind' => 'text', 'value' => 'Should not apply'],
        ['key' => 'contact.namePlaceholder', 'kind' => 'text', 'value' => 'Full name'],
        ['key' => 'nav.home', 'kind' => 'text', 'value' => 'Start'],
        ['key' => 'seo.whyUs.title', 'kind' => 'text', 'value' => 'Why buy from us | Arabian Village'],
        ['key' => 'faq.items.0.q', 'kind' => 'text', 'value' => 'Is it really cold pressed?'],
        ['key' => 'home.hero.bg', 'kind' => 'image', 'value' => ['media' => $GLOBALS['S']['mediaJpg'], 'alt' => 'New grove', 'focal' => ['x' => 30, 'y' => 70]]],
    ]);
    status($r, 200, 'valid overrides saved');
    status($put('ms', [['key' => 'hero.sub', 'kind' => 'text', 'value' => 'Draf Melayu']]), 200, 'Malay draft');
    $keys = $admin->get('/api/site/keys?page=home&lang=en')->json();
    $byKey = array_column($keys, null, 'key');
    eq($byKey['stats.customers.value']['draft'], 1234567, 'number normalised');
    eq($byKey['about.seller']['tokens'], ['store'], 'template tokens exposed');
    eq($byKey['about.seller']['default'], 'Sold by Berkat Madinah Store', 'default is the interpolated value');
    eq($byKey['home.hero.bg']['type'], 'image', 'image spot listed');
    eq($byKey['home.hero.bg']['draft']['media']['id'], $GLOBALS['S']['mediaJpg'], 'image draft expanded to MediaRef');
    eq($byKey['hero.sub']['usage'], ['Home › Hero'], 'usage list');
});

test('overrides: publish only the listed keys; pending list keeps the rest', function () use ($admin) {
    $keys = [];
    foreach (['hero.sub', 'about.seller', 'stats.customers.value', 'hero.headlineWords', 'home.mixed', 'contact.namePlaceholder', 'nav.home', 'seo.whyUs.title', 'faq.items.0.q', 'home.hero.bg'] as $k) {
        $keys[] = ['lang' => 'en', 'key' => $k];
    }
    $r = $admin->post('/api/site/publish', ['keys' => $keys]);
    status($r, 200, 'publish keys');
    ok(is_int($r->json()['publishId']), 'publishId');
    $GLOBALS['S']['publishId'] = $r->json()['publishId'];
    $pending = $admin->get('/api/site/pending')->json();
    eq(count($pending), 1, 'one draft still pending');
    eq([$pending[0]['lang'], $pending[0]['key'], $pending[0]['userName']], ['ms', 'hero.sub', 'Admin'], 'pending item with author');
    status($admin->post('/api/site/publish', ['keys' => [['lang' => 'en', 'key' => 'hero.sub']]]), 400, 'nothing left to publish for that key');
    $text = $admin->get('/api/site/text')->json();
    eq($text['en']['nav.home'], 'Start', 'published text API');
    ok(!isset($text['ms']['hero.sub']), 'Malay draft not published');
});

test('overrides: an admin can discard another user\'s pending change (audited)', function () use ($admin) {
    tdb()->exec('DELETE FROM login_attempts');
    $ed = new Client();
    status($ed->post('/api/auth/login', ['email' => 'editor@example.com', 'password' => 'emergency pass 1']), 200, 'editor login');
    $ed->build = C('build');
    status($ed->put('/api/site/overrides', ['lang' => 'ms', 'items' => [['key' => 'nav.home', 'kind' => 'text', 'value' => 'Mula']]]), 200, 'editor draft');
    $mine = fn () => array_values(array_filter($admin->get('/api/site/pending')->json(), fn ($p) => $p['userId'] === $GLOBALS['S']['editorId']));
    eq(count($mine()), 1, 'editor draft pending');
    status($admin->post('/api/site/discard-other', ['userId' => $GLOBALS['S']['editorId'], 'lang' => 'ms', 'key' => 'nav.home']), 200, 'admin discards it');
    eq(count($mine()), 0, 'gone from pending');
    $a = tdb()->query("SELECT target, detail FROM audit WHERE action = 'site.draft.discard_other' ORDER BY id DESC LIMIT 1")->fetch();
    eq($a['target'] ?? null, 'user:' . $GLOBALS['S']['editorId'], 'audit target');
    contains((string) ($a['detail'] ?? ''), 'ms:nav.home', 'audit detail');
    status($admin->post('/api/site/discard-other', ['userId' => $GLOBALS['S']['editorId'], 'lang' => 'ms', 'key' => 'nav.home']), 404, 'already gone');
    status($admin->post('/api/site/discard-other', ['userId' => 'x', 'lang' => 'ms', 'key' => 'nav.home']), 400, 'bad input');
    status((new Client())->post('/api/site/discard-other', ['userId' => 1, 'lang' => 'ms', 'key' => 'nav.home']), 401, 'needs a session');
});

test('serve applies text / attr / num / words / img / head / JSON-LD; boot JSON valid and </script>-safe', function () use ($anon) {
    $r = $anon->get('/en');
    status($r, 200, '/en');
    $d = $r->doc();
    eq($d->querySelector('[data-cms="hero.sub"]')->textContent, 'Fresh </script><script>alert(1)</script> & "quoted"', 'text override (as text, not markup)');
    foreach ($d->querySelectorAll('script') as $sc) {
        ok(in_array($sc->getAttribute('type'), ['module', 'application/ld+json', 'application/json'], true), 'no script element came from an override');
    }
    lacks($r->body, '<p data-cms="hero.sub" class="sub">Fresh </script>', 'text content is escaped');
    eq($d->querySelector('[data-cms="about.seller"]')->textContent, 'Proudly sold by Berkat Madinah Store', '{{store}} interpolated');
    eq($d->querySelector('[data-cms-num="stats.customers.value"]')->textContent, '1,234,567', 'number formatted');
    eq($d->querySelector('[data-cms="home.mixed"]')->innerHTML, 'Mixed <b>bold</b>', 'element with children left alone');
    eq($d->querySelector('input[data-cms-attr]')->getAttribute('placeholder'), 'Full name', 'attribute override');
    eq($d->querySelector('[data-cms="nav.home"]')->textContent, 'Start', 'header text override');
    $h1 = $d->querySelector('h1[data-cms-words]');
    eq($h1->childElementCount, 4, 'four word spans');
    $words = [];
    foreach ($h1->querySelectorAll('.word') as $wEl) $words[] = [$wEl->textContent, $wEl->classList->contains('text-gold')];
    eq($words, [['Liquid', true], ['Olive', false], ['Gold', true], ['Today', false]], 'words rebuilt with gold flags');
    ok(str_contains($h1->firstElementChild->getAttribute('class'), 'me-3'), 'outer span cloned');
    $img = $d->querySelector('img[data-cms-img="home.hero.bg"]');
    ok(preg_match('~^/uploads/cms/.+-1200\.webp$~', $img->getAttribute('src')), 'img src = widest variant');
    contains($img->getAttribute('srcset'), '-480.webp 480w', 'srcset');
    eq([$img->getAttribute('width'), $img->getAttribute('height'), $img->getAttribute('alt')], ['1200', '800', 'New grove'], 'img size + alt');
    eq($img->getAttribute('style'), 'opacity:0.9;object-position:30% 70%', 'focal merged into style');
    eq($img->getAttribute('sizes'), '100vw', 'sizes kept');
    ok(!$img->hasAttribute('data-cms-attr'), 'alt key marker dropped for a replaced photo');
    $boot = $r->boot();
    eq($boot['text']['en']['hero.sub'], 'Fresh </script><script>alert(1)</script> & "quoted"', 'boot text round-trips');
    contains($r->body, '</script>', 'boot JSON escapes <');
    eq($boot['text']['en']['about.seller'], 'Proudly sold by {{store}}', 'boot carries the template');
    eq($boot['images']['en']['home.hero.bg']['media']['id'], $GLOBALS['S']['mediaJpg'], 'boot image override');
    eq($boot['images']['en']['home.hero.bg']['focal'], ['x' => 30, 'y' => 70], 'boot focal');
    // head + JSON-LD of a snapshot whose default text is overridden
    $why = $anon->get('/en/why-us');
    $wd = $why->doc();
    eq($wd->querySelector('title')->textContent, 'Why buy from us | Arabian Village', 'title replaced');
    eq($wd->querySelector('meta[property="og:title"]')->getAttribute('content'), 'Why buy from us | Arabian Village', 'og:title replaced');
    eq($wd->querySelector('meta[name="twitter:title"]')->getAttribute('content'), 'Why buy from us | Arabian Village', 'twitter:title replaced');
    eq($wd->querySelector('meta[property="og:image:alt"]')->getAttribute('content'), 'Why buy from us | Arabian Village', 'og:image:alt replaced');
    eq($wd->querySelector('meta[name="description"]')->getAttribute('content'), 'Why Arabian Village olive oil is different.', 'untouched description');
    $ld = json_decode($wd->querySelector('script[type="application/ld+json"]')->textContent, true);
    eq($ld['mainEntity'][0]['name'], 'Is it really cold pressed?', 'JSON-LD follows the visible FAQ text');
    eq($wd->querySelector('[data-cms="faq.items.0.q"]')->textContent, 'Is it really cold pressed?', 'visible FAQ text');
    // Malay is untouched
    $ms = $anon->get('/ms')->doc();
    eq($ms->querySelector('[data-cms="hero.sub"]')->textContent, 'Diperah sejuk di Palestin', 'Malay page keeps its default');
});

test('edit mode: draft overrides only with a session; never cached', function () use ($admin, $anon) {
    status($admin->put('/api/site/overrides', ['lang' => 'en', 'items' => [['key' => 'hero.sub', 'kind' => 'text', 'value' => 'Draft only text']]]), 200, 'draft');
    $r = $anon->get('/en?cms-edit=1');
    status($r, 200, 'edit without session');
    lacks($r->body, 'Draft only text', 'no draft without a session');
    ok(!isset($r->boot()['edit']), 'no edit flag without a session');
    $r = $admin->get('/en?cms-edit=1');
    status($r, 200, 'edit with session');
    eq($r->doc()->querySelector('[data-cms="hero.sub"]')->textContent, 'Draft only text', 'draft applied in edit mode');
    $boot = $r->boot();
    eq($boot['edit'] ?? null, true, 'boot.edit');
    eq($boot['text']['en']['hero.sub'], 'Draft only text', 'boot carries the draft');
    contains((string) $r->header('cache-control'), 'no-store', 'edit response not cached');
    lacks($anon->get('/en')->body, 'Draft only text', 'public page unaffected');
    status($admin->post('/api/site/discard', ['keys' => [['lang' => 'en', 'key' => 'hero.sub']]]), 200, 'discard');
});

test('site text publish marks CMS pages dirty; /api/pages/{id}/html re-renders', function () use ($admin) {
    $id = $GLOBALS['S']['pageId'];
    ok(in_array($id, $admin->get('/api/pages/dirty')->json(), true), 'published page is dirty after a site text publish');
    $r = $admin->post("/api/pages/$id/html", ['htmlB64' => ['en' => b64('<p>Re-rendered</p><script>x</script>')], 'build' => C('build')]);
    status($r, 200, 're-render');
    ok(!in_array($id, $admin->get('/api/pages/dirty')->json(), true), 'no longer dirty');
    $page = (new Client())->get('/en/summer-deal');
    contains($page->body, '<p>Re-rendered</p>', 'new HTML served');
    lacks($page->body, '<script>x</script>', 're-rendered HTML sanitised');
    status($admin->post("/api/pages/$id/html", ['htmlB64' => ['en' => b64('<p>x</p>')], 'build' => 'old-build']), 409, 'stale build in body → 409');
});

test('site revisions + revert; orphaned keys dropped from boot and listed', function () use ($admin, $anon) {
    $revs = $admin->get('/api/site/revisions')->json();
    ok(count($revs) >= 1 && count($revs[0]['items']) >= 10, 'revision with items');
    // orphan: an override row for a key that no longer exists in the defaults
    tdb()->exec("INSERT INTO overrides(lang,key,kind,published_value,updated_at) VALUES('en','old.removed.key','text','\"stale\"'," . time() . ')');
    $orph = $admin->get('/api/site/orphans')->json();
    ok(in_array('old.removed.key', array_column($orph, 'key'), true), 'orphan listed');
    status($admin->post('/api/site/revisions/' . $GLOBALS['S']['publishId'] . '/revert'), 200, 'revert');
    $r = $anon->get('/en');
    $d = $r->doc();
    eq($d->querySelector('[data-cms="hero.sub"]')->textContent, 'Cold-pressed in Palestine', 'reverted to the default');
    eq($d->querySelector('img[data-cms-img]')->getAttribute('src'), '/assets/hero-bg-1600.webp', 'photo reverted');
    $boot = $r->boot();
    ok(!isset($boot['text']['en']['old.removed.key']), 'orphan not in boot');
    ok(!isset($boot['text']['en']['hero.sub']), 'reverted key gone from boot');
});

test('media delete refused while used (page doc or image override), allowed when unused', function () use ($admin) {
    $jpg = $GLOBALS['S']['mediaJpg'];
    $png = $GLOBALS['S']['mediaPng'];
    // re-publish the photo override so the jpeg is in use by a spot
    $admin->put('/api/site/overrides', ['lang' => 'en', 'items' => [['key' => 'home.hero.bg', 'kind' => 'image', 'value' => ['media' => $jpg, 'alt' => 'x']]]]);
    $admin->post('/api/site/publish', ['keys' => [['lang' => 'en', 'key' => 'home.hero.bg']]]);
    $r = $admin->delete("/api/media/$jpg");
    status($r, 409, 'used by a photo spot');
    contains($r->json()['error']['message'], 'Home › Hero background', 'says where it is used');
    // use the png on the copy page's draft
    $copy = $GLOBALS['S']['copyId'];
    $p = $admin->get("/api/pages/$copy")->json();
    $doc = $p['draft'];
    $doc['sections'][] = section([w('image', ['media' => $png, 'alt' => L('x'), 'ratio' => 'auto', 'rounded' => true, 'align' => 'center', 'maxWidth' => 0])]);
    status($admin->put("/api/pages/$copy/draft", ['doc' => $doc, 'baseVersion' => $p['page']['version']]), 200, 'draft uses png');
    status($admin->delete("/api/media/$png"), 409, 'used by a page');
    $doc['sections'] = array_slice($doc['sections'], 0, -1);
    status($admin->put("/api/pages/$copy/draft", ['doc' => $doc, 'baseVersion' => $p['page']['version'] + 1]), 200, 'draft no longer uses png');
    $files = array_map(fn ($v) => rpath($v['url']), array_values(array_filter($admin->get('/api/media')->json(), fn ($m) => $m['id'] === $png))[0]['variants']);
    status($admin->delete("/api/media/$png"), 200, 'unused media deleted');
    foreach ($files as $f) ok(!is_file($f), 'variant file removed');
});

// ---------------------------------------------------------------- forms + submissions

test('forms: recipients 1–5 validated, def validated, redirectPath open-redirect attempts rejected', function () use ($admin) {
    $def = [
        'fields' => [
            ['id' => 'f1', 'name' => 'name', 'type' => 'text', 'label' => L('Name', 'Nama'), 'placeholder' => L(''), 'required' => true, 'width' => 'half'],
            ['id' => 'f2', 'name' => 'email', 'type' => 'email', 'label' => L('Email', 'E-mel'), 'placeholder' => L(''), 'required' => true, 'width' => 'half'],
            ['id' => 'f3', 'name' => 'size', 'type' => 'select', 'label' => L('Size', 'Saiz'), 'placeholder' => L(''), 'required' => false, 'width' => 'full',
                'options' => [['id' => 'o1', 'label' => L('250 ml')], ['id' => 'o2', 'label' => L('500 ml')]]],
            ['id' => 'f4', 'name' => 'message', 'type' => 'textarea', 'label' => L('Message', 'Mesej'), 'placeholder' => L(''), 'required' => false, 'width' => 'full'],
            ['id' => 'f5', 'name' => 'consent', 'type' => 'checkbox', 'label' => L('I agree', 'Saya setuju'), 'placeholder' => L(''), 'required' => true, 'width' => 'full'],
        ],
        'submitLabel' => L('Send', 'Hantar'),
        'successMessage' => L('Thank you!', 'Terima kasih!'),
    ];
    $base = ['name' => 'Bulk order', 'subject' => 'Bulk order', 'recipients' => ['owner@example.com'], 'def' => $def];
    status($admin->post('/api/forms', ['recipients' => []] + $base), 400, 'no recipients');
    status($admin->post('/api/forms', ['recipients' => array_map(fn ($i) => "r$i@example.com", range(1, 6))] + $base), 400, '6 recipients');
    status($admin->post('/api/forms', ['recipients' => ['not-an-email']] + $base), 400, 'invalid recipient');
    status($admin->post('/api/forms', ['recipients' => ["a@example.com\r\nBcc: x@evil.com"]] + $base), 400, 'CRLF recipient');
    foreach (['https://evil.com', '//evil.com', '/\\evil.com', '/en/../admin', '/fr/x', 'javascript:alert(1)', '/en/x?y=1', '/en//x'] as $bad) {
        $d = $def;
        $d['redirectPath'] = $bad;
        status($admin->post('/api/forms', ['def' => $d] + $base), 400, "redirectPath $bad refused");
    }
    $d = $def;
    $d['fields'][] = $d['fields'][0];
    status($admin->post('/api/forms', ['def' => $d] + $base), 400, 'duplicate field name');
    $d = $def;
    $d['fields'][0]['name'] = 'company_website';
    status($admin->post('/api/forms', ['def' => $d] + $base), 400, 'honeypot name reserved');
    $r = $admin->post('/api/forms', $base);
    status($r, 200, 'create form');
    $form = $r->json();
    eq($form['recipients'], ['owner@example.com'], 'recipients stored');
    $GLOBALS['S']['formId'] = $form['id'];
    $GLOBALS['S']['formDef'] = $def;
    $d = $def;
    $d['redirectPath'] = '/en/thank-you';
    $r2 = $admin->post('/api/forms', ['name' => 'With redirect', 'def' => $d] + $base);
    status($r2, 200, 'valid redirectPath accepted');
    $GLOBALS['S']['form2Id'] = $r2->json()['id'];
});

test('forms: embed on a published page → usage, saving the form marks the page dirty', function () use ($admin) {
    $id = $GLOBALS['S']['pageId'];
    $fid = $GLOBALS['S']['formId'];
    $p = $admin->get("/api/pages/$id")->json();
    $doc = $p['draft'];
    $doc['sections'][] = section([w('form', ['formId' => $fid, 'style' => 'card'])]);
    $html = '<form action="/api/forms/' . $fid . '/submit" method="post"><input type="hidden" name="_page" value="' . $id . '"><input name="name"><button type="submit">Send</button></form>';
    status($admin->post("/api/pages/$id/publish", ['doc' => $doc, 'htmlB64' => ['en' => b64($html)], 'langs' => ['en'], 'build' => C('build')]), 200, 'publish with form');
    eq($admin->get("/api/forms/$fid/usage")->json(), [$id], 'usage');
    $boot = (new Client())->get('/en/summer-deal')->boot();
    ok(isset($boot['page']['forms'][(string) $fid]['def']['fields']), 'public form def in the page payload');
    ok(!isset($boot['page']['forms'][(string) $fid]['recipients']), 'recipients never public');
    contains((new Client())->get('/en/summer-deal')->body, 'action="/api/forms/' . $fid . '/submit"', 'form kept by the sanitiser');
    $f = $admin->get("/api/forms/$fid")->json();
    $r = $admin->put("/api/forms/$fid", ['name' => $f['name'], 'subject' => $f['subject'], 'recipients' => $f['recipients'], 'def' => $f['def']]);
    status($r, 200, 'save form');
    eq($r->json()['dirtyPages'], [$id], 'dependent page marked');
    ok(in_array($id, $admin->get('/api/pages/dirty')->json(), true), 'page dirty');
    $r = $admin->delete("/api/forms/$fid");
    status($r, 409, 'form in use cannot be deleted');
    eq(count($admin->get('/api/forms')->json()), 2, 'form list');
});

test('submit: valid → stored + mail with correct headers; CRLF cannot inject headers', function () use ($admin) {
    $fid = $GLOBALS['S']['formId'];
    $pid = $GLOBALS['S']['pageId'];
    $before = count(mails());
    $c = new Client();
    $r = $c->post("/api/forms/$fid/submit", ['fields' => [
        'name' => "Aisha\r\nBcc: victim@evil.com", 'email' => 'aisha@example.com', 'size' => 'o2',
        'message' => "Hello <b>there</b>\nSecond line", 'consent' => 'yes',
    ], 'page' => $pid, 'lang' => 'en', 'company_website' => '', 'elapsedMs' => 5000]);
    status($r, 200, 'submit');
    eq($r->json(), ['ok' => true, 'message' => 'Thank you!'], 'success message');
    $all = mails();
    eq(count($all), $before + 1, 'one mail');
    $m = parse_eml(end($all));
    eq($m['headers']['to'][0], 'owner@example.com', 'To = recipients');
    eq($m['headers']['from'][0], '"Arabian Village Website" <noreply@avoliveoil.com>', 'From');
    eq($m['headers']['reply-to'][0], 'aisha@example.com', 'Reply-To = first valid email field');
    eq($m['headers']['x-envelope-from'][0], 'admin@avoliveoil.com', 'envelope sender = system email (default first admin, on our domain)');
    ok(!isset($m['headers']['bcc']), 'no injected Bcc header');
    lacks($m['head'], 'victim@evil.com', 'nothing from the visitor in the header block');
    $subject = iconv_mime_decode($m['headers']['subject'][0], 0, 'UTF-8');
    eq($subject, '[Website] Bulk order — Summer offer', 'subject');
    contains($m['text'], 'aisha@example.com', 'text body has the values');
    contains($m['text'], '500 ml', 'select stored as its label');
    contains($m['html'], 'Hello &lt;b&gt;there&lt;/b&gt;<br', 'HTML body escaped, newlines kept');
    $list = $admin->get("/api/submissions?form=$fid")->json();
    eq($list['total'], 1, 'stored');
    eq($list['items'][0]['mailStatus'], 'sent', 'mail status sent');
    eq($list['items'][0]['pageSlug'], 'summer-deal', 'page recorded');
    eq($list['items'][0]['data']['size'], '500 ml', 'data');
    $GLOBALS['S']['subId'] = $list['items'][0]['id'];
    $r = $c->post("/api/forms/$fid/submit", ['fields' => ['name' => 'X', 'email' => "x@example.com\r\nBcc: y@evil.com", 'consent' => 'yes'], 'lang' => 'en']);
    status($r, 422, 'CRLF in an email field is invalid');
    ok(isset($r->json()['error']['fields']['email']), 'field error for email');
    $r = $c->post("/api/forms/$fid/submit", ['fields' => ['name' => '', 'email' => 'a@b.co', 'size' => 'o9'], 'lang' => 'ms']);
    status($r, 422, 'missing required + bad option');
    $fe = $r->json()['error']['fields'];
    ok(isset($fe['name'], $fe['consent'], $fe['size']), 'all field errors: ' . json_encode($fe));
    eq($fe['name'], 'Ruangan ini wajib diisi.', 'errors in the visitor language');
    status($c->post('/api/forms/99999/submit', ['fields' => []]), 404, 'unknown form');
    status($c->post("/api/forms/$fid/submit", ['fields' => ['name' => 'x']], ['headers' => ['Origin' => 'https://evil.example']]), 403, 'cross-site submit');
    status($c->req('POST', "/api/forms/$fid/submit", ['body' => str_repeat('x', 70000), 'headers' => ['Content-Type' => 'application/json']]), 413, 'body > 64 KB');
});

test('submit: honeypot → stored as spam, no mail; >3 URLs → spam', function () use ($admin) {
    $fid = $GLOBALS['S']['formId'];
    $before = count(mails());
    $c = new Client();
    $r = $c->post("/api/forms/$fid/submit", ['fields' => ['name' => 'Bot', 'email' => 'bot@example.com', 'consent' => 'yes'], 'lang' => 'en', 'company_website' => 'http://spam.example']);
    status($r, 200, 'honeypot pretends success');
    eq($r->json()['ok'], true, 'ok');
    $msg = 'see http://a.example http://b.example www.c.example https://d.example';
    $r = $c->post("/api/forms/$fid/submit", ['fields' => ['name' => 'Linker', 'email' => 'l@example.com', 'message' => $msg, 'consent' => 'yes'], 'lang' => 'en']);
    status($r, 200, 'url spam pretends success');
    eq(count(mails()), $before, 'no mail for spam');
    $spam = $admin->get("/api/submissions?form=$fid&status=spam")->json();
    eq($spam['total'], 2, 'both stored as spam');
    eq($admin->get("/api/submissions?form=$fid")->json()['total'], 1, 'spam hidden from the normal inbox');
});

test('submit: urlencoded no-JS fallback → 303 to the embedding page; bogus page → language root', function () {
    age_submissions();
    $fid = $GLOBALS['S']['formId'];
    $pid = $GLOBALS['S']['pageId'];
    $c = new Client();
    $r = $c->req('POST', "/api/forms/$fid/submit", ['form' => ['name' => 'No JS', 'email' => 'nojs@example.com', 'consent' => 'on', '_page' => (string) $pid, '_lang' => 'en', 'company_website' => '']]);
    status($r, 303, 'urlencoded → 303');
    eq($r->header('location'), "/en/summer-deal#form-sent-$fid", 'back to the embedding page');
    $r = $c->req('POST', "/api/forms/$fid/submit", ['form' => ['name' => 'No JS', 'email' => 'nojs@example.com', 'consent' => 'on', '_page' => '99999', '_lang' => 'en'], 'headers' => ['Referer' => 'https://evil.example/']]);
    status($r, 303, 'bogus page');
    eq($r->header('location'), "/en#form-sent-$fid", 'never to Referer');
    $r = $c->req('POST', "/api/forms/$fid/submit", ['form' => ['name' => '', '_page' => (string) $pid, '_lang' => 'en']]);
    eq($r->header('location'), "/en/summer-deal#form-error-$fid", 'invalid no-JS submit → #form-error');
    $f2 = $GLOBALS['S']['form2Id'];
    $r = $c->req('POST', "/api/forms/$f2/submit", ['form' => ['name' => 'R', 'email' => 'r@example.com', 'consent' => 'on', '_lang' => 'en']]);
    eq($r->header('location'), '/en/thank-you', 'redirectPath used after success');
});

test('submit: rate limit per IP — 6th within 10 minutes → 429', function () {
    age_submissions();
    $fid = $GLOBALS['S']['formId'];
    $c = new Client();
    for ($i = 1; $i <= 5; $i++) {
        status($c->post("/api/forms/$fid/submit", ['fields' => ['name' => "N$i", 'email' => "n$i@example.com", 'consent' => 'yes'], 'lang' => 'en']), 200, "submission $i");
    }
    $r = $c->post("/api/forms/$fid/submit", ['fields' => ['name' => 'N6', 'email' => 'n6@example.com', 'consent' => 'yes'], 'lang' => 'en']);
    status($r, 429, '6th → 429');
    eq($r->json()['error']['code'], 'rate_limited', 'rate_limited code');
    ok($r->header('retry-after') !== null, 'Retry-After');
    age_submissions();
});

test('mail cap → held; resend after raising the cap → sent', function () use ($admin) {
    $fid = $GLOBALS['S']['formId'];
    status($admin->post('/api/settings', ['mailCapPerHour' => 1]), 200, 'cap 1/hour');
    $r = (new Client())->post("/api/forms/$fid/submit", ['fields' => ['name' => 'Held', 'email' => 'held@example.com', 'consent' => 'yes'], 'lang' => 'en']);
    status($r, 200, 'submission accepted while capped');
    $held = $admin->get("/api/submissions?form=$fid&status=held")->json();
    eq($held['total'], 1, 'stored as held');
    $hid = $held['items'][0]['id'];
    eq($admin->post("/api/submissions/$hid/resend")->json()['mailStatus'], 'held', 'resend still held under the cap');
    status($admin->post("/api/forms/$fid/test-email"), 429, 'test email refused while capped');
    status($admin->post('/api/settings', ['mailCapPerHour' => 40]), 200, 'cap 40/hour');
    eq($admin->post("/api/submissions/$hid/resend")->json()['mailStatus'], 'sent', 'resend sent');
    $r = $admin->post("/api/forms/$fid/test-email");
    status($r, 200, 'test email');
    eq($r->json()['sentTo'], ['owner@example.com'], 'test email recipients');
    $m = parse_eml(mails()[count(mails()) - 1]);
    contains(iconv_mime_decode($m['headers']['subject'][0], 0, 'UTF-8'), '[TEST]', 'test email subject');
    status($admin->post('/api/settings', ['systemEmail' => 'not an email']), 400, 'invalid system email');
    eq($admin->get('/api/settings')->json(), ['systemEmail' => 'admin@avoliveoil.com', 'mailCapPerHour' => 40], 'settings');
});

test('inbox: read/unread, delete; CSV export with formula-injection guard', function () use ($admin) {
    $fid = $GLOBALS['S']['formId'];
    $c = new Client();
    status($c->post("/api/forms/$fid/submit", ['fields' => ['name' => '=HYPERLINK("http://evil","x")', 'email' => 'csv@example.com', 'message' => '@SUM(1+1)', 'consent' => 'yes'], 'lang' => 'en']), 200, 'formula-looking values');
    $sid = $GLOBALS['S']['subId'];
    status($admin->patch("/api/submissions/$sid", ['read' => true]), 200, 'mark read');
    $unread = $admin->get("/api/submissions?form=$fid&unread=1")->json();
    ok(!in_array($sid, array_column($unread['items'], 'id'), true), 'read entry not in unread list');
    $r = $admin->get("/api/submissions/export.csv?form=$fid");
    status($r, 200, 'export');
    contains((string) $r->header('content-type'), 'text/csv', 'csv type');
    contains((string) $r->header('content-disposition'), 'attachment', 'download');
    contains($r->body, "\"'=HYPERLINK(\"\"http://evil\"\",\"\"x\"\")\"", 'formula cell prefixed with an apostrophe');
    contains($r->body, "'@SUM(1+1)", '@ cell prefixed');
    lacks($r->body, ',=HYPERLINK', 'no raw formula cell');
    status((new Client())->get("/api/submissions/export.csv?form=$fid"), 401, 'export needs a session');
    status($admin->delete("/api/submissions/$sid"), 200, 'delete');
    status($admin->delete("/api/submissions/$sid"), 404, 'deleted');
});

// ---------------------------------------------------------------- fail-safe + system

test('fatal error / exception in serve.php → raw snapshot; CMS slug → 503; unknown → 404', function () use ($anon) {
    $raw = (string) file_get_contents(rpath('en/why-us/index.html'));
    $r = $anon->get('/en/why-us?cms-nocache=1', ['headers' => ['X-Test-Fatal' => 'fatal']]);
    status($r, 200, 'fatal → snapshot');
    eq($r->body, $raw, 'raw snapshot streamed byte for byte');
    $r = $anon->get('/en/why-us?cms-nocache=1', ['headers' => ['X-Test-Fatal' => 'throw']]);
    status($r, 200, 'exception → snapshot');
    eq($r->body, $raw, 'raw snapshot on exception');
    $r = $anon->get('/en/summer-deal?cms-nocache=1', ['headers' => ['X-Test-Fatal' => 'fatal']]);
    status($r, 503, 'CMS address while the CMS is down → 503, never 404');
    eq($r->header('retry-after'), '120', 'Retry-After');
    status($anon->get('/en/x/y?cms-nocache=1', ['headers' => ['X-Test-Fatal' => 'fatal']]), 404, 'unknown → 404');
    ok(!is_file(rpath('_r/en/summer-deal/index.html')) || !str_contains((string) file_get_contents(rpath('_r/en/summer-deal/index.html')), '<div id="root"></div>'), 'fallback never cached');
    status($anon->get('/en/why-us'), 200, 'normal again');
});

test('system: health, backup download, dashboard, catalogue, build', function () use ($admin) {
    $h = $admin->get('/api/system/health')->json();
    eq($h['integrity'], 'ok', 'integrity_check');
    eq($h['dataWritable'], true, 'data writable');
    eq($h['build'], C('build'), 'build');
    ok($h['contentVersion'] > 0, 'content version');
    ok(is_array($h['logTail']), 'log tail');
    $b = $admin->get('/api/system/backup');
    status($b, 200, 'backup');
    ok(str_starts_with($b->body, 'SQLite format 3'), 'backup is a SQLite file');
    ok(count(glob(C('data') . '/backups/cms-*.sqlite') ?: []) <= 15, 'at most 15 backups kept');
    $d = $admin->get('/api/dashboard')->json();
    eq($d['pages']['published'], 1, 'dashboard published pages');
    ok($d['entries']['total'] >= 1, 'dashboard entries');
    eq($admin->get('/api/catalogue')->json()[0]['id'], 'classic-500', 'catalogue passthrough');
    eq((new Client())->get('/api/build')->json(), ['build' => C('build')], '/api/build');
    status((new Client())->get('/api/system/health'), 401, 'health needs a session');
    status($admin->req('GET', '/api/pages/1/draft'), 405, 'wrong method → 405');
});

test('purge a trashed page keeps 410; every PHP file lints', function () use ($admin, $anon) {
    $copy = $GLOBALS['S']['copyId'];
    status($admin->post("/api/pages/$copy/purge"), 409, 'purge needs trash first');
    status($admin->delete("/api/pages/$copy"), 200, 'trash copy');
    status($admin->post("/api/pages/$copy/purge"), 200, 'purge');
    status($anon->get('/en/summer-deal-copy'), 404, 'never-published purged page → 404');
    status($admin->post('/api/pages', ['slug' => 'summer-deal-copy', 'title' => L('Reuse')]), 200, 'slug free after purge');
    $files = array_merge(glob(dirname(__DIR__) . '/*.php') ?: [], glob(dirname(__DIR__) . '/_lib/*.php') ?: [], glob(__DIR__ . '/*.php') ?: []);
    foreach ($files as $f) {
        exec(escapeshellarg(PHP_BINARY) . ' -l ' . escapeshellarg($f) . ' 2>&1', $out, $code);
        eq($code, 0, 'php -l ' . basename($f));
    }
});
