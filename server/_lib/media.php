<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

const AVO_MEDIA_MAX_BYTES = 15 * 1024 * 1024;
const AVO_MEDIA_MAX_PIXELS = 40_000_000;
const AVO_MEDIA_WIDTHS = [480, 960, 1600, 2400];
const AVO_MEDIA_TYPES = [
    'image/jpeg' => IMAGETYPE_JPEG,
    'image/png' => IMAGETYPE_PNG,
    'image/webp' => IMAGETYPE_WEBP,
    'image/gif' => IMAGETYPE_GIF,
];

/** '16M' → bytes; -1 / 0 → 0 (unlimited). */
function avo_ini_bytes(string $v): int
{
    $v = trim($v);
    if ($v === '' || $v === '-1') return 0;
    $n = (int) $v;
    return match (strtolower(substr($v, -1))) { 'g' => $n << 30, 'm' => $n << 20, 'k' => $n << 10, default => $n };
}

function avo_uploads_dir(): string
{
    return AVO_DOCROOT . '/uploads';
}

/** Uploaded files are never executed, whatever their name (spec §9). */
function avo_uploads_htaccess(): void
{
    $file = avo_uploads_dir() . '/.htaccess';
    if (is_file($file)) return;
    @mkdir(avo_uploads_dir(), 0755, true);
    $rules = <<<'HT'
# Written by the CMS on the first upload. Nothing under /uploads is ever executed.
Options -Indexes -ExecCGI
RemoveHandler .php .phtml .php3 .php4 .php5 .php7 .php8 .phar .pl .py .cgi .shtml
RemoveType .php .phtml .php3 .php4 .php5 .php7 .php8 .phar
<FilesMatch "(?i)\.(php\d?|phtml|phar|pl|py|cgi|sh|shtml|html?|svg|js)$">
  Require all denied
</FilesMatch>
<IfModule mod_php.c>
  php_flag engine off
</IfModule>
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Cache-Control "public, max-age=31536000, immutable"
</IfModule>
HT;
    @file_put_contents($file, $rules);
}

/** Any alpha below 127 on a sampled grid → the image really uses transparency. */
function avo_image_has_alpha(GdImage $img): bool
{
    $w = imagesx($img);
    $h = imagesy($img);
    $stepX = max(1, intdiv($w, 120));
    $stepY = max(1, intdiv($h, 120));
    for ($y = 0; $y < $h; $y += $stepY) {
        for ($x = 0; $x < $w; $x += $stepX) {
            if (((imagecolorat($img, $x, $y) >> 24) & 0x7F) > 0) return true;
        }
    }
    foreach ([[0, 0], [$w - 1, 0], [0, $h - 1], [$w - 1, $h - 1]] as [$x, $y]) {
        if (((imagecolorat($img, $x, $y) >> 24) & 0x7F) > 0) return true;
    }
    return false;
}

function avo_media_usage(int $id): array
{
    $used = [];
    foreach (db_all('SELECT id, slug, draft_json, published_json, deleted_at FROM pages') as $p) {
        $ids = avo_doc_media_ids(json_decode((string) $p['draft_json'], true) ?: []);
        if ($p['published_json'] !== null) $ids = array_merge($ids, avo_doc_media_ids(json_decode((string) $p['published_json'], true) ?: []));
        if (in_array($id, $ids, true)) $used[] = 'Page: ' . $p['slug'] . ($p['deleted_at'] !== null ? ' (in trash)' : '');
    }
    $spots = avo_image_spots();
    $seen = [];
    foreach ([
        db_all("SELECT key, published_value AS v FROM overrides WHERE kind = 'image'"),
        db_all("SELECT key, value AS v FROM override_drafts WHERE kind = 'image' AND value IS NOT NULL"),
    ] as $rows) {
        foreach ($rows as $r) {
            $v = json_decode((string) $r['v'], true);
            if (is_array($v) && (int) ($v['media'] ?? 0) === $id && !isset($seen[$r['key']])) {
                $seen[$r['key']] = true;
                $used[] = $spots[$r['key']]['label'] ?? $r['key'];
            }
        }
    }
    return $used;
}

