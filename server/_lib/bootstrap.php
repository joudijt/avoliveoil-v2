<?php
declare(strict_types=1);

/*
 * Shared bootstrap for every entry point (index.php, serve.php, sitemap.php).
 * Entry points define AVO_CMS before requiring this file; every lib file refuses
 * to run without it, so a direct web request to /api/_lib/*.php does nothing even
 * if the .htaccess deny is ever lost.
 */
defined('AVO_CMS') || exit;

const AVO_SITE_URL = 'https://avoliveoil.com';
const AVO_LANGS = ['en', 'ms'];
const AVO_MAIL_FROM = 'noreply@avoliveoil.com';
const AVO_MAIL_FROM_NAME = 'Arabian Village Website';

/** server/ on disk == dist/api/ when deployed */
define('AVO_API_DIR', dirname(__DIR__));
/** the web docroot: dist/ locally, /home/madinahcom/avoliveoil.com live */
define('AVO_DOCROOT', dirname(AVO_API_DIR));
define('AVO_BUILD_DATA', AVO_API_DIR . '/_data');

require_once __DIR__ . '/util.php';

/**
 * Data directory above the docroot (spec §2.2). AVO_CMS_DATA wins (tests, local dev).
 * DOCUMENT_ROOT is preferred over our own path so a symlinked docroot still lands in
 * the account home, but both resolve to the same parent on the live host.
 */
function avo_data_dir(): string
{
    static $dir = null;
    if ($dir !== null) return $dir;
    $env = getenv('AVO_CMS_DATA');
    if (is_string($env) && $env !== '') {
        $dir = rtrim(str_replace('\\', '/', $env), '/');
    } else {
        $docroot = $_SERVER['DOCUMENT_ROOT'] ?? '';
        $base = ($docroot !== '' && is_dir($docroot)) ? $docroot : AVO_DOCROOT;
        $dir = rtrim(str_replace('\\', '/', dirname(rtrim($base, '/\\'))), '/') . '/avoliveoil-cms';
    }
    foreach (['', '/logs', '/published', '/published/pages', '/backups'] as $sub) {
        $d = $dir . $sub;
        if (!is_dir($d)) {
            @mkdir($d, 0700, true);
        }
    }
    return $dir;
}

/** 32 random bytes, created once with fopen 'x' so two first requests can't race. */
function avo_secret(): string
{
    static $key = null;
    if ($key !== null) return $key;
    $file = avo_data_dir() . '/secret.key';
    $fh = @fopen($file, 'x');
    if ($fh !== false) {
        fwrite($fh, random_bytes(32));
        fclose($fh);
        @chmod($file, 0600);
    }
    for ($i = 0; $i < 20; $i++) {
        $raw = @file_get_contents($file);
        if (is_string($raw) && strlen($raw) === 32) {
            return $key = $raw;
        }
        usleep(50000); // the creator is still writing
    }
    throw new RuntimeException('secret.key is unreadable or corrupt');
}

function avo_log(string $level, string $message, array $context = []): void
{
    try {
        $file = avo_data_dir() . '/logs/cms.log';
        if (is_file($file) && filesize($file) > 2 * 1024 * 1024) {
            @rename($file, $file . '.1');
        }
        $line = gmdate('Y-m-d\TH:i:s\Z') . ' ' . strtoupper($level) . ' ' . str_replace(["\r", "\n"], ' ', $message);
        if ($context) {
            $line .= ' ' . json_encode($context, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PARTIAL_OUTPUT_ON_ERROR);
        }
        @file_put_contents($file, $line . "\n", FILE_APPEND | LOCK_EX);
    } catch (Throwable) {
        // logging must never take a request down
    }
}

/** build.json from the frontend build: {build, selftestSha256}. Empty build = dev tree. */
function avo_build_info(): array
{
    static $info = null;
    if ($info !== null) return $info;
    $info = avo_read_json(AVO_BUILD_DATA . '/build.json') ?? [];
    $info += ['build' => '', 'selftestSha256' => ''];
    return $info;
}

function avo_build_id(): string
{
    return (string) avo_build_info()['build'];
}

/**
 * Store/brand facts the server needs at runtime. Written to _data/site-facts.json by
 * scripts/copy-server.mjs from src/data/storeFacts.json; the fallbacks mirror that file
 * so a dev tree without the build artefact still renders sensibly.
 */
function avo_site_facts(): array
{
    static $facts = null;
    if ($facts !== null) return $facts;
    $facts = (avo_read_json(AVO_BUILD_DATA . '/site-facts.json') ?? []) + [
        'madinahName' => 'Berkat Madinah Store',
        'siteName' => 'Arabian Village',
        'siteNameMs' => 'Arabian Village',
        'ogImage' => '/og-card-2026-09.jpg',
        'ogWidth' => 1200,
        'ogHeight' => 630,
        'ogType' => 'image/jpeg',
    ];
    return $facts;
}

/** Content version, bumped by every publish. Read from version.txt so visitors never open SQLite. */
function avo_content_version(): int
{
    $raw = @file_get_contents(avo_data_dir() . '/version.txt');
    return is_string($raw) ? (int) trim($raw) : 0;
}

foreach (['db', 'http', 'auth', 'users', 'audit', 'settings', 'sanitize', 'data', 'seo', 'publish', 'pages',
    'overrides', 'forms', 'mailer', 'submissions', 'media', 'system', 'render', 'pay'] as $lib) {
    require_once __DIR__ . '/' . $lib . '.php';
}
