/**
 * Reads <script id="cms-boot" type="application/json"> injected by server/serve.php
 * (spec §2, §13.2) and applies it to the running app.
 *
 * The boot payload is absent during the build-time prerender, in `vite dev`, and on
 * the static fallback serve.php streams when the CMS itself is down. Every consumer
 * therefore treats `null` as "no CMS data" and renders the built-in content.
 */
import type { i18n as I18n } from 'i18next';
import type { CmsBoot, CmsLang, HeadlineWord, ImageOverride, MenuItem, TextValue } from './contracts';
import { CMS_LANGS, WHOLE_ARRAY_KEYS } from './contracts';

declare global {
  interface Window {
    /** Set by main.tsx from `boot.edit`: the page is an edit surface — no animations, no smooth scroll. */
    __CMS_STATIC__?: boolean;
  }
}

const NS = 'common';

let parsed: CmsBoot | null | undefined;

/** The parsed boot payload, or null when the page was served without one (prerender, static fallback). */
export function getBoot(): CmsBoot | null {
  if (parsed !== undefined) return parsed;
  parsed = null;
  if (typeof document === 'undefined') return parsed;
  try {
    const raw = document.getElementById('cms-boot')?.textContent;
    if (raw) {
      const value: unknown = JSON.parse(raw);
      if (value && typeof value === 'object' && !Array.isArray(value)) parsed = value as CmsBoot;
    }
  } catch {
    // A damaged payload must never take the site down: render the built-in content.
    parsed = null;
  }
  return parsed;
}

/** True when the page runs as a static CMS edit surface (animations + smooth scroll off). */
export function isCmsStatic(): boolean {
  return typeof window !== 'undefined' && window.__CMS_STATIC__ === true;
}

function isHeadlineWords(value: unknown): value is HeadlineWord[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (w) => w && typeof w === 'object' && typeof (w as HeadlineWord).text === 'string' && typeof (w as HeadlineWord).gold === 'boolean',
    )
  );
}

/**
 * Coerces an override to the shape of the built-in value it replaces, or returns
 * undefined to skip it. The server already filters against the defaults; this is
 * the second line of defence that keeps a bad row from crashing a component that
 * calls `.map()` on a list or `.toLocaleString()` on a number.
 */
function coerce(key: string, value: TextValue, current: unknown): unknown {
  if ((WHOLE_ARRAY_KEYS as readonly string[]).includes(key)) {
    return isHeadlineWords(value) ? value.map((w) => ({ text: w.text, gold: w.gold })) : undefined;
  }
  if (typeof current === 'number') {
    const n = typeof value === 'number' ? value : typeof value === 'string' && value.trim() !== '' ? Number(value) : NaN;
    return Number.isFinite(n) ? n : undefined;
  }
  if (typeof current === 'string') {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
  }
  // Unknown key (orphan), a structural leaf (boolean) or a whole object: leave the built-in value.
  return undefined;
}

/**
 * Applies both languages' text overrides to i18next. Must run BEFORE createRoot so
 * the first render already shows the edited text (no flash of the old copy).
 */
export function applyBootToI18n(i18n: I18n, boot: CmsBoot): void {
  for (const lang of CMS_LANGS) {
    const entries = boot.text?.[lang];
    if (!entries || typeof entries !== 'object') continue;
    for (const [key, value] of Object.entries(entries)) {
      const next = coerce(key, value, i18n.getResource(lang, NS, key));
      if (next === undefined) continue;
      // addResource replaces whatever sits at the dotted path — for hero.headlineWords
      // that is the whole array, which is exactly the whole-array override semantics.
      i18n.addResource(lang, NS, key, next as string, { silent: true });
    }
  }
}

export interface CmsMenu {
  header: MenuItem[];
  footer: MenuItem[];
}

const EMPTY_MENU: CmsMenu = { header: [], footer: [] };
const SLUG_OK = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function cleanItems(items: unknown): MenuItem[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((i): i is MenuItem => !!i && typeof i.slug === 'string' && SLUG_OK.test(i.slug) && typeof i.label === 'string' && i.label !== '')
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

const menuCache = new Map<string, CmsMenu>();

/**
 * CMS pages the owner put in the header / footer, for one language, in menu order.
 * Constant for the life of the page (the boot never changes), so it is safe to call
 * from render.
 */
export function useCmsMenu(lang: string | undefined): CmsMenu {
  const boot = getBoot();
  if (!boot || !lang) return EMPTY_MENU;
  const hit = menuCache.get(lang);
  if (hit) return hit;
  const raw = boot.menu?.[lang as CmsLang];
  const menu = raw ? { header: cleanItems(raw.header), footer: cleanItems(raw.footer) } : EMPTY_MENU;
  menuCache.set(lang, menu);
  return menu;
}

/** The published (or, in edit mode, draft) photo for an image spot, or null for the built-in one. */
export function getImageOverride(spot: string, lang: string | undefined): ImageOverride | null {
  const boot = getBoot();
  if (!boot || !lang) return null;
  const ov = boot.images?.[lang as CmsLang]?.[spot];
  if (!ov || !ov.media || !Array.isArray(ov.media.variants) || ov.media.variants.length === 0) return null;
  if (!(ov.media.width > 0) || !(ov.media.height > 0)) return null;
  return ov;
}
