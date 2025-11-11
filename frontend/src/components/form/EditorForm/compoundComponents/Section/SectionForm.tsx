import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import { useSection } from "./hooks/useSection";
import Section from "./Section";

import { Section as SectionT } from "@/types/document/section/section";

import { memo } from "react";

interface SectionFormProps<
  T extends DocumentTypeName = DocumentTypeName,
  K extends SectionTemplateKey<T> = SectionTemplateKey<T>
> {
	type: "single" | "nested";
  section: SectionT<T, K>;
  children: (props: {
    data: SectionT<T, K>["data"];
    onChangeField: (path: string, val: string) => void;
    getDataFieldHandler: (path: string, options?: {
      extractValue?: ((arg: any) => any);
    }) => (arg: any) => void;
    subsections: SectionT<T, K>["subsections"];
  }) => React.ReactNode;
}

function SectionFormF<T extends DocumentTypeName, K extends SectionTemplateKey<T>>({
  section,
  type,
	children,
}: SectionFormProps<T, K>) {
  const {
		data,
    subsections,
		title,
    template,
    isOpen,
    deleteControls,
    changeField,
    changeTitle,
    toggleSection,
    addSubsection,
    handleHeadClick,
    changeIsAllUpdating,
    getDataFieldHandler,
	} = useSection(section);

  return (
    <Section
      id={section.id}
      type={type}
      title={title as string}
      template={template as any}
      isOpen={isOpen}
      deleteControls={deleteControls}
      onToggleSection={toggleSection}
      onAddSubsection={addSubsection}
      onHeadClick={handleHeadClick}
      onChangeTitle={changeTitle}
      onChangeIsAllUpdating={changeIsAllUpdating}
    >
      {children({
        data,
        subsections,
        onChangeField: changeField,
        getDataFieldHandler,
      })}
    </Section>
  );
}

export const SectionForm = memo(SectionFormF) as <T extends DocumentTypeName, K extends SectionTemplateKey<T>>(
  props: SectionFormProps<T, K>
) => React.JSX.Element;
