import { useCallback, useId, useRef, useState } from 'react';
import { useClickOutside } from "../root/useClickOutside";

interface UseDropdownMenuProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

export function useDropdownMenu({ isOpen: controlledIsOpen, onToggle }: UseDropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const menuId = useId();

  const triggerRef = useRef<HTMLButtonElement | HTMLInputElement | HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const setIsOpen = useCallback((isOpen: boolean) => {
    isControlled ? onToggle?.(isOpen) : setInternalOpen(isOpen);
  }, [isControlled, onToggle]);

  const toggle = useCallback((isOpenProp?: boolean) => {
    isOpenProp ? setIsOpen(isOpenProp) : setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [isOpen, setIsOpen]);
  const open = useCallback(() => setIsOpen(true), [isOpen, setIsOpen]);

  useClickOutside({ mainComponentRef: menuRef, triggerRef, onClickOutside: close });

  return { isOpen, triggerRef, menuRef, menuId, toggle, close, open };
}
