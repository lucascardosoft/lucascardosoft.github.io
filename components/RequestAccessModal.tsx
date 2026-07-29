"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface RequestAccessModalProps {
  /** Company name of the case being requested, or null when closed. */
  company: string | null;
  onClose: () => void;
}

/**
 * No backend on this static site, so there's nothing to authenticate
 * against — the Figma link simply never ships in the client bundle for
 * a restricted case. This hands the request off as a pre-filled email;
 * the link gets shared manually once approved.
 */
export function RequestAccessModal({ company, onClose }: RequestAccessModalProps) {
  const { dict } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!company) return;
    nameRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [company, onClose]);

  if (!company) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Access request: ${company} case study`;
    const body = `Name: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:lucascardosoft@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={dict.work.requestAccess}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-bg-elevated p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.work.close}
          className="absolute right-4 top-4 text-fg-subtle transition-colors hover:text-fg"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="pr-6 text-sm leading-relaxed text-fg-muted">
          {dict.work.restrictedNote}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <input
            ref={nameRef}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={dict.work.namePlaceholder}
            aria-label={dict.work.namePlaceholder}
            className="rounded-full border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-border-strong focus:outline-none"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.work.emailPlaceholder}
            aria-label={dict.work.emailPlaceholder}
            className="rounded-full border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-border-strong focus:outline-none"
          />
          <button
            type="submit"
            className="mt-1 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            {dict.work.requestAccess}
          </button>
        </form>
      </div>
    </div>
  );
}
