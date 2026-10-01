import type { CSSProperties, Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { getImageOverride } from '../../cms/boot';
import { cmsAttr } from '../../cms/editable';

/**
 * Owned by builder A (images). The props below are final: other components are
 * written against them and must not need changing. `ref` is the one addition —
 * optional, additive, and only needed by Hero's parallax bottle, which writes
 * `style.transform` on the element every animation frame.
 *
 * Renders one responsive <img>. `name` is the base filename as it appears in
 * src/assets/images (no extension, no width suffix); the generated widths come
 * from scripts/optimize-images.py, which writes src/assets/opt/<name>-<w>.webp
 * plus a manifest carrying each source's intrinsic size.
 */
export interface PictureProps {
  /** Base name as it appears in src/assets/images, without extension. */
  name: string;
  alt: string;
  className?: string;
  /** The `sizes` attribute — how wide the image renders. Default '100vw'. */
  sizes?: string;
  /** Above the fold: eager, fetchpriority=high, never lazy. */
  priority?: boolean;
  style?: CSSProperties;
  'aria-hidden'?: boolean;
  /** Optional handle on the underlying <img> (React 19 passes it as a prop). */
  ref?: Ref<HTMLImageElement>;
  /**
   * CMS photo spot (spec §11), e.g. `home.hero.bg`. Emits `data-cms-img` and, when
   * the owner replaced the photo, renders the uploaded one instead.
   */
  cmsKey?: string;
  /** i18n key of `alt`, so the description is editable in place (`data-cms-attr`). */
  cmsAltKey?: string;
}

/** Every generated variant, keyed by `<name>-<width>.webp`. */
const VARIANTS = import.meta.glob('../../assets/opt/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** Intrinsic sizes of the sources, written by the optimiser. */
import manifest from '../../assets/opt/manifest.json';

interface ManifestEntry {
  width: number;
  height: number;
  widths: number[];
}

const MANIFEST = manifest as Record<string, ManifestEntry>;

export function Picture({
  name,
  alt,
  className,
  sizes = '100vw',
  priority = false,
  style,
  'aria-hidden': ariaHidden,
  ref,
  cmsKey,
  cmsAltKey,
}: PictureProps) {
  const { i18n } = useTranslation();
  const override = cmsKey ? getImageOverride(cmsKey, i18n.language) : null;
  const marks = {
    ...(cmsKey ? { 'data-cms-img': cmsKey } : {}),
    ...(cmsAltKey && !override ? cmsAttr({ alt: cmsAltKey }) : {}),
  };

  if (override) {
    const variants = [...override.media.variants].sort((a, b) => a.w - b.w);
    const focal = override.focal;
    return (
      <img
        ref={ref}
        src={variants[variants.length - 1].url}
        srcSet={variants.map((v) => `${v.url} ${v.w}w`).join(', ')}
        sizes={sizes}
        alt={override.alt}
        aria-hidden={ariaHidden}
        width={override.media.width}
        height={override.media.height}
        className={className}
        style={focal ? { ...style, objectPosition: `${focal.x}% ${focal.y}%` } : style}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        {...marks}
      />
    );
  }

  const entry = MANIFEST[name];
  if (!entry) {
    /**
     * Deliberately not a throw. This component is rendered with dynamic names
     * (the hero picks by language, the journey by scene key) and there is no
     * ErrorBoundary in the app: a throw here would be a white page in
     * production, and it would hang scripts/prerender.mjs for 60 s waiting on
     * data-app-ready and abort the whole 160-route pass. `npm run check:images`
     * is what turns a missing variant into a red build instead.
     */
    if (import.meta.env.DEV) {
      console.warn(`Picture: no optimised variants for "${name}" — run \`npm run images\`.`);
    }
    return null;
  }

  const urlFor = (w: number) =>
    VARIANTS[`../../assets/opt/${name}-${w}.webp`] ?? VARIANTS[`../../assets/opt/${name}.webp`];

  const srcSet = entry.widths
    .map((w) => `${urlFor(w)} ${w}w`)
    .filter((s) => !s.startsWith('undefined'))
    .join(', ');
  const widest = entry.widths[entry.widths.length - 1];

  return (
    <img
      ref={ref}
      src={urlFor(widest)}
      srcSet={srcSet || undefined}
      sizes={sizes}
      alt={alt}
      aria-hidden={ariaHidden}
      width={entry.width}
      height={entry.height}
      className={className}
      style={style}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      {...marks}
    />
  );
}
