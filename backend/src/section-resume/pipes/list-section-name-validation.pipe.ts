import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";

import { SECTION_REORDERED_NAMES } from "../constants/section-names";
import type { ListResumeSectionNames } from "src/section-resume/types/section-names.types";

@Injectable()
export class ListSectionNameValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!SECTION_REORDERED_NAMES.includes(value as ListResumeSectionNames)) {
      throw new BadRequestException(`Invalid section name: ${value}`);
    }

    return value as ListResumeSectionNames;
  }
}
