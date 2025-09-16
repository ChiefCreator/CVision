"use client"

import { createContext, useContext, useState } from 'react';
import { DocumentTabType } from '../types/document';
import { useDocuments } from '@/hooks/document/useDocuments';
import { UseMutateFunction } from '@tanstack/react-query';
import { Resume } from '@/types/resume/resume';
import { Document } from '@/types/document/document';

// Context
interface DocumentTabsContextType {
  resumesDoc: Document[];
  isLoading: boolean;
  createResume: UseMutateFunction<Resume, Error, Partial<Resume> | undefined, unknown>;
  isCreateResumePending: boolean;
  activeTab: DocumentTabType;
  changeTab: (tab: DocumentTabType) => void;
}

export const DocumentTabsContext = createContext<DocumentTabsContextType | undefined>(undefined);

// Provider
interface DocumentTabsProviderProps {
  children: React.ReactNode;
}

export function DocumentTabsProvider({ children }: DocumentTabsProviderProps) {
  const { resumesDoc, isLoading, createResume, isCreateResumePending } = useDocuments();
  const [activeTab, setActiveTab] = useState<DocumentTabType>("all");

  const changeTab = (tab: DocumentTabType) => setActiveTab(tab);

  return (
    <DocumentTabsContext.Provider
      value={{
        resumesDoc, isLoading,
        createResume, isCreateResumePending,
        activeTab, changeTab,

      }}>
      {children}
    </DocumentTabsContext.Provider>
  );
};


// Hook
export function useDocumentTabsContext() {
  const context = useContext(DocumentTabsContext);

  if (!context) {
    throw new Error('useDocumentTabsContext must be used within a provider');
  }

  return context;
}