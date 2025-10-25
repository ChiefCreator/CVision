export const sectionKeys = {
  all: ["section"] as const,
  list: () => [...sectionKeys.all, "list"] as const,
  detail: (id: string) => [...sectionKeys.all, "detail", id] as const,
};