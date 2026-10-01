import type { WidgetType } from '../contracts';

/** Owner-facing widget names (canvas labels; the admin may reuse them). */
export const WIDGET_LABELS: Record<WidgetType, string> = {
  heading: 'Heading',
  text: 'Text',
  image: 'Image',
  button: 'Button',
  spacer: 'Spacer',
  divider: 'Divider',
  video: 'Video',
  gallery: 'Gallery',
  iconList: 'Icon list',
  faq: 'FAQ',
  products: 'Products',
  form: 'Form',
  quote: 'Quote',
  whatsapp: 'WhatsApp button',
};
