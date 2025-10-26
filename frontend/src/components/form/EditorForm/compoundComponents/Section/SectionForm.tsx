import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import { useSection } from "./hooks/useSection";
import Section from "./Section";

import { Section as SectionT } from "@/types/document/section/section";

interface SectionFormProps<
  T extends DocumentTypeName = DocumentTypeName,
  K extends SectionTemplateKey<T> = SectionTemplateKey<T>
> {
	type: "single" | "nested";
  section: SectionT<T, K>;
  children: (props: {
    data: SectionT<T, K>["data"];
    changeField: (path: string, val: string) => void;
    subsections: SectionT<T, K>["subsections"];
  }) => React.ReactNode;
}

export function SectionForm<T extends DocumentTypeName, K extends SectionTemplateKey<T>>({
  section,
  type,
	children,
}: SectionFormProps<T, K>) {
  const sectionData = useSection(section);

	const {
		data,
    subsections,
		title,
    template,
    isOpen,
    changeField,
    toggleSection,
    addSubsection,
    onHeadClick,
    changeIsAllUpdating,
	} = sectionData;

  return (
    <Section
      id={section.id}
      type={type}
      title={title as string}
      template={template as any}
      isOpen={isOpen}
      toggleSection={toggleSection}
      addSubsection={addSubsection}
      onHeadClick={onHeadClick}
      changeField={changeField}
      changeIsAllUpdating={changeIsAllUpdating}
    >
      {children({ data, subsections, changeField })}
    </Section>
  );
}
