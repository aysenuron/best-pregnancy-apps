"use client";
import { useLanguage } from "@/app/context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-gray-200 p-0.5 bg-gray-50 flex-shrink-0">
      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all text-[12px] font-medium leading-none ${
          language === "en"
            ? "bg-white shadow-sm text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="Switch to English"
      >
        <span className="text-[14px]">🇺🇸</span> EN
      </button>
      <button
        onClick={() => setLanguage("es")}
        className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all text-[12px] font-medium leading-none ${
          language === "es"
            ? "bg-white shadow-sm text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="Cambiar a Español"
      >
        <span className="text-[14px]">🇪🇸</span> ES
      </button>
    </div>
  );
}
