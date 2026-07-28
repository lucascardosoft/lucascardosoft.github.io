"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import type { FilterTag } from "@/data/projects";
import { cn } from "@/lib/utils";

const filterOrder: (FilterTag | "all")[] = [
  "all",
  "healthcare",
  "enterprise",
  "ai",
  "accessibility",
  "dashboards",
  "research",
  "designSystems",
  "finance",
];

interface ProjectFiltersProps {
  active: FilterTag | "all";
  onChange: (value: FilterTag | "all") => void;
  availableTags: Set<FilterTag>;
}

export function ProjectFilters({
  active,
  onChange,
  availableTags,
}: ProjectFiltersProps) {
  const { dict } = useLanguage();
  const [open, setOpen] = useState(false);

  const visible = filterOrder.filter(
    (tag) => tag === "all" || availableTags.has(tag)
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="sticky top-16 z-30 mb-16 flex w-full justify-center px-4 sm:top-24">
      {/* Mobile: a single dropdown trigger instead of a scrolling chip row */}
      <div className="relative w-full max-w-xs sm:hidden">
        {open ? (
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="relative z-40 flex w-full items-center justify-between gap-2 rounded-full border border-border bg-bg/90 px-4 py-3 text-sm font-medium text-fg backdrop-blur-md"
        >
          <span>
            {dict.filters.label}: {dict.filters[active]}
          </span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>

        {open ? (
          <ul
            role="listbox"
            aria-label={dict.filters.label}
            className="absolute inset-x-0 top-full z-40 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-border bg-bg-elevated p-1.5 shadow-xl"
          >
            {visible.map((tag) => {
              const isActive = active === tag;
              return (
                <li key={tag}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      onChange(tag);
                      setOpen(false);
                    }}
                    className={cn(
                      "block w-full rounded-xl px-4 py-3 text-left text-base transition-colors",
                      isActive
                        ? "bg-fg text-bg"
                        : "text-fg-muted hover:bg-bg-elevated-2 hover:text-fg"
                    )}
                  >
                    {dict.filters[tag]}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {/* sm and up: comfortably fits in one row */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="hidden max-w-full items-center gap-1 rounded-full border border-border bg-bg/80 p-1.5 backdrop-blur-md sm:flex"
      >
        {visible.map((tag) => {
          const isActive = active === tag;
          return (
            <button
              key={tag}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onChange(tag)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-fg text-bg"
                  : "text-fg-muted hover:text-fg"
              )}
            >
              {dict.filters[tag]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
