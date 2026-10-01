/**
 * Inline-SVG icons for the CMS blocks and the landing chrome (LP-SPEC §8 M4).
 *
 * Why not react-icons: published CMS pages are HTML strings, and the icon set is
 * small and fixed — 23 owner-pickable icons plus a handful of UI glyphs. Drawing
 * them here keeps the CMS chunk lean and makes every path licence-clean (outline
 * shapes drawn for this site in the Feather/Lucide manner on a 24 px grid, ISC/MIT
 * compatible; the WhatsApp/TikTok/Shopee marks are simplified generic glyphs, not
 * the brands' logo files). Only attributes the server sanitiser keeps for SVG are
 * used (viewBox, fill, stroke*, d, points, cx/cy/r/rx/ry, x/y, transform, class,
 * aria-hidden, focusable).
 */
import type { ReactNode } from 'react';
import type { CmsIcon } from '../contracts';

export type IconProps = { className?: string };
export type IconC = (props: IconProps) => ReactNode;

function stroke(children: ReactNode, width = 2): IconC {
  return ({ className }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function solid(children: ReactNode): IconC {
  return ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

// ---------------------------------------------------------------- shared shapes

const LEAF = (
  <>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </>
);

/** Speech bubble with a handset: reads as "WhatsApp" without copying the logo file. */
export const WhatsappIcon = stroke(
  <>
    <path d="M3.6 20.4l1.25-4.1A8.6 8.6 0 1 1 8 19.35z" />
    <path
      fill="currentColor"
      stroke="none"
      d="M9.2 7.7c.25-.4.6-.5.95-.5.3 0 .55.1.7.5l.65 1.55c.12.3.05.6-.15.82l-.55.6c.55 1.1 1.45 2 2.55 2.55l.6-.55c.22-.2.52-.27.82-.15l1.55.65c.4.15.5.4.5.7 0 .35-.1.7-.5.95-.75.48-1.7.6-2.6.3a8.4 8.4 0 0 1-5.1-5.1c-.3-.9-.18-1.85.3-2.6z"
    />
  </>,
  1.9
);

// ---------------------------------------------------------------- the 23 owner-pickable icons

/** CmsIcon → inline SVG component. Every value of CMS_ICONS has one (checked by the type). */
export const CMS_ICON_COMPONENTS: Record<CmsIcon, IconC> = {
  check: stroke(<polyline points="20 6 9 17 4 12" />, 2.4),
  leaf: stroke(LEAF),
  olive: stroke(
    <>
      <ellipse cx="9.5" cy="15" rx="5" ry="6.4" transform="rotate(-32 9.5 15)" />
      <path d="M12.6 9.4 14.6 6.4" />
      <path d="M14.6 6.4c1.6-2.6 4.2-3.8 7-3.8-.6 3-3 5.2-6.4 5.4" />
    </>
  ),
  drop: stroke(<path d="M12 2.7l5.66 5.65a8 8 0 1 1-11.32 0z" />),
  medal: stroke(
    <>
      <circle cx="12" cy="15" r="6" />
      <path d="M8.6 10.3 5 3h4.2L12 8.6 14.8 3H19l-3.6 7.3" />
      <path d="M12 12.6v4.8" />
    </>
  ),
  star: stroke(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />),
  truck: stroke(
    <>
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </>
  ),
  shield: stroke(
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
  heart: stroke(
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
  phone: stroke(
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: stroke(
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22 6 12 13 2 6" />
    </>
  ),
  pin: stroke(
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: stroke(
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  whatsapp: WhatsappIcon,
  store: stroke(
    <>
      <path d="M3 9l1.6-5h14.8L21 9" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M5 11.6V21h14v-9.4" />
      <path d="M10 21v-5h4v5" />
    </>
  ),
  gift: stroke(
    <>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </>
  ),
  hand: stroke(
    <>
      <path d="M18 11V6a2 2 0 0 0-4 0v5" />
      <path d="M14 10V4a2 2 0 0 0-4 0v6" />
      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </>
  ),
  sun: stroke(
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.5v2.2M12 20.3v2.2M4.57 4.57l1.56 1.56M17.87 17.87l1.56 1.56M1.5 12h2.2M20.3 12h2.2M4.57 19.43l1.56-1.56M17.87 6.13l1.56-1.56" />
    </>
  ),
  award: stroke(
    <>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </>
  ),
  users: stroke(
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  globe: stroke(
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  bottle: stroke(
    <>
      <path d="M10 2h4v3.6l2 3V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8.6l2-3z" />
      <path d="M8 12.5h8M8 17.5h8" />
    </>
  ),
  chat: stroke(
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
};

// ---------------------------------------------------------------- UI glyphs (not owner-pickable)

export const PlusIcon = stroke(
  <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>
);
export const CloseIcon = stroke(
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>
);
export const ChevronLeftIcon = stroke(<polyline points="15 18 9 12 15 6" />);
export const ChevronRightIcon = stroke(<polyline points="9 18 15 12 9 6" />);
export const ArrowRightIcon = stroke(
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>
);
/** Solid leaf for the leaf divider (same silhouette as the outline icon). */
export const LeafSolidIcon = solid(
  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Zm-8.4 1.6a.9.9 0 0 1-.9-.9c0-3.4 2.1-6.06 5.55-6.74 2.2-.44 4.47-1.8 5.4-2.66a.9.9 0 1 1 1.2 1.34c-1.15 1.04-3.68 2.56-6.25 3.08C5.1 15.2 3.5 17.27 3.5 20.7a.9.9 0 0 1-.9.9Z" />
);
/** Generic shopping bag (Shopee-like, without the trademark). */
export const ShopBagIcon = stroke(
  <>
    <path d="M5 7.5h14l-1.1 12.6a2 2 0 0 1-2 1.9H8.1a2 2 0 0 1-2-1.9z" />
    <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
  </>
);
/** Music-note glyph (TikTok-like, without the trademark). */
export const NoteIcon = stroke(
  <>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 3c.5 2.4 2.1 4 4.8 4.3" />
  </>,
  2.2
);
