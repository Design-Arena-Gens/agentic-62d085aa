'use client';

import { useState } from "react";

interface DistributionTask {
  id: string;
  platform: string;
  description: string;
  asset: string;
}

const tasks: DistributionTask[] = [
  {
    id: "newsletter",
    platform: "Newsletter",
    description: "Send story-driven recap with CTA to replay + template.",
    asset: "Plain text + hero image + checklist PDF",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    description: "Post 5-swipe carousel summarizing automation framework.",
    asset: "Carousel export + caption + CTA link shortener",
  },
  {
    id: "twitter",
    platform: "Twitter/X",
    description: "Thread with hook, system teardown, and CTA to shorts.",
    asset: "Thread draft + support visuals + scheduling slot",
  },
  {
    id: "community",
    platform: "Community",
    description: "Host live teardown or Q&A with template walkthrough.",
    asset: "Event page + reminder automations + clips for recap",
  },
];

export function DistributionPlanner() {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggle = (id: string) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const isComplete = completed.includes(task.id);
        return (
          <label
            key={task.id}
            className={`flex flex-col gap-1 rounded-2xl border p-4 text-sm shadow-sm transition ${
              isComplete
                ? "border-emerald-300/70 bg-emerald-50/60 text-emerald-800 dark:border-emerald-400/40 dark:bg-emerald-950/40 dark:text-emerald-200"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {task.platform}
                </p>
                <p>{task.description}</p>
              </div>
              <input
                type="checkbox"
                checked={isComplete}
                onChange={() => toggle(task.id)}
                className="mt-1 h-5 w-5 rounded border border-zinc-300 text-emerald-500 focus:ring-emerald-400"
              />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Asset pack: {task.asset}
            </p>
          </label>
        );
      })}
    </div>
  );
}
