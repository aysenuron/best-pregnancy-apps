"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type AppCardProps = {
  name: string;
  rating: string;
  features?: string[];
  uniqueFeatures?: string[];
  missingFeatures?: string[];
  pros?: string[];
  cons?: string[];
  screenshot: string;
  adoptionRate?: number;
  link: string;
  btnId: string;
  coverageLabel?: string;
  keyFeaturesLabel?: string;
  standoutFeaturesLabel?: string;
  notAvailableLabel?: string;
  strengthsLabel?: string;
  limitationsLabel?: string;
  downloadLabel?: string;
};

export function AppCard({
  name,
  rating,
  screenshot,
  features = [],
  uniqueFeatures = [],
  missingFeatures = [],
  pros = [],
  cons = [],
  adoptionRate,
  link,
  btnId,
  coverageLabel = "coverage",
  keyFeaturesLabel = "Key Features",
  standoutFeaturesLabel = "Standout Features",
  notAvailableLabel = "Not Available",
  strengthsLabel = "Strengths",
  limitationsLabel = "Limitations",
  downloadLabel = "Download",
}: AppCardProps) {
  const [finalLink, setFinalLink] = useState(link);
  const FALLBACK = "https://app.cubtale.com/VTch/pregnancy";

  useEffect(() => {
    if (name !== "Cubtale Pregnancy") return;

    let attempts = 0;
    const MAX_ATTEMPTS = 40;

    function waitForAF(cb: () => void) {
      if ((window as any).AF_SMART_SCRIPT) return cb();
      if (++attempts >= MAX_ATTEMPTS) {
        setFinalLink(FALLBACK);
        return;
      }
      setTimeout(() => waitForAF(cb), 50);
    }

    waitForAF(() => { 
      const result = (window as any).AF_SMART_SCRIPT.generateOneLinkURL({
        oneLinkURL: "https://app.cubtale.com/VTch",
        afParameters: {
          mediaSource: { keys: ["utm_source", "cub_src"], defaultValue: "bestpregnancyapp_web" },
          campaign: { keys: ["utm_campaign", "cub_cmp"], defaultValue: "Pregnancy" },
          channel: { keys: ["utm_channel", "cub_chn"], defaultValue: "bestpregnancyapp_web_channel" },
          ad: { keys: ["utm_ad", "cub_ad"], defaultValue: "bestpregnancyapp_web_ad" },
          adSet: { keys: ["utm_adset", "cub_adset"], defaultValue: "bestpregnancyapp_web_adset" },
          afSub1: { keys: ["googleClickIdKey"], defaultValue: "gclid" },
          afSub2: { keys: ["fbclid"] },
          afSub3: { keys: ["gbraid"] },
          afSub4: { keys: ["wbraid"] },
          afSub5: { keys: ["cubby"] },
          deepLinkValue: { keys: ["utm_dp", "cub_dp"], defaultValue: "pregnancy_web" },
          webReferrer: "true",
          afCustom: [
            { paramKey: "af_ss_ui", defaultValue: "true" },
            { paramKey: "af_c_id", keys: ["utm_id"] },
            { paramKey: "af_android_store_csl", defaultValue: "pregnancy" },
            { paramKey: "af_ios_store_cpp", defaultValue: "16b7139e-7c0d-46d8-892a-4919486526c6" },
          ]
        },
      });
      if (result && result.clickURL) {
        console.log("Smart Script URL Generated:", result.clickURL);

        setFinalLink(result?.clickURL || FALLBACK);

        // Optional: Fire impression
        setTimeout(() => {
          if ((window as any).AF_SMART_SCRIPT.fireImpressionsLink) {
            (window as any).AF_SMART_SCRIPT.fireImpressionsLink();
          }
        }, 1000); // Small delay to ensure impression link is ready
      }
    });
  }, [name]);

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="bg-linear-to-br from-slate-50 via-indigo-50 to-stone-50 py-4">
        <CardTitle className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{name}</span>
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-2xl font-bold text-gray-900">{rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
            {adoptionRate !== undefined && (
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>{adoptionRate}% {coverageLabel}</span>
              </div>
            )}

            {name === "Cubtale Pregnancy" && (
              <Button asChild>
                <a
                  id={btnId}
                  href={finalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {downloadLabel}
                </a>
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 p-6">
        <div className="relative mx-auto h-54 lg:h-60 w-full overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={screenshot}
            alt={`${name} app screenshot`}
            fill
            className="w-full"
          />
        </div>

        {/* Key Features */}
        {features.length > 0 && (
          <div>
            <h3 className="mb-3 text-lg font-bold flex items-center gap-2 text-gray-900">
              <div className="w-1 h-5 bg-gray-600 rounded-full"></div>
              {keyFeaturesLabel}
            </h3>
            <ul className="space-y-2 text-sm">
              {features.map((feature, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <div className="mt-0.5 shrink-0">
                    <Check className="w-4 h-4 text-gray-600" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Unique Features */}
        {uniqueFeatures.length > 0 && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="mb-3 text-lg font-bold text-blue-900 flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
              {standoutFeaturesLabel}
            </h3>
            <ul className="space-y-2 text-sm">
              {uniqueFeatures.map((feature, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span className="text-blue-900 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Features */}
        {missingFeatures.length > 0 && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h3 className="mb-3 text-lg font-bold text-amber-900 flex items-center gap-2">
              <div className="w-1 h-5 bg-amber-500 rounded-full"></div>
              {notAvailableLabel}
            </h3>
            <ul className="space-y-2 text-sm">
              {missingFeatures.map((feature, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <div className="mt-0.5 shrink-0">
                    <X className="w-4 h-4 text-amber-600" strokeWidth={3} />
                  </div>
                  <span className="text-amber-900">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pros */}
        {pros.length > 0 && (
          <div>
            <h3 className="mb-3 text-lg font-bold flex items-center gap-2 text-gray-900">
              <div className="w-1 h-5 bg-green-600 rounded-full"></div>
              {strengthsLabel}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {pros.map((pro, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="text-green-600 font-bold text-lg flex-shrink-0">
                    +
                  </span>
                  <span className="text-gray-700 leading-relaxed">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cons */}
        {cons.length > 0 && (
          <div>
            <h3 className="mb-3 text-lg font-bold flex items-center gap-2 text-gray-900">
              <div className="w-1 h-5 bg-red-500 rounded-full"></div>
              {limitationsLabel}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {cons.map((con, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="text-red-500 font-bold text-lg shrink-0">
                    −
                  </span>
                  <span className="text-gray-700 leading-relaxed">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
