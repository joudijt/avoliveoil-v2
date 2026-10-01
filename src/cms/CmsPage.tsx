/**
 * Public route `/:lang/:slug` — a page built in the control panel (spec §5, §13.2).
 *
 * Three ways in:
 *  - `/<lang>/__cms-template` and `/<lang>/__cms-template-landing` (prerender only):
 *    the empty page shells serve.php fills with a page's published HTML — site chrome
 *    (Navbar, Footer) or landing chrome (LandingHeader, LandingFooter) around
 *    `<main><div data-cms-page-root>`, placeholder head. Never fetch.
 *  - a full page load of a CMS URL: serve.php put the page in `#cms-boot`, so React
 *    renders it synchronously, the same markup the server already sent.
 *  - client-side navigation: no boot page for this slug → GET /api/public/page.
 * The markup inside `[data-cms-page-root]` is <CmsBlocks> — the very component
 * render.tsx turns into the published HTML. The chrome around it follows
 * `doc.layout` (LP-SPEC §8 B2).
 */
import { useEffect, useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { SEO } from '../components/SEO';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { OG_IMAGE_HEIGHT, OG_IMAGE_PATH, OG_IMAGE_WIDTH, SITE_URL } from '../config/site';
import { getBoot } from './boot';
import { CMS_LANGS, PUBLIC_PAGE_ENDPOINT, type CmsLang, type PublicPagePayload, type ResolvedSeo } from './contracts';
import { CmsBlocks } from './blocks/CmsBlocks';
import { PAGE_CHROME, cx } from './blocks/classes';
import { ui } from './blocks/strings';
import { LandingFooter, LandingHeader } from './landing/LandingChrome';
import { setLandingChrome } from './landingChrome';

type Layout = 'site' | 'landing';

/** The prerendered page shells serve.php fills, one per layout (LP-SPEC §8 B1). */
const TEMPLATES: Record<string, Layout> = { '__cms-template': 'site', '__cms-template-landing': 'landing' };

/** While a landing page is mounted, App hides its global WhatsApp button (cleared on unmount). */
function useLandingFlag(on: boolean) {
  useLayoutEffect(() => {
    if (!on) return;
    setLandingChrome(true);
    return () => setLandingChrome(false);
  }, [on]);
}

type State = { kind: 'loading' } | { kind: 'ready'; page: PublicPagePayload } | { kind: 'missing' };

function isLang(v: string | undefined): v is CmsLang {
  return !!v && (CMS_LANGS as readonly string[]).includes(v);
}

function isPayload(v: unknown, slug: string, lang: CmsLang): v is PublicPagePayload {
  if (!v || typeof v !== 'object') return false;
  const p = v as PublicPagePayload;
  return p.slug === slug && p.lang === lang && !!p.doc && p.doc.schema === 1 && Array.isArray(p.doc.sections) && !!p.seo;
}

function bootPageFor(slug: string, lang: CmsLang): PublicPagePayload | null {
  const page = getBoot()?.page;
  return page && isPayload(page, slug, lang) ? page : null;
}

/**
 * True when this document was served for exactly this address and the server's boot data
 * carries no page: serve.php already answered 404/410, so asking the API again would only
 * log a second 404 in the console. (No boot at all = the static fallback: still ask.)
 */
function serverSaidMissing(slug: string, lang: CmsLang): boolean {
  const boot = getBoot();
  if (!boot || boot.page) return false;
  const nav = performance.getEntriesByType?.('navigation')[0] as PerformanceNavigationTiming | undefined;
  const docPath = nav ? new URL(nav.name).pathname : '';
  return docPath.replace(/\/+$/, '') === `/${lang}/${slug}`;
}

function markReady() {
  document.body.setAttribute('data-app-ready', 'true');
}

export function CmsPage() {
  const { lang: rawLang, slug = '' } = useParams<{ lang: string; slug: string }>();
  const template = Object.hasOwn(TEMPLATES, slug) ? TEMPLATES[slug] : undefined;
  if (template && isLang(rawLang)) return <CmsTemplate key={`${rawLang}/${slug}`} lang={rawLang} slug={slug} layout={template} />;
  return <CmsPageView key={`${rawLang}/${slug}`} rawLang={rawLang} slug={slug} />;
}

function CmsPageView({ rawLang, slug }: { rawLang: string | undefined; slug: string }) {
  const lang: CmsLang = isLang(rawLang) ? rawLang : 'en';
  const [state, setState] = useState<State>(() => {
    if (!isLang(rawLang)) return { kind: 'missing' };
    const boot = bootPageFor(slug, lang);
    if (boot) return { kind: 'ready', page: boot };
    return serverSaidMissing(slug, lang) ? { kind: 'missing' } : { kind: 'loading' };
  });

  useEffect(() => {
    if (state.kind !== 'loading') return;
    const ctrl = new AbortController();
    const qs = new URLSearchParams({ slug, lang }).toString();
    fetch(`${PUBLIC_PAGE_ENDPOINT}?${qs}`, { headers: { Accept: 'application/json' }, signal: ctrl.signal })
      .then(async (res) => {
        if (!res.ok) return setState({ kind: 'missing' });
        const body: unknown = await res.json();
        setState(isPayload(body, slug, lang) ? { kind: 'ready', page: body } : { kind: 'missing' });
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name !== 'AbortError') setState({ kind: 'missing' });
      });
    return () => ctrl.abort();
  }, [state.kind, slug, lang]);

  useEffect(() => {
    if (state.kind !== 'loading') markReady();
  }, [state.kind]);

  const landing = state.kind === 'ready' && state.page.doc.layout === 'landing';
  useLandingFlag(landing);

  if (state.kind === 'missing') return <NotFound lang={lang} />;

  const preview = !!getBoot()?.preview;
  return (
    <>
      {state.kind === 'ready' ? <SEO page="cms" resolved={state.page.seo} /> : null}
      {landing ? <LandingHeader lang={lang} slug={slug} /> : <Navbar />}
      <main className={PAGE_CHROME.main}>
        {state.kind === 'ready' ? (
          <div data-cms-page-root="">
            <CmsBlocks doc={state.page.doc} lang={lang} media={state.page.media ?? {}} forms={state.page.forms ?? {}} pageId={state.page.id} />
          </div>
        ) : (
          <div data-cms-page-root="" className={PAGE_CHROME.loading} />
        )}
      </main>
      {landing ? <LandingFooter lang={lang} /> : <Footer />}
      {preview ? <div className={cx(PAGE_CHROME.previewBadge, landing && PAGE_CHROME.previewBadgeLanding)}>Preview — not published</div> : null}
    </>
  );
}

