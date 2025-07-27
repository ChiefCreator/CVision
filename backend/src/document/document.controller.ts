import { Controller, Get, Param, Res } from '@nestjs/common';
import { DocumentService } from './document.service';

import type { Response } from 'express';
import type { DocumentType } from './types/document.types';

@Controller("documents/:type/:id")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get("pdf")
  async downloadPDF(@Param("type") type: DocumentType, @Param("id") id: string, @Res() res: Response) {
    const buffer = await this.documentService.generatePdf(type, id);
  
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${type}-${id}.pdf"`,
    });
  
    res.send(buffer);
  }
}
