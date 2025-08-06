"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import { ResponsiveTemplateProvider } from "@/components/document/hooks/useResponsiveTemplateContext";


import TabButton from "./TabButton/TabButton";
import TabPanel from "./TabPanel/TabPanel";
import { DropdownMenuItemType } from "@/components/menu/DropdownMenu/DropdownMenu";

import type { DocumentTabType, DocumentTabsMap } from "./types/document";

import styles from "./DocumentTabs.module.scss";
import Button from "@/components/button/Button/Button";
import { useSidebar } from "@/components/menu/Sidebar/hooks/useSidebar";
import DocumentTabsSkeleton from "./DocumentTabsSkeleton";
import { useDocumentTabsContext } from "./hooks/useDocumentTabsContext";

export default function DocumentTabs() {
  const { isAnimating } = useSidebar();
  const { resumesDoc, isLoading, createResume, changeTab, activeTab } = useDocumentTabsContext();
  
  const [indicatorSize, setIndicatorSize] = useState({ width: 0, left: 0 });
  const tabButtonsRef = useRef<HTMLButtonElement[]>([]);

  const calcIndicatorSize = (activeTab: DocumentTabType) => {
    const tabButtonActive = tabButtonsRef.current.find(button => button.id === `tab-${activeTab}`);

    if (!tabButtonActive) return { width: 0, left: 0 };

    const width = tabButtonActive.offsetWidth;
    const left = tabButtonActive.offsetLeft;

    return { width, left };
  }

  useEffect(() => {
    if (isLoading) return;

    setIndicatorSize(calcIndicatorSize(activeTab));
  }, [activeTab, isLoading])

  const tabs = useMemo<DocumentTabsMap>(() => ({
    all: {
      title: "Все документы",
      data: resumesDoc
    },
    resume: {
      title: "Резюме",
      data: resumesDoc
    },
    coverLetter: {
      title: "Сопроводительные письма",
      data: undefined
    },
  }), [resumesDoc]);
  const menuData = useMemo<DropdownMenuItemType[]>(() => ([
    {
      id: "create-resume",
      label: "Резюме",
      onClick: () => createResume({}),
    },
    {
      id: "create-cover-letter",
      label: "Сопроводительное письмо",
      onClick: () => console.log("create-cover-letter"),
    },
  ]), []);

  if (isLoading) return <DocumentTabsSkeleton />

  return (
    <div className={styles.tabs}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.buttonsList} role="tablist">
            {Object.entries(tabs).map(([type, { title }], i) => (
              <TabButton
                key={type}
                id={`tab-${type}`}
                isActive={type === activeTab}
                ref={(el: HTMLButtonElement) => tabButtonsRef.current[i] = el}
                role="tab"
                aria-selected={type === activeTab}
                aria-controls={`tabpanel-${type}`}
                onClick={() => changeTab(type as DocumentTabType)}
              >{title}</TabButton>
            ))}
          </div>

          <div className={styles.controlsList}>
            <Button
              type="buttonMenu"
              menuData={menuData}
            >Создать новый документ</Button>
          </div>
        </div>

        <div className={styles.line}>
          <span className={styles.indicator} style={{ ...indicatorSize }}></span>
        </div>
      </header>

      <div className={styles.body}>
        <ResponsiveTemplateProvider isRecalc={isAnimating}>
          <TabPanel
            data={tabs[activeTab].data}
            id={`tabpanel-${activeTab}`}
          />
        </ResponsiveTemplateProvider>
      </div>
    </div>
  );
}