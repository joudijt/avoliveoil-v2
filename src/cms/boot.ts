/**
 * STUB — owned by builder B3a (site integration). Replaced by the real implementation.
 * Reads <script id="cms-boot" type="application/json"> injected by server/serve.php.
 */
import type { CmsBoot } from './contracts';

/** The parsed boot payload, or null when the page was served without one (prerender, static fallback). */
export function getBoot(): CmsBoot | null {
  return null;
}

/** True when the page runs as a static CMS edit surface (animations + smooth scroll off). */
export function isCmsStatic(): boolean {
  return false;
}
