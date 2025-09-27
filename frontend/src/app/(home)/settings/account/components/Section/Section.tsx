"use client"

import { Section as SectionType } from "@/types/menu/scrollSpyMenu";
import { BaseComponent } from "@/types/root";

import clsx from "clsx";
import styles from "./Section.module.scss";

interface SectionProps extends BaseComponent, SectionType {
	children: React.ReactNode;
}

export default function Section({ className, id, label, children }: SectionProps) {
	return (
		<section className={clsx(styles.section, className)} id={id}>
			{label && <h2 className={styles.label}>{label}</h2>}

			<div className={styles.content}>{children}</div>
		</section>
	)
}
