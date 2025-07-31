import type { BaseEntityFields } from "../root";

export interface User extends BaseEntityFields {
  name?: string;
  email: string;
}

export interface Auth {
  accessToken: string;
  user: User;
}
