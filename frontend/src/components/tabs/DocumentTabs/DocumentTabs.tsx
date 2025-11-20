"use client"

import { useCreateDocument } from "@/api/document/hooks/useCreateDocument";
import { useGetDocuments } from "@/api/document/hooks/useGetDocuments";
import { useEffect, useMemo, useRef, useState } from "react";

import Button from "@/components/button/Button/Button";
import Tabs, { TabsApi } from "../Tabs/Tabs";

import { MenuItemData } from "@/types/menu/menu";

import DocumentsList from "@/components/document/DocumentsList/DocumentsList";
import NoDocuments from "@/components/document/NoDocuments/NoDocuments";
import { filterDocumentsByType } from "@/utils/document/filterDocumentsByType";

import styles from "./DocumentTabs.module.scss";

export default function DocumentTabs() {
  const { data: documents, isLoading } = useGetDocuments();
  const { mutate: createDocument } = useCreateDocument();

  const [indicatorSize, setIndicatorSize] = useState({ width: 0, left: 0 });
  const tabsApiRef = useRef<TabsApi>(null);

  const menuData = useMemo<MenuItemData>(() => ([
    {
      type: "control",
      id: "create-resume",
      title: "Резюме",
      onClick: () => createDocument({
        type: "resume",
        template: "classic",
      }),
    },
    {
      type: "control",
      id: "create-cover-letter",
      title: "Сопроводительное письмо",
      onClick: () => createDocument({
        type: "coverLetter",
        template: "classic",
      }),
    },
  ]), []);

  const calcIndicatorSize = (activeValue: string) => {
    const triggers = tabsApiRef.current?.getTriggers();

    const activeTrigger = triggers?.find(trigger => trigger.id === `trigger-${activeValue}`);

    if (!activeTrigger) return { width: 0, left: 0 };

    const width = activeTrigger.offsetWidth;
    const left = activeTrigger.offsetLeft;

    return { width, left };
  }

  const handleChangeValue = (activeValue: string) => {
    setIndicatorSize(calcIndicatorSize(activeValue));
  }

  useEffect(() => {
    setIndicatorSize(calcIndicatorSize("all"));
  }, []);

  return (
    <Tabs
      className={styles.tabs}
      defaultValue="all"
      apiRef={tabsApiRef}
      onChangeValue={handleChangeValue}
    >
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Tabs.List className={styles.tabsList}>
            <Tabs.Trigger className={styles.tabsTrigger} value="all">
              Все документы
            </Tabs.Trigger>

            <Tabs.Trigger className={styles.tabsTrigger} value="resume">
              Резюме
            </Tabs.Trigger>

            <Tabs.Trigger className={styles.tabsTrigger} value="coverLetter">
              Сопроводительные письма
            </Tabs.Trigger>
          </Tabs.List>

          <div className={styles.controlsList}>
            <Button
              className={styles.control}
              type="buttonMenu"
              variant="secondary"
              menuData={menuData}
            >Создать новый документ</Button>
          </div>
        </div>

        <div className={styles.line}>
          <span className={styles.indicator} style={{ ...indicatorSize }}></span>
        </div>
      </header>

      <div className={styles.body}>
        <Tabs.Content className={styles.tabsContent} value="all">
          <DocumentsList
            className={styles.documentsList}
            data={documents}
            isLoading={isLoading}
            emptyContent={
              <NoDocuments
                className={styles.noDocument}
                illustrationSrc={"/images/no-documents/no-documents.jpg"}
                title="Документы не найдены"
                description="Здесь пока пусто... Добавьте свой первый документ, чтобы начать работу!"
                controlsContent={
                  <Button
                    className={styles.noDocumentControl}
                    type="buttonMenu"
                    variant="secondary"
                    menuData={menuData}
                  >Создать новый документ</Button>
                }
              />
            }
          />
        </Tabs.Content>

        <Tabs.Content className={styles.tabsContent} value="resume">
          <DocumentsList
            className={styles.documentsList}
            data={filterDocumentsByType(documents ?? [], "resume")}
            isLoading={isLoading}
            emptyContent={
              <NoDocuments
                className={styles.noDocument}
                illustrationSrc={"/images/no-documents/no-resumes.jpg"}
                title="Резюме не найдены"
                description="Здесь пока пусто... Добавьте свое перове резюме, чтобы начать работу!"
                controlsContent={
                  <Button
                    className={styles.noDocumentControl}
                    type="simpleButton"
                    variant="secondary"
                    onClick={() => createDocument({
                      type: "resume",
                      template: "classic",
                    })}
                  >Создать новое резюме</Button>
                }
              />
            }
          />
        </Tabs.Content>

        <Tabs.Content className={styles.tabsContent} value="coverLetter">
          <DocumentsList
            className={styles.documentsList}
            data={filterDocumentsByType(documents ?? [], "coverLetter")}
            isLoading={isLoading}
            emptyContent={
              <NoDocuments
                className={styles.noDocument}
                illustrationSrc={"/images/no-documents/no-cover-letter.jpg"}
                title="Сопроводительные письма не найдены"
                description="Здесь пока пусто... Добавьте свое перове сопроводительное письмо, чтобы начать работу!"
                controlsContent={
                  <Button
                    className={styles.noDocumentControl}
                    type="simpleButton"
                    variant="secondary"
                    onClick={() => createDocument({
                      type: "coverLetter",
                      template: "classic",
                    })}
                  >Создать новое сопроводительное письмо</Button>
                }
              />
            }
          />
        </Tabs.Content>
      </div>
    </Tabs>
  );
}