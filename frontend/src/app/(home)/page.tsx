import DocumentTabs from "@/components/tabs/DocumentTabs/DocumentTabs";
import { DocumentTabsProvider } from "@/components/tabs/DocumentTabs/hooks/useDocumentTabsContext";

export default function DashboardPage() {
  return (
    <DocumentTabsProvider>
      <DocumentTabs />
    </DocumentTabsProvider>
  );
}