<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/*
 * Everything a publish (site text, page, form, menu, media alt) does after its own rows
 * changed (spec §13.1, §13.6):
 *   inside the transaction : avo_bump_version()
 *   after COMMIT           : avo_after_publish() → published files, version.txt, wipe /_r,
 *                            VACUUM INTO backup, IndexNow ping (deferred)
 * Visitors never open SQLite: serve.php reads DATA/published/site.json and pages/<slug>.json.
 */

const AVO_BACKUPS_KEEP = 15;

function avo_bump_version(): int
{
    $v = (int) avo_setting('content_version', '0') + 1;
    avo_setting_set('content_version', (string) $v);
    return $v;
}

function avo_media_ref(array $row): array
{
    $widths = json_decode((string) $row['widths_json'], true) ?: [];
    sort($widths);
    return [
        'id' => (int) $row['id'],
        'width' => (int) $row['width'],
        'height' => (int) $row['height'],
        'variants' => array_map(fn ($w) => ['w' => (int) $w, 'url' => '/uploads/cms/' . $row['file_base'] . '-' . (int) $w . '.webp'], $widths),
        'alt' => ['en' => (string) $row['alt_en'], 'ms' => (string) $row['alt_ms']],
    ];
}

/** @param int[] $ids @return array<string, array> id => MediaRef */
function avo_media_refs(array $ids): array
{
    $ids = array_values(array_unique(array_filter(array_map('intval', $ids))));
    if (!$ids) return [];
    $rows = db_all('SELECT * FROM media WHERE id IN (' . implode(',', array_fill(0, count($ids), '?')) . ')', $ids);
    $out = [];
    foreach ($rows as $r) $out[(string) $r['id']] = avo_media_ref($r);
    return $out;
}

/** @param int[] $ids @return array<string, array> id => PublicForm (no recipients) */
function avo_public_forms(array $ids): array
{
    $ids = array_values(array_unique(array_filter(array_map('intval', $ids))));
    if (!$ids) return [];
    $rows = db_all('SELECT id, def_json FROM forms WHERE deleted_at IS NULL AND id IN (' . implode(',', array_fill(0, count($ids), '?')) . ')', $ids);
    $out = [];
    foreach ($rows as $r) $out[(string) $r['id']] = ['id' => (int) $r['id'], 'def' => json_decode((string) $r['def_json'], true)];
    return $out;
}

/** Expand a stored image override {media:id, alt, focal?} to ImageOverride (MediaRef inside). */
function avo_expand_image(mixed $value, array &$refCache = []): ?array
{
    if (!is_array($value) || !isset($value['media'])) return null;
    $id = (string) (int) $value['media'];
    if (!array_key_exists($id, $refCache)) {
        $refCache[$id] = avo_media_refs([(int) $id])[$id] ?? null;
    }
    if (!$refCache[$id]) return null;
    $out = ['media' => $refCache[$id], 'alt' => (string) ($value['alt'] ?? '')];
    if (isset($value['focal']['x'], $value['focal']['y'])) {
        $out['focal'] = ['x' => avo_num($value['focal']['x']), 'y' => avo_num($value['focal']['y'])];
    }
    return $out;
}

/** Published text + images, both languages, straight from the overrides table. */
function avo_published_overrides(): array
{
    $text = ['en' => [], 'ms' => []];
    $images = ['en' => [], 'ms' => []];
    $cache = [];
    foreach (db_all('SELECT lang, key, kind, published_value FROM overrides ORDER BY key') as $r) {
        if (!isset($text[$r['lang']])) continue;
        $value = json_decode((string) $r['published_value'], true);
        if ($r['kind'] === 'image') {
            $img = avo_expand_image($value, $cache);
            if ($img) $images[$r['lang']][$r['key']] = $img;
        } else {
            $text[$r['lang']][$r['key']] = $value;
        }
    }
    return ['text' => $text, 'images' => $images];
}

function avo_home_labels(array $text): array
{
    $out = [];
    foreach (AVO_LANGS as $l) {
        $v = $text[$l]['nav.home'] ?? null;
        if (!is_string($v) || $v === '') {
            $def = avo_defaults($l)['nav.home'] ?? null;
            $v = $def ? (string) avo_default_display($def) : 'Home';
        }
        $out[$l] = $v;
    }
    return $out;
}

