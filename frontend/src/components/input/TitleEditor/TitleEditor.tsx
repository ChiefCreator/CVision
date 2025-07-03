import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

import EditButton from "@/components/button/IconButton/EditButton/EditButton";

import type { BaseComponent } from "@/types/rootTypes";
import type { IconButtonProps } from "@/components/button/IconButton/IconButton";

import clsx from 'clsx';
import styles from "./TitleEditor.module.scss"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TitleEditorProps extends BaseComponent {
  controlClassName?: string;
  value?: string;
  defaultValue?: string;
  isControlsShow?: boolean | "auto";
  inputRef?: React.RefObject<HTMLInputElement>;

  controlProps?: IconButtonProps;

  onChange?: (value: string) => void;
}

function getFinalValue(value: TitleEditorProps["value"], defaultValue: TitleEditorProps["defaultValue"]) {
  return !value ? defaultValue : value;
}

export default React.memo(function TitleEditor({ className, value, defaultValue = "Без названия", isControlsShow = "auto", inputRef, controlClassName, onChange }: TitleEditorProps) {
  const finalValue = getFinalValue(value, defaultValue);
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

  const handleFocus = () => {
    setIsFocused(true);
    finalInputRef.current?.focus();
  }
  const handleBlur = () => {
    setIsFocused(false);
  }
  const handleMouseenter = () => {
    setIsHovered(true);
  }
  const handleMouseleave = () => {
    setIsHovered(false);
  }

  useGSAP(() => {
    const line = lineRef.current;
    if (!line) return;

    const lines: Element[] = Array.from(line.children);

    if (isHovered) {
      gsap.to(lines[0], { scale: 1, duration: 0.2 });
    } else {
      gsap.to(lines[0], { scale: 0, duration: 0.2 });
    }

    if (isFocused) {
      gsap.to(lines[1], { scale: 1, duration: 0.2 });
    } else {
      gsap.to(lines[1], { scale: 0, duration: 0.2 });
    }
  }, [isHovered, isFocused]);

  useLayoutEffect(() => {
    setContentWrapperWidth();
  }, [finalValue]);
  useEffect(() => {
    const handleResize = () => setContentWrapperWidth();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              value={finalValue}
              ref={finalInputRef}
              
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            ></input>
  
            <div className={clsx(styles.editorHiddenContent, "invisible")}>{value || defaultValue}</div>
          </div>
  
          <div className={styles.line} ref={lineRef}>
            <span className={clsx(styles.subLine, styles.subLineFirst)}></span>
            <span className={clsx(styles.subLine, styles.subLineSecond)}></span>
          </div>
        </div>
  
        <div className={styles.controls} ref={controlsRef}>
          {((typeof isControlsShow === "boolean" && isControlsShow) || (isHovered && isControlsShow === "auto")) && <EditButton className={clsx(styles.button, controlClassName)} iconProps={{ className: styles.buttonIcon }} onClick={handleFocus} />}
        </div>
      </div>
    </div>
  );
})
