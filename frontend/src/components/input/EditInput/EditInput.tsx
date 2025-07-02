import styles from "./EditInput.module.scss"

import React, { useState, useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import clsx from "clsx";
gsap.registerPlugin(useGSAP);

export interface EditInputProps {
  value?: string;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;

  onChange: (value: string) => void;
}

export default React.memo(function EditInput({ value, placeholder, inputRef, onChange }: EditInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const finalInputRef = inputRef || useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleMouseenter = () => setIsHovered(true);
  const handleMouseleave = () => setIsHovered(false);

  useGSAP(() => {
    const line = lineRef.current;
    if (!line) return;

    const [hoverLine, focusLine] = Array.from(line.children);

    gsap.to(hoverLine, {
      scale: isHovered ? 1 : 0,
      duration: 0.2,
    });

    gsap.to(focusLine, {
      scale: isFocused ? 1 : 0,
      duration: 0.2,
    });
  }, [isHovered, isFocused]);

  return (
    <div 
      className={styles.input}

      onMouseEnter={handleMouseenter}
      onMouseLeave={handleMouseleave}
    >
      <div className={styles.inputContainer}>
        <input
          className={styles.inputItem}
          ref={finalInputRef}
          value={value}
          placeholder={placeholder}

          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={e => onChange(e.target.value)}
        ></input>
      </div>

      <div className={styles.inputLine} ref={lineRef}>
        <span className={clsx(styles.inputSubLine, styles.inputSubLineFirst)}></span>
        <span className={clsx(styles.inputSubLine, styles.inputSubLineSecond)}></span>
      </div>
    </div>
  );
})