<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/** Identical to SLUG_RE / RESERVED_SLUGS in src/cms/contracts.ts. */
const AVO_SLUG_RE = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/';
const AVO_RESERVED_SLUGS = ['products', 'shop', 'why-us', 'contact', 'blog', 'admin', 'api', 'assets', 'uploads', 'fonts',
    'icons', 'og', 'ar', 'en', 'ms', '__cms-template', 'sitemap', 'robots', 'index', 'cms-template'];
const AVO_WIDGET_TYPES = ['heading', 'text', 'image', 'button', 'spacer', 'divider', 'video', 'gallery', 'iconList', 'faq',
    'products', 'form', 'quote', 'whatsapp'];
const AVO_MAX_HEADER_ITEMS = 3;
const AVO_DOC_MAX_BYTES = 1_000_000;

// ---------------------------------------------------------------- doc analysis (mirrors src/cms/doc.ts)

/** contracts.ts slugProblem() */
function avo_slug_problem(string $slug): ?string
{
    $len = strlen($slug);
    if ($len < 2 || $len > 80) return 'Use 2–80 characters.';
    if (!preg_match(AVO_SLUG_RE, $slug)) return 'Use lowercase letters, numbers and single hyphens only.';
    if (in_array($slug, AVO_RESERVED_SLUGS, true)) return 'This address is already used by the site.';
    return null;
}

function avo_doc_widgets(array $doc): array
{
    $out = [];
    foreach ($doc['sections'] ?? [] as $s) {
        foreach ($s['columns'] ?? [] as $c) {
            foreach ($c['widgets'] ?? [] as $w) {
                if (is_array($w)) $out[] = $w;
            }
        }
    }
    return $out;
}

function avo_doc_media_ids(array $doc): array
{
    $ids = [];
    if (is_int($doc['seo']['ogImage'] ?? null)) $ids[] = $doc['seo']['ogImage'];
    foreach ($doc['sections'] ?? [] as $s) {
        if (is_int($s['settings']['bgImage'] ?? null)) $ids[] = $s['settings']['bgImage'];
    }
    foreach (avo_doc_widgets($doc) as $w) {
        if (($w['type'] ?? '') === 'image' && is_int($w['settings']['media'] ?? null)) $ids[] = $w['settings']['media'];
        if (($w['type'] ?? '') === 'gallery') {
            foreach ($w['settings']['media'] ?? [] as $m) {
                if (is_int($m)) $ids[] = $m;
            }
        }
    }
    return array_values(array_unique($ids));
}

function avo_doc_form_ids(array $doc): array
{
    $ids = [];
    foreach (avo_doc_widgets($doc) as $w) {
        if (($w['type'] ?? '') === 'form' && is_int($w['settings']['formId'] ?? null)) $ids[] = $w['settings']['formId'];
    }
    return array_values(array_unique($ids));
}

/** doc.ts collectLocalized() over {title, seo, sections}. */
function avo_doc_localized(array $doc): array
{
    $out = [];
    $walk = function (mixed $v, string $path) use (&$walk, &$out): void {
        if (avo_is_localized($v)) {
            $out[] = ['path' => $path, 'value' => $v];
            return;
        }
        if (is_array($v)) {
            foreach ($v as $k => $x) $walk($x, $path === '' ? (string) $k : $path . '.' . $k);
        }
    };
    $walk(['title' => $doc['title'] ?? null, 'seo' => $doc['seo'] ?? null, 'sections' => $doc['sections'] ?? []], '');
    return $out;
}

/** doc.ts missingTranslations(): filled in the other language, empty in $lang. */
function avo_missing_translations(array $doc, string $lang): array
{
    $other = $lang === 'ms' ? 'en' : 'ms';
    $out = [];
    foreach (avo_doc_localized($doc) as $item) {
        $a = is_string($item['value'][$other] ?? null) ? $item['value'][$other] : '';
        $b = is_string($item['value'][$lang] ?? null) ? $item['value'][$lang] : '';
        if (avo_plain($a) !== '' && avo_plain($b) === '') $out[] = $item['path'];
    }
    return $out;
}

