import { useState } from "react";

import styles from "./ImageEditor.module.scss";

import ImageCropper from "../ImageCropper/ImageCropper";
import RangeSlider from "./../../RangeSlider/RangeSlider";
import ButtonUploadNew from "./ButtonUploadNew";
import Button from "../../Button/Button";

export default function ImageEditor({ image, cropSize, resizeImage, resizedSrc, setResizedSrc, imageScale, setImageScale, setCroppedAreaPixels, saveImage, uploadNewImage }) {

  // Обработчики
  function handleRangeSliderImageScaleChange(value) {
    setImageScale(value);
  }

  return (
    <div className={styles.imageEditor}>
      <div className={styles.imageEditorBody}>
        <div className={styles.imageEditorIllustrationPanel}>
            <span className={styles.imageEditorText}>Перетащите, чтобы изменить положение фотографии</span>

            <ImageCropper
              image={image}
              cropSize={cropSize}
              resizeImage={resizeImage}
              resizedSrc={resizedSrc}
              setResizedSrc={setResizedSrc}
              onCropComplete={null}
              rotation={0}
              setRotation={null}
              zoom={imageScale}
              setZoom={setImageScale}
              setCroppedAreaPixels={setCroppedAreaPixels}
            />

            <div className={styles.scaleControl}>
              <span className={styles.scaleControlTitle}>Масштаб</span>
              <div className={styles.scaleControlRangeSliderWrapper}>
                <RangeSlider
                  className={styles.imageEditorRangeSliderImageScale}
                  currentValue={imageScale}
                  min={1}
                  max={3}
                  step={0.1}
                  ticks={{ smallStep: .1, largeStep: .5 }}
                  valueSettings={{ roundUpValue: (value) => +value.toFixed(1), format: (value) => `${value}x` }}
    
                  setValue={setImageScale}
                  onChangeCallback={handleRangeSliderImageScaleChange}
                />
              </div>
            </div>
        </div>
      </div>

      <footer className={styles.imageEditorFooter}>
        <ButtonUploadNew uploadNewImage={uploadNewImage} />
        <Button className={styles.imageEditorFooterButtonSave} onClickCallback={saveImage}>Сохранить изменения</Button>
      </footer>
    </div>
  );
}