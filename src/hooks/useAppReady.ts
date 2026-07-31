import { useEffect, useState } from 'react';

/**
 * Tracks whether `document.body[data-app-ready]` has been set (see
 * useMarkAppReady / HomePage's loading gate). Used by chrome that lives
 * outside any single page — like the floating WhatsApp button in App.tsx —
 * to stay hidden while HomePage's ~5s loading animation is still playing.
 */
export function useAppReady() {
  const [ready, setReady] = useState(() => document.body.hasAttribute('data-app-ready'));

  useEffect(() => {
    if (ready) return;
    const observer = new MutationObserver(() => {
      if (document.body.hasAttribute('data-app-ready')) {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-app-ready'] });
    return () => observer.disconnect();
  }, [ready]);

  return ready;
}
