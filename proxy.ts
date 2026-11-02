import { NextRequest, NextResponse } from "next/server";
import {
  chooseLandingVariant,
  getRedesignPercentage,
  isLandingVariant,
  LANDING_EXPERIMENT_COOKIE,
  LANDING_EXPERIMENT_ID,
  LANDING_VARIANT_PATH,
} from "./app/lib/landing-experiment";

// Next.js 16 calls this convention proxy.ts (previously middleware.ts).
export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname !== "/" ||
    process.env.LANDING_AB_TEST_ENABLED !== "true" ||
    request.method !== "GET" ||
    /bot|crawler|spider|slurp|facebookexternalhit|bingpreview/i.test(
      request.headers.get("user-agent") ?? "",
    ) ||
    request.headers.has("next-router-prefetch") ||
    request.headers.get("purpose") === "prefetch"
  ) {
    return NextResponse.next();
  }

  const existingVariant = request.cookies.get(LANDING_EXPERIMENT_COOKIE)?.value;
  const variant = chooseLandingVariant(
    existingVariant,
    getRedesignPercentage(process.env.LANDING_AB_TEST_REDESIGN_PERCENTAGE),
    Math.random(),
  );
  const destination = request.nextUrl.clone();
  if (variant === "redesign") destination.pathname = LANDING_VARIANT_PATH;

  const response = variant === "redesign"
    ? NextResponse.rewrite(destination)
    : NextResponse.next();

  response.headers.set("x-landing-experiment", LANDING_EXPERIMENT_ID);
  response.headers.set("x-landing-variant", variant);
  // Next can replace Cache-Control when serving a rewritten static page.
  // Target CDN caches explicitly so that cannot cache a visitor's assignment.
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  if (!isLandingVariant(existingVariant)) {
    response.cookies.set(LANDING_EXPERIMENT_COOKIE, variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      // Readable by the existing analytics integration for exposure/conversion tags.
      httpOnly: false,
    });
  }
  return response;
}

export const config = { matcher: ["/"] };
