"use client"

import { useSearchParams } from "next/navigation";

import Loader from "@/components/loading/Loader/Loader";
import { useConfirmEmail } from "@/hooks/verification/useConfirmEmail";
import { useEffect } from "react";
import styles from "./VerificationEmailForm.module.scss";

export default function VerificationEmailForm() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const { mutate, isPending } = useConfirmEmail();

	useEffect(() => {
		mutate(token);
	}, [token, mutate]);

	return (
		<form className={styles.form}>
			<header className={styles.head}>
				<h2 className={styles.title}>Подтверждение почты</h2>
				<p className={styles.description}>Подождите некоторое время</p>
			</header>

			<div className={styles.body}>
				<Loader isLoading={isPending} />
			</div>
		</form>
	);
}