import { apiClassic } from '@/api/api'

import { CreateOne, DeleteOne } from './serviceTypes';

class ResumeSectionService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = (resumeId: string) => `/resumes/${resumeId}/sections`;
  private readonly api = apiClassic;

  async createOne({ resumeId, sectionId, sectionName, dto }: CreateOne) {
    const res = await this.api.post<any>(this.BASE_URL_SEGMENT(resumeId), { sectionId, sectionName, dto });

    return res.data;
  }
  async deleteOne({ resumeId, sectionId, sectionName }: DeleteOne) {
    const res = await this.api.post<any>(`${this.BASE_URL_SEGMENT(resumeId)}/${sectionId}`, { sectionName });

    return res.data;
  }
}

export const resumeSectionService = new ResumeSectionService();