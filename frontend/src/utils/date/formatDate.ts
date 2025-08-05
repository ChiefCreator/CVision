import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (date: Date) => {
  const formattedDate = format(date, "LLLL, yyyy", { locale: ru });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

export function transformDateTo_DD_MMMM_YYYY_TIME_format(date: Date): string {
  const now = new Date();
  const isCurrentYear = date.getFullYear() === now.getFullYear();

  const dateFormat = isCurrentYear ? "d MMMM, HH:mm" : "d MMMM yyyy, HH:mm";

  return format(date, dateFormat, { locale: ru });
}