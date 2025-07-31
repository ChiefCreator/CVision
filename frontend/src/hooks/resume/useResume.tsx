import { useResumeAutoUpdate } from '@/api/resume/hooks';
import { useResumeId } from './useResumeId';
import { createContext, useContext } from 'react';
import { useAddSection, useDeleteSection } from '@/api/resumeSection/hooks';
import { ResumeSectionName } from '@/types/resumeSection/sectionName';

// Context
interface ResumeContextType extends ReturnType<typeof useResumeAutoUpdate>  {
  id: string;

  addSection: ({ sectionName, sectionId, dto }: { sectionName: ResumeSectionName; sectionId: string; dto: any }) => void,
  addSectionAsync: ({ sectionName, sectionId, dto }: { sectionName: ResumeSectionName; sectionId: string; dto: any }) => Promise<any>,
  isAddSectionPending: boolean;

  deleteSection: ({ sectionName, sectionId }: { sectionName: ResumeSectionName; sectionId: string; }) => void,
  deleteSectionAsync: ({ sectionName, sectionId }: { sectionName: ResumeSectionName; sectionId: string; }) => Promise<any>,
  isDeleteSectionPending: boolean;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Provider
interface ResumeProviderProps {
  children: React.ReactNode;
}

export function ResumeProvider({ children }: ResumeProviderProps) {
  const id = useResumeId();
  const resumeAutoUpdate = useResumeAutoUpdate(id);

  const { mutate: addSection, mutateAsync: addSectionAsync, isPending: isAddSectionPending } = useAddSection(id);
  const { mutate: deleteSection, mutateAsync: deleteSectionAsync, isPending: isDeleteSectionPending } = useDeleteSection(id);

  return (
    <ResumeContext.Provider value={{
        ...resumeAutoUpdate,
        id,
        addSection,
        addSectionAsync,
        deleteSection,
        deleteSectionAsync,
        isAddSectionPending,
        isDeleteSectionPending
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};


// Hook
export function useResume() {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error('useResume must be used within a provider');
  }

  return context;
}