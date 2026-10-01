import { CMS_LANGS, type CmsLang, type CmsPageDoc, type CtaButton, type Widget } from '../../../cms/contracts';
import { missingTranslations, usedFormIds } from '../../../cms/doc';
import { safeHref } from '../../../cms/sanitize';
import { parseVideoUrl } from '../../../cms/video';
import { linkProblem } from './settings/linkRules';
import { WIDGET_META } from './widgetMeta';

export interface LangCheck {
  label: string;
  ok: boolean;
  blocking: boolean;
}

/** Longest menu link text (same rule as the server, AVO_MENU_LABEL_MAX). */
export const MENU_LABEL_MAX = 20;

/** The link text of the page in the menus: its menu label, else its title. */
export function menuLabelOf(doc: CmsPageDoc, lang: CmsLang): string {
  return doc.menuLabel?.[lang]?.trim() || doc.title[lang].trim();
}

export function langChecks(doc: CmsPageDoc, lang: CmsLang, inMenu = false): LangCheck[] {
  const missing = missingTranslations(doc, lang).length;
  const menuText = menuLabelOf(doc, lang);
  return [
    { label: 'Page title', ok: !!doc.title[lang].trim(), blocking: true },
    ...(inMenu
      ? [{ label: menuText.length > MENU_LABEL_MAX ? `Menu label too long (${menuText.length}/${MENU_LABEL_MAX}) — shorten it in Page settings` : 'Menu label fits the menu', ok: menuText.length <= MENU_LABEL_MAX, blocking: true }]
      : []),
    { label: 'Title for Google (page settings)', ok: !!doc.seo.metaTitle[lang].trim(), blocking: true },
    { label: missing ? `${missing} text${missing === 1 ? '' : 's'} still to translate` : 'Every text is translated', ok: missing === 0, blocking: true },
    { label: 'Description for Google (recommended)', ok: !!doc.seo.metaDescription[lang].trim(), blocking: false },
  ];
}

/**
 * Gold words of a hero title. The website paints them only when they appear in the title
 * exactly (first match, capitals included); `case` = present but with other capitals.
 */
export function highlightStatus(title: string, highlight: string): 'empty' | 'found' | 'case' | 'missing' {
  const h = highlight.trim();
  if (!h) return 'empty';
  if (title.includes(h)) return 'found';
  if (title.toLowerCase().includes(h.toLowerCase())) return 'case';
  return 'missing';
}

const LANG_NAME: Record<CmsLang, string> = { en: 'English', ms: 'Bahasa Melayu' };
/** owner-written placeholders look like “[Customer name]” — templates use them for “edit me” */
const PLACEHOLDER_RE = /\[[^\]\n]{1,80}\]/;
const plainText = (v: string) => v.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ');

/** first “[…]” text inside any Localized value of `node`, with the language(s) it is in */
function findPlaceholder(node: unknown): { text: string; langs: CmsLang[] } | null {
  if (typeof node !== 'object' || node === null) return null;
  if (Array.isArray(node)) {
    for (const x of node) {
      const r = findPlaceholder(x);
      if (r) return r;
    }
    return null;
  }
  const o = node as Record<string, unknown>;
  if (typeof o.en === 'string' && typeof o.ms === 'string') {
    const hits = CMS_LANGS.map((l) => [l, PLACEHOLDER_RE.exec(plainText(o[l] as string))?.[0]] as const).filter(([, m]) => !!m);
    return hits.length ? { text: hits[0][1]!, langs: hits.map(([l]) => l) } : null;
  }
  for (const v of Object.values(o)) {
    const r = findPlaceholder(v);
    if (r) return r;
  }
  return null;
}

const short = (s: string) => (s.length > 44 ? s.slice(0, 42) + '…]' : s);
/** “” when the placeholder is in both languages, else “ (English)” */
const inLangs = (langs: CmsLang[]) => (langs.length === CMS_LANGS.length ? '' : ` (${langs.map((l) => LANG_NAME[l]).join(', ')})`);

