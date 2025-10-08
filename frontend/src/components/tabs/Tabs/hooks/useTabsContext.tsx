"use client"

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { TabsVariant } from "../types/tabsVariant";

// Context
interface TabsContextType { 
	value: string;
	variant: TabsVariant;

	setValue: (v: string) => void;
	registerTrigger: (el: HTMLButtonElement | null) => void;
  getTriggers: () => HTMLButtonElement[];
};

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Provider
interface TabsProviderProps {
	value?: string;
	defaultValue?: string;
	variant?: TabsVariant;
	children: React.ReactNode;

	onChangeValue?: (v: string) => void;
}

export function TabsProvider({ value, defaultValue, children, variant = "primary", onChangeValue }: TabsProviderProps) {
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
      triggersRef.current.forEach((ref) => {
        if (ref === el) triggersRef.current.delete(ref);
      });
    }
  }, []);

  const getTriggers = useCallback(() => {
		return Array.from(triggersRef.current);
	}, []);

	return (
		<TabsContext.Provider value={{ value: currentValue, variant, setValue, registerTrigger, getTriggers }}>
			{children}
		</TabsContext.Provider>
	);
};


// Hook
export function useTabsContext() {
	const context = useContext(TabsContext);

	if (!context) {
		throw new Error('useTabsContext must be used within a provider');
	}

	return context;
}