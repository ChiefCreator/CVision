import { useMemo } from "react";
import { useDeleteSection } from "@/api/resumeSection/hooks";
import type { Control } from "@/components/input/TitleEditor/TitleEditor";
import { ResumeSectionName } from "@/types/sectionTypes/sectionName";
import { Trash2 } from "lucide-react";

interface UseDelete {
  resumeId: string;
  sectionName: ResumeSectionName;
  sectionId: string;
}

export function useDelete({ resumeId, sectionName, sectionId }: UseDelete) {
  const { mutate } = useDeleteSection(resumeId);

  const deleteControlObj = useMemo<Control[]>(() => [
    {
      id: "delete",
      Icon: Trash2,
      onClick: () => mutate({ sectionName, sectionId }),
    }
  ], [mutate]);

  return deleteControlObj;
}