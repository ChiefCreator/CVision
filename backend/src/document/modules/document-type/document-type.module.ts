import { Module } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { DocumentTypeService } from './document-type.service';

@Module({
  imports: [UserModule],
  providers: [DocumentTypeService, PrismaService],
  exports: [DocumentTypeService],
})
export class DocumentTypeModule {}
