import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsEn from "./locale/translationEn";
import translationsRu from "./locale/translationRu"

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationsEn },
      ru: { translation: translationsRu }
    },
    lng: "ru",
    fallbackLng: "ru",
    interpolation: { escapeValue: false }
  })

export default i18n