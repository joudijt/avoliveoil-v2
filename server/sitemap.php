<?php
declare(strict_types=1);

/*
 * /sitemap.xml (spec §5): the static build sitemap read from disk, plus every published,
 * indexable CMS page per language with xhtml:link alternates and lastmod = published date.
 * On any problem the static file goes out unchanged — the sitemap must never break.
 */

define('AVO_CMS', true);
ini_set('display_errors', '0');

$docroot = dirname(__DIR__);
$static = is_file($docroot . '/sitemap.xml') ? $docroot . '/sitemap.xml' : $docroot . '/sitemap-static.xml';
$xml = is_file($static) ? (string) file_get_contents($static) : '';
$GLOBALS['avo_sitemap_done'] = false;
register_shutdown_function(function () use ($static) {
    if ($GLOBALS['avo_sitemap_done']) return;
    while (ob_get_level() > 0) @ob_end_clean();
    if (!headers_sent()) {
        header_remove();
        header('Content-Type: application/xml; charset=UTF-8');
    }
    if (is_file($static)) readfile($static);
});
ob_start();

try {
    require __DIR__ . '/_lib/bootstrap.php';
    $site = avo_site_published();
    $entries = '';
    foreach ($site['pages'] ?? [] as $slug => $p) {
        if (!empty($p['noindex']) || !preg_match(AVO_SLUG_RE, (string) $slug)) continue;
        $langs = array_values(array_intersect(AVO_LANGS, $p['langs'] ?? []));
        if (!$langs) continue;
        $lastmod = isset($p['publishedAt']) && is_string($p['publishedAt']) ? substr($p['publishedAt'], 0, 10) : null;
        $alts = '';
        foreach ($langs as $l) {
            $alts .= '    <xhtml:link rel="alternate" hreflang="' . $l . '" href="' . htmlspecialchars(avo_page_url($l, (string) $slug), ENT_XML1) . "\" />\n";
        }
        $alts .= '    <xhtml:link rel="alternate" hreflang="x-default" href="' . htmlspecialchars(avo_page_url(in_array('en', $langs, true) ? 'en' : $langs[0], (string) $slug), ENT_XML1) . "\" />\n";
        foreach ($langs as $l) {
            $entries .= "  <url>\n    <loc>" . htmlspecialchars(avo_page_url($l, (string) $slug), ENT_XML1) . "</loc>\n" . $alts
                . ($lastmod ? "    <lastmod>$lastmod</lastmod>\n" : '')
                . "    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n";
        }
    }
    $pos = strrpos($xml, '</urlset>');
    if ($entries !== '' && $pos !== false) {
        if (!str_contains($xml, 'xmlns:xhtml=')) {
            $xml = preg_replace('~<urlset\b~', '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml"', $xml, 1) ?? $xml;
            $pos = strrpos($xml, '</urlset>');
        }
        $xml = substr($xml, 0, $pos) . $entries . substr($xml, $pos);
    }
} catch (Throwable $e) {
    $xml = is_file($static) ? (string) file_get_contents($static) : $xml;
    if (function_exists('avo_log')) avo_log('error', 'sitemap fallback: ' . $e->getMessage());
}

$GLOBALS['avo_sitemap_done'] = true;
ob_end_clean();
if ($xml === '') {
    http_response_code(404);
    exit;
}
header('Content-Type: application/xml; charset=UTF-8');
header('Cache-Control: no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') echo $xml;
