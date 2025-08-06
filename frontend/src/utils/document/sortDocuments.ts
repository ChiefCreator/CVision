import { Document } from "@/types/document/document";

export const sortDocumentsByUpdatedAt = (data: Document[]) => {
  return data.sort((d1, d2) =>
    new Date(d2.data.updatedAt).getTime() - new Date(d1.data.updatedAt).getTime()
  );
};