export const resumeKeys = {
  all: ["resumes"] as const,
  list: () => [...resumeKeys.all, "list"] as const,
  detail: (id: string) => [...resumeKeys.all, "detail", id] as const,
};

export const resumeSubsectionKeys = {
  all: ["subsections"] as const,
  list: (sectionId: string) => [...resumeSubsectionKeys.all, "list", sectionId] as const,
  detail: (id: string) => [...resumeSubsectionKeys.all, "detail", id] as const,
};