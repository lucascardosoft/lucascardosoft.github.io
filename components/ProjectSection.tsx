"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { createCaseAccessMailto } from "@/lib/mailto";
import type { Project } from "@/data/projects";

interface ProjectSectionProps {
  project: Project;
  index: number;
}

// Hidden per request — flip these back on to restore the sections rather
// than deleting the JSX below.
const SHOW_RESPONSIBILITIES = false;
const SHOW_HIGHLIGHTS = false;
const SHOW_IMPACT = false;

export function ProjectSection({ project, index }: ProjectSectionProps) {
  const { dict } = useLanguage();
  const copy = dict.project[project.id as keyof typeof dict.project];
  const isEven = index % 2 === 0;

  if (!copy) return null;

  return (
    <motion.article
      className={
        isEven
          ? "border-y border-border bg-bg"
          : "border-y border-border bg-bg-elevated"
      }
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-page grid gap-10 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <div className="mb-6 flex items-center gap-3">
            {project.logo ? (
              project.logoLight ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element -- small brand SVG, not worth next/image overhead */}
                  <img
                    src={project.logo}
                    alt={project.company}
                    className={cn(
                      "theme-logo-dark w-auto",
                      project.logoClassName
                    )}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.logoLight}
                    alt={project.company}
                    className={cn(
                      "theme-logo-light w-auto",
                      project.logoClassName
                    )}
                  />
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- small brand SVG, not worth next/image overhead
                <img
                  src={project.logo}
                  alt={project.company}
                  className={cn("w-auto", project.logoClassName)}
                />
              )
            ) : (
              <span className="font-mono text-sm text-fg-muted">
                {project.company}
              </span>
            )}
            <span aria-hidden="true" className="text-fg-subtle">
              &middot;
            </span>
            <span className="font-mono text-sm text-fg-subtle">
              {project.role}
            </span>
          </div>

          <h3 className="font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl md:text-4xl">
            {copy.headline}
          </h3>

          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-fg-subtle">
            {project.product}
          </p>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-fg-muted">
            {copy.context}
          </p>

          {SHOW_RESPONSIBILITIES ? (
            <ul className="mt-6 space-y-2">
              {copy.responsibilities.map((item: string) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-soft"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {SHOW_HIGHLIGHTS && copy.highlights?.length ? (
            <ul className="mt-6 space-y-2">
              {copy.highlights.map((item: string) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-fg"
                >
                  <TrendingUp
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {SHOW_IMPACT && copy.impact ? (
            <p className="mt-6 max-w-lg border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-fg-muted italic">
              {copy.impact}
            </p>
          ) : null}

          {project.technologies.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-fg-subtle"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.access === "public" && project.figmaUrl ? (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-elevated-2"
              >
                {copy.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : project.access === "restricted" ? (
              <a
                href={createCaseAccessMailto(dict.mailto.caseAccess, {
                  title: copy.headline,
                  company: project.company,
                })}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-elevated-2"
              >
                {dict.work.requestAccess}
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg-subtle"
              >
                {dict.work.comingSoon}
              </span>
            )}
          </div>
        </div>

        <motion.div
          className="order-1 overflow-hidden rounded-2xl border border-border lg:order-2"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Placeholder SVG hero — swap for a real export and next/image once available */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt=""
            className="aspect-[4/3] w-full object-cover"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}
