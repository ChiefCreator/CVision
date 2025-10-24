import { DocumentSetting, FontName, ResultDocumentSetting } from "./settings.types";

export interface DocumentSettings {
  accentColor?: DocumentSetting;
  font?: {
    [key in FontName]?: DocumentSetting;
  };
  spacing?: DocumentSetting<number>;
  size?: DocumentSetting<number>;
  format?: DocumentSetting;
}

export interface ResultDocumentSettings {
  accentColor?: ResultDocumentSetting;
  font?: {
    [key in FontName]?: ResultDocumentSetting;
  };
  spacing?: ResultDocumentSetting<number>;
  size?: ResultDocumentSetting<number>;
  format?: ResultDocumentSetting;
}