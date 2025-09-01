import { useLoginMutation } from "@/api/auth/hooks";
import { useRequestState } from "../request/useRequestState";

export const useLogin = () => {
	const { mutate, isPending, isSuccess, isError } = useLoginMutation();
	const requestState = useRequestState({ isPending, isSuccess, isError });

	return { mutate, ...requestState };
}