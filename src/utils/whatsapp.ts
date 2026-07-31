export const WHATSAPP_NUMBER = '601111119912';

interface WhatsAppField {
  label: string;
  value: string;
}

/**
 * Builds a wa.me link with a pre-filled message listing each non-empty
 * field as "*Label:* value" — used so every form on the site (contact,
 * wholesale/partner, newsletter) hands off to WhatsApp with the submitted
 * data organized instead of silently doing nothing.
 */
export function buildWhatsAppUrl(intro: string, fields: WhatsAppField[]): string {
  const lines = fields.filter((f) => f.value.trim().length > 0).map((f) => `*${f.label}:* ${f.value.trim()}`);
  const text = [intro, ...lines].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
