import { Prisma } from "prisma/generated/client";
import { ResultDocumentSettings } from "./document-settings.types";

export type ResultDocument = Omit<Prisma.DocumentGetPayload<{
	include: {
		type: true,
		template: {
			select: {
				id: true,
				key: true,
				title: true,     
				description: true,
				previewUrl: true,
				premium: true,
				supportsFontSizing: true,
				supportsSpacing: true,
				supportsCustomAccentColor: true,
				supportsPhoto: true,
				supportedFormats: true,
			},
		},
	},
}>, "settings">
& {
	sections: Prisma.SectionGetPayload<{
		include: { template: true, subsections: true }
	}>[];
	settings: ResultDocumentSettings;
}