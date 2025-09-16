import { usePositionerHandleRef } from "@/components/position/Positioner/hooks/usePositionerHandleRef";
import { useAnimateInputLine } from "@/hooks/root/useAnimateInputLine";
import { useEffect, useRef, useState } from "react";

import InputLine from "@/components/input/InputLine/InputLine";
import Portal from "@/components/position/Portal/Portal";
import Positioner from "@/components/position/Positioner/Positioner";
import { ChevronDown } from "lucide-react";

import { usePopover } from "@/hooks/position/usePopover";
import clsx from "clsx";
import styles from "./EditSelect.module.scss";

interface DataItem {
  value: string;
  label: string;
}

interface EditSelectProps {
  selectedValue?: string;
  data: DataItem[];
  defaultLabel?: string;

  onChange: (selectedValue: EditSelectProps["selectedValue"]) => void;
}

export default function EditSelect({ selectedValue: selectedValueProp, data, defaultLabel = "Выберите...", onChange }: EditSelectProps) {
  const [selectedValue, setSelectedValue] = useState(selectedValueProp || null);
  const { isOpen, triggerRef: selectRef, contentRef: dropdownRef, id, toggle, close } = usePopover();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const label = data.find(item => item.value === selectedValue)?.label;
  const isSelectedValueDefault = selectedValue === null;

  const lineRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const positionerHandleRef = usePositionerHandleRef();

  const isSelected = (value: string) => {
    return value === selectedValue;
  }

  const handleSelectClick = () => {
    positionerHandleRef.current?.recalcPosition();
    toggle();
  }
  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);

    close();
  }
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  }
  const handleMouseenter = () => setIsHovered(true);
  const handleMouseleave = () => setIsHovered(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch(e.key) {
      case "ArrowDown": {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1 >= data.length ? 0 : prev + 1));
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 < 0 ? data.length - 1 : prev - 1));
        break;
      }
      case "Enter": case " ": {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < data.length) {
          handleChange(data[activeIndex].value);
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        close();
        break;
      }
    }
  };

  useAnimateInputLine({ isFocused, isHovered, lineRef });

  useEffect(() => {
    if (activeIndex !== null && optionRefs.current[activeIndex]) {
      optionRefs.current[activeIndex]!.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);
  useEffect(() => {
    const index = data.findIndex(item => item.value === selectedValue);
    setActiveIndex(index);
  }, [selectedValue, data]);

  return (
    <>
      <button
        className={clsx(styles.select, isOpen && styles.selectActive)}
        ref={selectRef}
        type="button"

        role="listbox"
        aria-expanded={isOpen}
        aria-controls="list"

        onClick={handleSelectClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseenter}
        onMouseLeave={handleMouseleave}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.selectContent}>
          <span className={clsx(styles.label, isSelectedValueDefault && styles.labelDefault)}>{isSelectedValueDefault ? defaultLabel : label}</span>

          <ChevronDown className={clsx(styles.arrow, isOpen && styles.arrowActive)} />
        </div>

        <InputLine className={styles.inputLine} ref={lineRef} />
        <input className={styles.selectInput} value={selectedValue || ""} aria-hidden readOnly></input>
      </button>

      {isOpen && (
        <Portal>
          <Positioner positionerHandleRef={positionerHandleRef} triggerRef={selectRef} contentRef={dropdownRef} matchTriggerWidth={true}>
            <div className={clsx(styles.dropdown, isOpen && styles.dropdownOpen)} ref={dropdownRef}>
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContentWrapper}>
                  <div className={styles.dropdownContent}>
                    <ul className={styles.dropdownList}>
                      {data.map(({ value, label }, i) => (
                        <li key={value} role="option" aria-selected={isSelected(value)}>
                          <button
                            className={clsx(styles.option, isSelected(value) && styles.optionActive, i === activeIndex && styles.optionFocused)}
                            ref={el => {
                              optionRefs.current[i] = el;
                            }}
                            type="button"

                            onClick={() => handleChange(value)}
                          >
                            {label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Positioner>
        </Portal>
      )}
    </>
  );
}
