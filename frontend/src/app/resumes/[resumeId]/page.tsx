import ResumeEditor from "@/components/resume/ResumeEditor/ResumeEditor";

interface PageProps {
  params: Promise<{ resumeId: string }>
}

export default async function Page({ params }: PageProps) {
  const { resumeId } = await params;
  
  return (
    <ResumeEditor resumeId={resumeId} />
  );
}