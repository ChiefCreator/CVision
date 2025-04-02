import CVBuilder from "./../../components/CVBuilder/CVBuilder";
import ImageManager from "../../components/ImageManager/ImageManager";

import { useParams } from "react-router-dom";
import { ImageManagerProvider } from "../../context/ImageManagerContext";

export default function CreateResume() {
  const { resumeId } = useParams();

  return (
    <>
    <ImageManagerProvider>
      <CVBuilder resumeId={resumeId} />
      <ImageManager resumeId={resumeId} />
    </ImageManagerProvider>
    </>
  );
}