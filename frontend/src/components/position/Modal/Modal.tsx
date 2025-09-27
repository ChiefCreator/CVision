"use client"

import IconButton from "@/components/button/IconButton/IconButton";
import { X } from "lucide-react";
import Overlay from "../Overlay/Overlay";
import Portal from "../Portal/Portal";
import styles from './Modal.module.scss';

export interface ModalProps {
  id: string;
  isOpen: boolean;
  children: React.ReactNode;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'custom';
  className?: string;
  overlayClosable?: boolean;
  hasCloseButton?: boolean;

  onClose?: () => void;
}

export default function Modal({ id, className, isOpen, children, position = 'center', overlayClosable = true, hasCloseButton = true, onClose }: ModalProps) {
  
  if (!isOpen) return null;

  return (
    <Portal>
      <Overlay className={styles.overlay} isActive={isOpen} isClosable={overlayClosable} onClick={onClose} />

      <div className={`${styles.modal} ${className}`} data-position={position} id={id}>
        {children}

        {hasCloseButton && <IconButton className={styles.closeButton} Icon={X} iconClassName={styles.closeButtonIcon} onClick={onClose} />}
      </div>
    </Portal>
  );
}
