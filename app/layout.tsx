import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://best-pregnancy-app.com"), // IMPORTANT: Replace with your domain
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
  authors: [{ name: "Selin Tamer", url: "https://best-pregnancy-app.com" }],
  creator: "Selin Tamer",
  publisher: "Best Pregnancy Apps",

  /* Open Graph for social sharing */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://best-pregnancy-app.com",
    title: "Best Pregnancy Apps 2026 - Expert Comparison",
    description: "Independent comparison of top pregnancy tracking apps",
    siteName: "Best Pregnancy Apps",
    images: [
      {
        url: "https://best-pregnancy-app.com/og-image.jpg",
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
    images: ["https://best-pregnancy-app.com/og-image.jpg"],
  },

  /* Icons */
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  /* Verification tags - add when you get them */
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
