import { Section } from "@/types/document/section/section";

export interface DeleteOneReq {
	documentId: string;
	id: string;
}

export interface DeleteOneRes {
	deletedSection: Section;
	message: string;
}