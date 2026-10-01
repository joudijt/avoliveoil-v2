import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { CmsLang, CmsPageDoc, MediaRef, PublicForm } from '../contracts';
import { PAGE } from './classes';
import { BlockContext, type BlockEnv } from './context';
import { SectionView } from './SectionView';
import { ui } from './strings';

export interface CmsBlocksProps {
  doc: CmsPageDoc;
  lang: CmsLang;
  media: Record<string, MediaRef>;
  forms: Record<string, PublicForm>;
  mode?: 'public' | 'canvas';
  pageId?: number;
  /** canvas: bump a widget's number to remount it (after in-place editing touched its DOM) */
  renderKeys?: Record<string, number>;
}

/**
 * The content of `[data-cms-page-root]`: the breadcrumb trail every inner page of
 * the site has (it also clears the fixed header), then the sections. Rendered by
 * CmsPage (React), by renderPageHtml (publish-time HTML) and by the canvas — the
 * same components, so the three can never drift apart. No lazy parts, no Suspense:
 * renderToStaticMarkup must produce the full page synchronously.
 */
export function CmsBlocks({ doc, lang, media, forms, mode = 'public', pageId, renderKeys }: CmsBlocksProps) {
  const { t } = useTranslation();
  const env = useMemo<BlockEnv>(
    () => ({ lang, media: media ?? {}, forms: forms ?? {}, mode, pageId, tone: 'light', align: 'start', span: 12, full: false }),
    [lang, media, forms, mode, pageId]
  );
  // The renderer refuses page formats it does not know rather than guess at them.
  if (!doc || doc.schema !== 1 || !Array.isArray(doc.sections)) return null;
  const title = doc.title?.[lang]?.trim() || doc.title?.en?.trim() || '';

  return (
    <BlockContext.Provider value={env}>
      <div className={PAGE.crumbsWrap}>
        <nav aria-label={ui(lang, 'breadcrumb')} className={PAGE.crumbsNav}>
          <ol className={PAGE.crumbsList}>
            <li>
              <a href={`/${lang}`} className={PAGE.crumbsLink}>
                {t('nav.home')}
              </a>
            </li>
            {title ? (
              <li className={PAGE.crumbsItem}>
                <span aria-hidden="true" className={PAGE.crumbsSep}>
                  /
                </span>
                <span className={PAGE.crumbsCurrent} aria-current="page">
                  {title}
                </span>
              </li>
            ) : null}
          </ol>
        </nav>
      </div>
      {doc.sections.map((s) => (
        <SectionView key={s.id} section={s} renderKeys={renderKeys} />
      ))}
    </BlockContext.Provider>
  );
}
