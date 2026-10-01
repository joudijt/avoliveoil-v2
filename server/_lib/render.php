<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/*
 * HTML transformations applied by serve.php to a prerendered snapshot or to the CMS
 * template (spec §6, §13.2, §15 marking contract). Everything goes through the HTML5
 * parser (Dom\HTMLDocument) and is serialised back with saveHtml(), which keeps the
 * doctype, module scripts, JSON-LD and inline SVG byte-identical (verified on the real
 * snapshots: a parse + serialise round trip is lossless).
 */

const AVO_CMS_ATTR_ALLOWED = ['placeholder', 'alt', 'aria-label', 'title', 'aria-description'];
const AVO_HEAD_META = [
    ['name', 'description'], ['property', 'og:title'], ['property', 'og:description'], ['property', 'og:image:alt'],
    ['name', 'twitter:title'], ['name', 'twitter:description'], ['name', 'twitter:image:alt'],
];

function avo_parse_html(string $html): Dom\HTMLDocument
{
    return Dom\HTMLDocument::createFromString($html, LIBXML_NOERROR, 'UTF-8');
}

/** The string a key shows on the page, or null when the server must not apply it. */
function avo_display_text(array $def, mixed $value): ?string
{
    $type = $def['t'] ?? 'string';
    if ($type === 'number') return is_numeric($value) ? number_format((float) $value) : null;
    if (!is_string($value)) return null;
    if (!empty($def['tokens'])) {
        if (!avo_server_can_apply($def)) return null;
        return avo_interpolate($value);
    }
    return $value;
}

/** Walk down single-element wrappers to the element that actually holds the text. */
function avo_text_holder(Dom\Element $el): Dom\Element
{
    while ($el->childElementCount === 1) {
        $direct = '';
        foreach ($el->childNodes as $n) {
            if ($n instanceof Dom\Text) $direct .= $n->data;
        }
        if (trim($direct) !== '') break;
        $el = $el->firstElementChild;
    }
    return $el;
}

function avo_has_gold(Dom\Element $el): bool
{
    return $el->classList->contains('text-gold') || $el->querySelector('.text-gold') !== null;
}

/**
 * hero.headlineWords: rebuild the h1's word spans from HeadlineWord[] by cloning an
 * existing plain span and an existing gold span (spec §13.2, §15). Text between the
 * spans (if React renders any) is reproduced exactly: leading, separator, trailing.
 */
function avo_rebuild_words(Dom\Element $h1, array $words): bool
{
    $spans = [];
    for ($c = $h1->firstElementChild; $c !== null; $c = $c->nextElementSibling) $spans[] = $c;
    if (!$spans) return false;
    $plain = null;
    $gold = null;
    foreach ($spans as $sp) {
        if (avo_has_gold($sp)) $gold ??= $sp;
        else $plain ??= $sp;
    }
    $textBetween = function (?Dom\Node $from, ?Dom\Node $to): string {
        $s = '';
        for ($n = $from; $n !== null && $n !== $to; $n = $n->nextSibling) {
            if ($n instanceof Dom\Text) $s .= $n->data;
        }
        return $s;
    };
    $lead = $textBetween($h1->firstChild, $spans[0]);
    $sep = count($spans) > 1 ? $textBetween($spans[0]->nextSibling, $spans[1]) : ' ';
    if (count($spans) === 1 && $spans[0]->nextSibling === null && $lead === '') $sep = '';
    $trail = $textBetween(end($spans)->nextSibling, null);
    $plainT = $plain?->cloneNode(true);
    $goldT = $gold?->cloneNode(true);

    while ($h1->firstChild) $h1->firstChild->remove();
    $doc = $h1->ownerDocument;
    if ($lead !== '') $h1->append($doc->createTextNode($lead));
    $n = count($words);
    foreach (array_values($words) as $i => $w) {
        $isGold = (bool) ($w['gold'] ?? false);
        $tpl = $isGold ? ($goldT ?? $plainT) : ($plainT ?? $goldT);
        $clone = $tpl->cloneNode(true);
        $holder = avo_text_holder($clone);
        if ($isGold && !avo_has_gold($clone)) $holder->classList->add('text-gold');
        if (!$isGold && avo_has_gold($clone)) {
            foreach ($clone->querySelectorAll('.text-gold') as $g) $g->classList->remove('text-gold');
            $clone->classList->remove('text-gold');
        }
        $holder->textContent = (string) ($w['text'] ?? '');
        $h1->append($clone);
        if ($i < $n - 1 && $sep !== '') $h1->append($doc->createTextNode($sep));
    }
    if ($trail !== '') $h1->append($doc->createTextNode($trail));
    return true;
}

