"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { dict } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Avoid a hydration mismatch: theme is only known client-side.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={dict.themeToggle.label}
      aria-pressed={isDark}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg sm:h-9 sm:w-9"
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
