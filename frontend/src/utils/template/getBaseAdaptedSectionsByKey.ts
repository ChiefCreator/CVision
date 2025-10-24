import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Section } from "@/types/document/section/section";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import { BaseAdaptedSection } from "@/types/template/baseAdaptedSection";

export function getBaseAdaptedSectionsByKey<
	T extends DocumentTypeName,
	K extends SectionTemplateKey<T>
>(sections: Section<T, any>[], key: K): BaseAdaptedSection<T, K>[] {
	const matchedSections = sections.filter(s => s.template.key === key);

	return matchedSections.map(section => {
		const base = {
			id: section.id,
			title: section.title ?? section.template.title,
			order: section.order,
			data: section.data,
		} as BaseAdaptedSection<T, K>;

		if (section.subsections.length > 0) {
			return {
				...base,
				subsections: section.subsections.map(sub => ({
					id: sub.id,
					title: sub.title ?? sub.template.title,
					order: sub.order,
					data: sub.data,
				})),
			};
		}

		return base;
	});
}
