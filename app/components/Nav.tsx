"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex container items-center justify-between px-4 py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/best-pregnancy-logo.svg"
            alt="Best Pregnancy Apps Logo"
            width={48}
            height={48}
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Pricing
          </Link>
          <Link
            href="#integrations"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Integrations
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col gap-2 px-4 py-4 text-sm">
            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              Pricing
            </Link>
            <Link
              href="#integrations"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              Integrations
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
