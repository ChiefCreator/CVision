export const resumeSubsectionKeys = {
  all: ["subsections"] as const,
  list: (sectionId: string) => [...resumeSubsectionKeys.all, "list", sectionId] as const,
  detail: (id: string) => [...resumeSubsectionKeys.all, "detail", id] as const,
};