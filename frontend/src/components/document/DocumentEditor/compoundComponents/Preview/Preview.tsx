"use client"

import Button from "@/components/button/Button/Button";
import Container from "@/components/utils/Container/Container";
import { MenuItemData } from "@/types/menu/menu";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import { useRef } from "react";

import Document from "@/components/document/Document/Document";
import DocumentControls from "@/components/document/DocumentControls/DocumentControls";
import LoadingStatus from "@/components/loading/LoadingStatus/LoadingStatus";
import { useDocumentEditorContext } from "../../hooks/useDocumentEditorContext";
import styles from "./Preview.module.scss";
import PreviewSkeleton from "./PreviewSkeleton";

interface PreviewProps extends BaseComponent {}

export default function Preview({ className }: PreviewProps) {
	const { delayedDocument: document, status, isGetLoading, download } = useDocumentEditorContext();

	const resumePreviewRef = useRef<HTMLDivElement | null>(null);

	const resumePreviewId = "resume-preview";

	const handleDownload = () => {
		download(document?.title);
	}

	const menuData: MenuItemData = [
		{
			type: "control",
			id: "1",
			title: "PDF",
			onClick: handleDownload,
		},
	];

	const downloadButton = (
		<Button
			className={styles.buttonDownload}
			type="buttonMenu"
			variant="secondary"
			menuData={menuData}
			menuPositionerProps={{ containerRef: resumePreviewRef }}
			menuPortalProps={{ containerId: resumePreviewId }}
			onClick={handleDownload}
		>
			Скачать
		</Button>
	)

	if (isGetLoading && !document) {
		return <PreviewSkeleton className={clsx(styles.preview, className)} />;
	}

	return (
		<div className={clsx(styles.preview, className)} id={resumePreviewId} ref={resumePreviewRef}>
			<Container className={styles.previewContainer}>
				<header className={clsx(styles.previewHead)}>
					{downloadButton}
				</header>
	
				<div className={clsx(styles.previewBody)}>
					<Document className={styles.document} />
				</div>
	
				<footer className={clsx(styles.previewFoot)}>
					<LoadingStatus
						className={styles.loadingStatus}
						labelClassName={styles.loadingStatusLabel}
						iconClassName={styles.loadingStatusIcon}
						spinnerClassName={styles.loadingStatusSpinner}
						status={status === "loading" ? "loading" : "loaded"}
					/>
	
					<DocumentControls className={styles.buttons} />
				</footer>
			</Container>

			<div className={clsx(styles.tabletFooter, styles.container)}>
				{downloadButton}
			</div>
		</div>
	);
}
