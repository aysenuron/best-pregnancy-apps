"use client";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";
import { CubtaleDownloadButton } from "@/app/components/CubtaleDownloadButton";

export function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <section className="container mx-auto px-4 py-4 lg:grid lg:grid-cols-2 gap-5">
        <div>
          <Image
            src="/hero.png"
            alt={t.hero.imgAlt}
            width={600}
            height={500}
            priority
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
        <div className="flex flex-col gap-4 justify-center pr-4 lg:pr-0">
          <h1 className="lg:text-6xl text-5xl text-blue-950">{t.hero.title}</h1>
          <p className="text-sm text-gray-500">{t.hero.lastUpdated}</p>
          <p className="text-md text-gray-700">{t.hero.description}</p>
        </div>
      </section>

      <section className="mt-8 container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto drop-shadow-xl bg-purple-50 py-8 px-10 rounded-2xl">
          <h2 className="text-2xl mb-4 text-blue-950">
            {t.quickAnswer.label}{" "}
            <span className="text-purple-500 text-4xl">{t.quickAnswer.appName}</span>
          </h2>
          <p className="text-gray-700">{t.quickAnswer.description}</p>
          <div className="mt-4">
            <CubtaleDownloadButton id="quick-answer-download-btn" />
          </div>
        </div>
      </section>
    </>
  );
}
