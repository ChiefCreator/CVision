export function transformStringsToSlashFormat(start?: string, end?: string) {
  if (start && end) return `${start} | ${end}`;
  else if (start && !end) return start;
  else if (!start && end) return end;
  
  return "";
}

export function join(parts: (string | number | undefined | null)[], separator = ", ") {
  return parts.filter(Boolean).join(separator);
}