import { LoadingStatus } from "@/types/root";
import { useCallback, useEffect, useState } from "react";

interface UseRequestState {
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
	resetDelay?: number,
}

export const useRequestState = ({ isPending, isSuccess, isError, resetDelay = 2000 }: UseRequestState) => {
	const [state, setStateDispatch] = useState<LoadingStatus>("idle");

	useEffect(() => {
		if (isPending) return setStateDispatch("loading");
		if (isSuccess) return setStateDispatch("success");
		if (isError) return setStateDispatch("error");

		return setStateDispatch("idle");
	}, [isPending, isSuccess, isError, setStateDispatch])

	useEffect(() => {
    let timer = null;

    if (state === "success" || state === "error") {
      timer = setTimeout(() => setState("idle"), resetDelay);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state, resetDelay]);

	const setState = useCallback((state: LoadingStatus) => setStateDispatch(state), [setStateDispatch]);

	return {
		isPending, isSuccess, isError, state,
		setState,
	}
}