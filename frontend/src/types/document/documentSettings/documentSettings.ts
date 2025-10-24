import { DocumentFontSetting } from "./documentFontSetting";
import { DocumentSetting } from "./documentSetting";

export interface DocumentSettings {
  accentColor: DocumentSetting;
  font: DocumentFontSetting;
  spacing: DocumentSetting<number>;
  size: DocumentSetting<number>;
  format: DocumentSetting;
}
