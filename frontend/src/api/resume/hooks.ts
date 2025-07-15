import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useRef } from 'react';
import { resumeKeys } from './queryKeys';
import { resumeService } from '@/services/resumeService';
import { resumeSubsectionService } from '@/services/resumeSubsectionService/resumeSubsectionService';
import { updateResumeFields } from '@/utils/resumeUtils';
import debounce from 'lodash.debounce';

import type { Resume, CreateResume, ResumeFieldUpdates, ChangeResumeField, ResumeSectionName, ResumeListSectionName } from '@/types/resumeTypes';

export const useResumesQuery = () => {
  return useQuery({
    queryKey: resumeKeys.list(),
    queryFn: resumeService.getAll,
  });
};
export const useResumeQuery = (id: Resume["id"]) => {
  return useQuery({
    queryKey: resumeKeys.detail(id),
    queryFn: () => resumeService.getOne(id),
    enabled: !!id,
  });
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateResume) => resumeService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.list() });
    },
  });
};
export const useDeleteResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: Resume["id"]) => resumeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.list() });
    },
  });
};

export const useUpdateResume = (id: Resume["id"]) => {
  const queryClient = useQueryClient();
  const queryKey = resumeKeys.detail(id);

  return useMutation({
    mutationFn: (fieldUpdates: ResumeFieldUpdates) => resumeService.update(id, fieldUpdates),
    onMutate: async (fieldUpdates) => {
      await queryClient.cancelQueries({ queryKey });

      const previousResume = queryClient.getQueryData(queryKey) as Resume;

      const newResume = updateResumeFields(previousResume || {}, fieldUpdates);

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
};
export const useResumeAutoUpdate = (id: Resume["id"], timer: number = 800) => {
  const queryClient = useQueryClient();
  const updateQueue = useRef<ResumeFieldUpdates>({});
  const queryKey = useMemo(() => resumeKeys.detail(id), [id]);

  const { data: resume, isLoading: isGetResumeLoading } = useResumeQuery(id);
  const { mutate, isPending: isUpdateResumeLoading } = useUpdateResume(id);

  const debouncedSend = useRef(
    debounce(() => {
      const updates = { ...updateQueue.current };

      updateQueue.current = {};

      if (Object.keys(updates).length > 0) {
        mutate(updates);
      }
    }, timer)
  ).current;

  const changeField: ChangeResumeField = useCallback((path, value) => {
    updateQueue.current[path] = value;

    queryClient.setQueryData(queryKey, (previousResume: Resume | undefined) => {
      if (!previousResume) return previousResume;

      return updateResumeFields(previousResume, { [path]: value });
    });

    debouncedSend();
  }, [queryClient, queryKey]);

  return {
    resume,
    changeField,
    isGetResumeLoading,
    isUpdateResumeLoading,
  };
}

export const useAddSubsection = (resumeId: Resume["id"], sectionId: string, sectionName: ResumeListSectionName, subsectionName: string) => {
  const queryClient = useQueryClient();
  const queryKey = resumeKeys.detail(resumeId);

  return useMutation({
    mutationFn: ({ subsectionId, dto } : { subsectionId: string; dto?: any }) => resumeSubsectionService.create({ resumeId, subsectionId, subsectionName, sectionId, dto }),
    onMutate: async ({ subsectionId, dto = {} }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousResume = queryClient.getQueryData(queryKey) as Resume;
      const newResume = structuredClone(previousResume);

      (newResume[sectionName] as any)?.data?.push({ ...dto, id: subsectionId });

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

      (newResume[sectionName] as any).data = (newResume[sectionName] as any).data.filter((subsection: any) => subsection.id !== subsectionId);

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

export const useFieldChange = (onChange: ChangeResumeField, path: string) => {
  return useCallback((val: string) => onChange(path, val), [onChange, path]);
}
