/**
 * Client-side sanitiser for the rich text of the `text` widget (spec §4 + §13.3).
 *
 * The server sanitises every posted page again with the same allow-list, so this
 * is not the security boundary — it exists so the canvas, the published HTML and
 * the React page all render the SAME cleaned markup (anything the server would
 * strip must already be gone, or the visitor's HTML and React's output differ).
 * DOMParser-based: the input is parsed as an inert document (no scripts run, no
 * images load) and rebuilt node by node from the allow-list.
 */

const ALLOWED_TAGS = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'span']);

/** Elements whose CONTENT is dropped too (not just unwrapped). */
const DROP_WITH_CONTENT = new Set(['script', 'style', 'iframe', 'object', 'embed', 'template', 'noscript', 'svg', 'math', 'head', 'title', 'textarea', 'select', 'button']);

/**
 * http/https/mailto/tel or a same-site relative path / fragment. `//host` is
 * rejected (protocol-relative = off-site), as are javascript:, data: and friends.
 * Returns the trimmed URL, or null when it is not allowed.
 */
export function safeHref(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const url = raw.trim();
  if (!url) return null;
  // Control characters and whitespace inside a scheme are how `java\tscript:` slips through.
  for (let i = 0; i < url.length; i++) {
    const c = url.charCodeAt(i);
    if (c < 0x20 || c === 0x7f) return null;
  }
  if (url.startsWith('//') || url.startsWith('\\')) return null;
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) return url;
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(url);
  if (!scheme) return null;
  const s = scheme[1].toLowerCase();
  if (s === 'http' || s === 'https') {
    try {
      const parsed = new URL(url);
      return parsed.host ? url : null;
    } catch {
      return null;
    }
  }
  if (s === 'mailto' || s === 'tel') return url;
  return null;
}

/** True when a URL leaves the site (opened with rel="noopener noreferrer"). */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?avoliveoil\.com(\/|$)/i.test(href);
}

function cleanChildren(src: Node, out: Node, doc: Document) {
  src.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      out.appendChild(doc.createTextNode(child.textContent ?? ''));
      return;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) return; // comments, processing instructions
    const el = child as Element;
    const tag = el.tagName.toLowerCase();
    if (DROP_WITH_CONTENT.has(tag)) return;
    if (!ALLOWED_TAGS.has(tag)) {
      // Unknown wrapper (div, font, section…): keep its text, lose the element.
      // A block-level div becomes a paragraph so pasted Word/Docs text keeps its breaks.
      if (tag === 'div' && el.textContent?.trim()) {
        const p = doc.createElement('p');
        cleanChildren(el, p, doc);
        out.appendChild(p);
      } else {
        cleanChildren(el, out, doc);
      }
      return;
    }
    const clean = doc.createElement(tag);
    if (tag === 'a') {
      const href = safeHref(el.getAttribute('href'));
      if (!href) {
        cleanChildren(el, out, doc);
        return;
      }
      clean.setAttribute('href', href);
      if (el.getAttribute('target') === '_blank' || isExternalHref(href)) {
        clean.setAttribute('target', '_blank');
        clean.setAttribute('rel', 'noopener noreferrer');
      }
    }
    cleanChildren(el, clean, doc);
    // An empty span/strong is noise; an empty <p> is a deliberate blank line only if it has a <br>.
    if (tag !== 'br' && !clean.textContent && !clean.querySelector('br')) return;
    out.appendChild(clean);
  });
}

/**
 * Returns sanitised HTML for the text widget. Plain text without any block
 * element is wrapped in one <p> so every text widget is made of blocks.
 */
export function sanitizeRichText(html: string): string {
  if (!html) return '';
  if (typeof DOMParser === 'undefined') {
    // Never reached in the browser bundles that render blocks; refuse rather than pass HTML through.
    return '';
  }
  const parsed = new DOMParser().parseFromString(`<!doctype html><body>${html}`, 'text/html');
  const doc = document.implementation.createHTMLDocument('');
  const root = doc.createElement('div');
  cleanChildren(parsed.body, root, doc);

  // Wrap loose inline runs (text, strong, a…) at the top level into paragraphs.
  const BLOCKS = new Set(['P', 'UL', 'OL', 'H2', 'H3', 'H4', 'BLOCKQUOTE']);
  const wrapped = doc.createElement('div');
  let run: HTMLParagraphElement | null = null;
  Array.from(root.childNodes).forEach((n) => {
    const isBlock = n.nodeType === Node.ELEMENT_NODE && BLOCKS.has((n as Element).tagName);
    if (isBlock) {
      run = null;
      wrapped.appendChild(n);
      return;
    }
    if (n.nodeType === Node.TEXT_NODE && !n.textContent?.trim() && !run) return;
    if (!run) {
      run = doc.createElement('p');
      wrapped.appendChild(run);
    }
    run.appendChild(n);
  });
  // li outside a list is invalid; the parser keeps it, so move strays into a <ul>.
  wrapped.querySelectorAll('li').forEach((li) => {
    const parent = li.parentElement;
    if (parent && parent.tagName !== 'UL' && parent.tagName !== 'OL') {
      const ul = doc.createElement('ul');
      parent.insertBefore(ul, li);
      ul.appendChild(li);
    }
  });
  return wrapped.innerHTML.trim();
}

/** Plain text of a rich-text value (for alt fallbacks, counters, previews). */
export function richTextToPlain(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|li|h[2-4]|blockquote)>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * A site-internal English link on a Malay page points at the Malay page instead
 * (`/en` → `/ms`, `/en/contact` → `/ms/contact`); owners type one link for both
 * languages. Anything else — external, mailto, already /ms — is left as it is.
 */
export function localizeHref(href: string, lang: 'en' | 'ms'): string {
  if (lang !== 'ms') return href;
  return /^\/en(?=$|[/?#])/.test(href) ? `/ms${href.slice(3)}` : href;
}

/** Same rewrite for every href="/en…" inside sanitised rich text. */
export function localizeHtmlLinks(html: string, lang: 'en' | 'ms'): string {
  if (lang !== 'ms') return html;
  return html.replace(/href="\/en(?=["/?#])/g, 'href="/ms');
}
