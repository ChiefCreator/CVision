import CVBuilder from "./../../components/CVBuilder/CVBuilder";
import ImageUploader from "./../../components/ImageUploader/ImageUploader";

import { useParams } from "react-router-dom";

export default function CreateResume() {
  const { resumeId } = useParams();

  return (
    <>
      <CVBuilder resumeId={resumeId} />
      <ImageUploader />
    </>
  );
}