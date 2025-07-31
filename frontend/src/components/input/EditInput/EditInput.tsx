import React, { useState, useRef, useEffect } from "react";
import { useAnimateInputLine } from "@/hooks/root/useAnimateInputLine";

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
  isFocused?: boolean;

  onFocus?: (value?: string) => void;
  onBlur?: (value?: string) => void;
  onChange: (value: string) => void;
  setIsFocused?: (isFocused: boolean) => void;
}

export default React.memo(function EditInput({ value: valueProp, placeholder, ref, inputRef: inputRefProp, isFocused: isFocusedProp = false, onFocus, onBlur, onChange, setIsFocused: setIsFocusedProp }: EditInputProps) {
  const [value, setValue] = useState(valueProp || "");
  const [isHovered, setIsHovered] = useState(false);
  const [internalIsFocused, setInternalIsFocused] = useState(false);
  const isFocusControlled = isFocusedProp !== undefined && setIsFocusedProp !== undefined;
  const isFocused = isFocusControlled ? isFocusedProp : internalIsFocused;
  const setIsFocused = isFocusControlled ? setIsFocusedProp : setInternalIsFocused;

  const inputRef = inputRefProp || useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);
    onChange(value);
  }
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.(value);
  }
  const handleMouseenter = () => setIsHovered(true);
  const handleMouseleave = () => setIsHovered(false);

  useAnimateInputLine({ isFocused, isHovered, lineRef });

  useEffect(() => {
    if (valueProp && value !== valueProp) setValue(valueProp);
  }, [valueProp, setValue]);
  useEffect(() => {
    isFocusedProp && inputRef.current?.focus();
  }, [isFocusedProp]);

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
          ref={inputRef}
          value={value}
          placeholder={placeholder}

          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        ></input>
      </div>

      <InputLine className={styles.inputLine} ref={lineRef} />
    </div>
  );
})