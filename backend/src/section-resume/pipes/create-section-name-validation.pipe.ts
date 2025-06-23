import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import type { CreateSections } from "../types/create-sections";
import { createSectionNames } from "../data/createSectionNames";

@Injectable()
export class CreateSectionNameValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!createSectionNames.includes(value as CreateSections)) {
      throw new BadRequestException(`Invalid section name: ${value}`);
    }

    return value as CreateSections;
  }
}
