"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

export default function Methodology() {
  const { language } = useLanguage();
  const t = translations[language].methodology;

  return (
    <section className="py-10 bg-linear-to-t to-purple-200 from-pink-50" id="methodology">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl mb-8 text-blue-950">{t.title}</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.cards.map((card, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 p-6 bg-white">
              <div className="mb-3 text-blue-700 text-xl">{card.icon}</div>
              <h3 className="font-semibold text-lg text-blue-950 mb-2">{card.title}</h3>
              <p className="text-gray-700 text-sm">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