function ctaProblems(buttons: CtaButton[], pageHasForm: boolean): string[] {
  const out: string[] = [];
  buttons.forEach((b, i) => {
    const which = `button ${i + 1} (“${(b.label.en || b.label.ms || 'no text').trim()}”)`;
    if (!b.label.en.trim() && !b.label.ms.trim()) out.push(`button ${i + 1} has no text.`);
    if (b.kind === 'link') {
      const p = linkProblem(b.href ?? '');
      if (p) out.push(`${which}: ${b.href?.trim() ? 'the link is not allowed' : 'the link is empty'}.`);
    }
    if (b.kind === 'form' && !pageHasForm) out.push(`${which} jumps to a form, but the page has no form, so it stays hidden.`);
  });
  return out;
}

/**
 * Things on the page that will look broken or empty to visitors (warnings, not blockers).
 * `knownFormIds` = forms that still exist (null while the list loads: a chosen form counts as fine).
 */
export function pageProblems(doc: CmsPageDoc, knownFormIds: Set<number> | null = null): string[] {
  const out: string[] = [];
  const formOk = (id: number | undefined) => id != null && (!knownFormIds || knownFormIds.has(id));
  const pageHasForm = usedFormIds(doc).some((id) => formOk(id));
  let h1 = 0;
  if (!doc.sections.length) out.push('The page has no content yet.');
  const pagePh = findPlaceholder({ title: doc.title, seo: doc.seo, menuLabel: doc.menuLabel });
  if (pagePh) out.push(`Page settings: placeholder text ${short(pagePh.text)}${inLangs(pagePh.langs)} — replace it before publishing.`);
  doc.sections.forEach((s, si) => {
    if (s.settings.bg === 'image' && !s.settings.bgImage) out.push(`Section ${si + 1}: background photo not chosen.`);
    s.columns.forEach((c) =>
      c.widgets.forEach((w: Widget) => {
        const name = `Section ${si + 1} › ${WIDGET_META[w.type].name}`;
        if (w.type === 'image' && !w.settings.media) out.push(`${name}: no photo chosen.`);
        if (w.type === 'form' && !w.settings.formId) out.push(`${name}: no form chosen.`);
        if (w.type === 'form' && w.settings.formId && !formOk(w.settings.formId)) out.push(`${name}: the chosen form was deleted.`);
        if (w.type === 'products' && !w.settings.ids.length) out.push(`${name}: no products ticked.`);
        if (w.type === 'gallery' && !w.settings.media.length) out.push(`${name}: no photos chosen.`);
        if (w.type === 'video' && !parseVideoUrl(w.settings.url)) out.push(`${name}: video link missing or not recognised.`);
        if (w.type === 'button' && !safeHref(w.settings.href)) out.push(`${name}: the link is missing or not allowed.`);
        if (w.type === 'heading' && w.settings.level === 'h1') h1++;
        if (w.type === 'heroForm') {
          h1++;
          if (!w.settings.formId) out.push(`${name}: no form chosen, so the form card is left out.`);
          else if (!formOk(w.settings.formId)) out.push(`${name}: the chosen form was deleted — choose another one.`);
          for (const l of CMS_LANGS) {
            const st = highlightStatus(w.settings.title[l], w.settings.highlight[l]);
            if (st === 'missing' || st === 'case') out.push(`${name}: the gold words “${w.settings.highlight[l].trim()}” are not in the ${LANG_NAME[l]} title, so nothing is gold.`);
          }
        }
        if (w.type === 'heroForm' || w.type === 'ctaBand') ctaProblems(w.settings.buttons, pageHasForm).forEach((p) => out.push(`${name}: ${p}`));
        if (w.type === 'cards' && w.settings.mediaSide !== 'none' && !w.settings.media) out.push(`${name}: a photo ${w.settings.mediaSide === 'left' ? 'on the left' : 'on the right'} is switched on, but no photo is chosen.`);
        if (w.type === 'reviews' && !w.settings.items.length) out.push(`${name}: no reviews yet.`);
        const ph = findPlaceholder(w.settings);
        if (ph) out.push(`${name}: placeholder text ${short(ph.text)}${inLangs(ph.langs)} — replace it before publishing.`);
      })
    );
  });
  if (h1 > 1) out.push(`The page has ${h1} main titles (H1: a Hero with form or an H1 heading). Keep one — Google reads it as the page’s topic.`);
  return out;
}
