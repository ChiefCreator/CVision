import ResumeEditor from "./ResumeEditor/ResumeEditor"

import styles from "@/app/resumes/[resumeId]/page.module.scss"

interface PageProps {
  params: Promise<{ resumeId: string }>
}

export default async function Page({ params }: PageProps) {
  const { resumeId } = await params;
  
  return (
    <div className={styles.page}>
      <ResumeEditor resumeId={resumeId} />
    </div>
  );
}