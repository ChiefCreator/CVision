import React, { useRef, useState } from "react";
import { usePositionerHandleRef } from "@/components/position/Positioner/hooks/usePositionerHandleRef";

import EditInput, { EditInputProps } from "../EditInput/EditInput";
import MonthPicker from "@/components/calendar/MonthPicker/MonthPicker";

import { formatDate, parseFlexibleDate } from "@/utils/dateUtils";

interface InputDateProps extends EditInputProps {};

export default React.memo(function InputDate({ value = "", placeholder, inputRef, onChange }: InputDateProps) {
  const [isShow, setIsShow] = useState(false);
  const editInputRef = useRef<HTMLDivElement>(null);
  const positionerHandleRef = usePositionerHandleRef();

  const changeIsShow = (show: boolean) => setIsShow(show);
  const focus = () => {
    positionerHandleRef.current?.recalcPosition();
    changeIsShow(true);
  }
  const blur = (value?: string) => {
    if ((value && !parseFlexibleDate(value)) || !value) {
      onChange(formatDate(new Date()));
    }
  }

  return (
    <>
      <EditInput
        value={value}
        placeholder={placeholder}
        ref={editInputRef}
        inputRef={inputRef}
        onFocus={focus}
        onBlur={blur}
        onChange={onChange}
      />

      <MonthPicker
        date={value}
        isShow={isShow}
        positionerProps={{ positionerHandleRef, triggerRef: editInputRef }}

        changeIsShow={changeIsShow}
        onChange={onChange}
      />
    </>
  );
})