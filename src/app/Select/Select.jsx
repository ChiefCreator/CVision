import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

import styles from "./Select.module.scss";

function Dropdown({ isOpen, select, pos, optionsData }) {
  return createPortal(
    <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`} style={{ ...pos }}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownOptionsList}>
          {optionsData.map(({ value, label }) => (
            <button
              className={`${styles.dropdownOption} ${value === "default" ? styles.dropdownOptionDefault : ""}`}
              type="button" key={value}
              onClick={() => select(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Select({ selectedValue, onChangeCallback, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });

  if (!selectedValue) onChangeCallback("default");

  const selectRef = useRef();
  const selectHeadRef = useRef();
  const timelineOfFirstLine = useRef();
  const timelineOfSecondLine = useRef();
  const selectLineRef = useRef();

  const isSelectedValueDefault = selectedValue === "default";

  // анимация линий 
  const { contextSafe } = useGSAP(() => {
    timelineOfFirstLine.current = gsap.timeline({ paused: true })
      .to(selectLineRef.current.firstElementChild, {
        transform: "scale(1)",
        ease: "power3.inOut",
        duration: .75,
      })

    timelineOfSecondLine.current = gsap.timeline({ paused: true })
      .to(selectLineRef.current.lastElementChild, {
        transform: "scale(1)",
        ease: "power3.inOut",
        duration: .75,
      })
  });
  const selectLineAnimation = {
    firstLine: contextSafe(() => {
      timelineOfFirstLine.current.restart();
    }),
    firstLineReverse: contextSafe(() => {
      timelineOfFirstLine.current.reverse();
    }),
    lastLine: contextSafe(() => {
      timelineOfSecondLine.current.restart();
    }),
    lastLineReverse: contextSafe(() => {
      timelineOfSecondLine.current.reverse();
    }),
  };
  useEffect(() => {
    isOpen ? selectLineAnimation.firstLine() : selectLineAnimation.firstLineReverse();
  }, [isOpen]);
  useEffect(() => {
    document.addEventListener("click", handleClickSelectHead);

    return () => {
      document.removeEventListener("click", handleClickSelectHead);
    };
  }, []);

  // обработчики событий   
  function handleSelectChange(value) {
    onChangeCallback(value);
    setIsOpen(false);
  };
  function handleClickSelectHead(event) {
    if (selectHeadRef.current && selectHeadRef.current.contains(event.target)) {
      setIsOpen(prev => !prev);

      setDropdownPosition(calcDropdonwPosition());
    }
    else if (selectHeadRef.current && !selectHeadRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  // методы   
  function calcDropdonwPosition() {
    const selectRect = selectRef.current.getBoundingClientRect();

    return {
      width: selectRect.width,
      top: selectRect.top + window.scrollY + selectRect.height,
      left: selectRect.left + window.scrollX + window.scrollX,
    }
  }

  return (
    <div className={`${styles.select} ${isOpen ? styles.selectOpen : ""}`} ref={selectRef}>
      <div 
        className={styles.selectHead}
        ref={selectHeadRef}
        onMouseEnter={selectLineAnimation.lastLine}
        onMouseLeave={selectLineAnimation.lastLineReverse}
        type="button"
      >
        <div className={styles.selectHeadContainer}>
          <span className={`${styles.selectLabel} ${isSelectedValueDefault ? styles.selectLabelDefault : ""}`}>
            {data.find(language => language.value === selectedValue)?.label}
          </span>
          <span className={`${styles.selectArrow} ${isOpen ? styles.selectArrowActive : ""}`}>
            <svg className={styles.selectArrowIcon} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
            </svg>
          </span>
        </div>
        <div className={styles.selectLine} ref={selectLineRef}>
          <span className={`${styles.selectSubLine} ${styles.selectSubLineFirst}`}></span>
          <span className={`${styles.selectSubLine} ${styles.selectSubLineSecond}`}></span>
        </div>
      </div>

      <Dropdown pos={dropdownPosition} isOpen={isOpen} select={handleSelectChange} optionsData={data} />
    </div>
  );
}

Select.type = "select";
