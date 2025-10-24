import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";

export const documentKeys = {
  all: ["documents"] as const,
  list: () => [...documentKeys.all, "list"] as const,
  type: (type: DocumentTypeName) => [...documentKeys.list(), "type", type] as const,
  detail: (id: string) => [...documentKeys.all, "detail", id] as const,
};