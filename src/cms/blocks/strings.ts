import type { CmsLang } from '../contracts';

/**
 * Visitor-facing interface words the blocks need (form states, lightbox controls,
 * not-found view). They are fixed UI text, not page content, so they live here
 * rather than in common.json — keeps the CMS chunk independent of key renames.
 */
const STRINGS = {
  en: {
    sending: 'Sending…',
    tooMany: 'Too many messages from your connection. Please try again in a few minutes.',
    failed: 'Sorry, your message could not be sent. Please try again, or message us on WhatsApp.',
    checkFields: 'Please check the highlighted fields.',
    required: 'This field is required.',
    notSent: 'Your message was not sent. Please fill in every field marked * correctly and try again.',
    honeypot: 'Leave this field empty',
    choose: 'Choose…',
    viewProduct: 'View product',
    openImage: 'Open image {n} of {total}',
    close: 'Close',
    previous: 'Previous image',
    next: 'Next image',
    gallery: 'Image gallery',
    video: 'Video',
    notFoundKicker: 'Error 404',
    notFoundTitle: 'Page not found',
    notFoundText: 'This page may have moved or is no longer available.',
    backHome: 'Back to the home page',
    breadcrumb: 'Breadcrumb',
    whatsappUs: 'WhatsApp us',
    fillForm: 'Fill the form',
    waMessage: 'Hello, I would like to ask about your olive oil.',
    soldBy: 'Sold in Malaysia by {store}',
    fullSite: 'Visit the full website',
    language: 'Language',
    callToAction: 'Contact options',
  },
  ms: {
    sending: 'Menghantar…',
    tooMany: 'Terlalu banyak mesej dari sambungan anda. Sila cuba lagi dalam beberapa minit.',
    failed: 'Maaf, mesej anda tidak dapat dihantar. Sila cuba lagi, atau hubungi kami di WhatsApp.',
    checkFields: 'Sila semak ruangan yang ditandakan.',
    required: 'Ruangan ini wajib diisi.',
    notSent: 'Mesej anda tidak dihantar. Sila isi setiap ruangan bertanda * dengan betul dan cuba lagi.',
    honeypot: 'Biarkan ruangan ini kosong',
    choose: 'Pilih…',
    viewProduct: 'Lihat produk',
    openImage: 'Buka gambar {n} daripada {total}',
    close: 'Tutup',
    previous: 'Gambar sebelumnya',
    next: 'Gambar seterusnya',
    gallery: 'Galeri gambar',
    video: 'Video',
    notFoundKicker: 'Ralat 404',
    notFoundTitle: 'Halaman tidak dijumpai',
    notFoundText: 'Halaman ini mungkin telah dipindahkan atau tidak lagi tersedia.',
    backHome: 'Kembali ke laman utama',
    // Same label the site's own Breadcrumbs component uses on every page.
    breadcrumb: 'Breadcrumb',
    whatsappUs: 'WhatsApp kami',
    fillForm: 'Isi borang',
    waMessage: 'Hai, saya ingin bertanya tentang minyak zaitun anda.',
    soldBy: 'Dijual di Malaysia oleh {store}',
    fullSite: 'Lawati laman web penuh',
    language: 'Bahasa',
    callToAction: 'Pilihan hubungan',
  },
} as const satisfies Record<CmsLang, Record<string, string>>;

export type UiKey = keyof (typeof STRINGS)['en'];

export function ui(lang: CmsLang, key: UiKey, vars?: Record<string, string | number>): string {
  let s: string = (STRINGS[lang] ?? STRINGS.en)[key];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}
