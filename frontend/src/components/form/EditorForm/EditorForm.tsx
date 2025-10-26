"use client"

import { useDocumentEditorContext } from "@/components/document/DocumentEditor/hooks/useDocumentEditorContext";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import AddSection from "./compoundComponents/AddSection/AddSection";
import Header from "./compoundComponents/Header/Header";
import Section from "./compoundComponents/Section/Section";
import Subsection from "./compoundComponents/Subsection/Subsection";
import styles from "./EditorForm.module.scss";
import { EditorFormProvider } from "./hooks/useEditorFormContext";
import { useToggleSections } from "./hooks/useToggleSections";

interface EditorFormProps extends BaseComponent {
	children: React.ReactNode;
}

export default function EditorForm({ className, children }: EditorFormProps) {
	const data = useDocumentEditorContext();
	const toggleSectionsData = useToggleSections({ document: data.document!, isGetLoading: data.isGetLoading });

	if (data.isGetError) return "loading"

	return (
		<EditorFormProvider value={{ ...data, ...toggleSectionsData }}>
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