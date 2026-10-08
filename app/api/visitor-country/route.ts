// Country is request-specific; never prerender or share this response in a cache.
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return Response.json(
    { showPumpOffer: request.headers.get("x-vercel-ip-country") === "US" },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
