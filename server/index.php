<?php
declare(strict_types=1);

/*
 * JSON API router: every /api/* request except serve.php and sitemap.php (spec §12, §14.2).
 * Writes are POST (+ X-HTTP-Method-Override for PUT/PATCH/DELETE), same-origin, and —
 * when signed in — carry X-CSRF-Token and X-CMS-Build.
 */

define('AVO_CMS', true);
ini_set('display_errors', '0');
error_reporting(E_ALL);

// A fatal error (memory, timeout) still answers in the API's error shape, never a blank 500.
$GLOBALS['avo_api_done'] = false;
register_shutdown_function(function () {
    if ($GLOBALS['avo_api_done']) return;
    $e = error_get_last();
    if (!$e || !in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR], true)) return;
    while (ob_get_level() > 0) @ob_end_clean();
    if (!headers_sent()) {
        header_remove();
        header((preg_match('~^HTTP/\d(\.\d)?$~', (string) ($_SERVER['SERVER_PROTOCOL'] ?? '')) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.1') . ' 500 Internal Server Error', true, 500);
        header('Content-Type: application/json; charset=UTF-8');
        header('Cache-Control: no-store');
    }
    echo '{"error":{"code":"server_error","message":"The server ran out of resources while doing this. Try again; if it keeps happening, tell the developer."}}';
    if (function_exists('avo_log')) avo_log('error', 'api fatal: ' . $e['message'], ['at' => $e['file'] . ':' . $e['line'], 'uri' => $_SERVER['REQUEST_URI'] ?? '']);
});

require __DIR__ . '/_lib/bootstrap.php';

/**
 * [method, path regex, handler, auth]. Handlers get (params, session|null) and return
 * the JSON payload, or null after streaming a response themselves.
 */
