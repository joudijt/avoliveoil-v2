import { useEffect } from 'react';

/**
 * Sets `data-app-ready="true"` on <body> once mounted. scripts/prerender.mjs
 * waits on this exact attribute before snapshotting a route — every page
 * needs to set it eventually (HomePage does it itself once its Loading
 * content is on screen; pages whose content arrives asynchronously (the blog
 * and article pages) set the attribute themselves once it has, so this hook is
 * never called with an empty page. Lighter pages call this
 * on mount instead).
 */
export function useMarkAppReady() {
  useEffect(() => {
    document.body.setAttribute('data-app-ready', 'true');
  }, []);
}
