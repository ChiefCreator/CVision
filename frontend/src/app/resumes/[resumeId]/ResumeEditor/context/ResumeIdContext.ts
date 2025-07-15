import { createContext, useContext } from 'react';

export const ResumeIdContext = createContext<string | undefined>(undefined);

export const useResumeId = () => {
  const context = useContext(ResumeIdContext);

  if (!context) {
    throw new Error("useResumeId must be used within a ResumeIdProvider");
  }

  return context;
};
