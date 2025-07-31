import { parse } from "date-fns";
import { ru } from "date-fns/locale";

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