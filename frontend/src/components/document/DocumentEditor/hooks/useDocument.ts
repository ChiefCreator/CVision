import { useAutoUpdateDocument } from "@/api/document/hooks/useAutoUpdateDocument";
import { useDocumentEditorContext } from "./useDocumentEditorContext";

export function useDocument(idControlled?: string) {
	const { id } = useDocumentEditorContext();

	return useAutoUpdateDocument(idControlled || id, 1000);
}