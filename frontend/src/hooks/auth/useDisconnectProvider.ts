import { useDisconnectProviderMutation } from "@/api/auth/hooks";
import { useRequestState } from "../request/useRequestState";

export const useDisconnectProvider = () => {
	const { mutate, isPending, isSuccess, isError } = useDisconnectProviderMutation();
	const requestState = useRequestState({ isPending, isSuccess, isError });

	return { disconnect: mutate, ...requestState };
}