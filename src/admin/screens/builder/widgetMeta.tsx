import type { ReactNode } from 'react';
import {
  LuAlignLeft,
  LuBadgeCheck,
  LuCircleHelp,
  LuGalleryHorizontalEnd,
  LuHeading,
  LuImage,
  LuLayoutGrid,
  LuLayoutPanelLeft,
  LuList,
  LuListOrdered,
  LuMegaphone,
  LuMessageCircle,
  LuMessageSquareQuote,
  LuMinus,
  LuMousePointerClick,
  LuMoveVertical,
  LuPackage,
  LuQuote,
  LuSquarePen,
  LuStore,
  LuVideo,
} from 'react-icons/lu';
import { WIDGET_TYPES, type Widget, type WidgetType } from '../../../cms/contracts';

export const WIDGET_META: Record<WidgetType, { name: string; icon: ReactNode; hint: string }> = {
  heading: { name: 'Heading', icon: <LuHeading />, hint: 'A title for a section' },
  text: { name: 'Text', icon: <LuAlignLeft />, hint: 'Paragraphs, lists and links' },
  image: { name: 'Image', icon: <LuImage />, hint: 'One photo' },
  button: { name: 'Button', icon: <LuMousePointerClick />, hint: 'A link that looks like a button' },
  spacer: { name: 'Spacer', icon: <LuMoveVertical />, hint: 'Empty space' },
  divider: { name: 'Divider', icon: <LuMinus />, hint: 'A line between parts' },
  video: { name: 'Video', icon: <LuVideo />, hint: 'YouTube or Vimeo' },
  gallery: { name: 'Gallery', icon: <LuGalleryHorizontalEnd />, hint: 'Several photos in a grid' },
  iconList: { name: 'Icon list', icon: <LuList />, hint: 'Short points with icons' },
  faq: { name: 'FAQ', icon: <LuCircleHelp />, hint: 'Questions and answers' },
  products: { name: 'Products', icon: <LuPackage />, hint: 'Your bottles with links' },
  form: { name: 'Form', icon: <LuSquarePen />, hint: 'A form that emails you' },
  quote: { name: 'Quote', icon: <LuQuote />, hint: 'A customer quote' },
  whatsapp: { name: 'WhatsApp', icon: <LuMessageCircle />, hint: 'Chat button with a message' },
  heroForm: { name: 'Hero with form', icon: <LuLayoutPanelLeft />, hint: 'Big headline, buttons and a form card — the top of an ad page' },
  cards: { name: 'Icon cards', icon: <LuLayoutGrid />, hint: 'Selling points as cards with icons, with an optional photo' },
  steps: { name: 'Steps', icon: <LuListOrdered />, hint: 'Numbered steps, e.g. how to order' },
  ctaBand: { name: 'Call-to-action band', icon: <LuMegaphone />, hint: 'A coloured band with a title and buttons' },
  badges: { name: 'Badges', icon: <LuBadgeCheck />, hint: 'Small tiles with an icon and a few words' },
  reviews: { name: 'Reviews', icon: <LuMessageSquareQuote />, hint: 'Customer quotes, with optional numbers above' },
  stores: { name: 'Where to buy', icon: <LuStore />, hint: 'Buttons to Berkat Madinah Store, Shopee and TikTok Shop' },
};

/** The ad-landing widgets (docs/cms/LP-SPEC.md) — shown as their own group in the palette. */
export const LANDING_WIDGETS: WidgetType[] = ['heroForm', 'cards', 'steps', 'ctaBand', 'badges', 'reviews', 'stores'];
export const BASIC_WIDGETS: WidgetType[] = WIDGET_TYPES.filter((t) => !LANDING_WIDGETS.includes(t));

const strip = (s: string) => s.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/** A short readable label for a widget in the navigator, in the current language. */
export function widgetLabel(w: Widget, lang: 'en' | 'ms'): string {
  const pick = (l?: { en: string; ms: string }) => (l ? strip(l[lang] || l.en) : '');
  const count = (n: number, one: string) => `${n} ${one}${n === 1 ? '' : 's'}`;
  let s = '';
  switch (w.type) {
    case 'heading':
      s = pick(w.settings.text);
      break;
    case 'text':
      s = pick(w.settings.html);
      break;
    case 'button':
      s = pick(w.settings.label);
      break;
    case 'quote':
      s = pick(w.settings.text);
      break;
    case 'whatsapp':
      s = pick(w.settings.label);
      break;
    case 'faq':
      s = count(w.settings.items.length, 'question');
      break;
    case 'iconList':
      s = count(w.settings.items.length, 'item');
      break;
    case 'gallery':
      s = count(w.settings.media.length, 'photo');
      break;
    case 'image':
      s = pick(w.settings.alt);
      break;
    case 'heroForm':
    case 'cards':
    case 'steps':
    case 'ctaBand':
    case 'badges':
    case 'reviews':
    case 'stores':
      s = pick(w.settings.title);
      break;
    case 'spacer':
    case 'divider':
    case 'video':
    case 'products':
    case 'form':
      break;
    default: {
      const never: never = w;
      void never;
    }
  }
  return s.length > 40 ? s.slice(0, 38) + '…' : s;
}
