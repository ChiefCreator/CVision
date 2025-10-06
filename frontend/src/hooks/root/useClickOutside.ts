import { useEffect } from "react";

interface UseClickOutside {
  mainComponentRef: React.RefObject<HTMLElement | null>;
  triggerRef?: React.RefObject<HTMLElement | null>;
  isEnabled?: boolean;
  
  onClickOutside: () => void;
}

export function useClickOutside({ mainComponentRef, triggerRef, isEnabled = true, onClickOutside }: UseClickOutside) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
  
      if (!mainComponentRef?.current?.contains(target) && !triggerRef?.current?.contains(target)) {
        onClickOutside();
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
}