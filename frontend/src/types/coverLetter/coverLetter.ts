import { BaseEntityFields } from "../root";
import { CoverLetterTemplateName } from "./template";

export interface CoverLetter extends BaseEntityFields {
  title?: string;
  template: CoverLetterTemplateName;
}