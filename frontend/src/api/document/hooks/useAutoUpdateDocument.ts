import { ChangeDocumentField } from "@/types/document/changeField";
import { Document } from "@/types/document/document";
import { DocumentFieldUpdates } from "@/types/document/update";
import { updateDocumentFields } from "@/utils/document/updateDocumentFields";
import { useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { documentKeys } from "../queryKeys";
import { useGetDocument } from "./useGetDocument";
import { useUpdateDocument } from "./useUpdateDocument";

export const useAutoUpdateDocument = (id: string, timer: number = 800) => {
  const queryClient = useQueryClient();

	const { data: document, isLoading: isGetLoading, isError: isGetError } = useGetDocument(id);
  const { mutateAsync: update, isPending: isUpdatePending } = useUpdateDocument(id);

	const [isAllUpdating, setIsAllUpdating] = useState(false);
  const [delayedDocument, setDelayedDocument] = useState<Document | undefined>(undefined);

  const fieldUpdatesRef = useRef<DocumentFieldUpdates>({});
  const handlersRef = useRef<Record<string, (arg: any) => void>>({});
  const queryKey = useMemo(() => documentKeys.detail(id), [id]);

	const changeField = useCallback<ChangeDocumentField>((path, value) => {
    setIsAllUpdating(true);

    fieldUpdatesRef.current[path] = value;

    queryClient.setQueryData(queryKey, (prevDoc?: Document) => {
      if (!prevDoc) return prevDoc;

      return updateDocumentFields(prevDoc, { [path]: value });
    });

    debouncedSend();
  }, [queryClient, queryKey]);

  const getHandler = useCallback(
    (
      path: string,
      options?: { extractValue?: (arg: any) => any }
    ) => {
      if (!handlersRef.current[path]) {
        const extractValue =
          options?.extractValue ||
          ((arg: any) => {
            if (arg && typeof arg === "object" && "target" in arg && "value" in arg.target) {
              return arg.target.value;
            }
          
            return arg;
          });
        
        handlersRef.current[path] = (arg: any) => {
          const val = extractValue(arg);
          changeField(path, val);
        };
      }
    
      return handlersRef.current[path];
    },
    [changeField]
  );

  const changeIsAllUpdating = useCallback((isUpdating: boolean) => {
    setIsAllUpdating(isUpdating);
  }, [setIsAllUpdating]);

  const debouncedSend = useRef(
    debounce(async () => {
      const updates = { ...fieldUpdatesRef.current };

      fieldUpdatesRef.current = {};

      if (Object.keys(updates).length > 0) {
        await update(updates);

        setIsAllUpdating(false);
      }
    }, timer)
  ).current;

  useEffect(() => {
    setDelayedDocument(document);
  }, [isGetLoading])

  useEffect(() => {
    if (!isAllUpdating) {
      setDelayedDocument(document);
    }
  }, [isAllUpdating])

  return {
    document,
    delayedDocument,
    isGetLoading,
    isGetError,
    isUpdatePending,
    isAllUpdating,
    changeField,
    changeIsAllUpdating,
    getHandler,
  }
}