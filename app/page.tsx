import { Metadata } from "next";
import { Nav } from "./components/Nav";
import WaveSection from "./components/WaveSection";
import Methodology from "./components/Methodology";
import FeatureComparisonChart from "./components/FeatureComparisonWithData";
import { PregnancyAppComparison } from "./components/PregnancyAppComparison";
import { FAQSection } from "./components/FAQSection";
import { LandingStructuredData } from "./components/LandingStructuredData";
import { SITE_AUTHOR } from "./lib/site-author";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { ChartSaveSection } from "./components/ChartSaveSection";

export const metadata: Metadata = {
  title: "Best Pregnancy Tracker Apps 2026 - Expert Comparison",
  description:
    "Compare the top 5 pregnancy tracking apps. Independent evaluation based on features, privacy, accuracy, and user experience.",
  openGraph: {
    title: "Best Pregnancy Tracker Apps 2026",
    description: "Expert comparison of top pregnancy apps",
    type: "article",
    publishedTime: "2026-01-05",
    authors: [SITE_AUTHOR],
  },
};

export default function Home() {
  return (
    <>
      <LandingStructuredData variant="original" />

      <Nav />

      <main data-landing-variant="original">
        <HeroSection />

        <section className="pointer-events-none relative -z-10 pt-4 2xl:pt-0 2xl:-mt-20">
          <WaveSection />
        </section>

        <section id="features">
          <PregnancyAppComparison />
        </section>

        <Methodology />

        <section id="chart">
          <FeatureComparisonChart />
        </section>

        <ChartSaveSection />

        <FAQSection />

        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
}
