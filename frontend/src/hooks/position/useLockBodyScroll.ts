import { useLayoutEffect } from 'react';

export function useLockBodyScroll(isLock: boolean) {
  useLayoutEffect(() => {
    const body = document.body;

    if (isLock) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      const originalOverflow = body.style.overflow;
      const originalPaddingRight = body.style.paddingRight;

      body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        body.style.paddingRight = `${scrollBarWidth}px`;
      }

      return () => {
        body.style.overflow = originalOverflow;
        body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isLock]);
}
