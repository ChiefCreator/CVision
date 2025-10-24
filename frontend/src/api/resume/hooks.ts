import { resumeService } from '@/api/resume/resumeService';
import { updateResumeFields } from '@/utils/resume/updateResumeFields';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { generalSections, resumeKeys } from '../document/queryKeys';

import type { CreateResume, Resume, ResumeFieldUpdates } from '@/types/resume/resume';
import type { ChangeResumeField } from '@/types/resume/resumeUpdateFunctions';

export const useResumesQuery = () => {
  return useQuery({
    queryKey: resumeKeys.list(),
    queryFn: () => resumeService.getAll(),
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
    mutationFn: (dto?: CreateResume) => resumeService.create(dto),
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

  const [isAllUpdating, setIsAllUpdating] = useState(false);
  const [resumeDelayed, setResumeDelayed] = useState<Resume | undefined>(undefined);

  const { data: resume, isLoading: isResumeLoading, isError: isResumeError } = useResumeQuery(id);
  const { mutateAsync, isPending: isUpdateResumePending } = useUpdateResume(id);

  const changeIsAllUpdating = useCallback((isUpdating: boolean) => {
    setIsAllUpdating(isUpdating);
  }, [setIsAllUpdating]);

  const debouncedSend = useRef(
    debounce(async () => {
      const updates = { ...updateQueue.current };

      updateQueue.current = {};

      if (Object.keys(updates).length > 0) {
        await mutateAsync(updates);

        setIsAllUpdating(false);
      }
    }, timer)
  ).current;

  useEffect(() => {
    setResumeDelayed(resume);
  }, [isResumeLoading])
  useEffect(() => {
    if (!isAllUpdating) {
      setResumeDelayed(resume);
    }
  }, [isAllUpdating])

  const changeField: ChangeResumeField = useCallback((path, value) => {
    setIsAllUpdating(true);

    updateQueue.current[path] = value;

    queryClient.setQueryData(queryKey, (previousResume: Resume | undefined) => {
      if (!previousResume) return previousResume;

      return updateResumeFields(previousResume, { [path]: value });
    });

    debouncedSend();
  }, [queryClient, queryKey]);

  return {
    resume,
    resumeDelayed,
    isResumeLoading,
    isResumeError,
    isUpdateResumePending,
    isAllUpdating,
    changeField,
    changeIsAllUpdating
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
