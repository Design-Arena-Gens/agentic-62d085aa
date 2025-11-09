'use client';

import { useMemo, useState } from "react";
import { VideoIdea } from "@/types";

interface IdeaGeneratorProps {
  onIdeasGenerated?: (ideas: VideoIdea[]) => void;
  onIdeaSelected?: (idea: VideoIdea) => void;
}

const FORMATS = [
  "Explainer",
  "Case Study",
  "Tutorial",
  "Behind the Scenes",
  "Live Premiere",
  "Shorts Series",
];

const DURATIONS = ["Under 5 minutes", "8-12 minutes", "15+ minutes"];

const AUTOMATION_FOCUS = [
  "AI-assisted scripting",
  "Batch recording workflow",
  "Template-driven editing",
  "Automated B-roll sourcing",
  "Repurposing engine",
];

interface FormState {
  niche: string;
  audience: string;
  goal: string;
  tone: string;
  cadence: string;
  format: string;
  duration: string;
}

const defaultState: FormState = {
  niche: "",
  audience: "",
  goal: "Build authority & trust",
  tone: "Confident & energetic",
  cadence: "Weekly flagship + shorts follow-up",
  format: FORMATS[0],
  duration: DURATIONS[1],
};

const frameworks = [
  {
    name: "Problem → Process → Proof",
    blueprint: [
      "Hook with pain point your audience feels weekly.",
      "Reveal a repeatable framework (3-5 steps).",
      "Validate with a real example and data-driven outcome.",
    ],
  },
  {
    name: "Myth Busting Sequence",
    blueprint: [
      "Rapid-fire bust 3 stale myths in your niche.",
      "Swap each myth with a simple automation upgrade.",
      "Show how to action the upgrade in <3 steps.",
    ],
  },
  {
    name: "Challenge Roadmap",
    blueprint: [
      "Set a bold 7-day automation outcome.",
      "Reveal the toolkit & calendar you rely on.",
      "Provide check-in milestones and accountability hooks.",
    ],
  },
];

const hooks = [
  "You’re wasting %TIME% every week doing this the manual way",
  "This %NICHE% workflow runs while you sleep (and scales 10x)",
  "Automation playbook that got us %RESULT% without hiring",
  "Steal this plug-and-play system before it becomes obvious",
  "%NICHE% teams copy this exact template to win back their time",
];

const resultAmplifiers = [
  "saved us 27 hours last launch",
  "doubled our organic watch time",
  "cut editing crashes to zero",
  "tripled our shorts output",
  "booked 40 qualified demos in 72 hours",
];

function buildIdeas(state: FormState): VideoIdea[] {
  const ideaCount = 3;
  return Array.from({ length: ideaCount }).map((_, idx) => {
    const framework = frameworks[idx % frameworks.length];
    const automationFocus =
      AUTOMATION_FOCUS[(idx + state.niche.length) % AUTOMATION_FOCUS.length];
    const keywords = [
      state.niche || "automation",
      state.goal.toLowerCase(),
      state.audience ? `${state.audience} workflow` : "workflow",
      framework.name.toLowerCase(),
      automationFocus.toLowerCase(),
    ];
    const hookTemplate = hooks[(idx + keywords.length) % hooks.length];
    const placeholderResult =
      resultAmplifiers[(idx + state.goal.length) % resultAmplifiers.length];
    const hook = hookTemplate
      .replace("%NICHE%", state.niche || "creator")
      .replace("%TIME%", "12 hours")
      .replace("%RESULT%", placeholderResult);

    const synopsis = `${state.niche || "Creator"} automation series showing ${framework.name.toLowerCase()} to achieve ${state.goal.toLowerCase()} for ${state.audience || "busy teams"}.`;

    return {
      id: `${Date.now()}-${idx}`,
      title: `${state.format}: ${framework.name
        .replace("→", "to")
        .replace(/ +/g, " ")} for ${state.audience || "growth"}`,
      hook,
      synopsis,
      keywords,
      format: state.format,
      duration: state.duration,
      automationFocus,
      supportingAssets: [
        "Editable Notion dashboard",
        "Google Sheets KPI tracker",
        "Zapier automation blueprint",
      ],
      audience: state.audience,
    };
  });
}

