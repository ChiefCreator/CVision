import { useDeleteSection } from "@/api/section/hooks/useDeleteSection";
import { useDocument } from "@/components/document/DocumentEditor/hooks/useDocument";
import { useDocumentEditorContext } from "@/components/document/DocumentEditor/hooks/useDocumentEditorContext";
import { useAdaptivePopover } from "@/hooks/position/useAdaptivePopover";
import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Subsection as SubsectionT } from "@/types/document/section/section";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import { useCallback, useState } from "react";
import { useEditorFormContext } from "../../../hooks/useEditorFormContext";

export function useSubsection<
	T extends DocumentTypeName = DocumentTypeName,
	K extends SectionTemplateKey<T> = SectionTemplateKey<T>
>(subsection: SubsectionT<T, K>) {
	const id = subsection.id;
	const parentId = subsection.parentId!;

	const { id: docId } = useDocumentEditorContext();
	const { changeIsAllUpdating, getHandler } = useDocument(docId);
	const { checkIsOpen, toggleSection } = useEditorFormContext();
	const { mutateAsync } = useDeleteSection();
  const popoverProps = useAdaptivePopover();

	const [isFirstInputFocused, setIsFirstInputFocused] = useState(false);

	const isOpen = checkIsOpen(parentId!, id);

	const getSubsectionDataFieldHandler = useCallback((subPath: string) => {
    return getHandler(`sections[id=${parentId}].subsections[id=${id}].data.${subPath}`);
  }, [parentId, id, getHandler]);

  const deleteSubsection = useCallback(async () => {
    changeIsAllUpdating(true);
    await mutateAsync({ documentId: docId, id });

    changeIsAllUpdating(false);
  }, [docId, id, mutateAsync, changeIsAllUpdating]);

	const toggleFirstInputFocus = useCallback((isFocused?: boolean) => {
		if (isFocused === undefined) {
			return setIsFirstInputFocused(prev => !prev);
		}

		setIsFirstInputFocused(isFocused);
	}, [setIsFirstInputFocused]);

  const handleHeaderClick = useCallback(() => {
    toggleSection(parentId!, id);
  }, [parentId, id]);

  const handleControlClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();

    popoverProps.toggle();
  }, [popoverProps.toggle]);

	const handleClickToChange = useCallback(() => {
    toggleSection(parentId, id, true);
    setIsFirstInputFocused(true);
  }, [popoverProps.toggle, setIsFirstInputFocused]);

	return {
		...subsection,
		isOpen,
		popoverProps,
		isFirstInputFocused,
		getDataFieldHandler: getSubsectionDataFieldHandler,
		deleteSubsection,
		toggleFirstInputFocus,
		handleHeaderClick,
		handleControlClick,
		handleClickToChange,
	}
}