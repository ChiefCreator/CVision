import { BadRequestException, Injectable } from '@nestjs/common';


import type { DocumentType } from "src/document/types/document-type.types";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DocumentTypeService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async findByName(name: DocumentType) {
    const documentType = await this.prismaService.documentType.findUnique({
      where: { name },
    });

    if (!documentType) {
      throw new BadRequestException(`Документа с типом "${name}" не существует`);
    }

    return documentType;
  }
}
