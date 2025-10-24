import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentService } from "../documentService";
import { documentKeys } from "../queryKeys";

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => documentService.deleteOne(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.list() });
    },
  });
};