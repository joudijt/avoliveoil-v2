/**
 * Calls to the pay server (FORGE HITPAY §5.3). Lazy code only: imported by the checkout chunk and
 * the paid page, never by the entry. The contract is written down in docs/forge/HITPAY-AV-HANDOFF.md.
 */
import type { Details, Lang, OrderLine } from './core';

export interface PayConfig {
  ready: boolean;
  /** Delivery fee the server charges, in sen; null while online payment is closed. */
  deliverySen: number | null;
}

export type PayStatus = 'pending' | 'paid' | 'failed' | 'needs_review';

export interface StatusAnswer {
  ref: string;
  status: PayStatus;
  subtotalSen: number;
  deliverySen: number;
  totalSen: number;
  lines: { sku: string; qty: number; unitSen: number }[];
  paymentType: string | null;
}

export type CreateAnswer =
  | { ok: true; ref: string; token: string; url: string | null; status: 'pending' | 'paid'; totalSen: number }
  | { ok: false; code: string; message: string; fields?: Record<string, string> };

const CLOSED: PayConfig = { ready: false, deliverySen: null };
let configPromise: Promise<PayConfig> | null = null;

async function getJson(url: string, init: RequestInit, timeoutMs: number): Promise<{ status: number; data: unknown }> {
  const ctl = typeof AbortController === 'function' ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), timeoutMs) : 0;
  try {
    const res = await fetch(url, { ...init, credentials: 'same-origin', signal: ctl?.signal, headers: { Accept: 'application/json', ...(init.headers ?? {}) } });
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    return { status: res.status, data };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * Is online payment open for this site, and at which delivery fee. Asked once per page view;
 * any failure (offline, old server) = closed, so the customer gets the WhatsApp path, never a
 * pay button that cannot work.
 */
export function loadPayConfig(site: 'av' | 'nf'): Promise<PayConfig> {
  configPromise ??= getJson(`/api/pay/config?site=${site}`, { method: 'GET' }, 8000).then(
    ({ status, data }) => {
      const d = data as { ready?: unknown; delivery_sen?: unknown } | null;
      if (status !== 200 || !d || d.ready !== true) return CLOSED;
      const fee = d.delivery_sen;
      return typeof fee === 'number' && Number.isSafeInteger(fee) && fee >= 0 ? { ready: true, deliverySen: fee } : CLOSED;
    },
    () => CLOSED
  );
  return configPromise;
}

/** Forget the cached answer (after a 503 pay_not_ready the next look asks again). */
export function forgetPayConfig(): void {
  configPromise = null;
}

export async function createPayment(input: {
  site: 'av' | 'nf';
  lang: Lang;
  idem: string;
  lines: readonly OrderLine[];
  details: Details;
}): Promise<CreateAnswer> {
  const d = input.details;
  const body = {
    site: input.site,
    lang: input.lang,
    idem: input.idem,
    // Only SKU + quantity: the server prices every line itself.
    lines: input.lines.map((l) => ({ sku: l.sku, qty: l.qty })),
    details: { name: d.name, phone: d.phone, address: d.address, postcode: d.postcode, city: d.city, state: d.state, note: d.note },
  };
  try {
    const { status, data } = await getJson(
      '/api/pay/create',
      { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } },
      30000
    );
    const j = data as Record<string, unknown> | null;
    if (status === 200 && j && typeof j.ref === 'string' && typeof j.token === 'string') {
      return {
        ok: true,
        ref: j.ref,
        token: j.token,
        url: typeof j.url === 'string' ? j.url : null,
        status: j.status === 'paid' ? 'paid' : 'pending',
        totalSen: typeof j.total_sen === 'number' ? j.total_sen : 0,
      };
    }
    const err = (j?.error ?? null) as { code?: unknown; message?: unknown; fields?: unknown } | null;
    return {
      ok: false,
      code: typeof err?.code === 'string' ? err.code : `http_${status}`,
      message: typeof err?.message === 'string' ? err.message : '',
      fields: err?.fields && typeof err.fields === 'object' ? (err.fields as Record<string, string>) : undefined,
    };
  } catch {
    return { ok: false, code: 'network', message: '' };
  }
}

/** null = the server did not answer (keep polling); 'forbidden' = this link is not an order of ours. */
export async function fetchPayStatus(ref: string, token: string): Promise<StatusAnswer | 'forbidden' | null> {
  try {
    const { status, data } = await getJson(
      `/api/pay/status?ref=${encodeURIComponent(ref)}&t=${encodeURIComponent(token)}`,
      { method: 'GET', cache: 'no-store' },
      15000
    );
    if (status === 403) return 'forbidden';
    const j = data as Record<string, unknown> | null;
    if (status !== 200 || !j || typeof j.status !== 'string') return null;
    const lines = Array.isArray(j.lines) ? j.lines : [];
    return {
      ref: String(j.ref),
      status: (['pending', 'paid', 'failed', 'needs_review'].includes(j.status) ? j.status : 'pending') as PayStatus,
      subtotalSen: Number(j.subtotal_sen) || 0,
      deliverySen: Number(j.delivery_sen) || 0,
      totalSen: Number(j.total_sen) || 0,
      lines: lines.flatMap((l) => {
        const x = l as { sku?: unknown; qty?: unknown; unit_sen?: unknown };
        return typeof x.sku === 'string' && typeof x.qty === 'number' && typeof x.unit_sen === 'number'
          ? [{ sku: x.sku, qty: x.qty, unitSen: x.unit_sen }]
          : [];
      }),
      paymentType: typeof j.payment_type === 'string' ? j.payment_type : null,
    };
  } catch {
    return null;
  }
}
