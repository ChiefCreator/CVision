import { DocumentSettingOption } from "./documentSettingOption";

export type DocumentSetting<T = string> = {
  currentOption: DocumentSettingOption<T>;
  options: DocumentSettingOption<T>[];
  default: string;
};