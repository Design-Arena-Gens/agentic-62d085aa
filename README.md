## YouTube Automation Control Room

Automation-first operating system for teams running serious YouTube channels. Generate high-leverage video ideas, lock scripts with baked-in automation cues, and coordinate production, shorts, and distribution from one place optimised for batching and scale.

### Features

- **Idea Engine** – plug in your niche, tone, cadence, and growth goals to generate automation-ready video concepts (with hooks, keywords, and asset packs).
- **Script Blueprint Studio** – runtime-aware script builder that highlights automation cues per section.
- **Production Control Tower** – kanban-style pipeline with owners, priorities, and local-storage persistence so you can track deliverables end to end.
- **Optimization Lab** – retention guardrails, publishing windows, and metadata templates tuned to your audience.
- **Automation Playbooks** – pre-built workflows for launch day, editor hand-offs, and repurposing loops.
- **Distribution Checklist** – keep newsletter, social, and community drops in lockstep after every release.

### Tech

- Next.js App Router with TypeScript
- Tailwind CSS v4 (utility-first styling with CSS Modules)
- Local storage persistence for pipeline data

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and start orchestrating your channel. The main UI lives in `src/app/page.tsx`; components and types live under `src/components` and `src/types`.
