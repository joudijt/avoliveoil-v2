import { WHATSAPP_NUMBER } from '../utils/whatsapp';

/**
 * Ordering config (FORGE ORDER-R1 -> HITPAY -> BUY-NOW). Buying is online payment through HitPay
 * from the Buy-now sheet. Whether online payment is open and the delivery fee come from the server
 * (`GET /api/pay/config?site=av`, set in the control panel: RULINGS R3), asked again every time the
 * sheet opens, never from this file.
 */
export const ORDER_CONFIG = {
  whatsapp: WHATSAPP_NUMBER,
  maxQty: 24,
  refPrefix: 'AV',
  /** Site code of the pay server (`av` = avoliveoil.com, `nf` = the Noor Fès page). */
  paySite: 'av' as const,
  keys: {
    /** BUY-NOW B5: new shape (one address field, no city/note), so a new key; v1 is deleted, not migrated. */
    details: 'avo.details.v2',
    /** The buy-now draft: sku, qty, details hash, idem (+ ref/token). No personal data. */
    draft: 'avo.draft.v1',
    /** The paid order's WhatsApp message, kept for a reload of the paid page. */
    paid: 'avo.paid.v1',
  },
  /** Deleted once on load (BUY-NOW B5): the cart, the ORDER-R1 order snapshot (name, phone, address), old details. */
  oldKeys: ['avo.cart.v1', 'avo.order.v1', 'avo.details.v1'],
  oldSessionKeys: ['avo.cartOpened'],
  detailsTtlMs: 30 * 24 * 60 * 60 * 1000,
  /** A draft (ref + token for the paid page) lives this long. */
  draftTtlMs: 24 * 60 * 60 * 1000,
  /** The same order within this window keeps its idempotency key (RULINGS B8; the server's reuse window). */
  draftReuseMs: 20 * 60 * 1000,
};
