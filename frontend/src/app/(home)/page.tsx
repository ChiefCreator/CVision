"use client"

import { useMemo } from "react";

import DocumentTabs from "@/components/tabs/DocumentTabs/DocumentTabs";

import type { DocumentTabsMap } from "@/components/tabs/DocumentTabs/types/document";
import { useDocuments } from "@/hooks/document/useDocuments";

export default function DashboardPage() {
  const { resumesDoc } = useDocuments();

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

  return (
    <DocumentTabs tabs={tabs} />
  );
}