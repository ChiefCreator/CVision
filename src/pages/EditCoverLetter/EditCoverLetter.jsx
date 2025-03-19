import CoverLetterBuilder from "./../../components/CoverLetterBuilder/CoverLetterBuilder";

import { useParams } from "react-router-dom";

export default function EditCoverLetter() {
  const { coverLetterId } = useParams();

  return (
    <CoverLetterBuilder coverLetterId={coverLetterId} />
  );
}