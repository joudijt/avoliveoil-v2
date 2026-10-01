import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import type { GalleryWidget, MediaRef } from '../contracts';
import { mediaFor, srcSetOf, variantAtLeast, widestUrl } from '../media';
import { GALLERY, cx } from './classes';
import { useBlockEnv } from './context';
import { CanvasEmpty } from './CanvasEmpty';
import { ui } from './strings';

/**
 * Grid of photos. Each tile is a real link to the full-size file, so without
 * JavaScript (or for a crawler) the photo still opens. With JavaScript the click
 * opens a lightbox: Esc closes, ←/→ move, focus goes to Close and returns to the
 * tile afterwards.
 */
export function GalleryBlock({ w }: { w: GalleryWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const items = (s.media ?? []).map((id) => mediaFor(env.media, id)).filter((m): m is MediaRef => !!m);
  const [open, setOpen] = useState<number | null>(null);
  const tiles = useRef<(HTMLAnchorElement | null)[]>([]);

  if (items.length === 0) return env.mode === 'canvas' ? <CanvasEmpty label="Gallery — add photos in the settings panel" /> : null;

  const cols = s.cols === 2 || s.cols === 4 ? s.cols : 3;
  const sizes = cols === 2 ? '(min-width: 1024px) 560px, 50vw' : cols === 3 ? '(min-width: 1024px) 370px, (min-width: 768px) 33vw, 50vw' : '(min-width: 1024px) 280px, (min-width: 768px) 25vw, 50vw';

  const onTile = (i: number) => (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!s.lightbox || env.mode === 'canvas') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(i);
  };

  return (
    <>
      <ul className={GALLERY.grid[cols]} aria-label={ui(env.lang, 'gallery')}>
        {items.map((m, i) => {
          const alt = m.alt?.[env.lang] ?? '';
          return (
            <li key={`${m.id}-${i}`}>
            <a
              href={widestUrl(m.variants)}
              className={GALLERY.item}
              aria-label={alt || ui(env.lang, 'openImage', { n: i + 1, total: items.length })}
              onClick={onTile(i)}
              ref={(el) => {
                tiles.current[i] = el;
              }}
            >
              <img
                src={variantAtLeast(m.variants, 800)}
                srcSet={srcSetOf(m.variants)}
                sizes={sizes}
                width={m.width}
                height={m.height}
                alt={alt}
                loading="lazy"
                decoding="async"
                className={cx(GALLERY.img, GALLERY.ratio[s.ratio] ?? GALLERY.ratio['4/3'])}
              />
            </a>
            </li>
          );
        })}
      </ul>
      {open !== null ? (
        <Lightbox
          items={items}
          index={open}
          lang={env.lang}
          onIndex={setOpen}
          onClose={() => {
            const back = tiles.current[open];
            setOpen(null);
            back?.focus();
          }}
        />
      ) : null}
    </>
  );
}

function Lightbox({
  items,
  index,
  lang,
  onIndex,
  onClose,
}: {
  items: MediaRef[];
  index: number;
  lang: 'en' | 'ms';
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const m = items[index];
  const many = items.length > 1;
  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && many) go(-1);
      else if (e.key === 'ArrowRight' && many) go(1);
      else if (e.key === 'Tab' && boxRef.current) {
        // Keep focus inside the dialog.
        const focusables = Array.from(boxRef.current.querySelectorAll<HTMLElement>('button'));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go, many, onClose]);

  const alt = m.alt?.[lang] ?? '';
  return (
    <div
      ref={boxRef}
      className={GALLERY.box}
      role="dialog"
      aria-modal="true"
      aria-label={alt || ui(lang, 'gallery')}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <img src={widestUrl(m.variants)} srcSet={srcSetOf(m.variants)} sizes="100vw" width={m.width} height={m.height} alt={alt} className={GALLERY.boxImg} />
      <button ref={closeRef} type="button" className={cx(GALLERY.boxBtn, GALLERY.boxClose)} onClick={onClose} aria-label={ui(lang, 'close')}>
        <FiX className={GALLERY.boxIcon} aria-hidden />
      </button>
      {many ? (
        <>
          <button type="button" className={cx(GALLERY.boxBtn, GALLERY.boxPrev)} onClick={() => go(-1)} aria-label={ui(lang, 'previous')}>
            <FiChevronLeft className={GALLERY.boxIcon} aria-hidden />
          </button>
          <button type="button" className={cx(GALLERY.boxBtn, GALLERY.boxNext)} onClick={() => go(1)} aria-label={ui(lang, 'next')}>
            <FiChevronRight className={GALLERY.boxIcon} aria-hidden />
          </button>
          <p className={GALLERY.boxCount} aria-live="polite">
            {index + 1} / {items.length}
          </p>
        </>
      ) : null}
    </div>
  );
}
