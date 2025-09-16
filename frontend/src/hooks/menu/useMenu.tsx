"use client"

import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { createContext, useContext, useState } from 'react';

// Context
interface MenuContextType {
	openMenuPath: string[];
	isHideElements?: boolean;
	isRepeatRegisterArrowNavigation?: boolean;
	subMenuDropdownType?: DropdownTypeEnum;
	setOpenMenuPath: (path: string[]) => void;
	openSubMenu: (level: number, id: string) => void,
	closeSubMenu: (id: string) => void,
	toggleSubMenu: (level: number, id: string) => void,
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Provider
interface MenuProviderProps {
	children: React.ReactNode;
	isHideElements?: boolean;
	isRepeatRegisterArrowNavigation?: boolean;
	subMenuDropdownType?: DropdownTypeEnum;
}

export function MenuProvider({ children, isHideElements, isRepeatRegisterArrowNavigation, subMenuDropdownType }: MenuProviderProps) {
	const [openMenuPath, setOpenMenuPathState] = useState<string[]>([]);

	const setOpenMenuPath = (path: string[]) => setOpenMenuPathState(path);

	const openSubMenu = (level: number, id: string) => {
    setOpenMenuPath([...openMenuPath.slice(0, level), id]);
  }
  const closeSubMenu = (id: string) => {
    setOpenMenuPath(openMenuPath.slice(0, openMenuPath.indexOf(id)));
  }
  const toggleSubMenu = (level: number, id: string) => {
    openMenuPath.includes(id) ? closeSubMenu(id) : openSubMenu(level, id);
  }
	
	return (
		<MenuContext.Provider value={{
			openMenuPath,
			isHideElements,
			isRepeatRegisterArrowNavigation,
			subMenuDropdownType,
			setOpenMenuPath,
			openSubMenu,
			closeSubMenu,
			toggleSubMenu,
		}}>
			{children}
		</MenuContext.Provider>
	);
};


// Hook
export function useMenu() {
	const context = useContext(MenuContext);

	if (!context) {
		throw new Error('useMenu must be used within a provider');
	}

	return context;
}