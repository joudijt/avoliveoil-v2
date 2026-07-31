import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FAQ } from '../components/sections/FAQ';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import fieldImg from '../assets/images/AVOliveOilInTheField.png';

interface Reason {
  title: string;
  desc: string;
}

interface Stat {
  value: string;
  label: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export function WhyUsPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  useMarkAppReady();

  const reasons = t('whyUsPage.reasons', { returnObjects: true }) as Reason[];
  const stats = t('whyUsPage.partner.stats', { returnObjects: true }) as Stat[];
  const faqItems = t('whyUsPage.faq.items', { returnObjects: true }) as FaqItem[];

  return (
    <>
      <SEO page="why-us" breadcrumbs={[{ name: t('breadcrumb.whyUs'), path: 'why-us' }]} faqs={faqItems} />
      <Navbar />
      <main className="bg-bg">
        <Breadcrumbs items={[{ name: t('breadcrumb.whyUs'), path: 'why-us' }]} />

        <section className="px-6 pb-16 pt-10 md:px-16 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('whyUsPage.kicker')}</p>
            <h1 className="mx-auto mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl lg:text-6xl">
              {t('whyUsPage.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-brown/75 md:text-lg">
              {t('whyUsPage.intro')}
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-16 md:pb-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <img
              src={fieldImg}
              alt="Arabian Village olive oil bottle among Palestinian olive groves in the field"
              className="w-full rounded-2xl object-cover shadow-[0_25px_50px_rgba(46,58,36,0.18)]"
              loading="lazy"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-olive-dark/10 bg-cream p-7 text-start shadow-[0_10px_30px_rgba(46,58,36,0.06)]"
                >
                  <FiCheckCircle className="h-6 w-6 text-gold" />
                  <h2 className="mt-4 text-lg text-olive-dark">{reason.title}</h2>
                  <p className="mt-2 text-sm font-light leading-relaxed text-brown/70">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-olive-dark px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('whyUsPage.partner.kicker')}</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl text-cream md:text-4xl">
              {t('whyUsPage.partner.title')}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-sm font-light leading-relaxed text-cream/70 md:text-base">
              {t('whyUsPage.partner.desc')}
            </p>

            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl text-gold md:text-4xl">{s.value}</p>
                  <p className="mt-2 text-xs font-light uppercase tracking-[0.2em] text-cream/60">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl font-body text-sm font-light leading-relaxed text-cream/60">
              {t('whyUsPage.partner.text')}
            </p>

            <a
              href="https://madinah.com.my/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-cream"
            >
              {t('whyUsPage.partner.cta')}
            </a>
          </div>
        </section>

        <section className="bg-[#E8E2D7] px-6 py-20 text-center md:px-16 md:py-28">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('whyUsPage.flavors.kicker')}</p>
            <h2 className="mx-auto mt-3 text-3xl text-olive-dark md:text-4xl">{t('whyUsPage.flavors.title')}</h2>
            <p className="mt-4 font-body text-sm font-light leading-relaxed text-brown/70 md:text-base">
              {t('whyUsPage.flavors.desc')}
            </p>
            <Link
              to={`/${lang}/products`}
              className="mt-8 inline-block rounded-full bg-olive-dark px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:bg-gold hover:text-olive-dark"
            >
              {t('whyUsPage.flavors.cta')}
            </Link>
          </div>
        </section>

        <FAQ kicker={t('whyUsPage.faq.kicker')} title={t('whyUsPage.faq.title')} items={faqItems} />
      </main>
      <Footer />
    </>
  );
}
