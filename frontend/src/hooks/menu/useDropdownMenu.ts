import { useState, useRef, useId, useCallback } from 'react';
import { useClickOutside } from '../root/useClickOutside';

export function useDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuId = useId();

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside({ mainComponentRef: menuRef, triggerRef, onClickOutside: close });

  return { isOpen, triggerRef, menuRef, menuId, toggle, close };
}
