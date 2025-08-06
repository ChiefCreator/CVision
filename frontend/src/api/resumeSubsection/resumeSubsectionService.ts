import { apiClassic } from '@/api/api'

import { CreateOne, DeleteOne } from './serviceTypes';

class ResumeSubsectionService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = (resumeId: string, sectionId: string) => `/resumes/${resumeId}/sections/${sectionId}/subsections`;
  private readonly api = apiClassic;

  async create({ resumeId, sectionId, sectionName, subsectionId, subsectionName, dto }: CreateOne) {
    const res = await this.api.post<any>(this.BASE_URL_SEGMENT(resumeId, sectionId), { resumeId, subsectionId, subsectionName, sectionName, dto });

    return res.data;
  }
  async delete({ resumeId, sectionId, subsectionId, subsectionName }: DeleteOne) {
    const res = await this.api.post<any>(`${this.BASE_URL_SEGMENT(resumeId, sectionId)}/${subsectionId}`, { resumeId, subsectionName });

    return res.data;
  }
}

export const resumeSubsectionService = new ResumeSubsectionService();