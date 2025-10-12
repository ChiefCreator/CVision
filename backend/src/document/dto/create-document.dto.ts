import { IsIn, IsOptional, IsString } from "class-validator";
import { DOCUMENT_TYPES } from "../constants/document-types.types";
import { IsDocumentTemplateMatchingType } from "../decorators/is-document-template-matching-type.decorator";
import { DocumentTemplate } from "../types/document-template.types";
import { DocumentType } from "../types/document-type.types";

export class CreateDocumentDto {
	@IsString({ message: "Тип документа должен быть строкой." })
	@IsIn(DOCUMENT_TYPES)
  type: DocumentType;

	@IsString({ message: "Шаблон документа должен быть строкой." })
	@IsDocumentTemplateMatchingType()
	template: DocumentTemplate;

	@IsOptional()
	@IsString({ message: "Название документа должно быть строкой." })
	title?: string;
}