"use client"

import { useState } from "react";
import { DocumentProvider } from "./hooks/useDocumentContext";
import { useDocumentPages } from "./hooks/useDocumentPages";

import DocumentPreview from "./compoundComponents/DocumentPreview/DocumentPreview";
import DocumentSkeleton from "./DocumentSkeleton";

import { Document as DocumentT } from "@/types/document/document";
import { BaseComponent } from "@/types/root";

import clsx from "clsx";
import styles from "./Document.module.scss";

export type Status = "idle" | "loading" | "error";

export interface DocumentProps extends BaseComponent {
	data: DocumentT;
}

export default function Document({ className, data }: DocumentProps) {
	const pagesData = useDocumentPages();

	const [status, setStatus] = useState<Status>("idle");

	const format = data.settings.format.currentOption.id;

	return (
		<DocumentProvider value={{ data, status, setStatus, ...pagesData }}>
			<div className={clsx(styles.document, className)} data-format={format}>
				{status === "error" && "Ошибка отображения документа"}

      	{status === "loading" && <DocumentSkeleton />}

				<DocumentPreview />
			</div>
		</DocumentProvider>
	)
}