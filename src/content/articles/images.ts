import type { ImageKey } from './types';

import bottleField from '../../assets/images/HeroAVOliveOilBottleInTheField.png';
import pouringField from '../../assets/images/FarmerPouringOliveOilInTheField.png';
import pickingOlives from '../../assets/images/FarmerPickingOliveOfTheTreeInTheField.png';
import oilInField from '../../assets/images/AVOliveOilInTheField.png';
import groveSunset from '../../assets/images/OliveGroveSunsetHero.png';
import tasting from '../../assets/images/journey-06-testing.webp';
import extraction from '../../assets/images/journey-04-extraction.png';
import filtering from '../../assets/images/journey-05-filtering.png';
import bottling from '../../assets/images/journey-07-bottling.png';
import finalBottle from '../../assets/images/journey-08-final.png';
import womanHoldingBottle from '../../assets/images/woman-holding-bottle-nobg.webp';
import kampungBottle from '../../assets/images/malaysian-woman-bottle-kampung.webp';

/**
 * Article bodies reference photos by key rather than by import so the content
 * modules stay pure data and the same key can be reused across all three
 * languages with only the alt text translated.
 */
export const ARTICLE_IMAGES: Record<ImageKey, string> = {
  bottleField,
  pouringField,
  pickingOlives,
  oilInField,
  groveSunset,
  tasting,
  extraction,
  filtering,
  bottling,
  finalBottle,
  womanHoldingBottle,
  kampungBottle,
};
