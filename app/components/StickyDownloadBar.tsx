"use client";
import { useEffect, useState } from "react";

export function StickyDownloadBar() {
  const FALLBACK = "https://app.cubtale.com/VTch/pregnancy";
  const [link, setLink] = useState(FALLBACK);

  useEffect(() => {
    let attempts = 0;
    const MAX_ATTEMPTS = 40;

    function waitForAF(cb: () => void) {
      if ((window as any).AF_SMART_SCRIPT) return cb();
      if (++attempts >= MAX_ATTEMPTS) {
        setLink(FALLBACK);
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

        setLink(result?.clickURL || FALLBACK);
        // Optional: Fire impression
        setTimeout(() => {
          if ((window as any).AF_SMART_SCRIPT.fireImpressionsLink) {
            (window as any).AF_SMART_SCRIPT.fireImpressionsLink();
          }
        }, 500); // Small delay to ensure impression link is ready
      }
    });
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-purple-500 shadow-lg">
      <a
        href={link}
        id="cubtale-btn"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full py-4 text-white font-semibold text-lg hover:bg-purple-600 transition-colors"
      >
        🤍 Download Cubtale
      </a>
    </div>
  );
}
