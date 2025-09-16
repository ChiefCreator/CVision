import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./queryKeys";
import { userService } from "./userService";

export const useCurrentUserQuery = () => {
  return useQuery({
    queryFn: () => userService.getCurrentUser(),
		queryKey: userKeys.current(),
		retry: false,
  });
};