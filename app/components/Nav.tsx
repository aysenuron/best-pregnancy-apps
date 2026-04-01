"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].nav;

  return (
    <header className="sticky top-0 z-100 border-b bg-white">
      <div className="mx-auto flex container items-center justify-between px-4 py-3 gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/best-pregnancy-logo.svg"
            alt="Best Pregnancy Apps Logo"
            width={48}
            height={48}
            className="h-10 md:h-14 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="#features" className="text-gray-600 hover:text-gray-900 transition">
            {t.features}
          </Link>
          <Link href="#methodology" className="text-gray-600 hover:text-gray-900 transition">
            {t.methodology}
          </Link>
          <Link href="#chart" className="text-gray-600 hover:text-gray-900 transition">
            {t.comparisonChart}
          </Link>
          <Link href="#faq" className="text-gray-600 hover:text-gray-900 transition">
            {t.faq}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile: switcher + hamburger */}
        <div className="md:hidden flex items-center gap-1 flex-shrink-0">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 flex-shrink-0"
            aria-label={t.toggleMenu}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col gap-2 px-4 py-4 text-sm">
            <Link href="#features" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
              {t.features}
            </Link>
            <Link href="#methodology" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
              {t.methodology}
            </Link>
            <Link href="#chart" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
              {t.comparisonChart}
            </Link>
            <Link href="#faq" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
              {t.faq}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
