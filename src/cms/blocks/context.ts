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
  /** page chrome: 'landing' = minimal ad-landing layout (LP-SPEC §2) */
  layout: 'site' | 'landing';
  /**
   * Id of the widget that carries the page's form anchor (`id="cms-form"`): the FIRST
   * form or heroForm in document order whose form resolves. Null = the page has no
   * form, so "Fill the form" buttons and the phone bar's form button are left out.
   */
  formAnchor: string | null;
  /**
   * Public landing page only: the hero/band that opens the page edge to edge, right
   * under the fixed header (it pads itself to clear the header). Null otherwise.
   */
  leadId: string | null;
  /** surrounding section is full width with no vertical padding: widgets draw edge to edge */
  bleed: boolean;
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
  layout: 'site',
  formAnchor: null,
  leadId: null,
  bleed: false,
});

export function useBlockEnv(): BlockEnv {
  return useContext(BlockContext);
}

/** Canvas-only attribute marking an inline-editable text: dotted path of a Localized field. */
export function fieldAttr(env: BlockEnv, path: string): { 'data-cms-field'?: string } {
  return env.mode === 'canvas' ? { 'data-cms-field': path } : {};
}
