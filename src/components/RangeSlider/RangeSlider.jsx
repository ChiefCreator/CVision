import styles from "./RangeSlider.module.scss";
import { useEffect, useState, useRef } from "react";

import { recalculateValueRelativeToRange, recalculateValueFromOneRangeToAnother } from "../../lib/mathUtils";

export default function RangeSlider({ className="", currentValue, min, max, step, ticks, valueSettings, orientation, setValue, onChangeCallback }) {
  const isVertical = orientation === "vertical";

  const roundedValue = valueSettings.roundUpValue(currentValue);

  const rangeSliderRef = useRef();
  const rangeSliderTrackRef = useRef();
  const triggerRef = useRef();

  const triggerRectRef = useRef();
  const rangeSliderTrackRectRef = useRef();

  const largeTicks = generateTicks(ticks.largeStep, "tickLarge");
  const smallTicks = generateTicks(ticks.smallStep, "tickSmall").filter(item1 => !largeTicks.some(item2 => item1.value === item2.value));
  const totalTicks = [...largeTicks, ...smallTicks].sort((a, b) => a.value - b.value);

  // методы
  function generateTicks(stepSize, tickType) {
    const ticksArray = [];

    for (let i = min; i <= max; i += stepSize) {
      i = +i.toFixed(2);
      ticksArray.push({ value: i, type: tickType });
    }

    return ticksArray;
  }
  function getTriggerPosition(event) {
    const triggerRect = triggerRectRef.current;
    const rangeSliderTrackRect = rangeSliderTrackRectRef.current;

    return (event.y - rangeSliderTrackRect.top) / rangeSliderTrackRect.height * 100;
  }
  function moveTrigger(event) {
    const triggerPosition = getTriggerPosition(event);

    const value = recalculateValueFromOneRangeToAnother(triggerPosition, 0, 100, min, max, true);

    setValue(value);
    onChangeCallback && onChangeCallback(value);
  }

  // Обработчики
  function handleTriggerPointerDown(event) {
    window.addEventListener("mousemove", moveTrigger);

    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", moveTrigger);
    }, { once: true });
  }

  useEffect(() => {
    setTimeout(() => {
      triggerRectRef.current = triggerRef.current.getBoundingClientRect();
      rangeSliderTrackRectRef.current = rangeSliderTrackRef.current.getBoundingClientRect();
    }, 1000);
  }, [])
  useEffect(() => {
    if (!triggerRef.current || !triggerRectRef.current) return;

    triggerRef.current.style.top = `${recalculateValueFromOneRangeToAnother(currentValue, min, max, 0, 100 - triggerRectRef.current.width / 2, true)}%`;
  }, [currentValue])

  return (
    <div className={`${styles.rangeSlider} ${className}`} ref={rangeSliderRef}>
      <div className={styles.rangeSliderTrack} ref={rangeSliderTrackRef}>
        {totalTicks.map(tick => {
          return (
            <span
              className={`${styles.tick} ${styles[tick.type]}`}
              key={tick.value}
            ></span>
          )
        })}
        <div className={styles.trigger} ref={triggerRef} onPointerDown={handleTriggerPointerDown}>
          <span className={styles.triggerValue}>
            {valueSettings.format && valueSettings.format(roundedValue)}
          </span>
        </div>
      </div>
    </div>
  );
}