import type { ReactNode } from 'react';
import {
  LuAlignLeft,
  LuCircleHelp,
  LuGalleryHorizontalEnd,
  LuHeading,
  LuImage,
  LuList,
  LuMessageCircle,
  LuMinus,
  LuMousePointerClick,
  LuMoveVertical,
  LuPackage,
  LuQuote,
  LuSquarePen,
  LuVideo,
} from 'react-icons/lu';
import type { Widget, WidgetType } from '../../../cms/contracts';

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
};

const strip = (s: string) => s.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/** A short readable label for a widget in the navigator, in the current language. */
export function widgetLabel(w: Widget, lang: 'en' | 'ms'): string {
  const pick = (l?: { en: string; ms: string }) => (l ? strip(l[lang] || l.en) : '');
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
      s = `${w.settings.items.length} question${w.settings.items.length === 1 ? '' : 's'}`;
      break;
    case 'iconList':
      s = `${w.settings.items.length} item${w.settings.items.length === 1 ? '' : 's'}`;
      break;
    case 'gallery':
      s = `${w.settings.media.length} photo${w.settings.media.length === 1 ? '' : 's'}`;
      break;
    case 'image':
      s = pick(w.settings.alt);
      break;
  }
  return s.length > 40 ? s.slice(0, 38) + '…' : s;
}
