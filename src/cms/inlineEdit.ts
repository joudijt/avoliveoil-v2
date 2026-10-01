/**
 * In-place editing of EXISTING pages (spec §6, §11, §13.7, §15), loaded by
 * main.tsx only when the server says `boot.edit` (admin session + ?cms-edit=1).
 * The page runs inside the admin's iframe; this file talks to the admin shell
 * with EditPageToShell / ShellToEditPage messages, same origin only.
 *
 * Rules:
 *  - React owns these nodes, so text is NEVER edited with contentEditable: a
 *    click opens an overlay <input>/<textarea> positioned over the element.
 *    Enter or leaving the field = done, Esc = cancel. The new value is applied to
 *    i18next right away (optimistic) and React re-renders it; the shell answers
 *    with ov:set-text, which re-applies the same value.
 *  - template texts (`{{store}}`…) and the hero headline words are edited in the
 *    shell's side panel: a click only sends ov:focus.
 *  - photos (`data-cms-img`) send ov:image-click; ov:set-image swaps src/srcset in place.
 *  - links never navigate and forms never submit; buttons that open a modal still work.
 */
import i18n from '../i18n';
import type { EditPageToShell, ImageOverride, ShellToEditPage, TextValue } from './contracts';
import { srcSetOf, widestUrl } from './media';

const NS = 'common';
const ATTR_SEP = /[;|]/;
const STYLE_ID = 'cms-inline-edit-css';

const STYLES = `
[data-cms], [data-cms-num], [data-cms-words], [data-cms-attr]:not(img) { cursor: text; }
img[data-cms-img] { cursor: pointer; }
/* Some layouts make their text click-through (pointer-events: none, e.g. the Home hero copy over
   its photo); while editing, every marked element must take the click itself. */
html[data-cms-inline] [data-cms], html[data-cms-inline] [data-cms-num], html[data-cms-inline] [data-cms-words],
html[data-cms-inline] [data-cms-attr], html[data-cms-inline] img[data-cms-img] { pointer-events: auto !important; }
html[data-cms-inline] [data-cms]:hover, html[data-cms-inline] [data-cms-num]:hover, html[data-cms-inline] [data-cms-words]:hover,
html[data-cms-inline] [data-cms-attr]:not(img):hover, html[data-cms-inline] img[data-cms-img]:hover {
  outline: 2px dashed #b88a2a !important; outline-offset: 3px;
}
[data-cms-hl] { outline: 3px solid #3b82f6 !important; outline-offset: 4px; }
.cms-ov-input {
  position: absolute; z-index: 2147483600; margin: 0; box-sizing: border-box; resize: none; overflow: hidden;
  padding: 4px 6px; border: 2px solid #b88a2a; border-radius: 6px; background: #fffdf8; color: #2e3a24;
  box-shadow: 0 10px 30px rgba(46,58,36,.25); outline: none;
}
.cms-ov-hint {
  position: absolute; z-index: 2147483601; pointer-events: none; padding: 2px 8px; border-radius: 4px;
  background: #2e3a24; color: #fffdf8; font: 500 11px/18px Inter, system-ui, sans-serif; white-space: nowrap;
}
`;

function post(msg: EditPageToShell) {
  if (window.parent === window) return;
  window.parent.postMessage(msg, window.location.origin);
}

function fromShell(e: MessageEvent): ShellToEditPage | null {
  if (e.origin !== window.location.origin || window.parent === window || e.source !== window.parent) return null;
  const d = e.data as { type?: unknown } | null;
  if (!d || typeof d !== 'object' || typeof d.type !== 'string' || !d.type.startsWith('ov:')) return null;
  return d as ShellToEditPage;
}

function attrKeys(el: Element): { attr: string; key: string }[] {
  const raw = el.getAttribute('data-cms-attr') ?? '';
  return raw
    .split(ATTR_SEP)
    .map((part) => {
      const i = part.indexOf(':');
      return i > 0 ? { attr: part.slice(0, i).trim(), key: part.slice(i + 1).trim() } : null;
    })
    .filter((x): x is { attr: string; key: string } => !!x && !!x.key);
}

function currentValue(key: string): unknown {
  return i18n.getResource(i18n.language, NS, key);
}

