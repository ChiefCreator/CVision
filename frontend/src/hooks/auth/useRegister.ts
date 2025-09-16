import { useRegisterMutation } from "@/api/auth/hooks";
import { useRequestState } from "../request/useRequestState";

export const useRegister = () => {
	const { mutate, isPending, isSuccess, isError } = useRegisterMutation();
	const requestState = useRequestState({ isPending, isSuccess, isError });

	return { mutate, ...requestState };
}