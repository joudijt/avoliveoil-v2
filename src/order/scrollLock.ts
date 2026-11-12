/**
 * Shared helpers of the two order dialogs (FORGE ORDER-R1, O-17). Lazy chunk only.
 *
 * Scroll lock: counted, and done with a class on <html>. The site's Modal.tsx and the navbar
 * both write `body.style.overflow`, so this never touches the body and cannot fight them.
 */
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

/* ---------- classes shared by the drawer and the checkout (site palette) ---------- */

const FOCUS = 'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-gold-ink';
const BTN = `flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full px-5 py-3 text-center text-base font-semibold leading-tight transition-colors duration-200 ${FOCUS}`;
export const BTN_GOLD = `${BTN} bg-gold text-olive-dark hover:bg-olive-dark hover:text-cream`;
export const BTN_WA = `${BTN} bg-[#0f7a45] text-white hover:bg-[#0b6337]`;
export const BTN_LINE = `${BTN} min-h-[48px] border border-olive-dark/40 text-olive-dark hover:bg-olive-dark/5`;
export const LINK = `inline-flex min-h-[44px] cursor-pointer items-center text-start text-[15px] font-semibold text-olive underline underline-offset-4 hover:text-olive-dark ${FOCUS}`;
export const ICON_BTN = `grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full text-cream transition-colors hover:bg-cream/15 focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-gold-light`;
export const BAND = 'flex shrink-0 items-center justify-between gap-3 bg-olive-dark py-1.5 ps-5 pe-1.5 text-cream';
export const CARD = 'rounded-2xl border border-olive-dark/10 bg-cream p-4';
export const LABEL = 'text-[13px] font-semibold uppercase tracking-[0.08em] text-gold-ink';
export const SMALL = 'text-sm text-olive-dark/75';
export const FOCUS_RING = FOCUS;

// 'overflow-hidden' is the Tailwind utility (the literal here makes sure it is generated);
// 'order-lock' is a plain marker for tests and for any page rule that wants it.
const LOCK_CLASSES = ['order-lock', 'overflow-hidden'];
let lockers = 0;

/** Locks page scroll until the returned function is called. Safe to call from several dialogs. */
export function lockScroll(): () => void {
  lockers += 1;
  if (lockers === 1) document.documentElement.classList.add(...LOCK_CLASSES);
  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockers -= 1;
    if (lockers === 0) document.documentElement.classList.remove(...LOCK_CLASSES);
  };
}

/** The element that had focus before the first order dialog opened; focus goes back to it. */
let returnTo: HTMLElement | null = null;

// Fallback sheets (no showModal): the page under them is made inert, counted like the lock.
// The dialogs are portalled to <body>, so they sit outside #root and stay usable.
const SCRIM = 'fixed inset-0 z-[69] bg-olive-dark/60';
let inertUsers = 0;

function fallbackBackdrop(onClick: () => void): () => void {
  const root = document.getElementById('root');
  inertUsers += 1;
  if (inertUsers === 1) root?.setAttribute('inert', '');
  const scrim = document.createElement('div');
  scrim.className = SCRIM;
  scrim.setAttribute('data-order-scrim', '');
  scrim.addEventListener('click', onClick);
  document.body.appendChild(scrim);
  return () => {
    scrim.remove();
    inertUsers -= 1;
    if (inertUsers === 0) root?.removeAttribute('inert');
  };
}

/**
 * Opens the <dialog> as a modal for as long as the component is mounted.
 * Returns `fallback: true` when showModal() is missing or failed: the dialog is then shown as a
 * fixed sheet with `open` set by hand over a scrim, the page under it is inert, and the caller
 * adds its z-index classes. The dialog must be portalled to <body> (it must not sit in #root).
 * `onEscape` is called for Escape in fallback mode (a native modal fires `cancel` by itself).
 */
export function useModalDialog(ref: RefObject<HTMLDialogElement | null>, onEscape?: () => void): { fallback: boolean } {
  const [fallback, setFallback] = useState(false);
  const escape = useRef(onEscape);
  useEffect(() => {
    escape.current = onEscape;
  });

  // Layout effect: the dialog is opened before the first paint.
  useLayoutEffect(() => {
    const d = ref.current;
    if (!d) return;
    const active = document.activeElement;
    if (active instanceof HTMLElement && active !== document.body && !active.closest('[data-order-dialog]')) {
      returnTo = active;
    }
    let modal = false;
    try {
      if (typeof d.showModal === 'function') {
        if (!d.open) d.showModal();
        modal = true;
      }
    } catch {
      modal = false;
    }
    let removeBackdrop: (() => void) | null = null;
    if (!modal) {
      d.setAttribute('open', '');
      setFallback(true);
      removeBackdrop = fallbackBackdrop(() => escape.current?.());
      // showModal() moves the focus by itself; here it has to be done by hand.
      try {
        d.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true });
      } catch {
        /* nothing to do */
      }
    }
    const unlock = lockScroll();
    const onKey = (e: KeyboardEvent): void => {
      if (!modal && e.key === 'Escape') escape.current?.();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      unlock();
      removeBackdrop?.();
      if (!modal) d.removeAttribute('open');
      try {
        if (modal && d.open) d.close();
      } catch {
        /* nothing to do */
      }
      // After the swap cart -> checkout the other dialog is already open: leave the focus there.
      window.setTimeout(() => {
        if (document.querySelector('[data-order-dialog]')) return;
        const el = returnTo;
        returnTo = null;
        try {
          if (el && el.isConnected) el.focus({ preventScroll: true });
        } catch {
          /* nothing to do */
        }
      }, 0);
    };
  }, [ref]);

  return { fallback };
}

/** Copies text. The fallback textarea sits INSIDE the open dialog: everything outside a modal is inert. */
export async function copyText(text: string, host: HTMLElement | null): Promise<boolean> {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* try the old way */
  }
  if (!host) return false;
  const active = document.activeElement as HTMLElement | null;
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.setAttribute('aria-hidden', 'true');
  ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;font-size:16px;';
  let ok = false;
  try {
    host.appendChild(ta);
    ta.focus({ preventScroll: true });
    ta.select();
    ta.setSelectionRange(0, text.length);
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  ta.remove();
  try {
    active?.focus({ preventScroll: true });
  } catch {
    /* nothing to do */
  }
  return ok;
}
