"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-16 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      {/* Mobile: hamburger trigger + drawer, sitting above a solid bottom bar */}
      <div className="sm:hidden">
        {isOpen ? (
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        ) : null}

        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menu}
            className="fixed inset-x-4 bottom-24 z-50 rounded-2xl border border-border bg-bg-elevated p-2 shadow-xl"
          >
            <ul>
              {sections.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-4 py-4 text-base font-medium text-fg transition-colors hover:bg-bg-elevated-2"
                  >
                    {dict.nav[s.key]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        <header className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 px-3 pb-4">
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label={isOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className={cn(
              "flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium text-fg transition-colors",
              scrolled || isOpen
                ? "border-border bg-bg-elevated/70 backdrop-blur-md"
                : "border-transparent bg-transparent"
            )}
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
            {dict.nav.menu}
          </button>
          <LanguageSwitcher
            className={cn(
              scrolled || isOpen
                ? "border-border bg-bg-elevated/70 backdrop-blur-md"
                : "border-transparent bg-transparent"
            )}
          />
        </header>
      </div>

      {/* Desktop: full pill nav, unchanged */}
      <header className="fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-6 sm:flex">
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-fit items-center gap-1 rounded-full border px-2 py-2 transition-colors duration-300",
            scrolled
              ? "border-border bg-bg-elevated/70 backdrop-blur-md"
              : "border-transparent bg-transparent"
          )}
        >
          <ul className="flex items-center gap-1">
            {sections.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  className="block rounded-full px-4 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {dict.nav[s.key]}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-2 flex items-center gap-2 border-l border-border pl-3">
            <LanguageSwitcher />
          </div>
        </nav>
      </header>
    </>
  );
}