/** Widest share-image (og:image) copy. JPEG, because WhatsApp and some apps show no preview for WebP. */
const AVO_MEDIA_OG_WIDTH = 1200;

/**
 * Write <file_base>-og.jpg (at most 1200 px wide, q85, transparency flattened onto white) and
 * return {w,h}, or null when GD cannot write it (the share image then falls back to the WebP).
 */
function avo_media_write_og(GdImage $img, string $base): ?array
{
    $w = imagesx($img);
    $h = imagesy($img);
    $tw = min(AVO_MEDIA_OG_WIDTH, $w);
    $th = max(1, (int) round($h * $tw / $w));
    $out = imagecreatetruecolor($tw, $th);
    imagefill($out, 0, 0, imagecolorallocate($out, 255, 255, 255));
    imagealphablending($out, true);
    imagecopyresampled($out, $img, 0, 0, 0, 0, $tw, $th, $w, $h);
    $path = avo_uploads_dir() . '/cms/' . $base . '-og.jpg';
    if (!@imagejpeg($out, $path, 85)) {
        @unlink($path);
        avo_log('error', 'media og jpeg failed for ' . $base);
        return null;
    }
    return ['w' => $tw, 'h' => $th];
}

/** A photo uploaded before share copies existed gets its JPEG once, made from its widest WebP. */
function avo_media_ensure_og(array $row): array
{
    if (!array_key_exists('og_json', $row) || !empty($row['og_json'])) return $row;
    $widths = json_decode((string) $row['widths_json'], true) ?: [];
    if (!$widths) return $row;
    $src = avo_uploads_dir() . '/cms/' . $row['file_base'] . '-' . (int) max($widths) . '.webp';
    $img = is_file($src) ? @imagecreatefromwebp($src) : false;
    if (!$img) return $row;
    $og = avo_media_write_og($img, (string) $row['file_base']);
    if (!$og) return $row;
    $row['og_json'] = json_encode($og);
    db_exec('UPDATE media SET og_json = ? WHERE id = ?', [$row['og_json'], (int) $row['id']]);
    return $row;
}

function avo_media_out(array $row, bool $withUsage = true): array
{
    $ref = avo_media_ref($row);
    $out = $ref + [
        'originalName' => (string) $row['original_name'],
        'bytes' => (int) $row['bytes'],
        'createdAt' => avo_iso((int) $row['created_at']),
        'hasAlpha' => (bool) $row['has_alpha'],
    ];
    if ($withUsage) $out['usedIn'] = avo_media_usage((int) $row['id']);
    return $out;
}

function avo_media_list(): array
{
    return array_map('avo_media_out', db_all('SELECT * FROM media ORDER BY id DESC'));
}

