import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import translationEn from "./locales/en/translation.json";
import translationRu from "./locales/ru/translation.json";

export const defaultNS = "translation";
export const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
} as const;

declare module "i18next" {
  interface CustomTypeOptions {
    // returnNull: false;
    defaultNS: typeof defaultNS;
    resources: typeof resources["en"];
  }
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ns: ["translationEn", "translationRu"],
    defaultNS,
    resources,
    debug: false,
    fallbackLng: 'en'
  });

export default i18next