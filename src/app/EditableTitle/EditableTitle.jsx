import { useEffect, useState, useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

import styles from "./EditableTitle.module.scss";

import EditButton from "../EditButton/EditButton";

export default function EditableTitle({ children, onChangeCallback, placeholder = "Без названия", isInputFocused = false,  fontSize = 16, ref }) {
  const value = children;
  const [isFocused, setIsFocused] = useState(isInputFocused);
  const [isEditButtonShow, setIsEditButtonShow] = useState(false);

  const $input = ref ? ref : useRef();
  const $line = useRef();
  const timelineOfFirstLine = useRef();
  const timelineOfSecondLine = useRef();

  function isValueMissing() {
    return !value;
  }

  // Обработчики событий
  function handleInputChange(event) {
    if (onChangeCallback) onChangeCallback(event.target.value);
  }
  function handleInputFocus() {
    setIsFocused(true);
    contextSafe(() => timelineOfFirstLine.current.restart())();
  }
  function handleInputBlur() {
    setIsFocused(false);
    // if (isValueMissing()) setValue(placeholder);

    contextSafe(() => timelineOfFirstLine.current.reverse())();
  }
  function handleInputMouseenter() {
    setIsEditButtonShow(true);
    contextSafe(() => timelineOfSecondLine.current.restart())();
  }
  function handleInputMouseleave() {
    setIsEditButtonShow(false);
    contextSafe(() => timelineOfSecondLine.current.reverse())();
  }
  function handleEditButtonClick() {
    $input.current.focus();
  }

  useEffect(() => {
    if (isFocused) $input.current.focus();
  })

  // инициализация анимаций
  const { contextSafe } = useGSAP(() => {
    timelineOfFirstLine.current = gsap.timeline({ paused: true })
      .to($line.current.firstElementChild, {
        transform: "scale(.99)",
        ease: "power3.inOut",
        duration: .75,
      })

    timelineOfSecondLine.current = gsap.timeline({ paused: true })
      .to($line.current.lastElementChild, {
        transform: "scale(.99)",
        ease: "power3.inOut",
        duration: .75,
      })
  });
  
  return (
    <div className={styles.editableTitle} style={{ fontSize }}>
      <div className={styles.editableTitleContentWrapper}>
        <div className={styles.editableTitleContent}>
          <input
            ref={$input}
            className={styles.editableTitleInput}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onMouseEnter={handleInputMouseenter}
            onMouseLeave={handleInputMouseleave}
            value={isValueMissing() && !isFocused ? placeholder : value}
            placeholder={placeholder}>
          </input>
          <div className={`${styles.editableTitleHiddenContent} invisible`}>
            {isValueMissing() ? placeholder : value}
          </div>
        </div>
        <div ref={$line} className={styles.editableTitleLine}>
          <span className={`${styles.editableTitleSubLine} ${styles.editableTitleSubLineFirst}`}></span>
          <span className={`${styles.editableTitleSubLine} ${styles.editableTitleSubLineSecond}`}></span>
        </div>
      </div>
      <div className={styles.editableTitleButtons}>
        <EditButton onClickCallback={handleEditButtonClick} isShow={isEditButtonShow} setIsShow={setIsEditButtonShow} />
      </div>
    </div>
  );
}
