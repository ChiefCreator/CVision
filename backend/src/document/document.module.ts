import { forwardRef, Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { DocumentController } from "./document.controller";
import { DocumentService } from "./document.service";
import { DocumentTemplateModule } from "./modules/document-template/document-template.module";
import { DocumentTypeModule } from "./modules/document-type/document-type.module";
import { SectionModule } from "./modules/section/section.module";

@Module({
	imports: [
		UserModule,
		DocumentTypeModule,
		DocumentTemplateModule,
    forwardRef(() => SectionModule),
	],
	controllers: [DocumentController],
	providers: [DocumentService, PrismaService],
  exports: [DocumentService],
})
export class DocumentModule {}
