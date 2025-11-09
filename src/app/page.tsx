'use client';

import { useMemo, useState } from "react";
import { IdeaGenerator } from "@/components/IdeaGenerator";
import { ScriptPlanner } from "@/components/ScriptPlanner";
import { WorkflowBoard } from "@/components/WorkflowBoard";
import { OptimizationPanel } from "@/components/OptimizationPanel";
import { AutomationPlaybooks } from "@/components/AutomationPlaybooks";
import { DistributionPlanner } from "@/components/DistributionPlanner";
import { SectionCard } from "@/components/SectionCard";
import { VideoIdea } from "@/types";

export default function Home() {
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<VideoIdea | undefined>();

  const stats = useMemo(
    () => [
      {
        label: "Automation-ready concepts",
        value: ideas.length.toString().padStart(2, "0"),
        description: "Latest batch generated for this sprint.",
      },
      {
        label: "Publish velocity",
        value: "4.5x",
        description: "Output multiplier over the last 30 days.",
      },
      {
        label: "Pipeline reliability",
        value: "97%",
        description: "Tasks that shipped on schedule this quarter.",
      },
      {
        label: "Retention lift",
        value: "+18%",
        description: "Average improvement after automation rollout.",
      },
    ],
    [ideas.length],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-emerald-50 px-4 pb-20 pt-12 font-sans dark:from-black dark:via-zinc-950 dark:to-emerald-950/60 sm:px-6 lg:px-0">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <header className="relative overflow-hidden rounded-[36px] border border-emerald-200/60 bg-white/80 p-8 shadow-xl shadow-emerald-100/60 backdrop-blur dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:shadow-black/40 sm:p-12">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-200/60 blur-3xl dark:bg-emerald-500/30" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="inline-flex max-w-fit items-center gap-3 rounded-full border border-emerald-300/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 shadow-sm dark:border-emerald-500/40 dark:bg-emerald-900/60 dark:text-emerald-200">
              Youtube Automation HQ · Control Room
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.4fr,1fr]">
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                  Orchestrate your entire YouTube machine from one command
                  center.
                </h1>
                <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-300">
                  Generate automation-first video ideas, ship bulletproof
                  scripts, and coordinate editors, shorts, and distribution in a
                  single workspace designed for scale. Plug in your niche and
                  let the systems handle the rest.
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-200/70 bg-emerald-50/60 p-6 text-sm text-emerald-700 shadow-inner dark:border-emerald-500/40 dark:bg-emerald-950/50 dark:text-emerald-200">
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Automation snapshot
                </p>
                <ul className="mt-3 space-y-2 text-xs leading-5">
                  <li>• Zapier + Make scenarios sync tasks from Notion board</li>
                  <li>• AI-assisted script drafts feed straight into Descript</li>
                  <li>• Shorts remix engine auto-queues highlights post launch</li>
                  <li>• Metadata templates keep SEO dialed-in with no manual toil</li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm shadow-emerald-100/60 dark:border-zinc-700 dark:bg-zinc-900/70"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        <SectionCard
          title="Automation-first idea engine"
          description="Produce high-leverage concepts tailored to your niche, cadence, and growth goals."
          accent="emerald"
        >
          <IdeaGenerator
            onIdeasGenerated={setIdeas}
            onIdeaSelected={setSelectedIdea}
          />
        </SectionCard>

        <SectionCard
          title="Script blueprint studio"
          description="Turn winning ideas into ready-to-record scripts with automation cues baked into every beat."
          accent="sky"
        >
          <ScriptPlanner selectedIdea={selectedIdea} />
        </SectionCard>

        <SectionCard
          title="Production control tower"
          description="Track owners, deadlines, and automation checklists across the entire YouTube pipeline."
          accent="amber"
        >
          <WorkflowBoard />
        </SectionCard>

        <SectionCard
          title="Optimization lab"
          description="Dial in retention, publishing windows, and metadata templates for predictable growth."
          accent="fuchsia"
        >
          <OptimizationPanel idea={selectedIdea} />
        </SectionCard>

        <SectionCard
          title="Automation playbooks"
          description="Activate pre-built workflows that hand-off between scripting, editing, and distribution automatically."
        >
          <AutomationPlaybooks />
        </SectionCard>

        <SectionCard
          title="Distribution checklist"
          description="Close the loop with one-click tracking for newsletters, socials, and community drops."
        >
          <DistributionPlanner />
        </SectionCard>
      </main>
    </div>
  );
}
