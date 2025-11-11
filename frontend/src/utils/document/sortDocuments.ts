import { Document } from "@/types/document/document";

export const sortDocumentsByUpdatedAt = (data: Document[]) => {
  return data.sort((d1, d2) =>
    new Date(d2.updatedAt).getTime() - new Date(d1.updatedAt).getTime()
  );
};