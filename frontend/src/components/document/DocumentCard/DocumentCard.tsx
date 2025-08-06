import { DocumentPageProvider } from '@/hooks/document/useDocumentPage';

import ResumeDocumentCard from './ResumeDocumentCard';

import type { Resume } from '@/types/resume/resume';
import type { CoverLetter } from '@/types/coverLetter/coverLetter';

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
  const getCard = () => {
    switch(type) {
      case "resume": return <ResumeDocumentCard data={data} />;
      // case "coverLetter": return <CoverLetterDocumentCard data={data} />;
    }
  }

  return (
    <DocumentPageProvider>
      {getCard()}
    </DocumentPageProvider>
  );
}