"use client"

import { createContext, useContext, useState } from 'react';
import { SidebarPerformance } from '../types/sidebar';

// Context
interface SidebarContextType {
  performance: SidebarPerformance;
  isStatic: boolean;
  isAbsolute: boolean;
  isOpen: boolean;
  openMenuPath: string[];
  isAnimating: boolean,

  setOpenMenuPath: (path: string[]) => void;
  toggle: () => void;
  startAnimating: () => void;
  stopAnimating: () => void;
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

  const setOpenMenuPath = (path: string[]) => setOpenMenuPathState(path);
  const startAnimating = () => setIsAnimating(true);
  const stopAnimating = () => setIsAnimating(false);
  const toggle = () => {
    setIsOpen(prev => !prev);

    startAnimating();
  }

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

      setOpenMenuPath,
      toggle,
      startAnimating,
      stopAnimating
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