import { usePositionerHandleRef } from "@/components/position/Positioner/hooks/usePositionerHandleRef";
import React from "react";

import EditInput, { EditInputProps } from "../EditInput/EditInput";

import AdaptivePopoverMonthPicker from "@/components/calendar/AdaptivePopoverMonthPicker/AdaptivePopoverMonthPicker";
import { useAdaptivePopover } from "@/hooks/position/useAdaptivePopover";
import { formatDate } from "@/utils/date/formatDate";
import { parseFlexibleDate } from "@/utils/date/parseFlexibleDate";

interface InputDateProps extends EditInputProps {};

export default React.memo(function InputDate({ value = "", placeholder, inputRef, onChange }: InputDateProps) {
  const { isOpen, triggerRef: editInputRef, contentRef: pickerRef, id, open, close } = useAdaptivePopover();
    
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

  return (
    <>
      <EditInput
        value={value}
        placeholder={placeholder}
        ref={editInputRef as React.RefObject<HTMLDivElement | null>}
        inputRef={inputRef}
        onFocus={focus}
        onBlur={blur}
        onChange={onChange}
      />

      <AdaptivePopoverMonthPicker
        date={value}
        onChange={onChange}

        id={id}
        isOpen={isOpen}

        positioner={{ positionerHandleRef, triggerRef: editInputRef, contentRef: pickerRef }}

	      onClose={close}
      />
    </>
  );
})