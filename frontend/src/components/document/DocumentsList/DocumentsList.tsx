"use client"

import { DocumentProvider } from "@/hooks/document/useDocumentContext";
import { Document } from "@/types/document/document";
import { sortDocumentsByUpdatedAt } from "@/utils/document/sortDocuments";
import DocumentCard from "../DocumentCard/DocumentCard";

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import DocumentCardSkeleton from "../DocumentCard/DocumentCardSkeleton";
import styles from "./DocumentsList.module.scss";

interface DocumentsListProps extends BaseComponent {
	data?: Document[];
	isLoading: boolean;
	emptyContent: React.ReactNode;
}

export default function DocumentsList({ className, data, isLoading, emptyContent }: DocumentsListProps) {
	if (!data?.length && !isLoading && emptyContent) {
		return emptyContent;
	}

	return (
		<div className={clsx(styles.list, className)}>
			{isLoading && <DocumentCardSkeleton count={4} />}

			{sortDocumentsByUpdatedAt(data ?? []).map(document => (
    	  <DocumentProvider id={document.id} key={document.id}>
    	    <DocumentCard
    	      key={document.id}
    	      className={styles.card}
    	    />
    	  </DocumentProvider>
    	))}
		</div>
	)
}
