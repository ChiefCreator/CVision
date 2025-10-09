"use client"

import clsx from "clsx";

import { useCurrentUserQuery } from "@/api/user/hooks";
import Button from "@/components/button/Button/Button";
import FormFieldFormInput from "@/components/form/FormField/FormFieldFormInput/FormFieldFormInput";
import AdaptiveModal, { AdaptiveModalProps } from "@/components/position/AdaptiveModal/AdaptiveModal";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./DeleteAccountModal.module.scss";
import { formSchema } from "./formSchema";

interface DeleteAccountModalProps {
	modal: Omit<AdaptiveModalProps, "children">;
}

export default function DeleteAccountModal({ modal }: DeleteAccountModalProps) {
	const { data: user } = useCurrentUserQuery();
	const { mutate: deleteUser, state, setState } = useDeleteUser();

	const schema = useMemo(() => formSchema(user?.email ?? ""), [user?.email]);
	const { control, handleSubmit, reset, formState: { errors } } = useForm({
		resolver: zodResolver(schema),
	});

	const submit = () => {
		deleteUser();
	}

	useEffect(() => {
		if (!modal.isOpen) {
			reset({ confirmation: "" });
		}
	}, [modal.isOpen]);

	return (
		<AdaptiveModal {...modal} className={clsx(styles.modal, modal.className)}>
			<h2 className={styles.title}>Вы уверены?</h2>

			<p className={styles.description}>Это действие нельзя будет отменить. Ваш аккаунт будет навсегда удален без возможности восстановления всех ваших резюме, сопроводительных писем и других данных.</p>

			<form className={styles.form} onSubmit={handleSubmit(submit)}>
				<Controller
					control={control}
					name="confirmation"
					render={({ field }) => (
						<FormFieldFormInput
							label="Введите ваш текущий логин"
							className={styles.inputField}
							errorMessage={errors.confirmation?.message}
							{...field}
						/>
					)}
				/>

				<Button
					className={styles.button}
					type="submit"
					variant="danger"
					actionType="submit"
					status={state}
					setStatus={setState}
				>
					Удалить аккаунт
				</Button>
			</form>
		</AdaptiveModal>
	)
}
