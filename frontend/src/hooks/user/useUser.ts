import { useCurrentUserQuery } from "@/api/user/hooks";

export function useUser() {
  const { data: user, isLoading, isError, ...rest } = useCurrentUserQuery();

  return { user, isLoading, isError, ...rest };
};