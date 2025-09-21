import { useChangeEmailMutation } from "@/api/auth/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRequestState } from "../request/useRequestState";

export const useChangeEmail = () => {
	const { mutate, isPending, isSuccess, isError } = useChangeEmailMutation();
	const requestState = useRequestState({ isPending, isSuccess, isError });

	useEffect(() => {
		if (!isSuccess || !isError) return;

		const timeoutId = setTimeout(() => redirect("/"), requestState.resetDelay);

		return () => clearTimeout(timeoutId);
	}, [isSuccess, isError, requestState.resetDelay, redirect]);

	return { mutate, ...requestState };
}