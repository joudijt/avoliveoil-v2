import type { CanvasToShell, ShellToCanvas } from '../contracts';

/** Messages only ever travel between this iframe and the admin page that framed it, same origin. */
export function postToShell(msg: CanvasToShell): void {
  if (window.parent === window) return;
  window.parent.postMessage(msg, window.location.origin);
}

const SHELL_TYPES = new Set(['cms:doc', 'cms:select', 'cms:drag-start', 'cms:drag-end']);

export function shellMessage(e: MessageEvent): ShellToCanvas | null {
  if (e.origin !== window.location.origin) return null;
  if (window.parent === window || e.source !== window.parent) return null;
  const data = e.data as { type?: unknown } | null;
  if (!data || typeof data !== 'object' || typeof data.type !== 'string' || !SHELL_TYPES.has(data.type)) return null;
  return data as ShellToCanvas;
}
