import { useDocumentEditorContext } from "./useDocumentEditorContext";

export function useDocumentForm() {
	const { document, ...rest } = useDocumentEditorContext();

	return {
		document: document!,
		...rest,
	}
}