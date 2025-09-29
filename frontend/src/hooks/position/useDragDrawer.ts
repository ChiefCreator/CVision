import { useRef, useState } from "react";

interface UseDragDrawerProps {
	onClose: () => void;
}

export function useDragDrawer({ onClose }: UseDragDrawerProps) {
	const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState<number | null>(null);
  const yStart = useRef<number>(null);

	const contentRef = useRef<HTMLDivElement | null>(null);

	const animateOnOpen = () => {
    if (!contentRef.current) return;

		contentRef.current.style.transform = "translateY(0)";
  }

	const handlePointerDown = (e: React.TouchEvent) => {
    yStart.current = e.touches[0].clientY;  

    setIsDragging(true);
  };
  const handlePointerMove = (e: React.TouchEvent) => {
    if (!isDragging || yStart.current === null) return;
  
    const deltaY = e.touches[0].clientY - yStart.current;  
    if (deltaY > 0) {
      setDragY(deltaY);

			if (contentRef.current) {
				contentRef.current.style.transform = `translateY(${deltaY}px)`;
			}
    }
  };
  const handlePointerUp = () => {
    const dropdownHeightQuarter = contentRef.current ? contentRef.current.offsetHeight / 4 : 50;  

    if (dragY && dragY > dropdownHeightQuarter) {
      onClose();
			
			if (contentRef.current) contentRef.current.style.transform = "translateY(0)";
    } else {
      animateOnOpen();
    }  
    
    setIsDragging(false);
    yStart.current = null;
  };

	return {
		contentRef,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
	}
}