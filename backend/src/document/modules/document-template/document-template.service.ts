import { BadRequestException, Injectable } from '@nestjs/common';


import { DocumentTemplate } from "src/document/types/document-template.types";
import type { DocumentType } from "src/document/types/document-type.types";
import { PrismaService } from "src/prisma/prisma.service";
import { DocumentTypeService } from "../document-type/document-type.service";

@Injectable()
export class DocumentTemplateService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly documentTypeService: DocumentTypeService
  ) {}

  async findById(id: string) {
    const documentTemplate = await this.prismaService.documentTemplate.findUnique({
      where: { id },
    });

    if (!documentTemplate) {
      throw new BadRequestException(`Шаблон не существует.`);
    }

    return documentTemplate;
  }

  async findByKeyAndDocumentType(key: DocumentTemplate, documentType: DocumentType) {
    const { id: documentTypeId } = await this.documentTypeService.findByName(documentType);

    const documentTemplate = await this.prismaService.documentTemplate.findUnique({
      where: {
        documentTypeId_key: {
          key,
          documentTypeId,
        }
      },
    });

    if (!documentTemplate) {
      throw new BadRequestException(`Шаблон "${key}" не существует в документе "${documentType}"`);
    }

    return documentTemplate;
  }
}
