"use client"

import Button from "@/components/button/Button/Button";
import NoDocuments from "./NoDocuments";

interface NoCoverLettersProps {
	onCreate: () => void;
}

export default function NoCoverLetters({ onCreate }: NoCoverLettersProps) {
	return (
		<NoDocuments
      illustrationSrc={"/images/no-documents/no-cover-letter.jpg"}
      title="Сопроводительные письма не найдены"
      description="Здесь пока пусто... Добавьте свое перове сопроводительное письмо, чтобы начать работу!"
      controlsContent={
        <Button
          type="simpleButton"
          variant="secondary"
          onClick={onCreate}
        >Создать новое сопроводительное письмо</Button>
      }
    />
	)
}
