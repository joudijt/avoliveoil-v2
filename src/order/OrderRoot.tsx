/**
 * Mounted once in App.tsx (FORGE ORDER-R1). Fetches the store right after mount (so the header
 * badge fills in) and the ONE chunk that holds the drawer and the checkout the first time the
 * cart or checkout opens. Renders null when !orderEnabled() (O-13). Never opens a dialog by
 * itself on page load (O-7).
 *
 * A chunk that fails to load (offline, or a tab held open across a deploy) must not blank the
 * site: both dialogs are closed, a small notice is shown, and the next open tries again.
 */
import { useEffect, useState, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStore, orderEnabled, setLoadFailed, useLoadFailed, useOrderUi } from './bridge';

// The only strings of the ordering flow that ship in the entry bundle (the rest is in the chunk).
const TEXT = {
  en: { loading: 'Loading…', failed: 'Could not load the cart. Please check your connection and try again.' },
  ms: { loading: 'Memuatkan…', failed: 'Troli tidak dapat dimuatkan. Sila semak sambungan anda dan cuba lagi.' },
};

const PILL =
  'fixed bottom-6 left-1/2 z-[70] max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-olive-dark px-5 py-3 text-center text-[15px] font-semibold text-cream shadow-lg';

export function OrderRoot() {
  const ui = useOrderUi();
  const failed = useLoadFailed();
  const { i18n } = useTranslation();
  const text = i18n.language?.startsWith('ms') ? TEXT.ms : TEXT.en;
  const open = ui.cartOpen || ui.checkoutOpen;
  // Once loaded the dialogs stay mounted (they render nothing while closed): a later open is instant.
  const [dialogs, setDialogs] = useState<{ Dialogs: ComponentType } | null>(null);

  // The store is not in the first-render bundle. A failure here is silent; a click reports it.
  useEffect(() => {
    if (orderEnabled()) loadStore().catch(() => {});
  }, []);

  // First open (and every open after a failed load): fetch the dialog chunk.
  useEffect(() => {
    if (!open || dialogs) return;
    setLoadFailed(false);
    import('./CartDrawer').then(
      (m) => setDialogs({ Dialogs: m.default }),
      () => {
        // `open` is true, so the store is loaded: this resolves at once.
        void loadStore().then((store) => {
          store.orderActions.closeCart();
          store.orderActions.closeCheckout();
          setLoadFailed(true);
        });
      }
    );
  }, [open, dialogs]);

  // The notice leaves by itself; a new open removes it at once (above).
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
      {dialogs ? (
        <dialogs.Dialogs />
      ) : open && !failed ? (
        <p role="status" className={PILL}>
          {text.loading}
        </p>
      ) : null}
    </>
  );
}
