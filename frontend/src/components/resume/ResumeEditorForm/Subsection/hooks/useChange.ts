import { useState, useCallback } from "react";

interface UseChangeProps {
  id: string;
  sectionId: string;
  onToggle: (sectionId: string, subsectionId: string, open?: boolean) => void;
}

export function useChange({ id, sectionId, onToggle }: UseChangeProps) {
  const [isFirstInputFocused, setIsFirstInputFocused] = useState(false);
  
  const changeOnClick = useCallback(() => {
    onToggle(sectionId, id, true);
    setIsFirstInputFocused(true);
  }, [onToggle, setIsFirstInputFocused]);

  return { isFirstInputFocused, setIsFirstInputFocused, changeOnClick };
}