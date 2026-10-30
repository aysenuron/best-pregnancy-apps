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
      <section className="container mx-auto grid grid-cols-[minmax(0,1fr)_96px] items-center gap-x-3 gap-y-3 px-4 py-5 sm:grid-cols-[minmax(0,1fr)_144px] lg:grid-cols-2 lg:gap-5 lg:py-4">
        <div className="max-lg:order-2">
          <Image
            src="/hero.png"
            alt={t.hero.imgAlt}
            width={600}
            height={500}
            priority
            sizes="(max-width: 639px) 96px, (max-width: 1023px) 144px, 600px"
            className="h-auto w-full lg:w-auto"
          />
        </div>
        <div className="contents lg:flex lg:flex-col lg:justify-center lg:gap-4">
          <h1 className="text-[1.75rem] leading-tight tracking-tight text-blue-950 max-lg:order-1 sm:text-4xl lg:text-6xl lg:leading-none lg:tracking-normal">
            {t.hero.title}
          </h1>
          <div className="col-span-2 flex flex-wrap gap-x-3 gap-y-1 max-lg:order-3 lg:contents">
            <p className="text-xs text-gray-500 lg:text-sm">{t.hero.lastUpdated}</p>
            <p className="text-xs text-gray-600 lg:text-sm">{t.hero.author}</p>
          </div>
          <p className="col-span-2 text-sm text-gray-700 max-lg:order-4 lg:hidden">
            {t.hero.summary}
          </p>
          <p className="hidden text-md text-gray-700 lg:block">{t.hero.description}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-4 lg:mt-8 lg:pt-4">
        <div className="mx-auto max-w-2xl rounded-2xl bg-purple-50 px-5 py-5 shadow-sm lg:px-10 lg:py-8 lg:shadow-none lg:drop-shadow-xl">
          <h2 className="mb-3 text-base text-blue-950 lg:mb-4 lg:text-2xl">
            {t.quickAnswer.label}{" "}
            <span className="mt-1 block text-2xl leading-tight text-purple-500 lg:mt-0 lg:inline lg:text-4xl lg:leading-10">{t.quickAnswer.appName}</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 lg:text-base lg:leading-normal">{t.quickAnswer.description}</p>
          <div className="mt-4">
            <CubtaleDownloadButton id="quick-answer-download-btn" />
          </div>
        </div>
        <details className="mx-auto mt-4 max-w-2xl text-sm text-gray-700 lg:hidden">
          <summary className="min-h-11 cursor-pointer py-3 text-blue-950">
            {t.hero.methodologyLabel}
          </summary>
          <p className="pb-3 leading-relaxed">{t.hero.description}</p>
        </details>
      </section>
    </>
  );
}
