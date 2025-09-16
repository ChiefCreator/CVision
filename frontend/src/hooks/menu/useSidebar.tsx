"use client"

import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { SidebarPerformance } from "@/types/menu/sidebar";
import { createContext, useContext, useState } from 'react';

// Context
interface SidebarContextType {
  performance: SidebarPerformance;
  isStatic: boolean;
  isAbsolute: boolean;
  isOpen: boolean;
  openMenuPath: string[];
  isAnimating: boolean,
  subMenuDropdownType: DropdownTypeEnum;

  setOpenMenuPath: (path: string[]) => void;
  toggle: () => void;
  startAnimating: () => void;
  stopAnimating: () => void;
  changeSubMenuDropdownType: (type: DropdownTypeEnum) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provider
interface SidebarProviderProps {
  children: React.ReactNode;
  performance: SidebarPerformance;
}

export function SidebarProvider({ children, performance }: SidebarProviderProps) {
  const [openMenuPath, setOpenMenuPathState] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [subMenuDropdownType, setSubMenuDropdownType] = useState<DropdownTypeEnum>(DropdownTypeEnum.absolute)

  const setOpenMenuPath = (path: string[]) => setOpenMenuPathState(path);
  const startAnimating = () => setIsAnimating(true);
  const stopAnimating = () => setIsAnimating(false);
  const toggle = () => {
    setIsOpen(prev => !prev);

    startAnimating();
  }
  const changeSubMenuDropdownType = (type: DropdownTypeEnum) => setSubMenuDropdownType(type);

  const isStatic = performance === "static";
  const isAbsolute = performance === "absolute";
  
  return (
    <SidebarContext.Provider value={{
      performance,
      isStatic,
      isAbsolute,
      isOpen,
      openMenuPath,
      isAnimating,
      subMenuDropdownType,

      setOpenMenuPath,
      toggle,
      startAnimating,
      stopAnimating,
      changeSubMenuDropdownType,
    }}>
      {children}
    </SidebarContext.Provider>
  );
};


// Hook
export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a provider');
  }

  return context;
}