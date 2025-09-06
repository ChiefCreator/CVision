import { Module } from '@nestjs/common';
import { UserModule } from "src/user/user.module";
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [UserModule],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
