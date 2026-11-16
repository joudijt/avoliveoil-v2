/**
 * Every Buy-now sheet string, English and Malay (FORGE BUY-NOW; was the ORDER-R1 cart/checkout
 * strings). Lazy chunk, NOT owner-editable. `ms` is typed as `UiStrings` (= the shape of `en`), so
 * a missing key fails `tsc`. `{n}`, `{total}` are filled with `fill()`.
 * No health claims, no typed prices in any string. The em dash in `online.notReady` is the
 * owner-approved copy of HITPAY-FORGE-SPEC §5.6 / BUYNOW-FORGE-SPEC §2, kept verbatim.
 */
type UiLang = 'en' | 'ms';

const en = {
  sheet: {
    title: 'Buy now',
    close: 'Close',
    size: 'Size',
    qty: 'Quantity',
    minus: 'Decrease quantity',
    plus: 'Increase quantity',
    each: 'each',
    maxQty: 'Up to {n} bottles per order.',
  },
  form: {
    title: 'Deliver to',
    name: 'Full name',
    phone: 'Mobile number',
    phoneHint: 'Malaysian mobile number, for example 012-345 6789',
    address: 'Address',
    addressPlaceholder: 'House no., street, area, city',
    addressHint: 'Include area and city.',
    postcode: 'Postcode',
    state: 'State',
    stateSelect: 'Select a state',
    stored: 'Your details stay on this device so you do not have to type them next time.',
    forget: 'Forget my details',
    forgotten: 'Your details were removed from this device.',
  },
  errors: {
    summary: 'Please check the details marked below.',
    nameRequired: 'Enter your name.',
    phoneRequired: 'Enter your mobile number.',
    phoneInvalid: 'Enter a Malaysian mobile number, for example 012-345 6789. We deliver within Malaysia only.',
    addressRequired: 'Enter your address.',
    addressShort: 'Add your street, area and city.',
    postcodeRequired: 'Enter your postcode.',
    postcodeInvalid: 'The postcode must be 5 digits.',
    stateRequired: 'Select your state.',
    tooLong: 'This is too long. Please shorten it.',
  },
  summary: {
    title: 'Your order',
    delivery: 'Delivery',
    free: 'Free delivery',
    total: 'Total',
  },
  online: {
    pay: 'Pay {total} securely',
    methods: "FPX · Touch 'n Go · GrabPay · ShopeePay · DuitNow · WeChat Pay · cards",
    secureNote: 'Secure payment by HitPay',
    opening: 'Opening the secure payment page…',
    checking: 'Checking delivery and payment…',
    notReady: 'Online payment opens soon — message us on WhatsApp',
    notReadyAction: 'Order on WhatsApp',
    unavailable: 'Online payment is not available right now. Please try again in a minute, or message us on WhatsApp.',
    detailsRefused: 'Some details were not accepted. Please check them.',
    productGone: 'This product is no longer available. Please reload the page and try again.',
    stale: 'This page is out of date. Please reload it and try again.',
    review: 'We are checking the payment of this order. Please message us on WhatsApp with your order reference.',
    tooMany: 'Too many tries. Please wait a few minutes and try again.',
    busy: 'Your payment page is being prepared. Please wait a moment and tap Pay again.',
    priceChanged: 'The total is now {total}. Please check it and tap Pay again.',
    whatsappHelp: 'Message us on WhatsApp',
  },
};

export type UiStrings = typeof en;

const ms: UiStrings = {
  sheet: {
    title: 'Beli sekarang',
    close: 'Tutup',
    size: 'Saiz',
    qty: 'Kuantiti',
    minus: 'Kurangkan kuantiti',
    plus: 'Tambah kuantiti',
    each: 'sebotol',
    maxQty: 'Sehingga {n} botol bagi setiap pesanan.',
  },
  form: {
    title: 'Hantar kepada',
    name: 'Nama penuh',
    phone: 'Nombor telefon bimbit',
    phoneHint: 'Nombor telefon bimbit Malaysia, contohnya 012-345 6789',
    address: 'Alamat',
    addressPlaceholder: 'No. rumah, jalan, kawasan, bandar',
    addressHint: 'Sertakan kawasan dan bandar.',
    postcode: 'Poskod',
    state: 'Negeri',
    stateSelect: 'Pilih negeri',
    stored: 'Maklumat anda disimpan dalam peranti ini supaya anda tidak perlu menaip semula nanti.',
    forget: 'Padam maklumat saya',
    forgotten: 'Maklumat anda telah dipadam daripada peranti ini.',
  },
  errors: {
    summary: 'Sila semak maklumat yang ditanda di bawah.',
    nameRequired: 'Sila masukkan nama anda.',
    phoneRequired: 'Sila masukkan nombor telefon bimbit anda.',
    phoneInvalid:
      'Sila masukkan nombor telefon bimbit Malaysia, contohnya 012-345 6789. Kami hanya menghantar dalam Malaysia.',
    addressRequired: 'Sila masukkan alamat anda.',
    addressShort: 'Sila tambah jalan, kawasan dan bandar.',
    postcodeRequired: 'Sila masukkan poskod anda.',
    postcodeInvalid: 'Poskod mesti 5 digit.',
    stateRequired: 'Sila pilih negeri anda.',
    tooLong: 'Terlalu panjang. Sila pendekkan.',
  },
  summary: {
    title: 'Pesanan anda',
    delivery: 'Penghantaran',
    free: 'Penghantaran percuma',
    total: 'Jumlah',
  },
  online: {
    pay: 'Bayar {total} dengan selamat',
    methods: "FPX · Touch 'n Go · GrabPay · ShopeePay · DuitNow · WeChat Pay · kad",
    secureNote: 'Bayaran selamat oleh HitPay',
    opening: 'Membuka halaman bayaran yang selamat…',
    checking: 'Menyemak penghantaran dan bayaran…',
    notReady: 'Bayaran dalam talian akan dibuka tidak lama lagi — hubungi kami melalui WhatsApp',
    notReadyAction: 'Pesan melalui WhatsApp',
    unavailable: 'Bayaran dalam talian tidak tersedia buat masa ini. Sila cuba lagi sebentar lagi, atau hubungi kami melalui WhatsApp.',
    detailsRefused: 'Sebahagian maklumat tidak diterima. Sila semak semula.',
    productGone: 'Produk ini sudah tiada. Sila muat semula halaman dan cuba lagi.',
    stale: 'Halaman ini sudah lama. Sila muat semula dan cuba lagi.',
    review: 'Kami sedang menyemak bayaran pesanan ini. Sila hubungi kami melalui WhatsApp dengan rujukan pesanan anda.',
    tooMany: 'Terlalu banyak cubaan. Sila tunggu beberapa minit dan cuba lagi.',
    busy: 'Halaman bayaran anda sedang disediakan. Sila tunggu sebentar dan tekan Bayar sekali lagi.',
    priceChanged: 'Jumlah kini {total}. Sila semak dan tekan Bayar sekali lagi.',
    whatsappHelp: 'Hubungi kami melalui WhatsApp',
  },
};

export const UI_STRINGS: Record<UiLang, UiStrings> = { en, ms };

/** Replaces {key} placeholders; an unknown placeholder is left as it is. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, key: string) => (key in values ? String(values[key]) : m));
}
