import { DocumentFieldUpdates } from "@/types/document/update";
import { parseDocumentFieldUpdates } from "@/utils/document/parseDocumentFieldUpdates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentService } from "../documentService";
import { documentKeys } from "../queryKeys";

export function useUpdateDocument(id: string) {
  const queryClient = useQueryClient();
  const queryKey = documentKeys.detail(id);

  return useMutation({
    mutationFn: (fieldUpdates: DocumentFieldUpdates) => {
      const dto = parseDocumentFieldUpdates(fieldUpdates);

      return documentService.update(id, dto);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};