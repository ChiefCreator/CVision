import { useState, useRef, useEffect } from "react";
import { useResumeContext } from "../../context/ResumeContext";
import { useImageManagerContext } from "../../context/ImageManagerContext";
import styles from "./ImageManager.module.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

import Compressor from "compressorjs";

import ImageUploader from "./ImageUploader/ImageUploader";
import ImageEditor from "./ImageEditor/ImageEditor"
import ButtonClose from "./../ButtonClose/ButtonClose";

export default function ImageManager({ resumeId }) {
  const { dispatchOfResumesDataState } = useResumeContext();
  const { imageManagerState, dispatchOfImageManagerState } = useImageManagerContext();
  const { isOpen } = imageManagerState;

  const [state, setState] = useState("upload");
  const [image, setImage] = useState(null);
  const [resizedSrc, setResizedSrc] = useState(null);
  const cropSize = { width: 240, height: 240 };
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageScale, setImageScale] = useState(1);
  
  const imageManagerRef = useRef();
  const timeline = useRef();
  const timeoutAfterHide = useRef();

  const timeOfToggle = 0.75;

  // методы
  function uploadImage(file) {
    new Compressor(file, {
      quality: 0.5,
      success(result) {
        const img = new Image();
        img.src = URL.createObjectURL(result);
        img.onload = () => {
          setImage(img);
          setState("edit");
        };
      },
    });
  }
  function uploadNewImage(file) {
    new Compressor(file, {
      quality: 0.5,
      success(result) {
        const img = new Image();
        img.src = URL.createObjectURL(result);
        img.onload = () => {
          setImage(img);
          setState("edit");

          resizeImage(img)
            .then((blob) => {
              const imageUrl = URL.createObjectURL(blob);
              setResizedSrc(imageUrl);
            })
            .catch((error) => console.error("Ошибка:", error));
        };
      },
    });
  }
  function resizeImage(image) {
    return new Promise((resolve) => {

      const canvas = document.createElement("canvas");

      const imgAspectRatio = image.width / image.height;
      const canvasSize = {
        width: (imgAspectRatio > 1 ? cropSize.width * imgAspectRatio : cropSize.width),
        height: (imgAspectRatio < 1 ? cropSize.height * (2 - imgAspectRatio) : cropSize.height),
      };
      
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvasSize.width, canvasSize.height);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Ошибка создания Blob"));
        }
      }, "image/png");
    });
  };
  async function getCroppedImgInBase64(imageSrc, pixelCrop) {
    const createImage = (url) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
      });
    }

    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    return canvas.toDataURL("image/png");
  }
  async function saveCroppedImg() {
    dispatchOfImageManagerState({
      type: "SET_LOADING_STAGE_OF_CROPPED_IMAGE",
      loadingStage: "loading",
    })

    const imgInBase64 = await getCroppedImgInBase64(resizedSrc, croppedAreaPixels);

    dispatchOfImageManagerState({
      type: "SET_IS_OPEN",
      isOpen: false,
    })

    setTimeout(() => {
      dispatchOfResumesDataState({
        type: "UPDATE_RESUME_SECTION_FIELD",
        resumeId,
        sectionId: "personalInformation",
        key: "photo",
        value: imgInBase64,
      });
      dispatchOfImageManagerState({
        type: "SET_LOADING_STAGE_OF_CROPPED_IMAGE",
        loadingStage: "loaded",
      })
    }, 1000)
  }

  useEffect(() => {
    switch (isOpen) {
      case true:
        show();
        return;
      case false:
        hide();
        timeoutAfterHide.current = setTimeout(() => {
          setState("upload");
          setImage(null);
          setImageScale(1);
        }, timeOfToggle * 1000);
        return;
    }
  }, [isOpen]);

  // инициализация анимаций
  const { contextSafe } = useGSAP(() => {
    timeline.current = gsap.timeline({ paused: true }).to(imageManagerRef.current, {
      scale: 1,
      ease: "power3.inOut",
      duration: timeOfToggle,
    });
  });
  const show = contextSafe(() => timeline.current.restart());
  const hide = contextSafe(() => timeline.current.reverse());

  return (
    <div className={styles.imageManager} ref={imageManagerRef}>
      <div className={styles.imageManagerContainer}>
        <div className={styles.imageManagerContent}>

          {state === "upload" && <ImageUploader uploadImage={uploadImage} />}
          {state === "edit" && <ImageEditor
            image={image}
            cropSize={cropSize}
            resizeImage={resizeImage}
            resizedSrc={resizedSrc}
            setResizedSrc={setResizedSrc}
            imageScale={imageScale}
            setImageScale={setImageScale}
            saveImage={saveCroppedImg}
            setCroppedAreaPixels={setCroppedAreaPixels}
            uploadNewImage={uploadNewImage}
          />}

        </div>

        <ButtonClose className={styles.imageManagerButtonClose} onClickCallback={() => dispatchOfImageManagerState({ type: "SET_IS_OPEN", isOpen: false })} />
      </div>
    </div>
  );
}