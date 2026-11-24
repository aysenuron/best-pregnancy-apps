import type { Metadata } from "next";
import Link from "next/link";
import { SITE_AUTHOR, SITE_AUTHOR_SCHEMA, SITE_AUTHOR_URL } from "@/app/lib/site-author";

const description = `${SITE_AUTHOR} is the author of the Best Pregnancy Apps comparison.`;

export const metadata: Metadata = {
  title: SITE_AUTHOR,
  description,
  alternates: { canonical: SITE_AUTHOR_URL },
};

const profile = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_AUTHOR_URL,
  mainEntity: SITE_AUTHOR_SCHEMA,
};

export default function CourtneyMillerProfile() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-14 text-blue-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, "\\u003c") }}
      />
      <h1 className="text-4xl font-semibold">{SITE_AUTHOR}</h1>
      <p className="mt-4 text-gray-700">{description}</p>
      <Link href="/" className="mt-6 inline-block underline underline-offset-4">
        Read the pregnancy app comparison
      </Link>
    </main>
  );
}
