import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";

import { SECTION_NAMES } from "../constants/section-names";
import type { ResumeSectionNames } from "src/section-resume/types/section-names.types";

@Injectable()
export class SectionNameValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!SECTION_NAMES.includes(value as ResumeSectionNames)) {
      throw new BadRequestException(`Invalid section name: ${value}`);
    }

    return value as ResumeSectionNames;
  }
}
