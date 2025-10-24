import { DocumentSetting } from "./documentSetting";

export type DocumentFontSettingName = "primary" | "secondary";

export type DocumentFontSetting = {
	[key in DocumentFontSettingName]: DocumentSetting;
}