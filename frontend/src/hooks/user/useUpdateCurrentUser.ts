import { useUpdateCurrentUserMutation } from "@/api/user/hooks";
import { useRequestState } from "../request/useRequestState";

export const useUpdateCurrentUser = () => {
	const { mutate, isPending, isSuccess, isError } = useUpdateCurrentUserMutation();
	const requestState = useRequestState({ isPending, isSuccess, isError });

	return { mutate, ...requestState };
}