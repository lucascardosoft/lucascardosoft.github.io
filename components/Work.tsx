"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { projects, type FilterTag } from "@/data/projects";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectSection } from "./ProjectSection";

export function Work() {
  const { dict } = useLanguage();
  const [active, setActive] = useState<FilterTag | "all">("all");

  const availableTags = useMemo(
    () => new Set(projects.flatMap((p) => p.tags)),
    []
  );

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="container-page mb-14">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {dict.work.eyebrow}
        </motion.p>
        <motion.h2
          className="font-display mt-4 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {dict.work.heading}
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {dict.work.sub}
        </motion.p>
      </div>

      <ProjectFilters
        active={active}
        onChange={setActive}
        availableTags={availableTags}
      />

      <div className="flex flex-col">
        {filtered.length ? (
          filtered.map((project, index) => (
            <motion.div key={project.id} layout transition={{ duration: 0.3 }}>
              <ProjectSection project={project} index={index} />
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container-page py-16 text-center text-sm text-fg-muted"
          >
            {dict.work.noResults}
          </motion.p>
        )}
      </div>
    </section>
  );
}
