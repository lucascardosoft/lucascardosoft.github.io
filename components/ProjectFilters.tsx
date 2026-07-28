"use client";

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

  const visible = filterOrder.filter(
    (tag) => tag === "all" || availableTags.has(tag)
  );

  return (
    <div className="sticky top-16 z-30 mb-16 flex w-full justify-center px-4 sm:top-24">
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-border bg-bg/80 p-1 backdrop-blur-md [scrollbar-width:none] sm:gap-1 sm:p-1.5 [&::-webkit-scrollbar]:hidden"
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
                "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium transition-colors sm:px-3.5 sm:py-1.5 sm:text-sm",
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
