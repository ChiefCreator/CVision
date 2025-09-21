"use client";

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import Image from "next/image";
import { NotFoundUserAvatar } from "../NotFoundUserAvatar/NotFoundUserAvatar";
import styles from "./UserAvatar.module.scss";

interface UserAvatarProps extends BaseComponent {
	picture?: string | "none";
	name?: string;
}

export default function UserAvatar({ className, picture, name }: UserAvatarProps) {
	return (
		<div className={clsx(styles.avatar, className)}>
			{picture && (
				<Image
					className={styles.picture}
					src={picture}
					alt="Аватарка пользователя"
					priority={true}
					width={250}
					height={250}
				/>
			)}
			
			{!picture && name && (
				<NotFoundUserAvatar className={styles.picture} name={name} />
			)}
		</div>
	);
}
