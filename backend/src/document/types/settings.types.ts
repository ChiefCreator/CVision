export interface SettingOption<T = string> {
  id: string;
  name?: string;
  value: T;
}

export interface DocumentSetting<T = string> {
	currentOption?: SettingOption<T>;
}

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