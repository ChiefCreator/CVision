export function join(parts: (string | number | undefined | null)[], separator = ", ") {
  return parts.filter(Boolean).join(separator);
}