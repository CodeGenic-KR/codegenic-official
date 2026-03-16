"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(nextLocale: Locale) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          <button
            onClick={() => switchLocale(loc as Locale)}
            className={`transition-colors ${
              locale === loc
                ? "text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {loc.toUpperCase()}
          </button>
          {i < routing.locales.length - 1 && (
            <span className="text-text-muted">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
