import React, { useRef, useEffect } from "react"

import styles from "./SliderSelect.module.scss";
import { BaseComponent } from "@/types/root";
import clsx from "clsx";

interface SliderSelectItem {
  label: string;
  value: string;
}

export interface SliderSelectProps extends BaseComponent {
  selectedValue: SliderSelectItem["value"];
  data: SliderSelectItem[];
  isDisabled?: boolean;

  onSelect?: (value: string) => void;
}

export default React.memo(function SliderSelect({ className, selectedValue, data, isDisabled, onSelect }: SliderSelectProps) {
  const selectedItemIndex = data.findIndex(item => item.value === selectedValue);
  const itemCount = data.length;

  const sliderRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sliderRect = useRef<{ width: number; trackerWidth: number }>(null);

  const selectValue = (value: string, index: number) => {
    moveTrackerByIndex(index);

    onSelect?.(value);
  }
  const moveTrackerByIndex = (index: number) => {
    if (!trackerRef.current || !sliderRect.current) return;

    const posX = index * sliderRect.current.width / itemCount;

    trackerRef.current.style.transform = `translateX(${posX || 0}px)`;
  }
  const calcSliderRect = (slider: HTMLDivElement, tracker: HTMLButtonElement) => {
    sliderRect.current = {
      width: slider.offsetWidth,
      trackerWidth: tracker.offsetWidth,
    };
  }
  const getTrackerPosOnDrag = (trackerStartPosX: number, deltaX: number, minLimit: number, maxLimit: number) => {
    const posX = trackerStartPosX - deltaX;

    if (posX >= minLimit && posX <= maxLimit) {
      return posX;
    } else if (posX < minLimit) {
      return minLimit;
    } else if (posX > maxLimit) {
      return maxLimit;
    }

    return 0;
  }

  const handleCellClick = (value: string, i: number) => {
    if (isDisabled) return;

    selectValue(value, i)
  }
  const handleTrackerPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    const slider = sliderRef.current;
    const tracker = trackerRef.current;

    if (!slider || !tracker) return;
      
    const sliderRect = slider.getBoundingClientRect();
    const trackerRect = tracker.getBoundingClientRect();
  
    tracker.classList.add(styles.transitionNone);
  
    let mousePos = {
      startX: e.clientX,
      startY: e.clientY,
      x: 0,
      y: 0,
    };
    let trackerCenterCoords = {
      x: trackerRect.left + trackerRect.width / 2,
      y: trackerRect.top + trackerRect.height / 2,
    }
    const trackerStartPosX = trackerRect.left - sliderRect.left;
  
    const handlePointerMove = (e: PointerEvent) => {
      mousePos = {
        ...mousePos,
        x: e.clientX,
        y: e.clientY,
      };
  
      const deltaX = mousePos.startX - mousePos.x;
      const posX = getTrackerPosOnDrag(trackerStartPosX, deltaX, 0, sliderRect.width - trackerRect.width);

      trackerCenterCoords = {
        x: sliderRect.left + posX + trackerRect.width / 2,
        y: sliderRect.top + trackerRect.height / 2,
      }
  
      tracker.style.transform = `translateX(${posX}px)`;
  
      const cell = document.elementsFromPoint(trackerCenterCoords.x, trackerCenterCoords.y).find(elem => elem.className === styles.cell);
      if (cell) {
        const value = cell.id;
  
        onSelect?.(value);
      }
    };
    const handlePointerUp = () => {
      tracker.classList.remove(styles.transitionNone);
  
      const cell = document.elementsFromPoint(trackerCenterCoords.x, trackerCenterCoords.y).find(elem => elem.className === styles.cell);
      if (cell) {
        const trackerEndPosX = cell.getBoundingClientRect().left - sliderRect.left;

        tracker.style.transform = `translateX(${trackerEndPosX}px)`;
      }
  
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  }
  const handleResize = () => {
    const slider = sliderRef.current;
    const tracker = trackerRef.current;
      
    if (slider && tracker) {
      tracker.style.width = `${100 / itemCount}%`;
    
      calcSliderRect(slider, tracker);
      moveTrackerByIndex(selectedItemIndex);  
    }
  }

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);  

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={clsx(styles.slider, className, isDisabled && styles.sliderDisabled)} data-theme={isDisabled ? "disabled" : selectedValue} ref={sliderRef}>
      <div className={styles.sliderCells}>
        {data.map(({ value }, i) => {
          return (
            <button
              className={styles.cell}
              id={value}
              key={value}
              onClick={() => handleCellClick(value, i)}
            ></button>
          )
        })}
      </div>

      <div className={styles.sliderDashes}>
        {data.map((_, i) => {
          if (i === 0) return;

          return (
            <span
              className={styles.dash}
              key={i}
              style={{ left: `${i * (100 / itemCount)}%` }}
            ></span>
          );
        })}
      </div>

      <button
        className={styles.tracker}
        ref={trackerRef}
        onPointerDown={handleTrackerPointerDown}
        type="button"
      >
        <div className={styles.trackerRealSize}></div>
        <div className={styles.trackerBlock}></div>
      </button>

      <input
        className={styles.input}
        value={selectedValue}
        ref={inputRef}
        readOnly={true}
      ></input>
    </div>
  );
})