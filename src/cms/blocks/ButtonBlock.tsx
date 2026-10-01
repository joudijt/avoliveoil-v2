import { FaWhatsapp } from 'react-icons/fa';
import type { ButtonWidget, WhatsappWidget } from '../contracts';
import { isExternalHref, localizeHref, safeHref } from '../sanitize';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { ALIGN_FLEX, BUTTON, cx } from './classes';
import { fieldAttr, useBlockEnv } from './context';
import { placeholderAttr, shown } from './text';

export function ButtonBlock({ w }: { w: ButtonWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const label = shown(env, s.label, 'Button');
  if (!label.text) return null;
  const href = localizeHref(safeHref(s.href) ?? '#', env.lang);
  const newTab = s.newTab || isExternalHref(href);
  const style = BUTTON.style[env.tone][s.style] ?? BUTTON.style[env.tone].primary;
  return (
    <div className={ALIGN_FLEX[s.align]}>
      <a
        href={href}
        className={cx(BUTTON.base, BUTTON.size[s.size] ?? BUTTON.size.m, style)}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {s.style === 'whatsapp' ? <FaWhatsapp className={BUTTON.icon} aria-hidden /> : null}
        <span {...fieldAttr(env, 'label')} {...placeholderAttr(label)}>
          {label.text}
        </span>
      </a>
    </div>
  );
}

export function WhatsappBlock({ w }: { w: WhatsappWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const label = shown(env, s.label, 'Chat on WhatsApp');
  if (!label.text) return null;
  // buildWhatsAppUrl drops empty fields; the owner's message is the whole prefill.
  const href = buildWhatsAppUrl(s.message?.[env.lang] ?? '', []);
  return (
    <div className={ALIGN_FLEX[s.align]}>
      <a href={href} target="_blank" rel="noopener noreferrer" className={cx(BUTTON.base, BUTTON.size.m, BUTTON.style[env.tone].whatsapp)}>
        <FaWhatsapp className={BUTTON.icon} aria-hidden />
        <span {...fieldAttr(env, 'label')} {...placeholderAttr(label)}>
          {label.text}
        </span>
      </a>
    </div>
  );
}
