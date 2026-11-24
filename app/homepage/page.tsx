import type { Metadata } from "next";
import { EditorialLanding } from "./EditorialLanding";
import { LandingStructuredData } from "@/app/components/LandingStructuredData";

export const metadata: Metadata = {
  title: "Best Pregnancy Tracker Apps 2026 - Expert Comparison",
  description: "Compare the top 5 pregnancy tracking apps. Independent evaluation based on features, privacy, accuracy, and user experience.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function HomepageVariant() {
  return (
    <>
      <LandingStructuredData variant="redesign" />
      <EditorialLanding />
    </>
  );
}
