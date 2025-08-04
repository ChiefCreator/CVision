import { useMemo } from "react";

import DocumentTabs from "@/components/tabs/DocumentTabs/DocumentTabs";

import type { DocumentTabsMap } from "@/components/tabs/DocumentTabs/types/document";

export default function DashboardPage() {
  const tabs = useMemo<DocumentTabsMap>(() => ({
    all: {
      title: "Все документы",
      data: null
    },
    resume: {
      title: "Резюме",
      data: null
    },
    coverLetter: {
      title: "Сопроводительные письма",
      data: null
    },
  }), []);

  return (
    <DocumentTabs tabs={tabs} />
  );
}