/** Placeholder head the prerender snapshots; serve.php rewrites every tag from ResolvedSeo. */
function templateSeo(lang: CmsLang, slug: string): ResolvedSeo {
  const url = `${SITE_URL}/${lang}/${slug}`;
  return {
    title: 'CMS template',
    description: 'CMS template',
    canonical: url,
    robots: 'noindex, follow',
    alternates: { en: `${SITE_URL}/en/${slug}`, ms: `${SITE_URL}/ms/${slug}` },
    ogImage: { url: `${SITE_URL}${OG_IMAGE_PATH}`, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT },
    jsonLd: [],
  };
}

function CmsTemplate({ lang, slug, layout }: { lang: CmsLang; slug: string; layout: Layout }) {
  useMarkAppReady();
  const landing = layout === 'landing';
  useLandingFlag(landing);
  return (
    <>
      <SEO page="cms" resolved={templateSeo(lang, slug)} />
      {landing ? <LandingHeader lang={lang} slug={slug} /> : <Navbar />}
      <main className={PAGE_CHROME.main}>
        <div data-cms-page-root="" />
      </main>
      {landing ? <LandingFooter lang={lang} /> : <Footer />}
    </>
  );
}

function NotFound({ lang }: { lang: CmsLang }) {
  useMarkAppReady();
  return (
    <>
      <Helmet htmlAttributes={{ lang, dir: 'ltr' }}>
        <title>{`${ui(lang, 'notFoundTitle')} | Arabian Village`}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Navbar />
      <main className={PAGE_CHROME.main}>
        <section className={PAGE_CHROME.notFound}>
          <div className={PAGE_CHROME.notFoundInner}>
            <p className={PAGE_CHROME.notFoundKicker}>{ui(lang, 'notFoundKicker')}</p>
            <h1 className={PAGE_CHROME.notFoundTitle}>{ui(lang, 'notFoundTitle')}</h1>
            <p className={PAGE_CHROME.notFoundText}>{ui(lang, 'notFoundText')}</p>
            <a href={`/${lang}`} className={PAGE_CHROME.notFoundLink}>
              {ui(lang, 'backHome')}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
