import { SectionTemplateQueryFilters } from "./types/queryFilters";

export const sectionTemplateKeys = {
  all: ["section-templates"] as const,
  list: () => [...sectionTemplateKeys.all, "list"] as const,
  listWithFilters: (filters: SectionTemplateQueryFilters) => [...sectionTemplateKeys.list(), { filters }] as const,
  detail: (id: string) => [...sectionTemplateKeys.all, "detail", id] as const,
};