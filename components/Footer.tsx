"use client";

import { useLanguage } from "@/lib/i18n/context";

export function Footer() {
  const { dict } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="container-page flex flex-col items-start justify-between gap-2 border-t border-border pb-24 pt-8 text-xs text-fg-subtle sm:flex-row sm:items-center sm:pb-8">
      <span>Lucas Cardoso</span>
      <span>
        © {year} Lucas Cardoso. {dict.footer.rights}
      </span>
    </footer>
  );
}
