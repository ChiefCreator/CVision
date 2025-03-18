import { useState, useRef, useEffect } from "react";
import { useImageManagerContext } from "../../context/ImageManagerContext";
import styles from "./ImageUploader.module.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

import Compressor from "compressorjs";

import Button from "../Button/Button";
import ButtonClose from "../ButtonClose/ButtonClose";
import RangeSlider from "../RangeSlider/RangeSlider";

export default function ImageUploader() {
  const { imageManagerState, dispatchOfImageManager } = useImageManagerContext();
  const { isOpen } = imageManagerState;
  const [state, setState] = useState("upload");
  const [image, setImage] = useState(null);
  const [imageScale, setImageScale] = useState(1);
  const [dragActive, setDragActive] = useState(false);

  const $inputFile = useRef(null);
  const $imageUploader = useRef(null);
  const $wholeImage = useRef(null);
  const $finalImage = useRef(null);
  const $grid = useRef(null);

  const imageSizeRef = useRef();
  const canvasOfWholeImageRealSize = useRef();
  const canvasOfFinalImageRealSize = useRef();
  const imgNecessarySize = useRef();
  
  const timeline = useRef(null);
  const timeoutAfterHide = useRef(null);

  const timeOfToggle = 0.75;

  // Обработчики
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      uploadImage(event.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();

    setDragActive(true);
  };
  const handleDragLeave = () => {
    setDragActive(false);
  };
  const handleBlockDragToClick = () => {
    $inputFile.current.click();
  };
  const handleRangeSliderImageScaleChange = (value) => {
    setImageScale(value);
    previewImage(value);
  }
  function handleWholeImagePointerDown(event) {
    const startX = event.clientX;
    const startY = event.clientY;
    let deltaX = 0;
    let deltaY = 0;
    let isDragging = true;

    window.addEventListener("pointermove", handleWholeImagePointerMove);
    window.addEventListener("pointerup", () => {
      isDragging = false;
      window.removeEventListener("pointermove", handleWholeImagePointerMove);
    }, { once: true });

    function handleWholeImagePointerMove(event) {
      if (!isDragging) return;

      deltaX = event.clientX - startX;
      deltaY = event.clientY - startY;
  
      translateImage($wholeImage.current, canvasOfWholeImageRealSize.current, true, deltaX, deltaY);
      translateImage($finalImage.current, canvasOfFinalImageRealSize.current, false, deltaX, deltaY);
    }
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
  useEffect(() => {
    if (state !== "edit") return;

    initDataOnEditBlockRender();
    previewImage(imageScale);
  }, [state]);

  // инициализация анимаций
  const { contextSafe } = useGSAP(() => {
    timeline.current = gsap.timeline({ paused: true }).to($imageUploader.current, {
      scale: 1,
      ease: "power3.inOut",
      duration: timeOfToggle,
    });
  });

  // методы
  const show = contextSafe(() => timeline.current.restart());
  const hide = contextSafe(() => timeline.current.reverse());
  function initDataOnEditBlockRender() {
    imageSizeRef.current = getImageSize(image);
    canvasOfWholeImageRealSize.current = getCanvasRealSize($wholeImage.current);
    canvasOfFinalImageRealSize.current = getCanvasRealSize($finalImage.current);
    imgNecessarySize.current = {
      width: $grid.current.offsetWidth,
      height: $grid.current.offsetHeight,
    }

    initCanvas($wholeImage.current);
    initCanvas($finalImage.current);
  }
  function initCanvas(canvas) {
    canvas.width = imageSizeRef.current.width;
    canvas.height = imageSizeRef.current.height;
  }
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
  function previewImage(imageScale) {
    previewImageOnCanvas($wholeImage.current, canvasOfWholeImageRealSize.current, imageScale, true);
    previewImageOnCanvas($finalImage.current, canvasOfFinalImageRealSize.current, imageScale);
  }
  function previewImageOnCanvas(canvas, canvasRealSize, imageScale, isWholeImageCanvas = false) {
    const imgSizeInCanvas = getImageSizeInCanvas(imgNecessarySize.current, imageSizeRef.current, imageScale, canvasRealSize);
    const imgCoordsOnCanvas = {
      x_1: (imageSizeRef.current.width - imgSizeInCanvas.width) / 2,
      y_1: (imageSizeRef.current.height - imgSizeInCanvas.height) / 2,
      x_2: imgSizeInCanvas.width,
      y_2: imgSizeInCanvas.height,
    }

    if (isWholeImageCanvas) {
      console.log("координаты whole image", imgCoordsOnCanvas)
    }

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
    ctx.drawImage(image, imgCoordsOnCanvas.x_1, imgCoordsOnCanvas.y_1, imgCoordsOnCanvas.x_2, imgCoordsOnCanvas.y_2);
    if (isWholeImageCanvas) {
      ctx.fillStyle = "rgba(15, 20, 30, 0.8)";
      ctx.fillRect(imgCoordsOnCanvas.x_1, imgCoordsOnCanvas.y_1, imgCoordsOnCanvas.x_2, imgCoordsOnCanvas.y_2);
    }
  }
  function translateImage(canvas, canvasRealSize, isWholeImageCanvas, deltaX, deltaY) {
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(deltaX, deltaY);
    // console.log("transform whole image: ", deltaX, deltaY);
    previewImageOnCanvas(canvas, canvasRealSize, imageScale, isWholeImageCanvas);
    ctx.restore();
  }

  // утилиты
  function getImageSize(image) {
    return {
      width: image.width,
      height: image.height,
      aspectRatio: image.width / image.height,
    };
  }
  function getCanvasRealSize(canvas) {
    return {
      width: canvas.offsetWidth,
      height: canvas.offsetHeight,
    }
  }
  function getImageSizeInCanvas(imgNecessarySize, imgSize, imageScale, canvasOfWholeImageRealSize) {
    return {
      width: (imgNecessarySize.width / canvasOfWholeImageRealSize.width) * imgSize.width * imageScale * (imgSize.aspectRatio > 1 ? imgSize.aspectRatio : 1),
      height: (imgNecessarySize.height / canvasOfWholeImageRealSize.height) * imgSize.height * imageScale * (imgSize.aspectRatio < 1 ? 2 - imgSize.aspectRatio : 1),
    };
  }

  return (
    <div className={styles.imageUploader} ref={$imageUploader}>
      <div className={styles.imageUploaderContainer}>
        {state === "upload" && (
          <div className={styles.blockDragTo} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleBlockDragToClick}>
            <div className={styles.blockDragToContainer}>
              <div className={styles.blockDragToContent}>
                <div className={styles.blockDragToMainContent}>
                  <svg className={styles.blockDragToIcon} xmlns="http://www.w3.org/2000/svg" fill="none">
                    <g strokeWidth="2">
                      <rect height="38" rx="3" width="46" x="1" y="1" />
                      <circle cx="35" cy="13" r="4" />
                      <path d="m1 30 12-12.9a4 4 0 0 1 6 0l9.2 9.9a4 4 0 0 0 5.7 0l2.3-2.2a4 4 0 0 1 5.6 0l5.2 5.2" />
                    </g>
                  </svg>
                  <span className={styles.blockDragToText}>Перетащите изображение сюда или кликните для загрузки</span>
                  <Button className={styles.blockDragToButton}>Загрузить фото</Button>
                </div>
                <span className={styles.blockDragToTextFormat}>Поддерживаются только изображения</span>
              </div>
              <input className={styles.blockDragToInput} ref={$inputFile} id="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
              <svg className={styles.blockDragToBorder} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <rect x=".5" y=".5" width="99" height="99" strokeWidth=".25" rx={.75} ry={.75} />
              </svg>
            </div>
          </div>
        )}
        {state === "edit" && (
          <div className={styles.editBlock}>
            <div className={styles.editBlockBody}>
              <div className={styles.editBlockIllustrationPanel}>
                <canvas className={styles.editBlockWholeImage} ref={$wholeImage} onPointerDown={handleWholeImagePointerDown}></canvas>
                <canvas className={styles.editBlockFinalImage} ref={$finalImage}></canvas>
                <div className={styles.editBlockGrid} ref={$grid}></div>
                <RangeSlider className={styles.editBlockRangeSliderImageScale} title="Масштаб" currentValue={imageScale} roundUpValue={(value) => +value.toFixed(1)} setValue={setImageScale} onChangeCallback={handleRangeSliderImageScaleChange} min={1} max={3} step={0.1} intermediateValuesSettings={{ step: .5 }} sliderSettings={{ isValueShow: true, format: (value) => `${value}x` }} />
              </div>
            </div>
            <footer className={styles.editBlockFooter}></footer>
          </div>
        )}
        <ButtonClose className={styles.imageUploaderButtonClose} onClickCallback={() => dispatchOfImageManager({ type: "SET_IS_OPEN", isOpen: false })} />
      </div>
    </div>
  );
}
