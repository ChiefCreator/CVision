"use client"

import { useDocumentEditorContext } from "@/components/document/DocumentEditor/hooks/useDocumentEditorContext";
import { Document } from "@/types/document/document";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import AddSection from "./compoundComponents/AddSection/AddSection";
import Header from "./compoundComponents/Header/Header";
import Section from "./compoundComponents/Section/Section";
import Subsection from "./compoundComponents/Subsection/Subsection";
import styles from "./EditorForm.module.scss";
import EditorFormSkeleton from "./EditorFormSkeleton";
import { EditorFormProvider } from "./hooks/useEditorFormContext";
import { useToggleSections } from "./hooks/useToggleSections";

interface EditorFormProps extends BaseComponent {
	data?: Document;
	children: React.ReactNode;
}

export default function EditorForm({ className, children }: EditorFormProps) {
	const { document, isGetLoading } = useDocumentEditorContext();
	const toggleSectionsData = useToggleSections({ document: document!, isGetLoading });

	if (isGetLoading) return <EditorFormSkeleton />;

	return (
		<EditorFormProvider value={toggleSectionsData}>
			<div className={clsx(styles.form, className)}>
				{children}
			</div>
		</EditorFormProvider>
	)
}

EditorForm.Header = Header;

EditorForm.AddSection = AddSection;

EditorForm.Section = Section;

EditorForm.Subsection = Subsection;