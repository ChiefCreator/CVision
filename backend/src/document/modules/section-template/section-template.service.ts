import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentSectionName } from "src/document/types/document-section-name.types";
import { DocumentType } from "src/document/types/document-type.types";
import { PrismaService } from "src/prisma/prisma.service";
import { DocumentTypeService } from "../document-type/document-type.service";
import { QueryFilterDto } from "./dto/query-filter.dto";

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
      },
      include: {
        allowedChild: true,
        allowedParent: true,
      },
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
    const template = await this.prismaService.sectionTemplate.findUnique({
      where: {
        documentTypeId_key: {
          documentTypeId,
          key,
        },
      },
      include: {
        allowedChild: true,
        allowedParent: true,
      },
    });

    if (!template) {
      throw new NotFoundException("Шаблон данных для секции не найден.");
    }

    return template;
  }

  async findAllRoot(queryFilter: QueryFilterDto) {
    const documentTemplates = await this.prismaService.sectionTemplate.findMany({
      where: {
        ...queryFilter,
        allowedParent: null,
      },
      include: {
        allowedChild: true,
        allowedParent: true,
      },
    });

    return documentTemplates;
  }
}