/** A key edited as a template (tokens shown) — the side panel's job, not the overlay's. */
function isTemplateKey(key: string): boolean {
  const v = currentValue(key);
  return typeof v === 'string' && /\{\{[^}]+\}\}/.test(v);
}

/**
 * Apply a value to i18next and make every useTranslation() consumer re-render.
 * `languageChanged` is the event react-i18next binds to by default; emitting it
 * (without actually changing language) re-renders with the new resource and has
 * no other side effect.
 */
function applyText(key: string, value: TextValue) {
  const lng = i18n.language;
  const current = currentValue(key);
  let next: unknown = value;
  if (typeof current === 'number') {
    const n = typeof value === 'number' ? value : Number(String(value).replace(/[,\s]/g, ''));
    if (!Number.isFinite(n)) return;
    next = n;
  }
  i18n.addResource(lng, NS, key, next as string, { silent: true });
  i18n.emit('languageChanged', lng);
}

// ---------------------------------------------------------------- images

const originals = new Map<HTMLImageElement, { src: string; srcset: string | null; width: string | null; height: string | null; alt: string | null; objectPosition: string }>();

function setImage(key: string, ov: ImageOverride | null) {
  document.querySelectorAll<HTMLImageElement>(`img[data-cms-img="${CSS_escape(key)}"]`).forEach((img) => {
    if (!originals.has(img)) {
      originals.set(img, {
        src: img.getAttribute('src') ?? '',
        srcset: img.getAttribute('srcset'),
        width: img.getAttribute('width'),
        height: img.getAttribute('height'),
        alt: img.getAttribute('alt'),
        objectPosition: img.style.objectPosition,
      });
    }
    if (!ov) {
      const o = originals.get(img)!;
      img.setAttribute('src', o.src);
      setOrRemove(img, 'srcset', o.srcset);
      setOrRemove(img, 'width', o.width);
      setOrRemove(img, 'height', o.height);
      setOrRemove(img, 'alt', o.alt);
      img.style.objectPosition = o.objectPosition;
      return;
    }
    const variants = ov.media?.variants ?? [];
    if (variants.length === 0) return;
    img.setAttribute('srcset', srcSetOf(variants));
    img.setAttribute('src', widestUrl(variants));
    img.setAttribute('width', String(ov.media.width));
    img.setAttribute('height', String(ov.media.height));
    img.setAttribute('alt', ov.alt ?? '');
    img.style.objectPosition = ov.focal ? `${clampPct(ov.focal.x)}% ${clampPct(ov.focal.y)}%` : originals.get(img)!.objectPosition;
  });
}

function clampPct(n: number) {
  return Math.min(100, Math.max(0, Math.round(Number(n) || 50)));
}

function setOrRemove(el: Element, name: string, value: string | null) {
  if (value === null) el.removeAttribute(name);
  else el.setAttribute(name, value);
}

