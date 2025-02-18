import { useState, useRef, useEffect } from "react";
import styles from "./ParameterTracker.module.scss";

export default function ParameterTracker({ parameters, selectedParameterId, onSelectCallback }) {
  const parameterTrackerRef = useRef(null);
  const buttonTrackerRef = useRef(null);
  const inputRef = useRef(null);
  const trackerData = useRef(null);

  const selectedParameter = parameters.find(parameter => parameter.id === selectedParameterId);
  const selectedParameterIndex = parameters.findIndex(parameter => parameter.id === selectedParameterId);
  const parametersCount = parameters.length;

  // обработчики
  function handleLevelCellClick(event) {
    event.preventDefault();

    const levelCell = event.target.closest(`.${styles.level}`);

    if (!levelCell) return;

    const id = levelCell.id;
    const index = levelCell.dataset.index;

    selectParameter(index, id);
  }
  function handleButtonTrackerPointerDown(event) {
    const parameterTrackerRect = parameterTrackerRef.current.getBoundingClientRect();
    const buttonTrackerRect = buttonTrackerRef.current.getBoundingClientRect();

    buttonTrackerRef.current.classList.add(styles.buttonTrackerTransitionNone);

    let mousePos = {
      startX: event.clientX,
      startY: event.clientY,
    };
    let buttonTrackerCenterCoords = {
      x: buttonTrackerRect.left + buttonTrackerRect.width / 2,
      y: buttonTrackerRect.top + buttonTrackerRect.height / 2,
    }
    const buttonTrackerStartPosX = buttonTrackerRect.left - parameterTrackerRect.left;

    function handlePointerMove(event) {
      mousePos = {
        ...mousePos,
        x: event.clientX,
        y: event.clientY,
      };

      const deltaX = mousePos.startX - mousePos.x;
      const posX = getButtonTrackerPosOnDrag(buttonTrackerStartPosX, deltaX, 0, parameterTrackerRect.width - buttonTrackerRect.width);
      buttonTrackerCenterCoords = {
        x: parameterTrackerRect.left + posX + buttonTrackerRect.width / 2,
        y: parameterTrackerRect.top + buttonTrackerRect.height / 2,
      }

      buttonTrackerRef.current.style.transform = `translateX(${posX}px)`;

      const cellLevel = document.elementsFromPoint(buttonTrackerCenterCoords.x, buttonTrackerCenterCoords.y).find(elem => elem.className === styles.level);
      if (cellLevel) {
        const id = cellLevel.id;

        changeTheme(id);
        changeInputValue(id);

        if (onSelectCallback) onSelectCallback(id);
      }
    };
    function handlePointerUp() {
      buttonTrackerRef.current.classList.remove(styles.buttonTrackerTransitionNone);

      const cellLevel = document.elementsFromPoint(buttonTrackerCenterCoords.x, buttonTrackerCenterCoords.y).find(elem => elem.className === styles.level);
      if (cellLevel) {
        const buttonTrackerEndPosX = cellLevel.getBoundingClientRect().left - parameterTrackerRef.current.getBoundingClientRect().left;
        buttonTrackerRef.current.style.transform = `translateX(${buttonTrackerEndPosX}px)`;
      }

      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  }
  function handleResize() {
    calcTrackerData();
    moveButtonTrackerByIndex(selectedParameterIndex);
  }

  // методы
  function selectParameter(index, id) {
    moveButtonTrackerByIndex(+index);
    changeTheme(id);
    changeInputValue(id);

    if (onSelectCallback) onSelectCallback(id);
  }
  function moveButtonTrackerByIndex(index) {
    const posX = index * trackerData.current.width / parametersCount ?? 0;
    buttonTrackerRef.current.style.transform = `translateX(${posX}px)`;
  }
  function changeTheme(id) {
    const parameterData = parameters.find(parameter => parameter.id === id);
    parameterTrackerRef.current.dataset.theme = parameterData.colorTheme;
  }
  function changeInputValue(id) {
    inputRef.current.value = id;
  }
  function calcTrackerData() {
    trackerData.current = {
      width: parameterTrackerRef.current.offsetWidth,
      buttonTrackerWidth: buttonTrackerRef.current.offsetWidth,
    };
  }
  function getButtonTrackerPosOnDrag(buttonTrackerStartPosX, deltaX, minLimit, maxLimit) {
    const posX = buttonTrackerStartPosX - deltaX;

    if (posX >= minLimit && posX <= maxLimit) {
      return posX;
    } else if (posX < minLimit) {
      return minLimit;
    } else if (posX > maxLimit) {
      return maxLimit;
    }
  }

  useEffect(() => {
    const parameterTracker = parameterTrackerRef.current;
    const buttonTracker = buttonTrackerRef.current;
    
    buttonTracker.style.width = `${100 / parametersCount}%`;

    calcTrackerData();
    moveButtonTrackerByIndex(selectedParameterIndex);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.parameterTracker} id={selectedParameter.id} data-theme={selectedParameter.colorTheme} ref={parameterTrackerRef}>
      <div className={styles.parameterTrackerCells} onClick={handleLevelCellClick}>
        {parameters.map((parameter, index) => {
          return (
            <label className={styles.level} id={parameter.id} key={parameter.id} data-index={index}></label>
          );
        })}
      </div>
      <div className={styles.parameterTrackerDashes}>
        {parameters.map((parameter, index) => {
          if (index === 0) return;

          return (
            <span className={styles.dash} key={parameter.id} style={{ left: `${index * (100 / parametersCount)}%` }}></span>
          );
        })}
      </div>
      <button className={styles.buttonTracker} ref={buttonTrackerRef} onPointerDown={handleButtonTrackerPointerDown} type="button">
        <div className={styles.buttonTrackerRealSize}></div>
        <div className={styles.buttonTrackerBlock}></div>
      </button>
      <input className={styles.parameterTrackerInput} value={selectedParameter?.id} ref={inputRef} readOnly={true}></input>
    </div>
  );
}