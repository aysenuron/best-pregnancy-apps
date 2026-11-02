// Shared review order, scores, images and destinations for both landing designs.
export const APP_ORDER = [
  "Cubtale Pregnancy",
  "BabyCenter",
  "Flo",
  "Ovia",
  "Pregnancy+",
  "What to Expect",
] as const;

export const APP_META: Record<string, { rating: string; adoptionRate?: number; screenshot: string; link: string; btnId: string }> = {
  "Cubtale Pregnancy": { rating: "10/10", adoptionRate: 90, screenshot: "/screenshots/cubtale.jpg",          link: "https://app.cubtale.com/VTch/pregnancy",       btnId: "cubtale-btn" },
  BabyCenter:      { rating: "8/10",  adoptionRate: 67, screenshot: "/screenshots/babycenter.jpg",       link: "https://www.babycenter.com/",                btnId: "babycenter-btn" },
  Flo:             { rating: "7/10",  adoptionRate: 63, screenshot: "/screenshots/flo.png",              link: "https://flo.health/",                        btnId: "flo-btn" },
  Ovia:            { rating: "6/10",                    screenshot: "/screenshots/ovia.jpg",             link: "https://www.oviahealth.com/",                btnId: "ovia-btn" },
  "Pregnancy+":    { rating: "6/10",  adoptionRate: 60, screenshot: "/screenshots/pregnancy-plus.jpg",  link: "https://philips-digital.com/pregnancy-new/", btnId: "pregnancyplus-btn" },
  "What to Expect":{ rating: "5/10",  adoptionRate: 60, screenshot: "/screenshots/what-to-expect.jpg",  link: "https://www.whattoexpect.com/",              btnId: "expect-btn" },
};

