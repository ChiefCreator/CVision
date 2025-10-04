import DocumentTabs from "@/components/tabs/DocumentTabs/DocumentTabs";
import { DocumentTabsProvider } from "@/components/tabs/DocumentTabs/hooks/useDocumentTabsContext";
import Container from "@/components/utils/Container/Container";

export default function DashboardPage() {
  return (
    <DocumentTabsProvider>
      <Container>
        <DocumentTabs />
      </Container>
    </DocumentTabsProvider>
  );
}