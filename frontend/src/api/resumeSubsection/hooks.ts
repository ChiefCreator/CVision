import { resumeSubsectionService } from '@/api/resumeSubsection/resumeSubsectionService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeKeys } from '../document/queryKeys';

import { CUSTOM_SECTIONS_NAME } from '@/constants/resumeSection/sectionNames';

import type { Resume } from '@/types/resume/resume';
import type { ResumeListSectionName } from '@/types/resumeSection/sectionName';
import { isListResumeSection } from '@/utils/resumeSection/isResumeSection';

export const useAddSubsection = (resumeId: Resume["id"], sectionId: string, sectionName: ResumeListSectionName, subsectionName: string) => {
  const queryClient = useQueryClient();
  const queryKey = resumeKeys.detail(resumeId);

  return useMutation({
    mutationFn: ({ subsectionId, dto } : { subsectionId: string; dto?: any }) => resumeSubsectionService.create({ resumeId, subsectionId, subsectionName, sectionName, sectionId, dto }),
    onMutate: async ({ subsectionId, dto = {} }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousResume = queryClient.getQueryData(queryKey) as Resume;
      const newResume = structuredClone(previousResume);

      const subsection = {
        ...dto,
        id: subsectionId
      }

      if (sectionName === CUSTOM_SECTIONS_NAME) {
        const updatedCustomSections = newResume.customSections?.map(section => {
          if (section.data.some(sub => sub.id === subsectionId)) {
            return {
              ...section,
              data: [section.data, subsection]
            };
          }
          return section;
        });

        newResume.customSections = updatedCustomSections;
      } else if (isListResumeSection(sectionName)) {
        newResume[sectionName]?.data.push(subsection);
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