function CSS_escape(s: string) {
  return typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(s) : s.replace(/["\\]/g, '\\$&');
}

// ---------------------------------------------------------------- overlay editor

interface Overlay {
  key: string;
  input: HTMLInputElement | HTMLTextAreaElement;
  hint: HTMLElement;
  done: boolean;
}

let overlay: Overlay | null = null;

function closeOverlay() {
  if (!overlay) return;
  overlay.done = true;
  overlay.input.remove();
  overlay.hint.remove();
  overlay = null;
}

function openOverlay(el: HTMLElement, key: string, numeric: boolean) {
  closeOverlay();
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const lineH = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.3;
  const multi = !numeric && r.height > lineH * 1.6;
  const input = document.createElement(multi ? 'textarea' : 'input');
  input.className = 'cms-ov-input';
  if (input instanceof HTMLInputElement) input.type = 'text';
  if (numeric && input instanceof HTMLInputElement) input.inputMode = 'numeric';
  const raw = currentValue(key);
  input.value = numeric ? String(typeof raw === 'number' ? raw : (el.textContent ?? '').replace(/[,\s]/g, '')) : String(typeof raw === 'string' ? raw : el.textContent ?? '');
  input.setAttribute('aria-label', `Edit text (${key})`);
  input.spellcheck = true;

  const minW = 160;
  const width = Math.max(r.width + 16, minW);
  const left = Math.max(4, Math.min(r.left + window.scrollX - 8, document.documentElement.clientWidth + window.scrollX - width - 4));
  Object.assign(input.style, {
    left: `${left}px`,
    top: `${r.top + window.scrollY - 6}px`,
    width: `${width}px`,
    minHeight: `${Math.max(r.height + 12, 36)}px`,
    font: cs.font,
    fontFamily: cs.fontFamily,
    fontSize: cs.fontSize,
    fontWeight: cs.fontWeight,
    fontStyle: cs.fontStyle,
    letterSpacing: cs.letterSpacing,
    lineHeight: cs.lineHeight,
    textTransform: cs.textTransform,
    textAlign: cs.textAlign === 'center' || cs.textAlign === 'right' || cs.textAlign === 'end' ? cs.textAlign : 'left',
  } satisfies Partial<CSSStyleDeclaration>);

  const hint = document.createElement('div');
  hint.className = 'cms-ov-hint';
  hint.textContent = numeric ? 'Numbers only · Enter = done · Esc = cancel' : 'Enter = done · Esc = cancel';
  hint.style.left = `${left}px`;
  hint.style.top = `${Math.max(0, r.top + window.scrollY - 30)}px`;

  document.body.append(input, hint);
  const ov: Overlay = { key, input, hint, done: false };
  overlay = ov;

  const grow = () => {
    if (input instanceof HTMLTextAreaElement) {
      input.style.height = 'auto';
      input.style.height = `${input.scrollHeight + 4}px`;
    }
  };
  grow();
  input.focus({ preventScroll: true });
  input.select();

  const original = input.value;
  const commit = () => {
    if (ov.done) return;
    const text = input.value.replace(/\s*\n\s*/g, ' ').trim();
    closeOverlay();
    if (text === original.trim()) return;
    if (numeric) {
      const n = Number(text.replace(/[,\s]/g, ''));
      if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) return;
      applyText(key, n);
      post({ type: 'ov:text', key, value: n });
      return;
    }
    if (!text) return; // an empty text is a reset, which the side panel does explicitly
    applyText(key, text);
    post({ type: 'ov:text', key, value: text });
  };

  input.addEventListener('input', grow);
  input.addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'Escape') {
      ke.preventDefault();
      closeOverlay();
    } else if (ke.key === 'Enter') {
      ke.preventDefault();
      commit();
    }
  });
  input.addEventListener('blur', commit);
}

// ---------------------------------------------------------------- start

let started = false;

function collectKeys(): { keys: string[]; imageKeys: string[] } {
  const keys = new Set<string>();
  document.querySelectorAll('[data-cms]').forEach((el) => keys.add(el.getAttribute('data-cms') ?? ''));
  document.querySelectorAll('[data-cms-num]').forEach((el) => keys.add(el.getAttribute('data-cms-num') ?? ''));
  document.querySelectorAll('[data-cms-words]').forEach((el) => keys.add(el.getAttribute('data-cms-words') ?? ''));
  document.querySelectorAll('[data-cms-attr]').forEach((el) => attrKeys(el).forEach((a) => keys.add(a.key)));
  const imageKeys = new Set<string>();
  document.querySelectorAll('[data-cms-img]').forEach((el) => imageKeys.add(el.getAttribute('data-cms-img') ?? ''));
  keys.delete('');
  imageKeys.delete('');
  return { keys: [...keys], imageKeys: [...imageKeys] };
}

const MARKED = 'img[data-cms-img], [data-cms-words], [data-cms-num], [data-cms], [data-cms-attr]';

/**
 * The element the owner meant. Some layouts stack an empty positioning layer over their
 * text (the Home hero's z-20 grid covers its headline, sub text and photo), so the click
 * target is that layer: look through it to the first marked element under the pointer,
 * stopping at anything interactive so a real button or link is never skipped.
 */
function clickTarget(e: MouseEvent): Element | null {
  const t = e.target;
  if (!(t instanceof Element)) return null;
  if (t.closest(MARKED) || t.closest('a, button, input, select, textarea, label, summary')) return t;
  for (const el of document.elementsFromPoint(e.clientX, e.clientY)) {
    if (el.closest(MARKED)) return el;
    if (el.closest('a, button, input, select, textarea, label, summary')) break;
  }
  return t;
}

