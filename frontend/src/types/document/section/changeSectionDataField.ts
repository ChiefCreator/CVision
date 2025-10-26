import { useFieldChange } from "@/api/resume/hooks";
import { DocumentTypeName } from "../documentType/documentTypeName";
import { SectionTemplateKey } from "../sectionTemplate/sectionTemplateKey";
import { SectionData } from "./sectionDataMap";

export type ChangeSectionDataField<T extends DocumentTypeName, K extends SectionTemplateKey<T>> = {
	[key in keyof Required<SectionData<T, K>>]: ReturnType<typeof useFieldChange>;
}

export type ChangeResumeSectionDataField<T extends SectionTemplateKey<"resume">> = {
	[key in keyof Required<SectionData<"resume", T>>]: ReturnType<typeof useFieldChange>;
}