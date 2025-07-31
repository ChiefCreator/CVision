export type ChangeResumeField = (path: string, value: any) => void;

export type ResumeSectionChangeObj<T, P extends keyof T = never> = {
  [key in keyof Required<Omit<T, "id" | "defaultTitle" | "order" | (P extends never ? never : P)>>]: (val: any) => void
};