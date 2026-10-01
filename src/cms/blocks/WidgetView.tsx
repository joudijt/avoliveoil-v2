import type { Widget, WidgetType } from '../contracts';
import { hideAttr, hideClasses } from './hide';
import { useBlockEnv } from './context';
import { HeadingBlock } from './HeadingBlock';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { ButtonBlock, WhatsappBlock } from './ButtonBlock';
import { DividerBlock, SpacerBlock, VideoBlock } from './SimpleBlocks';
import { GalleryBlock } from './GalleryBlock';
import { FaqBlock, IconListBlock, QuoteBlock } from './ListBlocks';
import { ProductsBlock } from './ProductsBlock';
import { FormBlock } from './FormBlock';
import { WIDGET_LABELS } from './labels';

function Body({ w }: { w: Widget }) {
  switch (w.type) {
    case 'heading':
      return <HeadingBlock w={w} />;
    case 'text':
      return <TextBlock w={w} />;
    case 'image':
      return <ImageBlock w={w} />;
    case 'button':
      return <ButtonBlock w={w} />;
    case 'spacer':
      return <SpacerBlock w={w} />;
    case 'divider':
      return <DividerBlock w={w} />;
    case 'video':
      return <VideoBlock w={w} />;
    case 'gallery':
      return <GalleryBlock w={w} />;
    case 'iconList':
      return <IconListBlock w={w} />;
    case 'faq':
      return <FaqBlock w={w} />;
    case 'products':
      return <ProductsBlock w={w} />;
    case 'form':
      return <FormBlock w={w} />;
    case 'quote':
      return <QuoteBlock w={w} />;
    case 'whatsapp':
      return <WhatsappBlock w={w} />;
    default:
      return null;
  }
}

/**
 * One widget inside its column. Public: a plain wrapper carrying the per-device
 * hide classes. Canvas: the same wrapper plus data-node-* hooks for selection,
 * drag and drop, and hidden widgets stay visible (faded, tagged by the canvas CSS).
 */
export function WidgetView({ w, renderKey }: { w: Widget; renderKey?: number }) {
  const env = useBlockEnv();
  if (env.mode === 'canvas') {
    return (
      <div data-node-id={w.id} data-node-kind="widget" data-node-label={WIDGET_LABELS[w.type as WidgetType] ?? w.type} {...hideAttr(w.hide)}>
        <Body key={renderKey ?? 0} w={w} />
      </div>
    );
  }
  const cls = hideClasses(w.hide);
  return (
    <div className={cls || undefined}>
      <Body w={w} />
    </div>
  );
}
