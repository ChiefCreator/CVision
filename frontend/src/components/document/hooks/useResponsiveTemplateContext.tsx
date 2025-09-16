import { createContext, useContext } from 'react';

// Context
interface ResponsiveTemplateContextType  {
  isRecalc: boolean;
}

export const ResponsiveTemplateContext = createContext<ResponsiveTemplateContextType | undefined>(undefined);

// Provider
interface ResumeProviderProps {
  children: React.ReactNode;
  isRecalc: boolean;
}

export function ResponsiveTemplateProvider({ children, isRecalc }: ResumeProviderProps) {
  return (
    <ResponsiveTemplateContext.Provider value={{ isRecalc }}>
      {children}
    </ResponsiveTemplateContext.Provider>
  );
};


// Hook
export function useResponsiveTemplateContext() {
  return useContext(ResponsiveTemplateContext) ?? { isRecalc: false };
}