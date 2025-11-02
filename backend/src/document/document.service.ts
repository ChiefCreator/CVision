import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';


import { Prisma } from "prisma/generated/client";
import { PrismaService } from "src/prisma/prisma.service";
import { DOCUMENT_TEMPLATES_MAP } from "./constants/document-templates-map.constants";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { DocumentTemplateService } from "./modules/document-template/document-template.service";
import { DocumentTemplateSettings } from "./modules/document-template/types/document-template-settings.types";
import { DocumentTypeService } from "./modules/document-type/document-type.service";
import { SectionService } from "./modules/section/section.service";
import { DocumentSettings, ResultDocumentSettings } from "./types/document-settings.types";
import type { DocumentType } from './types/document-type.types';
import { DocumentSetting, DocumentTemplateSetting, SettingOption } from "./types/settings.types";

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

  async findById(id: string, options?: { resultDocument?: boolean }) {
    const { resultDocument = true } = options ?? {};

    const document = await this.prismaService.document.findUnique({
      where: { id },
      include: {
        type: true,
        template: true,
      },
    });

    if (!document) {
      throw new NotFoundException("Документ не существует");
    }

    return resultDocument ? this.getResultDocument(document) : document;
  }

  async findAll(userId: string) {
    const documents = await this.prismaService.document.findMany({
      where: { userId },
      include: {
        type: true,
         template: true,
      },
    });

    return this.getResultDocuments(documents);
  }

  async findAllByType(userId: string, type: DocumentType) {
    const { id: typeId } = await this.documentTypeService.findByName(type);

    const documents = await this.prismaService.document.findMany({
      where: { userId, typeId },
      include: {
        type: true,
        template: true,
      },
    });

    return this.getResultDocuments(documents);
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
      },
    });

    await this.sectionService.createAllDefault(document.id);

    return this.getResultDocument(document);
  }

  // update

  async update(id: string, dto: UpdateDocumentDto) {
    const document = await this.findById(id, { resultDocument: false });

    const { title, updatedAt, template, sections, settings } = dto;

    let newTemplateId = document.template.id;

    if (dto.template) {
      const documentTemplate = await this.documentTemplateService.findByKeyAndDocumentType(template as any, document.type.name);

      const allowedTemplates = DOCUMENT_TEMPLATES_MAP[document.type.name];

      if (!allowedTemplates.includes(documentTemplate.key as any)) {
        throw new BadRequestException(`Шаблон ${documentTemplate.key} не разрешён для типа документа ${document.type.name}`);
      }
      
      newTemplateId = documentTemplate.id;
    }

    return this.prismaService.runInTransaction(async () => {
      if (title || updatedAt || (newTemplateId && template) || settings) {
        await this.prismaService.document.update({
          where: { id },
          data: {
            title,
            updatedAt,
            templateId: newTemplateId,
            settings: {
              ...document.settings as any,
              ...settings ?? {} as any,
            },
          },
        });
      }

      if (sections) {
        await this.sectionService.updateAll(sections);
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
      },
    });

    return {
      document: await this.getResultDocument(document),
      message: "Документ успешно удален."
    };
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

  async generatePdfFromHtml(html: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" }
    });

    await browser.close();
    
    return pdfBuffer;
  }

  // async generatePdf(type: DocumentType, id: string) {
  //   const browser = await puppeteer.launch({
  //     headless: true,
  //     executablePath: puppeteer.executablePath(),
  //   });
  //   const page = await browser.newPage();

  //   const documentUrl = `${process.env.CLIENT_URL}/${DOCUMENTS_MAP[type]}/${id}/document/pdf`;

  //   await page.goto(documentUrl, { waitUntil: "networkidle0" });

  //   const pdfBuffer = await page.pdf({
  //     format: "A4",
  //     printBackground: true,
  //     margin: {
  //       top: "20mm",
  //       bottom: "20mm",
  //       left: "20mm",
  //       right: "15mm",
  //     },
  //   });

  //   await browser.close();
  //   return pdfBuffer;
  // }

  async getResultDocument(document: Prisma.DocumentGetPayload<{ include: { template: true, type: true } }>) {
    const rootSections = await this.sectionService.findAllRoot(document.id);

    const { settings, ...documentTemplate } = document.template;

    const documentRes = { ...document, template: documentTemplate };

    return {
      ...documentRes,
      sections: rootSections,
      settings: this.mergeSettings(document.settings, document.template.settings),
    };
  }

  async getResultDocuments(documents: Prisma.DocumentGetPayload<{ include: { template: true, type: true } }>[]) {
    return Promise.all(
      documents.map(async (doc) => {
        const rootSections = await this.sectionService.findAllRoot(doc.id);

        const { settings, ...documentTemplate } = doc.template;

        const documentRes = { ...doc, template: documentTemplate };

        return {
          ...documentRes,
          sections: rootSections,
          settings: this.mergeSettings(doc.settings, doc.template.settings)
        };
      }),
    );
  }

  private mergeSettings(documentSettingsValue: Prisma.JsonValue, templateSettingsValue: Prisma.JsonValue) {
    const documentSettings =
      (typeof documentSettingsValue === "object" && documentSettingsValue != null ? documentSettingsValue : {}) as DocumentSettings;

    const templateSettings =
      (typeof templateSettingsValue === "object" && templateSettingsValue != null ? templateSettingsValue : {}) as DocumentTemplateSettings;

    const result: ResultDocumentSettings = {};

    for (const key in templateSettings) {
      const documentSetting = documentSettings[key] as DocumentSetting;
      const defaultSetting = templateSettings[key] as DocumentTemplateSetting;

      if (typeof defaultSetting === "object" && !Array.isArray(defaultSetting) && defaultSetting.default === undefined) {
        result[key] = this.mergeSettings(documentSetting as any, defaultSetting as any);
        continue;
      }

      const { default: defaultId, options } = defaultSetting;

      let currentOption = {} as SettingOption;

      if (documentSetting && typeof documentSetting === "object") {
        currentOption = documentSetting;
      } else if ((documentSetting && typeof documentSetting === "string") || defaultId) {
        currentOption = options.find(o => o.id === documentSetting)
          ?? options.find(o => o.id === defaultId) ?? {} as SettingOption;
      }

      result[key] = {
        currentOption,
        options,
        default: defaultId,
      };
    }

    return result;
  }
}
