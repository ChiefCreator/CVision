import { apiClassic } from '@/api/api'
import { DocumentType } from '@/types/documentTypes.ts/document';

class DocumentService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = "/documents";
  private readonly api = apiClassic;

  async downloadPdf(type: DocumentType, id: string) {
    return this.api.get<Buffer>(`${this.BASE_URL_SEGMENT}/${type}/${id}/pdf`, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  }
  downloadOnClient(type: DocumentType, id: string, url: string) {
    const link = document.createElement("a");

    link.href = url;
    link.download = `${type}-${id}.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const documentService = new DocumentService()