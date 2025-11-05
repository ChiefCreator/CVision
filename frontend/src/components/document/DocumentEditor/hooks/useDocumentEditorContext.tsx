"use client"

import { useDocumentContext } from "@/hooks/document/useDocumentContext";
import { createContext, useContext } from 'react';

// Context
interface DocumentEditorContextType extends ReturnType<typeof useDocumentContext> {};

export const DocumentEditorContext = createContext<DocumentEditorContextType | undefined>(undefined);

// Provider
export const DocumentEditorProvider = DocumentEditorContext.Provider;

// Hook
export function useDocumentEditorContext() {
	const context = useContext(DocumentEditorContext);

	if (!context) {
		throw new Error('useDocumentEditorContext must be used within a provider');
	}

	return context;
}