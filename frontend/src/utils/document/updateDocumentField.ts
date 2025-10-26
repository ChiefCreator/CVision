import { UpdateDocument } from "@/types/document/update";
import { set } from "../root/set";

export function updateDocumentField<T extends UpdateDocument>(document: T, path: string, value: any): T {
	const copy = structuredClone(document);

	return set(copy, path, value);
}