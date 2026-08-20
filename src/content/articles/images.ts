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

import pressBeliMinyakZaitunKlHero from '../../assets/images/press/beli-minyak-zaitun-kl-hero.webp';
import pressBeliMinyakZaitunKlInline from '../../assets/images/press/beli-minyak-zaitun-kl-inline.webp';
import pressColdPressedOliveOilExplainedHero from '../../assets/images/press/cold-pressed-olive-oil-explained-hero.webp';
import pressColdPressedOliveOilExplainedInline from '../../assets/images/press/cold-pressed-olive-oil-explained-inline.webp';
import pressCompareOliveOilBrandsMalaysiaHero from '../../assets/images/press/compare-olive-oil-brands-malaysia-hero.webp';
import pressCompareOliveOilBrandsMalaysiaInline from '../../assets/images/press/compare-olive-oil-brands-malaysia-inline.webp';
import pressHalalOliveOilMalaysiaHero from '../../assets/images/press/halal-olive-oil-malaysia-hero.webp';
import pressHalalOliveOilMalaysiaInline from '../../assets/images/press/halal-olive-oil-malaysia-inline.webp';
import pressHargaMinyakZaitunMalaysiaHero from '../../assets/images/press/harga-minyak-zaitun-malaysia-hero.webp';
import pressHargaMinyakZaitunMalaysiaInline from '../../assets/images/press/harga-minyak-zaitun-malaysia-inline.webp';
import pressJenamaMinyakZaitunTerbaikHero from '../../assets/images/press/jenama-minyak-zaitun-terbaik-hero.webp';
import pressJenamaMinyakZaitunTerbaikInline from '../../assets/images/press/jenama-minyak-zaitun-terbaik-inline.webp';
import pressMinyakZaitunExtraVirginGredHero from '../../assets/images/press/minyak-zaitun-extra-virgin-gred-hero.webp';
import pressMinyakZaitunExtraVirginGredInline from '../../assets/images/press/minyak-zaitun-extra-virgin-gred-inline.webp';
import pressMinyakZaitunHalalHero from '../../assets/images/press/minyak-zaitun-halal-hero.webp';
import pressMinyakZaitunHalalInline from '../../assets/images/press/minyak-zaitun-halal-inline.webp';
import pressMinyakZaitunOrganikHero from '../../assets/images/press/minyak-zaitun-organik-hero.webp';
import pressMinyakZaitunOrganikInline from '../../assets/images/press/minyak-zaitun-organik-inline.webp';
import pressMinyakZaitunPalestinHero from '../../assets/images/press/minyak-zaitun-palestin-hero.webp';
import pressMinyakZaitunPalestinInline from '../../assets/images/press/minyak-zaitun-palestin-inline.webp';
import pressMinyakZaitunUntukMasakHero from '../../assets/images/press/minyak-zaitun-untuk-masak-hero.webp';
import pressMinyakZaitunUntukMasakInline from '../../assets/images/press/minyak-zaitun-untuk-masak-inline.webp';
import pressOliveOilPriceMalaysiaHero from '../../assets/images/press/olive-oil-price-malaysia-hero.webp';
import pressOliveOilPriceMalaysiaInline from '../../assets/images/press/olive-oil-price-malaysia-inline.webp';
import pressPalestinianOliveOilOriginHero from '../../assets/images/press/palestinian-olive-oil-origin-hero.webp';
import pressPalestinianOliveOilOriginInline from '../../assets/images/press/palestinian-olive-oil-origin-inline.webp';
import pressZaytZaytunFalastiniHero from '../../assets/images/press/zayt-zaytun-falastini-hero.webp';
import pressZaytZaytunFalastiniInline from '../../assets/images/press/zayt-zaytun-falastini-inline.webp';
import pressZaytZaytunLilTabkhHero from '../../assets/images/press/zayt-zaytun-lil-tabkh-hero.webp';
import pressZaytZaytunLilTabkhInline from '../../assets/images/press/zayt-zaytun-lil-tabkh-inline.webp';

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
  pressBeliMinyakZaitunKlHero,
  pressBeliMinyakZaitunKlInline,
  pressColdPressedOliveOilExplainedHero,
  pressColdPressedOliveOilExplainedInline,
  pressCompareOliveOilBrandsMalaysiaHero,
  pressCompareOliveOilBrandsMalaysiaInline,
  pressHalalOliveOilMalaysiaHero,
  pressHalalOliveOilMalaysiaInline,
  pressHargaMinyakZaitunMalaysiaHero,
  pressHargaMinyakZaitunMalaysiaInline,
  pressJenamaMinyakZaitunTerbaikHero,
  pressJenamaMinyakZaitunTerbaikInline,
  pressMinyakZaitunExtraVirginGredHero,
  pressMinyakZaitunExtraVirginGredInline,
  pressMinyakZaitunHalalHero,
  pressMinyakZaitunHalalInline,
  pressMinyakZaitunOrganikHero,
  pressMinyakZaitunOrganikInline,
  pressMinyakZaitunPalestinHero,
  pressMinyakZaitunPalestinInline,
  pressMinyakZaitunUntukMasakHero,
  pressMinyakZaitunUntukMasakInline,
  pressOliveOilPriceMalaysiaHero,
  pressOliveOilPriceMalaysiaInline,
  pressPalestinianOliveOilOriginHero,
  pressPalestinianOliveOilOriginInline,
  pressZaytZaytunFalastiniHero,
  pressZaytZaytunFalastiniInline,
  pressZaytZaytunLilTabkhHero,
  pressZaytZaytunLilTabkhInline,
};
