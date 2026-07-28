"use client";

import { useScrolled } from "@/hooks/useScrolled";
import { useLanguage } from "@/lib/i18n/context";
// ThemeToggle is hidden for now (light theme is the fixed default) —
// component stays in the tree, just not rendered here.
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const sections = [
  { href: "#home", key: "home" as const },
  { href: "#about", key: "about" as const },
  { href: "#work", key: "work" as const },
  { href: "#contact", key: "contact" as const },
];

export function Navbar() {
  const scrolled = useScrolled();
  const { dict } = useLanguage();

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-16 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-4 sm:bottom-auto sm:top-0 sm:px-4 sm:pb-0 sm:pt-6">
        <nav
          aria-label="Primary"
          className={cn(
            "flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border px-1.5 py-1.5 transition-colors duration-300 sm:w-full sm:max-w-fit sm:gap-1 sm:px-2 sm:py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            scrolled
              ? "border-border bg-bg-elevated/70 backdrop-blur-md"
              : "border-transparent bg-transparent"
          )}
        >
          <ul className="flex shrink-0 items-center sm:gap-1">
            {sections.map((s) => (
              <li key={s.key} className="shrink-0">
                <a
                  href={s.href}
                  className="block rounded-full px-1.5 py-1.5 text-[12px] text-fg-muted transition-colors hover:text-fg sm:px-4 sm:text-sm"
                >
                  {dict.nav[s.key]}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-0.5 flex shrink-0 items-center gap-1.5 border-l border-border pl-1 sm:ml-2 sm:gap-2 sm:pl-3">
            <LanguageSwitcher />
          </div>
        </nav>
      </header>
    </>
  );
}
