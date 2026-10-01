import type { HeadingWidget } from '../contracts';
import { ALIGN_TEXT, HEADING, cx } from './classes';
import { fieldAttr, useBlockEnv } from './context';
import { placeholderAttr, shown } from './text';

export function HeadingBlock({ w }: { w: HeadingWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const Tag = s.level === 'h1' || s.level === 'h3' || s.level === 'h4' ? s.level : 'h2';
  const text = shown(env, s.text, 'Heading — double-click to type');
  // Empty hint: a kicker blank in both languages is simply absent, even on the canvas.
  const kicker = shown(env, s.kicker, '');
  const showKicker = !!kicker.text;
  if (!text.text && !showKicker) return null;

  const color = HEADING.color[env.tone][s.color] ?? HEADING.color[env.tone].default;
  const heading = text.text ? (
    <Tag
      className={cx(HEADING.wrap, HEADING.size[s.size] ?? HEADING.size.l, color, !showKicker && ALIGN_TEXT[s.align])}
      {...fieldAttr(env, 'text')}
      {...placeholderAttr(text)}
    >
      {text.text}
    </Tag>
  ) : null;

  if (!showKicker) return heading;
  return (
    <div className={cx(HEADING.withKicker, ALIGN_TEXT[s.align])}>
      <p className={HEADING.kicker[env.tone]} {...fieldAttr(env, 'kicker')} {...placeholderAttr(kicker)}>
        {kicker.text}
      </p>
      {heading}
    </div>
  );
}
