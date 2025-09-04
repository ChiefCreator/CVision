"use client"

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import Link from "next/link";
import styles from "./IsAccountExist.module.scss";

interface IsAccountExistProps extends BaseComponent {
	isExist: boolean;
}

export function IsAccountExist({ className, isExist }: IsAccountExistProps) {
	return (
		<span className={clsx(styles.text, className)}>
			{isExist && (
				<>Уже есть аккаунт? <Link className={styles.link} href={"/auth/login"}>Войти</Link></>
			)}

			{!isExist && (
				<>Еще нет аккаунта? <Link className={styles.link} href={"/auth/register"}>Зарегистрироваться</Link></>
			)}
		</span>
	)
}
