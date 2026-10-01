import type { MouseEvent } from 'react';
import type { ButtonStyle, CmsLang, CtaButton } from '../contracts';
import { FORM_ANCHOR } from '../contracts';
import { isExternalHref, localizeHref, safeHref } from '../sanitize';
import { CTA, cx } from './classes';
import { fieldAttr, useBlockEnv } from './context';
import { STORE_ICONS, STORE_URLS, goToForm, isStoreKey, whatsappHref } from './cta';
import { WhatsappIcon, type IconC } from './icons';
import { placeholderAttr, shown } from './text';

interface Resolved {
  href: string;
  newTab: boolean;
  Icon: IconC | null;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** canvas only: the button would not be shown to visitors (no form on the page, no link) */
  inert: boolean;
}

function resolve(b: CtaButton, lang: CmsLang, hasForm: boolean): Resolved | null {
  switch (b.kind) {
    case 'whatsapp':
      return { href: whatsappHref(b.message, lang), newTab: true, Icon: WhatsappIcon, inert: false };
    case 'form':
      return { href: `#${FORM_ANCHOR}`, newTab: false, Icon: null, onClick: goToForm, inert: !hasForm };
    case 'store': {
      const store = isStoreKey(b.store) ? b.store : 'madinah';
      return { href: STORE_URLS[store], newTab: true, Icon: STORE_ICONS[store], inert: false };
    }
    case 'link': {
      const safe = safeHref(b.href);
      if (!safe) return { href: '#', newTab: false, Icon: null, inert: true };
      const href = localizeHref(safe, lang);
      return { href, newTab: !!b.newTab || isExternalHref(href), Icon: null, inert: false };
    }
    default: {
      const never: never = b.kind;
      void never;
      return null;
    }
  }
}

/**
 * A row of landing call-to-action buttons. `styles` is the colour map of the
 * surrounding surface (CTA.style[tone] for the hero, BAND.style[tone] for a band).
 * Public rendering leaves out a button that cannot work (a form button on a page
 * without a form, an empty or unsafe link); the canvas shows it faded instead so
 * the owner can see and fix it.
 */
export function CtaButtons({ buttons, styles, className }: { buttons: CtaButton[] | undefined; styles: Record<ButtonStyle, string>; className: string }) {
  const env = useBlockEnv();
  const canvas = env.mode === 'canvas';
  const items = (buttons ?? []).slice(0, 3).flatMap((b, i) => {
    const label = shown(env, b.label, 'Button');
    const r = resolve(b, env.lang, env.formAnchor !== null);
    if (!label.text || !r || (r.inert && !canvas)) return [];
    return [{ b, i, label, r }];
  });
  if (items.length === 0) return null;
  return (
    <div className={className}>
      {items.map(({ b, i, label, r }) => (
        <a
          key={b.id}
          href={r.href}
          className={cx(CTA.base, styles[b.style] ?? styles.primary)}
          {...(r.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...(r.onClick && !canvas ? { onClick: r.onClick } : {})}
          {...(canvas && r.inert ? { 'data-cms-placeholder': '' } : {})}
        >
          {r.Icon ? <r.Icon className={CTA.icon} /> : null}
          <span {...fieldAttr(env, `buttons.${i}.label`)} {...placeholderAttr(label)}>
            {label.text}
          </span>
        </a>
      ))}
    </div>
  );
}
