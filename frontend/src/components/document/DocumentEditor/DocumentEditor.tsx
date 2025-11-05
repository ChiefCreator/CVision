"use client"

import { DocumentEditorProvider } from "./hooks/useDocumentEditorContext";

import FormWrapper from "./compoundComponents/FormWrapper/FormWrapper";

import { BaseComponent } from "@/types/root";

import { useDocumentContext } from "@/hooks/document/useDocumentContext";
import clsx from "clsx";
import styles from "./DocumentEditor.module.scss";
import MobileTabs from "./compoundComponents/MobileTabs/MobileTabs";
import Preview from "./compoundComponents/Preview/Preview";

interface ResumeEditorProps extends BaseComponent {};

export default function DocumentEditor({ className }: ResumeEditorProps) {
	const data = useDocumentContext();
	
  return (
		<DocumentEditorProvider value={data}>
			<div className={clsx(styles.editor, className)}>
				<div className={styles.container}>
					<MobileTabs className={styles.tabs} />

					<FormWrapper className={styles.form} />
					
					<Preview className={styles.preview} />
				</div>
			</div>
		</DocumentEditorProvider>
  );
}