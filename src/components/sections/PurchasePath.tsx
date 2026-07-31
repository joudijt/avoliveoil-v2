import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ui/Modal';
import { SHOPEE_URL, TIKTOK_SHOP_URL, MADINAH_URL } from '../../config/site';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const inputClass =
  'w-full rounded-lg border border-olive-dark/15 bg-white/70 px-4 py-3 text-sm text-olive-dark placeholder:text-brown/40 focus:border-gold focus:outline-none';

// Partner/wholesale modal is live again as of 2026-07-31. It was temporarily
// disabled behind this flag while the card stayed visible; the modal and its
// WhatsApp hand-off were kept intact underneath, so re-enabling is just this.
const SHOW_PARTNER_MODAL = true;

export function PurchasePath() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<'individual' | 'partner' | null>(null);

  return (
    <section className="relative w-full overflow-hidden bg-bg px-6 pb-28 pt-8 md:px-16 md:pb-36 md:pt-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('purchasePath.kicker')}</p>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl text-olive-dark md:text-5xl">
          {t('purchasePath.title')}
        </h2>

        <div className="relative mt-16 grid grid-cols-1 gap-6 text-start md:grid-cols-2">
          <div className="rounded-2xl bg-[#D6D2C4] p-10 shadow-[0_25px_50px_rgba(46,58,36,0.18)]">
            <h3 className="font-display text-2xl text-olive-dark">{t('purchasePath.individualCard.title')}</h3>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-brown/70 md:text-base">
              {t('purchasePath.individualCard.desc')}
            </p>
            <button
              onClick={() => setActiveModal('individual')}
              className="mt-8 rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-olive-dark hover:text-cream"
            >
              {t('purchasePath.individualCard.button')}
            </button>
          </div>

          <div className="rounded-2xl bg-[#D6D2C4] p-10 shadow-[0_25px_50px_rgba(46,58,36,0.18)]">
            <h3 className="font-display text-2xl text-olive-dark">{t('purchasePath.partnerCard.title')}</h3>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-brown/70 md:text-base">
              {t('purchasePath.partnerCard.desc')}
            </p>
            <button
              onClick={() => SHOW_PARTNER_MODAL && setActiveModal('partner')}
              className="mt-8 rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-olive-dark hover:text-cream"
            >
              {t('purchasePath.partnerCard.button')}
            </button>
          </div>
        </div>
      </div>

      <Modal open={activeModal === 'individual'} onClose={() => setActiveModal(null)}>
        <div className="text-center">
          <h3 className="font-display text-3xl text-olive-dark md:text-4xl">{t('purchasePath.individualModal.title')}</h3>
          <p className="mt-3 font-body text-brown/70">{t('purchasePath.individualModal.sub')}</p>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={MADINAH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gold py-4 text-center text-sm font-semibold uppercase tracking-wider text-olive-dark transition-colors duration-300 hover:bg-olive-dark hover:text-cream"
            >
              {t('purchasePath.individualModal.madinah')}
            </a>
            <a
              href={SHOPEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-olive-dark/30 py-4 text-center text-sm font-semibold uppercase tracking-wider text-olive-dark transition-colors duration-300 hover:border-gold hover:bg-gold"
            >
              {t('purchasePath.individualModal.shopee')}
            </a>
            <a
              href={TIKTOK_SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-olive-dark/30 py-4 text-center text-sm font-semibold uppercase tracking-wider text-olive-dark transition-colors duration-300 hover:border-gold hover:bg-gold"
            >
              {t('purchasePath.individualModal.tiktok')}
            </a>
          </div>
        </div>
      </Modal>

      <Modal open={activeModal === 'partner'} onClose={() => setActiveModal(null)}>
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
              setActiveModal(null);
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
    </section>
  );
}
