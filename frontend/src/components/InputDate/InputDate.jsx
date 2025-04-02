import styles from "./InputDate.module.scss";

import { useEffect, useRef, useState } from "react";

import Calendar from "../Calendar/Calendar";

export default function InputDate({ date = { month: "", year: "" }, changeDate, calendarPosRegardingInputDate }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ left: 0, top: 0 });

  const buttonCalendarTriggerRef = useRef();
  const inputRef = useRef();
  const calendarRef = useRef();
  const inputMonthRef = useRef();
  const inputYearRef = useRef();

  function handleMonthChange(event) {
    let value = event.target.value;

    if (/^\d{0,2}$/.test(value)) {
      changeDate({ ...date, month: value });
    }
  }
  function handleYearChange(event) {
    let value = event.target.value;

    if (/^\d{0,4}$/.test(value)) {
      changeDate({ ...date, year: value });
    }
  }
  function handleClickCalendar(event) {
    if (buttonCalendarTriggerRef.current && buttonCalendarTriggerRef.current.contains(event.target)) {
      setShowCalendar(prev => !prev);

      setCalendarPosition(getCalendarPosition());
    }
    else if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  }
  function handleMonthsPanelOpen() {
    inputMonthRef.current.focus();
  }
  function handleYearsPanelOpen() {
    inputYearRef.current.focus();
  }

  function getCalendarPosition() {
    const inputRect = inputRef.current.getBoundingClientRect();

    const getPosRegardingInputDate = (posVal, componentLength) => {
      if (Array.isArray(posVal)) {
        return posVal.reduce((acc, item) => {
          let val = null;
  
          if (typeof item === "number") {
            val = item;
          } else if (typeof item === "string" && item.includes("%")) {
            val = componentLength * parseInt(item) / 100;
          }
  
          acc += val;
  
          return acc;
        }, 0)
      } else if (typeof posVal === "number") {
        return posVal;
      } else if (typeof posVal === "string" && posVal.includes("%")) {
        return componentLength * parseInt(posVal) / 100;
      }
    }

    const posXRegardingInputDate = getPosRegardingInputDate(calendarPosRegardingInputDate.left, inputRect.width);
    const posYRegardingInputDate = getPosRegardingInputDate(calendarPosRegardingInputDate.top, inputRect.height);

    return {
      top: inputRect.top + window.scrollY + posYRegardingInputDate,
      left: inputRect.left + window.scrollX + posXRegardingInputDate,
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickCalendar);

    return () => {
      document.removeEventListener("click", handleClickCalendar);
    };
  }, []);
  useEffect(() => {
    showCalendar && handleMonthsPanelOpen();
  }, [showCalendar]);

  return (
    <div className={styles.inputDate}>
      <div className={styles.input} ref={inputRef}>
        <div className={styles.inputContainer}>
          <input className={styles.inputItem} value={date.month} ref={inputMonthRef} placeholder="MM" maxLength={2} style={{ width: "32px" }} onChange={handleMonthChange}></input>
          <span className={styles.inputSeparator}>/</span>
          <input className={styles.inputItem} value={date.year} ref={inputYearRef} placeholder="YYYY" maxLength={4} style={{ width: "52px" }} onChange={handleYearChange}></input>
        </div>
        <button className={styles.inputCalendarTrigger} type="button" ref={buttonCalendarTriggerRef}>
          <svg className={styles.inputCalendarTriggerIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 48 48">
            <g>
              <rect width="4" height="6" x="11" y="3" rx="2"></rect>
              <rect width="4" height="6" x="33" y="3" rx="2"></rect>
              <path d="M4 18v23a4 4 0 0 0 4 4h32a4 4 0 0 0 4-4V18zm12 20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm0-11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm11 11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm0-11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm11 11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm0-11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zM44 16v-6a4 4 0 0 0-4-4h-1v1c0 2.206-1.794 4-4 4s-4-1.794-4-4V6H17v1c0 2.206-1.794 4-4 4S9 9.206 9 7V6H8a4 4 0 0 0-4 4v6z"></path>
            </g>
          </svg>
        </button>
      </div>

      <Calendar
        date={date}
        changeDate={changeDate}
        showCalendar={showCalendar}
        ref={calendarRef}
        pos={calendarPosition}
        onMonthsPanelOpenCallback={handleMonthsPanelOpen}
        onYearsPanelOpenCallback={handleYearsPanelOpen}
      />
    </div>
  );
}