/** POST /api/media (multipart `file`, optional altEn/altMs) */
function avo_media_upload(array $s): array
{
    $postMax = avo_ini_bytes((string) ini_get('post_max_size'));
    if ($postMax > 0 && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > $postMax) {
        avo_fail(413, 'too_large', 'This file is larger than the server accepts (' . ini_get('post_max_size') . '). Use a smaller photo.');
    }
    $f = $_FILES['file'] ?? null;
    if (!is_array($f) || is_array($f['error'] ?? null)) avo_fail(400, 'invalid', 'Choose an image to upload.');
    if ((int) $f['size'] > AVO_MEDIA_MAX_BYTES) avo_fail(413, 'too_large', 'This file is too large (15 MB maximum).');
    if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE) {
        avo_fail(413, 'too_large', 'This file is larger than the server accepts (' . ini_get('upload_max_filesize') . '). Use a smaller photo.');
    }
    if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) {
        avo_fail(400, 'upload_failed', 'The upload did not arrive completely. Try again.');
    }
    $tmp = $f['tmp_name'];
    $notImage = 'This file is not a photo. Upload a JPEG, PNG, WebP or GIF image.';
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($tmp);
    if (!isset(AVO_MEDIA_TYPES[$mime])) avo_fail(415, 'not_image', $notImage);
    $info = @getimagesize($tmp);
    if (!$info || ($info[2] ?? null) !== AVO_MEDIA_TYPES[$mime]) avo_fail(415, 'not_image', $notImage);
    [$w, $h] = $info;
    if ($w < 1 || $h < 1) avo_fail(415, 'not_image', $notImage);
    if ($w * $h > AVO_MEDIA_MAX_PIXELS) avo_fail(413, 'too_large', 'This photo has too many pixels (40 megapixels maximum). Resize it and try again.');
    // GD holds the decoded bitmap (4 bytes/pixel) plus one resampled copy at a time.
    $need = (int) ($w * $h * 4 * 2.2) + 32 * 1024 * 1024;
    $limit = avo_ini_bytes((string) ini_get('memory_limit'));
    if ($limit > 0 && memory_get_usage() + $need > $limit) {
        @ini_set('memory_limit', (string) (memory_get_usage() + $need));
        $limit = avo_ini_bytes((string) ini_get('memory_limit'));
        if ($limit > 0 && memory_get_usage() + $need > $limit) {
            avo_fail(413, 'too_large', 'This photo is too big for the server to convert. Resize it to at most 2400 pixels wide and try again.');
        }
    }

    $img = match ($mime) {
        'image/jpeg' => @imagecreatefromjpeg($tmp),
        'image/png' => @imagecreatefrompng($tmp),
        'image/webp' => @imagecreatefromwebp($tmp),
        'image/gif' => @imagecreatefromgif($tmp),
    };
    if (!$img) avo_fail(415, 'not_image', 'This photo could not be read. Save it again as JPEG or PNG and retry.');
    if (!imageistruecolor($img)) imagepalettetotruecolor($img);
    if ($mime === 'image/jpeg' && function_exists('exif_read_data')) {
        $exif = @exif_read_data($tmp);
        $rot = match ((int) ($exif['Orientation'] ?? 1)) { 3 => 180, 6 => -90, 8 => 90, default => 0 };
        if ($rot !== 0) {
            $r = imagerotate($img, $rot, 0);
            if ($r) {
                $img = $r;
                $w = imagesx($img);
                $h = imagesy($img);
            }
        }
    }
    imagealphablending($img, false);
    imagesavealpha($img, true);
    $hasAlpha = $mime !== 'image/jpeg' && avo_image_has_alpha($img);

    $widths = array_values(array_filter(AVO_MEDIA_WIDTHS, fn ($x) => $x <= $w));
    // Keep the full resolution too: a 928 px photo must not top out at its 480 px copy (blurry
    // when shown in a wide column). Skipped when the largest step is within 10 % of the original.
    if (!$widths || $w > end($widths) * 1.1) $widths[] = $w;
    $sub = gmdate('Y/m');
    $base = $sub . '/' . bin2hex(random_bytes(10));
    $dir = avo_uploads_dir() . '/cms/' . $sub;
    if (!is_dir($dir) && !@mkdir($dir, 0755, true) && !is_dir($dir)) {
        avo_fail(500, 'storage', 'The server could not store the photo. Tell the developer (uploads folder not writable).');
    }
    avo_uploads_htaccess();
    $bytes = 0;
    $written = [];
    try {
        foreach ($widths as $tw) {
            $th = max(1, (int) round($h * $tw / $w));
            if ($tw === $w) {
                $out = $img;
            } else {
                $out = imagecreatetruecolor($tw, $th);
                imagealphablending($out, false);
                imagesavealpha($out, true);
                imagefill($out, 0, 0, imagecolorallocatealpha($out, 0, 0, 0, 127));
                imagecopyresampled($out, $img, 0, 0, 0, 0, $tw, $th, $w, $h);
            }
            $path = avo_uploads_dir() . '/cms/' . $base . '-' . $tw . '.webp';
            if (!imagewebp($out, $path, 82)) throw new RuntimeException('imagewebp failed');
            $written[] = $path;
            $bytes += (int) filesize($path);
        }
    } catch (Throwable $e) {
        foreach ($written as $p) @unlink($p);
        avo_log('error', 'media encode failed: ' . $e->getMessage());
        avo_fail(500, 'encode_failed', 'The photo could not be converted. Try another file.');
    }
    $og = avo_media_write_og($img, $base);
    if ($og) $bytes += (int) filesize(avo_uploads_dir() . '/cms/' . $base . '-og.jpg');
    $orig = mb_substr(basename(avo_clean_text((string) ($f['name'] ?? 'image'))), 0, 200);
    $altEn = is_string($_POST['altEn'] ?? null) ? mb_substr(trim(avo_clean_text($_POST['altEn'])), 0, 300) : '';
    $altMs = is_string($_POST['altMs'] ?? null) ? mb_substr(trim(avo_clean_text($_POST['altMs'])), 0, 300) : '';
    $id = db_tx(function () use ($base, $orig, $w, $h, $widths, $bytes, $altEn, $altMs, $hasAlpha, $og, $s) {
        $id = db_next_id('media');
        db_exec('INSERT INTO media(id,file_base,original_name,width,height,widths_json,bytes,alt_en,alt_ms,has_alpha,og_json,created_at,user_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [
            $id, $base, $orig, $w, $h, json_encode($widths), $bytes, $altEn, $altMs, $hasAlpha ? 1 : 0, $og ? json_encode($og) : null, avo_now(), $s['user_id'],
        ]);
        return $id;
    });
    avo_audit($s['user_id'], 'media.upload', 'media:' . $id, $orig);
    return avo_media_out(db_one('SELECT * FROM media WHERE id = ?', [$id]));
}

