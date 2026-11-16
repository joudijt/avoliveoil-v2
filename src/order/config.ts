import { WHATSAPP_NUMBER } from '../utils/whatsapp';

/**
 * Ordering config (FORGE ORDER-R1 + FORGE HITPAY). Checkout is online payment through HitPay
 * (owner answer 6b). Whether online payment is open and the delivery fee come from the server
 * (`GET /api/pay/config?site=av`, set in the control panel: RULINGS R3), never from this file.
 * The Touch 'n Go / DuitNow transfer values of ORDER-R1 are gone with the transfer path.
 */
export const ORDER_CONFIG = {
  whatsapp: WHATSAPP_NUMBER,
  maxQty: 24,
  /**
   * Delivery fee shown before the server answered (cart drawer, chat mode): null = "confirmed
   * on WhatsApp". In online mode the order uses the fee from /api/pay/config.
   */
  deliverySen: null as number | null,
  refPrefix: 'AV',
  /** Site code of the pay server (`av` = avoliveoil.com, `nf` = the Noor Fès page). */
  paySite: 'av' as const,
  urlCap: 1800,
  keys: {
    cart: 'avo.cart.v1',
    details: 'avo.details.v1',
    order: 'avo.order.v1',
    /** The paid order's WhatsApp message, kept for a reload of the paid page (no other data). */
    paid: 'avo.paid.v1',
  },
  detailsTtlMs: 30 * 24 * 60 * 60 * 1000,
  orderTtlMs: 24 * 60 * 60 * 1000,
};
