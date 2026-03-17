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
          mediaSource: { keys: ["utm_source"], defaultValue: "Organic" },
          campaign: { keys: ["utm_campaign"], defaultValue: "Organic" },
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
