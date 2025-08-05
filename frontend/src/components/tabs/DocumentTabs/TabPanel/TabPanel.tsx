import { DocumentPageProvider } from "@/hooks/document/useDocumentPage";

import DocumentCardList from "@/components/document/DocumentCardList/DocumentCardList";

import type { Document } from "@/types/document/document";

import styles from "./../DocumentTabs.module.scss";

interface TabPanelProps {
  id: string;
  data?: Document[];
}

export default function TabPanel({ id, data }: TabPanelProps) {
  if (!data) return;

  return (
    <DocumentPageProvider>
      <div className={styles.panel} role="tabpanel" id={id}>
        <DocumentCardList data={data} />
      </div>
    </DocumentPageProvider>
  );
}