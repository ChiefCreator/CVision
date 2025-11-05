"use client"

import { BaseComponent } from "@/types/root"
import clsx from "clsx"
import Skeleton from "react-loading-skeleton"
import styles from "./DocumentPreview.module.scss"

export default function DocumentPreviewSkeleton({ className }: BaseComponent) {
	return (
		<div className={clsx(styles.document, styles.skeleton, className)}>
			<Skeleton
				containerClassName={styles.skeletonTitleContainer}
				className={styles.skeletonTitle}
			/>

			<Skeleton
				containerClassName={styles.skeletonSubtitleContainer}
				className={styles.skeletonSubtitle}
			/>

			<Skeleton
				containerClassName={clsx(styles.skeletonTextContainer, styles.skeletonTextContainerP1)}
				className={styles.skeletonText}
			/>
			<Skeleton
				containerClassName={styles.skeletonTextContainer}
				className={styles.skeletonText}
			/>
			<Skeleton
				containerClassName={styles.skeletonTextContainer}
				className={styles.skeletonText}
			/>

			<Skeleton
				containerClassName={clsx(styles.skeletonTextContainer, styles.skeletonTextContainerP2)}
				className={styles.skeletonText}
			/>
			<Skeleton
				containerClassName={styles.skeletonTextContainer}
				className={styles.skeletonText}
			/>
			<Skeleton
				containerClassName={styles.skeletonTextContainer}
				className={styles.skeletonText}
				style={{ maxWidth: "50%" }}
			/>
		</div>
	)
}
