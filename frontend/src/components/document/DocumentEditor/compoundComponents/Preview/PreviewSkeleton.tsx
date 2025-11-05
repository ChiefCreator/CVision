"use client"

import DocumentSkeleton from "@/components/document/Document/DocumentSkeleton"
import Container from "@/components/utils/Container/Container"
import { BaseComponent } from "@/types/root"

import ButtonSkeleton from "@/components/button/Button/ButtonSkeleton"
import DocumentControlsSkeleton from "@/components/document/DocumentControls/DocumentControlsSkeleton"
import clsx from "clsx"
import Skeleton from "react-loading-skeleton"
import styles from "./Preview.module.scss"

export default function PreviewSkeleton({ className }: BaseComponent) {
	return (
		<div className={clsx(styles.preview, className)}>
			<Container className={styles.previewContainer}>
				<header className={styles.previewHead}>
					<ButtonSkeleton containerClassName={styles.buttonDownload} />
				</header>
	
				<div className={styles.previewBody}>
					<DocumentSkeleton className={styles.document} />
				</div>
	
				<footer className={styles.previewFoot}>
					<Skeleton
						className={clsx(styles.loadingStatus, styles.loadingStatusSkeleton)}
						baseColor={styles.loadingStatusSkeletonContainer}
					/>
	
					<DocumentControlsSkeleton className={styles.buttons} />
				</footer>
			</Container>

			<div className={clsx(styles.tabletFooter, styles.container)}>
				<ButtonSkeleton containerClassName={styles.buttonDownload} style={{ width: "100%" }} />
			</div>
		</div>
	)
}
