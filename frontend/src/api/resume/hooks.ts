import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeKeys } from './queryKeys';
import { resumeService } from '@/services/resumeService';
import type { Resume, CreateResume, UpdateResume } from '@/types/resumeTypes';

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

  return useMutation({
    mutationFn: (dto: UpdateResume) => resumeService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.detail(id) });
    },
  });
};
