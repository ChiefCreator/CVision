import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (date: Date) => {
  const formattedDate = format(date, "LLLL, yyyy", { locale: ru });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}