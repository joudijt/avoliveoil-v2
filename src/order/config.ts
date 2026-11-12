import { WHATSAPP_NUMBER } from '../utils/whatsapp';

/**
 * Ordering config (FORGE ORDER-R1). Owner-owed values are `null`:
 * while any `pay` value is null the checkout runs in "chat" mode (order goes to
 * WhatsApp, payment agreed there); once all three are set it switches to
 * "transfer" mode (pay panel) by itself.
 */
export const ORDER_CONFIG = {
  whatsapp: WHATSAPP_NUMBER,
  maxQty: 24,
  /** Delivery fee in sen, or null = "confirmed on WhatsApp" (owner answer 3a). */
  deliverySen: null as number | null,
  pay: {
    /** Public path of the Touch 'n Go QR image, e.g. '/pay/tng-qr-20261112.png'. */
    tngQrImage: null as string | null,
    duitnowNumber: null as string | null,
    accountName: null as string | null,
  },
  refPrefix: 'AV',
  urlCap: 1800,
  keys: {
    cart: 'avo.cart.v1',
    details: 'avo.details.v1',
    order: 'avo.order.v1',
  },
  detailsTtlMs: 30 * 24 * 60 * 60 * 1000,
  orderTtlMs: 24 * 60 * 60 * 1000,
};

export function payReady(): boolean {
  const p = ORDER_CONFIG.pay;
  return Boolean(p.tngQrImage && p.duitnowNumber && p.accountName);
}
