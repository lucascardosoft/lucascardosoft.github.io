"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

export function About() {
  const { dict } = useLanguage();

  return (
    <section id="about" className="container-page relative py-28 md:py-36">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-20">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {dict.about.eyebrow}
        </motion.p>

        <div>
          <motion.h2
            className="font-display max-w-lg text-3xl font-medium tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            {dict.about.heading}
          </motion.h2>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            {dict.about.body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
