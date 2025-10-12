import { BadRequestException, PipeTransform } from '@nestjs/common';
import { DOCUMENT_TYPES } from "../constants/document-types.types";
import { DocumentType } from "../types/document-type.types";

interface DocumentTypeValidationPipeOptions {
	skipUndefined?: boolean;
}

export class DocumentTypeValidationPipe implements PipeTransform {
	constructor(
		private readonly options: DocumentTypeValidationPipeOptions = {}
	) {}

  transform(value: string) {
		const { skipUndefined = false } = this.options;

		if (value === undefined || value === null) {
      if (skipUndefined) return undefined;

      throw new BadRequestException("Тип документа не передан");
    }

    if (!DOCUMENT_TYPES.includes(value as DocumentType)) {
      throw new BadRequestException(
				`Неверный тип документа: ${value}. Поддерживаются следующие типы: ${DOCUMENT_TYPES.join(", ")}`
			);
    }

    return value;
  }
}
