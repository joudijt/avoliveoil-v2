/**
 * HTML markers that make an existing page editable in place (spec §6, §11, §15).
 *
 * The markers are the contract with server/serve.php, which applies published
 * overrides to the prerendered snapshot by these attributes alone, and with
 * src/cms/inlineEdit.ts, which outlines them in edit mode. They are inert for
 * visitors: plain data attributes, no behaviour, no styling.
 *
 * Rules the call sites follow (serve.php relies on them):
 *  - `cmsText(key)` goes on an element whose ENTIRE text is `t(key)` and which has
 *    no element children (serve.php sets textContent and refuses elements with
 *    children). Wrap mixed text in a span rather than marking the parent.
 *  - `cmsAttr({...})` names translated attributes (placeholder, alt, aria-label, title).
 *  - `cmsNum(key)` goes on a span holding only a statistic's number.
 */
import { createElement, type ElementType } from 'react';
import { useTranslation } from 'react-i18next';

export type CmsAttrName = 'placeholder' | 'alt' | 'aria-label' | 'title';

export function cmsText(key: string): { 'data-cms': string } {
  return { 'data-cms': key };
}

export function cmsNum(key: string): { 'data-cms-num': string } {
  return { 'data-cms-num': key };
}

/** `data-cms-attr="placeholder:<key>;alt:<key>"` — attribute order is stable for snapshot diffs. */
export function cmsAttr(map: Partial<Record<CmsAttrName, string>>): { 'data-cms-attr': string } {
  const order: CmsAttrName[] = ['placeholder', 'alt', 'aria-label', 'title'];
  return {
    'data-cms-attr': order
      .filter((name) => map[name])
      .map((name) => `${name}:${map[name]}`)
      .join(';'),
  };
}

type CmsTextProps = {
  /** The i18n key whose value is this element's whole text. */
  k: string;
  as?: ElementType;
  /** Interpolation values (`{{store}}`); serve.php interpolates the same token server-side. */
  values?: Record<string, string>;
  className?: string;
};

/** `<CmsText k="hero.sub" as="p" />` — renders `t(k)` inside a marked element. */
export function CmsText({ k, as = 'span', values, className }: CmsTextProps) {
  const { t } = useTranslation();
  return createElement(as, { className, ...cmsText(k) }, values ? t(k, values) : t(k));
}
