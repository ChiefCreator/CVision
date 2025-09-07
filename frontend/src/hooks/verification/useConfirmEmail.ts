import { useConfirmEmailMutation } from "@/api/verification/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRequestState } from "../request/useRequestState";

export const useConfirmEmail = () => {
	const { mutate, isPending, isSuccess, isError } = useConfirmEmailMutation();
	const requestState = useRequestState({ isPending, isSuccess, isError });

	useEffect(() => {
		if (!isSuccess && !isError) return;

		const path = isSuccess ? "/" : "/auth/login";
		const timeoutId = setTimeout(() => redirect(path), requestState.resetDelay);

		return () => clearTimeout(timeoutId);
	}, [isSuccess, isError, requestState.resetDelay, redirect]);

	return { mutate, ...requestState };
}