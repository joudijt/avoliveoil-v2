import type { ComponentType } from 'react';
import { FaLeaf, FaMedal, FaTint } from 'react-icons/fa';
import { FiCheck, FiClock, FiHeart, FiMail, FiMapPin, FiPhone, FiShield, FiStar, FiTruck } from 'react-icons/fi';
import { GiOlive } from 'react-icons/gi';
import type { CmsIcon } from '../contracts';

type IconC = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;

/** CmsIcon → react-icons. Leaf / drop / medal match the Ingredients section. */
export const CMS_ICON_COMPONENTS: Record<CmsIcon, IconC> = {
  check: FiCheck,
  leaf: FaLeaf,
  olive: GiOlive,
  drop: FaTint,
  medal: FaMedal,
  star: FiStar,
  truck: FiTruck,
  shield: FiShield,
  heart: FiHeart,
  phone: FiPhone,
  mail: FiMail,
  pin: FiMapPin,
  clock: FiClock,
};
