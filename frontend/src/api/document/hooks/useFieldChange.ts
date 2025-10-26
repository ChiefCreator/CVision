import { ChangeDocumentField } from "@/types/document/changeField";
import { useCallback } from "react";

export const useFieldChange = <T = any>(onChange: ChangeDocumentField<T>, path: string) => {
	return useCallback((val: any) => onChange(path, val), [onChange, path]);
}