/** Why $lang can't be published, or null (spec §13.6). */
function avo_lang_problem(array $doc, string $lang): ?string
{
    $name = $lang === 'en' ? 'English' : 'Malay';
    if (trim(avo_loc($doc['title'] ?? null, $lang)) === '') return "The $name page title is empty.";
    if (trim(avo_loc($doc['seo']['metaTitle'] ?? null, $lang)) === '') return "The $name SEO title is empty.";
    $missing = count(avo_missing_translations($doc, $lang));
    if ($missing > 0) return "$missing text" . ($missing === 1 ? ' needs' : 's need') . " a $name translation.";
    return null;
}

function avo_valid_video_url(string $url): bool
{
    if ($url === '') return true;
    if (!avo_safe_url($url)) return false;
    $p = parse_url($url);
    if (!isset($p['host'])) {
        return (bool) preg_match('~^/[A-Za-z0-9/_.\-]+\.mp4$~', $url);
    }
    if (($p['scheme'] ?? '') !== 'https') return false;
    $host = strtolower($p['host']);
    if (in_array($host, ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'www.youtube-nocookie.com', 'vimeo.com', 'www.vimeo.com', 'player.vimeo.com'], true)) {
        return true;
    }
    return (bool) preg_match('~\.mp4$~i', $p['path'] ?? '');
}

/**
 * Validate a CmsPageDoc posted by the builder. Rich text is sanitised in place; unsafe
 * links and video URLs are refused with the widget path so the builder can point at them.
 */
function avo_validate_doc(mixed $doc): array
{
    $bad = function (string $msg, string $path = 'doc') {
        avo_fail(400, 'invalid_doc', $msg, [$path => $msg]);
    };
    if (!is_array($doc) || array_is_list($doc)) $bad('The page content is missing or damaged. Reload the builder and try again.');
    if (strlen((string) json_encode($doc)) > AVO_DOC_MAX_BYTES) $bad('This page is too large to save. Split it into two pages.');
    if (($doc['schema'] ?? null) !== 1) $bad('This page was made with a newer builder version. Reload the control panel.');
    foreach (['title' => $doc['title'] ?? null, 'seo.metaTitle' => $doc['seo']['metaTitle'] ?? null,
        'seo.metaDescription' => $doc['seo']['metaDescription'] ?? null] as $path => $loc) {
        if (!avo_is_localized($loc) || !is_string($loc['en']) || !is_string($loc['ms'])) $bad('The page title or SEO fields are damaged.', $path);
        foreach (AVO_LANGS as $l) {
            if (mb_strlen($loc[$l]) > ($path === 'seo.metaDescription' ? 400 : 200)) $bad('This text is too long.', $path . '.' . $l);
        }
    }
    if (isset($doc['seo']['ogImage']) && !is_int($doc['seo']['ogImage'])) $bad('The share image is damaged. Choose it again.', 'seo.ogImage');
    if (!is_array($doc['sections'] ?? null) || !array_is_list($doc['sections'])) $bad('The page sections are damaged.', 'sections');
    if (count($doc['sections']) > 100) $bad('A page can have at most 100 sections.', 'sections');
    foreach ($doc['sections'] as $si => &$section) {
        $sp = "sections.$si";
        if (!is_array($section) || ($section['kind'] ?? null) !== 'section' || !is_string($section['id'] ?? null)) $bad('A section is damaged.', $sp);
        if (!is_array($section['settings'] ?? null)) $bad('A section has no settings.', $sp);
        $anchor = $section['settings']['anchor'] ?? null;
        if ($anchor !== null && $anchor !== '' && (!is_string($anchor) || !preg_match('/^[a-z0-9-]{1,40}$/', $anchor))) {
            $bad('A section anchor may only use lowercase letters, numbers and hyphens.', "$sp.settings.anchor");
        }
        if (!is_array($section['columns'] ?? null) || !array_is_list($section['columns']) || !$section['columns'] || count($section['columns']) > 6) {
            $bad('A section must have 1 to 6 columns.', $sp);
        }
        foreach ($section['columns'] as $ci => &$col) {
            $cp = "$sp.columns.$ci";
            if (!is_array($col) || !is_int($col['span'] ?? null) || $col['span'] < 1 || $col['span'] > 12 || !is_array($col['widgets'] ?? null)) {
                $bad('A column is damaged.', $cp);
            }
            if (count($col['widgets']) > 60) $bad('A column can hold at most 60 elements.', $cp);
            foreach ($col['widgets'] as $wi => &$w) {
                $wp = "$cp.widgets.$wi";
                if (!is_array($w) || !is_string($w['id'] ?? null) || !in_array($w['type'] ?? null, AVO_WIDGET_TYPES, true) || !is_array($w['settings'] ?? null)) {
                    $bad('An element on the page is damaged. Delete it and add it again.', $wp);
                }
                $st = &$w['settings'];
                switch ($w['type']) {
                    case 'text':
                        foreach (AVO_LANGS as $l) {
                            if (isset($st['html'][$l]) && is_string($st['html'][$l])) $st['html'][$l] = avo_sanitize_rich($st['html'][$l]);
                        }
                        break;
                    case 'button':
                        $href = (string) ($st['href'] ?? '');
                        if ($href !== '' && !avo_safe_url($href)) $bad('This button link is not allowed. Use a web address (https://…), a page path (/en/…), an email (mailto:) or a phone (tel:).', "$wp.settings.href");
                        break;
                    case 'image':
                        $href = (string) ($st['href'] ?? '');
                        if ($href !== '' && !avo_safe_url($href)) $bad('This image link is not allowed. Use a web address (https://…) or a page path (/en/…).', "$wp.settings.href");
                        break;
                    case 'video':
                        if (!avo_valid_video_url((string) ($st['url'] ?? ''))) $bad('Use a YouTube or Vimeo link, or an https link to an .mp4 file.', "$wp.settings.url");
                        break;
                }
                unset($st);
            }
            unset($w);
        }
        unset($col);
    }
    unset($section);
    return $doc;
}

