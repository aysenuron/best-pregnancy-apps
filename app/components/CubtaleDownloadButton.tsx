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

    // Get utm_source and utm_campaign from the URL 
    const utmSource = new URLSearchParams(window.location.search).get("utm_source");
    const utmCampaign = new URLSearchParams(window.location.search).get("utm_campaign");

    // Set google click id key to af_sub1
    const googleClickIdKey = "af_sub1";
    // Set fbclid to af_sub2
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    // Set gbraid to af_sub3
    const gbraid = new URLSearchParams(window.location.search).get("gbraid");
    const gbraid_out = { paramKey: "gbraid", keys: ["gbraid"] };
    // Set wbraid to af_sub4
    const wbraid = new URLSearchParams(window.location.search).get("wbraid");
    const wbraid_out = { paramKey: "wbraid", keys: ["wbraid"] };
    const custom_ss_ui = new URLSearchParams(window.location.search).get("custom_ss_ui");

    waitForAF(() => {
      const result = (window as any).AF_SMART_SCRIPT.generateOneLinkURL({
        oneLinkURL: FALLBACK,
        afParameters: {
          mediaSource: { keys: ["utm_source"], defaultValue: utmSource || "bestpregnancyapp_web" },
          campaign: { keys: ["utm_campaign"], defaultValue: utmCampaign || "Pregnancy" },
          channel : { keys: ["utm_channel", "incoming_channel"], defaultValue: "bestpregnancyapp_web_channel" },
          ad: { keys: ["utm_ad", "incoming_ad"], defaultValue: "bestpregnancyapp_web_ad" },
          adSet: { keys: ["utm_adset", "incoming_adset"], defaultValue: "bestpregnancyapp_web_adset" },
          afSub1: googleClickIdKey,
          afSub2: { keys: ["fbclid"], defaultValue: fbclid || "" },
          afSub3: { keys: ["gbraid"], defaultValue: gbraid || "" },
          afSub4: { keys: ["wbraid"], defaultValue: wbraid || "" },
          afCustom: [
            custom_ss_ui,
            wbraid_out,
            gbraid_out
          ]
        },
      });
      setLink(result?.clickURL || FALLBACK);
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
