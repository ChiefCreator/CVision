import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeKeys } from './../resume/queryKeys';

import type { ResumeSectionName } from '@/types/sectionTypes/sectionName';
import type { Resume } from '@/types/resumeTypes/resume';

import { resumeSectionService } from '@/api/resumeSection/resumeSectionService/resumeSectionService';
import { isListResumeSection } from '@/utils/sectionNamesUtils';

export const useAddSection = (resumeId: Resume["id"]) => {
  const queryClient = useQueryClient();
  const queryKey = resumeKeys.detail(resumeId);

  return useMutation({
    mutationFn: ({ sectionName, sectionId }: { sectionName: ResumeSectionName; sectionId: string; dto: any }) => resumeSectionService.createOne({ resumeId, sectionName, sectionId }),
    onMutate: async ({ sectionName, sectionId, dto }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousResume = queryClient.getQueryData(queryKey) as Resume;
      const newResume = structuredClone(previousResume);

      const section = {
        ...dto,
        id: sectionId,
        data: isListResumeSection(sectionName) ? [] : undefined,
      } as any;

      if (sectionName === "customSections") {
        newResume.customSections = newResume.customSections ? [...newResume.customSections, section] : [section];
      } else {
        newResume[sectionName] = section;
      }

      queryClient.setQueryData(queryKey, newResume);

      return { previousResume };
    },
    onError: (_err, _newData, context) => {
      const previousResume = context?.previousResume;

      if (previousResume) {
        queryClient.setQueryData(queryKey, previousResume);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
}
export const useDeleteSection = (resumeId: Resume["id"]) => {
  const queryClient = useQueryClient();
  const queryKey = resumeKeys.detail(resumeId);

  return useMutation({
    mutationFn: ({ sectionName, sectionId }: { sectionName: ResumeSectionName; sectionId: string }) => resumeSectionService.deleteOne({ resumeId, sectionId, sectionName }),
    onMutate: async ({ sectionName, sectionId }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousResume = queryClient.getQueryData(queryKey) as Resume;
      const newResume = structuredClone(previousResume);

      if (sectionName === "customSections") {
        newResume.customSections = newResume.customSections?.filter(section => section.id !== sectionId);
      } else {
        newResume[sectionName] = null as any;
      }

      queryClient.setQueryData(queryKey, newResume);

      return { previousResume };
    },
    onError: (_err, _newData, context) => {
      const previousResume = context?.previousResume;

      if (previousResume) {
        queryClient.setQueryData(queryKey, previousResume);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
}