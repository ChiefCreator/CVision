import { useCallback, useMemo, useState } from "react";

interface UseValueProps {
	controlledValue?: string;
	defaultValue?: string;
}

export function useValue({ controlledValue, defaultValue }: UseValueProps) {
	const isControlled = controlledValue !== undefined;

	const [internalValue, setInternalValue] = useState(defaultValue);

	const value = isControlled ? controlledValue : internalValue;

	const changeValue = useCallback((value: string) => {
		if (!isControlled) {
      setInternalValue(value);
    }
	}, [isControlled, setInternalValue])

  return useMemo(() => ({
    value,
    isControlled,
    changeValue,
  }), [value, isControlled, changeValue]);
}