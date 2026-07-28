"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClientLogo {
  id: string;
  company: string;
  logo: string;
  logoClassName?: string;
}

/**
 * Client marks shown in this strip — not every client here has a full
 * case study in the Work section, so this list is intentionally kept
 * separate from `data/projects.ts`.
 */
const clients: ClientLogo[] = [
  {
    id: "elsevier",
    company: "Elsevier",
    logo: "/companies/elsevier.svg",
    logoClassName: "h-9 max-w-[150px]",
  },
  {
    id: "carrefour",
    company: "Carrefour",
    logo: "/companies/carrefour.svg",
    logoClassName: "h-12 max-w-[90px]",
  },
  {
    id: "korn-ferry",
    company: "Korn Ferry",
    logo: "/companies/korn-ferry.svg",
    logoClassName: "h-7 max-w-[150px]",
  },
  {
    id: "hapvida",
    company: "Hapvida",
    logo: "/companies/hapvida.svg",
    logoClassName: "h-7 max-w-[150px]",
  },
  {
    id: "interage",
    company: "Interage",
    logo: "/companies/interage.svg",
    logoClassName: "h-7 max-w-[150px]",
  },
];

function Logo({ client, hidden }: { client: ClientLogo; hidden?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small brand SVG, not worth next/image overhead
    <img
      src={client.logo}
      alt={hidden ? "" : client.company}
      aria-hidden={hidden || undefined}
      className={cn(
        "logo-mono w-auto shrink-0 opacity-80 transition-opacity hover:opacity-100",
        client.logoClassName
      )}
    />
  );
}

export function ClientLogos() {
  return (
    <section className="relative z-10 overflow-hidden border-y border-white/10 bg-[#58504c] py-14 sm:py-16">
      {/* Below md: a continuous right-to-left strip, so the marks stay
          in one row instead of wrapping and stacking on narrow screens. */}
      <div className="flex w-max animate-marquee items-center gap-x-14 md:hidden">
        {[...clients, ...clients].map((client, i) => (
          <Logo key={`${client.id}-${i}`} client={client} hidden={i >= clients.length} />
        ))}
      </div>

      {/* md and up: comfortably fits, so it sits still and centered. */}
      <div className="container-page hidden md:block">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-20 gap-y-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {clients.map((client) => (
            <Logo key={client.id} client={client} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
