import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(Backend) // Instructs i18next to load JSON files from public/locales
    .use(LanguageDetector) // Automatically detects the user's browser language
    .use(initReactI18next) // Passes the i18n instance to React
    .init({
        fallbackLng: "en", // If a translation is missing, it will use English
        debug: true, // This will print helpful loading messages in your browser console

        interpolation: {
            escapeValue: false, // React already protects against XSS, so this is safe
        },
    });

export default i18n;
