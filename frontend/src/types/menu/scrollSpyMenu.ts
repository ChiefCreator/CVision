export interface Section {
	id: SectionId;
	label: string;
}

export type SectionId = "subscription" | "profile" | "oauthProviders" | "dangerousZone";