export function IdeaGenerator({
  onIdeasGenerated,
  onIdeaSelected,
}: IdeaGeneratorProps) {
  const [formState, setFormState] = useState<FormState>(defaultState);
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  const showQuickStart = useMemo(
    () => !ideas.length && !isDirty,
    [ideas.length, isDirty],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDirty(true);
    const nextIdeas = buildIdeas(formState);
    setIdeas(nextIdeas);
    onIdeasGenerated?.(nextIdeas);
    if (nextIdeas.length && onIdeaSelected) {
      onIdeaSelected(nextIdeas[0]);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Channel Niche
          </span>
          <input
            type="text"
            placeholder="AI productivity, creator economy..."
            value={formState.niche}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, niche: event.target.value }))
            }
            className="rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner shadow-zinc-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Target Viewer
          </span>
          <input
            type="text"
            placeholder="Bootstrapped SaaS teams, solo creators..."
            value={formState.audience}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                audience: event.target.value,
              }))
            }
            className="rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner shadow-zinc-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Growth Goal
          </span>
          <input
            type="text"
            value={formState.goal}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, goal: event.target.value }))
            }
            className="rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner shadow-zinc-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Primary Format
          </span>
          <select
            value={formState.format}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, format: event.target.value }))
            }
            className="rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner shadow-zinc-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-900"
          >
            {FORMATS.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Preferred Tone
          </span>
          <input
            type="text"
            value={formState.tone}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, tone: event.target.value }))
            }
            placeholder="Confident & energetic, calm & data-backed..."
            className="rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner shadow-zinc-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Publish Cadence
          </span>
          <input
            type="text"
            value={formState.cadence}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                cadence: event.target.value,
              }))
            }
            placeholder="1 long-form + 3 shorts each week"
            className="rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner shadow-zinc-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Target Runtime
          </span>
          <select
            value={formState.duration}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                duration: event.target.value,
              }))
            }
            className="rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner shadow-zinc-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-900"
          >
            {DURATIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <div className="sm:col-span-2 lg:col-span-3">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:bg-emerald-500 dark:hover:bg-emerald-400"
          >
            Generate automation-ready ideas
          </button>
        </div>
      </form>

      {showQuickStart ? (
        <div className="grid gap-3 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-4 text-emerald-700 shadow-inner dark:border-emerald-500/40 dark:bg-emerald-950/50 dark:text-emerald-200">
            <h3 className="font-semibold">Automation-first prompts</h3>
            <p className="text-xs leading-5">
              Blend your channel&apos;s niche with the workflow you want to
              automate. The generator builds playbooks around it.
            </p>
          </div>
          <div className="rounded-2xl border border-sky-200/70 bg-sky-50/60 p-4 text-sky-700 shadow-inner dark:border-sky-500/40 dark:bg-sky-950/50 dark:text-sky-200">
            <h3 className="font-semibold">Structured frameworks</h3>
            <p className="text-xs leading-5">
              Each idea includes a storyline, keyword map, and supporting assets
              so production can run on autopilot.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200/70 bg-amber-50/60 p-4 text-amber-700 shadow-inner dark:border-amber-500/40 dark:bg-amber-950/50 dark:text-amber-200">
            <h3 className="font-semibold">Batch-friendly</h3>
            <p className="text-xs leading-5">
              Pair long-form anchors with shorts follow ups to keep the content
              flywheel spinning.
            </p>
          </div>
        </div>
      ) : null}

      {!!ideas.length && (
        <div className="grid gap-4 md:grid-cols-3">
          {ideas.map((idea) => (
            <article
              key={idea.id}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm shadow-zinc-200/60 transition hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/40"
            >
              <div className="space-y-1">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                  {idea.format} · {idea.duration}
                </span>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {idea.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {idea.synopsis}
                </p>
              </div>
              <div className="rounded-xl bg-zinc-50 p-3 text-sm text-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-300">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Hook
                </p>
                <p className="text-xs leading-5">{idea.hook}</p>
              </div>
              <div className="rounded-xl border border-dashed border-emerald-200 p-3 text-xs text-zinc-700 dark:border-emerald-500/40 dark:text-zinc-300">
                <p className="font-medium text-emerald-700 dark:text-emerald-200">
                  Automation focus
                </p>
                <p>{idea.automationFocus}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {idea.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    #{keyword.replaceAll(" ", "-")}
                  </span>
                ))}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                <p className="font-medium uppercase tracking-wide">
                  Supporting assets
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4">
                  {idea.supportingAssets.map((asset) => (
                    <li key={asset}>{asset}</li>
                  ))}
                </ul>
              </div>
              {onIdeaSelected ? (
                <button
                  onClick={() => onIdeaSelected(idea)}
                  className="mt-auto rounded-xl border border-emerald-200 bg-emerald-50 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-900/60"
                >
                  Send to script builder
                </button>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
