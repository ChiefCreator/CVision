import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

interface UseAnimateInputLineProps {
  isHovered: boolean;
  isFocused: boolean;
  lineRef: React.RefObject<HTMLDivElement | null>;
}

export const useAnimateInputLine = ({ isHovered, isFocused, lineRef }: UseAnimateInputLineProps) => {
  useGSAP(() => {
    const line = lineRef.current;
    if (!line) return;

    const [hoverLine, focusLine] = Array.from(line.children);

    gsap.to(hoverLine, {
      scale: isHovered ? 1 : 0,
      duration: 0.2,
    });

    gsap.to(focusLine, {
      scale: isFocused ? 1 : 0,
      duration: 0.2,
    });
  }, [isHovered, isFocused]);
}