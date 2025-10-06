import React, { useEffect, useState } from "react";

import { formatDate } from "@/utils/date/formatDate";
import { parseFlexibleDate } from "@/utils/date/parseFlexibleDate";
import { getYear, isValid, setMonth, setYear } from "date-fns";

import { ChevronLeft, ChevronRight } from "lucide-react";

import clsx from "clsx";
import styles from "./MonthPicker.module.scss";

const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
const years = Array.from({ length: 2030 - 1980 + 1 }, (_, i) => 1980 + i);

export interface MonthPickerProps {
  date?: string;

  onChange: (date: string) => void;
}

type ActivePanel = "months" | "years";

export default function MonthPicker({ date, onChange }: MonthPickerProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>("months");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const changePanel = (panel: ActivePanel) => {
    setTimeout(() => setActivePanel(panel));
  }
  const selectMonth = (monthIndex: number) => {
    const newDate = setMonth(selectedDate || new Date(), monthIndex);
    const formattedDate = formatDate(newDate);

    setSelectedDate(newDate);
    onChange(formattedDate);
  };
  const selectYear = (year: number) => {
    const newDate = setYear(selectedDate || new Date(), year);
    const formattedDate = formatDate(newDate);

    setSelectedDate(newDate);
    onChange(formattedDate);
  };
  const selectPrevYear = () => {
    if (!selectedDate) return;

    selectYear(getYear(selectedDate) - 1);
  };
  const selectNextYear = () => {
    if (!selectedDate) return;

    selectYear(getYear(selectedDate) + 1);
  };
  const getSelectedYear = () => {
    return selectedDate ? getYear(selectedDate) : new Date().getFullYear();
  };

  const handleClickYearCell = (e: React.MouseEvent<HTMLButtonElement>, year: number) => {
    selectYear(year);
    changePanel("months");
  };

  useEffect(() => {
    if (!date) return;

    const parsedDate = parseFlexibleDate(date);

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
    } else {
      setSelectedDate(null);
    }
  }, [date, setSelectedDate]);

  return (
    <div className={styles.calendar}>
      {activePanel === "months" && (
        <div className={styles.monthsPanel}>
          <header className={styles.monthsPanelHeader}>
            <button
              className={clsx(styles.button, styles.buttonPrev)}
              type="button"
              onClick={selectPrevYear}
            >
              <ChevronLeft className={styles.buttonIcon} />
            </button>

            <button
              className={styles.monthsPanelYear}
              type="button"
              onClick={() => changePanel("years")}
            >
              {getSelectedYear()}
            </button>

            <button
              className={clsx(styles.button, styles.buttonNext)}
              type="button"
              onClick={selectNextYear}
            >
              <ChevronRight className={styles.buttonIcon} />
            </button>
          </header>

          <div className={styles.monthsPanelBody}>
            <div className={styles.monthsPanelCells}>
              {months.map((month, i) => (
                <button
                  className={clsx(styles.monthCell, i === selectedDate?.getMonth() && styles.monthCellSelected )}
                  key={month}
                  data-month={i}
                  type="button"
                  onClick={() => selectMonth(i)}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {activePanel === "years" && (
        <div className={styles.yearsPanel}>
          <div className={styles.yearsPanelBody}>
            <div className={styles.yearsPanelCells}>
              {years.map(year => (
                <button
                  className={clsx(styles.yearCell, { [styles.yearCellSelected]: year === getSelectedYear() })}
                  key={year}
                  data-year={year}
                  type="button"
                  onClick={(e) => handleClickYearCell(e, year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
