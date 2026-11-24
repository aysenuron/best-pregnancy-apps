import { faqSchema } from "@/app/lib/faq-schema";
import type { LandingVariant } from "@/app/lib/landing-experiment";
import { APP_META, APP_ORDER } from "@/app/lib/pregnancy-app-meta";
import { SITE_AUTHOR_SCHEMA } from "@/app/lib/site-author";
import { translations } from "@/app/lib/translations";

const SITE_URL = "https://bestpregnancy.app";
const SCHEMA_CONTEXT = "https://schema.org";
const organization = {
  "@context": SCHEMA_CONTEXT,
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Best Pregnancy Apps",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/best-pregnancy-logo.svg`,
};

const publisher = { "@id": organization["@id"] };

const website = {
  "@context": SCHEMA_CONTEXT,
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: organization.name,
  url: organization.url,
  publisher,
};

const chartImage = {
  "@context": SCHEMA_CONTEXT,
  "@type": "ImageObject",
  contentUrl: `${SITE_URL}/pregnancy-apps-comparison-chart.jpg`,
  name: "Pregnancy Apps Comparison Chart 2026",
  description: "Feature comparison of Cubtale Pregnancy, Flo, What to Expect, Pregnancy+, Ovia, and BabyCenter.",
  width: 1500,
  height: 785,
  uploadDate: "2026-01-06",
  author: SITE_AUTHOR_SCHEMA,
};

const heroImage = {
  "@context": SCHEMA_CONTEXT,
  "@type": "ImageObject",
  contentUrl: `${SITE_URL}/hero.png`,
  name: translations.en.hero.imgAlt,
  width: 1536,
  height: 1024,
};

const itemList = {
  "@context": SCHEMA_CONTEXT,
  "@type": "ItemList",
  itemListOrder: `${SCHEMA_CONTEXT}/ItemListOrderAscending`,
  numberOfItems: APP_ORDER.length,
  itemListElement: APP_ORDER.map((name, index) => {
    const { link, rating } = APP_META[name];
    const [ratingValue, bestRating] = rating.split("/").map(Number);

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name,
        url: link,
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android",
        offers: { "@type": "Offer", price: 0 },
        review: {
          "@type": "Review",
          author: SITE_AUTHOR_SCHEMA,
          reviewRating: { "@type": "Rating", ratingValue, bestRating, worstRating: 1 },
        },
      },
    };
  }),
};

export function LandingStructuredData({ variant }: { variant: LandingVariant }) {
  const redesign = variant === "redesign";
  const image = redesign ? heroImage : chartImage;
  const article = {
    "@context": SCHEMA_CONTEXT,
    "@type": "Article",
    headline: redesign ? translations.en.editorialLanding.title : translations.en.hero.title,
    author: SITE_AUTHOR_SCHEMA,
    publisher,
    isPartOf: { "@id": website["@id"] },
    datePublished: "2026-01-05",
    dateModified: redesign ? "2026-11-01" : "2026-03-23",
    description: "Comprehensive comparison of the top 6 pregnancy tracking apps",
    articleBody: translations.en.hero.description,
    image: image.contentUrl,
  };

  return (
    <>
      {[organization, website, article, itemList, image, faqSchema].map((block) => (
        <script
          key={block["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
