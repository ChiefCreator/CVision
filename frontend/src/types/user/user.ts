import { AuthMethod } from "../auth/method";
import { OAuthProvider } from "../auth/oauthProviders";
import { BaseEntityFields } from "../root";
import { UserRole } from "./role";

export interface User extends BaseEntityFields {
	email: string;
  password?: string;
  name: string;
  picture?: string;
  role: UserRole;
  isVerified: boolean
  isTwoFactorEnabled: boolean;
  authMethod: AuthMethod;
  accounts: Account[];
}

export interface Account extends BaseEntityFields {
	type: string;
  provider: OAuthProvider;
  refreshToken?: string;
  accessToken: string;
  expiresAt: number;
  email?: string;
}

export interface UpdateUser extends Partial<Pick<User, "email" | "name" | "isVerified" | "isTwoFactorEnabled" | "updatedAt" | "authMethod">> {
  picture?: File | null;
  isResetPicture?: boolean;
};

export interface UploadAvatar {
  picture: string;
}