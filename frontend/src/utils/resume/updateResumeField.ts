import type { UpdateResume } from "@/types/resume/resume";

export function updateResumeField<T extends UpdateResume>(resume: T, path: string, value: any): T {
  const keys = path.replace(/\[(["']?)([^\]"']+)\1\]/g, '.[$2]').split('.');
  const newResume = structuredClone(resume);

  let current: any = newResume;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];

    if (key.startsWith("[") && key.endsWith("]")) {
      const id = key.slice(1, -1);

      if (!Array.isArray(current)) {
        current = [];
      }

      let item = current.find((el: any) => el?.id === id);
      if (!item) {
        item = { id };
        current.push(item);
      }

      current = item;
    } else {
      if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
        if (nextKey && nextKey.startsWith('[') && nextKey.endsWith(']')) {
          current[key] = [];
        } else {
          current[key] = {};
        }
      }

      current = current[key];
    }
  }

  const lastKey = keys[keys.length - 1];

  if (lastKey.startsWith('[') && lastKey.endsWith(']')) {
    const id = lastKey.slice(1, -1);

    if (!Array.isArray(current)) {
      current = [];
    }

    let item = current.find((el: any) => el?.id === id);
    if (!item) {
      item = { id };
      current.push(item);
    }

    Object.assign(item, value);
  } else {
    current[lastKey] = value;
  }

  return newResume;
}