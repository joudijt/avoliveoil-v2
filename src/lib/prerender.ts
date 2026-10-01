import { isCmsStatic } from '../cms/boot';

/**
 * True only inside scripts/prerender.mjs's headless browser.
 *
 * Why this exists: gsap animates by writing inline styles onto the DOM
 * (`opacity: 0; transform: translate(0%, 120%)` and friends). The prerenderer
 * snapshots the live DOM, so those styles were being baked into the published
 * HTML — which caused two separate, serious problems once the app started
 * HYDRATING that HTML rather than replacing it:
 *
 *  1. **Crawlers read a half-animated page.** The hero words were captured
 *     mid-reveal at `opacity: 0`, so the headline of every homepage was
 *     invisible text in the file a non-JS crawler reads.
 *  2. **Hydration failed on every animated page.** React renders those spans
 *     with no `style` attribute at all; the snapshot had one. React 19 reports
 *     that as error #418 and re-renders the subtree, throwing away the very
 *     markup the prerender exists to provide.
 *
 * Skipping the animations during the snapshot makes the published HTML exactly
 * what React renders — nothing more — so hydration matches and crawlers get the
 * finished content. Real visitors are unaffected: the flag is only ever set by
 * the prerenderer, and every animation runs normally in their browser.
 */
export function isPrerender(): boolean {
  return (
    typeof window !== 'undefined' &&
    (window as Window & { __PRERENDER__?: boolean }).__PRERENDER__ === true
  );
}

/**
 * True when the page must show its FINISHED state with nothing moving: during the
 * prerender snapshot (above) and when the CMS opens the page as an in-place edit
 * surface (`boot.edit`, spec §13.7) — the owner clicks text and photos, which
 * cannot sit at opacity 0 waiting for a scroll trigger or drift under the cursor.
 * Every animation and smooth-scroll guard uses this, not isPrerender().
 */
export function isStaticRender(): boolean {
  return isPrerender() || isCmsStatic();
}
