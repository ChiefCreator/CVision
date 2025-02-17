import styles from "./RangeSlider.module.scss";
import { useEffect, useState, useRef } from "react";

import { recalculateValueFromOneRangeToAnother, recalculateValueRelativeToRange } from "../../lib/mathUtils";

export default function RangeSlider({ className = "", currentValue, roundUpValue, onChangeCallback, title, min, max, step, intermediateValuesSettings, sliderSettings, isOverflow }) {
  const [value, setValue] = useState(roundUpValue(currentValue));
  const rangeSliderRef = useRef(null);
  const rangeSliderTrackRef = useRef(null);
  const sliderRef = useRef(null);

  const circleAmount = getAmountOfCircles();
  const intermediateCircleAmount = countAmountOfNumberssInRange(intermediateValuesSettings.step, min, max);

  const gap = 5;
  const baseCircleRadius = 3.5;
  const intermediateCircleRadius = 7;

  // Обработчики
  function handleSliderPointerDown(event) {
    window.addEventListener("mousemove", moveSlider);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", moveSlider);
    }, { once: true });
  }

  // методы
  function moveSlider(event) {
    const slider = sliderRef.current;
    const sliderRect = slider.getBoundingClientRect();
    const sliderTrackRect = rangeSliderTrackRef.current.getBoundingClientRect();

    const sliderPosition = (event.y - sliderTrackRect.top) / sliderTrackRect.height * 100;
    const recalcSliderPosition = recalculateValueRelativeToRange(sliderPosition, 0, 100 - sliderRect.width / 2 + 1);

    slider.style.top = `${recalcSliderPosition}%`;

    const value = recalculateValueFromOneRangeToAnother(sliderPosition, 0, 100, min, max, true);
    const roundedValue = roundUpValue(value);

    setValue(roundedValue);
    onChangeCallback(roundedValue);
  }

  // утилиты
  function getAmountOfCircles() {
    return (max - min) / step + 1;
  }
  function countAmountOfNumberssInRange(num, min, max) {
    let sum = num;
    let count = 0;

    while (sum + num <= max) {
      sum += num;
      if (sum >= min) {
        count++;
      }
    }

    return count;
  }
  function createCircle(type) {
    switch (type) {
      case "base":
        return <span className={`${styles.circle} ${styles.circleBase}`} style={{ width: baseCircleRadius }}></span>;
      case "intermediate":
        return <span className={`${styles.circle} ${styles.circleIntermediate}`} style={{ width: intermediateCircleRadius }}></span>;
    }
  }

  return (
    <div className={`${styles.rangeSlider} ${className}`} ref={rangeSliderRef}>
      <header className={styles.rangeSliderHeader}>
        <h6 className={styles.rangeSliderTitle}>{title}</h6>
      </header>
      <div className={styles.rangeSliderTrack} ref={rangeSliderTrackRef}>
        {Array.from({ length: circleAmount }).map((item, index) => {
          const circleType = index % intermediateCircleAmount === 0 ? "intermediate" : "base";
          return createCircle(circleType);
        })}
        <div className={styles.slider} ref={sliderRef} onPointerDown={handleSliderPointerDown}>
          <span className={styles.sliderValue}>
            {sliderSettings?.isValueShow && sliderSettings?.format ? sliderSettings.format(value) : sliderSettings?.isValueShow ? value : null}
          </span>
        </div>
      </div>
    </div>
  );
}
