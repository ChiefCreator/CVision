import { User } from "prisma/generated/client";

declare global {
  namespace Express {
    namespace Multer {
      export type File = multer.File;
    }

    export interface Request {
      user?: User;
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
    }
  }
}
