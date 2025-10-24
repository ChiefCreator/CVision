import { useCallback, useRef, useState } from "react";

interface UseTabsProps {
	value?: string;
	defaultValue?: string;

	onChangeValue?: (v: string) => void;
}

export function useTabs({ value, defaultValue, onChangeValue }: UseTabsProps) {
	const [internalValue, setInternalValue] = useState(defaultValue ?? "");
	const triggersRef = useRef<Set<HTMLButtonElement>>(new Set());

	const isControlled = value !== undefined;

	const currentValue = isControlled ? value! : internalValue;

	const setValue = (v: string) => {
		if (!isControlled) setInternalValue(v);

		onChangeValue?.(v);
	};

	const registerTrigger = useCallback((el: HTMLButtonElement | null) => {
		if (el) triggersRef.current.add(el);
		else {
			triggersRef.current.forEach(ref => {
				if (ref === el) triggersRef.current.delete(ref);
			});
		}
	}, []);

	const getTriggers = useCallback(() => {
		return Array.from(triggersRef.current);
	}, []);

	const getCurrentValue = useCallback(() => {
		return currentValue;
	}, [currentValue]);

	return { value: currentValue, setValue, registerTrigger, getTriggers, getCurrentValue };
}