function onClickCapture(e: MouseEvent) {
  const t = clickTarget(e);
  if (!t) return;
  if (t.closest('.cms-ov-input')) return;

  const img = t.closest<HTMLElement>('img[data-cms-img]');
  if (img) {
    e.preventDefault();
    e.stopPropagation();
    post({ type: 'ov:image-click', key: img.getAttribute('data-cms-img') ?? '' });
    return;
  }
  const words = t.closest<HTMLElement>('[data-cms-words]');
  if (words) {
    e.preventDefault();
    e.stopPropagation();
    post({ type: 'ov:focus', key: words.getAttribute('data-cms-words') ?? '' });
    return;
  }
  const num = t.closest<HTMLElement>('[data-cms-num]');
  const text = t.closest<HTMLElement>('[data-cms]');
  // The innermost marked element wins.
  const target = num && text ? (num.contains(text) ? text : num) : (num ?? text);
  if (target) {
    e.preventDefault();
    e.stopPropagation();
    const key = (target === num ? num.getAttribute('data-cms-num') : target.getAttribute('data-cms')) ?? '';
    if (!key) return;
    if (target !== num && isTemplateKey(key)) post({ type: 'ov:focus', key });
    else openOverlay(target, key, target === num);
    return;
  }
  const attrEl = t.closest<HTMLElement>('[data-cms-attr]');
  if (attrEl && attrEl.tagName !== 'IMG') {
    const first = attrKeys(attrEl)[0];
    if (first) {
      e.preventDefault();
      e.stopPropagation();
      post({ type: 'ov:focus', key: first.key });
      return;
    }
  }
  // Everything else behaves normally, except that nothing navigates away from the page being edited.
  const a = t.closest('a[href]');
  if (a) e.preventDefault();
}

function onSubmitCapture(e: Event) {
  e.preventDefault();
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && overlay) {
    e.preventDefault();
    closeOverlay();
  }
}

function highlight(key: string | null) {
  document.querySelectorAll('[data-cms-hl]').forEach((el) => el.removeAttribute('data-cms-hl'));
  if (!key) return;
  const k = CSS_escape(key);
  const els = [
    ...document.querySelectorAll<HTMLElement>(`[data-cms="${k}"], [data-cms-num="${k}"], [data-cms-words="${k}"], [data-cms-img="${k}"]`),
    ...Array.from(document.querySelectorAll<HTMLElement>('[data-cms-attr]')).filter((el) => attrKeys(el).some((a) => a.key === key)),
  ];
  els.forEach((el) => el.setAttribute('data-cms-hl', ''));
  els[0]?.scrollIntoView({ block: 'center', behavior: 'auto' });
}

function onMessage(e: MessageEvent) {
  const msg = fromShell(e);
  if (!msg) return;
  if (msg.type === 'ov:set-text') {
    if (typeof msg.key === 'string' && msg.key) applyText(msg.key, msg.value);
  } else if (msg.type === 'ov:set-image') {
    if (typeof msg.key === 'string' && msg.key) setImage(msg.key, msg.override ?? null);
  } else if (msg.type === 'ov:highlight') {
    highlight(msg.key ?? null);
  }
}

function whenAppReady(fn: () => void) {
  if (document.body.getAttribute('data-app-ready') === 'true') {
    requestAnimationFrame(() => fn());
    return;
  }
  const mo = new MutationObserver(() => {
    if (document.body.getAttribute('data-app-ready') === 'true') {
      mo.disconnect();
      requestAnimationFrame(() => fn());
    }
  });
  mo.observe(document.body, { attributes: true, attributeFilter: ['data-app-ready'] });
}

export function startInlineEdit(): void {
  if (started || typeof document === 'undefined') return;
  started = true;
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = STYLES;
    document.head.appendChild(style);
  }
  document.documentElement.setAttribute('data-cms-inline', '');
  document.addEventListener('click', onClickCapture, true);
  document.addEventListener('submit', onSubmitCapture, true);
  document.addEventListener('keydown', onKeyDown, true);
  window.addEventListener('message', onMessage);
  // Layout moves (fonts, images) would leave an open overlay floating in the wrong place.
  window.addEventListener('resize', closeOverlay);
  whenAppReady(() => {
    const { keys, imageKeys } = collectKeys();
    post({ type: 'ov:ready', keys, imageKeys, path: window.location.pathname });
  });
}
