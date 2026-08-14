import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStore, FaTiktok } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Modal } from '../components/ui/Modal';
import { FAQ } from '../components/sections/FAQ';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { SHOPEE_URL, TIKTOK_SHOP_URL, MADINAH_NAME } from '../config/site';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FaqItem {
  q: string;
  a: string;
}

const inputClass =
  'w-full rounded-lg border border-olive-dark/15 bg-white/70 px-4 py-3 text-sm text-olive-dark placeholder:text-brown/40 focus:border-gold focus:outline-none';

const STORES = [
  {
    key: 'madinah',
    href: 'https://madinah.com.my/en/',
    Icon: FaStore,
    iconBg: 'bg-olive-dark',
    featured: true,
  },
  {
    key: 'tiktok',
    href: TIKTOK_SHOP_URL,
    Icon: FaTiktok,
    iconBg: 'bg-black',
    featured: false,
  },
  {
    key: 'shopee',
    href: SHOPEE_URL,
    Icon: FiShoppingBag,
    iconBg: 'bg-[#EE4D2D]',
    featured: false,
  },
] as const;

export function ShopPage() {
  const { t } = useTranslation();
  useMarkAppReady();
  const [partnerOpen, setPartnerOpen] = useState(false);

  /**
   * i18next does not interpolate inside `returnObjects`, so the seller name is
   * substituted here — it still comes from config, never from translated copy.
   */
  const faqItems = (t('shopPage.faq.items', { returnObjects: true }) as FaqItem[]).map((item) => ({
    q: item.q.replace(/\{\{store\}\}/g, MADINAH_NAME),
    a: item.a.replace(/\{\{store\}\}/g, MADINAH_NAME),
  }));

  return (
    <>
      <SEO page="shop" breadcrumbs={[{ name: t('breadcrumb.shop'), path: 'shop' }]} faqs={faqItems} />
      <Navbar />
      <main className="bg-bg">
        <Breadcrumbs items={[{ name: t('breadcrumb.shop'), path: 'shop' }]} />

        <section className="px-6 pb-20 pt-10 text-center md:px-16 md:pb-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('shopPage.kicker')}</p>
            <h1 className="mx-auto mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl lg:text-6xl">
              {t('shopPage.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-brown/75 md:text-lg">
              {t('shopPage.subtitle', { store: MADINAH_NAME })}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STORES.map(({ key, href, Icon, iconBg, featured }) => (
              <div
                key={key}
                className={`flex flex-col items-center rounded-2xl border p-10 text-center shadow-[0_10px_30px_rgba(46,58,36,0.06)] ${
                  featured ? 'border-gold/40 bg-cream lg:col-span-1' : 'border-olive-dark/10 bg-cream'
                }`}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-full text-cream ${iconBg}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-xl text-olive-dark">{t(`shopPage.cards.${key}.title`)}</h2>
                <p className="mt-3 font-body text-sm font-light leading-relaxed text-brown/70">
                  {t(`shopPage.cards.${key}.desc`)}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-olive-dark hover:text-cream"
                >
                  {t(`shopPage.cards.${key}.button`)}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#E8E2D7] px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-3xl rounded-2xl bg-[#D6D2C4] p-10 text-center shadow-[0_25px_50px_rgba(46,58,36,0.18)] sm:p-14">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('purchasePath.kicker')}</p>
            <h2 className="mx-auto mt-3 text-2xl text-olive-dark md:text-3xl">
              {t('purchasePath.partnerCard.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm font-light leading-relaxed text-brown/70 md:text-base">
              {t('purchasePath.partnerCard.desc')}
            </p>
            <button
              onClick={() => setPartnerOpen(true)}
              className="mt-8 rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-olive-dark hover:text-cream"
            >
              {t('purchasePath.partnerCard.button')}
            </button>
          </div>
        </section>

        <FAQ kicker={t('shopPage.faq.kicker')} title={t('shopPage.faq.title')} items={faqItems} />
      </main>

      <Modal open={partnerOpen} onClose={() => setPartnerOpen(false)}>
        <div className="text-center">
          <h3 className="font-display text-3xl leading-tight text-olive-dark md:text-4xl">
            {t('purchasePath.partnerModal.title')}
          </h3>
          <p className="mt-3 font-body text-brown/70">{t('purchasePath.partnerModal.sub')}</p>

          <form
            className="mt-8 space-y-3 text-start"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const url = buildWhatsAppUrl(t('whatsapp.wholesaleIntro'), [
                { label: t('whatsapp.fields.name'), value: String(data.get('name') ?? '') },
                { label: t('whatsapp.fields.businessName'), value: String(data.get('businessName') ?? '') },
                { label: t('whatsapp.fields.phone'), value: String(data.get('phone') ?? '') },
                { label: t('whatsapp.fields.location'), value: String(data.get('location') ?? '') },
                { label: t('whatsapp.fields.volume'), value: String(data.get('volume') ?? '') },
              ]);
              window.open(url, '_blank', 'noopener,noreferrer');
              setPartnerOpen(false);
            }}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input name="name" placeholder={t('purchasePath.partnerModal.name') ?? undefined} className={inputClass} />
              <input name="businessName" placeholder={t('purchasePath.partnerModal.businessName') ?? undefined} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input name="phone" placeholder={t('purchasePath.partnerModal.phone') ?? undefined} className={inputClass} />
              <input name="location" placeholder={t('purchasePath.partnerModal.location') ?? undefined} className={inputClass} />
            </div>
            <input name="volume" placeholder={t('purchasePath.partnerModal.volume') ?? undefined} className={inputClass} />
            <button
              type="submit"
              className="w-full rounded-lg bg-gold py-4 text-sm font-semibold uppercase tracking-wider text-olive-dark transition-colors duration-300 hover:bg-olive-dark hover:text-cream"
            >
              {t('purchasePath.partnerModal.submit')}
            </button>
          </form>
        </div>
      </Modal>

      <Footer />
    </>
  );
}
