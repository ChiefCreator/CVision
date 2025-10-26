"use client"

import { useDocumentEditor } from "./hooks/useDocumentEditor";
import { DocumentEditorProvider } from "./hooks/useDocumentEditorContext";

import FormWrapper from "./compoundComponents/FormWrapper/FormWrapper";

import { BaseComponent } from "@/types/root";

import clsx from "clsx";
import styles from "./DocumentEditor.module.scss";
import MobileTabs from "./compoundComponents/MobileTabs/MobileTabs";
import Preview from "./compoundComponents/Preview/Preview";

interface ResumeEditorProps extends BaseComponent {
	id: string;
}

export default function DocumentEditor({ id, className }: ResumeEditorProps) {
	const data = useDocumentEditor({ id });

  return (
		<DocumentEditorProvider value={{ ...data }}>
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