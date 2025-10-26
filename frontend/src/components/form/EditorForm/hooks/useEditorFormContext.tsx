"use client"

import { useDocumentEditorContext } from "@/components/document/DocumentEditor/hooks/useDocumentEditorContext";
import { createContext, useContext } from 'react';
import { useToggleSections } from "./useToggleSections";

// Context
interface EditorFormContextType extends
	ReturnType<typeof useDocumentEditorContext>,
	ReturnType<typeof useToggleSections> {};

export const EditorFormContext = createContext<EditorFormContextType | undefined>(undefined);

// Provider
export const EditorFormProvider = EditorFormContext.Provider;

// Hook
export function useEditorFormContext() {
	const context = useContext(EditorFormContext);

	if (!context) {
		throw new Error('useEditorFormContext must be used within a provider');
	}

	return context;
}