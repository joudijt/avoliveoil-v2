export const SITE_URL = 'https://avoliveoil.com';
export const SITE_NAME = 'Arabian Village';
export const OG_IMAGE_PATH = '/og-image.jpg';

export const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  ar: 'ar_SA',
  ms: 'ms_MY',
};

/**
 * Where to buy. The Shopee link is the shop page rather than the single-item
 * deep link we were given, so visitors land on the full range instead of one
 * listing (the original also carried `upstream=search` tracking that isn't
 * true for traffic arriving from this site).
 */
export const SHOPEE_URL = 'https://shopee.com.my/arabianvillagemalaysia';
export const TIKTOK_SHOP_URL = 'https://vt.tiktok.com/ZSX2MbR9G/?page=TikTokShop';

/** Social accounts are the parent store's, shared across the group's brands. */
export const INSTAGRAM_URL = 'https://www.instagram.com/berkatmadinah';
export const FACEBOOK_URL = 'https://www.facebook.com/share/1DMS971Fwk/';

/** Official distributor — a storefront, not a social account, so it's labelled. */
export const MADINAH_NAME = 'Berkat Madinah Store';
export const MADINAH_URL = 'https://madinah.com.my/en/';

/**
 * Contact details. These are the official distributor's — the brand is reached
 * through Berkat Madinah Store rather than a separate office, which is also why
 * the address is not translated per locale: a street address has to stay
 * readable to a courier and to Google Maps in its original form.
 */
export const CONTACT_EMAIL = 'cs@madinah.com.my';
export const CONTACT_ADDRESS =
  'Putra Sulaiman, 17-L1, Persiaran Putra Sulaiman, Taman Putra Sulaiman, 68000 Ampang Jaya, Selangor';

/**
 * `output=embed` is the keyless Google Maps embed. The documented
 * `maps/embed/v1/place` endpoint needs a billable API key, which this static
 * site has no way to keep secret, so the query form is deliberate.
 */
export const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  CONTACT_ADDRESS
)}&output=embed`;
/** Same place, opened in the real Maps app/site for directions. */
export const GOOGLE_MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT_ADDRESS
)}`;
