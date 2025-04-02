import { useEffect, useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

import styles from "./Popup.module.scss";

import ButtonClose from './../ButtonClose/ButtonClose';

export default function Popup({ isOpen, setIsOpen, children, onClose }) {
  const overlayRef = useRef();
  const popupRef = useRef();
  const timeline = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && event.target.classList.contains(styles.overlay)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);
  useEffect(() => {
    if (!popupRef.current) return;

    if (isOpen) {
      animateOnShow();
    } else {
      animateOnHide();
      onClose?.();
    }
  }, [isOpen]);

  // инициализация анимаций
  const { contextSafe } = useGSAP(() => {
    timeline.current = gsap.timeline({ paused: true })
      .to(overlayRef.current, {
        opacity: 1,
        ease: "power3.inOut",
        duration: .75,
      }, 0)
      .to(popupRef.current, {
        scale: 1,
        ease: "power3.inOut",
        duration: .75,
      }, 0)
  });
  const animateOnShow = contextSafe(() => timeline.current.restart());
  const animateOnHide = contextSafe(() => timeline.current.reverse());

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayActive : ""}`} ref={overlayRef}>
      <div className={styles.popup} ref={popupRef}>
        <div className={styles.popupContainer}>
          <ButtonClose className={styles.popupClose} onClickCallback={() => setIsOpen(false)} />

          <div className={styles.popupContent}>{children}</div>
        </div>
      </div>
    </div>
  );
}
