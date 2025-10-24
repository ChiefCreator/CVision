import { DocumentFontSettingName } from "../documentSettings/documentFontSetting";
import { DocumentSettingOption } from "../documentSettings/documentSettingOption";

export interface DocumentTemplateSetting<T = string> {
  default: string;
  options: DocumentSettingOption<T>[];
}

export type FontSetting = {
  [key in DocumentFontSettingName]: DocumentTemplateSetting;
}

export interface DocumentTemplateSettings {
  accentColor?: DocumentTemplateSetting;
  font?: FontSetting;
  spacing?: DocumentTemplateSetting;
  size?: DocumentTemplateSetting;
  format?: DocumentTemplateSetting;
}