/** Build {default display → new display} pairs for the head + JSON-LD replacement. */
function avo_head_pairs(array $defaults, array $values): array
{
    $pairs = [];
    foreach ($values as $key => $value) {
        $def = $defaults[$key] ?? null;
        if (!$def || ($def['t'] ?? 'string') !== 'string') continue;
        $old = avo_default_display($def);
        $new = avo_display_text($def, $value);
        if (!is_string($old) || $old === '' || $new === null || $new === $old) continue;
        $pairs[$old] = $new;
    }
    return $pairs;
}

/**
 * Apply published (or draft, in edit mode) text + image overrides and the CMS menu to a
 * parsed page for one language.
 */
function avo_apply_overrides(Dom\HTMLDocument $doc, string $lang, array $text, array $images, array $menu, bool $snapshotHead): void
{
    $defaults = avo_defaults($lang);
    $values = avo_filter_text($text[$lang] ?? [], $lang);

    foreach ($doc->querySelectorAll('[data-cms]') as $el) {
        $key = (string) $el->getAttribute('data-cms');
        if (!array_key_exists($key, $values)) continue;
        $display = avo_display_text($defaults[$key], $values[$key]);
        if ($display === null) continue;
        if ($el->firstElementChild !== null) {
            avo_log('warn', 'data-cms element has element children, not applied', ['key' => $key]);
            continue;
        }
        $el->textContent = $display;
    }
    foreach ($doc->querySelectorAll('[data-cms-num]') as $el) {
        $key = (string) $el->getAttribute('data-cms-num');
        if (!array_key_exists($key, $values) || !is_numeric($values[$key]) || $el->firstElementChild !== null) continue;
        $el->textContent = number_format((float) $values[$key]);
    }
    foreach ($doc->querySelectorAll('[data-cms-attr]') as $el) {
        foreach (preg_split('/[;|]/', (string) $el->getAttribute('data-cms-attr')) ?: [] as $pair) {
            if (!str_contains($pair, ':')) continue;
            [$attr, $key] = array_map('trim', explode(':', $pair, 2));
            if (!in_array($attr, AVO_CMS_ATTR_ALLOWED, true) || !array_key_exists($key, $values)) continue;
            $display = avo_display_text($defaults[$key], $values[$key]);
            if ($display !== null) $el->setAttribute($attr, $display);
        }
    }
    foreach ($doc->querySelectorAll('[data-cms-words]') as $el) {
        $key = (string) $el->getAttribute('data-cms-words');
        $words = $values[$key] ?? null;
        if (is_array($words) && $words && array_is_list($words)) avo_rebuild_words($el, $words);
    }

    $imgs = $images[$lang] ?? [];
    foreach ($doc->querySelectorAll('img[data-cms-img]') as $el) {
        $spot = (string) $el->getAttribute('data-cms-img');
        $ov = $imgs[$spot] ?? null;
        if (!is_array($ov) || empty($ov['media']['variants'])) continue;
        $variants = $ov['media']['variants'];
        usort($variants, fn ($a, $b) => $a['w'] <=> $b['w']);
        $el->setAttribute('src', (string) end($variants)['url']);
        $el->setAttribute('srcset', implode(', ', array_map(fn ($v) => $v['url'] . ' ' . (int) $v['w'] . 'w', $variants)));
        $el->setAttribute('width', (string) (int) $ov['media']['width']);
        $el->setAttribute('height', (string) (int) $ov['media']['height']);
        $el->setAttribute('alt', (string) ($ov['alt'] ?? ''));
        // The photo's own description replaces the alt key's text, as Picture.tsx renders it.
        $el->removeAttribute('data-cms-attr');
        if (isset($ov['focal']['x'], $ov['focal']['y'])) {
            $style = (string) $el->getAttribute('style');
            $decls = array_filter(array_map('trim', explode(';', $style)), fn ($d) => $d !== '' && !preg_match('/^object-position\s*:/i', $d));
            $decls[] = 'object-position:' . avo_num($ov['focal']['x']) . '% ' . avo_num($ov['focal']['y']) . '%';
            $el->setAttribute('style', implode(';', $decls));
        }
    }

    avo_inject_menu($doc, $lang, $menu);

    if ($snapshotHead) {
        $pairs = avo_head_pairs($defaults, $values);
        if ($pairs) avo_replace_head_defaults($doc, $pairs);
    }
}

