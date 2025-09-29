import ResumeEditor from "@/components/resume/ResumeEditor/ResumeEditor";
import { AbsoluteSidebarProvider } from "@/hooks/menu/useAbsoluteSidebarContext";

interface PageProps {
  params: Promise<{ resumeId: string }>
}

export default async function Page({ params }: PageProps) {
  const { resumeId } = await params;
  
  return (
    <AbsoluteSidebarProvider>
      <ResumeEditor resumeId={resumeId} />
    </AbsoluteSidebarProvider>
  );
}