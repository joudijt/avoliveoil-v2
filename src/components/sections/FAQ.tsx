import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';

interface FaqItem {
  q: string;
  a: string;
}

export function FAQ() {
  const { t } = useTranslation();
  const faqs = t('faq.items', { returnObjects: true }) as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-bg px-6 py-28 md:px-16 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('faq.kicker')}</p>
          <h2 className="mx-auto mt-3 text-4xl text-olive-dark md:text-5xl">{t('faq.title')}</h2>
        </div>

        <div className="mt-16 divide-y divide-olive-dark/10 border-t border-b border-olive-dark/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-start"
                >
                  <span className="text-lg text-olive-dark md:text-xl">{item.q}</span>
                  <FiPlus
                    className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-[400ms] ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 max-w-xl font-light leading-relaxed text-brown/75">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
