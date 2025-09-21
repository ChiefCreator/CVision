"use client"

import { Section as SectionType } from "@/types/menu/scrollSpyMenu"
import Section from "../Section/Section"

interface OAuthProvidersSectionProps extends SectionType {
	
}

export default function OAuthProvidersSection({ id, label }: OAuthProvidersSectionProps) {
	return (
		<Section id={id} label={label}>
			OAuthProvidersSection
		</Section>
	)
}
