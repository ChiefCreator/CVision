"use client"

import { createContext, useContext, useState } from 'react';

// Context
interface DocumentPageContextType {
  pages: any[];
  pageIndex: number;
  pageNumber: number;
  pagesCount: number;
  isPageIndexMin: boolean,
  isPageIndexMax: boolean,

  setPages: (pages: any[]) => void;
  openPage: (index: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const DocumentPageContext = createContext<DocumentPageContextType | undefined>(undefined);

// Provider
interface DocumentPageProviderProps {
  children: React.ReactNode;
}

export function DocumentPageProvider({ children }: DocumentPageProviderProps) {
  const [pages, setPages] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const pageNumber = pageIndex + 1;
  const pagesCount = pages.length;
  const isPageIndexMin = pageIndex === 0;
  const isPageIndexMax = pageIndex === pagesCount - 1;

  const setAllPages = (pages: any[]) => setPages(pages);

  const openPage = (index: number) => {
    if (index >= 0 && index < pagesCount) {
      setPageIndex(index);
    }
  }
  const nextPage = () => openPage(pageIndex + 1);
  const prevPage = () => openPage(pageIndex - 1);

  return (
    <DocumentPageContext.Provider
      value={{
        pages,
        pageIndex,
        pageNumber,
        pagesCount,
        isPageIndexMin,
        isPageIndexMax,
        openPage,
        nextPage,
        prevPage,
        setPages: setAllPages
      }}>
      {children}
    </DocumentPageContext.Provider>
  );
};


// Hook
export function useDocumentPage() {
  const context = useContext(DocumentPageContext);

  if (!context) {
    throw new Error('useDocumentPage must be used within a provider');
  }

  return context;
}