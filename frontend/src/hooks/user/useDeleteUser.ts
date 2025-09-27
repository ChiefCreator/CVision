import { useDeleteUserMutation } from "@/api/user/hooks";
import { useRequestState } from "../request/useRequestState";

export const useDeleteUser = () => {
	const { mutate, isPending, isSuccess, isError } = useDeleteUserMutation();
	const requestState = useRequestState({ isPending, isSuccess, isError });

	return { mutate, ...requestState };
}