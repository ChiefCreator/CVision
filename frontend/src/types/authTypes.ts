import type { BaseEntityFields } from "./rootTypes";

export interface User extends BaseEntityFields {
  name?: string;
  email: string;
}

export interface Auth {
  accessToken: string;
  user: User;
}
