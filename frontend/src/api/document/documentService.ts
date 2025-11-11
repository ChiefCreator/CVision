import { apiClassic } from '@/api/api';
import { Document } from "@/types/document/document";
import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { UpdateDocumentDto } from "@/types/document/update";
import { CreateDocumentDto, DeleteOne } from "./documentServiceTypes";

class DocumentService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = "/documents";
  private readonly api = apiClassic;

  // find

  async getOne(id: string) {
    const res = await this.api.get<Document>(`${this.BASE_URL_SEGMENT}/${id}`);

    return res.data;
  }

  async getAll(type?: DocumentTypeName) {
    const res = await this.api.get<Document[]>(this.BASE_URL_SEGMENT, {
      params: { type },
    });

    return res.data;
  }

  // create

  async createOne(dto: CreateDocumentDto) {
    const res = await this.api.post<Document>(this.BASE_URL_SEGMENT, dto);

    return res.data;
  }

  // update

  async update(id: string, dto: UpdateDocumentDto) {
    const res = await this.api.patch<Document>(`${this.BASE_URL_SEGMENT}/${id}`, dto);

    return res.data;
  }

  // delete

  async deleteOne(id: string) {
    const res = await this.api.delete<DeleteOne>(`${this.BASE_URL_SEGMENT}/${id}`);

    return res.data;
  }

  // export 

  async generatePdf(html: string) {
    const res = await this.api.post<ArrayBuffer>(`${this.BASE_URL_SEGMENT}/export/pdf`,
      { html },
      { responseType: "arraybuffer" }
    );

    return res.data;
  }
}

export const documentService = new DocumentService()