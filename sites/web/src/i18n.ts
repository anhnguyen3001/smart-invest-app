import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LANG_RESOURCES, DEFAULT_LANG } from "src/constants";
import { getLanguage } from "src/helpers";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: LANG_RESOURCES,
    lng: getLanguage(),
    fallbackLng: DEFAULT_LANG,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
