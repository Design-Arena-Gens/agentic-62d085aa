'use client';

import { useState } from "react";

interface Playbook {
  id: string;
  title: string;
  description: string;
  trigger: string;
  stack: string[];
  outputs: string[];
}

const playbooks: Playbook[] = [
  {
    id: "launch",
    title: "Launch Day Autopilot",
    description:
      "Coordinate long-form release, shorts snippets, and newsletter alerts in one push.",
    trigger: "Publish scheduled long-form video",
    stack: ["YouTube Studio API", "Zapier", "ConvertKit", "Buffer"],
    outputs: [
      "Create three shorts drafts in queue",
      "Send templated campaign to subscribers",
      "Open Notion distribution checklist",
    ],
  },
  {
    id: "editor",
    title: "Editor Hand-off Workflow",
    description:
      "Auto-package footage, reference docs, and script updates to speed up editing.",
    trigger: "Upload recording to shared drive",
    stack: ["Descript", "Frame.io", "Notion", "Slack"],
    outputs: [
      "Sync script comments to editor board",
      "Alert editor with priority + due date",
      "Generate asset download bundle",
    ],
  },
  {
    id: "repurpose",
    title: "Repurpose & Remix Engine",
    description:
      "Batch convert long-form anchor into platform-ready derivatives.",
    trigger: "Long-form video hits 65% average watch time",
    stack: ["OpusClip", "Canva", "Typefully", "Zapier"],
    outputs: [
      "Generate 5 shorts with brand-safe captions",
      "Draft Twitter / LinkedIn threads using key moments",
      "Queue newsletter PS linking to mini-course",
    ],
  },
];

export function AutomationPlaybooks() {
  const [active, setActive] = useState<string[]>(["launch"]);

  const togglePlaybook = (id: string) => {
    setActive((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-4">
      {playbooks.map((playbook) => {
        const isActive = active.includes(playbook.id);
        return (
          <article
            key={playbook.id}
            className="rounded-3xl border border-zinc-200/70 bg-white/90 p-5 shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/70 dark:shadow-black/30"
          >
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {playbook.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {playbook.description}
                </p>
              </div>
              <button
                onClick={() => togglePlaybook(playbook.id)}
                className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                  isActive
                    ? "bg-emerald-500 text-white shadow"
                    : "border border-zinc-300 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-600 dark:bg-zinc-900"
                }`}
              >
                {isActive ? "Active" : "Activate"}
              </button>
            </header>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 text-xs text-zinc-600 dark:border-zinc-600 dark:bg-zinc-950/60 dark:text-zinc-300">
                <p className="font-semibold uppercase tracking-wide text-zinc-500">
                  Trigger
                </p>
                <p className="mt-2 text-sm">{playbook.trigger}</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 text-xs text-zinc-600 dark:border-zinc-600 dark:bg-zinc-950/60 dark:text-zinc-300">
                <p className="font-semibold uppercase tracking-wide text-zinc-500">
                  Automation stack
                </p>
                <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                  {playbook.stack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full bg-white px-3 py-1 shadow-sm dark:bg-zinc-800"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 text-xs text-zinc-600 dark:border-zinc-600 dark:bg-zinc-950/60 dark:text-zinc-300">
                <p className="font-semibold uppercase tracking-wide text-zinc-500">
                  Outputs
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  {playbook.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
              </div>
            </div>
            {isActive ? (
              <div className="mt-4 rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-4 text-xs text-emerald-700 shadow-inner dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200">
                <p className="font-semibold uppercase tracking-wide">
                  Automation status
                </p>
                <p className="mt-1 leading-5">
                  Connected to Make.com scenario 04 + Notion ops hub. When the
                  trigger fires, your team receives a Slack summary with ready
                  links. Adjust inside the Automation HQ section.
                </p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
