import { useEffect, useRef } from "react";
import { useTabsContext } from "./useTabsContext";

export function useTabTrigger(value: string) {
  const { value: isActive, setValue, registerTrigger } = useTabsContext();

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerTrigger(ref.current);

    return () => registerTrigger(null);
  }, [registerTrigger]);

  return {
    isActive: isActive === value,
    ref,
    onClick: () => setValue(value),
  };
}