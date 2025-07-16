import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";

import { SUBSECTION_NAMES } from "../constants/subsection-names";
import type { ResumeSubsectionNames } from "../types/subsection-names.types";

@Injectable()
export class SectionNameValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!SUBSECTION_NAMES.includes(value as ResumeSubsectionNames)) {
      throw new BadRequestException(`Invalid subsection name: ${value}`);
    }

    return value as ResumeSubsectionNames;
  }
}
