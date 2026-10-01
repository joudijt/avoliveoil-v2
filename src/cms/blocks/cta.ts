import type { MouseEvent } from 'react';
import type { CmsLang, Localized, StoreKey } from '../contracts';
import { FORM_ANCHOR } from '../contracts';
import { MADINAH_URL, SHOPEE_URL, TIKTOK_SHOP_URL } from '../../config/site';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { CMS_ICON_COMPONENTS, NoteIcon, ShopBagIcon, type IconC } from './icons';
import { ui } from './strings';

/** The seller's three shop fronts. URLs come only from storeFacts (src/config/site.ts), never from the page. */
export const STORE_URLS: Record<StoreKey, string> = { madinah: MADINAH_URL, shopee: SHOPEE_URL, tiktok: TIKTOK_SHOP_URL };
export const STORE_ICONS: Record<StoreKey, IconC> = { madinah: CMS_ICON_COMPONENTS.store, shopee: ShopBagIcon, tiktok: NoteIcon };

export function isStoreKey(v: unknown): v is StoreKey {
  return v === 'madinah' || v === 'shopee' || v === 'tiktok';
}

/** wa.me link with the owner's message in this language (English, then the default greeting, as fallbacks). */
export function whatsappHref(message: Localized | undefined, lang: CmsLang): string {
  const text = message?.[lang]?.trim() || message?.en?.trim() || ui(lang, 'waMessage');
  return buildWhatsAppUrl(text, []);
}

/**
 * "Fill the form": with JavaScript, a smooth scroll to the page's form anchor (the
 * `scroll-mt-28` on the anchor keeps it clear of the fixed header); without, the
 * plain `#cms-form` link jumps there.
 */
export function goToForm(e: MouseEvent<HTMLAnchorElement>): void {
  const el = document.getElementById(FORM_ANCHOR);
  if (!el) return;
  e.preventDefault();
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  if (window.location.hash !== `#${FORM_ANCHOR}`) history.replaceState(history.state, '', `#${FORM_ANCHOR}`);
}
