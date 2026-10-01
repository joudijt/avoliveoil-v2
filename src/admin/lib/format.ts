const dtf = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const dtfTime = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

/** Server timestamps are ISO strings or "YYYY-MM-DD HH:MM:SS" (UTC, SQLite). */
export function parseDate(s: string | null | undefined): Date | null {
  if (!s) return null;
  const iso = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(s) ? s.replace(' ', 'T') + 'Z' : s;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function fmtDate(s: string | null | undefined): string {
  const d = parseDate(s);
  return d ? dtf.format(d) : '—';
}

export function fmtDateTime(s: string | null | undefined): string {
  const d = parseDate(s);
  return d ? dtfTime.format(d) : '—';
}

/** "just now", "5 min ago", "3 h ago", "yesterday", else a date */
export function fmtAgo(s: string | null | undefined): string {
  const d = parseDate(s);
  if (!d) return '—';
  const sec = Math.round((Date.now() - d.getTime()) / 1000);
  if (sec < 45) return 'just now';
  if (sec < 3600) return Math.max(1, Math.round(sec / 60)) + ' min ago';
  if (sec < 86400) return Math.round(sec / 3600) + ' h ago';
  if (sec < 172800) return 'yesterday';
  if (sec < 7 * 86400) return Math.round(sec / 86400) + ' days ago';
  return dtf.format(d);
}

export function fmtBytes(n: number): string {
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(0) + ' KB';
  return (n / 1024 / 1024).toFixed(1) + ' MB';
}

export const plural = (n: number, one: string, many = one + 's') => `${n} ${n === 1 ? one : many}`;

/** Title → url slug: lowercase ascii, single hyphens, ≤ 80 chars. */
export function slugify(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MIN_PASSWORD = 10;
