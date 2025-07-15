import { useState, useRef, useEffect, useMemo } from "react";
import { useAnimateInputLine } from "@/hooks/useAnimateInputLine";

import IconButton from "@/components/button/IconButton/IconButton";
import InputLine from "../InputLine/InputLine";
import { Bold, Italic, List, ListOrdered, Strikethrough, Underline } from "lucide-react";

import styles from "./TextEditor.module.scss";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export interface TextEditorProps {
  placeholder?: string;
  children?: string;
  
  onChange?: (value: string) => void;
}

export default function TextEditor({ placeholder, children, onChange }: TextEditorProps) {
  const [content, setContent] = useState(children || "");
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
    setContent(content);
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
    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsUnderlined(document.queryCommandState("underline"));
    setIsCrossedOut(document.queryCommandState("strikeThrough"));
    setIsOrderedList(document.queryCommandState("insertOrderedList"));
    setIsUnorderedList(document.queryCommandState("insertUnorderedList"));
  }
  const checkIsContentEmpty = () => {
    return content === "" || content === "<br>" || !content;
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
    if (content && contentRef.current) {
      contentRef.current.innerHTML = content;
    }

    document.addEventListener("selectionchange", updateButtonStates);

    return () => document.removeEventListener("selectionchange", updateButtonStates);
  }, []);
  useEffect(() => {
    checkIsContentEmpty() ? setIsPlaceholderActive(true) : setIsPlaceholderActive(false);
  }, [content]);

  const editableButtonsData = useMemo(() => {
    return [
      {
        id: "editable-button-bold",
        icon: <Bold className={styles.controlIcon} />,
        isActive: isBold,
        onClick: toggleBold,
      },
      {
        id: "editable-button-italic",
        icon: <Italic className={styles.controlIcon} />,
        isActive: isItalic,
        onClick: toggleItalic,
      },
      {
        id: "editable-button-underlined",
        icon: <Underline className={styles.controlIcon} />,
        isActive: isUnderlined,
        onClick: toggleUnderline,
      },
      {
        id: "editable-button-crossed-out",
        icon: <Strikethrough className={styles.controlIcon} />,
        isActive: isCrossedOut,
        onClick: toggleCrossedOut,
      },
      {
        id: "editable-button-ordered-list",
        icon: <ListOrdered className={styles.controlIcon} />,
        isActive: isOrderedList,
        onClick: toggleOrderedList,
      },
      {
        id: "editable-button-unordered-list",
        icon: <List className={styles.controlIcon} />,
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
            {editableButtonsData.slice(0, 4).map(({ id, isActive, icon, onClick }) => (
              <IconButton
                key={id}
                className={clsx(styles.control, { [styles.controlActive]: isActive })}
                onClick={onClick}
              >
                {icon}
              </IconButton>
            ))}
          </div>

          <span className={styles.controlsSeparator}></span>

          <div className={styles.controlsBlock}>
            {editableButtonsData.slice(4, 6).map(({ id, isActive, icon, onClick }) => (
              <IconButton
                key={id}
                className={clsx(styles.control, { [styles.controlActive]: isActive })}
                onClick={onClick}
              >
                {icon}
              </IconButton>
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
