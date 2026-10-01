<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/*
 * Allow-list sanitiser for CMS page HTML (spec §4, §13.3). Parsed with the HTML5 parser
 * (Dom\HTMLDocument) so the tree we inspect is the tree a browser builds — no regex HTML.
 *
 *   mode 'page' — the publish-time HTML of a whole page (block renderer output)
 *   mode 'rich' — the rich text of a text widget (p br strong b em i u a ul ol li h2-h4 blockquote span)
 */

const AVO_SAN_DROP = ['script', 'style', 'template', 'noscript', 'object', 'embed', 'applet', 'base', 'link', 'meta',
    'title', 'frame', 'frameset', 'iframe', 'math', 'svg', 'portal', 'param', 'canvas', 'xmp', 'plaintext', 'noembed',
    'noframes', 'textarea', 'select', 'form', 'input', 'button', 'option', 'video', 'audio', 'source', 'img', 'picture',
    'head', 'html', 'body', 'dialog'];

const AVO_SAN_PAGE_TAGS = ['section', 'div', 'span', 'p', 'br', 'hr', 'strong', 'b', 'em', 'i', 'u', 's', 'small', 'mark',
    'sub', 'sup', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'cite', 'q', 'figure',
    'figcaption', 'img', 'picture', 'source', 'iframe', 'video', 'form', 'fieldset', 'legend', 'label', 'input',
    'textarea', 'select', 'option', 'button', 'details', 'summary', 'article', 'header', 'footer', 'aside', 'nav',
    'time', 'address', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'svg'];

const AVO_SAN_RICH_TAGS = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'span'];

/** spec §13.3 list + the few attributes iframe/video/form controls cannot work without */
const AVO_SAN_GLOBAL_ATTRS = ['class', 'id', 'title', 'role', 'style', 'hidden', 'tabindex'];
const AVO_SAN_TAG_ATTRS = [
    'a' => ['href', 'target', 'rel'],
    'img' => ['src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading', 'decoding'],
    'source' => ['src', 'srcset', 'sizes', 'type', 'width', 'height'],
    'iframe' => ['src', 'width', 'height', 'loading', 'allow', 'allowfullscreen', 'referrerpolicy', 'frameborder'],
    'video' => ['src', 'poster', 'controls', 'playsinline', 'muted', 'loop', 'preload', 'width', 'height'],
    'form' => ['action', 'method', 'novalidate'],
    'input' => ['type', 'name', 'placeholder', 'required', 'maxlength', 'min', 'max', 'value', 'checked', 'autocomplete', 'step', 'inputmode'],
    'textarea' => ['name', 'placeholder', 'required', 'maxlength', 'rows', 'autocomplete'],
    'select' => ['name', 'required', 'autocomplete'],
    'option' => ['value', 'selected', 'disabled'],
    'button' => ['type', 'name', 'value', 'disabled'],
    'label' => ['for'],
    'time' => ['datetime'],
    'details' => ['open'],
    'th' => ['colspan', 'rowspan', 'scope'],
    'td' => ['colspan', 'rowspan'],
    'ol' => ['start'],
];

const AVO_SAN_SVG_TAGS = ['svg', 'g', 'path', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'rect', 'title', 'desc',
    'defs', 'lineargradient', 'radialgradient', 'stop', 'clippath'];
const AVO_SAN_SVG_ATTRS = ['viewbox', 'd', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin',
    'stroke-miterlimit', 'fill-rule', 'clip-rule', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'x2', 'y1', 'y2', 'points',
    'width', 'height', 'transform', 'opacity', 'fill-opacity', 'stroke-opacity', 'class', 'aria-hidden', 'focusable',
    'role', 'preserveaspectratio', 'offset', 'stop-color', 'stop-opacity', 'gradientunits', 'gradienttransform', 'id',
    'clip-path', 'xmlns', 'version', 'style'];

const AVO_SAN_RESERVED_IDS = ['cms-boot', 'root'];

const AVO_YOUTUBE_EMBED_RE = '~^https://www\.youtube-nocookie\.com/embed/[A-Za-z0-9_-]{6,20}(\?[A-Za-z0-9_=&.%-]*)?$~';
const AVO_VIMEO_EMBED_RE = '~^https://player\.vimeo\.com/video/\d{1,15}(\?[A-Za-z0-9_=&.%-]*)?$~';
const AVO_FORM_ACTION_RE = '~^/api/forms/\d{1,9}/submit$~';

function avo_sanitize_html(string $html, string $mode = 'page'): string
{
    if (trim($html) === '') return '';
    $doc = Dom\HTMLDocument::createEmpty();
    $root = $doc->createElement('div');
    $doc->appendChild($root);
    $root->innerHTML = $html;
    avo_san_children($root, $mode);
    return $root->innerHTML;
}

function avo_sanitize_rich(string $html): string
{
    return avo_sanitize_html($html, 'rich');
}

/**
 * http/https/mailto/tel or relative; never protocol-relative (//host) or a backslash trick.
 * Browsers drop tab/newline anywhere and C0+space at the ends before parsing the scheme,
 * so the check runs on that stripped form.
 */
