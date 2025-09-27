"use client"

import { oAuthProvidersMap } from "@/constants/auth/oAuthProvidersMap"
import { OAuthProvider } from "@/types/auth/oauthProviders"
import Section from "../Section/Section"
import ProviderControl from "./ProviderControl"

export default function OAuthProvidersSection() {
	return (
		<Section id="oauthProviders" label="Социальные сети">
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
