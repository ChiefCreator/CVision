"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Button from "@/components/button/Button/Button";
import { FormFieldCheckbox } from "@/components/form/FormField/FormFieldCheckbox/FormFieldCheckbox";
import FormFieldFormInput from "@/components/form/FormField/FormFieldFormInput/FormFieldFormInput";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import { IsAccountExist } from "@/components/form/IsAccountExist/IsAccountExist";
import { useRegister } from "@/hooks/auth/useRegister";
import Link from "next/link";
import styles from "./RegisterForm.module.scss";
import { RegisterFormData, registerSchema } from "./registerSchema";

export default function RegisterForm() {
	const { mutate, state, isPending, setState } = useRegister();
	const { handleSubmit, control, formState: { errors } } = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			terms: false
		}
	});

	const onSubmit = (data: RegisterFormData) => {
		if (isPending) return;

		mutate(data);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<header className={styles.head}>
				<h2 className={styles.title}>Регистрация</h2>
				<p className={styles.description}>Чтобы войти в приложение введите ваш email и пароль</p>
			</header>

			<div className={styles.body}>
				<FormGroup className={styles.inputs}>
					<FormGroupCell>
						<Controller
      			  name="name"
      			  control={control}
      			  render={({ field }) => (
								<FormFieldFormInput
									label="Введите имя"
									placeholder="Имя"
									errorMessage={errors.name?.message}
									{...field}
								/>
							)}
      			/>
					</FormGroupCell>

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

				<Controller
      	  name="terms"
      	  control={control}
      	  render={({ field }) => (
						<FormFieldCheckbox
							className={styles.checkbox}
							errorMessage={errors.terms?.message}
							label={<label>Я принимаю <Link className={styles.link} href="/terms" target="_blank">Условия использования</Link> и <Link className={styles.link} href="/privacy" target="_blank">Политику конфиденциальности</Link></label>}
							{...field}
						/>
					)}
				/>

				<Button
					className={styles.submitButton}
					type="submit"
					status={state}
					setStatus={setState}
				>
					Создать аккаунт
				</Button>

				<IsAccountExist className={styles.isAccountExist} isExist={true} />
			</div>
		</form>
	);
}