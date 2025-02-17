import Input from "../Input/Input";

import styles from "./InputDate.module.scss";

import { useEffect, useState } from "react";

const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

export default function InputDate({ value, placeholder }) {
  const [date, setDate] = useState({ month: "Фев", year: 2025 });
  const inputValue = `${date.month}, ${date.year}`;

  // обработчики
  function handleCellsClick(event) {
    if (!event.target.closest("button")) return;

    const $cell = event.target.closest("button");

    setDate({ ...date, month: $cell.dataset.month });
  }

  // методы
  function pageCalendar(direction) {
    switch(direction) {
      case "left":
        setDate({ year: date.year--, ...date });
        return;
      case "right":
        setDate({ year: date.year++, ...date });
        return;
    }
  }

  return (
    <div className={styles.input}>
      <Input value={inputValue} placeholder={placeholder} />
      <div className={styles.calendar}>
        <header className={styles.calendarHeader}>
          <button className={`${styles.calendarButtonPage} ${styles.calendarButtonPageLeft}`} type="button" onClick={() => pageCalendar("left")}>
            <svg className={styles.calendarButtonPageIcon} width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path></svg>
          </button>
          <span className={styles.calendarYear}>{date.year}</span>
          <button className={`${styles.calendarButtonPage} ${styles.calendarButtonPageRight}`} type="button" onClick={() => pageCalendar("right")}>
            <svg className={styles.calendarButtonPageIcon} width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path></svg>
          </button>
        </header>
        <div className={styles.calendarBody}>
          <div className={styles.calendarCells} onClick={handleCellsClick}>
            {months.map(month => 
              <button 
                key={month} 
                className={`${styles.calendarCell} ${date.month === month && styles.calendarCellSelected }`} 
                type="button" 
                data-month={month}
              >
                {month}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
