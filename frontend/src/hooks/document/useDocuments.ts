import { useCreateResume, useResumesQuery } from "@/api/resume/hooks";
import { sortDocumentsByUpdatedAt } from "@/utils/document/sortDocuments";
import { transformResumesToDocumentFormat } from "@/utils/document/transformDataToDocument";

export function useDocuments() {
  const { data: resumes, isLoading: isResumeLoading } = useResumesQuery();
  const { mutate: createResume, isPending: isCreateResumePending } = useCreateResume();

  const resumesDoc = sortDocumentsByUpdatedAt(transformResumesToDocumentFormat(resumes ?? []));

  const isLoading = isResumeLoading;

  return {
    resumesDoc, isLoading,
    createResume, isCreateResumePending
  };
}