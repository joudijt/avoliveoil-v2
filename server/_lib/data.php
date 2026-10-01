<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/*
 * Build artefacts written by scripts/cms-build-data.mjs into dist/api/_data/ (spec §14.1).
 * All read-only at runtime.
 */

/** @return array<string, array{v:mixed,t:string,tokens?:list<string>,editable:bool,vi?:string}> */
function avo_defaults(string $lang): array
{
    static $cache = [];
    if (!in_array($lang, AVO_LANGS, true)) return [];
    return $cache[$lang] ??= (avo_read_json(AVO_BUILD_DATA . '/defaults-' . $lang . '.json') ?? []);
}

/** The value visitors see by default: interpolated when the default has {{tokens}}. */
function avo_default_display(array $def): mixed
{
    return array_key_exists('vi', $def) ? $def['vi'] : ($def['v'] ?? null);
}

function avo_page_keys(): array
{
    static $c = null;
    return $c ??= (avo_read_json(AVO_BUILD_DATA . '/page-keys.json') ?? []);
}

function avo_image_spots(): array
{
    static $c = null;
    return $c ??= (avo_read_json(AVO_BUILD_DATA . '/image-spots.json') ?? []);
}

function avo_key_usage(): array
{
    static $c = null;
    return $c ??= (avo_read_json(AVO_BUILD_DATA . '/key-usage.json') ?? []);
}

/** {{store}} is the only token the server can fill (spec §13.2). */
function avo_interpolate(string $template): string
{
    return (string) preg_replace('/\{\{\s*store\s*\}\}/', (string) avo_site_facts()['madinahName'], $template);
}

/** Tokens other than {{store}} make a key client-only (not applied server-side). */
function avo_server_can_apply(array $def): bool
{
    foreach ($def['tokens'] ?? [] as $t) {
        if ($t !== 'store') return false;
    }
    return true;
}

/**
 * Keep only overrides whose key still exists (and is editable) in the current defaults.
 * Dropped keys are "orphaned edits" (spec §13.2).
 */
function avo_filter_text(array $values, string $lang): array
{
    $defaults = avo_defaults($lang);
    $out = [];
    foreach ($values as $key => $value) {
        $def = $defaults[$key] ?? null;
        if (!$def || empty($def['editable'])) continue;
        $out[$key] = $value;
    }
    return $out;
}
