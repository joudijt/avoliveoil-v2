import { useParams } from 'react-router-dom';
import type { Block } from '../../content/articles';
import { ARTICLE_IMAGES } from '../../content/articles/images';
import { renderInline } from './inline';

const P_CLASS = 'font-body text-base font-light leading-[1.85] text-brown/80 md:text-[1.0625rem]';

function BlockView({ block }: { block: Block }) {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const inline = (text: string) => renderInline(text, lang);

  switch (block.type) {
    case 'p':
      return <p className={`mt-6 ${P_CLASS}`}>{inline(block.text)}</p>;

    case 'h3':
      return <h3 className="mt-12 text-2xl text-olive-dark md:text-[1.75rem]">{inline(block.text)}</h3>;

    case 'h4':
      return (
        <h4 className="mt-8 font-body text-lg font-medium text-olive-dark md:text-xl">
          {inline(block.text)}
        </h4>
      );

    case 'ul':
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className={`flex gap-3 ${P_CLASS}`}>
              <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{inline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className={`flex gap-3 ${P_CLASS}`}>
              <span
                aria-hidden="true"
                className="mt-[0.15em] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 font-body text-xs font-medium text-olive-dark"
              >
                {i + 1}
              </span>
              <span>{inline(item)}</span>
            </li>
          ))}
        </ol>
      );

    case 'note':
      return (
        <aside className="mt-10 rounded-2xl border-s-4 border-gold bg-gold/[0.07] p-6 md:p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{block.title}</p>
          <p className={`mt-3 ${P_CLASS}`}>{inline(block.text)}</p>
        </aside>
      );

    case 'table':
      return (
        <div className="mt-8 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <table className="w-full min-w-[34rem] border-collapse text-start font-body text-sm">
            <thead>
              <tr className="border-b border-olive-dark/15">
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="py-3 pe-4 text-start text-xs font-medium uppercase tracking-[0.12em] text-olive-dark"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-olive-dark/10 align-top">
                  {row.map((cell, j) => (
                    <td key={j} className="py-4 pe-4 font-light leading-relaxed text-brown/80">
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'image':
      return (
        <figure className="mt-10">
          <img
            src={ARTICLE_IMAGES[block.src]}
            alt={block.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-2xl object-cover shadow-[0_20px_45px_rgba(46,58,36,0.18)]"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center font-body text-sm font-light text-brown/60">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </>
  );
}
