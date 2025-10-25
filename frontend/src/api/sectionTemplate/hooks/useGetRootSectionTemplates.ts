import { useQuery } from "@tanstack/react-query";
import { sectionTemplateKeys } from "../queryKeys";
import { sectionTemplateService } from "../sectionTemplateService";
import { SectionTemplateQueryFilters } from "../types/queryFilters";

export function useGetRootSectionTemplates(queryFilters?: SectionTemplateQueryFilters) {
	return useQuery({
    queryKey: queryFilters ? sectionTemplateKeys.listWithFilters(queryFilters) : sectionTemplateKeys.list(),
    queryFn: () => sectionTemplateService.getAllRoot(queryFilters),
  });
};