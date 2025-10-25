import { apiClassic } from '@/api/api';
import { SectionTemplate } from "@/types/document/sectionTemplate/sectionTemplate";
import { SectionTemplateQueryFilters } from "./types/queryFilters";

class SectionTemplateService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = "/section-templates";
  private readonly api = apiClassic;

  // find

  async getAllRoot(queryFilters?: SectionTemplateQueryFilters) {
    const res = await this.api.get<SectionTemplate[]>(`${this.BASE_URL_SEGMENT}/root`, {
      params: queryFilters,
    });

    return res.data;
  }
}

export const sectionTemplateService = new SectionTemplateService()