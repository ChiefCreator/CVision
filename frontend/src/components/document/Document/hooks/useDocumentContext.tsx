"use client"

import { useDocumentContext as useGlobalDocumentContext } from "@/hooks/document/useDocumentContext";
import { createContext, useContext } from "react";

// Context
interface DocumentContextType extends ReturnType<typeof useGlobalDocumentContext> { };

export const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// Provider
export const DocumentProvider = DocumentContext.Provider;

// Hook
export function useDocumentContext() {
	const context = useContext(DocumentContext);

	if (!context) {
		throw new Error('useDocumentContext must be used within a provider');
	}

	return context;
}