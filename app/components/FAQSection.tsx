"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = translations[language].faq;

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 px-4 bg-linear-to-b to-pink-50 from-indigo-50" id="faq">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-blue-950">{t.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {t.items.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow duration-200"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full cursor-pointer px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-base font-medium md:text-md text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
          <h3 className="text-xl font-bold text-blue-950 mb-2">{t.stillHaveQuestions}</h3>
          <p className="text-gray-700 mb-4">{t.updatedNote}</p>
          <p className="text-sm text-gray-600">
            <strong className="text-blue-950">{t.disclaimerLabel}</strong>{" "}
            {t.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
