"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { LegacyDownloadBar } from "./LegacyDownloadBar";
// import { useEffect, useState } from "react";

const FREE_PUMP_URL =
  "https://cubtale.covermypregnancy.com/get-started?utm_source=cubtale&utm_medium=web&utm_campaign=bestpregnancyapp";

export function StickyDownloadBar() {
  const [showPumpOffer, setShowPumpOffer] = useState<boolean | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeout = window.setTimeout(() => controller.abort(), 2500);

    async function detectCountry() {
      try {
        const response = await fetch("/api/visitor-country", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Country lookup failed");
        const result = await response.json();
        if (!disposed) setShowPumpOffer(result.showPumpOffer === true);
      } catch {
        // Unknown locations and network errors always get the app download.
        if (!disposed) setShowPumpOffer(false);
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void detectCountry();
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  if (showPumpOffer === null) {
    return (
      <>
        {/* Avoid flashing the wrong CTA while the country is being resolved. */}
        <div className="pump-bar-spacer" aria-hidden="true" />
        <noscript><LegacyDownloadBar track={false} /></noscript>
      </>
    );
  }

  return showPumpOffer ? <PumpOfferBar /> : <LegacyDownloadBar />;
}

function PumpOfferBar() {
  /* AppsFlyer download-link generation preserved for future use.
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
  */

  return (
    <>
      {/* Reserve space so the fixed bar never covers the footer. */}
      <div className="pump-bar-spacer" aria-hidden="true" />
      <aside
        aria-label="Free breast pump offer"
        className="pump-bar fixed inset-x-0 bottom-0 z-50 border-t border-purple-200/70 bg-gradient-to-r from-purple-50 via-white to-purple-50 shadow-[0_-8px_32px_rgba(88,28,135,0.08)]"
      >
        <div className="pump-bar-content mx-auto flex min-h-22 max-w-5xl items-center gap-3 px-4 py-3 sm:min-h-27 sm:gap-5 sm:px-6">
          <Image
            src="/breast-pump.webp"
            alt=""
            width={88}
            height={88}
            sizes="88px"
            className="hidden h-22 w-22 shrink-0 object-contain sm:block"
          />
          <div className="hidden flex-1 md:block">
            <p className="mb-1 text-xs font-semibold tracking-widest text-purple-700 uppercase">
              For your next chapter
            </p>
            <p className="text-lg font-semibold leading-snug text-blue-950">
              A little support for your feeding journey.
            </p>
          </div>
          <a
            href={FREE_PUMP_URL}
            id="free-pump-btn"
            target="_blank"
            rel="noopener noreferrer"
            className="pump-bar-cta group flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-purple-600 px-4 py-3 text-center text-sm font-semibold leading-snug text-white shadow-[0_4px_14px_rgba(147,51,234,0.24)] transition-colors hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700 sm:ml-auto sm:flex-none sm:px-6 sm:text-base"
          >
            <span className="pump-bar-mobile-icon hidden" aria-hidden="true">
              <Image
                src="/breast-pump.webp"
                alt=""
                width={64}
                height={64}
                sizes="64px"
                className="h-16 w-16 object-contain"
              />
            </span>
            <span className="pump-bar-cta-label">Get Your Free Pump Today</span>
            <ArrowRight
              aria-hidden="true"
              size={18}
              className="shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
            />
          </a>
        </div>
      </aside>
    </>
  );
}
