import type { ImageWidget } from '../contracts';
import { mediaFor, sizesForSpan, srcSetOf, widestUrl } from '../media';
import { isExternalHref, safeHref } from '../sanitize';
import { ALIGN_TEXT, IMAGE, cx } from './classes';
import { fieldAttr, useBlockEnv } from './context';
import { CanvasEmpty } from './CanvasEmpty';
import { placeholderAttr, shown } from './text';

export function ImageBlock({ w }: { w: ImageWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const media = mediaFor(env.media, s.media);
  if (!media) return env.mode === 'canvas' ? <CanvasEmpty label="Image — choose a photo in the settings panel" /> : null;

  const alt = s.alt?.[env.lang]?.trim() || media.alt?.[env.lang]?.trim() || '';
  const maxWidth = s.maxWidth > 0 ? Math.round(s.maxWidth) : 0;
  const sizes = maxWidth ? `(min-width: ${maxWidth + 96}px) ${maxWidth}px, ${sizesForSpan(env.span, env.full)}` : sizesForSpan(env.span, env.full);
  const caption = shown(env, s.caption, '');
  const href = safeHref(s.href);

  const img = (
    <img
      src={widestUrl(media.variants)}
      srcSet={srcSetOf(media.variants)}
      sizes={sizes}
      width={media.width}
      height={media.height}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cx(IMAGE.img, IMAGE.ratio[s.ratio] ?? '', s.rounded && IMAGE.rounded)}
    />
  );

  return (
    <figure className={cx(IMAGE.figure, maxWidth > 0 && IMAGE.align[s.align])} style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}>
      {href ? (
        <a href={href} className={IMAGE.link} {...(isExternalHref(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {img}
        </a>
      ) : (
        img
      )}
      {caption.text ? (
        <figcaption className={cx(IMAGE.caption[env.tone], ALIGN_TEXT[s.align])} {...fieldAttr(env, 'caption')} {...placeholderAttr(caption)}>
          {caption.text}
        </figcaption>
      ) : null}
    </figure>
  );
}
