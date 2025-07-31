import { useCallback } from "react";
import styles from "./../Section.module.scss";

export function useSection(id: string, checkIsOpen: (id: string, subId?: string) => boolean, onToggle: (id: string, subId?: string) => void) {
  const isOpen = checkIsOpen(id);

  const handleClickHead = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest(`.${styles.titleEditor}`)) return;

    onToggle(id);
  }, [id, onToggle]);

  return { isOpen, handleClickHead };
}
