import { safeHref } from '../../../../cms/sanitize';

/** Problem with a link the owner typed, or null. Same rules as the server (spec §13.3). */
export function linkProblem(href: string): string | null {
  const v = href.trim();
  if (!v) return 'Add a link — choose a page or paste a web address.';
  if (/^www\./i.test(v)) return 'Start web addresses with https://';
  if (!safeHref(v)) return 'This link is not allowed. Use a page of this site, an https:// address, mailto: or tel:.';
  return null;
}
