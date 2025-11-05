"use client"

import { DocumentProvider } from "./hooks/useDocumentContext";

import DocumentPreview from "./compoundComponents/DocumentPreview/DocumentPreview";

import { BaseComponent } from "@/types/root";

import { useDocumentContext } from "@/hooks/document/useDocumentContext";
import clsx from "clsx";
import styles from "./Document.module.scss";

export interface DocumentProps extends BaseComponent {}

export default function Document({ className }: DocumentProps) {
	const data = useDocumentContext();
	const format = data.document?.settings.format.currentOption.id;

	return (
		<DocumentProvider value={data}>
			<div className={clsx(styles.document, className)} data-format={format}>
				<DocumentPreview />
			</div>
		</DocumentProvider>
	)
}