import { useQuery } from "@tanstack/react-query";
import { documentService } from "../documentService";
import { documentKeys } from "../queryKeys";

export function useGetDocument(id: string) {
	return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => documentService.getOne(id),
		enabled: !!id,
  });
};