function avo_replace_head_defaults(Dom\HTMLDocument $doc, array $pairs): void
{
    $title = $doc->querySelector('title');
    if ($title && isset($pairs[$title->textContent])) $title->textContent = $pairs[$title->textContent];
    foreach (AVO_HEAD_META as [$attr, $name]) {
        foreach ($doc->querySelectorAll('meta[' . $attr . '="' . $name . '"]') as $m) {
            $c = (string) $m->getAttribute('content');
            if (isset($pairs[$c])) $m->setAttribute('content', $pairs[$c]);
        }
    }
    foreach ($doc->querySelectorAll('script[type="application/ld+json"]') as $s) {
        $json = $s->textContent;
        $changed = $json;
        foreach ($pairs as $old => $new) {
            $needle = json_encode($old, AVO_JSON_JS);
            if ($needle !== false && str_contains($changed, $needle)) {
                $changed = str_replace($needle, (string) json_encode($new, AVO_JSON_SCRIPT), $changed);
            }
        }
        if ($changed !== $json) $s->textContent = $changed;
    }
}

/** One clone of the container's last element child per CMS menu item (spec §15). */
function avo_inject_menu(Dom\HTMLDocument $doc, string $lang, array $menu): void
{
    foreach ($doc->querySelectorAll('[data-cms-menu]') as $box) {
        $which = (string) $box->getAttribute('data-cms-menu');
        $items = $menu[$lang][$which === 'footer' ? 'footer' : 'header'] ?? [];
        $tpl = $box->lastElementChild;
        if (!$items || !$tpl) continue;
        usort($items, fn ($a, $b) => ($a['order'] ?? 0) <=> ($b['order'] ?? 0));
        foreach ($items as $item) {
            if (!is_string($item['slug'] ?? null) || !preg_match(AVO_SLUG_RE, $item['slug'])) continue;
            $clone = $tpl->cloneNode(true);
            $a = strtolower($clone->localName) === 'a' ? $clone : $clone->querySelector('a');
            if (!$a) continue;
            // The clone is a new link, not the built-in one: drop its i18n / router marks
            // so inline editing and the server never treat it as that key (React renders
            // the CMS item without them too).
            foreach (array_merge([$clone], iterator_to_array($clone->querySelectorAll('*'))) as $el) {
                foreach (['data-cms', 'data-cms-attr', 'data-cms-num', 'data-discover', 'aria-current'] as $attr) {
                    $el->removeAttribute($attr);
                }
            }
            $a->setAttribute('href', '/' . $lang . '/' . $item['slug']);
            $a->setAttribute('data-cms-menu-item', '');
            avo_text_holder($a)->textContent = (string) ($item['label'] ?? '');
            $box->append($clone);
        }
    }
}

/** Language links on a CMS page point at the same page when it exists in that language. */
function avo_apply_lang_links(Dom\HTMLDocument $doc, string $slug, array $langs): void
{
    foreach ($doc->querySelectorAll('[data-cms-lang-link]') as $a) {
        $l = (string) $a->getAttribute('data-cms-lang-link');
        if (!in_array($l, AVO_LANGS, true)) continue;
        $a->setAttribute('href', in_array($l, $langs, true) ? '/' . $l . '/' . $slug : '/' . $l);
    }
}

