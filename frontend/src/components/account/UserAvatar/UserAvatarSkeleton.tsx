"use client"

import { BaseComponent } from "@/types/root"
import clsx from "clsx"
import Skeleton from "react-loading-skeleton"
import styles from "./UserAvatar.module.scss"

interface UserAvatarSkeletonProps extends BaseComponent {};

export default function UserAvatarSkeleton({ className }: UserAvatarSkeletonProps) {
	return (
		<div className={clsx(styles.avatar, className)}>
			<Skeleton className={styles.avatarSkeleton} />
		</div>
	)
}
