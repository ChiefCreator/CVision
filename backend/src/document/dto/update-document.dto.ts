import { IsOptional, IsString } from "class-validator";
import { UpdateSectionDto } from "./update-section.dto";

export class UpdateDocumentDto {
	@IsOptional()
	@IsString({ message: "Название документа должно быть строкой." })
	title?: string;

	@IsOptional()
	@IsString({ message: "Дата обновления должно быть строкой." })
	updatedAt?: string;

	@IsOptional()
	@IsString({ message: "Шаблон документа должен быть строкой." })
	templateId?: string;

	@IsOptional()
	sections?: UpdateSectionDto[];
}