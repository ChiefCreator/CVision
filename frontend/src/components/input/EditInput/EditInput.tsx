import React, { useState, useRef } from "react";
import { useAnimateInputLine } from "@/hooks/useAnimateInputLine";

import InputLine from "../InputLine/InputLine";

import styles from "./EditInput.module.scss"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

export interface EditInputProps {
  value?: string;
  placeholder?: string;
  ref?: React.Ref<HTMLDivElement>;
  inputRef?: React.RefObject<HTMLInputElement>;

  onFocus?: () => void;
  onChange: (value: string) => void;
}

export default React.memo(function EditInput({ value, placeholder, ref, inputRef, onFocus, onChange }: EditInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const finalInputRef = inputRef || useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };
  const handleBlur = () => setIsFocused(false);
  const handleMouseenter = () => setIsHovered(true);
  const handleMouseleave = () => setIsHovered(false);

  useAnimateInputLine({ isFocused, isHovered, lineRef });

  return (
    <div 
      className={styles.input}
      ref={ref}

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

      <InputLine className={styles.inputLine} ref={lineRef} />
    </div>
  );
})