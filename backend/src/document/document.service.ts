import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';

import { DOCUMENTS_MAP } from './constants/documents-map';

import { PrismaService } from "src/prisma/prisma.service";
import { DOCUMENT_TEMPLATES_MAP } from "./constants/document-templates-map.constants";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { DocumentTemplateService } from "./modules/document-template/document-template.service";
import { DocumentTypeService } from "./modules/document-type/document-type.service";
import { SectionService } from "./modules/section/section.service";
import type { DocumentType } from './types/document-type.types';

@Injectable()
export class DocumentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly documentTypeService: DocumentTypeService,
    private readonly documentTemplateService: DocumentTemplateService,
    @Inject(forwardRef(() => SectionService))
    private readonly sectionService: SectionService
  ) {}

  // find

  async findById(id: string) {
    const document = await this.prismaService.document.findUnique({
      where: { id },
      include: {
        type: true,
        template: true,
        sections: {
          include: { subsections: true, template: true },
        },
      },
    });

    if (!document) {
      throw new NotFoundException("Документ не существует");
    }

    return document;
  }

  async findAll(userId: string) {
    const documents = await this.prismaService.document.findMany({
      where: { userId },
      include: {
        type: true,
        template: true,
        sections: true,
      },
    });

    return documents;
  }

  async findAllByType(userId: string, type: DocumentType) {
    const { id: typeId } = await this.documentTypeService.findByName(type);

    const documents = await this.prismaService.document.findMany({
      where: { userId, typeId },
      include: {
        type: true,
        template: true,
        sections: true,
      },
    });

    return documents;
  }

  // create

  async create(userId: string, { type, template, title }: CreateDocumentDto) {
    const { id: typeId } = await this.documentTypeService.findByName(type);

    const { id: templateId } = await this.documentTemplateService.findByKeyAndDocumentType(template, type);
    
    const document = await this.prismaService.document.create({
      data: {
        userId,
        typeId,
        templateId,
        title
      },
      include: {
        type: true,
        template: true,
        sections: true,
      },
    });

    await this.sectionService.createAllDefault(document.id);

    const fullDocument = await this.findById(document.id);

    return fullDocument;
  }

  // update

  async update(id: string, dto: UpdateDocumentDto) {
    const document = await this.findById(id);

    let newTemplateId = document.template.id;

    if (dto.templateId) {
        const documentTemplate = await this.documentTemplateService.findById(dto.templateId);

        const allowedTemplates = DOCUMENT_TEMPLATES_MAP[document.template.key];

        if (!allowedTemplates.includes(documentTemplate.key)) {
          throw new BadRequestException(`Шаблон ${documentTemplate.key} не разрешён для типа документа ${document.type.name}`);
        }

        newTemplateId = documentTemplate.id;
    }
    
    return this.prismaService.runInTransaction(async () => {
      const updatedDocument = await this.prismaService.document.update({
        where: { id },
        data: {
          title: dto.title,
          updatedAt: dto.updatedAt,
          templateId: newTemplateId,
        },
      });

      if (dto.sections) {
        await this.sectionService.updateAll(dto.sections);
      }

      return this.findById(id);
    })
  }

  // delete

  async delete(id: string) {
    const document = await this.prismaService.document.delete({
      where: { id },
      include: {
        type: true,
        template: true,
        sections: true,
      },
    });

    return { document, message: "Документ успешно удален." };
  }

  async deleteAll(userId: string) {
    const { count: deletedCount } = await this.prismaService.document.deleteMany({
      where: { userId },
    });

    return { deletedCount, message: "Все документы успешно удалены." };
  }

  async deleteAllByType(userId: string, type: DocumentType) {
    const { id: typeId } = await this.documentTypeService.findByName(type);

    const { count: deletedCount } = await this.prismaService.document.deleteMany({
      where: { userId, typeId },
    });

    return { deletedCount, message: `Документы ${type} успешно удалены.` };
  }

  // other

  async generatePdf(type: DocumentType, id: string) {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath(),
    });
    const page = await browser.newPage();

    const documentUrl = `${process.env.CLIENT_URL}/${DOCUMENTS_MAP[type]}/${id}/document/pdf`;

    await page.goto(documentUrl, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "15mm",
      },
    });

    await browser.close();
    return pdfBuffer;
  }
}
