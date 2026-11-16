/**
 * Strings of the WhatsApp order message (FORGE ORDER-R1, O-2 / O-4). Lazy chunk, NOT owner-editable:
 * the seller reads these, so they stay fixed and short whatever the i18n product names become.
 * Erasable types only: the node test imports this file directly.
 * No em dashes, no health claims, no typed prices in any string.
 */
import type { Lang, MessageLabels } from './core.ts';

export const MESSAGE_LABELS: Record<Lang, MessageLabels> = {
  en: {
    newOrder: 'New order',
    subtotal: 'Subtotal',
    delivery: 'Delivery',
    deliveryTbc: 'to be confirmed',
    total: 'Total',
    payment: 'Payment',
    paymentChat: 'to be arranged on WhatsApp',
    paymentPaid: 'PAID via HitPay',
    name: 'Name',
    phone: 'Phone',
    address: 'Address',
    note: 'Note',
    paidOrder: 'Paid order',
  },
  ms: {
    newOrder: 'Pesanan baharu',
    subtotal: 'Jumlah kecil',
    delivery: 'Penghantaran',
    deliveryTbc: 'akan disahkan',
    total: 'Jumlah',
    payment: 'Bayaran',
    paymentChat: 'akan diatur melalui WhatsApp',
    paymentPaid: 'DIBAYAR melalui HitPay',
    name: 'Nama',
    phone: 'Telefon',
    address: 'Alamat',
    note: 'Nota',
    paidOrder: 'Pesanan dibayar',
  },
};

/** Short fixed product names for the message, keyed by the product id of src/data/catalogue.json. */
export const ORDER_NAMES: Record<Lang, Record<string, string>> = {
  en: {
    'extra-virgin': 'Extra Virgin',
    organic: 'Organic Extra Virgin',
    'lavender-chamomile': 'Infused: Lavender & Chamomile',
    blackseed: 'Infused: Blackseed',
    'turmeric-black-pepper': 'Infused: Turmeric & Black Pepper',
    'rosemary-basil': 'Infused: Rosemary & Basil',
    'fennel-anise': 'Infused: Fennel & Anise',
    'wild-thyme': 'Infused: Wild Thyme',
  },
  ms: {
    'extra-virgin': 'Extra Virgin',
    organic: 'Extra Virgin Organik',
    'lavender-chamomile': 'Infusi: Lavender & Kamomil',
    blackseed: 'Infusi: Habbatus Sauda',
    'turmeric-black-pepper': 'Infusi: Kunyit & Lada Hitam',
    'rosemary-basil': 'Infusi: Rosemary & Selasih',
    'fennel-anise': 'Infusi: Adas & Jintan Manis',
    'wild-thyme': 'Infusi: Timi Liar',
  },
};

/** '500' -> '500 ml'. */
export function sizeLabel(size: string): string {
  return `${size} ml`;
}

/** 13 states + 3 federal territories, official names (the same in both languages). */
export const STATES_MY: readonly string[] = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Perak',
  'Perlis',
  'Pulau Pinang',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
  'W.P. Kuala Lumpur',
  'W.P. Labuan',
  'W.P. Putrajaya',
];