/** The public payload of one published page in all its languages (written to pages/<slug>.json). */
function avo_build_page_file(array $row, array $homeLabels): array
{
    $doc = json_decode((string) $row['published_json'], true) ?: [];
    $langs = json_decode((string) $row['langs_json'], true) ?: [];
    $html = json_decode((string) ($row['published_html_json'] ?? '{}'), true) ?: [];
    $media = avo_media_refs(avo_doc_media_ids($doc));
    $forms = avo_public_forms(avo_doc_form_ids($doc));
    $first = db_val("SELECT MIN(created_at) FROM page_revisions WHERE page_id = ? AND note = 'publish'", [$row['id']]);
    $seo = [];
    foreach ($langs as $l) {
        $seo[$l] = avo_resolve_seo((string) $row['slug'], $doc, $l, $langs, (bool) $row['noindex'], $media, $homeLabels,
            $first !== null ? (int) $first : null, $row['published_at'] !== null ? (int) $row['published_at'] : null);
    }
    return [
        'id' => (int) $row['id'],
        'slug' => (string) $row['slug'],
        'langs' => $langs,
        'noindex' => (bool) $row['noindex'],
        'publishedAt' => avo_iso($row['published_at'] !== null ? (int) $row['published_at'] : null),
        'doc' => $doc,
        'html' => (object) array_intersect_key($html, array_flip($langs)),
        'media' => (object) $media,
        'forms' => (object) $forms,
        'seo' => (object) $seo,
    ];
}

function avo_published_dir(): string
{
    return avo_data_dir() . '/published';
}

/**
 * Rewrite site.json + every pages/<slug>.json from the database. Serialised with a file
 * lock and reading the version under it, so an older publish can never overwrite a newer one.
 */
