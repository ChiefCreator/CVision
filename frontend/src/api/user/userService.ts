
import { apiClassic } from '@/api/api';
import type { UpdateUser, UploadAvatar, User } from '@/types/user/user';

class UserService {
  constructor() {}

  private readonly BASE_URL_SEGMENT = "/users";
  private readonly api = apiClassic;

  async getCurrentUser() {
		const res = await this.api.get<User>(`${this.BASE_URL_SEGMENT}/me`);

		return res.data;
	}

  async updateCurrentUser(dto: UpdateUser) {
		const res = await this.api.patch<{ message: string }>(`${this.BASE_URL_SEGMENT}/me`, dto, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		});

		return res.data;
	}

	async uploadAvatar(dto: UploadAvatar) {
		const res = await this.api.post<{ message: string }>(`${this.BASE_URL_SEGMENT}/me/avatar`, dto, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		});

		return res.data;
	}
}

export const userService = new UserService()