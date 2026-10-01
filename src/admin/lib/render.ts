/**
 * Publish-time HTML: the admin renders each language of a page with the SAME block
 * components the public site uses (src/cms/render.tsx) and posts the HTML base64.
 */
import type { CmsLang, CmsPageDoc, MediaRef, PublicForm, TextValue } from '../../cms/contracts';
import { renderPageHtml } from '../../cms/render';
import { api } from '../api';
import { toast, updateToast } from './bus';

export function renderLangs(
  doc: CmsPageDoc,
  langs: CmsLang[],
  media: Record<string, MediaRef>,
  forms: Record<string, PublicForm>,
  text: Record<CmsLang, Record<string, TextValue>>,
  /** lets form widgets post the page id with each entry (inbox "from page") */
  pageId?: number
): Partial<Record<CmsLang, string>> {
  const out: Partial<Record<CmsLang, string>> = {};
  for (const lang of langs) out[lang] = renderPageHtml(doc, { lang, media, forms, text: text[lang] ?? {}, pageId });
  return out;
}

let running: Promise<number> | null = null;

/**
 * Re-render every published page the server marked dirty (site text / media alt / form
 * changed, or a new build was deployed). Runs at most once at a time; shows a small
 * progress toast only when there is work to do. Returns how many pages were refreshed.
 */
export function rerenderDirtyPages(): Promise<number> {
  if (running) return running;
  running = (async () => {
    let ids: number[] = [];
    try {
      ids = await api.dirtyPages();
    } catch {
      return 0;
    }
    if (!ids.length) return 0;
    const tid = toast.progress(`Updating ${ids.length} published page${ids.length === 1 ? '' : 's'}…`);
    let done = 0;
    let failed = 0;
    try {
      const text = await api.publishedText();
      for (const id of ids) {
        try {
          const p = await api.page(id);
          if (p.published && p.page.langs.length) {
            const html = renderLangs(p.published, p.page.langs, p.media, p.forms, text, id);
            await api.rerender(id, html);
          }
          done++;
          updateToast(tid, 'progress', `Updating published pages… ${done} of ${ids.length}`, 0);
        } catch {
          failed++;
        }
      }
    } catch {
      failed = ids.length;
    }
    if (failed) updateToast(tid, 'error', `${failed} page${failed === 1 ? '' : 's'} could not be updated. They will be retried next time.`, 7000);
    else updateToast(tid, 'ok', `${done} published page${done === 1 ? ' is' : 's are'} up to date.`, 3500);
    return done;
  })().finally(() => {
    running = null;
  });
  return running;
}
