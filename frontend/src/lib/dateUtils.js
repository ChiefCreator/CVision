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

export function convertFromObjectStartDateAndEndDateToStringRangeFormat(startDate, endDate) {
  const isStartDateHasMonth = startDate?.month;
  const isStartDateHasYear = startDate?.year;
  const isEndDateHasMonth = endDate?.month;
  const isEndDateHasYear = endDate?.year;
  
  const startDateStr = isStartDateHasYear && `${isStartDateHasMonth && `${startDate.month}.`}${startDate?.year}`;
  const endDateStr = isEndDateHasYear && `${isEndDateHasMonth && `${endDate.month}.`}${endDate?.year}`;

  return `${startDateStr ? startDateStr : ""}${(startDateStr && endDateStr) ? " - " : ""}${endDateStr ? endDateStr : ""}`;
}

export function convertFromTimestampToDate(timestamp) {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}
export function convertFromDateToTimestamp(date) {
  return Timestamp.fromDate(date);
}

export function convertFromDateToDDMonthYYYYFormat(date) {
  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  return date ? `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}` : null;
}

export function getTimeAgo(date, now = new Date()) {
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const getMinutesWord = (minutes) => {
    if (minutes % 10 === 1 && minutes % 100 !== 11) {
      return 'минуту';
    } else if ((minutes % 10 >= 2 && minutes % 10 <= 4) && (minutes % 100 < 10 || minutes % 100 >= 20)) {
      return 'минуты';
    } else {
      return 'минут';
    }
  }
  const getHoursWord = (hours) => {
    if (hours % 10 === 1 && hours % 100 !== 11) {
      return 'час';
    } else if ((hours % 10 >= 2 && hours % 10 <= 4) && (hours % 100 < 10 || hours % 100 >= 20)) {
      return 'часа';
    } else {
      return 'часов';
    }
  }
  const getDaysWord = (days) => {
    if (days % 10 === 1 && days % 100 !== 11) {
      return 'день';
    } else if ((days % 10 >= 2 && days % 10 <= 4) && (days % 100 < 10 || days % 100 >= 20)) {
      return 'дня';
    } else {
      return 'дней';
    }
  }

  if (diffInSeconds < 60) {
    return `Изменен меньше минуты назад`;
  } else if (diffInMinutes < 60) {
    return `Изменен ${diffInMinutes} ${getMinutesWord(diffInMinutes)} назад`;
  } else if (diffInHours < 24) {
    return `Изменен ${diffInHours} ${getHoursWord(diffInHours)} назад`;
  } else {
    return `Изменен ${diffInDays} ${getDaysWord(diffInDays)} назад`;
  }
}

