"use client"

import { useCreateDocument } from "@/api/document/hooks/useCreateDocument";
import { useGetDocuments } from "@/api/document/hooks/useGetDocuments";
import Button from "@/components/button/Button/Button";
import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { filterDocumentsByType } from "@/utils/document/filterDocumentsByType";
import { useCallback } from "react";
import DocumentsList from "../DocumentsList/DocumentsList";
import NoCoverLetters from "../NoDocuments/NoCoverLetters";
import NoResumes from "../NoDocuments/NoResumes";
import styles from "./DocumentPage.module.scss";

interface DocumentPageProps {
	type: DocumentTypeName;
}

export default function DocumentPage({ type }: DocumentPageProps) {
	const { data: documents, isLoading } = useGetDocuments();
	const { mutate: createDocument } = useCreateDocument();

	const handleCreateDocument = useCallback(() => {
    createDocument({
      type,
      template: "classic",
    })
  }, []);

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<h1 className={styles.title}>{type === "resume" ? "Резюме" : "Сопроводительные письма"}</h1>

				<div className={styles.controlsList}>
					<Button
						className={styles.control}
						type="simpleButton"
						variant="secondary"
						onClick={handleCreateDocument}
					>Добавить</Button>
				</div>
			</header>
			
			<DocumentsList
				className={styles.list}
				data={filterDocumentsByType(documents ?? [], type)}
				isLoading={isLoading}
				emptyContent={type === "resume"
					? <NoResumes onCreate={handleCreateDocument} />
					: <NoCoverLetters onCreate={handleCreateDocument} />
				}
			/>
		</div>
	)
}