function avo_set_meta(Dom\HTMLDocument $doc, string $attr, string $name, string $content): void
{
    $m = $doc->querySelector('meta[' . $attr . '="' . $name . '"]');
    if (!$m) {
        $m = $doc->createElement('meta');
        $m->setAttribute($attr, $name);
        $doc->head->append($m);
    }
    $m->setAttribute('content', $content);
}

/** Rewrite the template head from ResolvedSeo (spec §5, §13.2). */
function avo_apply_seo(Dom\HTMLDocument $doc, array $seo, string $lang, array $langs): void
{
    $head = $doc->head;
    $title = $doc->querySelector('title');
    if (!$title) {
        $title = $doc->createElement('title');
        $head->append($title);
    }
    $title->textContent = (string) $seo['title'];
    avo_set_meta($doc, 'name', 'description', (string) $seo['description']);
    avo_set_meta($doc, 'name', 'robots', (string) $seo['robots']);

    $canon = $doc->querySelector('link[rel="canonical"]');
    if (!$canon) {
        $canon = $doc->createElement('link');
        $canon->setAttribute('rel', 'canonical');
        $head->append($canon);
    }
    $canon->setAttribute('href', (string) $seo['canonical']);
    foreach ($doc->querySelectorAll('link[rel="alternate"][hreflang]') as $l) $l->remove();
    $alts = (array) ($seo['alternates'] ?? []);
    $anchor = $canon;
    $add = function (string $hreflang, string $href) use ($doc, &$anchor) {
        $l = $doc->createElement('link');
        $l->setAttribute('rel', 'alternate');
        $l->setAttribute('hreflang', $hreflang);
        $l->setAttribute('href', $href);
        $anchor->after($l);
        $anchor = $l;
    };
    foreach (AVO_LANGS as $l) {
        if (isset($alts[$l])) $add($l, (string) $alts[$l]);
    }
    if ($alts) $add('x-default', (string) ($alts['en'] ?? reset($alts)));

    $og = $seo['ogImage'];
    // Same rule as imageType() in SEO.tsx: type from the extension, no tag when unknown.
    $ext = preg_match('/\.([a-z0-9]+)(?:[?#].*)?$/i', (string) $og['url'], $em) ? strtolower($em[1]) : '';
    $type = match ($ext) { 'jpg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp', default => null };
    foreach ([
        'og:type' => 'website', 'og:title' => $seo['title'], 'og:description' => $seo['description'], 'og:url' => $seo['canonical'],
        'og:image' => $og['url'], 'og:image:secure_url' => $og['url'],
        'og:image:width' => (string) $og['width'], 'og:image:height' => (string) $og['height'], 'og:image:alt' => $seo['title'],
    ] as $p => $v) {
        avo_set_meta($doc, 'property', $p, (string) $v);
    }
    if ($type !== null) {
        avo_set_meta($doc, 'property', 'og:image:type', $type);
    } else {
        foreach ($doc->querySelectorAll('meta[property="og:image:type"]') as $m) $m->remove();
    }
    $locales = ['en' => 'en_US', 'ms' => 'ms_MY'];
    avo_set_meta($doc, 'property', 'og:locale', $locales[$lang]);
    foreach ($doc->querySelectorAll('meta[property="og:locale:alternate"]') as $m) $m->remove();
    foreach ($langs as $l) {
        if ($l === $lang) continue;
        $m = $doc->createElement('meta');
        $m->setAttribute('property', 'og:locale:alternate');
        $m->setAttribute('content', $locales[$l]);
        $head->append($m);
    }
    foreach (['twitter:title' => $seo['title'], 'twitter:description' => $seo['description'], 'twitter:image' => $og['url'], 'twitter:image:alt' => $seo['title']] as $n => $v) {
        avo_set_meta($doc, 'name', $n, (string) $v);
    }

    // Page-level JSON-LD comes from ResolvedSeo; the template's own page nodes are dropped.
    foreach ($doc->querySelectorAll('script[type="application/ld+json"]') as $s) {
        $data = json_decode($s->textContent, true);
        $t = is_array($data) ? ($data['@type'] ?? null) : null;
        if (in_array($t, ['WebPage', 'BreadcrumbList', 'FAQPage'], true)) $s->remove();
    }
    // Next to the site-wide JSON-LD, i.e. inside React's #root: the client render replaces
    // them there. Appended to <head> they survived it and the rendered page (what Googlebot
    // indexes) carried every WebPage / BreadcrumbList / FAQPage twice.
    $after = null;
    foreach ($doc->querySelectorAll('script[type="application/ld+json"]') as $s) $after = $s;
    foreach ($seo['jsonLd'] as $obj) {
        $s = $doc->createElement('script');
        $s->setAttribute('type', 'application/ld+json');
        $s->textContent = (string) json_encode($obj, AVO_JSON_SCRIPT);
        if ($after) {
            $after->after($s);
            $after = $s;
        } else {
            $head->append($s);
        }
    }
}

