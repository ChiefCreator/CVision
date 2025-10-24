import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { useQuery } from "@tanstack/react-query";
import { documentService } from "../documentService";
import { documentKeys } from "../queryKeys";

export function useGetDocuments(type?: DocumentTypeName) {
	return useQuery({
    queryKey: type ? documentKeys.type(type) : documentKeys.list(),
    queryFn: () => documentService.getAll(type),
  });
};