function avo_safe_url(string $url): bool
{
    $u = (string) preg_replace('/[\x00-\x20\x7F]+/', '', $url);
    if ($u === '') return false;
    $slashy = str_replace('\\', '/', $u);
    if (str_starts_with($slashy, '//')) return false;
    if (preg_match('/^([A-Za-z][A-Za-z0-9+.\-]*):/', $u, $m)) {
        return in_array(strtolower($m[1]), ['http', 'https', 'mailto', 'tel'], true);
    }
    // a colon before the first / ? # would make a browser read a scheme
    $first = strcspn($u, '/?#');
    return !str_contains(substr($u, 0, $first), ':');
}

function avo_safe_srcset(string $v): bool
{
    foreach (explode(',', $v) as $cand) {
        $cand = trim($cand);
        if ($cand === '') continue;
        $url = preg_split('/\s+/', $cand)[0];
        if (!avo_safe_url($url)) return false;
    }
    return true;
}

function avo_filter_style(string $style): string
{
    $out = [];
    foreach (explode(';', $style) as $decl) {
        if (!str_contains($decl, ':')) continue;
        [$p, $v] = array_map('trim', explode(':', $decl, 2));
        $p = strtolower($p);
        if ($v === '' || preg_match('/\\\\|expression|javascript|@import|\/\*|<|>/i', $v)) continue;
        $ok = match ($p) {
            'object-position' => (bool) preg_match('/^((\d{1,3}(\.\d+)?%|left|center|right|top|bottom)(\s+(\d{1,3}(\.\d+)?%|left|center|right|top|bottom))?)$/i', $v),
            'aspect-ratio' => (bool) preg_match('~^(auto|\d{1,4}(\.\d+)?(\s*/\s*\d{1,4}(\.\d+)?)?)$~', $v),
            'max-width' => (bool) preg_match('/^(none|\d{1,5}(\.\d+)?(px|%|rem|em))$/', $v),
            'background-image' => (bool) preg_match('~^url\(([\'"]?)/(uploads/cms|cms-assets)/[A-Za-z0-9/_.\-]+\1\)$~', $v) && !str_contains($v, '..'),
            default => false,
        };
        if ($ok) $out[] = $p . ':' . $v;
    }
    return implode(';', $out);
}

function avo_san_children(Dom\Element $parent, string $mode): void
{
    foreach (iterator_to_array($parent->childNodes) as $node) {
        if ($node instanceof Dom\Element) {
            avo_san_element($node, $mode);
        } elseif ($node instanceof Dom\Text) {
            continue; // CDATA can't occur in HTML; text is inert
        } else {
            $node->remove(); // comments, processing instructions
        }
    }
}

function avo_san_unwrap(Dom\Element $el, string $mode): void
{
    avo_san_children($el, $mode);
    $parent = $el->parentNode;
    if ($parent === null) return;
    while ($el->firstChild) {
        $parent->insertBefore($el->firstChild, $el);
    }
    $el->remove();
}

function avo_san_element(Dom\Element $el, string $mode): void
{
    $tag = strtolower($el->localName);
    $ns = $el->namespaceURI;

    if ($ns === 'http://www.w3.org/2000/svg') {
        if ($mode !== 'page' || !in_array($tag, AVO_SAN_SVG_TAGS, true)) {
            $el->remove();
            return;
        }
        avo_san_svg_attrs($el);
        avo_san_children($el, $mode);
        return;
    }
    if ($ns !== 'http://www.w3.org/1999/xhtml') {
        $el->remove();
        return;
    }

    $allowed = $mode === 'rich' ? AVO_SAN_RICH_TAGS : AVO_SAN_PAGE_TAGS;
    if (!in_array($tag, $allowed, true)) {
        if (in_array($tag, AVO_SAN_DROP, true)) {
            $el->remove();
        } else {
            avo_san_unwrap($el, $mode);
        }
        return;
    }

    if ($mode === 'page') {
        if ($tag === 'iframe') {
            $src = trim((string) $el->getAttribute('src'));
            if (!preg_match(AVO_YOUTUBE_EMBED_RE, $src) && !preg_match(AVO_VIMEO_EMBED_RE, $src)) {
                $el->remove();
                return;
            }
        }
        if ($tag === 'form') {
            $action = trim((string) $el->getAttribute('action'));
            if (!preg_match(AVO_FORM_ACTION_RE, $action)) {
                $el->remove();
                return;
            }
        }
    }

    avo_san_html_attrs($el, $tag, $mode);
    if ($tag !== 'iframe') {
        avo_san_children($el, $mode);
    } else {
        while ($el->firstChild) $el->firstChild->remove();
    }
}

