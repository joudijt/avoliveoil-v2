import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStore, FaTiktok } from 'react-icons/fa';
import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Modal } from '../components/ui/Modal';
import { FAQ } from '../components/sections/FAQ';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { SHOPEE_URL, TIKTOK_SHOP_URL, MADINAH_NAME } from '../config/site';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { cmsAttr, cmsText } from '../cms/editable';
import { Picture } from '../components/ui/Picture';
import { PRODUCTS } from '../data/products';
import { AddToCart } from '../order/AddToCart';

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
        <Breadcrumbs items={[{ name: t('breadcrumb.shop'), path: 'shop', cmsKey: 'breadcrumb.shop' }]} />

        <section className="px-6 pb-20 pt-10 text-center md:px-16 md:pb-28">
          <div className="mx-auto max-w-3xl">
            <p {...cmsText('shopPage.kicker')} className="text-xs uppercase tracking-[0.35em] text-gold-ink">{t('shopPage.kicker')}</p>
            <h1 {...cmsText('shopPage.title')} className="mx-auto mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl lg:text-6xl">
              {t('shopPage.title')}
            </h1>
            <p {...cmsText('shopPage.subtitle')} className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-brown-ink md:text-lg">
              {t('shopPage.subtitle', { store: MADINAH_NAME })}
            </p>
          </div>

          {/* FORGE ORDER-R1: ordering on this site comes first (owner answer 5a). The card
              holds the order list itself: all 8 products, each with its own button.
              No link wraps a product here, so no button sits inside an anchor (O-15). */}
          <div
            id="order-list"
            data-testid="order-list"
            className="mx-auto mt-16 max-w-6xl scroll-mt-28 rounded-2xl border border-gold/40 bg-cream p-4 text-center shadow-[0_10px_30px_rgba(46,58,36,0.06)] sm:p-10"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-olive-dark">
              <FiShoppingCart className="h-7 w-7" />
            </div>
            <h2 {...cmsText('order.orderHere')} className="mt-6 text-2xl text-olive-dark md:text-3xl">
              {t('order.orderHere')}
            </h2>
            <p {...cmsText('order.orderHereSub')} className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-brown-ink md:text-base">
              {t('order.orderHereSub')}
            </p>

            <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
              {PRODUCTS.map((product) => {
                const nameKey = product.kind === 'classic' ? `${product.i18n}.name` : `${product.i18n}.shortName`;
                return (
                  <li key={product.id} className="flex min-w-0 flex-col items-center text-center">
                    <span className="block aspect-square w-full overflow-hidden rounded-2xl border border-olive-dark/10 bg-white">
                      <Picture
                        name={product.image}
                        alt={t(`${product.i18n}.imageAlt`)}
                        cmsAltKey={`${product.i18n}.imageAlt`}
                        className="h-full w-full object-contain"
                        sizes="(min-width:1024px) 240px, 42vw"
                      />
                    </span>
                    <h3 {...cmsText(nameKey)} className="mt-3 min-w-0 max-w-full break-words font-display text-[15px] leading-snug text-olive-dark sm:text-lg">
                      {t(nameKey)}
                    </h3>
                    <p className="mt-1 font-body text-sm text-brown-ink">
                      {product.sizes.map((s) => t(`productsPage.price.size${s}`)).join(' · ')}
                    </p>
                    {/* Names wrap in full (never clamped); mt-auto keeps the buttons of a row level. */}
                    <AddToCart productId={product.id} className="mt-auto w-full pt-3" />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <h2 {...cmsText(`shopPage.cards.${key}.title`)} className="mt-6 text-xl text-olive-dark">{t(`shopPage.cards.${key}.title`)}</h2>
                <p {...cmsText(`shopPage.cards.${key}.desc`)} className="mt-3 font-body text-sm leading-relaxed text-brown-ink">
                  {t(`shopPage.cards.${key}.desc`)}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...cmsText(`shopPage.cards.${key}.button`)}
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
            <p {...cmsText('purchasePath.kicker')} className="text-xs uppercase tracking-[0.35em] text-gold-ink-band">{t('purchasePath.kicker')}</p>
            <h2 {...cmsText('purchasePath.partnerCard.title')} className="mx-auto mt-3 text-2xl text-olive-dark md:text-3xl">
              {t('purchasePath.partnerCard.title')}
            </h2>
            <p {...cmsText('purchasePath.partnerCard.desc')} className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-brown-ink md:text-base">
              {t('purchasePath.partnerCard.desc')}
            </p>
            <button
              onClick={() => setPartnerOpen(true)}
              {...cmsText('purchasePath.partnerCard.button')}
              className="mt-8 rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-olive-dark hover:text-cream"
            >
              {t('purchasePath.partnerCard.button')}
            </button>
          </div>
        </section>

        <FAQ kicker={t('shopPage.faq.kicker')} title={t('shopPage.faq.title')} items={faqItems} keyPrefix="shopPage.faq" />
      </main>

      <Modal open={partnerOpen} onClose={() => setPartnerOpen(false)}>
        <div className="text-center">
          <h3 {...cmsText('purchasePath.partnerModal.title')} className="font-display text-3xl leading-tight text-olive-dark md:text-4xl">
            {t('purchasePath.partnerModal.title')}
          </h3>
          <p {...cmsText('purchasePath.partnerModal.sub')} className="mt-3 font-body text-brown-ink">{t('purchasePath.partnerModal.sub')}</p>

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
              <input name="name" placeholder={t('purchasePath.partnerModal.name') ?? undefined} {...cmsAttr({ placeholder: 'purchasePath.partnerModal.name' })} className={inputClass} />
              <input name="businessName" placeholder={t('purchasePath.partnerModal.businessName') ?? undefined} {...cmsAttr({ placeholder: 'purchasePath.partnerModal.businessName' })} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input name="phone" placeholder={t('purchasePath.partnerModal.phone') ?? undefined} {...cmsAttr({ placeholder: 'purchasePath.partnerModal.phone' })} className={inputClass} />
              <input name="location" placeholder={t('purchasePath.partnerModal.location') ?? undefined} {...cmsAttr({ placeholder: 'purchasePath.partnerModal.location' })} className={inputClass} />
            </div>
            <input name="volume" placeholder={t('purchasePath.partnerModal.volume') ?? undefined} {...cmsAttr({ placeholder: 'purchasePath.partnerModal.volume' })} className={inputClass} />
            <button
              type="submit"
              {...cmsText('purchasePath.partnerModal.submit')}
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
