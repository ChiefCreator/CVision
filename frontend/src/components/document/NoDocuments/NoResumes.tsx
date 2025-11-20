"use client"

import Button from "@/components/button/Button/Button";
import NoDocuments from "./NoDocuments";

interface NoResumesProps {
	onCreate: () => void;
}

export default function NoResumes({ onCreate }: NoResumesProps) {
	return (
		<NoDocuments
			illustrationSrc={"/images/no-documents/no-resumes.jpg"}
			title="Резюме не найдены"
			description="Здесь пока пусто... Добавьте свое перове резюме, чтобы начать работу!"
			controlsContent={
				<Button
					type="simpleButton"
					variant="secondary"
					onClick={onCreate}
				>Создать новое резюме</Button>
			}
		/>
	)
}
