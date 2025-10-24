import { DocumentTypeName } from "../document/documentType/documentTypeName";
import { SectionData, SectionItemData } from "../document/section/sectionDataMap";
import { SectionTemplateKey } from "../document/sectionTemplate/sectionTemplateKey";

export type BaseAdaptedSection<
	T extends DocumentTypeName,
	K extends SectionTemplateKey<T>
> = SectionItemData<T, K> extends never
	? {
			id: string;
			title: string;
			order: number;
			data?: SectionData<T, K>;
		}
	: {
			id: string;
			title: string;
			order: number;
			data?: SectionData<T, K>;
			subsections: {
				id: string;
				title: string;
				order: number;
				data?: SectionItemData<T, K>;
			}[];
		};