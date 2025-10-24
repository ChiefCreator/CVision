import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentService } from "../documentService";
import { CreateDocumentDto } from "../documentServiceTypes";
import { documentKeys } from "../queryKeys";

export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateDocumentDto) => documentService.createOne(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.list() });
    },
  });
};