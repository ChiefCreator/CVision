import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { StorageService } from "./storage.service";

@Module({
  imports: [MulterModule.register()],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
