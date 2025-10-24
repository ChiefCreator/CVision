import { DocumentTemplateSetting, FontName } from "src/document/types/settings.types";

export interface DocumentTemplateSettings {
  accentColor?: DocumentTemplateSetting;
  font?: {
    [T in FontName]?: DocumentTemplateSetting;
  };
  spacing?: DocumentTemplateSetting<number>;
  size?: DocumentTemplateSetting<number>;
  format?: DocumentTemplateSetting;
}
