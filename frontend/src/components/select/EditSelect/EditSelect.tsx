import { usePositionerHandleRef } from "@/components/position/Positioner/hooks/usePositionerHandleRef";
import { useAnimateInputLine } from "@/hooks/root/useAnimateInputLine";
import { useEffect, useRef, useState } from "react";

import InputLine from "@/components/input/InputLine/InputLine";
import { ChevronDown } from "lucide-react";

import { useAdaptivePopover } from "@/hooks/position/useAdaptivePopover";
import { useArrowNavigation } from "@/hooks/root/useArrowNavigation";
import clsx from "clsx";
import AdaptivePopoverDropdownSelect from "../AdaptivePopoverDropdownSelect/AdaptivePopoverDropdownSelect";
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
  const { isOpen, triggerRef: selectRef, contentRef: dropdownRef, id, toggle, close } = useAdaptivePopover();
  const { register, focusSubmenu } = useArrowNavigation();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const label = data.find(item => item.value === selectedValue)?.label;
  const isSelectedValueDefault = selectedValue === null;

  const lineRef = useRef<HTMLDivElement>(null);
  const positionerHandleRef = usePositionerHandleRef();

  const handleSelectClick = () => {
    positionerHandleRef.current?.recalcPosition();
    toggle();
  }

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);

    close();
  }

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const handleMouseenter = () => setIsHovered(true);

  const handleMouseleave = () => setIsHovered(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
		e.stopPropagation();

		if (["ArrowDown", "ArrowRight"].includes(e.key)) e.preventDefault();

		switch (e.key) {
			case "ArrowDown": case "ArrowRight":
				focusSubmenu(0);

				break;
		}
	};

  useEffect(() => {
    register(0, selectRef);
  }, []);

  useAnimateInputLine({ isFocused, isHovered, lineRef });

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

      <AdaptivePopoverDropdownSelect
        selectedValue={selectedValue ?? ""}
        data={data}
        onChange={handleChange}

        id={id}
        className={styles.dropdown}
        isOpen={isOpen}

        variant="secondary"
        positioner={{
          positionerHandleRef,
          triggerRef: selectRef,
          contentRef: dropdownRef,
          matchTriggerWidth: true,
        }}

        title={defaultLabel}
        onClose={close}
      />
    </>
  );
}
