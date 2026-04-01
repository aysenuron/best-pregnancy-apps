"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto container px-4 md:px-0 py-10">
        <div className="grid gap-8 md:grid-cols-3 items-end">
          {/* Brand / About */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/best-pregnancy-logo.svg"
                alt="Best Pregnancy Apps Logo"
                width={48}
                height={48}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed lg:pr-8">
              {t.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-start-3 md:col-end-4">
            <p className="mb-3 text-sm font-semibold text-gray-900">{t.explore}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-gray-900 transition">
                  {t.appFeatures}
                </Link>
              </li>
              <li>
                <Link href="#methodology" className="text-gray-600 hover:text-gray-900 transition">
                  {t.reviewMethodology}
                </Link>
              </li>
              <li>
                <Link href="#chart" className="text-gray-600 hover:text-gray-900 transition">
                  {t.comparisonChart}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-600 hover:text-gray-900 transition">
                  {t.faq}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-6 text-sm text-gray-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
