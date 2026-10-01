import { useMemo } from 'react';
import type { TextWidget } from '../contracts';
import { localizeHtmlLinks, sanitizeRichText } from '../sanitize';
import { ALIGN_TEXT, TEXT, cx } from './classes';
import { fieldAttr, useBlockEnv } from './context';
import { placeholderAttr, shown } from './text';

export function TextBlock({ w }: { w: TextWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const raw = shown(env, s.html, '<p>Text — double-click to type</p>');
  // Only sanitised markup ever reaches dangerouslySetInnerHTML (the server cleans it again on publish).
  const html = useMemo(() => localizeHtmlLinks(sanitizeRichText(raw.text), env.lang), [raw.text, env.lang]);
  if (!html) return null;
  return (
    <div
      className={cx(TEXT.base, TEXT.size[s.size] ?? TEXT.size.m, TEXT.color[env.tone][s.color] ?? TEXT.color[env.tone].default, ALIGN_TEXT[s.align])}
      {...fieldAttr(env, 'html')}
      {...placeholderAttr(raw)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
