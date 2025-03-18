import { useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";

import styles from "./ImageCropper.module.scss";

export default function ImageCropper({ image, cropSize, resizeImage, resizedSrc, setResizedSrc, onCropComplete, rotation, setRotation, zoom, setZoom, setCroppedAreaPixels }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const imageCropperRef = useRef();

  function handleCropComplete(_, croppedAreaPixels) {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  useEffect(() => {
    resizeImage(image)
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setResizedSrc(imageUrl);
      })
      .catch((error) => console.error("Ошибка:", error));
  }, []);

  return (
    <div className={styles.imageCropper} ref={imageCropperRef}>

      {resizedSrc && <Cropper
        image={resizedSrc}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={1}
        cropSize={cropSize}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={handleCropComplete}
        classes={{
          containerClassName: styles.cropper,
          cropAreaClassName: styles.cropperCropArea,
        }}
        disableAutomaticStylesInjection={true}
      />}

    </div>
  );
}
