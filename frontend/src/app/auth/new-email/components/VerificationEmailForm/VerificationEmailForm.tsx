"use client"

import { useSearchParams } from "next/navigation";

import Loader from "@/components/loading/Loader/Loader";
import { useChangeEmail } from "@/hooks/auth/useChangeEmail";
import { useEffect } from "react";
import styles from "./VerificationEmailForm.module.scss";

export default function ChangeEmailForm() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const { mutate, isPending } = useChangeEmail();

	useEffect(() => {
		mutate(token);
	}, [token, mutate]);

	return (
		<form className={styles.form}>
			<header className={styles.head}>
				<h2 className={styles.title}>Изменение почты</h2>
				<p className={styles.description}>Подождите некоторое время</p>
			</header>

			<div className={styles.body}>
				<Loader isLoading={isPending} />
			</div>
		</form>
	);
}