function avo_san_html_attrs(Dom\Element $el, string $tag, string $mode): void
{
    $tagAttrs = $mode === 'rich' ? ($tag === 'a' ? ['href', 'target', 'rel'] : []) : (AVO_SAN_TAG_ATTRS[$tag] ?? []);
    $global = $mode === 'rich' ? [] : AVO_SAN_GLOBAL_ATTRS;
    foreach (iterator_to_array($el->attributes) as $attr) {
        /** @var Dom\Attr $attr */
        $name = strtolower($attr->name);
        $value = $attr->value;
        $keep = $attr->namespaceURI === null && (
            in_array($name, $tagAttrs, true) || in_array($name, $global, true)
            || ($mode === 'page' && (preg_match('/^aria-[a-z]+$/', $name) || preg_match('/^data-cms-[a-z0-9-]+$/', $name)))
        );
        if ($keep) {
            $keep = avo_san_attr_value($el, $tag, $name, $value);
        }
        if (!$keep) {
            $el->removeAttributeNode($attr);
        }
    }
    if ($tag === 'a' && strtolower((string) $el->getAttribute('target')) === '_blank') {
        $rel = preg_split('/\s+/', strtolower(trim((string) $el->getAttribute('rel')))) ?: [];
        $rel = array_values(array_unique(array_filter(array_merge($rel, ['noopener', 'noreferrer']))));
        $el->setAttribute('rel', implode(' ', $rel));
    }
}

/** Returns false to drop the attribute; may rewrite the value in place. */
function avo_san_attr_value(Dom\Element $el, string $tag, string $name, string $value): bool
{
    switch ($name) {
        case 'href':
        case 'poster':
            return avo_safe_url($value);
        case 'src':
            return $tag === 'iframe' ? true : avo_safe_url($value);
        case 'srcset':
            return avo_safe_srcset($value);
        case 'action':
            return (bool) preg_match(AVO_FORM_ACTION_RE, trim($value));
        case 'method':
            return strtolower(trim($value)) === 'post';
        case 'target':
            return in_array(strtolower($value), ['_blank', '_self'], true);
        case 'rel':
            return (bool) preg_match('/^[a-z\s-]{0,80}$/i', $value);
        case 'id':
            return (bool) preg_match('/^[A-Za-z][A-Za-z0-9_-]{0,63}$/', $value) && !in_array(strtolower($value), AVO_SAN_RESERVED_IDS, true);
        case 'name':
            return in_array($tag, ['input', 'textarea', 'select', 'button'], true) && (bool) preg_match('/^[A-Za-z0-9_-]{1,64}$/', $value);
        case 'for':
            return (bool) preg_match('/^[A-Za-z][A-Za-z0-9_-]{0,63}$/', $value);
        case 'type':
            return match ($tag) {
                'input' => in_array(strtolower($value), ['text', 'email', 'tel', 'number', 'date', 'checkbox', 'radio', 'hidden', 'submit', 'url'], true),
                'button' => in_array(strtolower($value), ['submit', 'button', 'reset'], true),
                'source' => (bool) preg_match('~^[a-z]+/[a-z0-9.+-]+$~', $value),
                default => false,
            };
        case 'width':
        case 'height':
        case 'maxlength':
        case 'rows':
        case 'colspan':
        case 'rowspan':
        case 'start':
            return (bool) preg_match('/^\d{1,5}$/', trim($value));
        case 'min':
        case 'max':
        case 'step':
            return (bool) preg_match('/^[0-9.\-]{1,20}$|^any$/', trim($value));
        case 'tabindex':
            return in_array(trim($value), ['-1', '0'], true);
        case 'loading':
            return in_array($value, ['lazy', 'eager'], true);
        case 'decoding':
            return in_array($value, ['async', 'sync', 'auto'], true);
        case 'style':
            $clean = avo_filter_style($value);
            if ($clean === '') return false;
            $el->setAttribute('style', $clean);
            return true;
        case 'allow':
            return (bool) preg_match('/^[a-z\-;\s]{0,200}$/', $value);
        case 'referrerpolicy':
            return (bool) preg_match('/^[a-z\-]{0,40}$/', $value);
        case 'preload':
            return in_array($value, ['none', 'metadata', 'auto'], true);
        default:
            // boolean / plain text attributes (alt, title, placeholder, value, aria-*, data-cms-*, …)
            return !preg_match('/^\s*(javascript|vbscript|data):/i', $value);
    }
}

function avo_san_svg_attrs(Dom\Element $el): void
{
    foreach (iterator_to_array($el->attributes) as $attr) {
        $name = strtolower($attr->localName);
        $value = $attr->value;
        $keep = in_array($name, AVO_SAN_SVG_ATTRS, true)
            && ($attr->namespaceURI === null || ($name === 'xmlns' && $attr->namespaceURI === 'http://www.w3.org/2000/xmlns/'))
            && !preg_match('/javascript:|data:|url\s*\(\s*[\'"]?\s*[^#\s\'"]/i', $value);
        if ($keep && $name === 'style') {
            $clean = avo_filter_style($value);
            $keep = $clean !== '';
            if ($keep) $el->setAttribute('style', $clean);
        }
        if ($keep && $name === 'id') {
            $keep = (bool) preg_match('/^[A-Za-z][A-Za-z0-9_-]{0,63}$/', $value) && !in_array(strtolower($value), AVO_SAN_RESERVED_IDS, true);
        }
        if (!$keep) $el->removeAttributeNode($attr);
    }
}
