import { useResumesQuery } from "@/api/resume/hooks";
import { transformResumesToDocumentFormat } from "@/utils/document/transformDataToDocument";

export function useDocuments() {
  const { data: resumes, isLoading } = useResumesQuery();
  const resumesDoc = transformResumesToDocumentFormat(resumes ?? []);

  return { resumesDoc };
}