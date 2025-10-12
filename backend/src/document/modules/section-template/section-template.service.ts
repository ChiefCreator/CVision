import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentSectionName } from "src/document/types/document-section-name.types";
import { DocumentType } from "src/document/types/document-type.types";
import { PrismaService } from "src/prisma/prisma.service";
import { DocumentTypeService } from "../document-type/document-type.service";

@Injectable()
export class SectionTemplateService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly documentTypeService: DocumentTypeService
  ) {}

  async findAllDefaultByDocumentType(type: DocumentType) {
    const { id: documentTypeId } = await this.documentTypeService.findByName(type);

    return this.prismaService.sectionTemplate.findMany({
      where: {
        documentTypeId,
        isDefault: true,
      }
    });
  }

  async findById(id: string) {
    const template = await this.prismaService.sectionTemplate.findUnique({ where: { id } });

    if (!template) {
      throw new NotFoundException("Шаблон данных для секции не найден.");
    }

    return template;
  }

  async findByDocumentTypeIdAndKey(documentTypeId: string, key: DocumentSectionName) {
    const template = await this.prismaService.sectionTemplate.findUnique({ where: {
      documentTypeId_key: {
        documentTypeId,
        key,
      }
    } });

    if (!template) {
      throw new NotFoundException("Шаблон данных для секции не найден.");
    }

    return template;
  }
}
