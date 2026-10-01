import { createContext, useContext } from 'react';
import type { CmsLang, MediaRef, PublicForm } from '../contracts';
import type { Tone } from './classes';

/**
 * Everything a block needs besides its own settings. `mode` decides between the
 * public markup (CmsPage, publish-time HTML — must be identical) and the canvas
 * markup (adds data-node-* / data-cms-field hooks and placeholders for empty
 * widgets; never published).
 */
export interface BlockEnv {
  lang: CmsLang;
  media: Record<string, MediaRef>;
  forms: Record<string, PublicForm>;
  mode: 'public' | 'canvas';
  /** CMS page id, posted with form entries so the server knows where they came from */
  pageId?: number;
  /** colour scheme of the surrounding section (dark = olive / olive-dark / image backgrounds) */
  tone: Tone;
  /** text alignment of the surrounding section */
  align: 'start' | 'center' | 'end';
  /** desktop span of the surrounding column (image sizes) */
  span: number;
  /** surrounding section is full width (image sizes) */
  full: boolean;
}

export const BlockContext = createContext<BlockEnv>({
  lang: 'en',
  media: {},
  forms: {},
  mode: 'public',
  tone: 'light',
  align: 'start',
  span: 12,
  full: false,
});

export function useBlockEnv(): BlockEnv {
  return useContext(BlockContext);
}

/** Canvas-only attribute marking an inline-editable text: dotted path of a Localized field. */
export function fieldAttr(env: BlockEnv, path: string): { 'data-cms-field'?: string } {
  return env.mode === 'canvas' ? { 'data-cms-field': path } : {};
}
