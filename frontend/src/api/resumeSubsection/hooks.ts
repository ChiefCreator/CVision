import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeKeys } from './../resume/queryKeys';
import { resumeSubsectionService } from '@/api/resumeSubsection/resumeSubsectionService';

import type { ResumeListSectionName } from '@/types/sectionTypes/sectionName';
import type { Resume } from '@/types/resumeTypes/resume';


export const useAddSubsection = (resumeId: Resume["id"], sectionId: string, sectionName: ResumeListSectionName, subsectionName: string) => {
  const queryClient = useQueryClient();
  const queryKey = resumeKeys.detail(resumeId);

  return useMutation({
    mutationFn: ({ subsectionId, dto } : { subsectionId: string; dto?: any }) => resumeSubsectionService.create({ resumeId, subsectionId, subsectionName, sectionId, dto }),
    onMutate: async ({ subsectionId, dto = {} }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousResume = queryClient.getQueryData(queryKey) as Resume;
      const newResume = structuredClone(previousResume);

      if (sectionName === "customSections") {
        const updatedCustomSections = newResume.customSections?.map(section => {
          if (section.data.some(sub => sub.id === subsectionId)) {
            return {
              ...section,
              data: [section.data, { ...dto, id: subsectionId }]
            };
          }
          return section;
        });

        newResume.customSections= updatedCustomSections;
      } else {
        (newResume[sectionName] as any)?.data?.push({ ...dto, id: subsectionId });
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
export const useDeleteSubsection = (resumeId: Resume["id"], sectionId: string, sectionName: ResumeListSectionName, subsectionName: string) => {
  const queryClient = useQueryClient();
  const queryKey = resumeKeys.detail(resumeId);

  return useMutation({
    mutationFn: (subsectionId: string) => resumeSubsectionService.delete({ resumeId, subsectionId, subsectionName, sectionId }),
    onMutate: async (subsectionId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousResume = queryClient.getQueryData(queryKey) as Resume;
      const newResume = structuredClone(previousResume);

      if (sectionName === "customSections") {
        const updatedCustomSections = newResume.customSections?.map(section => {
          if (section.data.some(sub => sub.id === subsectionId)) {
            return {
              ...section,
              data: section.data.filter(sub => sub.id !== subsectionId)
            };
          }
          return section;
        });

        newResume.customSections= updatedCustomSections;
      } else {
        (newResume[sectionName] as any).data = (newResume[sectionName] as any).data.filter((subsection: any) => subsection.id !== subsectionId);
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