import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { DocumentService } from './document.service';

import type { Response } from 'express';
import { Authorization } from "src/auth/decorators/authentication.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { DocumentTypeValidationPipe } from "./pipes/document-type-validation.pipe";
import type { DocumentType } from './types/document-type.types';

@Controller("documents")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  // find

  @Authorization()
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.documentService.findById(id);
  }

  @Authorization()
  @Get()
  async findAll(
    @User("id") userId: string,
    @Query("type", new DocumentTypeValidationPipe({ skipUndefined: true })) type?: DocumentType
  ) {
    return type
      ? this.documentService.findAllByType(userId, type)
      : this.documentService.findAll(userId);
  }

  // create

  @Authorization()
  @Post()
  async create(
    @User("id") userId: string,
    @Body() body: CreateDocumentDto
  ) {
    return this.documentService.create(userId, body);
  }

  // update

  @Authorization()
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() body: UpdateDocumentDto
  ) {
    return this.documentService.update(id, body);
  }

  // delete

  @Authorization()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.documentService.delete(id);
  }

  @Authorization()
  @Delete()
  async deleteAll(
    @User("id") userId: string,
    @Query("type", new DocumentTypeValidationPipe({ skipUndefined: true })) type?: DocumentType
  ) {
    return type
      ? this.documentService.deleteAllByType(userId, type)
      : this.documentService.deleteAll(userId);
  }

  // other
  
  @Authorization()
  @Post("export/pdf")
  async generatePDF(
    @Body("html") html: string,
    @Res() res: Response
  ) {
    const buffer = await this.documentService.generatePdfFromHtml(html);
  
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="document.pdf"`,
    });
  
    res.send(buffer);
  }

  // @Authorization()
  // @Get(":type/:id/pdf")
  // async downloadPDF(@Param("type") type: DocumentType, @Param("id") id: string, @Res() res: Response) {
  //   const buffer = await this.documentService.generatePdf(type, id);
  
  //   res.set({
  //     "Content-Type": "application/pdf",
  //     "Content-Disposition": `attachment; filename="${type}-${id}.pdf"`,
  //   });
  
  //   res.send(buffer);
  // }
}
