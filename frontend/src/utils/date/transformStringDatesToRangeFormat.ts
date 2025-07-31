export function transformStringDatesToRangeFormat(start?: string, end?: string) {
  if (start && end) return `${start} - ${end}`;
  else if (start && !end) return start;
  else if (!start && end) return end;
  
  return "";
}