function avo_media_update(array $s, int $id, array $body): array
{
    if (!db_one('SELECT id FROM media WHERE id = ?', [$id])) avo_fail(404, 'not_found', 'This photo no longer exists.');
    $altEn = avo_str($body, 'altEn', 300, false, 'English description');
    $altMs = avo_str($body, 'altMs', 300, false, 'Malay description');
    db_tx(function () use ($id, $altEn, $altMs) {
        db_exec('UPDATE media SET alt_en = ?, alt_ms = ? WHERE id = ?', [$altEn, $altMs, $id]);
        avo_mark_dependants('media:' . $id);
        avo_bump_version();
    });
    avo_after_publish();
    avo_audit($s['user_id'], 'media.update', 'media:' . $id);
    return avo_media_out(db_one('SELECT * FROM media WHERE id = ?', [$id]));
}

function avo_media_delete(array $s, int $id): array
{
    $row = db_one('SELECT * FROM media WHERE id = ?', [$id]);
    if (!$row) avo_fail(404, 'not_found', 'This photo no longer exists.');
    $used = avo_media_usage($id);
    if ($used) {
        avo_fail(409, 'in_use', 'This photo is still used: ' . implode('; ', $used) . '. Replace it there first.');
    }
    db_exec('DELETE FROM media WHERE id = ?', [$id]);
    foreach (json_decode((string) $row['widths_json'], true) ?: [] as $w) {
        @unlink(avo_uploads_dir() . '/cms/' . $row['file_base'] . '-' . (int) $w . '.webp');
    }
    @unlink(avo_uploads_dir() . '/cms/' . $row['file_base'] . '-og.jpg');
    avo_audit($s['user_id'], 'media.delete', 'media:' . $id, (string) $row['original_name']);
    return ['ok' => true];
}
