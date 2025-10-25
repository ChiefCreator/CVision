import { documentKeys } from "@/api/document/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sectionService } from "../sectionService";
import { DeleteOneReq } from "../types/deleteOne";

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: DeleteOneReq) => sectionService.deleteOne(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.all });
    },
  });
};