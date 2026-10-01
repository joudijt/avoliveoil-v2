import type { HideOn } from '../contracts';
import { HIDE, cx } from './classes';

export function hideClasses(hide: HideOn | undefined): string {
  if (!hide) return '';
  return cx(hide.desktop && HIDE.desktop, hide.tablet && HIDE.tablet, hide.mobile && HIDE.mobile);
}

/** Canvas: which devices hide this node, as a space list for the canvas stylesheet. */
export function hideAttr(hide: HideOn | undefined): { 'data-hide'?: string } {
  if (!hide) return {};
  const v = cx(hide.desktop && 'desktop', hide.tablet && 'tablet', hide.mobile && 'mobile');
  return v ? { 'data-hide': v } : {};
}
