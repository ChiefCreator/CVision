"use client"

import Button from "@/components/button/Button/Button"
import Section from "../Section/Section"
import SettingField from "../SettingField/SettingField"

import DeleteAccountModal from "@/components/position/Modal/components/DeleteAccountModal/DeleteAccountModal"
import { useModal } from "@/hooks/position/useModal"
import styles from "./DangerousZoneSection.module.scss"

export default function DangerousZoneSection() {
	const { isOpen, id: modalId, close, open } = useModal();

	return (
		<>
			<Section id="dangerousZone" label="Опасная зона">
				<SettingField
					title="Удаление аккаунта"
					description="После удаления аккаунта его нельзя будет восстановить. Это необратимо."
					control={
						<Button
							className={styles.deleteButton}
							type="simpleButton"
							variant="danger"
							onClick={open}
						>
							Удалить учетную запись
						</Button>
					}
				/>
			</Section>

			<DeleteAccountModal
				modal={{
					id: modalId,
					isOpen,
					onClose: close,

					title: "Вы уверены?"
				}}
			/>
		</>
	)
}
