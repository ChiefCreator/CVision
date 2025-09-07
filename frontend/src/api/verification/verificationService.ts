import { apiClassic } from '@/api/api';
import { MessageResponse } from "@/types/api/response";


class VerificationService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = "/auth";
  private readonly api = apiClassic;

  async confirmEmail(token: string | null) {
    const res = await this.api.post<MessageResponse>(`${this.BASE_URL_SEGMENT}/email-confirmation`, { token });

    return res.data;
  }
}

export const verificationService = new VerificationService()