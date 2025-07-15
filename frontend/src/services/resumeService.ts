import { apiClassic } from '@/api/api'

import type { Resume, CreateResume, ResumeFieldUpdates } from '@/types/resumeTypes';

class ResumeService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = "resumes";
  private readonly api = apiClassic;

  async getAll() {
    const res = await this.api.get<Resume[]>(`/${this.BASE_URL_SEGMENT}`);

    return res.data;
  }
  async getOne(id: Resume["id"]) {
    const res = await this.api.get<Resume>(`/${this.BASE_URL_SEGMENT}/${id}`);

    return res.data;
  }

  async create(dto: CreateResume) {
    const res = await this.api.post<Resume>(`/${this.BASE_URL_SEGMENT}`, dto);

    return res.data;
  }
  async delete(id: Resume["id"]) {
    const res = await this.api.post<Resume>(`/${this.BASE_URL_SEGMENT}/${id}`);

    return res.data;
  }
  async update(id: Resume["id"], fieldUpdates: ResumeFieldUpdates) {
    const res = await this.api.put<Resume>(`/${this.BASE_URL_SEGMENT}/${id}`, fieldUpdates);

    return res.data;
  }
}

export const resumeService = new ResumeService()