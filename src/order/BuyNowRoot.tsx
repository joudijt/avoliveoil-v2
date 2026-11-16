/**
 * Mounted once in App.tsx (FORGE BUY-NOW; was the ORDER-R1 OrderRoot). Renders the lazy Buy-now
 * sheet while a product is open, and nothing when !orderEnabled() (O-13). Never opens the sheet by
 * itself on page load. Deletes the old cart / order keys once (B5).
 *
 * A chunk that fails to load (offline, or a tab held open across a deploy) must not blank the
 * site: the sheet stays closed, a small notice is shown, and the next tap tries again.
 */
import { useEffect, useState, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { closeBuyNow, deleteOldOrderKeys, isBuyNowOpen, loadSheet, orderEnabled, setLoadFailed, useBuyNow, useLoadFailed, type BuyNowTarget } from './bridge';

// The only strings of the buying flow that ship in the entry bundle (the rest is in the chunk).
const TEXT = {
  en: { loading: 'Loading…', failed: 'Could not open the order form. Please check your connection and try again.' },
  ms: { loading: 'Memuatkan…', failed: 'Borang pesanan tidak dapat dibuka. Sila semak sambungan anda dan cuba lagi.' },
};

const PILL =
  'fixed bottom-6 left-1/2 z-[70] max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-olive-dark px-5 py-3 text-center text-[15px] font-semibold text-cream shadow-lg';

export function BuyNowRoot() {
  const target = useBuyNow();
  const failed = useLoadFailed();
  const { i18n } = useTranslation();
  const text = i18n.language?.startsWith('ms') ? TEXT.ms : TEXT.en;
  const [Sheet, setSheet] = useState<{ C: ComponentType<{ target: BuyNowTarget }> } | null>(null);

  useEffect(() => {
    if (!orderEnabled()) return;
    deleteOldOrderKeys();
    // M6: a reload (or a return without bfcache) on the sheet's history entry must not reopen it.
    const strip = (): void => {
      const st = window.history.state as Record<string, unknown> | null;
      if (st && st.buyNow && !isBuyNowOpen()) {
        const { buyNow: _flag, ...rest } = st;
        window.history.replaceState(rest, '');
      }
    };
    strip();
    // Review 4: Forward onto the sheet's (closed) entry must not leave a flagged entry with no sheet.
    window.addEventListener('popstate', strip);
    return () => window.removeEventListener('popstate', strip);
  }, []);

  useEffect(() => {
    if (!target || Sheet) return;
    loadSheet().then(
      (m) => setSheet({ C: m.default }),
      () => {
        closeBuyNow();
        setLoadFailed(true);
      }
    );
  }, [target, Sheet]);

  // The notice leaves by itself; a new open removes it at once (openBuyNow).
  useEffect(() => {
    if (!failed) return;
    const timer = window.setTimeout(() => setLoadFailed(false), 8000);
    return () => window.clearTimeout(timer);
  }, [failed]);

  if (!orderEnabled()) return null;
  return (
    <>
      {failed ? (
        <p role="alert" data-testid="order-load-error" className={PILL}>
          {text.failed}
        </p>
      ) : null}
      {target && Sheet ? (
        <Sheet.C key={target.openId} target={target} />
      ) : target && !failed ? (
        <p role="status" className={PILL}>
          {text.loading}
        </p>
      ) : null}
    </>
  );
}
