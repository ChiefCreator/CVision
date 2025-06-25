import { apiClassic } from '@/api/api'

import type { Resume, CreateResume, UpdateResume } from '@/types/resumeTypes';

class ResumeService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = "resumes";

  async getAll() {
    const res = await apiClassic.get<Resume[]>(`/${this.BASE_URL_SEGMENT}`);

    return res.data;
  }
  async getOne(id: Resume["id"]) {
    const res = await apiClassic.get<Resume>(`/${this.BASE_URL_SEGMENT}/${id}`);

    return res.data;
  }

  async create(dto: CreateResume) {
    const res = await apiClassic.post<Resume>(`/${this.BASE_URL_SEGMENT}`, dto);

    return res.data;
  }
  async delete(id: Resume["id"]) {
    const res = await apiClassic.post<Resume>(`/${this.BASE_URL_SEGMENT}/${id}`);

    return res.data;
  }
  async update(id: Resume["id"], dto: UpdateResume) {
    const res = await apiClassic.put<Resume>(`/${this.BASE_URL_SEGMENT}/${id}`, dto);

    return res.data;
  }
}

export const resumeService = new ResumeService()