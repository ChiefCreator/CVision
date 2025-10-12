import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JSONSchemaType } from "ajv";
import { DocumentService } from "src/document/document.service";
import { UpdateSectionDto } from "src/document/dto/update-section.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { validateWithSchema } from "src/utils/json/validate-with-schema.utils";
import { SectionTemplateService } from "../section-template/section-template.service";
import { CreateSectionDto } from "./dto/create-section.dto";

@Injectable()
export class SectionService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => DocumentService))
    private readonly documentService: DocumentService,
    private readonly sectionTemplateService: SectionTemplateService
  ) {}

  // find

  async findById(id: string) {
    const section = await this.prismaService.section.findUnique({
      where: { id },
      include: { template: true, subsections: true },
    });

    if (!section) {
      throw new NotFoundException(`Секция с id "${id}" не найдена.`);
    }

    return section;
  }

  // create

  async create(documentId: string, dto: CreateSectionDto) {
    const document = await this.documentService.findById(documentId);

    const template = await this.sectionTemplateService.findByDocumentTypeIdAndKey(document.type.id, dto.template);

    if (!template.isMultiple) {
      const isExists = await this.prismaService.section.findFirst({
        where: {
          documentId,
          template: {
            key: template.key,
          },
        },
      });

      if (isExists) {
        throw new BadRequestException(`Секция типа "${template.title}" уже существует в этом документе.`);
      }
    }

    if (dto.data) {
      validateWithSchema(
        dto.data,
        template.schema as JSONSchemaType<any>,
        {
          error: new BadRequestException({
            message: `Некорректные данные для секции "${template.title}"`,
          })
        }
      );
    }

    const nextOrder = await this.calcMaxOrder(dto.parentId) + 1;
    
    const section = await this.prismaService.section.create({
      data: {
        documentId,
        templateId: template.id,
        parentId: dto.parentId,
        title: dto.title ?? template.title,
        data: dto.data,
        order: template.isOrderFixed ? template.defaultOrder ?? nextOrder : nextOrder,
      }
    });

    if (dto.subsections?.length) {
      await Promise.all(
        dto.subsections.map(subsectionDto =>
          this.create(documentId, {
            ...subsectionDto,
            parentId: subsectionDto.parentId ?? section.id,
          })
        )
      );
    }

    return this.findById(section.id);
  }

  async createAllDefault(documentId: string) {
    const document = await this.documentService.findById(documentId);

    const defaultTemplates = await this.sectionTemplateService.findAllDefaultByDocumentType(document.type.name);

    const sectionsData = defaultTemplates.map((template, i) => ({
      title: template.title,
      data: undefined,
      order: template.defaultOrder ?? i,
      templateId: template.id,
      documentId,
    }));

    const { count: createdCount } = await this.prismaService.section.createMany({ data: sectionsData });

    return { createdCount };
  }

  // update

  async updateOne(sectionDto: UpdateSectionDto) {
    const existingSection = await this.findById(sectionDto.id);

    const template = await this.sectionTemplateService.findById(existingSection.template.id);

    if (sectionDto.data) {
      validateWithSchema(
        sectionDto.data,
        template.schema as JSONSchemaType<any>,
        {
          error: new BadRequestException({
            message: `Некорректные данные для секции "${template.title}"`,
          })
        }
      );
    }

    const mergedData = this.mergeSectionData(existingSection.data, sectionDto.data);

    await this.prismaService.section.update({
      where: { id: sectionDto.id },
      data: {
        title: sectionDto.title ?? existingSection.title,
        data: mergedData,
      },
    });

    if (sectionDto.subsections?.length) {
      for (const subsectionDto of sectionDto.subsections) {
        await this.updateOne(subsectionDto);
      }
    }
  }

  async updateAll(sectionsDto: UpdateSectionDto[]) {
    for (const section of sectionsDto) {
      await this.updateOne(section);
    }

    return { success: true };
  }

  // delete

  async delete(id: string) {
    const deletedSection = await this.prismaService.section.delete({
      where: { id },
    });

    return { deletedSection, message: "Секция успешно удалена" };
  }

  // utils

  private async calcMaxOrder(parentId?: string) {
    const maxOrder = await this.prismaService.section.aggregate({
      where: {
        parentId: parentId ?? null,
      },
      _max: { order: true },
    });

    return maxOrder._max.order ?? 0;
  }

  private mergeSectionData(existingData: any, newData: any) {
    if (Array.isArray(existingData) && Array.isArray(newData)) {
      const existingMap = new Map(
        existingData
          .filter((item: any) => item?.id !== undefined)
          .map((item: any) => [item.id, item])
      );

      newData.forEach((item: any) => {
        if (item?.id === undefined) {
          existingMap.set(Symbol(), item);
        } else if (existingMap.has(item.id)) {
          existingMap.set(item.id, { ...existingMap.get(item.id), ...item });
        } else {
          existingMap.set(item.id, item);
        }
      });

      return Array.from(existingMap.values());
    }

    if (existingData && typeof existingData === 'object' && newData && typeof newData === 'object') {
      return { ...existingData, ...newData };
    }

    return newData ?? existingData;
  }
}
