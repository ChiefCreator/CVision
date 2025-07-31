import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

import { DOCUMENTS_MAP } from './constatns/documents-map';

import type { DocumentType } from './types/document.types';

@Injectable()
export class DocumentService {
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
