import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ensureArticles, peekArticles } from '../content/articles/registry';
import { ARTICLE_IMAGES } from '../content/articles/images';
import { cardSources } from '../content/articles/cardImages';

export function BlogPage() {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams<{ lang: string }>();

  // Synchronous read. Populated on a first load of /{lang}/blog because
  // main.tsx awaits ensureArticles(lang) before rendering — that is what makes
  // the prerendered markup hydratable. Undefined only after a client-side
  // navigation into the blog.
  const articles = peekArticles(lang);
  const [, forceRender] = useState(0);

  useEffect(() => {
    if (articles) return;
    let alive = true;
    void ensureArticles(lang).then(() => {
      if (alive) forceRender((n) => n + 1);
    });
    return () => {
      alive = false;
    };
  }, [lang, articles]);

  // NOT useMarkAppReady(): that hook fires on mount unconditionally, and
  // scripts/prerender.mjs snapshots the page the instant
  // body[data-app-ready="true"] appears. An index flagged ready before its
  // cards exist would be published as an empty blog page.
  useEffect(() => {
    if (!articles) return;
    document.body.setAttribute('data-app-ready', 'true');
  }, [articles]);

  // Chunk still in flight — this happens ONLY on a client-side navigation
  // (a first load on a blog URL is awaited in main.tsx before hydration).
  // Render the frame, not nothing: returning null blanked the whole document
  // for the length of a 400-500 KB download, which on a slow connection reads
  // as a broken site. `data-app-ready` stays unset until real content exists,
  // so the prerenderer can never snapshot this state.
  if (!articles) {
    return (
      <>
        <Navbar />
        <main className="bg-bg min-h-screen px-6 pb-28 pt-28 md:px-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-2xl bg-cream/70 shadow-[0_18px_45px_rgba(46,58,36,0.08)]"
              />
            ))}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const tags = t('blogPage.tags', { returnObjects: true }) as string[];

  return (
    <>
      <SEO page="blog" breadcrumbs={[{ name: t('breadcrumb.blog'), path: 'blog' }]} />
      <Navbar />
      <main className="bg-bg">
        <Breadcrumbs items={[{ name: t('breadcrumb.blog'), path: 'blog' }]} />

        <section className="px-6 pb-12 pt-10 text-center md:px-16">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-gold-ink">{t('blogPage.kicker')}</p>
            <h1 className="mx-auto mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl lg:text-6xl">
              {t('blogPage.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-brown-ink md:text-lg">
              {t('blogPage.intro')}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-olive-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-28 md:px-16 md:pb-32">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.id} className="flex flex-col overflow-hidden rounded-2xl bg-cream shadow-[0_18px_45px_rgba(46,58,36,0.14)]">
                <Link to={`/${lang}/blog/${article.slug}`} className="group block overflow-hidden">
                  {/* Card-sized copies, not the 1024-wide article hero: this
                      grid renders at most ~390 CSS px wide. */}
                  <img
                    {...cardSources(ARTICLE_IMAGES[article.hero.src])}
                    sizes="(min-width: 1024px) 368px, (min-width: 768px) calc(50vw - 64px), calc(100vw - 48px)"
                    alt={article.hero.alt}
                    width={400}
                    height={208}
                    loading="lazy"
                    decoding="async"
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold-ink">{article.category}</p>

                  <h2 className="mt-3 text-xl leading-snug text-olive-dark">
                    <Link
                      to={`/${lang}/blog/${article.slug}`}
                      className="transition-colors duration-300 hover:text-gold-ink"
                    >
                      {article.h1}
                    </Link>
                  </h2>

                  <p className="mt-4 font-body text-sm leading-relaxed text-brown-ink">
                    {article.excerpt}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-body text-xs text-brown">
                    <FiClock aria-hidden="true" className="h-3.5 w-3.5 text-gold" />
                    {t('articlePage.readingTime', { count: article.readingTime })}
                  </div>

                  <Link
                    to={`/${lang}/blog/${article.slug}`}
                    className="mt-auto inline-block pt-6 font-body text-sm font-medium uppercase tracking-[0.15em] text-olive-dark transition-colors duration-300 hover:text-gold-ink"
                  >
                    {t('blogPage.readMore')}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
