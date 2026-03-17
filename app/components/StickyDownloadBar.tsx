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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-purple-500 shadow-lg">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full py-4 text-white font-semibold text-lg hover:bg-purple-600 transition-colors"
      >
        🤍 Download Cubtale
      </a>
    </div>
  );
}
