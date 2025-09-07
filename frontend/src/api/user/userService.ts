
import { apiClassic } from '@/api/api';
import type { User } from '@/types/auth/auth';

class UserService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = "/users";
  private readonly api = apiClassic;

  async getCurrentUser() {
		const res = await this.api.get<User>(`${this.BASE_URL_SEGMENT}/me`);

		return res.data;
	}
}

export const userService = new UserService()