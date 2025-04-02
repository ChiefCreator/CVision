import { useNavigate } from "react-router-dom";

import styles from "./Documents.module.scss";
import noResumeSrc from "./../../assets/images/no-resume.jpg";
import noCoverLetterSrc from "./../../assets/images/no-cover-letter.jpg";

import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import NoDocuments from "../../components/NoDocuments/NoDocuments";
import DocumentCardList from "../../components/DocumentCardList/DocumentCardList";
import DocumentCard from "../../components/DocumentCard/DocumentCard";

const config = {
  resume: {
    title: "Резюме",
    noDocuments: {
      illustrationSrc: noResumeSrc,
      title: "Резюме отсутствуют",
      description: "Здесь пока пусто... Добавьте свое первое резюме, чтобы начать работу!",
      buttonAddTitle: "Добавить новое резюме",
    },
  },
  "cover-letter": {
    title: "Сопроводительные письма",
    noDocuments: {
      illustrationSrc: noCoverLetterSrc,
      title: "Сопроводительные письма отсутствуют",
      description: "Здесь пока пусто... Добавьте свое первое сопроводительное резюме, чтобы начать работу!",
      buttonAddTitle: "Добавить новое сопроводительное письмо",
    },
  }
}

export default function Documents({ type = "resume", documents, changeCardTitle, clickEditButton, clickDeleteButton, clickAddButton, duplicateDocument }) {
  const data = config[type];
  const documentsLength = documents?.length;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTitleWrapper}>
          <h2 className={styles.headerTitle}>{data.title}</h2>
          {documentsLength > 0 && <span className={styles.headerCounter}>{documentsLength}</span>}
        </div>

        <span className={styles.headerLine}></span>
      </header>
      <div className={styles.pageBody}>
        <div className={styles.pageDocumentsList}>
          {(!documentsLength) && 
            <NoDocuments
              illustrationSrc={data.noDocuments.illustrationSrc}
              title={data.noDocuments.title}
              description={data.noDocuments.description}
              Control={
                <ButtonAdd
                  key="button-add"
                  appearance="bg"
                  callbackOnClick={clickAddButton}
                >
                  {data.noDocuments.buttonAddTitle}
                </ButtonAdd>
              }
            />
          }
          <DocumentCardList>
            {documents?.map(document => {
              return (
                <DocumentCard
                  key={document.id}
                  data={document}
                  onChangeTitleCallback={(value) => changeCardTitle(type, document.id, "title", value)}
                  onEditButtonClick={() => clickEditButton(`/${type === "resume" ? "resumes" : "coverLetters"}/${document.id}/edit`)}
                  onDeleteButtonClick={() => clickDeleteButton(type, document.id)}
                  onDuplicateButtonClick={() => duplicateDocument(type, document)}
                />
              );
            })}
          </DocumentCardList>
        </div>
      </div>
    </div>
  );
}