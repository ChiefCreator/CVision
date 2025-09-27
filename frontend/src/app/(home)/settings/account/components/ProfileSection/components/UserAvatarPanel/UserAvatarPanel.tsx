"use client";

import UserAvatar from "@/components/account/UserAvatar/UserAvatar";
import Button from "@/components/button/Button/Button";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import { useRef } from "react";
import styles from "./UserAvatarPanel.module.scss";

interface UserAvatarPanelProps extends BaseComponent {
	chosenPicture?: File | null;
	savedPicture?: string;
	name?: string;
	isResetPicture?: boolean;
	onChange: (picture: File | null) => void;
	onChangeIsResetPicture: (isResetPicture: boolean) => void;
}

export default function UserAvatarPanel({ className, chosenPicture, savedPicture, name, isResetPicture, onChange, onChangeIsResetPicture }: UserAvatarPanelProps) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleChangeButtonClick = () => {
		fileInputRef.current?.click();
	}

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];

			onChange(file);
			onChangeIsResetPicture(false);
    }
	}

	const handleDeleteButtonClick = () => {
		onChange(null);
		onChangeIsResetPicture(true);
	}

	const getPicture = () => {
		if (isResetPicture) {
			return undefined;
		}

		if (chosenPicture) {
			return URL.createObjectURL(chosenPicture);
		}

		return savedPicture;
	}

	return (
		<div className={clsx(styles.panel, className)}>
			<div className={styles.container}>
				<UserAvatar
					className={styles.avatar}
					picture={getPicture()}
					name={name}
				/>

				<div className={styles.controls}>
					<Button
						className={clsx(styles.button, styles.buttonChange)}
						type="simpleButton"
						variant="neutral"
						actionType="button"
						onClick={handleChangeButtonClick}
					>
						Изменить
					</Button>

					<Button
						className={clsx(styles.button, styles.buttonDelete)}
						type="simpleButton"
						variant="danger"
						actionType="button"
						onClick={handleDeleteButtonClick}
					>
						Удалить
					</Button>
				</div>
			</div>

			<input
				className={styles.fileInput}
				type="file"
				accept="image/*"
				ref={fileInputRef}
				onChange={handleFileInputChange}
			/>
		</div>
	);
}
