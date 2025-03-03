import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./Calendar.module.scss";

const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
const years = Array.from({ length: 2030 - 1980 + 1 }, (_, i) => 1980 + i);

export default function Calendar({ date, changeDate, showCalendar, ref, pos, onMonthsPanelOpenCallback, onYearsPanelOpenCallback }) {
  const [activePanel, setActivePanel] = useState("months");
  const defaultDate = { month: new Date().getMonth(), year: new Date().getFullYear() };

  function handleYearChange(direction) {
    if (date.year) {
      changeDate({ ...date, year: +date.year + direction });
    } else {
      changeDate({ ...date, year: +defaultDate.year + direction });
    }

    onYearsPanelOpenCallback();
  };
  function handleMonthCellClick(event) {
    const monthCell = event.target.closest(`.${styles.monthCell}`);

    if (!monthCell) return null;
  
    const month = +monthCell.dataset.month + 1;
    const strMonth = month > 0 && month < 10 ? `0${month}` : month;
    changeDate({ ...date, month: strMonth, });
    onMonthsPanelOpenCallback();
  }
  function handleYearCellClick(event) {
    const yearCell = event.target.closest(`.${styles.yearCell}`);

    if (!yearCell) return null;
  
    const year = +yearCell.dataset.year;
    changeDate({ ...date, year, });
    setTimeout(() => openPanel("months"))
  }

  function openPanel(panel) {
    setActivePanel(panel);

    switch(panel) {
      case "months":
        onMonthsPanelOpenCallback();
        return;
      case "years":
        onYearsPanelOpenCallback();
    }
  }

  return createPortal(
    <div className={`${styles.calendar} ${showCalendar ? styles.calendarOpen : ""}`} style={pos} ref={ref}>
      {activePanel === "months" ? (
        <div className={styles.monthsPanel}>
          <header className={styles.monthsPanelHeader}>
            <button className={`${styles.button} ${styles.buttonPrev}`} type="button" onClick={() => handleYearChange(-1)}>
              <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
                <g><path d="M44 108a3.988 3.988 0 0 1-2.828-1.172 3.997 3.997 0 0 1 0-5.656L78.344 64 41.172 26.828c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l40 40a3.997 3.997 0 0 1 0 5.656l-40 40A3.988 3.988 0 0 1 44 108z"></path></g>
              </svg>
            </button>
            <span className={styles.monthsPanelYear} onClick={() => setTimeout(() => openPanel("years"))}>
              {date.year ? date.year : defaultDate.year}
            </span>
            <button className={`${styles.button} ${styles.buttonNext}`} type="button" onClick={() => handleYearChange(1)}>
              <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
                <g><path d="M44 108a3.988 3.988 0 0 1-2.828-1.172 3.997 3.997 0 0 1 0-5.656L78.344 64 41.172 26.828c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l40 40a3.997 3.997 0 0 1 0 5.656l-40 40A3.988 3.988 0 0 1 44 108z"></path></g>
              </svg>
            </button>
          </header>
          <div className={styles.monthsPanelBody}>
            <div className={styles.monthsPanelCells}>
              {months.map((month, index) => (
                <button
                  className={`${styles.monthCell} ${+date.month - 1 === index ? styles.monthCellSelected : ""}`}
                  key={month}
                  data-month={index}
                  type="button"
                  onClick={handleMonthCellClick}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {activePanel === "years" ? (
        <div className={styles.yearsPanel}>
          <div className={styles.yearsPanelBody}>
            <div className={styles.yearsPanelCells}>
              {years.map((year) => (
                <button
                  key={year}
                  className={`${styles.yearCell} ${date.year === year ? styles.yearCellSelected : ""}`}
                  type="button"
                  onClick={handleYearCellClick}
                  data-year={year}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>,
    document.body
  )
}
