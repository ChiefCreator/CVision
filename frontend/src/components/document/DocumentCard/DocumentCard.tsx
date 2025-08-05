import type { Resume } from '@/types/resume/resume';
import type { CoverLetter } from '@/types/coverLetter/coverLetter';

import ResumeDocumentCard from './ResumeDocumentCard';

interface ResumeDocumentCardProps {
  type: "resume";
  data: Resume;
}

interface CoverLetterDocumentCardProps {
  type: "coverLetter";
  data: CoverLetter;
}

type DocumentCardProps = ResumeDocumentCardProps | CoverLetterDocumentCardProps;

export default function DocumentCard({ type, data }: DocumentCardProps) {
  switch(type) {
    case "resume": return <ResumeDocumentCard data={data} />;
    // case "coverLetter": return <CoverLetterDocumentCard data={data} />;
  }
}