"use client";

import { useEffect } from "react";
import {
  isLandingVariant,
  LANDING_EXPERIMENT_COOKIE,
  LANDING_EXPERIMENT_ID,
  type LandingVariant,
} from "@/app/lib/landing-experiment";

type EventParameters = {
  experiment_id: string;
  variant: LandingVariant;
  link_id?: string;
};
type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, parameters: EventParameters) => void;
  dataLayer?: unknown[];
  __landingExperimentExposure?: string;
  __landingExperimentImpressions?: Set<string>;
};

function currentVariant(): LandingVariant | null {
  if (window.location.pathname !== "/") return null;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LANDING_EXPERIMENT_COOKIE}=`))
    ?.slice(LANDING_EXPERIMENT_COOKIE.length + 1);
  const renderedVariant = document.querySelector("main[data-landing-variant]")
    ?.getAttribute("data-landing-variant");
  // A stale cookie, a direct preview, or an unassigned request is not an exposure.
  return isLandingVariant(cookie) && cookie === renderedVariant ? cookie : null;
}

function track(eventName: string, parameters: EventParameters) {
  const analytics = window as AnalyticsWindow;
  if (typeof analytics.gtag === "function") {
    analytics.gtag("event", eventName, parameters);
    return;
  }
  // Match the existing Google tag's arguments queue while its script initializes.
  analytics.dataLayer = analytics.dataLayer || [];
  function queue(...args: unknown[]) {
    void args;
    analytics.dataLayer!.push(arguments);
  }
  queue("event", eventName, parameters);
}

function ctaLinkId(link: HTMLAnchorElement): string | null {
  let destination: URL;
  try {
    destination = new URL(link.href, window.location.origin);
  } catch {
    return null;
  }
  if (destination.protocol !== "https:") return null;
  const host = destination.hostname;
  if (host === "a.cubtale.link" && destination.pathname === "/free_pump_bestpregnancy") {
    return "free-pump-btn";
  }
  if (host === "app.cubtale.com" || host === "a.cubtale.link" || host === "cubtale.onelink.me") {
    // Only fixed IDs are sent, never arbitrary DOM text or tracking URLs.
    const knownIds = [
      "quick-answer-download-btn",
      "cubtale-btn",
      "sticky-cubtale-download-btn",
      "redesign-cubtale-download-btn",
      "cubtale-app-store-btn",
      "cubtale-google-play-btn",
    ];
    return knownIds.includes(link.id) ? link.id : "cubtale-download";
  }
  if (host === "apps.apple.com") return "app-store-install";
  if (host === "play.google.com") return "google-play-install";
  return null;
}

export function LandingExperimentAnalytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const variant = currentVariant();
    if (!variant) return;
    const analytics = window as AnalyticsWindow;
    if (analytics.__landingExperimentExposure !== LANDING_EXPERIMENT_ID) {
      track("landing_experiment_exposure", {
        experiment_id: LANDING_EXPERIMENT_ID,
        variant,
      });
      analytics.__landingExperimentExposure = LANDING_EXPERIMENT_ID;
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const activeVariant = currentVariant();
      const linkId = ctaLinkId(link);
      if (!activeVariant || !linkId) return;
      track("landing_experiment_cta_click", {
        experiment_id: LANDING_EXPERIMENT_ID,
        variant: activeVariant,
        link_id: linkId,
      });
    }
    document.addEventListener("click", onClick);

    let visibilityObserver: IntersectionObserver | undefined;
    let mutationObserver: MutationObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      const impressions = analytics.__landingExperimentImpressions ??= new Set();
      const observed = new WeakSet<HTMLAnchorElement>();
      visibilityObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
          const link = entry.target as HTMLAnchorElement;
          const activeVariant = currentVariant();
          const linkId = ctaLinkId(link);
          if (!activeVariant || !linkId) continue;
          const key = `${LANDING_EXPERIMENT_ID}:${activeVariant}:${linkId}`;
          if (!impressions.has(key)) {
            track("landing_experiment_cta_impression", {
              experiment_id: LANDING_EXPERIMENT_ID,
              variant: activeVariant,
              link_id: linkId,
            });
            impressions.add(key);
          }
          visibilityObserver?.unobserve(link);
        }
      }, { threshold: 0.5 });

      function observeLinks() {
        for (const link of document.querySelectorAll<HTMLAnchorElement>("a[href]")) {
          if (observed.has(link) || !ctaLinkId(link)) continue;
          observed.add(link);
          visibilityObserver?.observe(link);
        }
      }
      observeLinks();
      // The country-specific sticky offer is inserted after its lookup completes.
      if (typeof MutationObserver !== "undefined") {
        mutationObserver = new MutationObserver(observeLinks);
        mutationObserver.observe(document.body, { childList: true, subtree: true });
      }
    }

    return () => {
      document.removeEventListener("click", onClick);
      visibilityObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [enabled]);

  return null;
}
