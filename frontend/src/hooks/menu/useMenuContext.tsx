"use client"

import { MenuProps } from "@/components/menu/Menu/Menu";
import { createContext, useContext } from 'react';

// Context
type MenuContextType = Omit<MenuProps, "data" | "level">;

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Provider
interface MenuProviderProps extends MenuContextType {
	children: React.ReactNode;
}

export function MenuProvider({ children, ...props }: MenuProviderProps) {
	return (
		<MenuContext.Provider value={{ ...props }}>
			{children}
		</MenuContext.Provider>
	);
};


// Hook
export function useMenuContext() {
	const context = useContext(MenuContext);

	if (!context) {
		throw new Error('useMenu must be used within a provider');
	}

	return context;
}