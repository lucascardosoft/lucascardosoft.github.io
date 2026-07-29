"use client";

import { motion } from "framer-motion";
import { Link2, FileText, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { createContactMailto } from "@/lib/mailto";

const staticLinks = [
  {
    key: "linkedin" as const,
    href: "https://www.linkedin.com/in/lucas-cardoso-freitas/",
    icon: Link2,
  },
  { key: "resume" as const, href: "/resume.pdf", icon: FileText },
];

export function Contact() {
  const { dict } = useLanguage();
  const links = [
    ...staticLinks,
    {
      key: "email" as const,
      href: createContactMailto(dict.mailto.contact),
      icon: Mail,
    },
  ];

  return (
    <section id="contact" className="container-page py-28 md:py-36">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        {dict.contact.eyebrow}
      </motion.p>

      <motion.h2
        className="font-display mt-4 max-w-lg text-3xl font-medium tracking-tight sm:text-4xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        {dict.contact.heading}
      </motion.h2>

      <motion.p
        className="mt-4 max-w-lg text-base leading-relaxed text-fg-muted"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {dict.contact.body}
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.16 }}
      >
        {links.map(({ key, href, icon: Icon }) => (
          <a
            key={key}
            href={href}
            target={key !== "email" ? "_blank" : undefined}
            rel={key !== "email" ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-elevated-2"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {dict.contact[key]}
          </a>
        ))}
      </motion.div>
    </section>
  );
}
