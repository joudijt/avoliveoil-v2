/**
 * "Add to cart" button (FORGE ORDER-R1). Entry bundle: keep it small (O-1).
 *
 * - One orderable size: adds directly. Two sizes: reveals two stacked buttons in place (O-19).
 *   The choice closes on Escape, when focus leaves it and on a press outside it.
 * - Never rendered inside an <a> (O-15). Inert when `inert` or !orderEnabled() (O-13).
 * - The first render never reads the store or `window`, so prerendered, published (CMS) and
 *   live markup are the same.
 * - Strings: t('order.add'), t('order.added'), t('order.chooseSize'), t('order.cartFull').
 * - Test hooks: data-testid="add-to-cart" + data-product, "add-size" + data-sku.
 *
 * Every class below is also listed in src/cms/blocks/classes.ts (PRODUCTS.order): the CMS
 * products block publishes this markup as stored HTML. Change both together.
 */
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { itemsForProduct, type OrderItem } from './catalog';
import { addToCart, openCart, orderEnabled } from './bridge';

export interface AddToCartProps {
  productId: string;
  /** Visual size. 'card' = compact, full width of a product card; 'page' = larger, product pages. */
  variant?: 'card' | 'page';
  /** Dark background behind the button (light text). */
  onDark?: boolean;
  /** Render the markup but ignore clicks (CMS canvas). */
  inert?: boolean;
  className?: string;
}

const BTN =
  'flex w-full items-center justify-center gap-1.5 rounded-full text-center font-body font-semibold transition-colors duration-300 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';
// card: no letter spacing and narrow side padding so "Tambah ke troli" fits a ~100 px pill.
const SIZE = { card: 'min-h-11 px-2 py-2 text-[13px] tracking-normal sm:text-sm', page: 'min-h-12 px-7 py-3 text-base tracking-wide' };
const LIGHT = 'bg-olive-dark text-cream hover:bg-gold hover:text-[#1f2818]';
const DARK = 'bg-gold text-[#1f2818] hover:bg-cream';
const STACK = 'flex flex-col gap-2';
const NOTE = { light: 'pt-1.5 text-center font-body text-xs leading-snug text-brown-ink', dark: 'pt-1.5 text-center font-body text-xs leading-snug text-cream/80' };

/** A second tap of a double-tap lands on the revealed size button: ignore it this long. */
const REVEAL_GUARD_MS = 350;

const OPENED_KEY = 'avo.cartOpened';
let openedOnce = false;

/**
 * Records that the cart drawer has been opened for this browser session, so the next add
 * only updates the badge. Call it from any other control that opens the cart after an add.
 */
export function markCartOpened(): void {
  openedOnce = true;
  try {
    sessionStorage.setItem(OPENED_KEY, '1');
  } catch {
    // Storage blocked: the module flag alone decides.
  }
}

/** True only for the first add of this browser session (the drawer opens once, spec section 4). */
function firstAddOfSession(): boolean {
  if (openedOnce) return false;
  let seen = false;
  try {
    seen = sessionStorage.getItem(OPENED_KEY) !== null;
  } catch {
    // Storage blocked: the module flag alone decides.
  }
  markCartOpened();
  return !seen;
}

export function AddToCart({ productId, variant = 'card', onDark = false, inert = false, className }: AddToCartProps) {
  const { t } = useTranslation();
  // 0 = closed, 1 = size choice open, 2 = closed again (focus returns to the main button).
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [note, setNote] = useState<'added' | 'cartFull' | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const root = useRef<HTMLDivElement>(null);
  const revealedAt = useRef(0);
  /** The last press was inside this component (Safari gives a pressed button no focus, so blur alone cannot tell). */
  const pressedInside = useRef(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Size choice open: a press anywhere else closes it.
  useEffect(() => {
    if (stage !== 1) return;
    const onDown = (e: PointerEvent) => {
      pressedInside.current = !!root.current?.contains(e.target as Node);
      if (!pressedInside.current) setStage(0);
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
  }, [stage]);

  const items = itemsForProduct(productId);
  if (items.length === 0) return null;

  const cls = `${BTN} ${SIZE[variant]} ${onDark ? DARK : LIGHT}`;
  const live = () => !inert && orderEnabled();
  const guarded = () => Date.now() - revealedAt.current < REVEAL_GUARD_MS;

  // The store loads on demand (it is not in the first-render bundle); a failed load shows
  // the load-error notice of OrderRoot and resolves 'invalid'.
  const add = (item: OrderItem) => {
    void addToCart(item.sku, 1).then((result) => {
      if (result === 'invalid') return;
      setNote(result === 'added' ? 'added' : 'cartFull');
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setNote(null), result === 'added' ? 1500 : 4000);
      if (result === 'added' && firstAddOfSession()) openCart();
    });
  };

  const one = items.length === 1 ? items[0] : null;
  const labelKey = note === 'added' ? 'order.added' : 'order.add';

  return (
    <div
      ref={root}
      className={className}
      onKeyDown={(e) => {
        pressedInside.current = false;
        if (e.key === 'Escape' && stage === 1) setStage(2);
      }}
      onBlur={(e) => {
        if (stage !== 1 || guarded() || pressedInside.current) return;
        if (!e.currentTarget.contains(e.relatedTarget)) setStage(0);
      }}
    >
      {stage === 1 ? (
        <div role="group" aria-label={t('order.chooseSize')} className={STACK}>
          {items.map((item, i) => (
            <button
              key={item.sku}
              type="button"
              autoFocus={i === 0}
              data-testid="add-size"
              data-sku={item.sku}
              data-product={productId}
              className={cls}
              onClick={() => {
                if (!live() || guarded()) return;
                setStage(2);
                add(item);
              }}
            >
              {`${t(`productsPage.price.size${item.size}`)} · ${item.display}`}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          autoFocus={stage === 2}
          data-testid="add-to-cart"
          data-product={productId}
          {...(one ? { 'data-sku': one.sku } : {})}
          className={cls}
          onClick={() => {
            if (!live()) return;
            if (one) add(one);
            else {
              revealedAt.current = Date.now();
              pressedInside.current = false;
              setStage(1);
            }
          }}
        >
          <span data-cms={labelKey}>{t(labelKey)}</span>
          {note === 'added' ? <span aria-hidden="true">✓</span> : null}
        </button>
      )}
      {note === 'cartFull' ? (
        <p aria-hidden="true" className={onDark ? NOTE.dark : NOTE.light}>
          {t('order.cartFull')}
        </p>
      ) : null}
      {/* One status line per component, outside the swapped subtree so it survives the size pick. */}
      <span role="status" className="sr-only">
        {note ? t(`order.${note}`) : ''}
      </span>
    </div>
  );
}
