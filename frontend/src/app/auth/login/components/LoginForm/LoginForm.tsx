"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Button from "@/components/button/Button/Button";
import FormFieldFormInput from "@/components/form/FormField/FormFieldFormInput/FormFieldFormInput";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import { IsAccountExist } from "@/components/form/IsAccountExist/IsAccountExist";
import { useLogin } from "@/hooks/auth/useLogin";
import styles from "./LoginForm.module.scss";
import { LoginFormData, loginSchema } from "./loginSchema";

export default function LoginForm() {
	const { mutate, state, isPending, setState } = useLogin();
	const { handleSubmit, control, formState: { errors } } = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData) => {
		if (isPending) return;

		mutate(data);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<header className={styles.head}>
				<h2 className={styles.title}>Вход в аккаунт</h2>
				<p className={styles.description}>Чтобы войти в приложение введите ваш email и пароль</p>
			</header>

			<div className={styles.body}>
				<FormGroup className={styles.inputs}>
					<FormGroupCell>
						<Controller
      			  name="email"
      			  control={control}
      			  render={({ field }) => (
								<FormFieldFormInput
									label="Введите email"
									placeholder="you@compony.com"
									errorMessage={errors.email?.message}
									{...field}
								/>
							)}
      			/>
					</FormGroupCell>

					<FormGroupCell>
						<Controller
      			  name="password"
      			  control={control}
      			  render={({ field }) => (
								<FormFieldFormInput
									label="Введите пароль"
									placeholder="Пароль"
									componentType="password"
									errorMessage={errors.password?.message}
									{...field}
								/>
							)}
      			/>
					</FormGroupCell>
				</FormGroup>

				<Button
					className={styles.submitButton}
					type="submit"
					status={state}
					setStatus={setState}
				>
					Войти
				</Button>

				<IsAccountExist className={styles.isAccountExist} isExist={false} />
			</div>
		</form>
	);
}