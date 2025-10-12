import { forwardRef, Module } from "@nestjs/common";
import { DocumentModule } from "src/document/document.module";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { SectionTemplateModule } from "../section-template/section-template.module";
import { SectionController } from "./section.controller";
import { SectionService } from "./section.service";

@Module({
	imports: [
    UserModule,
    forwardRef(() => DocumentModule),
    SectionTemplateModule
  ],
  controllers: [SectionController],
	providers: [SectionService, PrismaService],
	exports: [SectionService],
})
export class SectionModule {}
