"use client"

import { DropdownTypeEnum } from "@/types/menu/dropdown";
import { createContext, useContext, useState } from 'react';

// Context
interface StaticSidebarContextType {
  isOpen: boolean;
  isAnimating: boolean,
  subMenuDropdownType: DropdownTypeEnum;

  toggle: () => void;
  startAnimating: () => void;
  stopAnimating: () => void;
  changeSubMenuDropdownType: (type: DropdownTypeEnum) => void;
}

export const StaticSidebarContext = createContext<StaticSidebarContextType | undefined>(undefined);

// Provider
interface StaticSidebarProviderProps {
  children: React.ReactNode;
}

export function StaticSidebarProvider({ children }: StaticSidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [subMenuDropdownType, setSubMenuDropdownType] = useState<DropdownTypeEnum>(DropdownTypeEnum.absolute);

  const startAnimating = () => setIsAnimating(true);
  const stopAnimating = () => setIsAnimating(false);

  const toggle = () => {
    setIsOpen(prev => !prev);

    startAnimating();
  }

  const changeSubMenuDropdownType = (type: DropdownTypeEnum) => setSubMenuDropdownType(type);
  
  return (
    <StaticSidebarContext.Provider value={{
      isOpen,
      isAnimating,
      subMenuDropdownType,

      toggle,
      startAnimating,
      stopAnimating,
      changeSubMenuDropdownType,
    }}>
      {children}
    </StaticSidebarContext.Provider>
  );
};


// Hook
export function useStaticSidebarContext() {
  const context = useContext(StaticSidebarContext);

  if (!context) {
    throw new Error('useStaticSidebarContext must be used within a provider');
  }

  return context;
}