export interface UpdateSectionDto {
	id: string;
	title?: string;
	data?: any;
	subsections?: UpdateSectionDto[];
}