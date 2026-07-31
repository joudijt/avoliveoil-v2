import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaStore } from 'react-icons/fa';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FAQ } from '../components/sections/FAQ';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { buildWhatsAppUrl, WHATSAPP_NUMBER } from '../utils/whatsapp';
import { SOCIAL_LINKS } from '../data/social';
import {
  MADINAH_NAME,
  MADINAH_URL,
  CONTACT_EMAIL,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_LINK_URL,
} from '../config/site';

interface FaqItem {
  q: string;
  a: string;
}

const inputClass =
  'w-full rounded-lg border border-olive-dark/15 bg-white/70 px-4 py-3 text-sm text-olive-dark placeholder:text-brown/40 focus:border-gold focus:outline-none';

const INFO_CARDS = [
  { key: 'whatsapp', Icon: FaWhatsapp },
  { key: 'email', Icon: FiMail },
  { key: 'address', Icon: FiMapPin },
] as const;

export function ContactPage() {
  const { t } = useTranslation();
  useMarkAppReady();

  const faqItems = t('contactPage.faq.items', { returnObjects: true }) as FaqItem[];

  return (
    <>
      <SEO page="contact" breadcrumbs={[{ name: t('breadcrumb.contact'), path: 'contact' }]} faqs={faqItems} />
      <Navbar />
      <main className="bg-bg">
        <Breadcrumbs items={[{ name: t('breadcrumb.contact'), path: 'contact' }]} />

        <section className="px-6 pb-16 pt-10 text-center md:px-16 md:pb-20">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('contactPage.kicker')}</p>
            <h1 className="mx-auto mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl lg:text-6xl">
              {t('contactPage.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-brown/75 md:text-lg">
              {t('contactPage.intro')}
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-16 md:pb-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
            {INFO_CARDS.map(({ key, Icon }) => (
              <div
                key={key}
                className="rounded-2xl border border-olive-dark/10 bg-cream p-8 text-start shadow-[0_10px_30px_rgba(46,58,36,0.06)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-sm uppercase tracking-[0.2em] text-gold">
                  {t(`contactPage.info.${key}.label`)}
                </h2>
                {/* Each card's value is actionable where it can be: WhatsApp
                    and the map open in a new tab, the address is not translated
                    per locale so a courier and Maps both still resolve it. */}
                {key === 'whatsapp' && (
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-base text-olive-dark/70 transition-colors duration-300 hover:text-gold"
                  >
                    {t(`contactPage.info.${key}.value`)}
                  </a>
                )}
                {key === 'email' && (
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-2 block break-words text-base text-olive-dark/70 transition-colors duration-300 hover:text-gold"
                  >
                    {t(`contactPage.info.${key}.value`)}
                  </a>
                )}
                {key === 'address' && (
                  <a
                    href={GOOGLE_MAPS_LINK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-base leading-relaxed text-olive-dark/70 transition-colors duration-300 hover:text-gold"
                  >
                    {t(`contactPage.info.${key}.value`)}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Embedded map. `loading="lazy"` keeps Google's iframe off the
              critical path, and `dir="ltr"` stops the RTL locales from
              mirroring the map's own chrome. */}
          <div
            dir="ltr"
            className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-2xl border border-olive-dark/10 shadow-[0_10px_30px_rgba(46,58,36,0.06)]"
          >
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              title={t('contactPage.info.address.label')}
              className="block h-[320px] w-full md:h-[420px]"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-olive-dark/15 bg-cream text-olive-dark/70 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
            <a
              href={MADINAH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center gap-2 rounded-full border border-olive-dark/15 bg-cream px-5 text-sm text-olive-dark/70 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <FaStore className="h-4 w-4 shrink-0" />
              {MADINAH_NAME}
            </a>
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-[#D6D2C4] p-8 shadow-[0_25px_50px_rgba(46,58,36,0.18)] sm:p-12">
            <h2 className="text-2xl text-olive-dark md:text-3xl">{t('contactPage.form.title')}</h2>
            <form
              className="mt-8 space-y-3 text-start"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const url = buildWhatsAppUrl(t('whatsapp.formIntro'), [
                  { label: t('whatsapp.fields.name'), value: String(data.get('name') ?? '') },
                  { label: t('whatsapp.fields.email'), value: String(data.get('email') ?? '') },
                  { label: t('whatsapp.fields.subject'), value: String(data.get('subject') ?? '') },
                  { label: t('whatsapp.fields.message'), value: String(data.get('message') ?? '') },
                ]);
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input name="name" placeholder={t('contactPage.form.name') ?? undefined} className={inputClass} />
                <input
                  name="email"
                  type="email"
                  placeholder={t('contactPage.form.email') ?? undefined}
                  className={inputClass}
                />
              </div>
              <input name="subject" placeholder={t('contactPage.form.subject') ?? undefined} className={inputClass} />
              <textarea
                name="message"
                placeholder={t('contactPage.form.message') ?? undefined}
                rows={5}
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gold py-4 text-sm font-semibold uppercase tracking-wider text-olive-dark transition-colors duration-300 hover:bg-olive-dark hover:text-cream"
              >
                {t('contactPage.form.submit')}
              </button>
            </form>
          </div>
        </section>

        <FAQ kicker={t('contactPage.faq.kicker')} title={t('contactPage.faq.title')} items={faqItems} />
      </main>
      <Footer />
    </>
  );
}
