"use client";

import { useEffect, useState } from "react";

const FALLBACK = "https://app.cubtale.com/VTch/pregnancy";

type AppsFlyerScript = {
  generateOneLinkURL: (options: {
    oneLinkURL: string;
    afParameters: Record<string, unknown>;
  }) => { clickURL?: string } | null;
  fireImpressionsLink?: () => void;
};

export function LegacyDownloadBar({ track = true }: { track?: boolean }) {
  const [link, setLink] = useState(FALLBACK);

  useEffect(() => {
    if (!track) return;
    let attempts = 0;
    let pollTimer: number | undefined;
    let impressionTimer: number | undefined;

    function waitForAF() {
      const script = (window as Window & { AF_SMART_SCRIPT?: AppsFlyerScript }).AF_SMART_SCRIPT;
      if (!script) {
        if (++attempts < 40) pollTimer = window.setTimeout(waitForAF, 50);
        return;
      }

      try {
        const result = script.generateOneLinkURL({
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
            ],
          },
        });

        if (result?.clickURL) {
          setLink(result.clickURL);
          impressionTimer = window.setTimeout(() => script.fireImpressionsLink?.(), 500);
        }
      } catch {
        // The original fallback remains usable if AppsFlyer fails.
      }
    }

    waitForAF();
    return () => {
      window.clearTimeout(pollTimer);
      window.clearTimeout(impressionTimer);
    };
  }, [track]);

  return (
    <>
      <div className="download-bar-spacer" aria-hidden="true" />
      <aside aria-label="Download Cubtale" className="download-bar fixed inset-x-0 bottom-0 z-50 bg-purple-500 shadow-lg">
        <a
          href={link}
          id="sticky-cubtale-download-btn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center py-4 text-lg font-semibold text-white transition-colors hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        >
          🤍 Download Cubtale
        </a>
      </aside>
    </>
  );
}
