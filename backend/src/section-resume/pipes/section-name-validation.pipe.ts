import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import type { ResumeSectionNames } from "src/resume/types/ResumeSectionNames";

@Injectable()
export class SectionNameValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!["personalDetails", "professionalSummary", "courses", "customSections", "education", "employmentHistory", "languages", "links", "skills"].includes(value as ResumeSectionNames)) {
      throw new BadRequestException(`Invalid section name: ${value}`);
    }

    return value as ResumeSectionNames;
  }
}
