import { useAnimateInputLine } from "@/hooks/root/useAnimateInputLine";
import React, { useEffect, useRef, useState } from "react";

import EditButton from "@/components/button/IconButton/EditButton/EditButton";
import InputLine from "../InputLine/InputLine";

import type { IconButtonProps } from "@/components/button/IconButton/IconButton";
import type { BaseComponent } from "@/types/root";

import IconButton from "@/components/button/IconButton/IconButton";
import { useValue } from "@/hooks/root/useValue";
import clsx from 'clsx';
import styles from "./TitleEditor.module.scss";

export interface Control extends IconButtonProps {
  id: string;
  onClick: () => void;
}

interface TitleEditorProps extends BaseComponent {
  controlClassName?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  isControlsShow?: boolean | "alwaysShow" | "neverShow";
  inputRef?: React.RefObject<HTMLInputElement>;
  controls?: Control[];

  controlProps?: IconButtonProps;

  onChange?: (value: string) => void;
}

export default React.memo(function TitleEditor({
  className,
  value: controlledValue,
  defaultValue = '',
  placeholder = "Нет названия",
  isControlsShow: isControlsShowProp,
  inputRef,
  controlClassName,
  controls,
  onChange,
}: TitleEditorProps) {
  const { value, changeValue } = useValue({ controlledValue, defaultValue });
  const [isControlsShow, setIsControlsShow] = useState<TitleEditorProps["isControlsShow"]>(isControlsShowProp || false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const finalInputRef = inputRef ? inputRef : useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLUListElement>(null);

  const changeIsControlsShow = (isShow?: boolean) => {
    setIsControlsShow(prev => {
      if (prev === "alwaysShow" || prev === "neverShow") return prev;

      return isShow;
    })
  }

  const isShowControls = () => {
    if (typeof isControlsShow === "boolean") {
      return isControlsShow;
    }
    if (isControlsShow === "alwaysShow") return true;
    if (isControlsShow === "neverShow") return false;
  }

  const setContentWrapperWidth = (isFullWidth: boolean) => {
    const controls = controlsRef.current;
    const contentWrapper = contentWrapperRef.current;
    const container = containerRef.current;

    if (!controls || !contentWrapper || !container) return;

    if (isFullWidth) {
      contentWrapper.style.maxWidth = `100%`;
      return;
    }

    const containerGap = parseFloat(getComputedStyle(container).gap);
    const controlsWidth = controls.offsetWidth;

    contentWrapper.style.maxWidth = `calc(100% - ${controlsWidth + containerGap}px)`;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    changeValue(value);
    onChange?.(value);
  }

  const handleFocus = () => {
    setIsFocused(true);

    finalInputRef.current?.focus();
  }

  const handleBlur = () => {
    setIsFocused(false);

    if (!value) {
      changeValue(placeholder);

      onChange?.(placeholder);
    }
  };

  const handleMouseenter = () => setIsHovered(true);

  const handleMouseleave = () => setIsHovered(false);

  useEffect(() => {
    changeIsControlsShow(isHovered || isFocused);
    setContentWrapperWidth(!(isHovered || isFocused));

    const handleResize = () => setContentWrapperWidth(!(isHovered || isFocused));

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isHovered, isFocused]);

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
              placeholder={placeholder}
              
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            ></input>
  
            <div className={clsx(styles.editorHiddenContent, "invisible")} aria-hidden="true">{value || placeholder}</div>

            <InputLine className={styles.inputLine} ref={lineRef} />
          </div>
        </div>
  
        {isShowControls() && (
          <ul className={styles.controls} ref={controlsRef}>
            <li>
              <EditButton
                className={clsx(styles.button, controlClassName)}
                iconClassName={styles.buttonIcon}
                onClick={handleFocus}
              />
            </li>
            
            {controls?.map(control => (
              <li key={control.id}>
                <IconButton
                  {...control}
                  iconClassName={clsx(styles.button, controlClassName)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
})
