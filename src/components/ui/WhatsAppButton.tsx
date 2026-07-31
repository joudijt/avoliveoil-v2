import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '../../utils/whatsapp';
import { useAppReady } from '../../hooks/useAppReady';

/**
 * Fixed bottom-right WhatsApp bubble, present on every page. Physically
 * bottom-right regardless of language, same reasoning as Navbar/Footer's
 * forced chrome positions — not mirrored for RTL. Hidden until the app is
 * past HomePage's loading screen (see useAppReady) so it doesn't float on
 * top of that animation.
 */
export function WhatsAppButton() {
  const { t } = useTranslation();
  const ready = useAppReady();

  if (!ready) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.label') ?? 'WhatsApp'}
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-110"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
