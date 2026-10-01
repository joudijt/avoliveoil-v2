/**
 * Video widget URLs. Only YouTube, Vimeo and direct .mp4 files are accepted;
 * YouTube always plays from youtube-nocookie.com (no tracking cookies until the
 * visitor presses play). The server validates the stored URL with the same rules
 * and only lets these two iframe hosts through its sanitiser (spec §13.3).
 */
export type ParsedVideo =
  | { kind: 'youtube'; id: string; embed: string }
  | { kind: 'vimeo'; id: string; embed: string }
  | { kind: 'mp4'; src: string };

const YT_ID = /^[A-Za-z0-9_-]{11}$/;

export function parseVideoUrl(raw: string | undefined | null): ParsedVideo | null {
  if (!raw) return null;
  const input = raw.trim();
  if (!input) return null;

  // Same-site uploads are relative.
  if (/^\/[A-Za-z0-9/_.-]+\.mp4$/i.test(input) && !input.startsWith('//')) return { kind: 'mp4', src: input };

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  const host = url.hostname.replace(/^www\.|^m\./, '').toLowerCase();

  let ytId: string | null = null;
  if (host === 'youtu.be') ytId = url.pathname.slice(1).split('/')[0];
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com' || host === 'music.youtube.com') {
    if (url.pathname === '/watch') ytId = url.searchParams.get('v');
    else {
      const m = /^\/(embed|shorts|live|v)\/([^/?#]+)/.exec(url.pathname);
      if (m) ytId = m[2];
    }
  }
  if (ytId !== null) {
    if (!YT_ID.test(ytId)) return null;
    return { kind: 'youtube', id: ytId, embed: `https://www.youtube-nocookie.com/embed/${ytId}` };
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const m = /\/(?:video\/)?(\d{5,12})(?:$|[/?#])/.exec(url.pathname);
    if (!m) return null;
    return { kind: 'vimeo', id: m[1], embed: `https://player.vimeo.com/video/${m[1]}` };
  }

  if (url.protocol === 'https:' && /\.mp4$/i.test(url.pathname)) return { kind: 'mp4', src: url.href };
  return null;
}
