import type { ImageKey } from './types';

// The originals of these are 0.7–5.9 MB PNGs. Article bodies render them inside
// a prose column that is never wider than ~800 CSS px, so they point at the
// widest optimised variant at or below 1200px from scripts/optimize-images.py
// (src/assets/opt/<name>-<width>.webp) — same string shape, ~1–2% of the bytes.
import bottleField from '../../assets/opt/HeroAVOliveOilBottleInTheField-1200.webp';
import pouringField from '../../assets/opt/FarmerPouringOliveOilInTheField-750.webp';
import pickingOlives from '../../assets/opt/FarmerPickingOliveOfTheTreeInTheField-928.webp';
import oilInField from '../../assets/opt/AVOliveOilInTheField-750.webp';
import groveSunset from '../../assets/opt/OliveGroveSunsetHero-1200.webp';
import tasting from '../../assets/images/journey-06-testing.webp';
import extraction from '../../assets/opt/journey-04-extraction-1200.webp';
import filtering from '../../assets/opt/journey-05-filtering-1200.webp';
import bottling from '../../assets/opt/journey-07-bottling-1200.webp';
import finalBottle from '../../assets/opt/journey-08-final-1200.webp';
import womanHoldingBottle from '../../assets/images/woman-holding-bottle-nobg.webp';
import kampungBottle from '../../assets/images/malaysian-woman-bottle-kampung.webp';