function avo_routes(): array
{
    $b = fn () => avo_json_body();
    return [
        // public
        ['GET', '#^/api/build$#', fn () => ['build' => avo_build_id()], false],
        ['GET', '#^/api/setup/status$#', fn () => ['needsSetup' => avo_needs_setup()], false],
        ['POST', '#^/api/setup$#', fn () => avo_setup($b()), false],
        ['POST', '#^/api/auth/login$#', fn () => avo_login($b()), false],
        ['POST', '#^/api/auth/logout$#', fn () => avo_logout(), false],
        ['GET', '#^/api/auth/me$#', fn () => avo_me(), false],
        ['POST', '#^/api/auth/forgot$#', fn () => avo_forgot($b()), false],
        ['POST', '#^/api/auth/reset$#', fn () => avo_reset_password($b()), false],
        ['GET', '#^/api/public/page$#', fn () => avo_public_page(), false],
        ['POST', '#^/api/forms/(\d+)/submit$#', fn ($p) => avo_route_submit((int) $p[1]), false],

        // signed in
        ['POST', '#^/api/auth/password$#', fn ($p, $s) => avo_change_password($s, $b()), true],
        ['GET', '#^/api/users$#', fn () => avo_users_list(), true],
        ['POST', '#^/api/users$#', fn ($p, $s) => avo_user_create($s, $b()), true],
        ['PATCH', '#^/api/users/(\d+)$#', fn ($p, $s) => avo_user_update($s, (int) $p[1], $b()), true],
        ['GET', '#^/api/dashboard$#', fn () => avo_dashboard(), true],

        ['GET', '#^/api/pages$#', fn () => avo_pages_list(!empty($_GET['trash']) && $_GET['trash'] !== '0'), true],
        ['POST', '#^/api/pages$#', fn ($p, $s) => avo_page_create($s, $b()), true],
        ['GET', '#^/api/pages/dirty$#', fn () => avo_pages_dirty(), true],
        ['GET', '#^/api/pages/(\d+)$#', fn ($p) => avo_page_payload((int) $p[1]), true],
        ['PATCH', '#^/api/pages/(\d+)$#', fn ($p, $s) => avo_page_patch($s, (int) $p[1], $b()), true],
        ['DELETE', '#^/api/pages/(\d+)$#', fn ($p, $s) => avo_page_trash($s, (int) $p[1]), true],
        ['PUT', '#^/api/pages/(\d+)/draft$#', fn ($p, $s) => avo_page_save_draft($s, (int) $p[1], $b()), true],
        ['POST', '#^/api/pages/(\d+)/publish$#', fn ($p, $s) => avo_page_publish($s, (int) $p[1], $b()), true],
        ['POST', '#^/api/pages/(\d+)/unpublish$#', fn ($p, $s) => avo_page_unpublish($s, (int) $p[1]), true],
        ['POST', '#^/api/pages/(\d+)/html$#', fn ($p, $s) => avo_page_rerender($s, (int) $p[1], $b()), true],
        ['POST', '#^/api/pages/(\d+)/duplicate$#', fn ($p, $s) => avo_page_duplicate($s, (int) $p[1]), true],
        ['POST', '#^/api/pages/(\d+)/restore$#', fn ($p, $s) => avo_page_restore($s, (int) $p[1]), true],
        ['POST', '#^/api/pages/(\d+)/purge$#', fn ($p, $s) => avo_page_purge($s, (int) $p[1]), true],
        ['GET', '#^/api/pages/(\d+)/revisions$#', fn ($p) => avo_page_revisions((int) $p[1]), true],
        ['POST', '#^/api/pages/(\d+)/revisions/(\d+)/restore$#', fn ($p, $s) => avo_page_revision_restore($s, (int) $p[1], (int) $p[2]), true],

        ['GET', '#^/api/site/pages$#', fn () => ['pages' => (object) avo_page_keys(), 'spots' => (object) avo_image_spots()], true],
        ['GET', '#^/api/site/keys$#', fn ($p, $s) => avo_site_keys($s, (string) ($_GET['page'] ?? ''), (string) ($_GET['lang'] ?? 'en')), true],
        ['GET', '#^/api/site/text$#', fn () => avo_site_text(), true],
        ['PUT', '#^/api/site/overrides$#', fn ($p, $s) => avo_overrides_save($s, $b()), true],
        ['POST', '#^/api/site/publish$#', fn ($p, $s) => avo_overrides_publish($s, $b()), true],
        ['POST', '#^/api/site/discard$#', fn ($p, $s) => avo_overrides_discard($s, $b()), true],
        ['POST', '#^/api/site/discard-other$#', fn ($p, $s) => avo_overrides_discard_other($s, $b()), true],
        ['GET', '#^/api/site/pending$#', fn () => avo_site_pending(), true],
        ['GET', '#^/api/site/orphans$#', fn () => avo_site_orphans(), true],
        ['GET', '#^/api/site/revisions$#', fn () => avo_site_revisions(), true],
        ['POST', '#^/api/site/revisions/(\d+)/revert$#', fn ($p, $s) => avo_site_revert($s, (int) $p[1]), true],

        ['GET', '#^/api/forms$#', fn () => avo_forms_list(), true],
        ['POST', '#^/api/forms$#', fn ($p, $s) => avo_form_create($s, $b()), true],
        ['GET', '#^/api/forms/(\d+)$#', fn ($p) => avo_form_out(avo_form_row((int) $p[1])), true],
        ['PUT', '#^/api/forms/(\d+)$#', fn ($p, $s) => avo_form_update($s, (int) $p[1], $b()), true],
        ['DELETE', '#^/api/forms/(\d+)$#', fn ($p, $s) => avo_form_delete($s, (int) $p[1]), true],
        ['GET', '#^/api/forms/(\d+)/usage$#', fn ($p) => (avo_form_row((int) $p[1]) && true) ? avo_form_usage((int) $p[1]) : [], true],
        ['POST', '#^/api/forms/(\d+)/test-email$#', fn ($p, $s) => avo_form_test_email($s, (int) $p[1]), true],

        ['GET', '#^/api/submissions$#', fn () => avo_submissions_list($_GET), true],
        ['GET', '#^/api/submissions/export\.csv$#', function () {
            avo_submissions_export($_GET);
            return null;
        }, true],
        ['PATCH', '#^/api/submissions/(\d+)$#', fn ($p, $s) => avo_submission_patch($s, (int) $p[1], $b()), true],
        ['DELETE', '#^/api/submissions/(\d+)$#', fn ($p, $s) => avo_submission_delete($s, (int) $p[1]), true],
        ['POST', '#^/api/submissions/(\d+)/resend$#', fn ($p, $s) => avo_submission_resend($s, (int) $p[1]), true],

        ['GET', '#^/api/media$#', fn () => avo_media_list(), true],
        ['POST', '#^/api/media$#', fn ($p, $s) => avo_media_upload($s), true],
        ['PATCH', '#^/api/media/(\d+)$#', fn ($p, $s) => avo_media_update($s, (int) $p[1], $b()), true],
        ['DELETE', '#^/api/media/(\d+)$#', fn ($p, $s) => avo_media_delete($s, (int) $p[1]), true],

        ['GET', '#^/api/catalogue$#', fn () => avo_catalogue(), true],
        ['GET', '#^/api/system/health$#', fn () => avo_health(), true],
        ['GET', '#^/api/system/backup$#', function ($p, $s) {
            avo_backup_download($s);
            return null;
        }, true],
        ['GET', '#^/api/settings$#', fn () => avo_settings_get(), true],
        ['POST', '#^/api/settings$#', fn ($p, $s) => avo_settings_save($s, $b()), true],
    ];
}

