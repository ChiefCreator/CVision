import { Timestamp } from "firebase/firestore";

export function convertFromTimestampToObjectMonthYearFormat(timestamp) {
  const date = timestamp.toDate();

  return {
    month: String(date.getMonth() + 1).padStart(2, "0"),
    year: date.getFullYear()
  };
}

export function convertFromObjectMonthYearFormatToTimestamp(obj) {
  const {month, year} = obj;
  const dateObject = new Date(year, month - 1, 1);

  return Timestamp.fromDate(dateObject);
}

export function convertFromMMYYYYFormatToTimestamp(dateStr) {
  const [month, year] = dateStr.split(".").map(Number);
  const dateObject = new Date(year, month - 1, 1);

  return Timestamp.fromDate(dateObject);
}

export function convertFromTimestampToMMYYYYFormat(timestamp) {
  const date = timestamp.toDate();

  return `${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
}

export function isDateValidMMYYYYFormat(dateStr) {
  const regex = /^(0[1-9]|1[0-2])\.(\d{4})$/;
  return regex.test(dateStr);
}
