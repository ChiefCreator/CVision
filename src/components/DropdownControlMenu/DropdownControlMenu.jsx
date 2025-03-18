import { useState, useEffect, useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

import styles from "./DropdownControlMenu.module.scss";

export default function DropdownControlMenu({ controls, placement }) {
  const [isOpen, setIsOpen] = useState(false);
  const [placementStyles, setPlacementStyles] = useState({});

  const $triggerButton = useRef(null);
  const $dropdown = useRef(null);
  const timeline = useRef();

  // обработчики событий
  function handlerTriggerButtonClick() {
    setIsOpen(!isOpen);
  }
  function handleDropdownControlMenuButtonClick() {
    setIsOpen(false);
  }
  useEffect(() => {
    setPlacementStyles(getObjectOfMenuPlacement());

    function handleClickOutside(event) {
      if ($dropdown.current && !$dropdown.current.contains(event.target) && !$triggerButton.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // методы
  function getObjectOfMenuPlacement() {
    const { position = "bottom-right", offsetX = 0, offsetY = 0 } = placement || {};

    const triggerRect = $triggerButton.current.getBoundingClientRect();
    const menuRect = $dropdown.current.getBoundingClientRect();

    switch (position) {
      case "top-left":
        return {
          left: `${offsetX}px`,
          top: `calc(${-menuRect.height + offsetY}px)`,
          transformOrigin: "0 100%",
        };
      case "top-right":
        return {
          right: `${offsetX}px`,
          top: `${offsetY}px`,
          transformOrigin: "0 100%",
        };
      case "bottom-left":
        return {
          left: `${offsetX}px`,
          top: `calc(100% + ${offsetY}px)`,
          transformOrigin: "0 0",
        };
      case "bottom-right":
        return {
          right: `${offsetX}px`,
          top: `calc(100% + ${offsetY}px)`,
          transformOrigin: "100% 0",
        };
      default:
        return {
          right: `${offsetX}px`,
          top: `${offsetY}px`,
          transformOrigin: "100% 0",
        };
    }
  }

  // инициализация анимаций
  const { contextSafe } = useGSAP(() => {
    timeline.current = gsap.timeline({ paused: true })
      .to($dropdown.current, {
        transform: "scale(1)",
        ease: "power3.inOut",
        duration: .75,
      })
  });
  const animateOnShow = contextSafe(() => timeline.current.restart());
  const animateOnHide = contextSafe(() => timeline.current.reverse());

  useEffect(() => {
    isOpen ? animateOnShow() : animateOnHide();
  }, [isOpen])

  return (
    <div className={styles.dropdownControlMenu}>
      <button className={styles.triggerButton} type="button" ref={$triggerButton} onClick={handlerTriggerButtonClick}>
        <svg className={styles.triggerButtonIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M480-189.233q-24.749 0-42.374-17.624-17.625-17.625-17.625-42.374t17.625-42.374T480-309.23t42.374 17.625 17.625 42.374-17.625 42.374Q504.749-189.233 480-189.233m0-230.768q-24.749 0-42.374-17.625T420.001-480t17.625-42.374T480-539.999t42.374 17.625T539.999-480t-17.625 42.374T480-420.001m0-230.769q-24.749 0-42.374-17.625-17.625-17.624-17.625-42.374 0-24.749 17.625-42.374 17.625-17.624 42.374-17.624t42.374 17.624 17.625 42.374-17.625 42.374T480-650.77"></path>
        </svg>
      </button>
      <div className={styles.dropdownControlMenuDropdown} ref={$dropdown} style={placementStyles}>
        <div className={styles.dropdownControlMenuButtonsWrapper}>
          {controls.map((controlObj) => {
            const onClick = () => {
              handleDropdownControlMenuButtonClick();
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
    </div>
  );
}
