import { useLoginMutation } from "@/api/auth/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRequestState } from "../request/useRequestState";

export const useLogin = () => {
	const { mutate, isPending, isSuccess, isError } = useLoginMutation();
	const requestState = useRequestState({ isPending, isSuccess, isError });

	useEffect(() => {
		if (!isSuccess) return;

	const timeoutId = setTimeout(() => redirect("/"), requestState.resetDelay);

  return () => clearTimeout(timeoutId);
	}, [isSuccess]);

	return { mutate, ...requestState };
}