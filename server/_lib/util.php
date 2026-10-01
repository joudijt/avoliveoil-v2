<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/** JSON written into HTML <script> blocks and published files (spec §13.3). */
const AVO_JSON_SCRIPT = JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE;
/** JSON as the browser's JSON.stringify writes it — used to find default values inside JSON-LD. */
const AVO_JSON_JS = JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_LINE_TERMINATORS;

function avo_read_json(string $file): ?array
{
    if (!is_file($file)) return null;
    $raw = @file_get_contents($file);
    if (!is_string($raw)) return null;
    $data = json_decode($raw, true);
    return is_array($data) ? $data : null;
}

/** temp file in the same directory + rename(), so a reader never sees half a file */
function avo_write_atomic(string $file, string $content): void
{
    $dir = dirname($file);
    if (!is_dir($dir) && !@mkdir($dir, 0755, true) && !is_dir($dir)) {
        throw new RuntimeException('cannot create ' . $dir);
    }
    $tmp = $dir . '/.tmp-' . bin2hex(random_bytes(6));
    if (@file_put_contents($tmp, $content) !== strlen($content)) {
        @unlink($tmp);
        throw new RuntimeException('cannot write ' . $file);
    }
    if (!@rename($tmp, $file)) {
        @unlink($tmp);
        throw new RuntimeException('cannot replace ' . $file);
    }
}

function avo_now(): int
{
    return time();
}

function avo_iso(?int $ts): ?string
{
    return $ts === null ? null : gmdate('Y-m-d\TH:i:s\Z', $ts);
}

function avo_rrmdir(string $dir): void
{
    if (!is_dir($dir) || is_link($dir)) {
        if (is_link($dir) || is_file($dir)) @unlink($dir);
        return;
    }
    $items = @scandir($dir) ?: [];
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $path = $dir . '/' . $item;
        if (is_dir($path) && !is_link($path)) {
            avo_rrmdir($path);
        } else {
            @unlink($path);
        }
    }
    @rmdir($dir);
}

/** {en, ms} with string values, exactly the two keys (doc.ts isLoc). */
function avo_is_localized(mixed $v): bool
{
    return is_array($v) && !array_is_list($v) && count($v) === 2 && array_key_exists('en', $v) && array_key_exists('ms', $v);
}

function avo_loc(mixed $v, string $lang): string
{
    return (is_array($v) && isset($v[$lang]) && is_string($v[$lang])) ? $v[$lang] : '';
}

/** Strip ASCII control characters except tab/newline (stored text never needs them). */
function avo_clean_text(string $s, bool $multiline = false): string
{
    $s = str_replace("\r\n", "\n", $s);
    if (!$multiline) {
        $s = str_replace(["\n", "\r", "\t"], ' ', $s);
    }
    return (string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s);
}

function avo_hex_token(int $bytes = 32): string
{
    return bin2hex(random_bytes($bytes));
}

/** A JSON number as an int when it is whole (30 rather than 30.0 in the output). */
function avo_num(mixed $v): int|float
{
    $f = (float) $v;
    return floor($f) === $f && abs($f) < PHP_INT_MAX ? (int) $f : $f;
}
