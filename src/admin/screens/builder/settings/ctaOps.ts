import type { ButtonStyle, CtaButton, StoreKey } from '../../../../cms/contracts';
import { createCtaButton } from '../../../../cms/doc';
import { sameLoc, STORE_KEYS, STORES } from './stores';

export const CTA_KIND: Record<CtaButton['kind'], { option: string; short: string }> = {
  whatsapp: { option: 'Open a WhatsApp chat', short: 'WhatsApp' },
  form: { option: 'Jump to the form', short: 'Form' },
  store: { option: 'Go to a shop', short: 'Shop' },
  link: { option: 'Go to a page or link', short: 'Link' },
};
export const KIND_ORDER: CtaButton['kind'][] = ['whatsapp', 'form', 'store', 'link'];

export const BUTTON_STYLES: { value: ButtonStyle; label: string }[] = [
  { value: 'primary', label: 'Olive' },
  { value: 'outline', label: 'Outline' },
  { value: 'gold', label: 'Gold' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

/**
 * A button with a new kind. Built from the kind's factory, so every field the new kind does
 * not use (message, store, href, newTab) is gone — a hidden WhatsApp message must never ride
 * along on a link button (LP-SPEC §8 M9). Text and look the owner chose are kept; untouched
 * starting texts follow the new kind.
 */
export function changeKind(b: CtaButton, kind: CtaButton['kind']): CtaButton {
  if (b.kind === kind) return b;
  const before = createCtaButton(b.kind);
  const next = { ...createCtaButton(kind), id: b.id };
  const untouchedLabel = sameLoc(b.label, before.label) || (b.kind === 'store' && STORE_KEYS.some((k) => sameLoc(b.label, STORES[k].ctaLabel)));
  if (!untouchedLabel) next.label = b.label;
  if (b.style !== before.style) next.style = b.style;
  if (b.hide) next.hide = b.hide; // where it shows is independent of what it does
  return next;
}

/** Switch the shop of a store button; the starting text follows the shop unless the owner wrote their own. */
export function changeStore(b: CtaButton, store: StoreKey): CtaButton {
  const old = b.store ?? 'madinah';
  return { ...b, store, label: sameLoc(b.label, STORES[old].ctaLabel) ? { ...STORES[store].ctaLabel } : b.label };
}
