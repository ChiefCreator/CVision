"use client"

import { useEffect, useRef, useState } from "react";

import TabButton from "./TabButton";
import TabPanel from "./TabPanel/TabPanel";

import type { DocumentFullType, DocumentTabsMap } from "./types/document";

import styles from "./DocumentTabs.module.scss";
import Button from "@/components/button/Button/Button";
import { DropdownMenuItemType } from "@/components/menu/DropdownMenu/DropdownMenu";

interface DocumentTabsProps {
  tabs: DocumentTabsMap;
}

export default function DocumentTabs({ tabs }: DocumentTabsProps) {
  const [activeTab, setActiveTab] = useState<DocumentFullType>("all");
  const [indicatorSize, setIndicatorSize] = useState({ width: 0, left: 0 });
  const tabButtonsRef = useRef<HTMLButtonElement[]>([]);

  const changeTab = (tab: DocumentFullType) => setActiveTab(tab);
  const calcIndicatorSize = (activeTab: DocumentFullType) => {
    const tabButtonActive = tabButtonsRef.current.find(button => button.id === activeTab);

    if (!tabButtonActive) return { width: 0, left: 0 };

    const width = tabButtonActive.offsetWidth;
    const left = tabButtonActive.offsetLeft;

    return { width, left };
  }

  useEffect(() => {
    setIndicatorSize(calcIndicatorSize(activeTab));
  }, [activeTab])

  const menuData: DropdownMenuItemType[] = [
    {
      id: "create-resume",
      label: "Резюме",
      onClick: () => console.log("create-resume"),
    },
    {
      id: "create-cover-letter",
      label: "Сопроводительное письмо",
      onClick: () => console.log("create-cover-letter"),
    },
  ];

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
                onClick={() => changeTab(type as DocumentFullType)}
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
        <TabPanel
          type={activeTab}
          data={tabs[activeTab].data as any}
          id={`tabpanel-${activeTab}`}
        />
      </div>
    </div>
  );
}