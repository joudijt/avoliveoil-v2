import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { getArticles } from '../content/articles';
import { ARTICLE_IMAGES } from '../content/articles/images';

export function BlogPage() {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams<{ lang: string }>();
  useMarkAppReady();

  const tags = t('blogPage.tags', { returnObjects: true }) as string[];
  const articles = getArticles(lang);

  return (
    <>
      <SEO page="blog" breadcrumbs={[{ name: t('breadcrumb.blog'), path: 'blog' }]} />
      <Navbar />
      <main className="bg-bg">
        <Breadcrumbs items={[{ name: t('breadcrumb.blog'), path: 'blog' }]} />

        <section className="px-6 pb-12 pt-10 text-center md:px-16">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('blogPage.kicker')}</p>
            <h1 className="mx-auto mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl lg:text-6xl">
              {t('blogPage.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-brown/75 md:text-lg">
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
                  <img
                    src={ARTICLE_IMAGES[article.hero.src]}
                    alt={article.hero.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">{article.category}</p>

                  <h2 className="mt-3 text-xl leading-snug text-olive-dark">
                    <Link
                      to={`/${lang}/blog/${article.slug}`}
                      className="transition-colors duration-300 hover:text-gold"
                    >
                      {article.h1}
                    </Link>
                  </h2>

                  <p className="mt-4 font-body text-sm font-light leading-relaxed text-brown/70">
                    {article.excerpt}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-body text-xs text-brown/55">
                    <FiClock aria-hidden="true" className="h-3.5 w-3.5 text-gold" />
                    {t('articlePage.readingTime', { count: article.readingTime })}
                  </div>

                  <Link
                    to={`/${lang}/blog/${article.slug}`}
                    className="mt-auto inline-block pt-6 font-body text-sm font-medium uppercase tracking-[0.15em] text-olive-dark transition-colors duration-300 hover:text-gold"
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
