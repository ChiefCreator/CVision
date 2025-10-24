"use client"

import { createContext, useContext } from 'react';
import { TabsVariant } from "../types/tabsVariant";
import { useTabs } from "./useTabs";

// Context
interface TabsContextType extends ReturnType<typeof useTabs> { 
	variant?: TabsVariant;
};

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Provider
export const TabsProvider = TabsContext.Provider;

// Hook
export function useTabsContext() {
	const context = useContext(TabsContext);

	if (!context) {
		throw new Error('useTabsContext must be used within a provider');
	}

	return context;
}