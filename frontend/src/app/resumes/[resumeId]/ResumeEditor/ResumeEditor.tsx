"use client"

import { useResumeQuery } from "@/api/resume/hooks";

interface ResumeEditorProps {
  resumeId: string;
}

export default function ResumeEditor({ resumeId }: ResumeEditorProps) {
  const { data, isLoading } = useResumeQuery(resumeId);

  return (
    <div></div>
  );
}