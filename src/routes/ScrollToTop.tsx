import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scrollToTopImmediate } from '../hooks/useLenis';

/**
 * React Router keeps window.scrollY across client-side navigations, so
 * clicking a top-nav link while scrolled halfway down renders the next page
 * already scrolled halfway down. This resets it on every push navigation.
 *
 * Two deliberate exemptions:
 *  - a URL carrying a hash is an in-page anchor (Hero's #shop / #journey
 *    CTAs go through scrollToHash), so leave the scroll alone;
 *  - POP means back/forward, where the browser's own scroll restoration is
 *    the behaviour users expect.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) return;
    if (navigationType === 'POP') return;
    window.scrollTo(0, 0);
    scrollToTopImmediate();
  }, [pathname, hash, navigationType]);

  return null;
}
