"use client"

import { createContext, useContext, useRef, useState } from 'react';

// Context
interface AbsoluteSidebarContextType {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;

  toggle: () => void;
}

export const AbsoluteSidebarContext = createContext<AbsoluteSidebarContextType | undefined>(undefined);

// Provider
interface StaticSidebarProviderProps {
  children: React.ReactNode;
}

export function AbsoluteSidebarProvider({ children }: StaticSidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <AbsoluteSidebarContext.Provider value={{
      isOpen,
      triggerRef,
      contentRef,

      toggle,
    }}>
      {children}
    </AbsoluteSidebarContext.Provider>
  );
};


// Hook
export function useAbsoluteSidebarContext() {
  const context = useContext(AbsoluteSidebarContext);

  if (!context) {
    throw new Error('useAbsoluteSidebarContext must be used within a provider');
  }

  return context;
}