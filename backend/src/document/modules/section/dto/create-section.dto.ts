import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DocumentSectionName } from "src/document/types/document-section-name.types";

export class CreateSectionDto {
	@IsOptional()
	@IsString({ message: "Название секции должно быть строкой." })
	title?: string;

	@IsNotEmpty({ message: "Шаблон секции должен быть обязательным." })
	@IsString({ message: "Шаблон секции должен быть строкой." })
	template: DocumentSectionName;

	@IsOptional()
	@IsString({ message: "parentId секции должен быть строкой." })
	parentId?: string;

	@IsOptional()
	data?: any;

	@IsOptional()
	subsections?: CreateSectionDto[];
}
