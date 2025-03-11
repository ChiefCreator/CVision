import { useState, useEffect } from "react";
import styles from "./ValueAdjuster.module.scss";

export default function ValueAdjuster({ propertyTitle, propertyIllustration, value, defaultValue, minValue, maxValue, step, unitOfMeasurement, setValue }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // методы
  function increase() {
    setValue(Math.min(value + step, maxValue));
  };
  function decrease() {
    setValue(Math.max(value - step, minValue));
  };

  function handleMouseenter() {
    setIsTooltipOpen(true);
  }
  function handleMouseleave() {
    setIsTooltipOpen(false);
  }

  useEffect(() => {
    if (!value && value !== 0) {
      setValue(defaultValue);
    }
  }, []);

  return (
    <div className={styles.valueAdjuster}>
      <div className={styles.valueAdjusterContent} onMouseEnter={handleMouseenter} onMouseLeave={handleMouseleave}>
        <button className={`${styles.valueAdjusterButton} ${styles.valueAdjusterButtonDecrease}`} type="button" disabled={value === minValue} onClick={decrease}>
          <svg className={styles.valueAdjusterButtonIcon} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M6 11h12v2H6z"></path></svg>
        </button>
        <div className={styles.valueAdjusterPropertyTitleWrapper}>
          {propertyIllustration}
        </div>
        <button className={`${styles.valueAdjusterButton} ${styles.valueAdjusterButtonIncrease}`} type="button" disabled={value === maxValue} onClick={increase}>
          <svg className={styles.valueAdjusterButtonIcon} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon points="13 11 18 11 18 13 13 13 13 18 11 18 11 13 6 13 6 11 11 11 11 6 13 6"></polygon></svg>
        </button>
      </div>
      
      <div className={`${styles.tooltip} ${isTooltipOpen ? styles.tooltipOpen : ""}`}>
        <span className={styles.tooltipTitle}>{propertyTitle}</span>
        <span className={styles.tooltipValue}>{value} {unitOfMeasurement}</span>
      </div>
    </div>
  );
}