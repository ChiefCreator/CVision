import { useDeleteSection } from "@/api/section/hooks/useDeleteSection";
import { useAdaptivePopover } from "@/hooks/position/useAdaptivePopover";
import { ChangeDocumentField } from "@/types/document/changeField";
import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Subsection as SubsectionT } from "@/types/document/section/section";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import { useCallback, useState } from "react";
import { useEditorFormContext } from "../../../hooks/useEditorFormContext";

export function useSubsection<
	T extends DocumentTypeName = DocumentTypeName,
	K extends SectionTemplateKey<T> = SectionTemplateKey<T>
>(subsection: SubsectionT<T, K>) {
	const { id } = subsection;
	const parentId = subsection.parentId!;

	const { document, checkIsOpen, toggleSection, changeField, changeIsAllUpdating } = useEditorFormContext();
	const { mutateAsync } = useDeleteSection();
  const popoverProps = useAdaptivePopover();

	const [isFirstInputFocused, setIsFirstInputFocused] = useState(false);

	const isOpen = checkIsOpen(parentId!, id);

  const deleteSubsection = async () => {
    changeIsAllUpdating(true);
    await mutateAsync({ documentId: document!.id, id });

    changeIsAllUpdating(false);
  }

  const handleClickHeader = () => {
    toggleSection(parentId!, id);
  }

  const handleControlClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    popoverProps.toggle();
  }

	const changeSubsectionField: ChangeDocumentField = (path, value) => {
		return changeField(`sections[id=${parentId}].subsections[id=${id}].${path}`, value);
	}

	const handleClickToChange = useCallback(() => {
    toggleSection(parentId, id, true);
    setIsFirstInputFocused(true);
  }, [popoverProps.toggle, setIsFirstInputFocused]);

	return {
		...subsection,
		isOpen,
		popoverProps,
		isFirstInputFocused,
		changeField: changeSubsectionField,
		deleteSubsection,
		handleClickHeader,
		handleControlClick,
		handleClickToChange,
		setIsFirstInputFocused,
	}
}