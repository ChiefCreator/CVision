"use client"

import { Section as SectionType } from "@/types/menu/scrollSpyMenu"
import Section from "../Section/Section"

interface SubscriptionSectionProps extends SectionType {
	
}

export default function SubscriptionSection({ id, label }: SubscriptionSectionProps) {
	return (
		<Section id={id} label={label}>
			SubscriptionSection
		</Section>
	)
}
