import type { IconType } from 'react-icons';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { SiShopee } from 'react-icons/si';
import {
  INSTAGRAM_URL,
  FACEBOOK_URL,
  SHOPEE_URL,
  TIKTOK_SHOP_URL,
} from '../config/site';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';

/**
 * The one list of "find us / buy from us" destinations, shared by the footer
 * and the contact page so the two can't drift apart. Order is social first,
 * then the two shops, then the direct channel.
 */
export const SOCIAL_LINKS: { Icon: IconType; href: string; label: string }[] = [
  { Icon: FaInstagram, href: INSTAGRAM_URL, label: 'Instagram' },
  { Icon: FaFacebookF, href: FACEBOOK_URL, label: 'Facebook' },
  { Icon: SiShopee, href: SHOPEE_URL, label: 'Shopee' },
  { Icon: FaTiktok, href: TIKTOK_SHOP_URL, label: 'TikTok Shop' },
  { Icon: FaWhatsapp, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp' },
];
