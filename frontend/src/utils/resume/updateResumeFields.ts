import type { ResumeFieldUpdates, UpdateResume } from "@/types/resume/resume";
import { updateResumeField } from "./updateResumeField";

export function updateResumeFields<T extends UpdateResume>(resume: T, updates: ResumeFieldUpdates): T {
  let result = structuredClone(resume);

  for (const [path, value] of Object.entries(updates)) {
    result = updateResumeField(result, path, value);
  }
  return result;
}