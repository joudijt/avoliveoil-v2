import type { CmsLang, CmsPageDoc, Localized } from '../../../../cms/contracts';
import { findNode, setWidgetText, updateWidgetSettings } from '../../../../cms/doc';

export type Tab = 'content' | 'style' | 'advanced';

/** Photo width a widget can be shown at: a full-width section is up to ~1600 px, a boxed one ~800. */
export const PHOTO_NEED_FULL = 1600;
export const PHOTO_NEED_BOXED = 800;

/** set one language of a Localized setting, creating the field when it is optional and absent */
export function setLoc(d: CmsPageDoc, id: string, field: string, lang: CmsLang, value: string): CmsPageDoc {
  const ref = findNode(d, id);
  if (!ref || ref.kind !== 'widget') return d;
  const cur = (ref.widget.settings as unknown as Record<string, unknown>)[field] as Localized | undefined;
  if (cur && typeof cur === 'object') return setWidgetText(d, id, field, lang, value);
  return updateWidgetSettings(d, id, { [field]: { en: '', ms: '', [lang]: value } });
}