/** GET /api/public/page?slug=&lang= → PublicPagePayload from the published files (no SQLite). */
function avo_public_page(): array
{
    $slug = (string) ($_GET['slug'] ?? '');
    $lang = (string) ($_GET['lang'] ?? '');
    $file = in_array($lang, AVO_LANGS, true) ? avo_page_published($slug) : null;
    if (!$file || !in_array($lang, $file['langs'] ?? [], true)) avo_fail(404, 'not_found', 'This page does not exist.');
    return avo_page_payload_public($file, $lang);
}

function avo_route_submit(int $formId): ?array
{
    $res = avo_form_submit($formId);
    if (isset($res['location'])) {
        http_response_code(303);
        header('Location: ' . $res['location']);
        header('Cache-Control: no-store');
        return null;
    }
    return $res['json'];
}

function avo_dispatch(): void
{
    $method = avo_method();
    $path = rtrim(avo_request_path(), '/');
    $allowed = [];
    foreach (avo_routes() as [$m, $re, $handler, $auth]) {
        if (!preg_match($re, $path, $params)) continue;
        if ($m !== $method) {
            $allowed[] = $m;
            continue;
        }
        $session = null;
        if ($method !== 'GET') avo_check_same_origin();
        if ($auth) {
            $session = avo_require_session();
            if ($method !== 'GET') {
                avo_check_csrf($session);
                avo_check_build();
            }
        }
        $result = $handler($params, $session);
        if ($result !== null) avo_send_json($result);
        return;
    }
    if ($allowed) avo_fail(405, 'method_not_allowed', 'This action is not available here.', null, ['Allow' => implode(', ', array_unique($allowed))]);
    avo_fail(404, 'not_found', 'Unknown address.');
}

try {
    avo_dispatch();
} catch (AvoHttpError $e) {
    avo_send_error($e);
} catch (Throwable $e) {
    avo_log('error', 'api: ' . get_class($e) . ': ' . $e->getMessage(), ['at' => $e->getFile() . ':' . $e->getLine(), 'uri' => $_SERVER['REQUEST_URI'] ?? '']);
    avo_send_error(new AvoHttpError(500, 'server_error', 'Something went wrong on the server. Try again; if it keeps happening, tell the developer.'));
}
$GLOBALS['avo_api_done'] = true;
