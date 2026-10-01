import { createContext, useContext } from 'react';
import type { CmsLang, CmsPageDoc, MediaRef, PublicForm } from '../../../cms/contracts';
import type { CatalogueProduct, FormListItem, MediaItem, PageListItem } from '../../api';

export interface BuilderCtx {
  doc: CmsPageDoc;
  lang: CmsLang;
  pageId: number;
  slug: string;
  /** apply a doc change; same coalesceKey within a second = one undo step */
  commit: (fn: (d: CmsPageDoc) => CmsPageDoc, coalesceKey?: string) => void;
  media: Record<string, MediaRef>;
  registerMedia: (items: MediaItem[]) => void;
  forms: Record<string, PublicForm>;
  registerForm: (f: PublicForm) => void;
  formList: FormListItem[] | null;
  reloadForms: () => void;
  catalogue: CatalogueProduct[] | null;
  pages: PageListItem[] | null;
  select: (id: string | null) => void;
}

export const BuilderContext = createContext<BuilderCtx | null>(null);

export function useBuilder(): BuilderCtx {
  const c = useContext(BuilderContext);
  if (!c) throw new Error('useBuilder outside the builder');
  return c;
}