function avo_empty_doc(array $title): array
{
    return [
        'schema' => 1,
        'title' => ['en' => (string) ($title['en'] ?? ''), 'ms' => (string) ($title['ms'] ?? '')],
        'seo' => ['metaTitle' => ['en' => '', 'ms' => ''], 'metaDescription' => ['en' => '', 'ms' => '']],
        'sections' => [],
    ];
}

// ---------------------------------------------------------------- output shapes

function avo_page_row(int $id, bool $includeTrashed = true): array
{
    $row = db_one('SELECT * FROM pages WHERE id = ?' . ($includeTrashed ? '' : ' AND deleted_at IS NULL'), [$id]);
    if (!$row) avo_fail(404, 'not_found', 'This page no longer exists.');
    return $row;
}

function avo_page_list_item(array $row): array
{
    $draft = json_decode((string) $row['draft_json'], true) ?: [];
    $published = $row['published_json'] !== null ? json_decode((string) $row['published_json'], true) : null;
    return [
        'id' => (int) $row['id'],
        'slug' => (string) $row['slug'],
        'status' => (string) $row['status'],
        'title' => $draft['title'] ?? ['en' => '', 'ms' => ''],
        'updatedAt' => avo_iso((int) $row['updated_at']),
        'publishedAt' => avo_iso($row['published_at'] !== null ? (int) $row['published_at'] : null),
        'langs' => $row['status'] === 'published' ? (json_decode((string) $row['langs_json'], true) ?: []) : [],
        'inHeader' => (bool) $row['in_header'],
        'inFooter' => (bool) $row['in_footer'],
        'menuOrder' => (int) $row['menu_order'],
        'noindex' => (bool) $row['noindex'],
        'hasUnpublished' => $row['status'] !== 'published' || $published === null || $published != $draft,
        'needsTranslation' => count(avo_missing_translations($draft, 'ms')),
        'needsRender' => $row['status'] === 'published' && ((bool) $row['needs_render'] || ($row['render_build'] ?? '') !== avo_build_id()),
        'deletedAt' => avo_iso($row['deleted_at'] !== null ? (int) $row['deleted_at'] : null),
        'updatedBy' => avo_user_name($row['updated_by'] !== null ? (int) $row['updated_by'] : null),
    ];
}

