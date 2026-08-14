import storeFacts from '../data/storeFacts.json';

/**
 * Every checkable fact — seller, branches, hours, prices — lives in
 * `src/data/storeFacts.json` and is re-exported from here. `scripts/build-llms.mjs`
 * reads the same JSON to fill the llms*.txt templates, so a value cannot drift
 * between the pages, the JSON-LD and the files written for AI assistants.
 * Change a fact there, never here and never in content.
 */
export const STORE = storeFacts;
export const STORE_BRANCHES = storeFacts.branches;
export const STORE_HOURS = storeFacts.hours;
export const STORE_SCALE = storeFacts.scale;
export const PRICES = storeFacts.prices;

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
export const SHOPEE_URL = storeFacts.seller.shopeeUrl;
export const TIKTOK_SHOP_URL = storeFacts.seller.tiktokShopUrl;

/** Social accounts are the parent store's, shared across the group's brands. */
export const INSTAGRAM_URL = 'https://www.instagram.com/berkatmadinah';
export const FACEBOOK_URL = 'https://www.facebook.com/share/1DMS971Fwk/';

/** Official distributor — a storefront, not a social account, so it's labelled. */
export const MADINAH_NAME = storeFacts.seller.name;
export const MADINAH_URL = storeFacts.seller.url;

/**
 * Contact details. These are the official distributor's — the brand is reached
 * through Berkat Madinah Store rather than a separate office, which is also why
 * the address is not translated per locale: a street address has to stay
 * readable to a courier and to Google Maps in its original form.
 */
export const CONTACT_EMAIL = storeFacts.seller.email;
/** Walk-in address = the Ampang branch, composed from storeFacts rather than retyped. */
export const CONTACT_ADDRESS = `${storeFacts.branches[0].street}, ${storeFacts.branches[0].postalCode} ${storeFacts.branches[0].locality}, ${storeFacts.branches[0].region}`;

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
