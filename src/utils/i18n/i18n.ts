import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./translations/en/translation.json";
import translationKo from "./translations/ko/translation.json";
import translationTh from "./translations/th/translation.json";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: translationEn },
      ko: { translation: translationKo },
      th: { translation: translationTh },
    },
    lng: "en", 
    fallbackLng: "en", 
    interpolation: { escapeValue: false },
  });

export default i18n;
