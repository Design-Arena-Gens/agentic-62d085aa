'use client';

import { useMemo } from "react";
import { VideoIdea } from "@/types";

interface OptimizationPanelProps {
  idea?: VideoIdea;
}

const retentionSystems = [
  {
    title: "Retention guardrails",
    tips: [
      "Pace by switching visuals every 5-7 seconds during demo segments.",
      "Use interactive lower-thirds to remind viewers of the transformation.",
      "Break long explanations with automation success snapshots.",
    ],
  },
  {
    title: "SEO growth loops",
    tips: [
      "Stack keywords: root niche + use-case + automation outcome.",
      "Insert mid-video CTA that name-drops the follow-up shorts series.",
      "Publish with end screens pointing to template walkthrough.",
    ],
  },
  {
    title: "Batch distribution",
    tips: [
      "Spin 3 shorts using the hook, payoff, and CTA segments.",
      "Clip lo-fi teaser for LinkedIn or Slack communities.",
      "Convert checklist into downloadable PDF lead magnet.",
    ],
  },
];

const bestPublishingWindows: Record<string, { day: string; slot: string }[]> =
  {
    default: [
      { day: "Tuesday", slot: "09:00 - 11:00" },
      { day: "Thursday", slot: "12:00 - 14:00" },
      { day: "Saturday", slot: "10:00 - 12:30" },
    ],
    productivity: [
      { day: "Monday", slot: "07:30 - 09:00" },
      { day: "Tuesday", slot: "12:00 - 14:00" },
      { day: "Thursday", slot: "15:00 - 17:00" },
    ],
    creator: [
      { day: "Wednesday", slot: "15:30 - 17:00" },
      { day: "Friday", slot: "11:00 - 13:00" },
      { day: "Sunday", slot: "09:30 - 11:30" },
    ],
  };

function pickWindow(idea?: VideoIdea | null) {
  if (!idea?.audience) return bestPublishingWindows.default;
  const normalized = idea.audience.toLowerCase();
  if (normalized.includes("founder") || normalized.includes("saas")) {
    return bestPublishingWindows.productivity;
  }
  if (normalized.includes("creator") || normalized.includes("content")) {
    return bestPublishingWindows.creator;
  }
  return bestPublishingWindows.default;
}

export function OptimizationPanel({ idea }: OptimizationPanelProps) {
  const publishingSlots = useMemo(() => pickWindow(idea), [idea]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {retentionSystems.map((system) => (
          <article
            key={system.title}
            className="rounded-2xl border border-sky-200/70 bg-white/90 p-4 text-sm shadow-sm shadow-sky-100/60 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-100 dark:shadow-black/30"
          >
            <h3 className="text-base font-semibold text-sky-800 dark:text-sky-200">
              {system.title}
            </h3>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-sky-900/80 dark:text-sky-100/80">
              {system.tips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-400" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-amber-200/70 bg-amber-50/70 p-5 shadow-inner dark:border-amber-500/40 dark:bg-amber-950/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-200">
              Launch timing
            </p>
            <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-100">
              Recommended publishing windows
            </h4>
          </div>
          {idea ? (
            <span className="rounded-full bg-white/70 px-4 py-1 text-xs font-semibold text-amber-600 shadow dark:bg-amber-900/60 dark:text-amber-200">
              Tailored for {idea.audience}
            </span>
          ) : null}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {publishingSlots.map((slot) => (
            <div
              key={slot.day}
              className="rounded-2xl border border-amber-200 bg-white/70 p-4 text-sm text-amber-700 shadow-sm dark:border-amber-600/40 dark:bg-amber-900/60 dark:text-amber-100"
            >
              <p className="text-xs font-medium uppercase tracking-wide">
                {slot.day}
              </p>
              <p className="mt-2 text-base font-semibold">{slot.slot}</p>
              <p className="text-xs text-amber-600/80 dark:text-amber-200/80">
                Launch long-form → schedule shorts 18h later.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200/70 bg-white/80 p-5 text-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Metadata automation template
          </h4>
          <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
            Copy → tweak → schedule
          </span>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-600 dark:bg-zinc-900/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Title
            </p>
            <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-200">
              {idea
                ? `${idea.hook.split(" ").slice(0, 10).join(" ")} | ${idea.format}`
                : "Steal this automation stack before it becomes standard"}
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-600 dark:bg-zinc-900/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Description opener
            </p>
            <p className="text-xs leading-5 text-zinc-600 dark:text-zinc-300">
              {idea
                ? `⚡️ Today we automate ${idea.synopsis.toLowerCase()} — grab the playbook + assets below.`
                : "⚡️ Automate your workflow end-to-end — templates, scripts, and b-roll packs inside."}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              CTA stack
            </p>
            <ul className="list-disc space-y-1 pl-4 text-xs text-zinc-600 dark:text-zinc-300">
              <li>Download the automation dashboard</li>
              <li>Join the workflow lab live teardown</li>
              <li>Get shorts delivered weekly</li>
            </ul>
          </div>
          <div className="space-y-2 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-600 dark:bg-zinc-900/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Tags & keywords
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              {(idea?.keywords ?? [
                "automation",
                "youtube-workflow",
                "content-ops",
                "ai-video",
              ]).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-white px-3 py-1 shadow-sm dark:bg-zinc-800"
                >
                  #{keyword.replace(/\s+/g, "-")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
