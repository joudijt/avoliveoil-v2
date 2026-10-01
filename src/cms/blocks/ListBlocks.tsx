import { FiPlus } from 'react-icons/fi';
import type { FaqWidget, IconListWidget, QuoteWidget } from '../contracts';
import { FAQ, ICON_LIST, QUOTE, cx } from './classes';
import { fieldAttr, useBlockEnv } from './context';
import { CMS_ICON_COMPONENTS } from './icons';
import { placeholderAttr, shown } from './text';

export function IconListBlock({ w }: { w: IconListWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const items = (s.items ?? []).map((it, i) => ({ it, i, text: shown(env, it.text, 'List item') })).filter((x) => x.text.text);
  if (items.length === 0) return null;
  const inline = s.layout === 'inline';
  const color = ICON_LIST.color[env.tone][s.color] ?? ICON_LIST.color[env.tone].default;
  return (
    <ul className={cx(ICON_LIST.layout[inline ? 'inline' : 'list'], inline ? ICON_LIST.inlineAlign[env.align] : ICON_LIST.listAlign[env.align])}>
      {items.map(({ it, i, text }) => {
        const Icon = CMS_ICON_COMPONENTS[it.icon] ?? CMS_ICON_COMPONENTS.check;
        return (
          <li key={it.id} className={ICON_LIST.item}>
            <span className={ICON_LIST.iconWrap} aria-hidden="true">
              <Icon className={ICON_LIST.icon} />
            </span>
            <span className={cx(ICON_LIST.text, color)} {...fieldAttr(env, `items.${i}.text`)} {...placeholderAttr(text)}>
              {text.text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Same look as the site's FAQ section (divided rows, gold plus that turns into a
 * cross), built on <details>/<summary> so it opens and closes without JavaScript —
 * the published HTML works on its own. The server emits the FAQPage JSON-LD.
 * On the canvas every answer is open so it can be edited in place.
 */
export function FaqBlock({ w }: { w: FaqWidget }) {
  const env = useBlockEnv();
  const items = (w.settings.items ?? [])
    .map((it, i) => ({ it, i, q: shown(env, it.q, 'Question'), a: shown(env, it.a, 'Answer') }))
    .filter((x) => x.q.text);
  if (items.length === 0) return null;
  const canvas = env.mode === 'canvas';
  return (
    <div className={FAQ.list[env.tone]}>
      {items.map(({ it, i, q, a }, n) => (
        <details key={it.id} className={FAQ.item} open={canvas || n === 0}>
          <summary className={FAQ.summary}>
            <span className={FAQ.q[env.tone]} {...fieldAttr(env, `items.${i}.q`)} {...placeholderAttr(q)}>
              {q.text}
            </span>
            <FiPlus className={FAQ.icon} aria-hidden />
          </summary>
          {a.text ? (
            <p className={FAQ.a[env.tone]} {...fieldAttr(env, `items.${i}.a`)} {...placeholderAttr(a)}>
              {a.text}
            </p>
          ) : null}
        </details>
      ))}
    </div>
  );
}

export function QuoteBlock({ w }: { w: QuoteWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const text = shown(env, s.text, 'Quote');
  if (!text.text) return null;
  const author = shown(env, s.author, 'Name');
  const place = shown(env, s.place, '');
  return (
    <figure className={QUOTE.figure[env.tone]}>
      <span className={QUOTE.mark} aria-hidden="true">
        “
      </span>
      <blockquote className={QUOTE.blockquote}>
        <p className={QUOTE.text[env.tone]} {...fieldAttr(env, 'text')} {...placeholderAttr(text)}>
          {text.text}
        </p>
      </blockquote>
      {author.text || place.text ? (
        <figcaption className={QUOTE.caption[env.tone]}>
          {author.text ? (
            <span className={QUOTE.author} {...fieldAttr(env, 'author')} {...placeholderAttr(author)}>
              {author.text}
            </span>
          ) : null}
          {author.text && place.text ? ' · ' : null}
          {place.text ? (
            <span {...fieldAttr(env, 'place')} {...placeholderAttr(place)}>
              {place.text}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