function avo_inject_boot(Dom\HTMLDocument $doc, array $boot): void
{
    $old = $doc->querySelector('script#cms-boot');
    if ($old) $old->remove();
    $s = $doc->createElement('script');
    $s->setAttribute('id', 'cms-boot');
    $s->setAttribute('type', 'application/json');
    $s->textContent = (string) json_encode($boot, AVO_JSON_SCRIPT | JSON_INVALID_UTF8_SUBSTITUTE);
    ($doc->body ?? $doc->documentElement)->append($s);
}

function avo_add_noindex(Dom\HTMLDocument $doc): void
{
    foreach ($doc->querySelectorAll('meta[name="robots"]') as $m) $m->remove();
    $m = $doc->createElement('meta');
    $m->setAttribute('name', 'robots');
    $m->setAttribute('content', 'noindex');
    $doc->head->append($m);
}

/** CmsBoot (contracts.ts) — text filtered against the defaults of each language. */
function avo_build_boot(string $lang, array $text, array $images, array $menu, int $v, ?array $page = null, bool $edit = false, bool $preview = false): array
{
    $boot = [
        'v' => $v,
        'build' => avo_build_id(),
        'lang' => $lang,
        'text' => [
            'en' => (object) avo_filter_text($text['en'] ?? [], 'en'),
            'ms' => (object) avo_filter_text($text['ms'] ?? [], 'ms'),
        ],
        'images' => [
            'en' => (object) array_filter($images['en'] ?? [], fn ($k) => isset(avo_image_spots()[$k]) || !avo_image_spots(), ARRAY_FILTER_USE_KEY),
            'ms' => (object) array_filter($images['ms'] ?? [], fn ($k) => isset(avo_image_spots()[$k]) || !avo_image_spots(), ARRAY_FILTER_USE_KEY),
        ],
        'menu' => [
            'en' => ['header' => array_values($menu['en']['header'] ?? []), 'footer' => array_values($menu['en']['footer'] ?? [])],
            'ms' => ['header' => array_values($menu['ms']['header'] ?? []), 'footer' => array_values($menu['ms']['footer'] ?? [])],
        ],
    ];
    if ($page !== null) $boot['page'] = $page;
    if ($edit) $boot['edit'] = true;
    if ($preview) $boot['preview'] = true;
    return $boot;
}

/** PublicPagePayload for one language from a published page file. */
function avo_page_payload_public(array $file, string $lang): array
{
    return [
        'id' => (int) $file['id'],
        'slug' => (string) $file['slug'],
        'lang' => $lang,
        'langs' => array_values($file['langs']),
        'doc' => $file['doc'],
        'media' => (object) ($file['media'] ?? []),
        'forms' => (object) ($file['forms'] ?? []),
        'seo' => $file['seo'][$lang],
    ];
}
