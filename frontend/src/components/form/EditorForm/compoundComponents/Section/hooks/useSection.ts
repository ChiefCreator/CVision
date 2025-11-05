import { useCreateSection } from "@/api/section/hooks/useCreateSection";
import { useDocumentEditorContext } from "@/components/document/DocumentEditor/hooks/useDocumentEditorContext";
import { ChangeDocumentField } from "@/types/document/changeField";
import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Section } from "@/types/document/section/section";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import { useCallback } from "react";
import { useEditorFormContext } from "../../../hooks/useEditorFormContext";

export function useSection<
	T extends DocumentTypeName = DocumentTypeName,
	K extends SectionTemplateKey<T> = SectionTemplateKey<T>
>(section: Section<T, K>) {
	const { changeField, changeIsAllUpdating, getHandler } = useDocumentEditorContext();
	const { checkIsOpen, toggleSection } = useEditorFormContext();
	const { mutateAsync: createSection } = useCreateSection();

	const id = section.id;
	const isOpen = checkIsOpen(id);

	const changeSectionField = useCallback<ChangeDocumentField>((path, value) => {
		return changeField(`sections[id=${id}].${path}`, value);
	}, [changeField]);

	const changeSectionTitle = useCallback((val: string) =>
		changeSectionField("title", val),
		[changeSectionField]
  );

	const getSectionDataFieldHandler = useCallback((subPath: string) => {
    return getHandler(`sections[id=${id}].data.${subPath}`);
  }, [id, getHandler]);

	const handleHeadClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const element = e.target as HTMLDivElement;

		if (element.closest(`[data-skip]`)) return;
		
    toggleSection(id);
  }, [id, toggleSection]);

	const addSubsection = useCallback(async () => {
    changeIsAllUpdating(true);
    
    const createdSection = await createSection({
			documentId: section.documentId,
			template: section.template?.allowedChild?.key as any,
			parentId: section.id,
		});

    toggleSection(createdSection.id);
    changeIsAllUpdating(false);
  }, [changeIsAllUpdating, createSection, section.documentId, section.template?.allowedChild?.key, section.id])

	return {
	  ...section,
	  isOpen,
	  changeField: changeSectionField,
		changeTitle: changeSectionTitle,
		getDataFieldHandler: getSectionDataFieldHandler,
	  toggleSection,
	  addSubsection,
	  handleHeadClick,
	  changeIsAllUpdating,
	}
}