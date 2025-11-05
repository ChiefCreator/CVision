"use client"

import { useAutoUpdateDocument } from "@/api/document/hooks/useAutoUpdateDocument";
import { useDocumentPages } from "@/components/document/Document/hooks/useDocumentPages";
import { useRenderPdf } from "@/components/document/Document/hooks/useRenderPdf";
import { createContext, useContext } from 'react';

// Context
interface DocumentContextType extends
	ReturnType<typeof useAutoUpdateDocument>,
	ReturnType<typeof useDocumentPages>,
	ReturnType<typeof useRenderPdf>
{
	id: string;
};

export const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// Provider
export function DocumentProvider({ id , children}: { id: string, children: React.ReactNode }) {
	const documentData = useAutoUpdateDocument(id, 2000);
	const pagesData = useDocumentPages();
	const pdfData = useRenderPdf({
		data: documentData.delayedDocument,
		pageIndex: pagesData.pageIndex,
		onSetPageCount: pagesData.setPageCount
	});

	return (
		<DocumentContext.Provider value={{
			...documentData,
			...pagesData,
			...pdfData,
			id,
		}}>
			{children}
		</DocumentContext.Provider>
	);
};
// Hook
export function useDocumentContext() {
	const context = useContext(DocumentContext);

	if (!context) {
		throw new Error('useDocumentContext must be used within a provider');
	}

	return context;
}