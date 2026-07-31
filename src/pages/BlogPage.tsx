import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import fieldImg from '../assets/images/FarmerPouringOliveOilInTheField.png';

export function BlogPage() {
  const { t } = useTranslation();
  useMarkAppReady();

  const tags = t('blogPage.tags', { returnObjects: true }) as string[];

  return (
    <>
      <SEO page="blog" breadcrumbs={[{ name: t('breadcrumb.blog'), path: 'blog' }]} />
      <Navbar />
      <main className="bg-bg">
        <Breadcrumbs items={[{ name: t('breadcrumb.blog'), path: 'blog' }]} />

        <section className="px-6 pb-16 pt-10 text-center md:px-16 md:pb-20">
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

        <section className="relative overflow-hidden px-6 pb-24 md:px-16 md:pb-32">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(46,58,36,0.25)]">
            <div className="relative">
              <img
                src={fieldImg}
                alt="Arabian Village olive oil being poured in a Palestinian olive grove"
                className="h-[46vh] w-full object-cover md:h-[56vh]"
                loading="lazy"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(46,58,36,0) 30%, rgba(20,26,16,0.92) 100%)' }}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-12 text-center sm:px-12">
                <span className="rounded-full bg-gold px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-olive-dark">
                  {t('blogPage.comingSoon.badge')}
                </span>
                <h2 className="mt-5 max-w-xl text-2xl text-cream md:text-3xl">
                  {t('blogPage.comingSoon.title')}
                </h2>
                <p className="mt-4 max-w-lg font-body text-sm font-light leading-relaxed text-cream/75 md:text-base">
                  {t('blogPage.comingSoon.text')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
