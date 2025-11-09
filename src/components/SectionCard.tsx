'use client';

import { ReactNode } from "react";
import clsx from "clsx";

interface SectionCardProps {
  title: string;
  description?: string;
  accent?: "emerald" | "sky" | "amber" | "fuchsia" | "zinc";
  children: ReactNode;
}

const accentToClass: Record<
  NonNullable<SectionCardProps["accent"]>,
  string
> = {
  emerald: "border-emerald-300/70 shadow-emerald-100/40",
  sky: "border-sky-300/70 shadow-sky-100/40",
  amber: "border-amber-300/70 shadow-amber-100/40",
  fuchsia: "border-fuchsia-300/70 shadow-fuchsia-100/40",
  zinc: "border-zinc-300/70 shadow-zinc-200/40",
};

export function SectionCard({
  title,
  description,
  accent = "zinc",
  children,
}: SectionCardProps) {
  return (
    <section
      className={clsx(
        "rounded-3xl border bg-white/80 p-6 shadow-lg shadow-black/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-black/30",
        accentToClass[accent],
      )}
    >
      <header className="mb-5 space-y-1.5">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
      </header>
      <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-200">
        {children}
      </div>
    </section>
  );
}
