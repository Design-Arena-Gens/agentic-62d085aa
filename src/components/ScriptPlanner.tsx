'use client';

import { useEffect, useMemo, useState } from "react";
import { ScriptSection, VideoIdea } from "@/types";

interface ScriptPlannerProps {
  selectedIdea?: VideoIdea;
}

const runtimes = [
  { id: "short", label: "Short burst (under 5 mins)", estimatedWords: 600 },
  { id: "standard", label: "Flagship (8-12 mins)", estimatedWords: 1600 },
  { id: "deepdive", label: "Deep dive (15+ mins)", estimatedWords: 2600 },
];

const cadencePlaylists: Record<string, string[]> = {
  short: [
    "High-velocity hook with pattern interrupt",
    "Rapid payoff with automation reveal",
    "CTA that teases long-form follow up",
  ],
  standard: [
    "Story-driven opener + social proof",
    "Three pillar framework with visuals callout",
    "Workflow handoff to automation, CTA to download assets",
  ],
  deepdive: [
    "Market insight cold open with data viz",
    "System teardown with chapters & table stakes",
    "Interactive workshop segment & retention loop CTA",
  ],
};

function deriveSections(idea?: VideoIdea | null): ScriptSection[] {
  const baseSections: ScriptSection[] = [
    {
      id: "hook",
      label: "Hook & Pattern Interrupt",
      objective:
        "Stop the scroll instantly while naming the automation payoff.",
      talkingPoints: [
        idea?.hook || "Lead with the strongest quantified outcome.",
        "Show the pain of the manual workflow in one visual.",
      ],
      automationCue: "Trigger dynamic lower-third template with KPI overlay.",
    },
    {
      id: "context",
      label: "Context & Stakes",
      objective:
        "Create urgency by reframing the niche problem as unsustainable.",
      talkingPoints: [
        `State why ${idea?.audience || "teams"} stall out without automation.`,
        "Highlight the leverage gained from batching or templating work.",
      ],
      automationCue: "Drop b-roll pack via timeline auto-populate macro.",
    },
    {
      id: "system",
      label: "System Breakdown",
      objective: "Teach the repeatable process behind the promise.",
      talkingPoints: [
        "Reveal the framework with 3 to 5 labeled pillars.",
        `Show the trigger, automation action, and measurable output.`,
        "Highlight one quick win viewers can deploy in <10 minutes.",
      ],
      automationCue: "Side-by-side screen capture using multicam template.",
    },
    {
      id: "case",
      label: "Proof & Case Study",
      objective: "De-risk the strategy with proof of execution.",
      talkingPoints: [
        "Share performance metrics before and after automation.",
        "Explain tooling stack and decision tree for exceptions.",
      ],
      automationCue: "Auto-insert testimonial lower-thirds from notion DB.",
    },
    {
      id: "cta",
      label: "CTA & Distribution Loop",
      objective:
        "Drive next step and seed the follow-up automation asset pipeline.",
      talkingPoints: [
        "Invite viewers to clone the system (Notion / Sheets / Zapier).",
        "Preview next video or shorts series that builds on this workflow.",
      ],
      automationCue: "Trigger end-screen package and shorts remix markers.",
    },
  ];

  if (!idea) {
    return baseSections;
  }

  return baseSections.map((section) =>
    section.id === "context"
      ? {
          ...section,
          talkingPoints: [
            `Tie ${idea.automationFocus.toLowerCase()} to the niche pain point.`,
            "Highlight the manual bottleneck you automate away.",
          ],
        }
      : section,
  );
}

export function ScriptPlanner({ selectedIdea }: ScriptPlannerProps) {
  const [activeRuntime, setActiveRuntime] = useState("standard");
  const [sections, setSections] = useState<ScriptSection[]>(
    deriveSections(selectedIdea),
  );
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    setSections(deriveSections(selectedIdea));
  }, [selectedIdea]);

  const playlist = useMemo(
    () => cadencePlaylists[activeRuntime as keyof typeof cadencePlaylists],
    [activeRuntime],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/60 px-4 py-2 text-xs font-medium uppercase tracking-wide text-emerald-700 shadow-inner dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200">
          Script Blueprint
        </div>
        {selectedIdea ? (
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            Grounded in <span className="font-semibold">{selectedIdea.title}</span>
          </div>
        ) : (
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Generate an idea or draft manually to unlock automation notes.
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {runtimes.map((runtime) => (
          <button
            key={runtime.id}
            onClick={() => setActiveRuntime(runtime.id)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold transition ${
              runtime.id === activeRuntime
                ? "border-sky-400 bg-sky-50 text-sky-700 shadow-inner dark:border-sky-400/50 dark:bg-sky-900/40 dark:text-sky-100"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-sky-300 hover:text-sky-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
            }`}
          >
            {runtime.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-dashed border-zinc-200/90 bg-white/70 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60">
        <div className="grid gap-4 md:grid-cols-3">
          {playlist.map((step, idx) => (
            <div
              key={step}
              className="rounded-2xl border border-zinc-200/80 bg-white p-4 text-sm shadow dark:border-zinc-700 dark:bg-zinc-900"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Anchor {idx + 1}
              </p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-200">{step}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-700 shadow-inner dark:border-emerald-500/40 dark:bg-emerald-950/50 dark:text-emerald-200">
            Estimated words:{" "}
            {
              runtimes.find((runtime) => runtime.id === activeRuntime)
                ?.estimatedWords
            }
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70"
          >
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {section.label}
                </p>
                <p className="text-sm text-zinc-700 dark:text-zinc-200">
                  {section.objective}
                </p>
              </div>
              {section.automationCue ? (
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-zinc-800 dark:text-emerald-200">
                  {section.automationCue}
                </span>
              ) : null}
            </header>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-zinc-600 dark:text-zinc-300">
              {section.talkingPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <textarea
              value={notes[section.id] ?? ""}
              onChange={(event) =>
                setNotes((prev) => ({
                  ...prev,
                  [section.id]: event.target.value,
                }))
              }
              placeholder="Drop specific lines, b-roll cues, or CTAs to automate here."
              className="mt-3 w-full rounded-xl border border-zinc-200/70 bg-white px-3 py-3 text-sm leading-6 text-zinc-700 shadow-inner focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-200"
              rows={3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
