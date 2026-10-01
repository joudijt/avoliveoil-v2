/**
 * Unsaved-changes guard for the plain <BrowserRouter> (the data router's useBlocker would
 * pull ~17 KB of router code into the react-vendor chunk every public visitor downloads).
 *
 * Covers the three ways to leave a screen:
 *   1. closing / reloading the tab → beforeunload,
 *   2. clicking any in-app link (sidebar, <Link>s) → a capture-phase click listener that
 *      cancels the click and asks first,
 *   3. the browser's Back / Forward buttons → a popstate listener that must run BEFORE
 *      React Router's own one. On `window`, listeners run in registration order (capture
 *      does not help there), so it is registered when this module is first imported —
 *      main.tsx imports it before the router mounts. It hides the event from the router,
 *      steps history back to where we were and, if the owner confirms, replays the step.
 * Programmatic navigations use the guarded navigate() the hook returns.
 */
import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmDialog } from './bus';

const ask = (message: string) => confirmDialog({ title: 'Leave without saving?', message, confirmLabel: 'Leave', cancelLabel: 'Stay', danger: true });

/** history index React Router keeps in history.state ({usr, key, idx}) */
const idxOf = (state: unknown): number | null => {
  const idx = (state as { idx?: unknown } | null)?.idx;
  return typeof idx === 'number' ? idx : null;
};

interface ActiveGuard {
  dirty: () => boolean;
  message: string;
  bypass: { current: boolean };
  idx: { current: number | null };
}

let active: ActiveGuard | null = null;
let skipNext = false;

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', (e) => {
    if (skipNext) {
      skipNext = false;
      e.stopImmediatePropagation();
      return;
    }
    const g = active;
    if (!g || g.bypass.current || !g.dirty()) return;
    const to = idxOf(e.state);
    const from = g.idx.current;
    if (to === null || from === null || to === from) return;
    e.stopImmediatePropagation();
    const delta = to - from;
    skipNext = true;
    window.history.go(-delta);
    void ask(g.message).then((ok) => {
      if (!ok) return;
      g.bypass.current = true;
      window.history.go(delta);
    });
  });
}

export function useUnsavedGuard(dirty: boolean | (() => boolean), message = 'You have changes that are not saved yet. Leave anyway?') {
  const get = useRef<() => boolean>(() => false);
  get.current = typeof dirty === 'function' ? dirty : () => dirty;
  const navigate = useNavigate();
  const loc = useLocation();
  const bypass = useRef(false);
  const idx = useRef<number | null>(null);

  useEffect(() => {
    idx.current = idxOf(window.history.state);
    bypass.current = false;
  }, [loc.key]);

  // 3. Back / Forward (the listener itself is registered at module load, see above)
  useEffect(() => {
    const g: ActiveGuard = { dirty: () => get.current(), message, bypass, idx };
    active = g;
    return () => {
      if (active === g) active = null;
    };
  }, [message]);

  // 1. tab close / reload
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (bypass.current || !get.current()) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, []);

  // 2. in-app links
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (bypass.current || !get.current()) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith('/admin')) return;
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      void ask(message).then((ok) => {
        if (!ok) return;
        bypass.current = true;
        navigate(url.pathname.replace(/^\/admin/, '') + url.search + url.hash || '/');
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [message, navigate]);

  /** navigate(), but ask first when there are unsaved changes */
  return useCallback(
    async (to: string, opts?: { replace?: boolean }) => {
      if (get.current() && !(await ask(message))) return false;
      bypass.current = true;
      navigate(to, opts);
      return true;
    },
    [message, navigate]
  );
}
