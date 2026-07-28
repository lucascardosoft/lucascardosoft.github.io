"use client";

import { useLanguage } from "@/lib/i18n/context";

export function LanguageSwitcher() {
  const { locale, toggleLocale, dict } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={dict.languageSwitcher.label}
      className="font-mono flex h-8 shrink-0 items-center rounded-full border border-border px-1.5 text-xs tracking-wide text-fg-muted transition-colors hover:border-border-strong hover:text-fg sm:h-9 sm:px-3"
    >
      <span className={locale === "en" ? "text-fg" : undefined}>EN</span>
      <span className="mx-1 text-fg-subtle sm:mx-1.5" aria-hidden="true">
        /
      </span>
      <span className={locale === "pt-BR" ? "text-fg" : undefined}>PT</span>
    </button>
  );
}
