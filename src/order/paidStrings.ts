/**
 * Strings of the HitPay return page /<lang>/order/paid (FORGE HITPAY §5.5/5.6). Lazy chunk, not
 * owner-editable. `ms` is typed as the shape of `en`, so a missing key fails `tsc`.
 */
const en = {
  seoTitle: 'Your payment | Arabian Village',
  seoDescription: 'Payment status of your Arabian Village olive oil order.',
  checkingTitle: 'Checking your payment…',
  checkingBody: 'This takes a few seconds. Please keep this page open.',
  paidTitle: 'Payment received — thank you!',
  paidBody: 'Your order is paid. We will contact you about delivery.',
  sendDetails: 'Send order details on WhatsApp',
  sendDetailsHint: 'Optional: send us your order on WhatsApp so we can confirm delivery faster.',
  method: 'Paid with',
  failedTitle: 'Payment not completed',
  failedBody: 'The payment was not completed and nothing was charged. Tap Try again to pay for the same order.',
  tryAgain: 'Try again',
  waitTitle: 'We have not received the payment confirmation yet',
  waitBody: 'If you paid, it can take a few minutes. Check again, or message us on WhatsApp with your order reference.',
  checkAgain: 'Check again',
  reviewTitle: 'We are checking your payment',
  reviewBody: 'Please message us on WhatsApp with your order reference. We will sort it out with you.',
  missingTitle: 'We could not find this order',
  missingBody: 'Open the link from the device you ordered on, or message us on WhatsApp.',
  whatsapp: 'Message us on WhatsApp',
  home: 'Back to the home page',
  refLabel: 'Order reference',
  summaryTitle: 'Your order',
  subtotal: 'Subtotal',
  delivery: 'Delivery',
  free: 'Free',
  total: 'Total',
};

export type PaidStrings = typeof en;

const ms: PaidStrings = {
  seoTitle: 'Bayaran anda | Arabian Village',
  seoDescription: 'Status bayaran pesanan minyak zaitun Arabian Village anda.',
  checkingTitle: 'Menyemak bayaran anda…',
  checkingBody: 'Ini mengambil masa beberapa saat. Sila biarkan halaman ini terbuka.',
  paidTitle: 'Bayaran diterima — terima kasih!',
  paidBody: 'Pesanan anda telah dibayar. Kami akan menghubungi anda tentang penghantaran.',
  sendDetails: 'Hantar butiran pesanan melalui WhatsApp',
  sendDetailsHint: 'Pilihan: hantar pesanan anda kepada kami melalui WhatsApp supaya kami dapat mengesahkan penghantaran dengan lebih cepat.',
  method: 'Dibayar dengan',
  failedTitle: 'Bayaran tidak selesai',
  failedBody: 'Bayaran tidak selesai dan tiada caj dikenakan. Tekan Cuba lagi untuk membayar pesanan yang sama.',
  tryAgain: 'Cuba lagi',
  waitTitle: 'Kami belum menerima pengesahan bayaran',
  waitBody: 'Jika anda sudah membayar, ia boleh mengambil masa beberapa minit. Semak semula, atau hubungi kami melalui WhatsApp dengan rujukan pesanan anda.',
  checkAgain: 'Semak semula',
  reviewTitle: 'Kami sedang menyemak bayaran anda',
  reviewBody: 'Sila hubungi kami melalui WhatsApp dengan rujukan pesanan anda. Kami akan menyelesaikannya bersama anda.',
  missingTitle: 'Pesanan ini tidak ditemui',
  missingBody: 'Buka pautan daripada peranti yang anda gunakan untuk membuat pesanan, atau hubungi kami melalui WhatsApp.',
  whatsapp: 'Hubungi kami melalui WhatsApp',
  home: 'Kembali ke laman utama',
  refLabel: 'Rujukan pesanan',
  summaryTitle: 'Pesanan anda',
  subtotal: 'Jumlah kecil',
  delivery: 'Penghantaran',
  free: 'Percuma',
  total: 'Jumlah',
};

export const PAID_STRINGS: Record<'en' | 'ms', PaidStrings> = { en, ms };
