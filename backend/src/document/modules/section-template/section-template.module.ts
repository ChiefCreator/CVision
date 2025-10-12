import { Module } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { DocumentTypeModule } from "../document-type/document-type.module";
import { SectionTemplateService } from './section-template.service';

@Module({
  imports: [UserModule, DocumentTypeModule],
  providers: [SectionTemplateService, PrismaService],
  exports: [SectionTemplateService],
})
export class SectionTemplateModule {}
