"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const { dict } = useLanguage();

  return (
    <section
      id="home"
      className="container-page relative flex min-h-[100svh] flex-col justify-center pb-24 pt-16 sm:pt-32"
    >
      <div className="relative">
        {/* Signature axis tick — a nod to the data-viz specialty, not a literal chart */}
        <span
          className="axis-tick absolute -left-4 top-1 hidden -translate-x-full sm:block md:-left-6"
          aria-hidden="true"
        >
          y
        </span>

        <motion.h1
          className="font-display max-w-4xl text-[2.5rem] leading-[1.08] font-medium tracking-tight sm:text-6xl md:text-7xl"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          {dict.hero.headline}
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted"
          initial="hidden"
          animate="visible"
          custom={0.18}
          variants={fadeUp}
        >
          {dict.hero.sub}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial="hidden"
          animate="visible"
          custom={0.26}
          variants={fadeUp}
        >
          <a
            href="#work"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {dict.hero.ctaPrimary}
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-border-strong"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            {dict.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
