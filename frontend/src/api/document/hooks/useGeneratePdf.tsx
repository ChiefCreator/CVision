import { toastService } from "@/api/toast/toastService";
import { Toast } from "@/components/toast/Toast/Toast";
import { useMutation } from "@tanstack/react-query";
import { documentService } from "../documentService";

export function useGeneratePdf() {
	const { mutate: generatePdf, data: rawPdfData } = useMutation({
    mutationFn: async (html: string) => {
      const arrayBuffer = await documentService.generatePdf(html);

      const blob = new Blob([arrayBuffer], { type: "application/pdf" });

      return { arrayBuffer, blob };
    },
  });

  const download = (name?: string) => {
    if (!rawPdfData?.blob) {
      toastService.custom(<Toast type="error" title="Ошибка генерации PDF" description="PDF файл еще генерируется. Подождите несколько секунд" />)

      return;
    }

    const url = URL.createObjectURL(rawPdfData.blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${name ?? "document"}.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return { mutate: generatePdf, download, data: rawPdfData };
};