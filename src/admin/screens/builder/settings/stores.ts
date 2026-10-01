import type { Localized, StoreKey } from '../../../../cms/contracts';
import { MADINAH_URL, SHOPEE_URL, TIKTOK_SHOP_URL } from '../../../../config/site';

const L = (en: string, ms: string): Localized => ({ en, ms });

/**
 * The seller's three shop fronts. The URLs are fixed (storeFacts.json) — the owner only picks
 * which one; `ctaLabel`/`cardButton` are the starting texts the panel swaps in when the owner
 * switches shop and has not written their own text yet.
 */
export const STORES: Record<StoreKey, { name: string; url: string; ctaLabel: Localized; cardButton: Localized }> = {
  madinah: { name: 'Berkat Madinah Store', url: MADINAH_URL, ctaLabel: L('Buy at Berkat Madinah Store', 'Beli di Berkat Madinah Store'), cardButton: L('Visit the store', 'Lawati kedai') },
  shopee: { name: 'Shopee', url: SHOPEE_URL, ctaLabel: L('Buy on Shopee', 'Beli di Shopee'), cardButton: L('Shop on Shopee', 'Beli di Shopee') },
  tiktok: { name: 'TikTok Shop', url: TIKTOK_SHOP_URL, ctaLabel: L('Buy on TikTok Shop', 'Beli di TikTok Shop'), cardButton: L('Shop on TikTok', 'Beli di TikTok') },
};

export const STORE_KEYS = Object.keys(STORES) as StoreKey[];

export const sameLoc = (a: Localized | undefined, b: Localized | undefined) => (a?.en ?? '') === (b?.en ?? '') && (a?.ms ?? '') === (b?.ms ?? '');

/** "shopee.com.my/shop/…" — what the owner recognises, without the scheme. */
export const shortUrl = (u: string) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
