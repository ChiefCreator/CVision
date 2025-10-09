import { AbsoluteSidebarProvider } from "@/hooks/menu/useAbsoluteSidebarContext";
import PageLayout from "./components/PageLayout/PageLayout";

interface PageProps {
  params: Promise<{ resumeId: string }>
}

export default async function Page({ params }: PageProps) {
  const { resumeId } = await params;
  
  return (
    <AbsoluteSidebarProvider>
      <PageLayout resumeId={resumeId} />
    </AbsoluteSidebarProvider>
  );
}