import type { CSSProperties } from "react";

export function createStyles<T extends string>(styles: Record<T, CSSProperties>) {
  return styles;
}
