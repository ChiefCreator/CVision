import { documentKeys } from "@/api/document/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sectionService } from "../sectionService";
import { CreateOneReq } from "../types/createOne";

export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: CreateOneReq) => sectionService.createOne(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.all });
    },
  });
};