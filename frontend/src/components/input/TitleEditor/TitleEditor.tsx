import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useAnimateInputLine } from "@/hooks/useAnimateInputLine";

import EditButton from "@/components/button/IconButton/EditButton/EditButton";
import InputLine from "../InputLine/InputLine";

import type { BaseComponent } from "@/types/rootTypes";
import type { IconButtonProps } from "@/components/button/IconButton/IconButton";

import clsx from 'clsx';
import styles from "./TitleEditor.module.scss"

interface TitleEditorProps extends BaseComponent {
  controlClassName?: string;
  value?: string;
  defaultValue?: string;
  isControlsShow?: boolean | "auto";
  inputRef?: React.RefObject<HTMLInputElement>;

  controlProps?: IconButtonProps;

  onChange?: (value: string) => void;
}

export default React.memo(function TitleEditor({ className, value: valueProp, defaultValue: defaultValueProp, isControlsShow = "auto", inputRef, controlClassName, onChange }: TitleEditorProps) {
  const defaultValue = defaultValueProp || "Без названия";
  const [value, setValue] = useState(valueProp || "");

  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const finalInputRef = inputRef ? inputRef : useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const setContentWrapperWidth = () => {
    const controls = controlsRef.current;
    const contentWrapper = contentWrapperRef.current;
    const container = containerRef.current;

    if (!controls || !contentWrapper || !container) return;

    const containerGap = parseFloat(getComputedStyle(container).gap);
    const controlsWidth = controls.offsetWidth;

    contentWrapper.style.maxWidth = `calc(100% - ${controlsWidth + containerGap}px)`;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setValue(value);
    onChange?.(value);
  }
  const handleFocus = () => {
    setIsFocused(true);

    finalInputRef.current?.focus();
  }
  const handleBlur = () => {
    setIsFocused(false);

    if (!value) {
      setValue(defaultValue);
      onChange?.(defaultValue);
    }
  };
  const handleMouseenter = () => setIsHovered(true);
  const handleMouseleave = () => setIsHovered(false);

  useLayoutEffect(() => {
    setContentWrapperWidth();
  }, [value]);
  useEffect(() => {
    const handleResize = () => setContentWrapperWidth();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useAnimateInputLine({ isFocused, isHovered, lineRef });

  return (
    <div
      className={clsx(styles.editor, className)}

      onMouseEnter={handleMouseenter} 
      onMouseLeave={handleMouseleave} 
    >
      <div className={styles.editorContainer} ref={containerRef}>
        <div className={styles.editorContentWrapper} ref={contentWrapperRef}>
          <div className={styles.editorContent}>
            <input
              className={styles.input}
              value={value}
              ref={finalInputRef}
              placeholder={defaultValue}
              
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            ></input>
  
            <div className={clsx(styles.editorHiddenContent, "invisible")}>{value || defaultValue}</div>
          </div>
  
          <InputLine className={styles.inputLine} ref={lineRef} />
        </div>
  
        <div className={styles.controls} ref={controlsRef}>
          {((typeof isControlsShow === "boolean" && isControlsShow) || (isHovered && isControlsShow === "auto")) && <EditButton className={clsx(styles.button, controlClassName)} iconProps={{ className: styles.buttonIcon }} onClick={handleFocus} />}
        </div>
      </div>
    </div>
  );
})
