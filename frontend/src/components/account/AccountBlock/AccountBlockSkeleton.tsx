"use client"

import AnimateHeightPresence from "@/components/utils/AnimatePresence/components/AnimateHeightPresence";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import UserAvatarSkeleton from "../UserAvatar/UserAvatarSkeleton";
import styles from "./AccountBlock.module.scss";

interface AccountBlockSkeletonProps extends BaseComponent {
	hideInfo?: boolean;
	avatarClassName?: string;
}

export default function AccountBlockSkeleton({ className, hideInfo, avatarClassName }: AccountBlockSkeletonProps) {
	return (
		<div className={clsx(styles.block, className)}>
			<UserAvatarSkeleton className={avatarClassName} />
			
			<AnimateHeightPresence className={styles.info} isVisible={!hideInfo}>
				<span className={styles.name}><Skeleton /></span>
				<span className={styles.email}><Skeleton /></span>
			</AnimateHeightPresence>
		</div>
	)
}
