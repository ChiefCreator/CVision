import { apiClassic } from '@/api/api';
import { Section } from "@/types/document/section/section";
import { CreateOneReq } from "./types/createOne";
import { DeleteOneReq, DeleteOneRes } from "./types/deleteOne";

class SectionService {
  constructor() {}

  private readonly baseUrlSegment = (documentId: string) => `/documents/${documentId}/sections`;
  private readonly api = apiClassic;

  // create

  async createOne(dto: CreateOneReq) {
    const res = await this.api.post<Section>(this.baseUrlSegment(dto.documentId), dto);

    return res.data;
  }

  // delete

  async deleteOne({ documentId, id }: DeleteOneReq) {
    const res = await this.api.delete<DeleteOneRes>(`${this.baseUrlSegment(documentId)}/${id}`);

    return res.data;
  }
}

export const sectionService = new SectionService()