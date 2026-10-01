import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { CmsLang, CmsPageDoc, Localized, MediaRef, PublicForm, Widget } from '../contracts';
import { FORM_ANCHOR } from '../contracts';
import { LP_BAR, LP_HEADER, PAGE, cx } from './classes';
import { BlockContext, type BlockEnv } from './context';
import { goToForm, whatsappHref } from './cta';
import { WhatsappIcon } from './icons';
import { SectionView } from './SectionView';
import { ui } from './strings';

export interface CmsBlocksProps {
  doc: CmsPageDoc;
  lang: CmsLang;
  media: Record<string, MediaRef>;
  forms: Record<string, PublicForm>;
  mode?: 'public' | 'canvas';
  pageId?: number;
  /** canvas: bump a widget's number to remount it (after in-place editing touched its DOM) */
  renderKeys?: Record<string, number>;
}

/** Page-level facts the blocks need, computed ONCE per page (LP-SPEC §8 M2, M3). */
export interface PageFacts {
  /** id of the first form / heroForm widget whose form resolves — it carries #cms-form */
  formAnchor: string | null;
  /** first widget, when it is a hero/band opening the page edge to edge (landing, public) */
  leadId: string | null;
  /** WhatsApp message of the page's first WhatsApp button (the phone bar reuses it) */
  waMessage: Localized | undefined;
}

function pageFacts(doc: CmsPageDoc, forms: Record<string, PublicForm>, landingPublic: boolean): PageFacts {
  const widgets: Widget[] = doc.sections.flatMap((s) => s.columns.flatMap((c) => c.widgets));
  const resolves = (id: number | undefined) => {
    const f = id ? forms[String(id)] : undefined;
    return !!f && Array.isArray(f.def?.fields);
  };
  const anchor = widgets.find((w) => (w.type === 'form' || w.type === 'heroForm') && resolves(w.settings.formId));

  let leadId: string | null = null;
  const first = doc.sections[0];
  if (landingPublic && first && first.settings.layout === 'full' && first.settings.padY === 'none' && first.columns.length === 1) {
    const w = first.columns[0].widgets[0];
    if (w && (w.type === 'heroForm' || w.type === 'ctaBand') && !first.hide?.mobile && !w.hide?.mobile) leadId = w.id;
  }

  let waMessage: Localized | undefined;
  for (const w of widgets) {
    if (w.type !== 'heroForm' && w.type !== 'ctaBand') continue;
    const b = w.settings.buttons?.find((x) => x.kind === 'whatsapp' && x.message);
    if (b) {
      waMessage = b.message;
      break;
    }
  }
  return { formAnchor: anchor?.id ?? null, leadId, waMessage };
}

/**
 * Phone-only bottom bar of a landing page (<768 px): WhatsApp + "Fill the form" (only
 * when the page has a form). Part of the page root, so the published HTML and React
 * draw the same bar, and it hides itself with CSS while a form field has focus.
 */
function LandingBar({ lang, facts }: { lang: CmsLang; facts: PageFacts }) {
  return (
    <nav data-cms-bottom-bar="" aria-label={ui(lang, 'callToAction')} className={LP_BAR.root}>
      <a href={whatsappHref(facts.waMessage, lang)} target="_blank" rel="noopener noreferrer" className={cx(LP_BAR.btn, LP_BAR.wa)}>
        <WhatsappIcon className={LP_BAR.icon} />
        {ui(lang, 'whatsappUs')}
      </a>
      {facts.formAnchor ? (
        <a href={`#${FORM_ANCHOR}`} onClick={goToForm} className={cx(LP_BAR.btn, LP_BAR.form)}>
          {ui(lang, 'fillForm')}
        </a>
      ) : null}
    </nav>
  );
}

/**
 * The content of `[data-cms-page-root]`. Site layout: the breadcrumb trail every inner
 * page has (it also clears the fixed header), then the sections. Landing layout: no
 * breadcrumb; a spacer for the fixed header unless an edge-to-edge hero opens the
 * page, the sections, then the phone bar. Rendered by CmsPage (React), by
 * renderPageHtml (publish-time HTML) and by the canvas — the same components, so the
 * three can never drift apart. No lazy parts, no Suspense: renderToStaticMarkup must
 * produce the full page synchronously.
 */
export function CmsBlocks({ doc, lang, media, forms, mode = 'public', pageId, renderKeys }: CmsBlocksProps) {
  const { t } = useTranslation();
  const landing = doc?.layout === 'landing';
  const facts = useMemo(
    () => (doc && Array.isArray(doc.sections) ? pageFacts(doc, forms ?? {}, landing && mode === 'public') : { formAnchor: null, leadId: null, waMessage: undefined }),
    [doc, forms, landing, mode]
  );
  const env = useMemo<BlockEnv>(
    () => ({
      lang,
      media: media ?? {},
      forms: forms ?? {},
      mode,
      pageId,
      tone: 'light',
      align: 'start',
      span: 12,
      full: false,
      layout: landing ? 'landing' : 'site',
      formAnchor: facts.formAnchor,
      leadId: facts.leadId,
      bleed: false,
    }),
    [lang, media, forms, mode, pageId, landing, facts]
  );
  // The renderer refuses page formats it does not know rather than guess at them.
  if (!doc || doc.schema !== 1 || !Array.isArray(doc.sections)) return null;
  const title = doc.title?.[lang]?.trim() || doc.title?.en?.trim() || '';
  const sections = doc.sections.map((s) => <SectionView key={s.id} section={s} renderKeys={renderKeys} />);

  if (landing) {
    return (
      <BlockContext.Provider value={env}>
        {mode === 'public' && !facts.leadId ? <div className={LP_HEADER.spacer} aria-hidden="true" /> : null}
        {sections}
        {mode === 'public' ? <LandingBar lang={lang} facts={facts} /> : null}
      </BlockContext.Provider>
    );
  }

  return (
    <BlockContext.Provider value={env}>
      <div className={mode === 'canvas' ? PAGE.crumbsWrapCanvas : PAGE.crumbsWrap}>
        <nav aria-label={ui(lang, 'breadcrumb')} className={PAGE.crumbsNav}>
          <ol className={PAGE.crumbsList}>
            <li>
              <a href={`/${lang}`} className={PAGE.crumbsLink}>
                {t('nav.home')}
              </a>
            </li>
            {title ? (
              <li className={PAGE.crumbsItem}>
                <span aria-hidden="true" className={PAGE.crumbsSep}>
                  /
                </span>
                <span className={PAGE.crumbsCurrent} aria-current="page">
                  {title}
                </span>
              </li>
            ) : null}
          </ol>
        </nav>
      </div>
      {sections}
    </BlockContext.Provider>
  );
}
