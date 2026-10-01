import type { Localized } from '../contracts';
import type { BlockEnv } from './context';

export interface ShownText {
  text: string;
  /** canvas only: the field is empty in this language and shows a hint instead */
  placeholder: boolean;
}

/**
 * The text of a Localized field in the current language. On the public site an
 * empty field is simply empty. On the canvas it shows a faded hint (marked
 * data-cms-placeholder) so the owner can see and double-click it — the English
 * text when only the Malay translation is missing.
 */
export function shown(env: BlockEnv, value: Localized | undefined, hint = 'Double-click to type'): ShownText {
  const text = value?.[env.lang] ?? '';
  if (text.trim() || env.mode !== 'canvas') return { text, placeholder: false };
  const other = env.lang === 'ms' ? value?.en : value?.ms;
  return { text: other?.trim() ? `Translate: ${other}` : hint, placeholder: true };
}

export function placeholderAttr(s: ShownText): { 'data-cms-placeholder'?: string } {
  return s.placeholder ? { 'data-cms-placeholder': '' } : {};
}
