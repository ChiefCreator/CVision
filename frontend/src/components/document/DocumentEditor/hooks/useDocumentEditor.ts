import { useAutoUpdateDocument } from "@/api/document/hooks/useAutoUpdateDocument";

interface UseDocumentEditorProps {
	id: string;
}

export function useDocumentEditor({ id }: UseDocumentEditorProps) {
	const { 
		document,
    delayedDocument,
    isGetLoading,
    isGetError,
    isUpdatePending,
    isAllUpdating,
    changeField,
    changeIsAllUpdating,
	} = useAutoUpdateDocument(id, 1000);

	return {
		document,
    delayedDocument,
    isGetLoading,
    isGetError,
    isUpdatePending,
    isAllUpdating,
    changeField,
    changeIsAllUpdating,
	};
}