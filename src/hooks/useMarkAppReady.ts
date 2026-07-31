import { useEffect } from 'react';

/**
 * Sets `data-app-ready="true"` on <body> once mounted. scripts/prerender.mjs
 * waits on this exact attribute before snapshotting a route — every page
 * needs to set it eventually (HomePage does it itself once its Loading
 * animation finishes; lighter pages that skip a loading screen call this
 * on mount instead).
 */
export function useMarkAppReady() {
  useEffect(() => {
    document.body.setAttribute('data-app-ready', 'true');
  }, []);
}
