export const LANDING_EXPERIMENT_COOKIE = "pregnancy_landing_v1";
export const LANDING_EXPERIMENT_ID = "landing-design-v1";
export const LANDING_VARIANT_PATH = "/homepage";
export type LandingVariant = "original" | "redesign";

export function isLandingVariant(value: string | undefined): value is LandingVariant {
  return value === "original" || value === "redesign";
}

/** Invalid configuration fails closed, leaving the original landing page in place. */
export function getRedesignPercentage(value: string | undefined): number {
  if (value === undefined || value === "") return 50;
  const percentage = Number(value);
  return Number.isFinite(percentage) && percentage >= 0 && percentage <= 100
    ? percentage
    : 0;
}

export function chooseLandingVariant(
  cookie: string | undefined,
  percentage: number,
  random: number,
): LandingVariant {
  if (isLandingVariant(cookie)) return cookie;
  return random < percentage / 100 ? "redesign" : "original";
}
