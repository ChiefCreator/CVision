"use client"

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./EditorForm.module.scss";
import AddSectionSkeleton from "./compoundComponents/AddSection/AddSectionSkeleton";
import HeaderSkeleton from "./compoundComponents/Header/HeaderSkeleton";
import SectionSkeleton from "./compoundComponents/Section/SectionSkeleton";

export default function EditorFormSkeleton({ className }: BaseComponent) {
	return (
		<div className={clsx(styles.form, styles.formSkeleton, className)}>
			<HeaderSkeleton />

			<SectionSkeleton />

			<AddSectionSkeleton />
		</div>
	)
}
