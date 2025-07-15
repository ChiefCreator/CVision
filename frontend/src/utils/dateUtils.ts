import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";

export function transformStringDatesToRangeFormat(start?: string, end?: string) {
  if (start && end) return `${start} - ${end}`;
  else if (start && !end) return start;
  else if (!start && end) return end;
  
  return "";
}

export const formatDate = (date: Date) => {
  const formattedDate = format(date, "LLLL, yyyy", { locale: ru });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

export const parseFlexibleDate = (value: string) => {
  const trimmedValue = value.trim();

  if (/^\d{4}-\d{2}$/.test(trimmedValue)) {
    return parse(trimmedValue, "yyyy-MM", new Date(), { locale: ru });
  }
  else if (/^\d{2}\s*\/\s*\d{4}$/.test(trimmedValue)) {
    const normalized = trimmedValue.replace(/\s*/g, "").replace("/", "/");
    return parse(normalized, "MM/yyyy", new Date(), { locale: ru });
  }
  else if (/^[а-яА-Яa-zA-Z]+\/\d{4}$/.test(trimmedValue)) {
    return parse(trimmedValue, "LLLL/yyyy", new Date(), { locale: ru });
  }
  else if (/^\d{4}$/.test(trimmedValue)) {
    return parse(trimmedValue, "yyyy", new Date(), { locale: ru });
  }
  else if (/^[а-яА-Яa-zA-Z]+\s*,\s*\d{4}$/.test(trimmedValue)) {
    const normalized = trimmedValue.replace(/\s*,\s*/, ", ");
    return parse(normalized, "LLLL, yyyy", new Date(), { locale: ru });
  }
  else {
    return null;
  }
}