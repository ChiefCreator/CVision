export interface SettingOption<T = string> {
  id: string;
  name?: string;
  value: T;
}

export type DocumentSetting<T = string> = SettingOption<T> | string;

export interface DocumentTemplateSetting<T = string> {
  default: string;
	options: SettingOption<T>[];
}

export type ResultDocumentSetting<T = string> = {
  currentOption: SettingOption<T>;
  options: SettingOption<T>[];
  default: string;
};

export type FontName = "primary" | "secondary";