function avo_page_payload(int $id): array
{
    $row = avo_page_row($id);
    $draft = json_decode((string) $row['draft_json'], true);
    $published = $row['published_json'] !== null ? json_decode((string) $row['published_json'], true) : null;
    $meta = avo_page_list_item($row) + ['createdAt' => avo_iso((int) $row['created_at']), 'version' => (int) $row['draft_version']];
    $mediaIds = array_merge(avo_doc_media_ids($draft), $published ? avo_doc_media_ids($published) : []);
    $formIds = array_merge(avo_doc_form_ids($draft), $published ? avo_doc_form_ids($published) : []);
    return [
        'page' => $meta,
        'draft' => $draft,
        'published' => $published,
        'media' => (object) avo_media_refs($mediaIds),
        'forms' => (object) avo_public_forms($formIds),
    ];
}

function avo_pages_list(bool $trash): array
{
    $rows = db_all('SELECT * FROM pages WHERE deleted_at IS ' . ($trash ? 'NOT NULL' : 'NULL') . ' ORDER BY updated_at DESC, id DESC');
    return array_map('avo_page_list_item', $rows);
}

// ---------------------------------------------------------------- writes

/** Slug must be valid, unused by any page (trashed ones included) — redirects/gone entries give way. */
function avo_assert_slug_free(string $slug, ?int $exceptId = null): void
{
    if ($p = avo_slug_problem($slug)) avo_fail(400, 'invalid_slug', $p, ['slug' => $p]);
    $other = db_one('SELECT id, deleted_at FROM pages WHERE slug = ?' . ($exceptId ? ' AND id <> ' . (int) $exceptId : ''), [$slug]);
    if ($other) {
        $msg = $other['deleted_at'] !== null
            ? 'A page in the trash still uses this address. Delete it permanently first, or choose another address.'
            : 'Another page already uses this address.';
        avo_fail(409, 'slug_taken', $msg, ['slug' => $msg]);
    }
}

