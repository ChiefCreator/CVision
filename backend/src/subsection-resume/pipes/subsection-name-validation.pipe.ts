import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import type { ResumeSubsectionNames } from "../types/ResumeSubsectionNames";
import { subsectionNames } from "../data/subsectionNames";

@Injectable()
export class SectionNameValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!subsectionNames.includes(value as ResumeSubsectionNames)) {
      throw new BadRequestException(`Invalid subsection name: ${value}`);
    }

    return value as ResumeSubsectionNames;
  }
}
