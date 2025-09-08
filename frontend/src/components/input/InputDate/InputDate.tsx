import { usePositionerHandleRef } from "@/components/position/Positioner/hooks/usePositionerHandleRef";
import React from "react";

import MonthPicker from "@/components/calendar/MonthPicker/MonthPicker";
import EditInput, { EditInputProps } from "../EditInput/EditInput";

import { useDropdownMenu } from "@/hooks/menu/useDropdownMenu";
import { formatDate } from "@/utils/date/formatDate";
import { parseFlexibleDate } from "@/utils/date/parseFlexibleDate";

interface InputDateProps extends EditInputProps {};

export default React.memo(function InputDate({ value = "", placeholder, inputRef, onChange }: InputDateProps) {
  const { isOpen, triggerRef: editInputRef, menuRef: pickerRef, open, toggle } = useDropdownMenu({});
    
  const positionerHandleRef = usePositionerHandleRef();

  const focus = () => {
    positionerHandleRef.current?.recalcPosition();
    open();
  }

  const blur = (value?: string) => {
    if ((value && !parseFlexibleDate(value)) || !value) {
      onChange(formatDate(new Date()));
    }
  }

  console.log(isOpen)

  return (
    <>
      <EditInput
        value={value}
        placeholder={placeholder}
        ref={editInputRef as React.RefObject<HTMLDivElement> | undefined}
        inputRef={inputRef}
        onFocus={focus}
        onBlur={blur}
        onChange={onChange}
      />

      <MonthPicker
        date={value}
        isShow={isOpen}
        positionerProps={{ positionerHandleRef, triggerRef: editInputRef, contentRef: pickerRef }}
        ref={pickerRef}
        changeIsShow={toggle}
        onChange={onChange}
      />
    </>
  );
})