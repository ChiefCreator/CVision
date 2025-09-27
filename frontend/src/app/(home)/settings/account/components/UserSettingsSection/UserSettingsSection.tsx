"use client"

import Button from "@/components/button/Button/Button"
import Section from "../Section/Section"
import SettingField from "../SettingField/SettingField"

import { useTheme } from "@/hooks/theme/useTheme"
import styles from "./UserSettingsSection.module.scss"

export default function UserSettingsSection() {
	const { changeTheme } = useTheme();
	
	return (
		<Section id="userSettingsSection" label="Пользовательские настройки">
			<SettingField
				title="Темы"
				control={
					<Button
						className={styles.deleteButton}
						type="buttonMenu"
						variant="primary"
						menuData={[
							{
								id: "control-dark",
								title: "Светлая",
								type: "control",
								onClick: () => changeTheme("light"),
							},
							{
								id: "control-dark",
								title: "Темная",
								type: "control",
								onClick: () => changeTheme("dark"),
							},
							{
								id: "control-dark",
								title: "Система",
								type: "control",
								onClick: () => changeTheme("system"),
							}
						]}
					>
						Выберите тему
					</Button>
				}
			/>
		</Section>
	)
}
