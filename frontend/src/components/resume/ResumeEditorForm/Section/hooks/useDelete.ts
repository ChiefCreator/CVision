import { useMemo } from "react";
import { useDeleteSection } from "@/api/resumeSection/hooks";
import type { Control } from "@/components/input/TitleEditor/TitleEditor";
import { ResumeSectionName } from "@/types/resumeSection/sectionName";
import { Trash2 } from "lucide-react";
import { useResume } from "@/hooks/resume/useResume";

interface UseDelete {
  sectionName: ResumeSectionName;
  sectionId: string;
}

export function useDelete({ sectionName, sectionId }: UseDelete) {
  const { deleteSectionAsync, changeIsAllUpdating } = useResume();

  const deleteControlObj = useMemo<Control[]>(() => [
    {
      id: "delete",
      Icon: Trash2,
      onClick: async () => {
        changeIsAllUpdating(true);
        await deleteSectionAsync({ sectionName, sectionId })
        changeIsAllUpdating(false);
      },
    }
  ], [deleteSectionAsync]);

  return deleteControlObj;
}