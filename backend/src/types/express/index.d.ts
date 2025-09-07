import { User } from "prisma/generated/client";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
