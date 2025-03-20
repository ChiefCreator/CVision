import { useState, useEffect, useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

import styles from "./DropdownMenu.module.scss";

export default function DropdownMenu({ className = "", isOpen, setIsOpen, controls, triggerRef, anchorOrigin, transformOrigin }) {
  const [menuSize, setMenuSize] = useState({ width: 0, height: 0 });
  const [isMenuSizeCalculated, setIsMenuSizeCalculated] = useState(false);
  const [positionStyles, setPositionStyles] = useState({});

  const dropdownMenuRef = useRef(null);
  const timeline = useRef();

  // обработчики событий
  function handleButtonClick() {
    setIsOpen(false);
  }

  // методы
  function calculatePosition(triggerRect) {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const anchorX = {
      left: triggerRect.left + scrollX,
      center: triggerRect.left + triggerRect.width / 2 + scrollX,
      right: triggerRect.right + scrollX,
    }[anchorOrigin.horizontal];

    const anchorY = {
      top: triggerRect.top + scrollY,
      center: triggerRect.top + triggerRect.height / 2 + scrollY,
      bottom: triggerRect.bottom + scrollY,
    }[anchorOrigin.vertical];

    const transformX = {
      left: 0,
      center: -menuSize.width / 2,
      right: -menuSize.width,
    }[transformOrigin.horizontal];

    const transformY = {
      top: 0,
      center: -menuSize.height / 2,
      bottom: -menuSize.height,
    }[transformOrigin.vertical];

    const transformOriginStyle = `${transformOrigin.horizontal === "right" ? "100%" : 0} ${transformOrigin.vertical === "bottom" ? "100%" : 0}`;

    return {
      top: `${anchorY + transformY}px`,
      left: `${anchorX + transformX}px`,
      transformOrigin: transformOriginStyle,
    }
  }

  // инициализация анимаций
  useEffect(() => {
    if (!isMenuSizeCalculated) return;

    timeline.current = gsap.timeline({ paused: true })
      .fromTo(
        dropdownMenuRef.current,
        { transform: "scale(0)", opacity: 0 },
        { transform: "scale(1)", opacity: 1, ease: "power3.inOut", duration: 0.75 }
      );
  }, [isMenuSizeCalculated]);
  const animateOnShow = () => timeline.current.restart();
  const animateOnHide = () => timeline.current.reverse();

  useEffect(() => {
    if (dropdownMenuRef.current) {
      const rect = dropdownMenuRef.current.getBoundingClientRect();

      setMenuSize({ width: rect.width, height: rect.height });
      setIsMenuSizeCalculated(true);
    }

    function handleClickOutside(event) {
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target) && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
    if (!triggerRef.current || !dropdownMenuRef.current || !isMenuSizeCalculated) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();

    setPositionStyles(calculatePosition(triggerRect));

  }, [isOpen, triggerRef, isMenuSizeCalculated]);
  useEffect(() => {
    if (!isMenuSizeCalculated) return;

    isOpen ? animateOnShow() : animateOnHide();
  }, [isOpen, isMenuSizeCalculated])

  return (
    <div
      className={`${styles.dropdownMenu} ${!isMenuSizeCalculated ? styles.dropdownMenuHidden : ""} ${className}`}
      ref={dropdownMenuRef}
      style={positionStyles}
    >
      <div className={styles.dropdownMenuControls}>
        {controls.map((controlObj) => {
          const onClick = () => {
            handleButtonClick();
            if (controlObj.onClick) controlObj.onClick();
          };

          return (
            <button className={styles.button} type="button" key={controlObj.id} onClick={onClick}>
              <div className={styles.buttonIconWrapper}>{controlObj.icon}</div>
              <span className={styles.buttonTitle}>{controlObj.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
