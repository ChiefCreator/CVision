import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useRef } from 'react';
import { generalSections, resumeKeys } from './queryKeys';
import { resumeService } from '@/api/resume/resumeService';
import { resumeSubsectionService } from '@/api/resumeSubsection/resumeSubsectionService';
import { updateResumeFields } from '@/utils/resumeUtils';
import debounce from 'lodash.debounce';

import type { ResumeListSectionName } from '@/types/sectionTypes/sectionName';
import type { ChangeResumeField } from '@/types/resumeTypes/resumeUpdateFunctions';
import type { Resume, CreateResume, ResumeFieldUpdates } from '@/types/resumeTypes/resume';

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

export const useFieldChange = (onChange: ChangeResumeField, path: string) => {
  return useCallback((val: any) => onChange(path, val), [onChange, path]);
}

export const useGeneralSectionsQuery = () => {
  return useQuery({
    queryKey: generalSections.list(),
    queryFn: () => resumeService.getGeneralSections(),
  });
};
