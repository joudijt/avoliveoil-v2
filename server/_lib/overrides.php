<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/*
 * Existing-page text + photo overrides (spec §6, §11, §13.2, §13.4).
 * Drafts are per user (override_drafts); publishing moves only the keys sent from the
 * current user's drafts into `overrides`. A draft value of NULL means "reset to default".
 */

const AVO_TEXT_MAX = 2000;

/** Validate one text value against its default definition. Returns the normalised value. */
function avo_validate_text_value(string $key, array $def, mixed $value): mixed
{
    $fail = fn (string $m) => avo_fail(400, 'invalid', $m, [$key => $m]);
    $type = $def['t'] ?? 'string';
    if ($type === 'number') {
        if (is_string($value) && preg_match('/^\s*\d[\d,]*\s*$/', $value)) $value = (int) str_replace(',', '', $value);
        if (!is_int($value) && !(is_float($value) && floor($value) === $value)) $fail('Enter a whole number, for example 500000.');
        $value = (int) $value;
        if ($value < 0 || $value > 1_000_000_000) $fail('Enter a number between 0 and 1,000,000,000.');
        return $value;
    }
    if ($type === 'words') {
        if (!is_array($value) || !array_is_list($value) || count($value) < 1 || count($value) > 8) $fail('The headline needs 1 to 8 words.');
        $out = [];
        foreach ($value as $w) {
            if (!is_array($w) || !is_string($w['text'] ?? null)) $fail('A headline word is damaged. Reopen the headline editor.');
            $text = trim(avo_clean_text($w['text']));
            if ($text === '') $fail('A headline word is empty. Remove it or type a word.');
            if (mb_strlen($text) > 30) $fail('Each headline word can have at most 30 characters.');
            if (str_contains($text, '{{') || str_contains($text, '}}') || str_contains($text, '$t(')) $fail('Remove the curly braces {{ }} from the headline.');
            $out[] = ['text' => $text, 'gold' => (bool) ($w['gold'] ?? false)];
        }
        return $out;
    }
    if (!is_string($value)) $fail('Enter text.');
    $value = trim(avo_clean_text($value));
    if ($value === '') $fail('This text cannot be empty. Use "Reset" to go back to the original text.');
    if (mb_strlen($value) > AVO_TEXT_MAX) $fail('This text is too long (max ' . AVO_TEXT_MAX . ' characters).');
    if (str_contains($value, '$t(')) $fail('Remove "$t(" from the text.');
    $tokens = $def['tokens'] ?? [];
    if ($tokens) {
        preg_match_all('/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/', $value, $m);
        $found = $m[1];
        $stray = (string) preg_replace('/\{\{\s*[A-Za-z0-9_]+\s*\}\}/', '', $value);
        if (str_contains($stray, '{{') || str_contains($stray, '}}')) $fail('The text has a broken {{…}} placeholder. Each one must look like {{' . $tokens[0] . '}}.');
        foreach ($tokens as $t) {
            if (!in_array($t, $found, true)) $fail('Keep the placeholder {{' . $t . '}} in the text — it is filled in automatically.');
        }
        foreach ($found as $t) {
            if (!in_array($t, $tokens, true)) $fail('The placeholder {{' . $t . '}} is not available here. Remove it.');
        }
        return $value;
    }
    if (str_contains($value, '{{') || str_contains($value, '}}')) $fail('Remove the curly braces {{ }} from the text.');
    return $value;
}

function avo_validate_image_value(string $key, mixed $value): array
{
    $fail = fn (string $m) => avo_fail(400, 'invalid', $m, [$key => $m]);
    if (!is_array($value) || !is_int($value['media'] ?? null)) $fail('Choose a photo.');
    if (!db_one('SELECT id FROM media WHERE id = ?', [$value['media']])) $fail('This photo was deleted. Choose another one.');
    $alt = is_string($value['alt'] ?? null) ? trim(avo_clean_text($value['alt'])) : '';
    if (mb_strlen($alt) > 300) $fail('The photo description is too long (max 300 characters).');
    $out = ['media' => $value['media'], 'alt' => $alt];
    if (isset($value['focal'])) {
        $x = $value['focal']['x'] ?? null;
        $y = $value['focal']['y'] ?? null;
        if (!is_numeric($x) || !is_numeric($y) || $x < 0 || $x > 100 || $y < 0 || $y > 100) $fail('The focus point is invalid. Click the photo again to set it.');
        $out['focal'] = ['x' => avo_num(round((float) $x, 2)), 'y' => avo_num(round((float) $y, 2))];
    }
    return $out;
}

