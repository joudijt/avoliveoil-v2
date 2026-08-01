import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiClock } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FAQ } from '../components/sections/FAQ';
import { Blocks } from '../components/blog/ArticleBody';
import { renderInline } from '../components/blog/inline';
import { ARTICLE_IMAGES } from '../content/articles/images';
import { articlePathByLang, findArticle } from '../content/articles';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { MADINAH_NAME, MADINAH_URL } from '../config/site';

const DATE_LOCALE: Record<string, string> = { en: 'en-MY', ar: 'ar-EG', ms: 'ms-MY' };

export function ArticlePage() {
  const { t } = useTranslation();
  const { lang = 'en', slug } = useParams<{ lang: string; slug: string }>();
  const article = findArticle(lang, slug);
  useMarkAppReady();

  // Unknown slug: send the reader to the blog index rather than showing an
  // empty shell that a crawler would happily index as a real page.
  if (!article) return <Navigate to={`/${lang}/blog`} replace />;

  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? FiArrowRight : FiArrowLeft;
  const published = new Intl.DateTimeFormat(DATE_LOCALE[lang] ?? 'en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.datePublished));

  const crumbs = [
    { name: t('breadcrumb.blog'), path: 'blog' },
    { name: article.h1, path: `blog/${article.slug}` },
  ];

  return (
    <>
      <SEO
        page="article"
        pathByLang={articlePathByLang(article.id)}
        titleOverride={article.seoTitle}
        descriptionOverride={article.metaDescription}
        breadcrumbs={crumbs}
        faqs={article.faqs}
        article={{
          headline: article.metaTitle,
          description: article.metaDescription,
          imagePath: article.ogImage,
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          section: article.category,
          tags: article.tags,
          keywords: [article.focusKeyword, ...article.relatedKeywords],
        }}
      />
      <Navbar />

      <main className="bg-bg">
        <Breadcrumbs items={crumbs} />

        <article>
          {/* ---------------------------------------------------------- header */}
          <header className="px-6 pb-10 pt-8 md:px-16">
            <div className="mx-auto max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-gold">{article.category}</p>
              <h1 className="mt-4 text-4xl leading-[1.15] text-olive-dark md:text-5xl">{article.h1}</h1>
              <p className="mt-6 font-body text-lg font-light leading-relaxed text-brown/75">
                {article.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm text-brown/60">
                <time dateTime={article.datePublished}>{published}</time>
                <span className="flex items-center gap-2">
                  <FiClock aria-hidden="true" className="h-4 w-4 text-gold" />
                  {t('articlePage.readingTime', { count: article.readingTime })}
                </span>
              </div>
            </div>
          </header>

          <div className="px-6 md:px-16">
            <figure className="mx-auto max-w-5xl">
              <img
                src={ARTICLE_IMAGES[article.hero.src]}
                alt={article.hero.alt}
                width={1280}
                height={720}
                className="h-[38vh] w-full rounded-2xl object-cover shadow-[0_25px_60px_rgba(46,58,36,0.25)] md:h-[52vh]"
              />
            </figure>
          </div>

          {/* ------------------------------------------------- quick answer + toc */}
          <div className="px-6 md:px-16">
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="rounded-2xl bg-olive-dark px-6 py-7 md:px-8">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  {t('articlePage.quickAnswer')}
                </p>
                <p className="mt-3 font-body text-base font-light leading-[1.8] text-cream/90 md:text-lg">
                  {article.keyTakeaway}
                </p>
              </div>

              <nav aria-label={t('articlePage.contents')} className="mt-10 rounded-2xl border border-olive-dark/10 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">{t('articlePage.contents')}</p>
                <ol className="mt-4 space-y-2">
                  {article.sections.map((section, i) => (
                    <li key={section.id} className="font-body text-sm font-light text-brown/75">
                      <a
                        href={`#${section.id}`}
                        className="transition-colors duration-300 hover:text-gold"
                      >
                        <span className="text-gold">{i + 1}.</span> {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>

          {/* ------------------------------------------------------------- body */}
          <div className="px-6 pb-4 md:px-16">
            <div className="mx-auto max-w-3xl">
              {article.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'mt-10 font-body text-lg font-light leading-[1.85] text-brown/85 md:text-xl'
                      : 'mt-6 font-body text-base font-light leading-[1.85] text-brown/80 md:text-[1.0625rem]'
                  }
                >
                  {renderInline(paragraph, lang)}
                </p>
              ))}

              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 pt-14">
                  <h2 className="text-3xl leading-tight text-olive-dark md:text-4xl">{section.heading}</h2>
                  <Blocks blocks={section.blocks} />
                </section>
              ))}

              <section className="scroll-mt-28 pt-14">
                <h2 className="text-3xl leading-tight text-olive-dark md:text-4xl">
                  {article.conclusion.heading}
                </h2>
                <Blocks blocks={article.conclusion.blocks} />
              </section>

              {/* tags */}
              <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-olive-dark/10 pt-8">
                <span className="font-body text-sm text-brown/60">{t('articlePage.tags')}</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-body text-xs font-medium tracking-[0.1em] text-olive-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* ------------------------------------------------------------- faqs */}
        <FAQ kicker={t('articlePage.faqKicker')} title={t('articlePage.faqTitle')} items={article.faqs} />

        {/* -------------------------------------------------------------- cta */}
        <section className="px-6 pb-24 md:px-16">
          <div className="mx-auto max-w-3xl rounded-2xl bg-[#D6D2C4] px-6 py-10 text-center shadow-[0_20px_45px_rgba(46,58,36,0.18)] md:px-12">
            <h2 className="text-2xl text-olive-dark md:text-3xl">{t('articlePage.cta.title')}</h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-base font-light leading-relaxed text-brown/75">
              {t('articlePage.cta.text', { store: MADINAH_NAME })}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to={`/${lang}/shop`}
                className="rounded-full bg-gold px-8 py-3 font-body text-sm font-medium uppercase tracking-[0.15em] text-olive-dark transition-transform duration-300 hover:scale-[1.03]"
              >
                {t('articlePage.cta.button')}
              </Link>
              <a
                href={MADINAH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-olive-dark/30 px-8 py-3 font-body text-sm font-medium uppercase tracking-[0.15em] text-olive-dark transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                {MADINAH_NAME}
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- related */}
        <section className="px-6 pb-28 md:px-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl text-olive-dark md:text-4xl">{t('articlePage.related')}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {article.related.map((item) => (
                <Link
                  key={item.path}
                  to={`/${lang}/${item.path}`}
                  className="group flex flex-col rounded-2xl border border-olive-dark/10 bg-cream p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(46,58,36,0.14)]"
                >
                  <h3 className="text-lg leading-snug text-olive-dark transition-colors duration-300 group-hover:text-gold">
                    {item.label}
                  </h3>
                  <p className="mt-3 font-body text-sm font-light leading-relaxed text-brown/70">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to={`/${lang}/blog`}
                className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.15em] text-olive-dark transition-colors duration-300 hover:text-gold"
              >
                <BackIcon aria-hidden="true" className="h-4 w-4" />
                {t('articlePage.backToBlog')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
