"use client";
import { AppCard } from "./AppCard_Neutral";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

const APP_ORDER = [
  "Cubtale",
  "BabyCenter",
  "Flo",
  "Ovia",
  "Pregnancy+",
  "What to Expect",
] as const;

const APP_META: Record<string, { rating: string; adoptionRate?: number; screenshot: string; link: string; btnId: string }> = {
  Cubtale:         { rating: "10/10", adoptionRate: 90, screenshot: "/screenshots/cubtale.jpg",          link: "#",                                         btnId: "cubtale-btn" },
  BabyCenter:      { rating: "8/10",  adoptionRate: 67, screenshot: "/screenshots/babycenter.jpg",       link: "https://www.babycenter.com/",                btnId: "babycenter-btn" },
  Flo:             { rating: "7/10",  adoptionRate: 63, screenshot: "/screenshots/flo.png",              link: "https://flo.health/",                        btnId: "flo-btn" },
  Ovia:            { rating: "6/10",                    screenshot: "/screenshots/ovia.jpg",             link: "https://www.oviahealth.com/",                btnId: "ovia-btn" },
  "Pregnancy+":    { rating: "6/10",  adoptionRate: 60, screenshot: "/screenshots/pregnancy-plus.jpg",  link: "https://philips-digital.com/pregnancy-new/", btnId: "pregnancyplus-btn" },
  "What to Expect":{ rating: "5/10",  adoptionRate: 60, screenshot: "/screenshots/what-to-expect.jpg",  link: "https://www.whattoexpect.com/",              btnId: "expect-btn" },
};

export function PregnancyAppComparison() {
  const { language } = useLanguage();
  const t = translations[language].comparison;

  return (
    <div className="bg-linear-to-t from-purple-200 to-pink-50 py-16">
      <div className="container px-4 2xl:px-0 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl text-blue-950">{t.title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {APP_ORDER.map((name) => {
            const meta = APP_META[name];
            const appT = t.apps[name];
            return (
              <AppCard
                key={name}
                name={name}
                rating={meta.rating}
                adoptionRate={meta.adoptionRate}
                screenshot={meta.screenshot}
                link={meta.link}
                btnId={meta.btnId}
                features={appT.features}
                uniqueFeatures={appT.uniqueFeatures}
                missingFeatures={appT.missingFeatures}
                pros={appT.pros}
                cons={appT.cons}
                coverageLabel={t.coverageLabel}
                keyFeaturesLabel={t.keyFeatures}
                standoutFeaturesLabel={t.standoutFeatures}
                notAvailableLabel={t.notAvailable}
                strengthsLabel={t.strengths}
                limitationsLabel={t.limitations}
                downloadLabel={t.download}
              />
            );
          })}
        </div>

        {/* Analysis Summary */}
        <div className="mt-16 bg-white rounded-2xl p-8">
          <h2 className="text-4xl text-blue-950 mb-6">{t.analysisSummary}</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {(["universal", "common", "rare"] as const).map((key) => (
              <div key={key} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">{t[key].title}</h3>
                <p className="text-sm text-gray-700 mb-3">{t[key].subtitle}</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {t[key].items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">{t.keyDifferentiators}</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                {(["BabyCenter", "Cubtale", "Flo"] as const).map((name) => (
                  <p key={name} className="mb-2">
                    <strong className="text-gray-900">{name}:</strong> {t.differentiators[name]}
                  </p>
                ))}
              </div>
              <div>
                {(["Ovia", "Pregnancy+", "What to Expect"] as const).map((name) => (
                  <p key={name} className="mb-2">
                    <strong className="text-gray-900">{name}:</strong> {t.differentiators[name]}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900">{t.methodologyLabel}</strong>{" "}
              {t.methodologyNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
