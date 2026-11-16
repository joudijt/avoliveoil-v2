import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '../../utils/whatsapp';
import { cmsAttr } from '../../cms/editable';
import { useBuyNowOpen } from '../../order/bridge';

/**
 * Fixed bottom-right WhatsApp bubble, present on every page. Physically
 * bottom-right, same reasoning as Navbar/Footer's forced chrome positions.
 *
 * It used to hide behind `useAppReady()` so it would not float over HomePage's
 * loading animation. That animation was deleted in PERF-1, and the gate then
 * became actively harmful: on a prerendered page the body already carries
 * data-app-ready, so a hydrating client rendered this button on its very first
 * render while the snapshot — captured on the same tick the attribute was set —
 * did not contain it. React saw a structural mismatch and re-rendered the whole
 * tree on every page. Rendering it unconditionally is both simpler and correct.
 */
export function WhatsAppButton() {
  const { t } = useTranslation();
  // Hidden while the Buy-now sheet is open (BUY-NOW; it would sit over the Pay button). The server
  // and first-render snapshot is "closed", so prerendered HTML and hydration still match.
  const sheetOpen = useBuyNowOpen();
  if (sheetOpen) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.label') ?? 'WhatsApp'}
      {...cmsAttr({ 'aria-label': 'whatsapp.label' })}
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-110"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
