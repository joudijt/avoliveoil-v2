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
export const SITE_NAME = storeFacts.site.name;
export const OG_IMAGE_PATH = storeFacts.site.ogImage;

/**
 * Brand marks. Every one of these is derived from the single logo the header
 * renders (`src/assets/logo/logo_theme.svg`) by `scripts/brand-assets.py`, so a
 * logo change is one script run, not a hunt through components and schema.
 *
 * `LOGO_PATH` is the vector lockup the pages and `/logo.svg` serve.
 * `LOGO_RASTER_PATH` is what the JSON-LD `logo` points at: schema wants pixel
 * dimensions, and an SVG has none to give truthfully.
 */
export const LOGO_PATH = storeFacts.site.logo;
export const LOGO_RASTER_PATH = storeFacts.site.logoRaster;
export const LOGO_RASTER_WIDTH = storeFacts.site.logoRasterWidth;
export const LOGO_RASTER_HEIGHT = storeFacts.site.logoRasterHeight;
export const ICON_PATH = storeFacts.site.icon;

/**
 * The brand as each language writes it. The Arabic pages render القرية العربية
 * in 42 places, so an installed app called "Arabian Village" on an Arabic phone
 * would be the wrong-language-body failure in miniature.
 */
export const SITE_NAME_BY_LANG: Record<string, string> = {
  en: storeFacts.site.name,
  ms: storeFacts.site.nameMs,
  ar: storeFacts.site.nameAr,
};

/** One web manifest per language: name, dir and start_url all differ. */
export const MANIFEST_BY_LANG: Record<string, string> = {
  en: '/site.webmanifest',
  ms: '/site-ms.webmanifest',
  ar: '/site-ar.webmanifest',
};

/**
 * Declared on every `og:image`. Verified rather than assumed: `public/og-image.jpg`
 * and all 117 per-article cards in `public/og/` are exactly 1200x630 on disk.
 * Re-check with `scripts/brand-assets.py --check` before changing these numbers.
 */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = 'image/jpeg';

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
