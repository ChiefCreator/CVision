"use client"

import { Section as SectionType } from "@/types/menu/scrollSpyMenu"
import Section from "../Section/Section"

interface DangerousZoneSectionProps extends SectionType {
	
}

export default function DangerousZoneSection({ id, label }: DangerousZoneSectionProps) {
	return (
		<Section id={id} label={label}>
			DangerousZoneSection
		</Section>
	)
}
