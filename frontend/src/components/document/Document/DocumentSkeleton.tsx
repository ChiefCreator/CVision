"use client"

import clsx from "clsx"
import Skeleton from "react-loading-skeleton"
import styles from "./Document.module.scss"

export default function DocumentSkeleton() {
	return (
		<div className={clsx(styles.document, styles.skeleton)}>
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
