import { Metadata } from "next";
import { Nav } from "./components/Nav";
import { PregnancyApps } from "./lib/apps-data";
import WaveSection from "./components/WaveSection";
import Methodology from "./components/Methodology";
import FeatureComparisonChart from "./components/FeatureComparisonWithData";
import { PregnancyAppComparison } from "./components/PregnancyAppComparison";
import { FAQSection } from "./components/FAQSection";
import { faqSchema } from "./lib/faq-schema";
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
    authors: ["Selin Tamer"],
  },
};

export default function Home() {
  // JSON-LD structured data - THIS IS CRITICAL FOR AIEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Pregnancy Tracker Apps 2026",
    author: {
      "@type": "Person",
      name: "Selin Tamer",
      jobTitle: "CEO & Writer",
    },
    datePublished: "2026-01-05",
    dateModified: "2026-01-06",
    description: "Comprehensive comparison of the top pregnancy tracking apps",
    articleBody:
      "We tested 15 pregnancy tracking apps over 30 days, evaluating medical accuracy against ACOG guidelines, privacy compliance, and user experience. Our independent analysis identified the top 5 apps based on comprehensive criteria including feature completeness, data protection, and real user feedback from 500+ reviews.",
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PregnancyApps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        applicationCategory: "HealthApplication",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: app.rating.toString(),
          bestRating: "5",
          worstRating: "1",
        },
      },
    })),
  };

  const imageObjectSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: "https://bestpregnancy.app/pregnancy-apps-comparison-chart.jpg",
    name: "Pregnancy Apps Comparison Chart 2026",
    description:
      "Feature comparison of top 5 pregnancy tracker apps including Cubtale, Ovia, What to Expect, Flo, and Baby Center",
    width: "1600",
    height: "900",
    uploadDate: "2026-01-06",
    author: {
      "@type": "Person",
      name: "Selin Tamer",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Nav />

      <main>
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
