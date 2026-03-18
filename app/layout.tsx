import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { StickyDownloadBar } from "@/app/components/StickyDownloadBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bestpregnancy.app"), // IMPORTANT: Replace with your domain
  title: {
    default: "Best Pregnancy Apps 2026 - Expert Comparison Guide",
    template: "%s | Best Pregnancy Apps", // For other pages
  },
  description:
    "Independent comparison of the top 5 pregnancy tracking apps. Expert evaluation based on medical accuracy, privacy, features, and user experience.",
  keywords: [
    "pregnancy apps",
    "pregnancy tracker",
    "best pregnancy app",
    "pregnancy guide",
    "contraction timer",
  ],
  authors: [{ name: "Selin Tamer", url: "https://bestpregnancy.app" }],
  creator: "Selin Tamer",
  publisher: "Best Pregnancy Apps",

  /* Open Graph for social sharing */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bestpregnancy.app",
    title: "Best Pregnancy Apps 2026 - Expert Comparison",
    description: "Independent comparison of top pregnancy tracking apps",
    siteName: "Best Pregnancy Apps",
    images: [
      {
        url: "https://bestpregnancy.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Best Pregnancy Apps Comparison",
      },
    ],
  },

  /* Twitter Card */
  twitter: {
    card: "summary_large_image",
    title: "Best Pregnancy Apps 2026",
    description: "Independent comparison of top pregnancy tracking apps",
    images: ["https://bestpregnancy.app/og-image.jpg"],
  },

  /* Icons */
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  /* Additional metadata */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QZ5SHGXRPV"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QZ5SHGXRPV');
      `,
          }}
        />
        <link
          rel="preload"
          as="image"
          href="/hero.png"
          imageSrcSet="/hero.png"
          fetchPriority="high"
        />

        <Script
          src="https://s3.us-east-2.amazonaws.com/image.cubtale.link/af_code/af_initializer.js"
          strategy="beforeInteractive"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <StickyDownloadBar />
      </body>
    </html>
  );
}