import pressOliveOilPopularityMalaysiaHero from '../../assets/images/press/olive-oil-popularity-malaysia-hero.webp';
import pressOliveOilPopularityMalaysiaInline from '../../assets/images/press/olive-oil-popularity-malaysia-inline.webp';
import pressEvooHealthBenefitsFamiliesHero from '../../assets/images/press/evoo-health-benefits-families-hero.webp';
import pressEvooHealthBenefitsFamiliesInline from '../../assets/images/press/evoo-health-benefits-families-inline.webp';
import pressChooseAuthenticEvooMalaysiaHero from '../../assets/images/press/choose-authentic-evoo-malaysia-hero.webp';
import pressChooseAuthenticEvooMalaysiaInline from '../../assets/images/press/choose-authentic-evoo-malaysia-inline.webp';
import pressMinyakZaitunHabbatusSaudaHero from '../../assets/images/press/minyak-zaitun-habbatus-sauda-hero.webp';
import pressMinyakZaitunHabbatusSaudaInline from '../../assets/images/press/minyak-zaitun-habbatus-sauda-inline.webp';
import pressMinyakZaitunUntukSaladHero from '../../assets/images/press/minyak-zaitun-untuk-salad-hero.webp';
import pressMinyakZaitunUntukSaladInline from '../../assets/images/press/minyak-zaitun-untuk-salad-inline.webp';
import pressOliveOilForCookingHero from '../../assets/images/press/olive-oil-for-cooking-hero.webp';
import pressOliveOilForCookingInline from '../../assets/images/press/olive-oil-for-cooking-inline.webp';
import pressOliveOilSmokePointHero from '../../assets/images/press/olive-oil-smoke-point-hero.webp';
import pressOliveOilSmokePointInline from '../../assets/images/press/olive-oil-smoke-point-inline.webp';
import pressOliveOilVsPomaceOilHero from '../../assets/images/press/olive-oil-vs-pomace-oil-hero.webp';
import pressOliveOilVsPomaceOilInline from '../../assets/images/press/olive-oil-vs-pomace-oil-inline.webp';
import pressZaitunDalamAlQuranHero from '../../assets/images/press/zaitun-dalam-al-quran-hero.webp';
import pressZaitunDalamAlQuranInline from '../../assets/images/press/zaitun-dalam-al-quran-inline.webp';

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
import pressBotolMinyakZaitunHero from '../../assets/images/press/botol-minyak-zaitun-hero.webp';
import pressBotolMinyakZaitunInline from '../../assets/images/press/botol-minyak-zaitun-inline.webp';
import pressCaraSimpanMinyakZaitunHero from '../../assets/images/press/cara-simpan-minyak-zaitun-hero.webp';
import pressCaraSimpanMinyakZaitunInline from '../../assets/images/press/cara-simpan-minyak-zaitun-inline.webp';
import pressEvooSaladDressingHero from '../../assets/images/press/evoo-salad-dressing-hero.webp';
import pressEvooSaladDressingInline from '../../assets/images/press/evoo-salad-dressing-inline.webp';
import pressEvooVsPureOliveOilHero from '../../assets/images/press/evoo-vs-pure-olive-oil-hero.webp';
import pressEvooVsPureOliveOilInline from '../../assets/images/press/evoo-vs-pure-olive-oil-inline.webp';
import pressMinyakZaitunPomaceHero from '../../assets/images/press/minyak-zaitun-pomace-hero.webp';
import pressMinyakZaitunPomaceInline from '../../assets/images/press/minyak-zaitun-pomace-inline.webp';
import pressMinyakZaitunUntukGorengHero from '../../assets/images/press/minyak-zaitun-untuk-goreng-hero.webp';
import pressMinyakZaitunUntukGorengInline from '../../assets/images/press/minyak-zaitun-untuk-goreng-inline.webp';
import pressMinyakZaitunVsMinyakMasakHero from '../../assets/images/press/minyak-zaitun-vs-minyak-masak-hero.webp';
import pressMinyakZaitunVsMinyakMasakInline from '../../assets/images/press/minyak-zaitun-vs-minyak-masak-inline.webp';
import pressOliveOilAirFryerHero from '../../assets/images/press/olive-oil-air-fryer-hero.webp';
import pressOliveOilAirFryerInline from '../../assets/images/press/olive-oil-air-fryer-inline.webp';
import pressOliveOilForBreadHero from '../../assets/images/press/olive-oil-for-bread-hero.webp';
import pressOliveOilForBreadInline from '../../assets/images/press/olive-oil-for-bread-inline.webp';
import pressOliveOilMarinadeHero from '../../assets/images/press/olive-oil-marinade-hero.webp';
import pressOliveOilMarinadeInline from '../../assets/images/press/olive-oil-marinade-inline.webp';
import pressOliveOilShelfLifeHero from '../../assets/images/press/olive-oil-shelf-life-hero.webp';
import pressOliveOilShelfLifeInline from '../../assets/images/press/olive-oil-shelf-life-inline.webp';
import pressResepiMinyakZaitunHero from '../../assets/images/press/resepi-minyak-zaitun-hero.webp';
import pressResepiMinyakZaitunInline from '../../assets/images/press/resepi-minyak-zaitun-inline.webp';
import pressBeliMinyakZaitunOnlineHero from '../../assets/images/press/beli-minyak-zaitun-online-hero.webp';
import pressBeliMinyakZaitunOnlineInline from '../../assets/images/press/beli-minyak-zaitun-online-inline.webp';
import pressGarlicInfusedOliveOilHero from '../../assets/images/press/garlic-infused-olive-oil-hero.webp';
import pressGarlicInfusedOliveOilInline from '../../assets/images/press/garlic-infused-olive-oil-inline.webp';
import pressMinyakZaitunPalsuHero from '../../assets/images/press/minyak-zaitun-palsu-hero.webp';
import pressMinyakZaitunPalsuInline from '../../assets/images/press/minyak-zaitun-palsu-inline.webp';
import pressMinyakZaitunTulenHero from '../../assets/images/press/minyak-zaitun-tulen-hero.webp';
import pressMinyakZaitunTulenInline from '../../assets/images/press/minyak-zaitun-tulen-inline.webp';
import pressMinyakZaitunUntukKekHero from '../../assets/images/press/minyak-zaitun-untuk-kek-hero.webp';
import pressMinyakZaitunUntukKekInline from '../../assets/images/press/minyak-zaitun-untuk-kek-inline.webp';
import pressMinyakZaitunVsMinyakKelapaHero from '../../assets/images/press/minyak-zaitun-vs-minyak-kelapa-hero.webp';
import pressMinyakZaitunVsMinyakKelapaInline from '../../assets/images/press/minyak-zaitun-vs-minyak-kelapa-inline.webp';
import pressOliveOilBitterTasteHero from '../../assets/images/press/olive-oil-bitter-taste-hero.webp';
import pressOliveOilBitterTasteInline from '../../assets/images/press/olive-oil-bitter-taste-inline.webp';
import pressOliveOilBottleSizeHero from '../../assets/images/press/olive-oil-bottle-size-hero.webp';
import pressOliveOilBottleSizeInline from '../../assets/images/press/olive-oil-bottle-size-inline.webp';
import pressOliveOilForBakingHero from '../../assets/images/press/olive-oil-for-baking-hero.webp';
import pressOliveOilForBakingInline from '../../assets/images/press/olive-oil-for-baking-inline.webp';
import pressOliveOilSubstituteHero from '../../assets/images/press/olive-oil-substitute-hero.webp';
import pressOliveOilSubstituteInline from '../../assets/images/press/olive-oil-substitute-inline.webp';
import pressOliveOilVsCoconutOilHero from '../../assets/images/press/olive-oil-vs-coconut-oil-hero.webp';
import pressOliveOilVsCoconutOilInline from '../../assets/images/press/olive-oil-vs-coconut-oil-inline.webp';
import pressRasaMinyakZaitunHero from '../../assets/images/press/rasa-minyak-zaitun-hero.webp';
import pressRasaMinyakZaitunInline from '../../assets/images/press/rasa-minyak-zaitun-inline.webp';
import pressAglioEOlioHero from '../../assets/images/press/aglio-e-olio-hero.webp';
import pressAglioEOlioInline from '../../assets/images/press/aglio-e-olio-inline.webp';
import pressCloudyOliveOilHero from '../../assets/images/press/cloudy-olive-oil-hero.webp';
import pressCloudyOliveOilInline from '../../assets/images/press/cloudy-olive-oil-inline.webp';
import pressMinyakZaitunKeruhHero from '../../assets/images/press/minyak-zaitun-keruh-hero.webp';
import pressMinyakZaitunKeruhInline from '../../assets/images/press/minyak-zaitun-keruh-inline.webp';
import pressMinyakZaitunUntukAirFryerHero from '../../assets/images/press/minyak-zaitun-untuk-air-fryer-hero.webp';
import pressMinyakZaitunUntukAirFryerInline from '../../assets/images/press/minyak-zaitun-untuk-air-fryer-inline.webp';
import pressMinyakZaitunUntukIkanBakarHero from '../../assets/images/press/minyak-zaitun-untuk-ikan-bakar-hero.webp';
import pressMinyakZaitunUntukIkanBakarInline from '../../assets/images/press/minyak-zaitun-untuk-ikan-bakar-inline.webp';
import pressMinyakZaitunUntukPastaHero from '../../assets/images/press/minyak-zaitun-untuk-pasta-hero.webp';
import pressMinyakZaitunUntukPastaInline from '../../assets/images/press/minyak-zaitun-untuk-pasta-inline.webp';
import pressMinyakZaitunUntukRotiHero from '../../assets/images/press/minyak-zaitun-untuk-roti-hero.webp';
import pressMinyakZaitunUntukRotiInline from '../../assets/images/press/minyak-zaitun-untuk-roti-inline.webp';
import pressMinyakZaitunVsMinyakSawitHero from '../../assets/images/press/minyak-zaitun-vs-minyak-sawit-hero.webp';
import pressMinyakZaitunVsMinyakSawitInline from '../../assets/images/press/minyak-zaitun-vs-minyak-sawit-inline.webp';
import pressOliveOilAndBalsamicHero from '../../assets/images/press/olive-oil-and-balsamic-hero.webp';
import pressOliveOilAndBalsamicInline from '../../assets/images/press/olive-oil-and-balsamic-inline.webp';
import pressOliveOilForGrillingHero from '../../assets/images/press/olive-oil-for-grilling-hero.webp';
import pressOliveOilForGrillingInline from '../../assets/images/press/olive-oil-for-grilling-inline.webp';
import pressOliveOilForHummusHero from '../../assets/images/press/olive-oil-for-hummus-hero.webp';
import pressOliveOilForHummusInline from '../../assets/images/press/olive-oil-for-hummus-inline.webp';
import pressOliveOilVsAvocadoOilHero from '../../assets/images/press/olive-oil-vs-avocado-oil-hero.webp';
import pressOliveOilVsAvocadoOilInline from '../../assets/images/press/olive-oil-vs-avocado-oil-inline.webp';
import pressMinyakZaitunMurahHero from '../../assets/images/press/minyak-zaitun-murah-hero.webp';
import pressMinyakZaitunMurahInline from '../../assets/images/press/minyak-zaitun-murah-inline.webp';
import pressMinyakZaitunPopcornHero from '../../assets/images/press/minyak-zaitun-popcorn-hero.webp';
import pressMinyakZaitunPopcornInline from '../../assets/images/press/minyak-zaitun-popcorn-inline.webp';
import pressMinyakZaitunUntukSayurPanggangHero from '../../assets/images/press/minyak-zaitun-untuk-sayur-panggang-hero.webp';
import pressMinyakZaitunUntukSayurPanggangInline from '../../assets/images/press/minyak-zaitun-untuk-sayur-panggang-inline.webp';
import pressMinyakZaitunUntukSteakHero from '../../assets/images/press/minyak-zaitun-untuk-steak-hero.webp';
import pressMinyakZaitunUntukSteakInline from '../../assets/images/press/minyak-zaitun-untuk-steak-inline.webp';
import pressMinyakZaitunUntukTelurHero from '../../assets/images/press/minyak-zaitun-untuk-telur-hero.webp';
import pressMinyakZaitunUntukTelurInline from '../../assets/images/press/minyak-zaitun-untuk-telur-inline.webp';
import pressMinyakZaitunVsMentegaHero from '../../assets/images/press/minyak-zaitun-vs-mentega-hero.webp';
import pressMinyakZaitunVsMentegaInline from '../../assets/images/press/minyak-zaitun-vs-mentega-inline.webp';
import pressOliveOilFocacciaHero from '../../assets/images/press/olive-oil-focaccia-hero.webp';
import pressOliveOilFocacciaInline from '../../assets/images/press/olive-oil-focaccia-inline.webp';
import pressOliveOilForSteakHero from '../../assets/images/press/olive-oil-for-steak-hero.webp';
import pressOliveOilForSteakInline from '../../assets/images/press/olive-oil-for-steak-inline.webp';
import pressOliveOilFriedEggHero from '../../assets/images/press/olive-oil-fried-egg-hero.webp';
import pressOliveOilFriedEggInline from '../../assets/images/press/olive-oil-fried-egg-inline.webp';
import pressOliveOilPopcornHero from '../../assets/images/press/olive-oil-popcorn-hero.webp';
import pressOliveOilPopcornInline from '../../assets/images/press/olive-oil-popcorn-inline.webp';
import pressOliveOilRoastedVegetablesHero from '../../assets/images/press/olive-oil-roasted-vegetables-hero.webp';
import pressOliveOilRoastedVegetablesInline from '../../assets/images/press/olive-oil-roasted-vegetables-inline.webp';
import pressOliveOilVsButterHero from '../../assets/images/press/olive-oil-vs-butter-hero.webp';
import pressOliveOilVsButterInline from '../../assets/images/press/olive-oil-vs-butter-inline.webp';
import pressKopiMinyakZaitunHero from '../../assets/images/press/kopi-minyak-zaitun-hero.webp';
import pressKopiMinyakZaitunInline from '../../assets/images/press/kopi-minyak-zaitun-inline.webp';
import pressMinyakZaitunAisKrimHero from '../../assets/images/press/minyak-zaitun-ais-krim-hero.webp';
import pressMinyakZaitunAisKrimInline from '../../assets/images/press/minyak-zaitun-ais-krim-inline.webp';
import pressMinyakZaitunKekOrenHero from '../../assets/images/press/minyak-zaitun-kek-oren-hero.webp';
import pressMinyakZaitunKekOrenInline from '../../assets/images/press/minyak-zaitun-kek-oren-inline.webp';
import pressMinyakZaitunUntukPizzaHero from '../../assets/images/press/minyak-zaitun-untuk-pizza-hero.webp';
import pressMinyakZaitunUntukPizzaInline from '../../assets/images/press/minyak-zaitun-untuk-pizza-inline.webp';
import pressMinyakZaitunVsMinyakBijanHero from '../../assets/images/press/minyak-zaitun-vs-minyak-bijan-hero.webp';
import pressMinyakZaitunVsMinyakBijanInline from '../../assets/images/press/minyak-zaitun-vs-minyak-bijan-inline.webp';
import pressMinyakZaitunVsMinyakBungaMatahariHero from '../../assets/images/press/minyak-zaitun-vs-minyak-bunga-matahari-hero.webp';
import pressMinyakZaitunVsMinyakBungaMatahariInline from '../../assets/images/press/minyak-zaitun-vs-minyak-bunga-matahari-inline.webp';
import pressOliveOilCoffeeHero from '../../assets/images/press/olive-oil-coffee-hero.webp';
import pressOliveOilCoffeeInline from '../../assets/images/press/olive-oil-coffee-inline.webp';
import pressOliveOilIceCreamHero from '../../assets/images/press/olive-oil-ice-cream-hero.webp';
import pressOliveOilIceCreamInline from '../../assets/images/press/olive-oil-ice-cream-inline.webp';
import pressOliveOilMashedPotatoesHero from '../../assets/images/press/olive-oil-mashed-potatoes-hero.webp';
import pressOliveOilMashedPotatoesInline from '../../assets/images/press/olive-oil-mashed-potatoes-inline.webp';
import pressOliveOilOrangeCakeHero from '../../assets/images/press/olive-oil-orange-cake-hero.webp';
import pressOliveOilOrangeCakeInline from '../../assets/images/press/olive-oil-orange-cake-inline.webp';
import pressOliveOilVsSesameOilHero from '../../assets/images/press/olive-oil-vs-sesame-oil-hero.webp';
import pressOliveOilVsSesameOilInline from '../../assets/images/press/olive-oil-vs-sesame-oil-inline.webp';
import pressOliveOilVsSunflowerOilHero from '../../assets/images/press/olive-oil-vs-sunflower-oil-hero.webp';
import pressOliveOilVsSunflowerOilInline from '../../assets/images/press/olive-oil-vs-sunflower-oil-inline.webp';
import pressAdvantagesOfExtraVirginOliveOilHero from '../../assets/images/press/advantages-of-extra-virgin-olive-oil-hero.webp';
import pressAdvantagesOfExtraVirginOliveOilInline from '../../assets/images/press/advantages-of-extra-virgin-olive-oil-inline.webp';
import pressBestExtraVirginOliveOilInMalaysiaHero from '../../assets/images/press/best-extra-virgin-olive-oil-in-malaysia-hero.webp';
import pressBestExtraVirginOliveOilInMalaysiaInline from '../../assets/images/press/best-extra-virgin-olive-oil-in-malaysia-inline.webp';
import pressCaraMakanMinyakZaitunSetiapHariHero from '../../assets/images/press/cara-makan-minyak-zaitun-setiap-hari-hero.webp';
import pressCaraMakanMinyakZaitunSetiapHariInline from '../../assets/images/press/cara-makan-minyak-zaitun-setiap-hari-inline.webp';
import pressConsumingExtraVirginOliveOilDayToDayHero from '../../assets/images/press/consuming-extra-virgin-olive-oil-day-to-day-hero.webp';
import pressConsumingExtraVirginOliveOilDayToDayInline from '../../assets/images/press/consuming-extra-virgin-olive-oil-day-to-day-inline.webp';
import pressExtraVirginOliveOilInMalaysiaHero from '../../assets/images/press/extra-virgin-olive-oil-in-malaysia-hero.webp';
import pressExtraVirginOliveOilInMalaysiaInline from '../../assets/images/press/extra-virgin-olive-oil-in-malaysia-inline.webp';
import pressExtraVirginOliveOilUsesHero from '../../assets/images/press/extra-virgin-olive-oil-uses-hero.webp';
import pressExtraVirginOliveOilUsesInline from '../../assets/images/press/extra-virgin-olive-oil-uses-inline.webp';
import pressIsItGoodToCookWithExtraVirginOliveOilHero from '../../assets/images/press/is-it-good-to-cook-with-extra-virgin-olive-oil-hero.webp';
import pressIsItGoodToCookWithExtraVirginOliveOilInline from '../../assets/images/press/is-it-good-to-cook-with-extra-virgin-olive-oil-inline.webp';
import pressKelebihanExtraVirginOliveOilBerbandingGredLainHero from '../../assets/images/press/kelebihan-extra-virgin-olive-oil-berbanding-gred-lain-hero.webp';
import pressKelebihanExtraVirginOliveOilBerbandingGredLainInline from '../../assets/images/press/kelebihan-extra-virgin-olive-oil-berbanding-gred-lain-inline.webp';
import pressKelebihanOliveOilUntukDapurHarianHero from '../../assets/images/press/kelebihan-olive-oil-untuk-dapur-harian-hero.webp';
import pressKelebihanOliveOilUntukDapurHarianInline from '../../assets/images/press/kelebihan-olive-oil-untuk-dapur-harian-inline.webp';
import pressMaksudOliveOilDalamBahasaMalaysiaHero from '../../assets/images/press/maksud-olive-oil-dalam-bahasa-malaysia-hero.webp';
import pressMaksudOliveOilDalamBahasaMalaysiaInline from '../../assets/images/press/maksud-olive-oil-dalam-bahasa-malaysia-inline.webp';
import pressMinyakZaitunOriginalCaraPastikanHero from '../../assets/images/press/minyak-zaitun-original-cara-pastikan-hero.webp';
import pressMinyakZaitunOriginalCaraPastikanInline from '../../assets/images/press/minyak-zaitun-original-cara-pastikan-inline.webp';
import pressMinyakZaitunPanduanLengkapHero from '../../assets/images/press/minyak-zaitun-panduan-lengkap-hero.webp';
import pressMinyakZaitunPanduanLengkapInline from '../../assets/images/press/minyak-zaitun-panduan-lengkap-inline.webp';
import pressOliveOilIsItHealthyHero from '../../assets/images/press/olive-oil-is-it-healthy-hero.webp';
import pressOliveOilIsItHealthyInline from '../../assets/images/press/olive-oil-is-it-healthy-inline.webp';
import pressVitaminsInExtraVirginOliveOilHero from '../../assets/images/press/vitamins-in-extra-virgin-olive-oil-hero.webp';
import pressVitaminsInExtraVirginOliveOilInline from '../../assets/images/press/vitamins-in-extra-virgin-olive-oil-inline.webp';
import pressWhichOliveOilToBuyHero from '../../assets/images/press/which-olive-oil-to-buy-hero.webp';
import pressWhichOliveOilToBuyInline from '../../assets/images/press/which-olive-oil-to-buy-inline.webp';
import pressExtraLightOliveOilVsExtraVirginOliveOilHero from '../../assets/images/press/extra-light-olive-oil-vs-extra-virgin-olive-oil-hero.webp';
import pressExtraLightOliveOilVsExtraVirginOliveOilInline from '../../assets/images/press/extra-light-olive-oil-vs-extra-virgin-olive-oil-inline.webp';
import pressOliveOilCaloriesHero from '../../assets/images/press/olive-oil-calories-hero.webp';
import pressOliveOilCaloriesInline from '../../assets/images/press/olive-oil-calories-inline.webp';
import pressOliveOilColorHero from '../../assets/images/press/olive-oil-color-hero.webp';
import pressOliveOilColorInline from '../../assets/images/press/olive-oil-color-inline.webp';
import pressOliveOilVsCanolaOilHero from '../../assets/images/press/olive-oil-vs-canola-oil-hero.webp';
import pressOliveOilVsCanolaOilInline from '../../assets/images/press/olive-oil-vs-canola-oil-inline.webp';
import pressRosemaryInfusedOliveOilHero from '../../assets/images/press/rosemary-infused-olive-oil-hero.webp';
import pressRosemaryInfusedOliveOilInline from '../../assets/images/press/rosemary-infused-olive-oil-inline.webp';
import pressIsOliveOilAVegetableOilHero from '../../assets/images/press/is-olive-oil-a-vegetable-oil-hero.webp';
import pressIsOliveOilAVegetableOilInline from '../../assets/images/press/is-olive-oil-a-vegetable-oil-inline.webp';
import pressOliveOilHarvestSeasonHero from '../../assets/images/press/olive-oil-harvest-season-hero.webp';
import pressOliveOilHarvestSeasonInline from '../../assets/images/press/olive-oil-harvest-season-inline.webp';
import pressOliveOilVarietiesHero from '../../assets/images/press/olive-oil-varieties-hero.webp';
import pressOliveOilVarietiesInline from '../../assets/images/press/olive-oil-varieties-inline.webp';
import pressOliveOilVsGrapeseedOilHero from '../../assets/images/press/olive-oil-vs-grapeseed-oil-hero.webp';
import pressOliveOilVsGrapeseedOilInline from '../../assets/images/press/olive-oil-vs-grapeseed-oil-inline.webp';
import pressOliveOilVsRedPalmOilHero from '../../assets/images/press/olive-oil-vs-red-palm-oil-hero.webp';
import pressOliveOilVsRedPalmOilInline from '../../assets/images/press/olive-oil-vs-red-palm-oil-inline.webp';

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
  pressMinyakZaitunHabbatusSaudaHero,
  pressMinyakZaitunHabbatusSaudaInline,
  pressMinyakZaitunUntukSaladHero,
  pressMinyakZaitunUntukSaladInline,
  pressOliveOilForCookingHero,
  pressOliveOilForCookingInline,
  pressOliveOilSmokePointHero,
  pressOliveOilSmokePointInline,
  pressOliveOilVsPomaceOilHero,
  pressOliveOilVsPomaceOilInline,
  pressZaitunDalamAlQuranHero,
  pressZaitunDalamAlQuranInline,
  pressBotolMinyakZaitunHero,
  pressBotolMinyakZaitunInline,
  pressCaraSimpanMinyakZaitunHero,
  pressCaraSimpanMinyakZaitunInline,
  pressEvooSaladDressingHero,
  pressEvooSaladDressingInline,
  pressEvooVsPureOliveOilHero,
  pressEvooVsPureOliveOilInline,
  pressMinyakZaitunPomaceHero,
  pressMinyakZaitunPomaceInline,
  pressMinyakZaitunUntukGorengHero,
  pressMinyakZaitunUntukGorengInline,
  pressMinyakZaitunVsMinyakMasakHero,
  pressMinyakZaitunVsMinyakMasakInline,
  pressOliveOilAirFryerHero,
  pressOliveOilAirFryerInline,
  pressOliveOilForBreadHero,
  pressOliveOilForBreadInline,
  pressOliveOilMarinadeHero,
  pressOliveOilMarinadeInline,
  pressOliveOilShelfLifeHero,
  pressOliveOilShelfLifeInline,
  pressResepiMinyakZaitunHero,
  pressResepiMinyakZaitunInline,
  pressBeliMinyakZaitunOnlineHero,
  pressBeliMinyakZaitunOnlineInline,
  pressGarlicInfusedOliveOilHero,
  pressGarlicInfusedOliveOilInline,
  pressMinyakZaitunPalsuHero,
  pressMinyakZaitunPalsuInline,
  pressMinyakZaitunTulenHero,
  pressMinyakZaitunTulenInline,
  pressMinyakZaitunUntukKekHero,
  pressMinyakZaitunUntukKekInline,
  pressMinyakZaitunVsMinyakKelapaHero,
  pressMinyakZaitunVsMinyakKelapaInline,
  pressOliveOilBitterTasteHero,
  pressOliveOilBitterTasteInline,
  pressOliveOilBottleSizeHero,
  pressOliveOilBottleSizeInline,
  pressOliveOilForBakingHero,
  pressOliveOilForBakingInline,
  pressOliveOilSubstituteHero,
  pressOliveOilSubstituteInline,
  pressOliveOilVsCoconutOilHero,
  pressOliveOilVsCoconutOilInline,
  pressRasaMinyakZaitunHero,
  pressRasaMinyakZaitunInline,
  pressAglioEOlioHero,
  pressAglioEOlioInline,
  pressCloudyOliveOilHero,
  pressCloudyOliveOilInline,
  pressMinyakZaitunKeruhHero,
  pressMinyakZaitunKeruhInline,
  pressMinyakZaitunUntukAirFryerHero,
  pressMinyakZaitunUntukAirFryerInline,
  pressMinyakZaitunUntukIkanBakarHero,
  pressMinyakZaitunUntukIkanBakarInline,
  pressMinyakZaitunUntukPastaHero,
  pressMinyakZaitunUntukPastaInline,
  pressMinyakZaitunUntukRotiHero,
  pressMinyakZaitunUntukRotiInline,
  pressMinyakZaitunVsMinyakSawitHero,
  pressMinyakZaitunVsMinyakSawitInline,
  pressOliveOilAndBalsamicHero,
  pressOliveOilAndBalsamicInline,
  pressOliveOilForGrillingHero,
  pressOliveOilForGrillingInline,
  pressOliveOilForHummusHero,
  pressOliveOilForHummusInline,
  pressOliveOilVsAvocadoOilHero,
  pressOliveOilVsAvocadoOilInline,
  pressMinyakZaitunMurahHero,
  pressMinyakZaitunMurahInline,
  pressMinyakZaitunPopcornHero,
  pressMinyakZaitunPopcornInline,
  pressMinyakZaitunUntukSayurPanggangHero,
  pressMinyakZaitunUntukSayurPanggangInline,
  pressMinyakZaitunUntukSteakHero,
  pressMinyakZaitunUntukSteakInline,
  pressMinyakZaitunUntukTelurHero,
  pressMinyakZaitunUntukTelurInline,
  pressMinyakZaitunVsMentegaHero,
  pressMinyakZaitunVsMentegaInline,
  pressOliveOilFocacciaHero,
  pressOliveOilFocacciaInline,
  pressOliveOilForSteakHero,
  pressOliveOilForSteakInline,
  pressOliveOilFriedEggHero,
  pressOliveOilFriedEggInline,
  pressOliveOilPopcornHero,
  pressOliveOilPopcornInline,
  pressOliveOilRoastedVegetablesHero,
  pressOliveOilRoastedVegetablesInline,
  pressOliveOilVsButterHero,
  pressOliveOilVsButterInline,
  pressKopiMinyakZaitunHero,
  pressKopiMinyakZaitunInline,
  pressMinyakZaitunAisKrimHero,
  pressMinyakZaitunAisKrimInline,
  pressMinyakZaitunKekOrenHero,
  pressMinyakZaitunKekOrenInline,
  pressMinyakZaitunUntukPizzaHero,
  pressMinyakZaitunUntukPizzaInline,
  pressMinyakZaitunVsMinyakBijanHero,
  pressMinyakZaitunVsMinyakBijanInline,
  pressMinyakZaitunVsMinyakBungaMatahariHero,
  pressMinyakZaitunVsMinyakBungaMatahariInline,
  pressOliveOilCoffeeHero,
  pressOliveOilCoffeeInline,
  pressOliveOilIceCreamHero,
  pressOliveOilIceCreamInline,
  pressOliveOilMashedPotatoesHero,
  pressOliveOilMashedPotatoesInline,
  pressOliveOilOrangeCakeHero,
  pressOliveOilOrangeCakeInline,
  pressOliveOilVsSesameOilHero,
  pressOliveOilVsSesameOilInline,
  pressOliveOilVsSunflowerOilHero,
  pressOliveOilVsSunflowerOilInline,
  pressAdvantagesOfExtraVirginOliveOilHero,
  pressAdvantagesOfExtraVirginOliveOilInline,
  pressBestExtraVirginOliveOilInMalaysiaHero,
  pressBestExtraVirginOliveOilInMalaysiaInline,
  pressCaraMakanMinyakZaitunSetiapHariHero,
  pressCaraMakanMinyakZaitunSetiapHariInline,
  pressConsumingExtraVirginOliveOilDayToDayHero,
  pressConsumingExtraVirginOliveOilDayToDayInline,
  pressExtraVirginOliveOilInMalaysiaHero,
  pressExtraVirginOliveOilInMalaysiaInline,
  pressExtraVirginOliveOilUsesHero,
  pressExtraVirginOliveOilUsesInline,
  pressIsItGoodToCookWithExtraVirginOliveOilHero,
  pressIsItGoodToCookWithExtraVirginOliveOilInline,
  pressKelebihanExtraVirginOliveOilBerbandingGredLainHero,
  pressKelebihanExtraVirginOliveOilBerbandingGredLainInline,
  pressKelebihanOliveOilUntukDapurHarianHero,
  pressKelebihanOliveOilUntukDapurHarianInline,
  pressMaksudOliveOilDalamBahasaMalaysiaHero,
  pressMaksudOliveOilDalamBahasaMalaysiaInline,
  pressMinyakZaitunOriginalCaraPastikanHero,
  pressMinyakZaitunOriginalCaraPastikanInline,
  pressMinyakZaitunPanduanLengkapHero,
  pressMinyakZaitunPanduanLengkapInline,
  pressOliveOilIsItHealthyHero,
  pressOliveOilIsItHealthyInline,
  pressVitaminsInExtraVirginOliveOilHero,
  pressVitaminsInExtraVirginOliveOilInline,
  pressWhichOliveOilToBuyHero,
  pressWhichOliveOilToBuyInline,
  pressExtraLightOliveOilVsExtraVirginOliveOilHero,
  pressExtraLightOliveOilVsExtraVirginOliveOilInline,
  pressOliveOilCaloriesHero,
  pressOliveOilCaloriesInline,
  pressOliveOilColorHero,
  pressOliveOilColorInline,
  pressOliveOilVsCanolaOilHero,
  pressOliveOilVsCanolaOilInline,
  pressRosemaryInfusedOliveOilHero,
  pressRosemaryInfusedOliveOilInline,
  pressIsOliveOilAVegetableOilHero,
  pressIsOliveOilAVegetableOilInline,
  pressOliveOilHarvestSeasonHero,
  pressOliveOilHarvestSeasonInline,
  pressOliveOilVarietiesHero,
  pressOliveOilVarietiesInline,
  pressOliveOilVsGrapeseedOilHero,
  pressOliveOilVsGrapeseedOilInline,
  pressOliveOilVsRedPalmOilHero,
  pressOliveOilVsRedPalmOilInline,
  pressOliveOilPopularityMalaysiaHero,
  pressOliveOilPopularityMalaysiaInline,
  pressEvooHealthBenefitsFamiliesHero,
  pressEvooHealthBenefitsFamiliesInline,
  pressChooseAuthenticEvooMalaysiaHero,
  pressChooseAuthenticEvooMalaysiaInline,
};
