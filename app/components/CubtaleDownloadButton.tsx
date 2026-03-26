"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function CubtaleDownloadButton({ id }: { id: string }) {
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
        oneLinkURL: FALLBACK,
        afParameters: {
          mediaSource: { keys: ["utm_source"], defaultValue: "bestpregnancyapp_web" },
          campaign: { keys: ["utm_campaign"], defaultValue: "Pregnancy" },
          channel: { keys: ["utm_channel"], defaultValue: "bestpregnancyapp_web_channel" },
          ad: { keys: ["utm_ad"], defaultValue: "bestpregnancyapp_web_ad" },
          adSet: { keys: ["utm_adset"], defaultValue: "bestpregnancyapp_web_adset" },
          afSub1: { keys: ["googleClickIdKey"] },
          afSub2: { keys: ["fbclid"] },
          afSub3: { keys: ["gbraid"] },
          afSub4: { keys: ["wbraid"] },
          afSub5: { keys: ["cubby"] },
          deepLinkValue: { keys: ["utm_dp"], defaultValue: "pregnancy_web" },
          webReferrer: "true",
          afCustom: [
            { paramKey: "af_ss_ui", defaultValue: "true" },
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
    <Button asChild>
      <a id={id} href={link} target="_blank" rel="noopener noreferrer">
        Download
      </a>
    </Button>
  );
}