function avo_write_published(): int
{
    $dir = avo_published_dir();
    @mkdir($dir . '/pages', 0700, true);
    $lock = fopen($dir . '/.lock', 'c');
    flock($lock, LOCK_EX);
    try {
        $v = (int) avo_setting('content_version', '0');
        $ov = avo_published_overrides();
        $homeLabels = avo_home_labels($ov['text']);
        $menu = ['en' => ['header' => [], 'footer' => []], 'ms' => ['header' => [], 'footer' => []]];
        $index = [];
        $written = [];
        $rows = db_all("SELECT * FROM pages WHERE status = 'published' AND deleted_at IS NULL AND published_json IS NOT NULL ORDER BY menu_order, id");
        foreach ($rows as $row) {
            $file = avo_build_page_file($row, $homeLabels);
            if (!$file['langs']) continue;
            avo_write_atomic($dir . '/pages/' . $row['slug'] . '.json', json_encode($file, AVO_JSON_SCRIPT));
            $written[$row['slug'] . '.json'] = true;
            $index[$row['slug']] = [
                'id' => (int) $row['id'], 'langs' => $file['langs'], 'noindex' => (bool) $row['noindex'],
                'publishedAt' => $file['publishedAt'],
            ];
            foreach ($file['langs'] as $l) {
                $label = trim(avo_loc($file['doc']['title'] ?? null, $l));
                $item = ['slug' => (string) $row['slug'], 'label' => $label, 'order' => (int) $row['menu_order']];
                if ((int) $row['in_header']) $menu[$l]['header'][] = $item;
                if ((int) $row['in_footer']) $menu[$l]['footer'][] = $item;
            }
        }
        foreach (glob($dir . '/pages/*.json') ?: [] as $f) {
            if (!isset($written[basename($f)])) @unlink($f);
        }
        $redirects = [];
        foreach (db_all('SELECT from_slug, to_slug FROM redirects') as $r) $redirects[$r['from_slug']] = $r['to_slug'];
        $gone = array_values(array_unique(array_merge(
            array_column(db_all('SELECT slug FROM gone'), 'slug'),
            array_column(db_all('SELECT slug FROM pages WHERE deleted_at IS NOT NULL'), 'slug'),
        )));
        $site = [
            'v' => $v,
            'generatedAt' => avo_iso(avo_now()),
            'text' => ['en' => (object) $ov['text']['en'], 'ms' => (object) $ov['text']['ms']],
            'images' => ['en' => (object) $ov['images']['en'], 'ms' => (object) $ov['images']['ms']],
            'menu' => $menu,
            'pages' => (object) $index,
            'redirects' => (object) $redirects,
            'gone' => $gone,
        ];
        avo_write_atomic($dir . '/site.json', json_encode($site, AVO_JSON_SCRIPT));
        avo_write_atomic(avo_data_dir() . '/version.txt', (string) $v);
        return $v;
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

/** Published site data for serve.php / sitemap.php (no SQLite). */
function avo_site_published(): array
{
    static $site = null;
    return $site ??= (avo_read_json(avo_published_dir() . '/site.json') ?? [
        'v' => 0, 'text' => ['en' => [], 'ms' => []], 'images' => ['en' => [], 'ms' => []],
        'menu' => ['en' => ['header' => [], 'footer' => []], 'ms' => ['header' => [], 'footer' => []]],
        'pages' => [], 'redirects' => [], 'gone' => [],
    ]);
}

function avo_page_published(string $slug): ?array
{
    if (!preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $slug)) return null;
    return avo_read_json(avo_published_dir() . '/pages/' . $slug . '.json');
}

function avo_rendered_dir(): string
{
    return AVO_DOCROOT . '/_r';
}

/** Drop the whole rendered-page store; pages regenerate on demand (spec §13.1). */
function avo_wipe_rendered(): void
{
    $r = avo_rendered_dir();
    if (!is_dir($r)) return;
    $trash = avo_data_dir() . '/trash-' . bin2hex(random_bytes(4));
    if (@rename($r, $trash)) {
        avo_rrmdir($trash);
    } else {
        avo_rrmdir($r);
    }
}

function avo_backup(): ?string
{
    $dir = avo_data_dir() . '/backups';
    @mkdir($dir, 0700, true);
    $file = $dir . '/cms-' . gmdate('Ymd-His') . '-' . bin2hex(random_bytes(3)) . '.sqlite';
    try {
        db()->exec('VACUUM INTO ' . db()->quote($file));
        @chmod($file, 0600);
    } catch (Throwable $e) {
        avo_log('error', 'backup failed: ' . $e->getMessage());
        return null;
    }
    $all = glob($dir . '/cms-*.sqlite') ?: [];
    sort($all);
    while (count($all) > AVO_BACKUPS_KEEP) {
        @unlink(array_shift($all));
    }
    return $file;
}

/** Mark published pages that depend on $dep ('text', 'media:3', 'form:2') for re-render. @return int[] ids */
function avo_mark_dependants(string $dep): array
{
    $ids = array_map('intval', array_column(db_all(
        "SELECT id FROM pages WHERE status = 'published' AND deleted_at IS NULL
           AND EXISTS (SELECT 1 FROM json_each(pages.deps_json) WHERE value = ?)", [$dep]), 'id'));
    if ($ids) {
        db_exec('UPDATE pages SET needs_render = 1 WHERE id IN (' . implode(',', $ids) . ')');
    }
    return $ids;
}

/**
 * Post-commit half of every publish. Never throws: the change is already committed,
 * a failed side effect is logged and the next publish rewrites everything anyway.
 * @param string[] $urls absolute URLs to ping IndexNow with
 */
function avo_after_publish(array $urls = []): void
{
    foreach ([
        'published files' => fn () => avo_write_published(),
        'wipe /_r' => fn () => avo_wipe_rendered(),
        'backup' => fn () => avo_backup(),
    ] as $what => $fn) {
        try {
            $fn();
        } catch (Throwable $e) {
            avo_log('error', "after publish: $what failed: " . $e->getMessage());
        }
    }
    if ($urls) avo_indexnow_defer($urls);
}

function avo_indexnow_key(): ?string
{
    foreach (glob(AVO_DOCROOT . '/*.txt') ?: [] as $f) {
        $name = basename($f, '.txt');
        if (preg_match('/^[0-9a-f]{32}$/', $name) && trim((string) @file_get_contents($f)) === $name) return $name;
    }
    return null;
}

/** Fire-and-forget after the response is flushed (spec §13.6: 3 s timeout). */
function avo_indexnow_defer(array $urls): void
{
    if (getenv('AVO_CMS_OFFLINE') === '1') {
        avo_log('info', 'indexnow skipped (offline)', ['urls' => $urls]);
        return;
    }
    $key = avo_indexnow_key();
    if (!$key) return;
    register_shutdown_function(function () use ($urls, $key) {
        if (function_exists('litespeed_finish_request')) {
            litespeed_finish_request();
        } elseif (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
        }
        $payload = json_encode([
            'host' => parse_url(AVO_SITE_URL, PHP_URL_HOST),
            'key' => $key,
            'keyLocation' => AVO_SITE_URL . '/' . $key . '.txt',
            'urlList' => array_values(array_unique($urls)),
        ], JSON_UNESCAPED_SLASHES);
        $ctx = stream_context_create(['http' => [
            'method' => 'POST', 'timeout' => 3, 'ignore_errors' => true,
            'header' => "Content-Type: application/json; charset=utf-8\r\n", 'content' => $payload,
        ]]);
        $res = @file_get_contents('https://api.indexnow.org/indexnow', false, $ctx);
        avo_log('info', 'indexnow ping', ['urls' => count($urls), 'ok' => $res !== false]);
    });
}
