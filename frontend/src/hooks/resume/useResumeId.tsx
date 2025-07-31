import { createContext, useContext } from 'react';

export const ResumeIdContext = createContext<string | undefined>(undefined);

interface ResumeIdProviderProps {
  children: React.ReactNode;
  id: string;
}

export function ResumeIdProvider({ children, id }: ResumeIdProviderProps) {
  return (
    <ResumeIdContext.Provider value={id}>
      {children}
    </ResumeIdContext.Provider>
  );
}

export const useResumeId = () => {
  const context = useContext(ResumeIdContext);

  if (!context) {
    throw new Error("useResumeId must be used within a ResumeIdProvider");
  }

  return context;
};
