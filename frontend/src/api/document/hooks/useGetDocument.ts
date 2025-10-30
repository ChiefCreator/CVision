import { Document } from "@/types/document/document";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";
import { documentService } from "../documentService";
import { documentKeys } from "../queryKeys";

export function useGetDocument(id: string) {
	return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => documentService.getOne(id),
		enabled: !!id,
  });
};

export function useDocumentSelector<T>(
  id: string,
  selector: (doc?: Document) => T
): T {
  const queryClient = useQueryClient();
  const queryKey = documentKeys.detail(id);

  const subscribe = (callback: () => void) =>
    queryClient.getQueryCache().subscribe((event) => {
      if (event.query.queryKey === queryKey || JSON.stringify(event.query.queryKey) === JSON.stringify(queryKey)) {
        queueMicrotask(callback);
      }
    });


  const getSnapshot = () => {
    const doc = queryClient.getQueryData<Document>(queryKey);
		
    return selector(doc);
  };

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export const useDocumentTitle = (id: string) => useDocumentSelector(id, (doc) => doc?.title);

export const useDocumentTypeName = (id: string) => useDocumentSelector(id, (doc) => doc?.type.name);

export const useDocumentSections = (id: string) => useDocumentSelector(id, (doc) => doc?.sections);