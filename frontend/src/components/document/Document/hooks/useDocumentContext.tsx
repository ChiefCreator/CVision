"use client"

import { Document } from "@/types/document/document";
import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { Status } from "../Document";
import { useDocumentPages } from "./useDocumentPages";

// Context
interface DocumentContextType extends ReturnType<typeof useDocumentPages> { 
	data: Document;
	status: Status;
	setStatus: Dispatch<SetStateAction<Status>>;
};

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