import type { CmsLang, CmsPageDoc } from '../../../cms/contracts';
import { missingTranslations } from '../../../cms/doc';
import { safeHref } from '../../../cms/sanitize';
import { parseVideoUrl } from '../../../cms/video';
import { WIDGET_META } from './widgetMeta';

export interface LangCheck {
  label: string;
  ok: boolean;
  blocking: boolean;
}

export function langChecks(doc: CmsPageDoc, lang: CmsLang): LangCheck[] {
  const missing = missingTranslations(doc, lang).length;
  return [
    { label: 'Page title', ok: !!doc.title[lang].trim(), blocking: true },
    { label: 'Title for Google (page settings)', ok: !!doc.seo.metaTitle[lang].trim(), blocking: true },
    { label: missing ? `${missing} text${missing === 1 ? '' : 's'} still to translate` : 'Every text is translated', ok: missing === 0, blocking: true },
    { label: 'Description for Google (recommended)', ok: !!doc.seo.metaDescription[lang].trim(), blocking: false },
  ];
}

/** Things on the page that will look broken or empty to visitors (warnings, not blockers). */
export function pageProblems(doc: CmsPageDoc): string[] {
  const out: string[] = [];
  if (!doc.sections.length) out.push('The page has no content yet.');
  doc.sections.forEach((s, si) => {
    if (s.settings.bg === 'image' && !s.settings.bgImage) out.push(`Section ${si + 1}: background photo not chosen.`);
    s.columns.forEach((c) =>
      c.widgets.forEach((w) => {
        const name = `Section ${si + 1} › ${WIDGET_META[w.type].name}`;
        if (w.type === 'image' && !w.settings.media) out.push(`${name}: no photo chosen.`);
        if (w.type === 'form' && !w.settings.formId) out.push(`${name}: no form chosen.`);
        if (w.type === 'products' && !w.settings.ids.length) out.push(`${name}: no products ticked.`);
        if (w.type === 'gallery' && !w.settings.media.length) out.push(`${name}: no photos chosen.`);
        if (w.type === 'video' && !parseVideoUrl(w.settings.url)) out.push(`${name}: video link missing or not recognised.`);
        if (w.type === 'button' && !safeHref(w.settings.href)) out.push(`${name}: the link is missing or not allowed.`);
      })
    );
  });
  return out;
}

