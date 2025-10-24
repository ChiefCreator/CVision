import { Section } from "@/types/document/section/section";

export function extractDataFromSectionsList(sections?: Section[]) {
	return sections?.map(s => s.data);
}