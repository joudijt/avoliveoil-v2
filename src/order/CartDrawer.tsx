/**
 * Cart drawer (FORGE ORDER-R1). This module is the entry of the ONE lazy chunk: its default
 * export renders the drawer and the checkout, each mounted only while it is open.
 * Customer text reaches the page only as React text nodes.
 */
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { findItem } from './catalog';
import { ORDER_CONFIG } from './config';
import { computeTotals, formatRM, type Lang } from './core';
import { Checkout, OrderBanner } from './Checkout';
import { sizeLabel } from './messageStrings';
import { BAND, BTN_GOLD, BTN_LINE, FOCUS_RING, ICON_BTN, LINK, SMALL, useModalDialog } from './scrollLock';
import { clearDropped, droppedCount, orderActions, useCart, useOrderUi } from './store';
import { UI_STRINGS, fill } from './uiStrings';

const STEP_BTN = `grid h-12 w-12 cursor-pointer place-items-center rounded-full text-olive-dark transition-colors hover:bg-olive-dark/10 disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent ${FOCUS_RING}`;
const ROW = 'flex items-baseline justify-between gap-4';

function CartDrawer() {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith('ms') ? 'ms' : 'en';
  const s = UI_STRINGS[lang].cart;
  const cart = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = orderActions.closeCart;
  const { fallback } = useModalDialog(ref, close);

  // O-9: lines dropped on parse are reported once, on the first drawer that opens after it.
  const [dropped] = useState(droppedCount);
  useEffect(() => clearDropped, []);

  const lines = cart.lines.flatMap((l) => {
    const item = findItem(l.sku);
    return item ? [{ ...l, item }] : [];
  });
  const totals = computeTotals(
    lines.map((l) => ({ qty: l.qty, unitSen: l.item.priceSen })),
    ORDER_CONFIG.deliverySen
  );

  // A click on the backdrop closes the drawer (press and release both outside the panel).
  const downOutside = useRef(false);
  const outside = (e: MouseEvent | PointerEvent): boolean => {
    const d = ref.current;
    if (!d || e.target !== d || fallback) return false;
    const r = d.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  const remove = (sku: string): void => {
    orderActions.remove(sku);
    closeRef.current?.focus({ preventScroll: true }); // the line and its buttons are gone
  };

  return createPortal(
    <dialog
      ref={ref}
      data-testid="cart-drawer"
      data-order-dialog=""
      data-lenis-prevent=""
      aria-labelledby="avo-cart-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClose={() => {
        // A stale close event (StrictMode, a quick reopen) must not shut a dialog that is open again.
        if (!ref.current?.open) close();
      }}
      onPointerDown={(e) => {
        downOutside.current = outside(e);
      }}
      onClick={(e) => {
        if (downOutside.current && outside(e)) close();
        downOutside.current = false;
      }}
      className={`fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-hidden bg-bg p-0 text-base text-olive-dark shadow-2xl backdrop:bg-olive-dark/60 open:flex sm:w-[420px] ${
        fallback ? 'z-[70]' : ''
      }`}
    >
      <header className={BAND}>
        <h2 id="avo-cart-title" className="text-xl font-semibold text-cream">
          {s.title}
        </h2>
        <button ref={closeRef} type="button" data-autofocus="" aria-label={s.close} onClick={close} className={ICON_BTN}>
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
        <OrderBanner />

        {dropped > 0 && (
          <p role="status" className="mb-4 rounded-xl border border-gold-ink/50 bg-cream px-3.5 py-3 text-[15px] font-medium">
            {dropped === 1 ? s.droppedOne : fill(s.droppedMany, { n: dropped })}
          </p>
        )}

        {lines.length === 0 ? (
          <div className="mt-4 grid gap-5 rounded-2xl border border-olive-dark/10 bg-cream px-5 py-8 text-center">
            <p>{s.empty}</p>
            <Link to={`/${lang}/products`} onClick={close} className={BTN_LINE}>
              {s.browse}
            </Link>
          </div>
        ) : (
          <ul className="grid gap-3">
            {lines.map(({ sku, qty, item }) => (
              <li
                key={sku}
                data-testid="cart-line"
                data-sku={sku}
                className="grid gap-2 rounded-2xl border border-olive-dark/10 bg-cream p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug">{t(`${item.i18n}.name`)}</p>
                    <p className={SMALL}>
                      {sizeLabel(item.size)} · {formatRM(item.priceSen)} {s.each}
                    </p>
                  </div>
                  <p data-testid="line-total" className="shrink-0 font-semibold tabular-nums">
                    {formatRM(item.priceSen * qty)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <div role="group" aria-label={s.qty} className="inline-flex items-center rounded-full border border-olive-dark/30">
                    <button
                      type="button"
                      data-testid="line-minus"
                      aria-label={s.minus}
                      disabled={qty <= 1}
                      onClick={() => orderActions.setQty(sku, qty - 1)}
                      className={STEP_BTN}
                    >
                      <FiMinus className="h-[18px] w-[18px]" aria-hidden="true" />
                    </button>
                    <output data-testid="line-qty" aria-live="polite" className="min-w-9 text-center text-lg font-semibold tabular-nums">
                      {qty}
                    </output>
                    <button
                      type="button"
                      data-testid="line-plus"
                      aria-label={s.plus}
                      disabled={qty >= ORDER_CONFIG.maxQty}
                      onClick={() => orderActions.setQty(sku, qty + 1)}
                      className={STEP_BTN}
                    >
                      <FiPlus className="h-[18px] w-[18px]" aria-hidden="true" />
                    </button>
                  </div>
                  <button type="button" data-testid="line-remove" onClick={() => remove(sku)} className={LINK}>
                    {s.remove}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {lines.length > 0 && (
        <footer className="grid shrink-0 gap-3 border-t border-olive-dark/15 bg-bg px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:px-5">
          <dl className="grid gap-1">
            <div className={ROW}>
              <dt className="text-olive-dark/75">{s.subtotal}</dt>
              <dd data-testid="cart-subtotal" className="font-semibold tabular-nums">
                {formatRM(totals.subtotalSen)}
              </dd>
            </div>
            <div className={ROW}>
              <dt className="text-olive-dark/75">{s.delivery}</dt>
              <dd className="text-end font-semibold">
                {totals.deliverySen === null ? s.deliveryTbc : formatRM(totals.deliverySen)}
              </dd>
            </div>
            <div className={`${ROW} mt-1 border-t border-olive-dark/15 pt-2 text-lg`}>
              <dt className="font-semibold">{s.total}</dt>
              <dd data-testid="cart-total" className="font-bold tabular-nums">
                {formatRM(totals.totalSen)}
              </dd>
            </div>
          </dl>
          <button type="button" data-testid="cart-checkout" onClick={orderActions.openCheckout} className={BTN_GOLD}>
            {s.checkout}
          </button>
        </footer>
      )}
    </dialog>,
    document.body
  );
}

/** Default export = what OrderRoot lazy-loads. */
export default function OrderDialogs() {
  const ui = useOrderUi();
  return (
    <>
      {ui.cartOpen && <CartDrawer />}
      {ui.checkoutOpen && <Checkout />}
    </>
  );
}
