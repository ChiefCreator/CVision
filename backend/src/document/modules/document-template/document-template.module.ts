import { Module } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { DocumentTypeModule } from "../document-type/document-type.module";
import { DocumentTemplateService } from './document-template.service';

@Module({
  imports: [UserModule, DocumentTypeModule],
  providers: [DocumentTemplateService, PrismaService],
  exports: [DocumentTemplateService],
})
export class DocumentTemplateModule {}
