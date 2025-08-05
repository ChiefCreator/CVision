"use client"

import { useEffect, useRef, useState } from "react";
import { ResponsiveTemplateProvider } from "@/components/document/hooks/useResponsiveTemplateContext";


import TabButton from "./TabButton";
import TabPanel from "./TabPanel/TabPanel";
import { DropdownMenuItemType } from "@/components/menu/DropdownMenu/DropdownMenu";

import type { DocumentTabType, DocumentTabsMap } from "./types/document";

import styles from "./DocumentTabs.module.scss";
import Button from "@/components/button/Button/Button";
import { useSidebar } from "@/components/menu/Sidebar/hooks/useSidebar";

interface DocumentTabsProps {
  tabs: DocumentTabsMap;
}

export default function DocumentTabs({ tabs }: DocumentTabsProps) {
  const { isAnimating } = useSidebar();
  const [activeTab, setActiveTab] = useState<DocumentTabType>("resume");
  const [indicatorSize, setIndicatorSize] = useState({ width: 0, left: 0 });
  const tabButtonsRef = useRef<HTMLButtonElement[]>([]);

  const changeTab = (tab: DocumentTabType) => setActiveTab(tab);
  const calcIndicatorSize = (activeTab: DocumentTabType) => {
    const tabButtonActive = tabButtonsRef.current.find(button => button.id === `tab-${activeTab}`);

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