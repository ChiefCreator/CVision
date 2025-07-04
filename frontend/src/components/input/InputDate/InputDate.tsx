import { useRef, useState } from "react";
import EditInput, { EditInputProps } from "../EditInput/EditInput";
import MonthPicker from "@/components/calendar/MonthPicker/MonthPicker";

interface InputDateProps extends EditInputProps {};

export default function InputDate({ value, placeholder, inputRef, onChange }: InputDateProps) {
  const [isShow, setIsShow] = useState(false);
  const editInputRef = useRef<HTMLDivElement>(null);

  const changeIsShow = (show: boolean) => setIsShow(show);

  return (
    <>
      <EditInput
        value={value}
        placeholder={placeholder}
        ref={editInputRef}
        inputRef={inputRef}
        onFocus={() => changeIsShow(true)}
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
}