function avo_page_create(array $s, array $body): array
{
    $slug = is_string($body['slug'] ?? null) ? strtolower(trim($body['slug'])) : '';
    $title = $body['title'] ?? null;
    if (!avo_is_localized($title) || !is_string($title['en']) || !is_string($title['ms'])) {
        avo_fail(400, 'invalid', 'Give the page a title.', ['title' => 'Give the page a title.']);
    }
    $title = ['en' => trim(avo_clean_text($title['en'])), 'ms' => trim(avo_clean_text($title['ms']))];
    if ($title['en'] === '' && $title['ms'] === '') avo_fail(400, 'invalid', 'Give the page a title.', ['title' => 'Give the page a title.']);
    if (isset($body['doc'])) {
        $doc = avo_validate_doc($body['doc']);
        $doc['title'] = $title;
    } else {
        $doc = avo_empty_doc($title);
    }
    $id = db_tx(function () use ($s, $slug, $doc) {
        avo_assert_slug_free($slug);
        $now = avo_now();
        db_exec('DELETE FROM redirects WHERE from_slug = ?', [$slug]);
        db_exec('DELETE FROM gone WHERE slug = ?', [$slug]);
        db_exec("INSERT INTO pages(slug,status,langs_json,draft_json,draft_version,created_at,updated_at,updated_by)
                 VALUES(?,'draft','[]',?,1,?,?,?)", [$slug, json_encode($doc, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $now, $now, $s['user_id']]);
        return (int) db()->lastInsertId();
    });
    avo_audit($s['user_id'], 'page.create', 'page:' . $id, $slug);
    return avo_page_payload($id);
}

function avo_page_save_draft(array $s, int $id, array $body): array
{
    $doc = avo_validate_doc($body['doc'] ?? null);
    $base = $body['baseVersion'] ?? null;
    $force = ($body['force'] ?? false) === true;
    return db_tx(function () use ($s, $id, $doc, $base, $force) {
        $row = avo_page_row($id, false);
        if (!$force && (!is_int($base) || $base !== (int) $row['draft_version'])) {
            avo_fail(409, 'stale_draft', 'This page was changed in another tab or by another user. Reload it to see the latest version.');
        }
        $v = (int) $row['draft_version'] + 1;
        $now = avo_now();
        db_exec('UPDATE pages SET draft_json = ?, draft_version = ?, updated_at = ?, updated_by = ? WHERE id = ?', [
            json_encode($doc, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $v, $now, $s['user_id'], $id,
        ]);
        return ['version' => $v, 'updatedAt' => avo_iso($now)];
    });
}

/** Decode {en?,ms?} base64 HTML and sanitise it (spec §13.3). */
function avo_decode_html_map(mixed $map, array $langs): array
{
    $out = [];
    if (!is_array($map)) return $out;
    foreach ($langs as $l) {
        if (!isset($map[$l])) continue;
        if (!is_string($map[$l])) avo_fail(400, 'invalid', 'The page HTML is damaged. Reload the builder and try again.');
        $raw = base64_decode($map[$l], true);
        if ($raw === false || !mb_check_encoding($raw, 'UTF-8')) avo_fail(400, 'invalid', 'The page HTML is damaged. Reload the builder and try again.');
        if (strlen($raw) > 1_500_000) avo_fail(413, 'too_large', 'This page is too large to publish.');
        $out[$l] = avo_sanitize_html($raw, 'page');
    }
    return $out;
}

function avo_page_deps(array $doc): array
{
    $deps = ['text'];
    foreach (avo_doc_media_ids($doc) as $m) $deps[] = 'media:' . $m;
    foreach (avo_doc_form_ids($doc) as $f) $deps[] = 'form:' . $f;
    return $deps;
}

function avo_page_urls(string $slug, array $langs): array
{
    return array_map(fn ($l) => avo_page_url($l, $slug), $langs);
}

/** POST /api/pages/{id}/publish {doc, htmlB64:{en?,ms?}, langs, build} */
function avo_page_publish(array $s, int $id, array $body): array
{
    avo_check_build(is_string($body['build'] ?? null) ? $body['build'] : null);
    $doc = avo_validate_doc($body['doc'] ?? null);
    $requested = is_array($body['langs'] ?? null) ? array_values(array_intersect(AVO_LANGS, $body['langs'])) : AVO_LANGS;
    $skipped = [];
    $langs = [];
    foreach ($requested as $l) {
        $problem = avo_lang_problem($doc, $l);
        if ($problem) {
            $skipped[$l] = $problem;
            continue;
        }
        $langs[] = $l;
    }
    if (!$langs) {
        avo_fail(400, 'nothing_to_publish', 'Nothing could be published: ' . implode(' ', $skipped), $skipped);
    }
    $html = avo_decode_html_map($body['htmlB64'] ?? null, $langs);
    foreach ($langs as $l) {
        if (!isset($html[$l])) avo_fail(400, 'invalid', 'The page HTML for ' . ($l === 'en' ? 'English' : 'Malay') . ' is missing. Reload the builder and publish again.');
    }
    $build = is_string($body['build'] ?? null) && $body['build'] !== '' ? $body['build'] : avo_build_id();
    $result = db_tx(function () use ($s, $id, $doc, $langs, $html, $build) {
        $row = avo_page_row($id, false);
        $now = avo_now();
        $docJson = json_encode($doc, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $htmlJson = json_encode($html, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $wasLangs = $row['status'] === 'published' ? (json_decode((string) $row['langs_json'], true) ?: []) : [];
        db_exec("UPDATE pages SET status = 'published', langs_json = ?, draft_json = ?, draft_version = draft_version + 1,
                 published_json = ?, published_html_json = ?, render_build = ?, deps_json = ?, needs_render = 0,
                 updated_at = ?, published_at = ?, updated_by = ? WHERE id = ?", [
            json_encode($langs), $docJson, $docJson, $htmlJson, $build, json_encode(avo_page_deps($doc)), $now, $now, $s['user_id'], $id,
        ]);
        db_exec("INSERT INTO page_revisions(page_id,json,html_json,langs_json,created_at,user_id,note) VALUES(?,?,?,?,?,?,'publish')", [
            $id, $docJson, $htmlJson, json_encode($langs), $now, $s['user_id'],
        ]);
        $v = avo_bump_version();
        return ['now' => $now, 'v' => $v, 'slug' => $row['slug'], 'urls' => avo_page_urls((string) $row['slug'], array_unique(array_merge($langs, $wasLangs)))];
    });
    avo_after_publish((bool) avo_page_row($id)['noindex'] ? [] : $result['urls']);
    avo_audit($s['user_id'], 'page.publish', 'page:' . $id, implode(',', $langs));
    $version = (int) avo_page_row($id)['draft_version'];
    return ['publishedAt' => avo_iso($result['now']), 'langs' => $langs, 'skipped' => (object) $skipped, 'version' => $version, 'contentVersion' => $result['v']];
}

/** POST /api/pages/{id}/html — re-render only (doc unchanged). */
function avo_page_rerender(array $s, int $id, array $body): array
{
    avo_check_build(is_string($body['build'] ?? null) ? $body['build'] : null);
    $row = avo_page_row($id, false);
    if ($row['status'] !== 'published') avo_fail(409, 'not_published', 'This page is not published, so there is nothing to refresh.');
    $langs = json_decode((string) $row['langs_json'], true) ?: [];
    $html = avo_decode_html_map($body['htmlB64'] ?? null, $langs);
    if (!$html) avo_fail(400, 'invalid', 'No page HTML was sent.');
    $build = is_string($body['build'] ?? null) && $body['build'] !== '' ? $body['build'] : avo_build_id();
    db_tx(function () use ($id, $html, $build) {
        $row = avo_page_row($id, false);
        $current = json_decode((string) ($row['published_html_json'] ?? '{}'), true) ?: [];
        db_exec('UPDATE pages SET published_html_json = ?, render_build = ?, needs_render = 0 WHERE id = ?', [
            json_encode(array_merge($current, $html), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $build, $id,
        ]);
        avo_bump_version();
    });
    avo_after_publish();
    avo_audit($s['user_id'], 'page.rerender', 'page:' . $id);
    return ['ok' => true];
}

function avo_pages_dirty(): array
{
    $build = avo_build_id();
    $rows = db_all("SELECT id, needs_render, render_build FROM pages WHERE status = 'published' AND deleted_at IS NULL");
    $ids = [];
    foreach ($rows as $r) {
        if ((int) $r['needs_render'] || ($build !== '' && (string) $r['render_build'] !== $build)) $ids[] = (int) $r['id'];
    }
    return $ids;
}

function avo_page_unpublish(array $s, int $id): array
{
    $urls = db_tx(function () use ($id) {
        $row = avo_page_row($id, false);
        $langs = json_decode((string) $row['langs_json'], true) ?: [];
        db_exec("UPDATE pages SET status = 'draft', langs_json = '[]', updated_at = ? WHERE id = ?", [avo_now(), $id]);
        avo_bump_version();
        return avo_page_urls((string) $row['slug'], $langs);
    });
    avo_after_publish($urls);
    avo_audit($s['user_id'], 'page.unpublish', 'page:' . $id);
    return avo_page_list_item(avo_page_row($id));
}

/** PATCH {slug?, inHeader?, inFooter?, menuOrder?, noindex?} */
function avo_page_patch(array $s, int $id, array $body): array
{
    $urls = db_tx(function () use ($id, $body) {
        $row = avo_page_row($id, false);
        $live = $row['status'] === 'published';
        $urls = [];
        $sets = [];
        $args = [];
        if (array_key_exists('slug', $body)) {
            $slug = is_string($body['slug']) ? strtolower(trim($body['slug'])) : '';
            if ($slug !== $row['slug']) {
                avo_assert_slug_free($slug, $id);
                $old = (string) $row['slug'];
                db_exec('DELETE FROM redirects WHERE from_slug = ?', [$slug]);
                db_exec('DELETE FROM gone WHERE slug = ?', [$slug]);
                if ($row['published_at'] !== null) {
                    // keep old links working; chains collapse to the newest address
                    db_exec('UPDATE redirects SET to_slug = ? WHERE to_slug = ?', [$slug, $old]);
                    db_exec('INSERT OR REPLACE INTO redirects(from_slug,to_slug,created_at) VALUES(?,?,?)', [$old, $slug, avo_now()]);
                }
                $sets[] = 'slug = ?';
                $args[] = $slug;
                if ($live) {
                    $langs = json_decode((string) $row['langs_json'], true) ?: [];
                    $urls = array_merge(avo_page_urls($old, $langs), avo_page_urls($slug, $langs));
                }
            }
        }
        if (array_key_exists('inHeader', $body)) {
            $on = (bool) $body['inHeader'];
            if ($on && !(int) $row['in_header']) {
                $count = (int) db_val('SELECT COUNT(*) FROM pages WHERE in_header = 1 AND deleted_at IS NULL AND id <> ?', [$id]);
                if ($count >= AVO_MAX_HEADER_ITEMS) {
                    avo_fail(409, 'menu_full', 'The top menu already has ' . AVO_MAX_HEADER_ITEMS . ' pages. Remove one first.');
                }
            }
            $sets[] = 'in_header = ?';
            $args[] = $on ? 1 : 0;
        }
        if (array_key_exists('inFooter', $body)) {
            $sets[] = 'in_footer = ?';
            $args[] = $body['inFooter'] ? 1 : 0;
        }
        if (array_key_exists('menuOrder', $body)) {
            $sets[] = 'menu_order = ?';
            $args[] = avo_int($body['menuOrder'], -1000, 1000, 'menuOrder', 'Use a whole number.');
        }
        if (array_key_exists('noindex', $body)) {
            $sets[] = 'noindex = ?';
            $args[] = $body['noindex'] ? 1 : 0;
        }
        if (!$sets) return [];
        $sets[] = 'updated_at = ?';
        $args[] = avo_now();
        $args[] = $id;
        db_exec('UPDATE pages SET ' . implode(', ', $sets) . ' WHERE id = ?', $args);
        if ($live || $row['published_at'] !== null) avo_bump_version();
        return ['urls' => $urls, 'republish' => $live || $row['published_at'] !== null];
    });
    if ($urls) {
        if ($urls['republish']) avo_after_publish($urls['urls']);
    }
    avo_audit($s['user_id'], 'page.patch', 'page:' . $id, implode(',', array_keys($body)));
    $row = avo_page_row($id);
    return avo_page_list_item($row) + ['createdAt' => avo_iso((int) $row['created_at']), 'version' => (int) $row['draft_version']];
}

function avo_page_duplicate(array $s, int $id): array
{
    $newId = db_tx(function () use ($s, $id) {
        $row = avo_page_row($id, false);
        $doc = json_decode((string) $row['draft_json'], true);
        foreach (AVO_LANGS as $l) {
            if (($doc['title'][$l] ?? '') !== '') $doc['title'][$l] .= $l === 'ms' ? ' (salinan)' : ' (copy)';
        }
        $base = substr((string) $row['slug'], 0, 70) . '-copy';
        $slug = $base;
        for ($n = 2; db_one('SELECT id FROM pages WHERE slug = ?', [$slug]) || avo_slug_problem($slug); $n++) {
            $slug = $base . '-' . $n;
        }
        $now = avo_now();
        db_exec('DELETE FROM redirects WHERE from_slug = ?', [$slug]);
        db_exec('DELETE FROM gone WHERE slug = ?', [$slug]);
        db_exec("INSERT INTO pages(slug,status,langs_json,noindex,draft_json,draft_version,created_at,updated_at,updated_by)
                 VALUES(?,'draft','[]',?,?,1,?,?,?)", [$slug, $row['noindex'], json_encode($doc, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $now, $now, $s['user_id']]);
        return (int) db()->lastInsertId();
    });
    avo_audit($s['user_id'], 'page.duplicate', 'page:' . $newId, 'from page:' . $id);
    return avo_page_list_item(avo_page_row($newId));
}

function avo_page_trash(array $s, int $id): array
{
    $info = db_tx(function () use ($id) {
        $row = avo_page_row($id, false);
        db_exec('UPDATE pages SET deleted_at = ?, in_header = 0, in_footer = 0 WHERE id = ?', [avo_now(), $id]);
        avo_bump_version();
        return $row['status'] === 'published' ? avo_page_urls((string) $row['slug'], json_decode((string) $row['langs_json'], true) ?: []) : [];
    });
    avo_after_publish($info);
    avo_audit($s['user_id'], 'page.trash', 'page:' . $id);
    return ['ok' => true];
}

function avo_page_restore(array $s, int $id): array
{
    $urls = db_tx(function () use ($id) {
        $row = avo_page_row($id);
        if ($row['deleted_at'] === null) return [];
        db_exec('UPDATE pages SET deleted_at = NULL, updated_at = ? WHERE id = ?', [avo_now(), $id]);
        avo_bump_version();
        return $row['status'] === 'published' ? avo_page_urls((string) $row['slug'], json_decode((string) $row['langs_json'], true) ?: []) : [];
    });
    avo_after_publish($urls);
    avo_audit($s['user_id'], 'page.restore', 'page:' . $id);
    return avo_page_list_item(avo_page_row($id));
}

/** Permanently delete a trashed page; its address keeps answering 410 Gone. */
function avo_page_purge(array $s, int $id): array
{
    db_tx(function () use ($id) {
        $row = avo_page_row($id);
        if ($row['deleted_at'] === null) avo_fail(409, 'not_trashed', 'Move the page to the trash first.');
        if ($row['published_at'] !== null) {
            db_exec('INSERT OR REPLACE INTO gone(slug, at) VALUES(?, ?)', [$row['slug'], avo_now()]);
        }
        db_exec('DELETE FROM page_revisions WHERE page_id = ?', [$id]);
        db_exec('DELETE FROM pages WHERE id = ?', [$id]);
        avo_bump_version();
    });
    avo_after_publish();
    avo_audit($s['user_id'], 'page.purge', 'page:' . $id);
    return ['ok' => true];
}

function avo_page_revisions(int $id): array
{
    avo_page_row($id);
    $rows = db_all('SELECT id, created_at, user_id, note, langs_json FROM page_revisions WHERE page_id = ? ORDER BY id DESC LIMIT 100', [$id]);
    return array_map(fn ($r) => [
        'id' => (int) $r['id'],
        'createdAt' => avo_iso((int) $r['created_at']),
        'userName' => avo_user_name($r['user_id'] !== null ? (int) $r['user_id'] : null),
        'note' => $r['note'],
        'langs' => json_decode((string) $r['langs_json'], true) ?: [],
    ], $rows);
}

/** A revision becomes the draft (never published directly). */
function avo_page_revision_restore(array $s, int $id, int $rid): array
{
    return db_tx(function () use ($s, $id, $rid) {
        avo_page_row($id, false);
        $rev = db_one('SELECT * FROM page_revisions WHERE id = ? AND page_id = ?', [$rid, $id]);
        if (!$rev) avo_fail(404, 'not_found', 'This version no longer exists.');
        db_exec('UPDATE pages SET draft_json = ?, draft_version = draft_version + 1, updated_at = ?, updated_by = ? WHERE id = ?', [
            $rev['json'], avo_now(), $s['user_id'], $id,
        ]);
        avo_audit($s['user_id'], 'page.revision.restore', 'page:' . $id, 'revision:' . $rid);
        return ['version' => (int) avo_page_row($id)['draft_version'], 'doc' => json_decode((string) $rev['json'], true)];
    });
}
