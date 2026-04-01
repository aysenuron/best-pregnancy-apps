"use client";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

export function ChartSaveSection() {
  const { language } = useLanguage();
  const t = translations[language].chartSection;

  return (
    <section className="bg-indigo-50 py-10 overflow-hidden">
      <div className="container lg:mx-auto px-5">
        <div className="text-center mb-4">
          <h2 className="text-4xl mb-4 text-blue-950">{t.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="relative w-full lg:w-1/2 mx-auto aspect-[16/9]">
          <Image
            src="/pregnancy-apps-comparison-chart.jpg"
            alt={t.imgAlt}
            fill
            className="object-contain rounded-xl shadow-md"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
