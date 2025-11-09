export type PipelineStage =
  | "Ideas"
  | "Scripting"
  | "Production"
  | "Editing"
  | "Ready to Publish";

export type Priority = "Low" | "Medium" | "High";

export interface VideoTask {
  id: string;
  title: string;
  owner: string;
  stage: PipelineStage;
  due: string;
  priority: Priority;
  checklist: string[];
}

export interface VideoIdea {
  id: string;
  title: string;
  hook: string;
  synopsis: string;
  keywords: string[];
  format: string;
  duration: string;
  automationFocus: string;
  supportingAssets: string[];
  audience?: string;
}

export interface ScriptSection {
  id: string;
  label: string;
  objective: string;
  talkingPoints: string[];
  automationCue?: string;
}
