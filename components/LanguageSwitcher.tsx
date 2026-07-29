"use client";

import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** Border/background treatment — the two call sites need different chrome
   *  (nested in the desktop pill vs. floating on its own on mobile). */
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, toggleLocale, dict } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={dict.languageSwitcher.label}
      className={cn(
        "font-mono flex h-11 shrink-0 items-center rounded-full border px-3 text-sm tracking-wide text-fg-muted transition-colors hover:text-fg sm:h-9 sm:px-3 sm:text-xs",
        className ?? "border-border hover:border-border-strong"
      )}
    >
      <span className={locale === "en" ? "text-fg" : undefined}>EN</span>
      <span className="mx-1.5 text-fg-subtle" aria-hidden="true">
        /
      </span>
      <span className={locale === "pt-BR" ? "text-fg" : undefined}>PT</span>
    </button>
  );
}
