import { useAnimateInputLine } from "@/hooks/root/useAnimateInputLine";
import { useEffect, useMemo, useRef, useState } from "react";

import IconButton from "@/components/button/IconButton/IconButton";
import { Bold, Italic, List, ListOrdered, Strikethrough, Underline } from "lucide-react";
import InputLine from "../InputLine/InputLine";

import { useValue } from "@/hooks/root/useValue";
import clsx from "clsx";
import styles from "./TextEditor.module.scss";

export interface TextEditorProps {
  placeholder?: string;
  children?: string;
  defaultValue?: string;
  
  onChange?: (value: string) => void;
}

export default function TextEditor({ children: controlledValue, defaultValue = '', placeholder = "Нет названия", onChange }: TextEditorProps) {
  const { value, changeValue } = useValue({ controlledValue, defaultValue });
  
  const [isPlaceholderActive, setIsPlaceholderActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [isCrossedOut, setIsCrossedOut] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const changeContent = (content: string) => {
    changeValue(content);
    onChange?.(content);
  }
  
  const executeCommand = (command: string) => {
    document.execCommand(command, false, undefined);
    updateButtonStates();
  }

  const toggleBold = () => executeCommand("bold");
  const toggleItalic = () => executeCommand("italic");
  const toggleUnderline = () => executeCommand("underline");
  const toggleCrossedOut = () => executeCommand("strikeThrough");
  const toggleOrderedList = () => executeCommand("insertOrderedList");
  const toggleUnorderedList = () => executeCommand("insertUnorderedList");

  const updateButtonStates = () => {
    const selection = document.getSelection();
    const anchorNode = selection?.anchorNode ?? null;
  
    const isInsideEditor = contentRef.current?.contains(anchorNode);
  
    if (!isInsideEditor) {
      setIsBold(false);
      setIsItalic(false);
      setIsUnderlined(false);
      setIsCrossedOut(false);
      setIsOrderedList(false);
      setIsUnorderedList(false);
    } else {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderlined(document.queryCommandState("underline"));
      setIsCrossedOut(document.queryCommandState("strikeThrough"));
      setIsOrderedList(document.queryCommandState("insertOrderedList"));
      setIsUnorderedList(document.queryCommandState("insertUnorderedList"));
    }
  };

  const checkIsContentEmpty = () => {
    return value === "" || value === "<br>" || !value;
  }

  const handleInput = () => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    changeContent(contentEl.innerHTML);
  }

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleMouseenter = () => setIsHovered(true);
  const handleMouseleave = () => setIsHovered(false);

  useEffect(() => {
    if (value && contentRef.current) {
      contentRef.current.innerHTML = value;
    }

    document.addEventListener("selectionchange", updateButtonStates);

    return () => document.removeEventListener("selectionchange", updateButtonStates);
  }, []);

  useEffect(() => {
    setIsPlaceholderActive(checkIsContentEmpty())
  }, [value]);

  const editableButtonsData = useMemo(() => {
    return [
      {
        id: "editable-button-bold",
        Icon: Bold,
        isActive: isBold,
        onClick: toggleBold,
      },
      {
        id: "editable-button-italic",
        Icon: Italic,
        isActive: isItalic,
        onClick: toggleItalic,
      },
      {
        id: "editable-button-underlined",
        Icon: Underline,
        isActive: isUnderlined,
        onClick: toggleUnderline,
      },
      {
        id: "editable-button-crossed-out",
        Icon: Strikethrough,
        isActive: isCrossedOut,
        onClick: toggleCrossedOut,
      },
      {
        id: "editable-button-ordered-list",
        Icon: ListOrdered,
        isActive: isOrderedList,
        onClick: toggleOrderedList,
      },
      {
        id: "editable-button-unordered-list",
        Icon: List,
        isActive: isUnorderedList,
        onClick: toggleUnorderedList,
      },
    ];
  }, [isBold, isItalic, isUnderlined, isCrossedOut, isOrderedList, isUnorderedList]);

  useAnimateInputLine({ isFocused, isHovered, lineRef });

  return (
    <div className={styles.textEditor}>
      <header className={styles.head}>
        <div className={styles.controls}>
          <div className={styles.controlsBlock}>
            {editableButtonsData.slice(0, 4).map(({ id, isActive, Icon, onClick }) => (
              <IconButton
                key={id}
                Icon={Icon}
                iconClassName={styles.controlIcon}
                className={clsx(styles.control, isActive && styles.controlActive)}
                onClick={onClick}
              />
            ))}
          </div>

          <span className={styles.controlsSeparator}></span>

          <div className={styles.controlsBlock}>
            {editableButtonsData.slice(4, 6).map(({ id, isActive, Icon, onClick }) => (
              <IconButton
                key={id}
                Icon={Icon}
                iconClassName={styles.controlIcon}
                className={clsx(styles.control, isActive && styles.controlActive)}
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        <div
          className={styles.content}
          ref={contentRef}
          contentEditable={true}
          suppressContentEditableWarning={true} 
          spellCheck={true}

          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseenter}
          onMouseLeave={handleMouseleave}
        ></div>
        {isPlaceholderActive && <span className={styles.placeholder}>{placeholder}</span>}
      </div>

      <InputLine className={styles.inputLine} ref={lineRef} />
    </div>
  );
}
