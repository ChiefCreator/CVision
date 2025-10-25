import { Module } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { DocumentTypeModule } from "../document-type/document-type.module";
import { SectionTemplateController } from "./section-template.controller";
import { SectionTemplateService } from './section-template.service';

@Module({
  imports: [UserModule, DocumentTypeModule],
  controllers: [SectionTemplateController],
  providers: [SectionTemplateService, PrismaService],
  exports: [SectionTemplateService],
})
export class SectionTemplateModule {}
