'use client';

import { useEffect, useMemo, useState } from "react";
import { PipelineStage, Priority, VideoTask } from "@/types";

const stages: PipelineStage[] = [
  "Ideas",
  "Scripting",
  "Production",
  "Editing",
  "Ready to Publish",
];

const owners = [
  "Host",
  "Research",
  "Editor",
  "Automation",
  "Distribution",
  "Sponsor",
];

const priorityColors: Record<Priority, string> = {
  High: "bg-rose-100 text-rose-700 dark:bg-rose-400/20 dark:text-rose-200",
  Medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-200",
  Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200",
};

const storageKey = "yt-automation-tasks";

const defaultTasks: VideoTask[] = [
  {
    id: "1",
    title: "Automation Playbook Deep Dive",
    owner: "Host",
    stage: "Scripting",
    due: "2024-02-05",
    priority: "High",
    checklist: [
      "Draft hook variations with retention data",
      "Script screen recordings for automation steps",
    ],
  },
  {
    id: "2",
    title: "Batch shorts remix",
    owner: "Editor",
    stage: "Production",
    due: "2024-02-07",
    priority: "Medium",
    checklist: [
      "Import long-form selects",
      "Apply shorts template + auto captions",
    ],
  },
  {
    id: "3",
    title: "Sponsor bumper automation",
    owner: "Automation",
    stage: "Editing",
    due: "2024-02-09",
    priority: "Low",
    checklist: [
      "Test dynamic ad marker insertion",
      "Verify compliance checklist",
    ],
  },
];

interface NewTask {
  title: string;
  owner: string;
  stage: PipelineStage;
  due: string;
  priority: Priority;
}

