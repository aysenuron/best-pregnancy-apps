import Link from "next/link";
import Image from "next/image";

export function Footer() {
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
              Independent reviews and comparisons of pregnancy and baby tracking
              apps. Our goal is to help parents make informed, confident
              decisions.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-start-3 col-end-4">
            <p className="mb-3 text-sm font-semibold text-gray-900">Explore</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  App Features
                </Link>
              </li>
              <li>
                <Link
                  href="#methodology"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Review Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="#chart"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Comparison Chart
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-6 text-sm text-gray-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} bestpregnancy.app All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
