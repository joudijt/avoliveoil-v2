/**
 * The buyer's remembered details (`avo.details.v2`) and the buy-now draft (`avo.draft.v1`), read and
 * written by the Buy-now sheet and read by the paid page. Lazy code only.
 */
import { ORDER_CONFIG } from './config';
import { FIELD_MAX, FIELD_ORDER, parseDraft, serializeDraft, type DetailField, type Draft } from './core';
import { STATES_MY } from './messageStrings';
import { orderStorage } from './storage';

const KEYS = ORDER_CONFIG.keys;
export type Values = Record<DetailField, string>;
export const BLANK: Values = { name: '', phone: '', address: '', postcode: '', state: '' };


/** `{savedAt, values}` (v2 shape), ignored and deleted when older than 30 days or malformed. */
export function readDetails(): Values | null {
  const raw = orderStorage.get(KEYS.details);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as { savedAt?: unknown; values?: unknown } | null;
    const age = data && typeof data.savedAt === 'number' ? Date.now() - data.savedAt : NaN;
    if (data && data.values && typeof data.values === 'object' && age >= 0 && age < ORDER_CONFIG.detailsTtlMs) {
      const stored = data.values as Record<string, unknown>;
      const out = { ...BLANK };
      for (const f of FIELD_ORDER) {
        const v = stored[f];
        if (typeof v !== 'string') continue;
        if (f === 'state') out.state = STATES_MY.includes(v) ? v : '';
        else out[f] = v.slice(0, FIELD_MAX[f]);
      }
      return out;
    }
  } catch {
    /* falls through to the delete */
  }
  orderStorage.del(KEYS.details);
  return null;
}
export function saveDetails(values: Values): void {
  orderStorage.set(KEYS.details, JSON.stringify({ savedAt: Date.now(), values }));
}
export function readDraft(): Draft | null {
  return parseDraft(orderStorage.get(KEYS.draft), Date.now(), ORDER_CONFIG.draftTtlMs, ORDER_CONFIG.refPrefix, ORDER_CONFIG.maxQty);
}
export function saveDraft(d: Draft): void {
  orderStorage.set(KEYS.draft, serializeDraft(d));
}

