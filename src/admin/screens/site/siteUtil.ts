import type { HeadlineWord, TextValue } from '../../../cms/contracts';
import type { ImageValue, SiteKeyItem } from '../../api';

/** "statistics.items.1.label" → "Statistics › Item 2 › Label" */
export function humanizeKey(key: string): string {
  return key
    .split('.')
    .map((p, i, arr) => {
      if (/^\d+$/.test(p)) return `#${Number(p) + 1}`;
      const words = p.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ');
      const w = words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
      // "items #2" reads better as "Item 2"
      if (/^\d+$/.test(arr[i + 1] ?? '') && w.endsWith('s')) return w.slice(0, -1);
      return w;
    })
    .join(' › ')
    .replace(/ › #/g, ' ');
}

export const TOKEN_RE = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;

/** Split a template into text and {{token}} parts. */
export function splitTemplate(t: string): ({ text: string } | { token: string })[] {
  const out: ({ text: string } | { token: string })[] = [];
  let last = 0;
  for (const m of t.matchAll(TOKEN_RE)) {
    if (m.index! > last) out.push({ text: t.slice(last, m.index) });
    out.push({ token: m[1] });
    last = m.index! + m[0].length;
  }
  if (last < t.length) out.push({ text: t.slice(last) });
  return out;
}

/**
 * Work out what each token renders as, by matching the raw template against the
 * interpolated default ("Visit {{store}}" vs "Visit Berkat Madinah" → store = "Berkat Madinah").
 * Used only to preview edits in the page without knowing the store name client-side.
 */
export function tokenValues(template: string, interpolated: string): Record<string, string> {
  const parts = splitTemplate(template);
  const names: string[] = [];
  const re = parts
    .map((p) => {
      if ('text' in p) return p.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      names.push(p.token);
      return '(.+?)';
    })
    .join('');
  const m = new RegExp('^' + re + '$', 's').exec(interpolated);
  const out: Record<string, string> = {};
  if (m) names.forEach((n, i) => (out[n] = m[i + 1]));
  return out;
}

export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(TOKEN_RE, (all, name: string) => values[name] ?? all);
}

/** Owner-readable problem with a text value, or null (spec §13.2). */
export function textProblem(item: SiteKeyItem, value: TextValue): string | null {
  if (item.type === 'number') {
    if (typeof value !== 'number' || !Number.isFinite(value) || !Number.isInteger(value) || value < 0) return 'Use a whole number, e.g. 500000.';
    return null;
  }
  if (item.type === 'words') {
    const w = value as HeadlineWord[];
    if (!Array.isArray(w) || w.length < 1 || w.length > 8) return 'Use 1 to 8 words.';
    if (w.some((x) => !x.text.trim())) return 'A word is empty.';
    if (w.some((x) => x.text.length > 30)) return 'Each word can have at most 30 characters.';
    return null;
  }
  const s = String(value);
  if (!s.trim()) return 'This text cannot be empty. Use “Reset to original” to bring back the original.';
  if (item.tokens?.length) {
    const found = [...s.matchAll(TOKEN_RE)].map((m) => m[1]);
    const missing = item.tokens.filter((t) => !found.includes(t));
    if (missing.length) return `Keep the ${missing.map((m) => `“${m}”`).join(', ')} part — it is filled in automatically.`;
    if (found.some((t) => !item.tokens!.includes(t))) return 'Only the existing automatic parts can be used.';
    if (s.includes('$t(')) return 'This text contains characters that are not allowed: $t(';
    return null;
  }
  if (s.includes('{{') || s.includes('}}') || s.includes('$t(')) return 'Curly brackets {{ }} and $t( cannot be used in website texts.';
  return null;
}

export function isImageValue(v: unknown): v is ImageValue {
  return !!v && typeof v === 'object' && !Array.isArray(v) && 'media' in (v as object);
}

export function sameValue(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * The value without my unsaved edits: my saved draft when I have one (drafts are per
 * user; null = "reset to default" waiting to be published), else what is live.
 * null means "the built-in default".
 */
export function savedValue(item: SiteKeyItem): unknown {
  if (item.hasDraft) return item.draft ?? null;
  return item.published ?? null;
}

/** The value a field shows: local edit, then my saved draft, then the live value, then the default. */
export function currentValue(item: SiteKeyItem, edit: unknown, hasEdit: boolean): unknown {
  const v = hasEdit ? edit : savedValue(item);
  return v === null || v === undefined ? defaultValue(item) : v;
}

/** Dot next to a field: unsaved edit, saved draft (not live yet), or a live change. */
export type FieldState = 'unsaved' | 'draft' | 'live' | null;
export function fieldState(item: SiteKeyItem, hasEdit: boolean): FieldState {
  if (hasEdit) return 'unsaved';
  if (item.hasDraft) return 'draft';
  return item.published !== null && item.published !== undefined ? 'live' : null;
}

export function defaultValue(item: SiteKeyItem): unknown {
  if (item.type === 'image') return null;
  if (item.template) return item.template;
  return item.default;
}
