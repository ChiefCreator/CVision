"use client"

import { oAuthProvidersMap } from "@/constants/auth/oAuthProvidersMap"
import { OAuthProvider } from "@/types/auth/oauthProviders"
import { Section as SectionType } from "@/types/menu/scrollSpyMenu"
import Section from "../Section/Section"
import ProviderControl from "./ProviderControl"

interface OAuthProvidersSectionProps extends SectionType {};

export default function OAuthProvidersSection({ id, label }: OAuthProvidersSectionProps) {
	return (
		<Section id={id} label={label}>
			{Object.entries(oAuthProvidersMap).map(([provider, providerProps]) => (
				<ProviderControl
					key={provider}
					provider={provider as OAuthProvider}
					Icon={providerProps.ColorIcon}
					label={providerProps.label}
				/>
			))}
		</Section>
	)
}
