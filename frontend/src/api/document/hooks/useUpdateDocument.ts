import { Document } from "@/types/document/document";
import { DocumentFieldUpdates } from "@/types/document/update";
import { parseDocumentFieldUpdates } from "@/utils/document/parseDocumentFieldUpdates";
import { updateDocumentFields } from "@/utils/document/updateDocumentFields";
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
    onMutate: async (fieldUpdates) => {
      await queryClient.cancelQueries({ queryKey });

      const previousDocument = queryClient.getQueryData(queryKey) as Document;

      const newDocument = updateDocumentFields(previousDocument, fieldUpdates);

      queryClient.setQueryData(queryKey, newDocument);

      return { previousDocument };
    },
    onError: (_err, _newData, context) => {
      const previousDocument = context?.previousDocument;

      if (previousDocument) {
        queryClient.setQueryData(queryKey, previousDocument);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
};