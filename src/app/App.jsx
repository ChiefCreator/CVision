import CVBuilder from "./CVBuilder/CVBuilder";
import ImageUploader from "./ImageUploader/ImageUploader";

import { ImageUploaderProvider } from "../context/ImageUploaderContext";
import { ResumeProvider } from "../context/ResumeContext";

import "./../assets/styles/_vars.scss";
import "./../assets/styles/_mixin.scss";
import "./../assets/styles/_utils.scss";
import "./../assets/styles/_reset.scss";
import "./../assets/styles/_base.scss";


export default function App() {

  return (
    <>
      <ResumeProvider>
        <ImageUploaderProvider>
          <CVBuilder resumeId="resume#1" />
          <ImageUploader />
        </ImageUploaderProvider>
      </ResumeProvider>
    </>
  )
}