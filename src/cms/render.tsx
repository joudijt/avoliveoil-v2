/**
 * Publish-time HTML for a CMS page (spec §5, §13.3). Imported ONLY by the admin
 * bundle: it pulls in react-dom/server, which must never reach a chunk the public
 * index.html loads (scripts/check-bundles.mjs). The public site renders the same
 * <CmsBlocks> tree with React (CmsPage), so the HTML stored here and what React
 * draws over it are the same markup.
 */
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import i18next, { type i18n as I18n } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from '../i18n/locales/en/common.json';
import ms from '../i18n/locales/ms/common.json';
import type { CmsLang, CmsPageDoc, RenderContext, TextValue } from './contracts';
import { CmsBlocks } from './blocks/CmsBlocks';

const BASE: Record<CmsLang, unknown> = { en, ms };

/** RenderContext plus the page id the form widgets post with their entries (optional, see report). */
export type CmsRenderContext = RenderContext & { pageId?: number };

/**
 * A private i18next instance for one language with the published site text
 * applied — never the app's global instance, whose language and overrides belong
 * to whatever the admin is showing at the moment.
 */
function instanceFor(lang: CmsLang, text: Record<string, TextValue>): I18n {
  const resources = structuredClone(BASE[lang]) as Record<string, unknown>;
  const inst = i18next.createInstance();
  inst.use(initReactI18next).init({
    resources: { [lang]: { common: resources } },
    lng: lang,
    fallbackLng: false,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    initAsync: false,
    react: { useSuspense: false },
  });
  for (const [key, value] of Object.entries(text ?? {})) {
    // Whole-array keys (hero.headlineWords) replace the array; scalars set one leaf.
    inst.addResource(lang, 'common', key, value as unknown as string, { silent: true });
  }
  return inst;
}

/** The React tree renderPageHtml renders — reusable for previews inside the admin. */
export function renderBlocksElement(doc: CmsPageDoc, ctx: CmsRenderContext): ReactElement {
  const inst = instanceFor(ctx.lang, ctx.text);
  return (
    <I18nextProvider i18n={inst}>
      <MemoryRouter initialEntries={[`/${ctx.lang}`]}>
        <CmsBlocks doc={doc} lang={ctx.lang} media={ctx.media ?? {}} forms={ctx.forms ?? {}} mode="public" pageId={ctx.pageId} />
      </MemoryRouter>
    </I18nextProvider>
  );
}

/**
 * Inner HTML of `[data-cms-page-root]` for one language. Synchronous. Throws on a
 * page format this renderer does not know (the admin shows the message).
 */
export function renderPageHtml(doc: CmsPageDoc, ctx: CmsRenderContext): string {
  if (!doc || doc.schema !== 1) throw new Error('This page was saved by a newer version of the control panel. Reload the panel and try again.');
  if (ctx.lang !== 'en' && ctx.lang !== 'ms') throw new Error(`Unknown language "${String(ctx.lang)}".`);
  // React 19 turns an eager `fetchPriority="high"` <img> (the hero photo) into a
  // <link rel=preload as=image> hoisted to the START of a server render. In a page-root
  // fragment that link would sit in <body> (and the server sanitiser drops <link>), so
  // it goes; on the live page React's client render adds the same preload to <head>.
  return renderToStaticMarkup(renderBlocksElement(doc, ctx)).replace(/<link\b[^>]*\bas="image"[^>]*>/g, '');
}
