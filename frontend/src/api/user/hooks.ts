import { UpdateUser, UploadAvatar } from "@/types/user/user";
import { toastMessageHandler } from "@/utils/toast/toastResponseHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "./queryKeys";
import { userService } from "./userService";

export const useCurrentUserQuery = () => {
  return useQuery({
    queryFn: () => userService.getCurrentUser(),
		queryKey: userKeys.current(),
		retry: false,
  });
};

export const useUpdateCurrentUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateUser) => userService.updateCurrentUser(dto),
		mutationKey: userKeys.current(),
    onSuccess(res) {
      toastMessageHandler(res);

      queryClient.invalidateQueries({ queryKey: userKeys.current() });
    },
    onError(error) {
      toastMessageHandler(error);
    }
  });
};

export const useUploadAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UploadAvatar) => userService.uploadAvatar(dto),
		mutationKey: userKeys.current(),
    onSuccess(res) {
      toastMessageHandler(res);

      queryClient.invalidateQueries({ queryKey: userKeys.current() });
    },
    onError(error) {
      toastMessageHandler(error);
    }
  });
};