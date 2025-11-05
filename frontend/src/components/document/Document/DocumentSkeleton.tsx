"use client"

import DocumentPreviewSkeleton from "./compoundComponents/DocumentPreview/DocumentPreviewSkeleton"

import { BaseComponent } from "@/types/root"

import clsx from "clsx"
import styles from "./Document.module.scss"

export default function DocumentSkeleton({ className }: BaseComponent) {
	return (
		<div className={clsx(styles.document, className)}>
			<DocumentPreviewSkeleton />
		</div>
	)
}
