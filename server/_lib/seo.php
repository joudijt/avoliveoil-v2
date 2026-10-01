<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/*
 * ResolvedSeo for a CMS page (contracts.ts) — computed once here, passed to React in the
 * boot payload and applied to the template head by serve.php, so both heads are equal
 * (spec §13.2). Mirrors src/components/SEO.tsx conventions: absolute canonical
 * https://avoliveoil.com/<lang>/<slug>, hreflang only for the page's languages,
 * x-default = en when present, og image = the site OG card unless the page chose one.
 */

function avo_page_url(string $lang, string $slug): string
{
    return AVO_SITE_URL . '/' . $lang . ($slug === '' ? '' : '/' . $slug);
}

/** Plain text of rich-text HTML (doc.ts `plain`). */
function avo_plain(string $html): string
{
    $s = (string) preg_replace('/<[^>]*>/', '', $html);
    $s = str_replace('&nbsp;', ' ', $s);
    return trim(html_entity_decode($s, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
}

/** The 1600 variant (spec), else the widest below it, else the narrowest. */
function avo_og_variant(array $ref): ?array
{
    $variants = $ref['variants'] ?? [];
    if (!$variants) return null;
    usort($variants, fn ($a, $b) => $a['w'] <=> $b['w']);
    $pick = null;
    foreach ($variants as $v) {
        if ($v['w'] <= 1600) $pick = $v;
    }
    $pick ??= $variants[0];
    $h = $ref['width'] > 0 ? (int) round($ref['height'] * $pick['w'] / $ref['width']) : 0;
    return ['url' => AVO_SITE_URL . $pick['url'], 'width' => (int) $pick['w'], 'height' => $h];
}

/** Every faq item of the doc in one language, answers as plain text. */
function avo_doc_faq(array $doc, string $lang): array
{
    $items = [];
    foreach ($doc['sections'] ?? [] as $section) {
        foreach ($section['columns'] ?? [] as $col) {
            foreach ($col['widgets'] ?? [] as $w) {
                if (($w['type'] ?? '') !== 'faq') continue;
                foreach ($w['settings']['items'] ?? [] as $it) {
                    $q = trim(avo_plain(avo_loc($it['q'] ?? null, $lang)));
                    $a = trim(avo_plain(avo_loc($it['a'] ?? null, $lang)));
                    if ($q !== '' && $a !== '') $items[] = ['q' => $q, 'a' => $a];
                }
            }
        }
    }
    return $items;
}

/**
 * @param string[] $langs   languages the page is published in
 * @param array    $media   id => MediaRef
 * @param array    $homeLabel lang => breadcrumb label for the home page (nav.home)
 */
function avo_resolve_seo(string $slug, array $doc, string $lang, array $langs, bool $noindex, array $media,
    array $homeLabel, ?int $firstPublished, ?int $published): array
{
    $title = trim(avo_loc($doc['seo']['metaTitle'] ?? null, $lang));
    if ($title === '') $title = trim(avo_loc($doc['title'] ?? null, $lang));
    $description = trim(avo_loc($doc['seo']['metaDescription'] ?? null, $lang));
    if ($description === '') $description = $title;
    $canonical = avo_page_url($lang, $slug);
    $alternates = [];
    foreach (AVO_LANGS as $l) {
        if (in_array($l, $langs, true)) $alternates[$l] = avo_page_url($l, $slug);
    }
    $facts = avo_site_facts();
    $og = null;
    $ogId = $doc['seo']['ogImage'] ?? null;
    if (is_int($ogId) && isset($media[(string) $ogId])) {
        $og = avo_og_variant($media[(string) $ogId]);
    }
    $og ??= ['url' => AVO_SITE_URL . $facts['ogImage'], 'width' => (int) $facts['ogWidth'], 'height' => (int) $facts['ogHeight']];

    $pageName = trim(avo_loc($doc['title'] ?? null, $lang)) ?: $title;
    $webPage = [
        '@context' => 'https://schema.org',
        '@type' => 'WebPage',
        '@id' => $canonical . '#webpage',
        'url' => $canonical,
        'name' => $title,
        'inLanguage' => $lang,
        'isPartOf' => ['@id' => AVO_SITE_URL . '/#website'],
        'publisher' => ['@id' => AVO_SITE_URL . '/#organization'],
        'primaryImageOfPage' => ['@type' => 'ImageObject', 'url' => $og['url'], 'width' => $og['width'], 'height' => $og['height']],
    ];
    $webPage['description'] = $description;
    if ($firstPublished) $webPage['datePublished'] = avo_iso($firstPublished);
    if ($published) $webPage['dateModified'] = avo_iso($published);

    $jsonLd = [$webPage, [
        '@context' => 'https://schema.org',
        '@type' => 'BreadcrumbList',
        'itemListElement' => [
            ['@type' => 'ListItem', 'position' => 1, 'name' => $homeLabel[$lang] ?? 'Home', 'item' => AVO_SITE_URL . '/' . $lang],
            ['@type' => 'ListItem', 'position' => 2, 'name' => $pageName, 'item' => $canonical],
        ],
    ]];
    $faq = avo_doc_faq($doc, $lang);
    if ($faq) {
        $jsonLd[] = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => array_map(fn ($i) => [
                '@type' => 'Question',
                'name' => $i['q'],
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $i['a']],
            ], $faq),
        ];
    }
    return [
        'title' => $title,
        'description' => $description,
        'canonical' => $canonical,
        'robots' => $noindex ? 'noindex, follow' : 'index, follow',
        'alternates' => (object) $alternates,
        'ogImage' => $og,
        'jsonLd' => $jsonLd,
    ];
}