/** PUT /api/site/overrides {lang, items:[{key,kind,value|null}]} — saves the current user's drafts. */
function avo_overrides_save(array $s, array $body): array
{
    $lang = $body['lang'] ?? null;
    if (!in_array($lang, AVO_LANGS, true)) avo_fail(400, 'invalid', 'Choose English or Malay.');
    $items = $body['items'] ?? null;
    if (!is_array($items) || !array_is_list($items) || count($items) > 500) avo_fail(400, 'invalid', 'Nothing to save.');
    $defaults = avo_defaults($lang);
    $spots = avo_image_spots();
    $rows = [];
    foreach ($items as $item) {
        $key = is_string($item['key'] ?? null) ? $item['key'] : '';
        $kind = ($item['kind'] ?? 'text') === 'image' ? 'image' : 'text';
        $value = $item['value'] ?? null;
        if ($kind === 'image') {
            if (!isset($spots[$key])) avo_fail(400, 'unknown_key', 'This photo spot does not exist any more. Reload the page.', [$key => 'Unknown photo spot.']);
            $rows[] = [$key, $kind, $value === null ? null : avo_validate_image_value($key, $value)];
            continue;
        }
        $def = $defaults[$key] ?? null;
        if (!$def) avo_fail(400, 'unknown_key', 'This text does not exist any more. Reload the page.', [$key => 'Unknown text.']);
        if (empty($def['editable'])) avo_fail(400, 'not_editable', 'This text is part of the page structure and cannot be edited.', [$key => 'Not editable.']);
        $rows[] = [$key, $kind, $value === null ? null : avo_validate_text_value($key, $def, $value)];
    }
    db_tx(function () use ($s, $lang, $rows) {
        $now = avo_now();
        foreach ($rows as [$key, $kind, $value]) {
            // "Back to the original" of something never published is no change at all: drop the
            // draft instead of keeping a pending reset (it showed as a change to publish).
            if ($value === null && !db_one('SELECT 1 FROM overrides WHERE lang = ? AND key = ?', [$lang, $key])) {
                db_exec('DELETE FROM override_drafts WHERE lang = ? AND key = ? AND user_id = ?', [$lang, $key, $s['user_id']]);
                continue;
            }
            db_exec('INSERT INTO override_drafts(lang,key,user_id,kind,value,updated_at) VALUES(?,?,?,?,?,?)
                     ON CONFLICT(lang,key,user_id) DO UPDATE SET kind = excluded.kind, value = excluded.value, updated_at = excluded.updated_at', [
                $lang, $key, $s['user_id'], $kind, $value === null ? null : json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $now,
            ]);
        }
    });
    return ['ok' => true, 'saved' => count($rows)];
}

