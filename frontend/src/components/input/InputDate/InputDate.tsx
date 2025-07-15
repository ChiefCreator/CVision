import React, { useRef, useState } from "react";
import EditInput, { EditInputProps } from "../EditInput/EditInput";
import MonthPicker from "@/components/calendar/MonthPicker/MonthPicker";
import { formatDate, parseFlexibleDate } from "@/utils/dateUtils";

interface InputDateProps extends EditInputProps {};

export default React.memo(function InputDate({ value = "", placeholder, inputRef, onChange }: InputDateProps) {
  const [isShow, setIsShow] = useState(false);
  const editInputRef = useRef<HTMLDivElement>(null);

  const changeIsShow = (show: boolean) => setIsShow(show);
  const onBlur = (value?: string) => {
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
        onFocus={() => changeIsShow(true)}
        onBlur={onBlur}
        onChange={onChange}
      />

      <MonthPicker
        date={value}
        isShow={isShow}
        positionerProps={{ triggerRef: editInputRef }}

        changeIsShow={changeIsShow}
        onChange={onChange}
      />
    </>
  );
})