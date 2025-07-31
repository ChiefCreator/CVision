import { useCallback } from 'react';

import { documentService } from '@/api/document/documentService';
import { DocumentType } from '@/types/document/document';

export function usePdfDownloader() {
  const downloadPdf = useCallback(async (type: DocumentType, id: string) => {
    try {
      const response = await documentService.downloadPdf(type, id);

      if (response.statusText !== "OK") throw new Error("Ошибка при получении PDF");

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
  
      documentService.downloadOnClient(type, id, url);
    } catch (err) {
      console.error("Не удалось скачать PDF:", err);
    }
  }, []);

  return { downloadPdf };
};
