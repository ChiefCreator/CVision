"use client"

import FormFieldFormInput from "@/components/form/FormField/FormFieldFormInput/FormFieldFormInput";
import { Section as SectionType } from "@/types/menu/scrollSpyMenu";
import Section from "../Section/Section";

import { useCurrentUserQuery } from "@/api/user/hooks";
import Button from "@/components/button/Button/Button";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import { useUpdateCurrentUser } from "@/hooks/user/useUpdateCurrentUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import UserAvatarPanel from "./components/UserAvatarPanel/UserAvatarPanel";
import styles from "./ProfileSection.module.scss";
import { UpdateProfileFormData, updateProfileSchema } from "./updateProfileSchema";

interface ProfileSectionProps extends SectionType {}

export default function ProfileSection({ id, label }: ProfileSectionProps) {
	const { data: user } = useCurrentUserQuery();
	const { mutate, state, setState } = useUpdateCurrentUser();
	const { handleSubmit, reset, control, formState: { errors } } = useForm<UpdateProfileFormData>({
		resolver: zodResolver(updateProfileSchema),
	});
	const { field: pictureField } = useController({ name: "picture", control });
  const { field: isResetPictureField } = useController({ name: "isResetPicture", control });
	
	const onSubmit = (data: UpdateProfileFormData) => {
		mutate(data);
	}

	useEffect(() => {
  	if (!user) return;

  	reset({
  	  email: user.email,
  	  name: user.name,
  	});
	}, [user, reset]);

	return (
		<Section id={id} label={label}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<FormGroup className={styles.inputs}>
					<FormGroupCell>
						<UserAvatarPanel
							chosenPicture={pictureField.value}
							savedPicture={user?.picture}
							name={user?.name}
							isResetPicture={isResetPictureField.value}
							onChange={pictureField.onChange}
							onChangeIsResetPicture={isResetPictureField.onChange}
						/>
					</FormGroupCell>

					<FormGroupCell>
						<Controller
      			  name="name"
      			  control={control}
      			  render={({ field }) => (
								<FormFieldFormInput
									label="Имя"
									componentType="base"
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
									label="Email"
									placeholder="you@compony.com"
									errorMessage={errors.email?.message}
									{...field}
								/>
							)}
      			/>
					</FormGroupCell>
				</FormGroup>

				<Button
					className={styles.submitButton}
					type="submit"
					variant="primary"
					status={state}
					setStatus={setState}
				>
					Сохранить изменения
				</Button>
			</form>
		</Section>
	)
}
