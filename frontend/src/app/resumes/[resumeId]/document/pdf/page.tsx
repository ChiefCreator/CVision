import { resumeService } from "@/api/resume/resumeService";
import Document from "@/components/document/Document/Document";
import { DocumentPageProvider } from "@/hooks/document/useDocumentPage";
import { notFound } from "next/navigation";

interface PrintPageProps {
  params: Promise<{ resumeId: string }>;
};

export default async function PrintPage({ params }: PrintPageProps) {
  const { resumeId } = await params;
  const resume = await resumeService.getOne(resumeId);

  if (!resume) return notFound();

  return (
    <DocumentPageProvider>
      <Document
        performance="print"
        template={{
          type: "resume",
          data: resume,
          template: "classic"
        }}
      />
    </DocumentPageProvider>
  );
}