export function WorkflowBoard() {
  const [tasks, setTasks] = useState<VideoTask[]>(() => {
    if (typeof window === "undefined") {
      return defaultTasks;
    }
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return defaultTasks;
    try {
      const parsed = JSON.parse(stored) as VideoTask[];
      if (Array.isArray(parsed) && parsed.length) {
        return parsed;
      }
    } catch {
      // ignore parse errors and fall back to defaults
    }
    return defaultTasks;
  });
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    owner: owners[0],
    stage: "Ideas",
    due: "",
    priority: "Medium",
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  const metrics = useMemo(() => {
    const byStage = stages.reduce<Record<PipelineStage, number>>(
      (acc, stage) => ({ ...acc, [stage]: 0 }),
      {
        Ideas: 0,
        Scripting: 0,
        Production: 0,
        Editing: 0,
        "Ready to Publish": 0,
      },
    );
    tasks.forEach((task) => {
      byStage[task.stage] += 1;
    });
    const pctReady =
      tasks.length === 0
        ? 0
        : Math.round(
            (byStage["Ready to Publish"] / tasks.length) * 100,
          );
    return { byStage, pctReady, total: tasks.length };
  }, [tasks]);

  const moveTask = (id: string, stage: PipelineStage) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, stage } : task)),
    );
  };

  const updateChecklist = (id: string, itemIndex: number, checked: boolean) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              checklist: task.checklist.map((item, idx) =>
                idx === itemIndex
                  ? checked
                    ? `✅ ${item}`
                    : item.replace(/^✅\s*/, "")
                  : item,
              ),
            }
          : task,
      ),
    );
  };

  const handleNewTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTask.title.trim()) return;

    const task: VideoTask = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}`,
      title: newTask.title.trim(),
      owner: newTask.owner,
      stage: newTask.stage,
      due: newTask.due || new Date().toISOString().slice(0, 10),
      priority: newTask.priority,
      checklist: [],
    };
    setTasks((prev) => [task, ...prev]);
    setNewTask({
      title: "",
      owner: owners[0],
      stage: "Ideas",
      due: "",
      priority: "Medium",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4 text-sm text-emerald-700 shadow-inner dark:border-emerald-500/40 dark:bg-emerald-950/50 dark:text-emerald-200">
          <p className="text-xs uppercase tracking-wide">Pipeline health</p>
          <p className="mt-1 text-2xl font-semibold">
            {metrics.pctReady}% ready
          </p>
          <p className="text-xs text-emerald-900/70 dark:text-emerald-200/80">
            {metrics.total} active deliverables
          </p>
        </div>
        {stages.map((stage) => (
          <div
            key={stage}
            className="rounded-2xl border border-zinc-200/60 bg-white p-4 text-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {stage}
            </p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {metrics.byStage[stage]}
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleNewTaskSubmit}
        className="grid gap-4 rounded-2xl border border-dashed border-zinc-200 bg-white/80 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60 sm:grid-cols-2 lg:grid-cols-5"
      >
        <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-zinc-500">
          Task Title
          <input
            value={newTask.title}
            onChange={(event) =>
              setNewTask((prev) => ({ ...prev, title: event.target.value }))
            }
            placeholder="Batch shorts, script cold open..."
            className="mt-2 rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-950/70"
            required
          />
        </label>
        <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-zinc-500">
          Owner
          <select
            value={newTask.owner}
            onChange={(event) =>
              setNewTask((prev) => ({ ...prev, owner: event.target.value }))
            }
            className="mt-2 rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-950/70"
          >
            {owners.map((owner) => (
              <option key={owner}>{owner}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-zinc-500">
          Stage
          <select
            value={newTask.stage}
            onChange={(event) =>
              setNewTask((prev) => ({
                ...prev,
                stage: event.target.value as PipelineStage,
              }))
            }
            className="mt-2 rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-950/70"
          >
            {stages.map((stage) => (
              <option key={stage}>{stage}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-zinc-500">
          Due
          <input
            type="date"
            value={newTask.due}
            onChange={(event) =>
              setNewTask((prev) => ({ ...prev, due: event.target.value }))
            }
            className="mt-2 rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-950/70"
          />
        </label>
        <label className="flex flex-col text-xs font-medium uppercase tracking-wide text-zinc-500">
          Priority
          <select
            value={newTask.priority}
            onChange={(event) =>
              setNewTask((prev) => ({
                ...prev,
                priority: event.target.value as Priority,
              }))
            }
            className="mt-2 rounded-xl border border-zinc-200/70 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-950/70"
          >
            {(["High", "Medium", "Low"] as Priority[]).map((priority) => (
              <option key={priority}>{priority}</option>
            ))}
          </select>
        </label>
        <div className="sm:col-span-2 lg:col-span-5">
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:bg-emerald-500 dark:hover:bg-emerald-400"
          >
            Add automation task
          </button>
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-5">
        {stages.map((stage) => (
          <div
            key={stage}
            className="flex flex-col gap-3 rounded-3xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {stage}
              </p>
              <span className="text-xs text-zinc-400">
                {
                  tasks.filter((task) => task.stage === stage).length
                }
              </span>
            </div>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.stage === stage)
                .map((task) => (
                  <article
                    key={task.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow dark:border-zinc-600 dark:bg-zinc-950/70"
                  >
                    <header className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {task.title}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          Owner: {task.owner}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColors[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </header>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                        Due {task.due}
                      </span>
                      <label className="flex items-center gap-2">
                        Move to
                        <select
                          value={task.stage}
                          onChange={(event) =>
                            moveTask(
                              task.id,
                              event.target.value as PipelineStage,
                            )
                          }
                          className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900"
                        >
                          {stages.map((stageOption) => (
                            <option key={stageOption}>{stageOption}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    {task.checklist.length ? (
                      <div className="mt-3 space-y-2 rounded-xl bg-zinc-50 p-3 text-xs text-zinc-600 dark:bg-zinc-900/70 dark:text-zinc-300">
                        <p className="font-semibold uppercase tracking-wide">
                          Automation checklist
                        </p>
                        <ul className="space-y-2">
                          {task.checklist.map((item, idx) => (
                            <li key={item} className="flex items-start gap-2">
                              <input
                                type="checkbox"
                                checked={item.startsWith("✅")}
                                onChange={(event) =>
                                  updateChecklist(
                                    task.id,
                                    idx,
                                    event.target.checked,
                                  )
                                }
                                className="mt-1 h-4 w-4 rounded border border-zinc-300 text-emerald-500 focus:ring-emerald-400"
                              />
                              <span>{item.replace(/^✅\s*/, "")}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </article>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
