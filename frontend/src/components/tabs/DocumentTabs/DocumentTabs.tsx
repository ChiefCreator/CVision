"use client"

import { useCreateDocument } from "@/api/document/hooks/useCreateDocument";
import { useGetDocuments } from "@/api/document/hooks/useGetDocuments";
import { useMemo, useRef, useState } from "react";

import Button from "@/components/button/Button/Button";
import DocumentCard from "@/components/document/DocumentCard/DocumentCard";
import DocumentCardSkeleton from "@/components/document/DocumentCard/DocumentCardSkeleton";
import Tabs, { TabsApi } from "../Tabs/Tabs";

import { MenuItemData } from "@/types/menu/menu";

import { DocumentProvider } from "@/hooks/document/useDocumentContext";
import styles from "./DocumentTabs.module.scss";

export default function DocumentTabs() {
  const { data: documents, isLoading } = useGetDocuments();
  const { mutate: createDocument } = useCreateDocument();

  const [indicatorSize, setIndicatorSize] = useState({ width: 0, left: 0 });
  const tabsApiRef = useRef<TabsApi>(null);

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
              variant={"secondary"}
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
          <div className={styles.documentsList}>
            {isLoading && <DocumentCardSkeleton count={4} />}

            {documents?.map(document => (
              <DocumentProvider id={document.id} key={document.id}>
                <DocumentCard
                  key={document.id}
                  className={styles.documentCard}
                />
              </DocumentProvider>
            ))}
          </div>
        </Tabs.Content>
      </div>
    </Tabs>
  );
}