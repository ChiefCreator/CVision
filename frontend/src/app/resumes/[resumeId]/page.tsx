import DocumentEditor from "@/components/document/DocumentEditor/DocumentEditor";
import EditDocumentLayout from "@/components/document/EditDocumentLayout/EditDocumentLayout";
import { DocumentProvider } from "@/hooks/document/useDocumentContext";
import { AbsoluteSidebarProvider } from "@/hooks/menu/useAbsoluteSidebarContext";

interface PageProps {
  params: Promise<{ resumeId: string }>
}

export default async function Page({ params }: PageProps) {
  const { resumeId } = await params;
  
  return (
    <AbsoluteSidebarProvider>
      <EditDocumentLayout id={resumeId}>
        <AbsoluteSidebarProvider>
          <DocumentProvider id={resumeId}>
            <DocumentEditor />
          </DocumentProvider>
        </AbsoluteSidebarProvider>
      </EditDocumentLayout>
    </AbsoluteSidebarProvider>
  );
}