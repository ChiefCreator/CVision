import type { ResumeFieldUpdates, UpdateResume } from "@/types/resumeTypes";

export function updateResumeField<T extends UpdateResume>(resume: T, path: string, value: any): T {
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  const newResume = structuredClone(resume);

  let current: any = newResume;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
      const nextKey = keys[i + 1];
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }

    current = current[key];
  }

  const lastKey = keys[keys.length - 1];

  current[lastKey] = value;

  return newResume;
}
export function updateResumeFields<T extends UpdateResume>(resume: T, updates: ResumeFieldUpdates): T {
  let result = structuredClone(resume);

  for (const [path, value] of Object.entries(updates)) {
    result = updateResumeField(result, path, value);
  }
  return result;
}
