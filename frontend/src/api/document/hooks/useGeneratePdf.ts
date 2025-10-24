import { useMutation } from "@tanstack/react-query";
import { documentService } from "../documentService";

export function useGeneratePdf() {
	return useMutation({
    mutationFn: async (html: string) => {
      const arrayBuffer = await documentService.generatePdf(html);

      const blob = new Blob([arrayBuffer], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      return { arrayBuffer, blob, url };
    },
    onSettled: (data) => {
      if (data?.url) URL.revokeObjectURL(data.url);
    },
  });
};