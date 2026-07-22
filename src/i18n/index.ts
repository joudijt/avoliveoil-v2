import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import ar from './locales/ar/common.json';
import ms from './locales/ms/common.json';

export const SUPPORTED_LANGS = ['en', 'ar', 'ms'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    ar: { common: ar },
    ms: { common: ms },
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