/** POST /api/site/publish {keys:[{lang,key}]} (or legacy {lang?} = all of my drafts). */
function avo_overrides_publish(array $s, array $body): array
{
    $keys = [];
    if (is_array($body['keys'] ?? null)) {
        foreach ($body['keys'] as $k) {
            if (is_array($k) && in_array($k['lang'] ?? null, AVO_LANGS, true) && is_string($k['key'] ?? null)) $keys[] = [$k['lang'], $k['key']];
        }
    } else {
        $lang = $body['lang'] ?? null;
        $sql = 'SELECT lang, key FROM override_drafts WHERE user_id = ?' . (in_array($lang, AVO_LANGS, true) ? ' AND lang = ?' : '');
        foreach (db_all($sql, in_array($lang, AVO_LANGS, true) ? [$s['user_id'], $lang] : [$s['user_id']]) as $r) $keys[] = [$r['lang'], $r['key']];
    }
    if (!$keys) avo_fail(400, 'nothing_to_publish', 'There are no changes to publish.');
    $res = db_tx(function () use ($s, $keys) {
        $now = avo_now();
        db_exec('INSERT INTO site_publishes(user_id, created_at) VALUES(?, ?)', [$s['user_id'], $now]);
        $pid = (int) db()->lastInsertId();
        $done = [];
        foreach ($keys as [$lang, $key]) {
            $draft = db_one('SELECT * FROM override_drafts WHERE lang = ? AND key = ? AND user_id = ?', [$lang, $key, $s['user_id']]);
            if (!$draft) continue;
            $old = db_one('SELECT * FROM overrides WHERE lang = ? AND key = ?', [$lang, $key]);
            $oldValue = $old['published_value'] ?? null;
            if ($draft['value'] === null) {
                db_exec('DELETE FROM overrides WHERE lang = ? AND key = ?', [$lang, $key]);
            } else {
                db_exec('INSERT INTO overrides(lang,key,kind,published_value,updated_at,updated_by) VALUES(?,?,?,?,?,?)
                         ON CONFLICT(lang,key) DO UPDATE SET kind = excluded.kind, published_value = excluded.published_value,
                         updated_at = excluded.updated_at, updated_by = excluded.updated_by', [$lang, $key, $draft['kind'], $draft['value'], $now, $s['user_id']]);
            }
            db_exec('INSERT INTO override_revisions(publish_id,lang,key,kind,old_value,new_value,created_at,user_id) VALUES(?,?,?,?,?,?,?,?)', [
                $pid, $lang, $key, $draft['kind'], $oldValue, $draft['value'], $now, $s['user_id'],
            ]);
            db_exec('DELETE FROM override_drafts WHERE lang = ? AND key = ? AND user_id = ?', [$lang, $key, $s['user_id']]);
            $done[] = ['lang' => $lang, 'key' => $key, 'kind' => $draft['kind']];
        }
        if (!$done) avo_fail(400, 'nothing_to_publish', 'There are no saved changes for these texts. Save them first.');
        avo_overrides_mark_dirty($done);
        avo_bump_version();
        return ['publishId' => $pid, 'items' => $done];
    });
    avo_after_publish(avo_override_urls($res['items']));
    avo_audit($s['user_id'], 'site.publish', 'publish:' . $res['publishId'], (string) count($res['items']));
    return ['publishId' => $res['publishId'], 'published' => count($res['items'])];
}

/** CMS pages that show site text / product names / photos must re-render (spec §13.3). */
function avo_overrides_mark_dirty(array $items): void
{
    avo_mark_dependants('text');
}

/** URLs of existing pages whose key groups contain a changed key (for IndexNow); global keys are skipped. */
function avo_override_urls(array $items): array
{
    $urls = [];
    foreach (avo_page_keys() as $pageKey => $def) {
        if ($pageKey === 'global' || !is_array($def)) continue;
        $keys = [];
        foreach ($def['groups'] ?? [] as $g) foreach ($g['keys'] ?? [] as $k) $keys[$k] = true;
        foreach ($def['images'] ?? [] as $k) $keys[$k] = true;
        $paths = isset($def['paths']) && is_array($def['paths']) ? $def['paths'] : [(string) ($def['path'] ?? '')];
        foreach ($items as $it) {
            if (!isset($keys[$it['key']])) continue;
            foreach ($paths as $p) $urls[] = avo_page_url($it['lang'], (string) $p);
        }
    }
    return array_values(array_unique($urls));
}

/** POST /api/site/discard {keys?:[{lang,key}], lang?} — drop my drafts. */
function avo_overrides_discard(array $s, array $body): array
{
    if (is_array($body['keys'] ?? null)) {
        $n = 0;
        foreach ($body['keys'] as $k) {
            if (!is_array($k) || !is_string($k['key'] ?? null) || !in_array($k['lang'] ?? null, AVO_LANGS, true)) continue;
            $n += db_exec('DELETE FROM override_drafts WHERE lang = ? AND key = ? AND user_id = ?', [$k['lang'], $k['key'], $s['user_id']]);
        }
    } elseif (in_array($body['lang'] ?? null, AVO_LANGS, true)) {
        $n = db_exec('DELETE FROM override_drafts WHERE lang = ? AND user_id = ?', [$body['lang'], $s['user_id']]);
    } else {
        $n = db_exec('DELETE FROM override_drafts WHERE user_id = ?', [$s['user_id']]);
    }
    return ['ok' => true, 'discarded' => $n];
}

/**
 * POST /api/site/discard-other {userId, lang, key} — delete ANOTHER person's unpublished change
 * (e.g. someone who left: their drafts would otherwise stay "waiting" forever). Audited.
 */
function avo_overrides_discard_other(array $s, array $body): array
{
    $userId = $body['userId'] ?? null;
    $lang = $body['lang'] ?? null;
    $key = $body['key'] ?? null;
    if (!is_int($userId) || !in_array($lang, AVO_LANGS, true) || !is_string($key) || $key === '') {
        avo_fail(400, 'invalid', 'Choose which change to discard.');
    }
    $row = db_one('SELECT kind, value FROM override_drafts WHERE lang = ? AND key = ? AND user_id = ?', [$lang, $key, $userId]);
    if (!$row) avo_fail(404, 'not_found', 'This change was already published or discarded. Reload the page.');
    db_exec('DELETE FROM override_drafts WHERE lang = ? AND key = ? AND user_id = ?', [$lang, $key, $userId]);
    avo_audit($s['user_id'], 'site.draft.discard_other', 'user:' . $userId, $lang . ':' . $key . ' ' . mb_substr((string) $row['value'], 0, 300));
    return ['ok' => true];
}

function avo_decode_value(?string $json): mixed
{
    return $json === null ? null : json_decode($json, true);
}

/** GET /api/site/keys?page=&lang= → SiteKeyItem[] (texts, then photo spots). */
function avo_site_keys(array $s, string $page, string $lang): array
{
    if (!in_array($lang, AVO_LANGS, true)) avo_fail(400, 'invalid', 'Choose English or Malay.');
    $defaults = avo_defaults($lang);
    $pages = avo_page_keys();
    $spots = avo_image_spots();
    if ($page !== '') {
        if (!isset($pages[$page])) avo_fail(404, 'not_found', 'This page is not editable.');
        $keys = [];
        foreach ($pages[$page]['groups'] ?? [] as $g) foreach ($g['keys'] ?? [] as $k) $keys[] = $k;
        // The header and footer are on every page and clickable in its preview, so their texts
        // belong to every page's list (and to its Publish), not only to "Header & footer".
        if ($page !== 'global') foreach ($pages['global']['groups'] ?? [] as $g) foreach ($g['keys'] ?? [] as $k) $keys[] = $k;
        $imageKeys = $pages[$page]['images'] ?? [];
    } else {
        $keys = array_keys($defaults);
        $imageKeys = array_keys($spots);
    }
    $published = [];
    foreach (db_all('SELECT key, published_value FROM overrides WHERE lang = ?', [$lang]) as $r) $published[$r['key']] = avo_decode_value($r['published_value']);
    $mine = [];
    foreach (db_all('SELECT key, value, updated_at FROM override_drafts WHERE lang = ? AND user_id = ?', [$lang, $s['user_id']]) as $r) $mine[$r['key']] = $r;
    $usage = avo_key_usage();
    $cache = [];
    $out = [];
    foreach (array_values(array_unique($keys)) as $key) {
        $def = $defaults[$key] ?? null;
        if (!$def) continue;
        $item = [
            'key' => $key,
            'type' => $def['t'] ?? 'string',
            'default' => avo_default_display($def),
            'draft' => isset($mine[$key]) ? avo_decode_value($mine[$key]['value']) : null,
            'hasDraft' => isset($mine[$key]),
            'published' => $published[$key] ?? null,
            'usage' => $usage[$key] ?? [],
            'editable' => !empty($def['editable']),
            'draftAt' => isset($mine[$key]) ? avo_iso((int) $mine[$key]['updated_at']) : null,
        ];
        if (!empty($def['tokens'])) {
            $item['template'] = $def['v'];
            $item['tokens'] = $def['tokens'];
        }
        $out[] = $item;
    }
    foreach (array_values(array_unique($imageKeys)) as $key) {
        if (!isset($spots[$key])) continue;
        $out[] = [
            'key' => $key,
            'type' => 'image',
            'default' => $spots[$key]['default'] ?? null,
            'draft' => isset($mine[$key]) ? avo_expand_image(avo_decode_value($mine[$key]['value']), $cache) : null,
            'hasDraft' => isset($mine[$key]),
            'published' => isset($published[$key]) ? avo_expand_image($published[$key], $cache) : null,
            'usage' => [$spots[$key]['label'] ?? $key],
            'editable' => true,
            'label' => $spots[$key]['label'] ?? $key,
            'needsAlpha' => (bool) ($spots[$key]['needsAlpha'] ?? false),
            'draftAt' => isset($mine[$key]) ? avo_iso((int) $mine[$key]['updated_at']) : null,
        ];
    }
    return $out;
}

/** GET /api/site/text → published text, both languages, filtered (RenderContext.text). */
function avo_site_text(): array
{
    $ov = avo_published_overrides();
    return ['en' => (object) avo_filter_text($ov['text']['en'], 'en'), 'ms' => (object) avo_filter_text($ov['text']['ms'], 'ms')];
}

function avo_site_pending(): array
{
    return array_map(fn ($r) => [
        'lang' => $r['lang'],
        'key' => $r['key'],
        'kind' => $r['kind'],
        'updatedAt' => avo_iso((int) $r['updated_at']),
        'userId' => (int) $r['user_id'],
        'userName' => avo_user_name((int) $r['user_id']),
    ], db_all('SELECT * FROM override_drafts ORDER BY updated_at DESC'));
}

/** Overrides (published or drafted) whose key no longer exists or is no longer editable. */
function avo_site_orphans(): array
{
    $spots = avo_image_spots();
    $out = [];
    $check = function (array $r, string $source) use ($spots, &$out) {
        $orphan = $r['kind'] === 'image'
            ? !isset($spots[$r['key']])
            : (!isset(avo_defaults($r['lang'])[$r['key']]) || empty(avo_defaults($r['lang'])[$r['key']]['editable']));
        if ($orphan) {
            $out[] = ['lang' => $r['lang'], 'key' => $r['key'], 'value' => avo_decode_value($r['v']), 'updatedAt' => avo_iso((int) $r['updated_at']), 'source' => $source];
        }
    };
    foreach (db_all('SELECT lang, key, kind, published_value AS v, updated_at FROM overrides') as $r) $check($r, 'published');
    foreach (db_all('SELECT lang, key, kind, value AS v, updated_at FROM override_drafts') as $r) $check($r, 'draft');
    return $out;
}

function avo_site_revisions(): array
{
    $out = [];
    foreach (db_all('SELECT * FROM site_publishes ORDER BY id DESC LIMIT 100') as $p) {
        $items = db_all('SELECT lang, key FROM override_revisions WHERE publish_id = ? ORDER BY id', [$p['id']]);
        $out[] = [
            'publishId' => (int) $p['id'],
            'createdAt' => avo_iso((int) $p['created_at']),
            'userName' => avo_user_name($p['user_id'] !== null ? (int) $p['user_id'] : null),
            'note' => $p['note'],
            'items' => $items,
        ];
    }
    return $out;
}

/** Revert = publish the values that were live before that publish (recorded as a new publish). */
function avo_site_revert(array $s, int $publishId): array
{
    $res = db_tx(function () use ($s, $publishId) {
        $revs = db_all('SELECT * FROM override_revisions WHERE publish_id = ? ORDER BY id DESC', [$publishId]);
        if (!$revs) avo_fail(404, 'not_found', 'This version no longer exists.');
        $now = avo_now();
        db_exec('INSERT INTO site_publishes(user_id, created_at, note) VALUES(?, ?, ?)', [$s['user_id'], $now, 'revert of #' . $publishId]);
        $pid = (int) db()->lastInsertId();
        $items = [];
        $seen = [];
        foreach ($revs as $r) {
            $k = $r['lang'] . '|' . $r['key'];
            if (isset($seen[$k])) continue;
            $seen[$k] = true;
            $cur = db_one('SELECT published_value FROM overrides WHERE lang = ? AND key = ?', [$r['lang'], $r['key']]);
            if ($r['old_value'] === null) {
                db_exec('DELETE FROM overrides WHERE lang = ? AND key = ?', [$r['lang'], $r['key']]);
            } else {
                db_exec('INSERT INTO overrides(lang,key,kind,published_value,updated_at,updated_by) VALUES(?,?,?,?,?,?)
                         ON CONFLICT(lang,key) DO UPDATE SET kind = excluded.kind, published_value = excluded.published_value,
                         updated_at = excluded.updated_at, updated_by = excluded.updated_by', [$r['lang'], $r['key'], $r['kind'], $r['old_value'], $now, $s['user_id']]);
            }
            db_exec('INSERT INTO override_revisions(publish_id,lang,key,kind,old_value,new_value,created_at,user_id) VALUES(?,?,?,?,?,?,?,?)', [
                $pid, $r['lang'], $r['key'], $r['kind'], $cur['published_value'] ?? null, $r['old_value'], $now, $s['user_id'],
            ]);
            $items[] = ['lang' => $r['lang'], 'key' => $r['key'], 'kind' => $r['kind']];
        }
        avo_overrides_mark_dirty($items);
        avo_bump_version();
        return ['publishId' => $pid, 'items' => $items];
    });
    avo_after_publish(avo_override_urls($res['items']));
    avo_audit($s['user_id'], 'site.revert', 'publish:' . $publishId);
    return ['publishId' => $res['publishId']];
}

/** Draft overrides of one user layered over the published ones (edit mode, both languages). */
function avo_overrides_for_edit(int $userId, array $published): array
{
    $text = $published['text'];
    $images = $published['images'];
    $cache = [];
    foreach (db_all('SELECT * FROM override_drafts WHERE user_id = ?', [$userId]) as $d) {
        $lang = $d['lang'];
        if (!isset($text[$lang])) continue;
        $value = avo_decode_value($d['value']);
        if ($d['kind'] === 'image') {
            if ($value === null) {
                unset($images[$lang][$d['key']]);
            } elseif ($img = avo_expand_image($value, $cache)) {
                $images[$lang][$d['key']] = $img;
            }
        } elseif ($value === null) {
            unset($text[$lang][$d['key']]);
        } else {
            $text[$lang][$d['key']] = $value;
        }
    }
    return ['text' => $text, 'images' => $images];
}
